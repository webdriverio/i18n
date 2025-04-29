---
id: wdio-slack-reporter
title: Reporter Slack
custom_edit_url: https://github.com/morooLee/wdio-slack-reporter/edit/master/README.md
---


> wdio-slack-reporter è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/morooLee/wdio-slack-reporter) | [npm](https://www.npmjs.com/package/@moroo/wdio-slack-reporter)

![version](https://img.shields.io/npm/v/@moroo/wdio-slack-reporter?color=%23CB3837&label=latest)
![downloads](https://img.shields.io/npm/dw/@moroo/wdio-slack-reporter?color=%23CB3837&)
![license](https://img.shields.io/npm/l/@moroo/wdio-slack-reporter)
![webdriverio](https://img.shields.io/static/v1?color=EA5906&label=WebdriverIO&message=>=8.0&logo=webdriverio)

Reporter da [WebdriverIO](https://webdriver.io/) che utilizza [Incoming webhook](https://api.slack.com/incoming-webhooks) e [Web API](https://api.slack.com/web) per inviare risultati a [Slack](https://slack.com/).

## 📢 Avviso Importante

### Migrazione a [filesUploadV2](https://tools.slack.dev/node-slack-sdk/web-api/#upload-a-file) a causa della [deprecazione di files.upload](https://api.slack.com/changelog/2024-04-a-better-way-to-upload-files-is-here-to-stay)

## Screenshot della notifica Slack

<img src="https://raw.githubusercontent.com/morooLee/wdio-slack-reporter/master/docs/Notification.png" width="80%" height="80%" title="Notification Image" alt="Notification"></img>

## Politica di supporto delle versioni WebdriverIO

> Le versioni di WebdriverIO supportate in questo progetto seguono la politica di supporto di WebdriverIO.
> La politica di supporto di WebdriverIO può essere verificata [qui](https://webdriver.io/versions).

## Installazione

Il modo più semplice è mantenere `@moroo/wdio-slack-reporter` come devDependency nel tuo `package.json`.

```json
{
  "devDependencies": {
    "@moroo/wdio-slack-reporter": "^9.0.0"
  }
}
```

Puoi farlo semplicemente con:

- NPM

```bash
npm install @moroo/wdio-slack-reporter --save-dev
```

- Yarn

```bash
yarn add -D @moroo/wdio-slack-reporter
```

Le istruzioni su come installare `WebdriverIO` si trovano [qui](https://webdriver.io/docs/gettingstarted.html).

## Configurazione

Per utilizzare il reporter è necessario aggiungere slack all'array dei reporter in wdio.conf.js

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

## Opzioni di configurazione

Sono supportate le seguenti opzioni di configurazione.
Affinché le notifiche vengano inviate, è necessario impostare `webhook` o `web-api`.
Se sono impostati sia `web-api` che `webhook`, viene utilizzato `web-api`.

### Webhook (Incoming Webhook)

#### **webhook (`Obbligatorio`)**

[**Incoming Webhook**](https://api.slack.com/incoming-webhooks) del canale slack a cui inviare le notifiche. Se l'URL non è configurato, le notifiche non verranno inviate.

- Ambito: `webhook`
- Tipo: `string`

#### **username (`Opzionale`)**

Il valore di username apparirà nella notifica di slack come l'utente che l'ha inviata.

- Ambito: `webhook`
- Tipo: `string`
- Predefinito: `"WebdriverIO Reporter"`

#### **icon_url (`Opzionale`)**

L'url dell'icona da visualizzare in slack

- Ambito: `webhook`
- Tipo: `string`
- Predefinito: `"https://webdriver.io/img/webdriverio.png"`

> [!TIP]
> Oltre a queste, possono essere utilizzate anche tutte le opzioni definite nella specifica [Slack Incoming Webhook](https://www.npmjs.com/package/@slack/webhook).

### Web API (Slack Bot)

#### **token (`Obbligatorio`)**

[**Web API**](https://api.slack.com/web) del canale slack a cui inviare le notifiche. È richiesto un [token utente bot](https://api.slack.com/legacy/oauth#bots). I token di accesso del bot iniziano sempre con `xoxb`.
Il token del bot richiede l'ambito OAuth di [`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write).
[Vedi sotto](https://api.slack.com/methods/chat.postMessage#text_usage) per maggiori dettagli.

- Ambito: `web-api`
- Tipo: `string`

#### **channel (`Obbligatorio`)**

Canale, gruppo privato o canale IM a cui inviare il messaggio. Può essere un ID codificato o un nome. [Vedi sotto](https://api.slack.com/legacy/oauth-scopes) per maggiori dettagli.
[_`"Come trovare l'ID del canale" - stackoverflow -`_](https://stackoverflow.com/questions/57139545/how-can-i-see-slack-bot-info-like-user-id-and-bot-id-without-making-api-call)

- Ambito: `web-api`
- Tipo: `string`

> [!TIP]
> Oltre a queste, possono essere utilizzate anche tutte le opzioni definite nella specifica [Slack Web API](https://www.npmjs.com/package/@slack/web-api).

#### **uploadScreenshotOfFailedCase (`Opzionale`)**

Imposta questa opzione su true per allegare uno screenshot al caso fallito.

- Ambito: `web-api`
- Tipo: `boolean`
- Predefinito: `true`

#### **notifyDetailResultThread (`Opzionale`)**

> Questa opzione funziona solo quando l'opzione notifyTestFinishMessage è true.

Imposta questa opzione su true se desideri aggiungere un thread con i dettagli dei risultati alla notifica dei risultati dei test pubblicata su Slack.

- Ambito: `web-api`
- Tipo: `boolean`
- Predefinito: `true`

#### **filterForDetailResults (`Opzionale`)**

> Questa opzione funziona solo quando l'opzione notifyDetailResultThread è true.

Aggiungi il filtro che desideri a questa opzione nell'array e i risultati dettagliati verranno filtrati in Slack e inviati al thread.
_(Se non ci sono filtri (array vuoto o non definito), vengono applicati tutti i filtri.)_
**Elenco dei filtri**: `passed`, `failed`, `pending`, `skipped`

- Ambito: `web-api`
- Tipo: `array (passed | failed | pending | skipped)`
- Predefinito: `['passed', 'failed', 'pending', 'skipped']`

#### **createScreenshotPayload (`Opzionale`)**

Questa opzione personalizza il payload che viene caricato dello screenshot per il fallimento del test.

- Ambito: `web-api`
- Tipo: `function`

#### **createResultDetailPayload (`Opzionale`)**

Questa opzione personalizza il payload che viene notificato dei risultati dettagliati del test.

- Ambito: `web-api`
- Tipo: `function`

### Comune

#### **title (`Opzionale`)**

Imposta questa opzione sul titolo del test.

- Ambito: `webhook`, `web-api`
- Tipo: `string`

#### **resultsUrl (`Opzionale`)**

Fornisce un link ai risultati del test. È un link cliccabile nella notifica.

- Ambito: `webhook`, `web-api`
- Tipo: `string`

#### **notifyTestStartMessage (`Opzionale`)**

Imposta questa opzione su true per inviare notifiche all'inizio del test.

- Ambito: `webhook`, `web-api`
- Tipo: `boolean`
- Predefinito: `true`

#### **notifyFailedCase (`Opzionale`)**

Imposta questa opzione su true per allegare i casi falliti nei risultati dei test riportati a Slack.

- Ambito: `webhook`, `web-api`
- Tipo: `boolean`
- Predefinito: `true`

#### **notifyTestFinishMessage (`Opzionale`)**

Imposta questa opzione su true per inviare notifiche al termine del test.

- Ambito: `webhook`, `web-api`
- Tipo: `boolean`
- Predefinito: `true`

#### **useScenarioBasedStateCounts (`Opzionale`) - Solo Cucumber**

Imposta questa opzione su true per cambiare il conteggio degli stati da test (passi) a scenario. (Solo Cucumber)

- Ambito: `webhook`, `web-api`
- Tipo: `boolean`
- Predefinito: `false`

#### **emojiSymbols (`Opzionale`)**

Questa opzione cambia l'emoji impostato di default.

- Ambito: `webhook`, `web-api`
- Tipo: `object`
- Predefinito:
  - passed - ✅ `:white_check_mark:`
  - failed - ❌ `:x:`
  - skipped - ⏸ `:double_vertical_bar:`
  - pending - ❔ `:grey_question:`
  - start - 🚀 `:rocket:`
  - finished - 🏁 `:checkered_flag:`
  - watch - ⏱ `:stopwatch:`

#### **createStartPayload (`Opzionale`)**

Questa opzione personalizza il payload che viene notificato all'inizio del test.

- Ambito: `webhook`, `web-api`
- Tipo: `function`

#### **createFailedTestPayload (`Opzionale`)**

Questa opzione personalizza il payload che viene notificato al fallimento del test.

- Ambito: `webhook`, `web-api`
- Tipo: `function`

#### **createResultPayload (`Opzionale`)**

Questa opzione personalizza il payload che viene notificato dei risultati del test.

- Ambito: `webhook`, `web-api`
- Tipo: `function`

## Utilizzare l'Incoming Webhook

Se si utilizza il webhook, non si possono creare thread e caricare file.  
Pertanto, le funzioni relative a `upload` e `thread` non sono disponibili.

### Esempio di configurazione

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

## Utilizzare la Web API

Per utilizzare l'API, sono necessari ambiti come quelli sotto.  
[`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write). [Vedi sotto](https://api.slack.com/legacy/oauth-scopes) per maggiori dettagli.  

### Esempio di configurazione

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

## API supportate

### getResultsUrl

> **tipo**: `() => string | undefined`

Ottieni l'URL dei risultati.

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

> **tipo**: `(url: string) => void`

Imposta l'URL dei risultati.  
_(Questo è utile se l'URL con i risultati del test cambia ogni volta.)_

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

> **tipo**: `(data: string | Buffer<ArrayBufferLike>) => void`

Aggiungi uno screenshot come thread alla notifica del test fallito.  
_**(Se stai utilizzando un webhook, questo mostrerà un avviso e non farà nulla.)**_

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

> **tipo**: `(payload: ChatPostMessageArguments) => Promise<WebAPICallResult>`

Pubblica un messaggio su Slack.  
_**(Se stai utilizzando un webhook, questo genererà un errore.)**_

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

> **tipo**: `({ payload: FilesUploadArguments; options: FilesUploadV2Options }) => Promise<WebAPICallResult & {files: FilesCompleteUploadExternalResponse[];}>`

Carica un file su Slack.  
_**(Se stai utilizzando un webhook, questo genererà un errore.)**_

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

> **tipo**: `(payload: IncomingWebhookSendArguments) => Promise<IncomingWebhookResult>`

Invia un messaggio a Slack.  
_**(Se stai utilizzando una web-api, questo genererà un errore.)**_

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

## Aggiungi Screenshot

Se vuoi aggiungere uno screenshot come thread alla notifica del test fallito, aggiungi la funzione `uploadFailedTestScreenshot` dopo aver fatto lo screenshot.

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

## Problemi noti

### Non sincronizzato

Se si verifica il seguente errore, imposta `reporterSyncInterval`, `reporterSyncTimeout` in `wdio.conf.js`.

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

Aggiungere la funzione uploadFailedTestScreenshot qui non funziona.  
Questo perché la funzione funziona dopo ogni test, quindi il test corrente è sconosciuto.

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