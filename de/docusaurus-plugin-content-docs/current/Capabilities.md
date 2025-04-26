---
id: capabilities
title: Funktionen
---

Eine Capability (Funktion) ist eine Definition für eine Remote-Schnittstelle. Sie hilft WebdriverIO zu verstehen, in welcher Browser- oder Mobilumgebung Sie Ihre Tests ausführen möchten. Capabilities sind weniger entscheidend, wenn Sie Tests lokal entwickeln, da Sie diese meist auf einer Remote-Schnittstelle ausführen, werden aber wichtiger, wenn Sie eine große Anzahl von Integrationstests in CI/CD ausführen.

:::info

Das Format eines Capability-Objekts ist durch die [WebDriver-Spezifikation](https://w3c.github.io/webdriver/#capabilities) genau definiert. Der WebdriverIO-Testrunner wird frühzeitig fehlschlagen, wenn benutzerdefinierte Capabilities nicht dieser Spezifikation entsprechen.

:::

## Benutzerdefinierte Capabilities

Während die Anzahl der fest definierten Capabilities sehr gering ist, kann jeder benutzerdefinierte Capabilities bereitstellen und akzeptieren, die spezifisch für den Automatisierungstreiber oder die Remote-Schnittstelle sind:

### Browser-spezifische Capability-Erweiterungen

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities)-Erweiterungen, nur anwendbar für Tests in Chrome
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)-Erweiterungen, nur anwendbar für Tests in Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) zur Angabe der Umgebung bei Verwendung von EdgeDriver für Tests mit Chromium Edge

### Cloud-Anbieter Capability-Erweiterungen

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- und viele mehr...

### Automatisierungs-Engine Capability-Erweiterungen

- `appium:xxx`: [Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- und viele mehr...

### WebdriverIO Capabilities zur Verwaltung von Browser-Treiberoptionen

WebdriverIO übernimmt die Installation und Ausführung des Browser-Treibers für Sie. WebdriverIO verwendet eine benutzerdefinierte Capability, mit der Sie Parameter an den Treiber übergeben können.

#### `wdio:chromedriverOptions`

Spezifische Optionen, die beim Start an Chromedriver übergeben werden.

#### `wdio:geckodriverOptions`

Spezifische Optionen, die beim Start an Geckodriver übergeben werden.

#### `wdio:edgedriverOptions`

Spezifische Optionen, die beim Start an Edgedriver übergeben werden.

#### `wdio:safaridriverOptions`

Spezifische Optionen, die beim Start an Safari übergeben werden.

#### `wdio:maxInstances`

Maximale Anzahl der parallel laufenden Worker für den spezifischen Browser/die spezifische Capability. Hat Vorrang vor [maxInstances](#configuration#maxInstances) und [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Typ: `number`

#### `wdio:specs`

Definiert Specs für die Testausführung für diesen Browser/diese Capability. Gleich wie die [reguläre `specs`-Konfigurationsoption](configuration#specs), aber spezifisch für den Browser/die Capability. Hat Vorrang vor `specs`.

Typ: `(String | String[])[]`

#### `wdio:exclude`

Schließt Specs von der Testausführung für diesen Browser/diese Capability aus. Gleich wie die [reguläre `exclude`-Konfigurationsoption](configuration#exclude), aber spezifisch für den Browser/die Capability. Hat Vorrang vor `exclude`.

Typ: `String[]`

#### `wdio:enforceWebDriverClassic`

Standardmäßig versucht WebdriverIO, eine WebDriver Bidi-Sitzung einzurichten. Wenn Sie das nicht bevorzugen, können Sie dieses Flag setzen, um dieses Verhalten zu deaktivieren.

Typ: `boolean`

#### Allgemeine Treiberoptionen

Während alle Treiber unterschiedliche Parameter für die Konfiguration bieten, gibt es einige gemeinsame, die WebdriverIO versteht und für die Einrichtung Ihres Treibers oder Browsers verwendet:

##### `cacheDir`

Der Pfad zum Stammverzeichnis des Cache-Verzeichnisses. Dieses Verzeichnis wird verwendet, um alle Treiber zu speichern, die heruntergeladen werden, wenn versucht wird, eine Sitzung zu starten.

Typ: `string`<br />
Standard: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Pfad zu einer benutzerdefinierten Treiber-Binärdatei. Wenn gesetzt, wird WebdriverIO nicht versuchen, einen Treiber herunterzuladen, sondern den über diesen Pfad bereitgestellten verwenden. Stellen Sie sicher, dass der Treiber mit dem von Ihnen verwendeten Browser kompatibel ist.

Sie können diesen Pfad über die Umgebungsvariablen `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` oder `EDGEDRIVER_PATH` angeben.

Typ: `string`

:::caution

Wenn der Treiber `binary` gesetzt ist, wird WebdriverIO nicht versuchen, einen Treiber herunterzuladen, sondern den über diesen Pfad bereitgestellten verwenden. Stellen Sie sicher, dass der Treiber mit dem von Ihnen verwendeten Browser kompatibel ist.

:::

#### Browser-spezifische Treiberoptionen

Um Optionen an den Treiber weiterzugeben, können Sie die folgenden benutzerdefinierten Capabilities verwenden:

- Chrome oder Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Edge: `wdio:edgedriverOptions`
- Safari: `wdio:safaridriverOptions`

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'wdio:chromedriverOptions', value: 'chrome'},
    {label: 'wdio:geckodriverOptions', value: 'firefox'},
    {label: 'wdio:edgedriverOptions', value: 'msedge'},
    {label: 'wdio:safaridriverOptions', value: 'safari'},
  ]
}>
<TabItem value="chrome">

##### adbPort
Der Port, auf dem der ADB-Treiber laufen soll.

Beispiel: `9515`

Typ: `number`

##### urlBase
Basis-URL-Pfadpräfix für Befehle, z.B. `wd/url`.

Beispiel: `/`

Typ: `string`

##### logPath
Serverprotokoll in Datei statt in stderr schreiben, erhöht die Protokollstufe auf `INFO`

Typ: `string`

##### logLevel
Protokollstufe festlegen. Mögliche Optionen `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Typ: `string`

##### verbose
Ausführlich protokollieren (entspricht `--log-level=ALL`)

Typ: `boolean`

##### silent
Nichts protokollieren (entspricht `--log-level=OFF`)

Typ: `boolean`

##### appendLog
Protokolldatei anhängen statt neu zu schreiben.

Typ: `boolean`

##### replayable
Ausführlich protokollieren und lange Zeichenketten nicht abschneiden, damit das Protokoll wiedergegeben werden kann (experimentell).

Typ: `boolean`

##### readableTimestamp
Lesbare Zeitstempel zum Protokoll hinzufügen.

Typ: `boolean`

##### enableChromeLogs
Protokolle aus dem Browser anzeigen (überschreibt andere Protokollierungsoptionen).

Typ: `boolean`

##### bidiMapperPath
Benutzerdefinierter Bidi-Mapper-Pfad.

Typ: `string`

##### allowedIps
Kommagetrennte Zulassungsliste von Remote-IP-Adressen, die eine Verbindung zu EdgeDriver herstellen dürfen.

Typ: `string[]`<br />
Standard: `['']`

##### allowedOrigins
Kommagetrennte Zulassungsliste von Anforderungsursprüngen, die eine Verbindung zu EdgeDriver herstellen dürfen. Die Verwendung von `*` zur Zulassung eines beliebigen Host-Ursprungs ist gefährlich!

Typ: `string[]`<br />
Standard: `['*']`

##### spawnOpts
Optionen, die an den Treiberprozess übergeben werden sollen.

Typ: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
Standard: `undefined`

</TabItem>
<TabItem value="firefox">

Alle Geckodriver-Optionen finden Sie im offiziellen [Treiberpaket](https://github.com/webdriverio-community/node-geckodriver#options).

</TabItem>
<TabItem value="msedge">

Alle Edgedriver-Optionen finden Sie im offiziellen [Treiberpaket](https://github.com/webdriverio-community/node-edgedriver#options).

</TabItem>
<TabItem value="safari">

Alle Safaridriver-Optionen finden Sie im offiziellen [Treiberpaket](https://github.com/webdriverio-community/node-safaridriver#options).

</TabItem>
</Tabs>

## Spezielle Capabilities für bestimmte Anwendungsfälle

Dies ist eine Liste von Beispielen, die zeigen, welche Capabilities angewendet werden müssen, um einen bestimmten Anwendungsfall zu erreichen.

### Browser im Headless-Modus ausführen

Die Ausführung eines Browsers im Headless-Modus bedeutet, eine Browser-Instanz ohne Fenster oder Benutzeroberfläche auszuführen. Dies wird hauptsächlich in CI/CD-Umgebungen verwendet, in denen kein Display verwendet wird. Um einen Browser im Headless-Modus auszuführen, wenden Sie die folgenden Capabilities an:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

```ts
{
    browserName: 'chrome',   // oder 'chromium'
    'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
    }
}
```

</TabItem>
<TabItem value="firefox">

```ts
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: ['-headless']
    }
