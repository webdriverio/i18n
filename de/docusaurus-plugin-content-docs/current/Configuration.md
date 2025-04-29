---
id: configuration
title: Konfiguration
---

Basierend auf dem [Setup-Typ](/docs/setuptypes) (z.B. Verwendung der rohen Protokollbindungen, WebdriverIO als eigenständiges Paket oder dem WDIO-Testrunner) gibt es verschiedene Optionen zur Steuerung der Umgebung.

## WebDriver-Optionen

Die folgenden Optionen sind bei Verwendung des [`webdriver`](https://www.npmjs.com/package/webdriver) Protokollpakets definiert:

### protocol

Protokoll für die Kommunikation mit dem Treiberserver.

Type: `String`<br />
Default: `http`

### hostname

Host Ihres Treiberservers.

Type: `String`<br />
Default: `0.0.0.0`

### port

Port, auf dem Ihr Treiberserver läuft.

Type: `Number`<br />
Default: `undefined`

### path

Pfad zum Endpunkt des Treiberservers.

Type: `String`<br />
Default: `/`

### queryParams

Abfrageparameter, die an den Treiberserver weitergeleitet werden.

Type: `Object`<br />
Default: `undefined`

### user

Ihr Cloud-Service-Benutzername (funktioniert nur für [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) oder [LambdaTest](https://www.lambdatest.com) Konten). Wenn gesetzt, wird WebdriverIO automatisch Verbindungsoptionen für Sie einstellen. Wenn Sie keinen Cloud-Anbieter verwenden, kann dies zur Authentifizierung eines anderen WebDriver-Backends verwendet werden.

Type: `String`<br />
Default: `undefined`

### key

Ihr Cloud-Service-Zugangsschlüssel oder geheimer Schlüssel (funktioniert nur für [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) oder [LambdaTest](https://www.lambdatest.com) Konten). Wenn gesetzt, wird WebdriverIO automatisch Verbindungsoptionen für Sie einstellen. Wenn Sie keinen Cloud-Anbieter verwenden, kann dies zur Authentifizierung eines anderen WebDriver-Backends verwendet werden.

Type: `String`<br />
Default: `undefined`

### capabilities

Definiert die Fähigkeiten, die Sie in Ihrer WebDriver-Sitzung ausführen möchten. Weitere Details finden Sie im [WebDriver-Protokoll](https://w3c.github.io/webdriver/#capabilities). Wenn Sie einen älteren Treiber verwenden, der das WebDriver-Protokoll nicht unterstützt, müssen Sie die [JSONWireProtocol-Capabilities](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) verwenden, um eine Sitzung erfolgreich auszuführen.

Neben den WebDriver-basierten Capabilities können Sie browser- und anbieterspezifische Optionen anwenden, die eine tiefere Konfiguration des Remote-Browsers oder -Geräts ermöglichen. Diese sind in den entsprechenden Anbieterdokumentationen dokumentiert, z.B.:

- `goog:chromeOptions`: für [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: für [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: für [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: für [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: für [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: für [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Zusätzlich ist der Sauce Labs [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) ein nützliches Tool, das Ihnen hilft, dieses Objekt durch Zusammenklicken Ihrer gewünschten Capabilities zu erstellen.

Type: `Object`<br />
Default: `null`

**Beispiel:**

```js
{
    browserName: 'chrome', // Optionen: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // Browser-Version
    platformName: 'Windows 10' // Betriebssystemplattform
}
```

Wenn Sie Web- oder native Tests auf mobilen Geräten ausführen, unterscheiden sich die `capabilities` vom WebDriver-Protokoll. Weitere Details finden Sie in der [Appium-Dokumentation](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/).

### logLevel

Grad der Ausführlichkeit beim Logging.

Type: `String`<br />
Default: `info`<br />
Options: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Verzeichnis zum Speichern aller Testrunner-Protokolldateien (einschließlich Reporter-Protokollen und `wdio`-Protokollen). Wenn nicht gesetzt, werden alle Protokolle an `stdout` gestreamt. Da die meisten Reporter für die Ausgabe nach `stdout` konzipiert sind, wird empfohlen, diese Option nur für bestimmte Reporter zu verwenden, bei denen es sinnvoller ist, Berichte in eine Datei zu schreiben (wie z.B. beim `junit`-Reporter).

Im Standalone-Modus ist das einzige von WebdriverIO generierte Protokoll das `wdio`-Protokoll.

Type: `String`<br />
Default: `null`

### connectionRetryTimeout

Timeout für jede WebDriver-Anfrage an einen Treiber oder ein Grid.

Type: `Number`<br />
Default: `120000`

### connectionRetryCount

Maximale Anzahl von Wiederholungsversuchen für Anfragen an den Selenium-Server.

Type: `Number`<br />
Default: `3`

### agent

Ermöglicht die Verwendung eines benutzerdefinierten `http`/`https`/`http2` [Agent](https://www.npmjs.com/package/got#agent) für Anfragen.

Type: `Object`<br />
Default:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Geben Sie benutzerdefinierte `headers` an, die in jede WebDriver-Anfrage übergeben werden sollen. Wenn Ihr Selenium Grid eine Basic Authentication erfordert, empfehlen wir, einen `Authorization`-Header über diese Option zu übergeben, um Ihre WebDriver-Anfragen zu authentifizieren, z.B.:

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

Type: `Object`<br />
Default: `{}`

### transformRequest

Funktion, die [HTTP-Anforderungsoptionen](https://github.com/sindresorhus/got#options) abfängt, bevor eine WebDriver-Anfrage gestellt wird

Type: `(RequestOptions) => RequestOptions`<br />
Default: *none*

### transformResponse

Funktion, die HTTP-Antwortobjekte abfängt, nachdem eine WebDriver-Antwort eingegangen ist. Die Funktion erhält das ursprüngliche Antwortobjekt als erstes und die entsprechenden `RequestOptions` als zweites Argument.

Type: `(Response, RequestOptions) => Response`<br />
Default: *none*

### strictSSL

Gibt an, ob ein gültiges SSL-Zertifikat erforderlich ist oder nicht.
Es kann über Umgebungsvariablen als `STRICT_SSL` oder `strict_ssl` gesetzt werden.

Type: `Boolean`<br />
Default: `true`

### enableDirectConnect

Ob die [Appium-Direktverbindungsfunktion](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) aktiviert werden soll.
Es hat keine Auswirkung, wenn die Antwort keine passenden Schlüssel enthält, während das Flag aktiviert ist.

Type: `Boolean`<br />
Default: `true`

### cacheDir

Der Pfad zum Stammverzeichnis des Cache-Verzeichnisses. Dieses Verzeichnis wird verwendet, um alle Treiber zu speichern, die heruntergeladen werden, wenn versucht wird, eine Sitzung zu starten.

Type: `String`<br />
Default: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

---

## WebdriverIO

Die folgenden Optionen (einschließlich der oben aufgeführten) können mit WebdriverIO im Standalone-Modus verwendet werden:

### automationProtocol

Definieren Sie das Protokoll, das Sie für Ihre Browser-Automatisierung verwenden möchten. Derzeit wird nur [`webdriver`](https://www.npmjs.com/package/webdriver) unterstützt, da es die Hauptbrowser-Automatisierungstechnologie ist, die WebdriverIO verwendet.

Wenn Sie den Browser mit einer anderen Automatisierungstechnologie automatisieren möchten, stellen Sie sicher, dass Sie diese Eigenschaft auf einen Pfad setzen, der auf ein Modul verweist, das der folgenden Schnittstelle entspricht:

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

Type: `String`<br />
Default: `webdriver`

### baseUrl

Verkürzen Sie `url`-Befehlsaufrufe durch Festlegen einer Basis-URL.
- Wenn Ihr `url`-Parameter mit `/` beginnt, wird `baseUrl` vorangestellt (mit Ausnahme des `baseUrl`-Pfades, falls vorhanden).
- Wenn Ihr `url`-Parameter ohne Schema oder `/` beginnt (wie `some/path`), dann wird die vollständige `baseUrl` direkt vorangestellt.

Type: `String`<br />
Default: `null`

### waitforTimeout

Standardzeitlimit für alle `waitFor*`-Befehle. (Beachten Sie das Kleinbuchstaben-`f` im Optionsnamen.) Dieses Timeout betrifft __nur__ Befehle, die mit `waitFor*` beginnen, und deren Standard-Wartezeit.

Um das Timeout für einen _Test_ zu erhöhen, lesen Sie bitte die Framework-Dokumentation.

Type: `Number`<br />
Default: `5000`

### waitforInterval

Standardintervall für alle `waitFor*`-Befehle, um zu prüfen, ob ein erwarteter Zustand (z.B. Sichtbarkeit) geändert wurde.

Type: `Number`<br />
Default: `100`

### region

Wenn Sie Sauce Labs verwenden, können Sie wählen, ob Sie Tests zwischen verschiedenen Rechenzentren ausführen möchten: US oder EU.
Um Ihre Region auf EU zu ändern, fügen Sie `region: 'eu'` zu Ihrer Konfiguration hinzu.

__Hinweis:__ Dies hat nur eine Auswirkung, wenn Sie die Optionen `user` und `key` bereitstellen, die mit Ihrem Sauce Labs-Konto verbunden sind.

Type: `String`<br />
Default: `us`

*(nur für VMs und/oder Emulatoren/Simulatoren)*

---

## Testrunner-Optionen

Die folgenden Optionen (einschließlich der oben aufgeführten) sind nur für die Ausführung von WebdriverIO mit dem WDIO-Testrunner definiert:

### specs

Definieren Sie Specs für die Testausführung. Sie können entweder ein Glob-Muster angeben, um mehrere Dateien auf einmal abzugleichen, oder ein Glob oder eine Reihe von Pfaden in ein Array einpacken, um sie innerhalb eines einzelnen Worker-Prozesses auszuführen. Alle Pfade werden relativ zum Konfigurationsdateipfad betrachtet.

Type: `(String | String[])[]`<br />
Default: `[]`

### exclude

Specs von der Testausführung ausschließen. Alle Pfade werden relativ zum Konfigurationsdateipfad betrachtet.

Type: `String[]`<br />
Default: `[]`

### suites

Ein Objekt, das verschiedene Suites beschreibt, die Sie dann mit der Option `--suite` auf der `wdio`-CLI angeben können.

Type: `Object`<br />
Default: `{}`

### capabilities

Dasselbe wie der oben beschriebene `capabilities`-Abschnitt, jedoch mit der Möglichkeit, entweder ein [`multiremote`](/docs/multiremote)-Objekt oder mehrere WebDriver-Sitzungen in einem Array für die parallele Ausführung anzugeben.

Sie können die gleichen anbieter- und browserspezifischen Capabilities anwenden wie [oben](/docs/configuration#capabilities) definiert.

Type: `Object`|`Object[]`<br />
Default: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Maximale Anzahl der parallel laufenden Worker insgesamt.

__Hinweis:__ Diese Zahl kann so hoch wie `100` sein, wenn die Tests auf externen Anbietern wie Sauce Labs durchgeführt werden. Dort werden die Tests nicht auf einer einzigen Maschine, sondern auf mehreren VMs getestet. Wenn die Tests auf einem lokalen Entwicklungsrechner durchgeführt werden sollen, verwenden Sie eine vernünftigere Zahl wie `3`, `4` oder `5`. Im Wesentlichen ist dies die Anzahl der Browser, die gleichzeitig gestartet werden und Ihre Tests gleichzeitig ausführen, sodass es von der RAM-Menge auf Ihrem Computer und der Anzahl anderer Anwendungen auf Ihrem Computer abhängt.

Sie können `maxInstances` auch innerhalb Ihrer Capability-Objekte mit der `wdio:maxInstances`-Capability anwenden. Dies begrenzt die Anzahl paralleler Sitzungen für diese bestimmte Capability.

Type: `Number`<br />
Default: `100`

### maxInstancesPerCapability

Maximale Anzahl der parallel laufenden Worker pro Capability insgesamt.

Type: `Number`<br />
Default: `100`

### injectGlobals

Fügt WebdriverIOs Globale (z.B. `browser`, `$` und `$$`) in die globale Umgebung ein.
Wenn Sie auf `false` setzen, sollten Sie von `@wdio/globals` importieren, z.B.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Hinweis: WebdriverIO kümmert sich nicht um die Einbindung von testframework-spezifischen Globalen.

Type: `Boolean`<br />
Default: `true`

### bail

Wenn Sie möchten, dass Ihr Testlauf nach einer bestimmten Anzahl von Testfehlern stoppt, verwenden Sie `bail`.
(Standardmäßig ist es `0`, was bedeutet, dass alle Tests ausgeführt werden, unabhängig davon, was passiert.) **Hinweis:** Ein Test in diesem Zusammenhang sind alle Tests innerhalb einer einzelnen Spec-Datei (bei Verwendung von Mocha oder Jasmine) oder alle Schritte innerhalb einer Feature-Datei (bei Verwendung von Cucumber). Wenn Sie das Bail-Verhalten innerhalb von Tests einer einzelnen Testdatei steuern möchten, werfen Sie einen Blick auf die verfügbaren [Framework](frameworks)-Optionen.

Type: `Number`<br />
Default: `0` (kein bail; alle Tests ausführen)

### specFileRetries

Die Anzahl der Wiederholungen einer gesamten Spec-Datei, wenn sie als Ganzes fehlschlägt.

Type: `Number`<br />
Default: `0`

### specFileRetriesDelay

Verzögerung in Sekunden zwischen den Wiederholungsversuchen der Spec-Datei

Type: `Number`<br />
Default: `0`

### specFileRetriesDeferred

Ob wiederholte Spec-Dateien sofort wiederholt oder ans Ende der Warteschlange verschoben werden sollen.

Type: `Boolean`<br />
Default: `true`

### groupLogsByTestSpec

Wählen Sie die Ansicht der Protokollausgabe.

Wenn auf `false` gesetzt, werden Protokolle aus verschiedenen Testdateien in Echtzeit ausgegeben. Bitte beachten Sie, dass dies bei paralleler Ausführung zu einer Vermischung der Protokollausgaben aus verschiedenen Dateien führen kann.

Wenn auf `true` gesetzt, werden Protokollausgaben nach Test-Specs gruppiert und erst ausgegeben, wenn die Test-Spec abgeschlossen ist.

Standardmäßig ist es auf `false` gesetzt, sodass Protokolle in Echtzeit ausgegeben werden.

Type: `Boolean`<br />
Default: `false`

### services

Services übernehmen eine bestimmte Aufgabe, um die Sie sich nicht kümmern möchten. Sie verbessern Ihre Testeinrichtung mit minimalem Aufwand.

Type: `String[]|Object[]`<br />
Default: `[]`

### framework

Definiert das vom WDIO-Testrunner zu verwendende Testframework.

Type: `String`<br />
Default: `mocha`<br />
Options: `mocha` | `jasmine`

### mochaOpts, jasmineOpts und cucumberOpts

Spezifische Framework-bezogene Optionen. Siehe die Framework-Adapter-Dokumentation, welche Optionen verfügbar sind. Lesen Sie mehr dazu in [Frameworks](frameworks).

Type: `Object`<br />
Default: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Liste von Cucumber-Features mit Zeilennummern (bei Verwendung des [Cucumber-Frameworks](./Frameworks.md#using-cucumber)).

Type: `String[]`
Default: `[]`

### reporters

Liste der zu verwendenden Reporter. Ein Reporter kann entweder ein String oder ein Array von `['reporterName', { /* reporter options */}]` sein, wobei das erste Element ein String mit dem Reporternamen und das zweite Element ein Objekt mit Reporteroptionen ist.

Type: `String[]|Object[]`<br />
Default: `[]`

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

Type: `Number`<br />
Default: `100` (ms)

### reporterSyncTimeout

Bestimmt die maximale Zeit, die Reporter haben, um das Hochladen all ihrer Protokolle abzuschließen, bis der Testrunner einen Fehler auslöst.

Type: `Number`<br />
Default: `5000` (ms)

### execArgv

Node-Argumente, die beim Starten von Kindprozessen angegeben werden sollen.

Type: `String[]`<br />
Default: `null`

### filesToWatch

Eine Liste von Glob-unterstützenden String-Mustern, die dem Testrunner mitteilen, dass er zusätzlich andere Dateien überwachen soll, z.B. Anwendungsdateien, wenn er mit dem Flag `--watch` ausgeführt wird. Standardmäßig überwacht der Testrunner bereits alle Spec-Dateien.

Type: `String[]`<br />
Default: `[]`

### updateSnapshots

Auf true setzen, wenn Sie Ihre Snapshots aktualisieren möchten. Idealerweise als Teil eines CLI-Parameters verwendet, z.B. `wdio run wdio.conf.js --s`.

Type: `'new' | 'all' | 'none'`<br />
Default: `none` wenn nicht angegeben und Tests in CI laufen, `new` wenn nicht angegeben, sonst was angegeben wurde

### resolveSnapshotPath

Überschreibt den Standard-Snapshot-Pfad. Zum Beispiel, um Snapshots neben Testdateien zu speichern.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Type: `(testPath: string, snapExtension: string) => string`<br />
Default: speichert Snapshot-Dateien im Verzeichnis `__snapshots__` neben der Testdatei

### tsConfigPath

WDIO verwendet `tsx`, um TypeScript-Dateien zu kompilieren. Ihre TSConfig wird automatisch aus dem aktuellen Arbeitsverzeichnis erkannt, aber Sie können hier einen benutzerdefinierten Pfad angeben oder die Umgebungsvariable TSX_TSCONFIG_PATH setzen.

Siehe die `tsx`-Dokumentation: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Type: `String`<br />
Default: `null`<br />

## Hooks

Der WDIO-Testrunner ermöglicht es Ihnen, Hooks zu setzen, die zu bestimmten Zeiten des Testlebenszyklus ausgelöst werden. Dies ermöglicht benutzerdefinierte Aktionen (z.B. Screenshot aufnehmen, wenn ein Test fehlschlägt).

Jeder Hook hat als Parameter spezifische Informationen über den Lebenszyklus (z.B. Informationen über die Testsuite oder den Test). Lesen Sie mehr über alle Hook-Eigenschaften in [unserer Beispielkonfiguration](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Hinweis:** Einige Hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` und `onComplete`) werden in einem anderen Prozess ausgeführt und können daher keine globalen Daten mit den anderen Hooks teilen, die im Worker-Prozess leben.

### onPrepare

Wird einmal ausgeführt, bevor alle Worker gestartet werden.

Parameter:

- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `param` (`object[]`): Liste der Capability-Details

### onWorkerStart

Wird ausgeführt, bevor ein Worker-Prozess gestartet wird, und kann verwendet werden, um spezifische Dienste für diesen Worker zu initialisieren sowie Laufzeitumgebungen auf asynchrone Weise zu modifizieren.

Parameter:

- `cid` (`string`): Capability-ID (z.B. 0-0)
- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `specs` (`string[]`): Specs, die im Worker-Prozess ausgeführt werden sollen
- `args` (`object`): Objekt, das mit der Hauptkonfiguration zusammengeführt wird, sobald der Worker initialisiert ist
- `execArgv` (`string[]`): Liste von String-Argumenten, die an den Worker-Prozess übergeben werden

### onWorkerEnd

Wird ausgeführt, direkt nachdem ein Worker-Prozess beendet wurde.

Parameter:

- `cid` (`string`): Capability-ID (z.B. 0-0)
- `exitCode` (`number`): 0 - Erfolg, 1 - Fehler
- `specs` (`string[]`): Specs, die im Worker-Prozess ausgeführt wurden
- `retries` (`number`): Anzahl der Spec-Level-Wiederholungen, wie in [_"Wiederholungen auf Basis einzelner Spec-Dateien hinzufügen"_](./Retry.md#add-retries-on-a-per-specfile-basis) definiert

### beforeSession

Wird ausgeführt, kurz bevor die WebDriver-Sitzung und das Testframework initialisiert werden. Es ermöglicht Ihnen, Konfigurationen abhängig von der Capability oder Spec zu manipulieren.

Parameter:

- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `specs` (`string[]`): Specs, die im Worker-Prozess ausgeführt werden sollen

### before

Wird vor Beginn der Testausführung ausgeführt. Zu diesem Zeitpunkt können Sie auf alle globalen Variablen wie `browser` zugreifen. Es ist der perfekte Ort, um benutzerdefinierte Befehle zu definieren.

Parameter:

- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `specs` (`string[]`): Specs, die im Worker-Prozess ausgeführt werden sollen
- `browser` (`object`): Instanz der erstellten Browser-/Gerätesitzung

### beforeSuite

Hook, der ausgeführt wird, bevor die Suite beginnt (nur in Mocha/Jasmine)

Parameter:

- `suite` (`object`): Suite-Details

### beforeHook

Hook, der *vor* einem Hook innerhalb der Suite ausgeführt wird (z.B. läuft vor dem Aufruf von beforeEach in Mocha)

Parameter:

- `test` (`object`): Test-Details
- `context` (`object`): Testkontext (repräsentiert das World-Objekt in Cucumber)

### afterHook

Hook, der *nach* einem Hook innerhalb der Suite ausgeführt wird (z.B. läuft nach dem Aufruf von afterEach in Mocha)

Parameter:

- `test` (`object`): Test-Details
- `context` (`object`): Testkontext (repräsentiert das World-Objekt in Cucumber)
- `result` (`object`): Hook-Ergebnis (enthält die Eigenschaften `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Funktion, die vor einem Test ausgeführt wird (nur in Mocha/Jasmine).

Parameter:

- `test` (`object`): Test-Details
- `context` (`object`): Scope-Objekt, mit dem der Test ausgeführt wurde

### beforeCommand

Wird vor der Ausführung eines WebdriverIO-Befehls ausgeführt.

Parameter:

- `commandName` (`string`): Befehlsname
- `args` (`*`): Argumente, die der Befehl erhalten würde

### afterCommand

Wird nach der Ausführung eines WebdriverIO-Befehls ausgeführt.

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
- `result.retries` (`Object`): Informationen über einmalige testbezogene Wiederholungen, wie für [Mocha und Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) sowie [Cucumber](./Retry.md#rerunning-in-cucumber) definiert, z.B. `{ attempts: 0, limit: 0 }`, siehe
- `result` (`object`): Hook-Ergebnis (enthält die Eigenschaften `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook, der ausgeführt wird, nachdem die Suite beendet wurde (nur in Mocha/Jasmine)

Parameter:

- `suite` (`object`): Suite-Details

### after

Wird ausgeführt, nachdem alle Tests erledigt sind. Sie haben immer noch Zugriff auf alle globalen Variablen des Tests.

Parameter:

- `result` (`number`): 0 - Test bestanden, 1 - Test fehlgeschlagen
- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `specs` (`string[]`): Specs, die im Worker-Prozess ausgeführt wurden

### afterSession

Wird direkt nach Beendigung der WebDriver-Sitzung ausgeführt.

Parameter:

- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `specs` (`string[]`): Specs, die im Worker-Prozess ausgeführt wurden

### onComplete

Wird ausgeführt, nachdem alle Worker heruntergefahren wurden und der Prozess beendet werden soll. Ein im onComplete-Hook geworfener Fehler führt dazu, dass der Testlauf fehlschlägt.

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

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): World-Objekt, das Informationen zu Pickle und Testschritt enthält
- `context` (`object`): Cucumber-World-Objekt

### afterScenario

Wird nach einem Cucumber-Szenario ausgeführt.

Parameter:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): World-Objekt, das Informationen zu Pickle und Testschritt enthält
- `result` (`object`): Ergebnisobjekt mit Szenarioergebnissen
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
- `result`: (`object`): Ergebnisobjekt mit Schrittergebnissen
- `result.passed` (`boolean`): true, wenn das Szenario bestanden hat
- `result.error` (`string`): Fehler-Stack, wenn das Szenario fehlgeschlagen ist
- `result.duration` (`number`): Dauer des Szenarios in Millisekunden
- `context` (`object`): Cucumber-World-Objekt

### beforeAssertion

Hook, der vor einer WebdriverIO-Assertion ausgeführt wird.

Parameter:

- `params`: Assertions-Informationen
- `params.matcherName` (`string`): Name des Matchers (z.B. `toHaveTitle`)
- `params.expectedValue`: Wert, der in den Matcher übergeben wird
- `params.options`: Assertions-Optionen

### afterAssertion

Hook, der nach einer WebdriverIO-Assertion ausgeführt wird.

Parameter:

- `params`: Assertions-Informationen
- `params.matcherName` (`string`): Name des Matchers (z.B. `toHaveTitle`)
- `params.expectedValue`: Wert, der in den Matcher übergeben wird
- `params.options`: Assertions-Optionen
- `params.result`: Assertions-Ergebnisse