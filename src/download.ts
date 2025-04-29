import 'dotenv/config';

import path from 'node:path';
import fs from 'node:fs/promises';
import { Octokit } from '@octokit/rest';

import { processBatch } from './utils.js';
import { ROOT_DIR } from './constants.js';

// GitHub repository information
const REPO_OWNER = 'webdriverio';
const REPO_NAME = 'webdriverio';

// Concurrency limit for parallel operations
const MAX_CONCURRENT_OPERATIONS = 20;

/**
 * Ensures a directory exists, creating it if necessary
 */
async function ensureDirectoryExists(dirPath: string): Promise<void> {
    const isExisting = await fs.access(dirPath).then(() => true).catch(() => false);
    if (!isExisting) {
        await fs.mkdir(dirPath, { recursive: true });
        console.log(`Created directory: ${dirPath}`);
    }
}

/**
 * Fetches content from a GitHub repository path
 */
async function fetchRepoContent(octokit: Octokit, path: string, ref: string) {
    const { data } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path,
        ref,
    });

    return data;
}

/**
 * Downloads files from GitHub repository using Octokit SDK
 */
export async function downloadDocs(path: string, branch: string, outputDir: string) {
    if (!process.env.GITHUB_TOKEN) {
        throw new Error('GITHUB_TOKEN is not set');
    }

    // Initialize Octokit with GitHub token from environment variable
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    });

    console.log(`Downloading WebdriverIO docs from GitHub...`);
    try {
        // Create output directory if it doesn't exist
        await ensureDirectoryExists(outputDir);

        // Get the contents of the repository path
        const items = await fetchRepoContent(octokit, path, branch);
        if (!Array.isArray(items)) {
            throw new Error(`Repository path does not point to a directory: ${path}`);
        }

        console.log(`Found ${items.length} files/directories in ${path}`);

        // Process items in parallel with concurrency limit
        await processBatch(
            items,
            (item) => processRepoItem(octokit, item, outputDir, branch),
            MAX_CONCURRENT_OPERATIONS
        );

        console.log('Download completed successfully!');
    } catch (error) {
        console.error('Error downloading docs:', error);
        process.exit(1);
    }
}

/**
 * Process a repository item (file or directory)
 */
async function processRepoItem(octokit: Octokit, item: any, outputDir: string, ref: string): Promise<void> {
    const itemPath = path.join(outputDir, item.name);

    if (item.type === 'dir') {
        // Create directory if it doesn't exist
        await ensureDirectoryExists(itemPath);

        // Get contents of the directory and process each item
        try {
            const subItems = await fetchRepoContent(octokit, item.path, ref);
            if (!Array.isArray(subItems)) {
                throw new Error(`Repository path does not point to a directory: ${path}`);
            }


            // Process sub-items in parallel with concurrency limit
            await processBatch(
                subItems,
                (subItem) => processRepoItem(octokit, subItem, itemPath, ref),
                MAX_CONCURRENT_OPERATIONS
            );
        } catch (error) {
            console.warn(`Warning: Could not process directory ${item.path}: ${error.message}`);
        }
    } else if (item.type === 'file') {
        // Download the file content
        const fileContent = await fetchRepoContent(octokit, item.path, ref);

        if (!('content' in fileContent) || typeof fileContent.content !== 'string' || !('encoding' in fileContent)) {
            throw new Error(`File ${item.path} does not have content or encoding`);
        }

        const content = fileContent.encoding === 'base64'
            ? Buffer.from(fileContent.content, 'base64').toString('utf-8')
            : fileContent.content;

        // Save file to disk
        await fs.writeFile(itemPath, content);
        console.log(`Downloaded: ${itemPath}`);
    }
}

/**
 * Fetch generated docs from existing WebdriverIO project. This is required because
 * the WebdriverIO project generates a lot of documentation based on various parts
 * of the codebase.
 *
 * @param projectDir path to cloned WebdriverIO project
 */
export async function fetchGeneratedDocs () {
    /**
     * fetch generated docs from existing WebdriverIO project
     */
    if (!process.env.WEBDRIVERIO_DOCS) {
        throw new Error('WEBDRIVERIO_DOCS is not set')
    }

    const docsRoot = 'website/docs'
    const webdriverioDocs = path.resolve(ROOT_DIR, process.env.WEBDRIVERIO_DOCS, docsRoot)
    const doDocsExist = await fs.access(webdriverioDocs).then(() => true).catch(() => false);
    if (!doDocsExist) {
        throw new Error(`Couldn't locate WebdriverIO docs at ${webdriverioDocs}`)
    }

    const items = await fs.readdir(webdriverioDocs, { recursive: true, withFileTypes: true })
    /**
     * filter for all generated markdown files (they all start with an underscore)
     */
    const files = items.filter((item) => (
        item.isFile() &&
        item.name.endsWith('.md') &&
        item.name.startsWith('_')
    ))

    console.log(`Found ${files.length} generated markdown files in ${webdriverioDocs}`)
    await Promise.all(files.map(async (file) => {
        const sourcePath = path.join(file.parentPath, file.name)
        const relativePath = path.relative(webdriverioDocs, sourcePath)
        const targetPath = path.join(ROOT_DIR, 'en', 'docusaurus-plugin-content-docs', 'current', relativePath)
        await fs.mkdir(path.dirname(targetPath), { recursive: true })
        await fs.copyFile(sourcePath, targetPath)
    }))
    console.log('Downloaded generated docs successfully!')
}