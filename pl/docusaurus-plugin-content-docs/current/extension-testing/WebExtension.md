---
id: web-extensions
title: Testowanie Rozszerzeń Internetowych
---

WebdriverIO jest idealnym narzędziem do automatyzacji przeglądarki. Rozszerzenia internetowe są częścią przeglądarki i mogą być automatyzowane w ten sam sposób. Gdy twoje rozszerzenie internetowe wykorzystuje skrypty zawartości do uruchamiania JavaScriptu na stronach internetowych lub oferuje wyskakujące okienko, możesz przeprowadzić test e2e za pomocą WebdriverIO.

## Ładowanie Rozszerzenia Internetowego do Przeglądarki

Pierwszym krokiem jest załadowanie testowanego rozszerzenia do przeglądarki jako część naszej sesji. Proces ten różni się dla Chrome i Firefoxa.

:::info

W tych dokumentach pomijamy rozszerzenia internetowe dla Safari, ponieważ ich wsparcie jest znacznie opóźnione, a zapotrzebowanie użytkowników nie jest wysokie. Jeśli tworzysz rozszerzenie internetowe dla Safari, prosimy o [zgłoszenie problemu](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) i współpracę przy włączeniu go również tutaj.

:::

### Chrome

Ładowanie rozszerzenia internetowego w Chrome można wykonać przez dostarczenie zakodowanego ciągu `base64` pliku `crx` lub przez wskazanie ścieżki do folderu rozszerzenia internetowego. Najłatwiej jest zrobić to drugie, definiując swoje możliwości Chrome w następujący sposób:

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
            // pliki rozszerzenia internetowego znajdują się w folderze `./dist`
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Jeśli automatyzujesz inną przeglądarkę niż Chrome, np. Brave, Edge lub Opera, istnieje szansa, że opcje przeglądarki są zgodne z powyższym przykładem, tylko używając innej nazwy możliwości, np. `ms:edgeOptions`.

:::

Jeśli kompilujesz swoje rozszerzenie jako plik `.crx` za pomocą np. pakietu NPM [crx](https://www.npmjs.com/package/crx), możesz również wstrzyknąć spakowane rozszerzenie przez:

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

Aby utworzyć profil Firefoksa, który zawiera rozszerzenia, możesz użyć [Firefox Profile Service](/docs/firefox-profile-service) do odpowiedniego skonfigurowania sesji. Jednak możesz napotkać problemy, gdy twoje lokalnie opracowane rozszerzenie nie może zostać załadowane z powodu problemów z podpisywaniem. W takim przypadku możesz również załadować rozszerzenie w hooku `before` za pomocą polecenia [`installAddOn`](/docs/api/gecko#installaddon), np.:

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

Aby wygenerować plik `.xpi`, zaleca się korzystanie z pakietu NPM [`web-ext`](https://www.npmjs.com/package/web-ext). Możesz spakować swoje rozszerzenie za pomocą następującego przykładowego polecenia:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## Wskazówki i Triki

Poniższa sekcja zawiera zestaw przydatnych wskazówek i trików, które mogą być pomocne podczas testowania rozszerzenia internetowego.

### Testowanie Wyskakującego Okienka w Chrome

Jeśli definiujesz wpis `default_popup` akcji przeglądarki w [manifeście rozszerzenia](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action), możesz testować tę stronę HTML bezpośrednio, ponieważ kliknięcie ikony rozszerzenia na górnym pasku przeglądarki nie zadziała. Zamiast tego musisz bezpośrednio otworzyć plik HTML wyskakującego okienka.

W Chrome działa to poprzez pobranie identyfikatora rozszerzenia i otwarcie strony wyskakującego okienka za pomocą `browser.url('...')`. Zachowanie na tej stronie będzie takie samo jak w wyskakującym okienku. Zalecamy napisanie następującego niestandardowego polecenia:

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

W swoim `wdio.conf.js` możesz zaimportować ten plik i zarejestrować niestandardowe polecenie w swoim hooku `before`, np.:

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

Teraz w swoim teście możesz uzyskać dostęp do strony wyskakującego okienka za pomocą:

```ts
await browser.openExtensionPopup('Moje Rozszerzenie Internetowe')
```