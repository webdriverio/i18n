---
id: visual-reporter
title: ビジュアルレポーター
---

ビジュアルレポーターは、`@wdio/visual-service`のバージョン[v5.2.0](https://github.com/webdriverio/visual-testing/releases/tag/%40wdio%2Fvisual-service%405.2.0)から導入された新機能です。このレポーターを使用すると、ビジュアルテスティングサービスによって生成されたJSON差分レポートを視覚化し、人間が読みやすい形式に変換することができます。グラフィカルインターフェースを提供して出力の確認を容易にすることで、チームがビジュアルテスト結果をより適切に分析・管理できるようにします。

この機能を利用するには、必要な`output.json`ファイルを生成するための設定が必要です。このドキュメントでは、ビジュアルレポーターの設定、実行、理解について説明します。

# 前提条件

ビジュアルレポーターを使用する前に、JSONレポートファイルを生成するようにビジュアルテスティングサービスを設定していることを確認してください：

```ts
export const config = {
    // ...
    services: [
        [
            "visual",
            {
                createJsonReportFiles: true, // output.jsonファイルを生成します
            },
        ],
    ],
};
```

より詳細な設定手順については、WebdriverIOの[ビジュアルテスティングドキュメント](./)または[`createJsonReportFiles`](./service-options.md#createjsonreportfiles-new)を参照してください。

# インストール

ビジュアルレポーターをインストールするには、npmを使用してプロジェクトに開発依存関係として追加します：

```bash
npm install @wdio/visual-reporter --save-dev
```

これにより、ビジュアルテストからレポートを生成するために必要なファイルが利用可能になります。

# 使用方法

## ビジュアルレポートの作成

ビジュアルテストを実行して`output.json`ファイルが生成された後、CLIまたはインタラクティブプロンプトを使用してビジュアルレポートを作成できます。

### CLIの使用方法

以下のCLIコマンドを実行してレポートを生成できます：

```bash
npx wdio-visual-reporter --jsonOutput=<output.jsonへのパス> --reportFolder=<レポート保存先パス> --logLevel=debug
```

#### 必須オプション：

- `--jsonOutput`：ビジュアルテスティングサービスによって生成された`output.json`ファイルへの相対パス。このパスはコマンドを実行するディレクトリからの相対パスです。
- `--reportFolder`：生成されたレポートが保存される相対ディレクトリ。このパスもコマンドを実行するディレクトリからの相対パスです。

#### オプションのオプション：

- `--logLevel`：詳細なログを取得するには`debug`に設定します。トラブルシューティングに特に役立ちます。

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
`path/to/report/index.html`を**ローカルサーバーから提供せずに**ブラウザで直接開くと**動作しません**。
:::

レポートを表示するには、[sirv-cli](https://www.npmjs.com/package/sirv-cli)のような簡単なサーバーを使用する必要があります。次のコマンドでサーバーを起動できます：

```bash
npx sirv-cli /path/to/report --single
```

これにより、以下の例のようなログが生成されます。ポート番号は異なる場合があります：

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

ブラウザで提供されたURLを開いてレポートを表示できます。

### インタラクティブプロンプトの使用

または、次のコマンドを実行し、プロンプトに答えてレポートを生成することもできます：

```bash
npx @wdio/visual-reporter
```

プロンプトでは、必要なパスとオプションを提供するようガイドします。最後に、インタラクティブプロンプトではレポートを表示するためのサーバーを起動するかどうかも尋ねられます。サーバーを起動することを選択すると、ツールは簡単なサーバーを起動し、ログにURLを表示します。ブラウザでこのURLを開いてレポートを表示できます。

![ビジュアルレポーターCLI](/img/visual/cli-screen-recording.gif)

![ビジュアルレポーター](/img/visual/visual-reporter.gif)

#### レポートの表示

:::warning
`path/to/report/index.html`を**ローカルサーバーから提供せずに**ブラウザで直接開くと**動作しません**。
:::

インタラクティブプロンプトでサーバーを起動することを**選択しなかった**場合でも、次のコマンドを手動で実行してレポートを表示できます：

```bash
npx sirv-cli /path/to/report --single
```

これにより、以下の例のようなログが生成されます。ポート番号は異なる場合があります：

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

ブラウザで提供されたURLを開いてレポートを表示できます。

# レポートデモ

レポートの表示例を確認するには、[GitHub Pagesデモ](https://webdriverio.github.io/visual-testing/)にアクセスしてください。

# ビジュアルレポートの理解

ビジュアルレポーターは、ビジュアルテスト結果の整理された表示を提供します。各テスト実行について、以下のことが可能です：

- テストケース間を簡単に移動し、集計結果を確認する。
- テスト名、使用されたブラウザ、比較結果などのメタデータを確認する。
- 視覚的な差異が検出された場所を示す差分画像を表示する。

この視覚的な表現により、テスト結果の分析が簡素化され、視覚的な回帰を特定して対処することが容易になります。

# CI統合

私たちはJenkins、GitHub Actionsなどの異なるCIツールのサポートに取り組んでいます。お手伝いいただける場合は、[Discord - Visual Testing](https://discord.com/channels/1097401827202445382/1186908940286574642)でご連絡ください。