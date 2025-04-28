---
id: v6-migration
title: v5からv6へ
---

このチュートリアルは、WebdriverIOの`v5`をまだ使用していて、`v6`または最新バージョンのWebdriverIOに移行したい人のためのものです。[リリースブログ記事](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released)で言及されているように、このバージョンアップグレードの変更点は以下のようにまとめられます：

- 一部のコマンド（例：`newWindow`、`react$`、`react$$`、`waitUntil`、`dragAndDrop`、`moveTo`、`waitForDisplayed`、`waitForEnabled`、`waitForExist`）のパラメータを統合し、すべてのオプションパラメータを単一のオブジェクトに移動しました。例：

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

- 一部のサービスオプションは簡素化のために名前が変更されました
- Chrome WebDriverセッション用のコマンド`launchApp`を`launchChromeApp`に変更しました

:::info

WebdriverIO `v4`以下を使用している場合は、まず`v5`にアップグレードしてください。

:::

完全に自動化されたプロセスがあればよいのですが、現実は異なります。セットアップはそれぞれ異なります。各ステップは手順書というよりもガイダンスとして見るべきです。移行に問題がある場合は、遠慮なく[お問い合わせください](https://github.com/webdriverio/codemod/discussions/new)。

## セットアップ

他の移行と同様に、WebdriverIO [codemod](https://github.com/webdriverio/codemod)を使用できます。codemodをインストールするには、次のコマンドを実行します：

```sh
npm install jscodeshift @wdio/codemod
```

## WebdriverIO依存関係のアップグレード

すべてのWebdriverIOバージョンは互いに密接に関連しているため、常に特定のタグ（例：`6.12.0`）にアップグレードするのが最善です。`v5`から直接`v7`にアップグレードする場合は、タグを省略してすべてのパッケージの最新バージョンをインストールできます。そのためには、`package.json`からWebdriverIO関連のすべての依存関係をコピーし、以下のコマンドで再インストールします：

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

通常、WebdriverIO依存関係は開発依存関係の一部ですが、プロジェクトによって異なる場合があります。これにより、`package.json`と`package-lock.json`が更新されるはずです。__注意：__ これらはサンプルの依存関係であり、あなたのものは異なる場合があります。例えば、以下のコマンドを呼び出して、最新のv6バージョンを探してください：

```sh
npm show webdriverio versions
```

すべてのコアWebdriverIOパッケージで利用可能な最新のバージョン6をインストールしてください。コミュニティパッケージについては、パッケージによって異なる場合があります。ここでは、どのバージョンがv6と互換性があるかについての情報を得るために、変更履歴を確認することをお勧めします。

## 設定ファイルの変換

良い最初のステップは、設定ファイルから始めることです。すべての破壊的変更は、codemodを使用して完全に自動的に解決できます：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

codemodはまだTypeScriptプロジェクトをサポートしていません。[`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10)を参照してください。私たちはすぐにサポートを実装するために取り組んでいます。TypeScriptを使用している場合は、ぜひ参加してください！

:::

## スペックファイルとページオブジェクトの更新

すべてのコマンド変更を更新するには、WebdriverIOコマンドを含むすべてのe2eファイルに対してcodemodを実行します：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

これで完了です！他に変更は必要ありません 🎉

## 結論

このチュートリアルがWebdriverIO `v6`への移行プロセスをガイドするのに役立つことを願っています。`v7`への更新は破壊的変更がほとんどないため簡単であるため、最新バージョンへのアップグレードを続けることを強くお勧めします。[v7へのアップグレード](v7-migration)の移行ガイドをご確認ください。

コミュニティは様々な組織の様々なチームでテストしながらcodemodを改善し続けています。フィードバックがある場合は[イシューを作成](https://github.com/webdriverio/codemod/issues/new)したり、移行プロセスで問題が発生した場合は[ディスカッションを開始](https://github.com/webdriverio/codemod/discussions/new)したりすることを躊躇しないでください。