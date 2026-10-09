---
id: dashboard
title: ダッシュボード
description: "DevTools ダッシュボードでテスト実行をライブで確認し、個別のテストやスイートを再実行し、ダッシュボードウィンドウとバックエンドを設定します。"
---

ライブモードは、DevTools UI を外部ブラウザウィンドウで開き、テスト実行をリアルタイムでストリーミングします。これは [Trace Mode](/docs/devtools/wdio/trace-mode) に対応するインタラクティブなモードです。Trace Mode は UI を使わず、代わりにポータブルなオフラインアーティファクトを書き出します。ライブモードはデフォルトで有効になっている（`mode: 'live'`）ため、WebdriverIO テストを実行するだけでダッシュボードが起動します。

テストを実行すると、DevTools UI が自動的に外部ブラウザウィンドウで開き、リアルタイムの可視化とともにテストがすぐに実行され始めます。最初の実行が完了した後は、再生ボタンを使って個別のテストやスイートを再実行でき、停止ボタンを使っていつでも実行中のテストを終了できます。

## ダッシュボードに表示される内容

- **ライブブラウザプレビュー** — コマンドの実行に合わせて、テスト対象のブラウザを確認できます。
- **テストの進捗** — スイートとテストが実行に合わせて更新されます。
- **コマンドの実行** — 各アクションが発生と同時にストリーミングされます。
- **ワークベンチタブ** — 選択したテストの Actions、Console、Network、Metadata、Source を確認できます。

## ライブモードの機能

- **[インタラクティブなテスト再実行と可視化](/docs/devtools/wdio/interactive-test-rerunning)** — テスト再実行が可能なリアルタイムのブラウザプレビュー
- **[保存と再実行（比較）](/docs/devtools/wdio/preserve-and-rerun)** — 失敗したテストのスナップショットを取り、再実行して、2 つの実行結果を並べて差分を比較
- **[コンソールログ](/docs/devtools/wdio/console-logs)** — ブラウザのコンソール出力をキャプチャして確認
- **[ネットワークログ](/docs/devtools/wdio/network-logs)** — API 呼び出しとネットワークアクティビティを監視
- **[メタデータ](/docs/devtools/wdio/metadata)** — ブラウザセッションごとのセッション capabilities、環境、タイミング
- **[TestLens](/docs/devtools/wdio/testlens)** — インテリジェントなコードナビゲーションでソースコードに移動
- **[マルチフレームワークサポート](/docs/devtools/wdio/multi-framework-support)** — Mocha、Jasmine、Cucumber に対応
- **[セッションスクリーンキャスト](/docs/devtools/wdio/screencast)** — ブラウザセッションの自動ビデオ録画

## ダッシュボードウィンドウの設定

`port`、`hostname`、`devtoolsCapabilities` オプションで、DevTools UI サーバーと、それが開くウィンドウを制御します。詳細は [設定リファレンス](/docs/devtools/reference) を参照してください。

## バックエンドを単独で実行する

アダプターはダッシュボードサーバーをインプロセスで起動するため、通常はサーバーを直接操作する必要はありません。また、スタンドアロンのバイナリとしても提供されています。ダッシュボードを 1 回の実行よりも長く存続させたい場合や、Python アダプターのようにテストが JavaScript ではない場合（[Selenium](/docs/devtools/selenium) のページを参照）には、こちらを使用します。

```bash
npx @wdio/devtools-backend
```

```
Usage: devtools-backend [options]

Options:
  --port <number>     Preferred port; a free one is chosen if it is taken
  --hostname <host>   Host to bind (default: localhost)
  -h, --help          Show this message
```

`--port` は*希望*であり、保証ではありません。そのポートが使用中の場合、サーバーは失敗する代わりに空いているポートにバインドします。実際にバインドしたポートが出力されるので、指定したポートではなく、この行を確認してください。

```
devtools-backend listening at http://localhost:3000
```

`DEVTOOLS_PORT`（すべてのアダプターがこれに対応しています）で、すでにリッスンしているサーバーを指定すると、実行は 2 つ目のサーバーを起動する代わりに、そのサーバーに接続します。

もう 1 つのバイナリである `show-trace` は、トレースアーカイブをオフラインプレーヤーで開きます。[Trace Player](/docs/devtools/trace-player) を参照してください。