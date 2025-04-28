---
id: web-extensions
title: Test delle Estensioni Web
---

WebdriverIO è lo strumento ideale per automatizzare un browser. Le estensioni web sono parte del browser e possono essere automatizzate allo stesso modo. Ogni volta che la tua estensione web utilizza content script per eseguire JavaScript sui siti web o offre un popup modale, puoi eseguire un test e2e utilizzando WebdriverIO.

## Caricamento di un'estensione web nel browser

Come primo passo dobbiamo caricare l'estensione da testare nel browser come parte della nostra sessione. Questo funziona in modo diverso per Chrome e Firefox.

:::info

Questa documentazione omette le estensioni web Safari poiché il loro supporto è molto indietro e la domanda degli utenti non è alta. Se stai sviluppando un'estensione web per Safari, per favore [apri una issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) e collabora per includerla anche qui.

:::

### Chrome

Il caricamento di un'estensione web in Chrome può essere fatto fornendo una stringa codificata in `base64` del file `crx` o fornendo un percorso alla cartella dell'estensione web. Il più semplice è fare quest'ultimo definendo le tue capacità Chrome come segue:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // dato che il tuo wdio.conf.js è nella directory root e i tuoi file 
            // di estensione web compilati si trovano nella cartella `./dist`
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Se automatizzi un browser diverso da Chrome, ad esempio Brave, Edge o Opera, è probabile che le opzioni del browser corrispondano all'esempio precedente, utilizzando solo un nome di capacità diverso, ad esempio `ms:edgeOptions`.

:::

Se compili la tua estensione come file `.crx` utilizzando ad esempio il pacchetto NPM [crx](https://www.npmjs.com/package/crx), puoi anche iniettare l'estensione pacchettizzata tramite:

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

Per creare un profilo Firefox che includa estensioni, puoi utilizzare il [Firefox Profile Service](/docs/firefox-profile-service) per configurare la tua sessione di conseguenza. Tuttavia, potresti incontrare problemi in cui la tua estensione sviluppata localmente non può essere caricata a causa di problemi di firma. In questo caso puoi anche caricare un'estensione nel hook `before` tramite il comando [`installAddOn`](/docs/api/gecko#installaddon), ad esempio:

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

Per generare un file `.xpi`, si consiglia di utilizzare il pacchetto NPM [`web-ext`](https://www.npmjs.com/package/web-ext). Puoi pacchettizzare la tua estensione utilizzando il seguente comando di esempio:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## Trucchi e Consigli

La seguente sezione contiene una serie di consigli e trucchi utili che possono essere d'aiuto quando si testa un'estensione web.

### Testare il Popup Modale in Chrome

Se definisci una voce di azione del browser `default_popup` nel tuo [manifest dell'estensione](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action), puoi testare direttamente quella pagina HTML, poiché cliccare sull'icona dell'estensione nella barra superiore del browser non funzionerà. Invece, devi aprire direttamente il file HTML del popup.

In Chrome questo funziona recuperando l'ID dell'estensione e aprendo la pagina popup tramite `browser.url('...')`. Il comportamento su quella pagina sarà lo stesso di quello all'interno del popup. Per farlo, consigliamo di scrivere il seguente comando personalizzato:

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

Nel tuo `wdio.conf.js` puoi importare questo file e registrare il comando personalizzato nel tuo hook `before`, ad esempio:

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

Ora, nel tuo test, puoi accedere alla pagina popup tramite:

```ts
await browser.openExtensionPopup('My Web Extension')
```