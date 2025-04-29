---
id: wdio-slack-reporter
title: ஸ்லாக் ரிப்போர்ட்டர்
custom_edit_url: https://github.com/morooLee/wdio-slack-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-reporter என்பது மூன்றாம் தரப்பு தொகுப்பாகும், மேலும் தகவலுக்கு [GitHub](https://github.com/morooLee/wdio-slack-reporter) | [npm](https://www.npmjs.com/package/@moroo/wdio-slack-reporter) பார்க்கவும்

![version](https://img.shields.io/npm/v/@moroo/wdio-slack-reporter?color=%23CB3837&label=latest)
![downloads](https://img.shields.io/npm/dw/@moroo/wdio-slack-reporter?color=%23CB3837&)
![license](https://img.shields.io/npm/l/@moroo/wdio-slack-reporter)
![webdriverio](https://img.shields.io/static/v1?color=EA5906&label=WebdriverIO&message=>=8.0&logo=webdriverio)

[WebdriverIO](https://webdriver.io/) இலிருந்து [Incoming webhook](https://api.slack.com/incoming-webhooks) மற்றும் [Web API](https://api.slack.com/web) பயன்படுத்தி [Slack](https://slack.com/) க்கு முடிவுகளை அனுப்புவதற்கான ரிப்போர்ட்டர்.

## 📢 முக்கிய அறிவிப்பு

### [files.upload deprecation](https://api.slack.com/changelog/2024-04-a-better-way-to-upload-files-is-here-to-stay) காரணமாக [filesUploadV2](https://tools.slack.dev/node-slack-sdk/web-api/#upload-a-file) க்கு இடம்பெயர்தல்

## ஸ்லாக் அறிவிப்பு ஸ்கிரீன்ஷாட்

<img src="https://raw.githubusercontent.com/morooLee/wdio-slack-reporter/master/docs/Notification.png" width="80%" height="80%" title="Notification Image" alt="Notification"></img>

## WebdriverIO பதிப்பு ஆதரவு கொள்கை

> இந்த திட்டத்தில் ஆதரிக்கப்படும் WebdriverIO பதிப்புகள் WebdriverIO இன் ஆதரவு கொள்கையைப் பின்பற்றுகின்றன.
> WebdriverIO இன் ஆதரவு கொள்கையை [இங்கே](https://webdriver.io/versions) சரிபார்க்கலாம்.

## நிறுவல்

எளிதான வழி `@moroo/wdio-slack-reporter` ஐ உங்கள் `package.json` இல் devDependency ஆக வைத்திருப்பது.

```json
{
  "devDependencies": {
    "@moroo/wdio-slack-reporter": "^9.0.0"
  }
}
```

நீங்கள் இதை எளிதாக செய்யலாம்:

- NPM

```bash
npm install @moroo/wdio-slack-reporter --save-dev
```

- Yarn

```bash
yarn add -D @moroo/wdio-slack-reporter
```

`WebdriverIO` ஐ எவ்வாறு நிறுவுவது என்பதற்கான வழிமுறைகளை [இங்கே](https://webdriver.io/docs/gettingstarted.html) காணலாம்.

## கட்டமைப்பு

ரிப்போர்ட்டரைப் பயன்படுத்த wdio.conf.js இல் உங்கள் ரிப்போர்ட்டர்கள் அரேயில் slack ஐச் சேர்க்க வேண்டும்

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

## கட்டமைப்பு விருப்பங்கள்

பின்வரும் கட்டமைப்பு விருப்பங்கள் ஆதரிக்கப்படுகின்றன.
அறிவிப்புகள் அனுப்பப்பட, நீங்கள் `webhook` அல்லது `web-api` ஐ அமைக்க வேண்டும்.
`web-api` மற்றும் `webhook` இரண்டும் அமைக்கப்பட்டிருந்தால், `web-api` பயன்படுத்தப்படுகிறது.

### Webhook (Incoming Webhook)

#### **webhook (`Required`)**

அறிவிப்புகள் அனுப்பப்பட வேண்டிய ஸ்லாக் சேனலின் [**Incoming Webhook**](https://api.slack.com/incoming-webhooks). URL கட்டமைக்கப்படவில்லை என்றால், அறிவிப்புகள் அனுப்பப்படாது.

- Scope: `webhook`
- Type: `string`

#### **username (`Optional`)**

username இன் மதிப்பு ஸ்லாக் அறிவிப்பில் அதை அனுப்பிய பயனராகத் தோன்றும்.

- Scope: `webhook`
- Type: `string`
- Default: `"WebdriverIO Reporter"`

#### **icon_url (`Optional`)**

ஸ்லாக்கில் காட்டப்படும் ஐகானின் url

- Scope: `webhook`
- Type: `string`
- Default: `"https://webdriver.io/img/webdriverio.png"`

> [!TIP]
> இவற்றைத் தவிர, [Slack Incoming Webhook](https://www.npmjs.com/package/@slack/webhook) விவரக்குறிப்பில் வரையறுக்கப்பட்ட அனைத்து விருப்பங்களையும் பயன்படுத்தலாம்.

### Web API (Slack Bot)

#### **token (`Required`)**

அறிவிப்புகள் அனுப்பப்பட வேண்டிய ஸ்லாக் சேனலின் [**Web API**](https://api.slack.com/web). [A bot user token](https://api.slack.com/legacy/oauth#bots) தேவை. பாட் அணுகல் டோக்கன்கள் எப்போதும் `xoxb` உடன் தொடங்குகின்றன.
பாட் டோக்கனுக்கு [`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write) ஆகிய OAuth எல்லை தேவை.
[கீழே பார்க்கவும்](https://api.slack.com/methods/chat.postMessage#text_usage) மேலும் விவரங்களுக்கு.

- Scope: `web-api`
- Type: `string`

#### **channel (`Required`)**

செய்தி அனுப்புவதற்கான சேனல், தனியார் குழு அல்லது IM சேனல். குறியாக்கப்பட்ட ID அல்லது பெயராக இருக்கலாம். [கீழே பார்க்கவும்](https://api.slack.com/legacy/oauth-scopes) மேலும் விவரங்களுக்கு.
[_`"How to find channel ID" - stackoverflow -`_](https://stackoverflow.com/questions/57139545/how-can-i-see-slack-bot-info-like-user-id-and-bot-id-without-making-api-call)

- Scope: `web-api`
- Type: `string`

> [!TIP]
> இவற்றைத் தவிர, [Slack Web API](https://www.npmjs.com/package/@slack/web-api) விவரக்குறிப்பில் வரையறுக்கப்பட்ட அனைத்து விருப்பங்களையும் பயன்படுத்தலாம்.

#### **uploadScreenshotOfFailedCase (`Optional`)**

தோல்வியுற்ற வழக்கில் ஸ்கிரீன்ஷாட்டை இணைக்க இந்த விருப்பத்தை true என அமைக்கவும்.

- Scope: `web-api`
- Type: `boolean`
- Default: `true`

#### **notifyDetailResultThread (`Optional`)**

> இந்த விருப்பம் notifyTestFinishMessage விருப்பம் true என்றால் மட்டுமே செயல்படும்.

ஸ்லாக்கில் பதிவிடப்பட்ட சோதனை முடிவுகளின் அறிவிப்புக்கு விரிவான முடிவுகளுடன் த்ரெட் சேர்க்க விரும்பினால் இந்த விருப்பத்தை true என அமைக்கவும்.

- Scope: `web-api`
- Type: `boolean`
- Default: `true`

#### **filterForDetailResults (`Optional`)**

> இந்த விருப்பம் notifyDetailResultThread விருப்பம் true என்றால் மட்டுமே செயல்படும்.

நீங்கள் விரும்பும் வடிகட்டியை இந்த விருப்பத்திற்கு array க்கு சேர்க்கவும், விரிவான முடிவுகள் ஸ்லாக்கில் வடிகட்டப்பட்டு த்ரெடுக்கு அனுப்பப்படும்.
_(வடிகட்டிகள் இல்லையென்றால் (array காலியாக உள்ளது அல்லது undefined), அனைத்து வடிகட்டிகளும் பயன்படுத்தப்படுகின்றன.)_
**Filter list**: `passed`, `failed`, `pending`, `skipped`

- Scope: `web-api`
- Type: `array (passed | failed | pending | skipped)`
- Default: `['passed', 'failed', 'pending', 'skipped']`

#### **createScreenshotPayload (`Optional`)**

இந்த விருப்பம் சோதனையின் தோல்விக்கான ஸ்கிரீன்ஷாட்டின் பேலோடை தனிப்பயனாக்குகிறது.

- Scope: `web-api`
- Type: `function`

#### **createResultDetailPayload (`Optional`)**

இந்த விருப்பம் சோதனையின் விரிவான முடிவுகளின் அறிவிப்பு பேலோடை தனிப்பயனாக்குகிறது.

- Scope: `web-api`
- Type: `function`

### Common

#### **title (`Optional`)**

இந்த விருப்பத்தை சோதனை தலைப்பாக அமைக்கவும்.

- Scope: `webhook`, `web-api`
- Type: `string`

#### **resultsUrl (`Optional`)**

சோதனை முடிவுகளுக்கான இணைப்பை வழங்கவும். இது அறிவிப்பில் கிளிக் செய்யக்கூடிய இணைப்பாகும்.

- Scope: `webhook`, `web-api`
- Type: `string`

#### **notifyTestStartMessage (`Optional`)**

சோதனை தொடக்க அறிவிப்புகளை அனுப்ப இந்த விருப்பத்தை true என அமைக்கவும்.

- Scope: `webhook`, `web-api`
- Type: `boolean`
- Default: `true`

#### **notifyFailedCase (`Optional`)**

ஸ்லாக்கில் அறிவிக்கப்படும் சோதனை முடிவுகளில் தோல்வியுற்ற வழக்குகளை இணைக்க இந்த விருப்பத்தை true என அமைக்கவும்.

- Scope: `webhook`, `web-api`
- Type: `boolean`
- Default: `true`

#### **notifyTestFinishMessage (`Optional`)**

சோதனை முடிந்த அறிவிப்புகளை அனுப்ப இந்த விருப்பத்தை true என அமைக்கவும்.

- Scope: `webhook`, `web-api`
- Type: `boolean`
- Default: `true`

#### **useScenarioBasedStateCounts (`Optional`) - Only Cucumber**

இந்த விருப்பத்தை true என அமைத்து நிலை எண்ணிக்கையை சோதனை (படிகள்) அடிப்படையிலிருந்து சூழல் அடிப்படையிலான நிலைக்கு மாற்றவும். (Only Cucumber)

- Scope: `webhook`, `web-api`
- Type: `boolean`
- Default: `false`

#### **emojiSymbols (`Optional`)**

இந்த விருப்பம் இயல்பாக அமைக்கப்பட்ட emoji set ஐ மாற்றுகிறது.

- Scope: `webhook`, `web-api`
- Type: `object`
- Default:
  - passed - ✅ `:white_check_mark:`
  - failed - ❌ `:x:`
  - skipped - ⏸ `:double_vertical_bar:`
  - pending - ❔ `:grey_question:`
  - start - 🚀 `:rocket:`
  - finished - 🏁 `:checkered_flag:`
  - watch - ⏱ `:stopwatch:`

#### **createStartPayload (`Optional`)**

இந்த விருப்பம் சோதனை தொடக்கத்தில் அறிவிக்கப்படும் பேலோடை தனிப்பயனாக்குகிறது.

- Scope: `webhook`, `web-api`
- Type: `function`

#### **createFailedTestPayload (`Optional`)**

இந்த விருப்பம் சோதனை தோல்வியில் அறிவிக்கப்படும் பேலோடை தனிப்பயனாக்குகிறது.

- Scope: `webhook`, `web-api`
- Type: `function`

#### **createResultPayload (`Optional`)**

இந்த விருப்பம் சோதனை முடிவுகளின் அறிவிப்பு பேலோடை தனிப்பயனாக்குகிறது.

- Scope: `webhook`, `web-api`
- Type: `function`

## Incoming Webhook பயன்படுத்துதல்

நீங்கள் webhook ஐப் பயன்படுத்தினால், த்ரெட் மற்றும் பதிவேற்ற முடியாது.
எனவே, `upload` மற்றும் `thread` தொடர்பான செயல்பாடுகள் கிடைக்காது.

### கட்டமைப்பு எடுத்துக்காட்டு

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

## Web API பயன்படுத்துதல்

API ஐப் பயன்படுத்த, கீழே உள்ளதைப் போன்ற scopes தேவைப்படுகிறது.  
[`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write). [கீழே பார்க்கவும்](https://api.slack.com/legacy/oauth-scopes) மேலும் விவரங்களுக்கு. 

### கட்டமைப்பு எடுத்துக்காட்டு

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

## ஆதரிக்கப்படும் API

### getResultsUrl

> **type**: `() => string | undefined`

முடிவுகள் url ஐப் பெறவும்.

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

முடிவுகள் url ஐ அமைக்கவும்.
_(சோதனை முடிவுகளுடன் உள்ள url ஒவ்வொரு முறையும் மாறும் என்றால் இது பயனுள்ளதாக இருக்கும்.)_

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

தோல்வியுற்ற சோதனை அறிவிப்புக்கு த்ரெட் ஆக ஸ்கிரீன்ஷாட்டைச் சேர்க்கவும்.
_**(நீங்கள் webhook ஐப் பயன்படுத்தினால் இது எச்சரிக்கையை அச்சிடும் மற்றும் எதுவும் செய்யாது.)**_

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

ஸ்லாக்கிற்கு செய்தியை அனுப்புக.
_**(நீங்கள் webhook ஐப் பயன்படுத்தினால் இது பிழையை எழுப்பும்.)**_

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

ஸ்லாக்கிற்கு கோப்பைப் பதிவேற்றவும்.
_**(நீங்கள் webhook ஐப் பயன்படுத்தினால் இது பிழையை எழுப்பும்.)**_

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

ஸ்லாக்கிற்கு செய்தியை அனுப்புக.
_**(நீங்கள் web-api ஐப் பயன்படுத்தினால் இது பிழையை எழுப்பும்.)**_

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

## ஸ்கிரீன்ஷாட் சேர்த்தல்

தோல்வியுற்ற சோதனை அறிவிப்புக்கு த்ரெட் ஆக ஸ்கிரீன்ஷாட்டைச் சேர்க்க விரும்பினால், ஸ்கிரீன்ஷாட்டை எடுத்தப் பிறகு `uploadFailedTestScreenshot` செயல்பாட்டைச் சேர்க்கவும்.

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

## அறியப்பட்ட சிக்கல்கள்

### Unsynced

பின்வரும் பிழை ஏற்பட்டால், `wdio.conf.js` இல் `reporterSyncInterval`, `reporterSyncTimeout` ஐ அமைக்கவும்.

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

### Jasmine Option - expectationResultHandler

இங்கே uploadFailedTestScreenshot செயல்பாட்டைச் சேர்ப்பது வேலை செய்யாது.
இது ஏனெனில் செயல்பாடு ஒவ்வொரு சோதனைக்குப் பிறகும் செயல்படுகிறது, எனவே தற்போதைய சோதனை தெரியாது.

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