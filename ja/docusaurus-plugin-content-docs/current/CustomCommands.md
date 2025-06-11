---
id: customcommands
title: カスタムコマンド
---

`browser`インスタンスを独自のコマンドセットで拡張したい場合、ブラウザメソッド`addCommand`がその役割を果たします。仕様書と同様に、非同期方式でコマンドを記述することができます。

## パラメータ

### コマンド名

コマンドを定義し、ブラウザまたは要素のスコープに付加される名前。

タイプ：`String`

### カスタム関数

コマンドが呼び出されたときに実行される関数。`this`スコープは、コマンドがブラウザスコープに付加されるか要素スコープに付加されるかによって、[`WebdriverIO.Browser`](/docs/api/browser)または[`WebdriverIO.Element`](/docs/api/element)のいずれかになります。

タイプ：`Function`

### ターゲットスコープ

コマンドをブラウザスコープに付加するか要素スコープに付加するかを決定するフラグ。`true`に設定すると、コマンドは要素コマンドになります。

タイプ：`Boolean`<br />
デフォルト：`false`

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

さらに、最後の引数として`true`を渡すことで、要素インスタンスを独自のコマンドセットで拡張することができます。この場合、スコープ（`this`）は[`WebdriverIO.Element`](/docs/api/element)オブジェクトです。

```js
browser.addCommand("waitAndClick", async function () {
    // `this`は$(selector)の戻り値です
    await this.waitForDisplayed()
    await this.click()
}, true)
```

カスタムコマンドを使用すると、頻繁に使用する特定のコマンドシーケンスを単一の呼び出しにまとめることができます。テストスイートの任意の場所でカスタムコマンドを定義できますが、最初に使用する前にコマンドが定義されていることを確認してください。（`wdio.conf.js`の`before`フックはコマンドを作成するのに適した場所の一つです。）

定義後、次のように使用できます：

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__注意：__ `browser`スコープにカスタムコマンドを登録すると、そのコマンドは要素からアクセスできません。同様に、要素スコープにコマンドを登録すると、`browser`スコープからアクセスできません：

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // 「function」と出力
console.log(typeof elem.myCustomBrowserCommand()) // 「undefined」と出力

browser.addCommand("myCustomElementCommand", () => { return 1 }, true)
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // 「undefined」と出力
console.log(await elem2.myCustomElementCommand('foobar')) // 「1」と出力

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // 「undefined」と出力
console.log(await elem3.myCustomElementCommand2('foobar')) // 「2」と出力
```

__注意：__ カスタムコマンドをチェーンする必要がある場合、コマンドは`$`で終わるべきです。

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

`browser`スコープに多すぎるカスタムコマンドを追加しないよう注意してください。

特定のページに関連するカスタムロジックは[ページオブジェクト](pageobjects)で定義することをお勧めします。

### Multiremote

`addCommand`はマルチリモートでも同様に動作しますが、新しいコマンドは子インスタンスに伝播します。マルチリモートの`browser`とその子インスタンスは異なる`this`を持つため、`this`オブジェクトを使用する際には注意が必要です。

この例は、マルチリモート用に新しいコマンドを追加する方法を示しています。

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this`は以下を参照します：
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

TypeScriptを使用すると、WebdriverIOインターフェースを簡単に拡張できます。カスタムコマンドに型を追加する方法は次のとおりです：

1. 型定義ファイルを作成します（例：`./src/types/wdio.d.ts`）
2. a. モジュールスタイルの型定義ファイル（型定義ファイル内でimport/exportを使用し、`declare global WebdriverIO`を使用）を使用する場合は、`tsconfig.json`の`include`プロパティにファイルパスを含めてください。

   b. アンビエントスタイルの型定義ファイル（型定義ファイル内にimport/exportがなく、カスタムコマンドに`declare namespace WebdriverIO`を使用）を使用する場合は、`tsconfig.json`に`include`セクションが含まれていないことを確認してください。これは、`include`セクションに記載されていない型定義ファイルがTypeScriptに認識されなくなるためです。

<Tabs
  defaultValue="modules"
  values={[
    {label: 'モジュール（import/exportを使用）', value: 'modules'},
    {label: 'アンビエント型定義（tsconfigのincludeなし）', value: 'ambient'},
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

プロミスをサポートする外部ライブラリ（例：データベース呼び出しを行うライブラリ）を使用する場合、特定のAPIメソッドをカスタムコマンドでラップするのは良いアプローチです。

プロミスを返すとき、WebdriverIOはプロミスが解決されるまで次のコマンドに進まないようにします。プロミスが拒否された場合、コマンドはエラーをスローします。

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

そして、WDIOテスト仕様で以下のように使用します：

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

これはフレームワークの予測不可能な動作につながる可能性があるため、推奨されません！

全体的なアプローチは`addCommand`と似ていますが、唯一の違いはコマンド関数の最初の引数が上書きしようとしているオリジナルの関数であることです。以下にいくつかの例を示します。

### ブラウザコマンドの上書き

```js
/**
 * 一時停止前にミリ秒を表示し、その値を返す。
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

// 以前と同じように使用する
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### 要素コマンドの上書き

要素レベルでのコマンドの上書きもほぼ同じです。単に`overwriteCommand`の3番目の引数として`true`を渡します：

```js
/**
 * 要素がクリック可能でない場合、要素までスクロールを試みる。
 * 要素が表示されていないかクリック可能でない場合でもJSでクリックするには{ force: true }を渡す。
 * 元の関数の引数タイプを`options?: ClickOptions`で保持できることを示す。
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
    true, // 3番目の引数として`true`を渡すことを忘れないでください
)

// 以前と同じように使用する
const elem = await $('body')
await elem.click()

// またはパラメータを渡す
await elem.click({ force: true })
```

## WebDriverコマンドの追加

WebDriverプロトコルを使用し、[`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)のプロトコル定義で定義されていない追加コマンドをサポートするプラットフォームでテストを実行する場合、`addCommand`インターフェースを通じて手動でそれらを追加できます。`webdriver`パッケージは、他のコマンドと同様の方法でこれらの新しいエンドポイントを登録できるコマンドラッパーを提供し、同じパラメータチェックとエラー処理を提供します。この新しいエンドポイントを登録するには、コマンドラッパーをインポートし、次のように新しいコマンドを登録します：

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

コマンドを正しく呼び出す場合（例：`browser.myNewCommand('foo', 'bar')`）、WebDriverリクエストは正しく実行されます（例：`http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo`）、ペイロードは`{ foo: 'bar' }`のようになります。

:::note
`:sessionId` URLパラメータは、WebDriverセッションのセッションIDで自動的に置き換えられます。他のURLパラメータも適用できますが、`variables`内で定義する必要があります。
:::

プロトコルコマンドの定義方法の例は、[`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)パッケージを参照してください。