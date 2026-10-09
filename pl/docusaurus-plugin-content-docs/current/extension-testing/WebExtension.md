---
id: web-extensions
title: Testowanie rozszerzeń przeglądarki
description: "Ładowanie rozszerzenia przeglądarki do Chrome lub Firefox na potrzeby sesji WebdriverIO, w tym instalacja i odinstalowanie przez BiDi w trakcie sesji."
---

WebdriverIO to idealne narzędzie do automatyzacji przeglądarki. Rozszerzenia przeglądarki (Web Extensions) są częścią przeglądarki i można je automatyzować w ten sam sposób. Jeśli Twoje rozszerzenie używa skryptów treści (content scripts) do uruchamiania JavaScriptu na stronach internetowych lub oferuje okno popup, możesz przeprowadzić dla niego test e2e przy użyciu WebdriverIO.

Załaduj rozszerzenie przed pierwszą nawigacją, korzystając z poniższej konfiguracji capabilities. Aby zainstalować i usunąć rozszerzenie w trakcie sesji [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-webExtension), użyj [`installExtension`](/docs/api/browser/installExtension) oraz [`uninstallExtension`](/docs/api/browser/uninstallExtension).

## Ładowanie rozszerzenia do przeglądarki

W pierwszym kroku musimy załadować testowane rozszerzenie do przeglądarki w ramach naszej sesji. W Chrome i Firefox działa to inaczej.

:::info

Ta dokumentacja pomija rozszerzenia dla Safari, ponieważ ich wsparcie jest mocno w tyle, a zapotrzebowanie użytkowników nie jest duże. Safari nie ma też sesji WebDriver BiDi, więc [`installExtension`](/docs/api/browser/installExtension) nie obsługuje Safari. Jeśli tworzysz rozszerzenie dla Safari, [zgłoś issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) i pomóż dodać je również tutaj.

:::

### Chrome

Rozszerzenie można załadować w Chrome, podając zakodowany w `base64` ciąg pliku `crx` lub podając ścieżkę do folderu z rozszerzeniem. Najprościej jest zrobić to drugie, definiując capabilities Chrome w następujący sposób:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // zakładając, że wdio.conf.js znajduje się w katalogu głównym, a skompilowane
            // pliki rozszerzenia znajdują się w folderze `./dist`
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Jeśli automatyzujesz inną przeglądarkę niż Chrome, np. Brave, Edge lub Opera, prawdopodobnie opcje przeglądarki są zgodne z powyższym przykładem, tylko z inną nazwą capability, np. `ms:edgeOptions`.

:::

