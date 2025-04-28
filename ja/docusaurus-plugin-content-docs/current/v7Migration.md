---
id: v7-migration
title: v6からv7へ
---

このチュートリアルは、WebdriverIOの`v6`を使用していて、`v7`に移行したい人向けです。[リリースブログ記事](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released)で述べたように、変更点はほとんどが内部的なもので、アップグレードは比較的簡単なプロセスです。

:::info

WebdriverIO `v5`以前を使用している場合は、まず`v6`にアップグレードしてください。[v6移行ガイド](v6-migration)をご確認ください。

:::

完全に自動化されたプロセスがあればいいのですが、現実は異なります。皆さんそれぞれ異なるセットアップを持っています。各ステップは段階的な指示というよりも、ガイダンスとして見るべきです。移行に問題がある場合は、遠慮なく[お問い合わせ](https://github.com/webdriverio/codemod/discussions/new)ください。

## セットアップ

他の移行と同様に、WebdriverIOの[codemod](https://github.com/webdriverio/codemod)を使用できます。このチュートリアルでは、コミュニティメンバーから提供された[ボイラープレートプロジェクト](https://github.com/WarleyGabriel/demo-webdriverio-cucumber)を使用して、`v6`から`v7`に完全に移行します。

codemodをインストールするには、次のコマンドを実行します：

```sh
npm install jscodeshift @wdio/codemod
```

#### コミット：

- _codemod依存関係のインストール_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## WebdriverIO依存関係のアップグレード

すべてのWebdriverIOバージョンは互いに密接に関連しているため、常に特定のタグ（例：`latest`）にアップグレードすることをお勧めします。そのためには、`package.json`からWebdriverIO関連の依存関係をすべてコピーして、以下のように再インストールします：

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

通常、WebdriverIO依存関係は開発依存関係の一部ですが、プロジェクトによって異なる場合があります。これにより、`package.json`と`package-lock.json`が更新されるはずです。__注意：__ これらは[サンプルプロジェクト](https://github.com/WarleyGabriel/demo-webdriverio-cucumber)で使用されている依存関係であり、あなたのプロジェクトでは異なる場合があります。

#### コミット：

- _依存関係の更新_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## 設定ファイルの変換

最初のステップとして、設定ファイルから始めるのが良いでしょう。WebdriverIO `v7`では、コンパイラを手動で登録する必要がなくなりました。実際、それらを削除する必要があります。これはcodemodを使用して完全に自動化できます：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

codemodはまだTypeScriptプロジェクトをサポートしていません。[`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10)を参照してください。私たちはすぐにサポートを実装するために取り組んでいます。TypeScriptを使用している場合は、ぜひご協力ください！

:::

#### コミット：

- _設定ファイルの変換_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## ステップ定義の更新

JasmineまたはMochaを使用している場合は、これで完了です。最後のステップは、Cucumber.jsのインポートを`cucumber`から`@cucumber/cucumber`に更新することです。これもcodemodを使って自動的に行えます：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

これで完了です！他に変更は必要ありません 🎉

#### コミット：

- _ステップ定義の変換_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## 結論

このチュートリアルがWebdriverIO `v7`への移行プロセスの参考になれば幸いです。コミュニティは様々なチームや組織でテストしながら、codemodの改善を続けています。フィードバックがある場合は[問題を報告](https://github.com/webdriverio/codemod/issues/new)したり、移行プロセスで困ったことがあれば[ディスカッションを開始](https://github.com/webdriverio/codemod/discussions/new)したりすることをためらわないでください。