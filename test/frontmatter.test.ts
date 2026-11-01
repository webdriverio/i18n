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

test('sanitizeMarkdown removes stray post-frontmatter code fences, body labels, and outer trailing fences', () => {
    const faCapabilitiesRaw = [
        '```yaml',
        '---',
        'id: capabilities',
        'title: قابلیت‌ها',
        '---',
        '```',
        '',
        'بخش body:',
        'قابلیت، تعریفی برای یک رابط راه دور است.',
    ].join('\n')

    assert.equal(
        sanitizeMarkdown(faCapabilitiesRaw),
        [
            '---',
            'id: capabilities',
            'title: قابلیت‌ها',
            '---',
            '',
            'قابلیت، تعریفی برای یک رابط راه دور است.',
        ].join('\n')
    )

    const outerFencedRaw = [
        '```markdown',
        '---',
        'id: moveto',
        'title: moveTo',
        '---',
        '',
        '```js',
        'await $(selector).moveTo()',
        '```',
        '',
        '<table><tbody><tr><td>Text</td></tr></tbody></table>',
        '```',
    ].join('\n')

    assert.equal(
        sanitizeMarkdown(outerFencedRaw),
        [
            '---',
            'id: moveto',
            'title: moveTo',
            '---',
            '',
            '```js',
            'await $(selector).moveTo()',
            '```',
            '',
            '<table><tbody><tr><td>Text</td></tr></tbody></table>',
            '',
        ].join('\n')
    )
})

test('sanitizeMarkdown separates bare URLs from trailing non-ASCII text while preserving Markdown links and code', () => {
    const jaBoilerplateRaw = [
        '---',
        'id: boilerplate-projects',
        'title: ボイラープレートプロジェクト',
        '---',
        '',
        '- http://the-internet.herokuapp.comでのログインと[WebdriverIOネイティブデモアプリ](https://github.com/webdriverio/native-demo-app)のテスト例',
        '- Headspin Cloud（https://www.headspin.io/）でWebdriverIOテストを実行します。',
        '- `https://webdriver.ioに移動して`',
        '',
        '```js',
        '// https://webdriver.ioに移動して',
        '```',
    ].join('\n')

    assert.equal(
        sanitizeMarkdown(jaBoilerplateRaw),
        [
            '---',
            'id: boilerplate-projects',
            'title: ボイラープレートプロジェクト',
            '---',
            '',
            '- http://the-internet.herokuapp.com でのログインと[WebdriverIOネイティブデモアプリ](https://github.com/webdriverio/native-demo-app)のテスト例',
            '- Headspin Cloud（https://www.headspin.io/ ）でWebdriverIOテストを実行します。',
            '- `https://webdriver.ioに移動して`',
            '',
            '```js',
            '// https://webdriver.ioに移動して',
            '```',
        ].join('\n')
    )
})

test('validateFrontmatter rejects unbalanced code fences and bare URLs glued to non-ASCII text', () => {
    assert.throws(
        () => validateFrontmatter('---\nid: capabilities\ntitle: قابلیت‌ها\n---\n```\n\nBody text', 'fa/Capabilities.md'),
        /stray code fence or Body label after frontmatter in fa\/Capabilities\.md/
    )
    assert.throws(
        () => validateFrontmatter('---\nid: moveto\ntitle: moveTo\n---\n\nBody text\n```', 'fa/_moveTo.md'),
        /unbalanced fenced code blocks in fa\/_moveTo\.md/
    )
    assert.throws(
        () => validateFrontmatter('---\nid: boilerplate\ntitle: ボイラープレート\n---\n\nhttp://the-internet.herokuapp.comでのログインと[WebdriverIO](https://webdriver.io)', 'ja/BoilerplateProjects.md'),
        /bare URL without space before non-ASCII text in ja\/BoilerplateProjects\.md/
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
