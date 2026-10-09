---
id: allure
title: Allure 連携
description: "トレース zip、スクリーンショット、動画などの DevTools トレースモードのアーティファクトを、Allure レポートに自動的に添付します。"
---

トレースモードのアーティファクト（トレース zip と、各テストごとのスクリーンショットおよび動画）は Allure レポートに自動的に添付されるため、レポートから直接開くことができます。トレースモードを有効にしてこれらのアーティファクトを生成する方法については、[Trace Mode](/docs/devtools/wdio/trace-mode) を参照してください。

Allure レポーターが存在する場合、トレースモードのアーティファクトは Allure レポートに自動的に添付されます。追加の設定は不要です：

- **`traceGranularity: 'test'`** — 各テストの `trace.zip`（`application/zip`、`show-trace` で開けるダウンロード）、`screenshot`（`image/png`、インライン表示）、`video`（`video/webm`、インライン表示）が、そのテストのカードに添付されます。テストごとの Allure レポートを作成する場合は、この粒度を使用してください。
- **`traceGranularity: 'session'` / `'spec'`** — セッション／スペック全体にまたがるトレースはディスクに書き出され、[アーティファクトマニフェスト](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest)に列挙されますが、個々のテストカードには**添付されません**。セッション／スペックのトレースは、そのすべてのテストの実行後にようやく確定されるため、その時点では各テストの Allure カードは既に閉じられており、添付先となる開いているテストが存在しないためです。それでも表示したい場合は、独自の `onComplete` フックでマニフェストを後処理してください。

アダプターごとのサポート：

| アダプター | 添付の仕組み |
|---|---|
| **WebdriverIO** | `@wdio/allure-reporter` の `addAttachment` によるファーストクラスのサポート。 |
| **Selenium** | `allure-js-commons` の `attachment()` を使用 — ランタイムに依存せず、任意の Allure ランナーアダプターで添付されます。アクティブな `allure-js-commons` ランタイムが存在する場合にのみ有効です。 |
| **Nightwatch** | **生成のみ** — ファイルとマニフェストは書き出されますが、インラインでは添付されません（ライブの Allure 添付 API がないため）。 |

**組み込みトレースビューア。** アーカイブは移植性のある標準的なトレースビューアのディスク上フォーマットを使用しているため、Allure レポート自体の**組み込みトレースビューア**（Allure ≥ 2.35）で、添付された `trace.zip` をレポート内で直接開くことができます。

**レポートのノイズ。** トレースモードでは、タイムラインを構築するためにアクションごとに `takeScreenshot` が実行されます。Allure はすべての WebDriver コマンドをステップとして記録し、`takeScreenshot` ごとにスクリーンショットを記録します。この大量の出力はレポーター自身のオプションで抑制できます。トレース／スクリーンショット／動画の添付には影響しません：

```ts
reporters: [
  ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: true
  }]
]
```