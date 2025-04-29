---
id: wdio-slack-reporter
title: स्लैक रिपोर्टर
custom_edit_url: https://github.com/morooLee/wdio-slack-reporter/edit/master/README.md
---


> wdio-slack-reporter एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/morooLee/wdio-slack-reporter) | [npm](https://www.npmjs.com/package/@moroo/wdio-slack-reporter)

![version](https://img.shields.io/npm/v/@moroo/wdio-slack-reporter?color=%23CB3837&label=latest)
![downloads](https://img.shields.io/npm/dw/@moroo/wdio-slack-reporter?color=%23CB3837&)
![license](https://img.shields.io/npm/l/@moroo/wdio-slack-reporter)
![webdriverio](https://img.shields.io/static/v1?color=EA5906&label=WebdriverIO&message=>=8.0&logo=webdriverio)

[WebdriverIO](https://webdriver.io/) से [Incoming webhook](https://api.slack.com/incoming-webhooks) और [Web API](https://api.slack.com/web) का उपयोग करके [Slack](https://slack.com/) को परिणाम भेजने के लिए रिपोर्टर।

## 📢 महत्वपूर्ण सूचना

### [files.upload डेप्रिकेशन](https://api.slack.com/changelog/2024-04-a-better-way-to-upload-files-is-here-to-stay) के कारण [filesUploadV2](https://tools.slack.dev/node-slack-sdk/web-api/#upload-a-file) में माइग्रेशन

## स्लैक नोटिफिकेशन स्क्रीनशॉट

<img src="https://raw.githubusercontent.com/morooLee/wdio-slack-reporter/master/docs/Notification.png" width="80%" height="80%" title="Notification Image" alt="Notification"></img>

## WebdriverIO संस्करण समर्थन नीति

> इस प्रोजेक्ट में समर्थित WebdriverIO संस्करण WebdriverIO की समर्थन नीति का पालन करते हैं।
> WebdriverIO की समर्थन नीति [यहां](https://webdriver.io/versions) देखी जा सकती है।

## इंस्टॉलेशन

सबसे आसान तरीका है अपने `package.json` में `@moroo/wdio-slack-reporter` को devDependency के रूप में रखना।

```json
{
  "devDependencies": {
    "@moroo/wdio-slack-reporter": "^9.0.0"
  }
}
```

आप इसे सरलता से इस प्रकार कर सकते हैं:

- NPM

```bash
npm install @moroo/wdio-slack-reporter --save-dev
```

- Yarn

```bash
yarn add -D @moroo/wdio-slack-reporter
```

`WebdriverIO` को कैसे इंस्टॉल करें, इसके निर्देश [यहां](https://webdriver.io/docs/gettingstarted.html) पाए जा सकते हैं।

## कॉन्फिगरेशन

रिपोर्टर का उपयोग करने के लिए आपको wdio.conf.js में अपने reporters array में slack को जोड़ने की आवश्यकता है

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

## कॉन्फिगरेशन विकल्प

निम्नलिखित कॉन्फिगरेशन विकल्प समर्थित हैं।
नोटिफिकेशन भेजने के लिए, आपको `webhook` या `web-api` सेट करना होगा।
यदि `web-api` और `webhook` दोनों सेट हैं, तो `web-api` का उपयोग किया जाता है।

### Webhook (Incoming Webhook)

#### **webhook (`आवश्यक`)**

स्लैक चैनल का [**Incoming Webhook**](https://api.slack.com/incoming-webhooks) जिसमें नोटिफिकेशन भेजा जाना चाहिए। यदि URL कॉन्फिगर नहीं है, तो नोटिफिकेशन नहीं भेजे जाएंगे।

- स्कोप: `webhook`
- प्रकार: `string`

#### **username (`वैकल्पिक`)**

username का मान स्लैक नोटिफिकेशन में उस उपयोगकर्ता के रूप में दिखाई देगा जिसने इसे भेजा है।

- स्कोप: `webhook`
- प्रकार: `string`
- डिफ़ॉल्ट: `"WebdriverIO Reporter"`

#### **icon_url (`वैकल्पिक`)**

स्लैक में प्रदर्शित होने वाले आइकन का URL

- स्कोप: `webhook`
- प्रकार: `string`
- डिफ़ॉल्ट: `"https://webdriver.io/img/webdriverio.png"`

> [!TIP]
> इनके अलावा, [Slack Incoming Webhook](https://www.npmjs.com/package/@slack/webhook) स्पेसिफिकेशन में परिभाषित सभी विकल्पों का भी उपयोग किया जा सकता है।

### Web API (Slack Bot)

#### **token (`आवश्यक`)**

स्लैक चैनल का [**Web API**](https://api.slack.com/web) जिसमें नोटिफिकेशन भेजा जाना चाहिए। [A bot user token](https://api.slack.com/legacy/oauth#bots) आवश्यक है। बॉट एक्सेस टोकन हमेशा `xoxb` से शुरू होते हैं।
बॉट टोकन को [`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write) OAuth स्कोप की आवश्यकता होती है।
[अधिक विवरण](https://api.slack.com/methods/chat.postMessage#text_usage) के लिए देखें।

- स्कोप: `web-api`
- प्रकार: `string`

#### **channel (`आवश्यक`)**

चैनल, प्राइवेट ग्रुप, या IM चैनल जिसमें मैसेज भेजना है। एनकोडेड ID या नाम हो सकता है। [अधिक विवरण](https://api.slack.com/legacy/oauth-scopes) के लिए देखें।
[_`"How to find channel ID" - stackoverflow -`_](https://stackoverflow.com/questions/57139545/how-can-i-see-slack-bot-info-like-user-id-and-bot-id-without-making-api-call)

- स्कोप: `web-api`
- प्रकार: `string`

> [!TIP]
> इनके अलावा, [Slack Web API](https://www.npmjs.com/package/@slack/web-api) स्पेसिफिकेशन में परिभाषित सभी विकल्पों का भी उपयोग किया जा सकता है।

#### **uploadScreenshotOfFailedCase (`वैकल्पिक`)**

विफल केस के लिए स्क्रीनशॉट अटैच करने के लिए इस विकल्प को true पर सेट करें।

- स्कोप: `web-api`
- प्रकार: `boolean`
- डिफ़ॉल्ट: `true`

#### **notifyDetailResultThread (`वैकल्पिक`)**

> यह विकल्प केवल तभी काम करता है जब notifyTestFinishMessage विकल्प true है।

स्लैक पर पोस्ट किए गए टेस्ट परिणामों की नोटिफिकेशन के लिए परिणामों के विवरण के साथ थ्रेड जोड़ना चाहते हैं तो इस विकल्प को true पर सेट करें।

- स्कोप: `web-api`
- प्रकार: `boolean`
- डिफ़ॉल्ट: `true`

#### **filterForDetailResults (`वैकल्पिक`)**

> यह विकल्प केवल तभी काम करता है जब notifyDetailResultThread विकल्प true है।

इस विकल्प में अपना वांछित फ़िल्टर array में जोड़ें और विस्तृत परिणाम स्लैक में फ़िल्टर किए जाएंगे और थ्रेड में भेजे जाएंगे।
_(यदि कोई फ़िल्टर नहीं है (array खाली या अपरिभाषित है), तो सभी फ़िल्टर लागू होते हैं।)_
**फ़िल्टर सूची**: `passed`, `failed`, `pending`, `skipped`

- स्कोप: `web-api`
- प्रकार: `array (passed | failed | pending | skipped)`
- डिफ़ॉल्ट: `['passed', 'failed', 'pending', 'skipped']`

#### **createScreenshotPayload (`वैकल्पिक`)**

यह विकल्प टेस्ट की विफलता के लिए अपलोड किए गए स्क्रीनशॉट के पेलोड को कस्टमाइज़ करता है।

- स्कोप: `web-api`
- प्रकार: `function`

#### **createResultDetailPayload (`वैकल्पिक`)**

यह विकल्प टेस्ट के विस्तृत परिणामों की सूचना देने वाले पेलोड को कस्टमाइज़ करता है।

- स्कोप: `web-api`
- प्रकार: `function`

### सामान्य

#### **title (`वैकल्पिक`)**

इस विकल्प को टेस्ट शीर्षक पर सेट करें।

- स्कोप: `webhook`, `web-api`
- प्रकार: `string`

#### **resultsUrl (`वैकल्पिक`)**

टेस्ट परिणामों के लिए एक लिंक प्रदान करें। यह नोटिफिकेशन में क्लिक करने योग्य लिंक है।

- स्कोप: `webhook`, `web-api`
- प्रकार: `string`

#### **notifyTestStartMessage (`वैकल्पिक`)**

टेस्ट शुरू होने पर नोटिफिकेशन भेजने के लिए इस विकल्प को true पर सेट करें।

- स्कोप: `webhook`, `web-api`
- प्रकार: `boolean`
- डिफ़ॉल्ट: `true`

#### **notifyFailedCase (`वैकल्पिक`)**

स्लैक को रिपोर्ट किए गए टेस्ट परिणामों में विफल केस जोड़ने के लिए इस विकल्प को true पर सेट करें।

- स्कोप: `webhook`, `web-api`
- प्रकार: `boolean`
- डिफ़ॉल्ट: `true`

#### **notifyTestFinishMessage (`वैकल्पिक`)**

टेस्ट पूरा होने पर नोटिफिकेशन भेजने के लिए इस विकल्प को true पर सेट करें।

- स्कोप: `webhook`, `web-api`
- प्रकार: `boolean`
- डिफ़ॉल्ट: `true`

#### **useScenarioBasedStateCounts (`वैकल्पिक`) - केवल Cucumber**

स्टेट काउंट को टेस्ट (स्टेप्स) आधारित से सिनारियो-आधारित में बदलने के लिए इस विकल्प को true पर सेट करें। (केवल Cucumber)

- स्कोप: `webhook`, `web-api`
- प्रकार: `boolean`
- डिफ़ॉल्ट: `false`

#### **emojiSymbols (`वैकल्पिक`)**

यह विकल्प डिफ़ॉल्ट रूप से सेट किए गए इमोजी को बदलता है।

- स्कोप: `webhook`, `web-api`
- प्रकार: `object`
- डिफ़ॉल्ट:
  - passed - ✅ `:white_check_mark:`
  - failed - ❌ `:x:`
  - skipped - ⏸ `:double_vertical_bar:`
  - pending - ❔ `:grey_question:`
  - start - 🚀 `:rocket:`
  - finished - 🏁 `:checkered_flag:`
  - watch - ⏱ `:stopwatch:`

#### **createStartPayload (`वैकल्पिक`)**

यह विकल्प टेस्ट के शुरू होने पर सूचित किए जाने वाले पेलोड को कस्टमाइज़ करता है।

- स्कोप: `webhook`, `web-api`
- प्रकार: `function`

#### **createFailedTestPayload (`वैकल्पिक`)**

यह विकल्प टेस्ट की विफलता पर सूचित किए जाने वाले पेलोड को कस्टमाइज़ करता है।

- स्कोप: `webhook`, `web-api`
- प्रकार: `function`

#### **createResultPayload (`वैकल्पिक`)**

यह विकल्प टेस्ट के परिणामों की सूचना देने वाले पेलोड को कस्टमाइज़ करता है।

- स्कोप: `webhook`, `web-api`
- प्रकार: `function`

## Incoming Webhook का उपयोग

यदि आप webhook का उपयोग कर रहे हैं, तो थ्रेड और अपलोड नहीं कर सकते हैं।  
इसलिए, `upload` और `thread` से संबंधित फ़ंक्शन उपलब्ध नहीं हैं।

### कॉन्फिगरेशन उदाहरण

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

## Web API का उपयोग

API का उपयोग करने के लिए, आपको नीचे दिए गए जैसे स्कोप की आवश्यकता होती है।  
[`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write). [अधिक विवरण के लिए देखें](https://api.slack.com/legacy/oauth-scopes)।  

### कॉन्फिगरेशन उदाहरण

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

## समर्थित API

### getResultsUrl

> **प्रकार**: `() => string | undefined`

परिणाम URL प्राप्त करें।

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

> **प्रकार**: `(url: string) => void`

परिणाम URL सेट करें।  
_(यह उपयोगी है अगर टेस्ट परिणामों वाला URL हर बार बदलता है।)_

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

> **प्रकार**: `(data: string | Buffer<ArrayBufferLike>) => void`

विफल परीक्षण सूचना में थ्रेड के रूप में स्क्रीनशॉट जोड़ें।  
_**(यदि आप webhook का उपयोग कर रहे हैं तो यह एक चेतावनी प्रिंट करेगा और कुछ नहीं करेगा।)**_

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

> **प्रकार**: `(payload: ChatPostMessageArguments) => Promise<WebAPICallResult>`

स्लैक में मैसेज पोस्ट करें।  
_**(यदि आप webhook का उपयोग कर रहे हैं तो यह एक त्रुटि फेंकेगा।)**_

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

> **प्रकार**: `({ payload: FilesUploadArguments; options: FilesUploadV2Options }) => Promise<WebAPICallResult & {files: FilesCompleteUploadExternalResponse[];}>`

स्लैक में फाइल अपलोड करें।  
_**(यदि आप webhook का उपयोग कर रहे हैं तो यह एक त्रुटि फेंकेगा।)**_

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

> **प्रकार**: `(payload: IncomingWebhookSendArguments) => Promise<IncomingWebhookResult>`

स्लैक को मैसेज भेजें।  
_**(यदि आप web-api का उपयोग कर रहे हैं तो यह एक त्रुटि फेंकेगा।)**_

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

## स्क्रीनशॉट जोड़ना

यदि आप विफल टेस्ट नोटिफिकेशन में थ्रेड के रूप में एक स्क्रीनशॉट जोड़ना चाहते हैं, तो स्क्रीनशॉट लेने के बाद `uploadFailedTestScreenshot` फ़ंक्शन जोड़ें।

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

## ज्ञात समस्याएँ

### असिंक्रोनाइज्ड

यदि निम्नलिखित त्रुटि होती है, तो `wdio.conf.js` में `reporterSyncInterval`, `reporterSyncTimeout` सेट करें।

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

### Jasmine विकल्प - expectationResultHandler

यहां uploadFailedTestScreenshot फ़ंक्शन जोड़ना भी काम नहीं करता है।  
ऐसा इसलिए है क्योंकि फ़ंक्शन हर परीक्षण के बाद काम करता है, इसलिए वर्तमान परीक्षण अज्ञात है।

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