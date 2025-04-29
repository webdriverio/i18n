---
id: wdio-slack-reporter
title: Slack レポーター
custom_edit_url: https://github.com/morooLee/wdio-slack-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-reporter は第三者提供のパッケージです。詳細については [GitHub](https://github.com/morooLee/wdio-slack-reporter) | [npm](https://www.npmjs.com/package/@moroo/wdio-slack-reporter) をご覧ください。

![version](https://img.shields.io/npm/v/@moroo/wdio-slack-reporter?color=%23CB3837&label=latest)
![downloads](https://img.shields.io/npm/dw/@moroo/wdio-slack-reporter?color=%23CB3837&)
![license](https://img.shields.io/npm/l/@moroo/wdio-slack-reporter)
![webdriverio](https://img.shields.io/static/v1?color=EA5906&label=WebdriverIO&message=>=8.0&logo=webdriverio)

[WebdriverIO](https://webdriver.io/) から [Incoming webhook](https://api.slack.com/incoming-webhooks) と [Web API](https://api.slack.com/web) を使用して結果を [Slack](https://slack.com/) に送信するレポーター。

## 📢 重要なお知らせ

### [files.upload の非推奨化](https://api.slack.com/changelog/2024-04-a-better-way-to-upload-files-is-here-to-stay) により [filesUploadV2](https://tools.slack.dev/node-slack-sdk/web-api/#upload-a-file) への移行

## Slack 通知のスクリーンショット

<img src="https://raw.githubusercontent.com/morooLee/wdio-slack-reporter/master/docs/Notification.png" width="80%" height="80%" title="Notification Image" alt="Notification"></img>

## WebdriverIO バージョンサポートポリシー

> このプロジェクトでサポートされている WebdriverIO のバージョンは、WebdriverIO のサポートポリシーに従います。
> WebdriverIO のサポートポリシーは[こちら](https://webdriver.io/versions)で確認できます。

## インストール

最も簡単な方法は、`@moroo/wdio-slack-reporter` を `package.json` の devDependency として保持することです。

```json
{
  "devDependencies": {
    "@moroo/wdio-slack-reporter": "^9.0.0"
  }
}
```

簡単に以下のようにインストールできます：

- NPM

```bash
npm install @moroo/wdio-slack-reporter --save-dev
```

- Yarn

```bash
yarn add -D @moroo/wdio-slack-reporter
```

`WebdriverIO` のインストール方法は[こちら](https://webdriver.io/docs/gettingstarted.html)で確認できます。

## 設定

レポーターを使用するには、wdio.conf.js の reporters 配列に slack を追加する必要があります。

```js
// wdio.conf.js
import SlackReporter from '@moroo/wdio-slack-reporter';

export const config: WebdriverIO.Config = {
  reporters: [
    [
      SlackReporter,
      {
        slackOptions: {
          type: 'web-api',
          channel: process.env.SLACK_CHANNEL || 'Cxxxxxxxxxx',
          token: process.env.SLACK_BOT_TOKEN || 'xoxb-xxxxxxxxxx-xxxxxx...',
        },
      },
    ],
  ],
};
```

## 設定オプション

以下の設定オプションがサポートされています。
通知を送信するには、`webhook` または `web-api` を設定する必要があります。
`web-api` と `webhook` の両方が設定されている場合は、`web-api` が使用されます。

### Webhook (Incoming Webhook)

#### **webhook (`必須`)**

通知を送信する Slack チャンネルの [**Incoming Webhook**](https://api.slack.com/incoming-webhooks)。URL が設定されていない場合、通知は送信されません。

- スコープ: `webhook`
- タイプ: `string`

#### **username (`オプション`)**

username の値は、送信者として Slack 通知に表示されます。

- スコープ: `webhook`
- タイプ: `string`
- デフォルト: `"WebdriverIO Reporter"`

#### **icon_url (`オプション`)**

Slack に表示されるアイコンの URL

- スコープ: `webhook`
- タイプ: `string`
- デフォルト: `"https://webdriver.io/img/webdriverio.png"`

> [!TIP]
> これらの他に、[Slack Incoming Webhook](https://www.npmjs.com/package/@slack/webhook) の仕様で定義されているすべてのオプションも使用できます。

### Web API (Slack Bot)

#### **token (`必須`)**

通知を送信する Slack チャンネルの [**Web API**](https://api.slack.com/web)。[ボットユーザートークン](https://api.slack.com/legacy/oauth#bots)が必要です。ボットアクセストークンは常に `xoxb` で始まります。
ボットトークンには [`chat:write`](https://api.slack.com/scopes/chat:write)、[`files:write`](https://api.slack.com/scopes/files:write) の OAuth スコープが必要です。
詳細は[こちら](https://api.slack.com/methods/chat.postMessage#text_usage)をご覧ください。

- スコープ: `web-api`
- タイプ: `string`

#### **channel (`必須`)**

メッセージを送信するチャンネル、プライベートグループ、または IM チャンネル。エンコードされた ID、または名前を指定できます。詳細は[こちら](https://api.slack.com/legacy/oauth-scopes)をご覧ください。
[_`「チャンネル ID の見つけ方」 - stackoverflow -`_](https://stackoverflow.com/questions/57139545/how-can-i-see-slack-bot-info-like-user-id-and-bot-id-without-making-api-call)

- スコープ: `web-api`
- タイプ: `string`

> [!TIP]
> これらの他に、[Slack Web API](https://www.npmjs.com/package/@slack/web-api) の仕様で定義されているすべてのオプションも使用できます。

#### **uploadScreenshotOfFailedCase (`オプション`)**

失敗したケースにスクリーンショットを添付するには、このオプションを true に設定します。

- スコープ: `web-api`
- タイプ: `boolean`
- デフォルト: `true`

#### **notifyDetailResultThread (`オプション`)**

> このオプションは notifyTestFinishMessage オプションが true の場合にのみ機能します。

Slack に投稿されたテスト結果の通知に結果の詳細を含むスレッドを追加したい場合は、このオプションを true に設定します。

- スコープ: `web-api`
- タイプ: `boolean`
- デフォルト: `true`

#### **filterForDetailResults (`オプション`)**

> このオプションは notifyDetailResultThread オプションが true の場合にのみ機能します。

このオプションに希望するフィルターを配列に追加すると、詳細な結果が Slack でフィルタリングされ、スレッドに送信されます。
_(フィルターがない場合（配列が空または未定義）、すべてのフィルターが適用されます。)_
**フィルターリスト**: `passed`, `failed`, `pending`, `skipped`

- スコープ: `web-api`
- タイプ: `array (passed | failed | pending | skipped)`
- デフォルト: `['passed', 'failed', 'pending', 'skipped']`

#### **createScreenshotPayload (`オプション`)**

このオプションは、テストの失敗に対するスクリーンショットのアップロードペイロードをカスタマイズします。

- スコープ: `web-api`
- タイプ: `function`

#### **createResultDetailPayload (`オプション`)**

このオプションは、テストの詳細結果の通知ペイロードをカスタマイズします。

- スコープ: `web-api`
- タイプ: `function`

### 共通

#### **title (`オプション`)**

テストのタイトルを設定します。

- スコープ: `webhook`, `web-api`
- タイプ: `string`

#### **resultsUrl (`オプション`)**

テスト結果へのリンクを提供します。通知内でクリック可能なリンクになります。

- スコープ: `webhook`, `web-api`
- タイプ: `string`

#### **notifyTestStartMessage (`オプション`)**

テスト開始の通知を送信するには、このオプションを true に設定します。

- スコープ: `webhook`, `web-api`
- タイプ: `boolean`
- デフォルト: `true`

#### **notifyFailedCase (`オプション`)**

Slack に報告されるテスト結果に失敗したケースを添付するには、このオプションを true に設定します。

- スコープ: `webhook`, `web-api`
- タイプ: `boolean`
- デフォルト: `true`

#### **notifyTestFinishMessage (`オプション`)**

テスト終了の通知を送信するには、このオプションを true に設定します。

- スコープ: `webhook`, `web-api`
- タイプ: `boolean`
- デフォルト: `true`

#### **useScenarioBasedStateCounts (`オプション`) - Cucumber のみ**

状態カウントをテスト（ステップ）ベースからシナリオベースに変更するには、このオプションを true に設定します。（Cucumber のみ）

- スコープ: `webhook`, `web-api`
- タイプ: `boolean`
- デフォルト: `false`

#### **emojiSymbols (`オプション`)**

このオプションはデフォルトで設定されている絵文字セットを変更します。

- スコープ: `webhook`, `web-api`
- タイプ: `object`
- デフォルト:
  - passed - ✅ `:white_check_mark:`
  - failed - ❌ `:x:`
  - skipped - ⏸ `:double_vertical_bar:`
  - pending - ❔ `:grey_question:`
  - start - 🚀 `:rocket:`
  - finished - 🏁 `:checkered_flag:`
  - watch - ⏱ `:stopwatch:`

#### **createStartPayload (`オプション`)**

このオプションはテスト開始時に通知されるペイロードをカスタマイズします。

- スコープ: `webhook`, `web-api`
- タイプ: `function`

#### **createFailedTestPayload (`オプション`)**

このオプションはテスト失敗時に通知されるペイロードをカスタマイズします。

- スコープ: `webhook`, `web-api`
- タイプ: `function`

#### **createResultPayload (`オプション`)**

このオプションはテスト結果の通知ペイロードをカスタマイズします。

- スコープ: `webhook`, `web-api`
- タイプ: `function`

## Incoming Webhook の使用

webhook を使用している場合、スレッドとアップロードはできません。  
したがって、`upload` と `thread` に関連する機能は利用できません。

### 設定例

```js
// wdio.conf.js
import SlackReporter from "@moroo/wdio-slack-reporter";

export.config = {
  reporters: [
    [
      SlackReporter, {
        // Set the Slack Options used webhook.
        slackOptions: {
          type: 'webhook',
          webhook: process.env.SLACK_WEBHOOK_URL || "https://hooks.slack.com/........",
          username: "WebdriverIO Reporter",
          "icon-url": "https://webdriver.io/img/webdriverio.png",
        },
        // Set the Title of Test.
        title: 'Slack Reporter Test',
        // Set the Test Results URL.
        resultsUrl: process.env.JENKINS_URL,
        // Set the notification of Test Finished
        notifyTestFinishMessage: true,
        // Set the scenario-based state count (Only Cucumber)
        useScenarioBasedStateCounts: true,
        // Customize Slack Emoji Symbols.
        emojiSymbols: {
          passed: ':white_check_mark:',
          failed: ':x:',
          skipped: ':double_vertical_bar:',
          pending: ':grey_question:',
          start: ':rocket:',
          finished: ':checkered_flag:',
          watch: ':stopwatch:'
        },
        // Override the createStartPayload function.
        createStartPayload: function (runnerStats: RunnerStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // do something...
          }
          return payload;
        },
        // Override the createFailedTestPayload function.
        createFailedTestPayload: function (testStats: TestStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // do something...
          }
          return payload;
        },
        // Override the createResultPayload function.
        createResultPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // do something...
          }
          return payload;
        }
      }
    ],
  ],
};
```

## Web API の使用

API を使用するには、以下のようなスコープが必要です。  
[`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write) 詳細は[こちら](https://api.slack.com/legacy/oauth-scopes)をご覧ください。  

### 設定例

```js
// wdio.conf.js
import SlackReporter from "@moroo/wdio-slack-reporter";

export.config = {
  reporters: [
    [
      SlackReporter, {
        // Set the Slack Options used web-api.
        slackOptions: {
          type: 'web-api',
          token: process.env.SLACK_BOT_TOKEN || "xoxb-xxxxxxxxxx-xxxxxx...",,
          channel: process.env.SLACK_CHANNEL || "Cxxxxxxxxxx",
          // Set this option to true to attach a screenshot to the failed case.
          uploadScreenshotOfFailedCase: true,
          // Set this option to true if you want to add thread with details of results to notification of test results posted to Slack.
          notifyDetailResultThread: true,
          // Set the Filter for detail results. (array is empty or undefined, all filters are applied.)
          filterForDetailResults: [
            'passed',
            'failed',
            'pending',
            'skipped'
          ],
          // Override the createScreenshotPayload function.
          createScreenshotPayload: function (testStats: TestStats, screenshotBuffer: string | Buffer<ArrayBufferLike>): FilesUploadArguments {
            const payload: FilesUploadArguments = {
              // do something...
            }
            return payload;
          },
          // Override the createResultDetailPayload function.
          createResultDetailPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): ChatPostMessageArguments {
            const payload: ChatPostMessageArguments = {
              // do something...
            }
            return payload;
          }
        },
        // Set the Title of Test.
        title: 'Slack Reporter Test',
        // Set the Test Results URL.
        resultsUrl: process.env.JENKINS_URL,
        // Set the notification of Test Finished
        notifyTestFinishMessage: true,
        // Set the scenario-based state count (Only Cucumber)
        useScenarioBasedStateCounts: true,
        // Customize Slack Emoji Symbols.
        emojiSymbols: {
          passed: ':white_check_mark:',
          failed: ':x:',
          skipped: ':double_vertical_bar:',
          pending: ':grey_question:',
          start: ':rocket:',
          finished: ':checkered_flag:',
          watch: ':stopwatch:'
        },
        // Override the createStartPayload function.
        createStartPayload: function (runnerStats: RunnerStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // do something...
          }
          return payload;
        },
        // Override the createFailedTestPayload function.
        createFailedTestPayload: function (testStats: TestStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // do something...
          }
          return payload;
        },
        // Override the createResultPayload function.
        createResultPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // do something...
          }
          return payload;
        }
      }
    ],
  ],
};
```

## サポートされるAPI

### getResultsUrl

> **type**: `() => string | undefined`

結果URLを取得します。

```js
// getResultsUrl.spec.ts
import SlackReporter from '@moroo/wdio-slack-reporter';

describe('Get the resultsUrl value', function () {
  before(function () {
    const resultsUrl = SlackReporter.getResultsUrl();
    if (resultsUrl) {
      // do something...
    }
  });
  it('Do something', function () {
    // do something...
  });
});
```

### setResultsUrl

> **type**: `(url: string) => void`

結果URLを設定します。  
_(これはテスト結果のURLが毎回変わる場合に便利です。)_

```js
// setResultsUrl.spec.ts
import SlackReporter from '@moroo/wdio-slack-reporter';
import { RESULTS_URL } from '../constants';

describe('Set the resultsUrl value', function () {
  before(function () {
    const resultsUrl = RESULTS_URL + new Date().toISOString();
    SlackReporter.setResultsUrl(resultsUrl);
  });
  it('Do something', function () {
    // do something...
  });
});
```

### uploadFailedTestScreenshot

> **type**: `(data: string | Buffer<ArrayBufferLike>) => void`

失敗したテスト通知にスレッドとしてスクリーンショットを追加します。  
_**(webhookを使用している場合、これは警告を表示して何もしません。)**_

```bash
// terminal console
WARN @moroo/slack-wdio-reporter: Not using web-api or disabled notifyFailedCase or uploadScreenshotOfFailedCase options.
```

```js
// wdio.conf.js
export.config = {
  afterTest: async function (test, context, result) {
    if (error) {
      const result = await browser.takeScreenshot();
      SlackReporter.uploadFailedTestScreenshot(result);
    }
  }
}
```

### postMessage

> **type**: `(payload: ChatPostMessageArguments) => Promise<WebAPICallResult>`

Slackにメッセージを投稿します。  
_**(webhookを使用している場合、これはエラーをスローします。)**_

```bash
// terminal console
ERROR @moroo/slack-wdio-reporter: Not using web-api.
```

```js
// post.spec.ts
import SlackReporter, {
  ChatPostMessageArguments,
  WebAPICallResult,
} from '@moroo/wdio-slack-reporter';

describe('Post Function Test', function () {
  it('Post a message', async function () {
    const payload: ChatPostMessageArguments = {
      // do something...
    };
    const result: WebAPICallResult = await SlackReporter.post(payload);
  });
});
```

### upload

> **type**: `({ payload: FilesUploadArguments; options: FilesUploadV2Options }) => Promise<WebAPICallResult & {files: FilesCompleteUploadExternalResponse[];}>`

Slackにファイルをアップロードします。  
_**(webhookを使用している場合、これはエラーをスローします。)**_

```bash
// terminal console
ERROR @moroo/slack-wdio-reporter: Not using web-api.
```

```js
// upload.spec.ts
import SlackReporter, {
  FilesUploadArguments,
  WebAPICallResult,
} from '@moroo/wdio-slack-reporter';

describe('Upload Function Test', function () {
  it('Upload a files', async function () {
    const payload: FilesUploadArguments = {
      // do something...
    };
    const options: FilesUploadV2Options = {
      waitForUpload: true,
      retry: 3,
      interval: 1000,
    };
    const result: WebAPICallResult = await SlackReporter.upload({
      payload,
      options,
    });
  });
});
```

### send

> **type**: `(payload: IncomingWebhookSendArguments) => Promise<IncomingWebhookResult>`

Slackにメッセージを送信します。  
_**(web-apiを使用している場合、これはエラーをスローします。)**_

```bash
// terminal console
ERROR @moroo/slack-wdio-reporter: Not using webhook.
```

```js
// send.spec.ts
import SlackReporter, {
  IncomingWebhookSendArguments,
  IncomingWebhookResult,
} from '@moroo/wdio-slack-reporter';

describe('Sand Function Test', function () {
  it('Send a message', async function () {
    const payload: IncomingWebhookSendArguments = {
      // do something...
    };
    const result: IncomingWebhookResult = await SlackReporter.send(payload);
  });
});
```

## スクリーンショットの追加

失敗したテスト通知にスレッドとしてスクリーンショットを追加したい場合は、スクリーンショットを撮った後に `uploadFailedTestScreenshot` 関数を追加します。

```js
// wdio.conf.js
export.config = {
  afterTest: async function (test, context, result) {
    if (error) {
      const result = await browser.takeScreenshot();
      SlackReporter.uploadFailedTestScreenshot(result);
    }
  }
}
```

## 既知の問題

### 同期されていない

次のエラーが発生した場合は、`wdio.conf.js` で `reporterSyncInterval`、`reporterSyncTimeout` を設定してください。

```bash
ERROR @wdio/runner: Error: Some reporters are still unsynced: SlackReporter
```

```js
//wdio.conf.js
export.config = {
  //
  // ログを非同期に報告する場合（たとえば、ログがサードパーティベンダーにストリーミングされる場合）、レポーターが同期されているかどうかをチェックする間隔を決定します。
  reporterSyncInterval: 500,
  // テストランナーがエラーをスローするまでに、レポーターがすべてのログのアップロードを完了するための最大時間を決定します。
  reporterSyncTimeout: 20000,
}
```

### Jasmine オプション - expectationResultHandler

ここに uploadFailedTestScreenshot 関数を追加しても機能しません。  
これは、この関数がすべてのテスト後に動作するため、現在のテストが不明なためです。

```js
// wdio.conf.js
export.config = {
  jasmineOpts: {
    // Jasmine デフォルトタイムアウト
    defaultTimeoutInterval: 60000,
    //
    // Jasmine フレームワークは、結果に応じてアプリケーションの状態をログに記録するために、各アサーションの傍受を許可します
    // または、ウェブサイトの状態。たとえば、アサーションが失敗するたびにスクリーンショットを撮ることは非常に便利です。
    expectationResultHandler: function (passed, assertion) {
      if (passed) {
        return;
      }
      /*
        ここに uploadFailedTestScreenshot 関数を追加しても機能しません。
        これは、この関数がすべてのテスト後に動作するため、現在のテストが不明なためです。

        [x] const result = await browser.takeScreenshot();
        [x] SlackReporter.uploadFailedTestScreenshot(result);
      */
    },
  },

  // ここに追加してください。
  afterTest: async function (test, context, result) {
    if (result.error) {
      const result = await browser.takeScreenshot();
      SlackReporter.uploadFailedTestScreenshot(result);
    }
  }
}
```