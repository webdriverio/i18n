---
id: reference
title: 設定リファレンス
description: "WebdriverIO、Selenium、Nightwatch の各アダプターにおける、ライブモードとトレースモードのすべての DevTools オプションをデフォルト値とともに確認できます。"
---

3 つのアダプターにわたるすべての DevTools オプションの一覧です。オプションの**名前、型、デフォルト値はすべてのアダプターで同一**です。動作が異なる場合はその旨を記載しています。各トレースオプションの詳しい説明については、[Trace Mode](/docs/devtools/wdio/trace-mode) ページの該当セクションを参照してください。

各アダプターが受け付ける方法でオプションを渡します:

- **WebdriverIO** — `services: [['devtools', { … }]]`
- **Selenium** — `DevTools.configure({ … })`
- **Nightwatch** — `globals: nightwatchDevtools({ … })`

## モードとライブモードのオプション

| オプション | 型 / 値 | デフォルト | 備考 |
|---|---|---|---|
| `mode` | `'live' \| 'trace'` | `'live'` | `'live'` は DevTools UI ダッシュボードを開きます。`'trace'` はダッシュボードを開かず、ポータブルなアーティファクトを書き出します。両者は排他的です。 |
| `port` | `number` | ランダム | DevTools UI / バックエンドがバインドするポート。ライブモードのみ。 |
| `hostname` | `string` | `'localhost'` | サーバーがバインドするホスト名。ライブモードのみ。 |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | 継続的なセッション動画（`.webm`）。ライブモードのみ — トレースモードでは `video` を使用してください。[Screencast](/docs/devtools/wdio/screencast) を参照。 |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600×1200 | DevTools UI ウィンドウを開くために使用される Capabilities。WebdriverIO、ライブモードのみ。 |

## トレースモードのオプション

`mode: 'trace'` の場合にのみ適用されます。

| オプション | 型 / 値 | デフォルト | 詳細 |
|---|---|---|---|
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | 単一のアーカイブか、展開されたディレクトリか。[出力形式](/docs/devtools/wdio/trace-mode#output-format--traceformat) |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | セッション / spec ファイル / テストごとに 1 つのトレース。テストごとのスクリーンショット/動画およびインラインの Allure 添付には `'test'` が必要です。[トレースの粒度](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | どのトレースを保持するか。`traceGranularity: 'test'` と組み合わせて使用します。[保持](/docs/devtools/wdio/trace-mode#retention--tracepolicy) |
| `filmstrip` | `boolean` | `true` | スムーズなスクラブのために、密で継続的なスクリーンキャストをトレースに記録します。`false` の場合はアクションごとに 1 フレームを記録します。[高密度フィルムストリップ](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | テストごとのスクリーンショット（`traceGranularity: 'test'` が必要）。WebdriverIO のサービスオプション。[テストごとのスクリーンショットと動画](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `video` | `'off' \| <tracePolicy value>` | `'off'` | テストごとの動画スライス（`traceGranularity: 'test'` が必要）。WebdriverIO のサービスオプション。[テストごとのスクリーンショットと動画](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `emitArtifactsManifest` | `boolean` | `false` | `devtools-artifacts-<sessionId>.json` を書き出します。Allure レポーターが検出された場合は自動的に有効になります（Nightwatch ではオプトイン）。[アーティファクトマニフェスト](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) |
| `captureAssertions` | `boolean` | `true` | `node:assert`（およびサポートされている場合はフレームワークの `expect` マッチャー）をトレースアクションとしてキャプチャします。[アサーション](/docs/devtools/wdio/trace-mode#assertions--captureassertions) |

## Nightwatch 専用

| オプション | 型 / 値 | デフォルト | 備考 |
|---|---|---|---|
| `bidi` | `boolean` | `false` | WebDriver BiDi によるキャプチャ（コンソール + JS 例外 + ネットワーク）を有効にします。Capabilities に `webSocketUrl: true` が必要です。WebdriverIO と Selenium では BiDi は自動的にアタッチされます。[Nightwatch → BiDi キャプチャ](/docs/devtools/nightwatch#bidi-capture-opt-in) を参照。 |

## アダプターごとの違い

一部のトレース機能は特定のアダプターで制限されます — 全体像については [クロスフレームワークサポートマトリックス](/docs/devtools/cross-framework) を参照してください。主なものは以下のとおりです:

- **Nightwatch のリトライ対応保持** — 確実に動作するのは `retain-on-failure` のみで、その他の `tracePolicy` の値はこれにフォールバックします。
- **Nightwatch の BDD `describe/it`** — `traceGranularity: 'test'` はセッションスコープの 1 つのスライスにまとめられます。
- **Nightwatch の Allure 添付** — テストごとの `screenshot`/`video` は生成のみ（ファイル + マニフェスト）で、インラインでは添付されません。