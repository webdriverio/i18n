---
id: getting-started
title: Erste Schritte
description: "Installiere WebdriverIO DevTools und führe deinen ersten Test im Live-Modus oder Trace-Modus aus, um DOM, Screenshots, Netzwerk- und Konsolenausgaben wiederzugeben."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

WebdriverIO DevTools stattet deine End-to-End-Browsertests mit einer Developer-Tools-Oberfläche zum Ausführen, Debuggen und Untersuchen von Automatisierungen aus – DOM-Replay, Screenshots pro Befehl, Erfassung von Netzwerk- und Konsolenausgaben sowie Session-Screencasts. Es läuft in zwei Modi. Der **Live-Modus** öffnet ein interaktives [Dashboard](/docs/devtools/dashboard) in einem Browserfenster, während deine Tests ausgeführt werden, sodass du sie in Echtzeit beobachten und erneut ausführen kannst. Der **Trace-Modus** verzichtet auf die Oberfläche und schreibt ein portables, offline nutzbares [Trace-Artefakt](/docs/devtools/wdio/trace-mode) (`trace.zip`), das du später im `show-trace`-Player öffnen kannst – ideal für CI. Diese Seite bringt dich schnell in den Live-Modus; der Trace-Modus ist nur eine Option entfernt.

## Installation & erster Lauf

Wähle deinen Adapter, installiere ihn und füge die unten gezeigte minimale Konfiguration hinzu. Führe deine Tests wie gewohnt aus – das DevTools-Dashboard öffnet sich automatisch in einem neuen Browserfenster.

<Tabs
defaultValue="wdio"
values={[
{label: 'WebdriverIO', value: 'wdio'},
{label: 'Selenium', value: 'selenium'},
{label: 'Nightwatch', value: 'nightwatch'},
]}
>
<TabItem value="wdio">

Installiere den Service:

```sh
npm install @wdio/devtools-service --save-dev
```

Füge ihn zu deiner Testrunner-Konfiguration hinzu:

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

Führe deine WebdriverIO-Tests wie gewohnt aus – die DevTools-Oberfläche öffnet sich automatisch und die Tests werden sofort visualisiert.

</TabItem>
<TabItem value="selenium">

Funktioniert mit Mocha, Jest, Cucumber oder einem einfachen `node`-Skript – das Plugin erkennt den Runner automatisch. Installiere es:

```bash
npm install @wdio/selenium-devtools
```

Füge einen einzelnen Import und einen `configure`-Aufruf am Anfang deiner Testdatei hinzu (hier mit Mocha):

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

Führe ihn aus – die DevTools-Oberfläche öffnet sich in einem neuen Chrome-Fenster:

```bash
mocha --timeout 60000 tests/example.test.js
```

Auf der [Selenium-Seite](/docs/devtools/selenium) findest du die Setups für Jest, Cucumber und reines Node.

</TabItem>
<TabItem value="nightwatch">

Installiere den Adapter:

```bash
npm install @wdio/nightwatch-devtools
```

Binde ihn über `globals` in deine Nightwatch-Konfiguration ein – keine Änderungen an den Testdateien nötig:

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // Erforderlich für die Erfassung von Netzwerkanfragen
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

Führe deine Tests wie gewohnt aus – die DevTools-Oberfläche öffnet sich automatisch:

```bash
nightwatch
```

Auf der [Nightwatch-Seite](/docs/devtools/nightwatch) findest du das Cucumber/BDD-Setup.

</TabItem>
</Tabs>

## Nächste Schritte

- **[Trace-Modus](/docs/devtools/wdio/trace-mode)** – setze `mode: 'trace'`, um die Oberfläche zu überspringen und ein portables, offline nutzbares Trace-Artefakt für CI zu erzeugen.
- **[Konfigurationsreferenz](/docs/devtools/reference)** – alle Optionen für alle drei Adapter.
- **Frameworks** – vollständige Anleitungen pro Adapter: [WebdriverIO](/docs/devtools/wdio), [Selenium](/docs/devtools/selenium), [Nightwatch](/docs/devtools/nightwatch).