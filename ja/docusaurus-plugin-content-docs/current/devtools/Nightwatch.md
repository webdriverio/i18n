---
id: nightwatch
title: Nightwatch DevTools
description: "テストを変更せずに Nightwatch のテストスイートに DevTools デバッグ UI を追加し、スクリーンキャスト、BiDi キャプチャ、トレースモードを設定します。"
---

[WebdriverIO DevTools](https://github.com/webdriverio/devtools) 用の Nightwatch アダプターです。テストコードを一切変更することなく、同じビジュアルデバッグ UI を Nightwatch のテストスイートで利用できます。

## インストール

```bash
npm install @wdio/nightwatch-devtools
```

## セットアップ

### 標準の Nightwatch（mocha スタイル）

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // ネットワークリクエストのキャプチャに必要
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

通常どおりテストを実行すると、DevTools UI が新しいブラウザウィンドウで自動的に開きます:

```bash
nightwatch
```

> テストファイルを変更する必要はありません。

### Cucumber / BDD

メインのエクスポートと一緒に `cucumberHooksPath` をインポートし、Cucumber の `require` オプションに渡します。これにより、WebdriverIO サービスの `beforeScenario` / `afterScenario` の動作を再現する `Before` / `After` シナリオフックが登録されます。

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default
const { cucumberHooksPath } = require('@wdio/nightwatch-devtools')

module.exports = {
  src_folders: ['features/step_definitions'],

  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'features',
      require: [cucumberHooksPath] // <-- DevTools の Cucumber フックを登録
    }
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | DevTools バックエンドサーバーのポート。すでに使用中の場合は自動的にインクリメントされます。 |
| `hostname` | `string` | `'localhost'` | バックエンドサーバーがバインドするホスト名。 |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | セッションごとの `.webm` ビデオ録画。下記の[スクリーンキャスト](#screencast)を参照してください。 |
| `bidi` | `boolean` | `false` | ブラウザコンソール + JS 例外 + ネットワークの WebDriver BiDi キャプチャを有効にします。capabilities に `webSocketUrl: true` と、BiDi 対応の chromedriver が必要です。アタッチされている場合、リクエストが重複しないように、コマンドごとの Chrome パフォーマンスログによるネットワーク経路は無効化されます。 |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` は DevTools UI を開きます。`trace` は UI を開かず、代わりにポータブルなアーティファクトを書き出します。[トレースモード](/docs/devtools/wdio/trace-mode)を参照してください。 |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | トレースアーティファクトのレイアウト。`mode: 'trace'` の場合のみ適用されます。 |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | セッション / spec ファイル / テストごとに 1 つのトレース。`'test'` はそれぞれを `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip` に書き出します。`mode: 'trace'` の場合のみ適用されます。[トレースモード](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity)を参照してください。**注意:** BDD の `describe/it` インターフェースでは、単一のセッションスコープのスライスにまとめられます（[テストごとのスライス](#per-test-slicing--the-bdd-describeit-caveat)を参照）。 |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | どのトレースを保持するか。`traceGranularity: 'test'` と組み合わせて使用します。`mode: 'trace'` の場合のみ適用されます。 |
| `filmstrip` | `boolean` | `true` | アクションごとに 1 フレームだけでなく、トレースプレーヤーでスクラブ再生できるよう、密で連続的なスクリーンキャストのフィルムストリップをトレースに記録します。セッション中はスクリーンキャストレコーダー（Nightwatch ではポーリングモード）を実行します。`mode: 'trace'` の場合のみ適用されます。 |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | テストごとのスクリーンショット。トレースモード + `traceGranularity: 'test'` の場合のみ。**生成のみ** — PNG はトレース出力ディレクトリ（および `emitArtifactsManifest: true` の場合はマニフェスト）に書き出されますが、Allure にインライン添付はされません（下記の注記を参照）。 |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | 指定したポリシー（例: `'retain-on-failure'`）に従って保持される、テストごとのビデオスライス。トレースモード + `traceGranularity: 'test'` の場合のみ。`off` 以外の値を指定するとスクリーンキャストレコーダー自体が起動するため、`filmstrip` や `screencast.enabled` を別途指定する必要は**ありません**。**生成のみ** — `.webm` はトレース出力ディレクトリ（および `emitArtifactsManifest: true` の場合はマニフェスト）に書き出されますが、Allure にインライン添付はされません。 |
| `emitArtifactsManifest` | `boolean` | `false` | `devtools-artifacts-<sessionId>.json` マニフェスト（レポーターや CI が生成されたアーティファクトを検出するために利用する汎用インデックス）をトレースの隣に書き出します。**Nightwatch ではオプトイン** — 自動検出に使えるライブの Allure シグナルがないため、WDIO/Selenium とは異なり自動で有効になることはありません。`mode: 'trace'` の場合のみ適用されます。 |
| `captureAssertions` | `boolean` | `true` | アサーションをトレースのアクション行としてキャプチャします — `node:assert` に加え、否定の `.not.*` マッチャーを含むネイティブの `browser.assert`/`browser.verify`。無効にするには `false` を設定します。 |

> **Nightwatch では Allure へのインライン添付はサポートされていません。** 公式の `nightwatch-allure` レポーターは事後処理型（ライブ添付 API なし）であり、`allure-js-commons` の `attachment()` は Nightwatch の実行中には何も行いません。そのため、`screenshot` / `video` アーティファクトはトレース出力ディレクトリに*生成*されます（ファイル、および `emitArtifactsManifest: true` の場合はアーティファクトマニフェスト）が、Allure のテストには添付されません。テストごとのスライス — したがってこれらのアーティファクト — が意味を持つのは Cucumber と exports-object インターフェースです。BDD の `describe/it` インターフェースはセッション粒度にまとめられるため、そこではテストごとのゲートは何も行いません。

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## スクリーンキャスト

ブラウザセッションの連続した `.webm` ビデオを録画します。録画はプラグインが最初に検出したセッションで開始され、Nightwatch の `after()` フックで確定されます。

**ポーリングモードのみ。** Nightwatch は WebdriverIO（`browser.getPuppeteer()`）や Selenium（`driver.createCDPConnection`）のような安定した CDP へのエスケープハッチを公開していないため、スクリーンキャストは一定間隔で `browser.takeScreenshot()` を呼び出してフレームをキャプチャします。Nightwatch がサポートするすべてのブラウザで動作します。

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| オプション | 型 | デフォルト | 備考 |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | マスタースイッチ。 |
| `pollIntervalMs` | `number` | `200` | スクリーンショットの間隔（ms）。小さいほど滑らかなビデオになりますが、WebDriver のラウンドトリップが増えます。200 ms ≈ 5 fps。 |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | 最終的な `.webm` への mux の前に ffmpeg エンコーダーへ渡されるフレームごとのピクセルフォーマット。ポーリングモードでは元のスクリーンショットは常に PNG としてキャプチャされるため、これはキャプチャ自体を変更**しません** — エンコーダーがフレームごとに受け取るフォーマットのみが変わります。 |
| `maxWidth` / `maxHeight` / `quality` | - | - | CDP 専用のオプションで、ポーリングモードでは無視されます。WDIO/Selenium アダプターとの形状の互換性のために記載しています。 |

**前提条件:** `fluent-ffmpeg`（パッケージのランタイム依存関係としてすでに含まれています）に加え、PATH 上に `ffmpeg` バイナリが必要です。macOS: `brew install ffmpeg`。Linux: `apt install ffmpeg`。ffmpeg がない場合でもレコーダーは動作しますが、エンコード段階で警告がログに出力され、ファイルの書き出しはスキップされます。

**出力:** ビデオファイルは直前に実行されたテストファイルの隣に書き出されます（フォールバックとして `nightwatch.conf.*` のディレクトリ、最終手段として `process.cwd()`）。完全なパスは Nightwatch のログ行 `📹 Screencast video: <path>` に表示され、ビデオはダッシュボードの Screencast タブにもストリーミングされます。

スクリーンキャスト機能の完全なリファレンス（ブラウザサポート、3 つのアダプターすべての出力パス）については、[スクリーンキャストページ](/docs/devtools/wdio/screencast)を参照してください。

## BiDi キャプチャ（オプトイン）

ブラウザのコンソールメッセージ、JS 例外、ネットワークリクエストの WebDriver BiDi キャプチャを有効にします。selenium-devtools が使用する経路と同等で、両アダプターは `@wdio/devtools-core` 内の同じアタッチロジックを共有しています。

```js
globals: nightwatchDevtools({
  port: 3000,
  bidi: true
})
```

chromedriver が実際に BiDi チャネルを公開するように、capabilities に `webSocketUrl: true` も必要です:

```js
desiredCapabilities: {
  browserName: 'chrome',
  webSocketUrl: true,                           // ← BiDi を有効化
  'goog:chromeOptions': { /* ... */ }
}
```

BiDi がアタッチされている場合、リクエストがダッシュボードに 2 回表示されないよう、コマンドごとの Chrome パフォーマンスログによるネットワークキャプチャ経路は無効化されます。`webSocketUrl` がない場合や chromedriver のバージョンが BiDi を公開していない場合、アタッチは警告なく失敗し、パフォーマンスログによるフォールバックが引き続き動作します。

## トレースモード

ヘッドレスなキャプチャ経路で、DevTools UI ウィンドウは開きません。セッション終了時に、アダプターはポータブルな `trace-<sessionId>.zip`（またはディレクトリ）を `test-results/` フォルダ（解決されたテスト / 設定ディレクトリの隣）に書き出します。形状は WebdriverIO のトレースアーティファクトと同じです。

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // optional; default 'zip'
})
```

### 粒度と Cucumber

`traceGranularity` は 1 つのアーティファクトがカバーする範囲を選択します — `'session'`（デフォルト）、`'spec'`、または `'test'`。

Nightwatch は Cucumber のシナリオごとにブラウザを終了します。`'session'` トレースはそれをまたいで、実行全体で 1 つの zip となり、すべてのシナリオがそれぞれのフィーチャーの下にネストされます。`'test'` はシナリオごとに 1 つの zip を個別のフォルダに書き出します。Cucumber ではこちらが推奨です — アーティファクトが小さくなり、`tracePolicy` の保持判定もこの粒度に基づきます。

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // one trace per Cucumber scenario
})
```

BDD の `describe/it` インターフェースでは、`'test'` は単一のセッションスコープのスライスにまとめられます。Nightwatch は各 `it()` を内部で実行し、プラグインのテストごとのフックをモジュールごとに 1 回しか呼び出さないためです。アクションツリーでは、各 `it` は引き続き個別のグループとして表示されます。

トレースモードでは、バックエンドのポートバインド、UI ウィンドウ、`screencast` オプションはすべてスキップされます。機能の完全なリファレンス（アーティファクトの内容、ビューアー、モバイルテスト、`zip` と `ndjson-directory` の選び方）については、[トレースモードページ](/docs/devtools/wdio/trace-mode)を参照してください。

Nightwatch は WebdriverIO および Selenium アダプターと同じトレースパイプラインを共有しているため、どのアダプターで生成してもアーティファクトの形状は同一です。Nightwatch のトレースにはアクションごとの完全なキャプチャ — スクリーンショット、深さに応じてインデントされたアクセシビリティツリーのスナップショット、操作可能な要素のリスト、Markdown のトランスクリプト — が含まれるため、`show-trace` プレーヤーで DOM/スナップショットのタイムトラベル、**A11y** および **Transcript** タブ、ロケーター選択の要素オーバーレイ、（Cucumber の場合）**Feature → Scenario → Step** のネストとともに開くことができます。

`@wdio/nightwatch-devtools` に同梱されている `show-trace` bin でトレースを開きます（追加の依存関係は不要です）:

```sh
npx show-trace test-results/trace-<sessionId>.zip   # アダプターをインストールしたプロジェクト内で
pnpm show-trace test-results/trace-<sessionId>.zip  # devtools モノレポから
```

完全な手順とキーボードショートカットについては、[トレースプレーヤー](/docs/devtools/trace-player)ページを参照してください。

### テストごとのスライスと BDD `describe/it` の注意点

テストごとのオプション — `traceGranularity: 'test'`、およびそれと組み合わせる `tracePolicy`、`screenshot`、`video` オプション — は、各テストのスライスを切り出すためにテストごとのフックを必要とします。**exports-object（mocha スタイル）**インターフェースと **Cucumber**（シナリオごとのフック）はこれを公開しているため、実際のテストごとのスライスが得られます。例外は **BDD `describe/it`** インターフェースです。Nightwatch は各 `it()` を内部で実行し、プラグインのテストごとのフックをモジュールごとに 1 回しか呼び出さないため、`traceGranularity: 'test'` は最初のテストに紐づく単一の**セッションスコープ**のスライスにまとめられます。アーティファクトマニフェストには引き続きすべてのテストケースが正しい状態で記載され、まとめられるのはテストごとのスライス/アーティファクトの紐づけのみです。セッション粒度および spec 粒度のトレースには影響しません。

## サンプル

動作するサンプルはリポジトリのトップレベルの `examples/` ディレクトリにあります。ワークスペースを一度ビルド（`pnpm install && pnpm build`）してから、リポジトリのルートで実行してください:

| ディレクトリ | ランナー | コマンド |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch mocha スタイル | `pnpm demo:nightwatch` |

## 機能

Nightwatch アダプターは WebdriverIO と同じ DevTools UI の体験を提供します。以下のすべての機能は、基本の `globals: nightwatchDevtools({ port: 3000 })` セットアップで自動的にキャプチャされ、機能ごとの設定は不要です（ネットワークログには追加で `'goog:loggingPrefs': { performance: 'ALL' }` が必要です。[セットアップ](#setup)を参照）。リンク先は各機能の完全なリファレンスです。

- **[インタラクティブなテスト再実行と可視化](/docs/devtools/wdio/interactive-test-rerunning)** - ライブブラウザプレビュー、コマンドごとのスクリーンショット、ワンクリックでのテスト/スイートの再実行
- **[保存と再実行（比較）](/docs/devtools/wdio/preserve-and-rerun)** - 失敗したテストのスナップショットを取り、再実行して 2 つの実行結果を並べて差分表示
- **[マルチフレームワークサポート](/docs/devtools/wdio/multi-framework-support)** - 標準（mocha スタイル）および Cucumber/BDD ランナー
- **[コンソールログ](/docs/devtools/wdio/console-logs)** - ブラウザのコンソール出力をキャプチャして検査（`bidi: true` でリアルタイム）
- **[ネットワークログ](/docs/devtools/wdio/network-logs)** - API 呼び出しとネットワークアクティビティを監視
- **[メタデータ](/docs/devtools/wdio/metadata)** - ブラウザセッションごとのセッション capabilities、環境、タイミング
- **[TestLens](/docs/devtools/wdio/testlens)** - 任意のコマンドから、それを実行したソース行にジャンプ
- **[セッションスクリーンキャスト](/docs/devtools/wdio/screencast)** - ブラウザセッションの連続した `.webm` 録画
- **[トレースモード](/docs/devtools/wdio/trace-mode)** - ポータブルな `trace.zip` を生成するヘッドレスキャプチャ（UI ウィンドウなし）

独自のオプションを持つ機能はスクリーンキャストのみです（完全なリストは[スクリーンキャスト](#screencast)を参照）:

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## 制限事項

Nightwatch は WebdriverIO ほど充実したフレームワークフックを提供していないため、WDIO DevTools サービスとはいくつかの違いがあります:

| 制限事項 | 詳細 |
|-----------|--------|
| ネイティブのコマンドフックがない | Nightwatch には `beforeCommand` / `afterCommand` フックがありません。代わりにブラウザのプロキシラッパーを介してコマンドをインターセプトします。 |
| テストコンテキストが限定的 | `browser.currentTest` が提供するメタデータは WDIO ランナーのコンテキストより少なく、テスト名やファイルパスの取得には追加のヒューリスティックが必要です。 |
| フラットなスイートのネスト | Nightwatch は多重にネストされた `describe` ブロックをネイティブにサポートしていないため、プラグインは最大 2 階層までレポートします。 |
| 結果の取得が遅れる | テスト結果は `afterEach` で初めて確定し、テストの途中では取得できません。 |
| スクリーンキャストはポーリングモードのみ | WDIO（`browser.getPuppeteer()` による CDP プッシュ）や Selenium（`driver.createCDPConnection` による CDP プッシュ）とは異なり、Nightwatch には安定した CDP へのエスケープハッチがないため、`browser.takeScreenshot()` のポーリングによってフレームをキャプチャします。Nightwatch がサポートするすべてのブラウザで動作しますが、ポーリング間隔に比例したフレームごとの小さなコストがかかります。 |
| テストごとのトレーススライス（BDD `describe/it`） | BDD インターフェースはプラグインのテストごとのフックをモジュールごとに 1 回しか呼び出さないため、`traceGranularity: 'test'` は 1 つのセッションスコープのスライスにまとめられます。exports-object（mocha スタイル）と Cucumber インターフェースでは実際のテストごとのスライスが得られます。[テストごとのスライス](#per-test-slicing--the-bdd-describeit-caveat)を参照してください。 |
| トレースアーティファクトは生成のみ | テストごとの `screenshot` / `video` ファイルはトレース出力ディレクトリ（および `emitArtifactsManifest: true` の場合はマニフェスト）に書き出されますが、Allure にインライン添付はされません — Nightwatch にはライブの Allure 添付 API がないためです。 |

WebdriverIO DevTools サービスとの全体的な機能の同等性は、およそ **80〜90%** です。