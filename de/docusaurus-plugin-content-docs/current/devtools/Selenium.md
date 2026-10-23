---
id: selenium
title: Selenium DevTools
description: "Fügen Sie die DevTools-Debugging-Oberfläche zu Selenium-WebDriver-Tests in Node.js oder Python mit beliebigem Test-Runner hinzu und aktivieren Sie den Trace-Modus."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Selenium-WebDriver-Adapter für [WebdriverIO DevTools](https://github.com/webdriverio/devtools) - bringt dieselbe visuelle Debugging-Oberfläche in jeden Selenium-Test, in **Node.js** oder **Python**, unabhängig vom Test-Runner.

Node.js funktioniert mit **Mocha**, **Jest**, **Cucumber** oder einem einfachen Skript - das Plugin erkennt den Runner automatisch und verknüpft die Testgrenzen entsprechend. Python funktioniert mit **pytest** oder einem einfachen Skript und benötigt unter pytest überhaupt keine Änderungen an Ihren Testdateien.

Wählen Sie Ihre Sprache in den Tabs unten; die Auswahl begleitet Sie über die ganze Seite.

## Installation

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```bash
npm install @wdio/selenium-devtools
```

Erfordert `selenium-webdriver` 4.8 oder neuer. Das Kodieren eines Screencast-`.webm` benötigt `ffmpeg` im `PATH`.

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install selenium-devtools-py
```

**Erfordert Python 3.10+ und `selenium>=4.44`.** Beide sind in den Paketmetadaten deklariert, sodass pip sie erzwingt, anstatt Sie zur Laufzeit einen leeren Network-Tab vorfinden zu lassen. Die Netzwerkerfassung abonniert über die öffentliche BiDi-Event-API, die selenium in 4.44 neu generiert hat; die private Verbindung, die sie ersetzt hat, wurde im selben Release entfernt, und 4.44 legt daher die Mindestversion für Python fest.

Installieren Sie dann einmalig das Backend:

```bash
selenium-devtools install-backend
```

pip kann das nicht für Sie erledigen: Ein Wheel hat keinen Install-Hook, und das Backend ist ein Node-Paket. Wenn Sie diesen Schritt überspringen, funktionieren Läufe weiterhin und greifen beim ersten Einsatz darauf zurück, `@wdio/devtools-backend` mit `npx` abzurufen. Dieser Fallback kostet bei jedem Lauf einen Registry-Roundtrip und schlägt mitten in der Sitzung fehl, wenn ein Proxy das Paket ablehnt. `selenium-devtools backend-path` zeigt an, ob das Backend installiert ist, `install-backend --force` installiert ein defektes neu, und `uninstall-backend` entfernt es. Die Installation landet unter `$XDG_CACHE_HOME` (Standard `~/.cache`).

Ein `chromedriver` im `PATH`, der nicht zu Ihrem Chrome passt, bricht jeden Selenium-Lauf; ist keiner im `PATH`, ermittelt Selenium Manager einen passenden.

</TabItem>
</Tabs>

## Einrichtung

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Das Minimum ist ein Import, `import '@wdio/selenium-devtools'`, in Ihrer Testdatei. Unter Mocha, Jest und Cucumber ist nichts weiter nötig; `DevTools.configure(...)` ist optional und ändert nur die Standardwerte.

Jeder Block unten ist ein **vollständiges, direkt kopierbares Beispiel** einschließlich des Aufrufs `DevTools.configure(...)`. Wählen Sie den Runner, den Sie verwenden, fügen Sie das Snippet in Ihr Projekt ein und führen Sie es aus.

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

> Alternative: Überspringen Sie den Import pro Datei und verwenden Sie `mocha --require @wdio/selenium-devtools`, um das Plugin einmal für den gesamten Lauf zu laden. Sie benötigen trotzdem irgendwo einen einmaligen Aufruf von `DevTools.configure(...)`, wenn Sie vom Standard abweichende Optionen wünschen.

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

Das aufgeteilte Layout von Cucumber bedeutet drei kleine Dateien - eine zum Laden des Plugins, eine für World/Hooks und eine für Step-Definitionen.

`features/support/setup.js` - Plugin laden und einmalig konfigurieren:

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})
```

`features/support/world.js` - Treiber-Lebenszyklus:

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

`cucumber.json` - binden Sie die Setup-Datei **zuerst** ein, damit das Plugin Selenium patcht, bevor irgendein Step läuft:

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

Wenn Sie `node tests/google.test.js` direkt ausführen, gibt es keinen Runner, in den sich das Plugin automatisch einklinken kann. Standardmäßig erhalten Sie eine einzelne Zeile „Selenium Session“ im Dashboard. Um eine benannte Testgrenze zu erhalten, rufen Sie `DevTools.startTest` / `endTest` um Ihre Arbeit herum auf:

```js
// tests/google.test.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until, Key } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 },
  headless: false
})

async function run () {
  DevTools.startTest('search Google for Selenium')   // optional - benennt die Testzeile

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

> Verwenden Sie `startTest` / `endTest` nur für einfache Node-Skripte. Unter Mocha / Jest / Cucumber weiß das Plugin bereits, wann jeder Test beginnt und endet - ein manueller Aufruf würde doppelte Zeilen erzeugen.

</TabItem>
<TabItem value="python" label="Python">

### pytest

In Ihre Testdateien kommt nichts - das Plugin wird automatisch erkannt, und ein Flag schaltet es für den Lauf ein:

```bash
pytest --devtools tests/              # Live-Dashboard
pytest --devtools-trace tests/        # stattdessen ein Trace-Archiv schreiben (impliziert --devtools)
```

Oder committen Sie die Wahl, damit sich niemand das Flag merken muss:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # Trace-Archiv statt eines Dashboards
# devtools_trace_granularity = "test"            # ... ein Archiv pro Test
# devtools_trace_policy = "retain-on-failure"    # ... nur das Fehlgeschlagene behalten
```

Eine `pytest.ini` mit einem `[pytest]`-Abschnitt akzeptiert dieselben Schlüssel. Die beiden Trace-Einstellungen werden unter [Wie viele Archive, und welche behalten werden](#how-many-archives-and-which-ones-to-keep) behandelt.

Die Erfassung ist immer Opt-in - die Installation des Pakets darf niemals das Verhalten einer bestehenden Suite ändern. Der einzige Unterschied ist, *wie* Sie zustimmen:

| Wie Sie zustimmen | Geltungsbereich |
|---|---|
| `--devtools` / `--devtools-trace` | dieser Lauf |
| `devtools` / `devtools_trace` in `[tool.pytest.ini_options]` | dieses Projekt |
| `DEVTOOLS_ENABLE=1` (oder `DEVTOOLS_PORT=<n>`, das sich zusätzlich an ein bereits laufendes Dashboard anhängt) | diese Shell - für CI |

Die höchste Stufe gewinnt: CLI, dann ini, dann Umgebung. `pytest -o devtools=false` schaltet einen Projektstandard für einen einzelnen Lauf ab, weshalb es kein `--no-devtools` gibt. `DEVTOOLS_TRACE=1` wählt den Trace-Modus, schaltet die Erfassung aber **nicht** selbst ein, sodass das Exportieren für Ihre eigenen Skripte niemals einen pytest-Lauf erfasst, den Sie nicht angefordert haben.

Im Live-Modus öffnet sich das Dashboard in einem eigenen Browserfenster und **bleibt nach dem Lauf geöffnet**, damit Sie untersuchen können, was passiert ist; schließen Sie es (oder `Ctrl-C`), um zu beenden. Zwei Arten von Läufen bleiben auch bei Opt-in unerfasst: `--collect-only`, bei dem nichts ausgeführt wird, und ein Lauf, der keine Tests gesammelt hat - ein vertippter Pfad würde Ihr Terminal sonst bei einem leeren Dashboard parken.

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

devtools.wait_for_dashboard_close()   # UI zum Untersuchen offen halten (No-op, wenn kein Fenster offen ist)
devtools.disable()
```

Wenn das Backend nicht gestartet oder erreicht werden kann, protokolliert `enable()` eine Warnung und gibt `None` zurück. Die Erfassung wird übersprungen und Ihre Tests laufen trotzdem - ein fehlendes Dashboard lässt niemals eine Suite fehlschlagen.

### Parallele Läufe (`pytest -n`)

**pytest-xdist funktioniert ohne zusätzliche Konfiguration.** Jeder Prozess, der in einen Lauf berichtet, muss sich auf eine Run-ID einigen, sonst behandelt das Backend jede Verbindung als neuen Lauf und löscht, was der vorherige erfasst hat. Mit xdist einigen sie sich: Das Plugin wird auch im **Controller** geladen, und das Aktivieren der Erfassung dort ermittelt die ID, bevor xdist irgendeinen Worker startet - Worker sind Kindprozesse und erben sie daher.

Was tatsächlich als separate Läufe gilt: zwei unabhängige `pytest`-Aufrufe oder ein Worker, der ohne die Umgebung gestartet wurde. Exportieren Sie `DEVTOOLS_RUN_ID` selbst, um solche Prozesse zu einem Lauf zusammenzuführen.

### Laufsteuerung (Run, Rerun, Run-all)

Alle drei funktionieren unter pytest und für ein einfaches Skript. Ein Rerun ist keine Nachricht an den laufenden Prozess: Das Backend startet einen neuen aus einem Befehl, den der Adapter beim Start veröffentlicht, und eine Steuerung, die es nicht bedienen kann, bleibt mit einer Begründung deaktiviert.

- Unter pytest wählt jede Steuerung ihre Zeile über die **nodeid** aus (`file.py`, `file.py::Class`, `file.py::Class::test`), mit dem Interpreter, der Ihre Tests ausgeführt hat. Bei einem einfachen Skript starten alle drei das Skript neu.
- Optionen, die einen Lauf einschränken, werden bei einem gezielten Rerun verworfen: `-k`, `-m`, `--deselect`, `--lf`/`--ff`/`--sw` und `-n`/`--dist`. Ein verbleibender Filter könnte den benannten Test nur auf nichts einschränken, was pytest als sauberes Beenden meldet.
- Der Rerun startet im **rootdir** von pytest, und Positionspfade im Run-all-Befehl werden absolut gemacht. Eine Option mit einem *relativen* Pfad (`-c`, `--junitxml`) wird bei einem Rerun relativ zum rootdir aufgelöst.
- Ein Rerun berichtet in **das Dashboard, in dem Sie den Button gedrückt haben**, und öffnet kein zweites Fenster. Run-all behält Ihren ursprünglichen Aufruf auch nach einem gezielten Rerun bei.

Zwei Einschränkungen: Ein Dashboard, das bereits lief, als Sie sich verbunden haben, behält das Verzeichnis, in dem es gestartet wurde, und unter `pytest -n` gehört der Zustand des Dashboards dem Worker, der sich zuletzt verbunden hat.

### Preserve & Rerun

Eine fehlgeschlagene Zeile trägt einen zweiten Button neben Rerun. Er erstellt einen Snapshot des Versuchs, führt den Test erneut aus, und der Tab **Compare** vergleicht beide: Befehle, Konsole und Netzwerk nebeneinander. Der Snapshot wird erstellt, bevor der Rerun beginnt; das Bewahren, nachdem sich ein neuer Lauf verbunden hat, wird abgelehnt (HTTP 409). Ein einfacher Rerun verwirft jede Baseline, sodass der Compare-Tab nach einem gewöhnlichen Rerun verschwindet.

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
| `captureScreenshots` | `boolean` | `true` | Erstellt nach jedem erfolgreichen WebDriver-Befehl einen Screenshot. |
| `headless` | `boolean` | `false` | Führt den **Test**-Browser headless aus (injiziert `--headless=old`). Das DevTools-UI-Fenster ist nicht betroffen. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | `.webm`-Videoaufnahme pro Sitzung. Die Optionen entsprechen der Seite [WebdriverIO Screencast](/docs/devtools/wdio/screencast). |
| `rerunCommand` | `string` | auto | Befehlsvorlage für den Rerun pro Test. `{{testName}}` wird ersetzt. Wird aus den argv des Runners abgeleitet, wenn nicht angegeben. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` öffnet die DevTools-UI; `trace` überspringt sie und schreibt stattdessen ein portables Artefakt. Siehe [Trace Mode](/docs/devtools/wdio/trace-mode). Überschreibt `openUi`. |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Layout des Trace-Artefakts. Gilt nur bei `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Ein Trace pro Sitzung / Spec-Datei / Test. `'test'` schreibt jeden nach `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Gilt nur bei `mode: 'trace'`. Siehe [Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Welche Traces behalten werden. Wird mit `traceGranularity: 'test'` kombiniert. Gilt nur bei `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Zeichnet einen dichten, kontinuierlichen Screencast in den Trace auf, um im Player Bild für Bild zu scrubben. Gilt nur bei `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Trace-Modus + `traceGranularity: 'test'`. Screenshot pro Test, inline an Allure angehängt (`image/png`) über `allure-js-commons`, wenn ein Allure-Runner-Adapter aktiv ist. |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Trace-Modus + `traceGranularity: 'test'`. Screencast-Video pro Test, gemäß der angegebenen Richtlinie aufbewahrt, inline an Allure angehängt (`video/webm`) über `allure-js-commons`, wenn ein Allure-Runner-Adapter aktiv ist. |
| `emitArtifactsManifest` | `boolean` | auto | Schreibt das Manifest `devtools-artifacts-<sessionId>.json` — den generischen Index, den Reporter/CI nutzen, um erzeugte Artefakte zu finden — neben den Trace. Standardmäßig aus; **aktiviert sich automatisch**, wenn eine `allure-js-commons`-Runtime aktiv ist. Nur im Trace-Modus. |
| `captureAssertions` | `boolean` | `true` | Erfasst `node:assert`-Assertions (sowohl bestandene als auch fehlgeschlagene) als Trace-Aktionszeilen. Auf `false` setzen, um dies abzuschalten. |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> `port` und `hostname` wirken nur, bevor das Backend startet, was beim Erstellen des ersten Treibers geschieht; rufen Sie `DevTools.configure(...)` also vorher auf – ein späterer Aufruf ignoriert sie mit einer Warnung. Ein Rerun behält das Backend seines Elternprozesses, unabhängig davon, was sie angeben.

> **Für CI** setzen Sie sowohl `headless: true` (Test-Browser ausblenden) als auch `openUi: false` (nicht versuchen, das Dashboard-Fenster zu öffnen - CI-Umgebungen haben kein Display). Das Backend läuft auf dem konfigurierten Port weiter, sodass Sie die UI bei Bedarf später noch öffnen können.

</TabItem>
<TabItem value="python" label="Python">

Es gibt kein Optionsobjekt - nichts DevTools-Spezifisches muss in Ihrem Testcode auftauchen. Unter pytest konfigurieren Sie den Adapter so, wie Sie pytest konfigurieren; ein Skript übergibt Schlüsselwortargumente an `enable()`; alles ohne Flag ist eine Umgebungsvariable.

| pytest-Flag | `[tool.pytest.ini_options]` | Wirkung |
|---|---|---|
| `--devtools` | `devtools = true` | Diesen Lauf erfassen und das Dashboard öffnen. |
| `--devtools-trace` | `devtools_trace = true` | Diesen Lauf erfassen und ein Trace-Archiv schreiben, statt ein Dashboard zu öffnen. Impliziert `--devtools`. |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | Ein Archiv für den gesamten Lauf (`session`, der Standard) oder eines pro Test. Impliziert `--devtools-trace`. |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | Welche Archive es wert sind, behalten zu werden. Impliziert `--devtools-trace`. Siehe [Wie viele Archive, und welche behalten werden](#how-many-archives-and-which-ones-to-keep). |

Die höchste Stufe gewinnt: CLI, dann ini, dann die Umgebung unten. `pytest -o devtools=false` schaltet einen Projektstandard für einen Lauf ab, und `pytest -o devtools_trace_policy=on` tut dasselbe für jede der anderen Einstellungen.

| Variable | Wirkung |
|---|---|
| `DEVTOOLS_ENABLE=1` | Erfassung einschalten, wenn kein Flag und keine ini-Option dies bereits getan hat. |
| `DEVTOOLS_PORT=<n>` | An ein Dashboard anhängen, das bereits auf diesem Port lauscht; aktiviert die Erfassung ebenfalls. |
| `DEVTOOLS_HOST=<host>` | Host, unter dem das Dashboard erreichbar ist (Standard `localhost`). |
| `DEVTOOLS_TRACE=1` | Ein Trace-Archiv schreiben, statt ein Dashboard zu öffnen. Wählt den Modus für ein einfaches Skript; unter pytest aktiviert es den Lauf nicht von selbst. |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | Trace-Modus: ein Archiv für den gesamten Lauf oder eines pro Test. Ambient, wählt also nie selbst den Trace-Modus - kombinieren Sie es mit `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_TRACE_POLICY=<policy>` | Trace-Modus: welche Archive es wert sind, behalten zu werden. Ambient, wählt also nie selbst den Trace-Modus - kombinieren Sie es mit `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_FILMSTRIP=0` | Trace-Modus: den dichten Filmstrip aus dem Archiv weglassen. |
| `DEVTOOLS_A11Y=0` | Trace-Modus: den A11y-Baum und die Element-Rechtecke pro Aktion überspringen. |
| `DEVTOOLS_OPEN=0` | Das Dashboard-Fenster nicht öffnen (CI). |
| `DEVTOOLS_BIDI=0` | BiDi deaktivieren und damit auch die Konsolen- und Netzwerkerfassung. |
| `DEVTOOLS_RUN_ID=<id>` | Mehrere Prozesse zu einem Lauf zusammenführen. |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | Das Backend mit einem expliziten Befehl statt des ermittelten starten. |

Werden für Sie gesetzt, nicht von Ihnen (aufgeführt, damit ein unerwarteter Wert erkennbar ist): `DEVTOOLS_RUNNER_CWD`, `DEVTOOLS_APP_REUSE` / `DEVTOOLS_APP_HOST` / `DEVTOOLS_APP_PORT` und `DEVTOOLS_RERUN_LAUNCH_COMMAND`.

Das Backend ist eine Node-Anwendung, daher **muss Node.js 22.19 oder neuer in jedem Modus verfügbar sein** - selbst im Trace-Modus, in dem sich nie ein Dashboard-Fenster öffnet. Es geht nicht nur um die UI: Der Page-Collector wird vom Backend bereitgestellt, der gesamte Event-Stream läuft über dessen WebSocket, und im Trace-Modus ist es auch das Backend, das das Archiv erstellt. `enable()` prüft vorab auf Node und benennt, was fehlt, statt später mit einem Spawn-Timeout zu scheitern. Der Adapter findet oder startet das Backend für Sie, in dieser Reihenfolge: ein Backend, das diesen Lauf als Rerun gestartet hat, dann `DEVTOOLS_PORT` (anhängen), dann `DEVTOOLS_BACKEND_CMD`, dann das per `selenium-devtools install-backend` installierte Backend, dann `npx @wdio/devtools-backend@<pinned version>`. Die fixierte Version ist pro Adapter-Release festgelegt, sodass das Backend immer den Wire-Vertrag des Adapters spricht. Siehe [das Backend eigenständig betreiben](/docs/devtools/dashboard#running-the-backend-on-its-own), wenn Sie es lieber selbst verwalten möchten, oder richten Sie `DEVTOOLS_PORT` auf ein Backend, das Sie bereits betreiben – in diesem Fall wird kein lokales Node benötigt.

### Assertions

Bestandene und fehlgeschlagene `assert`-Anweisungen erscheinen als Zeilen mit **expected** und **actual**, und Fehlschläge gelangen in den Errors-Tab. Pythons `assert` ist eine Anweisung statt eines Aufrufs, daher gibt es anders als beim `node:assert`-Patching des Node-Adapters nichts zu wrappen - das Ergebnis kommt vom Runner.

**Unter pytest** stammen die Werte vom Assertion-Rewriter, sodass jede Zeile echte Operanden enthält. Das Erfassen *bestandener* Assertions benötigt pytests `enable_assertion_pass_hook`, den das Plugin selbst einschaltet. Ein Vorbehalt: pytest entscheidet pro Modul, *während es dieses umschreibt*, ob dieser Hook ausgegeben wird, sodass ein Modul, dessen umgeschriebener Bytecode zwischengespeichert wurde, bevor das Plugin installiert war, weiterhin nur Fehlschläge meldet. Der Adapter weist einmal bei der Collection darauf hin und nennt den zu löschenden Cache - das ist **nicht** immer der `__pycache__` neben Ihren Tests, da `sys.pycache_prefix` (standardmäßig im System-Python von macOS gesetzt) jedes umgeschriebene Modul in einen zentralen Baum schickt.

**In einem einfachen Skript** gibt es keinen Rewriter, daher stammen die Ergebnisse aus den Line-Events des Interpreters, und die Werte werden aus dem Frame gelesen, der gerade das assert ausführen will. Nur Lesezugriffe, die Ihren Code nicht ausführen können, werden aufgelöst: Ein Literal oder eine lokale Variable wird aufgelöst, ein Attribut oder ein Aufruf nicht, weil eine zweite Auswertung von `driver.current_url` einen weiteren WebDriver-Befehl absetzen würde.

</TabItem>
</Tabs>

## Trace-Modus {#trace-mode}

Headless-Erfassungspfad, in **beiden Sprachen** - es öffnet sich kein DevTools-UI-Fenster, und der Lauf schreibt ein portables Trace-Archiv in einen Ordner `test-results/`, mit derselben Struktur wie das WebdriverIO-Trace-Artefakt. Die beiden unterscheiden sich nur darin, wie viel vom Artefakt Sie anpassen können und wer es erstellt.

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Am Sitzungsende schreibt der Adapter `trace-<sessionId>.zip` (oder ein Verzeichnis) selbst nach `test-results/` neben dem ermittelten Test-/Konfigurationsverzeichnis.

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // optional; Standard 'zip'
})
```

Das Port-Binding des Backends, das UI-Fenster und die Option `screencast` werden im Trace-Modus allesamt übersprungen. Für die vollständige Funktionsreferenz (Artefaktinhalte, Viewer, mobiles Testen, wann `zip` vs. `ndjson-directory` zu wählen ist) siehe die [Trace-Mode-Seite](/docs/devtools/wdio/trace-mode).

### Artefakte pro Test und Aufbewahrung

Bei `traceGranularity: 'test'` erhält jeder Test einen eigenen Artefaktordner, und `tracePolicy` entscheidet, welche behalten werden (z. B. `retain-on-failure`). In diesem Modus können Sie außerdem pro Test einen `screenshot` (PNG) und ein `video` (`.webm`) erfassen und einen dichten `filmstrip` aktivieren, der für Bild-für-Bild-Scrubbing in den Trace aufgezeichnet wird. Wenn ein `allure-js-commons`-Runner-Adapter aktiv ist, werden Traces / Screenshots / Videos pro Test inline an den Allure-Bericht angehängt (und `emitArtifactsManifest` aktiviert sich automatisch); andernfalls werden sie nach `test-results/` geschrieben und im Manifest erfasst.

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

Es gibt kein Optionsobjekt zu setzen - ein Flag unter pytest, ein Schlüsselwortargument in einem Skript:

```bash
pytest --devtools-trace tests/        # impliziert --devtools
DEVTOOLS_TRACE=1 python3 login.py     # einfaches Skript; entspricht devtools.enable(trace=True)
```

```python title="login.py"
devtools.enable(trace=True)           # eine trace.zip schreiben, statt ein Dashboard zu öffnen
```

Das Archiv landet in `test-results/` neben der Testdatei, aus der der erste erfasste Befehl stammt - demselben Verzeichnis, in das bereits Screencast-Videos geschrieben werden - mit dem Namen `trace-<sessionId>.zip`, oder benannt nach jedem Test, wenn Sie [ein Archiv pro Test](#how-many-archives-and-which-ones-to-keep) anfordern. Wenn kein Befehl eine Quellposition aus Ihrem Code trug, wird auf `test-results/` im aktuellen Verzeichnis zurückgegriffen.

**Es öffnet sich kein Dashboard-Fenster.** Das Artefakt ist die Ausgabe, und ein Live-Lauf blockiert am Fenster, bis Sie es schließen - ein Fenster würde das Schreiben einer Datei in eine interaktive Sitzung verwandeln. Das Backend startet trotzdem, weil es das Archiv *erstellt*: Die Trace-Transformationen sind in TypeScript geschrieben, also fragt ein Python-Lauf das Backend danach, statt eine zweite Kopie davon mitzuliefern. Das ist der einzige Unterschied zum backendfreien Trace-Modus des Node.js-Adapters und der Grund, warum [Node.js 22.19 oder neuer in jedem Modus erforderlich ist](#configuration-options).

Über die Befehlszeilen, Screenshots und Selektoren pro Befehl, Konsole und Netzwerk hinaus, die beide Modi erfassen, enthält das Archiv:

| Im Archiv | Standard | Abschalten |
|---|---|---|
| DOM-Zeitreise - der Mutation-Stream, den der Player Schritt für Schritt wiedergibt | an | - |
| Dichter Filmstrip - die Screencast-Frames, in den Trace übernommen statt in eine `.webm` | an | `DEVTOOLS_FILMSTRIP=0` |
| A11y-Baum und Element-Overlay - neben jeder Aktion gelesen, mit zwei zusätzlichen Roundtrips pro Befehl | an | `DEVTOOLS_A11Y=0` |

Der Trace-Modus kodiert keine `.webm` und benötigt daher kein `ffmpeg` - die Frames *sind* der Filmstrip.

**Der Export wird angefordert, wenn der Lauf endet, nicht wenn der Prozess beendet wird** - pytest fragt bei `sessionfinish` an, und `disable()` eines Skripts exportiert, bevor es den Transport schließt, sodass CI das Artefakt erhält, unabhängig davon, ob jemals ein Fenster beteiligt war.

### Wie viele Archive, und welche behalten werden {#how-many-archives-and-which-ones-to-keep}

Zwei Einstellungen entscheiden das, und keine hat außerhalb des Trace-Modus eine Bedeutung.

**Granularität** - wie viele Archive der Lauf schreibt:

| `--devtools-trace-granularity` | Ergebnis |
|---|---|
| `session` (Standard) | Ein Archiv für den gesamten Lauf. |
| `test` | Ein Archiv pro Test, das jeweils nur die eigenen Befehle, Konsole, Netzwerk, DOM-Mutationen, A11y-Bäume und Screencast-Frames dieses Tests enthält. |

Es gibt hier bewusst keinen Wert `spec`. Die Spec dieses Adapters *ist* seine Testdatei, sodass ein dritter Name stillschweigend nur einen der beiden obigen bedeuten könnte.

**Richtlinie** - welche dieser Archive behalten werden:

| `--devtools-trace-policy` | Ergebnis |
|---|---|
| `on` (Standard) | Alles behalten. |
| `retain-on-failure` | Nur das Fehlgeschlagene behalten. |
| `retain-on-first-failure`, `on-first-retry`, `on-all-retries`, `retain-on-failure-and-retries` | Werden akzeptiert, verhalten sich heute aber **genau wie `retain-on-failure`**. |

Diese letzten vier sind noch nicht retry-fähig, und es lohnt sich, das klar zu sagen, statt es an einem erwarteten, aber fehlenden Archiv zu bemerken: Nichts, was dieser Adapter übermittelt, trägt eine Versuchsnummer, sodass ein wiederholter Test sein eigenes früheres Ergebnis überschreibt und die retry-bezogene Frage gar nicht gestellt werden kann. Das Backend protokolliert die Degradierung, statt etwas anderes vorzugeben. Wählen Sie eine davon nur, wenn Sie `retain-on-failure` unter einem Namen möchten, der später mehr bedeuten wird.

Die beiden lassen sich kombinieren:

| Granularität | Richtlinie | Was Sie erhalten |
|---|---|---|
| `test` | `retain-on-failure` | Nur die fehlgeschlagenen Tests. |
| `session` | `retain-on-failure` | Das Archiv des gesamten Laufs, falls darin irgendetwas fehlgeschlagen ist. |
| beliebig | `on` | Alles. |

Jedes bei `test`-Granularität behaltene Archiv wird nach seinem Test benannt (`trace-<test>-<hash>.zip`, wobei der Hash aus der nodeid des Tests gebildet wird, damit zwei parametrisierte Fälle mit gleichem Titel sich nicht gegenseitig überschreiben). Ein Lauf, der nichts behält, schreibt überhaupt nichts, und genau darum geht es - die Archive, die Ihnen bleiben, sind diejenigen, die es wert sind, geöffnet zu werden, und ein abgelehnter Export ist die Richtlinie bei der Arbeit, kein Fehler.

Für einen Lauf setzen:

```bash
pytest --devtools-trace-granularity test --devtools-trace-policy retain-on-failure tests/
```

Oder committen Sie sie, damit ein Mitwirkender, der das Projekt klont, ohne weiteren Hinweis auf dieselbe Weise erfasst:

```ini title="pytest.ini"
[pytest]
devtools_trace = true
devtools_trace_granularity = test
devtools_trace_policy = retain-on-failure
```

`[tool.pytest.ini_options]` in `pyproject.toml` akzeptiert dieselben Schlüssel, und `pytest -o devtools_trace_policy=on tests/` überschreibt einen davon für einen einzelnen Lauf, ohne die Datei zu bearbeiten. Eine vollständig kommentierte Version - jede Einstellung und jede Umgebungsvariable, jeweils mit ihrem Zweck - befindet sich im Repo unter [`examples/selenium-py/pytest/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-py/pytest).

Ein einfaches Skript übergibt dieselben beiden als Schlüsselwortargumente:

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**Wird eine der beiden explizit angegeben, wird der Trace-Modus ausgewählt.** Das CLI-Flag, die ini-Option und das `enable()`-Argument implizieren ihn alle, da eine Richtlinie oder eine Granularität im Live-Modus nichts bedeutet und eine Berücksichtigung ohne den Modus stillschweigend verwerfen würde, was Sie angefordert haben. `DEVTOOLS_TRACE_POLICY` und `DEVTOOLS_TRACE_GRANULARITY` tun dies bewusst **nicht**: Eine exportierte Variable ist ambient und wurde möglicherweise für ein anderes Skript in derselben Shell gesetzt, sodass das Umschalten eines Live-Laufs in den Trace-Modus auf dieser Grundlage das Dashboard wegnehmen würde, auf das niemand verzichten wollte - kombinieren Sie sie mit `DEVTOOLS_TRACE=1`. Ein Lauf, der eine exportierte Trace-Einstellung letztlich ignoriert, protokolliert eine Warnung, statt Sie ein Archiv bemerken zu lassen, das nie erschienen ist.

</TabItem>
</Tabs>

### Den Trace ansehen

Öffnen Sie eine beliebige Trace-`.zip` im First-Party-Player — derselben DevTools-UI in einem dedizierten **Player**-Modus:

```bash
npx show-trace path/to/trace.zip      # in einem Projekt, das den Adapter installiert
pnpm show-trace path/to/trace.zip     # aus dem devtools-Monorepo
```

Das `show-trace`-Bin wird mit `@wdio/selenium-devtools` ausgeliefert und ist daher in jedem Projekt verfügbar, das es installiert — keine zusätzliche Abhängigkeit. Ein Python-Projekt installiert keinen Node.js-Adapter, aber derselbe Player wird mit dem Backend ausgeliefert, das der Adapter bereits für Sie abruft: `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`.

Da der Selenium-Adapter neben jedem Screenshot den **DOM-Mutation-Stream** der Seite und einen Element-/Accessibility-Snapshot pro Befehl erfasst, nutzt ein Selenium-Trace den vollen Funktionsumfang des Players — DOM-Zeitreise, den A11y-Tab und das Pick-Locator-Overlay, den Transcript-Tab mit Copy-for-LLM, die Cucumber-Verschachtelung Feature → Scenario → Step und die scrubbare Zeitleiste. Ein Python-Trace enthält denselben Mutation-Stream und Snapshot pro Aktion (das Element-/A11y-Auslesen gibt es dort nur im Trace-Modus, standardmäßig aktiviert); die Gherkin-Verschachtelung ist der einzige Punkt ohne pytest-Entsprechung.

Der Trace verwendet ein portables NDJSON-Schema, sodass sich dieselbe `.zip` (oder dasselbe Verzeichnis) auch in anderen kompatiblen Trace-Viewern öffnen lässt. Siehe die Seite **[Trace Player](/docs/devtools/trace-player)** für die vollständige Anleitung.

## Öffentliche API

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // Laufzeitoptionen setzen (siehe oben)
DevTools.startTest(name, meta?)      // eine benannte Testgrenze markieren (nur einfache Node-Skripte)
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

Unter Mocha / Jest / Cucumber klinkt sich das Plugin automatisch in den Lebenszyklus des Runners ein, sodass Sie `startTest` / `endTest` nicht manuell benötigen - ein Aufruf würde doppelte Zeilen erzeugen.

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # verbinden und instrumentieren; idempotent
devtools.disable()                    # abbauen; zweimaliger Aufruf ist sicher
devtools.wait_for_dashboard_close()   # blockieren, bis das Fenster geschlossen wird
devtools.get_capturer()               # der aktive SessionCapturer oder None
devtools.dashboard_url()              # die URL, unter der das Dashboard bereitgestellt wird
devtools.export_trace()               # das Trace-Archiv jetzt schreiben (nur Trace-Modus)
```

`enable()` akzeptiert optional `host` und `port` sowie Schlüsselwortargumente:

```python
devtools.enable(trace=True)                            # eine trace.zip schreiben; kein Fenster öffnen
devtools.enable(trace=True, filmstrip=False)           # ... ohne den dichten Filmstrip
devtools.enable(trace=True, a11y=False)                # ... ohne das Element-/A11y-Auslesen pro Aktion
devtools.enable(trace_granularity='test')              # ... ein Archiv pro Test (impliziert trace=True)
devtools.enable(trace_policy='retain-on-failure')      # ... nur das Fehlgeschlagene behalten (impliziert trace=True)
```

`filmstrip` und `a11y` gelten nur für den Trace-Modus und sind jeweils standardmäßig aktiviert (`DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` setzen dasselbe über die Umgebung). `trace` greift auf `DEVTOOLS_TRACE` zurück. `trace_granularity` und `trace_policy` greifen auf `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY` zurück, und die Übergabe eines der beiden schaltet den Trace-Modus von selbst ein - siehe [Wie viele Archive, und welche behalten werden](#how-many-archives-and-which-ones-to-keep). Ein Wert außerhalb der akzeptierten Menge erzeugt eine Warnung und fällt auf den Standard zurück, statt später als fehlende Datei entdeckt zu werden.

Unter pytest steuert das Plugin all dies über `--devtools` / `--devtools-trace` (oder die entsprechende ini-Option oder `DEVTOOLS_ENABLE=1`), und Testgrenzen stammen aus pytests eigenen Hooks - es gibt kein `startTest`- / `endTest`-Äquivalent zum Aufrufen.

</TabItem>
</Tabs>

## Beispiele

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Funktionierende Beispiele befinden sich im obersten Verzeichnis `examples/` des Repos. Bauen Sie den Workspace einmal (`pnpm install && pnpm build`) und führen Sie dann vom Repo-Root aus. `pnpm demo:selenium` führt das Standardbeispiel (Cucumber) aus; die Varianten pro Runner sind:

| Verzeichnis | Runner | Befehl |
|-----------|--------|---------|
| [`examples/selenium-js/mocha/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/mocha) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium-js/mocha/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/mocha) | Mocha + allure-mocha | `pnpm --filter @wdio/selenium-devtools example:mocha:allure` |
| [`examples/selenium-js/jest/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/jest) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium-js/cucumber/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/cucumber) | Cucumber | `pnpm demo:selenium` |
| [`examples/selenium-js/mobile/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-js/mobile) | Mocha auf Appium | `pnpm demo:selenium:mobile` |

