---
id: web-extensions
title: Test d'extensions Web
description: "Charger une extension web dans Chrome ou Firefox pour une session WebdriverIO, y compris l'installation et la désinstallation via BiDi en cours de session."
---

WebdriverIO est l'outil idéal pour automatiser un navigateur. Les extensions Web font partie du navigateur et peuvent être automatisées de la même manière. Chaque fois que votre extension web utilise des content scripts pour exécuter du JavaScript sur des sites web ou propose une fenêtre modale popup, vous pouvez exécuter un test e2e pour cela en utilisant WebdriverIO.

Chargez l'extension avant la première navigation avec la configuration de capabilities ci-dessous. Pour en installer et en supprimer une au milieu d'une session [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-webExtension), utilisez [`installExtension`](/docs/api/browser/installExtension) et [`uninstallExtension`](/docs/api/browser/uninstallExtension).

## Charger une extension Web dans le navigateur

Dans un premier temps, nous devons charger l'extension à tester dans le navigateur dans le cadre de notre session. Cela fonctionne différemment pour Chrome et Firefox.

:::info

Cette documentation laisse de côté les extensions web Safari, car leur prise en charge est très en retard et la demande des utilisateurs n'est pas élevée. Safari n'a pas non plus de session WebDriver BiDi, donc [`installExtension`](/docs/api/browser/installExtension) ne couvre pas Safari. Si vous développez une extension web pour Safari, veuillez [ouvrir une issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) et collaborer pour l'inclure ici également.

:::

### Chrome

Le chargement d'une extension web dans Chrome peut se faire en fournissant une chaîne encodée en `base64` du fichier `crx` ou en fournissant un chemin vers le dossier de l'extension web. Le plus simple est de faire la seconde option en définissant vos capabilities Chrome comme suit :

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // en supposant que votre wdio.conf.js se trouve dans le répertoire racine et que les fichiers
            // compilés de votre extension web se trouvent dans le dossier `./dist`
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Si vous automatisez un navigateur autre que Chrome, par exemple Brave, Edge ou Opera, il y a de fortes chances que les options du navigateur correspondent à l'exemple ci-dessus, en utilisant simplement un nom de capability différent, par exemple `ms:edgeOptions`.

:::

