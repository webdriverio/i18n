---
id: integrate-with-percy
title: Pour Application Web
---

## Intégrer vos tests WebdriverIO avec Percy

Avant l'intégration, vous pouvez explorer [le tutoriel d'exemple de build Percy pour WebdriverIO](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Intégrez vos tests automatisés WebdriverIO avec BrowserStack Percy. Voici un aperçu des étapes d'intégration :

### Étape 1 : Créer un projet Percy
[Connectez-vous](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) à Percy. Dans Percy, créez un projet de type Web, puis nommez le projet. Une fois le projet créé, Percy génère un jeton. Notez-le. Vous devrez l'utiliser pour définir votre variable d'environnement à l'étape suivante.

Pour plus de détails sur la création d'un projet, consultez [Créer un projet Percy](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Étape 2 : Définir le jeton du projet comme variable d'environnement

Exécutez la commande suivante pour définir PERCY_TOKEN comme variable d'environnement :

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Étape 3 : Installer les dépendances Percy

Installez les composants nécessaires pour établir l'environnement d'intégration pour votre suite de tests.

Pour installer les dépendances, exécutez la commande suivante :

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### Étape 4 : Mettre à jour votre script de test

Importez la bibliothèque Percy pour utiliser la méthode et les attributs nécessaires pour prendre des captures d'écran.
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

Lorsque vous utilisez WebdriverIO en [mode autonome](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), fournissez l'objet navigateur comme premier argument à la fonction `percySnapshot` :

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
// the browser object is required in standalone mode
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

- browser (obligatoire) - L'objet navigateur WebdriverIO
- name (obligatoire) - Le nom de la capture d'écran ; doit être unique pour chaque capture
- options - Voir les options de configuration par capture

Pour en savoir plus, consultez [Percy snapshot](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Étape 5 : Exécuter Percy
Exécutez vos tests en utilisant la commande `percy exec` comme indiqué ci-dessous :

Si vous ne pouvez pas utiliser la commande `percy:exec` ou préférez exécuter vos tests à l'aide des options d'exécution de l'IDE, vous pouvez utiliser les commandes `percy:exec:start` et `percy:exec:stop`. Pour en savoir plus, visitez [Exécuter Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

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

## Visitez les pages suivantes pour plus de détails :
- [Intégrer vos tests WebdriverIO avec Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Page des variables d'environnement](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Intégration à l'aide du SDK BrowserStack](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) si vous utilisez BrowserStack Automate.


| Ressource                                                                                                                                                            | Description                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Documentation officielle](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | Documentation Percy pour WebdriverIO |
| [Build d'exemple - Tutoriel](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Tutoriel WebdriverIO de Percy      |
| [Vidéo officielle](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Tests visuels avec Percy         |
| [Blog](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Présentation de Visual Reviews 2.0    |