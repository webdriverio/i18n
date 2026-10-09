---
id: devtools
title: DevTools
description: "WebdriverIO、Nightwatch.js、Selenium WebDriverで動作するブラウザベースのデバッグUIで、テスト実行を可視化、制御、検査できます。"
---

DevToolsは、テスト実行をリアルタイムで可視化、制御、検査するための強力なブラウザベースのデバッグインターフェースです。**WebdriverIO**、**Nightwatch.js**、**Selenium WebDriver**（任意のランナー）で動作し、同じバックエンド、同じUI、同じキャプチャ基盤を共有しています。

## 提供される機能

- **テストの選択的な再実行** - 任意のテストケースやスイートをクリックすると、即座に再実行できます（[詳細](/docs/devtools/wdio/interactive-test-rerunning)）
- **保存と再実行（比較）** - 失敗したテストのスナップショットを取得して再実行し、2つの実行結果をコマンドごとに揃えて並べて差分を比較できます（[詳細](/docs/devtools/wdio/preserve-and-rerun)）
- **視覚的なデバッグ** - 各コマンドの後に自動で撮影されるスクリーンショットにより、ブラウザのライブプレビューを確認できます
- **実行の追跡** - タイムスタンプと結果を含む詳細なコマンドログを表示できます
- **ネットワークとコンソールの監視** - API呼び出しとJavaScriptログを検査できます（[ネットワーク](/docs/devtools/wdio/network-logs) · [コンソール](/docs/devtools/wdio/console-logs)）
- **コードへの移動** - TestLensを使ってテストのソースファイルに直接ジャンプできます（[詳細](/docs/devtools/wdio/testlens)）
- **セッションの録画** - セッションごとにブラウザの連続した `.webm` 動画を記録します（[詳細](/docs/devtools/wdio/screencast)）
- **トレースモード** - オフラインでの再生やエージェントによる利用のために、ポータブルな `trace.zip` アーティファクトを生成するヘッドレスキャプチャ方式です（[詳細](/docs/devtools/wdio/trace-mode)）

## 仕組み

1. 通常どおりテストを開始します
2. DevToolsが自動的に `http://localhost:3000` でブラウザウィンドウを開きます
3. UIにテスト階層、ブラウザプレビュー、コマンドタイムライン、ログがリアルタイムで表示されます
4. テスト完了後、任意のテストをクリックすると、同じブラウザセッション内でそのテストを個別に再実行できます

## フレームワークを選択

- **[WebDriverIO](/docs/devtools/wdio)** - Mocha、Jasmine、またはCucumberで `@wdio/devtools-service` を使用します
- **[Nightwatch](/docs/devtools/nightwatch)** - テストコードを一切変更せずに `@wdio/nightwatch-devtools` を使用します
- **[Selenium](/docs/devtools/selenium)** - Mocha、Jest、Cucumber、またはプレーンなNodeスクリプトで `@wdio/selenium-devtools` を使用します