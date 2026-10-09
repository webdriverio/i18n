---
id: limitations
title: トレースモードの制限事項
description: "DevTools のトレースモードが意図的にキャプチャしない内容と、WebdriverIO、Selenium、Nightwatch の各アダプターにおける既知の制限事項を確認します。"
---

[トレースモード](/docs/devtools/wdio/trace-mode)が意図的にスキップする内容と、アダプター間の既知のギャップについて説明します。

## トレースモードがスキップする内容

- **DevTools UI ウィンドウ** — ダッシュボード用の Chrome インスタンスは開きません。
- **バックエンドのポートバインド** — localhost のポートは確保されません(v1.2 以降、3 つのアダプターすべてで同等の動作です)。
- **`screencast.enabled`** — ライブモードでの連続的な `.webm` 録画はトレースモードでは無視されます(警告がログに出力されます)。代わりにトレースモードでは、**デフォルトで**高密度の [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) をアーカイブに記録します(アクションごとに 1 フレームにするには `filmstrip: false` を設定します)。さらに、有効にした場合はテストごとの [`video`](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) スライスも記録します。スクリーンキャストの**チューニング**フィールド(`quality`、`maxWidth`、`pollIntervalMs` など)は、実行されるレコーダーに引き続き適用されます。
- **`wdio-trace-<sessionId>.json` ダンプ** — 完全に削除されました。WDIO のライブモードがかつて書き出していたレガシーなモノリシック JSON は廃止されました。ライブモードは現在ダッシュボードにストリーミングし、ディスクには何も書き込みません。`trace.zip` が唯一のトレース成果物です。

## 既知の制限事項

- **Nightwatch BDD `describe/it`** — `traceGranularity: 'test'` は**単一のセッションスコープのスライス**にまとめられます。Nightwatch は個々の `it` を内部で実行し、プラグインが検知できるテストごとのフックを提供しないため、スライスは最初のテストに紐付けられます。メタデータのキャプチャ(マニフェスト内のテストケースごとの状態)には影響しませんが、このインターフェースでは `it` ごとのトレース/スクリーンショット/ビデオの紐付けと、リトライを考慮した保持はセッションスコープに低下します。Nightwatch の **exports-object** および **Cucumber** インターフェースはシナリオごと/テストごとのフックを公開しているため、実際のテストごとのスライスが行われます。(WebdriverIO の mocha/cucumber および Selenium の mocha には影響しません。)
- **Nightwatch のリトライを考慮した保持** — `retain-on-failure` のみが動作します。Nightwatch は `--retries` 時にテストごとのフックを再発火させずにテストケースを内部で再実行するため、その他のリトライを考慮したポリシーは機能が低下します。[保持](/docs/devtools/wdio/trace-mode#retention--tracepolicy)を参照してください。
- **Nightwatch の Allure 添付** — テストごとの `screenshot`/`video` は生成のみ(ファイル + マニフェスト)で、インラインでは添付されません。[Allure 連携](/docs/devtools/allure)を参照してください。
- **Chrome 以外でのビデオ/フィルムストリップ** — CDP のプッシュ経路を持たないブラウザーでは、レコーダーが `takeScreenshot` をポーリングするため、WebDriver のラウンドトリップが増加し、(Allure 使用時は)ステップログが大量に埋め尽くされます。レポーターのステップ抑制オプションと組み合わせて使用してください。