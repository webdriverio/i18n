---
id: visual-reporter
title: ビジュアルレポーター
description: "@wdio/visual-serviceのJSON出力からビジュアルレポーターを生成・閲覧し、ローカルまたはCIでビジュアルテストの差分を確認します。"
---

ビジュアルレポーターは、`@wdio/visual-service`のバージョン[v5.2.0](https://github.com/webdriverio/visual-testing/releases/tag/%40wdio%2Fvisual-service%405.2.0)から導入された新機能です。このレポーターを使用すると、Visual Testingサービスによって生成されたJSON差分レポートを可視化し、人間が読みやすい形式に変換することができます。出力を確認するためのグラフィカルインターフェースを提供することで、チームがビジュアルテストの結果をより適切に分析・管理できるようになります。

この機能を利用するには、必要な`output.json`ファイルを生成するための設定がされていることを確認してください。このドキュメントでは、ビジュアルレポーターのセットアップ、実行、および理解の方法について説明します。

# 前提条件

ビジュアルレポーターを使用する前に、JSONレポートファイルを生成するようにVisual Testingサービスを設定していることを確認してください：

```ts
export const config = {
    // ...
    services: [
        [
            "visual",
            {
                createJsonReportFiles: true, // Generates the output.json file
            },
        ],
    ],
};
```

より詳細なセットアップ手順については、WebdriverIOの[ビジュアルテストのドキュメント](./)または[`createJsonReportFiles`](./service-options.md#createjsonreportfiles-new)を参照してください。

# インストール

ビジュアルレポーターをインストールするには、npmを使用してプロジェクトの開発依存関係として追加します：

```bash
npm install @wdio/visual-reporter --save-dev
```

これにより、ビジュアルテストからレポートを生成するために必要なファイルが利用可能になります。

# 使用方法

## ビジュアルレポートのビルド

ビジュアルテストを実行して`output.json`ファイルが生成されたら、CLIまたは対話型プロンプトのいずれかを使用してビジュアルレポートをビルドできます。

### CLIの使用

次のコマンドを実行して、CLIでレポートを生成できます：

```bash
npx wdio-visual-reporter --jsonOutput=<path-to-output.json> --reportFolder=<path-to-store-report> --logLevel=debug
```

#### 必須オプション：

-   `--jsonOutput`：Visual Testingサービスによって生成された`output.json`ファイルへの相対パス。このパスは、コマンドを実行するディレクトリからの相対パスです。
-   `--reportFolder`：生成されたレポートが保存される相対ディレクトリ。このパスも、コマンドを実行するディレクトリからの相対パスです。

#### オプションのオプション：

-   `--logLevel`：`debug`に設定すると詳細なログが出力され、特にトラブルシューティングに役立ちます。

#### 例

```bash
npx wdio-visual-reporter --jsonOutput=/path/to/output.json --reportFolder=/path/to/report --logLevel=debug
```

これにより、指定されたフォルダにレポートが生成され、コンソールにフィードバックが表示されます。例えば：

```bash
✔ Build output copied successfully to "/path/to/report".
⠋ Prepare report assets...
✔ Successfully generated the report assets.
```

#### レポートの表示

:::warning
**ローカルサーバーから配信せずに**`path/to/report/index.html`をブラウザで直接開いても、**動作しません**。
:::

レポートを表示するには、[sirv-cli](https://www.npmjs.com/package/sirv-cli)のようなシンプルなサーバーを使用する必要があります。次のコマンドでサーバーを起動できます：

```bash
npx sirv-cli /path/to/report --single
```

これにより、以下の例のようなログが出力されます。ポート番号は異なる場合があります：

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

表示されたURLをブラウザで開くと、レポートを確認できます。

### 対話型プロンプトの使用

あるいは、次のコマンドを実行してプロンプトに回答することで、レポートを生成することもできます：

```bash
npx @wdio/visual-reporter
```

プロンプトが、必要なパスとオプションの指定方法を案内します。最後に、対話型プロンプトはレポートを表示するためにサーバーを起動するかどうかも尋ねます。サーバーの起動を選択すると、ツールがシンプルなサーバーを起動し、ログにURLを表示します。このURLをブラウザで開くと、レポートを確認できます。

![Visual Reporter CLI](/img/visual/cli-screen-recording.gif)

![Visual Reporter](/img/visual/visual-reporter.gif)

#### レポートの表示

:::warning
**ローカルサーバーから配信せずに**`path/to/report/index.html`をブラウザで直接開いても、**動作しません**。
:::

対話型プロンプトでサーバーを起動**しない**ことを選択した場合でも、次のコマンドを手動で実行することでレポートを表示できます：

```bash
npx sirv-cli /path/to/report --single
```

これにより、以下の例のようなログが出力されます。ポート番号は異なる場合があります：

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

表示されたURLをブラウザで開くと、レポートを確認できます。

# レポートのデモ

レポートの見た目の例については、[GitHub Pagesのデモ](https://webdriverio.github.io/visual-testing/)をご覧ください。

# ビジュアルレポートの理解

ビジュアルレポーターは、ビジュアルテストの結果を整理されたビューで提供します。各テスト実行について、次のことが可能です：

-   テストケース間を簡単に移動し、集計結果を確認する。
-   テスト名、使用したブラウザ、比較結果などのメタデータを確認する。
-   視覚的な差異が検出された箇所を示す差分画像を表示する。

この視覚的な表現により、テスト結果の分析が簡素化され、ビジュアルリグレッションの特定と対処が容易になります。

# CI連携

Jenkins、GitHub Actionsなど、さまざまなCIツールのサポートに取り組んでいます。ご協力いただける場合は、[Discord - Visual Testing](https://discord.com/channels/1097401827202445382/1186908940286574642)までご連絡ください。