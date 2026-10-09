---
id: getting-started
title: Erste Schritte
description: "Installieren Sie WebdriverIO DevTools und führen Sie Ihren ersten Test im Live-Modus oder Trace-Modus aus, um DOM, Screenshots, Netzwerk- und Konsolenausgaben wiederzugeben."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

WebdriverIO DevTools stattet Ihre End-to-End-Browsertests mit einer Developer-Tools-Oberfläche zum Ausführen, Debuggen und Untersuchen von Automatisierungen aus — DOM-Wiedergabe, Screenshots pro Befehl, Erfassung von Netzwerk- und Konsolenausgaben sowie Session-Screencasts. Es läuft in zwei Modi. Der **Live-Modus** öffnet ein interaktives [Dashboard](/docs/devtools/dashboard) in einem Browserfenster, während Ihre Tests ausgeführt werden, sodass Sie diese in Echtzeit beobachten und erneut ausführen können. Der **Trace-Modus** verzichtet auf die Oberfläche und schreibt ein portables, offline nutzbares [Trace-Artefakt](/docs/devtools/wdio/trace-mode) (`trace.zip`), das Sie später im `show-trace`-Player öffnen können — ideal für CI. Diese Seite bringt Sie schnell in den Live-Modus; der Trace-Modus ist nur eine Option entfernt.

## Installation & erster Durchlauf

Wählen Sie Ihren Adapter, installieren Sie ihn und fügen Sie die unten gezeigte minimale Konfiguration hinzu. Führen Sie Ihre Tests wie gewohnt aus — das DevTools-Dashboard öffnet sich automatisch in einem neuen Browserfenster.

<Tabs
defaultValue="wdio"
values={[
{label: 'WebdriverIO', value: 'wdio'},
{label: 'Selenium', value: 'selenium'},
{label: 'Nightwatch', value: 'nightwatch'},
]}
>
<TabItem value="wdio">

Installieren Sie den Service:

```sh
npm install @wdio/devtools-service --save-dev
```

Fügen Sie ihn zu Ihrer Testrunner-Konfiguration hinzu:

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

Führen Sie Ihre WebdriverIO-Tests wie gewohnt aus — die DevTools-Oberfläche öffnet sich automatisch und die Tests werden sofort visualisiert.

</TabItem>
<TabItem value="selenium">

Funktioniert mit Mocha, Jest, Cucumber oder einem einfachen `node`-Skript — das Plugin erkennt den Runner automatisch. Installieren Sie es:

```bash
npm install @wdio/selenium-devtools
```

Fügen Sie einen einzelnen Import und einen `configure`-Aufruf am Anfang Ihrer Testdatei hinzu (Beispiel mit Mocha):

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

Führen Sie es aus — die DevTools-Oberfläche öffnet sich in einem neuen Chrome-Fenster:

```bash
mocha --timeout 60000 tests/example.test.js
```

Auf der [Selenium-Seite](/docs/devtools/selenium) finden Sie die Einrichtung für Jest, Cucumber und einfaches Node.

</TabItem>
<TabItem value="nightwatch">

Installieren Sie den Adapter:

```bash
npm install @wdio/nightwatch-devtools
```

Binden Sie ihn über `globals` in Ihre Nightwatch-Konfiguration ein — keine Änderungen an den Testdateien erforderlich:

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

Führen Sie Ihre Tests wie gewohnt aus — die DevTools-Oberfläche öffnet sich automatisch:

```bash
nightwatch
```

Auf der [Nightwatch-Seite](/docs/devtools/nightwatch) finden Sie die Einrichtung für Cucumber/BDD.

</TabItem>
</Tabs>

## Nächste Schritte

- **[Trace-Modus](/docs/devtools/wdio/trace-mode)** — setzen Sie `mode: 'trace'`, um die Oberfläche zu überspringen und ein portables, offline nutzbares Trace-Artefakt für CI zu erzeugen.
- **[Konfigurationsreferenz](/docs/devtools/reference)** — alle Optionen für alle drei Adapter.
- **Frameworks** — vollständige Anleitungen pro Adapter: [WebdriverIO](/docs/devtools/wdio), [Selenium](/docs/devtools/selenium), [Nightwatch](/docs/devtools/nightwatch).