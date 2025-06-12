---
id: configuration
title: Konfiguration
---

Basierend auf dem [Setup-Typ](/docs/setuptypes) (z.B. bei Verwendung der Raw-Protokoll-Bindings, WebdriverIO als eigenständiges Paket oder dem WDIO-Testrunner) gibt es verschiedene Optionen zur Steuerung der Umgebung.

## WebDriver-Optionen

Die folgenden Optionen sind definiert, wenn das [`webdriver`](https://www.npmjs.com/package/webdriver)-Protokollpaket verwendet wird:

### protocol

Protokoll für die Kommunikation mit dem Treiber-Server.

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

Abfrageparameter, die an den Treiber-Server weitergegeben werden.

Typ: `Object`<br />
Standard: `undefined`

### user

Ihr Cloud-Service-Benutzername (funktioniert nur für [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) oder [LambdaTest](https://www.lambdatest.com) Konten). Wenn gesetzt, wird WebdriverIO automatisch Verbindungsoptionen für Sie festlegen. Wenn Sie keinen Cloud-Anbieter verwenden, kann dies zur Authentifizierung eines anderen WebDriver-Backends verwendet werden.

Typ: `String`<br />
Standard: `undefined`

### key

Ihr Cloud-Service-Zugriffsschlüssel oder geheimer Schlüssel (funktioniert nur für [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) oder [LambdaTest](https://www.lambdatest.com) Konten). Wenn gesetzt, wird WebdriverIO automatisch Verbindungsoptionen für Sie festlegen. Wenn Sie keinen Cloud-Anbieter verwenden, kann dies zur Authentifizierung eines anderen WebDriver-Backends verwendet werden.

Typ: `String`<br />
Standard: `undefined`

### capabilities

Definiert die Capabilities, die Sie in Ihrer WebDriver-Sitzung ausführen möchten. Weitere Details finden Sie im [WebDriver-Protokoll](https://w3c.github.io/webdriver/#capabilities). Wenn Sie einen älteren Treiber verwenden, der das WebDriver-Protokoll nicht unterstützt, müssen Sie die [JSONWireProtocol-Capabilities](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) verwenden, um eine Sitzung erfolgreich auszuführen.

Neben den WebDriver-basierten Capabilities können Sie browser- und anbieterspezifische Optionen anwenden, die eine tiefere Konfiguration des Remote-Browsers oder -Geräts ermöglichen. Diese sind in den entsprechenden Anbieter-Dokumentationen dokumentiert, z.B.:

- `goog:chromeOptions`: für [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: für [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: für [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: für [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: für [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: für [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Zusätzlich ist der Sauce Labs [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) ein nützliches Tool, das Ihnen hilft, dieses Objekt durch Zusammenklicken Ihrer gewünschten Capabilities zu erstellen.

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

Wenn Sie Web- oder native Tests auf mobilen Geräten ausführen, unterscheiden sich die `capabilities` vom WebDriver-Protokoll. Weitere Details finden Sie in der [Appium-Dokumentation](https://appium.io/docs/en/latest/guides/caps/).

### logLevel

Grad der Ausführlichkeit der Protokollierung.

Typ: `String`<br />
Standard: `info`<br />
Optionen: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Verzeichnis zum Speichern aller Testrunner-Protokolldateien (einschließlich Reporter-Protokollen und `wdio`-Protokollen). Wenn nicht gesetzt, werden alle Protokolle an `stdout` gestreamt. Da die meisten Reporter für die Ausgabe an `stdout` konzipiert sind, wird empfohlen, diese Option nur für bestimmte Reporter zu verwenden, bei denen es sinnvoller ist, Berichte in eine Datei zu schreiben (wie zum Beispiel der `junit`-Reporter).

Im Standalone-Modus wird nur das `wdio`-Protokoll von WebdriverIO generiert.

Typ: `String`<br />
Standard: `null`

### connectionRetryTimeout

Timeout für jede WebDriver-Anfrage an einen Treiber oder Grid.

Typ: `Number`<br />
Standard: `120000`

### connectionRetryCount

Maximale Anzahl von Wiederholungsversuchen für Anfragen an den Selenium-Server.

Typ: `Number`<br />
Standard: `3`

### agent

Ermöglicht die Verwendung eines benutzerdefinierten `http`/`https`/`http2` [Agents](https://www.npmjs.com/package/got#agent) für Anfragen.

Typ: `Object`<br />
Standard:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Geben Sie benutzerdefinierte `headers` an, die in jede WebDriver-Anfrage übergeben werden sollen. Wenn Ihr Selenium Grid eine Basisauthentifizierung erfordert, empfehlen wir, einen `Authorization`-Header über diese Option zu übergeben, um Ihre WebDriver-Anfragen zu authentifizieren, z.B.:

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

Ob ein gültiges SSL-Zertifikat erforderlich ist oder nicht.
Kann über Umgebungsvariablen als `STRICT_SSL` oder `strict_ssl` gesetzt werden.

Typ: `Boolean`<br />
Standard: `true`

### enableDirectConnect

Ob die [Appium-Direktverbindungsfunktion](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) aktiviert werden soll.
Es passiert nichts, wenn die Antwort keine geeigneten Schlüssel enthält, während das Flag aktiviert ist.

Typ: `Boolean`<br />
Standard: `true`

### cacheDir

Der Pfad zum Stammverzeichnis des Cache. Dieses Verzeichnis wird verwendet, um alle Treiber zu speichern, die beim Versuch, eine Sitzung zu starten, heruntergeladen werden.

Typ: `String`<br />
Standard: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Für eine sicherere Protokollierung können mit `maskingPatterns` gesetzte reguläre Ausdrücke sensible Informationen im Protokoll verschleiern.
 - Das Stringformat ist ein regulärer Ausdruck mit oder ohne Flags (z.B. `/.../i`) und durch Kommas getrennt für mehrere reguläre Ausdrücke.
 - Weitere Details zu Masking-Patterns finden Sie im [Abschnitt zu Masking-Patterns in der WDIO Logger README](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

Typ: `String`<br />
Standard: `undefined`

**Beispiel:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

Die folgenden Optionen (einschließlich der oben aufgeführten) können mit WebdriverIO im Standalone-Modus verwendet werden:

### automationProtocol

Definieren Sie das Protokoll, das Sie für Ihre Browser-Automatisierung verwenden möchten. Derzeit wird nur [`webdriver`](https://www.npmjs.com/package/webdriver) unterstützt, da es die Hauptbrowser-Automatisierungstechnologie ist, die WebdriverIO verwendet.

Wenn Sie den Browser mit einer anderen Automatisierungstechnologie steuern möchten, stellen Sie sicher, dass Sie diese Eigenschaft auf einen Pfad setzen, der zu einem Modul führt, das der folgenden Schnittstelle entspricht:

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
- Wenn Ihr `url`-Parameter mit `/` beginnt, wird `baseUrl` vorangestellt (mit Ausnahme des `baseUrl`-Pfads, falls vorhanden).
- Wenn Ihr `url`-Parameter ohne Schema oder `/` beginnt (wie `some/path`), wird die vollständige `baseUrl` direkt vorangestellt.

Typ: `String`<br />
Standard: `null`

### waitforTimeout

Standardzeitüberschreitung für alle `waitFor*`-Befehle. (Beachten Sie das Kleinbuchstaben-`f` im Optionsnamen.) Diese Zeitüberschreitung betrifft __nur__ Befehle, die mit `waitFor*` beginnen, und ihre Standard-Wartezeit.

Um die Zeitüberschreitung für einen _Test_ zu erhöhen, siehe die Framework-Dokumentation.

Typ: `Number`<br />
Standard: `5000`

### waitforInterval

Standardintervall für alle `waitFor*`-Befehle, um zu überprüfen, ob ein erwarteter Zustand (z.B. Sichtbarkeit) geändert wurde.

Typ: `Number`<br />
Standard: `100`

### region

Wenn Sie auf Sauce Labs laufen, können Sie wählen, ob Sie Tests zwischen verschiedenen Rechenzentren ausführen möchten: US oder EU.
Um Ihre Region auf EU zu ändern, fügen Sie `region: 'eu'` zu Ihrer Konfiguration hinzu.

__Hinweis:__ Dies hat nur Auswirkungen, wenn Sie `user` und `key`-Optionen angeben, die mit Ihrem Sauce Labs-Konto verbunden sind.

Typ: `String`<br />
Standard: `us`

*(nur für VM und/oder EM/Simulatoren)*

---

## Testrunner-Optionen

Die folgenden Optionen (einschließlich der oben aufgeführten) sind nur für die Ausführung von WebdriverIO mit dem WDIO-Testrunner definiert:

### specs

Definieren Sie Spezifikationen für die Testausführung. Sie können entweder ein Glob-Muster angeben, um mehrere Dateien gleichzeitig abzugleichen, oder ein Glob oder einen Satz von Pfaden in ein Array einwickeln, um sie innerhalb eines einzelnen Worker-Prozesses auszuführen. Alle Pfade werden relativ zum Konfigurationsdateipfad betrachtet.

Typ: `(String | String[])[]`<br />
Standard: `[]`

### exclude

Schließen Sie Spezifikationen von der Testausführung aus. Alle Pfade werden relativ zum Konfigurationsdateipfad betrachtet.

Typ: `String[]`<br />
Standard: `[]`

### suites

Ein Objekt, das verschiedene Suiten beschreibt, die Sie dann mit der Option `--suite` im `wdio`-CLI angeben können.

Typ: `Object`<br />
Standard: `{}`

### capabilities

Dasselbe wie der oben beschriebene Abschnitt `capabilities`, mit der Option, entweder ein [`multiremote`](/docs/multiremote)-Objekt oder mehrere WebDriver-Sitzungen in einem Array für die parallele Ausführung anzugeben.

Sie können die gleichen anbieter- und browserspezifischen Capabilities anwenden wie [oben](/docs/configuration#capabilities) definiert.

Typ: `Object`|`Object[]`<br />
Standard: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Maximale Anzahl der gesamten parallel laufenden Worker.

__Hinweis:__ Diese Zahl kann bis zu `100` betragen, wenn die Tests auf externen Anbietern wie Sauce Labs durchgeführt werden. Dort werden die Tests nicht auf einer einzelnen Maschine, sondern auf mehreren VMs ausgeführt. Wenn die Tests auf einem lokalen Entwicklungsrechner ausgeführt werden sollen, verwenden Sie eine vernünftigere Zahl wie `3`, `4` oder `5`. Im Wesentlichen ist dies die Anzahl der Browser, die gleichzeitig gestartet werden und Ihre Tests gleichzeitig ausführen, daher hängt es davon ab, wie viel RAM Ihr Rechner hat und wie viele andere Apps auf Ihrem Rechner laufen.

Sie können `maxInstances` auch innerhalb Ihrer Capability-Objekte mit der `wdio:maxInstances`-Capability anwenden. Dies begrenzt die Anzahl der parallelen Sitzungen für diese bestimmte Capability.

Typ: `Number`<br />
Standard: `100`

### maxInstancesPerCapability

Maximale Anzahl der gesamten parallel laufenden Worker pro Capability.

Typ: `Number`<br />
Standard: `100`

### injectGlobals

Fügt WebdriverIOs Globals (z.B. `browser`, `$` und `$$`) in die globale Umgebung ein.
Wenn Sie es auf `false` setzen, sollten Sie von `@wdio/globals` importieren, z.B.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Hinweis: WebdriverIO kümmert sich nicht um die Injektion von testframework-spezifischen Globals.

Typ: `Boolean`<br />
Standard: `true`

### bail

Wenn Sie möchten, dass Ihr Testlauf nach einer bestimmten Anzahl von Testfehlern stoppt, verwenden Sie `bail`.
(Es ist standardmäßig `0`, was bedeutet, dass alle Tests unabhängig vom Ergebnis ausgeführt werden.) **Hinweis:** Ein Test in diesem Zusammenhang sind alle Tests innerhalb einer einzelnen Spezifikationsdatei (bei Verwendung von Mocha oder Jasmine) oder alle Schritte innerhalb einer Feature-Datei (bei Verwendung von Cucumber). Wenn Sie das Bail-Verhalten innerhalb von Tests einer einzelnen Testdatei steuern möchten, sehen Sie sich die verfügbaren [Framework](frameworks)-Optionen an.

Typ: `Number`<br />
Standard: `0` (nicht abbrechen; alle Tests ausführen)

### specFileRetries

Die Anzahl der Wiederholungen einer gesamten Spezifikationsdatei, wenn sie als Ganzes fehlschlägt.

Typ: `Number`<br />
Standard: `0`

### specFileRetriesDelay

Verzögerung in Sekunden zwischen den Wiederholungsversuchen der Spezifikationsdatei

Typ: `Number`<br />
Standard: `0`

### specFileRetriesDeferred

Ob wiederholte Spezifikationsdateien sofort wiederholt oder ans Ende der Warteschlange verschoben werden sollen.

Typ: `Boolean`<br />
Standard: `true`

### groupLogsByTestSpec

Wählen Sie die Protokollausgabeansicht.

Wenn auf `false` gesetzt, werden Protokolle aus verschiedenen Testdateien in Echtzeit gedruckt. Bitte beachten Sie, dass dies bei paralleler Ausführung zum Vermischen von Protokollausgaben aus verschiedenen Dateien führen kann.

Wenn auf `true` gesetzt, werden Protokollausgaben nach Test-Spezifikation gruppiert und erst gedruckt, wenn die Test-Spezifikation abgeschlossen ist.

Standardmäßig ist es auf `false` gesetzt, so dass Protokolle in Echtzeit gedruckt werden.

Typ: `Boolean`<br />
Standard: `false`

### autoAssertOnTestEnd

Steuert, ob WebdriverIO automatisch alle Soft-Assertions am Ende jedes Tests überprüft. Wenn auf `true` gesetzt, werden alle angesammelten Soft-Assertions automatisch überprüft und verursachen ein Fehlschlagen des Tests, wenn Assertions fehlgeschlagen sind. Wenn auf `false` gesetzt, müssen Sie die Assert-Methode manuell aufrufen, um Soft-Assertions zu überprüfen.

Typ: `Boolean`<br />
Standard: `true`

### services

Services übernehmen eine bestimmte Aufgabe, um die Sie sich nicht kümmern möchten. Sie erweitern Ihr Test-Setup mit fast keinem Aufwand.

Typ: `String[]|Object[]`<br />
Standard: `[]`

### framework

Definiert das Testframework, das vom WDIO-Testrunner verwendet werden soll.

Typ: `String`<br />
Standard: `mocha`<br />
Optionen: `mocha` | `jasmine`

### mochaOpts, jasmineOpts und cucumberOpts

Spezifische framework-bezogene Optionen. Sehen Sie in der Framework-Adapter-Dokumentation nach, welche Optionen verfügbar sind. Lesen Sie mehr dazu in [Frameworks](frameworks).

Typ: `Object`<br />
Standard: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Liste von Cucumber-Features mit Zeilennummern (bei Verwendung des [Cucumber-Frameworks](./Frameworks.md#using-cucumber)).

Typ: `String[]`
Standard: `[]`

### reporters

Liste der zu verwendenden Reporter. Ein Reporter kann entweder eine Zeichenfolge oder ein Array von
`['reporterName', { /* reporter options */}]` sein, wobei das erste Element eine Zeichenfolge mit dem Reporter-Namen ist und das zweite Element ein Objekt mit Reporter-Optionen.

Typ: `String[]|Object[]`<br />
Standard: `[]`

Beispiel:

```js
reporters: [
    'dot',
    'spec'
    ['junit', {
        outputDir: `${__dirname}/reports`,
        otherOption: 'foobar'
    }]
]
```

### reporterSyncInterval

Bestimmt, in welchem Intervall der Reporter prüfen soll, ob sie synchronisiert sind, wenn sie ihre Protokolle asynchron melden (z.B. wenn Protokolle an einen Drittanbieter gestreamt werden).

Typ: `Number`<br />
Standard: `100` (ms)

### reporterSyncTimeout

Bestimmt die maximale Zeit, die Reporter haben, um das Hochladen aller ihrer Protokolle abzuschließen, bis ein Fehler vom Testrunner geworfen wird.

Typ: `Number`<br />
Standard: `5000` (ms)

### execArgv

Node-Argumente, die beim Starten von Kindprozessen angegeben werden sollen.

Typ: `String[]`<br />
Standard: `null`

### filesToWatch

Eine Liste von Glob-unterstützenden String-Mustern, die dem Testrunner mitteilen, zusätzlich andere Dateien zu überwachen, z.B. Anwendungsdateien, wenn er mit dem Flag `--watch` ausgeführt wird. Standardmäßig überwacht der Testrunner bereits alle Spezifikationsdateien.

Typ: `String[]`<br />
Standard: `[]`

### updateSnapshots

Setzen Sie auf true, wenn Sie Ihre Snapshots aktualisieren möchten. Idealerweise als Teil eines CLI-Parameters verwendet, z.B. `wdio run wdio.conf.js --s`.

Typ: `'new' | 'all' | 'none'`<br />
Standard: `none` wenn nicht angegeben und Tests in CI laufen, `new` wenn nicht angegeben, sonst was angegeben wurde

### resolveSnapshotPath

Überschreibt den Standard-Snapshot-Pfad. Zum Beispiel, um Snapshots neben Testdateien zu speichern.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Typ: `(testPath: string, snapExtension: string) => string`<br />
Standard: speichert Snapshot-Dateien im Verzeichnis `__snapshots__` neben der Testdatei

### tsConfigPath

WDIO verwendet `tsx` zur Kompilierung von TypeScript-Dateien. Ihre TSConfig wird automatisch aus dem aktuellen Arbeitsverzeichnis erkannt, aber Sie können hier einen benutzerdefinierten Pfad angeben oder die TSX_TSCONFIG_PATH-Umgebungsvariable setzen.

Siehe die `tsx`-Dokumentation: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Typ: `String`<br />
Standard: `null`<br />

## Hooks

Der WDIO-Testrunner ermöglicht es Ihnen, Hooks zu setzen, die zu bestimmten Zeiten des Testlebenszyklus ausgelöst werden. Dies ermöglicht benutzerdefinierte Aktionen (z.B. Screenshot machen, wenn ein Test fehlschlägt).

Jeder Hook hat als Parameter spezifische Informationen über den Lebenszyklus (z.B. Informationen über die Testsuite oder den Test). Lesen Sie mehr über alle Hook-Eigenschaften in [unserer Beispielkonfiguration](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Hinweis:** Einige Hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` und `onComplete`) werden in einem anderen Prozess ausgeführt und können daher keine globalen Daten mit den anderen Hooks teilen, die im Worker-Prozess leben.

### onPrepare

Wird einmal ausgeführt, bevor alle Worker gestartet werden.

Parameter:

- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `param` (`object[]`): Liste der Capability-Details

### onWorkerStart

Wird ausgeführt, bevor ein Worker-Prozess gestartet wird, und kann verwendet werden, um spezifische Dienste für diesen Worker zu initialisieren sowie Laufzeitumgebungen asynchron zu modifizieren.

Parameter:

- `cid` (`string`): Capability-ID (z.B. 0-0)
- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `specs` (`string[]`): Spezifikationen, die im Worker-Prozess ausgeführt werden sollen
- `args` (`object`): Objekt, das mit der Hauptkonfiguration zusammengeführt wird, sobald der Worker initialisiert ist
- `execArgv` (`string[]`): Liste der String-Argumente, die an den Worker-Prozess übergeben werden

### onWorkerEnd

Wird ausgeführt, nachdem ein Worker-Prozess beendet wurde.

Parameter:

- `cid` (`string`): Capability-ID (z.B. 0-0)
- `exitCode` (`number`): 0 - Erfolg, 1 - Fehler
- `specs` (`string[]`): Spezifikationen, die im Worker-Prozess ausgeführt wurden
- `retries` (`number`): Anzahl der Wiederholungen auf Spezifikationsebene wie definiert in [_"Wiederholungen auf Basis einer Spezifikationsdatei hinzufügen"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Wird direkt vor der Initialisierung der WebDriver-Sitzung und des Testframeworks ausgeführt. Es ermöglicht Ihnen, Konfigurationen abhängig von der Capability oder Spezifikation zu manipulieren.

Parameter:

- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `specs` (`string[]`): Spezifikationen, die im Worker-Prozess ausgeführt werden sollen

### before

Wird ausgeführt, bevor die Testausführung beginnt. An diesem Punkt können Sie auf alle globalen Variablen wie `browser` zugreifen. Es ist der perfekte Ort, um benutzerdefinierte Befehle zu definieren.

Parameter:

- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `specs` (`string[]`): Spezifikationen, die im Worker-Prozess ausgeführt werden sollen
- `browser` (`object`): Instanz der erstellten Browser-/Geräte-Sitzung

### beforeSuite

Hook, der ausgeführt wird, bevor die Suite startet (nur in Mocha/Jasmine)

Parameter:

- `suite` (`object`): Suite-Details

### beforeHook

Hook, der *vor* einem Hook innerhalb der Suite ausgeführt wird (wird z.B. vor dem Aufruf von beforeEach in Mocha ausgeführt)

Parameter:

- `test` (`object`): Test-Details
- `context` (`object`): Test-Kontext (repräsentiert das World-Objekt in Cucumber)

### afterHook

Hook, der *nach* einem Hook innerhalb der Suite ausgeführt wird (wird z.B. nach dem Aufruf von afterEach in Mocha ausgeführt)

Parameter:

- `test` (`object`): Test-Details
- `context` (`object`): Test-Kontext (repräsentiert das World-Objekt in Cucumber)
- `result` (`object`): Hook-Ergebnis (enthält die Eigenschaften `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Funktion, die vor einem Test ausgeführt wird (nur in Mocha/Jasmine).

Parameter:

- `test` (`object`): Test-Details
- `context` (`object`): Scope-Objekt, mit dem der Test ausgeführt wurde

### beforeCommand

Wird ausgeführt, bevor ein WebdriverIO-Befehl ausgeführt wird.

Parameter:

- `commandName` (`string`): Befehlsname
- `args` (`*`): Argumente, die der Befehl erhalten würde

### afterCommand

Wird ausgeführt, nachdem ein WebdriverIO-Befehl ausgeführt wurde.

Parameter:

- `commandName` (`string`): Befehlsname
- `args` (`*`): Argumente, die der Befehl erhalten würde
- `result` (`number`): 0 - Befehl erfolgreich, 1 - Befehlsfehler
- `error` (`Error`): Fehlerobjekt, falls vorhanden

### afterTest

Funktion, die nach einem Test (in Mocha/Jasmine) ausgeführt wird.

Parameter:

- `test` (`object`): Test-Details
- `context` (`object`): Scope-Objekt, mit dem der Test ausgeführt wurde
- `result.error` (`Error`): Fehlerobjekt, falls der Test fehlschlägt, sonst `undefined`
- `result.result` (`Any`): Rückgabeobjekt der Testfunktion
- `result.duration` (`Number`): Dauer des Tests
- `result.passed` (`Boolean`): true, wenn der Test bestanden hat, sonst false
- `result.retries` (`Object`): Informationen über einzelne testbezogene Wiederholungen wie definiert für [Mocha und Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) sowie [Cucumber](./Retry.md#rerunning-in-cucumber), z.B. `{ attempts: 0, limit: 0 }`, siehe
- `result` (`object`): Hook-Ergebnis (enthält die Eigenschaften `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook, der ausgeführt wird, nachdem die Suite beendet ist (nur in Mocha/Jasmine)

Parameter:

- `suite` (`object`): Suite-Details

### after

Wird ausgeführt, nachdem alle Tests abgeschlossen sind. Sie haben immer noch Zugriff auf alle globalen Variablen aus dem Test.

Parameter:

- `result` (`number`): 0 - Test bestanden, 1 - Test fehlgeschlagen
- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `specs` (`string[]`): Spezifikationen, die im Worker-Prozess ausgeführt wurden

### afterSession

Wird direkt nach Beendigung der WebDriver-Sitzung ausgeführt.

Parameter:

- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `specs` (`string[]`): Spezifikationen, die im Worker-Prozess ausgeführt wurden

### onComplete

Wird ausgeführt, nachdem alle Worker heruntergefahren wurden und der Prozess beendet werden soll. Ein Fehler, der im onComplete-Hook geworfen wird, führt dazu, dass der Testlauf fehlschlägt.

Parameter:

- `exitCode` (`number`): 0 - Erfolg, 1 - Fehler
- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `result` (`object`): Ergebnisobjekt mit Testergebnissen

### onReload

Wird ausgeführt, wenn eine Aktualisierung stattfindet.

Parameter:

- `oldSessionId` (`string`): Sitzungs-ID der alten Sitzung
- `newSessionId` (`string`): Sitzungs-ID der neuen Sitzung

### beforeFeature

Wird vor einem Cucumber-Feature ausgeführt.

Parameter:

- `uri` (`string`): Pfad zur Feature-Datei
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber-Feature-Objekt

### afterFeature

Wird nach einem Cucumber-Feature ausgeführt.

Parameter:

- `uri` (`string`): Pfad zur Feature-Datei
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber-Feature-Objekt

### beforeScenario

Wird vor einem Cucumber-Szenario ausgeführt.

Parameter:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): World-Objekt mit Informationen zu Pickle und Testschritt
- `context` (`object`): Cucumber-World-Objekt

### afterScenario

Wird nach einem Cucumber-Szenario ausgeführt.

Parameter:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): World-Objekt mit Informationen zu Pickle und Testschritt
- `result` (`object`): Ergebnisobjekt mit Szenario-Ergebnissen
- `result.passed` (`boolean`): true, wenn das Szenario bestanden hat
- `result.error` (`string`): Fehler-Stack, wenn das Szenario fehlgeschlagen ist
- `result.duration` (`number`): Dauer des Szenarios in Millisekunden
- `context` (`object`): Cucumber-World-Objekt

### beforeStep

Wird vor einem Cucumber-Schritt ausgeführt.

Parameter:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber-Schritt-Objekt
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber-Szenario-Objekt
- `context` (`object`): Cucumber-World-Objekt

### afterStep

Wird nach einem Cucumber-Schritt ausgeführt.

Parameter:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber-Schritt-Objekt
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber-Szenario-Objekt
- `result`: (`object`): Ergebnisobjekt mit Schritt-Ergebnissen
- `result.passed` (`boolean`): true, wenn das Szenario bestanden hat
- `result.error` (`string`): Fehler-Stack, wenn das Szenario fehlgeschlagen ist
- `result.duration` (`number`): Dauer des Szenarios in Millisekunden
- `context` (`object`): Cucumber-World-Objekt

### beforeAssertion

Hook, der ausgeführt wird, bevor eine WebdriverIO-Assertion durchgeführt wird.

Parameter:

- `params`: Assertions-Informationen
- `params.matcherName` (`string`): Name des Matchers (z.B. `toHaveTitle`)
- `params.expectedValue`: Wert, der in den Matcher übergeben wird
- `params.options`: Assertions-Optionen

### afterAssertion

Hook, der ausgeführt wird, nachdem eine WebdriverIO-Assertion durchgeführt wurde.

Parameter:

- `params`: Assertions-Informationen
- `params.matcherName` (`string`): Name des Matchers (z.B. `toHaveTitle`)
- `params.expectedValue`: Wert, der in den Matcher übergeben wird
- `params.options`: Assertions-Optionen
- `params.result`: Assertions-Ergebnisse
