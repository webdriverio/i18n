---
id: capabilities
title: Funktionen
---

Eine Capability (Funktion) ist eine Definition für eine Remote-Schnittstelle. Sie hilft WebdriverIO zu verstehen, in welcher Browser- oder Mobilumgebung Sie Ihre Tests ausführen möchten. Capabilities sind weniger entscheidend, wenn Sie Tests lokal entwickeln, da Sie sie meistens auf einer Remote-Schnittstelle ausführen, werden aber wichtiger, wenn Sie eine große Anzahl von Integrationstests in CI/CD ausführen.

:::info

Das Format eines Capability-Objekts ist durch die [WebDriver-Spezifikation](https://w3c.github.io/webdriver/#capabilities) genau definiert. Der WebdriverIO-Testrunner wird frühzeitig fehlschlagen, wenn benutzerdefinierte Capabilities nicht dieser Spezifikation entsprechen.

:::

## Benutzerdefinierte Capabilities

Während die Anzahl der fest definierten Capabilities sehr gering ist, kann jeder benutzerdefinierte Capabilities bereitstellen und akzeptieren, die spezifisch für den Automatisierungstreiber oder die Remote-Schnittstelle sind:

### Browserspezifische Capability-Erweiterungen

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities)-Erweiterungen, nur anwendbar für Tests in Chrome
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)-Erweiterungen, nur anwendbar für Tests in Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) zur Festlegung der Umgebung bei Verwendung von EdgeDriver für Tests in Chromium Edge

### Cloud-Anbieter Capability-Erweiterungen

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- und viele mehr...

### Automatisierungs-Engine Capability-Erweiterungen

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- und viele mehr...

### WebdriverIO-Capabilities zur Verwaltung von Browser-Treiberoptionen

WebdriverIO verwaltet die Installation und Ausführung des Browser-Treibers für Sie. WebdriverIO verwendet eine benutzerdefinierte Capability, die es Ihnen ermöglicht, Parameter an den Treiber zu übergeben.

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

