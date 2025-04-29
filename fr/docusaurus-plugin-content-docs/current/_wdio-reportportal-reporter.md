---
id: wdio-reportportal-reporter
title: Reporter Report Portal
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-reporter est un package tiers, pour plus d'informations, veuillez consulter [GitHub](https://github.com/borisosipov/wdio-reportportal-reporter) | [npm](https://www.npmjs.com/package/wdio-reportportal-reporter)


![npm](https://img.shields.io/npm/v/wdio-reportportal-reporter)
![npm](https://img.shields.io/npm/dm/wdio-reportportal-reporter)
> Un plugin de reporter WebdriverIO pour rapporter les résultats à Report Portal([http://reportportal.io/](http://reportportal.io/)).

## Installation

La façon la plus simple est de garder `wdio-reportportal-reporter` et `wdio-reportportal-service` comme devDependency dans votre `package.json`.

```json
{
  "devDependencies": {
    "wdio-reportportal-reporter": "^7.0.0",
    "wdio-reportportal-service": "^7.0.0"
  }
}
```

Les instructions sur l'installation de `WebdriverIO` peuvent être trouvées [ici](https://webdriver.io/docs/gettingstarted.html).

## Configuration

Configurez le répertoire de sortie dans votre fichier wdio.conf.js :

```js
const reportportal = require('wdio-reportportal-reporter');
const RpService = require("wdio-reportportal-service");

const conf = {
  reportPortalClientConfig: { // report portal settings
    token: '00000000-0000-0000-0000-00000000000',
    endpoint: 'https://reportportal-url/api/v1',
    launch: 'launch_name',
    project: 'project_name',
    mode: 'DEFAULT',
    debug: false,
    description: "Launch description text",
    attributes: [{key:"tag", value: "foo"}],
    headers: {"foo": "bar"}, // optional headers for internal http client
    restClientConfig: { // axios like http client config - https://github.com/axios/axios#request-config
      proxy: {
        protocol: 'https',
        host: '127.0.0.1',
        port: 9000,
        auth: {
          username: 'mikeymike',
          password: 'rapunz3l'
        }
      },
      timeout: 60000
    }
  },
  reportSeleniumCommands: false, // add selenium commands to log
  seleniumCommandsLogLevel: 'debug', // log level for selenium commands
  autoAttachScreenshots: false, // automatically add screenshots
  screenshotsLogLevel: 'info', // log level for screenshots
  parseTagsFromTestTitle: false, // parse strings like `@foo` from titles and add to Report Portal
  cucumberNestedSteps: false, // report cucumber steps as Report Portal steps
  autoAttachCucumberFeatureToScenario: false, // requires cucumberNestedSteps to be true for use
  sanitizeErrorMessages: true, // strip color ascii characters from error stacktrace
  sauceLabOptions : {
    enabled: true, // automatically add SauseLab ID to rp tags.
    sldc: "US" // automatically add SauseLab region to rp tags.
  }
};

exports.config = {
  // ...
  services: [[RpService, {}]],
  reporters: [[reportportal, conf]],
  // ...
};
```

# API supplémentaire

Les méthodes de l'API peuvent être accessibles en utilisant :

```js
const reporter = require('wdio-reportportal-reporter')
```

### Description des méthodes

* `reporter.addAttribute({key, value})` – ajouter un attribut au test courant.
  * `key` (*string*, facultatif) - clé d'attribut. Ce doit être une chaîne non vide.
  * `value` (*string*, obligatoire) - valeur d'attribut. Ce doit être une chaîne non vide.
* `reporter.addAttributeToCurrentSuite({key, value})` - ajouter un attribut à la suite courante.
  * `key` (*string*, facultatif) - clé d'attribut. Ce doit être une chaîne non vide.
  * `value` (*string*, obligatoire) - valeur d'attribut. Ce doit être une chaîne non vide.
* `reporter.addDescriptionToCurrentSuite(description)` - ajouter une chaîne à la suite courante.
  * `description` (*string*) - contenu de la description. Le texte peut être formaté avec markdown.
* `reporter.addDescriptionToAllSuites(description)` - ajouter une chaîne à toutes les suites à venir. (Utilisez-le dans le hook before all, afin que chaque suite obtienne la même description)
  * `description` (*string*) - contenu de la description. Le texte peut être formaté avec markdown.
* `reporter.sendLog(level, message)` – envoyer un journal à l'élément suite/test courant.
  * `level` (*string*) - niveau de journal. Valeurs ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*) – contenu du message de journal.
* `reporter.sendFile(level, name, content, [type])` – envoyer un fichier à l'élément suite/test courant.
  * `level` (*string*) - niveau de journal. Valeurs ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*) – nom du fichier.
  * `content` (*string*) – contenu de la pièce jointe
  * `type` (*string*, facultatif) – MIME-type de la pièce jointe, par défaut `image/png`
  * `message` (*string*) – contenu du message de journal.
* `reporter.sendLogToTest(test, level, message)` - envoyer un journal à un test spécifique.
  * `test` (*object*) - objet de test du hook wdio `afterTest\afterStep`
  * `level` (*string*) - niveau de journal. Valeurs ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*) – contenu du message de journal.
* `reporter.sendFileToTest(test, level, name, content, [type])` – envoyer un fichier à un test spécifique.
  * `test` (*object*) - objet de test du hook wdio `afterTest\afterStep`
  * `level` (*string*) - niveau de journal. Valeurs ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*) – nom du fichier.
  * `content` (*string*) – contenu de la pièce jointe
  * `type` (*string*, facultatif) – MIME-type de la pièce jointe, par défaut `image/png`
  * `message` (*string*) – contenu du message de journal.

