---
id: wdio-slack-reporter
title: گزارشگر اسلک
custom_edit_url: https://github.com/morooLee/wdio-slack-reporter/edit/master/README.md
---


> wdio-slack-reporter یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفا به [GitHub](https://github.com/morooLee/wdio-slack-reporter) | [npm](https://www.npmjs.com/package/@moroo/wdio-slack-reporter) مراجعه کنید

![version](https://img.shields.io/npm/v/@moroo/wdio-slack-reporter?color=%23CB3837&label=latest)
![downloads](https://img.shields.io/npm/dw/@moroo/wdio-slack-reporter?color=%23CB3837&)
![license](https://img.shields.io/npm/l/@moroo/wdio-slack-reporter)
![webdriverio](https://img.shields.io/static/v1?color=EA5906&label=WebdriverIO&message=>=8.0&logo=webdriverio)

گزارشگر از [WebdriverIO](https://webdriver.io/) با استفاده از [Incoming webhook](https://api.slack.com/incoming-webhooks) و [Web API](https://api.slack.com/web) برای ارسال نتایج به [Slack](https://slack.com/).

## 📢 اطلاعیه مهم

### مهاجرت به [filesUploadV2](https://tools.slack.dev/node-slack-sdk/web-api/#upload-a-file) به دلیل [منسوخ شدن files.upload](https://api.slack.com/changelog/2024-04-a-better-way-to-upload-files-is-here-to-stay)

## تصویر اعلان اسلک

<img src="https://raw.githubusercontent.com/morooLee/wdio-slack-reporter/master/docs/Notification.png" width="80%" height="80%" title="Notification Image" alt="Notification"></img>

## سیاست پشتیبانی نسخه WebdriverIO

> نسخه‌های WebdriverIO پشتیبانی شده در این پروژه از سیاست پشتیبانی WebdriverIO پیروی می‌کند.
> سیاست پشتیبانی WebdriverIO را می‌توانید [اینجا](https://webdriver.io/versions) بررسی کنید.

## نصب

ساده‌ترین راه این است که `@moroo/wdio-slack-reporter` را به عنوان devDependency در `package.json` خود نگه دارید.

```json
{
  "devDependencies": {
    "@moroo/wdio-slack-reporter": "^9.0.0"
  }
}
```

به سادگی می‌توانید این کار را انجام دهید:

- NPM

```bash
npm install @moroo/wdio-slack-reporter --save-dev
```

- Yarn

```bash
yarn add -D @moroo/wdio-slack-reporter
```

دستورالعمل‌های نحوه نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted.html) پیدا کنید.

## پیکربندی

برای استفاده از گزارشگر، باید اسلک را به آرایه گزارشگرهای خود در wdio.conf.js اضافه کنید

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

## گزینه‌های پیکربندی

گزینه‌های پیکربندی زیر پشتیبانی می‌شوند.
برای ارسال اعلان‌ها، باید `webhook` یا `web-api` را تنظیم کنید.
اگر هر دو `web-api` و `webhook` تنظیم شده باشند، `web-api` استفاده می‌شود.

### Webhook (Incoming Webhook)

#### **webhook (`الزامی`)**

[**Incoming Webhook**](https://api.slack.com/incoming-webhooks) کانال اسلک که اعلان‌ها باید به آن ارسال شوند. اگر URL پیکربندی نشده باشد، اعلان‌ها ارسال نخواهند شد.

- دامنه: `webhook`
- نوع: `string`

#### **username (`اختیاری`)**

مقدار نام کاربری در اعلان اسلک به عنوان کاربری که آن را ارسال کرده است، نمایش داده می‌شود.

- دامنه: `webhook`
- نوع: `string`
- پیش‌فرض: `"WebdriverIO Reporter"`

#### **icon_url (`اختیاری`)**

آدرس آیکونی که باید در اسلک نمایش داده شود

- دامنه: `webhook`
- نوع: `string`
- پیش‌فرض: `"https://webdriver.io/img/webdriverio.png"`

> [!TIP]
> علاوه بر اینها، تمام گزینه‌های تعریف شده در مشخصات [Slack Incoming Webhook](https://www.npmjs.com/package/@slack/webhook) نیز می‌توانند استفاده شوند.

### Web API (Slack Bot)

#### **token (`الزامی`)**

[**Web API**](https://api.slack.com/web) کانال اسلک که اعلان‌ها باید به آن ارسال شوند. [توکن کاربر بات](https://api.slack.com/legacy/oauth#bots) مورد نیاز است. توکن‌های دسترسی بات همیشه با `xoxb` شروع می‌شوند.
توکن بات به دامنه OAuth از [`chat:write`](https://api.slack.com/scopes/chat:write)، [`files:write`](https://api.slack.com/scopes/files:write) نیاز دارد.
[برای جزئیات بیشتر به اینجا مراجعه کنید](https://api.slack.com/methods/chat.postMessage#text_usage).

- دامنه: `web-api`
- نوع: `string`

#### **channel (`الزامی`)**

کانال، گروه خصوصی یا کانال IM برای ارسال پیام. می‌تواند یک ID کدگذاری شده یا یک نام باشد. [برای جزئیات بیشتر به اینجا مراجعه کنید](https://api.slack.com/legacy/oauth-scopes).
[_`"چگونه ID کانال را پیدا کنیم" - stackoverflow -`_](https://stackoverflow.com/questions/57139545/how-can-i-see-slack-bot-info-like-user-id-and-bot-id-without-making-api-call)

- دامنه: `web-api`
- نوع: `string`

> [!TIP]
> علاوه بر اینها، تمام گزینه‌های تعریف شده در مشخصات [Slack Web API](https://www.npmjs.com/package/@slack/web-api) نیز می‌توانند استفاده شوند.

#### **uploadScreenshotOfFailedCase (`اختیاری`)**

این گزینه را روی true تنظیم کنید تا یک اسکرین‌شات به موارد شکست خورده پیوست شود.

- دامنه: `web-api`
- نوع: `boolean`
- پیش‌فرض: `true`

#### **notifyDetailResultThread (`اختیاری`)**

> این گزینه فقط زمانی کار می‌کند که گزینه notifyTestFinishMessage روی true تنظیم شده باشد.

این گزینه را روی true تنظیم کنید اگر می‌خواهید یک رشته با جزئیات نتایج به اعلان نتایج آزمون ارسال شده به اسلک اضافه کنید.

- دامنه: `web-api`
- نوع: `boolean`
- پیش‌فرض: `true`

#### **filterForDetailResults (`اختیاری`)**

> این گزینه فقط زمانی کار می‌کند که گزینه notifyDetailResultThread روی true تنظیم شده باشد.

فیلتر مورد نظر خود را به این گزینه به آرایه اضافه کنید و نتایج جزئی در اسلک فیلتر شده و به رشته ارسال می‌شوند.
_(اگر فیلتری وجود نداشته باشد (آرایه خالی یا تعریف نشده)، همه فیلترها اعمال می‌شوند.)_
**لیست فیلتر**: `passed`، `failed`، `pending`، `skipped`

- دامنه: `web-api`
- نوع: `array (passed | failed | pending | skipped)`
- پیش‌فرض: `['passed', 'failed', 'pending', 'skipped']`

#### **createScreenshotPayload (`اختیاری`)**

این گزینه محتوای ارسالی اسکرین‌شات برای شکست آزمون را سفارشی می‌کند.

- دامنه: `web-api`
- نوع: `function`

#### **createResultDetailPayload (`اختیاری`)**

این گزینه محتوای اعلان جزئیات نتایج آزمون را سفارشی می‌کند.

- دامنه: `web-api`
- نوع: `function`

### مشترک

#### **title (`اختیاری`)**

این گزینه را به عنوان عنوان آزمون تنظیم کنید.

- دامنه: `webhook`, `web-api`
- نوع: `string`

#### **resultsUrl (`اختیاری`)**

یک لینک به نتایج آزمون فراهم کنید. این یک لینک قابل کلیک در اعلان است.

- دامنه: `webhook`, `web-api`
- نوع: `string`

#### **notifyTestStartMessage (`اختیاری`)**

این گزینه را روی true تنظیم کنید تا اعلان‌های شروع آزمون ارسال شوند.

- دامنه: `webhook`, `web-api`
- نوع: `boolean`
- پیش‌فرض: `true`

#### **notifyFailedCase (`اختیاری`)**

این گزینه را روی true تنظیم کنید تا موارد شکست خورده در نتایج آزمون گزارش شده به اسلک پیوست شوند.

- دامنه: `webhook`, `web-api`
- نوع: `boolean`
- پیش‌فرض: `true`

#### **notifyTestFinishMessage (`اختیاری`)**

این گزینه را روی true تنظیم کنید تا اعلان‌های پایان آزمون ارسال شوند.

- دامنه: `webhook`, `web-api`
- نوع: `boolean`
- پیش‌فرض: `true`

#### **useScenarioBasedStateCounts (`اختیاری`) - فقط Cucumber**

این گزینه را روی true تنظیم کنید تا شمارش وضعیت از آزمون (مراحل) پایه به سناریو محور تغییر کند. (فقط Cucumber)

- دامنه: `webhook`, `web-api`
- نوع: `boolean`
- پیش‌فرض: `false`

#### **emojiSymbols (`اختیاری`)**

این گزینه مجموعه ایموجی تنظیم شده به صورت پیش‌فرض را تغییر می‌دهد.

- دامنه: `webhook`, `web-api`
- نوع: `object`
- پیش‌فرض:
  - passed - ✅ `:white_check_mark:`
  - failed - ❌ `:x:`
  - skipped - ⏸ `:double_vertical_bar:`
  - pending - ❔ `:grey_question:`
  - start - 🚀 `:rocket:`
  - finished - 🏁 `:checkered_flag:`
  - watch - ⏱ `:stopwatch:`

#### **createStartPayload (`اختیاری`)**

این گزینه محتوای اعلان در شروع آزمون را سفارشی می‌کند.

- دامنه: `webhook`, `web-api`
- نوع: `function`

#### **createFailedTestPayload (`اختیاری`)**

این گزینه محتوای اعلان در شکست آزمون را سفارشی می‌کند.

- دامنه: `webhook`, `web-api`
- نوع: `function`

#### **createResultPayload (`اختیاری`)**

این گزینه محتوای اعلان نتایج آزمون را سفارشی می‌کند.

- دامنه: `webhook`, `web-api`
- نوع: `function`

## استفاده از Incoming Webhook

اگر از webhook استفاده می‌کنید، نمی‌توانید از قابلیت‌های thread و upload استفاده کنید.  
بنابراین، توابع مرتبط با `upload` و `thread` در دسترس نیستند.

### مثال پیکربندی

```js
// wdio.conf.js
import SlackReporter from "@moroo/wdio-slack-reporter";

export.config = {
  reporters: [
    [
      SlackReporter, {
        // تنظیم گزینه‌های اسلک با استفاده از webhook.
        slackOptions: {
          type: 'webhook',
          webhook: process.env.SLACK_WEBHOOK_URL || "https://hooks.slack.com/........",
          username: "WebdriverIO Reporter",
          "icon-url": "https://webdriver.io/img/webdriverio.png",
        },
        // تنظیم عنوان آزمون.
        title: 'Slack Reporter Test',
        // تنظیم URL نتایج آزمون.
        resultsUrl: process.env.JENKINS_URL,
        // تنظیم اعلان پایان آزمون
        notifyTestFinishMessage: true,
        // تنظیم شمارش وضعیت بر اساس سناریو (فقط Cucumber)
        useScenarioBasedStateCounts: true,
        // سفارشی کردن نمادهای ایموجی اسلک.
        emojiSymbols: {
          passed: ':white_check_mark:',
          failed: ':x:',
          skipped: ':double_vertical_bar:',
          pending: ':grey_question:',
          start: ':rocket:',
          finished: ':checkered_flag:',
          watch: ':stopwatch:'
        },
        // بازنویسی تابع createStartPayload.
        createStartPayload: function (runnerStats: RunnerStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // انجام کاری...
          }
          return payload;
        },
        // بازنویسی تابع createFailedTestPayload.
        createFailedTestPayload: function (testStats: TestStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // انجام کاری...
          }
          return payload;
        },
        // بازنویسی تابع createResultPayload.
        createResultPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // انجام کاری...
          }
          return payload;
        }
      }
    ],
  ],
};
```

## استفاده از Web API

برای استفاده از API، به دامنه‌هایی مانند موارد زیر نیاز دارید.  
[`chat:write`](https://api.slack.com/scopes/chat:write)، [`files:write`](https://api.slack.com/scopes/files:write). [برای جزئیات بیشتر به اینجا مراجعه کنید](https://api.slack.com/legacy/oauth-scopes).  

### مثال پیکربندی

```js
// wdio.conf.js
import SlackReporter from "@moroo/wdio-slack-reporter";

export.config = {
  reporters: [
    [
      SlackReporter, {
        // تنظیم گزینه‌های اسلک با استفاده از web-api.
        slackOptions: {
          type: 'web-api',
          token: process.env.SLACK_BOT_TOKEN || "xoxb-xxxxxxxxxx-xxxxxx...",,
          channel: process.env.SLACK_CHANNEL || "Cxxxxxxxxxx",
          // این گزینه را روی true تنظیم کنید تا یک اسکرین‌شات به موارد شکست خورده پیوست شود.
          uploadScreenshotOfFailedCase: true,
          // این گزینه را روی true تنظیم کنید اگر می‌خواهید یک رشته با جزئیات نتایج به اعلان نتایج آزمون ارسال شده به اسلک اضافه کنید.
          notifyDetailResultThread: true,
          // تنظیم فیلتر برای نتایج جزئی. (اگر آرایه خالی یا تعریف نشده باشد، همه فیلترها اعمال می‌شوند.)
          filterForDetailResults: [
            'passed',
            'failed',
            'pending',
            'skipped'
          ],
          // بازنویسی تابع createScreenshotPayload.
          createScreenshotPayload: function (testStats: TestStats, screenshotBuffer: string | Buffer<ArrayBufferLike>): FilesUploadArguments {
            const payload: FilesUploadArguments = {
              // انجام کاری...
            }
            return payload;
          },
          // بازنویسی تابع createResultDetailPayload.
          createResultDetailPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): ChatPostMessageArguments {
            const payload: ChatPostMessageArguments = {
              // انجام کاری...
            }
            return payload;
          }
        },
        // تنظیم عنوان آزمون.
        title: 'Slack Reporter Test',
        // تنظیم URL نتایج آزمون.
        resultsUrl: process.env.JENKINS_URL,
        // تنظیم اعلان پایان آزمون
        notifyTestFinishMessage: true,
        // تنظیم شمارش وضعیت بر اساس سناریو (فقط Cucumber)
        useScenarioBasedStateCounts: true,
        // سفارشی کردن نمادهای ایموجی اسلک.
        emojiSymbols: {
          passed: ':white_check_mark:',
          failed: ':x:',
          skipped: ':double_vertical_bar:',
          pending: ':grey_question:',
          start: ':rocket:',
          finished: ':checkered_flag:',
          watch: ':stopwatch:'
        },
        // بازنویسی تابع createStartPayload.
        createStartPayload: function (runnerStats: RunnerStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // انجام کاری...
          }
          return payload;
        },
        // بازنویسی تابع createFailedTestPayload.
        createFailedTestPayload: function (testStats: TestStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // انجام کاری...
          }
          return payload;
        },
        // بازنویسی تابع createResultPayload.
        createResultPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // انجام کاری...
          }
          return payload;
        }
      }
    ],
  ],
};
```

## API های پشتیبانی شده

### getResultsUrl

> **نوع**: `() => string | undefined`

دریافت URL نتایج.

```js
// getResultsUrl.spec.ts
import SlackReporter from '@moroo/wdio-slack-reporter';

describe('Get the resultsUrl value', function () {
  before(function () {
    const resultsUrl = SlackReporter.getResultsUrl();
    if (resultsUrl) {
      // انجام کاری...
    }
  });
  it('Do something', function () {
    // انجام کاری...
  });
});
```

### setResultsUrl

> **نوع**: `(url: string) => void`

تنظیم URL نتایج.  
_(این برای زمانی مفید است که URL با نتایج آزمون هر بار تغییر می‌کند.)_

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
    // انجام کاری...
  });
});
```

### uploadFailedTestScreenshot

> **نوع**: `(data: string | Buffer<ArrayBufferLike>) => void`

اضافه کردن یک اسکرین‌شات به عنوان یک رشته به اعلان آزمون شکست خورده.  
_**(اگر از webhook استفاده می‌کنید، این یک هشدار چاپ می‌کند و کاری انجام نمی‌دهد.)**_

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

> **نوع**: `(payload: ChatPostMessageArguments) => Promise<WebAPICallResult>`

ارسال یک پیام به اسلک.  
_**(اگر از webhook استفاده می‌کنید، این یک خطا ایجاد می‌کند.)**_

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
      // انجام کاری...
    };
    const result: WebAPICallResult = await SlackReporter.post(payload);
  });
});
```

### upload

> **نوع**: `({ payload: FilesUploadArguments; options: FilesUploadV2Options }) => Promise<WebAPICallResult & {files: FilesCompleteUploadExternalResponse[];}>`

آپلود یک فایل به اسلک.  
_**(اگر از webhook استفاده می‌کنید، این یک خطا ایجاد می‌کند.)**_

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
      // انجام کاری...
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

> **نوع**: `(payload: IncomingWebhookSendArguments) => Promise<IncomingWebhookResult>`

ارسال یک پیام به اسلک.  
_**(اگر از web-api استفاده می‌کنید، این یک خطا ایجاد می‌کند.)**_

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
      // انجام کاری...
    };
    const result: IncomingWebhookResult = await SlackReporter.send(payload);
  });
});
```

## افزودن اسکرین‌شات

اگر می‌خواهید یک اسکرین‌شات را به عنوان یک رشته به اعلان آزمون شکست خورده اضافه کنید، تابع `uploadFailedTestScreenshot` را پس از گرفتن اسکرین‌شات اضافه کنید.

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

## مشکلات شناخته شده

### ناهمگام

اگر خطای زیر رخ می‌دهد، `reporterSyncInterval`، `reporterSyncTimeout` را در `wdio.conf.js` تنظیم کنید.

```bash
ERROR @wdio/runner: Error: Some reporters are still unsynced: SlackReporter
```

```js
//wdio.conf.js
export.config = {
  //
  // تعیین می‌کند که در چه فاصله زمانی گزارشگر باید بررسی کند که آیا آنها همگام هستند اگر گزارش‌های خود را به صورت ناهمگام گزارش می‌دهند (مثلاً اگر گزارش‌ها به یک فروشنده شخص ثالث ارسال می‌شوند).
  reporterSyncInterval: 500,
  // تعیین می‌کند که گزارشگرها حداکثر چه زمانی برای اتمام آپلود تمام گزارش‌های خود دارند تا خطایی توسط آزمایشگر ایجاد شود.
  reporterSyncTimeout: 20000,
}
```

### گزینه جاسمین - expectationResultHandler

افزودن تابع uploadFailedTestScreenshot در اینجا نیز کار نمی‌کند.  
این به این دلیل است که تابع پس از هر آزمون کار می‌کند، بنابراین آزمون فعلی ناشناخته است.

```js
// wdio.conf.js
export.config = {
  jasmineOpts: {
    // مهلت پیش‌فرض جاسمین
    defaultTimeoutInterval: 60000,
    //
    // چارچوب جاسمین اجازه می‌دهد هر تاییدیه را برای ثبت وضعیت برنامه
    // یا وب‌سایت بسته به نتیجه رهگیری کنید. برای مثال، گرفتن اسکرین‌شات هر بار
    // که یک تاییدیه شکست می‌خورد بسیار مفید است.
    expectationResultHandler: function (passed, assertion) {
      if (passed) {
        return;
      }
      /*
        افزودن تابع uploadFailedTestScreenshot در اینجا نیز کار نمی‌کند.
        این به این دلیل است که تابع پس از هر آزمون کار می‌کند، بنابراین آزمون فعلی ناشناخته است.

        [x] const result = await browser.takeScreenshot();
        [x] SlackReporter.uploadFailedTestScreenshot(result);
      */
    },
  },

  // آن را اینجا اضافه کنید.
  afterTest: async function (test, context, result) {
    if (result.error) {
      const result = await browser.takeScreenshot();
      SlackReporter.uploadFailedTestScreenshot(result);
    }
  }
}
```