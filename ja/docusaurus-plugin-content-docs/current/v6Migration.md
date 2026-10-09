---
id: v6-migration
title: v5からv6へ
description: "依存関係の更新、設定ファイルの変換、スペックとページオブジェクトの更新により、WebdriverIOプロジェクトをv5からv6にアップグレードします。"
---

このチュートリアルは、WebdriverIOの`v5`をまだ使用していて、`v6`またはWebdriverIOの最新バージョンに移行したい方を対象としています。[リリースブログ記事](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released)で述べたように、このバージョンアップグレードの変更点は以下のようにまとめられます：

- いくつかのコマンド（例：`newWindow`、`react$`、`react$$`、`waitUntil`、`dragAndDrop`、`moveTo`、`waitForDisplayed`、`waitForEnabled`、`waitForExist`）のパラメータを統合し、すべてのオプションパラメータを単一のオブジェクトに移動しました。例：

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

- サービスの設定がサービスリスト内に移動しました。例：

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

- 簡素化のため、一部のサービスオプションの名前が変更されました
- Chrome WebDriverセッション用のコマンド`launchApp`を`launchChromeApp`に名前変更しました

:::info

WebdriverIO `v4`以前を使用している場合は、まず`v5`にアップグレードしてください。

:::

これを完全に自動化されたプロセスにできれば理想的ですが、現実は異なります。セットアップは人それぞれ異なります。各ステップは、段階的な手順書というよりも、ガイダンスとして捉えてください。移行に関して問題がある場合は、遠慮なく[お問い合わせください](https://github.com/webdriverio/codemod/discussions/new)。

## セットアップ

他の移行と同様に、WebdriverIOの[codemod](https://github.com/webdriverio/codemod)を使用できます。codemodをインストールするには、次を実行します：

```sh
npm install jscodeshift @wdio/codemod
```

## WebdriverIOの依存関係をアップグレードする

すべてのWebdriverIOのバージョンは互いに密接に結びついているため、常に特定のタグ（例：`6.12.0`）にアップグレードするのが最善です。`v5`から直接`v7`にアップグレードすることにした場合は、タグを省略してすべてのパッケージの最新バージョンをインストールできます。そのためには、`package.json`からWebdriverIO関連のすべての依存関係をコピーし、次のように再インストールします：

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

通常、WebdriverIOの依存関係は開発依存関係（dev dependencies）に含まれますが、プロジェクトによって異なる場合があります。この後、`package.json`と`package-lock.json`が更新されているはずです。__注意：__ これらは依存関係の例であり、あなたのものとは異なる場合があります。例えば次のコマンドを実行して、最新のv6バージョンを確認してください：

```sh
npm show webdriverio versions
```

すべてのコアWebdriverIOパッケージについて、利用可能な最新のバージョン6をインストールするようにしてください。コミュニティパッケージについては、パッケージごとに異なる場合があります。ここでは、どのバージョンがまだv6と互換性があるかについて、変更履歴（changelog）を確認することをお勧めします。

## 設定ファイルを変換する

最初のステップとしては、設定ファイルから始めるのが良いでしょう。すべての破壊的変更は、codemodを使用して完全に自動で解決できます：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

codemodはまだTypeScriptプロジェクトをサポートしていません。[`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10)を参照してください。近いうちにサポートを実装できるよう取り組んでいます。TypeScriptを使用している場合は、ぜひ参加してください！

:::

## スペックファイルとページオブジェクトを更新する

すべてのコマンドの変更を更新するには、WebdriverIOコマンドを含むすべてのe2eファイルに対してcodemodを実行します。例：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

以上です！これ以上の変更は必要ありません 🎉

## まとめ

このチュートリアルが、WebdriverIO `v6`への移行プロセスの一助となれば幸いです。`v7`への更新は破壊的変更がほとんどないため簡単なので、引き続き最新バージョンへのアップグレードを強くお勧めします。[v7へのアップグレード](v7-migration)の移行ガイドをご確認ください。

コミュニティは、さまざまな組織のさまざまなチームでテストしながら、codemodの改善を続けています。フィードバックがある場合は遠慮なく[issueを作成](https://github.com/webdriverio/codemod/issues/new)し、移行プロセス中に困ったことがあれば[ディスカッションを開始](https://github.com/webdriverio/codemod/discussions/new)してください。