---
id: integrate-with-percy
title: Pour les applications web
description: "Intégrez les tests WebdriverIO pour les applications web avec BrowserStack Percy pour les tests visuels, de la création d'un projet à l'exécution des builds."
---

## Intégrez vos tests WebdriverIO avec Percy

Avant l'intégration, vous pouvez explorer le [tutoriel de build d'exemple de Percy pour WebdriverIO](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Intégrez vos tests automatisés WebdriverIO avec BrowserStack Percy ; voici un aperçu des étapes d'intégration :

### Étape 1 : Créer un projet Percy
[Connectez-vous](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) à Percy. Dans Percy, créez un projet de type Web, puis nommez le projet. Une fois le projet créé, Percy génère un token. Notez-le. Vous devrez l'utiliser pour définir votre variable d'environnement à l'étape suivante.

Pour plus de détails sur la création d'un projet, consultez [Créer un projet Percy](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Étape 2 : Définir le token du projet comme variable d'environnement

Exécutez la commande indiquée pour définir PERCY_TOKEN comme variable d'environnement :

```sh
export PERCY_TOKEN="<your token here>"   // macOS ou Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Étape 3 : Installer les dépendances Percy

Installez les composants nécessaires pour établir l'environnement d'intégration de votre suite de tests.

Pour installer les dépendances, exécutez la commande suivante :

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### Étape 4 : Mettre à jour votre script de test

Importez la bibliothèque Percy pour utiliser la méthode et les attributs nécessaires à la prise de captures d'écran.
L'exemple suivant utilise la fonction percySnapshot() en mode asynchrone :

```sh
import percySnapshot from '@percy/webdriverio';
describe('webdriver.io page', () => {
  it('should have the right title', async () => {
    await browser.url('https://webdriver.io');
    await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js');
    await percySnapshot('webdriver.io page');
  });
});
```

Lorsque vous utilisez WebdriverIO en [mode autonome](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), fournissez l'objet browser comme premier argument de la fonction `percySnapshot` :

```sh
import { remote } from 'webdriverio'

import percySnapshot from '@percy/webdriverio';

const browser = await remote({
  logLevel: 'trace',
  capabilities: {
    browserName: 'chrome'
  }
});

await browser.url('https://duckduckgo.com');
const inputElem = await browser.$('#search_form_input_homepage');
await inputElem.setValue('WebdriverIO');
const submitBtn = await browser.$('#search_button_homepage');
await submitBtn.click();
// l'objet browser est requis en mode autonome
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
Les arguments de la méthode snapshot sont :

```sh
percySnapshot(name[, options])
```
### Mode autonome

```sh
percySnapshot(browser, name[, options])
```

- browser (requis) - L'objet browser de WebdriverIO
- name (requis) - Le nom du snapshot ; il doit être unique pour chaque snapshot
- options - Voir les options de configuration par snapshot

Pour en savoir plus, consultez [Percy snapshot](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Étape 5 : Exécuter Percy
Exécutez vos tests à l'aide de la commande `percy exec` comme indiqué ci-dessous :

Si vous ne pouvez pas utiliser la commande `percy:exec` ou si vous préférez exécuter vos tests à l'aide des options d'exécution de votre IDE, vous pouvez utiliser les commandes `percy:exec:start` et `percy:exec:stop`. Pour en savoir plus, consultez [Exécuter Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
percy exec -- wdio wdio.conf.js
```

```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Running "wdio wdio.conf.js"
...
[...] webdriver.io page
[percy] Snapshot taken "webdriver.io page"
[...]    ✓ should have the right title
...
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!

```

## Consultez les pages suivantes pour plus de détails :
- [Intégrez vos tests WebdriverIO avec Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Page sur les variables d'environnement](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Intégrer à l'aide du SDK BrowserStack](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) si vous utilisez BrowserStack Automate.


| Ressource                                                                                                                                                           | Description                              |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------|
| [Documentation officielle](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)  | Documentation WebdriverIO de Percy       |
| [Build d'exemple - Tutoriel](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Tutoriel WebdriverIO de Percy            |
| [Vidéo officielle](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                            | Tests visuels avec Percy                 |
| [Blog](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Présentation de Visual Reviews 2.0       |