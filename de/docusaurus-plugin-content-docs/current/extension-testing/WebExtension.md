---
id: web-extensions
title: Testen von Web-Erweiterungen
description: "Laden Sie eine Web-Erweiterung in Chrome oder Firefox für eine WebdriverIO-Sitzung, einschließlich Installation und Deinstallation per BiDi während der Sitzung."
---

WebdriverIO ist das ideale Werkzeug, um einen Browser zu automatisieren. Web-Erweiterungen sind ein Teil des Browsers und können auf die gleiche Weise automatisiert werden. Wann immer Ihre Web-Erweiterung Content-Skripte verwendet, um JavaScript auf Websites auszuführen, oder ein Popup-Modal anbietet, können Sie dafür mit WebdriverIO einen E2E-Test ausführen.

Laden Sie die Erweiterung vor der ersten Navigation mit der unten beschriebenen Capability-Konfiguration. Um eine Erweiterung mitten in einer [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-webExtension)-Sitzung zu installieren und zu entfernen, verwenden Sie [`installExtension`](/docs/api/browser/installExtension) und [`uninstallExtension`](/docs/api/browser/uninstallExtension).

## Laden einer Web-Erweiterung in den Browser

Als ersten Schritt müssen wir die zu testende Erweiterung als Teil unserer Sitzung in den Browser laden. Dies funktioniert bei Chrome und Firefox unterschiedlich.

:::info

Diese Dokumentation lässt Safari-Web-Erweiterungen aus, da deren Unterstützung weit zurückliegt und die Nachfrage der Benutzer nicht hoch ist. Safari hat außerdem keine WebDriver-BiDi-Sitzung, daher deckt [`installExtension`](/docs/api/browser/installExtension) Safari nicht ab. Wenn Sie eine Web-Erweiterung für Safari entwickeln, [erstellen Sie bitte ein Issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) und helfen Sie mit, sie hier ebenfalls aufzunehmen.

:::

### Chrome

Das Laden einer Web-Erweiterung in Chrome kann erfolgen, indem man einen `base64`-kodierten String der `crx`-Datei oder einen Pfad zum Ordner der Web-Erweiterung angibt. Am einfachsten ist Letzteres, indem Sie Ihre Chrome-Capabilities wie folgt definieren:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // vorausgesetzt, Ihre wdio.conf.js befindet sich im Stammverzeichnis und Ihre kompilierten
            // Web-Erweiterungsdateien liegen im Ordner `./dist`
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Wenn Sie einen anderen Browser als Chrome automatisieren, z. B. Brave, Edge oder Opera, stehen die Chancen gut, dass die Browser-Optionen mit dem obigen Beispiel übereinstimmen und lediglich ein anderer Capability-Name verwendet wird, z. B. `ms:edgeOptions`.

:::

