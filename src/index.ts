import { downloadDocs, fetchGeneratedDocs } from './download.js'
import { translate } from './translate.js'
import { LANGUAGES_TO_TRANSLATE } from './constants.js'

/**
 * The branch of webdriverio/webdriverio whose docs this branch translates: the v9 branch of
 * this repo translates the v9 docs (the default branch translates `main`, the v10 docs)
 */
const SOURCE_BRANCH = 'v9'

async function main() {
    await downloadDocs('website/i18n/en', SOURCE_BRANCH, 'en');
    await downloadDocs('website/docs', SOURCE_BRANCH, 'en/docusaurus-plugin-content-docs/current');
    await downloadDocs('website/community', SOURCE_BRANCH, 'en/docusaurus-plugin-content-docs-community/current');
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