Schließt Specs von der Testausführung für diesen Browser/diese Capability aus. Gleich wie die [reguläre `exclude`-Konfigurationsoption](configuration#exclude), aber spezifisch für den Browser/die Capability. Schließt nach Anwendung der globalen `exclude`-Konfigurationsoption aus.

Typ: `String[]`

#### `wdio:enforceWebDriverClassic`

Standardmäßig versucht WebdriverIO, eine WebDriver Bidi-Sitzung einzurichten. Wenn Sie das nicht bevorzugen, können Sie dieses Flag setzen, um dieses Verhalten zu deaktivieren.

Typ: `boolean`

#### Allgemeine Treiberoptionen

Während alle Treiber unterschiedliche Parameter für die Konfiguration bieten, gibt es einige gemeinsame, die WebdriverIO versteht und zur Einrichtung Ihres Treibers oder Browsers verwendet:

##### `cacheDir`

Der Pfad zum Stammverzeichnis des Cache-Verzeichnisses. Dieses Verzeichnis wird verwendet, um alle Treiber zu speichern, die heruntergeladen werden, wenn versucht wird, eine Sitzung zu starten.

Typ: `string`<br />
Standard: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Pfad zu einer benutzerdefinierten Treiber-Binärdatei. Wenn gesetzt, versucht WebdriverIO nicht, einen Treiber herunterzuladen, sondern verwendet den durch diesen Pfad bereitgestellten. Stellen Sie sicher, dass der Treiber mit dem von Ihnen verwendeten Browser kompatibel ist.

Sie können diesen Pfad über die Umgebungsvariablen `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` oder `EDGEDRIVER_PATH` angeben.

Typ: `string`

:::caution

Wenn der Treiber `binary` gesetzt ist, versucht WebdriverIO nicht, einen Treiber herunterzuladen, sondern verwendet den durch diesen Pfad bereitgestellten. Stellen Sie sicher, dass der Treiber mit dem von Ihnen verwendeten Browser kompatibel ist.

:::

#### Browser-spezifische Treiberoptionen

Um Optionen an den Treiber weiterzuleiten, können Sie die folgenden benutzerdefinierten Capabilities verwenden:

- Chrome oder Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Egde: `wdio:edgedriverOptions`
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
Serverlog in Datei statt nach stderr schreiben, erhöht Log-Level auf `INFO`

Typ: `string`

##### logLevel
Log-Level festlegen. Mögliche Optionen sind `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Typ: `string`

##### verbose
Ausführlich loggen (entspricht `--log-level=ALL`)

Typ: `boolean`

##### silent
Nichts loggen (entspricht `--log-level=OFF`)

Typ: `boolean`

##### appendLog
Log-Datei anhängen, anstatt sie neu zu schreiben.

Typ: `boolean`

##### replayable
Ausführlich loggen und lange Zeichenketten nicht abschneiden, sodass das Log wiedergegeben werden kann (experimentell).

Typ: `boolean`

##### readableTimestamp
Lesbare Zeitstempel zum Log hinzufügen.

Typ: `boolean`

##### enableChromeLogs
Logs vom Browser anzeigen (überschreibt andere Logging-Optionen).

Typ: `boolean`

##### bidiMapperPath
Benutzerdefinierter Bidi-Mapper-Pfad.

Typ: `string`

##### allowedIps
Durch Kommas getrennte Allowlist von Remote-IP-Adressen, die eine Verbindung zu EdgeDriver herstellen dürfen.

Typ: `string[]`<br />
Standard: `['']`

##### allowedOrigins
Durch Kommas getrennte Allowlist von Anforderungsursprüngen, die eine Verbindung zu EdgeDriver herstellen dürfen. Die Verwendung von `*` zur Erlaubnis eines beliebigen Host-Ursprungs ist gefährlich!

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

Einen Browser im Headless-Modus auszuführen bedeutet, eine Browser-Instanz ohne Fenster oder Benutzeroberfläche auszuführen. Dies wird meist in CI/CD-Umgebungen verwendet, in denen kein Display genutzt wird. Um einen Browser im Headless-Modus auszuführen, wenden Sie die folgenden Capabilities an:

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

Es scheint, dass Safari [keinen Headless-Modus unterstützt](https://discussions.apple.com/thread/251837694).

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

Beim Testen in Chrome wird WebdriverIO automatisch die gewünschte Browser-Version und den Treiber basierend auf der definierten `browserVersion` herunterladen, z.B.:

```ts
{
    browserName: 'chrome', // oder 'chromium'
    browserVersion: '116' // oder '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' oder 'latest' (gleich wie 'canary')
}
```

Wenn Sie einen manuell heruntergeladenen Browser testen möchten, können Sie einen binären Pfad zum Browser angeben über:

```ts
{
    browserName: 'chrome',  // oder 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Zusätzlich können Sie, wenn Sie einen manuell heruntergeladenen Treiber verwenden möchten, einen binären Pfad zum Treiber angeben über:

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

Beim Testen in Firefox wird WebdriverIO automatisch die gewünschte Browser-Version und den Treiber basierend auf der definierten `browserVersion` herunterladen, z.B.:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // oder 'latest'
}
```

Wenn Sie eine manuell heruntergeladene Version testen möchten, können Sie einen binären Pfad zum Browser angeben über:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Zusätzlich können Sie, wenn Sie einen manuell heruntergeladenen Treiber verwenden möchten, einen binären Pfad zum Treiber angeben über:

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

Stellen Sie beim Testen in Microsoft Edge sicher, dass Sie die gewünschte Browser-Version auf Ihrem Gerät installiert haben. Sie können WebdriverIO auf den auszuführenden Browser verweisen über:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO wird automatisch die gewünschte Treiberversion für Sie herunterladen, basierend auf der definierten `browserVersion`, z.B.:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // oder '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Zusätzlich können Sie, wenn Sie einen manuell heruntergeladenen Treiber verwenden möchten, einen binären Pfad zum Treiber angeben über:

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

Stellen Sie beim Testen in Safari sicher, dass Sie die [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) auf Ihrem Gerät installiert haben. Sie können WebdriverIO auf diese Version verweisen über:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Benutzerdefinierte Capabilities erweitern

Wenn Sie Ihren eigenen Satz von Capabilities definieren möchten, um z.B. beliebige Daten zu speichern, die innerhalb der Tests für diese spezifische Capability verwendet werden sollen, können Sie dies tun, indem Sie z.B. Folgendes setzen:

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

Es wird empfohlen, dem [W3C-Protokoll](https://w3c.github.io/webdriver/#dfn-extension-capability) zu folgen, wenn es um die Benennung von Capabilities geht, was ein `:` (Doppelpunkt) Zeichen erfordert, das einen implementierungsspezifischen Namespace bezeichnet. In Ihren Tests können Sie auf Ihre benutzerdefinierte Capability zugreifen durch, z.B.:

```ts
browser.capabilities['custom:caps']
```

Um Typsicherheit zu gewährleisten, können Sie die Capability-Schnittstelle von WebdriverIO erweitern über:

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