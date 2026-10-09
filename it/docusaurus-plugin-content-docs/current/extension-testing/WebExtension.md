---
id: web-extensions
title: Test delle Web Extension
description: "Carica una web extension in Chrome o Firefox per una sessione WebdriverIO, inclusa l'installazione e la disinstallazione tramite BiDi a sessione in corso."
---

WebdriverIO è lo strumento ideale per automatizzare un browser. Le Web Extension fanno parte del browser e possono essere automatizzate allo stesso modo. Ogni volta che la tua web extension utilizza content script per eseguire JavaScript sui siti web o offre un popup modale, puoi eseguire un test e2e utilizzando WebdriverIO.

Carica l'estensione prima della prima navigazione con la configurazione delle capability riportata di seguito. Per installarne e rimuoverne una durante una sessione [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-webExtension), usa [`installExtension`](/docs/api/browser/installExtension) e [`uninstallExtension`](/docs/api/browser/uninstallExtension).

## Caricare una Web Extension nel Browser

Come primo passo dobbiamo caricare l'estensione da testare nel browser come parte della nostra sessione. Questo funziona in modo diverso per Chrome e Firefox.

:::info

Questa documentazione non tratta le web extension di Safari, poiché il loro supporto è molto indietro e la richiesta degli utenti non è elevata. Inoltre Safari non dispone di una sessione WebDriver BiDi, quindi [`installExtension`](/docs/api/browser/installExtension) non copre Safari. Se stai sviluppando una web extension per Safari, [apri una issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) e collabora per includerla anche qui.

:::

### Chrome

Il caricamento di una web extension in Chrome può essere effettuato fornendo una stringa codificata in `base64` del file `crx` oppure fornendo un percorso alla cartella della web extension. La soluzione più semplice è la seconda, definendo le capability di Chrome come segue:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // supponendo che il tuo wdio.conf.js si trovi nella directory principale e che i file
            // compilati della web extension si trovino nella cartella `./dist`
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Se automatizzi un browser diverso da Chrome, ad esempio Brave, Edge o Opera, è probabile che le opzioni del browser corrispondano all'esempio sopra, utilizzando semplicemente un nome di capability diverso, ad esempio `ms:edgeOptions`.

:::

Se compili la tua estensione come file `.crx` utilizzando ad esempio il pacchetto NPM [crx](https://www.npmjs.com/package/crx), puoi anche iniettare l'estensione impacchettata tramite:

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

Per creare un profilo Firefox che includa estensioni puoi utilizzare il [Firefox Profile Service](/docs/firefox-profile-service) per configurare la tua sessione di conseguenza. Tuttavia potresti riscontrare problemi per cui la tua estensione sviluppata localmente non può essere caricata a causa di problemi di firma. In questo caso puoi anche caricare un'estensione nell'hook `before` tramite il comando [`installAddOn`](/docs/api/gecko#installaddon), ad esempio:

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

Per generare un file `.xpi`, si consiglia di utilizzare il pacchetto NPM [`web-ext`](https://www.npmjs.com/package/web-ext). Puoi impacchettare la tua estensione utilizzando il seguente comando di esempio:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## Installare un'estensione durante la sessione

Dalla v10, [`browser.installExtension`](/docs/api/browser/installExtension) e [`browser.uninstallExtension`](/docs/api/browser/uninstallExtension) installano una web extension durante una sessione WebDriver BiDi e ne restituiscono l'id. Usali quando l'estensione non deve essere presente all'avvio, oppure quando lo stesso test la installa, la utilizza e la rimuove.

La configurazione delle capability e `installAddOn` descritti sopra restano il modo per caricare un'estensione prima della prima navigazione. `installExtension` non li sostituisce. `browser.webExtensionInstall` e `browser.webExtensionUninstall` restano disponibili quando vuoi gestire tu stesso il [payload della specifica](https://w3c.github.io/webdriver-bidi/#command-webExtension-install).

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

`installExtension` accetta tre tipi di input:

| Input | Payload inviato al browser |
| --- | --- |
| Un percorso di directory | `{ type: 'path', path }` dopo `path.resolve`. Il browser deve poter leggere quella directory. |
| Un percorso `.zip`, `.xpi` o `.crx` | `{ type: 'archivePath', path }` dopo `path.resolve`. |
| `{ base64: string }` | `{ type: 'base64', value }`. Byte dell'archivio. Qualsiasi altro oggetto viene rifiutato. |

Un percorso stringa viene sempre risolto sul test runner. In una sessione remota — un hostname diverso da `localhost`, `127.0.0.1` o `::1`, oppure con `user` e `key` di un servizio cloud — quel percorso non è un percorso sulla macchina del browser. Il comando legge un archivio, oppure comprime una directory in memoria, e invia `base64`. Non devi distinguere tu stesso tra locale e remoto. Le sessioni locali inviano `path` o `archivePath` e non leggono i byte.

Fai puntare una directory alla radice dell'estensione, ovvero la cartella che contiene `manifest.json`.

La sessione deve supportare WebDriver BiDi. Una sessione classica genera l'errore `installExtension requires a WebDriver BiDi session (webExtension.install)`. Un browser che implementa BiDi ma non questo modulo fa fallire il comando con `unsupported operation` (o `unknown command` quando il modulo è assente). Un archivio non valido fallisce con `invalid web extension`. La disinstallazione di un id che il browser non conosce fallisce con `no such web extension`.

`uninstallExtension` accetta la stringa id restituita da `installExtension`.

### Chromium

Chrome ed Edge implementano `webExtension.install` ma lo lasciano disattivato finché non avvii il browser con `--enable-unsafe-extension-debugging` e `--remote-debugging-pipe`. Chrome 136 e versioni successive richiedono inoltre `--user-data-dir` ogni volta che è impostato `--remote-debugging-pipe`. Senza questi argomenti il comando fallisce con `unknown error - Method not available`.

`--remote-debugging-pipe` è la pipe tra il driver e il browser. La sessione BiDi continua a utilizzare `webSocketUrl`.

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

Usa `ms:edgeOptions` per Edge. Firefox carica l'estensione in una normale sessione BiDi e non necessita di questi argomenti.

## Suggerimenti e Trucchi

La sezione seguente contiene una serie di suggerimenti e trucchi utili durante il test di una web extension.

### Testare il Popup Modale in Chrome

Se definisci una voce browser action `default_popup` nel tuo [manifest dell'estensione](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action) puoi testare direttamente quella pagina HTML, poiché fare clic sull'icona dell'estensione nella barra superiore del browser non funzionerà. Devi invece aprire direttamente il file html del popup.

In Chrome questo funziona recuperando l'ID dell'estensione e aprendo la pagina del popup tramite `browser.url('...')`. Il comportamento su quella pagina sarà lo stesso che all'interno del popup. Per farlo, consigliamo di scrivere il seguente comando personalizzato:

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

Nel tuo `wdio.conf.js` puoi importare questo file e registrare il comando personalizzato nell'hook `before`, ad esempio:

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

Ora, nel tuo test, puoi accedere alla pagina del popup tramite:

```ts
await browser.openExtensionPopup('My Web Extension')
```