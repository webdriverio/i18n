import url from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
export const ROOT_DIR = path.resolve(__dirname, '..')

export enum DocumentType {
    MARKDOWN = '.md',
    JSON = '.json',
}

export const DOCUMENT_LABELS = {
    [DocumentType.MARKDOWN]: 'Markdown',
    [DocumentType.JSON]: 'JSON'
}

export const TRANSLATION_INSTRUCTIONS = {
    [DocumentType.MARKDOWN]: [
        'The document is a Docusaurus documentation page and separated in frontmatter and body.',
        'The frontmatter is the first block of the document, and the body is the rest of the document.',
        'Only translate the "title" and "description" fields in the frontmatter.',
        'In the body: keep all Markdown formatting intact, don\'t add any headings if they don\'t exist in the original content',
        'Also ignore any links, code blocks (except comments), and other syntax within tick characters (`).',
        'Do not translate code inside code blocks, variable names, or technical terms that should remain in English.',
        'Do not translate HTML tags or attributes.',
        'Do not change URLs.',
    ].join('\n'),
    [DocumentType.JSON]: [
        'The document is a JSON file that contains documentation for a WebdriverIO project.',
        'Only translate the value behind the "message" property, nothing else.',
        'Do not change any keys.',
    ].join('\n'),
}

export const LANGUAGES_TO_TRANSLATE = {
    ar: 'Arabic',
    de: 'German',
    es: 'Spanish',
    // fa: 'Persian',
    // fr: 'French',
    // hi: 'Hindi',
    // it: 'Italian',
    // ja: 'Japanese',
    // pl: 'Polish',
    // pt: 'Portuguese',
    // ru: 'Russian',
    // sv: 'Swedish',
    // ta: 'Tamil',
    // uk: 'Ukrainian',
    // zh: 'Chinese',
} as const;