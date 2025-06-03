---
id: configuration
title: Konfiguration
---

Basierend auf dem [Setup-Typ](/docs/setuptypes) (z.B. bei Verwendung der reinen Protokoll-Bindings, WebdriverIO als eigenständiges Paket oder dem WDIO-Testrunner) gibt es unterschiedliche Optionen, um die Umgebung zu steuern.

## WebDriver-Optionen

Die folgenden Optionen sind definiert, wenn das [`webdriver`](https://www.npmjs.com/package/webdriver) Protokoll-Paket verwendet wird:

### protocol

Protokoll zur Kommunikation mit dem Treiber-Server.

Type: `String`<br />
Default: `http`

### hostname

Host des Treiber-Servers.

Type: `String`<br />
Default: `0.0.0.0`

### port

Port, auf dem der Treiber-Server läuft.

Type: `Number`<br />
Default: `undefined`

### path

Pfad zum Endpunkt des Treiber-Servers.

Type: `String`<br />
Default: `/`

### queryParams

Abfrageparameter, die an den Treiber-Server übergeben werden.

Type: `Object`<br />
Default: `undefined`

### user

Ihr Cloud-Service-Benutzername (funktioniert nur für [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) oder [LambdaTest](https://www.lambdatest.com) Konten). Wenn gesetzt, wird WebdriverIO automatisch die Verbindungsoptionen für Sie einstellen. Wenn Sie keinen Cloud-Anbieter verwenden, kann dies zur Authentifizierung bei einem anderen WebDriver-Backend verwendet werden.

Type: `String`<br />
Default: `undefined`

### key

Ihr Cloud-Service-Zugriffsschlüssel oder geheimer Schlüssel (funktioniert nur für [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) oder [LambdaTest](https://www.lambdatest.com) Konten). Wenn gesetzt, wird WebdriverIO automatisch die Verbindungsoptionen für Sie einstellen. Wenn Sie keinen Cloud-Anbieter verwenden, kann dies zur Authentifizierung bei einem anderen WebDriver-Backend verwendet werden.

Type: `String`<br />
Default: `undefined`

### capabilities

Definiert die Fähigkeiten, die Sie in Ihrer WebDriver-Sitzung verwenden möchten. Weitere Details finden Sie im [WebDriver-Protokoll](https://w3c.github.io/webdriver/#capabilities). Wenn Sie einen älteren Treiber verwenden, der das WebDriver-Protokoll nicht unterstützt, müssen Sie die [JSONWireProtocol-Capabilities](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) verwenden, um eine Sitzung erfolgreich auszuführen.

Neben den WebDriver-basierten Capabilities können Sie browser- und anbieterspezifische Optionen anwenden, die eine tiefere Konfiguration des Remote-Browsers oder -Geräts ermöglichen. Diese sind in den entsprechenden Anbieter-Dokumentationen dokumentiert, z.B.:

- `goog:chromeOptions`: für [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: für [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: für [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: für [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: für [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: für [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Ein nützliches Hilfsmittel ist außerdem der Sauce Labs [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/), der Ihnen hilft, dieses Objekt durch Zusammenklicken Ihrer gewünschten Capabilities zu erstellen.

Type: `Object`<br />
Default: `null`

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

Ausführlichkeit der Protokollierung.

Type: `String`<br />
Default: `info`<br />
Optionen: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Verzeichnis zum Speichern aller Testrunner-Protokolldateien (einschließlich Reporter-Protokollen und `wdio`-Protokollen). Wenn nicht gesetzt, werden alle Protokolle an `stdout` gestreamt. Da die meisten Reporter für die Ausgabe nach `stdout` konzipiert sind, wird empfohlen, diese Option nur für bestimmte Reporter zu verwenden, bei denen es sinnvoller ist, Berichte in eine Datei zu pushen (wie z.B. der `junit`-Reporter).

Im Standalone-Modus ist das einzige von WebdriverIO generierte Protokoll das `wdio`-Protokoll.

Type: `String`<br />
Default: `null`

### connectionRetryTimeout

Timeout für jede WebDriver-Anfrage an einen Treiber oder ein Grid.

Type: `Number`<br />
Default: `120000`

### connectionRetryCount

Maximale Anzahl an Wiederholungsversuchen für Anfragen an den Selenium-Server.

Type: `Number`<br />
Default: `3`

### agent

Ermöglicht die Verwendung eines benutzerdefinierten `http`/`https`/`http2` [Agents](https://www.npmjs.com/package/got#agent) für Anfragen.

Type: `Object`<br />
Default:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Geben Sie benutzerdefinierte `headers` an, die in jede WebDriver-Anfrage übergeben werden sollen. Wenn Ihr Selenium-Grid eine Basis-Authentifizierung erfordert, empfehlen wir, einen `Authorization`-Header über diese Option zu übergeben, um Ihre WebDriver-Anfragen zu authentifizieren, z.B.:

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

Funktion, die [HTTP-Anfrage-Optionen](https://github.com/sindresorhus/got#options) abfängt, bevor eine WebDriver-Anfrage gestellt wird

Type: `(RequestOptions) => RequestOptions`<br />
Default: *keine*

### transformResponse

Funktion, die HTTP-Antwortobjekte abfängt, nachdem eine WebDriver-Antwort eingegangen ist. Der Funktion wird das ursprüngliche Antwortobjekt als erstes und die entsprechenden `RequestOptions` als zweites Argument übergeben.

Type: `(Response, RequestOptions) => Response`<br />
Default: *keine*

### strictSSL

Ob es nicht erforderlich ist, dass das SSL-Zertifikat gültig ist.
Es kann über Umgebungsvariablen wie `STRICT_SSL` oder `strict_ssl` gesetzt werden.

Type: `Boolean`<br />
Default: `true`

### enableDirectConnect

Ob die [Appium-Direktverbindungsfunktion](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) aktiviert werden soll.
Es hat keine Wirkung, wenn die Antwort nicht die richtigen Schlüssel enthält, während das Flag aktiviert ist.

Type: `Boolean`<br />
Default: `true`

### cacheDir

Der Pfad zum Stammverzeichnis des Cache. Dieses Verzeichnis wird verwendet, um alle Treiber zu speichern, die beim Versuch, eine Sitzung zu starten, heruntergeladen werden.

Type: `String`<br />
Default: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Für eine sicherere Protokollierung können mit `maskingPatterns` gesetzte reguläre Ausdrücke vertrauliche Informationen im Protokoll verschleiern.
 - Das Stringformat ist ein regulärer Ausdruck mit oder ohne Flags (z.B. `/.../i`) und durch Komma getrennt für mehrere reguläre Ausdrücke.
 - Weitere Details zu Maskierungsmustern finden Sie im [Abschnitt Maskierungsmuster in der WDIO Logger README](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

Type: `String`<br />
Default: `undefined`

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

Wenn Sie den Browser mit einer anderen Automatisierungstechnologie automatisieren möchten, stellen Sie sicher, dass Sie diese Eigenschaft auf einen Pfad setzen, der zu einem Modul führt, das der folgenden Schnittstelle entspricht:

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
- Wenn Ihr `url`-Parameter mit `/` beginnt, wird `baseUrl` vorangestellt (außer dem `baseUrl`-Pfad, falls vorhanden).
- Wenn Ihr `url`-Parameter ohne Schema oder `/` beginnt (wie `some/path`), wird die vollständige `baseUrl` direkt vorangestellt.

Type: `String`<br />
Default: `null`

### waitforTimeout

Standard-Timeout für alle `waitFor*`-Befehle. (Beachten Sie das Kleinbuchstabe `f` im Optionsnamen.) Dieser Timeout betrifft __nur__ Befehle, die mit `waitFor*` beginnen, und deren Standardwartezeit.

Um das Timeout für einen _Test_ zu erhöhen, lesen Sie bitte die Framework-Dokumentation.

Type: `Number`<br />
Default: `5000`

### waitforInterval

Standard-Intervall für alle `waitFor*`-Befehle, um zu prüfen, ob ein erwarteter Zustand (z.B. Sichtbarkeit) geändert wurde.

Type: `Number`<br />
Default: `100`

### region

Wenn Sie auf Sauce Labs laufen, können Sie wählen, ob Sie Tests zwischen verschiedenen Datenzentren ausführen möchten: US oder EU.
Um Ihre Region auf EU zu ändern, fügen Sie `region: 'eu'` zu Ihrer Konfiguration hinzu.

__Hinweis:__ Dies hat nur Auswirkungen, wenn Sie die Optionen `user` und `key` angeben, die mit Ihrem Sauce Labs-Konto verbunden sind.

Type: `String`<br />
Default: `us`

*(nur für VMs und/oder Emulatoren/Simulatoren)*

---

## Testrunner-Optionen

Die folgenden Optionen (einschließlich der oben aufgeführten) sind nur für die Ausführung von WebdriverIO mit dem WDIO-Testrunner definiert:

### specs

Definieren Sie Spezifikationen für die Testausführung. Sie können entweder ein Glob-Muster angeben, um mehrere Dateien gleichzeitig abzugleichen, oder ein Glob oder einen Satz von Pfaden in ein Array packen, um sie innerhalb eines einzelnen Arbeitsprozesses auszuführen. Alle Pfade werden relativ zum Pfad der Konfigurationsdatei betrachtet.

Type: `(String | String[])[]`<br />
Default: `[]`

### exclude

Schließen Sie Spezifikationen von der Testausführung aus. Alle Pfade werden relativ zum Pfad der Konfigurationsdatei betrachtet.

Type: `String[]`<br />
Default: `[]`

### suites

Ein Objekt, das verschiedene Suites beschreibt, die Sie dann mit der Option `--suite` auf der `wdio`-CLI angeben können.

Type: `Object`<br />
Default: `{}`

### capabilities

Dasselbe wie der oben beschriebene `capabilities`-Abschnitt, jedoch mit der Option, entweder ein [`multiremote`](/docs/multiremote)-Objekt oder mehrere WebDriver-Sitzungen in einem Array für die parallele Ausführung anzugeben.

Sie können die gleichen anbieter- und browserspezifischen Capabilities anwenden, wie [oben](/docs/configuration#capabilities) definiert.

Type: `Object`|`Object[]`<br />
Default: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Maximale Anzahl der insgesamt parallel laufenden Worker.

__Hinweis:__ Es kann eine Zahl bis zu `100` sein, wenn die Tests auf externen Anbietern wie Sauce Labs-Maschinen durchgeführt werden. Dort werden die Tests nicht auf einer einzelnen Maschine getestet, sondern auf mehreren VMs. Wenn die Tests auf einem lokalen Entwicklungsrechner ausgeführt werden sollen, verwenden Sie eine angemessenere Zahl wie `3`, `4` oder `5`. Im Wesentlichen ist dies die Anzahl der Browser, die gleichzeitig gestartet werden und Ihre Tests gleichzeitig ausführen, daher hängt es davon ab, wie viel RAM auf Ihrem Rechner vorhanden ist und wie viele andere Apps auf Ihrem Rechner laufen.

Sie können `maxInstances` auch innerhalb Ihrer Capability-Objekte mit der `wdio:maxInstances`-Capability anwenden. Dies begrenzt die Anzahl der parallelen Sitzungen für diese bestimmte Capability.

Type: `Number`<br />
Default: `100`

### maxInstancesPerCapability

Maximale Anzahl von insgesamt parallel laufenden Workern pro Capability.

Type: `Number`<br />
Default: `100`

### injectGlobals

Fügt WebdriverIOs Globals (z.B. `browser`, `$` und `$$`) in die globale Umgebung ein.
Wenn Sie dies auf `false` setzen, sollten Sie von `@wdio/globals` importieren, z.B.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Hinweis: WebdriverIO kümmert sich nicht um die Injektion von testframework-spezifischen Globals.

Type: `Boolean`<br />
Default: `true`

### bail

Wenn Sie möchten, dass Ihr Testlauf nach einer bestimmten Anzahl von Testfehlern stoppt, verwenden Sie `bail`.
(Standardmäßig ist es `0`, was bedeutet, dass alle Tests ausgeführt werden, unabhängig vom Ergebnis.) **Hinweis:** Ein Test in diesem Zusammenhang sind alle Tests innerhalb einer einzelnen Spezifikationsdatei (bei Verwendung von Mocha oder Jasmine) oder alle Schritte innerhalb einer Feature-Datei (bei Verwendung von Cucumber). Wenn Sie das Bail-Verhalten innerhalb von Tests einer einzelnen Testdatei steuern möchten, schauen Sie sich die verfügbaren [Framework](frameworks)-Optionen an.

Type: `Number`<br />
Default: `0` (nicht abbrechen; alle Tests ausführen)

### specFileRetries

Die Anzahl der Wiederholungsversuche für eine gesamte Spezifikationsdatei, wenn sie als Ganzes fehlschlägt.

Type: `Number`<br />
Default: `0`

### specFileRetriesDelay

Verzögerung in Sekunden zwischen den Wiederholungsversuchen der Spezifikationsdatei

Type: `Number`<br />
Default: `0`

### specFileRetriesDeferred

Ob wiederholte Spezifikationsdateien sofort oder am Ende der Warteschlange wiederholt werden sollen.

Type: `Boolean`<br />
Default: `true`

### groupLogsByTestSpec

Wählen Sie die Protokollausgabeansicht.

Wenn auf `false` gesetzt, werden Protokolle aus verschiedenen Testdateien in Echtzeit ausgegeben. Bitte beachten Sie, dass dies bei paralleler Ausführung zu einer Vermischung der Protokollausgaben aus verschiedenen Dateien führen kann.

Wenn auf `true` gesetzt, werden Protokollausgaben nach Test-Spezifikation gruppiert und erst dann ausgegeben, wenn die Test-Spezifikation abgeschlossen ist.

Standardmäßig ist es auf `false` gesetzt, sodass Protokolle in Echtzeit ausgegeben werden.

Type: `Boolean`<br />
Default: `false`

### services

Services übernehmen eine bestimmte Aufgabe, um die Sie sich nicht kümmern möchten. Sie verbessern Ihr Test-Setup mit minimalem Aufwand.

Type: `String[]|Object[]`<br />
Default: `[]`

### framework

Definiert das zu verwendende Test-Framework für den WDIO-Testrunner.

Type: `String`<br />
Default: `mocha`<br />
Optionen: `mocha` | `jasmine`

### mochaOpts, jasmineOpts und cucumberOpts

Spezifische framework-bezogene Optionen. Sehen Sie in der Framework-Adapter-Dokumentation nach, welche Optionen verfügbar sind. Lesen Sie mehr dazu in [Frameworks](frameworks).

Type: `Object`<br />
Default: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Liste der Cucumber-Features mit Zeilennummern (bei Verwendung des [Cucumber-Frameworks](./Frameworks.md#using-cucumber)).

Type: `String[]`
Default: `[]`

### reporters

Liste der zu verwendenden Reporter. Ein Reporter kann entweder ein String sein oder ein Array von
`['reporterName', { /* reporter options */}]`, wobei das erste Element ein String mit dem Reporter-Namen und das zweite Element ein Objekt mit Reporter-Optionen ist.

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

Bestimmt die maximale Zeit, die Reporter haben, um das Hochladen aller ihrer Protokolle abzuschließen, bis ein Fehler vom Testrunner geworfen wird.

Type: `Number`<br />
Default: `5000` (ms)

### execArgv

Node-Argumente, die beim Starten von Kindprozessen angegeben werden sollen.

Type: `String[]`<br />
Default: `null`

### filesToWatch

Eine Liste von Glob-unterstützenden String-Mustern, die dem Testrunner mitteilen, zusätzlich andere Dateien zu überwachen, z.B. Anwendungsdateien, wenn er mit dem Flag `--watch` ausgeführt wird. Standardmäßig überwacht der Testrunner bereits alle Spezifikationsdateien.

Type: `String[]`<br />
Default: `[]`

### updateSnapshots

Setzen Sie auf true, wenn Sie Ihre Snapshots aktualisieren möchten. Idealerweise als Teil eines CLI-Parameters verwendet, z.B. `wdio run wdio.conf.js --s`.

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

WDIO verwendet `tsx` zur Kompilierung von TypeScript-Dateien. Ihre TSConfig wird automatisch aus dem aktuellen Arbeitsverzeichnis erkannt, aber Sie können hier einen benutzerdefinierten Pfad angeben oder die Umgebungsvariable TSX_TSCONFIG_PATH setzen.

Siehe die `tsx`-Dokumentation: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Type: `String`<br />
Default: `null`<br />

## Hooks

Der WDIO-Testrunner ermöglicht es Ihnen, Hooks zu setzen, die zu bestimmten Zeitpunkten des Testlebenszyklus ausgelöst werden. Dies ermöglicht benutzerdefinierte Aktionen (z.B. Screenshot aufnehmen, wenn ein Test fehlschlägt).

Jeder Hook hat als Parameter spezifische Informationen über den Lebenszyklus (z.B. Informationen über die Testsuite oder den Test). Lesen Sie mehr über alle Hook-Eigenschaften in [unserer Beispielkonfiguration](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Hinweis:** Einige Hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` und `onComplete`) werden in einem anderen Prozess ausgeführt und können daher keine globalen Daten mit den anderen Hooks teilen, die im Worker-Prozess leben.

### onPrepare

Wird einmal vor dem Start aller Worker ausgeführt.

Parameter:

- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `param` (`object[]`): Liste der Capability-Details

### onWorkerStart

Wird ausgeführt, bevor ein Arbeitsprozess gestartet wird, und kann verwendet werden, um bestimmte Dienste für diesen Worker zu initialisieren sowie Laufzeitumgebungen auf asynchrone Weise zu modifizieren.

Parameter:

- `cid` (`string`): Capability-ID (z.B. 0-0)
- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `specs` (`string[]`): Spezifikationen, die im Worker-Prozess ausgeführt werden sollen
- `args` (`object`): Objekt, das mit der Hauptkonfiguration zusammengeführt wird, sobald der Worker initialisiert ist
- `execArgv` (`string[]`): Liste der String-Argumente, die an den Worker-Prozess übergeben werden

### onWorkerEnd

Wird ausgeführt, direkt nachdem ein Worker-Prozess beendet wurde.

Parameter:

- `cid` (`string`): Capability-ID (z.B. 0-0)
- `exitCode` (`number`): 0 - Erfolg, 1 - Fehler
- `specs` (`string[]`): Spezifikationen, die im Worker-Prozess ausgeführt wurden
- `retries` (`number`): Anzahl der Wiederholungen auf Spezifikationsebene, wie in [_"Add retries on a per-specfile basis"_](./Retry.md#add-retries-on-a-per-specfile-basis) definiert

### beforeSession

Wird ausgeführt, direkt bevor die WebDriver-Sitzung und das Test-Framework initialisiert werden. Es ermöglicht Ihnen, Konfigurationen abhängig von der Capability oder Spezifikation zu manipulieren.

Parameter:

- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `specs` (`string[]`): Spezifikationen, die im Worker-Prozess ausgeführt werden sollen

### before

Wird ausgeführt, bevor die Testausführung beginnt. An diesem Punkt können Sie auf alle globalen Variablen wie `browser` zugreifen. Es ist der perfekte Ort, um benutzerdefinierte Befehle zu definieren.

Parameter:

- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `specs` (`string[]`): Spezifikationen, die im Worker-Prozess ausgeführt werden sollen
- `browser` (`object`): Instanz der erstellten Browser-/Gerätesitzung

### beforeSuite

Hook, der ausgeführt wird, bevor die Suite startet (nur in Mocha/Jasmine)

Parameter:

- `suite` (`object`): Suite-Details

### beforeHook

Hook, der *vor* einem Hook innerhalb der Suite ausgeführt wird (z.B. läuft vor dem Aufruf von beforeEach in Mocha)

Parameter:

- `test` (`object`): Test-Details
- `context` (`object`): Test-Kontext (repräsentiert das World-Objekt in Cucumber)

### afterHook

Hook, der *nach* einem Hook innerhalb der Suite ausgeführt wird (z.B. läuft nach dem Aufruf von afterEach in Mocha)

Parameter:

- `test` (`object`): Test-Details
- `context` (`object`): Test-Kontext (repräsentiert das World-Objekt in Cucumber)
- `result` (`object`): Hook-Ergebnis (enthält Eigenschaften `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Funktion, die vor einem Test ausgeführt wird (nur in Mocha/Jasmine).

Parameter:

- `test` (`object`): Test-Details
- `context` (`object`): Scope-Objekt, mit dem der Test ausgeführt wurde

### beforeCommand

Läuft vor der Ausführung eines WebdriverIO-Befehls.

Parameter:

- `commandName` (`string`): Befehlsname
- `args` (`*`): Argumente, die der Befehl erhalten würde

### afterCommand

Läuft nach der Ausführung eines WebdriverIO-Befehls.

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
- `result.passed` (`Boolean`): true, wenn der Test bestanden wurde, sonst false
- `result.retries` (`Object`): Informationen über einzelne testbezogene Wiederholungen, wie für [Mocha und Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) sowie [Cucumber](./Retry.md#rerunning-in-cucumber) definiert, z.B. `{ attempts: 0, limit: 0 }`, siehe
- `result` (`object`): Hook-Ergebnis (enthält Eigenschaften `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook, der ausgeführt wird, nachdem die Suite beendet wurde (nur in Mocha/Jasmine)

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

Wird ausgeführt, nachdem alle Worker heruntergefahren wurden und der Prozess kurz vor dem Beenden steht. Ein im onComplete-Hook geworfener Fehler führt dazu, dass der Testlauf fehlschlägt.

Parameter:

- `exitCode` (`number`): 0 - Erfolg, 1 - Fehler
- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `result` (`object`): Ergebnisobjekt mit Testergebnissen

### onReload

Wird bei einer Aktualisierung ausgeführt.

Parameter:

- `oldSessionId` (`string`): Sitzungs-ID der alten Sitzung
- `newSessionId` (`string`): Sitzungs-ID der neuen Sitzung

### beforeFeature

Läuft vor einem Cucumber-Feature.

Parameter:

- `uri` (`string`): Pfad zur Feature-Datei
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber-Feature-Objekt

### afterFeature

Läuft nach einem Cucumber-Feature.

Parameter:

- `uri` (`string`): Pfad zur Feature-Datei
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber-Feature-Objekt

### beforeScenario

Läuft vor einem Cucumber-Szenario.

Parameter:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): World-Objekt mit Informationen zu Pickle und Testschritt
- `context` (`object`): Cucumber-World-Objekt

### afterScenario

Läuft nach einem Cucumber-Szenario.

Parameter:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): World-Objekt mit Informationen zu Pickle und Testschritt
- `result` (`object`): Ergebnisobjekt mit Szenarioergebnissen
- `result.passed` (`boolean`): true, wenn das Szenario bestanden wurde
- `result.error` (`string`): Fehler-Stack, wenn das Szenario fehlgeschlagen ist
- `result.duration` (`number`): Dauer des Szenarios in Millisekunden
- `context` (`object`): Cucumber-World-Objekt

### beforeStep

Läuft vor einem Cucumber-Schritt.

Parameter:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber-Schritt-Objekt
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber-Szenario-Objekt
- `context` (`object`): Cucumber-World-Objekt

### afterStep

Läuft nach einem Cucumber-Schritt.

Parameter:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber-Schritt-Objekt
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber-Szenario-Objekt
- `result`: (`object`): Ergebnisobjekt mit Schrittergebnissen
- `result.passed` (`boolean`): true, wenn das Szenario bestanden wurde
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
