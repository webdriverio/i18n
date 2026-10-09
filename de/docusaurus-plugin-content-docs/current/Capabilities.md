---
id: capabilities
title: Capabilities
description: "Definieren Sie Capabilities, um die Browser- oder Mobilumgebung auszuwählen, in der Ihre Tests ausgeführt werden, einschließlich benutzerdefinierter Anbieter-Capabilities und spezieller Anwendungsfälle."
---

Eine Capability ist eine Definition für eine Remote-Schnittstelle. Sie hilft WebdriverIO zu verstehen, in welcher Browser- oder Mobilumgebung Sie Ihre Tests ausführen möchten. Capabilities sind bei der lokalen Entwicklung von Tests weniger entscheidend, da Sie diese meistens auf einer einzigen Remote-Schnittstelle ausführen, werden jedoch wichtiger, wenn Sie eine große Anzahl von Integrationstests in CI/CD ausführen.

:::info

Das Format eines Capability-Objekts ist durch die [WebDriver-Spezifikation](https://w3c.github.io/webdriver/#capabilities) klar definiert. Der WebdriverIO-Testrunner bricht frühzeitig ab, wenn benutzerdefinierte Capabilities nicht dieser Spezifikation entsprechen.

:::

## Benutzerdefinierte Capabilities

Während die Anzahl der fest definierten Capabilities sehr gering ist, kann jeder benutzerdefinierte Capabilities bereitstellen und akzeptieren, die spezifisch für den Automatisierungstreiber oder die Remote-Schnittstelle sind:

### Browserspezifische Capability-Erweiterungen

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities)-Erweiterungen, nur für Tests in Chrome anwendbar
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)-Erweiterungen, nur für Tests in Firefox anwendbar
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) zur Festlegung der Umgebung bei Verwendung von EdgeDriver zum Testen von Chromium Edge

### Capability-Erweiterungen von Cloud-Anbietern

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- und viele mehr...

### Capability-Erweiterungen von Automatisierungs-Engines

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- und viele mehr...

### WebdriverIO-Capabilities zur Verwaltung von Browsertreiber-Optionen

WebdriverIO übernimmt für Sie die Installation und Ausführung des Browsertreibers. WebdriverIO verwendet eine benutzerdefinierte Capability, mit der Sie Parameter an den Treiber übergeben können.

#### `wdio:chromedriverOptions`

Spezifische Optionen, die beim Start an Chromedriver übergeben werden.

#### `wdio:geckodriverOptions`

Spezifische Optionen, die beim Start an Geckodriver übergeben werden.

#### `wdio:edgedriverOptions`

Spezifische Optionen, die beim Start an Edgedriver übergeben werden.

#### `wdio:safaridriverOptions`

Spezifische Optionen, die beim Start an Safari übergeben werden.

#### `wdio:maxInstances`

<Option type="number">

