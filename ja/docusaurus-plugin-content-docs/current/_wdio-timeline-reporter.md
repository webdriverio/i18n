---
id: wdio-timeline-reporter
title: タイムラインレポーター
custom_edit_url: https://github.com/QualityOps/wdio-timeline-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-timeline-reporterはサードパーティのパッケージです。詳細については[GitHub](https://github.com/QualityOps/wdio-timeline-reporter) | [npm](https://www.npmjs.com/package/wdio-timeline-reporter)をご覧ください。


> テスト結果の集約的な視覚化のためのWebdriverIOレポーターです。「百聞は一見にしかず」の原則に基づいています。

![example.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/example.png)

## なぜ使うのか

私たちは失敗したテストのデバッグに多くの時間を費やし、ターミナル出力からエラースクリーンショットの確認まで切り替えています。このレポーターは必要な一般的な情報をすべて1つのレポートに集約します。テストを実行し、後から確認できるイベントのタイムラインを作成することで、すべてが正常であることを確認できます。

#### 特徴：

- MochaとJasmineフレームワークで優れた動作をします。Cucumberでも動作しますが、各ステップがテストとして報告されます
- テスト結果の明確なサマリー
- テスト実行中に取得されたすべてのスクリーンショットを含む各テストの詳細
- テスト結果のフィルタリング。失敗したテストに集中するのに最適
- テストにエラースタックトレースが添付されます
- 実行時にテストに追加情報を加える機能
- 後処理は不要。wdioテストプロセスの完了時に、静的なhtmlレポートファイルが生成されます
- スクリーンショットの撮影と画像のリサイズを管理するタイムラインサービス

サンプルのHTMLレポートは[こちら](http://htmlpreview.github.io/?https://github.com/QualityOps/wdio-timeline-reporter/blob/master/images/example-timeline-report.html)で確認できます。

`WebdriverIO`のインストール方法は[こちら](http://webdriver.io/guide/getstarted/install.html)で確認できます。

## インストール

**WEBDRIVERIO V4と互換性のあるバージョンについては[こちら](https://github.com/QualityOps/wdio-timeline-reporter/tree/v4)をご覧ください**

```shell
npm install --save wdio-timeline-reporter
```

`package.json`に依存関係が追加されます

```json
{
  "dependencies": {
    "wdio-timeline-reporter": "^5.1.0"
  }
}
```

### 使用方法

wdio設定ファイルのreporters配列に`timeline`を追加します。

また、wdio-timeline-reporterから`TimelineService`をインポートして追加します。

WebdriverIO 5ではレポーターがランナーインスタンスごとに初期化されるようになったため、サービスはレポートを結合してHTMLを作成するために必須です。[WebdriverIOでのオープンディスカッションを参照](https://github.com/webdriverio/webdriverio/issues/3780)

TimelineServiceはテスト実行中のスクリーンショット撮影も管理できます。画像のサイズと品質を小さくしたり、base64として画像をレポートに埋め込んだりするオプションがあります。これらは[レポーターオプション](#reporter-options)で設定できます。

```js
// wdio.conf.js
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
exports.config = {
  // ...
  reporters: [['timeline', { outputDir: './desired_location' }]],
  // ...
  services: [[TimelineService]]
};
```

### レポーターオプション

デフォルトのレポーター設定をオーバーライドしたい場合は、以下のように、reportersの下のtimeline配列にreporterOptionsオブジェクトリテラルを追加します。

![reporter-options.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/reporter-options.png)

| インデックス | 説明                                                                                                                                          |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.    | HTMLファイルとスクリーンショットが作成されるディレクトリ。必須オプション                                                                                                       |
| 2.    | レポートHTMLファイルの名前。デフォルト値は`timeline-report.html`                                                                                                   |
| 3.    | HTMLファイルに画像をbase64として埋め込む。デフォルト値は`false`                                                                                                      |
| 4.    | 画像操作のためのオブジェクトオプション                                                                                                                         |
| 5.    | JPEG品質を設定。`resize`オプションが`true`の場合のみ関連。値が小さいほど、画像サイズと品質が小さくなります。デフォルト値は`70`。許可される最大値は`100`                                                    |
| 6.    | 画像をリサイズする。デフォルト値は`false`                                                                                                                     |
| 7.    | ピクセル総数を減らす値。`resize`オプションが`true`の場合のみ関連。デフォルトは`1`、有効な値は`1～5`                                                                                |
| 8.    | スクリーンショットを撮影する頻度。サポートされる値は`on:error`、`before:click`、`none`。デフォルトは`none`。`before:click`はテスト中のアプリケーションのスクリーンショットのタイムラインを作成するための優れたオプションです。 |

### テストコンテキストに追加情報を加える

`addContext`静的メソッドを使用して、テストに追加情報を加えることができます。これは、テスト実行中に動的なユーザー名で作成されたユーザーなど、失敗したテストのデバッグに役立つ重要な情報を追加するのに役立ちます。

#### 基本的な使用方法

`TimelineReporter.addContext`静的メソッドは、文字列パラメータまたは`title`と`value`の2つのプロパティを持つオブジェクトリテラルを受け入れます。例：

```js
{ title: 'sessionId', value: 'b59bb9ec-ab15-475e-9ce6-de8a14ca0cd3' }
```

値はリンクにすることもできます

##### Mochaの例

```js
const TimelineReporter = require('wdio-timeline-reporter').default;

describe('Suite', function() {
  it('Test', function() {
    // オブジェクトリテラルパラメータ
    TimelineReporter.addContext({
      title: 'Test User',
      value: 'user id created during the test'
    });

    // アンカータグとしての値
    TimelineReporter.addContext({
      title: 'Dynamic link',
      value: '<a href="">Some important link related to test</a>'
    });

    // 文字列パラメータ
    TimelineReporter.addContext('This test might be flaky');
  });
});
```

## 謝辞

[wdio-json-reporter](https://github.com/fijijavis/wdio-json-reporter)の作者とメンテナに感謝します。彼らのv5ソリューションを調査することで、作業のスピードアップに役立ちました