---
id: selenium
title: Selenium DevTools
description: "Fügen Sie die DevTools-Debugging-Oberfläche zu Selenium-WebDriver-Tests in Node.js oder Python mit beliebigem Test-Runner hinzu und aktivieren Sie den Trace-Modus."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Selenium-WebDriver-Adapter für [WebdriverIO DevTools](https://github.com/webdriverio/devtools) – bringt dieselbe visuelle Debugging-Oberfläche in jeden Selenium-Test, in **Node.js** oder **Python**, unabhängig vom Test-Runner.

Node.js funktioniert mit **Mocha**, **Jest**, **Cucumber** oder einem einfachen Skript – das Plugin erkennt den Runner automatisch und verknüpft die Testgrenzen entsprechend. Python funktioniert mit **pytest** oder einem einfachen Skript und erfordert unter pytest überhaupt keine Änderungen an Ihren Testdateien.

Wählen Sie Ihre Sprache in den Tabs unten aus; die Auswahl gilt für die gesamte Seite.

## Installation

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```bash
npm install @wdio/selenium-devtools
```

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install selenium-devtools-py
```

**Erfordert Python 3.10+ und `selenium>=4.44`.** Beides ist in den Paket-Metadaten deklariert, sodass pip es durchsetzt, statt Sie zur Laufzeit einen leeren Network-Tab entdecken zu lassen. Die Netzwerkerfassung abonniert Ereignisse über die öffentliche BiDi-Event-API, die selenium in 4.44 neu generiert hat; die private Verbindung, die sie ersetzt hat, wurde im selben Release entfernt, und 4.44 legt die Mindestversion für Python fest.

</TabItem>
</Tabs>

## Einrichtung

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Jeder Block unten ist ein **vollständiges, direkt kopierbares Beispiel** inklusive des `DevTools.configure(...)`-Aufrufs. Wählen Sie den Runner, den Sie verwenden, fügen Sie das Snippet in Ihr Projekt ein und führen Sie es aus.

### Mocha

```js
// tests/example.test.js
import { strict as assert } from 'node:assert'
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

  it('loads example.com and reads the heading', async function () {
    await driver.get('https://example.com')
    const heading = await driver.wait(until.elementLocated(By.css('h1')), 10000)
    assert.equal(await heading.getText(), 'Example Domain')
  })
})
```

Ausführen:

```bash
mocha --timeout 60000 tests/example.test.js
```

> Alternative: Verzichten Sie auf den Import pro Datei und verwenden Sie `mocha --require @wdio/selenium-devtools`, um das Plugin einmal für den gesamten Lauf zu laden.

### Jest

```js
// test/example.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('login flow', () => {
  let driver

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  }, 60000)

  afterEach(async () => {
    if (driver) {
      await driver.quit()
    }
  })

  test('logs in with valid credentials', async () => {
    await driver.get('https://the-internet.herokuapp.com/login')
    await driver.findElement(By.id('username')).sendKeys('tomsmith')
    await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!')
    await driver.findElement(By.css('button[type="submit"]')).click()

    await driver.wait(until.urlContains('/secure'), 10000)
    const flash = await driver.findElement(By.id('flash'))
    expect(await flash.getText()).toMatch(/You logged into a secure area/i)
  }, 60000)
})
```

`jest.config.json`:

```json
{
  "testEnvironment": "node",
  "testMatch": ["<rootDir>/test/example.js"],
  "testTimeout": 60000,
  "transform": {}
}
```

Ausführen (ESM benötigt das experimentelle Flag):

```bash
NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.json
```

### Cucumber

Die aufgeteilte Struktur von Cucumber bedeutet drei kleine Dateien – eine zum Laden des Plugins, eine für World/Hooks und eine für die Step-Definitionen.

`features/support/setup.js` – Plugin laden und einmalig konfigurieren:

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})
```

`features/support/world.js` – Lebenszyklus des Treibers:

```js
import {
  setWorldConstructor,
  World,
  Before,
  After,
  setDefaultTimeout
} from '@cucumber/cucumber'
import { Builder } from 'selenium-webdriver'

setDefaultTimeout(60000)

class CustomWorld extends World {
  constructor (options) {
    super(options)
    this.driver = null
  }
}

setWorldConstructor(CustomWorld)

Before(async function () {
  this.driver = await new Builder().forBrowser('chrome').build()
})

After(async function () {
  if (this.driver) {
    await this.driver.quit()
    this.driver = null
  }
})
```

`cucumber.json` – binden Sie die Setup-Datei **zuerst** ein, damit das Plugin Selenium patcht, bevor ein Step ausgeführt wird:

```json
{
  "default": {
    "import": [
      "features/support/setup.js",
      "features/support/world.js",
      "features/support/steps.js"
    ],
    "paths": ["features/*.feature"],
    "format": ["progress"]
  }
}
```

Ausführen:

```bash
cucumber-js --config cucumber.json
```

### Einfaches Node-Skript (ohne Test-Runner)

Wenn Sie `node tests/google.test.js` direkt ausführen, gibt es keinen Runner, in den sich das Plugin automatisch einklinken kann. Standardmäßig erhalten Sie eine einzelne Zeile „Selenium Session“ im Dashboard. Um eine benannte Testgrenze zu erhalten, rufen Sie `DevTools.startTest` / `endTest` um Ihren Code herum auf:

