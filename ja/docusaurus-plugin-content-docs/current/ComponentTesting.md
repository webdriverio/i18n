---
id: component-testing
title: コンポーネントテスト
---

WebdriverIOの[ブラウザランナー](/docs/runner#browser-runner)を使用すると、WebdriverIOとWebDriverプロトコルを使って、実際のデスクトップまたはモバイルブラウザ内でテストを実行し、ページにレンダリングされる内容を自動化して操作することができます。このアプローチは、[JSDOM](https://www.npmjs.com/package/jsdom)に対してのみテストを許可する他のテストフレームワークと比較して、[多くの利点](/docs/runner#browser-runner)があります。

## どのように機能するのか？

ブラウザランナーは[Vite](https://vitejs.dev/)を使用してテストページをレンダリングし、ブラウザでテストを実行するためのテストフレームワークを初期化します。現在はMochaのみをサポートしていますが、JasmineとCucumberは[ロードマップ上](https://github.com/orgs/webdriverio/projects/1)にあります。これにより、Viteを使用していないプロジェクトであっても、あらゆる種類のコンポーネントをテストすることができます。

ViteサーバーはWebdriverIOテストランナーによって起動され、通常のe2eテストで使用していたすべてのレポーターとサービスを使用できるように構成されています。さらに、ページ上の任意の要素と対話するための[WebdriverIO API](/docs/api)のサブセットにアクセスできる[`browser`](/docs/api/browser)インスタンスを初期化します。e2eテストと同様に、グローバルスコープにアタッチされた`browser`変数を通じて、または[`injectGlobals`](/docs/api/globals)の設定に応じて`@wdio/globals`からインポートしてそのインスタンスにアクセスできます。

WebdriverIOは以下のフレームワークに対する組み込みサポートを提供しています：

- [__Nuxt__](https://nuxt.com/): WebdriverIOのテストランナーはNuxtアプリケーションを検出し、プロジェクトのコンポーザブルを自動的にセットアップし、Nuxtバックエンドのモック化をサポートします。詳細は[Nuxtのドキュメント](/docs/component-testing/vue#testing-vue-components-in-nuxt)を参照してください。
- [__TailwindCSS__](https://tailwindcss.com/): WebdriverIOのテストランナーはTailwindCSSを使用しているかを検出し、環境を適切にテストページに読み込みます。

## セットアップ

ブラウザでのユニットテストまたはコンポーネントテスト用にWebdriverIOをセットアップするには、以下のコマンドで新しいWebdriverIOプロジェクトを初期化します：

```bash
npm init wdio@latest ./
# または
yarn create wdio ./
```

設定ウィザードが起動したら、ユニットテストとコンポーネントテストを実行するための`browser`を選択し、必要に応じていずれかのプリセットを選択するか、基本的なユニットテストのみを実行したい場合は「Other」を選択します。プロジェクトですでにViteを使用している場合は、カスタムVite設定を構成することもできます。詳細については、すべての[ランナーオプション](/docs/runner#runner-options)をご確認ください。

:::info

__注意:__ WebdriverIOはデフォルトでCIヘッドレスでブラウザテストを実行します（例：`CI`環境変数が`'1'`または`'true'`に設定されている場合）。この動作はランナーの[`headless`](/docs/runner#headless)オプションを使用して手動で構成できます。

:::

このプロセスの最後に、`runner`プロパティを含むWebdriverIOの様々な設定を含む`wdio.conf.js`が作成されるはずです：

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

異なる[capabilities](/docs/configuration#capabilities)を定義することで、必要に応じて異なるブラウザで並行してテストを実行できます。

すべての仕組みについてまだ不明な点がある場合は、WebdriverIOでのコンポーネントテストを始めるための以下のチュートリアルをご覧ください：

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## テストハーネス

テストで何を実行し、コンポーネントをどのようにレンダリングするかは完全にあなた次第です。ただし、ユーティリティフレームワークとして[Testing Library](https://testing-library.com/)を使用することをお勧めします。これはReact、Preact、SvelteおよびVueなど様々なコンポーネントフレームワーク用のプラグインを提供しています。テストページにコンポーネントをレンダリングするのに非常に便利であり、テストごとにこれらのコンポーネントを自動的にクリーンアップします。

Testing Libraryのプリミティブ機能とWebdriverIOコマンドを自由に組み合わせることができます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__注意:__ Testing Libraryのレンダーメソッドを使用すると、テスト間で作成されたコンポーネントが削除されます。Testing Libraryを使用しない場合は、テスト間でクリーンアップされるコンテナにテストコンポーネントをアタッチするようにしてください。

## セットアップスクリプト

Node.jsまたはブラウザで任意のスクリプトを実行してテストをセットアップできます。例えば、スタイルの注入、ブラウザAPIのモック化、またはサードパーティサービスへの接続などです。WebdriverIOの[フック](/docs/configuration#hooks)はNode.jsでコードを実行するために使用でき、[`mochaOpts.require`](/docs/frameworks#require)はテストが読み込まれる前にブラウザにスクリプトをインポートすることができます：

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // ブラウザで実行するセットアップスクリプトを提供する
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // Node.jsでテスト環境をセットアップする
    }
    // ...
}
```

例えば、テスト内のすべての[`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch)呼び出しを次のようなセットアップスクリプトでモックする場合：

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

これで、テスト内ですべてのブラウザリクエストにカスタムレスポンス値を提供できます。グローバルフィクスチャについての詳細は[Mochaのドキュメント](https://mochajs.org/#global-fixtures)をご覧ください。

## テストとアプリケーションファイルの監視

ブラウザテストをデバッグする方法はいくつかあります。最も簡単な方法は、WebdriverIOテストランナーを`--watch`フラグ付きで起動することです：

```sh
$ npx wdio run ./wdio.conf.js --watch
```

これによりすべてのテストが最初に実行され、すべてが実行されると停止します。その後、個々のファイルに変更を加えると、それらが個別に再実行されます。アプリケーションファイルを指す[`filesToWatch`](/docs/configuration#filestowatch)を設定すると、アプリに変更が加えられたときにすべてのテストが再実行されます。

## デバッグ

IDEでブレークポイントを設定し、それがリモートブラウザによって認識されるようにすることは（まだ）できませんが、[`debug`](/docs/api/browser/debug)コマンドを使用して任意の時点でテストを停止することができます。これによりDevToolsを開き、[sourcesタブ](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools)でブレークポイントを設定してテストをデバッグできます。

`debug`コマンドが呼び出されると、ターミナルにNode.js replインターフェースが表示され、次のように表示されます：

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

`Ctrl`または`Command` + `c`を押すか、`.exit`と入力してテストを続行します。

## Selenium Gridを使用して実行する

[Selenium Grid](https://www.selenium.dev/documentation/grid/)をセットアップしてそのグリッドを通じてブラウザを実行している場合は、テストファイルが提供されている正しいホストにブラウザがアクセスできるように、`host`ブラウザランナーオプションを設定する必要があります：

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

人気のあるコンポーネントフレームワークを使用したコンポーネントテストの様々な例は、[サンプルリポジトリ](https://github.com/webdriverio/component-testing-examples)で見つけることができます。