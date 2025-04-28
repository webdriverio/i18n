import path from 'node:path';
import fs from 'node:fs/promises';

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
    onMarkdownFile?: (sourcePath: string, targetPath: string) => Promise<void> | void
    onJsonFile?: (sourcePath: string, targetPath: string) => Promise<void> | void
    onUnknownFile?: (sourcePath: string) => Promise<void> | void
}

/**
 * Walk through translation files and process them
 * @param rootDir - The root directory of the translation files
 * @param language - The language of the translation files
 * @param opts - The options for the translation files
 */
export async function walkThroughTranslationFiles(rootDir: string, language: string, opts: WalkThroughTranslationFilesOpts) {
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
        const entries = (await fs.readdir(sourceDir, {
            withFileTypes: true,
            recursive: true
        })).filter((entry) => entry.isFile());

        for (const entry of entries) {
            const sourcePath = path.join(entry.parentPath, entry.name)
            const relativePath = path.relative(sourceDir, entry.parentPath)
            const targetPath = path.join(targetDir, relativePath, entry.name)
            const fileType = path.extname(entry.name)

            /**
             * handle JSON files with caching
             */
            if (fileType === '.json') {
                await opts.onJsonFile?.(sourcePath, targetPath)
                continue
            }

            /**
             * handle markdown files in batches
             */
            if (fileType === '.md') {
                await opts.onMarkdownFile?.(sourcePath, targetPath)
                continue
            }

            await opts.onUnknownFile?.(sourcePath)
        }
    }
}