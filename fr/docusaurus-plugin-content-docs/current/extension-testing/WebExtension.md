---
id: web-extensions
title: Test d'Extensions Web
---

WebdriverIO est l'outil idéal pour automatiser un navigateur. Les extensions web font partie du navigateur et peuvent être automatisées de la même manière. Chaque fois que votre extension web utilise des scripts de contenu pour exécuter JavaScript sur des sites web ou offre une fenêtre popup, vous pouvez exécuter un test e2e pour cela en utilisant WebdriverIO.

## Charger une Extension Web dans le Navigateur

La première étape consiste à charger l'extension à tester dans le navigateur dans le cadre de notre session. Cela fonctionne différemment pour Chrome et Firefox.

:::info

Cette documentation ne traite pas des extensions web Safari car leur support est bien en retard et la demande des utilisateurs n'est pas élevée. Si vous développez une extension web pour Safari, veuillez [ouvrir un ticket](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) et collaborer pour l'inclure ici également.

:::

### Chrome

Le chargement d'une extension web dans Chrome peut se faire en fournissant une chaîne encodée en `base64` du fichier `crx` ou en fournissant un chemin vers le dossier de l'extension web. Le plus simple est de faire cette dernière en définissant vos capacités Chrome comme suit :

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // étant donné que votre wdio.conf.js est dans le répertoire racine et que vos fichiers
            // d'extension web compilés sont situés dans le dossier `./dist`
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Si vous automatisez un navigateur autre que Chrome, par exemple Brave, Edge ou Opera, il est probable que l'option du navigateur corresponde à l'exemple ci-dessus, en utilisant simplement un nom de capacité différent, par exemple `ms:edgeOptions`.

:::

Si vous compilez votre extension en fichier `.crx` en utilisant par exemple le package NPM [crx](https://www.npmjs.com/package/crx), vous pouvez également injecter l'extension groupée via :

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const extPath = path.join(__dirname, `web-extension-chrome.crx`)
const chromeExtension = (await fs.readFile(extPath)).toString('base64')

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            extensions: [chromeExtension]
        }
    }]
}
```

### Firefox

Pour créer un profil Firefox qui inclut des extensions, vous pouvez utiliser le [Service de Profil Firefox](/docs/firefox-profile-service) pour configurer votre session en conséquence. Cependant, vous pourriez rencontrer des problèmes où votre extension développée localement ne peut pas être chargée en raison de problèmes de signature. Dans ce cas, vous pouvez également charger une extension dans le hook `before` via la commande [`installAddOn`](/docs/api/gecko#installaddon), par exemple :

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const extensionPath = path.resolve(__dirname, `web-extension.xpi`)

export const config = {
    // ...
    before: async (capabilities) => {
        const browserName = (capabilities as WebdriverIO.Capabilities).browserName
        if (browserName === 'firefox') {
            const extension = await fs.readFile(extensionPath)
            await browser.installAddOn(extension.toString('base64'), true)
        }
    }
}
```

Pour générer un fichier `.xpi`, il est recommandé d'utiliser le package NPM [`web-ext`](https://www.npmjs.com/package/web-ext). Vous pouvez regrouper votre extension en utilisant l'exemple de commande suivant :

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## Astuces et Conseils

La section suivante contient un ensemble d'astuces et de conseils utiles qui peuvent être utiles lors du test d'une extension web.

### Tester la Fenêtre Popup dans Chrome

Si vous définissez une entrée d'action de navigateur `default_popup` dans votre [manifeste d'extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action), vous pouvez tester cette page HTML directement, car cliquer sur l'icône d'extension dans la barre supérieure du navigateur ne fonctionnera pas. Au lieu de cela, vous devez ouvrir directement le fichier HTML popup.

Dans Chrome, cela fonctionne en récupérant l'ID de l'extension et en ouvrant la page popup via `browser.url('...')`. Le comportement sur cette page sera le même que dans le popup. Pour ce faire, nous recommandons d'écrire la commande personnalisée suivante :

```ts customCommand.ts
export async function openExtensionPopup (this: WebdriverIO.Browser, extensionName: string, popupUrl = 'index.html') {
  if ((this.capabilities as WebdriverIO.Capabilities).browserName !== 'chrome') {
    throw new Error('This command only works with Chrome')
  }
  await this.url('chrome://extensions/')

  const extensions = await this.$$('extensions-item')
  const extension = await extensions.find(async (ext) => (
    await ext.$('#name').getText()) === extensionName
  )

  if (!extension) {
    const installedExtensions = await extensions.map((ext) => ext.$('#name').getText())
    throw new Error(`Couldn't find extension "${extensionName}", available installed extensions are "${installedExtensions.join('", "')}"`)
  }

  const extId = await extension.getAttribute('id')
  await this.url(`chrome-extension://${extId}/popup/${popupUrl}`)
}

declare global {
  namespace WebdriverIO {
      interface Browser {
        openExtensionPopup: typeof openExtensionPopup
      }
  }
}
```

Dans votre `wdio.conf.js`, vous pouvez importer ce fichier et enregistrer la commande personnalisée dans votre hook `before`, par exemple :

```ts wdio.conf.ts
import { browser } from '@wdio/globals'

import { openExtensionPopup } from './support/customCommands'

export const config: WebdriverIO.Config = {
  // ...
  before: () => {
    browser.addCommand('openExtensionPopup', openExtensionPopup)
  }
}
```

Maintenant, dans votre test, vous pouvez accéder à la page popup via :

```ts
await browser.openExtensionPopup('Mon Extension Web')
```