---
id: wdio-slack-reporter
title: Slack Reporter Репортер
custom_edit_url: https://github.com/morooLee/wdio-slack-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-reporter это пакет сторонних разработчиков, для получения дополнительной информации, пожалуйста, посетите [GitHub](https://github.com/morooLee/wdio-slack-reporter) | [npm](https://www.npmjs.com/package/@moroo/wdio-slack-reporter)

![version](https://img.shields.io/npm/v/@moroo/wdio-slack-reporter?color=%23CB3837&label=latest)
![downloads](https://img.shields.io/npm/dw/@moroo/wdio-slack-reporter?color=%23CB3837&)
![license](https://img.shields.io/npm/l/@moroo/wdio-slack-reporter)
![webdriverio](https://img.shields.io/static/v1?color=EA5906&label=WebdriverIO&message=>=8.0&logo=webdriverio)

Репортер от [WebdriverIO](https://webdriver.io/), использующий [Incoming webhook](https://api.slack.com/incoming-webhooks) и [Web API](https://api.slack.com/web) для отправки результатов в [Slack](https://slack.com/).

## 📢 Важное уведомление

### Миграция на [filesUploadV2](https://tools.slack.dev/node-slack-sdk/web-api/#upload-a-file) из-за [устаревания files.upload](https://api.slack.com/changelog/2024-04-a-better-way-to-upload-files-is-here-to-stay)

## Скриншот уведомления Slack

<img src="https://raw.githubusercontent.com/morooLee/wdio-slack-reporter/master/docs/Notification.png" width="80%" height="80%" title="Notification Image" alt="Notification"></img>

## Политика поддержки версий WebdriverIO

> Версии WebdriverIO, поддерживаемые в этом проекте, следуют политике поддержки WebdriverIO.
> Политику поддержки WebdriverIO можно проверить [здесь](https://webdriver.io/versions).

## Установка

Самый простой способ - сохранить `@moroo/wdio-slack-reporter` как devDependency в вашем `package.json`.

```json
{
  "devDependencies": {
    "@moroo/wdio-slack-reporter": "^9.0.0"
  }
}
```

Вы можете сделать это просто:

- NPM

```bash
npm install @moroo/wdio-slack-reporter --save-dev
```

- Yarn

```bash
yarn add -D @moroo/wdio-slack-reporter
```

Инструкции по установке `WebdriverIO` можно найти [здесь](https://webdriver.io/docs/gettingstarted.html).

## Конфигурация

Чтобы использовать репортер, вам нужно добавить slack в массив reporters в файле wdio.conf.js

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

## Параметры конфигурации

Поддерживаются следующие параметры конфигурации.
Для отправки уведомлений необходимо настроить `webhook` или `web-api`.
Если настроены и `web-api`, и `webhook`, используется `web-api`.

### Webhook (Incoming Webhook)

#### **webhook (`Обязательно`)**

[**Incoming Webhook**](https://api.slack.com/incoming-webhooks) канала slack, в который должны отправляться уведомления. Если URL не настроен, уведомления не будут отправляться.

- Область: `webhook`
- Тип: `string`

#### **username (`Опционально`)**

Значение username появится в уведомлении slack как пользователь, отправивший его.

- Область: `webhook`
- Тип: `string`
- По умолчанию: `"WebdriverIO Reporter"`

#### **icon_url (`Опционально`)**

URL иконки, отображаемой в slack

- Область: `webhook`
- Тип: `string`
- По умолчанию: `"https://webdriver.io/img/webdriverio.png"`

> [!TIP]
> Помимо этих, все параметры, определенные в спецификации [Slack Incoming Webhook](https://www.npmjs.com/package/@slack/webhook), также могут использоваться.

### Web API (Slack Bot)

#### **token (`Обязательно`)**

[**Web API**](https://api.slack.com/web) канала slack, в который должны отправляться уведомления. Требуется [токен бот-пользователя](https://api.slack.com/legacy/oauth#bots). Токены доступа бота всегда начинаются с `xoxb`.
Токен бота требует область действия OAuth [`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write).
[Смотрите ниже](https://api.slack.com/methods/chat.postMessage#text_usage) для получения дополнительной информации.

- Область: `web-api`
- Тип: `string`

#### **channel (`Обязательно`)**

Канал, приватная группа или IM-канал для отправки сообщения. Может быть закодированным ID или именем. [Смотрите ниже](https://api.slack.com/legacy/oauth-scopes) для получения дополнительной информации.
[_`"Как найти ID канала" - stackoverflow -`_](https://stackoverflow.com/questions/57139545/how-can-i-see-slack-bot-info-like-user-id-and-bot-id-without-making-api-call)

- Область: `web-api`
- Тип: `string`

> [!TIP]
> Помимо этих, все параметры, определенные в спецификации [Slack Web API](https://www.npmjs.com/package/@slack/web-api), также могут использоваться.

#### **uploadScreenshotOfFailedCase (`Опционально`)**

Установите этот параметр в true, чтобы прикрепить скриншот к проваленному случаю.

- Область: `web-api`
- Тип: `boolean`
- По умолчанию: `true`

#### **notifyDetailResultThread (`Опционально`)**

> Этот параметр работает только если параметр notifyTestFinishMessage установлен в true.

Установите этот параметр в true, если вы хотите добавить нить с подробностями результатов к уведомлению о результатах теста, размещенному в Slack.

- Область: `web-api`
- Тип: `boolean`
- По умолчанию: `true`

#### **filterForDetailResults (`Опционально`)**

> Этот параметр работает только если параметр notifyDetailResultThread установлен в true.

Добавьте нужный фильтр в этот параметр массива, и подробные результаты будут отфильтрованы в Slack и отправлены в нить.
_(Если нет фильтров (массив пуст или не определен), применяются все фильтры.)_
**Список фильтров**: `passed`, `failed`, `pending`, `skipped`

- Область: `web-api`
- Тип: `array (passed | failed | pending | skipped)`
- По умолчанию: `['passed', 'failed', 'pending', 'skipped']`

#### **createScreenshotPayload (`Опционально`)**

Этот параметр настраивает полезную нагрузку, которая загружается со скриншотом для неудачного теста.

- Область: `web-api`
- Тип: `function`

#### **createResultDetailPayload (`Опционально`)**

Этот параметр настраивает полезную нагрузку, которая уведомляет о подробных результатах теста.

- Область: `web-api`
- Тип: `function`

### Общие

#### **title (`Опционально`)**

Установите этот параметр в заголовок теста.

- Область: `webhook`, `web-api`
- Тип: `string`

#### **resultsUrl (`Опционально`)**

Предоставьте ссылку на результаты теста. Это кликабельная ссылка в уведомлении.

- Область: `webhook`, `web-api`
- Тип: `string`

#### **notifyTestStartMessage (`Опционально`)**

Установите этот параметр в true, чтобы отправлять уведомления о начале теста.

- Область: `webhook`, `web-api`
- Тип: `boolean`
- По умолчанию: `true`

#### **notifyFailedCase (`Опционально`)**

Установите этот параметр в true, чтобы прикрепить проваленные случаи к результатам теста, отправляемым в Slack.

- Область: `webhook`, `web-api`
- Тип: `boolean`
- По умолчанию: `true`

#### **notifyTestFinishMessage (`Опционально`)**

Установите этот параметр в true, чтобы отправлять уведомления о завершении теста.

- Область: `webhook`, `web-api`
- Тип: `boolean`
- По умолчанию: `true`

#### **useScenarioBasedStateCounts (`Опционально`) - Только Cucumber**

Установите этот параметр в true, чтобы изменить подсчет состояний с теста (шагов) на сценарий. (Только Cucumber)

- Область: `webhook`, `web-api`
- Тип: `boolean`
- По умолчанию: `false`

#### **emojiSymbols (`Опционально`)**

Этот параметр изменяет набор эмодзи по умолчанию.

- Область: `webhook`, `web-api`
- Тип: `object`
- По умолчанию:
  - passed - ✅ `:white_check_mark:`
  - failed - ❌ `:x:`
  - skipped - ⏸ `:double_vertical_bar:`
  - pending - ❔ `:grey_question:`
  - start - 🚀 `:rocket:`
  - finished - 🏁 `:checkered_flag:`
  - watch - ⏱ `:stopwatch:`

#### **createStartPayload (`Опционально`)**

Этот параметр настраивает полезную нагрузку, которая уведомляет о начале теста.

- Область: `webhook`, `web-api`
- Тип: `function`

#### **createFailedTestPayload (`Опционально`)**

Этот параметр настраивает полезную нагрузку, которая уведомляет о неудаче теста.

- Область: `webhook`, `web-api`
- Тип: `function`

#### **createResultPayload (`Опционально`)**

Этот параметр настраивает полезную нагрузку, которая уведомляет о результатах теста.

- Область: `webhook`, `web-api`
- Тип: `function`

## Использование Incoming Webhook

Если вы используете webhook, невозможно создавать нити и загружать файлы.  
Поэтому функции, связанные с `upload` и `thread`, недоступны.

### Пример конфигурации

```js
// wdio.conf.js
import SlackReporter from "@moroo/wdio-slack-reporter";

export.config = {
  reporters: [
    [
      SlackReporter, {
        // Настройте параметры Slack для использования webhook.
        slackOptions: {
          type: 'webhook',
          webhook: process.env.SLACK_WEBHOOK_URL || "https://hooks.slack.com/........",
          username: "WebdriverIO Reporter",
          "icon-url": "https://webdriver.io/img/webdriverio.png",
        },
        // Установите заголовок теста.
        title: 'Slack Reporter Test',
        // Установите URL результатов теста.
        resultsUrl: process.env.JENKINS_URL,
        // Настройте уведомление о завершении теста
        notifyTestFinishMessage: true,
        // Установите подсчет состояний на основе сценария (Только Cucumber)
        useScenarioBasedStateCounts: true,
        // Настройте эмодзи для Slack.
        emojiSymbols: {
          passed: ':white_check_mark:',
          failed: ':x:',
          skipped: ':double_vertical_bar:',
          pending: ':grey_question:',
          start: ':rocket:',
          finished: ':checkered_flag:',
          watch: ':stopwatch:'
        },
        // Переопределить функцию createStartPayload.
        createStartPayload: function (runnerStats: RunnerStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // делаем что-то...
          }
          return payload;
        },
        // Переопределить функцию createFailedTestPayload.
        createFailedTestPayload: function (testStats: TestStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // делаем что-то...
          }
          return payload;
        },
        // Переопределить функцию createResultPayload.
        createResultPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // делаем что-то...
          }
          return payload;
        }
      }
    ],
  ],
};
```

## Использование Web API

Для использования API вам нужны разрешения, такие как указанные ниже.  
[`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write). [Смотрите ниже](https://api.slack.com/legacy/oauth-scopes) для получения дополнительной информации.  

### Пример конфигурации

```js
// wdio.conf.js
import SlackReporter from "@moroo/wdio-slack-reporter";

export.config = {
  reporters: [
    [
      SlackReporter, {
        // Настройте параметры Slack для использования web-api.
        slackOptions: {
          type: 'web-api',
          token: process.env.SLACK_BOT_TOKEN || "xoxb-xxxxxxxxxx-xxxxxx...",,
          channel: process.env.SLACK_CHANNEL || "Cxxxxxxxxxx",
          // Установите этот параметр в true, чтобы прикрепить скриншот к проваленному случаю.
          uploadScreenshotOfFailedCase: true,
          // Установите этот параметр в true, если вы хотите добавить нить с подробностями результатов к уведомлению о результатах теста, размещенному в Slack.
          notifyDetailResultThread: true,
          // Установите фильтр для подробных результатов. (если массив пуст или не определен, применяются все фильтры.)
          filterForDetailResults: [
            'passed',
            'failed',
            'pending',
            'skipped'
          ],
          // Переопределить функцию createScreenshotPayload.
          createScreenshotPayload: function (testStats: TestStats, screenshotBuffer: string | Buffer<ArrayBufferLike>): FilesUploadArguments {
            const payload: FilesUploadArguments = {
              // делаем что-то...
            }
            return payload;
          },
          // Переопределить функцию createResultDetailPayload.
          createResultDetailPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): ChatPostMessageArguments {
            const payload: ChatPostMessageArguments = {
              // делаем что-то...
            }
            return payload;
          }
        },
        // Установите заголовок теста.
        title: 'Slack Reporter Test',
        // Установите URL результатов теста.
        resultsUrl: process.env.JENKINS_URL,
        // Настройте уведомление о завершении теста
        notifyTestFinishMessage: true,
        // Установите подсчет состояний на основе сценария (Только Cucumber)
        useScenarioBasedStateCounts: true,
        // Настройте эмодзи для Slack.
        emojiSymbols: {
          passed: ':white_check_mark:',
          failed: ':x:',
          skipped: ':double_vertical_bar:',
          pending: ':grey_question:',
          start: ':rocket:',
          finished: ':checkered_flag:',
          watch: ':stopwatch:'
        },
        // Переопределить функцию createStartPayload.
        createStartPayload: function (runnerStats: RunnerStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // делаем что-то...
          }
          return payload;
        },
        // Переопределить функцию createFailedTestPayload.
        createFailedTestPayload: function (testStats: TestStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // делаем что-то...
          }
          return payload;
        },
        // Переопределить функцию createResultPayload.
        createResultPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // делаем что-то...
          }
          return payload;
        }
      }
    ],
  ],
};
```

## Поддерживаемый API

### getResultsUrl

> **тип**: `() => string | undefined`

Получить URL результатов.

```js
// getResultsUrl.spec.ts
import SlackReporter from '@moroo/wdio-slack-reporter';

describe('Get the resultsUrl value', function () {
  before(function () {
    const resultsUrl = SlackReporter.getResultsUrl();
    if (resultsUrl) {
      // делаем что-то...
    }
  });
  it('Do something', function () {
    // делаем что-то...
  });
});
```

### setResultsUrl

> **тип**: `(url: string) => void`

Установить URL результатов.  
_(Это полезно, если URL с результатами тестов меняется каждый раз.)_

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
    // делаем что-то...
  });
});
```

### uploadFailedTestScreenshot

> **тип**: `(data: string | Buffer<ArrayBufferLike>) => void`

Добавить скриншот как нить к уведомлению о проваленном тесте.  
_**(Если вы используете webhook, это выведет предупреждение и ничего не сделает.)**_

```bash
// консоль терминала
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

> **тип**: `(payload: ChatPostMessageArguments) => Promise<WebAPICallResult>`

Опубликовать сообщение в Slack.  
_**(Если вы используете webhook, это вызовет ошибку.)**_

```bash
// консоль терминала
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
      // делаем что-то...
    };
    const result: WebAPICallResult = await SlackReporter.post(payload);
  });
});
```

### upload

> **тип**: `({ payload: FilesUploadArguments; options: FilesUploadV2Options }) => Promise<WebAPICallResult & {files: FilesCompleteUploadExternalResponse[];}>`

Загрузить файл в Slack.  
_**(Если вы используете webhook, это вызовет ошибку.)**_

```bash
// консоль терминала
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
      // делаем что-то...
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

> **тип**: `(payload: IncomingWebhookSendArguments) => Promise<IncomingWebhookResult>`

Отправить сообщение в Slack.  
_**(Если вы используете web-api, это вызовет ошибку.)**_

```bash
// консоль терминала
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
      // делаем что-то...
    };
    const result: IncomingWebhookResult = await SlackReporter.send(payload);
  });
});
```

## Добавление скриншота

Если вы хотите добавить скриншот как нить к уведомлению о проваленном тесте, добавьте функцию `uploadFailedTestScreenshot` после создания скриншота.

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

## Известные проблемы

### Не синхронизировано

Если возникает следующая ошибка, установите `reporterSyncInterval`, `reporterSyncTimeout` в `wdio.conf.js`.

```bash
ERROR @wdio/runner: Error: Some reporters are still unsynced: SlackReporter
```

```js
//wdio.conf.js
export.config = {
  //
  // Определяет интервал, с которым репортер должен проверять, синхронизированы ли они, если они сообщают свои логи асинхронно (например, если логи транслируются стороннему поставщику).
  reporterSyncInterval: 500,
  // Определяет максимальное время, которое репортеры имеют для завершения загрузки всех своих логов, пока тестраннер не выдаст ошибку.
  reporterSyncTimeout: 20000,
}
```

### Опция Jasmine - expectationResultHandler

Добавление функции uploadFailedTestScreenshot здесь также не работает.  
Это происходит потому, что функция работает после каждого теста, поэтому текущий тест неизвестен.

```js
// wdio.conf.js
export.config = {
  jasmineOpts: {
    // Jasmine default timeout
    defaultTimeoutInterval: 60000,
    //
    // Фреймворк Jasmine позволяет перехватывать каждое утверждение, чтобы регистрировать состояние приложения
    // или веб-сайта в зависимости от результата. Например, удобно делать скриншот каждый раз,
    // когда утверждение не проходит.
    expectationResultHandler: function (passed, assertion) {
      if (passed) {
        return;
      }
      /*
        Добавление функции uploadFailedTestScreenshot здесь также не работает.
        Это происходит потому, что функция работает после каждого теста, поэтому текущий тест неизвестен.

        [x] const result = await browser.takeScreenshot();
        [x] SlackReporter.uploadFailedTestScreenshot(result);
      */
    },
  },

  // Добавьте здесь.
  afterTest: async function (test, context, result) {
    if (result.error) {
      const result = await browser.takeScreenshot();
      SlackReporter.uploadFailedTestScreenshot(result);
    }
  }
}
```