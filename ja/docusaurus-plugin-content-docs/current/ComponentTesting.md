---
id: component-testing
title: コンポーネントテスト
description: "Viteを搭載したWebdriverIOブラウザランナーを使用して、実際のブラウザでユニットテストやコンポーネントテストを実行します。セットアップ、テストハーネス、デバッグについても説明します。"
---

WebdriverIOの[ブラウザランナー](/docs/runner#browser-runner)を使用すると、実際のデスクトップまたはモバイルブラウザ内でテストを実行しながら、WebdriverIOとWebDriverプロトコルを使ってページ上にレンダリングされた内容を自動化し、操作することができます。このアプローチには、[JSDOM](https://www.npmjs.com/package/jsdom)に対してのみテストを行える他のテストフレームワークと比較して、[多くの利点](/docs/runner#browser-runner)があります。

## ブラウザサポート

ブラウザランナーは、テストバンドルをブラウザ内で実行します。このバンドルは、Chrome 90、Edge 90、Firefox 90、Safari 14.1、およびそれ以降のバージョンのブラウザで動作します。

エンドツーエンドテストはNode.jsで実行されます。一方、[`browser.execute`](/docs/api/browser/execute)に渡されたコードは自動化されたブラウザ内で実行されるため、そのブラウザは上記のバージョンより古い場合があります。そのようなコードはES2021に留めてください。

## どのように動作するのか？

ブラウザランナーは[Vite](https://vitejs.dev/)を使用してテストページをレンダリングし、テストフレームワークを初期化してブラウザ内でテストを実行します。現在はMochaのみをサポートしていますが、JasmineとCucumberは[ロードマップ](https://github.com/orgs/webdriverio/projects/1)に含まれています。これにより、Viteを使用していないプロジェクトでも、あらゆる種類のコンポーネントをテストすることができます。

Viteサーバーは WebdriverIO テストランナーによって起動され、通常のe2eテストと同様にすべてのレポーターとサービスを使用できるように構成されています。さらに、ページ上の任意の要素を操作するための[WebdriverIO API](/docs/api)のサブセットにアクセスできる[`browser`](/docs/api/browser)インスタンスを初期化します。e2eテストと同様に、[`injectGlobals`](/docs/api/globals)の設定に応じて、グローバルスコープに付与された`browser`変数を通じて、または`@wdio/globals`からインポートすることで、このインスタンスにアクセスできます。

WebdriverIOは以下のフレームワークを組み込みでサポートしています：

- [__Nuxt__](https://nuxt.com/)：WebdriverIOのテストランナーはNuxtアプリケーションを検出し、プロジェクトのコンポーザブルを自動的にセットアップし、Nuxtバックエンドのモック化を支援します。詳細は[Nuxtのドキュメント](/docs/component-testing/vue#testing-vue-components-in-nuxt)をご覧ください
- [__TailwindCSS__](https://tailwindcss.com/)：WebdriverIOのテストランナーはTailwindCSSを使用しているかどうかを検出し、テストページに環境を適切に読み込みます

## セットアップ

ブラウザでのユニットテストまたはコンポーネントテスト用にWebdriverIOをセットアップするには、次のコマンドで新しいWebdriverIOプロジェクトを開始します：

```bash
npm init wdio@latest ./
# or
yarn create wdio ./
```

設定ウィザードが起動したら、ユニットテストとコンポーネントテストを実行するために`browser`を選択し、必要に応じてプリセットのいずれかを選択します。基本的なユニットテストのみを実行したい場合は _"Other"_ を選択してください。プロジェクトですでにViteを使用している場合は、カスタムのVite設定を構成することもできます。詳細については、すべての[ランナーオプション](/docs/runner#runner-options)をご確認ください。

:::info

__注意：__ WebdriverIOはデフォルトで、CI環境（例えば`CI`環境変数が`'1'`または`'true'`に設定されている場合）ではブラウザテストをヘッドレスで実行します。この動作は、ランナーの[`headless`](/docs/runner#headless)オプションを使用して手動で設定できます。

:::

このプロセスの最後に、`runner`プロパティを含むさまざまなWebdriverIO設定が記述された`wdio.conf.js`が生成されているはずです。例：

```ts reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

異なる[capabilities](/docs/configuration#capabilities)を定義することで、必要に応じて異なるブラウザで並列にテストを実行できます。

まだすべての仕組みがよくわからない場合は、WebdriverIOでのコンポーネントテストの始め方に関する次のチュートリアルをご覧ください：

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## テストハーネス

テストで何を実行し、コンポーネントをどのようにレンダリングするかは完全に自由です。ただし、React、Preact、Svelte、Vueなどのさまざまなコンポーネントフレームワーク向けのプラグインを提供している[Testing Library](https://testing-library.com/)をユーティリティフレームワークとして使用することをお勧めします。Testing Libraryはコンポーネントをテストページにレンダリングするのに非常に便利で、各テストの後にこれらのコンポーネントを自動的にクリーンアップします。

Testing LibraryのプリミティブとWebdriverIOのコマンドは自由に組み合わせることができます。例：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__注意：__ Testing Libraryのrenderメソッドを使用すると、テスト間で作成されたコンポーネントを削除するのに役立ちます。Testing Libraryを使用しない場合は、テストコンポーネントをテスト間でクリーンアップされるコンテナにアタッチするようにしてください。

## セットアップスクリプト

Node.jsまたはブラウザで任意のスクリプトを実行することで、テストをセットアップできます。例えば、スタイルの注入、ブラウザAPIのモック化、サードパーティサービスへの接続などです。WebdriverIOの[フック](/docs/configuration#hooks)を使用してNode.jsでコードを実行できるほか、[`mochaOpts.require`](/docs/frameworks#require)を使用すると、テストが読み込まれる前にスクリプトをブラウザにインポートできます。例：

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // ブラウザで実行するセットアップスクリプトを指定
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // Node.jsでテスト環境をセットアップ
    }
    // ...
}
```

例えば、次のセットアップスクリプトを使用して、テスト内のすべての[`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch)呼び出しをモック化したい場合：

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// すべてのテストが読み込まれる前にコードを実行
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // テストファイルが読み込まれた後にコードを実行
}

export const mochaGlobalTeardown = () => {
    // specファイルが実行された後にコードを実行
}

```

これで、テスト内ですべてのブラウザリクエストに対してカスタムのレスポンス値を提供できます。グローバルフィクスチャの詳細については、[Mochaのドキュメント](https://mochajs.org/#global-fixtures)をご覧ください。

## テストファイルとアプリケーションファイルの監視

ブラウザテストをデバッグする方法は複数あります。最も簡単なのは、`--watch`フラグを付けてWebdriverIOテストランナーを起動することです。例：

```sh
$ npx wdio run ./wdio.conf.js --watch
```

これにより、最初にすべてのテストが実行され、すべての実行が完了すると停止します。その後、個々のファイルに変更を加えると、それらが個別に再実行されます。アプリケーションファイルを指す[`filesToWatch`](/docs/configuration#filestowatch)を設定すると、アプリに変更が加えられたときにすべてのテストが再実行されます。

## デバッグ

IDEでブレークポイントを設定してリモートブラウザに認識させることは（まだ）できませんが、[`debug`](/docs/api/browser/debug)コマンドを使用して任意の時点でテストを停止できます。これにより、DevToolsを開き、[ソースタブ](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools)でブレークポイントを設定してテストをデバッグできます。

`debug`コマンドが呼び出されると、ターミナルにNode.jsのREPLインターフェースも表示され、次のように表示されます：

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

テストを続行するには、`Ctrl`または`Command` + `c`を押すか、`.exit`と入力してください。

## Selenium Gridを使用した実行

[Selenium Grid](https://www.selenium.dev/documentation/grid/)をセットアップしており、そのグリッドを通じてブラウザを実行する場合は、テストファイルが提供されている正しいホストにブラウザがアクセスできるように、ブラウザランナーの`host`オプションを設定する必要があります。例：

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // WebdriverIOプロセスを実行しているマシンのネットワークIP
        host: 'http://172.168.0.2'
    }]
}
```

これにより、ブラウザはWebdriverIOテストを実行しているインスタンス上でホストされている正しいサーバーインスタンスを確実に開くことができます。

## 例

人気のあるコンポーネントフレームワークを使用したコンポーネントテストのさまざまな例は、[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples)でご覧いただけます。