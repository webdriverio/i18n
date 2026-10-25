---
id: setuptypes
title: セットアップの種類
description: "WebdriverIOの利用方法を、生のプロトコルバインディングからスタンドアロンモード、WDIOテストランナーまで比較し、最適なものを選びましょう。"
---

WebdriverIOはさまざまな目的で使用できます。WebDriverプロトコルAPIを実装しており、ブラウザを自動化された方法で実行できます。このフレームワークは、あらゆる環境で、あらゆる種類のタスクに対応できるように設計されています。サードパーティのフレームワークに依存せず、実行に必要なのはNode.jsだけです。

## プロトコルバインディング

WebDriverプロトコルとの基本的なやり取りのために、WebdriverIOは[`webdriver`](https://www.npmjs.com/package/webdriver) NPMパッケージに基づく独自のプロトコルバインディングを使用しています：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

すべての[プロトコルコマンド](api/webdriver)は、自動化ドライバーからの生のレスポンスを返します。このパッケージは非常に軽量で、プロトコルの使用を簡素化する自動待機のようなスマートなロジックは__一切__ありません。

インスタンスに適用されるプロトコルコマンドは、ドライバーの初期セッションレスポンスによって異なります。例えば、レスポンスがモバイルセッションの開始を示している場合、パッケージはAppiumコマンドをインスタンスのプロトタイプに適用します。

`webdriver`パッケージのインターフェースの詳細については、[Modules API](/docs/api/modules)を参照してください。

[WebdriverIO DevTools](/docs/devtools)は自動化プロトコルではありません。実行をライブで監視し、後からトレースを再生するためのデバッグUIです。

## スタンドアロンモード

WebDriverプロトコルとのやり取りを簡素化するために、`webdriverio`パッケージはプロトコルの上にさまざまなコマンド（例：[`dragAndDrop`](api/element/dragAndDrop)コマンド）や、[スマートセレクター](selectors)や[自動待機](autowait)などのコアコンセプトを実装しています。上記の例は次のように簡素化できます：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

スタンドアロンモードでWebdriverIOを使用しても、すべてのプロトコルコマンドに引き続きアクセスできますが、ブラウザとのより高レベルなやり取りを可能にする追加コマンドのスーパーセットが提供されます。これにより、この自動化ツールを独自の（テスト）プロジェクトに統合して、新しい自動化ライブラリを作成できます。よく知られた例として、[Oxygen](https://github.com/oxygenhq/oxygen)や[CodeceptJS](http://codecept.io)があります。また、Webからコンテンツをスクレイピングする（あるいは実行中のブラウザを必要とするその他のあらゆる処理を行う）ためのシンプルなNodeスクリプトを書くこともできます。

特定のオプションが設定されていない場合、WebdriverIOは常に、capabilitiesの`browserName`プロパティに一致するブラウザドライバーのダウンロードとセットアップを試みます。ChromeとFirefoxの場合は、対応するブラウザがマシン上に見つかるかどうかに応じて、ブラウザ自体もインストールすることがあります。

`webdriverio`パッケージのインターフェースの詳細については、[Modules API](/docs/api/modules)を参照してください。

## WDIOテストランナー

とはいえ、WebdriverIOの主な目的は大規模なエンドツーエンドテストです。そのため、読みやすく保守しやすい、信頼性の高いテストスイートの構築を支援するテストランナーを実装しました。

テストランナーは、単純な自動化ライブラリを扱う際によく発生する多くの問題に対処します。まず、テストの実行を整理し、テストスペックを分割して、最大限の並行性でテストを実行できるようにします。また、セッション管理を行い、問題のデバッグやテスト内のエラーの発見に役立つ多くの機能を提供します。

以下は、上記と同じ例をテストスペックとして記述し、WDIOで実行したものです：

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

テストランナーは、Mocha、Jasmine、Cucumberなどの人気のテストフレームワークを抽象化したものです。WDIOテストランナーを使用してテストを実行する方法については、[はじめに](gettingstarted)セクションを参照してください。

`@wdio/cli`テストランナーパッケージのインターフェースの詳細については、[Modules API](/docs/api/modules)を参照してください。