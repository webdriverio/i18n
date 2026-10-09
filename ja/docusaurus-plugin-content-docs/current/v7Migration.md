---
id: v7-migration
title: v6からv7へ
description: "依存関係の更新、設定ファイルの変換、Cucumberのステップ定義の更新により、WebdriverIOプロジェクトをv6からv7にアップグレードします。"
---

このチュートリアルは、まだWebdriverIOの`v6`を使用していて、`v7`に移行したい方向けです。[リリースブログ記事](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released)で述べたように、変更点はほとんどが内部的なものであり、アップグレードは簡単なプロセスで済むはずです。

:::info

WebdriverIO `v5`以下を使用している場合は、まず`v6`にアップグレードしてください。[v6移行ガイド](v6-migration)をご確認ください。

:::

完全に自動化されたプロセスがあれば理想的ですが、現実はそうではありません。セットアップは人それぞれ異なります。各ステップは段階的な手順というよりも、ガイダンスとして捉えてください。移行で問題が発生した場合は、遠慮なく[お問い合わせください](https://github.com/webdriverio/codemod/discussions/new)。

## セットアップ

他の移行と同様に、WebdriverIOの[codemod](https://github.com/webdriverio/codemod)を使用できます。このチュートリアルでは、コミュニティメンバーから提供された[ボイラープレートプロジェクト](https://github.com/WarleyGabriel/demo-webdriverio-cucumber)を使用し、`v6`から`v7`へ完全に移行します。

codemodをインストールするには、次を実行します：

```sh
npm install jscodeshift @wdio/codemod
```

#### コミット：

- _install codemod deps_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## WebdriverIOの依存関係をアップグレードする

すべてのWebdriverIOのバージョンは互いに密接に結びついているため、常に特定のタグ（例：`latest`）にアップグレードするのが最善です。そのために、`package.json`からWebdriverIO関連の依存関係をすべてコピーし、次のコマンドで再インストールします：

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

通常、WebdriverIOの依存関係はdev dependenciesに含まれますが、プロジェクトによって異なる場合があります。これを実行すると、`package.json`と`package-lock.json`が更新されるはずです。__注意：__ これらは[サンプルプロジェクト](https://github.com/WarleyGabriel/demo-webdriverio-cucumber)で使用されている依存関係であり、あなたのプロジェクトとは異なる場合があります。

#### コミット：

- _updated dependencies_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## 設定ファイルを変換する

最初のステップとして、設定ファイルから始めるのがよいでしょう。WebdriverIO `v7`では、コンパイラを手動で登録する必要がなくなりました。実際、それらは削除する必要があります。これはcodemodで完全に自動で行うことができます：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

codemodはまだTypeScriptプロジェクトをサポートしていません。[`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10)をご覧ください。近日中にサポートを実装できるよう取り組んでいます。TypeScriptを使用している場合は、ぜひご協力ください！

:::

#### コミット：

- _transpile config file_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## ステップ定義を更新する

JasmineまたはMochaを使用している場合は、これで完了です。最後のステップは、Cucumber.jsのインポートを`cucumber`から`@cucumber/cucumber`に更新することです。これもcodemodで自動的に行うことができます：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

以上です！これ以上の変更は必要ありません 🎉

#### コミット：

- _transpile step definitions_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## まとめ

このチュートリアルが、WebdriverIO `v7`への移行プロセスの一助となれば幸いです。コミュニティは、さまざまな組織のさまざまなチームでテストしながら、codemodの改善を続けています。フィードバックがある場合は遠慮なく[issueを作成](https://github.com/webdriverio/codemod/issues/new)し、移行プロセスで困ったことがあれば[ディスカッションを開始](https://github.com/webdriverio/codemod/discussions/new)してください。