```js
// tests/google.test.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until, Key } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 },
  headless: false
})

async function run () {
  DevTools.startTest('search Google for Selenium')   // optional – benennt die Testzeile

  const driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://www.google.com')
    const searchBox = await driver.findElement(By.name('q'))
    await searchBox.sendKeys('Selenium WebDriver JavaScript', Key.ENTER)
    await driver.wait(until.titleContains('Selenium'), 10000)
    DevTools.endTest('passed')
  } catch (err) {
    DevTools.endTest('failed')
    throw err
  } finally {
    await driver.quit()
  }
}

run()
```

```bash
node tests/google.test.js
```

> Verwenden Sie `startTest` / `endTest` nur für einfache Node-Skripte. Unter Mocha / Jest / Cucumber weiß das Plugin bereits, wann jeder Test beginnt und endet – ein manueller Aufruf würde doppelte Zeilen erzeugen.

</TabItem>
<TabItem value="python" label="Python">

### pytest

In Ihre Testdateien kommt nichts – das Plugin wird automatisch erkannt, und ein Flag aktiviert es für den Lauf:

```bash
pytest --devtools tests/              # Live-Dashboard
pytest --devtools-trace tests/        # stattdessen ein Trace-Archiv schreiben (impliziert --devtools)
```

Oder legen Sie die Auswahl im Projekt fest, damit sich niemand das Flag merken muss:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # Trace-Archiv statt Dashboard
# devtools_trace_granularity = "test"            # ... ein Archiv pro Test
# devtools_trace_policy = "retain-on-failure"    # ... nur Fehlgeschlagenes behalten
```

Eine `pytest.ini` mit einem `[pytest]`-Abschnitt akzeptiert dieselben Schlüssel. Die beiden Trace-Einstellungen werden unter [Wie viele Archive und welche behalten werden](#how-many-archives-and-which-ones-to-keep) behandelt.

Die Erfassung ist immer opt-in – die Installation des Pakets darf niemals das Verhalten einer bestehenden Suite ändern. Unterschiedlich ist nur, *wie* Sie zustimmen:

| Wie Sie zustimmen | Geltungsbereich |
|---|---|
| `--devtools` / `--devtools-trace` | dieser Lauf |
| `devtools` / `devtools_trace` in `[tool.pytest.ini_options]` | dieses Projekt |
| `DEVTOOLS_ENABLE=1` (oder `DEVTOOLS_PORT=<n>`, das sich zusätzlich mit einem bereits laufenden Dashboard verbindet) | diese Shell – für CI |

Der höchste Rang gewinnt: CLI, dann ini, dann Umgebung. `pytest -o devtools=false` schaltet einen Projekt-Standard für einen einzelnen Lauf aus, weshalb es kein `--no-devtools` gibt. `DEVTOOLS_TRACE=1` wählt den Trace-Modus, schaltet die Erfassung aber **nicht** von selbst ein, sodass ein Export für Ihre eigenen Skripte niemals einen pytest-Lauf erfasst, den Sie nicht angefordert haben.

Im Live-Modus öffnet sich das Dashboard in einem eigenen Browserfenster und **bleibt nach dem Lauf geöffnet**, damit Sie untersuchen können, was passiert ist; schließen Sie es (oder `Ctrl-C`), um zu beenden. Zwei Arten von Läufen bleiben auch bei Zustimmung unerfasst: `--collect-only`, bei dem nichts ausgeführt wird, und ein Lauf, der keine Tests gesammelt hat – ein vertippter Pfad würde Ihr Terminal sonst bei einem leeren Dashboard hängen lassen.

### Einfaches Python-Skript (ohne Test-Runner)

Zwei Zeilen um Ihren bestehenden Selenium-Code:

```python title="login.py"
import selenium_devtools as devtools
from selenium import webdriver

devtools.enable()                     # Dashboard öffnen, jeden Befehl erfassen
# devtools.enable(trace=True)         # oder: eine trace.zip schreiben und kein Fenster öffnen

driver = webdriver.Chrome()
driver.get('https://the-internet.herokuapp.com/login')
driver.find_element('id', 'username').send_keys('tomsmith')
driver.quit()

