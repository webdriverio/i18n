---
id: component-testing
title: コンポーネントテスト
description: "Vite を活用した WebdriverIO のブラウザランナーを使用して、実際のブラウザでユニットテストやコンポーネントテストを実行する方法を、セットアップ、テストハーネス、デバッグを含めて説明します。"
---

WebdriverIO の [Browser Runner](/docs/runner#browser-runner) を使用すると、実際のデスクトップまたはモバイルブラウザ内でテストを実行しながら、WebdriverIO と WebDriver プロトコルを使用してページにレンダリングされた内容を自動化し、操作することができます。このアプローチには、[JSDOM](https://www.npmjs.com/package/jsdom) に対するテストしかできない他のテストフレームワークと比較して[多くの利点](/docs/runner#browser-runner)があります。

## ブラウザサポート

ブラウザランナーはテストバンドルをブラウザ内で実行します。このバンドルは Chrome 90、Edge 90、Firefox 90、Safari 14.1、およびそれ以降のバージョンのブラウザで動作します。

エンドツーエンドテストは Node.js で実行されます。一方、[`browser.execute`](/docs/api/browser/execute) に渡されたコードは自動化対象のブラウザ内で実行されるため、上記より古いバージョンのブラウザで実行される可能性があります。そのようなコードは ES2021 の範囲に留めてください。

## どのように動作するのか？

Browser Runner は [Vite](https://vitejs.dev/) を使用してテストページをレンダリングし、テストフレームワークを初期化してブラウザ内でテストを実行します。現在は Mocha のみをサポートしていますが、Jasmine と Cucumber は[ロードマップ](https://github.com/orgs/webdriverio/projects/1)に含まれています。これにより、Vite を使用していないプロジェクトであっても、あらゆる種類のコンポーネントをテストできます。

Vite サーバーは WebdriverIO テストランナーによって起動され、通常の e2e テストと同様にすべてのレポーターやサービスを使用できるように設定されます。さらに、ページ上の任意の要素を操作するための [WebdriverIO API](/docs/api) のサブセットにアクセスできる [`browser`](/docs/api/browser) インスタンスを初期化します。e2e テストと同様に、[`injectGlobals`](/docs/api/globals) の設定に応じて、グローバルスコープに付加された `browser` 変数を通じて、または `@wdio/globals` からインポートすることで、このインスタンスにアクセスできます。

WebdriverIO は以下のフレームワークを組み込みでサポートしています：

- [__Nuxt__](https://nuxt.com/): WebdriverIO のテストランナーは Nuxt アプリケーションを検出し、プロジェクトのコンポーザブルを自動的にセットアップし、Nuxt バックエンドのモック化を支援します。詳しくは [Nuxt ドキュメント](/docs/component-testing/vue#testing-vue-components-in-nuxt)をお読みください
- [__TailwindCSS__](https://tailwindcss.com/): WebdriverIO のテストランナーは TailwindCSS を使用しているかどうかを検出し、テストページに環境を適切に読み込みます

## セットアップ

ブラウザでのユニットテストまたはコンポーネントテスト用に WebdriverIO をセットアップするには、以下のコマンドで新しい WebdriverIO プロジェクトを開始します：

```bash
npm init wdio@latest ./
# or
yarn create wdio ./
```

設定ウィザードが開始されたら、ユニットテストおよびコンポーネントテストを実行するために `browser` を選択し、必要に応じてプリセットのいずれかを選択してください。基本的なユニットテストのみを実行したい場合は _"Other"_ を選択してください。プロジェクトですでに Vite を使用している場合は、カスタムの Vite 設定を構成することもできます。詳細については、すべての[ランナーオプション](/docs/runner#runner-options)を確認してください。

:::info

__注意:__ WebdriverIO はデフォルトで、CI 環境（例えば `CI` 環境変数が `'1'` または `'true'` に設定されている場合）ではブラウザテストをヘッドレスで実行します。この動作は、ランナーの [`headless`](/docs/runner#headless) オプションを使用して手動で設定できます。

:::

このプロセスの最後に、`runner` プロパティを含むさまざまな WebdriverIO 設定が記述された `wdio.conf.js` が作成されているはずです。例：

```ts reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

異なる [capabilities](/docs/configuration#capabilities) を定義することで、さまざまなブラウザで、必要に応じて並列にテストを実行できます。

まだすべての仕組みがよくわからない場合は、WebdriverIO でコンポーネントテストを始める方法についての以下のチュートリアルをご覧ください：

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## テストハーネス

テストで何を実行し、コンポーネントをどのようにレンダリングするかは完全にあなた次第です。ただし、React、Preact、Svelte、Vue などのさまざまなコンポーネントフレームワーク向けのプラグインを提供している [Testing Library](https://testing-library.com/) をユーティリティフレームワークとして使用することをお勧めします。コンポーネントをテストページにレンダリングするのに非常に便利で、各テストの後にこれらのコンポーネントを自動的にクリーンアップしてくれます。

Testing Library のプリミティブと WebdriverIO のコマンドは自由に組み合わせることができます。例：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__注意:__ Testing Library のレンダリングメソッドを使用すると、テスト間で作成されたコンポーネントを削除するのに役立ちます。Testing Library を使用しない場合は、テストコンポーネントをテスト間でクリーンアップされるコンテナにアタッチするようにしてください。

## セットアップスクリプト

Node.js またはブラウザで任意のスクリプトを実行することで、テストをセットアップできます。例えば、スタイルの注入、ブラウザ API のモック化、サードパーティサービスへの接続などです。WebdriverIO の[フック](/docs/configuration#hooks)を使用すると Node.js でコードを実行でき、[`mochaOpts.require`](/docs/frameworks#require) を使用するとテストが読み込まれる前にブラウザにスクリプトをインポートできます。例：

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // ブラウザで実行するセットアップスクリプトを指定
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // Node.js でテスト環境をセットアップ
    }
    // ...
}
```

例えば、以下のセットアップスクリプトを使用して、テスト内のすべての [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) 呼び出しをモック化したい場合：

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// すべてのテストが読み込まれる前にコードを実行
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // テストファイルが読み込まれた後にコードを実行
}

export const mochaGlobalTeardown = () => {
    // spec ファイルが実行された後にコードを実行
}

```

これで、テスト内ですべてのブラウザリクエストに対してカスタムのレスポンス値を提供できます。グローバルフィクスチャの詳細については、[Mocha ドキュメント](https://mochajs.org/#global-fixtures)をお読みください。

## テストファイルとアプリケーションファイルの監視

ブラウザテストをデバッグする方法は複数あります。最も簡単な方法は、`--watch` フラグを付けて WebdriverIO テストランナーを起動することです。例：

```sh
$ npx wdio run ./wdio.conf.js --watch
```

これにより、最初にすべてのテストが実行され、すべての実行が完了すると停止します。その後、個々のファイルに変更を加えると、それらが個別に再実行されます。アプリケーションファイルを指す [`filesToWatch`](/docs/configuration#filestowatch) を設定すると、アプリに変更が加えられたときにすべてのテストが再実行されます。

## デバッグ

IDE でブレークポイントを設定し、それをリモートブラウザに認識させることは（まだ）できませんが、[`debug`](/docs/api/browser/debug) コマンドを使用して任意の時点でテストを停止できます。これにより、DevTools を開き、[sources タブ](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools)でブレークポイントを設定してテストをデバッグできます。

`debug` コマンドが呼び出されると、ターミナルに Node.js の repl インターフェースも表示され、次のように表示されます：

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

`Ctrl` または `Command` + `c` を押すか、`.exit` と入力してテストを続行します。

## Selenium Grid を使用した実行

[Selenium Grid](https://www.selenium.dev/documentation/grid/) をセットアップし、そのグリッドを介してブラウザを実行している場合は、テストファイルが提供されている正しいホストにブラウザがアクセスできるように、ブラウザランナーの `host` オプションを設定する必要があります。例：

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // WebdriverIO プロセスを実行しているマシンのネットワーク IP
        host: 'http://172.168.0.2'
    }]
}
```

これにより、ブラウザは WebdriverIO テストを実行しているインスタンス上でホストされている正しいサーバーインスタンスを確実に開くことができます。

## 例

人気のあるコンポーネントフレームワークを使用したコンポーネントテストのさまざまな例は、[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples)で確認できます。