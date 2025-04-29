---
id: wdio-slack-reporter
title: Reporter do Slack
custom_edit_url: https://github.com/morooLee/wdio-slack-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-reporter é um pacote de terceiros, para mais informações, consulte [GitHub](https://github.com/morooLee/wdio-slack-reporter) | [npm](https://www.npmjs.com/package/@moroo/wdio-slack-reporter)

![version](https://img.shields.io/npm/v/@moroo/wdio-slack-reporter?color=%23CB3837&label=latest)
![downloads](https://img.shields.io/npm/dw/@moroo/wdio-slack-reporter?color=%23CB3837&)
![license](https://img.shields.io/npm/l/@moroo/wdio-slack-reporter)
![webdriverio](https://img.shields.io/static/v1?color=EA5906&label=WebdriverIO&message=>=8.0&logo=webdriverio)

Reporter do [WebdriverIO](https://webdriver.io/) usando [Incoming webhook](https://api.slack.com/incoming-webhooks) e [Web API](https://api.slack.com/web) para enviar resultados para o [Slack](https://slack.com/).

## 📢 Aviso Importante

### Migração para [filesUploadV2](https://tools.slack.dev/node-slack-sdk/web-api/#upload-a-file) devido à [descontinuação do files.upload](https://api.slack.com/changelog/2024-04-a-better-way-to-upload-files-is-here-to-stay)

## Captura de tela da notificação do Slack

<img src="https://raw.githubusercontent.com/morooLee/wdio-slack-reporter/master/docs/Notification.png" width="80%" height="80%" title="Notification Image" alt="Notification"></img>

## Política de Suporte para Versões do WebdriverIO

> As versões do WebdriverIO suportadas neste projeto seguem a política de suporte do WebdriverIO.
> A política de suporte do WebdriverIO pode ser verificada [aqui](https://webdriver.io/versions).

## Instalação

A maneira mais fácil é manter `@moroo/wdio-slack-reporter` como uma devDependency no seu `package.json`.

```json
{
  "devDependencies": {
    "@moroo/wdio-slack-reporter": "^9.0.0"
  }
}
```

Você pode simplesmente fazer isso por:

- NPM

```bash
npm install @moroo/wdio-slack-reporter --save-dev
```

- Yarn

```bash
yarn add -D @moroo/wdio-slack-reporter
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui](https://webdriver.io/docs/gettingstarted.html).

## Configuração

Para usar o reporter, você precisa adicionar o slack ao seu array de reporters no wdio.conf.js

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

## Opções de Configuração

As seguintes opções de configuração são suportadas.
Para que as notificações sejam enviadas, você deve configurar `webhook` ou `web-api`.
Se tanto `web-api` quanto `webhook` estiverem configurados, `web-api` será usado.

### Webhook (Incoming Webhook)

#### **webhook (`Obrigatório`)**

[**Incoming Webhook**](https://api.slack.com/incoming-webhooks) do canal do slack para o qual as notificações devem ser enviadas. Se a URL não estiver configurada, as notificações não serão enviadas.

- Escopo: `webhook`
- Tipo: `string`

#### **username (`Opcional`)**

O valor de username aparecerá na notificação do slack como o usuário que a enviou.

- Escopo: `webhook`
- Tipo: `string`
- Padrão: `"WebdriverIO Reporter"`

#### **icon_url (`Opcional`)**

A url do Ícone a ser exibido no slack

- Escopo: `webhook`
- Tipo: `string`
- Padrão: `"https://webdriver.io/img/webdriverio.png"`

> [!TIP]
> Além destes, todas as opções definidas na especificação [Slack Incoming Webhook](https://www.npmjs.com/package/@slack/webhook) também podem ser usadas.

### Web API (Slack Bot)

#### **token (`Obrigatório`)**

[**Web API**](https://api.slack.com/web) do canal do slack para o qual as notificações devem ser enviadas. [Um token de usuário bot](https://api.slack.com/legacy/oauth#bots) é necessário. Tokens de acesso de bot sempre começam com `xoxb`.
O token de bot requer o escopo OAuth de [`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write).
[Veja abaixo](https://api.slack.com/methods/chat.postMessage#text_usage) para mais detalhes.

- Escopo: `web-api`
- Tipo: `string`

#### **channel (`Obrigatório`)**

Canal, grupo privado ou canal IM para enviar mensagem. Pode ser um ID codificado ou um nome. [Veja abaixo](https://api.slack.com/legacy/oauth-scopes) para mais detalhes.
[_`"Como encontrar o ID do canal" - stackoverflow -`_](https://stackoverflow.com/questions/57139545/how-can-i-see-slack-bot-info-like-user-id-and-bot-id-without-making-api-call)

- Escopo: `web-api`
- Tipo: `string`

> [!TIP]
> Além destes, todas as opções definidas na especificação [Slack Web API](https://www.npmjs.com/package/@slack/web-api) também podem ser usadas.

#### **uploadScreenshotOfFailedCase (`Opcional`)**

Defina esta opção como true para anexar uma captura de tela ao caso com falha.

- Escopo: `web-api`
- Tipo: `boolean`
- Padrão: `true`

#### **notifyDetailResultThread (`Opcional`)**

> Esta opção só funciona quando a opção notifyTestFinishMessage é true.

Defina esta opção como true se quiser adicionar thread com detalhes dos resultados à notificação de resultados de teste postada no Slack.

- Escopo: `web-api`
- Tipo: `boolean`
- Padrão: `true`

#### **filterForDetailResults (`Opcional`)**

> Esta opção só funciona quando a opção notifyDetailResultThread é true.

Adicione o filtro que você deseja a esta opção para o array e os resultados detalhados serão filtrados no Slack e enviados para a thread.
_(Se não houver filtros (array vazio ou indefinido), todos os filtros são aplicados.)_
**Lista de filtros**: `passed`, `failed`, `pending`, `skipped`

- Escopo: `web-api`
- Tipo: `array (passed | failed | pending | skipped)`
- Padrão: `['passed', 'failed', 'pending', 'skipped']`

#### **createScreenshotPayload (`Opcional`)**

Esta opção personaliza o payload que é carregado na captura de tela para a falha do teste.

- Escopo: `web-api`
- Tipo: `function`

#### **createResultDetailPayload (`Opcional`)**

Esta opção personaliza o payload que é notificado com os resultados detalhados do teste.

- Escopo: `web-api`
- Tipo: `function`

### Comum

#### **title (`Opcional`)**

Defina esta opção para o título do teste.

- Escopo: `webhook`, `web-api`
- Tipo: `string`

#### **resultsUrl (`Opcional`)**

Forneça um link para os resultados do teste. É um link clicável na notificação.

- Escopo: `webhook`, `web-api`
- Tipo: `string`

#### **notifyTestStartMessage (`Opcional`)**

Defina esta opção como true para enviar notificações de início de teste.

- Escopo: `webhook`, `web-api`
- Tipo: `boolean`
- Padrão: `true`

#### **notifyFailedCase (`Opcional`)**

Defina esta opção como true para anexar casos falhos nos resultados do teste relatados ao Slack.

- Escopo: `webhook`, `web-api`
- Tipo: `boolean`
- Padrão: `true`

#### **notifyTestFinishMessage (`Opcional`)**

Defina esta opção como true para enviar notificações de teste finalizado.

- Escopo: `webhook`, `web-api`
- Tipo: `boolean`
- Padrão: `true`

#### **useScenarioBasedStateCounts (`Opcional`) - Apenas para Cucumber**

Defina esta opção como true para mudar a contagem de estado de teste (etapas) para baseada em cenário. (Apenas Cucumber)

- Escopo: `webhook`, `web-api`
- Tipo: `boolean`
- Padrão: `false`

#### **emojiSymbols (`Opcional`)**

Esta opção altera o emoji definido por padrão.

- Escopo: `webhook`, `web-api`
- Tipo: `object`
- Padrão:
  - passed - ✅ `:white_check_mark:`
  - failed - ❌ `:x:`
  - skipped - ⏸ `:double_vertical_bar:`
  - pending - ❔ `:grey_question:`
  - start - 🚀 `:rocket:`
  - finished - 🏁 `:checkered_flag:`
  - watch - ⏱ `:stopwatch:`

#### **createStartPayload (`Opcional`)**

Esta opção personaliza o payload que é notificado no início do teste.

- Escopo: `webhook`, `web-api`
- Tipo: `function`

#### **createFailedTestPayload (`Opcional`)**

Esta opção personaliza o payload que é notificado na falha do teste.

- Escopo: `webhook`, `web-api`
- Tipo: `function`

#### **createResultPayload (`Opcional`)**

Esta opção personaliza o payload que é notificado dos resultados do teste.

- Escopo: `webhook`, `web-api`
- Tipo: `function`

## Usar o Incoming Webhook

Se você estiver usando webhook, não pode usar thread e upload.  
Portanto, funções relacionadas a `upload` e `thread` não estão disponíveis.

### Exemplo de Configuração

```js
// wdio.conf.js
import SlackReporter from "@moroo/wdio-slack-reporter";

export.config = {
  reporters: [
    [
      SlackReporter, {
        // Configure as Opções do Slack usando webhook.
        slackOptions: {
          type: 'webhook',
          webhook: process.env.SLACK_WEBHOOK_URL || "https://hooks.slack.com/........",
          username: "WebdriverIO Reporter",
          "icon-url": "https://webdriver.io/img/webdriverio.png",
        },
        // Defina o Título do Teste.
        title: 'Slack Reporter Test',
        // Defina a URL dos Resultados do Teste.
        resultsUrl: process.env.JENKINS_URL,
        // Defina a notificação de Teste Finalizado
        notifyTestFinishMessage: true,
        // Defina a contagem de estado baseada em cenário (Apenas Cucumber)
        useScenarioBasedStateCounts: true,
        // Personalize os Símbolos de Emoji do Slack.
        emojiSymbols: {
          passed: ':white_check_mark:',
          failed: ':x:',
          skipped: ':double_vertical_bar:',
          pending: ':grey_question:',
          start: ':rocket:',
          finished: ':checkered_flag:',
          watch: ':stopwatch:'
        },
        // Substitua a função createStartPayload.
        createStartPayload: function (runnerStats: RunnerStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // faça algo...
          }
          return payload;
        },
        // Substitua a função createFailedTestPayload.
        createFailedTestPayload: function (testStats: TestStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // faça algo...
          }
          return payload;
        },
        // Substitua a função createResultPayload.
        createResultPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // faça algo...
          }
          return payload;
        }
      }
    ],
  ],
};
```

## Usar a Web API

Para usar a API, você precisa de escopos como os abaixo.  
[`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write). [Veja abaixo](https://api.slack.com/legacy/oauth-scopes) para mais detalhes.  

### Exemplo de Configuração

```js
// wdio.conf.js
import SlackReporter from "@moroo/wdio-slack-reporter";

export.config = {
  reporters: [
    [
      SlackReporter, {
        // Configure as Opções do Slack usando web-api.
        slackOptions: {
          type: 'web-api',
          token: process.env.SLACK_BOT_TOKEN || "xoxb-xxxxxxxxxx-xxxxxx...",,
          channel: process.env.SLACK_CHANNEL || "Cxxxxxxxxxx",
          // Defina esta opção como true para anexar uma captura de tela ao caso com falha.
          uploadScreenshotOfFailedCase: true,
          // Defina esta opção como true se quiser adicionar thread com detalhes dos resultados à notificação de resultados de teste postada no Slack.
          notifyDetailResultThread: true,
          // Defina o Filtro para resultados detalhados. (array vazio ou indefinido, todos os filtros são aplicados.)
          filterForDetailResults: [
            'passed',
            'failed',
            'pending',
            'skipped'
          ],
          // Substitua a função createScreenshotPayload.
          createScreenshotPayload: function (testStats: TestStats, screenshotBuffer: string | Buffer<ArrayBufferLike>): FilesUploadArguments {
            const payload: FilesUploadArguments = {
              // faça algo...
            }
            return payload;
          },
          // Substitua a função createResultDetailPayload.
          createResultDetailPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): ChatPostMessageArguments {
            const payload: ChatPostMessageArguments = {
              // faça algo...
            }
            return payload;
          }
        },
        // Defina o Título do Teste.
        title: 'Slack Reporter Test',
        // Defina a URL dos Resultados do Teste.
        resultsUrl: process.env.JENKINS_URL,
        // Defina a notificação de Teste Finalizado
        notifyTestFinishMessage: true,
        // Defina a contagem de estado baseada em cenário (Apenas Cucumber)
        useScenarioBasedStateCounts: true,
        // Personalize os Símbolos de Emoji do Slack.
        emojiSymbols: {
          passed: ':white_check_mark:',
          failed: ':x:',
          skipped: ':double_vertical_bar:',
          pending: ':grey_question:',
          start: ':rocket:',
          finished: ':checkered_flag:',
          watch: ':stopwatch:'
        },
        // Substitua a função createStartPayload.
        createStartPayload: function (runnerStats: RunnerStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // faça algo...
          }
          return payload;
        },
        // Substitua a função createFailedTestPayload.
        createFailedTestPayload: function (testStats: TestStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // faça algo...
          }
          return payload;
        },
        // Substitua a função createResultPayload.
        createResultPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // faça algo...
          }
          return payload;
        }
      }
    ],
  ],
};
```

## API Suportada

### getResultsUrl

> **tipo**: `() => string | undefined`

Obtenha a URL dos resultados.

```js
// getResultsUrl.spec.ts
import SlackReporter from '@moroo/wdio-slack-reporter';

describe('Obter o valor de resultsUrl', function () {
  before(function () {
    const resultsUrl = SlackReporter.getResultsUrl();
    if (resultsUrl) {
      // faça algo...
    }
  });
  it('Fazer algo', function () {
    // faça algo...
  });
});
```

### setResultsUrl

> **tipo**: `(url: string) => void`

Defina a URL dos resultados.  
_(Isso é útil se a URL com resultados de teste muda toda vez.)_

```js
// setResultsUrl.spec.ts
import SlackReporter from '@moroo/wdio-slack-reporter';
import { RESULTS_URL } from '../constants';

describe('Definir o valor de resultsUrl', function () {
  before(function () {
    const resultsUrl = RESULTS_URL + new Date().toISOString();
    SlackReporter.setResultsUrl(resultsUrl);
  });
  it('Fazer algo', function () {
    // faça algo...
  });
});
```

### uploadFailedTestScreenshot

> **tipo**: `(data: string | Buffer<ArrayBufferLike>) => void`

Adicione uma captura de tela como uma thread à notificação de teste com falha.  
_**(Se você estiver usando um webhook, isso exibirá um aviso e não fará nada.)**_

```bash
// console do terminal
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

Poste uma mensagem no Slack.  
_**(Se você estiver usando um webhook, isso gerará um erro.)**_

```bash
// console do terminal
ERROR @moroo/slack-wdio-reporter: Not using web-api.
```

```js
// post.spec.ts
import SlackReporter, {
  ChatPostMessageArguments,
  WebAPICallResult,
} from '@moroo/wdio-slack-reporter';

describe('Teste da Função de Postagem', function () {
  it('Postar uma mensagem', async function () {
    const payload: ChatPostMessageArguments = {
      // faça algo...
    };
    const result: WebAPICallResult = await SlackReporter.post(payload);
  });
});
```

### upload

> **tipo**: `({ payload: FilesUploadArguments; options: FilesUploadV2Options }) => Promise<WebAPICallResult & {files: FilesCompleteUploadExternalResponse[];}>`

Carregue um arquivo para o Slack.  
_**(Se você estiver usando um webhook, isso gerará um erro.)**_

```bash
// console do terminal
ERROR @moroo/slack-wdio-reporter: Not using web-api.
```

```js
// upload.spec.ts
import SlackReporter, {
  FilesUploadArguments,
  WebAPICallResult,
} from '@moroo/wdio-slack-reporter';

describe('Teste da Função de Upload', function () {
  it('Carregar arquivos', async function () {
    const payload: FilesUploadArguments = {
      // faça algo...
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

Envie uma mensagem para o Slack.  
_**(Se você estiver usando uma web-api, isso gerará um erro.)**_

```bash
// console do terminal
ERROR @moroo/slack-wdio-reporter: Not using webhook.
```

```js
// send.spec.ts
import SlackReporter, {
  IncomingWebhookSendArguments,
  IncomingWebhookResult,
} from '@moroo/wdio-slack-reporter';

describe('Teste da Função de Envio', function () {
  it('Enviar uma mensagem', async function () {
    const payload: IncomingWebhookSendArguments = {
      // faça algo...
    };
    const result: IncomingWebhookResult = await SlackReporter.send(payload);
  });
});
```

## Adicionar Captura de Tela

Se você quiser adicionar uma captura de tela como uma thread à notificação de teste com falha, adicione a função `uploadFailedTestScreenshot` após tirar a captura de tela.

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

## Problemas Conhecidos

### Não Sincronizado

Se o seguinte erro ocorrer, defina `reporterSyncInterval`, `reporterSyncTimeout` no `wdio.conf.js`.

```bash
ERROR @wdio/runner: Error: Some reporters are still unsynced: SlackReporter
```

```js
//wdio.conf.js
export.config = {
  //
  // Determina em qual intervalo o reporter deve verificar se estão sincronizados se eles relatam seus logs de forma assíncrona (por exemplo, se os logs são transmitidos para um fornecedor de terceiros).
  reporterSyncInterval: 500,
  // Determina o tempo máximo que os reporters têm para terminar de fazer o upload de todos os seus logs até que um erro seja lançado pelo testrunner.
  reporterSyncTimeout: 20000,
}
```

### Opção do Jasmine - expectationResultHandler

Adicionar a função uploadFailedTestScreenshot aqui também não funciona.  
Isso porque a função funciona após cada teste, então o teste atual é desconhecido.

```js
// wdio.conf.js
export.config = {
  jasmineOpts: {
    // Timeout padrão do Jasmine
    defaultTimeoutInterval: 60000,
    //
    // O framework Jasmine permite a interceptação de cada asserção para registrar o estado da aplicação
    // ou website dependendo do resultado. Por exemplo, é bastante útil tirar uma captura de tela toda vez
    // que uma asserção falha.
    expectationResultHandler: function (passed, assertion) {
      if (passed) {
        return;
      }
      /*
        Adicionar a função uploadFailedTestScreenshot aqui também não funciona.
        Isso porque a função funciona após cada teste, então o teste atual é desconhecido.

        [x] const result = await browser.takeScreenshot();
        [x] SlackReporter.uploadFailedTestScreenshot(result);
      */
    },
  },

  // Adicione aqui.
  afterTest: async function (test, context, result) {
    if (result.error) {
      const result = await browser.takeScreenshot();
      SlackReporter.uploadFailedTestScreenshot(result);
    }
  }
}
```