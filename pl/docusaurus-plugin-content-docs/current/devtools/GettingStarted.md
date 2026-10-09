---
id: getting-started
title: Pierwsze kroki
description: "Zainstaluj WebdriverIO DevTools i uruchom swój pierwszy test w trybie na żywo lub w trybie śledzenia, aby odtworzyć DOM, zrzuty ekranu, ruch sieciowy i dane wyjściowe konsoli."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

WebdriverIO DevTools zapewnia Twoim testom przeglądarkowym end-to-end interfejs narzędzi deweloperskich do uruchamiania, debugowania i analizowania automatyzacji — odtwarzanie DOM, zrzuty ekranu dla każdej komendy, przechwytywanie ruchu sieciowego i konsoli oraz nagrania ekranu sesji. Działa w dwóch trybach. **Tryb na żywo** otwiera interaktywny [panel](/docs/devtools/dashboard) w oknie przeglądarki podczas wykonywania testów, dzięki czemu możesz je obserwować i ponownie uruchamiać w czasie rzeczywistym. **Tryb śledzenia** pomija interfejs i zapisuje przenośny, działający offline [artefakt śledzenia](/docs/devtools/wdio/trace-mode) (`trace.zip`), który możesz później otworzyć w odtwarzaczu `show-trace` — idealne rozwiązanie dla CI. Ta strona pozwoli Ci szybko rozpocząć pracę w trybie na żywo; tryb śledzenia to tylko jedna opcja więcej.

## Instalacja i pierwsze uruchomienie

Wybierz swój adapter, zainstaluj go i dodaj poniższą minimalną konfigurację. Uruchom testy jak zwykle — panel DevTools otworzy się automatycznie w nowym oknie przeglądarki.

<Tabs
defaultValue="wdio"
values={[
{label: 'WebdriverIO', value: 'wdio'},
{label: 'Selenium', value: 'selenium'},
{label: 'Nightwatch', value: 'nightwatch'},
]}
>
<TabItem value="wdio">

Zainstaluj usługę:

```sh
npm install @wdio/devtools-service --save-dev
```

Dodaj ją do konfiguracji test runnera:

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

Uruchom testy WebdriverIO jak zwykle — interfejs DevTools otworzy się automatycznie, a testy od razu zaczną być wizualizowane.

</TabItem>
<TabItem value="selenium">

Działa z Mocha, Jest, Cucumber lub zwykłym skryptem `node` — wtyczka automatycznie wykrywa runner. Zainstaluj ją:

```bash
npm install @wdio/selenium-devtools
```

Dodaj pojedynczy import i jedno wywołanie `configure` na początku pliku testowego (przykład dla Mocha):

```js
// tests/example.test.js
import { Builder, By, until } from 'selenium-webdriver'
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('smoke test', function () {
  let driver

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async function () {
    if (driver) {
      await driver.quit()
    }
  })

  it('loads example.com', async function () {
    await driver.get('https://example.com')
    await driver.wait(until.elementLocated(By.css('h1')), 10000)
  })
})
```

Uruchom go — interfejs DevTools otworzy się w nowym oknie Chrome:

```bash
mocha --timeout 60000 tests/example.test.js
```

Zobacz [stronę Selenium](/docs/devtools/selenium), aby poznać konfigurację dla Jest, Cucumber i zwykłego Node.

</TabItem>
<TabItem value="nightwatch">

Zainstaluj adapter:

```bash
npm install @wdio/nightwatch-devtools
```

Podłącz go do konfiguracji Nightwatch poprzez `globals` — bez potrzeby zmian w plikach testowych:

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // Wymagane do przechwytywania żądań sieciowych
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

Uruchom testy jak zwykle — interfejs DevTools otworzy się automatycznie:

```bash
nightwatch
```

Zobacz [stronę Nightwatch](/docs/devtools/nightwatch), aby poznać konfigurację dla Cucumber/BDD.

</TabItem>
</Tabs>

## Kolejne kroki

- **[Tryb śledzenia](/docs/devtools/wdio/trace-mode)** — ustaw `mode: 'trace'`, aby pominąć interfejs i wygenerować przenośny, działający offline artefakt śledzenia dla CI.
- **[Dokumentacja konfiguracji](/docs/devtools/reference)** — wszystkie opcje dla wszystkich trzech adapterów.
- **Frameworki** — pełne przewodniki dla poszczególnych adapterów: [WebdriverIO](/docs/devtools/wdio), [Selenium](/docs/devtools/selenium), [Nightwatch](/docs/devtools/nightwatch).