Attention : `sendLog`\\`sendFile` envoie le journal à **l'élément de test en cours d'exécution**. Cela signifie que si vous envoyez un journal sans test actif (par exemple à partir de hooks ou au niveau de la suite), il ne sera pas affiché dans l'interface de Report Portal.

Les méthodes `sendLogToTest`\\`sendFileToTest` sont utiles lorsque vous devez envoyer des captures d'écran ou des journaux à l'élément de test ayant échoué à partir du hook afterTest de wdio.

Exemple Mocha :

```js
const reportportal = require('wdio-reportportal-reporter');
const path = require('path');
const fs = require('fs');

exports.config = {
...
  async afterTest(test) {
    if (test.passed === false) {
      const filename = "screnshot.png";
      const outputFile = path.join(__dirname, filename);
      await browser.saveScreenshot(outputFile);
      reportportal.sendFileToTest(test, 'info', filename, fs.readFileSync(outputFile));
    }
  }
...
```

Exemple Jasmine :

```js
const reportportal = require('wdio-reportportal-reporter');
const path = require('path');
const fs = require('fs');

exports.config = {
...
  async afterTest(test) {
    if (test.passed === false) {
      const filename = "screnshot.png";
      const outputFile = path.join(__dirname, filename);
      await browser.saveScreenshot(outputFile);
      //!!
      Object.assign(test, {title: test.description}}
      reportportal.sendFileToTest(test, 'info', filename, fs.readFileSync(outputFile));
    }
  }
...
```

Exemple WDIO Cucumber "5.14.3+" :

```js
const reportportal = require('wdio-reportportal-reporter');

exports.config = {
...
   afterStep: async function (uri, feature, { error, result, duration, passed }, stepData, context) {
     if (!passed) {
        let failureObject = {};
        failureObject.type = 'afterStep';
        failureObject.error = error;
        failureObject.title = `${stepData.step.keyword}${stepData.step.text}`;
        const screenShot = await global.browser.takeScreenshot();
        let attachment = Buffer.from(screenShot, 'base64');
        reportportal.sendFileToTest(failureObject, 'error', "screnshot.png", attachment);
    }
  }
...
}
```

## Obtenir un lien vers la page de lancement de l'interface Report Portal

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const link = await RpService.getLaunchUrl(config);
        console.log(`Report portal link ${link}`)
    }
...
```

ou de manière plus complexe

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const protocol = 'http:';
        const hostname = 'example.com';
        const port = ':8080'; // or empty string for default 80/443 ports
        const link = await RpService.getLaunchUrlByParams(protocol, hostname, port, config);
        console.log(`Report portal link ${link}`)
    }
...
```

## Rapporter un test à un lancement existant

Si vous souhaitez rapporter un test à un lancement actif existant, vous pouvez le passer au reporter par la variable d'environnement `REPORT_PORTAL_LAUNCH_ID`
Vous êtes responsable de la fin du lancement ainsi que du démarrage d'un tel lancement.

```sh
export REPORT_PORTAL_LAUNCH_ID=SomeLaunchId
npm run wdio
```

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-reporter/blob/master/LICENSE) pour plus de détails