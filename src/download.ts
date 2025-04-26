import 'dotenv/config';

import path from 'node:path';
import fs from 'node:fs/promises';
import { Octokit } from '@octokit/rest';

import { processBatch } from './utils.js';

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
async function fetchRepoContent(octokit: Octokit, path: string, ref: string): Promise<any[]> {
    const { data } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path,
        ref,
    });

    if (!Array.isArray(data)) {
        throw new Error(`Repository path does not point to a directory: ${path}`);
    }

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
        const fileContent = await downloadFile(octokit, item.path, ref);

        // Save file to disk
        await fs.writeFile(itemPath, fileContent);
        console.log(`Downloaded: ${itemPath}`);
    }
}

/**
 * Download a single file's content
 */
async function downloadFile(octokit: Octokit, path: string, ref: string): Promise<string> {
    const { data } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path,
        ref,
    });

    if ('content' in data && 'encoding' in data) {
        // GitHub returns base64 encoded content
        if (data.encoding === 'base64') {
            return Buffer.from(data.content, 'base64').toString('utf-8');
        }
        return data.content;
    }

    throw new Error(`Could not retrieve content for file: ${path}`);
}
