import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'

process.env.ANTHROPIC_API_KEY ??= 'test'

const { sanitizeMarkdown, validateFrontmatter } = await import('../src/translate.js')
const { LANGUAGES_TO_TRANSLATE, ROOT_DIR } = await import('../src/constants.js')

test('sanitizeMarkdown removes LLM preamble and preserves valid frontmatter', () => {
    const raw = [
        "I'll translate the Markdown content from English to German as requested:",
        '',
        '---',
        'id: testmuai',
        'title: TestMu AI Barrierefreiheitstests',
        'description: "Aktivieren Sie TestMu AI Barrierefreiheitstests in Ihrer WebdriverIO-Suite."',
        '---',
        '',
        '# TestMu AI Barrierefreiheitstests',
    ].join('\n')

    const result = sanitizeMarkdown(raw)
    assert.equal(
        result,
        [
            '---',
            'id: testmuai',
            'title: TestMu AI Barrierefreiheitstests',
            'description: "Aktivieren Sie TestMu AI Barrierefreiheitstests in Ihrer WebdriverIO-Suite."',
            '---',
            '',
            '# TestMu AI Barrierefreiheitstests',
        ].join('\n')
    )
})

test('sanitizeMarkdown drops empty or null description lines from frontmatter', () => {
    for (const emptyDesc of ['description:', 'description: ', 'description: null', 'description: ~', 'description: ""', "description: ''"]) {
        const raw = [
            '---',
            'id: testmuai',
            'title: Test di Accessibilità TestMu AI (Precedentemente LambdaTest)',
            emptyDesc,
            '---',
            '',
            '# Body',
        ].join('\n')

        const result = sanitizeMarkdown(raw)
        assert.equal(
            result,
            [
                '---',
                'id: testmuai',
                'title: Test di Accessibilità TestMu AI (Precedentemente LambdaTest)',
                '---',
                '',
                '# Body',
            ].join('\n')
        )
    }
})

test('sanitizeMarkdown throws when frontmatter is missing or unclosed', () => {
    assert.throws(
        () => sanitizeMarkdown('`'),
        /missing a valid frontmatter block/
    )
    assert.throws(
        () => sanitizeMarkdown('---\nid: foo\ntitle: bar\n# No closing delimiter'),
        /missing a valid frontmatter block/
    )
    assert.throws(
        () => sanitizeMarkdown('---\ndescription: only description\n---\n# Missing id and title'),
        /missing required "id" or "title" field/
    )
})

test('validateFrontmatter rejects empty or null frontmatter fields', () => {
    assert.throws(
        () => validateFrontmatter('---\nid: testmuai\ntitle: Test\ndescription: null\n---\n\n# Body', 'it/LambdaTest.md'),
        /empty or null "description" field in it\/LambdaTest\.md/
    )
    assert.throws(
        () => validateFrontmatter('---\nid: testmuai\ntitle: \n---\n\n# Body', 'ru/LambdaTest.md'),
        /empty or null "title" field in ru\/LambdaTest\.md/
    )
})

test('all translated Markdown files have valid frontmatter without empty descriptions', async () => {
    for (const language of Object.keys(LANGUAGES_TO_TRANSLATE)) {
        const langDir = path.join(ROOT_DIR, language)
        const entries = await fs.readdir(langDir, { withFileTypes: true, recursive: true })
        for (const entry of entries) {
            if (!entry.isFile() || !entry.name.endsWith('.md')) {
                continue
            }
            const fullPath = path.join(entry.parentPath, entry.name)
            const relPath = path.relative(ROOT_DIR, fullPath)
            const content = await fs.readFile(fullPath, 'utf-8')
            validateFrontmatter(content, relPath)
        }
    }
})
