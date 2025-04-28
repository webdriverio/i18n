import url from 'node:url'
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

import Anthropic from '@anthropic-ai/sdk'
import dotenv from 'dotenv';

import { Processor } from './processor.js';
import { walkThroughTranslationFiles } from './utils.js';
import cache from './cache.json' with { type: 'json' };
import { LANGUAGES_TO_TRANSLATE, ROOT_DIR, DOCUMENT_LABELS, TRANSLATION_INSTRUCTIONS, DocumentType } from './constants.js';

// Load environment variables
dotenv.config();

// Cache file path
const model = 'claude-3-7-sonnet-latest'
const CACHE_FILE_PATH = path.join(ROOT_DIR, 'src', 'cache.json');
const CONTENT_SEPARATOR = '---'
const MAX_TOKENS = 128 * 1000
const BATCH_CHECK_INTERVAL = 5000 // 5 seconds

interface CacheEntry {
    hash: string
    languages: string[]
}

const translationCache = cache as unknown as Map<string, CacheEntry>;
const batchStatuses = new Map<string, {
    resolve: (value: void) => void,
    reject: (reason?: any) => void,
    promise: Promise<void>,
    resolved: boolean
}>()

if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not set');
}

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
    defaultHeaders: {
        'anthropic-beta': 'output-128k-2025-02-19',
    }
})

/**
 * fetch the latest batch id so we know where to start checking
 * for finished batches
 */
const latestBatchId = await client.beta.messages.batches.list({
    limit: 1
}).then(({ data }) => data[0].id)

/**
 * update the cache
 * @param cacheKey - the key of the cache
 * @param contentShasum - the shasum of the content
 * @param language - the language to translate to
 */
async function updateCache(cacheKey: string, contentShasum: string, language: string) {
    /**
     * re-import the cache file to ensure we're working with the latest data
     * as there could be other processes writing to the cache file
     */
    const cacheFile = await fs.readFile(CACHE_FILE_PATH, 'utf-8');
    const cache = JSON.parse(cacheFile) as unknown as Map<string, CacheEntry>;
    const { languages } = cache[cacheKey] || { languages: [] };
    cache[cacheKey] = {
        hash: contentShasum,
        languages: Array.from(new Set([...languages, language]))
    } as CacheEntry;
    await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(cache, null, 2), 'utf-8');
}

// Calculate SHA-256 hash of content
function calculateShasum(content: string): string {
    return crypto.createHash('sha256').update(content).digest('hex');
}

/**
 * Translate the docs for a given language
 * @param language - The language to translate to
 */
export async function translate(language: string) {
    console.log(`Translating docs for ${language}`);
    const processor = new Processor(25)

    /**
     * walk through the translation files and process them
     */
    await walkThroughTranslationFiles(language, {
        onFile: async (sourcePath, targetPath) => {
            processor.process(() => translateFile(sourcePath, targetPath, language))
        }
    })

    await processor.waitForResolved()
    clearInterval(batchCheckIntervalId)
    batchCheckIntervalId = undefined
    batchStatuses.clear()
    console.log(`Translation to ${language} completed!`);
}

async function translateFile(sourcePath: string, targetPath: string, language: string) {
    try {
        console.log(`Processing ${sourcePath} for ${language}...`);

        if (path.extname(sourcePath) === DocumentType.MARKDOWN) {
            return new Promise((r) => setTimeout(r, 10)) as any
        }

        // Read the markdown content
        const content = await fs.readFile(sourcePath, 'utf-8');

        // Calculate the shasum of the source content
        const contentShasum = calculateShasum(content);

        // Create a relative path as the cache key to make it more portable
        const cacheKey = path.relative(ROOT_DIR, sourcePath);
        const needToTranslate = await checkNeedToTranslate(cacheKey, targetPath, content, language);
        if (!needToTranslate) {
            console.log(`Skipping translation for ${sourcePath} - content unchanged`);
            return;
        }

        // Translate the body content using Anthropic
        const translatedContent = await translateContent(content, language, path.extname(sourcePath));

        // Write the translated content to the target file
        await fs.mkdir(path.dirname(targetPath), { recursive: true });
        await fs.writeFile(targetPath, translatedContent, 'utf-8');

        // Save the updated cache
        await updateCache(cacheKey, contentShasum, language);

        console.log(`Successfully translated ${path.basename(sourcePath)} to ${language}`);
    } catch (error) {
        console.error(`Error translating file ${sourcePath}:`, error.message);
    }
}

