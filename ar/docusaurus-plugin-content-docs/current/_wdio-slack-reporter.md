---
id: wdio-slack-reporter
title: مراسل Slack Reporter
custom_edit_url: https://github.com/morooLee/wdio-slack-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-reporter هي حزمة تابعة لجهة خارجية، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/morooLee/wdio-slack-reporter) | [npm](https://www.npmjs.com/package/@moroo/wdio-slack-reporter)

![version](https://img.shields.io/npm/v/@moroo/wdio-slack-reporter?color=%23CB3837&label=latest)
![downloads](https://img.shields.io/npm/dw/@moroo/wdio-slack-reporter?color=%23CB3837&)
![license](https://img.shields.io/npm/l/@moroo/wdio-slack-reporter)
![webdriverio](https://img.shields.io/static/v1?color=EA5906&label=WebdriverIO&message=>=8.0&logo=webdriverio)

مراسل من [WebdriverIO](https://webdriver.io/) باستخدام [Incoming webhook](https://api.slack.com/incoming-webhooks) و [Web API](https://api.slack.com/web) لإرسال النتائج إلى [Slack](https://slack.com/).

## 📢 إشعار هام

### الترحيل إلى [filesUploadV2](https://tools.slack.dev/node-slack-sdk/web-api/#upload-a-file) بسبب [files.upload deprecation](https://api.slack.com/changelog/2024-04-a-better-way-to-upload-files-is-here-to-stay)

## لقطة شاشة إشعار Slack

<img src="https://raw.githubusercontent.com/morooLee/wdio-slack-reporter/master/docs/Notification.png" width="80%" height="80%" title="Notification Image" alt="Notification"></img>

## سياسة دعم إصدار WebdriverIO

> إصدارات WebdriverIO المدعومة في هذا المشروع تتبع سياسة دعم WebdriverIO.
> يمكن التحقق من سياسة دعم WebdriverIO [هنا](https://webdriver.io/versions).

## التثبيت

الطريقة الأسهل هي الاحتفاظ بـ `@moroo/wdio-slack-reporter` كتبعية تطوير في ملف `package.json` الخاص بك.

```json
{
  "devDependencies": {
    "@moroo/wdio-slack-reporter": "^9.0.0"
  }
}
```

يمكنك القيام بذلك ببساطة عن طريق:

- NPM

```bash
npm install @moroo/wdio-slack-reporter --save-dev
```

- Yarn

```bash
yarn add -D @moroo/wdio-slack-reporter
```

يمكن العثور على تعليمات كيفية تثبيت `WebdriverIO` [هنا](https://webdriver.io/docs/gettingstarted.html).

## التكوين

لاستخدام المراسل، تحتاج إلى إضافة slack إلى مصفوفة المراسلين في wdio.conf.js

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

## خيارات التكوين

يتم دعم خيارات التكوين التالية.
لإرسال الإشعارات، يجب عليك تعيين `webhook` أو `web-api`.
إذا تم تعيين كل من `web-api` و `webhook`، يتم استخدام `web-api`.

### Webhook (Incoming Webhook)

#### **webhook (`مطلوب`)**

[**Incoming Webhook**](https://api.slack.com/incoming-webhooks) لقناة slack التي يجب إرسال الإشعارات إليها. إذا لم يتم تكوين عنوان URL، لن يتم إرسال الإشعارات.

- النطاق: `webhook`
- النوع: `string`

#### **username (`اختياري`)**

ستظهر قيمة اسم المستخدم في إشعار slack كمستخدم أرسله.

- النطاق: `webhook`
- النوع: `string`
- الافتراضي: `"WebdriverIO Reporter"`

#### **icon_url (`اختياري`)**

عنوان URL للأيقونة المراد عرضها في slack

- النطاق: `webhook`
- النوع: `string`
- الافتراضي: `"https://webdriver.io/img/webdriverio.png"`

> [!TIP]
> بجانب هذه، يمكن أيضًا استخدام جميع الخيارات المحددة في مواصفات [Slack Incoming Webhook](https://www.npmjs.com/package/@slack/webhook).

### Web API (Slack Bot)

#### **token (`مطلوب`)**

[**Web API**](https://api.slack.com/web) لقناة slack التي يجب إرسال الإشعارات إليها. [رمز مستخدم بوت](https://api.slack.com/legacy/oauth#bots) مطلوب. رموز وصول البوت تبدأ دائمًا بـ `xoxb`.
يتطلب رمز البوت نطاق OAuth [`chat:write`](https://api.slack.com/scopes/chat:write)، [`files:write`](https://api.slack.com/scopes/files:write).
[انظر أدناه](https://api.slack.com/methods/chat.postMessage#text_usage) لمزيد من التفاصيل.

- النطاق: `web-api`
- النوع: `string`

#### **channel (`مطلوب`)**

القناة، المجموعة الخاصة، أو قناة IM لإرسال الرسالة إليها. يمكن أن تكون معرف مشفر، أو اسم. [انظر أدناه](https://api.slack.com/legacy/oauth-scopes) لمزيد من التفاصيل.
[_`"كيفية العثور على معرف القناة" - stackoverflow -`_](https://stackoverflow.com/questions/57139545/how-can-i-see-slack-bot-info-like-user-id-and-bot-id-without-making-api-call)

- النطاق: `web-api`
- النوع: `string`

> [!TIP]
> بجانب هذه، يمكن أيضًا استخدام جميع الخيارات المحددة في مواصفات [Slack Web API](https://www.npmjs.com/package/@slack/web-api).

#### **uploadScreenshotOfFailedCase (`اختياري`)**

قم بتعيين هذا الخيار إلى true لإرفاق لقطة شاشة بالحالة الفاشلة.

- النطاق: `web-api`
- النوع: `boolean`
- الافتراضي: `true`

#### **notifyDetailResultThread (`اختياري`)**

> يعمل هذا الخيار فقط عندما يكون خيار notifyTestFinishMessage صحيحًا.

قم بتعيين هذا الخيار إلى true إذا كنت ترغب في إضافة سلسلة مع تفاصيل النتائج إلى إشعار بنتائج الاختبار المنشورة على Slack.

- النطاق: `web-api`
- النوع: `boolean`
- الافتراضي: `true`

#### **filterForDetailResults (`اختياري`)**

> يعمل هذا الخيار فقط عندما يكون خيار notifyDetailResultThread صحيحًا.

أضف المرشح الذي تريده إلى هذا الخيار في المصفوفة وسيتم تصفية النتائج المفصلة في Slack وإرسالها إلى السلسلة.
_(إذا لم تكن هناك مرشحات (المصفوفة فارغة أو غير محددة)، يتم تطبيق جميع المرشحات.)_
**قائمة المرشحات**: `passed`، `failed`، `pending`، `skipped`

- النطاق: `web-api`
- النوع: `array (passed | failed | pending | skipped)`
- الافتراضي: `['passed', 'failed', 'pending', 'skipped']`

#### **createScreenshotPayload (`اختياري`)**

يخصص هذا الخيار الحمولة التي يتم تحميلها من لقطة الشاشة لفشل الاختبار.

- النطاق: `web-api`
- النوع: `function`

#### **createResultDetailPayload (`اختياري`)**

يخصص هذا الخيار الحمولة التي يتم إشعارها من النتائج المفصلة للاختبار.

- النطاق: `web-api`
- النوع: `function`

### المشترك

#### **title (`اختياري`)**

قم بتعيين هذا الخيار إلى عنوان الاختبار.

- النطاق: `webhook`، `web-api`
- النوع: `string`

#### **resultsUrl (`اختياري`)**

قدم رابطًا لنتائج الاختبار. إنه رابط قابل للنقر في الإشعار.

- النطاق: `webhook`، `web-api`
- النوع: `string`

#### **notifyTestStartMessage (`اختياري`)**

قم بتعيين هذا الخيار إلى true لإرسال إشعارات ببدء الاختبار.

- النطاق: `webhook`، `web-api`
- النوع: `boolean`
- الافتراضي: `true`

#### **notifyFailedCase (`اختياري`)**

قم بتعيين هذا الخيار إلى true لإرفاق الحالات الفاشلة في نتائج الاختبار المبلغ عنها إلى Slack.

- النطاق: `webhook`، `web-api`
- النوع: `boolean`
- الافتراضي: `true`

#### **notifyTestFinishMessage (`اختياري`)**

قم بتعيين هذا الخيار إلى true لإرسال إشعارات بانتهاء الاختبار.

- النطاق: `webhook`، `web-api`
- النوع: `boolean`
- الافتراضي: `true`

#### **useScenarioBasedStateCounts (`اختياري`) - فقط Cucumber**

قم بتعيين هذا الخيار إلى true لتغيير عدد الحالة من اختبار (خطوات) قائم على سيناريو. (فقط Cucumber)

- النطاق: `webhook`، `web-api`
- النوع: `boolean`
- الافتراضي: `false`

#### **emojiSymbols (`اختياري`)**

يغير هذا الخيار مجموعة الرموز التعبيرية الافتراضية.

- النطاق: `webhook`، `web-api`
- النوع: `object`
- الافتراضي:
  - passed - ✅ `:white_check_mark:`
  - failed - ❌ `:x:`
  - skipped - ⏸ `:double_vertical_bar:`
  - pending - ❔ `:grey_question:`
  - start - 🚀 `:rocket:`
  - finished - 🏁 `:checkered_flag:`
  - watch - ⏱ `:stopwatch:`

#### **createStartPayload (`اختياري`)**

يخصص هذا الخيار الحمولة التي يتم إشعارها عند بدء الاختبار.

- النطاق: `webhook`، `web-api`
- النوع: `function`

#### **createFailedTestPayload (`اختياري`)**

يخصص هذا الخيار الحمولة التي يتم إشعارها عند فشل الاختبار.

- النطاق: `webhook`، `web-api`
- النوع: `function`

#### **createResultPayload (`اختياري`)**

يخصص هذا الخيار الحمولة التي يتم إشعارها بنتائج الاختبار.

- النطاق: `webhook`، `web-api`
- النوع: `function`

## استخدام Incoming Webhook

إذا كنت تستخدم webhook، لا يمكن التسلسل والتحميل.  
لذلك، الوظائف المتعلقة بـ `upload` و `thread` غير متاحة.

### مثال التكوين

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

## استخدام Web API

لاستخدام واجهة برمجة التطبيقات، تحتاج إلى نطاقات مثل تلك الموضحة أدناه.  
[`chat:write`](https://api.slack.com/scopes/chat:write)، [`files:write`](https://api.slack.com/scopes/files:write). [انظر أدناه](https://api.slack.com/legacy/oauth-scopes) لمزيد من التفاصيل.  

### مثال التكوين

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

## واجهة برمجة التطبيقات المدعومة

### getResultsUrl

> **النوع**: `() => string | undefined`

احصل على عنوان URL للنتائج.

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

> **النوع**: `(url: string) => void`

اضبط عنوان URL للنتائج.  
_(هذا مفيد إذا كان عنوان URL مع نتائج الاختبار يتغير في كل مرة.)_

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

> **النوع**: `(data: string | Buffer<ArrayBufferLike>) => void`

أضف لقطة شاشة كسلسلة إلى إشعار الاختبار الفاشل.  
_**(إذا كنت تستخدم webhook، فسيؤدي هذا إلى طباعة تحذير ولن يفعل شيئًا.)**_

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

> **النوع**: `(payload: ChatPostMessageArguments) => Promise<WebAPICallResult>`

نشر رسالة إلى Slack.  
_**(إذا كنت تستخدم webhook، فسيؤدي هذا إلى رمي خطأ.)**_

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

> **النوع**: `({ payload: FilesUploadArguments; options: FilesUploadV2Options }) => Promise<WebAPICallResult & {files: FilesCompleteUploadExternalResponse[];}>`

تحميل ملف إلى Slack.  
_**(إذا كنت تستخدم webhook، فسيؤدي هذا إلى رمي خطأ.)**_

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

> **النوع**: `(payload: IncomingWebhookSendArguments) => Promise<IncomingWebhookResult>`

إرسال رسالة إلى Slack.  
_**(إذا كنت تستخدم web-api، فسيؤدي هذا إلى رمي خطأ.)**_

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

## إضافة لقطة الشاشة

إذا كنت ترغب في إضافة لقطة شاشة كسلسلة إلى إشعار الاختبار الفاشل، أضف وظيفة `uploadFailedTestScreenshot` بعد التقاط لقطة الشاشة.

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

## المشكلات المعروفة

### غير متزامن

إذا حدث الخطأ التالي، قم بتعيين `reporterSyncInterval`، `reporterSyncTimeout` في `wdio.conf.js`.

```bash
ERROR @wdio/runner: Error: Some reporters are still unsynced: SlackReporter
```

```js
//wdio.conf.js
export.config = {
  //
  // Determines in which interval the reporter should check if they are synchronized if they report their logs asynchronously (e.g. if logs are streamed to a 3rd party vendor).
  reporterSyncInterval: 500,
  // Determines the maximum time reporters have to finish uploading all their logs until an error is being thrown by the testrunner.
  reporterSyncTimeout: 20000,
}
```

### خيار Jasmine - expectationResultHandler

إضافة وظيفة uploadFailedTestScreenshot هنا لا تعمل أيضًا.  
هذا لأن الوظيفة تعمل بعد كل اختبار، لذا فإن الاختبار الحالي غير معروف.

```js
// wdio.conf.js
export.config = {
  jasmineOpts: {
    // Jasmine default timeout
    defaultTimeoutInterval: 60000,
    //
    // The Jasmine framework allows interception of each assertion in order to log the state of the application
    // or website depending on the result. For example, it is pretty handy to take a screenshot every time
    // an assertion fails.
    expectationResultHandler: function (passed, assertion) {
      if (passed) {
        return;
      }
      /*
        Adding the uploadFailedTestScreenshot function here doesn't work either.
        This is because the function works after every test, so the current test is unknown.

        [x] const result = await browser.takeScreenshot();
        [x] SlackReporter.uploadFailedTestScreenshot(result);
      */
    },
  },

  // Add it here.
  afterTest: async function (test, context, result) {
    if (result.error) {
      const result = await browser.takeScreenshot();
      SlackReporter.uploadFailedTestScreenshot(result);
    }
  }
}
```