```

</TabItem>
<TabItem value="msedge">

```ts
    browserName: 'msedge',
    'ms:edgeOptions': {
        args: ['--headless']
    }
```

</TabItem>
<TabItem value="safari">

Es scheint, dass Safari [keine Unterstützung](https://discussions.apple.com/thread/251837694) für den Headless-Modus bietet.

</TabItem>
</Tabs>

### Automatisierung verschiedener Browser-Kanäle

Wenn Sie eine Browserversion testen möchten, die noch nicht als stabil veröffentlicht wurde, z.B. Chrome Canary, können Sie dies tun, indem Sie Capabilities setzen und auf den Browser verweisen, den Sie starten möchten, z.B.:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

Beim Testen mit Chrome wird WebdriverIO automatisch die gewünschte Browserversion und den Treiber basierend auf der definierten `browserVersion` herunterladen, z.B.:

```ts
{
    browserName: 'chrome', // oder 'chromium'
    browserVersion: '116' // oder '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' oder 'latest' (gleich wie 'canary')
}
```

Wenn Sie einen manuell heruntergeladenen Browser testen möchten, können Sie einen Binärpfad zum Browser angeben über:

```ts
{
    browserName: 'chrome',  // oder 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Zusätzlich können Sie, wenn Sie einen manuell heruntergeladenen Treiber verwenden möchten, einen Binärpfad zum Treiber angeben über:

```ts
{
    browserName: 'chrome', // oder 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

Beim Testen mit Firefox wird WebdriverIO automatisch die gewünschte Browserversion und den Treiber basierend auf der definierten `browserVersion` herunterladen, z.B.:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // oder 'latest'
}
```

Wenn Sie eine manuell heruntergeladene Version testen möchten, können Sie einen Binärpfad zum Browser angeben über:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Zusätzlich können Sie, wenn Sie einen manuell heruntergeladenen Treiber verwenden möchten, einen Binärpfad zum Treiber angeben über:

```ts
{
    browserName: 'firefox',
    'wdio:geckodriverOptions': {
        binary: '/path/to/geckodriver'
    }
}
```

</TabItem>
<TabItem value="msedge">

Beim Testen mit Microsoft Edge stellen Sie sicher, dass Sie die gewünschte Browserversion auf Ihrem Computer installiert haben. Sie können WebdriverIO auf den auszuführenden Browser