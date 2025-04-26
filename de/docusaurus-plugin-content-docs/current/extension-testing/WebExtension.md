---
id: web-extensions
title: Web Extension Testing
---

WebdriverIO ist das ideale Werkzeug zur Automatisierung eines Browsers. Web Extensions sind Teil des Browsers und können auf die gleiche Weise automatisiert werden. Wann immer Ihre Web-Erweiterung Content-Scripts verwendet, um JavaScript auf Websites auszuführen oder ein Popup-Modal anzubieten, können Sie mit WebdriverIO einen E2E-Test dafür durchführen.

## Laden einer Web Extension in den Browser

Als ersten Schritt müssen wir die zu testende Erweiterung im Rahmen unserer Sitzung in den Browser laden. Dies funktioniert für Chrome und Firefox unterschiedlich.

:::info

Diese Dokumentation lässt Safari-Web-Erweiterungen aus, da deren Unterstützung weit zurückliegt und die Nachfrage der Benutzer nicht hoch ist. Wenn Sie eine Web-Erweiterung für Safari entwickeln, erstellen Sie bitte ein [Issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) und arbeiten Sie daran mit, es hier ebenfalls aufzunehmen.

:::

### Chrome

Das Laden einer Web-Erweiterung in Chrome kann durch Bereitstellung eines `base64`-codierten Strings der `crx`-Datei oder durch Angabe eines Pfads zum Web-Erweiterungsordner erfolgen. Am einfachsten ist es, Letzteres zu tun, indem Sie Ihre Chrome-Capabilities wie folgt definieren:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // angenommen, Ihre wdio.conf.js befindet sich im Stammverzeichnis und Ihre kompilierten
            // Web-Erweiterungsdateien befinden sich im Ordner `./dist`
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Wenn Sie einen anderen Browser als Chrome automatisieren, z.B. Brave, Edge oder Opera, ist es wahrscheinlich, dass die Browser-Option mit dem obigen Beispiel übereinstimmt, nur mit einem anderen Capability-Namen, z.B. `ms:edgeOptions`.

:::

Wenn Sie Ihre Erweiterung als `.crx`-Datei kompilieren, z.B. mit dem [crx](https://www.npmjs.com/package/crx) NPM-Paket, können Sie die gebündelte Erweiterung auch wie folgt einbinden:

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

Um ein Firefox-Profil zu erstellen, das Erweiterungen enthält, können Sie den [Firefox Profile Service](/docs/firefox-profile-service) verwenden, um Ihre Sitzung entsprechend einzurichten. Allerdings könnten Probleme auftreten, wenn Ihre lokal entwickelte Erweiterung aufgrund von Signierungsproblemen nicht geladen werden kann. In diesem Fall können Sie eine Erweiterung auch im `before`-Hook über den [`installAddOn`](/docs/api/gecko#installaddon)-Befehl laden, z.B.:

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

Um eine `.xpi`-Datei zu generieren, wird empfohlen, das NPM-Paket [`web-ext`](https://www.npmjs.com/package/web-ext) zu verwenden. Sie können Ihre Erweiterung mit dem folgenden Beispielbefehl bündeln:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## Tipps & Tricks

Der folgende Abschnitt enthält eine Reihe nützlicher Tipps und Tricks, die beim Testen einer Web-Erweiterung hilfreich sein können.

### Popup-Modal in Chrome testen

Wenn Sie einen `default_popup`-Browser-Action-Eintrag in Ihrem [Erweiterungsmanifest](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action) definieren, können Sie diese HTML-Seite direkt testen, da das Klicken auf das Erweiterungssymbol in der oberen Browserleiste nicht funktionieren wird. Stattdessen müssen Sie die Popup-HTML-Datei direkt öffnen.

In Chrome funktioniert dies, indem Sie die Erweiterungs-ID abrufen und die Popup-Seite über `browser.url('...')` öffnen. Das Verhalten auf dieser Seite wird dasselbe sein wie im Popup. Dazu empfehlen wir, den folgenden benutzerdefinierten Befehl zu schreiben:

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

In Ihrer `wdio.conf.js` können Sie diese Datei importieren und den benutzerdefinierten Befehl in Ihrem `before`-Hook registrieren, z.B.:

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

Jetzt können Sie in Ihrem Test auf die Popup-Seite zugreifen über:

```ts
await browser.openExtensionPopup('My Web Extension')
```