---
id: getting-started
title: Premiers pas
description: "Installez WebdriverIO DevTools et exécutez votre premier test en mode live ou en mode trace pour rejouer le DOM, les captures d'écran, le réseau et la sortie console."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

WebdriverIO DevTools offre à vos tests de navigateur de bout en bout une interface d'outils de développement pour exécuter, déboguer et inspecter l'automatisation — rejeu du DOM, captures d'écran par commande, capture du réseau et de la console, et enregistrements vidéo (screencasts) des sessions. Il fonctionne selon deux modes. Le **mode live** ouvre un [tableau de bord](/docs/devtools/dashboard) interactif dans une fenêtre de navigateur pendant l'exécution de vos tests, afin que vous puissiez les observer et les relancer en temps réel. Le **mode trace** ignore l'interface et écrit un [artefact de trace](/docs/devtools/wdio/trace-mode) portable et hors ligne (`trace.zip`) que vous pouvez ouvrir ultérieurement dans le lecteur `show-trace` — idéal pour la CI. Cette page vous permet de démarrer rapidement en mode live ; le mode trace n'est qu'à une option de distance.

## Installation et première exécution

Choisissez votre adaptateur, installez-le et ajoutez la configuration minimale ci-dessous. Exécutez vos tests comme d'habitude — le tableau de bord DevTools s'ouvre automatiquement dans une nouvelle fenêtre de navigateur.

<Tabs
defaultValue="wdio"
values={[
{label: 'WebdriverIO', value: 'wdio'},
{label: 'Selenium', value: 'selenium'},
{label: 'Nightwatch', value: 'nightwatch'},
]}
>
<TabItem value="wdio">

Installez le service :

```sh
npm install @wdio/devtools-service --save-dev
```

Ajoutez-le à la configuration de votre test runner :

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

Exécutez vos tests WebdriverIO normalement — l'interface DevTools s'ouvre automatiquement et les tests commencent immédiatement à être visualisés.

</TabItem>
<TabItem value="selenium">

Fonctionne avec Mocha, Jest, Cucumber ou un simple script `node` — le plugin détecte automatiquement le runner. Installez-le :

```bash
npm install @wdio/selenium-devtools
```

Ajoutez un seul import et un appel à `configure` en haut de votre fichier de test (exemple avec Mocha) :

```js
// tests/example.test.js
import { Builder, By, until } from 'selenium-webdriver'
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('smoke test', function () {
  let driver

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async function () {
    if (driver) {
      await driver.quit()
    }
  })

  it('loads example.com', async function () {
    await driver.get('https://example.com')
    await driver.wait(until.elementLocated(By.css('h1')), 10000)
  })
})
```

Exécutez-le — l'interface DevTools s'ouvre dans une nouvelle fenêtre Chrome :

```bash
mocha --timeout 60000 tests/example.test.js
```

Consultez la [page Selenium](/docs/devtools/selenium) pour les configurations avec Jest, Cucumber et Node seul.

</TabItem>
<TabItem value="nightwatch">

Installez l'adaptateur :

```bash
npm install @wdio/nightwatch-devtools
```

Intégrez-le à votre configuration Nightwatch via `globals` — aucune modification des fichiers de test n'est nécessaire :

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // Requis pour la capture des requêtes réseau
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

Exécutez vos tests normalement — l'interface DevTools s'ouvre automatiquement :

```bash
nightwatch
```

Consultez la [page Nightwatch](/docs/devtools/nightwatch) pour la configuration Cucumber/BDD.

</TabItem>
</Tabs>

## Prochaines étapes

- **[Mode trace](/docs/devtools/wdio/trace-mode)** — définissez `mode: 'trace'` pour ignorer l'interface et produire un artefact de trace portable et hors ligne pour la CI.
- **[Référence de configuration](/docs/devtools/reference)** — toutes les options des trois adaptateurs.
- **Frameworks** — guides complets par adaptateur : [WebdriverIO](/docs/devtools/wdio), [Selenium](/docs/devtools/selenium), [Nightwatch](/docs/devtools/nightwatch).