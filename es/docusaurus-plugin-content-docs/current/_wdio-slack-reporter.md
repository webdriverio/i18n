---
id: wdio-slack-reporter
title: Reporter de Slack
custom_edit_url: https://github.com/morooLee/wdio-slack-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-reporter es un paquete de terceros, para más información por favor consulte [GitHub](https://github.com/morooLee/wdio-slack-reporter) | [npm](https://www.npmjs.com/package/@moroo/wdio-slack-reporter)

![version](https://img.shields.io/npm/v/@moroo/wdio-slack-reporter?color=%23CB3837&label=latest)
![downloads](https://img.shields.io/npm/dw/@moroo/wdio-slack-reporter?color=%23CB3837&)
![license](https://img.shields.io/npm/l/@moroo/wdio-slack-reporter)
![webdriverio](https://img.shields.io/static/v1?color=EA5906&label=WebdriverIO&message=>=8.0&logo=webdriverio)

Reporter de [WebdriverIO](https://webdriver.io/) que utiliza [Incoming webhook](https://api.slack.com/incoming-webhooks) y [Web API](https://api.slack.com/web) para enviar resultados a [Slack](https://slack.com/).

## 📢 Aviso Importante

### Migración a [filesUploadV2](https://tools.slack.dev/node-slack-sdk/web-api/#upload-a-file) debido a la [obsolescencia de files.upload](https://api.slack.com/changelog/2024-04-a-better-way-to-upload-files-is-here-to-stay)

## Captura de pantalla de notificación en Slack

<img src="https://raw.githubusercontent.com/morooLee/wdio-slack-reporter/master/docs/Notification.png" width="80%" height="80%" title="Notification Image" alt="Notification"></img>

## Política de Soporte de Versiones de WebdriverIO

> Las versiones de WebdriverIO soportadas en este proyecto siguen la política de soporte de WebdriverIO.
> La política de soporte de WebdriverIO puede consultarse [aquí](https://webdriver.io/versions).

## Instalación

La forma más sencilla es mantener `@moroo/wdio-slack-reporter` como una devDependency en tu `package.json`.

```json
{
  "devDependencies": {
    "@moroo/wdio-slack-reporter": "^9.0.0"
  }
}
```

Puedes hacerlo simplemente con:

- NPM

```bash
npm install @moroo/wdio-slack-reporter --save-dev
```

- Yarn

```bash
yarn add -D @moroo/wdio-slack-reporter
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí](https://webdriver.io/docs/gettingstarted.html).

## Configuración

Para utilizar el reporter, necesitas añadir slack a tu array de reporters en wdio.conf.js

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

## Opciones de Configuración

Se admiten las siguientes opciones de configuración.
Para que se envíen notificaciones, debes configurar `webhook` o `web-api`.
Si se configuran tanto `web-api` como `webhook`, se utilizará `web-api`.

### Webhook (Incoming Webhook)

#### **webhook (`Obligatorio`)**

[**Incoming Webhook**](https://api.slack.com/incoming-webhooks) del canal de Slack al que se deben enviar las notificaciones. Si la URL no está configurada, no se enviarán notificaciones.

- Ámbito: `webhook`
- Tipo: `string`

#### **username (`Opcional`)**

El valor de username aparecerá en la notificación de Slack como el usuario que la envió.

- Ámbito: `webhook`
- Tipo: `string`
- Predeterminado: `"WebdriverIO Reporter"`

#### **icon_url (`Opcional`)**

La URL del icono que se mostrará en Slack

- Ámbito: `webhook`
- Tipo: `string`
- Predeterminado: `"https://webdriver.io/img/webdriverio.png"`

> [!TIP]
> Además de estos, también se pueden utilizar todas las opciones definidas en la especificación de [Slack Incoming Webhook](https://www.npmjs.com/package/@slack/webhook).

### Web API (Slack Bot)

#### **token (`Obligatorio`)**

[**Web API**](https://api.slack.com/web) del canal de Slack al que se deben enviar las notificaciones. Se requiere [un token de usuario bot](https://api.slack.com/legacy/oauth#bots). Los tokens de acceso del bot siempre comienzan con `xoxb`.
El token del bot requiere el ámbito OAuth de [`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write).
[Ver más abajo](https://api.slack.com/methods/chat.postMessage#text_usage) para más detalles.

- Ámbito: `web-api`
- Tipo: `string`

#### **channel (`Obligatorio`)**

Canal, grupo privado o canal IM al que enviar el mensaje. Puede ser un ID codificado o un nombre. [Ver más abajo](https://api.slack.com/legacy/oauth-scopes) para más detalles.
[_`"Cómo encontrar el ID del canal" - stackoverflow -`_](https://stackoverflow.com/questions/57139545/how-can-i-see-slack-bot-info-like-user-id-and-bot-id-without-making-api-call)

- Ámbito: `web-api`
- Tipo: `string`

> [!TIP]
> Además de estos, también se pueden utilizar todas las opciones definidas en la especificación de [Slack Web API](https://www.npmjs.com/package/@slack/web-api).

#### **uploadScreenshotOfFailedCase (`Opcional`)**

Establece esta opción en true para adjuntar una captura de pantalla al caso fallido.

- Ámbito: `web-api`
- Tipo: `boolean`
- Predeterminado: `true`

#### **notifyDetailResultThread (`Opcional`)**

> Esta opción solo funciona cuando la opción notifyTestFinishMessage es true.

Establece esta opción en true si deseas añadir un hilo con detalles de resultados a la notificación de resultados de la prueba publicada en Slack.

- Ámbito: `web-api`
- Tipo: `boolean`
- Predeterminado: `true`

#### **filterForDetailResults (`Opcional`)**

> Esta opción solo funciona cuando la opción notifyDetailResultThread es true.

Añade el filtro que deseas a esta opción en el array y los resultados detallados se filtrarán en Slack y se enviarán al hilo.
_(Si no hay filtros (el array está vacío o indefinido), se aplican todos los filtros.)_
**Lista de filtros**: `passed`, `failed`, `pending`, `skipped`

- Ámbito: `web-api`
- Tipo: `array (passed | failed | pending | skipped)`
- Predeterminado: `['passed', 'failed', 'pending', 'skipped']`

#### **createScreenshotPayload (`Opcional`)**

Esta opción personaliza la carga que se sube de la captura de pantalla para el fallo de la prueba.

- Ámbito: `web-api`
- Tipo: `function`

#### **createResultDetailPayload (`Opcional`)**

Esta opción personaliza la carga que se notifica de los resultados detallados de la prueba.

- Ámbito: `web-api`
- Tipo: `function`

### Común

#### **title (`Opcional`)**

Establece esta opción para el título de la prueba.

- Ámbito: `webhook`, `web-api`
- Tipo: `string`

#### **resultsUrl (`Opcional`)**

Proporciona un enlace a los resultados de la prueba. Es un enlace en el que se puede hacer clic en la notificación.

- Ámbito: `webhook`, `web-api`
- Tipo: `string`

#### **notifyTestStartMessage (`Opcional`)**

Establece esta opción en true para enviar notificaciones al inicio de la prueba.

- Ámbito: `webhook`, `web-api`
- Tipo: `boolean`
- Predeterminado: `true`

#### **notifyFailedCase (`Opcional`)**

Establece esta opción en true para adjuntar casos fallidos en los resultados de la prueba informados a Slack.

- Ámbito: `webhook`, `web-api`
- Tipo: `boolean`
- Predeterminado: `true`

#### **notifyTestFinishMessage (`Opcional`)**

Establece esta opción en true para enviar notificaciones al finalizar la prueba.

- Ámbito: `webhook`, `web-api`
- Tipo: `boolean`
- Predeterminado: `true`

#### **useScenarioBasedStateCounts (`Opcional`) - Solo Cucumber**

Establece esta opción en true para cambiar el recuento de estados basado en pruebas (pasos) a basado en escenarios. (Solo Cucumber)

- Ámbito: `webhook`, `web-api`
- Tipo: `boolean`
- Predeterminado: `false`

#### **emojiSymbols (`Opcional`)**

Esta opción cambia el conjunto de emojis predeterminado.

- Ámbito: `webhook`, `web-api`
- Tipo: `object`
- Predeterminado:
  - passed - ✅ `:white_check_mark:`
  - failed - ❌ `:x:`
  - skipped - ⏸ `:double_vertical_bar:`
  - pending - ❔ `:grey_question:`
  - start - 🚀 `:rocket:`
  - finished - 🏁 `:checkered_flag:`
  - watch - ⏱ `:stopwatch:`

#### **createStartPayload (`Opcional`)**

Esta opción personaliza la carga que se notifica al inicio de la prueba.

- Ámbito: `webhook`, `web-api`
- Tipo: `function`

#### **createFailedTestPayload (`Opcional`)**

Esta opción personaliza la carga que se notifica en caso de fallo de la prueba.

- Ámbito: `webhook`, `web-api`
- Tipo: `function`

#### **createResultPayload (`Opcional`)**

Esta opción personaliza la carga que se notifica de los resultados de la prueba.

- Ámbito: `webhook`, `web-api`
- Tipo: `function`

## Usar el Incoming Webhook

Si estás utilizando webhook, no puedes usar hilos ni cargar.  
Por lo tanto, las funciones relacionadas con `upload` y `thread` no están disponibles.

### Ejemplo de Configuración

```js
// wdio.conf.js
import SlackReporter from "@moroo/wdio-slack-reporter";

export.config = {
  reporters: [
    [
      SlackReporter, {
        // Configurar las opciones de Slack utilizando webhook.
        slackOptions: {
          type: 'webhook',
          webhook: process.env.SLACK_WEBHOOK_URL || "https://hooks.slack.com/........",
          username: "WebdriverIO Reporter",
          "icon-url": "https://webdriver.io/img/webdriverio.png",
        },
        // Establecer el Título de la Prueba.
        title: 'Slack Reporter Test',
        // Establecer la URL de los Resultados de la Prueba.
        resultsUrl: process.env.JENKINS_URL,
        // Establecer la notificación de Prueba Terminada
        notifyTestFinishMessage: true,
        // Establecer el recuento de estados basado en escenarios (Solo Cucumber)
        useScenarioBasedStateCounts: true,
        // Personalizar Símbolos de Emoji de Slack.
        emojiSymbols: {
          passed: ':white_check_mark:',
          failed: ':x:',
          skipped: ':double_vertical_bar:',
          pending: ':grey_question:',
          start: ':rocket:',
          finished: ':checkered_flag:',
          watch: ':stopwatch:'
        },
        // Sobrescribir la función createStartPayload.
        createStartPayload: function (runnerStats: RunnerStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // hacer algo...
          }
          return payload;
        },
        // Sobrescribir la función createFailedTestPayload.
        createFailedTestPayload: function (testStats: TestStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // hacer algo...
          }
          return payload;
        },
        // Sobrescribir la función createResultPayload.
        createResultPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // hacer algo...
          }
          return payload;
        }
      }
    ],
  ],
};
```

## Usar la Web API

Para utilizar la API, necesitas ámbitos como los siguientes.  
[`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write). [Ver más abajo](https://api.slack.com/legacy/oauth-scopes) para más detalles.  

### Ejemplo de Configuración

```js
// wdio.conf.js
import SlackReporter from "@moroo/wdio-slack-reporter";

export.config = {
  reporters: [
    [
      SlackReporter, {
        // Configurar las opciones de Slack utilizando web-api.
        slackOptions: {
          type: 'web-api',
          token: process.env.SLACK_BOT_TOKEN || "xoxb-xxxxxxxxxx-xxxxxx...",,
          channel: process.env.SLACK_CHANNEL || "Cxxxxxxxxxx",
          // Establece esta opción en true para adjuntar una captura de pantalla al caso fallido.
          uploadScreenshotOfFailedCase: true,
          // Establece esta opción en true si deseas añadir un hilo con detalles de resultados a la notificación de resultados de la prueba publicada en Slack.
          notifyDetailResultThread: true,
          // Establece el Filtro para resultados detallados. (si el array está vacío o indefinido, se aplican todos los filtros.)
          filterForDetailResults: [
            'passed',
            'failed',
            'pending',
            'skipped'
          ],
          // Sobrescribir la función createScreenshotPayload.
          createScreenshotPayload: function (testStats: TestStats, screenshotBuffer: string | Buffer<ArrayBufferLike>): FilesUploadArguments {
            const payload: FilesUploadArguments = {
              // hacer algo...
            }
            return payload;
          },
          // Sobrescribir la función createResultDetailPayload.
          createResultDetailPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): ChatPostMessageArguments {
            const payload: ChatPostMessageArguments = {
              // hacer algo...
            }
            return payload;
          }
        },
        // Establecer el Título de la Prueba.
        title: 'Slack Reporter Test',
        // Establecer la URL de los Resultados de la Prueba.
        resultsUrl: process.env.JENKINS_URL,
        // Establecer la notificación de Prueba Terminada
        notifyTestFinishMessage: true,
        // Establecer el recuento de estados basado en escenarios (Solo Cucumber)
        useScenarioBasedStateCounts: true,
        // Personalizar Símbolos de Emoji de Slack.
        emojiSymbols: {
          passed: ':white_check_mark:',
          failed: ':x:',
          skipped: ':double_vertical_bar:',
          pending: ':grey_question:',
          start: ':rocket:',
          finished: ':checkered_flag:',
          watch: ':stopwatch:'
        },
        // Sobrescribir la función createStartPayload.
        createStartPayload: function (runnerStats: RunnerStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // hacer algo...
          }
          return payload;
        },
        // Sobrescribir la función createFailedTestPayload.
        createFailedTestPayload: function (testStats: TestStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // hacer algo...
          }
          return payload;
        },
        // Sobrescribir la función createResultPayload.
        createResultPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // hacer algo...
          }
          return payload;
        }
      }
    ],
  ],
};
```

## API Soportada

### getResultsUrl

> **tipo**: `() => string | undefined`

Obtiene la URL de los resultados.

```js
// getResultsUrl.spec.ts
import SlackReporter from '@moroo/wdio-slack-reporter';

describe('Obtener el valor de resultsUrl', function () {
  before(function () {
    const resultsUrl = SlackReporter.getResultsUrl();
    if (resultsUrl) {
      // hacer algo...
    }
  });
  it('Hacer algo', function () {
    // hacer algo...
  });
});
```

### setResultsUrl

> **tipo**: `(url: string) => void`

Establece la URL de los resultados.  
_(Esto es útil si la URL con los resultados de la prueba cambia cada vez.)_

```js
// setResultsUrl.spec.ts
import SlackReporter from '@moroo/wdio-slack-reporter';
import { RESULTS_URL } from '../constants';

describe('Establecer el valor de resultsUrl', function () {
  before(function () {
    const resultsUrl = RESULTS_URL + new Date().toISOString();
    SlackReporter.setResultsUrl(resultsUrl);
  });
  it('Hacer algo', function () {
    // hacer algo...
  });
});
```

### uploadFailedTestScreenshot

> **tipo**: `(data: string | Buffer<ArrayBufferLike>) => void`

Añade una captura de pantalla como un hilo a la notificación de prueba fallida.  
_**(Si estás utilizando un webhook, esto mostrará una advertencia y no hará nada.)**_

```bash
// consola de terminal
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

Publica un mensaje en Slack.  
_**(Si estás utilizando un webhook, esto generará un error.)**_

```bash
// consola de terminal
ERROR @moroo/slack-wdio-reporter: Not using web-api.
```

```js
// post.spec.ts
import SlackReporter, {
  ChatPostMessageArguments,
  WebAPICallResult,
} from '@moroo/wdio-slack-reporter';

describe('Test de la Función Post', function () {
  it('Publicar un mensaje', async function () {
    const payload: ChatPostMessageArguments = {
      // hacer algo...
    };
    const result: WebAPICallResult = await SlackReporter.post(payload);
  });
});
```

### upload

> **tipo**: `({ payload: FilesUploadArguments; options: FilesUploadV2Options }) => Promise<WebAPICallResult & {files: FilesCompleteUploadExternalResponse[];}>`

Sube un archivo a Slack.  
_**(Si estás utilizando un webhook, esto generará un error.)**_

```bash
// consola de terminal
ERROR @moroo/slack-wdio-reporter: Not using web-api.
```

```js
// upload.spec.ts
import SlackReporter, {
  FilesUploadArguments,
  WebAPICallResult,
} from '@moroo/wdio-slack-reporter';

describe('Test de la Función Upload', function () {
  it('Subir archivos', async function () {
    const payload: FilesUploadArguments = {
      // hacer algo...
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

Envía un mensaje a Slack.  
_**(Si estás utilizando web-api, esto generará un error.)**_

```bash
// consola de terminal
ERROR @moroo/slack-wdio-reporter: Not using webhook.
```

```js
// send.spec.ts
import SlackReporter, {
  IncomingWebhookSendArguments,
  IncomingWebhookResult,
} from '@moroo/wdio-slack-reporter';

describe('Test de la Función Send', function () {
  it('Enviar un mensaje', async function () {
    const payload: IncomingWebhookSendArguments = {
      // hacer algo...
    };
    const result: IncomingWebhookResult = await SlackReporter.send(payload);
  });
});
```

## Añadir Captura de Pantalla

Si deseas añadir una captura de pantalla como un hilo a la notificación de prueba fallida, añade la función `uploadFailedTestScreenshot` después de tomar la captura de pantalla.

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

## Problemas Conocidos

### No sincronizado

Si ocurre el siguiente error, establece `reporterSyncInterval`, `reporterSyncTimeout` en `wdio.conf.js`.

```bash
ERROR @wdio/runner: Error: Some reporters are still unsynced: SlackReporter
```

```js
//wdio.conf.js
export.config = {
  //
  // Determina en qué intervalo el reporter debe verificar si están sincronizados si informan sus registros de forma asíncrona (por ejemplo, si los registros se transmiten a un proveedor externo).
  reporterSyncInterval: 500,
  // Determina el tiempo máximo que tienen los reporters para terminar de cargar todos sus registros hasta que el testrunner genera un error.
  reporterSyncTimeout: 20000,
}
```

### Opción de Jasmine - expectationResultHandler

Agregar la función uploadFailedTestScreenshot aquí tampoco funciona.  
Esto se debe a que la función funciona después de cada prueba, por lo que la prueba actual es desconocida.

```js
// wdio.conf.js
export.config = {
  jasmineOpts: {
    // Jasmine default timeout
    defaultTimeoutInterval: 60000,
    //
    // El framework Jasmine permite la intercepción de cada afirmación para registrar el estado de la aplicación
    // o el sitio web dependiendo del resultado. Por ejemplo, es bastante útil tomar una captura de pantalla cada vez
    // que una afirmación falla.
    expectationResultHandler: function (passed, assertion) {
      if (passed) {
        return;
      }
      /*
        Agregar la función uploadFailedTestScreenshot aquí tampoco funciona.
        Esto se debe a que la función funciona después de cada prueba, por lo que la prueba actual es desconocida.

        [x] const result = await browser.takeScreenshot();
        [x] SlackReporter.uploadFailedTestScreenshot(result);
      */
    },
  },

  // Agrégalo aquí.
  afterTest: async function (test, context, result) {
    if (result.error) {
      const result = await browser.takeScreenshot();
      SlackReporter.uploadFailedTestScreenshot(result);
    }
  }
}
```