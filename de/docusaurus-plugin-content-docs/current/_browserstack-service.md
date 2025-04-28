---
id: browserstack-service
title: Browserstack Service
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-browserstack-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Ein WebdriverIO-Dienst, der lokale Tunnel und Job-Metadaten für BrowserStack-Benutzer verwaltet.

## Installation


Der einfachste Weg ist, `@wdio/browserstack-service` als devDependency in Ihrer `package.json` zu behalten, über:

```sh
npm install @wdio/browserstack-service --save-dev
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier.](https://webdriver.io/docs/gettingstarted)


## Konfiguration

WebdriverIO bietet standardmäßig BrowserStack-Unterstützung. Sie sollten `user` und `key` in Ihrer `wdio.conf.js`-Datei einstellen. Dieses Service-Plugin bietet Unterstützung für [BrowserStack Tunnel](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/local-testing). Setzen Sie außerdem `browserstackLocal: true`, um diese Funktion zu aktivieren.
Die Meldung des Sessionstatus auf BrowserStack berücksichtigt die `strict`-Einstellung der Cucumber-Optionen.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            },
            browserstackLocal: true
        }]
    ],
    // ...
};
```

## Optionen

Um sich beim BrowserStack-Dienst zu authentifizieren, muss Ihre Konfiguration eine [`user`](https://webdriver.io/docs/options#user)- und [`key`](https://webdriver.io/docs/options#key)-Option enthalten.

### testObservability

Test Observability ist ein fortschrittliches Test-Reporting-Tool, das Einblicke zur Verbesserung Ihrer Automatisierungstests bietet und Ihnen hilft, schneller zu debuggen. Es ist standardmäßig aktiviert, indem Sie das Flag `testObservability`​ für alle Benutzer des browserstack-service auf `true` setzen. Sie können dies deaktivieren, indem Sie das Flag `testObservability`​ auf `false` setzen.

Sobald Ihre Tests abgeschlossen sind, können Sie [Test Observability](https://observability.browserstack.com/) besuchen, um Ihre Builds mit zusätzlichen Erkenntnissen wie Unique Error Analysis, Automatic Flaky Test Detection und mehr zu debuggen.

Sie können Test Observability auch verwenden, wenn Sie Ihre Tests nicht auf der BrowserStack-Infrastruktur ausführen. Selbst wenn Sie Ihre Tests auf einer CI, einer lokalen Maschine oder sogar bei anderen Cloud-Dienstanbietern ausführen, kann Test Observability dennoch intelligente Testberichte und erweiterte Analysen zu Ihren Tests erstellen.

Wenn Sie Test Observability nutzen möchten, ohne Ihre Tests auf der BrowserStack-Infrastruktur auszuführen, können Sie Ihre Konfiguration wie folgt festlegen:


```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                user: process.env.BROWSERSTACK_USERNAME,
                key: process.env.BROWSERSTACK_ACCESS_KEY,
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            }
        }]
    ],
    // ...
};
```

Sie können alle Funktionen von Test Observability in [dieser Sandbox](https://observability-demo.browserstack.com/) erkunden oder mehr darüber [hier](https://www.browserstack.com/docs/test-observability/overview/what-is-test-observability) lesen.

### browserstackLocal
Setzen Sie dies auf true, um Verbindungen von der BrowserStack-Cloud über Ihren Computer zu leiten.

Typ: `Boolean`<br />
Standard: `false`

### forcedStop
Setzen Sie dies auf true, um den BrowserStack Local-Prozess bei Abschluss zu beenden, ohne auf den BrowserStack Local-Stop-Callback zu warten. Dies ist experimentell und sollte nicht von allen verwendet werden. Hauptsächlich als Workaround für [dieses Problem](https://github.com/browserstack/browserstack-local-nodejs/issues/41) erforderlich.

Typ: `Boolean`<br />
Standard: `false`

### app

[Appium](https://appium.io/) setzen Sie dies mit dem lokal auf Ihrem Gerät verfügbaren App-Dateipfad, um die App als [Anwendung unter Test](https://www.browserstack.com/docs/app-automate/appium/set-up-tests/specify-app) für Appium-Sitzungen zu verwenden.

Typ: `String` oder `JsonObject`<br />
Standard: `undefined`

Liste der verfügbaren App-Werte:

#### path
Verwenden Sie den lokal verfügbaren App-Dateipfad als Anwendung unter Test für Appium.

```js
services: [
  ['browserstack', {
    app: '/path/to/local/app.apk'
    // OR
    app: {
      path: '/path/to/local/app.apk'
    }
  }]
]
```

Übergeben Sie custom_id während des App-Uploads.

```js
services: [
  ['browserstack', {
    app: {
      path: '/path/to/local/app.apk',
      custom_id: 'custom_id'
    }
  }]
]
```

#### id
Verwenden Sie die App-URL, die nach dem Hochladen der App zu BrowserStack zurückgegeben wird.

```js
services: [
  ['browserstack', {
    app: 'bs://<app-id>'
    // OR
    app: {
      id: 'bs://<app-id>'
    }
  }]
]
```

#### custom_id

Verwenden Sie custom_id von bereits hochgeladenen Apps

```js
services: [
  ['browserstack', {
    app: 'custom_id'
    // OR
    app: {
      custom_id: 'custom_id'
    }
  }]
]
```

#### shareable_id

Verwenden Sie shareable_id von bereits hochgeladenen Apps

```js
services: [
  ['browserstack', {
    app: 'username/custom_id'
    // OR
    app: {
      shareable_id: 'username/custom_id'
    }
  }]
]
```

### preferScenarioName

Nur Cucumber. Setzen Sie den BrowserStack Automate-Sitzungsnamen auf den Szenarionamen, wenn nur ein einzelnes Szenario ausgeführt wurde.
Nützlich bei paralleler Ausführung mit [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution).

Typ: `Boolean`<br />
Standard: `false`

### sessionNameFormat

Passen Sie das BrowserStack Automate-Sitzungsnamenformat an.

Typ: `Function`<br />
Standard (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
Standard (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle

Nur Mocha. Hängen Sie den Testtitel nicht an den BrowserStack Automate-Sitzungsnamen an.

Typ: `Boolean`<br />
Standard: `false`

### sessionNamePrependTopLevelSuiteTitle

Nur Mocha. Stellen Sie den Titel der obersten Suite dem BrowserStack Automate-Sitzungsnamen voran.

Typ: `Boolean`<br />
Standard: `false`

### setSessionName

Setzen Sie den BrowserStack Automate-Sitzungsnamen automatisch.

Typ: `Boolean`<br />
Standard: `true`

### setSessionStatus

Setzen Sie den BrowserStack Automate-Sitzungsstatus (bestanden/fehlgeschlagen) automatisch.

Typ: `Boolean`<br />
Standard: `true`

### buildIdentifier

**buildIdentifier** ist eine eindeutige ID, um jede Ausführung zu unterscheiden, die dem buildName angehängt wird. Wählen Sie Ihr buildIdentifier-Format aus den verfügbaren Ausdrücken:
* `BUILD_NUMBER`: Generiert einen inkrementellen Zähler mit jeder Ausführung
* `DATE_TIME`: Generiert einen Zeitstempel mit jeder Ausführung. Bsp. 05-Nov-19:30

```js
services: [
  ['browserstack', {
    buildIdentifier: '#${BUILD_NUMBER}'
  }]
]
```
Build Identifier unterstützt die Verwendung eines oder beider Ausdrücke zusammen mit anderen Zeichen, um benutzerdefinierte Formatierungsoptionen zu ermöglichen.

### opts

BrowserStack Local-Optionen.

Typ: `Object`<br />
Standard: `{}`

Liste der verfügbaren lokalen Testmodifikatoren, die als opts übergeben werden können:

#### Local Identifier

Wenn Sie gleichzeitig mehrere lokale Testverbindungen durchführen, setzen Sie dies für verschiedene Prozesse eindeutig -

```js
opts = { localIdentifier: "randomstring" };
```

#### Verbose Logging

Um ausführliches Logging zu aktivieren -

```js
opts = { verbose: "true" };
```

Hinweis - Mögliche Werte für den 'verbose'-Modifikator sind '1', '2', '3' und 'true'

#### Force Local

Um den gesamten Verkehr über lokale (Ihre) Maschine zu leiten -

```js
opts = { forceLocal: "true" };
```

#### Folder Testing

Um lokalen Ordner anstelle eines internen Servers zu testen, geben Sie den Pfad zum Ordner als Wert dieser Option an -

```js
opts = { f: "/my/awesome/folder" };
```

#### Force Start

Um andere laufende BrowserStack Local-Instanzen zu beenden -

```js
opts = { force: "true" };
```

#### Only Automate

Um lokale Tests für Live und Screenshots zu deaktivieren und nur Automate zu aktivieren -

```js
opts = { onlyAutomate: "true" };
```

#### Proxy

Um einen Proxy für lokales Testen zu verwenden -

- proxyHost: Hostname/IP des Proxys, die restlichen Proxy-Optionen werden ignoriert, wenn diese Option fehlt
- proxyPort: Port für den Proxy, standardmäßig 3128, wenn -proxyHost verwendet wird
- proxyUser: Benutzername für die Verbindung zum Proxy (nur Basic Auth)
- proxyPass: Passwort für USERNAME, wird ignoriert, wenn USERNAME leer ist oder nicht angegeben wird

```js
opts = {
  proxyHost: "127.0.0.1",
  proxyPort: "8000",
  proxyUser: "user",
  proxyPass: "password",
};
```

#### Local Proxy

Um lokalen Proxy beim lokalen Testen zu verwenden -

- localProxyHost: Hostname/IP des Proxys, die restlichen Proxy-Optionen werden ignoriert, wenn diese Option fehlt
- localProxyPort: Port für den Proxy, standardmäßig 8081, wenn -localProxyHost verwendet wird
- localProxyUser: Benutzername für die Verbindung zum Proxy (nur Basic Auth)
- localProxyPass: Passwort für USERNAME, wird ignoriert, wenn USERNAME leer ist oder nicht angegeben wird

```js
opts = {
  localProxyHost: "127.0.0.1",
  localProxyPort: "8000",
  localProxyUser: "user",
  localProxyPass: "password",
};
```

#### PAC (Proxy Auto-Configuration)

Um PAC (Proxy Auto-Konfiguration) beim lokalen Testen zu verwenden -

- pac-file: Absoluter Pfad der PAC-Datei (Proxy Auto-Konfiguration)

```js
opts = { "pac-file": "<pac_file_abs_path>" };
```

#### Binary Path

Standardmäßig versuchen BrowserStack-Local-Wrapper, die neueste Version der BrowserStack-Binärdatei in ~/.browserstack oder dem aktuellen Arbeitsverzeichnis oder dem tmp-Ordner nach Reihenfolge herunterzuladen und auszuführen. Sie können dies jedoch überschreiben, indem Sie das Argument -binarypath übergeben.
Pfad zur Angabe des lokalen Binärpfads -

```js
opts = { binarypath: "/path/to/binary" };
```

#### Logfile

Um die Logs in eine Datei zu speichern, während Sie mit dem Argument '-v' laufen, können Sie den Pfad der Datei angeben. Standardmäßig werden die Logs in der Datei local.log im aktuellen Arbeitsverzeichnis gespeichert.
Um den Pfad zur Datei anzugeben, in der die Logs gespeichert werden -

```js
opts = { verbose: "true", logFile: "./local.log" };
```

----

Für weitere Informationen zu WebdriverIO besuchen Sie die [Homepage](https://webdriver.io).