Si vous compilez votre extension en fichier `.crx` en utilisant par exemple le package NPM [crx](https://www.npmjs.com/package/crx), vous pouvez également injecter l'extension empaquetée via :

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

Pour créer un profil Firefox qui inclut des extensions, vous pouvez utiliser le [Firefox Profile Service](/docs/firefox-profile-service) pour configurer votre session en conséquence. Cependant, vous pourriez rencontrer des problèmes où votre extension développée localement ne peut pas être chargée en raison de problèmes de signature. Dans ce cas, vous pouvez également charger une extension dans le hook `before` via la commande [`installAddOn`](/docs/api/gecko#installaddon), par exemple :

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

Pour générer un fichier `.xpi`, il est recommandé d'utiliser le package NPM [`web-ext`](https://www.npmjs.com/package/web-ext). Vous pouvez empaqueter votre extension en utilisant la commande d'exemple suivante :

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## Installer une extension pendant la session

Depuis la v10, [`browser.installExtension`](/docs/api/browser/installExtension) et [`browser.uninstallExtension`](/docs/api/browser/uninstallExtension) installent une extension web au milieu d'une session WebDriver BiDi et renvoient son identifiant. Utilisez-les lorsque l'extension ne doit pas être présente au lancement, ou lorsque le même test l'installe, l'utilise et la supprime.

La configuration des capabilities et `installAddOn` ci-dessus restent la manière de charger une extension avant la première navigation. `installExtension` ne les remplace pas. `browser.webExtensionInstall` et `browser.webExtensionUninstall` restent disponibles lorsque vous souhaitez fournir vous-même le [payload de la spécification](https://w3c.github.io/webdriver-bidi/#command-webExtension-install).

```ts title="test/specs/extension.e2e.ts"
import path from 'node:path'
import url from 'node:url'
import { browser, expect } from '@wdio/globals'

const extensionPath = path.resolve(
    path.dirname(url.fileURLToPath(import.meta.url)),
    '../../dist'
)

describe('web extension', () => {
    it('installs and removes the extension', async () => {
        const extensionId = await browser.installExtension(extensionPath)
        expect(extensionId).not.toEqual('')

        await browser.url('https://webdriver.io')
        await browser.uninstallExtension(extensionId)
    })
})
```

`installExtension` accepte trois types d'entrées :

| Entrée | Payload envoyé au navigateur |
| --- | --- |
| Un chemin de répertoire | `{ type: 'path', path }` après `path.resolve`. Le navigateur doit pouvoir lire ce répertoire. |
| Un chemin `.zip`, `.xpi` ou `.crx` | `{ type: 'archivePath', path }` après `path.resolve`. |
| `{ base64: string }` | `{ type: 'base64', value }`. Octets de l'archive. Tout autre objet est rejeté. |

Un chemin sous forme de chaîne est toujours résolu sur le test runner. Sur une session distante — un nom d'hôte autre que `localhost`, `127.0.0.1` ou `::1`, ou un `user` et une `key` cloud — ce chemin n'est pas un chemin sur la machine du navigateur. La commande lit une archive, ou compresse un répertoire en mémoire, et envoie du `base64`. Vous n'avez pas à distinguer vous-même le cas local du cas distant. Les sessions locales envoient `path` ou `archivePath` et ne lisent pas les octets.

Faites pointer un répertoire vers la racine de l'extension, le dossier qui contient `manifest.json`.

La session doit utiliser WebDriver BiDi. Une session classique lève `installExtension requires a WebDriver BiDi session (webExtension.install)`. Un navigateur qui implémente BiDi mais pas ce module fait échouer la commande avec `unsupported operation` (ou `unknown command` lorsque le module est absent). Une archive invalide échoue avec `invalid web extension`. La désinstallation d'un identifiant que le navigateur ne connaît pas échoue avec `no such web extension`.

`uninstallExtension` prend la chaîne d'identifiant renvoyée par `installExtension`.

### Chromium

Chrome et Edge implémentent `webExtension.install` mais le laissent désactivé jusqu'à ce que vous démarriez le navigateur avec `--enable-unsafe-extension-debugging` et `--remote-debugging-pipe`. Chrome 136 et versions ultérieures exigent également `--user-data-dir` dès que `--remote-debugging-pipe` est défini. Sans ces arguments, la commande échoue avec `unknown error - Method not available`.

`--remote-debugging-pipe` est le canal entre le driver et le navigateur. La session BiDi utilise toujours `webSocketUrl`.

```ts title="wdio.conf.ts"
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wdio-chrome-'))

export const config: WebdriverIO.Config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--enable-unsafe-extension-debugging',
                '--remote-debugging-pipe',
                `--user-data-dir=${userDataDir}`
            ]
        }
    }]
}
```

Utilisez `ms:edgeOptions` pour Edge. Firefox charge l'extension dans une session BiDi normale et n'a pas besoin de ces arguments.

## Trucs et astuces

La section suivante contient un ensemble de trucs et astuces utiles qui peuvent être pratiques lors du test d'une extension web.

### Tester la fenêtre modale popup dans Chrome

Si vous définissez une entrée d'action de navigateur `default_popup` dans votre [manifeste d'extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action), vous pouvez tester cette page HTML directement, car cliquer sur l'icône de l'extension dans la barre supérieure du navigateur ne fonctionnera pas. Au lieu de cela, vous devez ouvrir directement le fichier html de la popup.

Dans Chrome, cela fonctionne en récupérant l'identifiant de l'extension et en ouvrant la page popup via `browser.url('...')`. Le comportement sur cette page sera le même que dans la popup. Pour ce faire, nous recommandons d'écrire la commande personnalisée suivante :

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
await browser.openExtensionPopup('My Web Extension')
```