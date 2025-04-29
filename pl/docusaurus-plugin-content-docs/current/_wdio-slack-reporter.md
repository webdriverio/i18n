---
id: wdio-slack-reporter
title: Reporter Slack Reporter
custom_edit_url: https://github.com/morooLee/wdio-slack-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-reporter to pakiet zewnętrzny, więcej informacji można znaleźć na [GitHub](https://github.com/morooLee/wdio-slack-reporter) | [npm](https://www.npmjs.com/package/@moroo/wdio-slack-reporter)

![version](https://img.shields.io/npm/v/@moroo/wdio-slack-reporter?color=%23CB3837&label=latest)
![downloads](https://img.shields.io/npm/dw/@moroo/wdio-slack-reporter?color=%23CB3837&)
![license](https://img.shields.io/npm/l/@moroo/wdio-slack-reporter)
![webdriverio](https://img.shields.io/static/v1?color=EA5906&label=WebdriverIO&message=>=8.0&logo=webdriverio)

Reporter z [WebdriverIO](https://webdriver.io/) wykorzystujący [Incoming webhook](https://api.slack.com/incoming-webhooks) i [Web API](https://api.slack.com/web) do wysyłania wyników do [Slack](https://slack.com/).

## 📢 Ważna informacja

### Migracja do [filesUploadV2](https://tools.slack.dev/node-slack-sdk/web-api/#upload-a-file) z powodu [wycofania files.upload](https://api.slack.com/changelog/2024-04-a-better-way-to-upload-files-is-here-to-stay)

## Zrzut ekranu powiadomienia Slack

<img src="https://raw.githubusercontent.com/morooLee/wdio-slack-reporter/master/docs/Notification.png" width="80%" height="80%" title="Notification Image" alt="Notification"></img>

## Polityka wsparcia wersji WebdriverIO

> Wersje WebdriverIO wspierane w tym projekcie są zgodne z polityką wsparcia WebdriverIO.
> Politykę wsparcia WebdriverIO można sprawdzić [tutaj](https://webdriver.io/versions).

## Instalacja

Najprostszym sposobem jest utrzymywanie `@moroo/wdio-slack-reporter` jako devDependency w twoim pliku `package.json`.

```json
{
  "devDependencies": {
    "@moroo/wdio-slack-reporter": "^9.0.0"
  }
}
```

Możesz to łatwo zrobić za pomocą:

- NPM

```bash
npm install @moroo/wdio-slack-reporter --save-dev
```

- Yarn

```bash
yarn add -D @moroo/wdio-slack-reporter
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj](https://webdriver.io/docs/gettingstarted.html).

## Konfiguracja

Aby używać reportera, musisz dodać slack do tablicy reporters w pliku wdio.conf.js

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

## Opcje konfiguracji

Wspierane są następujące opcje konfiguracji.
Aby powiadomienia były wysyłane, musisz ustawić `webhook` lub `web-api`.
Jeśli zarówno `web-api` jak i `webhook` są ustawione, używany jest `web-api`.

### Webhook (Incoming Webhook)

#### **webhook (`Wymagane`)**

[**Incoming Webhook**](https://api.slack.com/incoming-webhooks) kanału slack, do którego powinny być wysyłane powiadomienia. Jeśli URL nie jest skonfigurowany, powiadomienia nie będą wysyłane.

- Zakres: `webhook`
- Typ: `string`

#### **username (`Opcjonalne`)**

Wartość username pojawi się w powiadomieniu slack jako użytkownik, który je wysłał.

- Zakres: `webhook`
- Typ: `string`
- Domyślnie: `"WebdriverIO Reporter"`

#### **icon_url (`Opcjonalne`)**

Adres URL ikony, która będzie wyświetlana w Slack

- Zakres: `webhook`
- Typ: `string`
- Domyślnie: `"https://webdriver.io/img/webdriverio.png"`

> [!TIP]
> Oprócz tych opcji, można również użyć wszystkich opcji zdefiniowanych w specyfikacji [Slack Incoming Webhook](https://www.npmjs.com/package/@slack/webhook).

### Web API (Slack Bot)

#### **token (`Wymagane`)**

[**Web API**](https://api.slack.com/web) kanału slack, do którego powinny być wysyłane powiadomienia. Wymagany jest [token użytkownika bota](https://api.slack.com/legacy/oauth#bots). Tokeny dostępu botów zawsze zaczynają się od `xoxb`.
Token bota wymaga zakresu OAuth [`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write).
[Zobacz poniżej](https://api.slack.com/methods/chat.postMessage#text_usage), aby uzyskać więcej szczegółów.

- Zakres: `web-api`
- Typ: `string`

#### **channel (`Wymagane`)**

Kanał, prywatna grupa lub kanał IM, do którego wysyłana jest wiadomość. Może być zakodowanym ID lub nazwą. [Zobacz poniżej](https://api.slack.com/legacy/oauth-scopes), aby uzyskać więcej szczegółów.
[_`"Jak znaleźć ID kanału" - stackoverflow -`_](https://stackoverflow.com/questions/57139545/how-can-i-see-slack-bot-info-like-user-id-and-bot-id-without-making-api-call)

- Zakres: `web-api`
- Typ: `string`

> [!TIP]
> Oprócz tych opcji, można również użyć wszystkich opcji zdefiniowanych w specyfikacji [Slack Web API](https://www.npmjs.com/package/@slack/web-api).

#### **uploadScreenshotOfFailedCase (`Opcjonalne`)**

Ustaw tę opcję na true, aby dołączyć zrzut ekranu do nieudanego przypadku.

- Zakres: `web-api`
- Typ: `boolean`
- Domyślnie: `true`

#### **notifyDetailResultThread (`Opcjonalne`)**

> Ta opcja działa tylko wtedy, gdy opcja notifyTestFinishMessage jest ustawiona na true.

Ustaw tę opcję na true, jeśli chcesz dodać wątek ze szczegółami wyników do powiadomienia o wynikach testu publikowanego w Slack.

- Zakres: `web-api`
- Typ: `boolean`
- Domyślnie: `true`

#### **filterForDetailResults (`Opcjonalne`)**

> Ta opcja działa tylko wtedy, gdy opcja notifyDetailResultThread jest ustawiona na true.

Dodaj filtry, które chcesz zastosować, do tej tablicy, a szczegółowe wyniki zostaną przefiltrowane w Slack i wysłane do wątku.
_(Jeśli nie ma filtrów (tablica jest pusta lub niezdefiniowana), stosowane są wszystkie filtry.)_
**Lista filtrów**: `passed`, `failed`, `pending`, `skipped`

- Zakres: `web-api`
- Typ: `array (passed | failed | pending | skipped)`
- Domyślnie: `['passed', 'failed', 'pending', 'skipped']`

#### **createScreenshotPayload (`Opcjonalne`)**

Ta opcja dostosowuje ładunek, który jest przesyłany w postaci zrzutu ekranu dla niepowodzenia testu.

- Zakres: `web-api`
- Typ: `function`

#### **createResultDetailPayload (`Opcjonalne`)**

Ta opcja dostosowuje ładunek, który jest powiadamiany o szczegółowych wynikach testu.

- Zakres: `web-api`
- Typ: `function`

### Wspólne

#### **title (`Opcjonalne`)**

Ustaw tę opcję na tytuł testu.

- Zakres: `webhook`, `web-api`
- Typ: `string`

#### **resultsUrl (`Opcjonalne`)**

Podaj link do wyników testu. Jest to klikalny link w powiadomieniu.

- Zakres: `webhook`, `web-api`
- Typ: `string`

#### **notifyTestStartMessage (`Opcjonalne`)**

Ustaw tę opcję na true, aby wysyłać powiadomienia o rozpoczęciu testu.

- Zakres: `webhook`, `web-api`
- Typ: `boolean`
- Domyślnie: `true`

#### **notifyFailedCase (`Opcjonalne`)**

Ustaw tę opcję na true, aby dołączyć nieudane przypadki w wynikach testu raportowanych do Slack.

- Zakres: `webhook`, `web-api`
- Typ: `boolean`
- Domyślnie: `true`

#### **notifyTestFinishMessage (`Opcjonalne`)**

Ustaw tę opcję na true, aby wysyłać powiadomienia o zakończeniu testu.

- Zakres: `webhook`, `web-api`
- Typ: `boolean`
- Domyślnie: `true`

#### **useScenarioBasedStateCounts (`Opcjonalne`) - Tylko Cucumber**

Ustaw tę opcję na true, aby zmienić liczbę stanów z testu (kroków) na opartą na scenariuszu. (Tylko Cucumber)

- Zakres: `webhook`, `web-api`
- Typ: `boolean`
- Domyślnie: `false`

#### **emojiSymbols (`Opcjonalne`)**

Ta opcja zmienia domyślnie ustawiony zestaw emoji.

- Zakres: `webhook`, `web-api`
- Typ: `object`
- Domyślnie:
  - passed - ✅ `:white_check_mark:`
  - failed - ❌ `:x:`
  - skipped - ⏸ `:double_vertical_bar:`
  - pending - ❔ `:grey_question:`
  - start - 🚀 `:rocket:`
  - finished - 🏁 `:checkered_flag:`
  - watch - ⏱ `:stopwatch:`

#### **createStartPayload (`Opcjonalne`)**

Ta opcja dostosowuje ładunek, który jest powiadamiany na początku testu.

- Zakres: `webhook`, `web-api`
- Typ: `function`

#### **createFailedTestPayload (`Opcjonalne`)**

Ta opcja dostosowuje ładunek, który jest powiadamiany w przypadku niepowodzenia testu.

- Zakres: `webhook`, `web-api`
- Typ: `function`

#### **createResultPayload (`Opcjonalne`)**

Ta opcja dostosowuje ładunek, który jest powiadamiany o wynikach testu.

- Zakres: `webhook`, `web-api`
- Typ: `function`

## Używanie Incoming Webhook

Jeśli używasz webhook, nie możesz używać wątków i przesyłać plików.  
Dlatego funkcje związane z `upload` i `thread` nie są dostępne.

### Przykład konfiguracji

```js
// wdio.conf.js
import SlackReporter from "@moroo/wdio-slack-reporter";

export.config = {
  reporters: [
    [
      SlackReporter, {
        // Ustaw opcje Slack używające webhook.
        slackOptions: {
          type: 'webhook',
          webhook: process.env.SLACK_WEBHOOK_URL || "https://hooks.slack.com/........",
          username: "WebdriverIO Reporter",
          "icon-url": "https://webdriver.io/img/webdriverio.png",
        },
        // Ustaw tytuł testu.
        title: 'Slack Reporter Test',
        // Ustaw URL wyników testu.
        resultsUrl: process.env.JENKINS_URL,
        // Ustaw powiadomienie o zakończeniu testu
        notifyTestFinishMessage: true,
        // Ustaw licznik stanów oparty na scenariuszu (tylko Cucumber)
        useScenarioBasedStateCounts: true,
        // Dostosuj symbole emoji Slack.
        emojiSymbols: {
          passed: ':white_check_mark:',
          failed: ':x:',
          skipped: ':double_vertical_bar:',
          pending: ':grey_question:',
          start: ':rocket:',
          finished: ':checkered_flag:',
          watch: ':stopwatch:'
        },
        // Zastąp funkcję createStartPayload.
        createStartPayload: function (runnerStats: RunnerStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // zrób coś...
          }
          return payload;
        },
        // Zastąp funkcję createFailedTestPayload.
        createFailedTestPayload: function (testStats: TestStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // zrób coś...
          }
          return payload;
        },
        // Zastąp funkcję createResultPayload.
        createResultPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // zrób coś...
          }
          return payload;
        }
      }
    ],
  ],
};
```

## Używanie Web API

Aby korzystać z API, potrzebujesz zakresów takich jak poniżej.  
[`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write). [Zobacz poniżej](https://api.slack.com/legacy/oauth-scopes), aby uzyskać więcej szczegółów.  

### Przykład konfiguracji

```js
// wdio.conf.js
import SlackReporter from "@moroo/wdio-slack-reporter";

export.config = {
  reporters: [
    [
      SlackReporter, {
        // Ustaw opcje Slack używające web-api.
        slackOptions: {
          type: 'web-api',
          token: process.env.SLACK_BOT_TOKEN || "xoxb-xxxxxxxxxx-xxxxxx...",,
          channel: process.env.SLACK_CHANNEL || "Cxxxxxxxxxx",
          // Ustaw tę opcję na true, aby dołączyć zrzut ekranu do nieudanego przypadku.
          uploadScreenshotOfFailedCase: true,
          // Ustaw tę opcję na true, jeśli chcesz dodać wątek ze szczegółami wyników do powiadomienia o wynikach testu publikowanego w Slack.
          notifyDetailResultThread: true,
          // Ustaw filtry dla szczegółowych wyników. (jeśli tablica jest pusta lub niezdefiniowana, stosowane są wszystkie filtry.)
          filterForDetailResults: [
            'passed',
            'failed',
            'pending',
            'skipped'
          ],
          // Zastąp funkcję createScreenshotPayload.
          createScreenshotPayload: function (testStats: TestStats, screenshotBuffer: string | Buffer<ArrayBufferLike>): FilesUploadArguments {
            const payload: FilesUploadArguments = {
              // zrób coś...
            }
            return payload;
          },
          // Zastąp funkcję createResultDetailPayload.
          createResultDetailPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): ChatPostMessageArguments {
            const payload: ChatPostMessageArguments = {
              // zrób coś...
            }
            return payload;
          }
        },
        // Ustaw tytuł testu.
        title: 'Slack Reporter Test',
        // Ustaw URL wyników testu.
        resultsUrl: process.env.JENKINS_URL,
        // Ustaw powiadomienie o zakończeniu testu
        notifyTestFinishMessage: true,
        // Ustaw licznik stanów oparty na scenariuszu (tylko Cucumber)
        useScenarioBasedStateCounts: true,
        // Dostosuj symbole emoji Slack.
        emojiSymbols: {
          passed: ':white_check_mark:',
          failed: ':x:',
          skipped: ':double_vertical_bar:',
          pending: ':grey_question:',
          start: ':rocket:',
          finished: ':checkered_flag:',
          watch: ':stopwatch:'
        },
        // Zastąp funkcję createStartPayload.
        createStartPayload: function (runnerStats: RunnerStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // zrób coś...
          }
          return payload;
        },
        // Zastąp funkcję createFailedTestPayload.
        createFailedTestPayload: function (testStats: TestStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // zrób coś...
          }
          return payload;
        },
        // Zastąp funkcję createResultPayload.
        createResultPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // zrób coś...
          }
          return payload;
        }
      }
    ],
  ],
};
```

## Wspierane API

### getResultsUrl

> **typ**: `() => string | undefined`

Pobierz URL wyników.

```js
// getResultsUrl.spec.ts
import SlackReporter from '@moroo/wdio-slack-reporter';

describe('Pobierz wartość resultsUrl', function () {
  before(function () {
    const resultsUrl = SlackReporter.getResultsUrl();
    if (resultsUrl) {
      // zrób coś...
    }
  });
  it('Zrób coś', function () {
    // zrób coś...
  });
});
```

### setResultsUrl

> **typ**: `(url: string) => void`

Ustaw URL wyników.  
_(Jest to przydatne, jeśli URL z wynikami testu zmienia się za każdym razem.)_

```js
// setResultsUrl.spec.ts
import SlackReporter from '@moroo/wdio-slack-reporter';
import { RESULTS_URL } from '../constants';

describe('Ustaw wartość resultsUrl', function () {
  before(function () {
    const resultsUrl = RESULTS_URL + new Date().toISOString();
    SlackReporter.setResultsUrl(resultsUrl);
  });
  it('Zrób coś', function () {
    // zrób coś...
  });
});
```

### uploadFailedTestScreenshot

> **typ**: `(data: string | Buffer<ArrayBufferLike>) => void`

Dodaj zrzut ekranu jako wątek do powiadomienia o nieudanym teście.  
_**(Jeśli używasz webhook, spowoduje to wyświetlenie ostrzeżenia i nic nie zrobi.)**_

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

Opublikuj wiadomość w Slack.  
_**(Jeśli używasz webhook, spowoduje to błąd.)**_

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

describe('Test funkcji Post', function () {
  it('Opublikuj wiadomość', async function () {
    const payload: ChatPostMessageArguments = {
      // zrób coś...
    };
    const result: WebAPICallResult = await SlackReporter.post(payload);
  });
});
```

### upload

> **typ**: `({ payload: FilesUploadArguments; options: FilesUploadV2Options }) => Promise<WebAPICallResult & {files: FilesCompleteUploadExternalResponse[];}>`

Prześlij plik do Slack.  
_**(Jeśli używasz webhook, spowoduje to błąd.)**_

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

describe('Test funkcji Upload', function () {
  it('Prześlij pliki', async function () {
    const payload: FilesUploadArguments = {
      // zrób coś...
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

Wyślij wiadomość do Slack.  
_**(Jeśli używasz web-api, spowoduje to błąd.)**_

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

describe('Test funkcji Send', function () {
  it('Wyślij wiadomość', async function () {
    const payload: IncomingWebhookSendArguments = {
      // zrób coś...
    };
    const result: IncomingWebhookResult = await SlackReporter.send(payload);
  });
});
```

## Dodawanie zrzutu ekranu

Jeśli chcesz dodać zrzut ekranu jako wątek do powiadomienia o nieudanym teście, dodaj funkcję `uploadFailedTestScreenshot` po wykonaniu zrzutu ekranu.

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

## Znane problemy

### Brak synchronizacji

Jeśli wystąpi następujący błąd, ustaw `reporterSyncInterval`, `reporterSyncTimeout` w `wdio.conf.js`.

```bash
ERROR @wdio/runner: Error: Some reporters are still unsynced: SlackReporter
```

```js
//wdio.conf.js
export.config = {
  //
  // Określa, w jakim interwale reporter powinien sprawdzać, czy są zsynchronizowane, jeśli raportują swoje logi asynchronicznie (np. jeśli logi są przekazywane do dostawcy zewnętrznego).
  reporterSyncInterval: 500,
  // Określa maksymalny czas, jaki reportery mają na zakończenie przesyłania wszystkich swoich logów, zanim zostanie zgłoszony błąd przez testrunner.
  reporterSyncTimeout: 20000,
}
```

### Opcja Jasmine - expectationResultHandler

Dodanie funkcji uploadFailedTestScreenshot tutaj również nie działa.  
Dzieje się tak dlatego, że funkcja działa po każdym teście, więc aktualny test jest nieznany.

```js
// wdio.conf.js
export.config = {
  jasmineOpts: {
    // Domyślny limit czasu Jasmine
    defaultTimeoutInterval: 60000,
    //
    // Framework Jasmine umożliwia przechwytywanie każdej asercji w celu rejestrowania stanu aplikacji
    // lub strony internetowej w zależności od wyniku. Na przykład, wygodnie jest robić zrzut ekranu za każdym razem
    // gdy asercja nie powiedzie się.
    expectationResultHandler: function (passed, assertion) {
      if (passed) {
        return;
      }
      /*
        Dodanie funkcji uploadFailedTestScreenshot tutaj również nie działa.
        Dzieje się tak dlatego, że funkcja działa po każdym teście, więc aktualny test jest nieznany.

        [x] const result = await browser.takeScreenshot();
        [x] SlackReporter.uploadFailedTestScreenshot(result);
      */
    },
  },

  // Dodaj tutaj.
  afterTest: async function (test, context, result) {
    if (result.error) {
      const result = await browser.takeScreenshot();
      SlackReporter.uploadFailedTestScreenshot(result);
    }
  }
}
```