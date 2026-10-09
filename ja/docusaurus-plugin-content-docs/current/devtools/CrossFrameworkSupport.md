---
id: cross-framework
title: クロスフレームワークサポート
description: "DevTools のトレースモードが WebdriverIO、Selenium、Nightwatch の実行をどの程度完全にキャプチャするか、また各アダプターにどのようなギャップがあるかを比較します。"
---

トレース形式と `show-trace` プレーヤーは WebdriverIO / Selenium / Nightwatch 間で同一です。このページでは、キャプチャの完全性がどこで異なるかを示します。トレースモードの完全なリファレンスについては、[Trace Mode](/docs/devtools/wdio/trace-mode) を参照してください。

トレースを構築する変換処理は、アダプターの 1 つ下のレイヤーである [`@wdio/devtools-trace`](https://github.com/webdriverio/devtools/tree/main/packages/trace) に存在します。そのため、**トレース形式と `show-trace` プレーヤーはすべてのアダプターで同一**です。どのアダプターが生成したかに関係なく、同じ `.zip`(またはディレクトリ)が同じプレーヤーで開けます。さらに、以下の 3 つのアダプターはコアオプション(`mode`、`traceGranularity`、`tracePolicy`、`traceFormat`、`filmstrip`、`emitArtifactsManifest`、`captureAssertions`)を共有しています。

ただし、**キャプチャの完全性はアダプターによって異なります**。WebdriverIO が最も完全であり、Selenium と Nightwatch は以下に記載したギャップがあるものの、コアフローをカバーしています。フレームワーク固有の有効化構文は各アダプターのページにあります。[Selenium](/docs/devtools/selenium#trace-mode) および [Nightwatch](/docs/devtools/nightwatch#trace-mode) を参照してください。

Python アダプター([Selenium](/docs/devtools/selenium) ページの **Python** タブを参照)は同じアーカイブを書き出し、同じプレーヤーで開けますが、この表には含まれていません。Python アダプターはテストプロセス内で JavaScript を実行しないため、アダプターがプロセス内でトレースを構築する代わりに、バックエンドがキャプチャしたストリームからトレースを構築します。粒度と保持設定には Python の同等機能があります。`--devtools-trace-granularity session|test` と `--devtools-trace-policy` で、後者のリトライ対応の値は、その通信経路上に試行回数を伝えるものが何もないため `retain-on-failure` に縮退します。Python に同等機能がない行は、テストごとのアーティファクトに関するもの、つまり `screenshot`、`video`、およびインラインの Allure 添付です。Python アダプターがキャプチャするもの - DOM タイムトラベル、高密度フィルムストリップ、A11y ツリーと要素オーバーレイ、コマンド、コンソール、ネットワーク、アサーション、実行コントロール、Preserve & Rerun - については専用のページで説明しています。

| 機能 | WebdriverIO | Selenium | Nightwatch |
|---|---|---|---|
| トレースモード + `show-trace` プレーヤー | ✅ | ✅ | ✅ |
| DOM タイムトラベル(ミューテーションキャプチャ) | ✅ | ✅ ¹ | ✅ |
| A11y タブ + ロケーター選択オーバーレイ(トレースプレーヤー) | ✅ | ✅ | ✅ |
| トランスクリプト + Copy-for-LLM | ✅ | ✅ | ✅ |
| テストごとの `screenshot` / `video` | ✅ インライン Allure | ✅ インライン Allure | ⚠️ 生成のみ ² |
| `emitArtifactsManifest` 自動検出 | ✅ | ✅ | ⚠️ オプトインのみ |
| リトライ対応の `tracePolicy` | ✅ | ✅ | ⚠️ `retain-on-failure` のみ ³ |
| `traceGranularity: 'test'` | ✅ | ✅ | ⚠️ Cucumber / exports-object。BDD の `describe/it` はセッションスライスにまとめられる |
| Cucumber の Feature→Scenario→Step ネスト | Scenario→Step ⁴ | ✅ 完全 | Feature→Scenario ⁵ |
| BiDi キャプチャ(コンソール / ネットワーク / 例外) | ✅ 自動 | ✅ 自動 | ⚠️ オプトイン(`bidi: true` + `webSocketUrl`) |
| スクリーンキャスト(フィルムストリップ / ビデオ) | CDP プッシュ | CDP プッシュ | ポーリングのみ |
| ライブダッシュボードの A11y タブ + オーバーレイ | ✅ | トレースプレーヤーのみ | トレースプレーヤーのみ |

¹ Selenium はナビゲーションごとに DOM を再構築します。アンカーのタイミングは近似値です(ナビゲーションのスナップショットが、それをトリガーしたコマンドより遅れる場合があります)。
² Nightwatch にはライブの Allure 添付 API がないため、テストごとのアーティファクトはトレース出力ディレクトリに書き出されてマニフェストに記載されますが、Allure のテストには添付されません。
³ Nightwatch の `--retries` は、プラグインのテストごとのフックを再発火させずに内部でテストを再実行するため、リトライ対応のポリシー(`on-first-retry`、`retain-on-first-failure`、…)は `retain-on-failure` に縮退します。
⁴ WebdriverIO はまだフィーチャーレベルの祖先情報を保持していないため、Cucumber のネストは Scenario→Step となります。
⁵ Nightwatch はまだステップごとのネストを付与していません(Feature→Scenario のみ)。