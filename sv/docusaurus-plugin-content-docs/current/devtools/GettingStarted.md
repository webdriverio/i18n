---
id: getting-started
title: Kom igång
description: "Installera WebdriverIO DevTools och kör ditt första test i live-läge eller trace-läge för att spela upp DOM, skärmbilder, nätverk och konsolutdata."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

WebdriverIO DevTools ger dina end-to-end-webbläsartester ett utvecklarverktygsgränssnitt för att köra, felsöka och inspektera automatisering — DOM-uppspelning, skärmbilder per kommando, insamling av nätverks- och konsoldata samt skärminspelningar av sessioner. Det körs i två lägen. **Live-läge** öppnar en interaktiv [dashboard](/docs/devtools/dashboard) i ett webbläsarfönster medan dina tester körs, så att du kan följa och köra om dem i realtid. **Trace-läge** hoppar över gränssnittet och skriver en portabel, offline [trace-artefakt](/docs/devtools/wdio/trace-mode) (`trace.zip`) som du senare kan öppna i `show-trace`-spelaren — perfekt för CI. Den här sidan får dig snabbt igång med live-läge; trace-läge är bara ett alternativ bort.

## Installation och första körning

Välj din adapter, installera den och lägg till den minimala konfigurationen nedan. Kör dina tester som vanligt — DevTools-dashboarden öppnas automatiskt i ett nytt webbläsarfönster.

<Tabs
defaultValue="wdio"
values={[
{label: 'WebdriverIO', value: 'wdio'},
{label: 'Selenium', value: 'selenium'},
{label: 'Nightwatch', value: 'nightwatch'},
]}
>
<TabItem value="wdio">

Installera tjänsten:

```sh
npm install @wdio/devtools-service --save-dev
```

Lägg till den i din testkörarkonfiguration:

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

Kör dina WebdriverIO-tester som vanligt — DevTools-gränssnittet öppnas automatiskt och testerna börjar visualiseras direkt.

</TabItem>
<TabItem value="selenium">

Fungerar med Mocha, Jest, Cucumber eller ett vanligt `node`-skript — pluginet identifierar testköraren automatiskt. Installera det:

```bash
npm install @wdio/selenium-devtools
```

Lägg till en enda import och ett `configure`-anrop högst upp i din testfil (Mocha visas):

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

Kör det — DevTools-gränssnittet öppnas i ett nytt Chrome-fönster:

```bash
mocha --timeout 60000 tests/example.test.js
```

Se [Selenium-sidan](/docs/devtools/selenium) för konfigurationer med Jest, Cucumber och ren Node.

</TabItem>
<TabItem value="nightwatch">

Installera adaptern:

```bash
npm install @wdio/nightwatch-devtools
```

Koppla in den i din Nightwatch-konfiguration via `globals` — inga ändringar i testfilerna behövs:

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // Krävs för insamling av nätverksförfrågningar
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

Kör dina tester som vanligt — DevTools-gränssnittet öppnas automatiskt:

```bash
nightwatch
```

Se [Nightwatch-sidan](/docs/devtools/nightwatch) för konfigurationen med Cucumber/BDD.

</TabItem>
</Tabs>

## Nästa steg

- **[Trace-läge](/docs/devtools/wdio/trace-mode)** — ange `mode: 'trace'` för att hoppa över gränssnittet och skapa en portabel, offline trace-artefakt för CI.
- **[Konfigurationsreferens](/docs/devtools/reference)** — alla alternativ för samtliga tre adaptrar.
- **Ramverk** — fullständiga guider per adapter: [WebdriverIO](/docs/devtools/wdio), [Selenium](/docs/devtools/selenium), [Nightwatch](/docs/devtools/nightwatch).