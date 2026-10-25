---
id: devtools
title: DevTools
description: "WebdriverIO、Nightwatch.js、Selenium WebDriver で動作するブラウザベースのデバッグ UI で、テスト実行を可視化、制御、検査できます。"
---

DevTools は、テスト実行をリアルタイムで可視化、制御、検査するための強力なブラウザベースのデバッグインターフェースです。**WebdriverIO**、**Nightwatch.js**、**Selenium WebDriver**（任意のランナー）、**Python Selenium** で動作し、同じバックエンド、同じ UI、同じキャプチャ基盤を使用します。

## 提供される機能

- **テストの選択的な再実行** - 任意のテストケースまたはスイートをクリックすると、即座に再実行できます（[詳細](/docs/devtools/wdio/interactive-test-rerunning)）
- **保存と再実行（比較）** - 失敗したテストのスナップショットを取得して再実行し、2 つの実行結果をコマンド単位で揃えて並べて差分を比較できます（[詳細](/docs/devtools/wdio/preserve-and-rerun)）
- **視覚的なデバッグ** - 各コマンドの後に自動で取得されるスクリーンショットにより、ブラウザのライブプレビューを確認できます
- **実行の追跡** - タイムスタンプと結果を含む詳細なコマンドログを表示できます
- **ネットワークとコンソールの監視** - API 呼び出しと JavaScript ログを検査できます（[ネットワーク](/docs/devtools/wdio/network-logs) · [コンソール](/docs/devtools/wdio/console-logs)）
- **コードへの移動** - TestLens を使ってテストのソースファイルに直接ジャンプできます（[詳細](/docs/devtools/wdio/testlens)）
- **セッションの録画** - セッションごとにブラウザの連続した `.webm` 動画を記録します（[詳細](/docs/devtools/wdio/screencast)）
- **モバイル** - Appium セッション（モバイルブラウザ、ネイティブアプリ、ハイブリッドアプリ）をライブモードとトレースモードで扱えます（[詳細](/docs/devtools/mobile)）
- **トレースモード** - オフラインでのリプレイやエージェントによる利用のために、ポータブルな `trace.zip` アーティファクトを生成するヘッドレスキャプチャ方式です（[詳細](/docs/devtools/wdio/trace-mode)）

## 仕組み

1. 通常どおりテストを開始します
2. DevTools が自動的に `http://localhost:3000` でブラウザウィンドウを開きます
3. UI にはテスト階層、ブラウザプレビュー、コマンドタイムライン、ログがリアルタイムで表示されます
4. テスト完了後、任意のテストをクリックすると再実行できます。再実行は新しいテストプロセスで行われ、同じダッシュボードウィンドウにストリーミングされます

## フレームワークを選択する

- **[WebDriverIO](/docs/devtools/wdio)** - Mocha、Jasmine、または Cucumber で `@wdio/devtools-service` を使用します
- **[Nightwatch](/docs/devtools/nightwatch)** - テストコードを一切変更せずに `@wdio/nightwatch-devtools` を使用します
- **[Selenium](/docs/devtools/selenium)** - Mocha、Jest、Cucumber、またはプレーンな Node スクリプトで `@wdio/selenium-devtools` を使用します
- **[Python Selenium](/docs/devtools/selenium)** - pytest またはプレーンなスクリプトで `selenium-devtools-py` を使用します（Python タブを参照してください）