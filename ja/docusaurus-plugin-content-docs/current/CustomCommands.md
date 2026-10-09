---
id: customcommands
title: カスタムコマンド
description: "addCommand を使って独自のブラウザコマンドや要素コマンドを追加し、既存のコマンドを上書きし、TypeScript の型定義を拡張します。"
---

独自のコマンドセットで `browser` インスタンスを拡張したい場合は、ブラウザメソッド `addCommand` を使用できます。コマンドは、スペックと同じように非同期で記述できます。

## パラメータ

### コマンド名

<Option type="String">

コマンドを定義する名前で、ブラウザまたは要素のスコープにアタッチされます。

</Option>

### カスタム関数

<Option type="Function">

コマンドが呼び出されたときに実行される関数です。`this` スコープは、コマンドがブラウザ、要素、ブラウジングコンテキストのいずれにアタッチされるかに応じて、[`WebdriverIO.Browser`](/docs/api/browser)、[`WebdriverIO.Element`](/docs/api/element)、または `WebdriverIO.BrowsingContext` になります。

</Option>

### オプション

カスタムコマンドの動作を変更する設定オプションのオブジェクト

#### ターゲットスコープ

<Option type="Boolean" default="false" name="attachToElement">

コマンドをブラウザスコープと要素スコープのどちらにアタッチするかを決定するフラグです。`true` に設定すると、コマンドは要素コマンドになります。

</Option>

<Option type="Boolean" default="false" name="attachToBrowsingContext">

