---
id: configuration
title: Konfiguration
---

Basierend auf dem [Setup-Typ](/docs/setuptypes) (z.B. Verwendung der reinen Protokollbindungen, WebdriverIO als eigenständiges Paket oder dem WDIO-Testrunner) gibt es verschiedene Optionen, um die Umgebung zu steuern.

## WebDriver-Optionen

Die folgenden Optionen werden bei Verwendung des [`webdriver`](https://www.npmjs.com/package/webdriver) Protokollpakets definiert:

### protocol

Protokoll für die Kommunikation mit dem Treiber-Server.

Typ: `String`<br />
Standard: `http`

### hostname

Host deines Treiber-Servers.

Typ: `String`<br />
Standard: `0.0.0.0`

### port

Port auf dem dein Treiber-Server läuft.

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

Dein Cloud-Service-Benutzername (funktioniert nur für [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) oder [LambdaTest](https://www.lambdatest.com) Konten). Wenn gesetzt, wird WebdriverIO automatisch Verbindungsoptionen für dich einrichten. Wenn du keinen Cloud-Anbieter verwendest, kann dies zur Authentifizierung bei einem anderen WebDriver-Backend verwendet werden.

Typ: `String`<br />
Standard: `undefined`

### key

Dein Cloud-Service-Zugriffsschlüssel oder geheimer Schlüssel (funktioniert nur für [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) oder [LambdaTest](https://www.lambdatest.com) Konten). Wenn gesetzt, wird WebdriverIO automatisch Verbindungsoptionen für dich einrichten. Wenn du keinen Cloud-Anbieter verwendest, kann dies zur Authentifizierung bei einem anderen WebDriver-Backend verwendet werden.

Typ: `String`<br />
Standard: `undefined`

### capabilities

Definiert die Fähigkeiten, die du in deiner WebDriver-Sitzung ausführen möchtest. Weitere Details findest du im [WebDriver-Protokoll](https://w3c.github.io/webdriver/#capabilities). Wenn du einen älteren Treiber verwendest, der das WebDriver-Protokoll nicht unterstützt, musst du die [JSONWireProtocol-Capabilities](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) verwenden, um eine Sitzung erfolgreich auszuführen.

Neben den WebDriver-basierten Capabilities kannst du browser- und herstellerspezifische Optionen anwenden, die eine tiefere Konfiguration des Remote-Browsers oder -Geräts ermöglichen. Diese sind in den entsprechenden Herstellerdokumentationen dokumentiert, z.B.:

- `goog:chromeOptions`: für [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: für [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: für [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: für [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: für [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: für [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Zusätzlich ist der Sauce Labs [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) ein nützliches Tool, das dir hilft, dieses Objekt durch Zusammenklicken deiner gewünschten Capabilities zu erstellen.

Typ: `Object`<br />
Standard: `null`

**Beispiel:**

```js
{
    browserName: 'chrome', // Optionen: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // Browser-Version
    platformName: 'Windows 10' // OS-Plattform
}
```

Wenn du Web- oder native Tests auf mobilen Geräten durchführst, unterscheiden sich die `capabilities` vom WebDriver-Protokoll. Weitere Details findest du in der [Appium-Dokumentation](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/).

### logLevel

Grad der Protokollierungsausführlichkeit.

Typ: `String`<br />
Standard: `info`<br />
Optionen: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Verzeichnis zum Speichern aller Testrunner-Protokolldateien (einschließlich Reporter-Protokolle und `wdio`-Protokolle). Wenn nicht gesetzt, werden alle Protokolle an `stdout` gestreamt. Da die meisten Reporter für die Ausgabe auf `stdout` ausgelegt sind, wird empfohlen, diese Option nur für bestimmte Reporter zu verwenden, bei denen es sinnvoller ist, Berichte in eine Datei zu schreiben (wie z.B. beim `junit`-Reporter).

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

Gib benutzerdefinierte `headers` an, die in jede WebDriver-Anfrage übergeben werden sollen. Wenn dein Selenium Grid eine Basis-Authentifizierung erfordert, empfehlen wir, einen `Authorization`-Header über diese Option zu übergeben, um deine WebDriver-Anfragen zu authentifizieren, z.B.:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Benutzername und Passwort aus Umgebungsvariablen lesen
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Benutzername und Passwort mit Doppelpunkt als Trennzeichen kombinieren
const credentials = `${username}:${password}`;
// Anmeldedaten mit Base64 kodieren
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

Funktion, die HTTP-Antwortobjekte abfängt, nachdem eine WebDriver-Antwort eingegangen ist. Der Funktion wird das ursprüngliche Antwortobjekt als erstes und die entsprechenden `RequestOptions` als zweites Argument übergeben.

Typ: `(Response, RequestOptions) => Response`<br />
Standard: *keine*

### strictSSL

Ob es nicht erforderlich ist, dass das SSL-Zertifikat gültig ist.
Es kann über Umgebungsvariablen wie `STRICT_SSL` oder `strict_ssl` gesetzt werden.

Typ: `Boolean`<br />
Standard: `true`

### enableDirectConnect

Ob die [Appium-Direktverbindungsfunktion](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) aktiviert werden soll.
Es hat keine Auswirkungen, wenn die Antwort keine entsprechenden Schlüssel enthält, während das Flag aktiviert ist.

Typ: `Boolean`<br />
Standard: `true`

### cacheDir

Der Pfad zum Stammverzeichnis des Cache. Dieses Verzeichnis wird verwendet, um alle Treiber zu speichern, die beim Versuch, eine Sitzung zu starten, heruntergeladen werden.

Typ: `String`<br />
Standard: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Für eine sicherere Protokollierung können reguläre Ausdrücke mit `maskingPatterns` vertrauliche Informationen im Protokoll verschleiern.
 - Das Stringformat ist ein regulärer Ausdruck mit oder ohne Flags (z.B. `/.../i`) und durch Komma getrennt für mehrere reguläre Ausdrücke.
 - Weitere Details zu Maskierungsmustern findest du im [Abschnitt zu Maskierungsmustern in der WDIO Logger README](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

Definiere das Protokoll, das du für deine Browser-Automation verwenden möchtest. Derzeit wird nur [`webdriver`](https://www.npmjs.com/package/webdriver) unterstützt, da es die Hauptbrowser-Automatisierungstechnologie ist, die WebdriverIO verwendet.

Wenn du den Browser mit einer anderen Automatisierungstechnologie steuern möchtest, stelle sicher, dass du diese Eigenschaft auf einen Pfad setzt, der zu einem Modul führt, das sich an die folgende Schnittstelle hält:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Starte eine Automatisierungssitzung und gebe ein WebdriverIO [Monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * mit entsprechenden Automatisierungsbefehlen zurück. Siehe das [webdriver](https://www.npmjs.com/package/webdriver) Paket
     * als Referenzimplementierung
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO-Optionen
     * @param {Function} hook, das es ermöglicht, den Client zu modifizieren, bevor er aus der Funktion freigegeben wird
     * @param {PropertyDescriptorMap} userPrototype ermöglicht dem Benutzer, benutzerdefinierte Protokollbefehle hinzuzufügen
     * @param {Function} customCommandWrapper ermöglicht es, die Befehlsausführung zu modifizieren
     * @returns eine WebdriverIO-kompatible Client-Instanz
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * ermöglicht dem Benutzer, sich an bestehende Sitzungen anzuhängen
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Ändert die Instanz-Sitzungs-ID und Browser-Capabilities für die neue Sitzung
     * direkt in das übergebene Browser-Objekt
     *
     * @optional
     * @param   {object} instance  das Objekt, das wir von einer neuen Browser-Sitzung erhalten.
     * @returns {string}           die neue Sitzungs-ID des Browsers
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

Verkürze `url`-Befehlsaufrufe durch Festlegen einer Basis-URL.
- Wenn dein `url`-Parameter mit `/` beginnt, wird `baseUrl` vorangestellt (außer dem `baseUrl`-Pfad, falls vorhanden).
- Wenn dein `url`-Parameter ohne Schema oder `/` beginnt (wie `some/path`), wird die vollständige `baseUrl` direkt vorangestellt.

Typ: `String`<br />
Standard: `null`

### waitforTimeout

Standardzeitüberschreitung für alle `waitFor*`-Befehle. (Beachte das Kleinbuchstaben `f` im Optionsnamen.) Diese Zeitüberschreitung betrifft __nur__ Befehle, die mit `waitFor*` beginnen und ihre Standardwartezeit.

Um die Zeitüberschreitung für einen _Test_ zu erhöhen, siehe die Framework-Dokumentation.

Typ: `Number`<br />
Standard: `5000`

### waitforInterval

Standardintervall für alle `waitFor*`-Befehle, um zu prüfen, ob ein erwarteter Zustand (z. B. Sichtbarkeit) geändert wurde.

Typ: `Number`<br />
Standard: `100`

### region

Bei der Ausführung auf Sauce Labs kannst du wählen, ob du Tests zwischen verschiedenen Rechenzentren ausführen möchtest: US oder EU.
Um deine Region auf EU zu ändern, füge `region: 'eu'` zu deiner Konfiguration hinzu.

__Hinweis:__ Dies hat nur Auswirkungen, wenn du die Optionen `user` und `key` angibst, die mit deinem Sauce Labs-Konto verbunden sind.

Typ: `String`<br />
Standard: `us`

*(nur für VM und/oder EM/Simulatoren)*

---

## Testrunner-Optionen

Die folgenden Optionen (einschließlich der oben aufgeführten) sind nur für die Ausführung von WebdriverIO mit dem WDIO-Testrunner definiert:

### specs

Definiere Spezifikationen für die Testausführung. Du kannst entweder ein Globmuster angeben, um mehrere Dateien auf einmal zu erfassen, oder ein Glob oder eine Reihe von Pfaden in ein Array packen, um sie innerhalb eines einzigen Worker-Prozesses auszuführen. Alle Pfade werden relativ zum Pfad der Konfigurationsdatei betrachtet.

Typ: `(String | String[])[]`<br />
Standard: `[]`

### exclude

Schließe Spezifikationen von der Testausführung aus. Alle Pfade werden relativ zum Pfad der Konfigurationsdatei betrachtet.

Typ: `String[]`<br />
Standard: `[]`

### suites

Ein Objekt, das verschiedene Suites beschreibt, die du dann mit der Option `--suite` in der `wdio`-CLI angeben kannst.

Typ: `Object`<br />
Standard: `{}`

### capabilities

Dasselbe wie der oben beschriebene Abschnitt `capabilities`, jedoch mit der Option, entweder ein [`multiremote`](/docs/multiremote)-Objekt oder mehrere WebDriver-Sitzungen in einem Array für die parallele Ausführung anzugeben.

Du kannst die gleichen anbieter- und browserspezifischen Capabilities wie [oben](/docs/configuration#capabilities) definiert anwenden.

Typ: `Object`|`Object[]`<br />
Standard: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Maximale Anzahl der parallelen Worker insgesamt.

__Hinweis:__ Es kann eine Zahl bis zu `100` sein, wenn die Tests auf externen Anbietern wie Sauce Labs-Maschinen durchgeführt werden. Dort werden die Tests nicht auf einer einzelnen Maschine, sondern auf mehreren VMs getestet. Wenn die Tests auf einem lokalen Entwicklungsrechner ausgeführt werden sollen, verwende eine sinnvollere Zahl wie `3`, `4` oder `5`. Im Wesentlichen handelt es sich um die Anzahl der Browser, die gleichzeitig gestartet werden und deine Tests gleichzeitig ausführen, sodass es davon abhängt, wie viel RAM auf deinem Rechner vorhanden ist und wie viele andere Apps auf deinem Rechner laufen.

Du kannst `maxInstances` auch innerhalb deiner Capability-Objekte mit der `wdio:maxInstances`-Capability anwenden. Dies begrenzt die Anzahl der parallelen Sitzungen für diese bestimmte Capability.

Typ: `Number`<br />
Standard: `100`

### maxInstancesPerCapability

Maximale Anzahl der parallelen Worker pro Capability.

Typ: `Number`<br />
Standard: `100`

### injectGlobals

Fügt WebdriverIOs Globale (z.B. `browser`, `$` und `$$`) in die globale Umgebung ein.
Wenn du auf `false` setzt, solltest du von `@wdio/globals` importieren, z.B.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Hinweis: WebdriverIO handhabt nicht die Injektion von testframework-spezifischen Globalen.

Typ: `Boolean`<br />
Standard: `true`

### bail

Wenn du möchtest, dass dein Testlauf nach einer bestimmten Anzahl von Testfehlern stoppt, verwende `bail`.
(Standardmäßig ist es `0`, was bedeutet, dass alle Tests unabhängig vom Ergebnis ausgeführt werden.) **Hinweis:** Ein Test in diesem Zusammenhang sind alle Tests innerhalb einer einzelnen Spec-Datei (bei Verwendung von Mocha oder Jasmine) oder alle Schritte innerhalb einer Feature-Datei (bei Verwendung von Cucumber). Wenn du das Bail-Verhalten innerhalb von Tests einer einzelnen Testdatei steuern möchtest, schau dir die verfügbaren [Framework](frameworks)-Optionen an.

Typ: `Number`<br />
Standard: `0` (nicht abbrechen; alle Tests ausführen)

### specFileRetries

Die Anzahl der Wiederholungen einer gesamten Specdatei, wenn diese als Ganzes fehlschlägt.

Typ: `Number`<br />
Standard: `0`

### specFileRetriesDelay

Verzögerung in Sekunden zwischen den Wiederholungsversuchen der Spec-Datei

Typ: `Number`<br />
Standard: `0`

### specFileRetriesDeferred

Ob wiederholte Spec-Dateien sofort wiederholt oder ans Ende der Warteschlange verschoben werden sollen.

Typ: `Boolean`<br />
Standard: `true`

### groupLogsByTestSpec

Wähle die Protokollausgabeansicht.

Wenn auf `false` gesetzt, werden Protokolle aus verschiedenen Testdateien in Echtzeit ausgegeben. Bitte beachte, dass dies bei paralleler Ausführung zu einer Vermischung der Protokollausgaben aus verschiedenen Dateien führen kann.

Wenn auf `true` gesetzt, werden Protokollausgaben nach Test-Spec gruppiert und erst ausgegeben, wenn die Test-Spec abgeschlossen ist.

Standardmäßig ist es auf `false` gesetzt, sodass Protokolle in Echtzeit ausgegeben werden.

Typ: `Boolean`<br />
Standard: `false`

### services

Services übernehmen eine bestimmte Aufgabe, um die du dich nicht kümmern möchtest. Sie erweitern dein Testsetup mit minimalem Aufwand.

Typ: `String[]|Object[]`<br />
Standard: `[]`

### framework

Definiert das von WDIO-Testrunner zu verwendende Testframework.

Typ: `String`<br />
Standard: `mocha`<br />
Optionen: `mocha` | `jasmine`

### mochaOpts, jasmineOpts und cucumberOpts

Spezifische frameworkbezogene Optionen. Siehe die Framework-Adapter-Dokumentation, welche Optionen verfügbar sind. Mehr dazu in [Frameworks](frameworks).

Typ: `Object`<br />
Standard: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Liste von Cucumber-Features mit Zeilennummern (bei Verwendung des [Cucumber-Frameworks](./Frameworks.md#using-cucumber)).

Typ: `String[]`
Standard: `[]`

### reporters

Liste der zu verwendenden Reporter. Ein Reporter kann entweder ein String oder ein Array von
`['reporterName', { /* reporter options */}]` sein, wobei das erste Element ein String mit dem Reporter-Namen und das zweite Element ein Objekt mit Reporter-Optionen ist.

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

Bestimmt, in welchem Intervall der Reporter prüfen sollte, ob sie synchronisiert sind, wenn sie ihre Protokolle asynchron melden (z.B. wenn Protokolle an einen Drittanbieter gestreamt werden).

Typ: `Number`<br />
Standard: `100` (ms)

### reporterSyncTimeout

Bestimmt die maximale Zeit, die Reporter haben, um das Hochladen all ihrer Protokolle abzuschließen, bis der Testrunner einen Fehler auslöst.

Typ: `Number`<br />
Standard: `5000` (ms)

### execArgv

Node-Argumente, die beim Starten von Kindprozessen angegeben werden sollen.

Typ: `String[]`<br />
Standard: `null`

### filesToWatch

Eine Liste von Glob-unterstützenden String-Mustern, die dem Testrunner mitteilen, zusätzlich andere Dateien zu überwachen, z.B. Anwendungsdateien, wenn er mit dem Flag `--watch` ausgeführt wird. Standardmäßig überwacht der Testrunner bereits alle Spec-Dateien.

Typ: `String[]`<br />
Standard: `[]`

### updateSnapshots

Setze auf true, wenn du deine Snapshots aktualisieren möchtest. Idealerweise als Teil eines CLI-Parameters verwendet, z.B. `wdio run wdio.conf.js --s`.

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

WDIO verwendet `tsx` zum Kompilieren von TypeScript-Dateien. Deine TSConfig wird automatisch aus dem aktuellen Arbeitsverzeichnis erkannt, aber du kannst hier einen benutzerdefinierten Pfad angeben oder die Umgebungsvariable TSX_TSCONFIG_PATH setzen.

Siehe die `tsx`-Dokumentation: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Typ: `String`<br />
Standard: `null`<br />

## Hooks

Der WDIO-Testrunner ermöglicht es dir, Hooks zu setzen, die zu bestimmten Zeiten des Testlebenszyklus ausgelöst werden. Dies ermöglicht benutzerdefinierte Aktionen (z.B. Screenshot machen, wenn ein Test fehlschlägt).

Jeder Hook hat als Parameter spezifische Informationen über den Lebenszyklus (z.B. Informationen über die Testsuite oder den Test). Lies mehr über alle Hook-Eigenschaften in [unserer Beispielkonfiguration](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Hinweis:** Einige Hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` und `onComplete`) werden in einem anderen Prozess ausgeführt und können daher keine globalen Daten mit den anderen Hooks teilen, die im Worker-Prozess leben.

### onPrepare

Wird einmal ausgeführt, bevor alle Worker gestartet werden.

Parameter:

- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `param` (`object[]`): Liste der Capabilities-Details

### onWorkerStart

Wird ausgeführt, bevor ein Worker-Prozess gestartet wird, und kann verwendet werden, um bestimmte Dienste für diesen Worker zu initialisieren sowie Laufzeitumgebungen asynchron zu ändern.

Parameter:

- `cid` (`string`): Capability-ID (z.B. 0-0)
- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `specs` (`string[]`): Spezifikationen, die im Worker-Prozess ausgeführt werden sollen
- `args` (`object`): Objekt, das mit der Hauptkonfiguration zusammengeführt wird, sobald der Worker initialisiert ist
- `execArgv` (`string[]`): Liste von String-Argumenten, die an den Worker-Prozess übergeben werden

### onWorkerEnd

Wird ausgeführt, nachdem ein Worker-Prozess beendet wurde.

Parameter:

- `cid` (`string`): Capability-ID (z.B. 0-0)
- `exitCode` (`number`): 0 - Erfolg, 1 - Fehler
- `specs` (`string[]`): Spezifikationen, die im Worker-Prozess ausgeführt werden sollen
- `retries` (`number`): Anzahl der Wiederholungen auf Spec-Ebene wie in [_"Wiederholungen auf Basis einzelner Spec-Dateien hinzufügen"_](./Retry.md#add-retries-on-a-per-specfile-basis) definiert

### beforeSession

Wird ausgeführt, kurz bevor die WebDriver-Sitzung und das Testframework initialisiert werden. Es ermöglicht dir, Konfigurationen abhängig von der Capability oder Spec zu manipulieren.

Parameter:

- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `specs` (`string[]`): Spezifikationen, die im Worker-Prozess ausgeführt werden sollen

### before

Wird ausgeführt, bevor die Testausführung beginnt. An diesem Punkt kannst du auf alle globalen Variablen wie `browser` zugreifen. Es ist der perfekte Ort, um benutzerdefinierte Befehle zu definieren.

Parameter:

- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `specs` (`string[]`): Spezifikationen, die im Worker-Prozess ausgeführt werden sollen
- `browser` (`object`): Instanz der erstellten Browser-/Gerätesitzung

### beforeSuite

Hook, der ausgeführt wird, bevor die Suite beginnt (nur in Mocha/Jasmine)

Parameter:

- `suite` (`object`): Suite-Details

### beforeHook

Hook, der *vor* einem Hook innerhalb der Suite ausgeführt wird (läuft z.B. vor dem Aufruf von beforeEach in Mocha)

Parameter:

- `test` (`object`): Test-Details
- `context` (`object`): Test-Kontext (repräsentiert das World-Objekt in Cucumber)

### afterHook

Hook, der *nach* einem Hook innerhalb der Suite ausgeführt wird (läuft z.B. nach dem Aufruf von afterEach in Mocha)

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
- `result.error` (`Error`): Fehlerobjekt, wenn der Test fehlschlägt, sonst `undefined`
- `result.result` (`Any`): Rückgabeobjekt der Testfunktion
- `result.duration` (`Number`): Dauer des Tests
- `result.passed` (`Boolean`): true, wenn Test bestanden wurde, sonst false
- `result.retries` (`Object`): Informationen über einzelne testbezogene Wiederholungen wie für [Mocha und Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) sowie [Cucumber](./Retry.md#rerunning-in-cucumber) definiert, z.B. `{ attempts: 0, limit: 0 }`, siehe
- `result` (`object`): Hook-Ergebnis (enthält die Eigenschaften `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook, der ausgeführt wird, nachdem die Suite beendet ist (nur in Mocha/Jasmine)

Parameter:

- `suite` (`object`): Suite-Details

### after

Wird ausgeführt, nachdem alle Tests abgeschlossen sind. Du hast immer noch Zugriff auf alle globalen Variablen aus dem Test.

Parameter:

- `result` (`number`): 0 - Test bestanden, 1 - Test fehlgeschlagen
- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `specs` (`string[]`): Spezifikationen, die im Worker-Prozess ausgeführt werden sollen

### afterSession

Wird unmittelbar nach Beendigung der WebDriver-Sitzung ausgeführt.

Parameter:

- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `specs` (`string[]`): Spezifikationen, die im Worker-Prozess ausgeführt werden sollen

### onComplete

Wird ausgeführt, nachdem alle Worker heruntergefahren wurden und der Prozess beendet werden soll. Ein Fehler, der im onComplete-Hook ausgelöst wird, führt dazu, dass der Testlauf fehlschlägt.

Parameter:

- `exitCode` (`number`): 0 - Erfolg, 1 - Fehler
- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `caps` (`object`): enthält Capabilities für die Sitzung, die im Worker gestartet wird
- `result` (`object`): Ergebnisobjekt mit Testergebnissen

### onReload

Wird ausgeführt, wenn ein Refresh stattfindet.

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
- `context` (`object`): Cucumber World-Objekt

### afterScenario

Wird nach einem Cucumber-Szenario ausgeführt.

Parameter:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): World-Objekt mit Informationen zu Pickle und Testschritt
- `result` (`object`): Ergebnisobjekt mit Szenarioergebnissen
- `result.passed` (`boolean`): true, wenn Szenario bestanden wurde
- `result.error` (`string`): Fehlerstapel, wenn Szenario fehlgeschlagen ist
- `result.duration` (`number`): Dauer des Szenarios in Millisekunden
- `context` (`object`): Cucumber World-Objekt

### beforeStep

Wird vor einem Cucumber-Schritt ausgeführt.

Parameter:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber-Schrittobjekt
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber-Szenarioobjekt
- `context` (`object`): Cucumber World-Objekt

### afterStep

Wird nach einem Cucumber-Schritt ausgeführt.

Parameter:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber-Schrittobjekt
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber-Szenarioobjekt
- `result`: (`object`): Ergebnisobjekt mit Schrittergebnissen
- `result.passed` (`boolean`): true, wenn Szenario bestanden wurde
- `result.error` (`string`): Fehlerstapel, wenn Szenario fehlgeschlagen ist
- `result.duration` (`number`): Dauer des Szenarios in Millisekunden
- `context` (`object`): Cucumber World-Objekt

### beforeAssertion

Hook, der ausgeführt wird, bevor eine WebdriverIO-Assertion stattfindet.

Parameter:

- `params`: Assertion-Informationen
- `params.matcherName` (`string`): Name des Matchers (z.B. `toHaveTitle`)
- `params.expectedValue`: Wert, der an den Matcher übergeben wird
- `params.options`: Assertion-Optionen

### afterAssertion

Hook, der ausgeführt wird, nachdem eine WebdriverIO-Assertion stattgefunden hat.

Parameter:

- `params`: Assertion-Informationen
- `params.matcherName` (`string`): Name des Matchers (z.B. `toHaveTitle`)
- `params.expectedValue`: Wert, der an den Matcher übergeben wird
- `params.options`: Assertion-Optionen
- `params.result`: Assertion-Ergebnisse