---
id: runner
title: ランナー
---

import CodeBlock from '@theme/CodeBlock';

WebdriverIOのランナーは、テストランナーを使用する際にテストがどのように、どこで実行されるかを調整します。WebdriverIOは現在、ローカルランナーとブラウザランナーという2種類のランナーをサポートしています。

## ローカルランナー

[ローカルランナー](https://www.npmjs.com/package/@wdio/local-runner)は、フレームワーク（例：Mocha、JasmineまたはCucumber）をワーカープロセス内で起動し、すべてのテストファイルをNode.js環境内で実行します。すべてのテストファイルは、機能ごとに個別のワーカープロセス内で実行され、最大限の並行処理を可能にします。各ワーカープロセスは単一のブラウザインスタンスを使用し、そのため独自のブラウザセッションを実行し、最大限の分離を実現します。

すべてのテストが独自の分離されたプロセスで実行されるため、テストファイル間でデータを共有することはできません。これを回避するには2つの方法があります：

- [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service)を使用して、すべてのワーカー間でデータを共有する
- スペックファイルをグループ化する（詳細は[テストスイートの整理](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially)を参照）

`wdio.conf.js`で他に定義されていない場合、ローカルランナーがWebdriverIOのデフォルトランナーです。

### インストール

ローカルランナーを使用するには、以下のようにインストールできます：

```sh
npm install --save-dev @wdio/local-runner
```

### セットアップ

ローカルランナーはWebdriverIOのデフォルトランナーなので、`wdio.conf.js`内で定義する必要はありません。明示的に設定したい場合は、以下のように定義できます：

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## ブラウザランナー

[ローカルランナー](https://www.npmjs.com/package/@wdio/local-runner)とは対照的に、[ブラウザランナー](https://www.npmjs.com/package/@wdio/browser-runner)はブラウザ内でフレームワークを初期化し実行します。これにより、他の多くのテストフレームワークのようにJSDOMではなく、実際のブラウザでユニットテストやコンポーネントテストを実行することができます。

[JSDOM](https://www.npmjs.com/package/jsdom)はテスト目的で広く使用されていますが、最終的には実際のブラウザではなく、モバイル環境をエミュレートすることもできません。このランナーを使用することで、WebdriverIOはブラウザでテストを簡単に実行し、WebDriverコマンドを使用してページにレンダリングされた要素と対話することができます。

JSDOMとWebdriverIOブラウザランナーでテストを実行する比較は以下の通りです：

| | JSDOM | WebdriverIO ブラウザランナー |
|-|-------|----------------------------|
|1.| Node.js内でテストを実行し、特にWHATWG DOMおよびHTML標準のウェブ標準の再実装を使用 | 実際のブラウザでテストを実行し、ユーザーが使用する環境でコードを実行 |
|2.| コンポーネントとの対話はJavaScriptを通じてのみ模倣できる | [WebdriverIO API](api)を使用して、WebDriverプロトコルを通じて要素と対話できる |
|3.| Canvasサポートには[追加の依存関係](https://www.npmjs.com/package/canvas)が必要で、[制限](https://github.com/Automattic/node-canvas/issues)がある | 実際の[Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)にアクセスできる |
|4.| JSDOMにはいくつかの[注意点](https://github.com/jsdom/jsdom#caveats)とサポートされていないWeb APIがある | テストは実際のブラウザで実行されるため、すべてのWeb APIがサポートされている |
|5.| クロスブラウザでエラーを検出することは不可能 | モバイルブラウザを含むすべてのブラウザをサポート |
|6.| 要素の疑似状態をテストすることが__できない__ | `:hover`や`:active`などの疑似状態をサポート |

このランナーは[Vite](https://vitejs.dev/)を使用してテストコードをコンパイルし、ブラウザにロードします。以下のコンポーネントフレームワーク用のプリセットが付属しています：

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

すべてのテストファイル/テストファイルグループは単一のページ内で実行され、各テスト間でページがリロードされ、テスト間の分離が保証されます。

### インストール

ブラウザランナーを使用するには、以下のようにインストールできます：

```sh
npm install --save-dev @wdio/browser-runner
```

### セットアップ

ブラウザランナーを使用するには、`wdio.conf.js`ファイル内に`runner`プロパティを定義する必要があります：

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### ランナーオプション

ブラウザランナーでは以下の設定が可能です：

#### `preset`

上記のフレームワークの1つを使用してコンポーネントをテストする場合、すべてが最初から設定されるようにプリセットを定義できます。このオプションは`viteConfig`と一緒に使用できません。

__型:__ `vue` | `svelte` | `solid` | `react` | `preact` | `stencil`<br />
__例:__

```js title="wdio.conf.js"
export const {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

#### `viteConfig`

独自の[Vite設定](https://vitejs.dev/config/)を定義します。カスタムオブジェクトを渡すか、開発にVite.jsを使用している場合は既存の`vite.conf.ts`ファイルをインポートできます。WebdriverIOはテストハーネスを設定するためのカスタムVite設定を維持することに注意してください。

__型:__ `string` または [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) または `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__例:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // または単に:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // または値が読み取られたときにのみ解決したい場合は関数を使用
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

`true`に設定すると、ランナーはヘッドレスでテストを実行するための機能を更新します。デフォルトでは、`CI`環境変数が`'1'`または`'true'`に設定されているCI環境で有効になっています。

__型:__ `boolean`<br />
__デフォルト:__ `false`、`CI`環境変数が設定されている場合は`true`

#### `rootDir`

プロジェクトのルートディレクトリ。

__型:__ `string`<br />
__デフォルト:__ `process.cwd()`

#### `coverage`

WebdriverIOは[`istanbul`](https://istanbul.js.org/)を通じてテストカバレッジレポートをサポートしています。詳細は[カバレッジオプション](#coverage-options)を参照してください。

__型:__ `object`<br />
__デフォルト:__ `undefined`

### カバレッジオプション

以下のオプションでカバレッジレポートを設定できます。

#### `enabled`

カバレッジ収集を有効にします。

__型:__ `boolean`<br />
__デフォルト:__ `false`

#### `include`

カバレッジに含めるファイルのグロブパターンのリスト。

__型:__ `string[]`<br />
__デフォルト:__ `[**]`

#### `exclude`

カバレッジから除外するファイルのグロブパターンのリスト。

__型:__ `string[]`<br />
__デフォルト:__

```
[
  'coverage/**',
  'dist/**',
  'packages/*/test{,s}/**',
  '**/*.d.ts',
  'cypress/**',
  'test{,s}/**',
  'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
  '**/__tests__/**',
  '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
  '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
]
```

#### `extension`

レポートに含めるファイル拡張子のリスト。

__型:__ `string | string[]`<br />
__デフォルト:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

カバレッジレポートを書き込むディレクトリ。

__型:__ `string`<br />
__デフォルト:__ `./coverage`

#### `reporter`

使用するカバレッジレポーター。すべてのレポーターの詳細リストは[istanbulドキュメント](https://istanbul.js.org/docs/advanced/alternative-reporters/)を参照してください。

__型:__ `string[]`<br />
__デフォルト:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

ファイルごとにしきい値をチェックします。実際のしきい値については、`lines`、`functions`、`branches`、`statements`を参照してください。

__型:__ `boolean`<br />
__デフォルト:__ `false`

#### `clean`

テスト実行前にカバレッジ結果をクリーンアップします。

__型:__ `boolean`<br />
__デフォルト:__ `true`

#### `lines`

行数のしきい値。

__型:__ `number`<br />
__デフォルト:__ `undefined`

#### `functions`

関数のしきい値。

__型:__ `number`<br />
__デフォルト:__ `undefined`

#### `branches`

分岐のしきい値。

__型:__ `number`<br />
__デフォルト:__ `undefined`

#### `statements`

ステートメントのしきい値。

__型:__ `number`<br />
__デフォルト:__ `undefined`

### 制限事項

WebdriverIOブラウザランナーを使用する場合、`alert`や`confirm`のようなスレッドブロッキングダイアログをネイティブに使用できないことに注意することが重要です。これらはウェブページをブロックするため、WebdriverIOはページとの通信を続けることができず、実行がハングします。

このような状況では、WebdriverIOはこれらのAPIに対するデフォルトモックとデフォルトの戻り値を提供しています。これにより、ユーザーが誤って同期的なポップアップウェブAPIを使用しても実行がハングしないことを保証します。ただし、より良い体験のためにユーザーがこれらのウェブAPIをモックすることを推奨します。詳細は[モッキング](/docs/component-testing/mocking)を参照してください。

### 例

[コンポーネントテスト](https://webdriver.io/docs/component-testing)に関するドキュメントを確認し、これらやその他のさまざまなフレームワークを使用した例については[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples)をご覧ください。