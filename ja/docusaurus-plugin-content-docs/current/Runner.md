---
id: runner
title: ランナー
description: "ローカルランナーとブラウザランナーのどちらを使用するかを選択し、プリセット、Vite設定、カバレッジなどのブラウザランナーのオプションを設定します。"
---

import CodeBlock from '@theme/CodeBlock';

WebdriverIOにおけるランナーは、テストランナーを使用する際に、テストをどのように、どこで実行するかを統括します。WebdriverIOは現在、ローカルランナーとブラウザランナーの2種類のランナーをサポートしています。

## ローカルランナー

[ローカルランナー](https://www.npmjs.com/package/@wdio/local-runner)は、ワーカープロセス内でフレームワーク（例：Mocha、JasmineまたはCucumber）を起動し、すべてのテストファイルをNode.js環境内で実行します。各テストファイルはケイパビリティごとに個別のワーカープロセスで実行されるため、最大限の並列実行が可能です。各ワーカープロセスは単一のブラウザインスタンスを使用し、独自のブラウザセッションを実行するため、最大限の分離が実現されます。

各テストは独自の分離されたプロセスで実行されるため、テストファイル間でデータを共有することはできません。これを回避する方法は2つあります：

- [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service)を使用して、すべてのワーカー間でデータを共有する
- specファイルをグループ化する（詳細は[テストスイートの整理](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially)を参照）

`wdio.conf.js`で他に何も定義されていない場合、ローカルランナーがWebdriverIOのデフォルトのランナーになります。

### インストール

ローカルランナーを使用するには、次のようにインストールします：

```sh
npm install --save-dev @wdio/local-runner
```

### セットアップ

ローカルランナーはWebdriverIOのデフォルトのランナーであるため、`wdio.conf.js`内で定義する必要はありません。明示的に設定したい場合は、次のように定義できます：

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## ブラウザランナー

[ローカルランナー](https://www.npmjs.com/package/@wdio/local-runner)とは対照的に、[ブラウザランナー](https://www.npmjs.com/package/@wdio/browser-runner)はブラウザ内でフレームワークを起動して実行します。これにより、他の多くのテストフレームワークのようにJSDOM内ではなく、実際のブラウザでユニットテストやコンポーネントテストを実行できます。テストバンドルはChrome 90、Edge 90、Firefox 90、Safari 14.1以降で動作します。[ブラウザサポート](/docs/component-testing#browser-support)を参照してください。

[JSDOM](https://www.npmjs.com/package/jsdom)はテスト目的で広く使用されていますが、結局のところ実際のブラウザではなく、モバイル環境をエミュレートすることもできません。このランナーを使用すると、WebdriverIOはブラウザでテストを簡単に実行し、WebDriverコマンドを使用してページ上にレンダリングされた要素を操作できるようにします。

以下は、JSDOMとWebdriverIOのブラウザランナーでテストを実行する場合の比較です

| | JSDOM | WebdriverIO ブラウザランナー |
|-|-------|----------------------------|
|1.| Web標準、特にWHATWG DOMおよびHTML標準の再実装を使用して、Node.js内でテストを実行します | 実際のブラウザでテストを実行し、ユーザーが使用する環境でコードを実行します |
|2.| コンポーネントとのインタラクションはJavaScriptを介して模倣することしかできません | [WebdriverIO API](api)を使用して、WebDriverプロトコルを通じて要素を操作できます |
|3.| Canvasのサポートには[追加の依存関係](https://www.npmjs.com/package/canvas)が必要で、[制限があります](https://github.com/Automattic/node-canvas/issues) | 実際の[Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)にアクセスできます |
|4.| JSDOMにはいくつかの[注意事項](https://github.com/jsdom/jsdom#caveats)とサポートされていないWeb APIがあります | テストは実際のブラウザで実行されるため、すべてのWeb APIがサポートされています |
|5.| クロスブラウザでエラーを検出することは不可能です | モバイルブラウザを含むすべてのブラウザをサポートしています |
|6.| 要素の疑似状態をテスト__できません__ | `:hover`や`:active`などの疑似状態をサポートしています |

このランナーは[Vite](https://vitejs.dev/)を使用してテストコードをコンパイルし、ブラウザに読み込みます。以下のコンポーネントフレームワーク向けのプリセットが付属しています：

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

各テストファイル／テストファイルグループは単一のページ内で実行されます。つまり、テスト間の分離を保証するために、各テストの間でページがリロードされます。

### インストール

ブラウザランナーを使用するには、次のようにインストールします：

```sh
npm install --save-dev @wdio/browser-runner
```

### セットアップ

ブラウザランナーを使用するには、`wdio.conf.js`ファイル内で`runner`プロパティを定義する必要があります。例：

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### ランナーオプション

ブラウザランナーでは、以下の設定が可能です：

#### `preset`

上記のフレームワークのいずれかを使用してコンポーネントをテストする場合、すぐに使えるようにすべてが設定されるプリセットを定義できます。このオプションは`viteConfig`と併用できません。

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

独自の[Vite設定](https://vitejs.dev/config/)を定義します。カスタムオブジェクトを渡すか、開発にVite.jsを使用している場合は既存の`vite.conf.ts`ファイルをインポートできます。WebdriverIOはテストハーネスをセットアップするためにカスタムVite設定を保持することに注意してください。

__型:__ `string` または [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) または `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__例:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // または単に:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // または、値が読み込まれたときにのみ解決したいプラグインが
    // vite設定に多数含まれている場合は関数を使用します
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

`true`に設定すると、ランナーはテストをヘッドレスで実行するようにケイパビリティを更新します。デフォルトでは、`CI`環境変数が`'1'`または`'true'`に設定されているCI環境内で有効になります。

__型:__ `boolean`<br />
__デフォルト:__ `false`、`CI`環境変数が設定されている場合は`true`

#### `rootDir`

プロジェクトのルートディレクトリ。

__型:__ `string`<br />
__デフォルト:__ `process.cwd()`

#### `coverage`

WebdriverIOは[`istanbul`](https://istanbul.js.org/)を通じたテストカバレッジレポートをサポートしています。詳細は[カバレッジオプション](#coverage-options)を参照してください。

__型:__ `object`<br />
__デフォルト:__ `undefined`

### カバレッジオプション

以下のオプションでカバレッジレポートを設定できます。

#### `enabled`

カバレッジの収集を有効にします。

__型:__ `boolean`<br />
__デフォルト:__ `false`

#### `include`

カバレッジに含めるファイルのリスト（globパターン）。

__型:__ `string[]`<br />
__デフォルト:__ `[**]`

#### `exclude`

カバレッジから除外するファイルのリスト（globパターン）。

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

使用するカバレッジレポーター。すべてのレポーターの詳細なリストについては、[istanbulのドキュメント](https://istanbul.js.org/docs/advanced/alternative-reporters/)を参照してください。

__型:__ `string[]`<br />
__デフォルト:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

ファイルごとにしきい値をチェックします。実際のしきい値については`lines`、`functions`、`branches`、`statements`を参照してください。

__型:__ `boolean`<br />
__デフォルト:__ `false`

#### `clean`

テストを実行する前にカバレッジ結果をクリーンアップします。レポートディレクトリは`enabled`が`true`の場合にのみクリーンアップされるため、カバレッジが無効になっている間は、ディレクトリ内の既存の出力はそのまま残されます。

__型:__ `boolean`<br />
__デフォルト:__ `true`

#### `lines`

行のしきい値。

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

WebdriverIOのブラウザランナーを使用する場合、`alert`や`confirm`のようなスレッドをブロックするダイアログはネイティブに使用できないことに注意することが重要です。これらはWebページをブロックするため、WebdriverIOがページとの通信を継続できなくなり、実行がハングしてしまうからです。

このような状況のために、WebdriverIOはこれらのAPIに対してデフォルトの戻り値を持つデフォルトのモックを提供しています。これにより、ユーザーが誤って同期的なポップアップWeb APIを使用した場合でも、実行がハングしないようになっています。ただし、より良い体験のために、ユーザーがこれらのWeb APIをモックすることを推奨します。詳細は[モック](/docs/component-testing/mocking)を参照してください。

### 例

[コンポーネントテスト](https://webdriver.io/docs/component-testing)に関するドキュメントを確認し、これらのフレームワークやその他さまざまなフレームワークを使用した例については[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples)をご覧ください。