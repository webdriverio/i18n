import { after, test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

/**
 * the test writes a temporary cache file, never the cache of the repository
 */
const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'i18n-cache-'))
const CACHE_FILE = path.join(tmpDir, 'cache.json')
process.env.I18N_CACHE_FILE = CACHE_FILE
/**
 * src/translate.ts creates its Anthropic client when it loads: the test sends no request
 */
process.env.ANTHROPIC_API_KEY ??= 'test'

const { updateCache } = await import('../src/translate.js')

after(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true })
})

const readCache = async () => JSON.parse(await fs.readFile(CACHE_FILE, 'utf-8'))

/**
 * `translateFile` runs for up to 25 files at the same time, and each one updates the cache when
 * its translation is done. Parallel read-modify-write of the file lost entries, failed on a file
 * that another update was writing, and left an extra `}` (two overlapping writes of different
 * lengths), which stopped every later run.
 */
test('parallel cache updates keep every entry and a valid file', async () => {
    for (let round = 0; round < 20; round++) {
        await fs.writeFile(CACHE_FILE, JSON.stringify({}, null, 2))
        /**
         * keys of different lengths give writes of different lengths
         */
        const keys = Array.from({ length: 25 }, (_, i) => `docs/page-${round}-${i}${'x'.repeat(i % 3)}.md`)
        await Promise.all(keys.map((key) => updateCache(key, 'hash', 'de')))

        assert.deepEqual(Object.keys(await readCache()).sort(), [...keys].sort())
    }
})
