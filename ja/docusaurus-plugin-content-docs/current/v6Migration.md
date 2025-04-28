---
id: v6-migration
title: v5からv6へ
---

このチュートリアルは、WebdriverIOの`v5`をまだ使用していて、`v6`または最新バージョンのWebdriverIOに移行したい人向けです。[リリースブログ記事](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released)で述べたように、このバージョンアップグレードの変更点は以下のようにまとめられます：

- 一部のコマンド（例：`newWindow`、`react$`、`react$$`、`waitUntil`、`dragAndDrop`、`moveTo`、`waitForDisplayed`、`waitForEnabled`、`waitForExist`）のパラメータを整理し、すべてのオプションパラメータを単一のオブジェクトに移動しました。例：

    ```js
    // v5
    browser.newWindow(
        'https://webdriver.io',
        'WebdriverIO window',
        'width=420,height=230,resizable,scrollbars=yes,status=1'
    )
    // v6
    browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1'
    })
    ```

- サービスの設定がサービスリストに移動しました。例：

    ```js
    // v5
    exports.config = {
        services: ['sauce'],
        sauceConnect: true,
        sauceConnectOpts: { foo: 'bar' },
    }
    // v6
    exports.config = {
        services: [['sauce', {
            sauceConnect: true,
            sauceConnectOpts: { foo: 'bar' }
        }]],
    }
    ```

- 一部のサービスオプションが簡略化のために名前が変更されました
- Chrome WebDriverセッション用のコマンド`launchApp`を`launchChromeApp`に名前変更しました

:::info

WebdriverIO `v4`以下を使用している場合は、まず`v5`にアップグレードしてください。

:::

完全に自動化されたプロセスがあればいいのですが、現実は異なります。誰もが異なるセットアップを持っています。各ステップは、一歩一歩の指示というよりもガイダンスとして見るべきです。移行に問題がある場合は、[お問い合わせ](https://github.com/webdriverio/codemod/discussions/new)することをためらわないでください。

## セットアップ

他の移行と同様に、WebdriverIO [codemod](https://github.com/webdriverio/codemod)を使用できます。codemodeをインストールするには、次のコマンドを実行します：

```sh
npm install jscodeshift @wdio/codemod
```

## WebdriverIO依存関係のアップグレード

すべてのWebdriverIOバージョンは互いに関連しているため、常に特定のタグ（例：`6.12.0`）にアップグレードするのが最善です。`v5`から直接`v7`にアップグレードする場合は、タグを省略して最新バージョンのすべてのパッケージをインストールできます。そのためには、`package.json`からWebdriverIO関連の依存関係をすべてコピーし、次のようにして再インストールします：

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

通常、WebdriverIO依存関係は開発依存関係の一部ですが、プロジェクトによっては異なる場合があります。これにより、`package.json`と`package-lock.json`が更新されるはずです。**注意：**これらはサンプルの依存関係であり、あなたのものは異なる場合があります。次のように呼び出して最新のv6バージョンを見つけてください：

```sh
npm show webdriverio versions
```

すべてのコアWebdriverIOパッケージで利用可能な最新のバージョン6をインストールしてください。コミュニティパッケージの場合は、パッケージごとに異なる場合があります。ここでは、v6と互換性のあるバージョンについての情報を得るために、変更履歴を確認することをお勧めします。

## 設定ファイルの変換

良い最初のステップは、設定ファイルから始めることです。すべての破壊的変更はcodemodeを使用して完全に自動的に解決できます：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

codemodeはまだTypeScriptプロジェクトをサポートしていません。[`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10)を参照してください。近いうちにサポートを実装する予定です。TypeScriptを使用している場合は、ぜひ参加してください！

:::

## スペックファイルとページオブジェクトの更新

すべてのコマンド変更を更新するには、WebdriverIOコマンドを含むすべてのe2eファイルでcodemodeを実行します：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

これで完了です！他に必要な変更はありません 🎉

## 結論

このチュートリアルがWebdriverIO `v6`への移行プロセスをガイドする一助となることを願っています。`v7`へのアップデートはほとんど破壊的な変更がないため簡単であるため、最新バージョンへのアップグレードを続けることを強くお勧めします。[v7へのアップグレード](v7-migration)の移行ガイドをご確認ください。

コミュニティは、さまざまな組織のさまざまなチームとテストしながら、codemodeの改善を続けています。フィードバックがある場合は[問題を提起](https://github.com/webdriverio/codemod/issues/new)するか、移行プロセスで問題がある場合は[ディスカッションを開始](https://github.com/webdriverio/codemod/discussions/new)することをためらわないでください。
```