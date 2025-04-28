---
id: customcommands
title: カスタムコマンド
---

`browser`インスタンスを独自のコマンドセットで拡張したい場合、ブラウザメソッド`addCommand`がその目的のために用意されています。スペックでの記述と同様に、非同期的な方法でコマンドを記述することができます。

## パラメータ

### コマンド名

コマンドを定義し、ブラウザまたは要素のスコープに追加される名前。

タイプ: `String`

### カスタム関数

コマンドが呼び出されたときに実行される関数。`this`スコープは、コマンドがブラウザスコープに追加されるか要素スコープに追加されるかによって、[`WebdriverIO.Browser`](/docs/api/browser)または[`WebdriverIO.Element`](/docs/api/element)のいずれかになります。

タイプ: `Function`

### ターゲットスコープ

コマンドをブラウザスコープに追加するか要素スコープに追加するかを決定するフラグ。`true`に設定すると、コマンドは要素コマンドになります。

タイプ: `Boolean`<br />
デフォルト: `false`

## 例

この例では、現在のURLとタイトルを1つの結果として返す新しいコマンドを追加する方法を示しています。スコープ（`this`）は[`WebdriverIO.Browser`](/docs/api/browser)オブジェクトです。

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this`は`browser`スコープを参照します
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

さらに、最後の引数として`true`を渡すことで、要素インスタンスを独自のコマンドセットで拡張することができます。この場合のスコープ（`this`）は[`WebdriverIO.Element`](/docs/api/element)オブジェクトです。

```js
browser.addCommand("waitAndClick", async function () {
    // `this`は$(selector)の戻り値です
    await this.waitForDisplayed()
    await this.click()
}, true)
```

カスタムコマンドを使用すると、頻繁に使用する特定のコマンドシーケンスを単一の呼び出しにまとめることができます。テストスイートのどの時点でもカスタムコマンドを定義できますが、最初に使用する前にコマンドが定義されていることを確認してください（`wdio.conf.js`の`before`フックはコマンドを作成するのに適した場所の一つです）。

定義したら、次のように使用できます：

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__注意:__ カスタムコマンドを`browser`スコープに登録すると、そのコマンドは要素からアクセスできなくなります。同様に、コマンドを要素スコープに登録すると、`browser`スコープからアクセスできなくなります：

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // "function"と出力されます
console.log(typeof elem.myCustomBrowserCommand()) // "undefined"と出力されます

browser.addCommand("myCustomElementCommand", () => { return 1 }, true)
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // "undefined"と出力されます
console.log(await elem2.myCustomElementCommand('foobar')) // "1"と出力されます

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // "undefined"と出力されます
console.log(await elem3.myCustomElementCommand2('foobar')) // "2"と出力されます
```

__注意:__ カスタムコマンドをチェーンする必要がある場合、コマンドは`$`で終わる必要があります。

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

あまりにも多くのカスタムコマンドで`browser`スコープを過負荷にしないように注意してください。

カスタムロジックは[ページオブジェクト](pageobjects)で定義することをお勧めします。これにより、特定のページにバインドされます。

### マルチリモート

`addCommand`はマルチリモートでも同様に機能しますが、新しいコマンドは子インスタンスに伝播します。マルチリモートの`browser`とその子インスタンスは異なる`this`を持つため、`this`オブジェクトを使用する際には注意が必要です。

この例では、マルチリモート用の新しいコマンドを追加する方法を示しています。

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this`が参照するもの：
    //      - ブラウザの場合はMultiRemoteBrowserスコープ
    //      - インスタンスの場合はBrowserスコープ
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiremotebrowser.getUrlAndTitle()
/*
{
    url: [ 'https://webdriver.io/', 'https://webdriver.io/' ],
    title: [
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO'
    ],
    customVar: undefined
}
*/

multiremotebrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## 型定義の拡張

TypeScriptを使用すると、WebdriverIOインターフェースを簡単に拡張できます。カスタムコマンドに次のように型を追加します：

1. 型定義ファイルを作成します（例：`./src/types/wdio.d.ts`）
2. a. モジュール形式の型定義ファイルを使用する場合（型定義ファイルでimport/exportと`declare global WebdriverIO`を使用）、`tsconfig.json`の`include`プロパティにファイルパスを含めるようにしてください。

   b. アンビエント形式の型定義ファイルを使用する場合（型定義ファイルにimport/exportがなく、カスタムコマンドに`declare namespace WebdriverIO`を使用）、`tsconfig.json`に`include`セクションが含まれていないことを確認してください。これにより、`include`セクションにリストされていない型定義ファイルがTypeScriptによって認識されなくなる可能性があります。

<Tabs
  defaultValue="modules"
  values={[
    {label: 'モジュール（import/exportを使用）', value: 'modules'},
    {label: 'アンビエント型定義（tsconfigにincludeなし）', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```json title="tsconfig.json"
{
    "compilerOptions": { ... },
    "include": [
        "./test/**/*.ts",
        "./src/types/**/*.ts"
    ]
}
```

</TabItem>
<TabItem value="ambient">

```json title="tsconfig.json"
{
    "compilerOptions": { ... }
}
```

</TabItem>
</Tabs>

3. 実行モードに応じてコマンドの定義を追加します。

<Tabs
  defaultValue="modules"
  values={[
    {label: 'モジュール（import/exportを使用）', value: 'modules'},
    {label: 'アンビエント型定義', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```typescript