Jeśli kompilujesz rozszerzenie do pliku `.crx`, używając np. pakietu NPM [crx](https://www.npmjs.com/package/crx), możesz również wstrzyknąć spakowane rozszerzenie za pomocą:

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

Aby utworzyć profil Firefox zawierający rozszerzenia, możesz użyć [Firefox Profile Service](/docs/firefox-profile-service), aby odpowiednio skonfigurować sesję. Możesz jednak napotkać problemy, w których lokalnie rozwijane rozszerzenie nie może zostać załadowane z powodu problemów z podpisem. W takim przypadku możesz również załadować rozszerzenie w hooku `before` za pomocą polecenia [`installAddOn`](/docs/api/gecko#installaddon), np.:

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

Do wygenerowania pliku `.xpi` zaleca się użycie pakietu NPM [`web-ext`](https://www.npmjs.com/package/web-ext). Możesz spakować swoje rozszerzenie, używając następującego przykładowego polecenia:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## Instalowanie rozszerzenia w trakcie sesji

Od wersji v10 [`browser.installExtension`](/docs/api/browser/installExtension) i [`browser.uninstallExtension`](/docs/api/browser/uninstallExtension) instalują rozszerzenie przeglądarki w trakcie sesji WebDriver BiDi i zwracają jego id. Używaj ich, gdy rozszerzenie nie może być obecne przy uruchomieniu lub gdy ten sam test je instaluje, testuje i usuwa.

Opisana wyżej konfiguracja capabilities oraz `installAddOn` pozostają sposobem na załadowanie rozszerzenia przed pierwszą nawigacją. `installExtension` ich nie zastępuje. `browser.webExtensionInstall` i `browser.webExtensionUninstall` pozostają dostępne, gdy chcesz samodzielnie przygotować [payload zgodny ze specyfikacją](https://w3c.github.io/webdriver-bidi/#command-webExtension-install).

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

`installExtension` akceptuje trzy rodzaje danych wejściowych:

| Dane wejściowe | Payload wysyłany do przeglądarki |
| --- | --- |
| Ścieżka do katalogu | `{ type: 'path', path }` po `path.resolve`. Przeglądarka musi mieć możliwość odczytu tego katalogu. |
| Ścieżka do pliku `.zip`, `.xpi` lub `.crx` | `{ type: 'archivePath', path }` po `path.resolve`. |
| `{ base64: string }` | `{ type: 'base64', value }`. Bajty archiwum. Każdy inny obiekt jest odrzucany. |

Ścieżka w postaci ciągu znaków jest zawsze rozwiązywana po stronie test runnera. W sesji zdalnej — z nazwą hosta inną niż `localhost`, `127.0.0.1` lub `::1`, albo z chmurowymi `user` i `key` — ta ścieżka nie jest ścieżką na maszynie przeglądarki. Polecenie odczytuje archiwum lub pakuje katalog do ZIP w pamięci i wysyła `base64`. Nie musisz samodzielnie rozróżniać sesji lokalnej i zdalnej. Sesje lokalne wysyłają `path` lub `archivePath` i nie odczytują bajtów.

Wskaż katalog główny rozszerzenia, czyli folder zawierający `manifest.json`.

Sesja musi obsługiwać WebDriver BiDi. Sesja klasyczna rzuca błąd `installExtension requires a WebDriver BiDi session (webExtension.install)`. Przeglądarka, która implementuje BiDi, ale nie ten moduł, kończy polecenie błędem `unsupported operation` (lub `unknown command`, gdy modułu brak). Nieprawidłowe archiwum kończy się błędem `invalid web extension`. Odinstalowanie id, którego przeglądarka nie zna, kończy się błędem `no such web extension`.

`uninstallExtension` przyjmuje ciąg id zwrócony przez `installExtension`.

### Chromium

Chrome i Edge implementują `webExtension.install`, ale pozostawiają tę funkcję wyłączoną, dopóki nie uruchomisz przeglądarki z `--enable-unsafe-extension-debugging` i `--remote-debugging-pipe`. Chrome 136 i nowsze wymagają również `--user-data-dir`, gdy ustawiono `--remote-debugging-pipe`. Bez tych argumentów polecenie kończy się błędem `unknown error - Method not available`.

`--remote-debugging-pipe` to potok (pipe) między sterownikiem a przeglądarką. Sesja BiDi nadal używa `webSocketUrl`.

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

Dla Edge użyj `ms:edgeOptions`. Firefox ładuje rozszerzenie w zwykłej sesji BiDi i nie potrzebuje tych argumentów.

## Porady i triki

Poniższa sekcja zawiera zestaw przydatnych porad i trików, które mogą pomóc podczas testowania rozszerzenia przeglądarki.

### Testowanie okna popup w Chrome

Jeśli w [manifeście rozszerzenia](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action) zdefiniujesz wpis akcji przeglądarki `default_popup`, możesz bezpośrednio przetestować tę stronę HTML, ponieważ kliknięcie ikony rozszerzenia na górnym pasku przeglądarki nie zadziała. Zamiast tego musisz bezpośrednio otworzyć plik HTML okna popup.

W Chrome działa to poprzez pobranie ID rozszerzenia i otwarcie strony popup za pomocą `browser.url('...')`. Zachowanie na tej stronie będzie takie samo jak w oknie popup. W tym celu zalecamy napisanie następującego niestandardowego polecenia:

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

W pliku `wdio.conf.js` możesz zaimportować ten plik i zarejestrować niestandardowe polecenie w hooku `before`, np.:

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

Teraz w swoim teście możesz uzyskać dostęp do strony popup za pomocą:

```ts
await browser.openExtensionPopup('My Web Extension')
```