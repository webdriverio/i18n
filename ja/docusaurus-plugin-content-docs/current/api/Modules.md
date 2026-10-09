---
id: modules
title: モジュール
---

WebdriverIOは、独自の自動化フレームワークを構築するために使用できるさまざまなモジュールをNPMやその他のレジストリに公開しています。WebdriverIOのセットアップタイプに関する詳細なドキュメントは[こちら](/docs/setuptypes)をご覧ください。

## `webdriver` と `devtools`

プロトコルパッケージ（[`webdriver`](https://www.npmjs.com/package/webdriver)および[`devtools`](https://www.npmjs.com/package/devtools)）は、セッションを開始するための以下の静的関数を持つクラスを公開しています：

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

特定のケイパビリティで新しいセッションを開始します。セッションのレスポンスに基づいて、異なるプロトコルのコマンドが提供されます。

##### パラメータ

- `options`: [WebDriverオプション](/docs/configuration#webdriver-options)
- `modifier`: クライアントインスタンスが返される前に変更するための関数
- `userPrototype`: インスタンスのプロトタイプを拡張するためのプロパティオブジェクト
- `customCommandWrapper`: 関数呼び出しの周りに機能をラップするための関数

##### 戻り値

- [Browser](/docs/api/browser)オブジェクト

##### 例

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

実行中のWebDriverまたはDevToolsセッションにアタッチします。

##### パラメータ

- `attachInstance`: セッションをアタッチするインスタンス、または少なくとも`sessionId`プロパティを持つオブジェクト（例：`{ sessionId: 'xxx' }`）
- `modifier`: クライアントインスタンスが返される前に変更するための関数
- `userPrototype`: インスタンスのプロトタイプを拡張するためのプロパティオブジェクト
- `customCommandWrapper`: 関数呼び出しの周りに機能をラップするための関数

##### 戻り値

- [Browser](/docs/api/browser)オブジェクト

##### 例

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

指定されたインスタンスのセッションをリロードします。

##### パラメータ

- `instance`: リロードするパッケージインスタンス

##### 例

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

プロトコルパッケージ（`webdriver`および`devtools`）と同様に、WebdriverIOパッケージのAPIを使用してセッションを管理することもできます。APIは`import { remote, attach, multiRemote } from 'webdriverio`を使用してインポートでき、以下の機能が含まれています：

#### `remote(options, modifier)`

WebdriverIOセッションを開始します。このインスタンスにはプロトコルパッケージのすべてのコマンドに加えて、追加の高階関数が含まれています。[APIドキュメント](/docs/api)を参照してください。

##### パラメータ

- `options`: [WebdriverIOオプション](/docs/configuration#webdriverio)
- `modifier`: クライアントインスタンスが返される前に変更するための関数

##### 戻り値

- [Browser](/docs/api/browser)オブジェクト

##### 例

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

実行中のWebdriverIOセッションにアタッチします。

##### パラメータ

- `attachOptions`: セッションをアタッチするインスタンス、または少なくとも`sessionId`プロパティを持つオブジェクト（例：`{ sessionId: 'xxx' }`）

##### 戻り値

- [Browser](/docs/api/browser)オブジェクト

##### 例

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiRemote(multiRemoteOptions)`

単一のインスタンス内で複数のセッションを制御できるマルチリモートインスタンスを開始します。具体的なユースケースについては、[マルチリモートの例](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote)をご覧ください。

##### パラメータ

- `multiRemoteOptions`: ブラウザ名を表すキーと、その[WebdriverIOオプション](/docs/configuration#webdriverio)を持つオブジェクト。

##### 戻り値

- [Browser](/docs/api/browser)オブジェクト

##### 例

```js
import { multiRemote } from 'webdriverio'

const matrix = await multiRemote({
    myChromeBrowser: {
        capabilities: { browserName: 'chrome' }
    },
    myFirefoxBrowser: {
        capabilities: { browserName: 'firefox' }
    }
})
await matrix.url('http://json.org')
await matrix.getInstance('browserA').url('https://google.com')

console.log(await matrix.getTitle())
// ['Google', 'JSON'] を返します
```

#### `Key`

[`browser.keys`](/docs/api/browser/keys)コマンドで使用する特殊文字の定数を含むオブジェクトです。これらの定数は、`Enter`、`Tab`、`Escape`、矢印キー、ファンクションキーなど、ブラウザに送信できる特殊キーを表します。

##### 例

```js
import { Key } from 'webdriverio'

// Enterキーを押す
await browser.keys(Key.Enter)

// Ctrl+Aですべて選択する（クロスプラットフォームで動作）
await browser.keys([Key.Ctrl, 'a'])

// 矢印キーで移動する
await browser.keys([Key.ArrowDown, Key.ArrowDown, Key.Enter])
```

##### 利用可能なキー

`Key`オブジェクトを介して以下の特殊キーが利用可能です：

**修飾キー：**

| 定数 | 説明 |
|----------|-------------|
| `Key.Ctrl` | クロスプラットフォームのコントロールキー（MacではCommand、Windows/LinuxではControl） |
| `Key.Control` | Controlキー |
| `Key.Shift` | Shiftキー |
| `Key.Alt` | Altキー |
| `Key.Command` | Commandキー（Mac） |
| `Key.NULL` | Null/リリースキー — 現在押されているすべての修飾キーを解放します |

**ナビゲーションキー：**

| 定数 | 説明 |
|----------|-------------|
| `Key.Cancel` | Cancelキー |
| `Key.Help` | Helpキー |
| `Key.Backspace` | Backspaceキー |
| `Key.Tab` | Tabキー |
| `Key.Clear` | Clearキー |
| `Key.Return` | Returnキー |
| `Key.Enter` | Enterキー |
| `Key.Pause` | Pauseキー |
| `Key.Escape` | Escapeキー |
| `Key.Space` | Spaceキー |
| `Key.PageUp` | Page Upキー |
| `Key.PageDown` | Page Downキー |
| `Key.End` | Endキー |
| `Key.Home` | Homeキー |
| `Key.ArrowLeft` | 左矢印キー |
| `Key.ArrowUp` | 上矢印キー |
| `Key.ArrowRight` | 右矢印キー |
| `Key.ArrowDown` | 下矢印キー |
| `Key.Insert` | Insertキー |
| `Key.Delete` | Deleteキー |

**文字キー：**

| 定数 | 説明 |
|----------|-------------|
| `Key.Semicolon` | セミコロンキー |
| `Key.Equals` | イコールキー |

**テンキー：**

| 定数 | 説明 |
|----------|-------------|
| `Key.Numpad0` - `Key.Numpad9` | テンキー 0-9 |
| `Key.Multiply` | テンキー 乗算 |
| `Key.Add` | テンキー 加算 |
| `Key.Separator` | テンキー 区切り |
| `Key.Subtract` | テンキー 減算 |
| `Key.Decimal` | テンキー 小数点 |
| `Key.Divide` | テンキー 除算 |

**ファンクションキー：**

| 定数 | 説明 |
|----------|-------------|
| `Key.F1` - `Key.F12` | ファンクションキー F1〜F12 |

**その他のキー：**

| 定数 | 説明 |
|----------|-------------|
| `Key.ZenkakuHankaku` | 全角/半角キー（日本語） |

:::info クロスプラットフォームの修飾キー

`Key.Ctrl`定数は、異なるオペレーティングシステム間で「コントロール」修飾キーを使用するための便利な方法を提供します。macOSでは`Command`キーに、WindowsとLinuxでは`Control`キーにマッピングされます。これは、すべて選択（`Ctrl+A`）、コピー（`Ctrl+C`）、貼り付け（`Ctrl+V`）などの操作で、複数のプラットフォームで動作する必要があるテストを書く場合に便利です。

:::

## `@wdio/cli`

`wdio`コマンドを呼び出す代わりに、テストランナーをモジュールとして組み込み、任意の環境で実行することもできます。そのためには、次のように`@wdio/cli`パッケージをモジュールとして読み込む必要があります：

<Tabs
  defaultValue="esm"
  values={[
    {label: 'EcmaScript Modules', value: 'esm'},
    {label: 'CommonJS', value: 'cjs'}
  ]
}>
<TabItem value="esm">

```js
import Launcher from '@wdio/cli'
```

</TabItem>
<TabItem value="cjs">

```js
const Launcher = require('@wdio/cli').default
```

</TabItem>
</Tabs>

その後、ランチャーのインスタンスを作成し、テストを実行します。

#### `Launcher(configPath, opts)`

`Launcher`クラスのコンストラクタは、設定ファイルへのURLと、設定ファイル内の設定を上書きする設定を含む`opts`オブジェクトを受け取ります。

##### パラメータ

- `configPath`: 実行する`wdio.conf.js`へのパス
- `opts`: 設定ファイルの値を上書きする引数（[`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)）

##### 例

```js
const wdio = new Launcher(
    '/path/to/my/wdio.conf.js',
    { spec: '/path/to/a/single/spec.e2e.js' }
)

wdio.run().then((exitCode) => {
    process.exit(exitCode)
}, (error) => {
    console.error('Launcher failed to start the test', error.stacktrace)
    process.exit(1)
})
```

`run`コマンドは[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)を返します。テストが正常に実行された場合または失敗した場合はresolveされ、ランチャーがテストの実行を開始できなかった場合はrejectされます。

## `@wdio/browser-runner`

WebdriverIOの[ブラウザランナー](/docs/runner#browser-runner)を使用してユニットテストやコンポーネントテストを実行する場合、テスト用のモックユーティリティをインポートできます。例：

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

以下の名前付きエクスポートが利用可能です：

#### `fn`

モック関数です。詳細は公式の[Vitestドキュメント](https://vitest.dev/api/mock.html#mock-functions)をご覧ください。

#### `spyOn`

スパイ関数です。詳細は公式の[Vitestドキュメント](https://vitest.dev/api/mock.html#mock-functions)をご覧ください。

#### `mock`

ファイルまたは依存モジュールをモックするメソッドです。

##### パラメータ

- `moduleName`: モックするファイルへの相対パス、またはモジュール名。
- `factory`: モックされた値を返す関数（オプション）

##### 例

```js
mock('../src/constants.ts', () => ({
    SOME_DEFAULT: 'mocked out'
}))

mock('lodash', (origModuleFactory) => {
    const origModule = await origModuleFactory()
    return {
        ...origModule,
        pick: fn()
    }
})
```

#### `unmock`

手動モック（`__mocks__`）ディレクトリ内で定義された依存関係のモックを解除します。

##### パラメータ

- `moduleName`: モックを解除するモジュールの名前。

##### 例

```js
unmock('lodash')
```