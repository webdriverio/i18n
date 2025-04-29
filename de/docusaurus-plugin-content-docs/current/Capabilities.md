---
id: capabilities
title: Fähigkeiten
---

Eine Fähigkeit (Capability) ist eine Definition für eine Remote-Schnittstelle. Sie hilft WebdriverIO zu verstehen, in welcher Browser- oder Mobilumgebung Tests ausgeführt werden sollen. Capabilities sind weniger wichtig bei der lokalen Testentwicklung, da man meistens auf einer einzigen Remote-Schnittstelle arbeitet, gewinnen aber an Bedeutung, wenn eine große Anzahl von Integrationstests in CI/CD ausgeführt wird.

:::info

Das Format eines Capability-Objekts ist klar definiert durch die [WebDriver-Spezifikation](https://w3c.github.io/webdriver/#capabilities). Der WebdriverIO-Testrunner wird frühzeitig fehlschlagen, wenn benutzerdefinierte Capabilities nicht dieser Spezifikation entsprechen.

:::

## Benutzerdefinierte Capabilities

Während die Anzahl der fest definierten Capabilities sehr gering ist, kann jeder benutzerdefinierte Capabilities bereitstellen und akzeptieren, die spezifisch für den Automatisierungstreiber oder die Remote-Schnittstelle sind:

### Browserspezifische Capability-Erweiterungen

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities)-Erweiterungen, nur anwendbar für Tests in Chrome
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)-Erweiterungen, nur anwendbar für Tests in Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) zur Festlegung der Umgebung bei Verwendung von EdgeDriver für Tests mit Chromium Edge

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

WebdriverIO übernimmt die Installation und Ausführung von Browser-Treibern für Sie. WebdriverIO verwendet eine benutzerdefinierte Capability, mit der Sie Parameter an den Treiber übergeben können.

#### `wdio:chromedriverOptions`

Spezifische Optionen, die an Chromedriver beim Start übergeben werden.

#### `wdio:geckodriverOptions`

Spezifische Optionen, die an Geckodriver beim Start übergeben werden.

#### `wdio:edgedriverOptions`

Spezifische Optionen, die an Edgedriver beim Start übergeben werden.

#### `wdio:safaridriverOptions`

Spezifische Optionen, die an Safari beim Start übergeben werden.

#### `wdio:maxInstances`

