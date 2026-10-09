---
id: gettingstarted
title: はじめに
description: npm init wdio@latest で WebdriverIO プロジェクトを作成し、最初のテストを実行して、お使いのプラットフォーム向けの次のガイドを見つけましょう。
---

1つのコマンドで既存または新規のプロジェクトに WebdriverIO をセットアップし、最初のテストを実行しましょう。設定ウィザードは、何をテストしたいか（Web、モバイル、デスクトップ、または VS Code 拡張機能）、どのフレームワークとレポーターを使用するかを尋ね、必要なものをすべてインストールします。

:::info
これは WebdriverIO __v10__ のドキュメントです。まだ v9 をお使いですか？[v9 ドキュメント](https://v9.webdriver.io)を使用するか、[v10 移行ガイド](/docs/v10-migration)に従ってください。
:::

:::tip コーディングエージェントを使用していますか？
エージェントに [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) を参照させるか、`https://webdriver.io/mcp` のドキュメント MCP サーバーに接続してください。詳しくは [WebdriverIO for Coding Agents](/docs/ai-agents) をご覧ください。
:::

## WebdriverIO のセットアップを開始する

[WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio) は、既存または新規のプロジェクトに完全な WebdriverIO セットアップを追加します。既存プロジェクトのルートディレクトリで、次を実行します：

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest .
```

新しいプロジェクトを作成したい場合は：

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

新しいプロジェクトを作成したい場合は：

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

新しいプロジェクトを作成したい場合は：

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

新しいプロジェクトを作成したい場合は：

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

この1つのコマンドで WebdriverIO CLI ツールがダウンロードされ、テストスイートの設定を支援する設定ウィザードが実行されます。

<CreateProjectAnimation />

ウィザードは、セットアップをガイドする一連の質問を表示します。`--yes` パラメータを渡すと、[Page Object](https://martinfowler.com/bliki/PageObject.html) パターンを使用し、Mocha と Chrome を使うデフォルトのセットアップを選択できます。

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest . -- --yes
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio . --yes
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest . --yes
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest . --yes
```

</TabItem>
</Tabs>

### フラグでウィザードに回答する

ウィザードのすべての質問には、対応するコマンドラインフラグがあります。フラグはその質問に回答し、ウィザードは残りの質問だけを尋ねます。`--yes` と組み合わせると、ウィザードは残りの質問にデフォルト値を使用し、一切プロンプトを表示しません。これはコーディングエージェントや CI ジョブに必要な動作です：

```sh
# JavaScript で Cucumber を使用し、spec と JUnit レポーターを使用
npm init wdio@latest . -- --yes --framework cucumber --no-typescript --reporters spec,junit

# Chrome の代わりに Firefox と Edge を使用
npm init wdio@latest . -- --yes --browsers firefox,edge

# Appium を使用した Android アプリ
npm init wdio@latest . -- --yes --mobile-environment android

# React コンポーネントテスト
npm init wdio@latest . -- --yes --runner component --preset react

# 設定ファイルは書き出すが、依存関係は自分でインストールする
npm init wdio@latest . -- --yes --no-npm-install
```

Yarn、pnpm、bun では、`--` セパレーターなしでフラグを渡します。例：`pnpm create wdio@latest . --yes --framework cucumber`

最も一般的なフラグ：

| フラグ | 値 |
| --- | --- |
| `--runner` | `e2e`（デフォルト）、`component`、`desktop`、`vscode`、`roku` |
| `--framework` | `mocha`（デフォルト）、`jasmine`、`cucumber`、`serenity-mocha`、`serenity-jasmine`、`serenity-cucumber` |
| `--typescript` / `--no-typescript` | プロジェクトに `tsconfig.json` がある場合は TypeScript がデフォルト |
| `--browsers` | `chrome`（デフォルト）、`firefox`、`safari`、`edge` のカンマ区切りリスト |
| `--mobile-environment` | `android`、`ios` |
| `--backend` | `local`（デフォルト）、`saucelabs`、`browserstack`、`experitest`、`grid`、`other` |
| `--preset` | `lit`、`vue`、`svelte`、`solid`、`stencil`、`react`、`preact`、`other`（`--runner component` と併用） |
| `--desktop-framework` | `electron`、`tauri`、`dioxus`、`macos`（`--runner desktop` と併用） |
| `--reporters`、`--services`、`--plugins` | カンマ区切りの短縮名。例：`--reporters spec,junit --services visual` |
| `--agent-support` / `--no-agent-support` | `AGENTS.md` セクションと `wdio-session` スキルを書き出す（デフォルトで有効） |
| `--npm-install` / `--no-npm-install` | 依存関係をインストールする（デフォルトで有効） |

`npm init wdio@latest -- --help` を実行すると、すべてのフラグ、受け付ける値、および回答する質問が一覧表示されます。ブール型のフラグには `--no-` プレフィックスを付けられます。同じフラグは `npx wdio config` でも使用できます。

ウィザードは各フラグをセットアップ内容と照合します。不明な値、ウィザードが尋ねない質問に対するフラグ、またはセットアップで提示されない値が指定された場合、ファイルを書き出す前に終了コード 2 で停止します：

```
Error: --preset does not apply to this setup. UI framework of your components (with --runner component).
```

## CLI を手動でインストールする

次の方法で、CLI パッケージをプロジェクトに手動で追加することもできます：

```sh
npm i --save-dev @wdio/cli
npx wdio --version # 例：`8.13.10` と表示されます

# 設定ウィザードを実行
npx wdio config
```

## テストを実行する

`run` コマンドを使用し、作成した WebdriverIO の設定ファイルを指定することで、テストスイートを開始できます：

```sh
npx wdio run ./wdio.conf.js
```

特定のテストファイルを実行したい場合は、`--spec` パラメータを追加できます：

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

または、設定ファイルでスイートを定義し、スイートで定義されたテストファイルのみを実行することもできます：

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## スクリプト内で実行する

Node.JS スクリプト内で [スタンドアロンモード](/docs/setuptypes#standalone-mode) の自動化エンジンとして WebdriverIO を使用したい場合は、WebdriverIO を直接インストールしてパッケージとして使用することもできます。例えば、Web サイトのスクリーンショットを生成する場合：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__注意：__ WebdriverIO のすべてのコマンドは非同期であり、[`async/await`](https://javascript.info/async-await) を使用して適切に処理する必要があります。

## テストを記録する

WebdriverIO は、画面上でのテスト操作を記録し、WebdriverIO のテストスクリプトを自動的に生成することで、すぐに始められるツールを提供しています。詳しくは [Chrome DevTools Recorder でテストを記録する](/docs/record) をご覧ください。

## システム要件

[Node.js](http://nodejs.org) がインストールされている必要があります。

- サポートされている最も古い LTS バージョンである v22.19.0 以上をインストールしてください
- LTS リリースである、または LTS リリースになる予定のリリースのみが公式にサポートされています

現在システムに Node がインストールされていない場合は、複数の Node.js バージョンを管理するために [NVM](https://github.com/creationix/nvm) や [Volta](https://volta.sh/) などのツールの利用をおすすめします。NVM は人気のある選択肢ですが、Volta も優れた代替手段です。

## 紹介動画を見る

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

その他の動画は [公式 YouTube チャンネル](https://youtube.com/@webdriverio) でご覧いただけます。

## 次のステップ

- プラットフォームを選択する：[Web ブラウザ](/docs/platforms/web)、[モバイルアプリ](/docs/platforms/mobile)、[デスクトップアプリ](/docs/platforms/desktop)、または [拡張機能とエディタ](/docs/platforms/apps-and-extensions)
- [要素の選択](/docs/selectors) と [アサーション](/docs/assertion) の書き方を学ぶ
- [`wdio.conf.ts`](/docs/configurationfile) でテストランナーを設定する
- [Discord](https://discord.webdriver.io) でサポートを受ける