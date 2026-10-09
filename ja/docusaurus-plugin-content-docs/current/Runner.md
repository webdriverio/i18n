---
id: runner
title: ランナー
description: "ローカルランナーとブラウザランナーのどちらを使うかを選択し、プリセット、Vite 設定、カバレッジなどのブラウザランナーのオプションを設定します。"
---

import CodeBlock from '@theme/CodeBlock';

WebdriverIO のランナーは、テストランナーを使用する際に、テストをどのように、どこで実行するかを制御します。WebdriverIO は現在、ローカルランナーとブラウザランナーの 2 種類のランナーをサポートしています。

## ローカルランナー

[ローカルランナー](https://www.npmjs.com/package/@wdio/local-runner)は、フレームワーク（例：Mocha、Jasmine、Cucumber）をワーカープロセス内で起動し、すべてのテストファイルを Node.js 環境内で実行します。各テストファイルは capability ごとに個別のワーカープロセスで実行されるため、最大限の並行実行が可能です。各ワーカープロセスは単一のブラウザインスタンスを使用し、独自のブラウザセッションを実行するため、最大限の分離が実現されます。

各テストはそれぞれ分離されたプロセスで実行されるため、テストファイル間でデータを共有することはできません。これを回避する方法は 2 つあります：

- [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service) を使用して、すべてのワーカー間でデータを共有する
- spec ファイルをグループ化する（詳しくは [テストスイートの整理](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially) を参照）

`wdio.conf.js` で他に何も定義されていない場合、ローカルランナーが WebdriverIO のデフォルトのランナーになります。

### インストール

ローカルランナーを使用するには、次のコマンドでインストールします：

```sh
npm install --save-dev @wdio/local-runner
```

### セットアップ

ローカルランナーは WebdriverIO のデフォルトのランナーであるため、`wdio.conf.js` 内で定義する必要はありません。明示的に設定したい場合は、次のように定義できます：

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## ブラウザランナー

[ローカルランナー](https://www.npmjs.com/package/@wdio/local-runner)とは対照的に、[ブラウザランナー](https://www.npmjs.com/package/@wdio/browser-runner)はフレームワークをブラウザ内で起動・実行します。これにより、他の多くのテストフレームワークのように JSDOM 内ではなく、実際のブラウザでユニットテストやコンポーネントテストを実行できます。テストバンドルは Chrome 90、Edge 90、Firefox 90、Safari 14.1 以降で動作します。[ブラウザサポート](/docs/component-testing#browser-support)を参照してください。

[JSDOM](https://www.npmjs.com/package/jsdom) はテスト目的で広く使用されていますが、結局のところ実際のブラウザではなく、モバイル環境をエミュレートすることもできません。このランナーにより、WebdriverIO ではテストをブラウザ内で簡単に実行し、WebDriver コマンドを使用してページ上にレンダリングされた要素を操作できます。

以下は、JSDOM 内でのテスト実行と WebdriverIO のブラウザランナーでのテスト実行の比較です

| | JSDOM | WebdriverIO ブラウザランナー |
|-|-------|----------------------------|
|1.| Web 標準、特に WHATWG DOM および HTML 標準の再実装を使用して、Node.js 内でテストを実行します | 実際のブラウザでテストを実行し、ユーザーが使用する環境でコードを実行します |
|2.| コンポーネントとのインタラクションは JavaScript による模倣しかできません | [WebdriverIO API](api) を使用して、WebDriver プロトコルを通じて要素を操作できます |
|3.| Canvas のサポートには[追加の依存関係](https://www.npmjs.com/package/canvas)が必要で、[制限があります](https://github.com/Automattic/node-canvas/issues) | 実際の [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) にアクセスできます |
|4.| JSDOM にはいくつかの[注意点](https://github.com/jsdom/jsdom#caveats)とサポートされていない Web API があります | テストは実際のブラウザで実行されるため、すべての Web API がサポートされています |
|5.| クロスブラウザのエラーを検出できません | モバイルブラウザを含むすべてのブラウザをサポートしています |
|6.| 要素の疑似状態をテスト__できません__ | `:hover` や `:active` などの疑似状態をサポートしています |

このランナーは [Vite](https://vitejs.dev/) を使用してテストコードをコンパイルし、ブラウザに読み込みます。以下のコンポーネントフレームワーク用のプリセットが用意されています：

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

各テストファイル / テストファイルグループは単一のページ内で実行されます。つまり、テスト間の分離を保証するために、各テストの間でページがリロードされます。

### インストール

ブラウザランナーを使用するには、次のコマンドでインストールします：

```sh
npm install --save-dev @wdio/browser-runner
```

### セットアップ

ブラウザランナーを使用するには、`wdio.conf.js` ファイル内で `runner` プロパティを定義する必要があります。例：

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

上記のいずれかのフレームワークを使用してコンポーネントをテストする場合、すべてがすぐに使えるように設定されるプリセットを定義できます。このオプションは `viteConfig` と併用できません。

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

独自の [Vite 設定](https://vitejs.dev/config/)を定義します。カスタムオブジェクトを渡すか、開発で Vite.js を使用している場合は既存の `vite.conf.ts` ファイルをインポートできます。なお、WebdriverIO はテストハーネスをセットアップするためにカスタム Vite 設定を保持します。

__型:__ `string` または [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) または `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__例:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // または単に:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // または、vite 設定に多くのプラグインが含まれていて、
    // 値が読み込まれたときにのみ解決したい場合は関数を使用します
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

`true` に設定すると、ランナーは capabilities を更新してテストをヘッドレスで実行します。デフォルトでは、`CI` 環境変数が `'1'` または `'true'` に設定されている CI 環境で有効になります。

__型:__ `boolean`<br />
__デフォルト:__ `false`、`CI` 環境変数が設定されている場合は `true`

#### `rootDir`

プロジェクトのルートディレクトリ。

__型:__ `string`<br />
__デフォルト:__ `process.cwd()`

#### `coverage`

WebdriverIO は [`istanbul`](https://istanbul.js.org/) によるテストカバレッジレポートをサポートしています。詳細は[カバレッジオプション](#coverage-options)を参照してください。

__型:__ `object`<br />
__デフォルト:__ `undefined`

### カバレッジオプション

以下のオプションでカバレッジレポートを設定できます。

#### `enabled`

カバレッジの収集を有効にします。

__型:__ `boolean`<br />
__デフォルト:__ `false`

#### `include`

カバレッジに含めるファイルのリスト（glob パターン）。

__型:__ `string[]`<br />
__デフォルト:__ `[**]`

#### `exclude`

カバレッジから除外するファイルのリスト（glob パターン）。

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

使用するカバレッジレポーター。すべてのレポーターの詳細なリストは [istanbul のドキュメント](https://istanbul.js.org/docs/advanced/alternative-reporters/)を参照してください。

__型:__ `string[]`<br />
__デフォルト:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

ファイルごとにしきい値をチェックします。実際のしきい値については `lines`、`functions`、`branches`、`statements` を参照してください。

__型:__ `boolean`<br />
__デフォルト:__ `false`

#### `clean`

テストを実行する前にカバレッジの結果をクリーンアップします。

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

WebdriverIO ブラウザランナーを使用する場合、`alert` や `confirm` のようなスレッドをブロックするダイアログはネイティブに使用できないことに注意が必要です。これらは Web ページをブロックするため、WebdriverIO がページとの通信を継続できなくなり、実行がハングしてしまうためです。

このような状況に対応するため、WebdriverIO はこれらの API に対して、デフォルトの戻り値を持つデフォルトのモックを提供しています。これにより、ユーザーが誤って同期的なポップアップ Web API を使用した場合でも、実行がハングすることはありません。ただし、より良い体験のために、ユーザー自身がこれらの Web API をモックすることを推奨します。詳しくは [モック](/docs/component-testing/mocking) を参照してください。

### 例

[コンポーネントテスト](https://webdriver.io/docs/component-testing)に関するドキュメントを必ず確認し、これらのフレームワークやその他さまざまなフレームワークを使用した例については[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples)を参照してください。