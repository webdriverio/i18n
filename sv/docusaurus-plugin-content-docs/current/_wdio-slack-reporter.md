---
id: wdio-slack-reporter
title: Slack Reporter Rapportör
custom_edit_url: https://github.com/morooLee/wdio-slack-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-reporter är ett tredjepartspaket, för mer information se [GitHub](https://github.com/morooLee/wdio-slack-reporter) | [npm](https://www.npmjs.com/package/@moroo/wdio-slack-reporter)

![version](https://img.shields.io/npm/v/@moroo/wdio-slack-reporter?color=%23CB3837&label=latest)
![downloads](https://img.shields.io/npm/dw/@moroo/wdio-slack-reporter?color=%23CB3837&)
![license](https://img.shields.io/npm/l/@moroo/wdio-slack-reporter)
![webdriverio](https://img.shields.io/static/v1?color=EA5906&label=WebdriverIO&message=>=8.0&logo=webdriverio)

Rapportör från [WebdriverIO](https://webdriver.io/) som använder [Incoming webhook](https://api.slack.com/incoming-webhooks) och [Web API](https://api.slack.com/web) för att skicka resultat till [Slack](https://slack.com/).

## 📢 Viktigt meddelande

### Migrering till [filesUploadV2](https://tools.slack.dev/node-slack-sdk/web-api/#upload-a-file) på grund av [files.upload-utfasning](https://api.slack.com/changelog/2024-04-a-better-way-to-upload-files-is-here-to-stay)

## Slack notifikation skärmbild

<img src="https://raw.githubusercontent.com/morooLee/wdio-slack-reporter/master/docs/Notification.png" width="80%" height="80%" title="Notification Image" alt="Notification"></img>

## WebdriverIO versionsstödpolicy

> De WebdriverIO-versioner som stöds i detta projekt följer WebdriverIOs stödpolicy.
> WebdriverIOs stödpolicy kan kontrolleras [här](https://webdriver.io/versions).

## Installation

Det enklaste sättet är att behålla `@moroo/wdio-slack-reporter` som en devDependency i din `package.json`.

```json
{
  "devDependencies": {
    "@moroo/wdio-slack-reporter": "^9.0.0"
  }
}
```

Du kan enkelt göra det genom:

- NPM

```bash
npm install @moroo/wdio-slack-reporter --save-dev
```

- Yarn

```bash
yarn add -D @moroo/wdio-slack-reporter
```

Instruktioner om hur man installerar `WebdriverIO` finns [här](https://webdriver.io/docs/gettingstarted.html).

## Konfiguration

För att använda rapportören behöver du lägga till slack i din reporters array i wdio.conf.js

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

## Konfigurationsalternativ

Följande konfigurationsalternativ stöds.
För att notifikationer ska skickas måste du ställa in `webhook` eller `web-api`.
Om både `web-api` och `webhook` är inställda används `web-api`.

### Webhook (Incoming Webhook)

#### **webhook (`Obligatorisk`)**

[**Incoming Webhook**](https://api.slack.com/incoming-webhooks) för Slack-kanalen till vilken notifikationer ska skickas. Om URL:en inte är konfigurerad kommer inga notifikationer att skickas.

- Omfattning: `webhook`
- Typ: `string`

#### **username (`Valfri`)**

Värdet på username kommer att visas i slack-notifikationen som den användare som skickade den.

- Omfattning: `webhook`
- Typ: `string`
- Standard: `"WebdriverIO Reporter"`

#### **icon_url (`Valfri`)**

URL:en för ikonen som ska visas i slack

- Omfattning: `webhook`
- Typ: `string`
- Standard: `"https://webdriver.io/img/webdriverio.png"`

> [!TIP]
> Förutom dessa kan alla alternativ som definieras i [Slack Incoming Webhook](https://www.npmjs.com/package/@slack/webhook)-specifikationen också användas.

### Web API (Slack Bot)

#### **token (`Obligatorisk`)**

[**Web API**](https://api.slack.com/web) för Slack-kanalen till vilken notifikationer ska skickas. [En bot-användartoken](https://api.slack.com/legacy/oauth#bots) krävs. Bot-åtkomsttokens börjar alltid med `xoxb`.
Bot-token kräver OAuth-omfattning av [`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write).
[Se nedan](https://api.slack.com/methods/chat.postMessage#text_usage) för mer detaljer.

- Omfattning: `web-api`
- Typ: `string`

#### **channel (`Obligatorisk`)**

Kanal, privat grupp eller IM-kanal att skicka meddelande till. Kan vara ett kodat ID eller ett namn. [Se nedan](https://api.slack.com/legacy/oauth-scopes) för mer detaljer.
[_`"Hur man hittar kanal-ID" - stackoverflow -`_](https://stackoverflow.com/questions/57139545/how-can-i-see-slack-bot-info-like-user-id-and-bot-id-without-making-api-call)

- Omfattning: `web-api`
- Typ: `string`

> [!TIP]
> Förutom dessa kan alla alternativ som definieras i [Slack Web API](https://www.npmjs.com/package/@slack/web-api)-specifikationen också användas.

#### **uploadScreenshotOfFailedCase (`Valfri`)**

Ställ in detta alternativ till true för att bifoga en skärmbild till det misslyckade fallet.

- Omfattning: `web-api`
- Typ: `boolean`
- Standard: `true`

#### **notifyDetailResultThread (`Valfri`)**

> Detta alternativ fungerar endast när alternativet notifyTestFinishMessage är true.

Ställ in detta alternativ till true om du vill lägga till tråd med detaljer om resultat till notifikation av testresultat som skickas till Slack.

- Omfattning: `web-api`
- Typ: `boolean`
- Standard: `true`

#### **filterForDetailResults (`Valfri`)**

> Detta alternativ fungerar endast när alternativet notifyDetailResultThread är true.

Lägg till filtret du vill ha till det här alternativet i arrayen och de detaljerade resultaten kommer att filtreras ut i Slack och skickas till tråden.
_(Om det inte finns några filter (arrayen är tom eller odefinierad) tillämpas alla filter.)_
**Filterlista**: `passed`, `failed`, `pending`, `skipped`

- Omfattning: `web-api`
- Typ: `array (passed | failed | pending | skipped)`
- Standard: `['passed', 'failed', 'pending', 'skipped']`

#### **createScreenshotPayload (`Valfri`)**

Detta alternativ anpassar nyttolasten som laddas upp av skärmbilden för testmisslyckandet.

- Omfattning: `web-api`
- Typ: `function`

#### **createResultDetailPayload (`Valfri`)**

Detta alternativ anpassar nyttolasten som notifierar om de detaljerade resultaten av testet.

- Omfattning: `web-api`
- Typ: `function`

### Gemensamt

#### **title (`Valfri`)**

Ställ in detta alternativ till testtiteln.

- Omfattning: `webhook`, `web-api`
- Typ: `string`

#### **resultsUrl (`Valfri`)**

Tillhandahåll en länk till testresultaten. Det är en klickbar länk i notifikationen.

- Omfattning: `webhook`, `web-api`
- Typ: `string`

#### **notifyTestStartMessage (`Valfri`)**

Ställ in detta alternativ till true för att skicka notifikationer vid teststart.

- Omfattning: `webhook`, `web-api`
- Typ: `boolean`
- Standard: `true`

#### **notifyFailedCase (`Valfri`)**

Ställ in detta alternativ till true för att bifoga misslyckade fall i testresultaten som rapporteras till Slack.

- Omfattning: `webhook`, `web-api`
- Typ: `boolean`
- Standard: `true`

#### **notifyTestFinishMessage (`Valfri`)**

Ställ in detta alternativ till true för att skicka notifikationer när testet är avslutat.

- Omfattning: `webhook`, `web-api`
- Typ: `boolean`
- Standard: `true`

#### **useScenarioBasedStateCounts (`Valfri`) - Endast Cucumber**

Ställ in detta alternativ till true för att ändra tillståndsräkningen från test (steg) baserad till scenariobaserad. (Endast Cucumber)

- Omfattning: `webhook`, `web-api`
- Typ: `boolean`
- Standard: `false`

#### **emojiSymbols (`Valfri`)**

Detta alternativ ändrar emoji-uppsättningen som är standard.

- Omfattning: `webhook`, `web-api`
- Typ: `object`
- Standard:
  - passed - ✅ `:white_check_mark:`
  - failed - ❌ `:x:`
  - skipped - ⏸ `:double_vertical_bar:`
  - pending - ❔ `:grey_question:`
  - start - 🚀 `:rocket:`
  - finished - 🏁 `:checkered_flag:`
  - watch - ⏱ `:stopwatch:`

#### **createStartPayload (`Valfri`)**

Detta alternativ anpassar nyttolasten som notifieras vid testets start.

- Omfattning: `webhook`, `web-api`
- Typ: `function`

#### **createFailedTestPayload (`Valfri`)**

Detta alternativ anpassar nyttolasten som notifieras vid testets misslyckande.

- Omfattning: `webhook`, `web-api`
- Typ: `function`

#### **createResultPayload (`Valfri`)**

Detta alternativ anpassar nyttolasten som notifierar om testets resultat.

- Omfattning: `webhook`, `web-api`
- Typ: `function`

## Använd Incoming Webhook

Om du använder webhook kan du inte ha trådar och uppladdningar.  
Därför är funktioner relaterade till `upload` och `thread` inte tillgängliga.

### Konfigurationsexempel

```js
// wdio.conf.js
import SlackReporter from "@moroo/wdio-slack-reporter";

export.config = {
  reporters: [
    [
      SlackReporter, {
        // Ställ in Slack Options som används webhook.
        slackOptions: {
          type: 'webhook',
          webhook: process.env.SLACK_WEBHOOK_URL || "https://hooks.slack.com/........",
          username: "WebdriverIO Reporter",
          "icon-url": "https://webdriver.io/img/webdriverio.png",
        },
        // Ställ in titeln för testet.
        title: 'Slack Reporter Test',
        // Ställ in URL för testresultaten.
        resultsUrl: process.env.JENKINS_URL,
        // Ställ in notifikation för testslut
        notifyTestFinishMessage: true,
        // Ställ in scenariobaserad tillståndsräkning (endast Cucumber)
        useScenarioBasedStateCounts: true,
        // Anpassa Slack Emoji-symboler.
        emojiSymbols: {
          passed: ':white_check_mark:',
          failed: ':x:',
          skipped: ':double_vertical_bar:',
          pending: ':grey_question:',
          start: ':rocket:',
          finished: ':checkered_flag:',
          watch: ':stopwatch:'
        },
        // Åsidosätt createStartPayload-funktionen.
        createStartPayload: function (runnerStats: RunnerStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // gör något...
          }
          return payload;
        },
        // Åsidosätt createFailedTestPayload-funktionen.
        createFailedTestPayload: function (testStats: TestStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // gör något...
          }
          return payload;
        },
        // Åsidosätt createResultPayload-funktionen.
        createResultPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // gör något...
          }
          return payload;
        }
      }
    ],
  ],
};
```

## Använd Web API

För att använda API:et behöver du omfattningar som den nedan.  
[`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write). [Se nedan](https://api.slack.com/legacy/oauth-scopes) för mer detaljer.  

### Konfigurationsexempel

```js
// wdio.conf.js
import SlackReporter from "@moroo/wdio-slack-reporter";

export.config = {
  reporters: [
    [
      SlackReporter, {
        // Ställ in Slack Options som används web-api.
        slackOptions: {
          type: 'web-api',
          token: process.env.SLACK_BOT_TOKEN || "xoxb-xxxxxxxxxx-xxxxxx...",,
          channel: process.env.SLACK_CHANNEL || "Cxxxxxxxxxx",
          // Ställ in detta alternativ till true för att bifoga en skärmbild till det misslyckade fallet.
          uploadScreenshotOfFailedCase: true,
          // Ställ in detta alternativ till true om du vill lägga till tråd med detaljer om resultat till notifikation av testresultat som skickas till Slack.
          notifyDetailResultThread: true,
          // Ställ in Filter för detaljerade resultat. (array är tom eller odefinierad, alla filter tillämpas.)
          filterForDetailResults: [
            'passed',
            'failed',
            'pending',
            'skipped'
          ],
          // Åsidosätt createScreenshotPayload-funktionen.
          createScreenshotPayload: function (testStats: TestStats, screenshotBuffer: string | Buffer<ArrayBufferLike>): FilesUploadArguments {
            const payload: FilesUploadArguments = {
              // gör något...
            }
            return payload;
          },
          // Åsidosätt createResultDetailPayload-funktionen.
          createResultDetailPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): ChatPostMessageArguments {
            const payload: ChatPostMessageArguments = {
              // gör något...
            }
            return payload;
          }
        },
        // Ställ in titeln för testet.
        title: 'Slack Reporter Test',
        // Ställ in URL för testresultaten.
        resultsUrl: process.env.JENKINS_URL,
        // Ställ in notifikation för testslut
        notifyTestFinishMessage: true,
        // Ställ in scenariobaserad tillståndsräkning (endast Cucumber)
        useScenarioBasedStateCounts: true,
        // Anpassa Slack Emoji-symboler.
        emojiSymbols: {
          passed: ':white_check_mark:',
          failed: ':x:',
          skipped: ':double_vertical_bar:',
          pending: ':grey_question:',
          start: ':rocket:',
          finished: ':checkered_flag:',
          watch: ':stopwatch:'
        },
        // Åsidosätt createStartPayload-funktionen.
        createStartPayload: function (runnerStats: RunnerStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // gör något...
          }
          return payload;
        },
        // Åsidosätt createFailedTestPayload-funktionen.
        createFailedTestPayload: function (testStats: TestStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // gör något...
          }
          return payload;
        },
        // Åsidosätt createResultPayload-funktionen.
        createResultPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // gör något...
          }
          return payload;
        }
      }
    ],
  ],
};
```

## Stödda API

### getResultsUrl

> **typ**: `() => string | undefined`

Hämta resultat-URL:en.

```js
// getResultsUrl.spec.ts
import SlackReporter from '@moroo/wdio-slack-reporter';

describe('Hämta resultsUrl-värdet', function () {
  before(function () {
    const resultsUrl = SlackReporter.getResultsUrl();
    if (resultsUrl) {
      // gör något...
    }
  });
  it('Gör något', function () {
    // gör något...
  });
});
```

### setResultsUrl

> **typ**: `(url: string) => void`

Ställ in resultat-URL:en.  
_(Detta är användbart om URL:en med testresultat ändras varje gång.)_

```js
// setResultsUrl.spec.ts
import SlackReporter from '@moroo/wdio-slack-reporter';
import { RESULTS_URL } from '../constants';

describe('Ställ in resultsUrl-värdet', function () {
  before(function () {
    const resultsUrl = RESULTS_URL + new Date().toISOString();
    SlackReporter.setResultsUrl(resultsUrl);
  });
  it('Gör något', function () {
    // gör något...
  });
});
```

### uploadFailedTestScreenshot

> **typ**: `(data: string | Buffer<ArrayBufferLike>) => void`

Lägg till en skärmbild som en tråd till notifikationen om misslyckat test.  
_**(Om du använder en webhook kommer detta att skriva ut en varning och göra ingenting.)**_

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

> **typ**: `(payload: ChatPostMessageArguments) => Promise<WebAPICallResult>`

Posta ett meddelande till Slack.  
_**(Om du använder en webhook kommer detta att kasta ett fel.)**_

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

describe('Post funktionstest', function () {
  it('Posta ett meddelande', async function () {
    const payload: ChatPostMessageArguments = {
      // gör något...
    };
    const result: WebAPICallResult = await SlackReporter.post(payload);
  });
});
```

### upload

> **typ**: `({ payload: FilesUploadArguments; options: FilesUploadV2Options }) => Promise<WebAPICallResult & {files: FilesCompleteUploadExternalResponse[];}>`

Ladda upp en fil till Slack.  
_**(Om du använder en webhook kommer detta att kasta ett fel.)**_

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

describe('Upload-funktionstest', function () {
  it('Ladda upp filer', async function () {
    const payload: FilesUploadArguments = {
      // gör något...
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

> **typ**: `(payload: IncomingWebhookSendArguments) => Promise<IncomingWebhookResult>`

Skicka ett meddelande till Slack.  
_**(Om du använder en web-api kommer detta att kasta ett fel.)**_

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

describe('Send-funktionstest', function () {
  it('Skicka ett meddelande', async function () {
    const payload: IncomingWebhookSendArguments = {
      // gör något...
    };
    const result: IncomingWebhookResult = await SlackReporter.send(payload);
  });
});
```

## Lägg till skärmbild

Om du vill lägga till en skärmbild som en tråd till notifikationen om misslyckat test, använd funktionen `uploadFailedTestScreenshot` efter att ha tagit skärmbilden.

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

## Kända problem

### Osynkroniserad

Om följande fel uppstår, ställ in `reporterSyncInterval`, `reporterSyncTimeout` i `wdio.conf.js`.

```bash
ERROR @wdio/runner: Error: Some reporters are still unsynced: SlackReporter
```

```js
//wdio.conf.js
export.config = {
  //
  // Bestämmer i vilket intervall rapportören ska kontrollera om de är synkroniserade om de rapporterar sina loggar asynkront (t.ex. om loggar strömmas till en tredjepartsleverantör).
  reporterSyncInterval: 500,
  // Bestämmer den maximala tid rapportörer har att avsluta uppladdningen av alla sina loggar tills ett fel kastas av testkörararen.
  reporterSyncTimeout: 20000,
}
```

### Jasmine-alternativ - expectationResultHandler

Att lägga till funktionen uploadFailedTestScreenshot här fungerar inte heller.  
Detta beror på att funktionen fungerar efter varje test, så det aktuella testet är okänt.

```js
// wdio.conf.js
export.config = {
  jasmineOpts: {
    // Jasmine default timeout
    defaultTimeoutInterval: 60000,
    //
    // Jasmine-ramverket tillåter avlyssning av varje påstående för att logga tillståndet för applikationen
    // eller webbplatsen beroende på resultatet. Till exempel är det ganska användbart att ta en skärmbild varje gång
    // ett påstående misslyckas.
    expectationResultHandler: function (passed, assertion) {
      if (passed) {
        return;
      }
      /*
        Att lägga till funktionen uploadFailedTestScreenshot här fungerar inte heller.
        Detta beror på att funktionen fungerar efter varje test, så det aktuella testet är okänt.

        [x] const result = await browser.takeScreenshot();
        [x] SlackReporter.uploadFailedTestScreenshot(result);
      */
    },
  },

  // Lägg till det här istället.
  afterTest: async function (test, context, result) {
    if (result.error) {
      const result = await browser.takeScreenshot();
      SlackReporter.uploadFailedTestScreenshot(result);
    }
  }
}
```