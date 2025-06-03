---
id: capabilities
title: Funktionen
---

Eine Capability (Funktion/Fähigkeit) ist eine Definition für eine Remote-Schnittstelle. Sie hilft WebdriverIO zu verstehen, in welcher Browser- oder mobilen Umgebung Sie Ihre Tests ausführen möchten. Capabilities sind weniger entscheidend, wenn Sie Tests lokal entwickeln, da Sie diese meistens auf einer einzigen Remote-Schnittstelle ausführen, werden aber wichtiger, wenn Sie eine große Anzahl von Integrationstests in CI/CD ausführen.

:::info

Das Format eines Capability-Objekts ist durch die [WebDriver-Spezifikation](https://w3c.github.io/webdriver/#capabilities) klar definiert. Der WebdriverIO-Testrunner wird frühzeitig fehlschlagen, wenn benutzerdefinierte Capabilities nicht dieser Spezifikation entsprechen.

:::

## Benutzerdefinierte Capabilities

Während die Anzahl der fest definierten Capabilities sehr gering ist, kann jeder benutzerdefinierte Capabilities bereitstellen und akzeptieren, die spezifisch für den Automatisierungstreiber oder die Remote-Schnittstelle sind:

### Browser-spezifische Capability-Erweiterungen

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities) Erweiterungen, nur anwendbar für Tests in Chrome
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html) Erweiterungen, nur anwendbar für Tests in Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) zur Spezifizierung der Umgebung bei Verwendung von EdgeDriver zum Testen von Chromium Edge

### Cloud-Anbieter Capability-Erweiterungen

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- und viele mehr...

### Automatisierungs-Engine Capability-Erweiterungen

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- und viele mehr...

### WebdriverIO Capabilities zur Verwaltung von Browser-Treiberoptionen

WebdriverIO übernimmt die Installation und Ausführung des Browser-Treibers für Sie. WebdriverIO verwendet eine benutzerdefinierte Capability, mit der Sie Parameter an den Treiber übergeben können.

#### `wdio:chromedriverOptions`

Spezifische Optionen, die beim Starten an Chromedriver übergeben werden.

#### `wdio:geckodriverOptions`

Spezifische Optionen, die beim Starten an Geckodriver übergeben werden.

#### `wdio:edgedriverOptions`

Spezifische Optionen, die beim Starten an Edgedriver übergeben werden.

#### `wdio:safaridriverOptions`

Spezifische Optionen, die beim Starten an Safari übergeben werden.

#### `wdio:maxInstances`