async function translateContent(content: string, language: string, extension: string): Promise<string> {
    try {
        const { input_tokens } = await client.messages.countTokens({
            messages: getMessages(language, content, extension),
            model,
        })

        const contentShasum = calculateShasum(content);
        let sections = [content]
        if (input_tokens > MAX_TOKENS) {
            const [nl, frontmatter, firstHeading, ...otherSections] = content.split(CONTENT_SEPARATOR)
            sections = [
                [nl, frontmatter, firstHeading].join(CONTENT_SEPARATOR),
                ...otherSections
            ]
            console.log(`Translating ${sections.length} sections`)
        }

        const batch = await client.beta.messages.batches.create({
            requests: sections.map((section, i) => ({
                /**
                 * batch ids are limited to 64 characters
                 */
                custom_id: getBatchId(language, contentShasum, i),
                params: {
                    model,
                    max_tokens: MAX_TOKENS,
                    messages: getMessages(language, section, extension),
                },
            }))
        })
        console.log(`Batch created: ${batch.id}, waiting for it to finish...`)
        await waitForBatchToFinish(batch.id)
        const chunks = await client.beta.messages.batches.results(batch.id)
        let text = ''
        for await (const chunk of chunks) {
            if (chunk.result.type !== 'succeeded') {
                throw new Error(`Batch ${batch.id} failed: ${JSON.stringify(chunk.result, null, 2)}`)
            }
            text += chunk.result.message.content
                .filter((c) => c.type === 'text')
                .map((c) => c.text)
                .join('')
        }

        /**
         * Remove anything that the LLM prepends to the frontmatter,
         * e.g. "I'll translate the Markdown content from English to German as requested:"
         */
        if (extension === DocumentType.MARKDOWN) {
            return text.slice(text.indexOf(CONTENT_SEPARATOR))
        }

        try {
            return JSON.stringify(JSON.parse(
                text[0] !== '{'
                    ? text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1)
                    : text
            ), null, 2)
        } catch (error) {
            console.error('Error parsing JSON:', error, `\n\n${text}`);
            throw error;
        }
    } catch (error) {
        console.error('Error calling Anthropic API:', error);
        throw error;
    }
}

/**
 * Check if the file needs to be translated
 * @param sourcePath - The path to the source file
 * @param targetPath - The path to the target file
 * @param content - The content of the source file
 * @param language - The language to translate to
 * @returns true if the file needs to be translated, which is the case if:
 * - the source content has changed
 * - the file is not translated to the target language
 * - the file does not exist
 */
async function checkNeedToTranslate(cacheKey: string, targetPath: string, content: string, language: string): Promise<boolean> {
    const contentShasum = calculateShasum(content);
    const translatedFileExists = await fs.access(targetPath).then(() => true, () => false);
    const { hash, languages } = translationCache[cacheKey] || { hash: '', languages: [] };

    /**
     * skip if:
     * - the file has not changed
     * - the file is already translated to the target language
     * - the file exists
     */
    return hash !== contentShasum || !languages.includes(language) || !translatedFileExists
}

function getMessages(language: string, content: string, extension: string) {
    if (!['.md', '.json'].includes(extension)) {
        throw new Error(`Unsupported file extension: ${extension}`)
    }
    const documentType = extension === '.md' ? DocumentType.MARKDOWN : DocumentType.JSON
    const documentName = DOCUMENT_LABELS[documentType]
    const instructions = TRANSLATION_INSTRUCTIONS[documentType]
    return [{
        role: 'user',
        content: [
            `Translate the following ${documentName} content from English to ${LANGUAGES_TO_TRANSLATE[language]}.`,
            instructions,
            'Here is the content to translate:',
            '',
            `${content}`
        ].join('\n')
    }] as Anthropic.MessageParam[]
}

/**
 * Fetch the status of a batch and wait until it's done
 * @param batchId - The ID of the batch
 * @returns void
 */
let batchCheckIntervalId: NodeJS.Timeout | undefined
async function waitForBatchToFinish(batchId: string): Promise<void> {
    const { resolve, reject, promise } = Promise.withResolvers<void>()
    batchStatuses.set(batchId, { resolve, reject, promise, resolved: false })

    /**
     * kick off the batch check interval if it's not already running
     */
    if (!batchCheckIntervalId) {
        batchCheckIntervalId = setInterval(checkBatchStatus, BATCH_CHECK_INTERVAL)
    }

    return promise
}

function getBatchId(language: string, contentShasum: string, i: number) {
    return `msgbatch_${language}-${contentShasum.slice(0, 40)}-${i}`
}

async function checkBatchStatus () {
    const batchList = await client.beta.messages.batches.list({
        limit: 1000,
        before_id: latestBatchId
    })

    const allBatchIds = Array.from(batchStatuses.keys())
    const batchesOfThisProcess = batchList.data.filter(
        (batch) => allBatchIds.includes(batch.id)
    )
    const processingBatches = batchesOfThisProcess.filter(
        (batch) => batch.processing_status === 'in_progress'
    )
    const resolvedBatches = batchesOfThisProcess.filter(
        (batch) => batch.processing_status === 'ended'
    )

    for (const batch of batchesOfThisProcess) {
        /**
         * fullfill batch promise if it's done
         */
        const batchStatus = batchStatuses.get(batch.id)
        if (batchStatus && !batchStatus.resolved && batch.processing_status === 'ended') {
            batchStatus.resolved = true
            batchStatus.resolve()
            console.log(`Batch ${batch.id} finished`)
        }
    }

    console.log(`Batches processing ${resolvedBatches.length}/${batchesOfThisProcess.length} (${processingBatches.length} processing)`)
}