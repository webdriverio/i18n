---
id: customcommands
title: カスタムコマンド
---

`browser`インスタンスを独自のコマンドセットで拡張したい場合は、ブラウザメソッド`addCommand`がその目的のために用意されています。スペックと同様に、非同期方式でコマンドを記述することができます。

## パラメータ

### コマンド名

コマンドを定義し、ブラウザまたは要素のスコープに追加される名前。

タイプ: `String`

### カスタム関数

コマンドが呼び出されたときに実行される関数。`this`スコープは、コマンドがブラウザスコープに付加されるか要素スコープに付加されるかによって、[`WebdriverIO.Browser`](/docs/api/browser)または[`WebdriverIO.Element`](/docs/api/element)のいずれかになります。

タイプ: `Function`

### オプション

カスタムコマンドの動作を修正する設定オプションを含むオブジェクト

#### ターゲットスコープ

コマンドをブラウザスコープに付加するか要素スコープに付加するかを決定するフラグ。`true`に設定すると、コマンドは要素コマンドになります。

オプション名: `attachToElement`
タイプ: `Boolean`<br />
デフォルト: `false`

#### implicitWaitの無効化

カスタムコマンドを呼び出す前に、要素が存在するのを暗黙的に待つかどうかを決定するフラグ。

オプション名: `disableElementImplicitWait`
タイプ: `Boolean`<br />
デフォルト: `false`

## 例

この例では、現在のURLとタイトルを1つの結果として返す新しいコマンドを追加する方法を示しています。スコープ(`this`)は[`WebdriverIO.Browser`](/docs/api/browser)オブジェクトです。

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` refers to the `browser` scope
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

さらに、最後の引数として`true`を渡すことで、要素インスタンスを独自のコマンドセットで拡張することもできます。この場合、スコープ(`this`)は[`WebdriverIO.Element`](/docs/api/element)オブジェクトです。

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

デフォルトでは、要素カスタムコマンドはカスタムコマンドを呼び出す前に要素が存在するのを待ちます。これは多くの場合望ましいですが、必要でない場合は`disableImplicitWait`で無効にできます：

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


カスタムコマンドを使用すると、頻繁に使用する特定のコマンドシーケンスを単一の呼び出しにまとめることができます。テストスイートの任意の場所でカスタムコマンドを定義できますが、最初に使用する前にコマンドが定義されていることを確認してください（`wdio.conf.js`の`before`フックは作成に適した場所の一つです）。

定義後は、次のように使用できます：

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
console.log(typeof browser.myCustomBrowserCommand) // outputs "function"
console.log(typeof elem.myCustomBrowserCommand()) // outputs "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // outputs "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // outputs "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // outputs "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // outputs "2"
```

__注意:__ カスタムコマンドをチェーンする必要がある場合、コマンドは`$`で終わるべきです。

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

あまりにも多くのカスタムコマンドで`browser`スコープを過負荷にしないように注意してください。

カスタムロジックは[ページオブジェクト](pageobjects)で定義することをお勧めします。そうすることで、特定のページに関連付けられます。

### Multiremote

`addCommand`はmultiremoteでも同様に動作しますが、新しいコマンドは子インスタンスに伝播します。マルチリモートの`browser`とその子インスタンスは異なる`this`を持つため、`this`オブジェクトを使用する際には注意が必要です。

この例は、マルチリモート用の新しいコマンドを追加する方法を示しています。

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` refers to:
    //      - MultiRemoteBrowser scope for browser
    //      - Browser scope for instances
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

TypeScriptを使えば、WebdriverIOインターフェースを簡単に拡張できます。カスタムコマンドに型を追加するには以下のようにします：

1. 型定義ファイルを作成します（例：`./src/types/wdio.d.ts`）
2. a. モジュールスタイルの型定義ファイル（型定義ファイル内で import/export と `declare global WebdriverIO` を使用）を使用する場合、ファイルパスを `tsconfig.json` の `include` プロパティに含めるようにしてください。

   b. アンビエントスタイルの型定義ファイル（型定義ファイルに import/export がなく、カスタムコマンドに `declare namespace WebdriverIO` を使用）を使用する場合、`tsconfig.json` に `include` セクションが含まれていないことを確認してください。これは、`include` セクションに記載されていない型定義ファイルが TypeScript に認識されなくなるためです。

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

3. 実行モードに応じてコマンドの定義を追加します。

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

プロミスをサポートする外部ライブラリ（データベース呼び出しを行うなど）を使用する場合、それらを統合するための良いアプローチは、特定のAPIメソッドをカスタムコマンドでラップすることです。

プロミスを返すとき、WebdriverIOはプロミスが解決されるまで次のコマンドに進まないようにします。プロミスが拒否された場合、コマンドはエラーをスローします。

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

その後、WDIOテスト仕様で次のように使用できます：

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // returns response body
})
```

**注意:** カスタムコマンドの結果は、返すプロミスの結果です。

## コマンドの上書き

`overwriteCommand`を使用してネイティブコマンドを上書きすることもできます。

これはフレームワークの予測不可能な動作を引き起こす可能性があるため、推奨されません！

全体的なアプローチは`addCommand`と似ていますが、唯一の違いはコマンド関数の最初の引数が上書きしようとしている元の関数であることです。以下にいくつかの例を示します。

### ブラウザコマンドの上書き

```js
/**
 * Print milliseconds before pause and return its value.
 * 
 * @param pause - name of command to be overwritten
 * @param this of func - the original browser instance on which the function was called
 * @param originalPauseFunction of func - the original pause function
 * @param ms of func - the actual parameters passed
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// then use it as before
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### 要素コマンドの上書き

要素レベルでのコマンドの上書きはほぼ同じです。単に`overwriteCommand`の第3引数として`true`を渡します：

```js
/**
 * Attempt to scroll to element if it is not clickable.
 * Pass { force: true } to click with JS even if element is not visible or clickable.
 * Show that the original function argument type can be kept with `options?: ClickOptions`
 *
 * @param this of func - the element on which the original function was called
 * @param originalClickFunction of func - the original pause function
 * @param options of func - the actual parameters passed
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // attempt to click
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // scroll to element and click again
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // clicking with js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // Don't forget to attach it to the element
)

// then use it as before
const elem = await $('body')
await elem.click()

// or pass params
await elem.click({ force: true })
```

## WebDriverコマンドの追加

WebDriverプロトコルを使用し、[`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)のプロトコル定義で定義されていない追加コマンドをサポートするプラットフォームでテストを実行している場合、`addCommand`インターフェースを通じて手動でそれらを追加できます。`webdriver`パッケージは、これらの新しいエンドポイントを他のコマンドと同じ方法で登録できるコマンドラッパーを提供し、同じパラメータチェックとエラー処理を提供します。この新しいエンドポイントを登録するには、コマンドラッパーをインポートし、以下のように新しいコマンドを登録します：

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
// call command without required url parameter and payload
await browser.myNewCommand()

/**
 * results in the following error:
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

コマンドを正しく呼び出す場合（例：`browser.myNewCommand('foo', 'bar')`）、正しくWebDriverリクエストが例えば`http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo`に対して行われ、ペイロードは`{ foo: 'bar' }`のようになります。

:::note
`:sessionId` URLパラメータは、WebDriverセッションのセッションIDで自動的に置き換えられます。他のURLパラメータも適用できますが、`variables`内で定義する必要があります。
:::

プロトコルコマンドを定義する方法の例は、[`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)パッケージを参照してください。