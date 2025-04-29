---
id: wdio-slack-service
title: Slackサービス
custom_edit_url: https://github.com/carmenmitru/wdio-slack-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-serviceはサードパーティのパッケージです。詳細については[GitHub](https://github.com/carmenmitru/wdio-slack-service) | [npm](https://www.npmjs.com/package/wdio-slack-service)をご覧ください。
テスト結果をSlackの通知/メッセージとしてチャンネルに送信するためのWebdriverioライブラリです

## インストール

最も簡単な方法は、`package.json`の中で`wdio-slack-service`をdevDependencyとして保持することです。

```json
{
  "devDependencies": {
    "wdio-slack-service": "2.0.8"
  }
}
```

以下のように簡単にインストールできます：

```bash
npm install wdio-slack-service --save-dev
```

`WebdriverIO`のインストール方法については[こちら](https://webdriver.io/docs/gettingstarted.html)をご覧ください。

## 設定

まず、wdio設定ファイル`wdio.conf.js`にサービスをインポートします

```js
// wdio.conf.js
const slack = require('wdio-slack-service');
```

このサービスを使用するには、通知を送信するためのslack webhook URLが必要で、`services`配列に`slack`を追加する必要があります

例：

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        [slack, {
            webHookUrl: "<SLACK_WEBHOOK_URL>", // 特定のチャンネルに通知を投稿するために使用されます
            notifyOnlyOnFailure: true, // テスト失敗時のみ通知を送信
            messageTitle: "<NOTIFICATION_TITLE>" // 通知の名前
        }]
]
```
## 機能

- テスト結果に関係なく通知を送信
- テスト失敗時のみ通知を送信
- `mocha`、`jasmine`、`cucumber`のサポート
- リトライ/再実行テストは追加情報と共に記録
- テスト実行時間情報
- エラー詳細
- Cucumberシナリオ/ステップレポート
- ブラウザとバージョン情報

## 動作の仕組み
`mocha`/`jasmine`の場合、通知はspec単位で送信され、`cucumber`の場合はfeature単位で送信されます。例えば、10個のspec/featureファイルがある場合、`after`フックでトリガーされるため、10個の通知が送信されます

## オプション

通知を送信するには、slackのwebhook URLが必要です。slackのwebhook URLの作成方法については、[このページ](https://api.slack.com/messaging/webhooks)をご覧ください

### webHookUrl

このURLは、投稿メッセージを識別/認証し、slackチャンネルに送信するために使用されます

タイプ: `String` <br/>
省略可能: `NO` <br/>
デフォルト: `NA`

### notifyOnlyOnFailure

テスト失敗時のみslack通知を受け取りたい場合は、このオプションを`true`に設定します。そうでない場合は、合格/不合格に関係なく、すべてのテスト実行に対して通知を送信します

タイプ: `Boolean` <br/>
省略可能: `YES` <br/>
デフォルト: `false`

### messageTitle

通知のタイトル

タイプ: `String` <br/>
省略可能: `YES` <br/>
デフォルト: `Webdriverio Slack Reporter`

## スクリーンショット

### Cucumber 成功/失敗

![Cucumber Pass/fail](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumber.PNG)

### Cucumber リトライ

![Cucumber Retry](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumberretry.PNG)

### すべて成功

![All Pass](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/allpass.PNG)

### 失敗 成功

![Fail Pass](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/failpass.PNG)

### リトライ 失敗

![Retry Failed](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retryfail.PNG)

### リトライ 成功

![Retry Passed](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retrypassed.PNG)

---

WebdriverIOの詳細については[ホームページ](https://webdriver.io)をご覧ください。