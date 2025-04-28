import url from 'node:url'
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

import Anthropic from '@anthropic-ai/sdk'
import dotenv from 'dotenv';

import { Processor } from './processor.js';
import { walkThroughTranslationFiles } from './utils.js';
import cache from './cache.json' with { type: 'json' };
import { LANGUAGES_TO_TRANSLATE } from './constants.js';

// Load environment variables
dotenv.config();

// Get the current directory
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Cache file path
const model = 'claude-3-7-sonnet-latest'
const CACHE_FILE_PATH = path.join(rootDir, 'src', 'cache.json');
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
    await walkThroughTranslationFiles(rootDir, language, {
        onMarkdownFile: (sourcePath, targetPath) => {
            processor.process(() => translateFile(sourcePath, targetPath, language))
        },
        onJsonFile: async (sourcePath, targetPath) => {
            // Handle JSON files with caching
            const cacheKey = path.relative(rootDir, sourcePath);
            const content = await fs.readFile(sourcePath, 'utf-8');
            const needToTranslate = await checkNeedToTranslate(cacheKey, targetPath, content, language);
            if (!needToTranslate) {
                console.log(`Skipping translation for ${sourcePath} - content unchanged`);
                return
            }

            // Copy JSON file and update cache
            await fs.copyFile(sourcePath, targetPath);
            console.log(`Copied JSON file ${targetPath}`);

            // Save the updated cache
            const contentShasum = calculateShasum(content);
            await updateCache(cacheKey, contentShasum, language);
        },
        onUnknownFile: (sourcePath) => {
            console.log(`Skipping ${sourcePath} - unknown file type`)
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

        // Read the markdown content
        const content = await fs.readFile(sourcePath, 'utf-8');

        // Calculate the shasum of the source content
        const contentShasum = calculateShasum(content);

        // Create a relative path as the cache key to make it more portable
        const cacheKey = path.relative(rootDir, sourcePath);
        const needToTranslate = await checkNeedToTranslate(cacheKey, targetPath, content, language);
        if (!needToTranslate) {
            console.log(`Skipping translation for ${sourcePath} - content unchanged`);
            return;
        }

        // Translate the body content using Anthropic
        const translatedContent = await translateContent(content, language);

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

async function translateContent(content: string, language: string): Promise<string> {
    try {
        const { input_tokens } = await client.messages.countTokens({
            messages: getMessages(language, content),
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
                    messages: getMessages(language, section),
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

            if (text === '[Object]') {
                console.log('CHECK', chunk.result.message.content)
            }
        }

        /**
         * Remove anything that the LLM prepends to the frontmatter,
         * e.g. "I'll translate the Markdown content from English to German as requested:"
         */
        return text.slice(text.indexOf(CONTENT_SEPARATOR))
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

function getMessages(language: string, content: string) {
    return [{
        role: 'user',
        content: [
            `Translate the following Markdown content from English to ${LANGUAGES_TO_TRANSLATE[language]}.`,
            'The document is a Docusaurus documentation page and separated in frontmatter and body.',
            'The frontmatter is the first block of the document, and the body is the rest of the document.',
            'Only translate the "title" and "description" fields in the frontmatter.',
            'In the body: keep all Markdown formatting intact, don\'t add any headings if they don\'t exist in the original content',
            'Also ignore any links, code blocks (except comments), and other syntax within tick characters (`).',
            'Do not translate code inside code blocks, variable names, or technical terms that should remain in English.',
            'Do not translate HTML tags or attributes.',
            'Do not change URLs.',
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