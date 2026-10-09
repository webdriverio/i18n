---
id: web-extensions
title: Testning av webbtillägg
description: "Ladda ett webbtillägg i Chrome eller Firefox för en WebdriverIO-session, inklusive installation och avinstallation via BiDi mitt under sessionen."
---

WebdriverIO är det perfekta verktyget för att automatisera en webbläsare. Webbtillägg är en del av webbläsaren och kan automatiseras på samma sätt. Närhelst ditt webbtillägg använder innehållsskript för att köra JavaScript på webbplatser eller erbjuder en popup-modal kan du köra ett e2e-test för det med WebdriverIO.

Ladda tillägget före den första navigeringen med capability-konfigurationen nedan. För att installera och ta bort ett tillägg mitt i en [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-webExtension)-session använder du [`installExtension`](/docs/api/browser/installExtension) och [`uninstallExtension`](/docs/api/browser/uninstallExtension).

## Ladda ett webbtillägg i webbläsaren

Som ett första steg måste vi ladda tillägget som testas i webbläsaren som en del av vår session. Detta fungerar olika för Chrome och Firefox.

:::info

Denna dokumentation utelämnar Safari-webbtillägg eftersom stödet för dem ligger långt efter och efterfrågan från användare inte är hög. Safari har inte heller någon WebDriver BiDi-session, så [`installExtension`](/docs/api/browser/installExtension) täcker inte Safari. Om du bygger ett webbtillägg för Safari, vänligen [skapa ett ärende](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) och samarbeta för att inkludera det här också.

:::

### Chrome

Att ladda ett webbtillägg i Chrome kan göras genom att ange en `base64`-kodad sträng av `crx`-filen eller genom att ange en sökväg till webbtilläggets mapp. Det enklaste är att göra det senare genom att definiera dina Chrome-capabilities enligt följande:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // förutsatt att din wdio.conf.js ligger i rotkatalogen och dina kompilerade
            // webbtilläggsfiler finns i mappen `./dist`
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Om du automatiserar en annan webbläsare än Chrome, t.ex. Brave, Edge eller Opera, är chansen stor att webbläsaralternativen matchar exemplet ovan, bara med ett annat capability-namn, t.ex. `ms:edgeOptions`.

:::

Om du kompilerar ditt tillägg som en `.crx`-fil med t.ex. NPM-paketet [crx](https://www.npmjs.com/package/crx) kan du också injicera det paketerade tillägget via:

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

För att skapa en Firefox-profil som innehåller tillägg kan du använda [Firefox Profile Service](/docs/firefox-profile-service) för att konfigurera din session därefter. Du kan dock stöta på problem där ditt lokalt utvecklade tillägg inte kan laddas på grund av signeringsproblem. I det fallet kan du också ladda ett tillägg i `before`-hooken via kommandot [`installAddOn`](/docs/api/gecko#installaddon), t.ex.:

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

För att generera en `.xpi`-fil rekommenderas det att använda NPM-paketet [`web-ext`](https://www.npmjs.com/package/web-ext). Du kan paketera ditt tillägg med följande exempelkommando:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## Installera ett tillägg under sessionen

Sedan v10 installerar [`browser.installExtension`](/docs/api/browser/installExtension) och [`browser.uninstallExtension`](/docs/api/browser/uninstallExtension) ett webbtillägg mitt i en WebDriver BiDi-session och returnerar dess id. Använd dem när tillägget inte får finnas vid start, eller när samma test installerar det, använder det och tar bort det.

Capability-konfigurationen och `installAddOn` ovan förblir sättet att ladda ett tillägg före den första navigeringen. `installExtension` ersätter dem inte. `browser.webExtensionInstall` och `browser.webExtensionUninstall` förblir tillgängliga när du själv vill skicka [spec-payloaden](https://w3c.github.io/webdriver-bidi/#command-webExtension-install).

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

`installExtension` accepterar tre typer av indata:

| Indata | Payload som skickas till webbläsaren |
| --- | --- |
| En katalogsökväg | `{ type: 'path', path }` efter `path.resolve`. Webbläsaren måste kunna läsa den katalogen. |
| En sökväg till `.zip`, `.xpi` eller `.crx` | `{ type: 'archivePath', path }` efter `path.resolve`. |
| `{ base64: string }` | `{ type: 'base64', value }`. Arkivbytes. Alla andra objekt avvisas. |

En strängsökväg löses alltid upp på testkörarens sida. I en fjärrsession — ett värdnamn annat än `localhost`, `127.0.0.1` eller `::1`, eller en moln-`user` och `key` — är den sökvägen inte en sökväg på webbläsarens maskin. Kommandot läser ett arkiv, eller zippar en katalog i minnet, och skickar `base64`. Du behöver inte själv skilja på lokalt och fjärr. Lokala sessioner skickar `path` eller `archivePath` och läser inte in bytesen.

Peka en katalog mot tilläggets rot, mappen som innehåller `manifest.json`.

Sessionen måste använda WebDriver BiDi. En klassisk session kastar `installExtension requires a WebDriver BiDi session (webExtension.install)`. En webbläsare som implementerar BiDi men inte denna modul låter kommandot misslyckas med `unsupported operation` (eller `unknown command` när modulen saknas). Ett felaktigt arkiv misslyckas med `invalid web extension`. Att avinstallera ett id som webbläsaren inte känner till misslyckas med `no such web extension`.

`uninstallExtension` tar id-strängen som `installExtension` returnerade.

### Chromium

Chrome och Edge implementerar `webExtension.install` men håller det avstängt tills du startar webbläsaren med `--enable-unsafe-extension-debugging` och `--remote-debugging-pipe`. Chrome 136 och nyare kräver också `--user-data-dir` närhelst `--remote-debugging-pipe` är angivet. Utan dessa argument misslyckas kommandot med `unknown error - Method not available`.

`--remote-debugging-pipe` är kanalen mellan drivrutinen och webbläsaren. BiDi-sessionen använder fortfarande `webSocketUrl`.

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

Använd `ms:edgeOptions` för Edge. Firefox laddar tillägget i en vanlig BiDi-session och behöver inte dessa argument.

## Tips & tricks

Följande avsnitt innehåller ett antal användbara tips och tricks som kan vara till hjälp när du testar ett webbtillägg.

### Testa popup-modal i Chrome

Om du definierar en `default_popup`-post för browser action i ditt [tilläggsmanifest](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action) kan du testa den HTML-sidan direkt, eftersom det inte fungerar att klicka på tilläggsikonen i webbläsarens övre fält. Istället måste du öppna popup-HTML-filen direkt.

I Chrome fungerar detta genom att hämta tilläggets ID och öppna popup-sidan via `browser.url('...')`. Beteendet på den sidan blir detsamma som i popupen. För att göra detta rekommenderar vi att du skriver följande anpassade kommando:

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

I din `wdio.conf.js` kan du importera denna fil och registrera det anpassade kommandot i din `before`-hook, t.ex.:

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