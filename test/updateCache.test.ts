import { after, before, test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'

/**
 * src/translate.ts creates its Anthropic client when it loads: the test sends no request
 */
process.env.ANTHROPIC_API_KEY ??= 'test'

const CACHE_FILE = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..', 'src', 'cache.json')
let saved: string

/**
 * the test writes the real cache file: keep its content and put it back
 */
before(async () => {
    saved = await fs.readFile(CACHE_FILE, 'utf-8')
})
after(async () => {
    await fs.writeFile(CACHE_FILE, saved)
})

/**
 * `translateFile` runs for up to 25 files at the same time, and each one updates the cache when
 * its translation is done. Parallel read-modify-write of the file lost entries, failed on a file
 * that another update was writing, and left an extra `}` (two overlapping writes of different
 * lengths), which stopped every later run.
 */
test('parallel cache updates keep every entry and a valid file', async () => {
    const { updateCache } = await import('../src/translate.js')
    for (let round = 0; round < 20; round++) {
        await fs.writeFile(CACHE_FILE, JSON.stringify({}, null, 2))
        /**
         * keys of different lengths give writes of different lengths
         */
        const keys = Array.from({ length: 25 }, (_, i) => `docs/page-${round}-${i}${'x'.repeat(i % 3)}.md`)
        await Promise.all(keys.map((key) => updateCache(key, 'hash', 'de')))

        const cache = JSON.parse(await fs.readFile(CACHE_FILE, 'utf-8'))
        assert.deepEqual(Object.keys(cache).sort(), [...keys].sort())
    }
})