devtools.wait_for_dashboard_close()   # UI zur Untersuchung offen halten (No-op, wenn kein Fenster offen ist)
devtools.disable()
```

Wenn das Backend nicht gestartet oder erreicht werden kann, protokolliert `enable()` eine Warnung und gibt `None` zurück. Die Erfassung wird übersprungen, und Ihre Tests laufen trotzdem – ein fehlendes Dashboard lässt niemals eine Suite fehlschlagen.

### Parallele Läufe (`pytest -n`)

**pytest-xdist funktioniert ohne zusätzliche Konfiguration.** Jeder Prozess, der in einen Lauf berichtet, muss sich auf eine Run-ID einigen, sonst behandelt das Backend jede Verbindung als neuen Lauf und löscht, was der vorherige erfasst hat. Mit xdist einigen sie sich: Das Plugin wird auch im **Controller** geladen, und das Aktivieren der Erfassung dort legt die ID fest, bevor xdist einen Worker startet – Worker sind Kindprozesse und erben sie daher.

Was tatsächlich als getrennte Läufe erscheint: zwei unabhängige `pytest`-Aufrufe oder ein Worker, der ohne die Umgebung gestartet wurde. Exportieren Sie `DEVTOOLS_RUN_ID` selbst, um solche Prozesse zu einem Lauf zusammenzufassen.

</TabItem>
</Tabs>

## Konfigurationsoptionen {#configuration-options}

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Option | Typ | Standard | Beschreibung |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Port für den DevTools-Backend-Server. Wird automatisch erhöht, falls bereits belegt. |
| `hostname` | `string` | `'localhost'` | Hostname, an den sich der Backend-Server bindet. |
| `openUi` | `boolean` | `true` | Öffnet die DevTools-UI automatisch in einem neuen Chrome-Fenster. Für CI auf `false` setzen. |
| `captureScreenshots` | `boolean` | `true` | Erfasst nach jedem WebDriver-Befehl einen Screenshot. |
| `headless` | `boolean` | `false` | Führt den **Test**-Browser headless aus (injiziert `--headless=old`). Das DevTools-UI-Fenster ist davon nicht betroffen. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | `.webm`-Videoaufzeichnung pro Session. Die Optionen entsprechen der Seite [WebdriverIO Screencast](/docs/devtools/wdio/screencast). |
| `rerunCommand` | `string` | auto | Befehlsvorlage für das erneute Ausführen einzelner Tests. `{{testName}}` wird ersetzt. Wird bei Weglassen automatisch aus den argv des Runners abgeleitet. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` öffnet die DevTools-UI; `trace` überspringt sie und schreibt stattdessen ein portables Artefakt. Siehe [Trace Mode](/docs/devtools/wdio/trace-mode). Überschreibt `openUi`. |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Layout des Trace-Artefakts. Gilt nur bei `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Ein Trace pro Session / Spec-Datei / Test. `'test'` schreibt jeden nach `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Gilt nur bei `mode: 'trace'`. Siehe [Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Welche Traces behalten werden. Wird mit `traceGranularity: 'test'` kombiniert. Gilt nur bei `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Zeichnet einen dichten, kontinuierlichen Screencast in den Trace auf, um im Player Bild für Bild zu scrubben. Gilt nur bei `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Trace-Modus + `traceGranularity: 'test'`. Screenshot pro Test, inline an Allure angehängt (`image/png`) über `allure-js-commons`, wenn ein Allure-Runner-Adapter aktiv ist. |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Trace-Modus + `traceGranularity: 'test'`. Screencast-Video pro Test, gemäß der angegebenen Policy aufbewahrt, inline an Allure angehängt (`video/webm`) über `allure-js-commons`, wenn ein Allure-Runner-Adapter aktiv ist. |
| `emitArtifactsManifest` | `boolean` | auto | Schreibt das Manifest `devtools-artifacts-<sessionId>.json` – den generischen Index, den Reporter/CI nutzen, um erzeugte Artefakte zu finden – neben den Trace. Standardmäßig aus; **aktiviert sich automatisch**, wenn eine `allure-js-commons`-Runtime aktiv ist. Nur im Trace-Modus. |
| `captureAssertions` | `boolean` | `true` | Erfasst `node:assert`-Assertions (erfolgreiche und fehlgeschlagene) als Aktionszeilen im Trace. Zum Deaktivieren auf `false` setzen. |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> **Für CI** setzen Sie sowohl `headless: true` (Test-Browser ausblenden) als auch `openUi: false` (nicht versuchen, das Dashboard-Fenster zu öffnen – CI-Umgebungen haben kein Display). Das Backend läuft auf dem konfigurierten Port weiter, sodass Sie die UI bei Bedarf später noch öffnen können.

</TabItem>
<TabItem value="python" label="Python">

Es gibt kein Options-Objekt – nichts DevTools-Spezifisches muss in Ihrem Testcode auftauchen. Unter pytest konfigurieren Sie den Adapter so, wie Sie pytest konfigurieren; ein Skript übergibt Keyword-Argumente an `enable()`; alles ohne Flag ist eine Umgebungsvariable.

| pytest-Flag | `[tool.pytest.ini_options]` | Wirkung |
|---|---|---|
| `--devtools` | `devtools = true` | Diesen Lauf erfassen und das Dashboard öffnen. |
| `--devtools-trace` | `devtools_trace = true` | Diesen Lauf erfassen und ein Trace-Archiv schreiben, statt ein Dashboard zu öffnen. Impliziert `--devtools`. |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | Ein Archiv für den gesamten Lauf (`session`, Standard) oder eines pro Test. Impliziert `--devtools-trace`. |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | Welche Archive behalten werden sollen. Impliziert `--devtools-trace`. Siehe [Wie viele Archive und welche behalten werden](#how-many-archives-and-which-ones-to-keep). |

Der höchste Rang gewinnt: CLI, dann ini, dann die Umgebung unten. `pytest -o devtools=false` schaltet einen Projekt-Standard für einen Lauf aus, und `pytest -o devtools_trace_policy=on` macht dasselbe für jede der anderen Optionen.

| Variable | Wirkung |
|---|---|
| `DEVTOOLS_ENABLE=1` | Erfassung einschalten, sofern das nicht bereits ein Flag oder eine ini-Option getan hat. |
| `DEVTOOLS_PORT=<n>` | Mit einem Dashboard verbinden, das bereits auf diesem Port lauscht; aktiviert die Erfassung ebenfalls. |
| `DEVTOOLS_HOST=<host>` | Host, unter dem das Dashboard erreichbar ist (Standard `localhost`). |
| `DEVTOOLS_TRACE=1` | Ein Trace-Archiv schreiben, statt ein Dashboard zu öffnen. Wählt den Modus für ein einfaches Skript; unter pytest aktiviert es den Lauf nicht von selbst. |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | Trace-Modus: ein Archiv für den gesamten Lauf oder eines pro Test. Ambient, wählt daher nie selbst den Trace-Modus – kombinieren Sie es mit `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_TRACE_POLICY=<policy>` | Trace-Modus: welche Archive behalten werden sollen. Ambient, wählt daher nie selbst den Trace-Modus – kombinieren Sie es mit `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_FILMSTRIP=0` | Trace-Modus: den dichten Filmstreifen aus dem Archiv weglassen. |
| `DEVTOOLS_A11Y=0` | Trace-Modus: den A11y-Baum und die Element-Rechtecke pro Aktion überspringen. |
| `DEVTOOLS_OPEN=0` | Das Dashboard-Fenster nicht öffnen (CI). |
| `DEVTOOLS_BIDI=0` | BiDi deaktivieren und damit auch die Konsolen- und Netzwerkerfassung. |
| `DEVTOOLS_RUN_ID=<id>` | Mehrere Prozesse zu einem Lauf zusammenfassen. |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | Das Backend mit einem expliziten Befehl statt dem ermittelten starten. |

Das Backend ist eine Node-Anwendung, daher **muss Node.js 22.19 oder neuer in jedem Modus verfügbar sein** – sogar im Trace-Modus, in dem sich nie ein Dashboard-Fenster öffnet. Es geht nicht nur um die UI: Der Seiten-Collector wird vom Backend ausgeliefert, der gesamte Ereignisstrom läuft über dessen WebSocket, und im Trace-Modus erstellt es auch das Archiv. `enable()` prüft vorab auf Node und benennt, was fehlt, statt später mit einem Spawn-Timeout fehlzuschlagen. Der Adapter findet oder startet das Backend für Sie – siehe [das Backend eigenständig betreiben](/docs/devtools/dashboard#running-the-backend-on-its-own), wenn Sie es lieber selbst verwalten möchten, oder richten Sie `DEVTOOLS_PORT` auf ein bereits laufendes Backend; in diesem Fall wird kein lokales Node benötigt.

### Assertions

Erfolgreiche und fehlgeschlagene `assert`-Anweisungen erscheinen als Zeilen mit **expected** und **actual**, und Fehlschläge landen im Errors-Tab. Pythons `assert` ist eine Anweisung und kein Aufruf, daher gibt es – anders als beim `node:assert`-Patching des Node-Adapters – nichts zu umhüllen; das Ergebnis kommt vom Runner.

**Unter pytest** stammen die Werte vom Assertion-Rewriter, sodass jede Zeile echte Operanden enthält. Das Erfassen *erfolgreicher* Assertions erfordert pytests `enable_assertion_pass_hook`, den das Plugin selbst einschaltet. Ein Vorbehalt: pytest entscheidet pro Modul, *während es dieses umschreibt*, ob dieser Hook ausgegeben wird; ein Modul, dessen umgeschriebener Bytecode vor der Installation des Plugins gecacht wurde, meldet daher weiterhin nur Fehlschläge. Der Adapter weist beim Sammeln einmal darauf hin und nennt den zu löschenden Cache – das ist **nicht** immer der `__pycache__` neben Ihren Tests, da `sys.pycache_prefix` (standardmäßig beim System-Python von macOS gesetzt) jedes umgeschriebene Modul in einen zentralen Verzeichnisbaum schickt.

**In einem einfachen Skript** gibt es keinen Rewriter, daher kommen die Ergebnisse aus den Line-Events des Interpreters, und die Werte werden aus dem Frame gelesen, der gerade das assert ausführen will. Aufgelöst werden nur Lesezugriffe, die keinen Code von Ihnen ausführen können: Ein Literal oder eine lokale Variable wird aufgelöst, ein Attribut oder ein Aufruf nicht, denn ein zweites Auswerten von `driver.current_url` würde einen weiteren WebDriver-Befehl absetzen.

</TabItem>
</Tabs>

## Trace-Modus {#trace-mode}

Headless-Erfassungspfad in **beiden Sprachen** – es öffnet sich kein DevTools-UI-Fenster, und der Lauf schreibt ein portables Trace-Archiv in einen `test-results/`-Ordner, mit derselben Struktur wie das WebdriverIO-Trace-Artefakt. Die beiden unterscheiden sich nur darin, wie viel vom Artefakt Sie anpassen können und wer es erstellt.

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Am Ende der Session schreibt der Adapter `trace-<sessionId>.zip` (oder ein Verzeichnis) selbst in `test-results/` neben dem ermittelten Test- / Konfigurationsverzeichnis.

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // optional; Standard 'zip'
})
```

Port-Bindung des Backends, UI-Fenster und die Option `screencast` werden im Trace-Modus alle übersprungen. Die vollständige Funktionsreferenz (Artefaktinhalt, Viewer, mobiles Testen, wann `zip` vs. `ndjson-directory` zu wählen ist) finden Sie auf der [Trace-Mode-Seite](/docs/devtools/wdio/trace-mode).

### Artefakte pro Test und Aufbewahrung

Bei `traceGranularity: 'test'` erhält jeder Test seinen eigenen Artefaktordner, und `tracePolicy` entscheidet, welche behalten werden (z. B. `retain-on-failure`). In diesem Modus können Sie außerdem einen `screenshot` (PNG) und ein `video` (`.webm`) pro Test erfassen und einen dichten `filmstrip` aktivieren, der für das Scrubben Bild für Bild in den Trace aufgezeichnet wird. Wenn ein `allure-js-commons`-Runner-Adapter aktiv ist, werden Traces / Screenshots / Videos pro Test inline an den Allure-Report angehängt (und `emitArtifactsManifest` aktiviert sich automatisch); andernfalls werden sie nach `test-results/` geschrieben und im Manifest erfasst.

```js
DevTools.configure({
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure',
  filmstrip: true,
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
})
```

</TabItem>
<TabItem value="python" label="Python">

Es gibt kein Options-Objekt – ein Flag unter pytest, ein Keyword-Argument in einem Skript:

```bash
pytest --devtools-trace tests/        # impliziert --devtools
DEVTOOLS_TRACE=1 python3 login.py     # einfaches Skript; entspricht devtools.enable(trace=True)
```

```python title="login.py"
devtools.enable(trace=True)           # eine trace.zip schreiben, statt ein Dashboard zu öffnen
```

Das Archiv landet in `test-results/` neben der Testdatei, aus der der erste erfasste Befehl stammt – demselben Verzeichnis, in das bereits Screencast-Videos geschrieben werden – mit dem Namen `trace-<sessionId>.zip`, oder nach dem jeweiligen Test benannt, wenn Sie [ein Archiv pro Test](#how-many-archives-and-which-ones-to-keep) anfordern. Wenn kein Befehl eine Quellposition aus Ihrem Code trägt, wird auf `test-results/` im aktuellen Verzeichnis zurückgegriffen.

**Es öffnet sich kein Dashboard-Fenster.** Das Artefakt ist die Ausgabe, und ein Live-Lauf blockiert am Fenster, bis Sie es schließen – ein Fenster würde aus dem Schreiben einer Datei eine interaktive Sitzung machen. Das Backend startet trotzdem, denn es ist dasjenige, das das Archiv *erstellt*: Die Trace-Transformationen sind in TypeScript geschrieben, daher fragt ein Python-Lauf das Backend danach, statt eine zweite Kopie davon mitzuliefern. Das ist der einzige Unterschied zum backendfreien Trace-Modus des Node.js-Adapters und der Grund, warum [Node.js 22.19 oder neuer in jedem Modus erforderlich ist](#configuration-options).

Über die Befehlszeilen, Screenshots und Selektoren pro Befehl, Konsole und Netzwerk hinaus, die beide Modi erfassen, enthält das Archiv:

| Im Archiv | Standard | Deaktivieren |
|---|---|---|
| DOM-Zeitreise – der Mutationsstrom, den der Player Schritt für Schritt wiedergibt | an | - |
| Dichter Filmstreifen – die Screencast-Frames, im Trace statt in einer `.webm` gespeichert | an | `DEVTOOLS_FILMSTRIP=0` |
| A11y-Baum und Element-Overlay – neben jeder Aktion gelesen, mit zwei zusätzlichen Roundtrips pro Befehl | an | `DEVTOOLS_A11Y=0` |

Der Trace-Modus kodiert keine `.webm`, benötigt also kein `ffmpeg` – die Frames *sind* der Filmstreifen.

**Der Export wird angefordert, wenn der Lauf endet, nicht wenn der Prozess beendet wird** – pytest fordert ihn bei `sessionfinish` an, und `disable()` eines Skripts exportiert, bevor es den Transport schließt, sodass CI das Artefakt erhält, unabhängig davon, ob jemals ein Fenster beteiligt war.

### Wie viele Archive und welche behalten werden {#how-many-archives-and-which-ones-to-keep}

Zwei Einstellungen entscheiden darüber, und keine von beiden hat außerhalb des Trace-Modus eine Bedeutung.

**Granularität** – wie viele Archive der Lauf schreibt:

| `--devtools-trace-granularity` | Ergebnis |
|---|---|
| `session` (Standard) | Ein Archiv für den gesamten Lauf. |
| `test` | Ein Archiv pro Test, das jeweils nur die eigenen Befehle, Konsole, Netzwerk, DOM-Mutationen, A11y-Bäume und Screencast-Frames dieses Tests enthält. |

Einen Wert `spec` gibt es hier bewusst nicht. Die Spec dieses Adapters *ist* seine Testdatei, ein dritter Name könnte also nur stillschweigend einen der beiden obigen bedeuten.

**Policy** – welche dieser Archive behalten werden:

| `--devtools-trace-policy` | Ergebnis |
|---|---|
| `on` (Standard) | Alles behalten. |
| `retain-on-failure` | Nur Fehlgeschlagenes behalten. |
| `retain-on-first-failure`, `on-first-retry`, `on-all-retries`, `retain-on-failure-and-retries` | Werden akzeptiert, verhalten sich derzeit aber **genau wie `retain-on-failure`**. |

Die letzten vier berücksichtigen Wiederholungen noch nicht, und es lohnt sich, das klar zu sagen, statt es an einem erwarteten Archiv zu entdecken: Nichts, was dieser Adapter überträgt, enthält eine Versuchsnummer, sodass ein wiederholter Test sein eigenes früheres Ergebnis überschreibt und die wiederholungsbezogene Frage überhaupt nicht gestellt werden kann. Das Backend protokolliert diese Einschränkung, statt etwas anderes vorzugeben. Wählen Sie einen davon nur, wenn Sie `retain-on-failure` unter einem Namen möchten, der später mehr bedeuten wird.

Die beiden lassen sich kombinieren:

| Granularität | Policy | Was Sie erhalten |
|---|---|---|
| `test` | `retain-on-failure` | Nur die fehlgeschlagenen Tests. |
| `session` | `retain-on-failure` | Das Archiv des gesamten Laufs, falls darin etwas fehlgeschlagen ist. |
| beliebig | `on` | Alles. |

Jedes bei `test`-Granularität behaltene Archiv wird nach seinem Test benannt (`trace-<test>-<hash>.zip`, wobei der Hash aus der nodeid des Tests gebildet wird, damit sich zwei parametrisierte Fälle mit gleichem Titel nicht gegenseitig überschreiben). Ein Lauf, der nichts behält, schreibt überhaupt nichts – genau darum geht es: Die Archive, die übrig bleiben, sind diejenigen, die sich zu öffnen lohnen, und ein abgelehnter Export ist die Policy bei der Arbeit, kein Fehler.

Für einen Lauf setzen:

```bash
pytest --devtools-trace-granularity test --devtools-trace-policy retain-on-failure tests/
```

Oder im Projekt festlegen, damit jemand, der das Projekt klont, auf dieselbe Weise erfasst, ohne dass man es ihm sagen muss:

```ini title="pytest.ini"
[pytest]
devtools_trace = true
devtools_trace_granularity = test
devtools_trace_policy = retain-on-failure
```

`[tool.pytest.ini_options]` in `pyproject.toml` akzeptiert dieselben Schlüssel, und `pytest -o devtools_trace_policy=on tests/` überschreibt einen davon für einen einzelnen Lauf, ohne die Datei zu bearbeiten. Eine vollständig kommentierte Version – jede Einstellung und jede Umgebungsvariable mit ihrem jeweiligen Zweck – finden Sie im Repo unter [`examples/selenium/python-test/trace-py-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test/trace-py-test).

