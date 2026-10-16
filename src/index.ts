import fs from 'node:fs/promises'
import path from 'node:path'

import { downloadDocs, fetchGeneratedDocs } from './download.js'
import { translate } from './translate.js'
import { LANGUAGES_TO_TRANSLATE, ROOT_DIR } from './constants.js'

async function main() {
    /**
     * `en/` is not in git and a download only adds files: clear it, so that pages that the
     * source no longer has (removed pages, or the pages of a local run on the `v9` branch) are
     * not translated here
     */
    await fs.rm(path.join(ROOT_DIR, 'en'), { recursive: true, force: true })
    await downloadDocs('website/i18n/en', 'main', 'en');
    await downloadDocs('website/docs', 'main', 'en/docusaurus-plugin-content-docs/current');
    await downloadDocs('website/community', 'main', 'en/docusaurus-plugin-content-docs-community/current');
    await fetchGeneratedDocs()

    /**
     * Translate one language at a time to avoid rate limiting
     */
    for (const language of Object.keys(LANGUAGES_TO_TRANSLATE)) {
        await translate(language);
    }
}

// Check if this file is being run directly
const isMainModule = import.meta.url === `file://${process.argv[1]}`
if (isMainModule) {
    await main()
}
