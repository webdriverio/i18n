---
id: setuptypes
title: セットアップタイプ
---

WebdriverIOはさまざまな目的で使用できます。WebDriverプロトコルAPIを実装し、ブラウザを自動化された方法で実行することができます。このフレームワークは、任意の環境でどんな種類のタスクにも対応できるように設計されています。サードパーティのフレームワークに依存せず、実行にはNode.jsのみが必要です。

## プロトコルバインディング

WebDriverやその他の自動化プロトコルとの基本的なやり取りのために、WebdriverIOは[`webdriver`](https://www.npmjs.com/package/webdriver) NPMパッケージをベースにした独自のプロトコルバインディングを使用しています：

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

すべての[プロトコルコマンド](api/webdriver)は自動化ドライバーからの生のレスポンスを返します。このパッケージは非常に軽量で、プロトコルの使用とのやり取りを簡略化するための自動待機などのスマートロジックは__ありません__。

インスタンスに適用されるプロトコルコマンドは、ドライバーの初期セッションレスポンスによって決まります。例えば、レスポンスがモバイルセッションが開始されたことを示している場合、パッケージはすべてのAppiumとMobile JSON Wireプロトコルコマンドをインスタンスのプロトタイプに適用します。

[`devtools`](https://www.npmjs.com/package/devtools) NPMパッケージをインポートすることで、Chrome DevToolsプロトコルを使用して同じコマンドセット（モバイル関連を除く）を実行できます。このパッケージは`webdriver`パッケージと同じインターフェースを持ちますが、[Puppeteer](https://pptr.dev/)をベースにした自動化を実行します。

これらのパッケージインターフェースの詳細については、[モジュールAPI](/docs/api/modules)を参照してください。

## スタンドアロンモード

WebDriverプロトコルとのやり取りを簡略化するために、`webdriverio`パッケージはプロトコルの上に様々なコマンド（例：[`dragAndDrop`](api/element/dragAndDrop)コマンド）やコアコンセプト（[スマートセレクタ](selectors)や[自動待機](autowait)など）を実装しています。上記の例は次のように簡略化できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

スタンドアロンモードでWebdriverIOを使用すると、すべてのプロトコルコマンドにアクセスできるだけでなく、ブラウザとの高レベルなやり取りを提供する追加コマンドのスーパーセットも提供されます。これにより、新しい自動化ライブラリを作成するために、この自動化ツールを独自の（テスト）プロジェクトに統合することができます。有名な例には[Oxygen](https://github.com/oxygenhq/oxygen)や[CodeceptJS](http://codecept.io)があります。また、Webからコンテンツをスクレイピングするための（または実行中のブラウザを必要とする他の目的のための）プレーンなNodeスクリプトを書くこともできます。

特定のオプションが設定されていない場合、WebdriverIOは常に機能のうちの`browserName`プロパティに一致するブラウザドライバーをダウンロードしてセットアップしようとします。ChromeとFirefoxの場合、対応するブラウザがマシン上で見つからない場合はそれらをインストールすることもあります。

`webdriverio`パッケージインターフェースの詳細については、[モジュールAPI](/docs/api/modules)を参照してください。

## WDIOテストランナー

しかし、WebdriverIOの主な目的は大規模なエンドツーエンドテストです。そのため、読みやすく保守しやすい信頼性の高いテストスイートを構築するのに役立つテストランナーを実装しました。

テストランナーは、プレーンな自動化ライブラリを使用する際によく発生する多くの問題を解決します。一つには、テスト実行を整理し、テスト仕様を分割して、テストが最大の同時実行性で実行できるようにします。また、セッション管理も処理し、問題のデバッグやテスト内のエラーを見つけるためのたくさんの機能を提供します。

以下は、テスト仕様として書かれ、WDIOによって実行される上記と同じ例です：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

テストランナーは、Mocha、Jasmine、Cucumberなどの人気のあるテストフレームワークの抽象化です。WDIOテストランナーを使用してテストを実行するには、詳しい情報は[はじめに](gettingstarted)セクションをご覧ください。

`@wdio/cli`テストランナーパッケージインターフェースの詳細については、[モジュールAPI](/docs/api/modules)を参照してください。