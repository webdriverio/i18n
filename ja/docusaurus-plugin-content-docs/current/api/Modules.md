---
id: modules
title: モジュール
---

WebdriverIOはNPMや他のレジストリに様々なモジュールを公開しており、それらを使用して独自の自動化フレームワークを構築できます。WebdriverIOのセットアップタイプの詳細については[こちら](/docs/setuptypes)をご覧ください。

## `webdriver`と`devtools`

プロトコルパッケージ（[`webdriver`](https://www.npmjs.com/package/webdriver)と[`devtools`](https://www.npmjs.com/package/devtools)）は、セッションを開始できる以下の静的関数が付属したクラスを公開しています：

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

特定の機能を持つ新しいセッションを開始します。セッションレスポンスに基づいて、異なるプロトコルからのコマンドが提供されます。

##### パラメータ

- `options`: [WebDriver オプション](/docs/configuration#webdriver-options)
- `modifier`: 返される前にクライアントインスタンスを変更できる関数
- `userPrototype`: インスタンスのプロトタイプを拡張できるプロパティオブジェクト
- `customCommandWrapper`: 関数呼び出しの周りに機能をラップできる関数

##### 戻り値

- [Browser](/docs/api/browser) オブジェクト

##### 例

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

実行中のWebDriverまたはDevToolsセッションに接続します。

##### パラメータ

- `attachInstance`: セッションに接続するインスタンス、または少なくとも`sessionId`プロパティを持つオブジェクト（例：`{ sessionId: 'xxx' }`）
- `modifier`: 返される前にクライアントインスタンスを変更できる関数
- `userPrototype`: インスタンスのプロトタイプを拡張できるプロパティオブジェクト
- `customCommandWrapper`: 関数呼び出しの周りに機能をラップできる関数

##### 戻り値

- [Browser](/docs/api/browser) オブジェクト

##### 例

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

提供されたインスタンスのセッションを再読み込みします。

##### パラメータ

- `instance`: 再読み込みするパッケージインスタンス

##### 例

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

プロトコルパッケージ（`webdriver`と`devtools`）と同様に、WebdriverIOパッケージAPIを使用してセッションを管理することもできます。APIは`import { remote, attach, multiremote } from 'webdriverio'`を使用してインポートでき、以下の機能が含まれています：

#### `remote(options, modifier)`

WebdriverIOセッションを開始します。インスタンスにはプロトコルパッケージのすべてのコマンドが含まれていますが、追加の高次関数も含まれています。[API ドキュメント](/docs/api)を参照してください。

##### パラメータ

- `options`: [WebdriverIO オプション](/docs/configuration#webdriverio)
- `modifier`: 返される前にクライアントインスタンスを変更できる関数

##### 戻り値

- [Browser](/docs/api/browser) オブジェクト

##### 例

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

実行中のWebdriverIOセッションに接続します。

##### パラメータ

- `attachOptions`: セッションに接続するインスタンス、または少なくとも`sessionId`プロパティを持つオブジェクト（例：`{ sessionId: 'xxx' }`）

##### 戻り値

- [Browser](/docs/api/browser) オブジェクト

##### 例

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

単一のインスタンス内で複数のセッションを制御できるマルチリモートインスタンスを開始します。具体的なユースケースについては[multiremoteの例](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote)をチェックしてください。

##### パラメータ

- `multiremoteOptions`: ブラウザ名を表すキーと[WebdriverIO オプション](/docs/configuration#webdriverio)を持つオブジェクト。

##### 戻り値

- [Browser](/docs/api/browser) オブジェクト

##### 例

```js
import { multiremote } from 'webdriverio'

const matrix = await multiremote({
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
// returns ['Google', 'JSON']
```

## `@wdio/cli`

`wdio`コマンドを呼び出す代わりに、テストランナーをモジュールとして含めて任意の環境で実行することもできます。そのためには、`@wdio/cli`パッケージをモジュールとして要求する必要があります：

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

`Launcher`クラスのコンストラクタは、設定ファイルへのURLと、設定値を上書きする`opts`オブジェクトを期待します。

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

`run`コマンドは[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)を返します。テストが正常に実行されたか失敗した場合に解決され、ランチャーがテストの実行を開始できなかった場合に拒否されます。

## `@wdio/browser-runner`

WebdriverIOの[ブラウザランナー](/docs/runner#browser-runner)を使用してユニットテストやコンポーネントテストを実行する場合、テスト用のモッキングユーティリティをインポートできます：

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

次の名前付きエクスポートが利用可能です：

#### `fn`

モック関数、詳細は公式の[Vitestドキュメント](https://vitest.dev/api/mock.html#mock-functions)を参照してください。

#### `spyOn`

スパイ関数、詳細は公式の[Vitestドキュメント](https://vitest.dev/api/mock.html#mock-functions)を参照してください。

#### `mock`

ファイルまたは依存モジュールをモックするメソッド。

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

- `moduleName`: モック解除するモジュールの名前。

##### 例

```js
unmock('lodash')
```