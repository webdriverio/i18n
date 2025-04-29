---
id: wdio-reportportal-reporter
title: レポートポータルレポーター
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-reporterはサードパーティのパッケージです。詳細については[GitHub](https://github.com/borisosipov/wdio-reportportal-reporter) | [npm](https://www.npmjs.com/package/wdio-reportportal-reporter)をご覧ください。


![npm](https://img.shields.io/npm/v/wdio-reportportal-reporter)
![npm](https://img.shields.io/npm/dm/wdio-reportportal-reporter)
> WebdriverIOのレポータープラグインで、結果をReport Portal([http://reportportal.io/](http://reportportal.io/))に報告します。

## インストール

最も簡単な方法は、`package.json`に`wdio-reportportal-reporter`と`wdio-reportportal-service`をdevDependencyとして保持することです。

```json
{
  "devDependencies": {
    "wdio-reportportal-reporter": "^7.0.0",
    "wdio-reportportal-service": "^7.0.0"
  }
}
```

`WebdriverIO`のインストール方法は[こちら](https://webdriver.io/docs/gettingstarted.html)で確認できます。

## 設定

wdio.conf.jsファイルで出力ディレクトリを設定します：

```js
const reportportal = require('wdio-reportportal-reporter');
const RpService = require("wdio-reportportal-service");

const conf = {
  reportPortalClientConfig: { // report portal settings
    token: '00000000-0000-0000-0000-00000000000',
    endpoint: 'https://reportportal-url/api/v1',
    launch: 'launch_name',
    project: 'project_name',
    mode: 'DEFAULT',
    debug: false,
    description: "Launch description text",
    attributes: [{key:"tag", value: "foo"}],
    headers: {"foo": "bar"}, // optional headers for internal http client
    restClientConfig: { // axios like http client config - https://github.com/axios/axios#request-config
      proxy: {
        protocol: 'https',
        host: '127.0.0.1',
        port: 9000,
        auth: {
          username: 'mikeymike',
          password: 'rapunz3l'
        }
      },
      timeout: 60000
    }
  },
  reportSeleniumCommands: false, // add selenium commands to log
  seleniumCommandsLogLevel: 'debug', // log level for selenium commands
  autoAttachScreenshots: false, // automatically add screenshots
  screenshotsLogLevel: 'info', // log level for screenshots
  parseTagsFromTestTitle: false, // parse strings like `@foo` from titles and add to Report Portal
  cucumberNestedSteps: false, // report cucumber steps as Report Portal steps
  autoAttachCucumberFeatureToScenario: false, // requires cucumberNestedSteps to be true for use
  sanitizeErrorMessages: true, // strip color ascii characters from error stacktrace
  sauceLabOptions : {
    enabled: true, // automatically add SauseLab ID to rp tags.
    sldc: "US" // automatically add SauseLab region to rp tags.
  }
};

exports.config = {
  // ...
  services: [[RpService, {}]],
  reporters: [[reportportal, conf]],
  // ...
};
```

# 追加のAPI

APIメソッドには以下のようにアクセスできます：

```js
const reporter = require('wdio-reportportal-reporter')
```

### メソッドの説明

* `reporter.addAttribute({key, value})` – 現在のテストに属性を追加します。
  * `key` (*string*, 任意) - 属性キー。空でない文字列である必要があります。
  * `value` (*string*, 必須) - 属性値。空でない文字列である必要があります。
* `reporter.addAttributeToCurrentSuite({key, value})` - 現在のスイートに属性を追加します。
  * `key` (*string*, 任意) - 属性キー。空でない文字列である必要があります。
  * `value` (*string*, 必須) - 属性値。空でない文字列である必要があります。
* `reporter.addDescriptionToCurrentSuite(description)` - 現在のスイートに説明を追加します。
  * `description` (*string*) - 説明内容。テキストはマークダウンで書式設定できます。
* `reporter.addDescriptionToAllSuites(description)` - これから実行されるすべてのスイートに説明を追加します。(すべてのスイートが同じ説明を持つように、beforeAllフックで使用してください)
  * `description` (*string*) - 説明内容。テキストはマークダウンで書式設定できます。
* `reporter.sendLog(level, message)` – 現在のスイート/テスト項目にログを送信します。
  * `level` (*string*) - ログレベル。値は ['trace', 'debug', 'info', 'warn', 'error'] です。
  * `message` (*string*) – ログメッセージの内容。
* `reporter.sendFile(level, name, content, [type])` – 現在のスイート/テスト項目にファイルを送信します。
  * `level` (*string*) - ログレベル。値は ['trace', 'debug', 'info', 'warn', 'error'] です。
  * `name` (*string*) – ファイル名。
  * `content` (*string*) – 添付ファイルの内容
  * `type` (*string*, 任意) – 添付ファイルのMIMEタイプ、デフォルトは`image/png`
  * `message` (*string*) – ログメッセージの内容。
* `reporter.sendLogToTest(test, level, message)` - 特定のテストにログを送信します。
  * `test` (*object*) - `afterTest\afterStep` wdioフックからのテストオブジェクト
  * `level` (*string*) - ログレベル。値は ['trace', 'debug', 'info', 'warn', 'error'] です。
  * `message` (*string*) – ログメッセージの内容。
* `reporter.sendFileToTest(test, level, name, content, [type])` – 特定のテストにファイルを送信します。
  * `test` (*object*) - `afterTest\afterStep` wdioフックからのテストオブジェクト
  * `level` (*string*) - ログレベル。値は ['trace', 'debug', 'info', 'warn', 'error'] です。
  * `name` (*string*) – ファイル名。
  * `content` (*string*) – 添付ファイルの内容
  * `type` (*string*, 任意) – 添付ファイルのMIMEタイプ、デフォルトは`image/png`
  * `message` (*string*) – ログメッセージの内容。

注意：`sendLog`\\`sendFile`は**現在実行中のテスト項目**にログを送信します。これは、アクティブなテストなしでログを送信した場合（フックからやスイートレベルで）、Report Portal UIに報告されないことを意味します。

`sendLogToTest`\\`sendFileToTest`メソッドは、wdio afterTestフックから失敗したテスト項目にスクリーンショットやログを送信する必要がある場合に便利です。

Mochaの例：

```js
const reportportal = require('wdio-reportportal-reporter');
const path = require('path');
const fs = require('fs');

exports.config = {
...
  async afterTest(test) {
    if (test.passed === false) {
      const filename = "screnshot.png";
      const outputFile = path.join(__dirname, filename);
      await browser.saveScreenshot(outputFile);
      reportportal.sendFileToTest(test, 'info', filename, fs.readFileSync(outputFile));
    }
  }
...
```

Jasmineの例：

```js
const reportportal = require('wdio-reportportal-reporter');
const path = require('path');
const fs = require('fs');

exports.config = {
...
  async afterTest(test) {
    if (test.passed === false) {
      const filename = "screnshot.png";
      const outputFile = path.join(__dirname, filename);
      await browser.saveScreenshot(outputFile);
      //!!
      Object.assign(test, {title: test.description}}
      reportportal.sendFileToTest(test, 'info', filename, fs.readFileSync(outputFile));
    }
  }
...
```

WDIO Cucumber "5.14.3+"の例：

```js
const reportportal = require('wdio-reportportal-reporter');

exports.config = {
...
   afterStep: async function (uri, feature, { error, result, duration, passed }, stepData, context) {
     if (!passed) {
        let failureObject = {};
        failureObject.type = 'afterStep';
        failureObject.error = error;
        failureObject.title = `${stepData.step.keyword}${stepData.step.text}`;
        const screenShot = await global.browser.takeScreenshot();
        let attachment = Buffer.from(screenShot, 'base64');
        reportportal.sendFileToTest(failureObject, 'error', "screnshot.png", attachment);
    }
  }
...
}
```

## Report Portal UIの起動ページへのリンクを取得する

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const link = await RpService.getLaunchUrl(config);
        console.log(`Report portal link ${link}`)
    }
...
```

またはより複雑な方法

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const protocol = 'http:';
        const hostname = 'example.com';
        const port = ':8080'; // or empty string for default 80/443 ports
        const link = await RpService.getLaunchUrlByParams(protocol, hostname, port, config);
        console.log(`Report portal link ${link}`)
    }
...
```

## 既存の起動にテストを報告する

既存のアクティブな起動にテストを報告したい場合は、環境変数`REPORT_PORTAL_LAUNCH_ID`でレポーターに渡すことができます。
そのような起動を開始するとともに、起動を終了する責任もあなたにあります。

```sh
export REPORT_PORTAL_LAUNCH_ID=SomeLaunchId
npm run wdio
```

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細は[LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-reporter/blob/master/LICENSE)ファイルをご覧ください