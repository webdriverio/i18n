---
id: wdio-slack-reporter
title: Slack 报告器
custom_edit_url: https://github.com/morooLee/wdio-slack-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-reporter 是一个第三方包，更多信息请查看 [GitHub](https://github.com/morooLee/wdio-slack-reporter) | [npm](https://www.npmjs.com/package/@moroo/wdio-slack-reporter)

![version](https://img.shields.io/npm/v/@moroo/wdio-slack-reporter?color=%23CB3837&label=latest)
![downloads](https://img.shields.io/npm/dw/@moroo/wdio-slack-reporter?color=%23CB3837&)
![license](https://img.shields.io/npm/l/@moroo/wdio-slack-reporter)
![webdriverio](https://img.shields.io/static/v1?color=EA5906&label=WebdriverIO&message=>=8.0&logo=webdriverio)

使用 [Incoming webhook](https://api.slack.com/incoming-webhooks) 和 [Web API](https://api.slack.com/web) 从 [WebdriverIO](https://webdriver.io/) 发送结果到 [Slack](https://slack.com/) 的报告器。

## 📢 重要通知

### 由于 [files.upload 弃用](https://api.slack.com/changelog/2024-04-a-better-way-to-upload-files-is-here-to-stay)，迁移到 [filesUploadV2](https://tools.slack.dev/node-slack-sdk/web-api/#upload-a-file)

## Slack 通知截图

<img src="https://raw.githubusercontent.com/morooLee/wdio-slack-reporter/master/docs/Notification.png" width="80%" height="80%" title="Notification Image" alt="Notification"></img>

## WebdriverIO 版本支持政策

> 本项目支持的 WebdriverIO 版本遵循 WebdriverIO 的支持政策。
> WebdriverIO 的支持政策可以在[这里](https://webdriver.io/versions)查看。

## 安装

保持 `@moroo/wdio-slack-reporter` 作为 `package.json` 中的 devDependency 是最简单的方法。

```json
{
  "devDependencies": {
    "@moroo/wdio-slack-reporter": "^9.0.0"
  }
}
```

你可以通过以下方式简单地完成：

- NPM

```bash
npm install @moroo/wdio-slack-reporter --save-dev
```

- Yarn

```bash
yarn add -D @moroo/wdio-slack-reporter
```

关于如何安装 `WebdriverIO` 的说明可以在[这里](https://webdriver.io/docs/gettingstarted.html)找到。

## 配置

为了使用这个报告器，你需要在 wdio.conf.js 中将 slack 添加到你的 reporters 数组中

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

## 配置选项

支持以下配置选项。
要发送通知，你必须设置 `webhook` 或 `web-api`。
如果同时设置了 `web-api` 和 `webhook`，将使用 `web-api`。

### Webhook (Incoming Webhook)

#### **webhook (`必需`)**

应该发送通知的 Slack 频道的 [**Incoming Webhook**](https://api.slack.com/incoming-webhooks)。如果未配置 URL，将不会发送通知。

- 范围: `webhook`
- 类型: `string`

#### **username (`可选`)**

username 的值将在 slack 通知中显示为发送者的用户。

- 范围: `webhook`
- 类型: `string`
- 默认值: `"WebdriverIO Reporter"`

#### **icon_url (`可选`)**

在 slack 中显示的图标的 url

- 范围: `webhook`
- 类型: `string`
- 默认值: `"https://webdriver.io/img/webdriverio.png"`

> [!TIP]
> 除了这些外，[Slack Incoming Webhook](https://www.npmjs.com/package/@slack/webhook) 规范中定义的所有选项也可以使用。

### Web API (Slack Bot)

#### **token (`必需`)**

应该发送通知的 Slack 频道的 [**Web API**](https://api.slack.com/web)。需要[机器人用户令牌](https://api.slack.com/legacy/oauth#bots)。机器人访问令牌总是以 `xoxb` 开头。
机器人令牌需要 [`chat:write`](https://api.slack.com/scopes/chat:write) 和 [`files:write`](https://api.slack.com/scopes/files:write) 的 OAuth 作用域。
[查看下方](https://api.slack.com/methods/chat.postMessage#text_usage)获取更多详情。

- 范围: `web-api`
- 类型: `string`

#### **channel (`必需`)**

要发送消息的频道、私人组或 IM 频道。可以是编码的 ID 或名称。[查看下方](https://api.slack.com/legacy/oauth-scopes)获取更多详情。
[_`"如何查找频道 ID" - stackoverflow -`_](https://stackoverflow.com/questions/57139545/how-can-i-see-slack-bot-info-like-user-id-and-bot-id-without-making-api-call)

- 范围: `web-api`
- 类型: `string`

> [!TIP]
> 除了这些外，[Slack Web API](https://www.npmjs.com/package/@slack/web-api) 规范中定义的所有选项也可以使用。

#### **uploadScreenshotOfFailedCase (`可选`)**

将此选项设置为 true 可以为失败的案例附加截图。

- 范围: `web-api`
- 类型: `boolean`
- 默认值: `true`

#### **notifyDetailResultThread (`可选`)**

> 此选项仅在 notifyTestFinishMessage 选项为 true 时有效。

如果你想在发布到 Slack 的测试结果通知中添加包含详细结果的线程，请将此选项设置为 true。

- 范围: `web-api`
- 类型: `boolean`
- 默认值: `true`

#### **filterForDetailResults (`可选`)**

> 此选项仅在 notifyDetailResultThread 选项为 true 时有效。

将你想要的过滤器添加到此选项的数组中，详细结果将在 Slack 中被过滤并发送到线程中。
_(如果没有过滤器(数组为空或未定义)，则应用所有过滤器。)_
**过滤器列表**: `passed`, `failed`, `pending`, `skipped`

- 范围: `web-api`
- 类型: `array (passed | failed | pending | skipped)`
- 默认值: `['passed', 'failed', 'pending', 'skipped']`

#### **createScreenshotPayload (`可选`)**

此选项自定义上传测试失败截图的负载。

- 范围: `web-api`
- 类型: `function`

#### **createResultDetailPayload (`可选`)**

此选项自定义通知测试详细结果的负载。

- 范围: `web-api`
- 类型: `function`

### 通用

#### **title (`可选`)**

将此选项设置为测试标题。

- 范围: `webhook`, `web-api`
- 类型: `string`

#### **resultsUrl (`可选`)**

提供测试结果的链接。这是通知中的可点击链接。

- 范围: `webhook`, `web-api`
- 类型: `string`

#### **notifyTestStartMessage (`可选`)**

将此选项设置为 true 可发送测试开始通知。

- 范围: `webhook`, `web-api`
- 类型: `boolean`
- 默认值: `true`

#### **notifyFailedCase (`可选`)**

将此选项设置为 true 可以在上报给 Slack 的测试结果中附加失败的案例。

- 范围: `webhook`, `web-api`
- 类型: `boolean`
- 默认值: `true`

#### **notifyTestFinishMessage (`可选`)**

将此选项设置为 true 可发送测试完成通知。

- 范围: `webhook`, `web-api`
- 类型: `boolean`
- 默认值: `true`

#### **useScenarioBasedStateCounts (`可选`) - 仅限 Cucumber**

将此选项设置为 true 可将状态计数从基于测试(步骤)更改为基于场景。(仅限 Cucumber)

- 范围: `webhook`, `web-api`
- 类型: `boolean`
- 默认值: `false`

#### **emojiSymbols (`可选`)**

此选项更改默认设置的表情符号。

- 范围: `webhook`, `web-api`
- 类型: `object`
- 默认值:
  - passed - ✅ `:white_check_mark:`
  - failed - ❌ `:x:`
  - skipped - ⏸ `:double_vertical_bar:`
  - pending - ❔ `:grey_question:`
  - start - 🚀 `:rocket:`
  - finished - 🏁 `:checkered_flag:`
  - watch - ⏱ `:stopwatch:`

#### **createStartPayload (`可选`)**

此选项自定义在测试开始时通知的负载。

- 范围: `webhook`, `web-api`
- 类型: `function`

#### **createFailedTestPayload (`可选`)**

此选项自定义在测试失败时通知的负载。

- 范围: `webhook`, `web-api`
- 类型: `function`

#### **createResultPayload (`可选`)**

此选项自定义通知测试结果的负载。

- 范围: `webhook`, `web-api`
- 类型: `function`

## 使用 Incoming Webhook

如果你使用的是 webhook，则不能使用线程和上传功能。  
因此，与 `upload` 和 `thread` 相关的功能不可用。

### 配置示例

```js
// wdio.conf.js
import SlackReporter from "@moroo/wdio-slack-reporter";

export.config = {
  reporters: [
    [
      SlackReporter, {
        // 设置使用 webhook 的 Slack 选项。
        slackOptions: {
          type: 'webhook',
          webhook: process.env.SLACK_WEBHOOK_URL || "https://hooks.slack.com/........",
          username: "WebdriverIO Reporter",
          "icon-url": "https://webdriver.io/img/webdriverio.png",
        },
        // 设置测试标题。
        title: 'Slack Reporter Test',
        // 设置测试结果 URL。
        resultsUrl: process.env.JENKINS_URL,
        // 设置测试完成通知
        notifyTestFinishMessage: true,
        // 设置基于场景的状态计数 (仅限 Cucumber)
        useScenarioBasedStateCounts: true,
        // 自定义 Slack 表情符号。
        emojiSymbols: {
          passed: ':white_check_mark:',
          failed: ':x:',
          skipped: ':double_vertical_bar:',
          pending: ':grey_question:',
          start: ':rocket:',
          finished: ':checkered_flag:',
          watch: ':stopwatch:'
        },
        // 覆盖 createStartPayload 函数。
        createStartPayload: function (runnerStats: RunnerStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // 做些事情...
          }
          return payload;
        },
        // 覆盖 createFailedTestPayload 函数。
        createFailedTestPayload: function (testStats: TestStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // 做些事情...
          }
          return payload;
        },
        // 覆盖 createResultPayload 函数。
        createResultPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // 做些事情...
          }
          return payload;
        }
      }
    ],
  ],
};
```

## 使用 Web API

要使用 API，你需要像下面这样的作用域。  
[`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write)。[查看下方](https://api.slack.com/legacy/oauth-scopes)获取更多详情。  

### 配置示例

```js
// wdio.conf.js
import SlackReporter from "@moroo/wdio-slack-reporter";

export.config = {
  reporters: [
    [
      SlackReporter, {
        // 设置使用 web-api 的 Slack 选项。
        slackOptions: {
          type: 'web-api',
          token: process.env.SLACK_BOT_TOKEN || "xoxb-xxxxxxxxxx-xxxxxx...",,
          channel: process.env.SLACK_CHANNEL || "Cxxxxxxxxxx",
          // 将此选项设置为 true 可以为失败的案例附加截图。
          uploadScreenshotOfFailedCase: true,
          // 如果你想在发布到 Slack 的测试结果通知中添加包含详细结果的线程，请将此选项设置为 true。
          notifyDetailResultThread: true,
          // 设置详细结果的过滤器。(数组为空或未定义，则应用所有过滤器。)
          filterForDetailResults: [
            'passed',
            'failed',
            'pending',
            'skipped'
          ],
          // 覆盖 createScreenshotPayload 函数。
          createScreenshotPayload: function (testStats: TestStats, screenshotBuffer: string | Buffer<ArrayBufferLike>): FilesUploadArguments {
            const payload: FilesUploadArguments = {
              // 做些事情...
            }
            return payload;
          },
          // 覆盖 createResultDetailPayload 函数。
          createResultDetailPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): ChatPostMessageArguments {
            const payload: ChatPostMessageArguments = {
              // 做些事情...
            }
            return payload;
          }
        },
        // 设置测试标题。
        title: 'Slack Reporter Test',
        // 设置测试结果 URL。
        resultsUrl: process.env.JENKINS_URL,
        // 设置测试完成通知
        notifyTestFinishMessage: true,
        // 设置基于场景的状态计数 (仅限 Cucumber)
        useScenarioBasedStateCounts: true,
        // 自定义 Slack 表情符号。
        emojiSymbols: {
          passed: ':white_check_mark:',
          failed: ':x:',
          skipped: ':double_vertical_bar:',
          pending: ':grey_question:',
          start: ':rocket:',
          finished: ':checkered_flag:',
          watch: ':stopwatch:'
        },
        // 覆盖 createStartPayload 函数。
        createStartPayload: function (runnerStats: RunnerStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // 做些事情...
          }
          return payload;
        },
        // 覆盖 createFailedTestPayload 函数。
        createFailedTestPayload: function (testStats: TestStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // 做些事情...
          }
          return payload;
        },
        // 覆盖 createResultPayload 函数。
        createResultPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // 做些事情...
          }
          return payload;
        }
      }
    ],
  ],
};
```

## 支持的 API

### getResultsUrl

> **类型**: `() => string | undefined`

获取结果 URL。

```js
// getResultsUrl.spec.ts
import SlackReporter from '@moroo/wdio-slack-reporter';

describe('获取 resultsUrl 值', function () {
  before(function () {
    const resultsUrl = SlackReporter.getResultsUrl();
    if (resultsUrl) {
      // 做些事情...
    }
  });
  it('做些事情', function () {
    // 做些事情...
  });
});
```

### setResultsUrl

> **类型**: `(url: string) => void`

设置结果 URL。  
_(如果每次测试结果的 URL 都会改变，这很有用。)_

```js
// setResultsUrl.spec.ts
import SlackReporter from '@moroo/wdio-slack-reporter';
import { RESULTS_URL } from '../constants';

describe('设置 resultsUrl 值', function () {
  before(function () {
    const resultsUrl = RESULTS_URL + new Date().toISOString();
    SlackReporter.setResultsUrl(resultsUrl);
  });
  it('做些事情', function () {
    // 做些事情...
  });
});
```

### uploadFailedTestScreenshot

> **类型**: `(data: string | Buffer<ArrayBufferLike>) => void`

将截图作为线程添加到失败测试通知中。  
_**(如果你使用的是 webhook，这将打印警告并且不执行任何操作。)**_

```bash
// 终端控制台
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

> **类型**: `(payload: ChatPostMessageArguments) => Promise<WebAPICallResult>`

向 Slack 发布消息。  
_**(如果你使用的是 webhook，这将抛出错误。)**_

```bash
// 终端控制台
ERROR @moroo/slack-wdio-reporter: Not using web-api.
```

```js
// post.spec.ts
import SlackReporter, {
  ChatPostMessageArguments,
  WebAPICallResult,
} from '@moroo/wdio-slack-reporter';

describe('发布函数测试', function () {
  it('发布消息', async function () {
    const payload: ChatPostMessageArguments = {
      // 做些事情...
    };
    const result: WebAPICallResult = await SlackReporter.post(payload);
  });
});
```

### upload

> **类型**: `({ payload: FilesUploadArguments; options: FilesUploadV2Options }) => Promise<WebAPICallResult & {files: FilesCompleteUploadExternalResponse[];}>`

向 Slack 上传文件。  
_**(如果你使用的是 webhook，这将抛出错误。)**_

```bash
// 终端控制台
ERROR @moroo/slack-wdio-reporter: Not using web-api.
```

```js
// upload.spec.ts
import SlackReporter, {
  FilesUploadArguments,
  WebAPICallResult,
} from '@moroo/wdio-slack-reporter';

describe('上传函数测试', function () {
  it('上传文件', async function () {
    const payload: FilesUploadArguments = {
      // 做些事情...
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

> **类型**: `(payload: IncomingWebhookSendArguments) => Promise<IncomingWebhookResult>`

向 Slack 发送消息。  
_**(如果你使用的是 web-api，这将抛出错误。)**_

```bash
// 终端控制台
ERROR @moroo/slack-wdio-reporter: Not using webhook.
```

```js
// send.spec.ts
import SlackReporter, {
  IncomingWebhookSendArguments,
  IncomingWebhookResult,
} from '@moroo/wdio-slack-reporter';

describe('发送函数测试', function () {
  it('发送消息', async function () {
    const payload: IncomingWebhookSendArguments = {
      // 做些事情...
    };
    const result: IncomingWebhookResult = await SlackReporter.send(payload);
  });
});
```

## 添加截图

如果你想将截图作为线程添加到失败测试通知中，在截图后添加 `uploadFailedTestScreenshot` 函数。

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

## 已知问题

### 未同步

如果出现以下错误，请在 `wdio.conf.js` 中设置 `reporterSyncInterval`、`reporterSyncTimeout`。

```bash
ERROR @wdio/runner: Error: Some reporters are still unsynced: SlackReporter
```

```js
//wdio.conf.js
export.config = {
  //
  // 确定报告器应在何种间隔检查它们是否同步，如果它们异步报告其日志(例如，如果日志被流式传输到第三方供应商)。
  reporterSyncInterval: 500,
  // 确定报告器完成上传所有日志的最长时间，直到测试运行器抛出错误。
  reporterSyncTimeout: 20000,
}
```

### Jasmine 选项 - expectationResultHandler

在这里添加 uploadFailedTestScreenshot 函数也不起作用。  
这是因为该函数在每次测试后工作，所以当前测试是未知的。

```js
// wdio.conf.js
export.config = {
  jasmineOpts: {
    // Jasmine 默认超时
    defaultTimeoutInterval: 60000,
    //
    // Jasmine 框架允许拦截每个断言，以便根据结果记录应用程序或网站的状态。
    // 例如，每次断言失败时截屏非常方便。
    expectationResultHandler: function (passed, assertion) {
      if (passed) {
        return;
      }
      /*
        在这里添加 uploadFailedTestScreenshot 函数也不起作用。
        这是因为该函数在每次测试后工作，所以当前测试是未知的。

        [x] const result = await browser.takeScreenshot();
        [x] SlackReporter.uploadFailedTestScreenshot(result);
      */
    },
  },

  // 在这里添加。
  afterTest: async function (test, context, result) {
    if (result.error) {
      const result = await browser.takeScreenshot();
      SlackReporter.uploadFailedTestScreenshot(result);
    }
  }
}
```