Maximale Anzahl von parallel laufenden Workern für den spezifischen Browser/Capability. Hat Vorrang vor [maxInstances](#configuration#maxInstances) und [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Typ: `number`

#### `wdio:specs`

Definiert Specs für die Testausführung für diesen Browser/Capability. Gleich wie die [reguläre `specs`-Konfigurationsoption](configuration#specs), aber spezifisch für den Browser/Capability. Hat Vorrang vor `specs`.

Typ: `(String | String[])[]`

#### `wdio:exclude`

Schließt Specs von der Testausführung für diesen Browser/Capability aus. Gleich wie die [reguläre `exclude`-Konfigurationsoption](configuration#exclude), aber spezifisch für den Browser/Capability. Hat Vorrang vor `exclude`.

Typ: `String[]`

#### `wdio:enforceWebDriverClassic`

Standardmäßig versucht WebdriverIO, eine WebDriver Bidi-Sitzung herzustellen. Wenn Sie das nicht bevorzugen, können Sie dieses Flag setzen, um dieses Verhalten zu deaktivieren.

Typ: `boolean`

#### Gemeinsame Treiberoptionen

Während alle Treiber verschiedene Parameter für die Konfiguration anbieten, gibt es einige gemeinsame, die WebdriverIO versteht und zur Einrichtung Ihres Treibers oder Browsers verwendet:

##### `cacheDir`

Der Pfad zum Stammverzeichnis des Cache-Verzeichnisses. Dieses Verzeichnis wird verwendet, um alle Treiber zu speichern, die heruntergeladen werden, wenn versucht wird, eine Sitzung zu starten.

Typ: `string`<br />
Standard: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Pfad zu einer benutzerdefinierten Treiber-Binärdatei. Wenn gesetzt, wird WebdriverIO nicht versuchen, einen Treiber herunterzuladen, sondern den durch diesen Pfad bereitgestellten verwenden. Stellen Sie sicher, dass der Treiber mit dem von Ihnen verwendeten Browser kompatibel ist.

Sie können diesen Pfad über die Umgebungsvariablen `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` oder `EDGEDRIVER_PATH` angeben.

Typ: `string`

:::caution

Wenn der Treiber `binary` gesetzt ist, wird WebdriverIO nicht versuchen, einen Treiber herunterzuladen, sondern den durch diesen Pfad bereitgestellten verwenden. Stellen Sie sicher, dass der Treiber mit dem von Ihnen verwendeten Browser kompatibel ist.

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
Serverprotokoll in Datei statt stderr schreiben, erhöht die Protokollierungsstufe auf `INFO`

Typ: `string`

##### logLevel
Protokollierungsstufe festlegen. Mögliche Optionen sind `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Typ: `string`

##### verbose
Ausführlich protokollieren (entspricht `--log-level=ALL`)

Typ: `boolean`

##### silent
Nichts protokollieren (entspricht `--log-level=OFF`)

Typ: `boolean`

##### appendLog
Protokolldatei anhängen statt überschreiben.

Typ: `boolean`

##### replayable
Ausführlich protokollieren und lange Strings nicht kürzen, damit das Protokoll wiedergegeben werden kann (experimentell).

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
Kommagetrennte Positivliste von Remote-IP-Adressen, die eine Verbindung zu EdgeDriver herstellen dürfen.

Typ: `string[]`<br />
Standard: `['']`

##### allowedOrigins
Kommagetrennte Positivliste von Request-Origins, die eine Verbindung zu EdgeDriver herstellen dürfen. Die Verwendung von `*` zur Zulassung beliebiger Host-Origins ist gefährlich!

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

Das Ausführen eines Browsers im Headless-Modus bedeutet, eine Browser-Instanz ohne Fenster oder Benutzeroberfläche auszuführen. Dies wird hauptsächlich in CI/CD-Umgebungen verwendet, in denen keine Anzeige verwendet wird. Um einen Browser im Headless-Modus auszuführen, wenden Sie die folgenden Capabilities an:

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

### Verschiedene Browser-Kanäle automatisieren

Wenn Sie eine Browser-Version testen möchten, die noch nicht als stabile Version veröffentlicht wurde, z.B. Chrome Canary, können Sie dies tun, indem Sie Capabilities setzen und auf den Browser verweisen, den Sie starten möchten, z.B.:

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

Beim Testen mit Chrome wird WebdriverIO automatisch die gewünschte Browser-Version und den Treiber basierend auf der definierten `browserVersion` herunterladen, z.B.:

```ts
{
    browserName: 'chrome', // oder 'chromium'
    browserVersion: '116' // oder '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' oder 'latest' (gleich wie 'canary')
}
```

Wenn Sie einen manuell heruntergeladenen Browser testen möchten, können Sie einen Binärpfad zum Browser über Folgendes angeben:

```ts
{
    browserName: 'chrome',  // oder 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Zusätzlich können Sie, wenn Sie einen manuell heruntergeladenen Treiber verwenden möchten, einen Binärpfad zum Treiber über Folgendes angeben:

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

Beim Testen mit Firefox wird WebdriverIO automatisch die gewünschte Browser-Version und den Treiber basierend auf der definierten `browserVersion` herunterladen, z.B.:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // oder 'latest'
}
```

Wenn Sie eine manuell heruntergeladene Version testen möchten, können Sie einen Binärpfad zum Browser über Folgendes angeben:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Zusätzlich können Sie, wenn Sie einen manuell heruntergeladenen Treiber verwenden möchten, einen Binärpfad zum Treiber über Folgendes angeben:

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

Stellen Sie beim Testen mit Microsoft Edge sicher, dass Sie die gewünschte Browser-Version auf Ihrem Computer installiert haben. Sie können WebdriverIO auf den auszuführenden Browser verweisen via:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO wird automatisch die gewünschte Treiberversion basierend auf der definierten `browserVersion` herunterladen, z.B.:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // oder '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Zusätzlich können Sie, wenn Sie einen manuell heruntergeladenen Treiber verwenden möchten, einen Binärpfad zum Treiber über Folgendes angeben:

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

Stellen Sie beim Testen mit Safari sicher, dass Sie die [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) auf Ihrem Computer installiert haben. Sie können WebdriverIO auf diese Version verweisen via:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Benutzerdefinierte Capabilities erweitern

Wenn Sie Ihren eigenen Satz von Capabilities definieren möchten, um z.B. beliebige Daten zu speichern, die innerhalb der Tests für diese spezifische Capability verwendet werden sollen, können Sie dies tun, indem Sie beispielsweise folgendes setzen:

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

Es wird empfohlen, dem [W3C-Protokoll](https://w3c.github.io/webdriver/#dfn-extension-capability) bei der Benennung von Capabilities zu folgen, das ein `:` (Doppelpunkt) als Zeichen erfordert, das einen implementierungsspezifischen Namespace angibt. Innerhalb Ihrer Tests können Sie auf Ihre benutzerdefinierte Capability zugreifen durch, z.B.:

```ts
browser.capabilities['custom:caps']
```

Um Typsicherheit zu gewährleisten, können Sie die Capability-Schnittstelle von WebdriverIO wie folgt erweitern:

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