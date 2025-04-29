---
id: wdio-qunit-service
title: QUnit サービス
custom_edit_url: https://github.com/mauriciolauffer/wdio-qunit-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-qunit-serviceは第三者パッケージです。詳細については[GitHub](https://github.com/mauriciolauffer/wdio-qunit-service) | [npm](https://www.npmjs.com/package/wdio-qunit-service)をご覧ください

[![npm](https://img.shields.io/npm/v/wdio-qunit-service)](https://www.npmjs.com/package/wdio-qunit-service) [![test](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml/badge.svg)](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml)

[WebdriverIO](https://webdriver.io/) (wdio) サービスは、[QUnit](https://qunitjs.com/)ブラウザベースのテストを実行し、それらを動的に`wdio`テストスイートに変換するためのものです。

## Karmaの置き換え

`QUnit Service`は、[Karma JS](https://karma-runner.github.io/latest/index.html)を使用して`QUnit`テスト（[karma-qunit](https://github.com/karma-runner/karma-qunit/)、[karma-ui5](https://github.com/SAP/karma-ui5)、またはKarmaとQUnitのその他の組み合わせ）を実行している人々のためのドロップイン代替品です。Karmaは[非推奨](https://github.com/karma-runner/karma)であり、人々はより現代的な代替手段に移行すべきです！

QUnitテストをそのままに保ち、書き直しやリファクタリングなしで維持したい場合、`QUnit Service`はあなたが必要とするすべてです。ブラウザでQUnitのHTMLファイルを実行し、すべての結果を`wdio`形式でキャプチャします。

そのため、開発者は`QUnit Service`を`wdio`エコシステムで利用可能なその他のすべてと連携して使用できます。

テスト実行を[ビデオ](https://webdriver.io/docs/wdio-video-reporter/)で記録したいですか？[スクリーンショット](https://webdriver.io/docs/api/browser/saveScreenshot/)を撮るか、[PDF](https://webdriver.io/docs/api/browser/savePDF/)で保存しますか？[コードカバレッジ](https://www.npmjs.com/package/wdio-monocart-service)をチェックしますか？テスト結果を[JUnit](https://webdriver.io/docs/junit-reporter)形式で保存しますか？どうぞ、`QUnit Service`はあなたの邪魔をしません。

## インストール

`WebdriverIO`を設定した後、`package.json`ファイルに`wdio-qunit-service`をdevDependencyとしてインストールします。

```shell
npm install wdio-qunit-service --save-dev
```

まだ`WebdriverIO`を設定していない場合は、公式の[ドキュメント](https://webdriver.io/docs/gettingstarted)を確認してください。

## 設定

`QUnit Service`を使用するには、`wdio.conf.js`ファイルの`services`リストに追加するだけです。wdioのドキュメントには[設定ファイル](https://webdriver.io/docs/configurationfile)に関するすべての情報があります：

```js
// wdio.conf.js
export const config = {
  // ...
  services: ["qunit"],
  // ...
};
```

## 使用方法

テストを実行する前にWebサーバーが起動して実行されていることを確認してください。`wdio`はWebサーバーを起動しません。

### .specまたは.testファイルでの使用

WebdriverIOテストでは、QUnit HTMLテストページに移動し、`browser.getQUnitResults()`を呼び出す必要があります。

```js
describe("QUnit test page", () => {
  it("should pass QUnit tests", async () => {
    await browser.url("http://localhost:8080/test/unit/unitTests.qunit.html");
    await browser.getQUnitResults();
  });
});
```

QUnit HTMLテストページごとに1つのWebdriverIOテストファイルを持つことをお勧めします。これにより、テストが並行かつ完全に分離された状態で実行されることが保証されます。

### 設定のみ、.specまたは.testファイルなし

spec/testファイルを作成したくない場合は、設定にQUnit HTMLファイルのリストを渡すことで、テストが自動的に生成されます。

```js
// wdio.conf.js
export const config = {
  // ...
  baseUrl: 'http://localhost:8080',
  services: [
    ['qunit', {
      paths: [
        'unit-tests.html',
        'integration-tests.html',
        'test/qunit.html'
      ]
    }],
  // ...
};
```

### テスト結果

テスト結果は次のようになります：
![QUnit Serviceテスト結果](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./wdio-qunit-service-results.png?raw=true)

## 例

`javascript`、`typescript`などを使用したサンプルについては、[examples](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/)フォルダをご確認ください。

### SAP Fiori / UI5アプリでの使用

よく知られている[openui5-sample-app](https://github.com/SAP/openui5-sample-app)を使用した直接的な[例](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/)：

- 設定ファイルを作成します：[wdio.conf.js](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/wdio.conf.js)

- `wdio`にQUnitテストファイルの場所を指示します：

- - QUnitファイルを[サービス設定](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app-no-specs/webapp/test/wdio.conf.js)に含めるか
- - または
- - [ユニットテスト](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/unit/unit.test.js)と[OPA5テスト](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/integration/opa.test.js)のためのWebdriverIOテストファイルを作成します

- テストを実行する前にWebサーバーが実行されている必要があります

- 実行するには $ `wdio run webapp/test/wdio.conf.js`

## 作者

Mauricio Lauffer

- LinkedIn: [https://www.linkedin.com/in/mauriciolauffer](https://www.linkedin.com/in/mauriciolauffer)

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細については[LICENSE](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/LICENSE)ファイルをご覧ください。