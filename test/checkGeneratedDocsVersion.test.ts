import { after, test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { checkGeneratedDocsVersion } from '../src/download.js'

const checkout = await fs.mkdtemp(path.join(os.tmpdir(), 'webdriverio-'))
const withVersion = async (version: string) => {
    await fs.writeFile(path.join(checkout, 'lerna.json'), JSON.stringify({ version }))
    process.env.WEBDRIVERIO_DOCS = checkout
}

after(async () => {
    delete process.env.WEBDRIVERIO_DOCS
    await fs.rm(checkout, { recursive: true, force: true })
})

test('accepts a checkout of the source branch', async () => {
    await withVersion('9.32.0')
    await checkGeneratedDocsVersion('v9')
})

test('rejects a checkout of another major version', async () => {
    await withVersion('10.0.2')
    await assert.rejects(checkGeneratedDocsVersion('v9'), /webdriverio 10\.0\.2: use a checkout of its v9 branch/)
})

test('does nothing without WEBDRIVERIO_DOCS', async () => {
    delete process.env.WEBDRIVERIO_DOCS
    await checkGeneratedDocsVersion('v9')
})
