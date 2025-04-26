import url from 'node:url'
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic'
import dotenv from 'dotenv';

import cache from './cache.json' with { type: 'json' };
import { LANGUAGES_TO_TRANSLATE } from './constants.js';
// Load environment variables
dotenv.config();

// Get the current directory
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Cache file path
const CACHE_FILE_PATH = path.join(rootDir, 'src', 'cache.json');

const translationCache = cache as unknown as Map<string, { hash: string, languages: string[] }>;

// Save the cache file
async function updateCache(cacheKey: string, contentShasum: string, language: string) {
    try {
        const { languages } = translationCache[cacheKey] || { languages: [] };
        translationCache[cacheKey] = { hash: contentShasum, languages: [...languages, language] };
        await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(translationCache, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error saving cache file:', error);
    }
}

// Calculate SHA-256 hash of content
function calculateShasum(content: string): string {
    return crypto.createHash('sha256').update(content).digest('hex');
}

export async function translate(language: string) {
    console.log(`Translating docs for ${language}`);

    // Define source directories
    const sourceDirectories = [
        path.join(rootDir, 'en', 'docusaurus-plugin-content-docs'),
        path.join(rootDir, 'en', 'docusaurus-plugin-content-docs-community')
    ];

    // Create target directories if they don't exist
    const targetDirectories = sourceDirectories.map(srcDir => {
        const relPath = path.relative(path.join(rootDir, 'en'), srcDir);
        return path.join(rootDir, language, relPath);
    });

    // Ensure target directories exist
    for (const dir of targetDirectories) {
        await fs.mkdir(dir, { recursive: true });
    }

    // Process each source directory
    for (let i = 0; i < sourceDirectories.length; i++) {
        const sourceDir = sourceDirectories[i];
        const targetDir = targetDirectories[i];

        // Process the directory recursively
        await processDirectory(sourceDir, targetDir, language);
    }

    console.log(`Translation to ${language} completed!`);
}

async function processDirectory(sourceDir: string, targetDir: string, language: string) {
    try {
        // Read all files and directories in the source directory
        const entries = await fs.readdir(sourceDir, { withFileTypes: true });

        // Process each entry
        for (const entry of entries) {
            const sourcePath = path.join(sourceDir, entry.name);
            const targetPath = path.join(targetDir, entry.name);

            if (entry.isDirectory()) {
                // Create target directory if it doesn't exist
                await fs.mkdir(targetPath, { recursive: true });

                // Process the subdirectory recursively
                await processDirectory(sourcePath, targetPath, language);
            } else if (entry.name.endsWith('.md')) {
                // Process markdown files
                await translateFile(sourcePath, targetPath, language);
            } else if (entry.name.endsWith('.json')) {
                // Handle JSON files with caching
                const cacheKey = path.relative(rootDir, sourcePath);
                const content = await fs.readFile(sourcePath, 'utf-8');
                const needToTranslate = await checkNeedToTranslate(cacheKey, targetPath, content, language);
                if (!needToTranslate) {
                    console.log(`Skipping translation for ${sourcePath} - content unchanged`);
                    continue;
                }

                // Copy JSON file and update cache
                await fs.copyFile(sourcePath, targetPath);
                console.log(`Copied JSON file ${entry.name}`);

                // Save the updated cache
                const contentShasum = calculateShasum(content);
                await updateCache(cacheKey, contentShasum, language);
            }
        }
    } catch (error) {
        console.error(`Error processing directory ${sourceDir}:`, error);
    }
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
        await fs.writeFile(targetPath, translatedContent, 'utf-8');

        // Save the updated cache
        await updateCache(cacheKey, contentShasum, language);

        console.log(`Successfully translated ${path.basename(sourcePath)} to ${language}`);
    } catch (error) {
        console.error(`Error translating file ${sourcePath}:`, error);
    }
}

async function translateContent(content: string, language: string): Promise<string> {
    try {
        const { text } = await generateText({
            model: anthropic('claude-3-7-sonnet-20250219'),
            prompt: [
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
            ].join('\n'),
            temperature: 0.1,
        });

        return text.slice(text.indexOf('---'));
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