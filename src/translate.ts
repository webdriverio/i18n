import 'dotenv/config';

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import fetch from 'node-fetch';
import { mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';

const ROOT_DIR = '.';
const LANGUAGES = [
  'ar', 'be', 'bg', 'de', 'es', 'fa', 'fr', 'hi',
  'it', 'ja', 'pl', 'pt', 'ru', 'ta', 'uk', 'zh'
];
const MAX_CHUNK_SIZE = 8000;
const API_URL = 'https://api.anthropic.com/v1/messages/batches';
const API_KEY = process.env.API_KEY || ''; // fallback vazio se não definido
const CACHE_FILE = path.join('.cache-shasum.json');

interface CacheMap {
  [filePath: string]: string;
}

function computeShasum(content: string): string {
  return crypto.createHash('sha1').update(content, 'utf8').digest('hex');
}

function readCache(): CacheMap {
  if (!existsSync(CACHE_FILE)) return {};
  return JSON.parse(readFileSync(CACHE_FILE, 'utf-8'));
}

function writeCache(cache: CacheMap) {
  writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
  console.log("Cache saved with", Object.keys(cache).length, "entries.");
}

function getAllMarkdownFiles(baseDir: string): string[] {
  let results: string[] = [];
  if (!existsSync(baseDir)) return results;
  const list = readdirSync(baseDir, { withFileTypes: true });
  for (const file of list) {
    const filePath = path.join(baseDir, file.name);
    if (file.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(filePath));
    } else if (file.name.endsWith('.md')) {
      results.push(filePath);
    }
  }
  return results;
}

function splitBySecondLevelHeading(text: string): string[] {
  return text.split(/^##\s+/gm).map((s, i) => (i === 0 ? s : '## ' + s)).filter(s => s.trim());
}

function chunkBuckets(buckets: string[], maxLength: number): string[] {
  const chunks: string[] = [];
  let current = '';
  for (const bucket of buckets) {
    if (bucket.length > maxLength) {
      if (current.length > 0) {
        chunks.push(current);
        current = '';
      }
      for (let i = 0; i < bucket.length; i += maxLength) {
        chunks.push(bucket.slice(i, i + maxLength));
      }
      continue;
    }
    if ((current.length + bucket.length + 2) > maxLength) {
      chunks.push(current);
      current = '';
    }
    current += (current.length > 0 ? '\n\n' : '') + bucket;
  }
  if (current.length > 0) chunks.push(current);
  return chunks;
}

async function translateChunk(text: string, lang: string): Promise<string> {
  const body = {
    requests: [
      {
        custom_id: 'translation-prompt',
        params: {
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 4096,
          messages: [
            {
              role: 'user',
              content: `Translate the following text from English to ${lang} and keep the Markdown formatting and do not enter any additional comments.\n\n${text}`,
            },
          ],
        },
      },
    ],
  };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  });

  const json = await res.json() as { id?: string; [key: string]: any };
  if (!json.id) throw new Error('API error: ' + JSON.stringify(json));
  const resultUrl = await checkProcessingStatus(json.id);
  const resultRes = await fetch(resultUrl, {
    headers: {
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
  });
  const resultData = await resultRes.json();
  if (typeof resultData !== 'object' || resultData === null) {
    throw new Error('Invalid resultData format');
  }
  const content = (resultData as any).result?.message?.content?.[0]?.text || '[Error: Missing content]';
  return content;
}

async function checkProcessingStatus(batchId: string): Promise<string> {
  const url = `https://api.anthropic.com/v1/messages/batches/${batchId}`;
  while (true) {
    const res = await fetch(url, {
      headers: {
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
      },
    });
    const json = await res.json() as { processing_status?: string; results_url?: string };
    if (json.processing_status !== 'in_progress') {
      if (!json.results_url) {
        throw new Error('API error: results_url is undefined');
      }
      return json.results_url;
    }
    console.log('Still processing... retrying in 5 seconds.');
    await new Promise(res => setTimeout(res, 5000));
  }
}

async function translateFile(filePath: string, lang: string, cache: CacheMap) {
  const content = readFileSync(filePath, 'utf-8');
  const shasum = computeShasum(content);
  const cacheKey = `${lang}:${filePath}`;

  if (cache[cacheKey] === shasum) {
    console.log(`Skipped (no changes): ${filePath} => ${lang}`);
    return;
  }

  const buckets = splitBySecondLevelHeading(content);
  const chunks = chunkBuckets(buckets, MAX_CHUNK_SIZE);
  const translatedChunks: string[] = [];

  for (let i = 0; i < chunks.length; i++) {
    console.log(`Translating [${lang}] ${filePath} (chunk ${i + 1}/${chunks.length})`);
    const translated = await translateChunk(chunks[i], lang);
    translatedChunks.push(translated);
    await new Promise(r => setTimeout(r, 2000));
  }

  writeFileSync(filePath, translatedChunks.join('\n\n'), 'utf-8');
  console.log(`✅ Translation finished: ${filePath} => ${lang}`);

  cache[cacheKey] = shasum;
  writeCache(cache); //
}



async function main() {
  const cache = readCache();

  for (const lang of LANGUAGES) {
    const basePath = path.join(ROOT_DIR, lang, 'docusaurus-plugin-content-docs', 'current');
    const files = getAllMarkdownFiles(basePath);

    for (const file of files) {
      await translateFile(file, lang, cache);
    }
  }

  //writeCache(cache);
}

main().catch(console.error);