Ein einfaches Skript übergibt dieselben beiden als Keyword-Argumente:

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**Die explizite Angabe einer der beiden wählt den Trace-Modus.** Das CLI-Flag, die ini-Option und das `enable()`-Argument implizieren ihn alle, da eine Policy oder Granularität im Live-Modus bedeutungslos ist und ihre Berücksichtigung ohne den Modus stillschweigend verwerfen würde, was Sie angefordert haben. `DEVTOOLS_TRACE_POLICY` und `DEVTOOLS_TRACE_GRANULARITY` tun das bewusst **nicht**: Eine exportierte Variable ist ambient und wurde möglicherweise für ein anderes Skript in derselben Shell gesetzt; einen Live-Lauf deshalb in den Trace-Modus umzuschalten, würde das Dashboard wegnehmen, das niemand verlieren wollte – kombinieren Sie sie mit `DEVTOOLS_TRACE=1`. Ein Lauf, der eine exportierte Trace-Einstellung letztlich ignoriert, protokolliert eine Warnung, statt Sie ein nie erschienenes Archiv bemerken zu lassen.

</TabItem>
</Tabs>

### Den Trace ansehen

Öffnen Sie jede Trace-`.zip` im hauseigenen Player – derselben DevTools-UI in einem eigenen **Player**-Modus:

