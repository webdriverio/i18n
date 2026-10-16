import { after, test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

// a temporary cache, never src/cache.json
const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'i18n-cache-'))
const CACHE_FILE = path.join(tmpDir, 'cache.json')
process.env.I18N_CACHE_FILE = CACHE_FILE
// translate.ts needs a key to load; no request is sent
process.env.ANTHROPIC_API_KEY ??= 'test'

const { updateCache } = await import('../src/translate.js')

after(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true })
})

const readCache = async () => JSON.parse(await fs.readFile(CACHE_FILE, 'utf-8'))

// up to 25 translateFile() calls update the cache at the same time
test('parallel cache updates keep every entry and a valid file', async () => {
    for (let round = 0; round < 20; round++) {
        await fs.writeFile(CACHE_FILE, JSON.stringify({}, null, 2))
        // different key lengths give overlapping writes of different lengths
        const keys = Array.from({ length: 25 }, (_, i) => `docs/page-${round}-${i}${'x'.repeat(i % 3)}.md`)
        await Promise.all(keys.map((key) => updateCache(key, 'hash', 'de')))

        assert.deepEqual(Object.keys(await readCache()).sort(), [...keys].sort())
    }
})

// a failed translation must not look up to date in the next run
test('a new version of a page keeps only the languages translated from it', async () => {
    await fs.writeFile(CACHE_FILE, JSON.stringify({ page: { hash: 'old', languages: ['ar', 'de'] } }))
    await updateCache('page', 'new', 'ar')
    assert.deepEqual((await readCache()).page, { hash: 'new', languages: ['ar'] })
})

test('the same version of a page adds the language', async () => {
    await fs.writeFile(CACHE_FILE, JSON.stringify({ page: { hash: 'same', languages: ['ar'] } }))
    await updateCache('page', 'same', 'de')
    assert.deepEqual((await readCache()).page, { hash: 'same', languages: ['ar', 'de'] })
})