すべてのブラウジングコンテキスト、つまり WebDriver BiDi セッションにおいて `browser.url()`、`browser.newWindow()`、`browser.browsingContexts()`、`context.frame()` が返すタブ、ウィンドウ、フレームにコマンドをアタッチするためのフラグです。`attachToElement` と組み合わせることはできません。[ブラウジングコンテキスト](#browsing-contexts)を参照してください。

</Option>

#### implicitWait の無効化

<Option type="Boolean" default="false" name="disableElementImplicitWait">

カスタムコマンドを呼び出す前に、要素が存在するまで暗黙的に待機するかどうかを決定するフラグです。

</Option>

## 例

この例では、現在の URL とタイトルを1つの結果として返す新しいコマンドを追加する方法を示します。スコープ（`this`）は [`WebdriverIO.Browser`](/docs/api/browser) オブジェクトです。

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` は `browser` スコープを参照します
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

さらに、`attachToElement` を `true` に設定することで、独自のコマンドセットで要素インスタンスを拡張することもできます。この場合のスコープ（`this`）は [`WebdriverIO.Element`](/docs/api/element) オブジェクトです。

```js
browser.addCommand("waitAndClick", async function () {
    // `this` は $(selector) の戻り値です
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

デフォルトでは、要素のカスタムコマンドは、カスタムコマンドを呼び出す前に要素が存在するまで待機します。ほとんどの場合これは望ましい動作ですが、そうでない場合は `disableImplicitWait` で無効にできます：

```js
browser.addCommand("waitAndClick", async function () {
    // `this` は $(selector) の戻り値です
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```

カスタムコマンドを使用すると、頻繁に使用する特定の一連のコマンドを1回の呼び出しにまとめることができます。カスタムコマンドはテストスイートのどの時点でも定義できますが、コマンドが最初に使用される*前に*定義されていることを確認してください。（`wdio.conf.js` の `before` フックは、コマンドを作成するのに適した場所の1つです。）

定義すると、次のように使用できます：

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__注意:__ カスタムコマンドを `browser` スコープに登録した場合、そのコマンドは要素からはアクセスできません。同様に、コマンドを要素スコープに登録した場合、`browser` スコープからはアクセスできません：

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // "function" を出力
console.log(typeof elem.myCustomBrowserCommand()) // "undefined" を出力

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // "undefined" を出力
console.log(await elem2.myCustomElementCommand('foobar')) // "1" を出力

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // "undefined" を出力
console.log(await elem3.myCustomElementCommand2('foobar')) // "2" を出力
```

__注意:__ カスタムコマンドをチェーンする必要がある場合、コマンド名は `$` で終わる必要があります。

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

`browser` スコープに過剰な数のカスタムコマンドを詰め込まないように注意してください。

カスタムロジックは[ページオブジェクト](pageobjects)で定義し、特定のページに紐付けることをお勧めします。

### ブラウジングコンテキスト

WebDriver BiDi セッションでは、タブ、ウィンドウ、フレームはそれぞれ `WebdriverIO.BrowsingContext` です。`attachToBrowsingContext` を `true` に設定すると、それらすべてにコマンドを追加できます。スコープ（`this`）はコマンドが呼び出されたコンテキストであり、`this.browser` はそのコンテキストが属するブラウザです：

```js
browser.addCommand('heading', async function () {
    // `this` はタブ、ウィンドウ、またはフレームです
    return this.$('h1').getText()
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
console.log(await page.heading())

const frame = await page.frame('iframe')
console.log(await frame.heading())
```

このコマンドは、既に存在するコンテキストと、後から作成されるすべてのコンテキスト（別オリジンのフレームを含む）で使用できます。タブやウィンドウでのみ意味を持つコマンドは、`this.isFrame` をチェックできます。

ブラウジングコンテキスト自体に対して `addCommand` や `overwriteCommand` を呼び出すと例外がスローされます。コマンドはブラウザに登録してください。

### マルチリモート

`addCommand` はマルチリモートでも同様に機能しますが、新しいコマンドは子インスタンスにも伝播されます。マルチリモートの `browser` とその子インスタンスでは `this` が異なるため、`this` オブジェクトを使用する際には注意が必要です。

この例では、マルチリモート用の新しいコマンドを追加する方法を示します。

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` は以下を参照します:
    //      - browser の場合は MultiRemoteBrowser スコープ
    //      - インスタンスの場合は Browser スコープ
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiRemoteBrowser.getUrlAndTitle()
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

multiRemoteBrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## 型定義の拡張

TypeScript を使用すると、WebdriverIO のインターフェースを簡単に拡張できます。次のようにカスタムコマンドに型を追加します：

1. 型定義ファイルを作成します（例：`./src/types/wdio.d.ts`）
2. a. モジュール形式の型定義ファイル（型定義ファイル内で import/export と `declare global WebdriverIO` を使用）を使用する場合は、`tsconfig.json` の `include` プロパティにファイルパスを含めてください。

   b. アンビエント形式の型定義ファイル（型定義ファイル内で import/export を使用せず、カスタムコマンドに `declare namespace WebdriverIO` を使用）を使用する場合は、`tsconfig.json` に `include` セクションが含まれて*いない*ことを確認してください。`include` セクションがあると、そこに記載されていないすべての型定義ファイルが TypeScript に認識されなくなります。

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions (no tsconfig include)', value: 'ambient'},
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

3. 実行モードに応じて、コマンドの定義を追加します。

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions', value: 'ambient'},
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

        interface BrowsingContext {
            contextCustomCommand: (arg: any) => Promise<string>
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

    interface BrowsingContext {
        contextCustomCommand: (arg: any) => Promise<string>
    }
}
```

</TabItem>
</Tabs>

## サードパーティライブラリの統合

Promise をサポートする外部ライブラリ（例：データベース呼び出しを行うもの）を使用する場合、それらを統合する良い方法は、特定の API メソッドをカスタムコマンドでラップすることです。

Promise を返すと、WebdriverIO は Promise が解決されるまで次のコマンドに進まないようにします。Promise が拒否された場合、コマンドはエラーをスローします。

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

あとは、WDIO のテストスペックで使用するだけです：

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // レスポンスボディを返します
})
```

**注意:** カスタムコマンドの結果は、返した Promise の結果になります。

## コマンドの上書き

`overwriteCommand` を使用して、ネイティブコマンドを上書きすることもできます。

フレームワークの予測できない動作につながる可能性があるため、これは推奨されません！

全体的なアプローチは `addCommand` と似ていますが、唯一の違いは、コマンド関数の最初の引数が上書きしようとしている元の関数であることです。以下の例を参照してください。

### ブラウザコマンドの上書き

```js
/**
 * pause の前にミリ秒を出力し、その値を返します。
 *
 * @param pause - 上書きするコマンドの名前
 * @param this of func - 関数が呼び出された元のブラウザインスタンス
 * @param originalPauseFunction of func - 元の pause 関数
 * @param ms of func - 実際に渡されたパラメータ
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// その後、以前と同じように使用します
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### 要素コマンドの上書き

要素レベルでのコマンドの上書きもほぼ同じです。`attachToElement` を `true` に設定します：

```js
/**
 * 要素がクリック可能でない場合、要素までスクロールを試みます。
 * 要素が表示されていない、またはクリック可能でない場合でも JS でクリックするには { force: true } を渡します。
 * `options?: ClickOptions` で元の関数の引数の型を維持できることを示します
 *
 * @param this of func - 元の関数が呼び出された要素
 * @param originalClickFunction of func - 元の pause 関数
 * @param options of func - 実際に渡されたパラメータ
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // クリックを試みる
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // 要素までスクロールして再度クリック
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // js でクリック
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // 要素にアタッチすることを忘れないでください
)

// その後、以前と同じように使用します
const elem = await $('body')
await elem.click()

// またはパラメータを渡します
await elem.click({ force: true })
```

### ブラウジングコンテキストコマンドの上書き

`attachToBrowsingContext` を `true` に設定すると、すべてのタブ、ウィンドウ、フレームの組み込みコマンドまたはカスタムコマンドを上書きできます。元のコマンドは、呼び出されたコンテキストにバインドされます：

```js
browser.overwriteCommand('getTitle', async function (this, originalGetTitle) {
    const title = await originalGetTitle()
    return this.isFrame ? `frame: ${title}` : title
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
const frame = await page.frame('iframe')
console.log(await frame.getTitle()) // "frame: ..."
```

## WebDriver コマンドの追加

WebDriver プロトコルを使用していて、[`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) のどのプロトコル定義にも定義されていない追加コマンドをサポートするプラットフォームでテストを実行する場合は、`addCommand` インターフェースを通じて手動で追加できます。`webdriver` パッケージは、これらの新しいエンドポイントを他のコマンドと同じ方法で登録できるコマンドラッパーを提供しており、同じパラメータチェックとエラー処理を備えています。この新しいエンドポイントを登録するには、コマンドラッパーをインポートし、次のように新しいコマンドを登録します：

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

無効なパラメータでこのコマンドを呼び出すと、事前定義されたプロトコルコマンドと同じエラー処理が行われます。例：

```js
// 必須の url パラメータとペイロードなしでコマンドを呼び出す
await browser.myNewCommand()

/**
 * 次のエラーが発生します:
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

コマンドを正しく呼び出すと（例：`browser.myNewCommand('foo', 'bar')`）、`{ foo: 'bar' }` のようなペイロードで、例えば `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` に WebDriver リクエストが正しく送信されます。

:::note
`:sessionId` url パラメータは、WebDriver セッションのセッション ID に自動的に置き換えられます。他の url パラメータも適用できますが、`variables` 内で定義する必要があります。
:::

プロトコルコマンドの定義方法の例については、[`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) パッケージを参照してください。