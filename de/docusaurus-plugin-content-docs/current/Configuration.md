---
id: configuration
title: Konfiguration
---

Basierend auf dem [Setup-Typ](/docs/setuptypes) (z.B. bei Verwendung der rohen Protokollbindungen, WebdriverIO als eigenständiges Paket oder dem WDIO-Testrunner) steht eine unterschiedliche Anzahl von Optionen zur Verfügung, um die Umgebung zu steuern.

## WebDriver-Optionen

Die folgenden Optionen sind definiert, wenn das [`webdriver`](https://www.npmjs.com/package/webdriver) Protokollpaket verwendet wird:

### protocol

Protokoll, das bei der Kommunikation mit dem Treiber-Server verwendet wird.

Typ: `String`<br />
Standard: `http`

### hostname

Host Ihres Treiber-Servers.

Typ: `String`<br />
Standard: `0.0.0.0`

### port

Port, auf dem Ihr Treiber-Server läuft.

Typ: `Number`<br />
Standard: `undefined`

### path

Pfad zum Endpunkt des Treiber-Servers.

Typ: `String`<br />
Standard: `/`

### queryParams

Abfrageparameter, die an den Treiber-Server weitergeleitet werden.

Typ: `Object`<br />
Standard: `undefined`

### user

Ihr Cloud-Service-Benutzername (funktioniert nur für [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) oder [LambdaTest](https://www.lambdatest.com) Konten). Wenn gesetzt, wird WebdriverIO automatisch Verbindungsoptionen für Sie festlegen. Wenn Sie keinen Cloud-Anbieter verwenden, kann dies zur Authentifizierung bei jedem anderen WebDriver-Backend verwendet werden.

Typ: `String`<br />
Standard: `undefined`

### key

Ihr Cloud-Service-Zugriffsschlüssel oder geheimer Schlüssel (funktioniert nur für [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) oder [LambdaTest](https://www.lambdatest.com) Konten). Wenn gesetzt, wird WebdriverIO automatisch Verbindungsoptionen für Sie festlegen. Wenn Sie keinen Cloud-Anbieter verwenden, kann dies zur Authentifizierung bei jedem anderen WebDriver-Backend verwendet werden.

Typ: `String`<br />
Standard: `undefined`

### capabilities

Definiert die Fähigkeiten, die Sie in Ihrer WebDriver-Sitzung ausführen möchten. Weitere Details finden Sie im [WebDriver-Protokoll](https://w3c.github.io/webdriver/#capabilities). Wenn Sie einen älteren Treiber verwenden, der das WebDriver-Protokoll nicht unterstützt, müssen Sie die [JSONWireProtocol-Capabilities](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) verwenden, um eine Sitzung erfolgreich auszuführen.

Neben den WebDriver-basierten Capabilities können Sie browser- und anbieterspezifische Optionen anwenden, die eine tiefere Konfiguration des Remote-Browsers oder -Geräts ermöglichen. Diese sind in den entsprechenden Anbieter-Dokumentationen dokumentiert, z.B.:

- `goog:chromeOptions`: für [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: für [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: für [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: für [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: für [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: für [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Zusätzlich ist der Sauce Labs [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) ein nützliches Werkzeug, das Ihnen hilft, dieses Objekt durch Zusammenklicken Ihrer gewünschten Capabilities zu erstellen.

Typ: `Object`<br />
Standard: `null`

**Beispiel:**

```js
{
    browserName: 'chrome', // Optionen: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // Browser-Version
    platformName: 'Windows 10' // Betriebssystem-Plattform
}
```

Wenn Sie Web- oder native Tests auf mobilen Geräten ausführen, unterscheiden sich die `capabilities` vom WebDriver-Protokoll. Weitere Details finden Sie in der [Appium-Dokumentation](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/).

### logLevel

Ausführlichkeit der Protokollierung.

Typ: `String`<br />
Standard: `info`<br />
Optionen: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Verzeichnis zum Speichern aller Testrunner-Protokolldateien (einschließlich Reporter-Protokollen und `wdio`-Protokollen). Wenn nicht gesetzt, werden alle Protokolle an `stdout` gestreamt. Da die meisten Reporter für die Ausgabe an `stdout` konzipiert sind, wird empfohlen, diese Option nur für bestimmte Reporter zu verwenden, bei denen es sinnvoller ist, Berichte in eine Datei zu schreiben (wie z.B. beim `junit`-Reporter).

Im Standalone-Modus wird von WebdriverIO nur das `wdio`-Protokoll generiert.

Typ: `String`<br />
Standard: `null`

### connectionRetryTimeout

Timeout für jede WebDriver-Anfrage an einen Treiber oder ein Grid.

Typ: `Number`<br />
Standard: `120000`

### connectionRetryCount

Maximale Anzahl von Anfrage-Wiederholungen an den Selenium-Server.

Typ: `Number`<br />
Standard: `3`

### agent

Ermöglicht die Verwendung eines benutzerdefinierten `http`/`https`/`http2` [Agenten](https://www.npmjs.com/package/got#agent) für Anfragen.

Typ: `Object`<br />
Standard:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Geben Sie benutzerdefinierte `headers` an, die in jede WebDriver-Anfrage übergeben werden sollen. Wenn Ihr Selenium Grid eine Basic-Authentifizierung erfordert, empfehlen wir, einen `Authorization`-Header über diese Option zu übergeben, um Ihre WebDriver-Anfragen zu authentifizieren, z.B.:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Read the username and password from environment variables
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Combine the username and password with a colon separator
const credentials = `${username}:${password}`;
// Encode the credentials using Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

Typ: `Object`<br />
Standard: `{}`

### transformRequest

Funktion, die [HTTP-Anfrage-Optionen](https://github.com/sindresorhus/got#options) abfängt, bevor eine WebDriver-Anfrage gestellt wird

Typ: `(RequestOptions) => RequestOptions`<br />
Standard: *keine*

### transformResponse

Funktion, die HTTP-Antwortobjekte abfängt, nachdem eine WebDriver-Antwort eingetroffen ist. Die Funktion erhält das ursprüngliche Antwortobjekt als erstes und die entsprechenden `RequestOptions` als zweites Argument.

Typ: `(Response, RequestOptions) => Response`<br />
Standard: *keine*

### strictSSL

Ob es nicht erforderlich ist, dass das SSL-Zertifikat gültig ist.
Es kann über Umgebungsvariablen wie `STRICT_SSL` oder `strict_ssl` gesetzt werden.

Typ: `Boolean`<br />
Standard: `true`

### enableDirectConnect

Ob die [Appium-Direktverbindungsfunktion](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) aktiviert werden soll.
Es hat keine Auswirkung, wenn die Antwort keine entsprechenden Schlüssel enthält, während das Flag aktiviert ist.

Typ: `Boolean`<br />
Standard: `true`

### cacheDir

Der Pfad zum Stammverzeichnis des Cache. Dieses Verzeichnis wird verwendet, um alle Treiber zu speichern, die beim Versuch, eine Sitzung zu starten, heruntergeladen werden.

Typ: `String`<br />
Standard: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

---

## WebdriverIO

Die folgenden Optionen (einschließlich der oben aufgeführten) können mit WebdriverIO im Standalone-Modus verwendet werden:

### automationProtocol

Definieren Sie das Protokoll, das Sie für Ihre Browser-Automatisierung verwenden möchten. Derzeit wird nur [`webdriver`](https://www.npmjs.com/package/webdriver) unterstützt, da es die Hauptbrowser-Automatisierungstechnologie ist, die WebdriverIO verwendet.

Wenn Sie den Browser mit einer anderen Automatisierungstechnologie automatisieren möchten, stellen Sie sicher, dass Sie diese Eigenschaft auf einen Pfad setzen, der auf ein Modul verweist, das die folgende Schnittstelle einhält:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Start a automation session and return a WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * with respective automation commands. See the [webdriver](https://www.npmjs.com/package/webdriver) package
     * as a reference implementation
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO options
     * @param {Function} hook that allows to modify the client before it gets released from the function
     * @param {PropertyDescriptorMap} userPrototype allows user to add custom protocol commands
     * @param {Function} customCommandWrapper allows to modify the command execution
     * @returns a WebdriverIO compatible client instance
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * allows user to attach to existing sessions
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Changes The instance session id and browser capabilities for the new session
     * directly into the passed in browser object
     *
     * @optional
     * @param   {object} instance  the object we get from a new browser session.
     * @returns {string}           the new session id of the browser
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

Typ: `String`<br />
Standard: `webdriver`

### baseUrl

Verkürzen Sie `url`-Befehlsaufrufe, indem Sie eine Basis-URL festlegen.
- Wenn Ihr `url`-Parameter mit `/` beginnt, wird `baseUrl` vorangestellt (außer dem `baseUrl`-Pfad, falls vorhanden).
- Wenn Ihr `url`-Parameter ohne Schema oder `/` beginnt (wie `some/path`), wird die vollständige `baseUrl` direkt vorangestellt.

Typ: `String`<br />
Standard: `null`

### waitforTimeout

Standardzeitüberschreitung für alle `waitFor*`-Befehle. (Beachten Sie das Kleinbuchstaben-`f` im Optionsnamen.) Diese Zeitüberschreitung betrifft __nur__ Befehle, die mit `waitFor*` beginnen, und ihre Standardwartezeit.

Um die Zeitüberschreitung für einen _Test_ zu erhöhen, lesen Sie bitte die Framework-Dokumentation.

Typ: `Number`<br />
Standard: `5000`

### waitforInterval

Standardintervall für alle `waitFor*`-Befehle, um zu prüfen, ob ein erwarteter Zustand (z.B. Sichtbarkeit) geändert wurde.

Typ: `Number`<br />
Standard: `100`

### region

Wenn Sie auf Sauce Labs laufen, können Sie wählen, Tests zwischen verschiedenen Rechenzentren auszuführen: US oder EU.
Um Ihre Region auf EU zu ändern, fügen Sie `region: 'eu'` zu Ihrer Konfiguration hinzu.

__Hinweis:__ Dies hat nur eine Auswirkung, wenn Sie `user` und `key` Optionen angeben, die mit Ihrem Sauce Labs-Konto verbunden sind.

Typ: `String`<br />
Standard: `us`

*(nur für VM und/oder EM/Simulatoren)*

---

## Testrunner-Optionen

Die folgenden Optionen (einschließlich der oben aufgeführten) sind nur für die Ausführung von WebdriverIO mit dem WDIO-Testrunner definiert:

### specs

Definieren Sie Spezifikationen für die Testausführung. Sie können entweder ein Glob-Muster angeben, um mehrere Dateien auf einmal abzugleichen, oder ein Glob oder eine Reihe von Pfaden in ein Array einpacken, um sie innerhalb eines einzelnen Worker-Prozesses auszuführen. Alle Pfade werden relativ zum Konfigurationsdateipfad betrachtet.

Typ: `(String | String[])[]`<br />
Standard: `[]`

### exclude

Schließen Sie Spezifikationen von der Testausführung aus. Alle Pfade werden relativ zum Konfigurationsdateipfad betrachtet.

Typ: `String[]`<br />
Standard: `[]`

### suites

Ein Objekt, das verschiedene Suiten beschreibt, die Sie dann mit der Option `--suite` auf der `wdio`-CLI angeben können.