---
id: wdio-cucumberjs-json-reporter
title: Rapporteur JSON CucumberJS
custom_edit_url: https://github.com/wswebcreation/wdio-cucumberjs-json-reporter/edit/main/README.md
---


> wdio-cucumberjs-json-reporter est un package tiers, pour plus d'informations veuillez consulter [GitHub](https://github.com/wswebcreation/wdio-cucumberjs-json-reporter) | [npm](https://nodei.co/npm/wdio-cucumberjs-json-reporter)

Un rapporteur WDIO qui crée des fichiers JSON CucumberJS pour WebdriverIO v8 et supérieur.

[![NPM](https://nodei.co/npm/wdio-cucumberjs-json-reporter.png)](https://nodei.co/npm/wdio-cucumberjs-json-reporter/)

## Que fait-il
Ce rapporteur génère un **fichier JSON Cucumber** pour chaque fonctionnalité testée. Le fichier JSON peut être utilisé avec le rapport de votre choix comme par exemple [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter).

Il ajoutera également des métadonnées sur l'instance en cours d'exécution au fichier de fonctionnalité et, enfin, il vous donnera la possibilité d'ajouter des pièces jointes à la sortie JSON.

## Installation
La façon la plus simple est de conserver `wdio-cucumberjs-json-reporter` comme dépendance de développement dans votre `package.json`.

```json
{
  "devDependencies": {
    "wdio-cucumberjs-json-reporter": "^5.0.0"
  }
}
```

Vous pouvez simplement le faire par :

```bash
npm install wdio-cucumberjs-json-reporter --save-dev
```

ainsi il sera automatiquement ajouté à votre `package.json`

Les instructions pour installer `WebdriverIO` peuvent être trouvées [ici](https://webdriver.io/docs/gettingstarted).

## Configuration
Configurez le répertoire de sortie et la langue dans votre fichier wdio.conf.js :

```js
export const config = {
    // ...
    reporters: [
        // Comme ceci avec les options par défaut, voir les options ci-dessous
        'cucumberjs-json',

        // OU comme ceci si vous voulez définir le dossier et la langue
        [ 'cucumberjs-json', {
                jsonFolder: '.tmp/new/',
                language: 'en',
            },
        ],
    ],
  // ...
}
```

> N'UTILISEZ PAS LES DEUX FAÇONS D'AJOUTER LE RAPPORTEUR, CECI EST JUSTE UN EXEMPLE !

## Options
### `jsonFolder`
- **Type:** `String`
- **Obligatoire:** Non
- **Par défaut:** `.tmp/json/`

Le répertoire où les fichiers JSON, générés par ce rapport, seront stockés, relatif à l'endroit où le script est démarré.

**N.B. :** Si vous utilisez un script npm depuis la ligne de commande, comme par exemple `npm run test`, le `jsonFolder` sera relatif au chemin
d'où le script est exécuté. L'exécuter depuis la racine de votre projet créera également le `jsonFolder` à la racine de votre projet.

### `language`
- **Type:** `String`
- **Obligatoire:** Non
- **Par défaut:** `en`

La langue dans laquelle les scénarios Gherkin sont écrits (par défaut en anglais). La liste des codes de langue et ses mots-clés peut être trouvée [ici](https://cucumber.io/docs/gherkin/reference/#overview).

### `disableHooks`
- **Type:** `boolean`
- **Obligatoire:** Non
- **Par défaut:** `false`

Les détails des hooks ne feront pas partie de la génération si cette propriété est définie sur `true`.

### `reportFilePerRetry`
- **Type:** `boolean`
- **Obligatoire:** Non
- **Par défaut:** `true`

Lorsqu'une spécification est retentée, le rapport sera ajouté au fichier de rapport existant des essais précédents si cette propriété est définie sur `false`.

**Exemple**:
`['cucumberjs-json', { jsonFolder: '.tmp/new/', language: 'en', disableHooks:true}]`

## Métadonnées

> **Remarque:**\
> Ceci n'est actuellement pas pris en charge si vous utilisez WebdriverIO V6, WebdriverIO V5 prend toujours en charge cela et WebdriverIO V7 le prend en charge à nouveau

Comme dit, ce rapport peut automatiquement stocker les métadonnées de la machine / appareil actuel sur lequel la fonctionnalité a été exécutée.

Pour personnaliser cela, vous pouvez l'ajouter en ajoutant l'objet suivant à vos `capabilities`

```js
// Exemple wdio.conf.js
export const config = {
    //..
    capabilities: [
        {
            browserName: 'chrome',
            // Ajoutez ceci
            'cjson:metadata': {
                // Pour un navigateur
                browser: {
                    name: 'chrome',
                    version: '58',
                },
                // pour une application
                app: {
                  name: 'name.of.app.ipa',
                  version: '1.2.3',
                },
                device: 'MacBook Pro 15',
                platform: {
                    name: 'OSX',
                    version: '10.12.6'
                }
            },
        },
    ],
};
```

> L'objet métadonnées doit avoir le préfixe `cjson`, sinon cela ne fonctionnera pas !

### Valeurs des métadonnées
#### `metadata.app.name`
- **Type:** `string`

**par ex. :** Le nom de l'application.

#### `metadata.app.version`
- **Type:** `string`

**par ex. :** La version de l'application.

#### `metadata.browser.name`
- **Type:** `string`
- **Valeurs possibles:** `internet explorer | edge | chrome | firefox | safari`

#### `metadata.browser.version`
- **Type:** `string`

**par ex. :** La version du navigateur, cela peut être ajouté manuellement ou récupéré pendant l'exécution des tests pour obtenir le numéro de version exact.

#### `metadata.device`
- **Type:** `string`

**par ex. :** Un nom qui représente le type d'appareil. Par exemple, si vous l'exécutez sur une machine virtuelle, vous pouvez la placer ici `Virtual Machine`,
ou le nom du mobile, comme par exemple `iPhone 7 Plus`.

#### `metadata.platform.name`
- **Type:** `string`
- **Valeurs possibles:** `windows | osx | linux | ubuntu | android | ios`

#### `metadata.platform.version`
- **Type:** `string`

**par ex. :** La version de la plateforme

> Si vous ne fournissez pas l'objet `browser` dans les métadonnées, ce module le déterminera automatiquement pour vous. **Il le remplacera toujours par la valeur la plus récente qu'il peut déterminer.**

> Si vous ne fournissez pas l'objet `device` et/ou l'objet `platform`, il sera défini par défaut pour vous comme `not known`

> Si vous ne fournissez pas de `browser.name` ou de `browser.version`, le module essaiera de le déterminer automatiquement.

## Pièce jointe
Vous avez la possibilité d'attacher des données au fichier JSON dans tous ces hooks / étapes :

- Before(All)
- After(All)
- Given
- When
- Then
- And

La seule chose dont vous avez besoin est le code suivant dans vos fichiers d'étape.

Pour ES Modules (ESM)
```js
import cucumberJson from 'wdio-cucumberjs-json-reporter';

// Attacher une chaîne (si aucun type n'est fourni, elle sera automatiquement par défaut à `text/plain`)
cucumberJson.attach('just a string');
cucumberJson.attach('just a second string', 'text/plain');

// Attacher JSON
cucumberJson.attach({"json-string": true}, 'application/json');

// Attacher une capture d'écran dans un hook before
cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
```
Pour CommonJS (CJS)
```js
const { attach } = require("wdio-cucumberjs-json-reporter");

// Attacher une chaîne (si aucun type n'est fourni, elle sera automatiquement par défaut à `text/plain`)
attach('just a string');
attach('just a second string', 'text/plain');

// Attacher JSON
attach({"json-string": true}, 'application/json');

// Attacher une capture d'écran dans un hook before
attach(await browser.takeScreenshot(), 'image/png');
```

## Utilisez-le avec multiple-cucumber-html-reporter
Le module précédent pour WebdriverIO V4, [wdio-multiple-cucumber-html-reporter](https://github.com/webdriverio-community/wdio-multiple-cucumber-html-reporter),
avait une connexion intégrée avec le module [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter). **Ce n'est pas le cas pour ce
rapporteur** car la nouvelle configuration de WebdriverIO V5 est basée sur une instance qui ne me permet pas d'utiliser les hooks `onPrepare` et `onComplete`.

Si vous souhaitez toujours utiliser le module [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter), vous pouvez ajouter ce qui suit à votre fichier de configuration.

- Installez le module avec

    ```bash
    npm install multiple-cucumber-html-reporter --save-dev
    ```

- Ajoutez ceci à votre fichier de configuration

    ```js
    import fs from 'node:fs/promises'
    // Importez le module
    import { generate } from 'multiple-cucumber-html-reporter'

    // Exemple wdio.conf.js
    export const config = {
      //..

      // =====
      // Hooks
      // =====
      /**
       * Gets executed once before all workers get launched.
       */
      onPrepare: () => {
        // Remove the `.tmp/` folder that holds the json and report files
        return fs.rm('.tmp/', { recursive: true });
      },
      /**
       * Gets executed after all workers got shut down and the process is about to exit.
       */
      onComplete: () => {
        // Generate the report when it all tests are done
        generate({
          // Required
          // This part needs to be the same path where you store the JSON files
          // default = '.tmp/json/'
          jsonDir: '.tmp/json/',
          reportPath: '.tmp/report/',
          // for more options see https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
        });
      }
    }
    ```

## Anciennes versions de WebdriverIO

> **CE MODULE PEUT UNIQUEMENT FONCTIONNER AVEC WebdriverIO V8+ !**\
> **Pour V6, veuillez consulter la documentation [ici](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v6) et utiliser la version 2.0.4**\
> **Pour V5, veuillez consulter la documentation [ici](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v5) et utiliser la version 1.3.0**

> **CE MODULE N'EST PAS UN REMPLACEMENT DE [wdio-multiple-cucumber-html-reporter](https://github.com/wswebcreation/wdio-multiple-cucumber-html-reporter). CE MODULE NE PREND EN CHARGE QUE WEBDRIVERIO V4 ET CRÉE ÉGALEMENT UN RAPPORT. CE MODULE NE CRÉE QU'UN JSON, PAS DE RAPPORT !!**