Maximale Anzahl der parallel laufenden Worker für den spezifischen Browser/Capability. Hat Vorrang vor [maxInstances](#configuration#maxInstances) und [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Typ: `number`

#### `wdio:specs`

Definiert Spezifikationen für die Testausführung für diesen Browser/Capability. Entspricht der [regulären `specs`-Konfigurationsoption](configuration#specs), ist aber spezifisch für den Browser/Capability. Hat Vorrang vor `specs`.

Typ: `(String | String[])[]`

#### `wdio:exclude`

Schließt Spezifikationen von der Testausführung für diesen Browser/Capability aus. Entspricht der [regulären `exclude`-Konfigurationsoption](configuration#exclude), ist aber spezifisch für den Browser/Capability. Hat Vorrang vor `exclude`.

Typ: `String[]`

#### `wdio:enforceWebDriverClassic`

Standardmäßig versucht WebdriverIO, eine WebDriver Bidi-Sitzung zu etablieren. Wenn Sie dies nicht bevorzugen, können Sie dieses Flag setzen, um dieses Verhalten zu deaktivieren.

Typ: `boolean`

#### Gemeinsame Treiberoptionen

Während alle Treiber unterschiedliche Konfigurationsparameter bieten, gibt es einige gemeinsame, die WebdriverIO versteht und zur Einrichtung Ihres Treibers oder Browsers verwendet:

##### `cacheDir`

Der Pfad zum Stammverzeichnis des Cache. Dieses Verzeichnis wird verwendet, um alle Treiber zu speichern, die beim Versuch, eine Sitzung zu starten, heruntergeladen werden.

Typ: `string`<br />
Standard: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Pfad zu einer benutzerdefinierten Treiberbinärdatei. Wenn gesetzt, wird WebdriverIO keinen Treiber herunterladen, sondern den in diesem Pfad angegebenen verwenden. Stellen Sie sicher, dass der Treiber mit dem verwendeten Browser kompatibel ist.

Sie können diesen Pfad über die Umgebungsvariablen `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` oder `EDGEDRIVER_PATH` angeben.

Typ: `string`

:::caution

Wenn der Treiber `binary` gesetzt ist, wird WebdriverIO keinen Treiber herunterladen, sondern den über diesen Pfad bereitgestellten verwenden. Stellen Sie sicher, dass der Treiber mit dem verwendeten Browser kompatibel ist.

:::

#### Browserspezifische Treiberoptionen

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
Base-URL-Pfadpräfix für Befehle, z.B. `wd/url`.

Beispiel: `/`

Typ: `string`

##### logPath
Serverprotokoll in Datei statt Standardfehlerausgabe schreiben, erhöht Log-Level auf `INFO`

Typ: `string`

##### logLevel
Log-Level festlegen. Mögliche Optionen `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Typ: `string`

##### verbose
Ausführliches Protokollieren (entspricht `--log-level=ALL`)

Typ: `boolean`

##### silent
Nichts protokollieren (entspricht `--log-level=OFF`)

Typ: `boolean`

##### appendLog
Protokolldatei anhängen, statt sie zu überschreiben.

Typ: `boolean`

##### replayable
Ausführlich protokollieren und lange Strings nicht kürzen, sodass das Protokoll wiedergegeben werden kann (experimentell).

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
Kommagetrennte Liste von Remote-IP-Adressen, die eine Verbindung zu EdgeDriver herstellen dürfen.

Typ: `string[]`<br />
Standard: `['']`

##### allowedOrigins
Kommagetrennte Liste von Anfrage-Ursprüngen, die eine Verbindung zu EdgeDriver herstellen dürfen. Die Verwendung von `*` zur Zulassung beliebiger Host-Ursprünge ist gefährlich!

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

Ein Browser im Headless-Modus bedeutet, eine Browser-Instanz ohne Fenster oder Benutzeroberfläche auszuführen. Dies wird meist in CI/CD-Umgebungen verwendet, in denen kein Display verwendet wird. Um einen Browser im Headless-Modus auszuführen, wenden Sie die folgenden Capabilities an:

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

Es scheint, dass Safari [den Headless-Modus nicht unterstützt](https://discussions.apple.com/thread/251837694).

</TabItem>
</Tabs>

### Verschiedene Browser-Kanäle automatisieren

Wenn Sie eine Browser-Version testen möchten, die noch nicht als stabile Version veröffentlicht wurde, z.B. Chrome Canary, können Sie dies durch das Setzen von Capabilities und den Verweis auf den gewünschten Browser tun, z.B.:

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

Beim Testen mit Chrome wird WebdriverIO basierend auf der definierten `browserVersion` automatisch die gewünschte Browser-Version und den Treiber für Sie herunterladen, z.B.:

```ts
{
    browserName: 'chrome', // oder 'chromium'
    browserVersion: '116' // oder '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' oder 'latest' (entspricht 'canary')
}
```

Wenn Sie einen manuell heruntergeladenen Browser testen möchten, können Sie einen Binärpfad zum Browser angeben:

```ts
{
    browserName: 'chrome',  // oder 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Zusätzlich können Sie, wenn Sie einen manuell heruntergeladenen Treiber verwenden möchten, einen Binärpfad zum Treiber angeben:

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

Beim Testen mit Firefox wird WebdriverIO basierend auf der definierten `browserVersion` automatisch die gewünschte Browser-Version und den Treiber für Sie herunterladen, z.B.:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // oder 'latest'
}
```

Wenn Sie eine manuell heruntergeladene Version testen möchten, können Sie einen Binärpfad zum Browser angeben:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Zusätzlich können Sie, wenn Sie einen manuell heruntergeladenen Treiber verwenden möchten, einen Binärpfad zum Treiber angeben:

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

Beim Testen mit Microsoft Edge stellen Sie sicher, dass Sie die gewünschte Browser-Version auf Ihrem Gerät installiert haben. Sie können WebdriverIO auf den Browser verweisen, der ausgeführt werden soll:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO wird basierend auf der definierten `browserVersion` automatisch die gewünschte Treiberversion für Sie herunterladen, z.B.:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // oder '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Zusätzlich können Sie, wenn Sie einen manuell heruntergeladenen Treiber verwenden möchten, einen Binärpfad zum Treiber angeben:

```ts
{
    browserName: 'msedge',
    'wdio:edgedriverOptions': {
        binary: '/path/to/msedgedriver'
    }
}
```

</TabItem>
<TabItem value="safari">

Beim Testen mit Safari stellen Sie sicher, dass Sie die [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) auf Ihrem Gerät installiert haben. Sie können WebdriverIO auf diese Version verweisen:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Benutzerdefinierte Capabilities erweitern

Wenn Sie Ihren eigenen Satz von Capabilities definieren möchten, um z.B. beliebige Daten zu speichern, die in den Tests für diese spezifische Capability verwendet werden, können Sie dies tun, indem Sie z.B. setzen:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // benutzerdefinierte Konfigurationen
        }
    }]
}
```

Es wird empfohlen, dem [W3C-Protokoll](https://w3c.github.io/webdriver/#dfn-extension-capability) bei der Benennung von Capabilities zu folgen, das ein `:` (Doppelpunkt) erfordert, um einen implementierungsspezifischen Namespace anzugeben. In Ihren Tests können Sie auf Ihre benutzerdefinierte Capability zugreifen durch:

```ts
browser.capabilities['custom:caps']
```

Um Typsicherheit zu gewährleisten, können Sie WebdriverIOs Capability-Schnittstelle erweitern:

```ts
declare global {
    namespace WebdriverIO {
        interface Capabilities {
            'custom:caps': {
                // ...
            }
        }
    }
}
```