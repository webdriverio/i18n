---
id: wdio-novus-visual-regression-service
title: Novus ビジュアルリグレッションサービス
custom_edit_url: https://github.com/Jnegrier/wdio-novus-visual-regression-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-novus-visual-regression-serviceはサードパーティのパッケージです。詳細については[GitHub](https://github.com/Jnegrier/wdio-novus-visual-regression-service) | [npm](https://www.npmjs.com/package/wdio-novus-visual-regression-service)をご覧ください。

[![Build Status](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service.svg?branch=master)](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service)

> WebdriverIOのためのビジュアルリグレッションテスト

Jan-André Zinserの[wdio-visual-regression-service](https://github.com/zinserjan/wdio-visual-regression-service)と[wdio-screenshot](https://github.com/zinserjan/wdio-screenshot)の作業に基づいています。

## インストール

通常通り、NPM経由でwdio-novus-visual-regression-serviceをインストールできます：

```sh
$ npm install wdio-novus-visual-regression-service --save-dev
```

`WebdriverIO`のインストール方法については[こちら](https://webdriver.io/docs/gettingstarted)をご覧ください。

## 設定
WebdriverIOの設定のサービスセクションに`novus-visual-regression`を追加し、サービスオプションで希望する比較戦略を定義することで、wdio-novus-visual-regression-serviceをセットアップします。

```js
// wdio.conf.js

var path = require('path');
var VisualRegressionCompare = require('wdio-novus-visual-regression-service/compare');

function getScreenshotName(basePath) {
  return function(context) {
    var type = context.type;
    var testName = context.test.title;
    var browserVersion = parseInt(context.browser.version, 10);
    var browserName = context.browser.name;
    var browserViewport = context.meta.viewport;
    var browserWidth = browserViewport.width;
    var browserHeight = browserViewport.height;

    return path.join(basePath, `${testName}_${type}_${browserName}_v${browserVersion}_${browserWidth}x${browserHeight}.png`);
  };
}

exports.config = {
  // ...
  services: [
    [
      'novus-visual-regression',
      {
        compare: new VisualRegressionCompare.LocalCompare({
          referenceName: getScreenshotName(path.join(process.cwd(), 'screenshots/reference')),
          screenshotName: getScreenshotName(path.join(process.cwd(), 'screenshots/screen')),
          diffName: getScreenshotName(path.join(process.cwd(), 'screenshots/diff')),
          misMatchTolerance: 0.01,
        }),
        viewportChangePause: 300,
        viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
        orientations: ['landscape', 'portrait'],
      }
    ]
  ],
  // ...
};
```

### オプション
wdio.config.jsの`visualRegression`キーで、以下の構造を持つ設定オブジェクトを渡すことができます：

* **compare** `Object` <br />
スクリーンショット比較メソッド、[比較メソッド](#compare-methods)を参照

* **viewportChangePause**  `Number`  (デフォルト: 100) <br />
ビューポート変更後にx ミリ秒待ちます。ブラウザが再描画するのに時間がかかることがあります。これによりレンダリングの問題が発生し、実行間で一貫性のない結果が生じる可能性があります。

* **viewports** `Object[{ width: Number, height: Number }]`  (デフォルト: *[current-viewport]*) (**デスクトップのみ**)<br />
   すべてのスクリーンショットは、異なるビューポートの寸法で撮影されます（例：レスポンシブデザインテスト用）

* **orientations** `String[] {landscape, portrait}`  (デフォルト: *[current-orientation]*) (**モバイルのみ**)<br />
    すべてのスクリーンショットは、異なる画面の向きで撮影されます（例：レスポンシブデザインテスト用）

### 比較メソッド
wdio-novus-visual-regression-serviceでは、異なるスクリーンショット比較メソッドを使用できます。

#### VisualRegressionCompare.LocalCompare
名前が示すように、*LocalCompare*はコンピュータでローカルにスクリーンショットをキャプチャし、以前の実行と比較します。

コンストラクタにオブジェクトとして以下のオプションを渡すことができます：

* **referenceName** `Function` <br />
参照スクリーンショットのファイル名を返す関数を渡します。関数は最初のパラメータとしてコマンドに関する全ての関連情報を含む*context*オブジェクトを受け取ります。

* **screenshotName** `Function` <br />
現在のスクリーンショットのファイル名を返す関数を渡します。関数は最初のパラメータとしてコマンドに関する全ての関連情報を含む*context*オブジェクトを受け取ります。

* **diffName** `Function` <br />
差分スクリーンショットのファイル名を返す関数を渡します。関数は最初のパラメータとしてコマンドに関する全ての関連情報を含む*context*オブジェクトを受け取ります。

* **misMatchTolerance** `Number`  (デフォルト: 0.01) <br />
0から100の間の数値で、2つの画像を同一と見なすミスマッチの度合いを定義します。この値を大きくするとテストのカバレッジが減少します。

* **ignoreComparison** `String`  (デフォルト: nothing) <br />
比較方法を調整するために、`nothing`、`colors`、または`antialiasing`の値を持つ文字列を渡します。

現在のテスト名に基づいてスクリーンショットのファイル名を生成する例については、[設定](#configuration)のサンプルコードをご覧ください。

#### VisualRegressionCompare.SaveScreenshot
このメソッドは`VisualRegressionCompare.LocalCompare`の簡易版で、スクリーンショットのみをキャプチャします。これは参照スクリーンショットを作成し、差分を取らずに前のものを上書きしたい場合に非常に便利です。

コンストラクタにオブジェクトとして以下のオプションを渡すことができます：

* **screenshotName** `Function` <br />
現在のスクリーンショットのファイル名を返す関数を渡します。関数は最初のパラメータとしてコマンドに関する全ての関連情報を含む*context*オブジェクトを受け取ります。

#### VisualRegressionCompare.Spectre
このメソッドは、Webアプリケーション[Spectre](https://github.com/wearefriday/spectre)にスクリーンショットをアップロードするために使用されます。
Spectreはビジュアルリグレッションテスト用のUIです。スクリーンショットを保存して比較するため、継続的インテグレーションに非常に役立ちます。

コンストラクタにオブジェクトとして以下のオプションを渡すことができます：

* **url** `String` <br />
spectreウェブサービスのURLを渡します。

* **project** `String` <br />
プロジェクトの名前を渡します。

* **suite** `String` <br />
テストスイートの名前を渡します。1つのプロジェクトに複数のスイートを含めることができます。

* **test** `Function` <br />
スクリーンショットのテスト名を返す関数を渡します。関数は最初のパラメータとしてコマンドに関する全ての関連情報を含む*context*オブジェクトを受け取ります。

* **browser** `Function` <br />
スクリーンショットのブラウザを返す関数を渡します。関数は最初のパラメータとしてコマンドに関する全ての関連情報を含む*context*オブジェクトを受け取ります。

* **size** `Function` <br />
スクリーンショットのサイズを返す関数を渡します。関数は最初のパラメータとしてコマンドに関する全ての関連情報を含む*context*オブジェクトを受け取ります。

* **fuzzLevel** `Number`  (デフォルト: 30) <br />
Spectreの画像比較方法のファズファクターを定義する0から100の間の数値。詳細については[Spectreドキュメント](https://github.com/wearefriday/spectre)をご覧ください。

**例**
```js
// wdio.conf.js

var path = require('path');
var VisualRegressionCompare = require('wdio-novus-visual-regression-service/compare');

exports.config = {
  // ...
  services: [
    [
      'novus-visual-regression',
      {
        compare: new VisualRegressionCompare.Spectre({
          url: 'http://localhost:3000',
          project: 'my project',
          suite: 'my test suite',
          test: function getTest(context) {
            return context.test.title;
          },
          browser: function getBrowser(context) {
            return context.browser.name;
          },
          size: function getSize(context) {
            return context.meta.viewport != null ? context.meta.viewport.width : context.meta.orientation;
          },
          fuzzLevel: 30
        }),
        viewportChangePause: 300,
        viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
        orientations: ['landscape', 'portrait'],
      }
    ]
  ],
  // ...
};
```

## 使用方法
wdio-novus-visual-regression-serviceは、WebdriverIOインスタンスに以下のコマンドを追加します：
* `browser.checkViewport([{options}]);`
* `browser.checkDocument([{options}]);`
* `browser.checkElement(elementSelector, [{options}]);`


これらすべてのコマンドには、異なる寸法でスクリーンショットをキャプチャしたり、無関係な部分（例：コンテンツ）を除外するのに役立つオプションが用意されています。以下のオプションが利用可能です：


* **exclude** `String[]|Object[]` (**まだ実装されていません**)<br />
  スクリーンショットの頻繁に変更される部分を除外します。1つまたは複数の要素を照会する様々な[WebdriverIOセレクタ戦略](http://webdriver.io/guide/usage/selectors.html)を渡すか、長方形やポリゴンを伸ばすxとy値を定義できます。

* **hide** `Object[]`<br />
  すべての種類の[WebdriverIOセレクタ戦略](http://webdriver.io/guide/usage/selectors.html)によって照会されたすべての要素を非表示にします（`visibility: hidden`を介して）

* **remove** `Object[]`<br />
  すべての種類の[WebdriverIOセレクタ戦略](http://webdriver.io/guide/usage/selectors.html)によって照会されたすべての要素を削除します（`display: none`を介して）

* **viewports** `Object[{ width: Number, height: Number }]` (**デスクトップのみ**)<br />
     このコマンドのグローバルな*viewports*値を上書きします。すべてのスクリーンショットは異なるビューポートの寸法で撮影されます（例：レスポンシブデザインテスト用）

* **orientations** `String[] {landscape, portrait}` (**モバイルのみ**)<br />
    このコマンドのグローバルな*orientations*値を上書きします。すべてのスクリーンショットは異なる画面の向きで撮影されます（例：レスポンシブデザインテスト用）

* **misMatchTolerance** `Number` <br />
    このコマンドのグローバルな*misMatchTolerance*値を上書きします。2つの画像を同一と見なすミスマッチの度合いを定義する0から100の間の数値を渡します。

* **fuzzLevel** `Number` <br />
    このコマンドのグローバルな*fuzzLevel*値を上書きします。Spectreの画像比較方法のファズファクターを定義する0から100の間の数値を渡します。

* **ignoreComparison** `String` <br />
    このコマンドのグローバルな*ignoreComparison*値を上書きします。比較方法を調整するために、`nothing`、`colors`、または`antialiasing`の値を持つ文字列を渡します。

* **viewportChangePause**  `Number` <br />
    このコマンドのグローバルな*viewportChangePause*値を上書きします。ビューポート変更後にx ミリ秒待ちます。

### ライセンス

MIT