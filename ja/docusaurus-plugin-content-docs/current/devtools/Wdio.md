---
id: wdio
title: WebDriverIO DevTools
description: "WebdriverIO DevToolsサービスをインストールおよび設定し、DOMリプレイ、スクリーンショット、ネットワークおよびコンソールのキャプチャ、スクリーンキャストを使用してテストをデバッグします。"
---

ブラウザ自動化テストの実行、デバッグ、検査のための開発者ツールUIを提供するWebdriverIOサービスです。DOMミューテーションのリプレイ、コマンドごとのスクリーンショット、ネットワークリクエストの検査、コンソールログのキャプチャ、セッションのスクリーンキャスト録画などの機能を備えています。

## インストール

```sh
npm install @wdio/devtools-service --save-dev
```

## 使い方

### テストランナー

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

### スタンドアロン

```ts
import { remote } from 'webdriverio'
import { setupForDevtools } from '@wdio/devtools-service'

const browser = await remote(setupForDevtools({
  capabilities: { browserName: 'chrome' }
}))
await browser.url('https://example.com')
await browser.deleteSession()
```

## サービスオプション

```ts
services: [['devtools', options]]
```

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `port` | `number` | ランダム | DevTools UIサーバーがリッスンするポート |
| `hostname` | `string` | `'localhost'` | DevTools UIサーバーがバインドするホスト名 |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600x1200 | DevTools UIウィンドウを開くために使用されるケイパビリティ |
| `screencast` | `ScreencastOptions` | - | セッションのビデオ録画（[スクリーンキャストを参照](/docs/devtools/wdio/screencast)） |
| `mode` | `'live' \| 'trace'` | `'live'` | `live`はDevTools UIを開きます。`trace`はUIを開かず、代わりにポータブルなアーティファクトを書き出します（[トレースモードを参照](/docs/devtools/wdio/trace-mode)） |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | トレースアーティファクトのレイアウト — 単一のアーカイブか、展開されたディレクトリか。`mode: 'trace'`の場合のみ適用されます |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | セッション／specファイル／テストごとに1つのトレースを作成します。`'test'`ではそれぞれを`test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`に書き出します。`mode: 'trace'`の場合のみ適用されます（[トレースモードを参照](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity)） |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | どのトレースを保持するか。`traceGranularity: 'test'`と組み合わせて使用します。`mode: 'trace'`の場合のみ適用されます |
| `filmstrip` | `boolean` | `true` | プレイヤーでスムーズにスクラブ再生できるよう、高密度で連続的なスクリーンキャストのフィルムストリップをトレース*内に*記録します — アクションごとのフレームに加えて高密度のフレームを記録し、エクスポート時に間引きおよびコンテンツアドレス化されます。`mode: 'trace'`の場合のみ適用されます |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | テストごとのスクリーンショット。Allureにインラインで添付されます（`image/png`）。`mode: 'trace'` + `traceGranularity: 'test'`が必要です |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | テストごとのスクリーンキャストビデオ。指定されたポリシーに従って保持され、Allureにインラインで添付されます（`video/webm`）。`mode: 'trace'` + `traceGranularity: 'test'`が必要です |
| `emitArtifactsManifest` | `boolean` | `false` | `devtools-artifacts-<sessionId>.json`を書き出します — 生成されたすべてのアーティファクトと各テストの状態をまとめた、レポーター／CI向けの汎用インデックスです。設定に`@wdio/allure-reporter`が含まれている場合は自動的に有効になります。`mode: 'trace'`の場合のみ適用されます |
| `captureAssertions` | `boolean` | `true` | アサーションをトレースのアクション行としてキャプチャします — `node:assert`と、成功／失敗した`expect(...)`マッチャーが対象です。無効にするには`false`を設定します |

## はじめに

1. WebdriverIOテストを実行します
2. DevTools UIが外部ブラウザウィンドウで自動的に開きます
3. テストがすぐに実行を開始し、リアルタイムで可視化されます
4. ライブブラウザプレビュー、テストの進行状況、コマンドの実行を確認できます
5. 初回の実行が完了したら、再生ボタンを使用して個々のテストまたはスイートを再実行できます
6. 停止ボタンをクリックすると、いつでも実行中のテストを終了できます
7. ワークベンチのタブで、アクション、メタデータ、コンソールログ、ソースコードを確認できます

## 機能

WebDriverIO DevToolsの機能を詳しく見てみましょう：

- **[インタラクティブなテストの再実行と可視化](/docs/devtools/wdio/interactive-test-rerunning)** - テストの再実行が可能なリアルタイムのブラウザプレビュー
- **[保存と再実行（比較）](/docs/devtools/wdio/preserve-and-rerun)** - 失敗したテストのスナップショットを取得して再実行し、2つの実行結果を並べて差分を比較
- **[マルチフレームワークサポート](/docs/devtools/wdio/multi-framework-support)** - Mocha、Jasmine、Cucumberに対応
- **[コンソールログ](/docs/devtools/wdio/console-logs)** - ブラウザのコンソール出力をキャプチャして検査
- **[ネットワークログ](/docs/devtools/wdio/network-logs)** - API呼び出しとネットワークアクティビティを監視
- **[メタデータ](/docs/devtools/wdio/metadata)** - ブラウザセッションごとのセッションケイパビリティ、環境、タイミング
- **[TestLens](/docs/devtools/wdio/testlens)** - インテリジェントなコードナビゲーションでソースコードに移動
- **[セッションスクリーンキャスト](/docs/devtools/wdio/screencast)** - ブラウザセッションの自動ビデオ録画
- **[トレースモード](/docs/devtools/wdio/trace-mode)** - ポータブルな`trace.zip`アーティファクトを生成するヘッドレスなキャプチャ方式（UIウィンドウなし）。`zip`および`ndjson-directory`の出力形式、セッション／spec／テスト単位の粒度、リトライを考慮した保持ポリシー、オプションの高密度`filmstrip`をサポートし、すべてファーストパーティの`show-trace`プレイヤーで表示できます

## トレースプレイヤー

`mode: 'trace'`で記録されたトレースは、ファーストパーティの`show-trace`プレイヤー（`npx show-trace path/to/trace.zip`）で開くことができます — DOMタイムトラベル、A11yタブとロケーター選択による要素オーバーレイ、Copy-for-LLM付きのTranscriptタブ、Errors／Console／Network／Sourceタブ、そしてスクラブ可能なタイムライン（高密度フィルムストリップ、Cucumberの Feature → Scenario → Step のネスト表示）を備えています。

詳しい手順やその他の互換ビューアについては、**[トレースプレイヤー](/docs/devtools/trace-player)**のページを参照してください。

## Allureレポート

設定に`@wdio/allure-reporter`が含まれている場合、トレースモードのアーティファクト（トレースzip、および`traceGranularity: 'test'`の場合はテストごとのスクリーンショットとビデオ）がAllureレポートに自動的に添付され、`emitArtifactsManifest`が自動的に有効になります。

添付の詳細やレポーターのステップ非表示オプションについては、**[Allure連携](/docs/devtools/allure)**を参照してください。