declare global {
    namespace WebdriverIO {
        interface Browser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface MultiRemoteBrowser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface Element {
            elementCustomCommand: (arg: any) => Promise<number>
        }
    }
}
```

</TabItem>
<TabItem value="ambient">

```typescript
declare namespace WebdriverIO {
    interface Browser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface MultiRemoteBrowser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface Element {
        elementCustomCommand: (arg: any) => Promise<number>
    }
}
```

</TabItem>
</Tabs>

## サードパーティーライブラリの統合

プロミスをサポートする外部ライブラリ（例：データベース呼び出しを行うライブラリ）を使用する場合、それらを統合する良い方法は、特定のAPIメソッドをカスタムコマンドでラップすることです。

プロミスを返すと、WebdriverIOはプロミスが解決されるまで次のコマンドに進まないようにします。プロミスが拒否された場合、コマンドはエラーをスローします。

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

その後、WDIOテスト仕様で次のように使用します：

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // レスポンスボディを返します
})
```

**注意：** カスタムコマンドの結果は、返すプロミスの結果です。

## コマンドの上書き

`overwriteCommand`を使用してネイティブコマンドを上書きすることもできます。

フレームワークの予測不可能な動作につながる可能性があるため、これを行うことはお勧めしません！

全体的なアプローチは`addCommand`と類似していますが、唯一の違いは、コマンド関数の最初の引数が上書きしようとしている元の関数であることです。以下に例を示します。

### ブラウザコマンドの上書き

```js
/**
 * pause前にミリ秒を表示し、その値を返します。
 */
// 'pause'            - 上書きするコマンドの名前
// origPauseFunction  - 元のpause関数
browser.overwriteCommand('pause', async (origPauseFunction, ms) => {
    console.log(`sleeping for ${ms}`)
    await origPauseFunction(ms)
    return ms
})

// その後、以前と同じように使用します
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### 要素コマンドの上書き

要素レベルでのコマンドの上書きもほぼ同じです。`overwriteCommand`の第3引数として`true`を渡すだけです：

```js
/**
 * 要素がクリック可能でない場合は、要素までスクロールしてみます。
 * { force: true }を渡すと、要素が表示されていないか、クリック可能でなくてもJSでクリックします。
 */
// 'click'            - 上書きするコマンドの名前
// origClickFunction  - 元のclick関数
browser.overwriteCommand('click', async function (origClickFunction, { force = false } = {}) {
    if (!force) {
        try {
            // クリックを試みる
            await origClickFunction()
            return null
        } catch (err) {
            if (err.message.includes('not clickable at point')) {
                console.warn('WARN: Element', this.selector, 'is not clickable.',
                    'Scrolling to it before clicking again.')

                // 要素までスクロールして再度クリック
                await this.scrollIntoView()
                return origClickFunction()
            }
            throw err
        }
    }

    // JSでクリック
    console.warn('WARN: Using force click for', this.selector)
    await browser.execute((el) => {
        el.click()
    }, this)
}, true) // 第3引数として`true`を渡すことを忘れないでください

// その後、以前と同じように使用します
const elem = await $('body')
await elem.click()

// またはパラメータを渡します
await elem.click({ force: true })
```

## WebDriverコマンドの追加

WebDriverプロトコルを使用し、[`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)に定義されていないプロトコル定義によってサポートされていない追加コマンドをサポートするプラットフォームでテストを実行している場合、`addCommand`インターフェースを通じて手動で追加できます。`webdriver`パッケージは、これらの新しいエンドポイントを他のコマンドと同じ方法で登録できるコマンドラッパーを提供し、同じパラメータチェックとエラー処理を提供します。この新しいエンドポイントを登録するには、コマンドラッパーをインポートし、次のように新しいコマンドとして登録します：

```js
import { command } from 'webdriver'

browser.addCommand('myNewCommand', command('POST', '/session/:sessionId/foobar/:someId', {
    command: 'myNewCommand',
    description: 'a new WebDriver command',
    ref: 'https://vendor.com/commands/#myNewCommand',
    variables: [{
        name: 'someId',
        description: 'some id to something'
    }],
    parameters: [{
        name: 'foo',
        type: 'string',
        description: 'a valid parameter',
        required: true
    }]
}))
```

無効なパラメータでこのコマンドを呼び出すと、事前定義されたプロトコルコマンドと同じエラー処理が行われます。例えば：

```js
// 必須のURLパラメータとペイロードなしでコマンドを呼び出す
await browser.myNewCommand()

/**
 * 次のようなエラーが発生します：
 * Error: Wrong parameters applied for myNewCommand
 * Usage: myNewCommand(someId, foo)
 *
 * Property Description:
 *   "someId" (string): some id to something
 *   "foo" (string): a valid parameter
 *
 * For more info see https://my-api.com
 *    at Browser.protocolCommand (...)
 *    ...
 */
```

コマンドを正しく呼び出す（例：`browser.myNewCommand('foo', 'bar')`）と、WebDriverリクエストが正しく作成され、例えば`http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo`に`{ foo: 'bar' }`のようなペイロードでリクエストが送信されます。

:::note
`:sessionId`URLパラメータはWebDriverセッションのセッションIDで自動的に置き換えられます。他のURLパラメータも適用できますが、`variables`内で定義する必要があります。
:::

プロトコルコマンドが定義される方法の例については、[`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)パッケージを参照してください。