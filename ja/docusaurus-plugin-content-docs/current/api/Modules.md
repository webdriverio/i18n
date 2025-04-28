---
id: modules
title: モジュール
---

WebdriverIOはNPMやその他のレジストリに様々なモジュールを公開しており、これらを使用して独自の自動化フレームワークを構築することができます。WebdriverIOのセットアップタイプについての詳細なドキュメントは[こちら](/docs/setuptypes)をご覧ください。

## `webdriver` と `devtools`

プロトコルパッケージ（[`webdriver`](https://www.npmjs.com/package/webdriver)と[`devtools`](https://www.npmjs.com/package/devtools)）では、セッションを開始できる以下の静的関数が付属したクラスを公開しています：

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

特定の機能を持つ新しいセッションを開始します。セッションレスポンスに基づいて、異なるプロトコルからのコマンドが提供されます。

##### パラメーター

- `options`: [WebDriver オプション](/docs/configuration#webdriver-options)
- `modifier`: クライアントインスタンスが返される前に変更できる関数
- `userPrototype`: インスタンスのプロトタイプを拡張できるプロパティオブジェクト
- `customCommandWrapper`: 関数呼び出しの周囲に機能をラップできる関数

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

##### パラメーター

- `attachInstance`: セッションに接続するインスタンス、または少なくとも`sessionId`プロパティを持つオブジェクト（例：`{ sessionId: 'xxx' }`）
- `modifier`: クライアントインスタンスが返される前に変更できる関数
- `userPrototype`: インスタンスのプロトタイプを拡張できるプロパティオブジェクト
- `customCommandWrapper`: 関数呼び出しの周囲に機能をラップできる関数

##### 戻り値

- [Browser](/docs/api/browser) オブジェクト

##### 例

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

提供されたインスタンスのセッションを再読み込みします。

##### パラメーター

- `instance`: 再読み込みするパッケージインスタンス

##### 例

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

プロトコルパッケージ（`webdriver`と`devtools`）と同様に、WebdriverIOパッケージのAPIを使用してセッションを管理することもできます。APIは`import { remote, attach, multiremote } from 'webdriverio'`を使用してインポートでき、以下の機能を含んでいます：

#### `remote(options, modifier)`

WebdriverIOセッションを開始します。インスタンスにはプロトコルパッケージのすべてのコマンドと、追加の高次関数が含まれています。[APIドキュメント](/docs/api)を参照してください。

##### パラメーター

- `options`: [WebdriverIO オプション](/docs/configuration#webdriverio)
- `modifier`: クライアントインスタンスが返される前に変更できる関数

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

##### パラメーター

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

単一のインスタンス内で複数のセッションを制御できるマルチリモートインスタンスを開始します。具体的なユースケースについては、[マルチリモートの例](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote)をご覧ください。

##### パラメーター

- `multiremoteOptions`: ブラウザ名を表すキーと、その[WebdriverIO オプション](/docs/configuration#webdriverio)を持つオブジェクト。

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

`wdio`コマンドを呼び出す代わりに、テストランナーをモジュールとして含め、任意の環境で実行することもできます。そのためには、`@wdio/cli`パッケージをモジュールとして要求する必要があります：

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

`Launcher`クラスのコンストラクタは、設定ファイルへのURLと、設定内の値を上書きする`opts`オブジェクトを期待します。

##### パラメーター

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

WebdriverIOの[ブラウザランナー](/docs/runner#browser-runner)を使用してユニットテストやコンポーネントテストを実行する場合、テスト用のモッキングユーティリティをインポートできます。例：

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

以下の名前付きエクスポートが利用可能です：

#### `fn`

モック関数、詳細は公式[Vitestドキュメント](https://vitest.dev/api/mock.html#mock-functions)を参照してください。

#### `spyOn`

スパイ関数、詳細は公式[Vitestドキュメント](https://vitest.dev/api/mock.html#mock-functions)を参照してください。

#### `mock`

ファイルまたは依存モジュールをモックするメソッド。

##### パラメーター

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

##### パラメーター

- `moduleName`: モック解除するモジュールの名前。

##### 例

```js
unmock('lodash')
```