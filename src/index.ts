import { downloadDocs, fetchGeneratedDocs } from './download.js'
import { translate } from './translate.js'
import { LANGUAGES_TO_TRANSLATE } from './constants.js'

async function main() {
    await downloadDocs('website/i18n/en', 'main', 'en');
    await downloadDocs('website/docs', 'main', 'en/docusaurus-plugin-content-docs/current');
    await downloadDocs('website/community', 'main', 'en/docusaurus-plugin-content-docs-community/current');
    await fetchGeneratedDocs()

    for (const language of Object.keys(LANGUAGES_TO_TRANSLATE)) {
        await translate(language);
    }
}

// Check if this file is being run directly
const isMainModule = import.meta.url === `file://${process.argv[1]}`
if (isMainModule) {
    await main()
}
