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

export const TRANSLATABLE_EXTENSIONS = ['.md', '.json']

export const TRANSLATION_INSTRUCTIONS = {
    [DocumentType.MARKDOWN]: [
        'The document is a Docusaurus documentation page and separated in frontmatter and body.',
        'The frontmatter is the first block of the document, and the body is the rest of the document.',
        'Only translate the "title" and "description" fields in the frontmatter.',
        'If the "description" field in the frontmatter is empty or missing, either draft a concise translated description of the document or omit the "description" key entirely. Never leave "description" empty or set to null.',
        'In the body: keep all Markdown formatting intact, don\'t add any headings if they don\'t exist in the original content',
        'Also ignore any links, code blocks (except comments), and other syntax within tick characters (`).',
        'Do not translate code inside code blocks, variable names, or technical terms that should remain in English.',
        'Do not translate HTML tags or attributes.',
        'Do not change URLs.',
        'Keep bare URLs (http:// or https://) separated by spaces from surrounding translated text and punctuation (especially in languages without word spaces such as Japanese, Chinese, and Korean) so Markdown autolinks do not swallow adjacent text.',
        'Do not change Markdown image references. Keep the entire image syntax exactly as-is, including the file path/URL. For example, `![Console Logs](/img/devtools/console-logs.gif)` must remain unchanged — do not translate the alt text or modify the path.',
        'Return the raw translated Markdown directly starting with the "---" frontmatter delimiter. Do not wrap the output or the frontmatter in a ```markdown code fence, and do not add section labels like "Frontmatter:" or "Body:".',
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
    fa: 'Persian',
    fr: 'French',
    hi: 'Hindi',
    it: 'Italian',
    ja: 'Japanese',
    el: 'Greek',
    pl: 'Polish',
    pt: 'Portuguese',
    ru: 'Russian',
    sv: 'Swedish',
    ta: 'Tamil',
    uk: 'Ukrainian',
    zh: 'Chinese',
    vi: 'Vietnamese',
    ko: 'Korean'
} as const;
