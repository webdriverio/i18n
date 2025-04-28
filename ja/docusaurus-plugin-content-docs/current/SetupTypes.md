---
id: setuptypes
title: セットアップタイプ
---

WebdriverIOはさまざまな目的で使用できます。WebDriverプロトコルAPIを実装し、ブラウザを自動化された方法で実行できます。このフレームワークは任意の環境でどのような作業にも使用できるように設計されています。サードパーティのフレームワークに依存せず、実行にはNode.jsのみが必要です。

## プロトコルバインディング

WebDriverや他の自動化プロトコルとの基本的な対話のために、WebdriverIOは[`webdriver`](https://www.npmjs.com/package/webdriver) NPMパッケージに基づいた独自のプロトコルバインディングを使用しています：

<Tabs
  defaultValue="webdriver"
  values={[
    {label: 'WebDriver', value: 'webdriver'},
    {label: 'Chrome DevTools', value: 'devtools'},
  ]
}>
<TabItem value="webdriver">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

</TabItem>
<TabItem value="devtools">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/devtools.js#L2-L17
```

</TabItem>
</Tabs>

すべての[プロトコルコマンド](api/webdriver)は、自動化ドライバーからの生のレスポンスを返します。このパッケージは非常に軽量で、プロトコルの使用との対話を簡素化するための自動待機などのスマートロジックは__ありません__。

インスタンスに適用されるプロトコルコマンドは、ドライバーの初期セッションレスポンスに依存します。例えば、レスポンスがモバイルセッションが開始されたことを示している場合、パッケージはすべてのAppiumおよびモバイルJSON Wireプロトコルコマンドをインスタンスのプロトタイプに適用します。

[`devtools`](https://www.npmjs.com/package/devtools) NPMパッケージをインポートすると、Chrome DevToolsプロトコルを使用して同じコマンドセット（モバイル関連のものを除く）を実行できます。これは`webdriver`パッケージと同じインターフェースを持ちますが、自動化は[Puppeteer](https://pptr.dev/)に基づいて実行されます。

これらのパッケージインターフェースの詳細については、[モジュールAPI](/docs/api/modules)を参照してください。

## スタンドアロンモード

WebDriverプロトコルとの対話を簡素化するために、`webdriverio`パッケージはプロトコル上に様々なコマンド（例えば[`dragAndDrop`](api/element/dragAndDrop)コマンド）や[スマートセレクタ](selectors)や[自動待機](autowait)などのコア概念を実装しています。上記の例は次のように簡素化できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

スタンドアロンモードでWebdriverIOを使用すると、すべてのプロトコルコマンドにアクセスできますが、ブラウザとの対話をより高いレベルで提供する追加コマンドのスーパーセットも提供します。これにより、新しい自動化ライブラリを作成するために、この自動化ツールを独自の（テスト）プロジェクトに統合することができます。人気のある例には[Oxygen](https://github.com/oxygenhq/oxygen)や[CodeceptJS](http://codecept.io)があります。また、Webからコンテンツをスクレイピングするための単純なNodeスクリプトを書くこともできます（または実行中のブラウザを必要とする他の何かでも）。

特定のオプションが設定されていない場合、WebdriverIOは常に機能のうち`browserName`プロパティに一致するブラウザドライバーをダウンロードしてセットアップしようとします。ChromeとFirefoxの場合、マシン上に対応するブラウザが見つからない場合はインストールすることもあります。

`webdriverio`パッケージインターフェースの詳細については、[モジュールAPI](/docs/api/modules)を参照してください。

## WDIOテストランナー

しかし、WebdriverIOの主な目的は大規模なエンドツーエンドテストです。そのため、読みやすく保守が容易な信頼性の高いテストスイートを構築するのに役立つテストランナーを実装しました。

テストランナーは、プレーンな自動化ライブラリを使用する際に一般的な多くの問題を解決します。まず、テスト実行を整理し、テスト仕様を分割して、テストが最大の並行性で実行できるようにします。また、セッション管理も行い、問題のデバッグやテストのエラーを見つけるのに役立つ多くの機能を提供します。

以下は、上記と同じ例をテスト仕様として記述し、WDIOで実行したものです：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

テストランナーは、MochaやJasmine、Cucumberなどの人気のあるテストフレームワークの抽象化です。WDIOテストランナーを使用してテストを実行するには、詳細については[はじめに](gettingstarted)セクションをご覧ください。

`@wdio/cli`テストランナーパッケージインターフェースの詳細については、[モジュールAPI](/docs/api/modules)を参照してください。