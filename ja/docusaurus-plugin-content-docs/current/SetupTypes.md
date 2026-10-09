---
id: setuptypes
title: セットアップの種類
description: "生のプロトコルバインディングからスタンドアロンモード、WDIOテストランナーまで、WebdriverIOの使い方を比較し、最適なものを選びましょう。"
---

WebdriverIOはさまざまな目的で使用できます。WebDriverプロトコルAPIを実装しており、ブラウザを自動で操作できます。このフレームワークは、あらゆる環境、あらゆる種類のタスクで動作するように設計されています。サードパーティのフレームワークには依存せず、実行に必要なのはNode.jsだけです。

## プロトコルバインディング

WebDriverプロトコルとの基本的なやり取りには、WebdriverIOは[`webdriver`](https://www.npmjs.com/package/webdriver) NPMパッケージをベースにした独自のプロトコルバインディングを使用します:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

すべての[プロトコルコマンド](api/webdriver)は、自動化ドライバーからの生のレスポンスを返します。このパッケージは非常に軽量で、プロトコルの使用を簡単にするための自動待機のようなスマートなロジックは__一切__ありません。

インスタンスに適用されるプロトコルコマンドは、ドライバーの初期セッションレスポンスに依存します。たとえば、レスポンスがモバイルセッションの開始を示している場合、パッケージはAppiumコマンドをインスタンスのプロトタイプに適用します。

`webdriver`パッケージのインターフェースの詳細については、[Modules API](/docs/api/modules)を参照してください。

[WebdriverIO DevTools](/docs/devtools)は自動化プロトコルではありません。実行をライブで監視し、後からトレースを再生するためのデバッグUIです。

## スタンドアロンモード

WebDriverプロトコルとのやり取りを簡単にするために、`webdriverio`パッケージはプロトコルの上にさまざまなコマンド(例: [`dragAndDrop`](api/element/dragAndDrop)コマンド)や、[スマートセレクター](selectors)、[自動待機](autowait)などのコアコンセプトを実装しています。上記の例は次のように簡略化できます:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

スタンドアロンモードでWebdriverIOを使用しても、すべてのプロトコルコマンドに引き続きアクセスできますが、それに加えてブラウザとより高レベルなやり取りを可能にする追加コマンドのスーパーセットが提供されます。これにより、この自動化ツールを独自の(テスト)プロジェクトに統合して、新しい自動化ライブラリを作成できます。よく知られた例としては、[Oxygen](https://github.com/oxygenhq/oxygen)や[CodeceptJS](http://codecept.io)があります。また、Webからコンテンツをスクレイピングする(あるいはブラウザの実行を必要とするその他の処理を行う)ための通常のNodeスクリプトを書くこともできます。

特定のオプションが設定されていない場合、WebdriverIOは常に、capabilitiesの`browserName`プロパティに一致するブラウザドライバーのダウンロードとセットアップを試みます。ChromeとFirefoxの場合は、対応するブラウザがマシン上に見つかるかどうかに応じて、ブラウザ自体をインストールすることもあります。

`webdriverio`パッケージのインターフェースの詳細については、[Modules API](/docs/api/modules)を参照してください。

## WDIOテストランナー

とはいえ、WebdriverIOの主な目的は、大規模なエンドツーエンドテストです。そのため、読みやすく保守しやすい、信頼性の高いテストスイートの構築を支援するテストランナーを実装しました。

テストランナーは、素の自動化ライブラリを扱う際によく発生する多くの問題を解決します。まず、テストの実行を整理し、テストスペックを分割することで、テストを最大限の並行性で実行できるようにします。また、セッション管理を行い、問題のデバッグやテスト内のエラーの発見に役立つ多くの機能を提供します。

以下は、上記と同じ例をテストスペックとして記述し、WDIOで実行したものです:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

テストランナーは、Mocha、Jasmine、Cucumberなどの人気のあるテストフレームワークを抽象化したものです。WDIOテストランナーを使用してテストを実行する方法については、[はじめに](gettingstarted)セクションで詳細を確認してください。

`@wdio/cli`テストランナーパッケージのインターフェースの詳細については、[Modules API](/docs/api/modules)を参照してください。