---
id: wdio-slack-reporter
title: Slack Reporter Reporter
custom_edit_url: https://github.com/morooLee/wdio-slack-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-reporter ist ein Paket von Drittanbietern. Weitere Informationen finden Sie unter [GitHub](https://github.com/morooLee/wdio-slack-reporter) | [npm](https://www.npmjs.com/package/@moroo/wdio-slack-reporter)

![version](https://img.shields.io/npm/v/@moroo/wdio-slack-reporter?color=%23CB3837&label=latest)
![downloads](https://img.shields.io/npm/dw/@moroo/wdio-slack-reporter?color=%23CB3837&)
![license](https://img.shields.io/npm/l/@moroo/wdio-slack-reporter)
![webdriverio](https://img.shields.io/static/v1?color=EA5906&label=WebdriverIO&message=>=8.0&logo=webdriverio)

Reporter von [WebdriverIO](https://webdriver.io/), der [Incoming webhook](https://api.slack.com/incoming-webhooks) und [Web API](https://api.slack.com/web) verwendet, um Ergebnisse an [Slack](https://slack.com/) zu senden.

## 📢 Wichtiger Hinweis

### Migration zu [filesUploadV2](https://tools.slack.dev/node-slack-sdk/web-api/#upload-a-file) aufgrund der [files.upload Einstellung](https://api.slack.com/changelog/2024-04-a-better-way-to-upload-files-is-here-to-stay)

## Slack Benachrichtigungs-Screenshot

<img src="https://raw.githubusercontent.com/morooLee/wdio-slack-reporter/master/docs/Notification.png" width="80%" height="80%" title="Notification Image" alt="Notification"></img>

## WebdriverIO Versionssupport-Richtlinie

> Die in diesem Projekt unterstützten WebdriverIO-Versionen folgen der Support-Richtlinie von WebdriverIO.
> Die Support-Richtlinie von WebdriverIO kann [hier](https://webdriver.io/versions) überprüft werden.

## Installation

Am einfachsten ist es, `@moroo/wdio-slack-reporter` als devDependency in Ihrer `package.json` zu halten.

```json
{
  "devDependencies": {
    "@moroo/wdio-slack-reporter": "^9.0.0"
  }
}
```

Sie können es einfach tun durch:

- NPM

```bash
npm install @moroo/wdio-slack-reporter --save-dev
```

- Yarn

```bash
yarn add -D @moroo/wdio-slack-reporter
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier](https://webdriver.io/docs/gettingstarted.html).

## Konfiguration

Um den Reporter zu verwenden, müssen Sie Slack zu Ihrem reporters-Array in wdio.conf.js hinzufügen

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

## Konfigurationsoptionen

Die folgenden Konfigurationsoptionen werden unterstützt.
Damit Benachrichtigungen gesendet werden können, müssen Sie `webhook` oder `web-api` einrichten.
Wenn sowohl `web-api` als auch `webhook` gesetzt sind, wird `web-api` verwendet.

### Webhook (Incoming Webhook)

#### **webhook (`Erforderlich`)**

[**Incoming Webhook**](https://api.slack.com/incoming-webhooks) des Slack-Kanals, an den Benachrichtigungen gesendet werden sollen. Wenn die URL nicht konfiguriert ist, werden keine Benachrichtigungen gesendet.

- Bereich: `webhook`
- Typ: `string`

#### **username (`Optional`)**

Der Wert von username erscheint in der Slack-Benachrichtigung als Absender.

- Bereich: `webhook`
- Typ: `string`
- Standard: `"WebdriverIO Reporter"`

#### **icon_url (`Optional`)**

Die URL des Icons, das in Slack angezeigt werden soll

- Bereich: `webhook`
- Typ: `string`
- Standard: `"https://webdriver.io/img/webdriverio.png"`

> [!TIP]
> Neben diesen können auch alle in der [Slack Incoming Webhook](https://www.npmjs.com/package/@slack/webhook)-Spezifikation definierten Optionen verwendet werden.

### Web API (Slack Bot)

#### **token (`Erforderlich`)**

[**Web API**](https://api.slack.com/web) des Slack-Kanals, an den Benachrichtigungen gesendet werden sollen. [Ein Bot-Benutzertoken](https://api.slack.com/legacy/oauth#bots) ist erforderlich. Bot-Zugriffstoken beginnen immer mit `xoxb`.
Das Bot-Token erfordert den OAuth-Bereich [`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write).
[Siehe unten](https://api.slack.com/methods/chat.postMessage#text_usage) für weitere Details.

- Bereich: `web-api`
- Typ: `string`

#### **channel (`Erforderlich`)**

Kanal, private Gruppe oder IM-Kanal, an den die Nachricht gesendet werden soll. Kann eine kodierte ID oder ein Name sein. [Siehe unten](https://api.slack.com/legacy/oauth-scopes) für weitere Details.
[_`"Wie man die Kanal-ID findet" - stackoverflow -`_](https://stackoverflow.com/questions/57139545/how-can-i-see-slack-bot-info-like-user-id-and-bot-id-without-making-api-call)

- Bereich: `web-api`
- Typ: `string`

> [!TIP]
> Neben diesen können auch alle in der [Slack Web API](https://www.npmjs.com/package/@slack/web-api)-Spezifikation definierten Optionen verwendet werden.

#### **uploadScreenshotOfFailedCase (`Optional`)**

Setzen Sie diese Option auf true, um dem fehlgeschlagenen Fall einen Screenshot beizufügen.

- Bereich: `web-api`
- Typ: `boolean`
- Standard: `true`

#### **notifyDetailResultThread (`Optional`)**

> Diese Option funktioniert nur, wenn die Option notifyTestFinishMessage auf true gesetzt ist.

Setzen Sie diese Option auf true, wenn Sie der an Slack geposteten Benachrichtigung über Testergebnisse einen Thread mit Detailergebnissen hinzufügen möchten.

- Bereich: `web-api`
- Typ: `boolean`
- Standard: `true`

#### **filterForDetailResults (`Optional`)**

> Diese Option funktioniert nur, wenn die Option notifyDetailResultThread auf true gesetzt ist.

Fügen Sie dieser Option den gewünschten Filter zum Array hinzu, und die detaillierten Ergebnisse werden in Slack gefiltert und an den Thread gesendet.
_(Wenn es keine Filter gibt (Array ist leer oder undefiniert), werden alle Filter angewendet.)_
**Filterliste**: `passed`, `failed`, `pending`, `skipped`

- Bereich: `web-api`
- Typ: `array (passed | failed | pending | skipped)`
- Standard: `['passed', 'failed', 'pending', 'skipped']`

#### **createScreenshotPayload (`Optional`)**

Diese Option passt die Nutzlast an, die beim Hochladen des Screenshots für den fehlgeschlagenen Test verwendet wird.

- Bereich: `web-api`
- Typ: `function`

#### **createResultDetailPayload (`Optional`)**

Diese Option passt die Nutzlast an, die über die detaillierten Ergebnisse des Tests benachrichtigt.

- Bereich: `web-api`
- Typ: `function`

### Gemeinsam

#### **title (`Optional`)**

Stellen Sie diese Option auf den Testtitel ein.

- Bereich: `webhook`, `web-api`
- Typ: `string`

#### **resultsUrl (`Optional`)**

Stellen Sie einen Link zu den Testergebnissen bereit. Es ist ein anklickbarer Link in der Benachrichtigung.

- Bereich: `webhook`, `web-api`
- Typ: `string`

#### **notifyTestStartMessage (`Optional`)**

Setzen Sie diese Option auf true, um Benachrichtigungen über den Teststart zu senden.

- Bereich: `webhook`, `web-api`
- Typ: `boolean`
- Standard: `true`

#### **notifyFailedCase (`Optional`)**

Setzen Sie diese Option auf true, um fehlgeschlagene Fälle in den an Slack gemeldeten Testergebnissen anzuhängen.

- Bereich: `webhook`, `web-api`
- Typ: `boolean`
- Standard: `true`

#### **notifyTestFinishMessage (`Optional`)**

Setzen Sie diese Option auf true, um Benachrichtigungen über den Testabschluss zu senden.

- Bereich: `webhook`, `web-api`
- Typ: `boolean`
- Standard: `true`

#### **useScenarioBasedStateCounts (`Optional`) - Nur Cucumber**

Setzen Sie diese Option auf true, um die Statuszählung von testbasierten (Schritte) auf szenariobasierte zu ändern. (Nur Cucumber)

- Bereich: `webhook`, `web-api`
- Typ: `boolean`
- Standard: `false`

#### **emojiSymbols (`Optional`)**

Diese Option ändert das standardmäßig festgelegte Emoji.

- Bereich: `webhook`, `web-api`
- Typ: `object`
- Standard:
  - passed - ✅ `:white_check_mark:`
  - failed - ❌ `:x:`
  - skipped - ⏸ `:double_vertical_bar:`
  - pending - ❔ `:grey_question:`
  - start - 🚀 `:rocket:`
  - finished - 🏁 `:checkered_flag:`
  - watch - ⏱ `:stopwatch:`

#### **createStartPayload (`Optional`)**

Diese Option passt die Nutzlast an, die zu Beginn des Tests benachrichtigt wird.

- Bereich: `webhook`, `web-api`
- Typ: `function`

#### **createFailedTestPayload (`Optional`)**

Diese Option passt die Nutzlast an, die bei einem fehlgeschlagenen Test benachrichtigt wird.

- Bereich: `webhook`, `web-api`
- Typ: `function`

#### **createResultPayload (`Optional`)**

Diese Option passt die Nutzlast an, die über die Ergebnisse des Tests benachrichtigt.

- Bereich: `webhook`, `web-api`
- Typ: `function`

## Den Incoming Webhook verwenden

Wenn Sie einen Webhook verwenden, können Sie nicht threaden und hochladen.  
Daher sind Funktionen im Zusammenhang mit `upload` und `thread` nicht verfügbar.

### Konfigurationsbeispiel

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

## Die Web API verwenden

Um die API zu verwenden, benötigen Sie Bereiche wie die unten stehenden.  
[`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write). [Siehe unten](https://api.slack.com/legacy/oauth-scopes) für weitere Details.  

### Konfigurationsbeispiel

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

## Unterstützte API

### getResultsUrl

> **type**: `() => string | undefined`

Holt die Ergebnis-URL.

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

Setzt die Ergebnis-URL.  
_(Dies ist nützlich, wenn sich die URL mit den Testergebnissen jedes Mal ändert.)_

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

Fügt der Benachrichtigung über fehlgeschlagene Tests einen Screenshot als Thread hinzu.  
_**(Wenn Sie einen Webhook verwenden, wird eine Warnung ausgegeben und nichts unternommen.)**_

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

Sendet eine Nachricht an Slack.  
_**(Wenn Sie einen Webhook verwenden, wird ein Fehler ausgelöst.)**_

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

Lädt eine Datei in Slack hoch.  
_**(Wenn Sie einen Webhook verwenden, wird ein Fehler ausgelöst.)**_

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

Sendet eine Nachricht an Slack.  
_**(Wenn Sie eine Web-API verwenden, wird ein Fehler ausgelöst.)**_

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

## Screenshot hinzufügen

Wenn Sie der Benachrichtigung über fehlgeschlagene Tests einen Screenshot als Thread hinzufügen möchten, fügen Sie die Funktion `uploadFailedTestScreenshot` nach der Aufnahme des Screenshots hinzu.

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

## Bekannte Probleme

### Nicht synchronisiert

Wenn der folgende Fehler auftritt, setzen Sie `reporterSyncInterval`, `reporterSyncTimeout` in `wdio.conf.js`.

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

Das Hinzufügen der Funktion uploadFailedTestScreenshot hier funktioniert auch nicht.  
Dies liegt daran, dass die Funktion nach jedem Test funktioniert, so dass der aktuelle Test unbekannt ist.

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