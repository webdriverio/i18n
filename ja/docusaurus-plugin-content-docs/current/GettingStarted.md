---
id: gettingstarted
title: はじめに
---

WebdriverIOのドキュメントへようこそ。このドキュメントは素早く始めるのに役立ちます。問題が発生した場合は、[Discordサポートサーバー](https://discord.webdriver.io)で助けと回答を見つけることができるか、[𝕏](https://x.com/webdriverio)で質問することができます。

:::info
これはWebdriverIOの最新バージョン（__>=9.x__）のドキュメントです。まだ古いバージョンを使用している場合は、[古いドキュメントウェブサイト](/versions)をご覧ください！
:::

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

:::tip 公式YouTubeチャンネル 🎥

WebdriverIOに関するより多くの動画は[公式YouTubeチャンネル](https://youtube.com/@webdriverio)で見つけることができます。チャンネル登録をお忘れなく！

:::

## WebdriverIOセットアップを開始する

既存または新しいプロジェクトに[WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio)を使用して完全なWebdriverIOセットアップを追加するには、次のコマンドを実行します：

既存のプロジェクトのルートディレクトリにいる場合は、次のコマンドを実行します：

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

または新しいプロジェクトを作成したい場合：

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

または新しいプロジェクトを作成したい場合：

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

または新しいプロジェクトを作成したい場合：

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

または新しいプロジェクトを作成したい場合：

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

このコマンド一つでWebdriverIO CLIツールをダウンロードし、テストスイートの設定を支援する設定ウィザードを実行します。

<CreateProjectAnimation />

ウィザードはセットアップをガイドする一連の質問を表示します。`--yes`パラメータを渡すと、[ページオブジェクト](https://martinfowler.com/bliki/PageObject.html)パターンを使用してChromeでMochaを使用するデフォルト設定を選択できます。

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

## CLIを手動でインストールする

次のように、プロジェクトに手動でCLIパッケージを追加することもできます：

```sh
npm i --save-dev @wdio/cli
npx wdio --version # 例えば「8.13.10」と表示されます

# 設定ウィザードを実行
npx wdio config
```

## テストを実行する

`run`コマンドを使用して、先ほど作成したWebdriverIO設定ファイルを指定することで、テストスイートを開始できます：

```sh
npx wdio run ./wdio.conf.js
```

特定のテストファイルを実行したい場合は、`--spec`パラメータを追加できます：

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

または設定ファイルでスイートを定義して、そのスイートで定義されたテストファイルのみを実行することもできます：

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## スクリプト内で実行する

Node.JSスクリプト内で[スタンドアロンモード](/docs/setuptypes#standalone-mode)の自動化エンジンとしてWebdriverIOを使用したい場合は、WebdriverIOを直接インストールしてパッケージとして使用することもできます。例えば、ウェブサイトのスクリーンショットを生成する場合：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__注意：__ すべてのWebdriverIOコマンドは非同期であり、[`async/await`](https://javascript.info/async-await)を使用して適切に処理する必要があります。

## テストを記録する

WebdriverIOは、画面上でテスト操作を記録し、WebdriverIOテストスクリプトを自動的に生成するためのツールを提供しています。詳細については、[Chrome DevTools Recorderでテストを記録する](/docs/record)を参照してください。

## システム要件

[Node.js](http://nodejs.org)がインストールされている必要があります。

- 最も古いアクティブなLTSバージョンであるv18.20.0以上をインストールしてください
- 現在または将来LTSリリースになるリリースのみが公式にサポートされています

現在システムにNodeがインストールされていない場合は、[NVM](https://github.com/creationix/nvm)や[Volta](https://volta.sh/)などのツールを利用して、複数のアクティブなNode.jsバージョンを管理することをお勧めします。NVMは人気のある選択肢ですが、Voltaも良い代替手段です。