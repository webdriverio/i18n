---
id: wdio-slack-reporter
title: Rapporteur Slack Reporter
custom_edit_url: https://github.com/morooLee/wdio-slack-reporter/edit/master/README.md
---


> wdio-slack-reporter est un package tiers, pour plus d'informations veuillez consulter [GitHub](https://github.com/morooLee/wdio-slack-reporter) | [npm](https://www.npmjs.com/package/@moroo/wdio-slack-reporter)

![version](https://img.shields.io/npm/v/@moroo/wdio-slack-reporter?color=%23CB3837&label=latest)
![downloads](https://img.shields.io/npm/dw/@moroo/wdio-slack-reporter?color=%23CB3837&)
![license](https://img.shields.io/npm/l/@moroo/wdio-slack-reporter)
![webdriverio](https://img.shields.io/static/v1?color=EA5906&label=WebdriverIO&message=>=8.0&logo=webdriverio)

Rapporteur de [WebdriverIO](https://webdriver.io/) utilisant [Incoming webhook](https://api.slack.com/incoming-webhooks) et [Web API](https://api.slack.com/web) pour envoyer les résultats à [Slack](https://slack.com/).

## 📢 Avis Important

### Migration vers [filesUploadV2](https://tools.slack.dev/node-slack-sdk/web-api/#upload-a-file) en raison de la [dépréciation de files.upload](https://api.slack.com/changelog/2024-04-a-better-way-to-upload-files-is-here-to-stay)

## Capture d'écran de notification Slack

<img src="https://raw.githubusercontent.com/morooLee/wdio-slack-reporter/master/docs/Notification.png" width="80%" height="80%" title="Notification Image" alt="Notification"></img>

## Politique de support des versions WebdriverIO

> Les versions WebdriverIO prises en charge dans ce projet suivent la politique de support de WebdriverIO.
> La politique de support de WebdriverIO peut être consultée [ici](https://webdriver.io/versions).

## Installation

La façon la plus simple est de garder `@moroo/wdio-slack-reporter` comme devDependency dans votre `package.json`.

```json
{
  "devDependencies": {
    "@moroo/wdio-slack-reporter": "^9.0.0"
  }
}
```

Vous pouvez simplement le faire par:

- NPM

```bash
npm install @moroo/wdio-slack-reporter --save-dev
```

- Yarn

```bash
yarn add -D @moroo/wdio-slack-reporter
```

Les instructions sur la façon d'installer `WebdriverIO` peuvent être trouvées [ici](https://webdriver.io/docs/gettingstarted.html).

## Configuration

Pour utiliser le rapporteur, vous devez ajouter slack à votre tableau de rapporteurs dans wdio.conf.js

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

## Options de configuration

Les options de configuration suivantes sont prises en charge.
Pour que les notifications soient envoyées, vous devez définir `webhook` ou `web-api`.
Si `web-api` et `webhook` sont tous deux définis, `web-api` est utilisé.

### Webhook (Incoming Webhook)

#### **webhook (`Obligatoire`)**

[**Incoming Webhook**](https://api.slack.com/incoming-webhooks) du canal slack vers lequel les notifications doivent être envoyées. Si l'URL n'est pas configurée, les notifications ne seront pas envoyées.

- Portée: `webhook`
- Type: `string`

#### **username (`Optionnel`)**

La valeur de username apparaîtra dans la notification slack comme l'utilisateur qui l'a envoyée.

- Portée: `webhook`
- Type: `string`
- Défaut: `"WebdriverIO Reporter"`

#### **icon_url (`Optionnel`)**

L'url de l'icône à afficher dans slack

- Portée: `webhook`
- Type: `string`
- Défaut: `"https://webdriver.io/img/webdriverio.png"`

> [!TIP]
> Outre celles-ci, toutes les options définies dans la spécification [Slack Incoming Webhook](https://www.npmjs.com/package/@slack/webhook) peuvent également être utilisées.

### Web API (Slack Bot)

#### **token (`Obligatoire`)**

[**Web API**](https://api.slack.com/web) du canal slack vers lequel les notifications doivent être envoyées. [Un jeton d'utilisateur bot](https://api.slack.com/legacy/oauth#bots) est requis. Les jetons d'accès du bot commencent toujours par `xoxb`.
Le jeton du bot nécessite la portée OAuth de [`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write).
[Voir ci-dessous](https://api.slack.com/methods/chat.postMessage#text_usage) pour plus de détails.

- Portée: `web-api`
- Type: `string`

#### **channel (`Obligatoire`)**

Canal, groupe privé ou canal IM auquel envoyer le message. Peut être un ID encodé ou un nom. [Voir ci-dessous](https://api.slack.com/legacy/oauth-scopes) pour plus de détails.
[_`"Comment trouver l'ID du canal" - stackoverflow -`_](https://stackoverflow.com/questions/57139545/how-can-i-see-slack-bot-info-like-user-id-and-bot-id-without-making-api-call)

- Portée: `web-api`
- Type: `string`

> [!TIP]
> Outre celles-ci, toutes les options définies dans la spécification [Slack Web API](https://www.npmjs.com/package/@slack/web-api) peuvent également être utilisées.

#### **uploadScreenshotOfFailedCase (`Optionnel`)**

Définissez cette option sur true pour joindre une capture d'écran au cas d'échec.

- Portée: `web-api`
- Type: `boolean`
- Défaut: `true`

#### **notifyDetailResultThread (`Optionnel`)**

> Cette option ne fonctionne que lorsque l'option notifyTestFinishMessage est true.

Définissez cette option sur true si vous souhaitez ajouter un thread avec les détails des résultats à la notification des résultats de test publiée sur Slack.

- Portée: `web-api`
- Type: `boolean`
- Défaut: `true`

#### **filterForDetailResults (`Optionnel`)**

> Cette option ne fonctionne que lorsque l'option notifyDetailResultThread est true.

Ajoutez le filtre que vous souhaitez à cette option dans le tableau et les résultats détaillés seront filtrés dans Slack et envoyés au thread.
_(S'il n'y a pas de filtres (tableau vide ou non défini), tous les filtres sont appliqués.)_
**Liste des filtres**: `passed`, `failed`, `pending`, `skipped`

- Portée: `web-api`
- Type: `array (passed | failed | pending | skipped)`
- Défaut: `['passed', 'failed', 'pending', 'skipped']`

#### **createScreenshotPayload (`Optionnel`)**

Cette option personnalise la charge utile qui est téléchargée de la capture d'écran pour l'échec du test.

- Portée: `web-api`
- Type: `function`

#### **createResultDetailPayload (`Optionnel`)**

Cette option personnalise la charge utile qui est notifiée des résultats détaillés du test.

- Portée: `web-api`
- Type: `function`

### Commun

#### **title (`Optionnel`)**

Définissez cette option sur le titre du test.

- Portée: `webhook`, `web-api`
- Type: `string`

#### **resultsUrl (`Optionnel`)**

Fournissez un lien vers les résultats du test. C'est un lien cliquable dans la notification.

- Portée: `webhook`, `web-api`
- Type: `string`

#### **notifyTestStartMessage (`Optionnel`)**

Définissez cette option sur true pour envoyer des notifications de début de test.

- Portée: `webhook`, `web-api`
- Type: `boolean`
- Défaut: `true`

#### **notifyFailedCase (`Optionnel`)**

Définissez cette option sur true pour joindre les cas échoués dans les résultats de test rapportés à Slack.

- Portée: `webhook`, `web-api`
- Type: `boolean`
- Défaut: `true`

#### **notifyTestFinishMessage (`Optionnel`)**

Définissez cette option sur true pour envoyer des notifications de fin de test.

- Portée: `webhook`, `web-api`
- Type: `boolean`
- Défaut: `true`

#### **useScenarioBasedStateCounts (`Optionnel`) - Seulement Cucumber**

Définissez cette option sur true pour changer le comptage d'état de test (étapes) basé à scénario basé. (Seulement Cucumber)

- Portée: `webhook`, `web-api`
- Type: `boolean`
- Défaut: `false`

#### **emojiSymbols (`Optionnel`)**

Cette option change l'ensemble d'emoji défini par défaut.

- Portée: `webhook`, `web-api`
- Type: `object`
- Défaut:
  - passed - ✅ `:white_check_mark:`
  - failed - ❌ `:x:`
  - skipped - ⏸ `:double_vertical_bar:`
  - pending - ❔ `:grey_question:`
  - start - 🚀 `:rocket:`
  - finished - 🏁 `:checkered_flag:`
  - watch - ⏱ `:stopwatch:`

#### **createStartPayload (`Optionnel`)**

Cette option personnalise la charge utile qui est notifiée au début du test.

- Portée: `webhook`, `web-api`
- Type: `function`

#### **createFailedTestPayload (`Optionnel`)**

Cette option personnalise la charge utile qui est notifiée lors de l'échec du test.

- Portée: `webhook`, `web-api`
- Type: `function`

#### **createResultPayload (`Optionnel`)**

Cette option personnalise la charge utile qui est notifiée des résultats du test.

- Portée: `webhook`, `web-api`
- Type: `function`

## Utiliser l'Incoming Webhook

Si vous utilisez webhook, vous ne pouvez pas utiliser les fils de discussion et le téléchargement.  
Par conséquent, les fonctions liées à `upload` et `thread` ne sont pas disponibles.

### Exemple de configuration

```js
// wdio.conf.js
import SlackReporter from "@moroo/wdio-slack-reporter";

export.config = {
  reporters: [
    [
      SlackReporter, {
        // Définir les options Slack utilisées pour webhook.
        slackOptions: {
          type: 'webhook',
          webhook: process.env.SLACK_WEBHOOK_URL || "https://hooks.slack.com/........",
          username: "WebdriverIO Reporter",
          "icon-url": "https://webdriver.io/img/webdriverio.png",
        },
        // Définir le titre du test.
        title: 'Slack Reporter Test',
        // Définir l'URL des résultats de test.
        resultsUrl: process.env.JENKINS_URL,
        // Définir la notification de fin de test
        notifyTestFinishMessage: true,
        // Définir le comptage d'état basé sur les scénarios (Seulement Cucumber)
        useScenarioBasedStateCounts: true,
        // Personnaliser les symboles Emoji Slack.
        emojiSymbols: {
          passed: ':white_check_mark:',
          failed: ':x:',
          skipped: ':double_vertical_bar:',
          pending: ':grey_question:',
          start: ':rocket:',
          finished: ':checkered_flag:',
          watch: ':stopwatch:'
        },
        // Remplacer la fonction createStartPayload.
        createStartPayload: function (runnerStats: RunnerStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // faire quelque chose...
          }
          return payload;
        },
        // Remplacer la fonction createFailedTestPayload.
        createFailedTestPayload: function (testStats: TestStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // faire quelque chose...
          }
          return payload;
        },
        // Remplacer la fonction createResultPayload.
        createResultPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // faire quelque chose...
          }
          return payload;
        }
      }
    ],
  ],
};
```

## Utiliser la Web API

Pour utiliser l'API, vous avez besoin de portées comme celle ci-dessous.  
[`chat:write`](https://api.slack.com/scopes/chat:write), [`files:write`](https://api.slack.com/scopes/files:write). [Voir ci-dessous](https://api.slack.com/legacy/oauth-scopes) pour plus de détails.  

### Exemple de configuration

```js
// wdio.conf.js
import SlackReporter from "@moroo/wdio-slack-reporter";

export.config = {
  reporters: [
    [
      SlackReporter, {
        // Définir les options Slack utilisées pour web-api.
        slackOptions: {
          type: 'web-api',
          token: process.env.SLACK_BOT_TOKEN || "xoxb-xxxxxxxxxx-xxxxxx...",,
          channel: process.env.SLACK_CHANNEL || "Cxxxxxxxxxx",
          // Définissez cette option sur true pour joindre une capture d'écran au cas d'échec.
          uploadScreenshotOfFailedCase: true,
          // Définissez cette option sur true si vous souhaitez ajouter un thread avec des détails de résultats à la notification des résultats de test publiée sur Slack.
          notifyDetailResultThread: true,
          // Définir le filtre pour les résultats détaillés. (tableau vide ou non défini, tous les filtres sont appliqués.)
          filterForDetailResults: [
            'passed',
            'failed',
            'pending',
            'skipped'
          ],
          // Remplacer la fonction createScreenshotPayload.
          createScreenshotPayload: function (testStats: TestStats, screenshotBuffer: string | Buffer<ArrayBufferLike>): FilesUploadArguments {
            const payload: FilesUploadArguments = {
              // faire quelque chose...
            }
            return payload;
          },
          // Remplacer la fonction createResultDetailPayload.
          createResultDetailPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): ChatPostMessageArguments {
            const payload: ChatPostMessageArguments = {
              // faire quelque chose...
            }
            return payload;
          }
        },
        // Définir le titre du test.
        title: 'Slack Reporter Test',
        // Définir l'URL des résultats de test.
        resultsUrl: process.env.JENKINS_URL,
        // Définir la notification de fin de test
        notifyTestFinishMessage: true,
        // Définir le comptage d'état basé sur les scénarios (Seulement Cucumber)
        useScenarioBasedStateCounts: true,
        // Personnaliser les symboles Emoji Slack.
        emojiSymbols: {
          passed: ':white_check_mark:',
          failed: ':x:',
          skipped: ':double_vertical_bar:',
          pending: ':grey_question:',
          start: ':rocket:',
          finished: ':checkered_flag:',
          watch: ':stopwatch:'
        },
        // Remplacer la fonction createStartPayload.
        createStartPayload: function (runnerStats: RunnerStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // faire quelque chose...
          }
          return payload;
        },
        // Remplacer la fonction createFailedTestPayload.
        createFailedTestPayload: function (testStats: TestStats): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // faire quelque chose...
          }
          return payload;
        },
        // Remplacer la fonction createResultPayload.
        createResultPayload: function (runnerStats: RunnerStats, stateCounts: StateCount): IncomingWebhookSendArguments {
          const payload: IncomingWebhookSendArguments = {
            // faire quelque chose...
          }
          return payload;
        }
      }
    ],
  ],
};
```

## API prise en charge

### getResultsUrl

> **type**: `() => string | undefined`

Obtenir l'URL des résultats.

```js
// getResultsUrl.spec.ts
import SlackReporter from '@moroo/wdio-slack-reporter';

describe('Obtenir la valeur resultsUrl', function () {
  before(function () {
    const resultsUrl = SlackReporter.getResultsUrl();
    if (resultsUrl) {
      // faire quelque chose...
    }
  });
  it('Faire quelque chose', function () {
    // faire quelque chose...
  });
});
```

### setResultsUrl

> **type**: `(url: string) => void`

Définir l'URL des résultats.  
_(Ceci est utile si l'URL avec les résultats de test change à chaque fois.)_

```js
// setResultsUrl.spec.ts
import SlackReporter from '@moroo/wdio-slack-reporter';
import { RESULTS_URL } from '../constants';

describe('Définir la valeur resultsUrl', function () {
  before(function () {
    const resultsUrl = RESULTS_URL + new Date().toISOString();
    SlackReporter.setResultsUrl(resultsUrl);
  });
  it('Faire quelque chose', function () {
    // faire quelque chose...
  });
});
```

### uploadFailedTestScreenshot

> **type**: `(data: string | Buffer<ArrayBufferLike>) => void`

Ajouter une capture d'écran en tant que thread à la notification de test échoué.  
_**(Si vous utilisez un webhook, cela affichera un avertissement et ne fera rien.)**_

```bash
// console du terminal
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

Publier un message sur Slack.  
_**(Si vous utilisez un webhook, cela générera une erreur.)**_

```bash
// console du terminal
ERROR @moroo/slack-wdio-reporter: Not using web-api.
```

```js
// post.spec.ts
import SlackReporter, {
  ChatPostMessageArguments,
  WebAPICallResult,
} from '@moroo/wdio-slack-reporter';

describe('Test de la fonction Post', function () {
  it('Publier un message', async function () {
    const payload: ChatPostMessageArguments = {
      // faire quelque chose...
    };
    const result: WebAPICallResult = await SlackReporter.post(payload);
  });
});
```

### upload

> **type**: `({ payload: FilesUploadArguments; options: FilesUploadV2Options }) => Promise<WebAPICallResult & {files: FilesCompleteUploadExternalResponse[];}>`

Télécharger un fichier sur Slack.  
_**(Si vous utilisez un webhook, cela générera une erreur.)**_

```bash
// console du terminal
ERROR @moroo/slack-wdio-reporter: Not using web-api.
```

```js
// upload.spec.ts
import SlackReporter, {
  FilesUploadArguments,
  WebAPICallResult,
} from '@moroo/wdio-slack-reporter';

describe('Test de la fonction Upload', function () {
  it('Télécharger des fichiers', async function () {
    const payload: FilesUploadArguments = {
      // faire quelque chose...
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

Envoyer un message à Slack.  
_**(Si vous utilisez une web-api, cela générera une erreur.)**_

```bash
// console du terminal
ERROR @moroo/slack-wdio-reporter: Not using webhook.
```

```js
// send.spec.ts
import SlackReporter, {
  IncomingWebhookSendArguments,
  IncomingWebhookResult,
} from '@moroo/wdio-slack-reporter';

describe('Test de la fonction Send', function () {
  it('Envoyer un message', async function () {
    const payload: IncomingWebhookSendArguments = {
      // faire quelque chose...
    };
    const result: IncomingWebhookResult = await SlackReporter.send(payload);
  });
});
```

## Ajouter une capture d'écran

Si vous souhaitez ajouter une capture d'écran en tant que thread à la notification de test échoué, ajoutez la fonction `uploadFailedTestScreenshot` après avoir pris la capture d'écran.

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

## Problèmes connus

### Non synchronisé

Si l'erreur suivante se produit, définissez `reporterSyncInterval`, `reporterSyncTimeout` dans `wdio.conf.js`.

```bash
ERROR @wdio/runner: Error: Some reporters are still unsynced: SlackReporter
```

```js
//wdio.conf.js
export.config = {
  //
  // Détermine à quel intervalle le rapporteur doit vérifier s'ils sont synchronisés s'ils rapportent leurs journaux de manière asynchrone (par exemple, si les journaux sont diffusés vers un fournisseur tiers).
  reporterSyncInterval: 500,
  // Détermine le temps maximum dont disposent les rapporteurs pour terminer le téléchargement de tous leurs journaux jusqu'à ce qu'une erreur soit générée par le testrunner.
  reporterSyncTimeout: 20000,
}
```

### Option Jasmine - expectationResultHandler

L'ajout de la fonction uploadFailedTestScreenshot ici ne fonctionne pas non plus.  
C'est parce que la fonction fonctionne après chaque test, donc le test actuel est inconnu.

```js
// wdio.conf.js
export.config = {
  jasmineOpts: {
    // Délai d'attente par défaut de Jasmine
    defaultTimeoutInterval: 60000,
    //
    // Le framework Jasmine permet l'interception de chaque assertion afin de journaliser l'état de l'application
    // ou du site Web en fonction du résultat. Par exemple, il est assez pratique de prendre une capture d'écran chaque fois
    // qu'une assertion échoue.
    expectationResultHandler: function (passed, assertion) {
      if (passed) {
        return;
      }
      /*
        L'ajout de la fonction uploadFailedTestScreenshot ici ne fonctionne pas non plus.
        C'est parce que la fonction fonctionne après chaque test, donc le test actuel est inconnu.

        [x] const result = await browser.takeScreenshot();
        [x] SlackReporter.uploadFailedTestScreenshot(result);
      */
    },
  },

  // Ajoutez-le ici.
  afterTest: async function (test, context, result) {
    if (result.error) {
      const result = await browser.takeScreenshot();
      SlackReporter.uploadFailedTestScreenshot(result);
    }
  }
}
```