```bash
npx show-trace path/to/trace.zip      # in einem Projekt, das den Adapter installiert
pnpm show-trace path/to/trace.zip     # aus dem devtools-Monorepo
```

Das `show-trace`-Binary wird mit `@wdio/selenium-devtools` ausgeliefert und ist daher in jedem Projekt verfügbar, das es installiert – ohne zusätzliche Abhängigkeit. Ein Python-Projekt installiert keinen Node.js-Adapter, aber derselbe Player wird mit dem Backend ausgeliefert, das der Adapter bereits für Sie abruft: `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`.

Da der Selenium-Adapter neben jedem Screenshot den **DOM-Mutationsstrom** der Seite sowie einen Element- / Accessibility-Snapshot pro Befehl erfasst, nutzt ein Selenium-Trace den vollen Funktionsumfang des Players – DOM-Zeitreise, den A11y-Tab und das Pick-Locator-Overlay, den Transcript-Tab mit Copy-for-LLM, die Verschachtelung Cucumber Feature → Scenario → Step und die scrubbare Zeitleiste. Ein Python-Trace enthält denselben Mutationsstrom und Snapshot pro Aktion (das Lesen von Element / A11y gibt es dort nur im Trace-Modus, standardmäßig aktiviert); die Gherkin-Verschachtelung ist der einzige Punkt ohne pytest-Entsprechung.

