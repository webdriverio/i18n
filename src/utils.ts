import path from 'node:path';
import fs from 'node:fs/promises';

import { ROOT_DIR } from './constants.js';

/**
 * Process items in batches with a concurrency limit
 */
export async function processBatch<T, R>(
    items: T[],
    processItem: (item: T) => Promise<R>,
    concurrencyLimit: number
): Promise<R[]> {
    const results: R[] = [];
    const chunks = [];

    // Split items into chunks based on concurrency limit
    for (let i = 0; i < items.length; i += concurrencyLimit) {
        chunks.push(items.slice(i, i + concurrencyLimit));
    }

    // Process each chunk concurrently
    for (const chunk of chunks) {
        const chunkResults = await Promise.all(chunk.map(processItem));
        results.push(...chunkResults);
    }

    return results;
}

interface WalkThroughTranslationFilesOpts {
    onFile: (sourcePath: string, targetPath: string) => Promise<void> | void
}

/**
 * Walk through translation files and process them
 * @param rootDir - The root directory of the translation files
 * @param language - The language of the translation files
 * @param opts - The options for the translation files
 */
export async function walkThroughTranslationFiles(language: string, opts: WalkThroughTranslationFilesOpts) {
    // Define source directories
    const sourceDirectory = path.join(ROOT_DIR, 'en')
    const targetDirectory = path.join(ROOT_DIR, language)
    await fs.mkdir(targetDirectory, { recursive: true });

    // Process the directory recursively
    const entries = (await fs.readdir(sourceDirectory, {
        withFileTypes: true,
        recursive: true
    })).filter((entry) => entry.isFile());

    for (const entry of entries) {
        const sourcePath = path.join(entry.parentPath, entry.name)
        const relativePath = path.relative(sourceDirectory, entry.parentPath)
        const targetPath = path.join(targetDirectory, relativePath, entry.name)
        await opts.onFile(sourcePath, targetPath)
    }
}