Wenn Sie Ihre Erweiterung als `.crx`-Datei kompilieren, z. B. mit dem NPM-Paket [crx](https://www.npmjs.com/package/crx), können Sie die gebündelte Erweiterung auch wie folgt einbinden:

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

Um ein Firefox-Profil zu erstellen, das Erweiterungen enthält, können Sie den [Firefox Profile Service](/docs/firefox-profile-service) verwenden, um Ihre Sitzung entsprechend einzurichten. Allerdings kann es vorkommen, dass Ihre lokal entwickelte Erweiterung aufgrund von Signierungsproblemen nicht geladen werden kann. In diesem Fall können Sie eine Erweiterung auch im `before`-Hook über den Befehl [`installAddOn`](/docs/api/gecko#installaddon) laden, z. B.:

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

Um eine `.xpi`-Datei zu erzeugen, wird empfohlen, das NPM-Paket [`web-ext`](https://www.npmjs.com/package/web-ext) zu verwenden. Sie können Ihre Erweiterung mit dem folgenden Beispielbefehl bündeln:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## Eine Erweiterung während der Sitzung installieren

Seit v10 installieren [`browser.installExtension`](/docs/api/browser/installExtension) und [`browser.uninstallExtension`](/docs/api/browser/uninstallExtension) eine Web-Erweiterung mitten in einer WebDriver-BiDi-Sitzung und geben deren ID zurück. Verwenden Sie sie, wenn die Erweiterung beim Start nicht vorhanden sein darf oder wenn derselbe Test sie installiert, nutzt und wieder entfernt.

Die oben beschriebene Capability-Konfiguration und `installAddOn` bleiben der Weg, um eine Erweiterung vor der ersten Navigation zu laden. `installExtension` ersetzt sie nicht. `browser.webExtensionInstall` und `browser.webExtensionUninstall` bleiben verfügbar, wenn Sie den [Spec-Payload](https://w3c.github.io/webdriver-bidi/#command-webExtension-install) selbst angeben möchten.

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

`installExtension` akzeptiert drei Eingaben:

| Eingabe | An den Browser gesendeter Payload |
| --- | --- |
| Ein Verzeichnispfad | `{ type: 'path', path }` nach `path.resolve`. Der Browser muss dieses Verzeichnis lesen können. |
| Ein `.zip`-, `.xpi`- oder `.crx`-Pfad | `{ type: 'archivePath', path }` nach `path.resolve`. |
| `{ base64: string }` | `{ type: 'base64', value }`. Archiv-Bytes. Jedes andere Objekt wird abgelehnt. |

Ein String-Pfad wird immer auf dem Test-Runner aufgelöst. Bei einer Remote-Sitzung – einem anderen Hostnamen als `localhost`, `127.0.0.1` oder `::1` oder mit einem Cloud-`user` und -`key` – ist dieser Pfad kein Pfad auf dem Browser-Rechner. Der Befehl liest ein Archiv bzw. zippt ein Verzeichnis im Arbeitsspeicher und sendet `base64`. Sie müssen nicht selbst zwischen lokal und remote unterscheiden. Lokale Sitzungen senden `path` oder `archivePath` und lesen die Bytes nicht.

Lassen Sie ein Verzeichnis auf das Stammverzeichnis der Erweiterung zeigen, also den Ordner, der `manifest.json` enthält.

Die Sitzung muss WebDriver BiDi sprechen. Eine klassische Sitzung wirft `installExtension requires a WebDriver BiDi session (webExtension.install)`. Ein Browser, der BiDi, aber nicht dieses Modul implementiert, lässt den Befehl mit `unsupported operation` fehlschlagen (oder mit `unknown command`, wenn das Modul fehlt). Ein fehlerhaftes Archiv schlägt mit `invalid web extension` fehl. Das Deinstallieren einer ID, die der Browser nicht kennt, schlägt mit `no such web extension` fehl.

`uninstallExtension` nimmt den ID-String entgegen, den `installExtension` zurückgegeben hat.

### Chromium

Chrome und Edge implementieren `webExtension.install`, lassen es aber deaktiviert, bis Sie den Browser mit `--enable-unsafe-extension-debugging` und `--remote-debugging-pipe` starten. Chrome 136 und neuer erfordern zusätzlich `--user-data-dir`, sobald `--remote-debugging-pipe` gesetzt ist. Ohne diese Argumente schlägt der Befehl mit `unknown error - Method not available` fehl.

`--remote-debugging-pipe` ist die Pipe zwischen Treiber und Browser. Die BiDi-Sitzung verwendet weiterhin `webSocketUrl`.

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

Verwenden Sie `ms:edgeOptions` für Edge. Firefox lädt die Erweiterung in einer normalen BiDi-Sitzung und benötigt diese Argumente nicht.

## Tipps & Tricks

Der folgende Abschnitt enthält eine Reihe nützlicher Tipps und Tricks, die beim Testen einer Web-Erweiterung hilfreich sein können.

### Popup-Modal in Chrome testen

Wenn Sie in Ihrem [Erweiterungsmanifest](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action) einen `default_popup`-Eintrag für die Browser-Aktion definieren, können Sie diese HTML-Seite direkt testen, da ein Klick auf das Erweiterungssymbol in der oberen Leiste des Browsers nicht funktioniert. Stattdessen müssen Sie die Popup-HTML-Datei direkt öffnen.

In Chrome funktioniert dies, indem Sie die Erweiterungs-ID abrufen und die Popup-Seite über `browser.url('...')` öffnen. Das Verhalten auf dieser Seite ist dasselbe wie innerhalb des Popups. Dafür empfehlen wir, den folgenden benutzerdefinierten Befehl zu schreiben:

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

In Ihrer `wdio.conf.js` können Sie diese Datei importieren und den benutzerdefinierten Befehl in Ihrem `before`-Hook registrieren, z. B.:

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

Jetzt können Sie in Ihrem Test wie folgt auf die Popup-Seite zugreifen:

```ts
await browser.openExtensionPopup('My Web Extension')
```