Der Trace verwendet ein portables NDJSON-Schema, sodass dieselbe `.zip` (oder dasselbe Verzeichnis) auch in anderen kompatiblen Trace-Viewern geöffnet werden kann. Eine vollständige Anleitung finden Sie auf der Seite **[Trace Player](/docs/devtools/trace-player)**.

## Öffentliche API

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // Laufzeitoptionen setzen (siehe oben)
DevTools.startTest(name, meta?)      // eine benannte Testgrenze markieren (nur einfache Node-Skripte)
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

Unter Mocha / Jest / Cucumber klinkt sich das Plugin automatisch in den Lebenszyklus des Runners ein, sodass Sie `startTest` / `endTest` nicht manuell benötigen – ein Aufruf würde doppelte Zeilen erzeugen.

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # verbinden und instrumentieren; idempotent
devtools.disable()                    # abbauen; zweifacher Aufruf ist sicher
devtools.wait_for_dashboard_close()   # blockieren, bis das Fenster geschlossen ist
devtools.get_capturer()               # der aktive SessionCapturer oder None
devtools.dashboard_url()              # die URL, unter der das Dashboard ausgeliefert wird
```

`enable()` akzeptiert optional `host` und `port` sowie Keyword-Argumente:

```python
devtools.enable(trace=True)                            # eine trace.zip schreiben; kein Fenster öffnen
devtools.enable(trace=True, filmstrip=False)           # ... ohne den dichten Filmstreifen
devtools.enable(trace=True, a11y=False)                # ... ohne das Lesen von Element / A11y pro Aktion
devtools.enable(trace_granularity='test')              # ... ein Archiv pro Test (impliziert trace=True)
devtools.enable(trace_policy='retain-on-failure')      # ... nur Fehlgeschlagenes behalten (impliziert trace=True)
```

`filmstrip` und `a11y` gelten nur für den Trace-Modus und sind jeweils standardmäßig aktiviert (`DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` setzen dasselbe über die Umgebung). `trace` fällt auf `DEVTOOLS_TRACE` zurück. `trace_granularity` und `trace_policy` fallen auf `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY` zurück, und die Übergabe eines der beiden schaltet den Trace-Modus von selbst ein – siehe [Wie viele Archive und welche behalten werden](#how-many-archives-and-which-ones-to-keep). Ein Wert außerhalb der akzeptierten Menge erzeugt eine Warnung und fällt auf den Standard zurück, statt später als fehlende Datei entdeckt zu werden.

Unter pytest steuert das Plugin all dies über `--devtools` / `--devtools-trace` (oder die entsprechende ini-Option bzw. `DEVTOOLS_ENABLE=1`), und die Testgrenzen stammen aus pytests eigenen Hooks – es gibt kein `startTest` / `endTest`-Äquivalent, das aufgerufen werden müsste.

</TabItem>
</Tabs>

## Beispiele

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Funktionierende Beispiele befinden sich im obersten `examples/`-Verzeichnis des Repos. Bauen Sie den Workspace einmal (`pnpm install && pnpm build`) und führen Sie sie dann aus dem Repo-Root aus. `pnpm demo:selenium` führt das Standardbeispiel (Cucumber) aus; die Varianten pro Runner sind:

| Verzeichnis | Runner | Befehl |
|-----------|--------|---------|
| [`examples/selenium/mocha-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/mocha-test) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium/jest-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/jest-test) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium/cucumber-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/cucumber-test) | Cucumber | `pnpm demo:selenium` |