Maximale Anzahl insgesamt parallel laufender Worker für den jeweiligen Browser bzw. die jeweilige Capability. Hat Vorrang vor [maxInstances](#configuration#maxInstances) und [maxInstancesPerCapability](configuration/#maxinstancespercapability).

</Option>

#### `wdio:specs`

<Option type="(String | String[])[]">

Definiert Specs für die Testausführung für diesen Browser bzw. diese Capability. Entspricht der [regulären `specs`-Konfigurationsoption](configuration#specs), ist jedoch spezifisch für den Browser bzw. die Capability. Hat Vorrang vor `specs`.

</Option>

#### `wdio:exclude`

<Option type="String[]">

Schließt Specs von der Testausführung für diesen Browser bzw. diese Capability aus. Entspricht der [regulären `exclude`-Konfigurationsoption](configuration#exclude), ist jedoch spezifisch für den Browser bzw. die Capability. Der Ausschluss erfolgt, nachdem die globale `exclude`-Konfigurationsoption angewendet wurde.

</Option>

#### `wdio:enforceWebDriverClassic`

<Option type="boolean">

Standardmäßig versucht WebdriverIO, eine WebDriver-Bidi-Session aufzubauen. Wenn Sie das nicht wünschen, können Sie dieses Flag setzen, um dieses Verhalten zu deaktivieren.

</Option>

#### `wdio:electronVersion`

<Option type="string">

Lädt den mit diesem Electron-Release gebündelten Chromedriver anstelle desjenigen von Chrome for Testing herunter, um eine als `goog:chromeOptions.binary` festgelegte Electron-App zu testen. Wenn zusätzlich `browserVersion` gesetzt ist, verwendet WebdriverIO stattdessen den Chromedriver für diese Version, wenn das Electron-Release nicht heruntergeladen werden kann oder `CHROMEDRIVER_CDNURL` gesetzt ist. Nightly-Versionen stammen aus [electron/nightlies](https://github.com/electron/nightlies/releases). Der Electron-Service setzt diesen Wert automatisch anhand der Electron-Version der App.

```ts
{
    browserName: 'chrome',
    'wdio:electronVersion': '33.2.1',
    // eine BiDi-Session ersetzt das Fenster der App durch `data:,`
    'wdio:enforceWebDriverClassic': true,
    'goog:chromeOptions': {
        binary: './out/my-app-darwin-arm64/my-app.app/Contents/MacOS/my-app'
    }
}
```

</Option>

#### Allgemeine Treiberoptionen

Während alle Treiber unterschiedliche Konfigurationsparameter anbieten, gibt es einige gemeinsame, die WebdriverIO versteht und zur Einrichtung Ihres Treibers oder Browsers verwendet:

##### `cacheDir`

<Option type="string" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

Der Pfad zum Stammverzeichnis des Caches. Dieses Verzeichnis wird verwendet, um alle Treiber zu speichern, die beim Versuch, eine Session zu starten, heruntergeladen werden.

</Option>

##### `binary`

<Option type="string">

Pfad zu einer benutzerdefinierten Treiber-Binärdatei. Wenn gesetzt, versucht WebdriverIO nicht, einen Treiber herunterzuladen, sondern verwendet den unter diesem Pfad bereitgestellten. Stellen Sie sicher, dass der Treiber mit dem von Ihnen verwendeten Browser kompatibel ist.

Sie können diesen Pfad über die Umgebungsvariablen `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` oder `EDGEDRIVER_PATH` angeben.

</Option>
:::caution

Wenn die Treiber-`binary` gesetzt ist, versucht WebdriverIO nicht, einen Treiber herunterzuladen, sondern verwendet den unter diesem Pfad bereitgestellten. Stellen Sie sicher, dass der Treiber mit dem von Ihnen verwendeten Browser kompatibel ist.

:::

#### Benutzerdefinierter Host für Treiber-Downloads

Wenn die öffentlichen Treiber-CDNs aus Ihrer Umgebung nicht erreichbar sind, z. B. weil Sie Ihre Tests hinter einem Unternehmensproxy ausführen oder die Treiber in einer internen Artefakt-Registry spiegeln, können Sie den Download mithilfe der folgenden Umgebungsvariablen auf einen benutzerdefinierten Host umleiten:

- Chrome: `CHROMEDRIVER_CDNURL`, standardmäßig `https://storage.googleapis.com/chrome-for-testing-public`
- Microsoft Edge: `EDGEDRIVER_CDNURL`, standardmäßig `https://msedgedriver.microsoft.com`

Es wird erwartet, dass der Mirror die Treiberarchive unter denselben Pfaden wie das ursprüngliche CDN bereitstellt, z. B. für Chrome:

```sh
CHROMEDRIVER_CDNURL=https://artifactory.company.com/chrome-for-testing npx wdio run wdio.conf.js
```

was den Treiber zu `https://artifactory.company.com/chrome-for-testing/<buildId>/<platform>/chromedriver-<platform>.zip` auflöst, wobei `<platform>` einer der Werte `linux64`, `linux-arm64`, `mac-x64`, `mac-arm64`, `win32` oder `win64` ist, z. B. `.../140.0.7339.207/mac-arm64/chromedriver-mac-arm64.zip`.

:::info Vollständig Offline-Umgebungen

Diese Variablen leiten nur den Treiber-Download um. Damit WebdriverIO überhaupt nicht auf das öffentliche Internet zugreift, müssen vier weitere Bedingungen erfüllt sein:

- **Ein Browser muss lokal verfügbar sein.** Wenn WebdriverIO kein installiertes Chrome oder Firefox findet, lädt es auch den Browser herunter, und dieser Download berücksichtigt diese Variablen nicht. Installieren Sie den Browser entweder auf dem Rechner oder verweisen Sie WebdriverIO über `goog:chromeOptions.binary` / `moz:firefoxOptions.binary` darauf.
- **Verwenden Sie eine vollständige Versionsnummer.** Wenn `browserVersion` weggelassen wird, liest WebdriverIO die exakte Version aus dem lokalen Browser aus, und es ist keine Versionsabfrage erforderlich. Wenn Sie sie setzen, verwenden Sie die vollständige vierteilige Version, z. B. `140.0.7339.207`. Ein Release-Kanal (`stable`), ein Meilenstein (`140`) oder eine unvollständige Version (`140.0.7339`) erfordert eine Versionsabfrage bei einem öffentlichen Google-Endpunkt, die nicht umgeleitet werden kann.
- **Chromedriver muss von Chrome for Testing stammen.** Für Chrome-Versionen älter als `153.0.8001.0` unter Linux ARM64 sowie bei Verwendung von `wdio:electronVersion` ohne `browserVersion` wird Chromedriver von den GitHub-Releases von Electron heruntergeladen, die von diesen Variablen nicht umgeleitet werden.
- **Stellen Sie sicher, dass der Mirror die benötigte Version tatsächlich enthält.** Wenn der Treiber nicht von Ihrem Host abgerufen werden kann – weil die Version nicht gespiegelt ist, aber ebenso, weil die URL falsch ist oder die Zugangsdaten abgelehnt wurden –, protokolliert WebdriverIO eine Warnung und sucht anschließend nach der nächstgelegenen bekannten funktionierenden Version, wobei erneut der öffentliche Endpunkt abgefragt wird. Prüfen Sie in der Warnung, welchen Host es versucht hat, wenn ein Lauf unerwartet auf das Internet zugreift oder eine Version wählt, die Sie nicht angefordert haben.

:::

#### Browserspezifische Treiberoptionen

Um Optionen an den Treiber weiterzugeben, können Sie die folgenden benutzerdefinierten Capabilities verwenden:

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

<Option type="number">

Der Port, auf dem der ADB-Treiber laufen soll.

Beispiel: `9515`

</Option>

##### urlBase

<Option type="string">

Basis-URL-Pfadpräfix für Befehle, z. B. `wd/url`.

Beispiel: `/`

</Option>

##### logPath

<Option type="string">

Schreibt das Server-Log in eine Datei statt nach stderr, erhöht das Log-Level auf `INFO`

</Option>

##### logLevel

<Option type="string">

Legt das Log-Level fest. Mögliche Optionen: `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

</Option>

##### verbose

<Option type="boolean">

Ausführliches Logging (entspricht `--log-level=ALL`)

</Option>

##### silent

<Option type="boolean">

Kein Logging (entspricht `--log-level=OFF`)

</Option>

##### appendLog

<Option type="boolean">

Hängt an die Logdatei an, statt sie zu überschreiben.

</Option>

##### replayable

<Option type="boolean">

Ausführliches Logging ohne Kürzung langer Strings, sodass das Log erneut abgespielt werden kann (experimentell).

</Option>

##### readableTimestamp

<Option type="boolean">

Fügt dem Log lesbare Zeitstempel hinzu.

</Option>

##### enableChromeLogs

<Option type="boolean">

Zeigt Logs des Browsers an (überschreibt andere Logging-Optionen).

</Option>

##### bidiMapperPath

<Option type="string">

Benutzerdefinierter Pfad zum Bidi-Mapper.

</Option>

##### allowedIps

<Option type="string[]" default="['']">

Kommagetrennte Allowlist von Remote-IP-Adressen, die sich mit EdgeDriver verbinden dürfen.

</Option>

##### allowedOrigins

<Option type="string[]" default="['*']">

Kommagetrennte Allowlist von Request-Origins, die sich mit EdgeDriver verbinden dürfen. Die Verwendung von `*`, um jeden Host-Origin zuzulassen, ist gefährlich!

</Option>

##### spawnOpts

<Option type="SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>" default="undefined">

Optionen, die an den Treiberprozess übergeben werden.

</Option>
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

Dies ist eine Liste von Beispielen, die zeigen, welche Capabilities angewendet werden müssen, um einen bestimmten Anwendungsfall umzusetzen.

### Browser headless ausführen

Einen Browser headless auszuführen bedeutet, eine Browserinstanz ohne Fenster oder UI zu betreiben. Dies wird hauptsächlich in CI/CD-Umgebungen verwendet, in denen kein Display genutzt wird. Um einen Browser im Headless-Modus auszuführen, wenden Sie die folgenden Capabilities an:

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

Es scheint, dass Safari die Ausführung im Headless-Modus [nicht unterstützt](https://discussions.apple.com/thread/251837694).

</TabItem>
</Tabs>

### Verschiedene Browser-Kanäle automatisieren

Wenn Sie eine Browserversion testen möchten, die noch nicht als stabil veröffentlicht wurde, z. B. Chrome Canary, können Sie dies tun, indem Sie Capabilities setzen und auf den Browser verweisen, den Sie starten möchten, z. B.:

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

Beim Testen in Chrome lädt WebdriverIO die gewünschte Browserversion und den Treiber basierend auf der definierten `browserVersion` automatisch für Sie herunter, z. B.:

```ts
{
    browserName: 'chrome', // oder 'chromium'
    browserVersion: '116' // oder '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' oder 'latest' (entspricht 'canary')
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

Wenn Sie außerdem einen manuell heruntergeladenen Treiber verwenden möchten, können Sie einen Binärpfad zum Treiber angeben über:

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

Beim Testen in Firefox lädt WebdriverIO die gewünschte Browserversion und den Treiber basierend auf der definierten `browserVersion` automatisch für Sie herunter, z. B.:

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

Wenn Sie außerdem einen manuell heruntergeladenen Treiber verwenden möchten, können Sie einen Binärpfad zum Treiber angeben über:

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

Stellen Sie beim Testen in Microsoft Edge sicher, dass die gewünschte Browserversion auf Ihrem Rechner installiert ist. Sie können WebdriverIO auf den auszuführenden Browser verweisen über:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO lädt die gewünschte Treiberversion basierend auf der definierten `browserVersion` automatisch für Sie herunter, z. B.:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // oder '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Wenn Sie außerdem einen manuell heruntergeladenen Treiber verwenden möchten, können Sie einen Binärpfad zum Treiber angeben über:

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

Stellen Sie beim Testen in Safari sicher, dass die [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) auf Ihrem Rechner installiert ist. Sie können WebdriverIO auf diese Version verweisen über:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Benutzerdefinierte Capabilities erweitern

Wenn Sie Ihre eigenen Capabilities definieren möchten, um z. B. beliebige Daten zu speichern, die in den Tests für diese spezifische Capability verwendet werden sollen, können Sie dies z. B. folgendermaßen tun:

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

Es wird empfohlen, bei der Benennung von Capabilities dem [W3C-Protokoll](https://w3c.github.io/webdriver/#dfn-extension-capability) zu folgen, das ein `:` (Doppelpunkt) erfordert, welches einen implementierungsspezifischen Namespace kennzeichnet. In Ihren Tests können Sie auf Ihre benutzerdefinierte Capability z. B. folgendermaßen zugreifen:

```ts
browser.capabilities['custom:caps']
```

Um Typsicherheit zu gewährleisten, können Sie das Capability-Interface von WebdriverIO erweitern über:

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