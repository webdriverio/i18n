---
id: runner
title: ランナー
---

import CodeBlock from '@theme/CodeBlock';

WebdriverIOのランナーは、テストランナーを使用する際にテストがどこでどのように実行されるかを調整します。WebdriverIOは現在、ローカルランナーとブラウザランナーという2つの異なるタイプのランナーをサポートしています。

## ローカルランナー

[ローカルランナー](https://www.npmjs.com/package/@wdio/local-runner)は、フレームワーク（例：Mocha、JasmineまたはCucumber）をワーカープロセス内で起動し、Node.js環境内ですべてのテストファイルを実行します。各テストファイルは、機能ごとに別々のワーカープロセスで実行され、最大の並行性を可能にします。各ワーカープロセスは単一のブラウザインスタンスを使用し、そのため独自のブラウザセッションを実行して最大の分離を確保します。

すべてのテストが独自の分離されたプロセスで実行されるため、テストファイル間でデータを共有することはできません。これを回避するには2つの方法があります：

- [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service)を使用してすべてのワーカー間でデータを共有する
- specファイルをグループ化する（詳細は[テストスイートの整理](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially)を参照）

`wdio.conf.js`で他に何も定義されていない場合、ローカルランナーはWebdriverIOのデフォルトランナーです。

### インストール

ローカルランナーを使用するには、次のようにインストールできます：

```sh
npm install --save-dev @wdio/local-runner
```

### セットアップ

ローカルランナーはWebdriverIOのデフォルトランナーであるため、`wdio.conf.js`内で定義する必要はありません。明示的に設定したい場合は、次のように定義できます：

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## ブラウザランナー

[ローカルランナー](https://www.npmjs.com/package/@wdio/local-runner)とは対照的に、[ブラウザランナー](https://www.npmjs.com/package/@wdio/browser-runner)はブラウザ内でフレームワークを初期化して実行します。これにより、多くの他のテストフレームワークのようにJSDOMではなく、実際のブラウザでユニットテストやコンポーネントテストを実行できます。

[JSDOM](https://www.npmjs.com/package/jsdom)はテスト目的で広く使用されていますが、結局は実際のブラウザではなく、モバイル環境もエミュレートできません。このランナーを使用することで、WebdriverIOはブラウザでテストを簡単に実行し、WebDriverコマンドを使用してページにレンダリングされた要素と対話することができます。

以下はJSDOMとWebdriverIOブラウザランナーでのテスト実行の比較です：

| | JSDOM | WebdriverIO ブラウザランナー |
|-|-------|----------------------------|
|1.| Web標準、特にWHATWG DOMとHTML標準の再実装を使用してNode.js内でテストを実行 | 実際のブラウザでテストを実行し、ユーザーが使用する環境でコードを実行 |
|2.| コンポーネントとの対話はJavaScriptでのみ模倣可能 | [WebdriverIO API](api)を使用してWebDriverプロトコルを介して要素と対話可能 |
|3.| Canvas対応には[追加の依存関係](https://www.npmjs.com/package/canvas)が必要で[制限があります](https://github.com/Automattic/node-canvas/issues) | 実際の[Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)にアクセス可能 |
|4.| JSDOMには[注意点](https://github.com/jsdom/jsdom#caveats)とサポートされていないWeb APIがある | テストは実際のブラウザで実行されるため、すべてのWeb APIがサポートされている |
|5.| クロスブラウザのエラー検出が不可能 | モバイルブラウザを含むすべてのブラウザをサポート |
|6.| 要素の疑似状態をテスト__できない__ | `:hover`や`:active`などの疑似状態をサポート |

このランナーは[Vite](https://vitejs.dev/)を使用してテストコードをコンパイルし、ブラウザにロードします。以下のコンポーネントフレームワーク用のプリセットが用意されています：

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

各テストファイル/テストファイルグループは単一のページ内で実行され、テスト間でページがリロードされ、テスト間の分離が保証されます。

### インストール

ブラウザランナーを使用するには、次のようにインストールできます：

```sh
npm install --save-dev @wdio/browser-runner
```

### セットアップ

ブラウザランナーを使用するには、`wdio.conf.js`ファイル内で`runner`プロパティを定義する必要があります：

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### ランナーオプション

ブラウザランナーは以下の設定を許可します：

#### `preset`

上記で言及したフレームワークのいずれかを使用してコンポーネントをテストする場合、すべてが最初から設定されるようにプリセットを定義できます。このオプションは`viteConfig`と一緒に使用することはできません。

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

独自の[Vite設定](https://vitejs.dev/config/)を定義します。カスタムオブジェクトを渡すか、開発にVite.jsを使用している場合は既存の`vite.conf.ts`ファイルをインポートできます。WebdriverIOはテストハーネスを設定するためにカスタムVite構成を保持することに注意してください。

__型:__ `string` または [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) または `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__例:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // または単に：
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // または値が読み取られるときにのみ解決したい場合は
    // 多くのプラグインを含むvite configに関数を使用します
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

`true`に設定すると、ランナーはテストをヘッドレスで実行するように機能を更新します。デフォルトでは、`CI`環境変数が`'1'`または`'true'`に設定されているCI環境で有効になります。

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

レポートに含める必要があるファイル拡張子のリスト。

__型:__ `string | string[]`<br />
__デフォルト:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

カバレッジレポートを書き込むディレクトリ。

__型:__ `string`<br />
__デフォルト:__ `./coverage`

#### `reporter`

使用するカバレッジレポーター。すべてのレポーターの詳細リストについては[istanbulドキュメント](https://istanbul.js.org/docs/advanced/alternative-reporters/)を参照してください。

__型:__ `string[]`<br />
__デフォルト:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

ファイルごとにしきい値をチェックします。実際のしきい値については`lines`、`functions`、`branches`、`statements`を参照してください。

__型:__ `boolean`<br />
__デフォルト:__ `false`

#### `clean`

テスト実行前にカバレッジ結果をクリーンアップします。

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

WebdriverIOブラウザランナーを使用する場合、`alert`や`confirm`のようなスレッドをブロックするダイアログをネイティブに使用できないことに注意する必要があります。これらはWebページをブロックするため、WebdriverIOはページとの通信を続けることができず、実行がハングします。

そのような状況では、WebdriverIOはこれらのAPIに対してデフォルト値を返すデフォルトモックを提供します。これにより、ユーザーが誤って同期的なポップアップWeb APIを使用しても、実行がハングしないようになります。ただし、より良い体験のためにユーザーがこれらのWeb APIをモックすることが推奨されます。詳細は[モッキング](/docs/component-testing/mocking)をお読みください。

### 例

[コンポーネントテスト](https://webdriver.io/docs/component-testing)に関するドキュメントを確認し、これらやその他のさまざまなフレームワークを使用した例については[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples)をご覧ください。