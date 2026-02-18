---
id: devtools
title: DevTools
---

DevToolsサービスは、WebdriverIOテスト実行のための強力なブラウザベースのデバッグインターフェースを提供します。対話式のウェブアプリケーションを通じて、リアルタイムでテストを視覚化し、デバッグし、制御することができます。

## 概要

このサービスを使用することで以下が可能になります：

- **テストを選択的に再実行する** - テストケースまたはスイートをクリックして即座に再実行
- **視覚的にデバッグする** - 自動スクリーンショット付きのライブブラウザプレビューを表示
- **実行を追跡する** - タイムスタンプと結果を含む詳細なコマンドログを表示
- **ネットワークとコンソールを監視する** - APIコールとJavaScriptログを検査
- **コードにナビゲートする** - テストのソースファイルに直接ジャンプ

## インストール

サービスを開発依存関係としてインストールします：

```sh
npm install --save-dev @wdio/devtools-service
```

## 設定

WebDriverIO設定にサービスを追加します：

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['devtools'],
    // ...
};
```

### サービスオプション

DevToolsサービスを以下のオプションで設定します：

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['devtools', {
            port: 3000,      // DevTools UIのポート (デフォルト: 3000)
        }]
    ],
    // ...
};
```

#### オプション

- **port** (数値, デフォルト: `3000`) - DevTools UIサーバーのポート番号

## 動作の仕組み

DevToolsサービスを有効にしてWebdriverIOテストを実行すると：

1. サービスが`http://localhost:3000`（設定可能）でブラウザウィンドウを開きます
2. テストは通常通り実行される間、DevTools UIがリアルタイムの更新を表示します
3. UIにはテスト階層、ブラウザプレビュー、コマンドタイムライン、ログが表示されます
4. テスト完了後、任意のテストをクリックして個別に再実行できます
5. テストは高速なデバッグのために同じブラウザセッションで再実行されます

## 機能

DevToolsの機能を詳しく見てみましょう：

- **[対話型テスト再実行と視覚化](devtools/interactive-test-rerunning)** - テスト再実行機能付きのリアルタイムブラウザプレビュー
- **[マルチフレームワークサポート](devtools/multi-framework-support)** - Mocha、Jasmine、Cucumberで動作
- **[コンソールログ](devtools/console-logs)** - ブラウザのコンソール出力を取得して検査
- **[ネットワークログ](devtools/network-logs)** - APIコールとネットワークアクティビティを監視
- **[TestLens](devtools/testlens)** - インテリジェントなコードナビゲーションでソースコードに移動