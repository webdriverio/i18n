---
id: web-extensions
title: Testning av webbextensioner
---

WebdriverIO är det ideala verktyget för att automatisera en webbläsare. Webbextensioner är en del av webbläsaren och kan automatiseras på samma sätt. När din webbextension använder innehållsskript för att köra JavaScript på webbplatser eller erbjuder en popup-modal, kan du köra ett e2e-test för detta med hjälp av WebdriverIO.

## Ladda en webbextension i webbläsaren

Som ett första steg måste vi ladda webbextensionen som ska testas i webbläsaren som en del av vår session. Detta fungerar olika för Chrome och Firefox.

:::info

Dessa dokument utelämnar Safari-webbextensioner eftersom deras stöd för det ligger långt efter och användarefterfrågan inte är hög. Om du bygger en webbextension för Safari, vänligen [skapa ett ärende](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) och samarbeta för att inkludera det här också.

:::

### Chrome

Att ladda en webbextension i Chrome kan göras genom att tillhandahålla en `base64`-kodad sträng av `crx`-filen eller genom att ange en sökväg till webbextensionsmappen. Det enklaste är att göra det senare genom att definiera dina Chrome-funktioner enligt följande:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // given your wdio.conf.js is in the root directory and your compiled
            // web extension files are located in the `./dist` folder
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Om du automatiserar en annan webbläsare än Chrome, t.ex. Brave, Edge eller Opera, är det troligt att webbläsaralternativen matchar exemplet ovan, men använder ett annat egenskapsnamn, t.ex. `ms:edgeOptions`.

:::

Om du kompilerar din webbextension som en `.crx`-fil med t.ex. NPM-paketet [crx](https://www.npmjs.com/package/crx), kan du också injicera den paketerade webbextensionen via:

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

För att skapa en Firefox-profil som inkluderar tillägg kan du använda [Firefox Profile Service](/docs/firefox-profile-service) för att konfigurera din session på lämpligt sätt. Du kan dock stöta på problem där din lokalt utvecklade webbextension inte kan laddas på grund av signeringsproblem. I detta fall kan du också ladda en webbextension i `before`-kroken via kommandot [`installAddOn`](/docs/api/gecko#installaddon), t.ex.:

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

För att generera en `.xpi`-fil rekommenderas att använda NPM-paketet [`web-ext`](https://www.npmjs.com/package/web-ext). Du kan paketera din webbextension med följande exempelkommando:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## Tips och tricks

Följande avsnitt innehåller användbara tips och tricks som kan vara till hjälp när du testar en webbextension.

### Testa popup-modal i Chrome

Om du definierar en `default_popup`-webbläsaraktionspost i ditt [tilläggsmanifest](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action) kan du testa den HTML-sidan direkt, eftersom att klicka på tilläggsikonen i webbläsarens övre fält inte kommer att fungera. Istället måste du öppna popup-HTML-filen direkt.

I Chrome fungerar detta genom att hämta tilläggs-ID:t och öppna popup-sidan genom `browser.url('...')`. Beteendet på den sidan kommer att vara detsamma som inom popup-fönstret. För att göra detta rekommenderar vi att skriva följande anpassade kommando:

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

I din `wdio.conf.js` kan du importera denna fil och registrera det anpassade kommandot i din `before`-krok, t.ex.:

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

Nu kan du i ditt test komma åt popup-sidan via:

```ts
await browser.openExtensionPopup('My Web Extension')
```