</TabItem>
<TabItem value="python" label="Python">

Die Python-Beispiele befinden sich in [`examples/selenium/python-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test). Installieren Sie den Adapter und bauen Sie den Workspace einmal (`pnpm install && pnpm build`, damit das Backend existiert), und führen Sie sie dann aus dem Repo-Root aus:

| Beispiel | Was es zeigt | Befehl |
|---|---|---|
| `web_form.py` | Das dreizeilige Setup für ein einfaches Skript | `pnpm demo:python` |
| `login.py` | Ein längeres Skript: Navigation, Formular ausfüllen, Assertions | `pnpm demo:python:login` |
| `trace-py-test/` | pytest mit einer Klasse und einem Test auf Modulebene, plus eine `pytest.ini`, die Trace-Modus, Granularität und Aufbewahrung festlegt – jede Einstellung darin ist mit ihrer Wirkung kommentiert | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## Funktionen

Der Selenium-Adapter bietet in beiden Sprachen dasselbe DevTools-UI-Erlebnis wie WebdriverIO. Jede der folgenden Funktionen wird automatisch erfasst, ohne funktionsspezifische Konfiguration – mit dem einfachen `DevTools.configure({})` in Node.js oder `pytest --devtools` in Python. Konsole und Netzwerk werden über die BiDi-Handler von Selenium gestreamt, in Node.js mit einem injizierten Collector als Fallback. Die Links führen zur vollständigen Referenz der jeweiligen Funktion.

- **[Interactive Test Rerunning & Visualization](/docs/devtools/wdio/interactive-test-rerunning)** – Live-Browservorschauen, Screenshots pro Befehl und erneutes Ausführen von Tests/Suites mit einem Klick
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** – Einen fehlschlagenden Test festhalten, erneut ausführen und beide Läufe nebeneinander vergleichen
- **[Multi-Framework Support](/docs/devtools/wdio/multi-framework-support)** – Erkennt in Node.js automatisch Mocha, Jest, Cucumber oder ein einfaches Skript; in Python pytest oder ein einfaches Skript
- **[Console Logs](/docs/devtools/wdio/console-logs)** – Konsolenausgabe des Browsers erfassen und untersuchen
- **[Network Logs](/docs/devtools/wdio/network-logs)** – API-Aufrufe und Netzwerkaktivität überwachen
- **[Metadata](/docs/devtools/wdio/metadata)** – Session-Capabilities, Umgebung und Timing pro Browser-Session
- **[TestLens](/docs/devtools/wdio/testlens)** – Von jedem Befehl zur Quellzeile springen, die ihn ausgelöst hat
- **[Session Screencast](/docs/devtools/wdio/screencast)** – Automatische Videoaufzeichnung von Browser-Sessions
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** – Headless-Erfassung, die eine portable `trace.zip` erzeugt (ohne UI-Fenster), in beiden Sprachen, mit Aufteilung pro Test und Aufbewahrung in beiden (`traceGranularity` / `tracePolicy` in Node.js; `--devtools-trace-granularity` / `--devtools-trace-policy` in Python). `screenshot` / `video` pro Test und das Inline-Anhängen an Allure bleiben Node.js vorbehalten; siehe [Trace-Modus](#trace-mode)

In Node.js ist der Screencast die einzige Funktion mit eigenen Optionen (siehe [Konfigurationsoptionen](#configuration-options)):

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

In Python ist keine Konfiguration nötig: Chrome streamt Frames über CDP, andere Browser greifen auf einen Screenshot pro Befehl zurück, und das Kodieren der `.webm` erfordert `ffmpeg` im `PATH`. Im Trace-Modus werden dieselben Frames statt einer `.webm` zum dichten Filmstreifen des Archivs, sodass nichts kodiert wird und `ffmpeg` nicht benötigt wird.

## Funktionsweise

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Das Plugin patcht beim Import die Prototypen `Builder`, `WebDriver` und `WebElement` von `selenium-webdriver`:

- **`Builder.build()`** – nach der Erstellung wird der Treiber beim Session-Capturer registriert, und das DevTools-Backend wird in einem losgelösten Kindprozess gestartet.
- **Jede öffentliche `WebDriver`- / `WebElement`-Methode** – wird mit Befehlserfassung umhüllt (Argumente + Ergebnis + Screenshot + Aufrufquelle).
- **`WebDriver.quit()`** – ein abgewarteter Cleanup-Hook schließt die Screencast-Kodierung ab, leert den WebSocket-Puffer und sendet die finalen Metadaten, bevor das ursprüngliche quit ausgeführt wird.

Wenn BiDi verfügbar ist (Chrome ≥114), werden Konsolenlogs, JavaScript-Exceptions und Netzwerkereignisse direkt über die Selenium-BiDi-Handler gestreamt. Andernfalls greift das Plugin auf ein injiziertes browserseitiges Collector-Skript zurück.

Derselbe injizierte Collector zeichnet außerdem den **DOM-Mutationsstrom** der Seite sowie einen Element- / Accessibility-Snapshot pro Befehl auf, sodass ein Trace genug enthält, um das Live-DOM bei jedem Schritt zu rekonstruieren (Zuordnung pro Navigation) – das ermöglicht die DOM-Zeitreise und den A11y-Tab des Players statt einer reinen Screenshot-Wiedergabe.

</TabItem>
<TabItem value="python" label="Python">

Es gibt keine Prototypen zu patchen, daher umhüllt der Python-Adapter stattdessen eine einzige Methode:

- **`WebDriver.execute()`** – der zentrale Engpass, durch den jeder Befehl läuft. Element-Methoden delegieren ebenfalls daran (`self._parent.execute`), sodass `click`, `send_keys` und `text` vom selben Wrapper erfasst werden, ohne die Element-Klassen anzufassen.
- **Session-Einrichtung** – beim ersten echten Befehl wird der Treiber registriert, Metadaten werden gesendet, und BiDi, der Collector und der Screencast werden scharf geschaltet.
- **`quit()`** – wird abgefangen, bevor die Session abgebaut wird, sodass der Screencast kodiert und die letzten Frames geschrieben werden, solange der Treiber noch existiert.

Konsole, JavaScript-Exceptions und Netzwerk werden über die BiDi-Schicht von selenium (4.44+) gestreamt, die der Adapter für Sie aktiviert, indem er die Capability `webSocketUrl` in die `newSession`-Anfrage injiziert.

Der **DOM-Mutationsstrom** stammt vom selben browserseitigen Collector wie bei Node.js und wird über BiDi beim Dokumentstart registriert, sodass sich eine Seite instrumentiert, bevor eines ihrer eigenen Skripte ausgeführt wird. In Chrome wird der Screencast vom Browser über einen eigenen CDP-WebSocket gesendet – getrennt vom Befehlskanal der Session, was einen echten Frame-Stream sicher macht, obwohl eine Selenium-Session nicht threadsicher ist.

</TabItem>
</Tabs>

## Einschränkungen

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Einschränkung | Details |
|-----------|--------|
| Erneutes Ausführen einzelner Cucumber-Steps | Der `--name`-Filter von Cucumber zielt auf Szenarien, nicht auf einzelne Gherkin-Steps. Das erneute Ausführen pro Step im Dashboard ist unter Cucumber deaktiviert. |
| Hinweis zum Headless-Modus | `headless: true` injiziert `--headless=old`; `--headless=new` erzeugt im Screencast komplett schwarze CDP-Frames. |
| Anfänglicher Viewport | Das Snapshot-iframe des Dashboards verwendet 1280×800, bis die erste Navigation abgeschlossen ist und der browserseitige Collector den tatsächlichen Viewport meldet. |

</TabItem>
<TabItem value="python" label="Python">

| Einschränkung | Details |
|-----------|--------|
| Kein Screenshot, Video oder Allure-Anhang pro Test | **Trace-Archive** pro Test werden unterstützt (`--devtools-trace-granularity test`), aber die Optionen `screenshot` und `video` pro Test des Node.js-Adapters und dessen Inline-Anhang über `allure-js-commons` haben keine Python-Entsprechung – die Archive sind die Artefakte. |
| Wiederholungsbezogene Aufbewahrung ist eingeschränkt | `retain-on-first-failure`, `on-first-retry`, `on-all-retries` und `retain-on-failure-and-retries` werden akzeptiert, verhalten sich aber genau wie `retain-on-failure`: Nichts in der Übertragung enthält eine Versuchsnummer, sodass ein wiederholter Test sein eigenes früheres Ergebnis überschreibt. Das Backend protokolliert diese Einschränkung. |
| Node ist in jedem Modus erforderlich | Das Backend ist eine Node-Anwendung – es liefert den Seiten-Collector aus, transportiert den Ereignisstrom und erstellt das Trace-Archiv –, daher muss Node.js 22.19 oder neuer auch im Trace-Modus vorhanden sein, in dem sich kein Fenster öffnet. Der Adapter findet oder startet es für Sie. |
| Browseroptionen liegen bei Ihnen | Es gibt keine `headless`-Option; konfigurieren Sie Chrome wie gewohnt über das eigene `Options`-Objekt von selenium. |
| Video im Live-Modus benötigt ffmpeg | Ohne `ffmpeg` im `PATH` wird die `.webm`-Kodierung mit einer Warnung statt eines Fehlers übersprungen. Der Trace-Modus kodiert nichts – seine Frames gehen in den Filmstreifen –, daher benötigt er nie ffmpeg. |

</TabItem>
</Tabs>