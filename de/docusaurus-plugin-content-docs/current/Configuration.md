---
id: configuration
title: Konfiguration
description: "Schlagen Sie jede Konfigurationsoption für WebDriver, eigenständiges WebdriverIO und den WDIO-Testrunner nach, einschließlich aller Testrunner-Hooks."
---

Je nach [Setup-Typ](/docs/setuptypes) (z. B. bei Verwendung der reinen Protokoll-Bindings, WebdriverIO als eigenständiges Paket oder dem WDIO-Testrunner) steht ein unterschiedlicher Satz an Optionen zur Verfügung, um die Umgebung zu steuern.

## WebDriver-Optionen

Die folgenden Optionen sind definiert, wenn das Protokollpaket [`webdriver`](https://www.npmjs.com/package/webdriver) verwendet wird:

### protocol

<Option type="String" default="http">

Protokoll, das für die Kommunikation mit dem Treiberserver verwendet wird.

</Option>

### hostname

<Option type="String" default="0.0.0.0">

Host Ihres Treiberservers.

</Option>

### port

<Option type="Number" default="undefined">

Port, auf dem Ihr Treiberserver läuft.

</Option>

### path

<Option type="String" default="/">

Pfad zum Endpunkt des Treiberservers.

</Option>

### queryParams

<Option type="Object" default="undefined">

Query-Parameter, die an den Treiberserver weitergegeben werden.

</Option>

### user

<Option type="String" default="undefined">

Ihr Benutzername beim Cloud-Dienst (funktioniert nur für Konten bei [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) oder [TestMu AI](https://www.testmuai.com/)). Wenn gesetzt, legt WebdriverIO die Verbindungsoptionen automatisch für Sie fest. Wenn Sie keinen Cloud-Anbieter verwenden, kann dies zur Authentifizierung bei jedem anderen WebDriver-Backend genutzt werden.

</Option>

### key

<Option type="String" default="undefined">

Ihr Zugriffsschlüssel oder geheimer Schlüssel beim Cloud-Dienst (funktioniert nur für Konten bei [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) oder [TestMu AI](https://www.testmuai.com/)). Wenn gesetzt, legt WebdriverIO die Verbindungsoptionen automatisch für Sie fest. Wenn Sie keinen Cloud-Anbieter verwenden, kann dies zur Authentifizierung bei jedem anderen WebDriver-Backend genutzt werden.

</Option>

### capabilities

<Option type="Object" default="null">

Definiert die Capabilities, die Sie in Ihrer WebDriver-Session ausführen möchten. Weitere Details finden Sie im [WebDriver-Protokoll](https://w3c.github.io/webdriver/#capabilities).

Neben den WebDriver-basierten Capabilities können Sie browser- und herstellerspezifische Optionen anwenden, die eine tiefergehende Konfiguration des entfernten Browsers oder Geräts ermöglichen. Diese sind in den jeweiligen Herstellerdokumentationen beschrieben, z. B.:

- `goog:chromeOptions`: für [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: für [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: für [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: für [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: für [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: für [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Ein nützliches Hilfsmittel ist außerdem der [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) von Sauce Labs, mit dem Sie dieses Objekt erstellen können, indem Sie Ihre gewünschten Capabilities zusammenklicken.

</Option>
**Beispiel:**

```js
{
    browserName: 'chrome', // Optionen: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // Browserversion
    platformName: 'Windows 10' // Betriebssystemplattform
}
```

Wenn Sie Web- oder native Tests auf mobilen Geräten ausführen, unterscheiden sich die `capabilities` vom WebDriver-Protokoll. Weitere Details finden Sie in der [Appium-Dokumentation](https://appium.io/docs/en/latest/guides/caps/).

### logLevel

<Option type="String" default="info" values="trace | debug | info | warn | error | silent">

Ausführlichkeitsstufe der Protokollierung.

</Option>

### outputDir

<Option type="String" default="null">

Verzeichnis zum Speichern aller Logdateien des Testrunners (einschließlich Reporter-Logs und `wdio`-Logs). Wenn nicht gesetzt, werden alle Logs nach `stdout` gestreamt. Da die meisten Reporter dafür ausgelegt sind, nach `stdout` zu protokollieren, wird empfohlen, diese Option nur für bestimmte Reporter zu verwenden, bei denen es sinnvoller ist, den Bericht in eine Datei zu schreiben (wie zum Beispiel beim `junit`-Reporter).

Im Standalone-Modus ist das einzige von WebdriverIO erzeugte Log das `wdio`-Log.

</Option>

### connectionRetryTimeout

<Option type="Number" default="120000">

Timeout für jede WebDriver-Anfrage an einen Treiber oder ein Grid.

</Option>

### connectionRetryCount

<Option type="Number" default="3">

Maximale Anzahl an Wiederholungsversuchen für Anfragen an den Selenium-Server.

</Option>

### bidiResponseTimeout

<Option type="Number" default="180000">

Timeout (in ms), innerhalb dessen ein WebDriver-Bidi-Befehl eine Antwort vom Browser erhalten muss. Erhöhen Sie diesen Wert, wenn Sie Befehle ausführen, z. B. [`execute`](/docs/api/browser/execute), die berechtigterweise länger als der Standardwert brauchen, da WebdriverIO sonst das Warten aufgibt, bevor der Browser fertig ist.

`execute` stoppt außerdem beim `script`-Timeout der Session (standardmäßig 30 Sekunden, siehe [`setTimeout`](/docs/api/browser/setTimeout)). Für ein `script`-Timeout, das länger als `bidiResponseTimeout` ist, erhöhen Sie beide Werte.

</Option>

### bidiConnectTimeout

<Option type="Number" default="10000">

Timeout (in ms), innerhalb dessen der Browser die WebDriver-Bidi-Verbindung annehmen muss. Danach wird die Session mit WebDriver Classic fortgesetzt, und reine Bidi-Befehle wie [`mock`](/docs/api/browser/mock) schlagen fehl. Erhöhen Sie den Wert, wenn ein Browser, der beim Start ausgelastet ist, z. B. mehrere Browser, die gleichzeitig auf einem CI-Runner starten, die Verbindung verspätet annimmt.

Diese Option gilt für Sessions in Node.js. In einem Browser, zum Beispiel mit dem [Browser-Runner](/docs/runner#browser-runner), wartet die Verbindung, bis sie geöffnet wird oder fehlschlägt.

</Option>

### agent

<Option type="Object" default={`{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}`}>

Ermöglicht die Verwendung eines benutzerdefinierten ` http`/`https`/`http2`-[Agents](https://www.npmjs.com/package/got#agent) für Anfragen.

</Option>

### headers

<Option type="Object" default={`{}`}>

Geben Sie benutzerdefinierte `headers` an, die bei jeder WebDriver-Anfrage mitgesendet werden. Wenn Ihr Selenium Grid Basic Authentication erfordert, empfehlen wir, über diese Option einen `Authorization`-Header zu übergeben, um Ihre WebDriver-Anfragen zu authentifizieren, z. B.:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Benutzername und Passwort aus Umgebungsvariablen lesen
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Benutzername und Passwort mit einem Doppelpunkt als Trennzeichen kombinieren
const credentials = `${username}:${password}`;
// Die Zugangsdaten mit Base64 kodieren
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

</Option>

### transformRequest

<Option type="(RequestOptions) => RequestOptions" default="none">

Funktion, die die [HTTP-Anfrageoptionen](https://github.com/sindresorhus/got#options) abfängt, bevor eine WebDriver-Anfrage gesendet wird

</Option>

### transformResponse

<Option type="(Response, RequestOptions) => Response" default="none">

Funktion, die HTTP-Antwortobjekte abfängt, nachdem eine WebDriver-Antwort eingetroffen ist. Der Funktion wird das ursprüngliche Antwortobjekt als erstes und die zugehörigen `RequestOptions` als zweites Argument übergeben.

</Option>

### strictSSL

<Option type="Boolean" default="true">

Legt fest, ob ein gültiges SSL-Zertifikat nicht erforderlich ist.
Kann über die Umgebungsvariablen `STRICT_SSL` oder `strict_ssl` gesetzt werden.

</Option>

### enableDirectConnect

<Option type="Boolean" default="true">

Legt fest, ob die [Appium-Direktverbindungsfunktion](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) aktiviert wird.
Sie hat keine Wirkung, wenn die Antwort bei aktiviertem Flag nicht die passenden Schlüssel enthält.

</Option>

### cacheDir

<Option type="String" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

Der Pfad zum Stammverzeichnis des Caches. Dieses Verzeichnis wird verwendet, um alle Treiber zu speichern, die beim Versuch, eine Session zu starten, heruntergeladen werden.

</Option>

### maskingPatterns

<Option type="String" default="undefined">

Für eine sicherere Protokollierung können mit `maskingPatterns` gesetzte reguläre Ausdrücke sensible Informationen im Log verschleiern.
 - Das String-Format ist ein regulärer Ausdruck mit oder ohne Flags (z. B. `/.../i`), mehrere reguläre Ausdrücke werden durch Kommas getrennt.
 - Weitere Details zu Maskierungsmustern finden Sie im [Abschnitt „Masking Patterns“ in der README des WDIO Loggers](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

</Option>
**Beispiel:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

## WebdriverIO

Die folgenden Optionen (einschließlich der oben aufgeführten) können mit WebdriverIO im Standalone-Modus verwendet werden:

### automationProtocol

<Option type="String" default="webdriver">

Legen Sie das Protokoll fest, das Sie für Ihre Browserautomatisierung verwenden möchten. Derzeit wird nur [`webdriver`](https://www.npmjs.com/package/webdriver) unterstützt, da es die wichtigste Browserautomatisierungstechnologie ist, die WebdriverIO verwendet.

Wenn Sie den Browser mit einer anderen Automatisierungstechnologie steuern möchten, setzen Sie diese Eigenschaft auf einen Pfad, der zu einem Modul aufgelöst wird, das die folgende Schnittstelle erfüllt:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Startet eine Automatisierungs-Session und gibt eine WebdriverIO-[Monade](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * mit den entsprechenden Automatisierungsbefehlen zurück. Siehe das [webdriver](https://www.npmjs.com/package/webdriver)-Paket
     * als Referenzimplementierung
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO-Optionen
     * @param {Function} hook, der es ermöglicht, den Client zu verändern, bevor er von der Funktion freigegeben wird
     * @param {PropertyDescriptorMap} userPrototype ermöglicht es dem Benutzer, eigene Protokollbefehle hinzuzufügen
     * @param {Function} customCommandWrapper ermöglicht es, die Befehlsausführung zu verändern
     * @returns eine WebdriverIO-kompatible Client-Instanz
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * ermöglicht es dem Benutzer, sich an bestehende Sessions anzuhängen
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Ändert die Session-ID der Instanz und die Browser-Capabilities für die neue Session
     * direkt im übergebenen Browser-Objekt
     *
     * @optional
     * @param   {object} instance  das Objekt, das wir von einer neuen Browser-Session erhalten.
     * @returns {string}           die neue Session-ID des Browsers
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

</Option>

### baseUrl

<Option type="String" default="null">

Verkürzen Sie Aufrufe des `url`-Befehls, indem Sie eine Basis-URL festlegen.
- Wenn Ihr `url`-Parameter mit `/` beginnt, wird `baseUrl` vorangestellt (ohne den Pfad von `baseUrl`, falls vorhanden).
- Wenn Ihr `url`-Parameter ohne Schema oder `/` beginnt (wie `some/path`), wird die vollständige `baseUrl` direkt vorangestellt.

</Option>

### waitforTimeout

<Option type="Number" default="5000">

Standard-Timeout für alle `waitFor*`-Befehle. (Beachten Sie das kleingeschriebene `f` im Optionsnamen.) Dieses Timeout betrifft __nur__ Befehle, die mit `waitFor*` beginnen, und deren Standardwartezeit.

Um das Timeout für einen _Test_ zu erhöhen, lesen Sie bitte die Dokumentation des Frameworks.

</Option>

### waitforInterval

<Option type="Number" default="100">

Standardintervall, in dem alle `waitFor*`-Befehle prüfen, ob sich ein erwarteter Zustand (z. B. Sichtbarkeit) geändert hat.

</Option>

### strictSelectors

<Option type="Boolean" default="true">

Sorgt dafür, dass der Befehl [`$`](/docs/api/browser/$) einen `StrictSelectorError` wirft, wenn der angegebene Selektor zu mehr als einem Element aufgelöst wird, anstatt stillschweigend den ersten Treffer zu verwenden. `$$` ist davon nicht betroffen.

Sie können dies für eine einzelne Abfrage deaktivieren, indem Sie `{ strict: false }` als zweites Argument übergeben, z. B. `$('button', { strict: false })`.

Details finden Sie im Leitfaden zu [Selektoren](/docs/selectors#strict-mode).

</Option>

### maxSpyCollectedBodySize

<Option type="Number" default="10485760 (10MB)">

Maximale Größe des Antwort-Bodys (in Bytes), der bei Verwendung des Befehls [`mock`](/docs/api/browser/mock) zurückgegeben werden kann. Verwenden Sie `0`, um die Datenerfassung der überwachten Nutzdaten zu deaktivieren.

</Option>

### region

<Option type="String" default="us" values="us | eu | us-west-1 | eu-central-1 | us-east-4 | asia-south-2 | staging">

Wenn Sie auf Sauce Labs ausführen, können Sie wählen, Tests in verschiedenen Rechenzentren auszuführen.
Verwenden Sie die kurzen Regionsbezeichner `us` (Standard, entspricht `us-west-1`) oder `eu` (entspricht `eu-central-1`) oder direkt die vollständigen Regionsnamen.

__Hinweis:__ Dies hat nur eine Wirkung, wenn Sie die Optionen `user` und `key` angeben, die mit Ihrem Sauce-Labs-Konto verbunden sind.

</Option>
*(nur für VMs und/oder Emulatoren/Simulatoren, außer `us-east-4` und `asia-south-2`, die ausschließlich echte Geräte hosten)*

## Testrunner-Optionen

Die folgenden Optionen (einschließlich der oben aufgeführten) sind nur für die Ausführung von WebdriverIO mit dem WDIO-Testrunner definiert:

### specs

<Option type="(String | String[])[]" default="[]">

Definiert die Specs für die Testausführung. Sie können entweder ein Glob-Muster angeben, um mehrere Dateien auf einmal zu erfassen, oder ein Glob bzw. eine Reihe von Pfaden in ein Array einschließen, um sie innerhalb eines einzigen Worker-Prozesses auszuführen. Alle Pfade werden relativ zum Pfad der Konfigurationsdatei betrachtet.

</Option>

### exclude

<Option type="String[]" default="[]">

Schließt Specs von der Testausführung aus. Alle Pfade werden relativ zum Pfad der Konfigurationsdatei betrachtet.

</Option>

### suites

<Option type="Object" default={`{}`}>

Ein Objekt, das verschiedene Suites beschreibt, die Sie dann mit der Option `--suite` in der `wdio`-CLI angeben können.

</Option>

### capabilities

<Option type="Object|Object[]" default={`[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`}>

Entspricht dem oben beschriebenen Abschnitt `capabilities`, jedoch mit der Möglichkeit, entweder ein [Multiremote](/docs/multiremote)-Objekt oder mehrere WebDriver-Sessions in einem Array für die parallele Ausführung anzugeben.

Sie können dieselben hersteller- und browserspezifischen Capabilities anwenden, wie [oben](/docs/configuration#capabilities) definiert.

</Option>

### maxInstances

<Option type="Number" default="100">

Maximale Gesamtanzahl parallel laufender Worker.

__Hinweis:__ Der Wert kann bis zu `100` betragen, wenn die Tests bei externen Anbietern wie auf den Maschinen von Sauce Labs ausgeführt werden. Dort werden die Tests nicht auf einer einzelnen Maschine, sondern auf mehreren VMs ausgeführt. Wenn die Tests auf einem lokalen Entwicklungsrechner laufen sollen, verwenden Sie eine vernünftigere Zahl, z. B. `3`, `4` oder `5`. Im Wesentlichen ist dies die Anzahl der Browser, die gleichzeitig gestartet werden und Ihre Tests zur selben Zeit ausführen. Sie hängt also davon ab, wie viel RAM Ihr Rechner hat und wie viele andere Anwendungen auf Ihrem Rechner laufen.

Sie können `maxInstances` auch innerhalb Ihrer Capability-Objekte mit der Capability `wdio:maxInstances` anwenden. Dadurch wird die Anzahl paralleler Sessions für diese bestimmte Capability begrenzt.

</Option>

### maxInstancesPerCapability

<Option type="Number" default="100">

Maximale Gesamtanzahl parallel laufender Worker pro Capability.

</Option>

### injectGlobals

<Option type="Boolean" default="true">

Fügt die globalen Variablen von WebdriverIO (z. B. `browser`, `$` und `$$`) in die globale Umgebung ein.
Wenn Sie den Wert auf `false` setzen, sollten Sie aus `@wdio/globals` importieren, z. B.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Hinweis: WebdriverIO übernimmt nicht das Einfügen testframework-spezifischer globaler Variablen.

</Option>

### bail

<Option type="Number" default="0 (don't bail; run all tests)">

Wenn Ihr Testlauf nach einer bestimmten Anzahl fehlgeschlagener Tests abbrechen soll, verwenden Sie `bail`.
(Der Standardwert ist `0`, wodurch in jedem Fall alle Tests ausgeführt werden.) **Hinweis:** Ein Test umfasst in diesem Zusammenhang alle Tests innerhalb einer einzelnen Spec-Datei (bei Verwendung von Mocha oder Jasmine) bzw. alle Steps innerhalb einer Feature-Datei (bei Verwendung von Cucumber). Wenn Sie das Abbruchverhalten innerhalb der Tests einer einzelnen Testdatei steuern möchten, sehen Sie sich die verfügbaren [Framework](frameworks)-Optionen an.

</Option>

### specFileRetries

<Option type="Number" default="0">

Die Anzahl der Wiederholungen einer gesamten Spec-Datei, wenn sie als Ganzes fehlschlägt.

</Option>

### specFileRetriesDelay

<Option type="Number" default="0">

Verzögerung in Sekunden zwischen den Wiederholungsversuchen einer Spec-Datei

</Option>

### specFileRetriesDeferred

<Option type="Boolean" default="true">

Legt fest, ob wiederholte Spec-Dateien sofort wiederholt oder an das Ende der Warteschlange verschoben werden sollen.

</Option>

### groupLogsByTestSpec

<Option type="Boolean" default="false">

Wählen Sie die Ansicht der Log-Ausgabe.

Wenn auf `false` gesetzt, werden Logs aus verschiedenen Testdateien in Echtzeit ausgegeben. Bitte beachten Sie, dass dies bei paralleler Ausführung zu einer Vermischung der Log-Ausgaben verschiedener Dateien führen kann.

Wenn auf `true` gesetzt, werden Log-Ausgaben nach Test-Spec gruppiert und erst ausgegeben, wenn die Test-Spec abgeschlossen ist.

Standardmäßig ist der Wert auf `false` gesetzt, sodass Logs in Echtzeit ausgegeben werden.

</Option>

### autoAssertOnTestEnd

<Option type="Boolean" default="true">

Steuert, ob WebdriverIO am Ende jedes Tests automatisch alle Soft Assertions prüft. Wenn auf `true` gesetzt, werden alle angesammelten Soft Assertions automatisch geprüft und lassen den Test fehlschlagen, falls eine Assertion fehlgeschlagen ist. Wenn auf `false` gesetzt, müssen Sie die Assert-Methode manuell aufrufen, um Soft Assertions zu prüfen.

</Option>

### services

<Option type="String[]|Object[]" default="[]">

Services übernehmen eine bestimmte Aufgabe, um die Sie sich nicht kümmern möchten. Sie erweitern Ihr Test-Setup nahezu ohne Aufwand.

</Option>

### framework

<Option type="String" default="mocha" values="mocha | jasmine | cucumber">

Legt das Testframework fest, das vom WDIO-Testrunner verwendet werden soll.

</Option>

### mochaOpts, jasmineOpts and cucumberOpts

<Option type="Object" default={`{ timeout: 10000 }`}>

Spezifische frameworkbezogene Optionen. Welche Optionen verfügbar sind, entnehmen Sie der Dokumentation des Framework-Adapters. Mehr dazu erfahren Sie unter [Frameworks](frameworks).

</Option>

### cucumberFeaturesWithLineNumbers

<Option type="String[]" default="[]">

Liste von Cucumber-Features mit Zeilennummern (bei [Verwendung des Cucumber-Frameworks](./Frameworks.md#using-cucumber)).

</Option>

### reporters

<Option type="String[]|Object[]" default="[]">

Liste der zu verwendenden Reporter. Ein Reporter kann entweder ein String oder ein Array der Form
`['reporterName', { /* reporter options */}]` sein, wobei das erste Element ein String mit dem Namen des Reporters und das zweite Element ein Objekt mit Reporter-Optionen ist.

</Option>
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

<Option type="Number" default="100 (ms)">

Bestimmt, in welchem Intervall der Reporter prüfen soll, ob er synchronisiert ist, wenn er seine Logs asynchron meldet (z. B. wenn Logs an einen Drittanbieter gestreamt werden).

</Option>

### reporterSyncTimeout

<Option type="Number" default="5000 (ms)">

Bestimmt die maximale Zeit, die Reporter haben, um das Hochladen aller ihrer Logs abzuschließen, bevor der Testrunner einen Fehler wirft.

</Option>

### execArgv

<Option type="String[]" default="null">

Node-Argumente, die beim Starten von Kindprozessen angegeben werden.

</Option>

### cpuProf

<Option type="Boolean" default="false">

Aktiviert das CPU-Profiling für den Worker-Prozess. Das Profil wird automatisch erzeugt, wenn der Worker-Prozess beendet wird.

</Option>

### heapProf

<Option type="Boolean" default="false">

Aktiviert das Heap-Profiling für den Worker-Prozess. Der Snapshot wird automatisch erzeugt, wenn der Worker-Prozess beendet wird (verwendet den Sampling-Heap-Profiler).

</Option>

### profileOutputDir

<Option type="String" default="./profiles">

Verzeichnis, in dem die CPU-Profile (`.cpuprofile`) und Heap-Profile (`.heapprofile`) gespeichert werden.

</Option>

### filesToWatch

<Option type="String[]" default="[]">

Eine Liste von String-Mustern mit Glob-Unterstützung, die den Testrunner anweisen, zusätzlich weitere Dateien zu überwachen, z. B. Anwendungsdateien, wenn er mit dem Flag `--watch` ausgeführt wird. Standardmäßig überwacht der Testrunner bereits alle Spec-Dateien.

</Option>

### updateSnapshots

<Option type="'new' | 'all' | 'none'" default="none if not provided and tests run in CI, new if not provided, otherwise what's been provided">

Setzen Sie diesen Wert auf true, wenn Sie Ihre Snapshots aktualisieren möchten. Idealerweise als CLI-Parameter verwendet, z. B. `wdio run wdio.conf.js --s`.

</Option>

### resolveSnapshotPath

<Option type="(testPath: string, snapExtension: string) => string" default="stores snapshot files in __snapshots__ directory next to test file">

Überschreibt den Standardpfad für Snapshots. Zum Beispiel, um Snapshots neben den Testdateien zu speichern.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

</Option>

### tsConfigPath

<Option type="String" default="null">

WDIO verwendet `tsx`, um TypeScript-Dateien zu kompilieren. Ihre TSConfig wird automatisch im aktuellen Arbeitsverzeichnis erkannt, Sie können jedoch hier oder über die Umgebungsvariable TSX_TSCONFIG_PATH einen benutzerdefinierten Pfad angeben.

Siehe die `tsx`-Dokumentation: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

</Option>

### displayServerEnabled

<Option type="Boolean" default="true">

Startet unter Linux ein virtuelles Display für den Lauf, wenn weder `DISPLAY` noch `WAYLAND_DISPLAY` gesetzt ist. Setzen Sie den Wert auf `false`, wenn Sie headless oder ausschließlich auf einem Cloud-Dienst oder Remote-Grid ausführen. Die Option steuert nur, ob ein Display-Server gestartet wird: Ist nur `WAYLAND_DISPLAY` gesetzt, setzt der Testrunner trotzdem `XDG_SESSION_TYPE`, `GDK_BACKEND` und `ELECTRON_OZONE_PLATFORM_HINT` für den Lauf auf `wayland`. Siehe [Headless & Display Servers](/docs/headless-and-display-servers).

</Option>

### displayServer

<Option type="String" default="auto" values="auto | wayland | xvfb">

Welcher Display-Server gestartet werden soll. `auto` versucht Weston und weicht auf Xvfb aus, wenn Weston fehlt oder nicht startet. `wayland` und `xvfb` versuchen nur den jeweiligen Server.

</Option>

### displayServerAutoInstall

<Option type="Boolean" default="false">

Installiert einen fehlenden Display-Server mit dem Paketmanager des Systems, wenn keiner der installierten startet.

</Option>

### displayServerAutoInstallMode

<Option type="String" default="sudo" values="root | sudo">

Wie die eingebaute Installation ausgeführt wird: `root` installiert nur bei Ausführung als root, `sudo` verwendet nicht-interaktives `sudo -n`, wenn nicht als root ausgeführt wird, oder installiert ohne, wenn `sudo` nicht installiert ist.

</Option>

### displayServerAutoInstallCommand

<Option type="String | String[]">

Ein Befehl, der anstelle der eingebauten Installation ausgeführt wird, unverändert und ohne `sudo`. Er wird nur mit `displayServerAutoInstall: true` ausgeführt. Ein String wird in einer Shell ausgeführt, ein Array ohne Shell. Mit `auto` wird er zuerst für Weston ausgeführt und erneut für Xvfb nur dann, wenn Weston weiterhin nicht verfügbar ist oder nicht startet und Xvfb noch fehlt. Setzen Sie `displayServer` auf den Server, den der Befehl installiert, um den Versuch für den anderen Server zu überspringen.

</Option>

### displayServerWidth

<Option type="Number" default="1920">

Bildschirmbreite des virtuellen Displays in Pixeln.

</Option>

### displayServerHeight

<Option type="Number" default="1080">

Bildschirmhöhe des virtuellen Displays in Pixeln.

</Option>

### displayServerDepth

<Option type="Number" default="24">

Farbtiefe des virtuellen Displays. Nur Xvfb.

</Option>

## Hooks

Der WDIO-Testrunner ermöglicht es Ihnen, Hooks festzulegen, die zu bestimmten Zeitpunkten im Testlebenszyklus ausgelöst werden. Dies ermöglicht benutzerdefinierte Aktionen (z. B. einen Screenshot erstellen, wenn ein Test fehlschlägt).

Jeder Hook erhält als Parameter spezifische Informationen über den Lebenszyklus (z. B. Informationen über die Test-Suite oder den Test). Mehr über alle Hook-Eigenschaften erfahren Sie in [unserer Beispielkonfiguration](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Hinweis:** Einige Hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` und `onComplete`) werden in einem anderen Prozess ausgeführt und können daher keine globalen Daten mit den anderen Hooks teilen, die im Worker-Prozess laufen.

### onPrepare

Wird einmal ausgeführt, bevor alle Worker gestartet werden.

Parameter:

- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `param` (`object[]`): Liste der Capability-Details

### onWorkerStart

Wird ausgeführt, bevor ein Worker-Prozess gestartet wird, und kann verwendet werden, um einen bestimmten Service für diesen Worker zu initialisieren sowie Laufzeitumgebungen asynchron zu verändern.

Parameter:

- `cid` (`string`): Capability-ID (z. B. 0-0)
- `caps` (`object`): enthält die Capabilities für die Session, die im Worker gestartet wird
- `specs` (`string[]`): Specs, die im Worker-Prozess ausgeführt werden
- `args` (`object`): Objekt, das mit der Hauptkonfiguration zusammengeführt wird, sobald der Worker initialisiert ist
- `execArgv` (`string[]`): Liste von String-Argumenten, die an den Worker-Prozess übergeben werden

### onWorkerEnd

Wird direkt ausgeführt, nachdem ein Worker-Prozess beendet wurde.

Parameter:

- `cid` (`string`): Capability-ID (z. B. 0-0)
- `exitCode` (`number`): 0 - Erfolg, 1 - Fehlschlag. Ein Worker, der durch ein Signal beendet wurde, meldet stattdessen `128` + die Signalnummer, z. B. `139` für ein `SIGSEGV`
- `specs` (`string[]`): Specs, die im Worker-Prozess ausgeführt werden
- `retries` (`number`): Anzahl der verwendeten Wiederholungen auf Spec-Ebene, wie in [_„Add retries on a per-specfile basis“_](./Retry.md#add-retries-on-a-per-specfile-basis) definiert
- `signal` (`string`): Signal, das den Worker beendet hat, z. B. `SIGSEGV`, oder `null`, wenn er sich selbst beendet hat

### beforeSession

Wird direkt vor der Initialisierung der WebDriver-Session und des Testframeworks ausgeführt. Ermöglicht es Ihnen, Konfigurationen abhängig von der Capability oder Spec zu verändern.

Parameter:

- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `caps` (`object`): enthält die Capabilities für die Session, die im Worker gestartet wird
- `specs` (`string[]`): Specs, die im Worker-Prozess ausgeführt werden

### before

Wird ausgeführt, bevor die Testausführung beginnt. An diesem Punkt haben Sie Zugriff auf alle globalen Variablen wie `browser`. Dies ist der perfekte Ort, um benutzerdefinierte Befehle zu definieren.

Parameter:

- `caps` (`object`): enthält die Capabilities für die Session, die im Worker gestartet wird
- `specs` (`string[]`): Specs, die im Worker-Prozess ausgeführt werden
- `browser` (`object`): Instanz der erstellten Browser-/Geräte-Session

### beforeSuite

Hook, der ausgeführt wird, bevor die Suite startet (nur in Mocha/Jasmine)

Parameter:

- `suite` (`object`): Suite-Details

### beforeHook

Hook, der ausgeführt wird, *bevor* ein Hook innerhalb der Suite startet (z. B. vor dem Aufruf von beforeEach in Mocha)

Parameter:

- `test` (`object`): Testdetails
- `context` (`object`): Testkontext (entspricht dem World-Objekt in Cucumber)

### afterHook

Hook, der ausgeführt wird, *nachdem* ein Hook innerhalb der Suite endet (z. B. nach dem Aufruf von afterEach in Mocha)

Parameter:

- `test` (`object`): Testdetails
- `context` (`object`): Testkontext (entspricht dem World-Objekt in Cucumber)
- `result` (`object`): Hook-Ergebnis (enthält die Eigenschaften `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Funktion, die vor einem Test ausgeführt wird (nur in Mocha/Jasmine).

Parameter:

- `test` (`object`): Testdetails
- `context` (`object`): Scope-Objekt, mit dem der Test ausgeführt wurde

### beforeCommand

Läuft, bevor ein WebdriverIO-Befehl ausgeführt wird. Bei einem Element-Befehl läuft er, bevor WebdriverIO auf das Element wartet (siehe [Auto-waiting](./AutoWait.md)).

Parameter:

- `commandName` (`string`): Befehlsname
- `args` (`*`): Argumente, die der Befehl erhalten würde

### afterCommand

Läuft, nachdem ein WebdriverIO-Befehl ausgeführt wurde. Bei einem Element-Befehl läuft er nach dem Warten auf das Element. Wenn WebdriverIO einen Element-Befehl wiederholt (zum Beispiel nach einem Stale Element), erhält der Hook das Ergebnis oder den Fehler des letzten Versuchs.

Parameter:

- `commandName` (`string`): Befehlsname
- `args` (`*`): Argumente, die der Befehl erhalten würde
- `result` (`*`): Ergebnis des Befehls
- `error` (`Error`): Fehlerobjekt, falls vorhanden

### afterTest

Funktion, die ausgeführt wird, nachdem ein Test (in Mocha/Jasmine) endet. Sie läuft auch, nachdem ein Test ein Timeout überschritten hat. Bei Mocha startet der nächste Test, nachdem dieser Hook beendet ist (Mocha wartet darauf bis zu einem weiteren Timeout des Tests, siehe [Timeouts](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks)).

Parameter:

- `test` (`object`): Testdetails
- `context` (`object`): Scope-Objekt, mit dem der Test ausgeführt wurde
- `result.error` (`Error`): Fehlerobjekt, falls der Test fehlschlägt, andernfalls `undefined`
- `result.result` (`Any`): Rückgabeobjekt der Testfunktion
- `result.duration` (`Number`): Dauer des Tests
- `result.passed` (`Boolean`): true, wenn der Test bestanden wurde, andernfalls false
- `result.retries` (`Object`): Informationen über Wiederholungen einzelner Tests, wie für [Mocha und Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) sowie [Cucumber](./Retry.md#rerunning-in-cucumber) definiert, z. B. `{ attempts: 0, limit: 0 }`, siehe
- `result` (`object`): Hook-Ergebnis (enthält die Eigenschaften `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook, der ausgeführt wird, nachdem die Suite beendet ist (nur in Mocha/Jasmine)

Parameter:

- `suite` (`object`): Suite-Details

### after

Wird ausgeführt, nachdem alle Tests abgeschlossen sind. Sie haben weiterhin Zugriff auf alle globalen Variablen aus dem Test.

Parameter:

- `result` (`number`): 0 - Test bestanden, 1 - Test fehlgeschlagen
- `caps` (`object`): enthält die Capabilities für die Session, die im Worker gestartet wird
- `specs` (`string[]`): Specs, die im Worker-Prozess ausgeführt werden

### afterSession

Wird direkt nach dem Beenden der WebDriver-Session ausgeführt.

Parameter:

- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `caps` (`object`): enthält die Capabilities für die Session, die im Worker gestartet wird
- `specs` (`string[]`): Specs, die im Worker-Prozess ausgeführt werden

### onComplete

Wird ausgeführt, nachdem alle Worker heruntergefahren wurden und der Prozess kurz vor dem Beenden steht. Ein im onComplete-Hook geworfener Fehler führt dazu, dass der Testlauf fehlschlägt.

Parameter:

- `exitCode` (`number`): 0 - Erfolg, 1 - Fehlschlag
- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `caps` (`object`): enthält die Capabilities für die Session, die im Worker gestartet wird
- `result` (`object`): Ergebnisobjekt mit den Testergebnissen

### onReload

Wird ausgeführt, wenn ein Refresh stattfindet.

Parameter:

- `oldSessionId` (`string`): Session-ID der alten Session
- `newSessionId` (`string`): Session-ID der neuen Session

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
- `result` (`object`): Ergebnisobjekt mit den Szenarioergebnissen
- `result.passed` (`boolean`): true, wenn das Szenario bestanden wurde
- `result.error` (`string`): Fehler-Stack, falls das Szenario fehlgeschlagen ist
- `result.duration` (`number`): Dauer des Szenarios in Millisekunden
- `context` (`object`): Cucumber-World-Objekt

### beforeStep

Läuft vor einem Cucumber-Step.

Parameter:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber-Step-Objekt
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber-Szenario-Objekt
- `context` (`object`): Cucumber-World-Objekt

### afterStep

Läuft nach einem Cucumber-Step.

Parameter:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber-Step-Objekt
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber-Szenario-Objekt
- `result`: (`object`): Ergebnisobjekt mit den Step-Ergebnissen
- `result.passed` (`boolean`): true, wenn das Szenario bestanden wurde
- `result.error` (`string`): Fehler-Stack, falls das Szenario fehlgeschlagen ist
- `result.duration` (`number`): Dauer des Szenarios in Millisekunden
- `context` (`object`): Cucumber-World-Objekt

### beforeAssertion

Hook, der ausgeführt wird, bevor eine WebdriverIO-Assertion stattfindet.

Parameter:

- `params`: Assertion-Informationen
- `params.matcherName` (`string`): Name des Matchers, den der Test aufgerufen hat (z. B. `toHaveTitle`). Bei einem Alias ist es der Name des Alias (z. B. `toBeExisting`, nicht `toExist`).
- `params.expectedValue`: Wert, der an den Matcher übergeben wird
- `params.options`: Assertion-Optionen

### afterAssertion

Hook, der ausgeführt wird, nachdem eine WebdriverIO-Assertion stattgefunden hat.

Parameter:

- `params`: Assertion-Informationen
- `params.matcherName` (`string`): Name des Matchers, den der Test aufgerufen hat (z. B. `toHaveTitle`). Bei einem Alias ist es der Name des Alias (z. B. `toBeExisting`, nicht `toExist`).
- `params.expectedValue`: Wert, der an den Matcher übergeben wird
- `params.options`: Assertion-Optionen
- `params.result` (`object`): Ergebnis des Matchers, mit `pass` (`boolean`) und `message()`. `pass` ist `true`, wenn der Wert dem erwarteten Wert entspricht, auch mit `.not`: Mit `.not` ist die Assertion erfolgreich, wenn `pass` `false` ist.