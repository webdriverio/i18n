---
id: customcommands
title: カスタムコマンド
---

`browser`インスタンスを独自のコマンドセットで拡張したい場合、ブラウザメソッド`addCommand`がその目的のために用意されています。スペックの中と同じように、非同期方式でコマンドを書くことができます。

## パラメータ

### コマンド名

コマンドを定義し、ブラウザまたは要素のスコープに付加される名前。

型: `String`

### カスタム関数

コマンドが呼び出されたときに実行される関数。`this`スコープは、コマンドがブラウザスコープに付加されるか要素スコープに付加されるかによって、[`WebdriverIO.Browser`](/docs/api/browser)または[`WebdriverIO.Element`](/docs/api/element)のいずれかになります。

型: `Function`

### ターゲットスコープ

コマンドをブラウザスコープに付加するか要素スコープに付加するかを決定するフラグ。`true`に設定すると、コマンドは要素コマンドになります。

型: `Boolean`<br />
デフォルト: `false`

## 例

この例では、現在のURLとタイトルを1つの結果として返す新しいコマンドを追加する方法を示しています。スコープ(`this`)は[`WebdriverIO.Browser`](/docs/api/browser)オブジェクトです。

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

さらに、最後の引数として`true`を渡すことで、要素インスタンスを独自のコマンドセットで拡張できます。この場合のスコープ(`this`)は[`WebdriverIO.Element`](/docs/api/element)オブジェクトです。

```js
browser.addCommand("waitAndClick", async function () {
    // `this`は$(selector)の戻り値です
    await this.waitForDisplayed()
    await this.click()
}, true)
```

カスタムコマンドは、頻繁に使用する特定のコマンドシーケンスを単一の呼び出しにまとめる機会を提供します。テストスイートの任意の時点でカスタムコマンドを定義できます。ただし、最初に使用する前にコマンドが定義されていることを確認してください（`wdio.conf.js`の`before`フックは、それらを作成するのに適した場所の1つです）。

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

__注意：__ `browser`スコープにカスタムコマンドを登録すると、そのコマンドは要素からアクセスできなくなります。同様に、要素スコープにコマンドを登録すると、`browser`スコープからはアクセスできなくなります：

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // "function"を出力
console.log(typeof elem.myCustomBrowserCommand()) // "undefined"を出力

browser.addCommand("myCustomElementCommand", () => { return 1 }, true)
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // "undefined"を出力
console.log(await elem2.myCustomElementCommand('foobar')) // "1"を出力

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // "undefined"を出力
console.log(await elem3.myCustomElementCommand2('foobar')) // "2"を出力
```

__注意：__ カスタムコマンドをチェーンする必要がある場合、コマンドは`$`で終わる必要があります。

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

あまりにも多くのカスタムコマンドで`browser`スコープを過負荷にしないように注意してください。

カスタムロジックは[ページオブジェクト](pageobjects)で定義することをお勧めします。そうすれば、特定のページに結びついたものになります。

### Multiremote

`addCommand`はマルチリモートでも同様に機能しますが、新しいコマンドは子インスタンスに伝播します。マルチリモートの`browser`とその子インスタンスは異なる`this`を持っているため、`this`オブジェクトを使用する際には注意が必要です。

この例では、マルチリモート用に新しいコマンドを追加する方法を示しています。

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this`は以下を参照します：
    //      - ブラウザのMultiRemoteBrowserスコープ
    //      - インスタンスのBrowserスコープ
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
2. a. モジュールスタイルの型定義ファイル（型定義ファイル内で import/export と `declare global WebdriverIO` を使用）を使用する場合は、`tsconfig.json`の`include`プロパティにファイルパスを必ず含めます。

   b. アンビエントスタイルの型定義ファイル（型定義ファイル内にimport/exportがなく、カスタムコマンドに`declare namespace WebdriverIO`を使用）を使用する場合は、`tsconfig.json`に`include`セクションが含まれていないことを確認してください。含まれていると、`include`セクションにリストされていない型定義ファイルがTypeScriptによって認識されなくなります。

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

## サードパーティライブラリの統合

プロミスをサポートする外部ライブラリ（例：データベース呼び出し用）を使用する場合、特定のAPIメソッドをカスタムコマンドでラップするのは良いアプローチです。

プロミスを返すと、WebdriverIOはプロミスが解決されるまで次のコマンドに進まないことを保証します。プロミスが拒否された場合、コマンドはエラーをスローします。

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

そして、WDIOテスト仕様でそれを使用するだけです：

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // レスポンスボディを返す
})
```

**注意：** カスタムコマンドの結果は、返すプロミスの結果です。

## コマンドの上書き

`overwriteCommand`を使用してネイティブコマンドを上書きすることもできます。

フレームワークの予測不可能な動作を引き起こす可能性があるため、これは推奨されません！

全体的なアプローチは`addCommand`と似ていますが、唯一の違いは、コマンド関数の最初の引数が上書きしようとしているオリジナルの関数であることです。以下に例を示します。

### ブラウザコマンドの上書き

```js
/**
 * pause前にミリ秒を出力し、その値を返します。
 */
// 'pause'            - 上書きするコマンドの名前
// origPauseFunction  - 元のpause関数
browser.overwriteCommand('pause', async (origPauseFunction, ms) => {
    console.log(`sleeping for ${ms}`)
    await origPauseFunction(ms)
    return ms
})

// 以前と同じように使用する
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### 要素コマンドの上書き

要素レベルでのコマンドの上書きもほぼ同じです。`overwriteCommand`の第3引数として`true`を渡すだけです：

```js
/**
 * 要素がクリック可能でない場合、要素までスクロールを試みます。
 * { force: true }を渡すと、要素が表示されていないかクリック可能でなくてもJSでクリックします。
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

                // 要素までスクロールして再度クリックする
                await this.scrollIntoView()
                return origClickFunction()
            }
            throw err
        }
    }

    // JSでクリックする
    console.warn('WARN: Using force click for', this.selector)
    await browser.execute((el) => {
        el.click()
    }, this)
}, true) // 第3引数として`true`を渡すことを忘れないでください

// 以前と同じように使用する
const elem = await $('body')
await elem.click()

// またはパラメータを渡す
await elem.click({ force: true })
```

## より多くのWebDriverコマンドの追加

WebDriverプロトコルを使用し、[`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)のプロトコル定義で定義されていない追加コマンドをサポートするプラットフォームでテストを実行する場合、`addCommand`インターフェースを通じて手動で追加できます。`webdriver`パッケージは、他のコマンドと同じ方法でこれらの新しいエンドポイントを登録できるコマンドラッパーを提供し、同じパラメータチェックとエラー処理を提供します。この新しいエンドポイントを登録するには、コマンドラッパーをインポートし、次のように新しいコマンドを登録します：

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
// 必須のURLパラメータとペイロードなしでコマンドを呼び出す
await browser.myNewCommand()

/**
 * 以下のようなエラーが発生します：
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

コマンドを正しく呼び出す（例：`browser.myNewCommand('foo', 'bar')`）と、WebDriverリクエストが正しく`http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo`などに`{ foo: 'bar' }`のようなペイロードで送信されます。

:::note
`:sessionId` URLパラメータはWebDriverセッションのセッションIDで自動的に置き換えられます。他のURLパラメータも適用できますが、`variables`内で定義する必要があります。
:::

プロトコルコマンドの定義方法の例については、[`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)パッケージを参照してください。