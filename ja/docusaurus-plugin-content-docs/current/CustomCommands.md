---
id: customcommands
title: カスタムコマンド
---

`browser` インスタンスを独自のコマンドセットで拡張したい場合、ブラウザメソッド `addCommand` がその目的のために用意されています。仕様内と同様に、非同期的な方法でコマンドを記述できます。

## パラメータ

### コマンド名

コマンドを定義し、ブラウザまたは要素のスコープに追加される名前。

タイプ: `String`

### カスタム関数

コマンドが呼び出されたときに実行される関数。`this` スコープはコマンドがブラウザに追加されるか要素スコープに追加されるかによって、[`WebdriverIO.Browser`](/docs/api/browser) または [`WebdriverIO.Element`](/docs/api/element) のいずれかになります。

タイプ: `Function`

### オプション

カスタムコマンドの動作を変更する設定オプションを含むオブジェクト

#### ターゲットスコープ

コマンドをブラウザのスコープに追加するか、要素のスコープに追加するかを決定するフラグ。`true` に設定すると、コマンドは要素のコマンドになります。

オプション名: `attachToElement`
タイプ: `Boolean`<br />
デフォルト: `false`

#### implicitWait の無効化

カスタムコマンドを呼び出す前に、要素が存在することを暗黙的に待機するかどうかを決定するフラグ。

オプション名: `disableElementImplicitWait`
タイプ: `Boolean`<br />
デフォルト: `false`

## 例

この例では、現在のURLとタイトルを一つの結果として返す新しいコマンドを追加する方法を示しています。スコープ（`this`）は [`WebdriverIO.Browser`](/docs/api/browser) オブジェクトです。

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

さらに、最後の引数として `true` を渡すことにより、要素インスタンスを独自のコマンドセットで拡張できます。この場合のスコープ（`this`）は [`WebdriverIO.Element`](/docs/api/element) オブジェクトです。