</TabItem>
<TabItem value="python" label="Python">

Die Python-Beispiele befinden sich in [`examples/selenium-py/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium-py). Installieren Sie den Adapter und bauen Sie den Workspace einmal (`pnpm install && pnpm build`, damit das Backend existiert), dann führen Sie vom Repo-Root aus. Die Demos laufen mit bloßem `python3`, daher muss der Adapter in diesen Interpreter installiert sein: `python3 -m venv .venv && source .venv/bin/activate && pip install -e packages/selenium-devtools-py`.

| Beispiel | Was es zeigt | Befehl |
|---|---|---|
| `scripts/web_form.py` | Das dreizeilige Setup für einfache Skripte | `pnpm demo:python` |
| `scripts/login.py` | Ein längeres Skript: Navigation, Formular ausfüllen, Assertions | `pnpm demo:python:login` |
| `mobile/android/`, `mobile/ios/` | Appium: die Android-App Clock oder iOS Settings mit `DEVTOOLS_MOBILE_PLATFORM=ios` (zuerst `pip install -r examples/selenium-py/requirements-mobile.txt`) | `pnpm demo:python:mobile` |
| `pytest/` | pytest mit einer Klasse und einem Test auf Modulebene, plus einer `pytest.ini`, die Trace-Modus, Granularität und Aufbewahrung festschreibt - jede Einstellung darin ist mit ihrer Wirkung kommentiert | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## Funktionen

Der Selenium-Adapter bietet in beiden Sprachen dieselbe DevTools-UI-Erfahrung wie WebdriverIO. Jede der folgenden Funktionen wird automatisch erfasst, ohne Konfiguration pro Funktion — das grundlegende `DevTools.configure({})` in Node.js oder `pytest --devtools` in Python. Konsole und Netzwerk werden über die BiDi-Handler von Selenium gestreamt, mit einem Fallback über einen injizierten Collector in Node.js. Die Links führen zur vollständigen Referenz jeder Funktion.

- **[Interaktives Test-Rerunning & Visualisierung](/docs/devtools/wdio/interactive-test-rerunning)** - Live-Browservorschauen, Screenshots pro Befehl und Test-/Suite-Rerun per Klick
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** - Snapshot eines fehlschlagenden Tests erstellen, erneut ausführen und beide Läufe nebeneinander vergleichen
- **[Multi-Framework-Unterstützung](/docs/devtools/wdio/multi-framework-support)** - Erkennt automatisch Mocha, Jest, Cucumber oder ein einfaches Skript in Node.js; pytest oder ein einfaches Skript in Python
- **[Konsolen-Logs](/docs/devtools/wdio/console-logs)** - Browser-Konsolenausgabe erfassen und untersuchen
- **[Netzwerk-Logs](/docs/devtools/wdio/network-logs)** - API-Aufrufe und Netzwerkaktivität überwachen
- **[Metadaten](/docs/devtools/wdio/metadata)** - Session-Capabilities, Umgebung und Timing pro Browsersitzung
- **[TestLens](/docs/devtools/wdio/testlens)** - Von jedem Befehl zur Quellzeile springen, die ihn ausgelöst hat
- **[Session-Screencast](/docs/devtools/wdio/screencast)** - Automatische Videoaufzeichnung von Browsersitzungen
- **Navigations-Timings** - Nach jedem Navigationsbefehl werden Load-/DOM-ready-/Response-Timings, Ressourcenzahlen, Cookies und Dokumentinformationen an diese Befehlszeile angehängt
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Headless-Erfassung, die eine portable `trace.zip` erzeugt (kein UI-Fenster), in beiden Sprachen, mit Aufteilung pro Test und Aufbewahrung in beiden (`traceGranularity` / `tracePolicy` in Node.js; `--devtools-trace-granularity` / `--devtools-trace-policy` in Python). `screenshot` / `video` pro Test und das Inline-Anhängen an Allure bleiben Node.js vorbehalten; siehe [Trace-Modus](#trace-mode)

In Node.js ist der Screencast die einzige Funktion mit eigenen Optionen (siehe [Konfigurationsoptionen](#configuration-options)):

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

In Python gelangt auch die eigene Ausgabe des Laufs in den Console-Tab: Python-`logging`-Einträge (die von selenium und vom Adapter) und die `print()`-Ausgabe des Tests, die per Tee weitergeleitet wird, sodass Ihr Terminal sie weiterhin anzeigt.

In Python benötigt der Screencast keine Konfiguration: Chrome streamt Frames über CDP, andere Browser greifen auf einen Screenshot pro Befehl zurück, und das Kodieren der `.webm` benötigt `ffmpeg` im `PATH`. Im Trace-Modus werden dieselben Frames statt einer `.webm` zum dichten Filmstrip des Archivs, sodass nichts kodiert wird und `ffmpeg` nicht benötigt wird.

## Funktionsweise

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Das Plugin patcht beim Import die Prototypen `Builder`, `WebDriver` und `WebElement` von `selenium-webdriver`:

- **`Builder.build()`** - nach der Konstruktion wird der Treiber beim Session-Capturer registriert und das DevTools-Backend in einem abgekoppelten Kindprozess gestartet.
- **Jede öffentliche `WebDriver`- / `WebElement`-Methode** - mit Befehlserfassung umhüllt (Argumente + Ergebnis + Screenshot + Aufrufquelle).
- **`WebDriver.quit()`** - ein awaited Cleanup-Hook schließt Screencast-Kodierung, WebSocket-Puffer und finale Metadaten ab, bevor das ursprüngliche quit läuft.

Wenn BiDi verfügbar ist (Chrome ≥114), werden Konsolen-Logs, JavaScript-Exceptions und Netzwerk-Events direkt über die Selenium-BiDi-Handler gestreamt. Andernfalls greift das Plugin auf ein injiziertes browserseitiges Collector-Skript zurück, sodass auch eine Safari- oder Appium-Sitzung jede Anfrage auflistet – aus zwei seiteneigenen Quellen. Ein `fetch`- / `XMLHttpRequest`-Aufruf läuft durch den Patch des Collectors und enthält Methode, Header, Status und Body. Jedes andere Laden (das Dokument, Skripte, Styles, Bilder, Schriften) stammt aus dem Resource-Timing-Puffer der Seite mit Timing und Größe, aber ohne Header oder Body und unter Safari ohne Status; der Network-Tab weist bei jeder solchen Zeile darauf hin.

Ein `driver.wait()` erscheint als der eine Befehl, den der Test ausgeführt hat, nicht als eine Zeile pro Abfrage.

Der seitenseitige Collector wird über BiDi (`script.addPreloadScript`) beim Dokumentstart registriert, sodass sich jede Seite instrumentiert, bevor irgendein eigenes Skript läuft; ohne BiDi wird stattdessen nach jeder Navigation ein `<script>` injiziert. Er zeichnet den **DOM-Mutation-Stream** der Seite und einen Element-/Accessibility-Snapshot pro Befehl auf, sodass ein Trace genug enthält, um das Live-DOM bei jedem Schritt wiederherzustellen (Zuordnung pro Navigation) — das ermöglicht die DOM-Zeitreise und den A11y-Tab des Players statt einer reinen Screenshot-Wiedergabe.

</TabItem>
<TabItem value="python" label="Python">

Es gibt keine Prototypen zu patchen, daher umhüllt der Python-Adapter stattdessen eine einzige Methode:

- **`WebDriver.execute()`** - der zentrale Engpass, durch den jeder Befehl fließt. Element-Methoden delegieren ebenfalls daran (`self._parent.execute`), sodass `click`, `send_keys` und `text` vom selben Wrapper erfasst werden, ohne die Element-Klassen anzufassen.
- **Sitzungs-Setup** - beim ersten echten Befehl wird der Treiber registriert, Metadaten werden gesendet, und BiDi, der Collector und der Screencast werden scharfgeschaltet.
- **`quit()`** - wird abgefangen, bevor die Sitzung abgebaut wird, sodass der Screencast kodiert und die letzten Frames geschrieben werden, solange der Treiber noch existiert.

Konsole, JavaScript-Exceptions und Netzwerk werden über die BiDi-Schicht von selenium (4.44+) gestreamt, die der Adapter für Sie aktiviert, indem er die Capability `webSocketUrl` in die `newSession`-Anfrage injiziert. Wo der Treiber überhaupt kein BiDi bereitstellt (Safari und jede von Appium bediente Sitzung), füllt stattdessen der injizierte Page-Collector den Network-Tab, aus zwei seiteneigenen Quellen. Ein `fetch`- / `XMLHttpRequest`-Aufruf läuft durch dessen Patch und enthält Methode, Header, Status und Body. Jedes andere Laden stammt aus dem Resource-Timing-Puffer des Dokuments mit Timing und Größe, aber ohne Header oder Body und unter Safari ohne Status.

Der **DOM-Mutation-Stream** stammt vom selben browserseitigen Collector wie in Node.js, registriert beim Dokumentstart über BiDi, sodass sich eine Seite instrumentiert, bevor irgendein eigenes Skript läuft. Mit deaktiviertem BiDi (`DEVTOOLS_BIDI=0`) wird der Collector stattdessen pro Dokument mit einem `<script>` injiziert. In Chrome wird der Screencast vom Browser über einen eigenen CDP-WebSocket gepusht — getrennt vom Befehlskanal der Sitzung, was einen echten Frame-Stream sicher macht, obwohl eine Selenium-Sitzung nicht threadsicher ist.

</TabItem>
</Tabs>

## Mobile (Appium)

Appium-Sitzungen werden in beiden Sprachen im Live- und Trace-Modus erfasst. Eine Mobile-Browser-Sitzung wird wie eine Desktop-Sitzung erfasst; eine native App liefert Befehle, Screenshots und Elementdaten aus dem XML-Baum der Plattform, ohne DOM. Dieser Adapter entscheidet anhand der Start-Capabilities, sodass die Webview-Hälfte einer Hybrid-App erfasst wird, als wäre sie noch nativ (nur der WebdriverIO-Service folgt Kontextwechseln).

Probieren Sie es mit `pnpm demo:selenium:mobile` (Node.js) oder `pnpm demo:python:mobile` (Python) aus, ausgeführt im Root eines gebauten Checkouts des devtools-Repos (Einrichtungsschritte unter [Ein Beispiel ausführen](/docs/devtools/mobile#running-an-example)). `DEVTOOLS_MOBILE_PLATFORM=ios` führt die iOS-Spec aus, und `DEVTOOLS_MOBILE=web` steuert den eigenen Browser des Geräts. Die Voraussetzungen stehen in [`examples/MOBILE.md`](https://github.com/webdriverio/devtools/blob/main/examples/MOBILE.md); siehe die [Seite Mobile Testing](/docs/devtools/mobile) für die vollständige Mobile-Referenz. Das Netzwerk einer nativen App wird erfasst, wenn die Sitzung `appium:intercept: true` setzt und Appium das appium-interceptor-Plugin ausführt; siehe [Netzwerk nativer Apps](/docs/devtools/mobile#native-app-network).

## Einschränkungen

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Einschränkung | Detail |
|-----------|--------|
| Cucumber-Rerun einzelner Steps | Cucumbers `--name`-Filter zielt auf Szenarien, nicht auf einzelne Gherkin-Steps. Der Rerun pro Step im Dashboard ist unter Cucumber deaktiviert. |
| Hinweis zum Headless-Modus | `headless: true` injiziert `--headless=old`; `--headless=new` erzeugt im Screencast komplett schwarze CDP-Frames. |
| Anfänglicher Viewport | Das Snapshot-iframe des Dashboards greift auf 1280×800 zurück, bis die erste Navigation abgeschlossen ist und der browserseitige Collector den tatsächlichen Viewport meldet. |
| Parallele Worker | Jest/Vitest-Worker-Prozesse laden jeweils das Plugin und berichten als separater Lauf, sodass das Dashboard nur den Zustand des letzten Workers behält. Führen Sie die Tests seriell aus (`--runInBand`), um einen einzigen Dashboard-Lauf zu erhalten. |
| Safari im Live-Modus | Safari stellt synthetische Eingaben nur an sein vorderstes Fenster zu und meldet trotzdem Erfolg, sodass Eingaben, die abgesetzt werden, während ein anderes Fenster im Vordergrund ist, nirgends ankommen. Unter Safari öffnet das Plugin das Dashboard hinter dem Browser und holt vor jedem Element-Klick, jeder Tasteneingabe, jedem Clear oder Submit das Fenster der Sitzung nach vorne. Der Trace-Modus öffnet kein Fenster und ist nicht betroffen. |

</TabItem>
<TabItem value="python" label="Python">

| Einschränkung | Detail |
|-----------|--------|
| Kein Screenshot, Video oder Allure-Anhang pro Test | **Trace-Archive** pro Test werden unterstützt (`--devtools-trace-granularity test`), aber die Optionen `screenshot` und `video` pro Test des Node.js-Adapters und sein Inline-Anhängen über `allure-js-commons` haben keine Python-Entsprechung - die Archive sind die Artefakte. |
| Retry-bezogene Aufbewahrung ist eingeschränkt | `retain-on-first-failure`, `on-first-retry`, `on-all-retries` und `retain-on-failure-and-retries` werden akzeptiert, verhalten sich aber genau wie `retain-on-failure`: Nichts in der Übertragung trägt eine Versuchsnummer, sodass ein wiederholter Test sein eigenes früheres Ergebnis überschreibt. Das Backend protokolliert die Degradierung. |
| Node ist in jedem Modus erforderlich | Das Backend ist eine Node-Anwendung - es stellt den Page-Collector bereit, überträgt den Event-Stream und erstellt das Trace-Archiv -, daher muss Node.js 22.19 oder neuer auch im Trace-Modus vorhanden sein, in dem sich kein Fenster öffnet. Der Adapter findet oder startet das Backend für Sie. |
| Browseroptionen liegen bei Ihnen | Es gibt keine Option `headless`; konfigurieren Sie Chrome wie gewohnt über das `Options`-Objekt von selenium. |
| Video im Live-Modus benötigt ffmpeg | Ohne `ffmpeg` im `PATH` wird die `.webm`-Kodierung mit einer Warnung statt eines Fehlers übersprungen. Der Trace-Modus kodiert keines - seine Frames gehen in den Filmstrip -, daher benötigt er nie ffmpeg. |

</TabItem>
</Tabs>