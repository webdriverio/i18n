---
id: component-testing
title: コンポーネントテスト
---

WebdriverIOの[ブラウザランナー](/docs/runner#browser-runner)を使用すると、WebdriverIOとWebDriverプロトコルを使用して、実際のデスクトップまたはモバイルブラウザ内でテストを実行し、ページにレンダリングされるものを自動化して操作することができます。このアプローチは、[JSDOM](https://www.npmjs.com/package/jsdom)に対してのみテストを許可する他のテストフレームワークと比較して[多くの利点](/docs/runner#browser-runner)があります。

## 仕組みは？

ブラウザランナーは[Vite](https://vitejs.dev/)を使用してテストページをレンダリングし、ブラウザでテストを実行するためのテストフレームワークを初期化します。現在はMochaのみをサポートしていますが、JasmineとCucumberは[ロードマップ上](https://github.com/orgs/webdriverio/projects/1)にあります。これにより、Viteを使用していないプロジェクトでも、あらゆる種類のコンポーネントをテストすることができます。

ViteサーバーはWebdriverIOテストランナーによって起動され、通常のe2eテストと同様にすべてのレポーターとサービスを使用できるように構成されています。さらに、ページ上の任意の要素と対話するための[WebdriverIO API](/docs/api)のサブセットにアクセスできる[`browser`](/docs/api/browser)インスタンスを初期化します。e2eテストと同様に、グローバルスコープにアタッチされた`browser`変数を通じて、または[`injectGlobals`](/docs/api/globals)の設定に応じて`@wdio/globals`からインポートすることでそのインスタンスにアクセスできます。

WebdriverIOは以下のフレームワークを組み込みでサポートしています：

- [__Nuxt__](https://nuxt.com/)：WebdriverIOのテストランナーはNuxtアプリケーションを検出し、自動的にプロジェクトのコンポーザブルをセットアップし、Nuxtバックエンドのモック化を支援します。詳細は[Nuxtドキュメント](/docs/component-testing/vue#testing-vue-components-in-nuxt)をご覧ください。
- [__TailwindCSS__](https://tailwindcss.com/)：WebdriverIOのテストランナーはTailwindCSSを使用しているかどうかを検出し、環境を適切にテストページに読み込みます。

## セットアップ

ブラウザでのユニットテストやコンポーネントテスト用にWebdriverIOをセットアップするには、以下のコマンドで新しいWebdriverIOプロジェクトを初期化します：

```bash
npm init wdio@latest ./
# または
yarn create wdio ./
```

設定ウィザードが開始したら、ユニットテストとコンポーネントテストを実行するために`browser`を選択し、希望するプリセットを選ぶか、基本的なユニットテストのみを実行したい場合は_"Other"_を選択します。プロジェクトですでにViteを使用している場合は、カスタムVite設定を構成することもできます。詳細については、[ランナーオプション](/docs/runner#runner-options)をご覧ください。

:::info

__注意：__ WebdriverIOはデフォルトでCI環境（`CI`環境変数が`'1'`または`'true'`に設定されている場合）でブラウザテストをヘッドレスで実行します。この動作はランナーの[`headless`](/docs/runner#headless)オプションを使用して手動で設定できます。

:::

このプロセスの最後には、ランナープロパティを含むさまざまなWebdriverIO設定を含む`wdio.conf.js`が見つかるはずです：

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

異なる[capabilities](/docs/configuration#capabilities)を定義することで、必要に応じて異なるブラウザで並行してテストを実行できます。

まだすべての仕組みがわからない場合は、WebdriverIOでのコンポーネントテストの始め方に関する次のチュートリアルをご覧ください：

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## テストハーネス

テストで何を実行するか、どのようにコンポーネントをレンダリングするかは完全にあなた次第です。ただし、ユーティリティフレームワークとして[Testing Library](https://testing-library.com/)を使用することをお勧めします。これはReact、Preact、SvelteやVueなど様々なコンポーネントフレームワーク用のプラグインを提供しています。テストページにコンポーネントをレンダリングするのに非常に役立ち、テストごとにこれらのコンポーネントを自動的にクリーンアップします。

Testing LibraryのプリミティブとWebdriverIOコマンドを自由に組み合わせることができます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__注意：__ Testing Libraryのレンダーメソッドを使用すると、テスト間で作成されたコンポーネントを削除するのに役立ちます。Testing Libraryを使用しない場合は、テスト間でクリーンアップされるコンテナにテストコンポーネントをアタッチするようにしてください。

## セットアップスクリプト

Node.jsまたはブラウザで任意のスクリプトを実行してテストをセットアップできます。例えば、スタイルの注入、ブラウザAPIのモック化、サードパーティサービスへの接続などです。WebdriverIOの[フック](/docs/configuration#hooks)はNode.jsでコードを実行するために使用でき、[`mochaOpts.require`](/docs/frameworks#require)を使用するとテストが読み込まれる前にスクリプトをブラウザにインポートできます：

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // ブラウザで実行するセットアップスクリプトを提供
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // Node.jsでテスト環境をセットアップ
    }
    // ...
}
```

例えば、テストで全ての[`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch)呼び出しをモックする場合、次のようなセットアップスクリプトを使用できます：

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// すべてのテストが読み込まれる前にコードを実行
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // テストファイルが読み込まれた後にコードを実行
}

export const mochaGlobalTeardown = () => {
    // スペックファイルが実行された後にコードを実行
}

```

これでテスト内で、すべてのブラウザリクエストにカスタムレスポンス値を提供できます。グローバルフィクスチャについての詳細は[Mochaドキュメント](https://mochajs.org/#global-fixtures)をご覧ください。

## テストとアプリケーションファイルの監視

ブラウザテストをデバッグする方法はいくつかあります。最も簡単な方法は、WebdriverIOテストランナーを`--watch`フラグで起動することです：

```sh
$ npx wdio run ./wdio.conf.js --watch
```

これにより、最初にすべてのテストが実行され、すべて実行されると停止します。その後、個々のファイルに変更を加えると、それらが個別に再実行されます。アプリケーションファイルを指す[`filesToWatch`](/docs/configuration#filestowatch)を設定すると、アプリに変更が加えられたときにすべてのテストが再実行されます。

## デバッグ

IDEでブレークポイントを設定してリモートブラウザで認識させることは（まだ）できませんが、[`debug`](/docs/api/browser/debug)コマンドを使用して任意の時点でテストを停止することができます。これにより、DevToolsを開き、[ソースタブ](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools)でブレークポイントを設定してテストをデバッグすることができます。

`debug`コマンドが呼び出されると、ターミナルにNode.js replインターフェースが表示され、次のように表示されます：

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

`Ctrl`または`Command` + `c`を押すか、`.exit`を入力してテストを続行します。

## Selenium Gridを使用して実行

[Selenium Grid](https://www.selenium.dev/documentation/grid/)を設定し、そのグリッドを通じてブラウザを実行している場合、ブラウザがテストファイルが提供されている正しいホストにアクセスできるように、`host`ブラウザランナーオプションを設定する必要があります：

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // WebdriverIOプロセスを実行するマシンのネットワークIP
        host: 'http://172.168.0.2'
    }]
}
```

これにより、ブラウザがWebdriverIOテストを実行するインスタンスでホストされている正しいサーバーインスタンスを開くことが保証されます。

## 例

人気のあるコンポーネントフレームワークを使用したコンポーネントテストのさまざまな例は、[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples)で見つけることができます。