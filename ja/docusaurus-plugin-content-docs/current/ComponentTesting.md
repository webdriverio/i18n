---
id: component-testing
title: コンポーネントテスト
---

WebdriverIOの[ブラウザランナー](/docs/runner#browser-runner)を使用すると、WebdriverIOとWebDriverプロトコルを使用して、実際のデスクトップまたはモバイルブラウザ内でテストを実行し、ページにレンダリングされる内容を自動化および操作できます。このアプローチは、[JSDOM](https://www.npmjs.com/package/jsdom)に対してのみテストを許可する他のテストフレームワークと比較して[多くの利点](/docs/runner#browser-runner)があります。

## どのように機能するのか？

ブラウザランナーは[Vite](https://vitejs.dev/)を使用してテストページをレンダリングし、ブラウザでテストを実行するためのテストフレームワークを初期化します。現在はMochaのみをサポートしていますが、JasmineとCucumberは[ロードマップ上](https://github.com/orgs/webdriverio/projects/1)にあります。これにより、Viteを使用していないプロジェクトでも、あらゆる種類のコンポーネントをテストできます。

ViteサーバーはWebdriverIOテストランナーによって起動され、通常のe2eテストのように、すべてのレポーターとサービスを使用できるように構成されています。さらに、ページ上の任意の要素と対話するために[WebdriverIO API](/docs/api)のサブセットにアクセスできる[`browser`](/docs/api/browser)インスタンスを初期化します。e2eテストと同様に、グローバルスコープにアタッチされた`browser`変数を通じて、または[`injectGlobals`](/docs/api/globals)の設定に応じて`@wdio/globals`からインポートすることでそのインスタンスにアクセスできます。

WebdriverIOは以下のフレームワークに対する組み込みサポートを提供しています：

- [__Nuxt__](https://nuxt.com/): WebdriverIOのテストランナーはNuxtアプリケーションを検出し、自動的にプロジェクトのコンポーザブルをセットアップし、Nuxtバックエンドのモック作成を支援します。詳細は[Nuxtドキュメント](/docs/component-testing/vue#testing-vue-components-in-nuxt)をご覧ください。
- [__TailwindCSS__](https://tailwindcss.com/): WebdriverIOのテストランナーはTailwindCSSを使用しているかどうかを検出し、環境を適切にテストページに読み込みます。

## セットアップ

ブラウザでユニットテストやコンポーネントテストを行うためにWebdriverIOをセットアップするには、以下のコマンドで新しいWebdriverIOプロジェクトを開始します：

```bash
npm init wdio@latest ./
# または
yarn create wdio ./
```

設定ウィザードが開始したら、ユニットテストとコンポーネントテストを実行するために`browser`を選択し、必要に応じてプリセットの1つを選ぶか、基本的なユニットテストのみを実行したい場合は「Other」を選択します。プロジェクトですでにViteを使用している場合は、カスタムVite設定を構成することもできます。詳細については、すべての[ランナーオプション](/docs/runner#runner-options)をご確認ください。

:::info

__注意:__ WebdriverIOはデフォルトでCIでブラウザテストをヘッドレスモードで実行します（例えば、`CI`環境変数が`'1'`または`'true'`に設定されている場合）。ランナーの[`headless`](/docs/runner#headless)オプションを使用して、この動作を手動で設定できます。

:::

このプロセスの最後に、`wdio.conf.js`が作成され、`runner`プロパティを含むさまざまなWebdriverIOの設定が含まれています：

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

異なる[capabilities](/docs/configuration#capabilities)を定義することで、異なるブラウザでテストを実行でき、必要に応じて並行実行も可能です。

まだ動作の詳細が不明な場合は、WebdriverIOでのコンポーネントテストの始め方に関する以下のチュートリアルをご覧ください：

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## テストハーネス

テストで何を実行し、コンポーネントをどのようにレンダリングするかは完全にあなた次第です。ただし、ユーティリティフレームワークとして[Testing Library](https://testing-library.com/)を使用することをお勧めします。これは、React、Preact、SvelteやVueなど、さまざまなコンポーネントフレームワーク用のプラグインを提供しています。コンポーネントをテストページにレンダリングするのに非常に便利で、各テスト後にこれらのコンポーネントを自動的にクリーンアップします。

Testing LibraryのプリミティブとWebdriverIOコマンドを自由に組み合わせることができます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__注意:__ Testing Libraryのレンダーメソッドを使用すると、テスト間で作成されたコンポーネントを削除するのに役立ちます。Testing Libraryを使用しない場合は、テスト間でクリーンアップされるコンテナにテストコンポーネントをアタッチするようにしてください。

## セットアップスクリプト

Node.jsやブラウザで任意のスクリプトを実行してテストをセットアップできます。例えば、スタイルの注入、ブラウザAPIのモック化、サードパーティサービスへの接続などが可能です。WebdriverIOの[フック](/docs/configuration#hooks)を使用してNode.jsでコードを実行し、[`mochaOpts.require`](/docs/frameworks#require)を使用してテストがロードされる前にスクリプトをブラウザにインポートできます：

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

例えば、テスト内のすべての[`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch)呼び出しを次のようなセットアップスクリプトでモック化するには：

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// すべてのテストがロードされる前にコードを実行
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // テストファイルがロードされた後にコードを実行
}

export const mochaGlobalTeardown = () => {
    // 仕様ファイルが実行された後にコードを実行
}

```

これで、テスト内ですべてのブラウザリクエストに対してカスタムレスポンス値を提供できます。グローバルフィクスチャの詳細については、[Mochaドキュメント](https://mochajs.org/#global-fixtures)をご覧ください。

## テストとアプリケーションファイルの監視

ブラウザテストをデバッグするにはいくつかの方法があります。最も簡単なのは、`--watch`フラグを付けてWebdriverIOテストランナーを起動することです：

```sh
$ npx wdio run ./wdio.conf.js --watch
```

これにより、最初にすべてのテストが実行され、すべてが実行されると停止します。その後、個々のファイルに変更を加えると、それらが個別に再実行されます。アプリケーションファイルを指す[`filesToWatch`](/docs/configuration#filestowatch)を設定すると、アプリに変更が加えられると、すべてのテストが再実行されます。

## デバッグ

IDEでブレークポイントを設定してリモートブラウザで認識させることは（まだ）できませんが、[`debug`](/docs/api/browser/debug)コマンドを使用して任意の時点でテストを停止することができます。これにより、DevToolsを開いて[ソースタブ](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools)でブレークポイントを設定し、テストをデバッグすることができます。

`debug`コマンドが呼び出されると、ターミナルにNode.jsのrepl（対話型）インターフェースが表示されます：

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

テストを続行するには、`Ctrl`または`Command` + `c`を押すか、`.exit`を入力します。

## Selenium Gridを使用して実行

[Selenium Grid](https://www.selenium.dev/documentation/grid/)を設定してそのグリッド経由でブラウザを実行する場合は、テストファイルが提供されている正しいホストにブラウザがアクセスできるように、`host`ブラウザランナーオプションを設定する必要があります：

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // WebdriverIOプロセスを実行するマシンのネットワークIP
        host: 'http://172.168.0.2'
    }]
}
```

これにより、ブラウザがWebdriverIOテストを実行するインスタンスでホストされている正しいサーバーインスタンスを開くようになります。

## 例

人気のあるコンポーネントフレームワークを使用したコンポーネントテストのさまざまな例は、[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples)で確認できます。