```js
browser.addCommand("waitAndClick", async function () {
    // `this` は $(selector) の戻り値
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

デフォルトでは、要素カスタムコマンドはカスタムコマンドを呼び出す前に要素が存在するのを待ちます。ほとんどの場合これが望ましいですが、必要なければ `disableImplicitWait` で無効化できます：

```js
browser.addCommand("waitAndClick", async function () {
    // `this` は $(selector) の戻り値
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```

カスタムコマンドを使用すると、頻繁に使用する特定のコマンドシーケンスを単一の呼び出しとしてバンドルする機会が与えられます。テストスイートの任意の時点でカスタムコマンドを定義できます。コマンドが最初に使用される*前に*定義されていることを確認してください（`wdio.conf.js` の `before` フックはそれらを作成するのに適した場所の1つです）。

定義されると、以下のように使用できます：

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__注意：__ カスタムコマンドを `browser` スコープに登録すると、そのコマンドは要素からアクセスできなくなります。同様に、コマンドを要素スコープに登録すると、`browser` スコープからアクセスできなくなります：

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // 出力は "function"
console.log(typeof elem.myCustomBrowserCommand()) // 出力は "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // 出力は "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // 出力は "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // 出力は "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // 出力は "2"
```

__注意：__ カスタムコマンドをチェーンする必要がある場合は、コマンドを `$` で終わらせる必要があります。

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

あまりにも多くのカスタムコマンドで `browser` スコープを過負荷にしないように注意してください。

特定のページにバインドされるように、[ページオブジェクト](pageobjects)にカスタムロジックを定義することをお勧めします。

### マルチリモート

`addCommand` はマルチリモートでも同様に動作しますが、新しいコマンドは子インスタンスに伝播します。マルチリモート `browser` とその子インスタンスでは `this` オブジェクトが異なるため、その使用には注意が必要です。

この例では、マルチリモート用の新しいコマンドを追加する方法を示しています。

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` は以下を参照します：
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

TypeScriptを使用すると、WebdriverIOインターフェースを簡単に拡張できます。以下のようにカスタムコマンドに型を追加します：

1. 型定義ファイルを作成します（例：`./src/types/wdio.d.ts`）
2. a. モジュールスタイルの型定義ファイル（型定義ファイル内で import/export と `declare global WebdriverIO` を使用）を使用している場合は、`tsconfig.json` の `include` プロパティにファイルパスを必ず含めてください。

   b. 環境型定義ファイル（型定義ファイルに import/export がなく、カスタムコマンドに `declare namespace WebdriverIO` を使用）を使用している場合は、`tsconfig.json` に `include` セクションが*ない*ことを確認してください。これは、`include` セクションに記載されていない型定義ファイルがTypeScriptによって認識されなくなるためです。

<Tabs
  defaultValue="modules"
  values={[
    {label: 'モジュール（import/export を使用）', value: 'modules'},
    {label: '環境型定義（tsconfig include なし）', value: 'ambient'},
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
    {label: 'モジュール（import/export を使用）', value: 'modules'},
    {label: '環境型定義', value: 'ambient'},
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

## サードパーティライブラリの統合

プロミスをサポートする外部ライブラリ（データベース呼び出しを行うためのライブラリなど）を使用する場合、それらを統合する良い方法は、特定のAPIメソッドをカスタムコマンドでラップすることです。

プロミスを返すと、WebdriverIOはプロミスが解決されるまで次のコマンドに進まないようにします。プロミスが拒否された場合、コマンドはエラーをスローします。

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

その後、WDIOテスト仕様で以下のように使用できます：

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // レスポンスボディを返す
})
```

**注意：** カスタムコマンドの結果は、返すプロミスの結果です。

## コマンドの上書き

`overwriteCommand` を使用してネイティブコマンドを上書きすることもできます。

フレームワークの予測不可能な動作を引き起こす可能性があるため、これを行うことはお勧めしません！

全体的なアプローチは `addCommand` と似ていますが、唯一の違いはコマンド関数の最初の引数が上書きしようとしている元の関数であることです。以下にいくつかの例を示します。

### ブラウザコマンドの上書き

```js
/**
 * 一時停止前にミリ秒を表示し、その値を返します。
 *
 * @param pause - 上書きするコマンドの名前
 * @param this of func - 関数が呼び出された元のブラウザインスタンス
 * @param originalPauseFunction of func - 元のpause関数
 * @param ms of func - 実際に渡されたパラメータ
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// 以前と同様に使用
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### 要素コマンドの上書き

要素レベルでコマンドを上書きするのはほぼ同じです。単に `overwriteCommand` の第3引数として `true` を渡します：

```js
/**
 * 要素がクリック可能でない場合、要素までスクロールしようとします。
 * 要素が表示されていないか、クリック可能でない場合でもJSでクリックするには { force: true } を渡します。
 * 元の関数の引数タイプは `options?: ClickOptions` で保持できることを示します
 *
 * @param this of func - 元の関数が呼び出された要素
 * @param originalClickFunction of func - 元のpause関数
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

        // JSでクリック
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // 要素にアタッチすることを忘れないでください
)

// 以前と同様に使用
const elem = await $('body')
await elem.click()

// またはパラメータを渡す
await elem.click({ force: true })
```

## さらにWebDriverコマンドを追加する

WebDriverプロトコルを使用し、[`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)にあるプロトコル定義で定義されていない追加コマンドをサポートするプラットフォームでテストを実行している場合、`addCommand`インターフェースを通じて手動で追加できます。`webdriver`パッケージは、これらの新しいエンドポイントを他のコマンドと同じ方法で登録できるコマンドラッパーを提供し、同じパラメータチェックとエラー処理を提供します。この新しいエンドポイントを登録するには、コマンドラッパーをインポートして次のように新しいコマンドを登録します：

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

無効なパラメータでこのコマンドを呼び出すと、事前定義されたプロトコルコマンドと同じエラー処理が発生します。例：

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

コマンドを正しく呼び出す（例：`browser.myNewCommand('foo', 'bar')`）と、正確にWebDriverリクエストが例えば `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` にペイロード `{ foo: 'bar' }` で送信されます。

:::note
`:sessionId` URLパラメータはWebDriverセッションのセッションIDで自動的に置き換えられます。他のURLパラメータも適用できますが、`variables`内で定義する必要があります。
:::

プロトコルコマンドの定義方法の例は、[`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)パッケージを参照してください。