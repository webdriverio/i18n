---
id: configuration
title: Konfiguration
description: "Hier findest du alle Konfigurationsoptionen für WebDriver, WebdriverIO im Standalone-Modus und den WDIO-Testrunner, einschließlich aller Testrunner-Hooks."
---

Je nach [Setup-Typ](/docs/setuptypes) (z. B. bei Verwendung der reinen Protokoll-Bindings, von WebdriverIO als Standalone-Paket oder des WDIO-Testrunners) steht ein unterschiedlicher Satz von Optionen zur Verfügung, um die Umgebung zu steuern.

## WebDriver-Optionen

Die folgenden Optionen sind definiert, wenn das Protokollpaket [`webdriver`](https://www.npmjs.com/package/webdriver) verwendet wird:

### protocol

<Option type="String" default="http">

Protokoll, das für die Kommunikation mit dem Treiberserver verwendet wird.

</Option>

### hostname

<Option type="String" default="0.0.0.0">

Host deines Treiberservers.

</Option>

### port

<Option type="Number" default="undefined">

Port, auf dem dein Treiberserver läuft.

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

Dein Benutzername beim Cloud-Dienst (funktioniert nur für Konten bei [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) oder [TestMu AI](https://www.testmuai.com/)). Wenn gesetzt, konfiguriert WebdriverIO die Verbindungsoptionen automatisch für dich. Wenn du keinen Cloud-Anbieter verwendest, kann dies zur Authentifizierung bei jedem anderen WebDriver-Backend genutzt werden.

</Option>

### key

<Option type="String" default="undefined">

Dein Access Key oder Secret Key beim Cloud-Dienst (funktioniert nur für Konten bei [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) oder [TestMu AI](https://www.testmuai.com/)). Wenn gesetzt, konfiguriert WebdriverIO die Verbindungsoptionen automatisch für dich. Wenn du keinen Cloud-Anbieter verwendest, kann dies zur Authentifizierung bei jedem anderen WebDriver-Backend genutzt werden.

</Option>

### capabilities

<Option type="Object" default="null">

Definiert die Capabilities, die du in deiner WebDriver-Session ausführen möchtest. Weitere Details findest du im [WebDriver-Protokoll](https://w3c.github.io/webdriver/#capabilities).

Neben den WebDriver-basierten Capabilities kannst du browser- und herstellerspezifische Optionen angeben, die eine tiefergehende Konfiguration des Remote-Browsers oder -Geräts ermöglichen. Diese sind in der jeweiligen Herstellerdokumentation beschrieben, z. B.:

- `goog:chromeOptions`: für [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: für [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: für [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: für [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: für [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: für [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Ein nützliches Hilfsmittel ist außerdem der [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) von Sauce Labs, mit dem du dieses Objekt erstellen kannst, indem du dir die gewünschten Capabilities zusammenklickst.

</Option>
**Beispiel:**

```js
{
    browserName: 'chrome', // Optionen: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // Browserversion
    platformName: 'Windows 10' // Betriebssystem-Plattform
}
```

Wenn du Web- oder native Tests auf mobilen Geräten ausführst, unterscheiden sich die `capabilities` vom WebDriver-Protokoll. Weitere Details findest du in der [Appium-Dokumentation](https://appium.io/docs/en/latest/guides/caps/).

### logLevel

<Option type="String" default="info" values="trace | debug | info | warn | error | silent">

Ausführlichkeitsgrad der Protokollierung.

</Option>

### outputDir

<Option type="String" default="null">

Verzeichnis, in dem alle Logdateien des Testrunners gespeichert werden (einschließlich Reporter-Logs und `wdio`-Logs). Wenn nicht gesetzt, werden alle Logs an `stdout` gestreamt. Da die meisten Reporter dafür ausgelegt sind, nach `stdout` zu loggen, wird empfohlen, diese Option nur für bestimmte Reporter zu verwenden, bei denen es sinnvoller ist, den Bericht in eine Datei zu schreiben (wie zum Beispiel beim `junit`-Reporter).

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

Timeout (in ms), innerhalb dessen ein WebDriver-Bidi-Befehl eine Antwort vom Browser erhalten muss. Erhöhe diesen Wert, wenn du Befehle ausführst, z. B. [`execute`](/docs/api/browser/execute), die berechtigterweise länger als der Standardwert brauchen, um aufgelöst zu werden – andernfalls hört WebdriverIO auf zu warten, bevor der Browser fertig ist.

</Option>

### agent

<Option type="Object" default={`{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}`}>

Ermöglicht dir, einen benutzerdefinierten` http`/`https`/`http2`-[Agent](https://www.npmjs.com/package/got#agent) für Anfragen zu verwenden.

</Option>

### headers

<Option type="Object" default={`{}`}>

Gibt benutzerdefinierte `headers` an, die bei jeder WebDriver-Anfrage mitgesendet werden. Wenn dein Selenium Grid eine Basic-Authentifizierung erfordert, empfehlen wir, über diese Option einen `Authorization`-Header zu übergeben, um deine WebDriver-Anfragen zu authentifizieren, z. B.:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Benutzername und Passwort aus Umgebungsvariablen lesen
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Benutzername und Passwort mit einem Doppelpunkt als Trennzeichen kombinieren
const credentials = `${username}:${password}`;
// Zugangsdaten mit Base64 kodieren
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

Legt fest, ob das [Appium-Direktverbindungsfeature](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) aktiviert wird.
Es hat keine Wirkung, wenn die Antwort bei aktiviertem Flag nicht die passenden Schlüssel enthält.

</Option>

### cacheDir

<Option type="String" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

Der Pfad zum Stammverzeichnis des Caches. Dieses Verzeichnis wird verwendet, um alle Treiber zu speichern, die beim Versuch, eine Session zu starten, heruntergeladen werden.

</Option>

### maskingPatterns

<Option type="String" default="undefined">

Für eine sicherere Protokollierung können mit `maskingPatterns` gesetzte reguläre Ausdrücke sensible Informationen im Log unkenntlich machen.
 - Das String-Format ist ein regulärer Ausdruck mit oder ohne Flags (z. B. `/.../i`); mehrere reguläre Ausdrücke werden durch Kommas getrennt.
 - Weitere Details zu Masking Patterns findest du im [Abschnitt „Masking Patterns“ in der README des WDIO Loggers](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

Definiert das Protokoll, das du für deine Browserautomatisierung verwenden möchtest. Derzeit wird nur [`webdriver`](https://www.npmjs.com/package/webdriver) unterstützt, da dies die zentrale Browserautomatisierungstechnologie ist, die WebdriverIO verwendet.

Wenn du den Browser mit einer anderen Automatisierungstechnologie steuern möchtest, setze diese Eigenschaft auf einen Pfad, der zu einem Modul aufgelöst wird, das die folgende Schnittstelle implementiert:

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
     * @param {Function} hook, mit dem der Client verändert werden kann, bevor er von der Funktion zurückgegeben wird
     * @param {PropertyDescriptorMap} userPrototype ermöglicht es Benutzern, eigene Protokollbefehle hinzuzufügen
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
     * ermöglicht es Benutzern, sich an bestehende Sessions anzuhängen
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

Verkürzt Aufrufe des `url`-Befehls durch das Setzen einer Basis-URL.
- Wenn dein `url`-Parameter mit `/` beginnt, wird `baseUrl` vorangestellt (außer dem Pfad von `baseUrl`, falls vorhanden).
- Wenn dein `url`-Parameter ohne Schema oder `/` beginnt (wie `some/path`), wird die vollständige `baseUrl` direkt vorangestellt.

</Option>

### waitforTimeout

<Option type="Number" default="5000">

Standard-Timeout für alle `waitFor*`-Befehle. (Beachte das kleingeschriebene `f` im Optionsnamen.) Dieser Timeout wirkt sich __nur__ auf Befehle aus, die mit `waitFor*` beginnen, und deren Standardwartezeit.

Um den Timeout für einen _Test_ zu erhöhen, sieh dir bitte die Dokumentation des Frameworks an.

</Option>

### waitforInterval

<Option type="Number" default="100">

Standardintervall, in dem alle `waitFor*`-Befehle prüfen, ob sich ein erwarteter Zustand (z. B. Sichtbarkeit) geändert hat.

</Option>

### strictSelectors

<Option type="Boolean" default="true">

Bewirkt, dass der Befehl [`$`](/docs/api/browser/$) einen `StrictSelectorError` wirft, wenn der angegebene Selektor zu mehr als einem Element aufgelöst wird, anstatt stillschweigend den ersten Treffer zu verwenden. `$$` ist davon nicht betroffen.

Du kannst dies für eine einzelne Abfrage deaktivieren, indem du `{ strict: false }` als zweites Argument übergibst, z. B. `$('button', { strict: false })`.

Details findest du im Leitfaden zu [Selektoren](/docs/selectors#strict-mode).

</Option>

### maxSpyCollectedBodySize

<Option type="Number" default="10485760 (10MB)">

Maximale Größe des Antwort-Bodys (in Bytes), die bei Verwendung des Befehls [`mock`](/docs/api/browser/mock) zurückgegeben werden kann. Verwende `0`, um die Datenerfassung der ausgespähten Nutzdaten zu deaktivieren.

</Option>

### region

<Option type="String" default="us" values="us | eu | us-west-1 | eu-central-1 | us-east-4 | asia-south-2 | staging">

Wenn du auf Sauce Labs testest, kannst du Tests in verschiedenen Rechenzentren ausführen.
Verwende die kurzen Regionsbezeichner `us` (Standard, entspricht `us-west-1`) oder `eu` (entspricht `eu-central-1`) oder direkt die vollständigen Regionsnamen.

__Hinweis:__ Dies hat nur eine Wirkung, wenn du die Optionen `user` und `key` angibst, die mit deinem Sauce-Labs-Konto verknüpft sind.

</Option>
*(nur für VMs und/oder Emulatoren/Simulatoren, außer `us-east-4` und `asia-south-2`, die ausschließlich echte Geräte bereitstellen)*

## Testrunner-Optionen

Die folgenden Optionen (einschließlich der oben aufgeführten) sind nur für die Ausführung von WebdriverIO mit dem WDIO-Testrunner definiert:

### specs

<Option type="(String | String[])[]" default="[]">

Definiert die Specs für die Testausführung. Du kannst entweder ein Glob-Muster angeben, um mehrere Dateien auf einmal abzudecken, oder ein Glob bzw. eine Reihe von Pfaden in ein Array packen, um sie innerhalb eines einzigen Worker-Prozesses auszuführen. Alle Pfade werden relativ zum Pfad der Konfigurationsdatei interpretiert.

</Option>

### exclude

<Option type="String[]" default="[]">

Schließt Specs von der Testausführung aus. Alle Pfade werden relativ zum Pfad der Konfigurationsdatei interpretiert.

</Option>

### suites

<Option type="Object" default={`{}`}>

Ein Objekt, das verschiedene Suites beschreibt, die du anschließend mit der Option `--suite` in der `wdio`-CLI angeben kannst.

</Option>

### capabilities

<Option type="Object|Object[]" default={`[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`}>

Entspricht dem oben beschriebenen Abschnitt `capabilities`, jedoch mit der Möglichkeit, entweder ein [Multiremote](/docs/multiremote)-Objekt oder mehrere WebDriver-Sessions in einem Array für die parallele Ausführung anzugeben.

Du kannst dieselben hersteller- und browserspezifischen Capabilities verwenden, wie [oben](/docs/configuration#capabilities) definiert.

</Option>

### maxInstances

<Option type="Number" default="100">

Maximale Gesamtzahl parallel laufender Worker.

__Hinweis:__ Der Wert kann bis zu `100` betragen, wenn die Tests auf Maschinen externer Anbieter wie Sauce Labs ausgeführt werden. Dort werden die Tests nicht auf einer einzelnen Maschine, sondern auf mehreren VMs ausgeführt. Wenn die Tests auf einem lokalen Entwicklungsrechner laufen sollen, verwende einen sinnvolleren Wert wie `3`, `4` oder `5`. Im Wesentlichen ist dies die Anzahl der Browser, die gleichzeitig gestartet werden und deine Tests zur selben Zeit ausführen. Sie hängt also davon ab, wie viel RAM dein Rechner hat und wie viele andere Anwendungen darauf laufen.

Du kannst `maxInstances` auch innerhalb deiner Capability-Objekte über die Capability `wdio:maxInstances` anwenden. Dadurch wird die Anzahl paralleler Sessions für diese bestimmte Capability begrenzt.

</Option>

### maxInstancesPerCapability

<Option type="Number" default="100">

Maximale Gesamtzahl parallel laufender Worker pro Capability.

</Option>

### injectGlobals

<Option type="Boolean" default="true">

Fügt die globalen Variablen von WebdriverIO (z. B. `browser`, `$` und `$$`) in die globale Umgebung ein.
Wenn du dies auf `false` setzt, solltest du sie aus `@wdio/globals` importieren, z. B.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Hinweis: WebdriverIO kümmert sich nicht um das Einfügen von globalen Variablen, die spezifisch für das Testframework sind.

</Option>

### bail

<Option type="Number" default="0 (don't bail; run all tests)">

Wenn dein Testlauf nach einer bestimmten Anzahl fehlgeschlagener Tests abbrechen soll, verwende `bail`.
(Der Standardwert ist `0`, wodurch in jedem Fall alle Tests ausgeführt werden.) **Hinweis:** Ein Test umfasst in diesem Zusammenhang alle Tests innerhalb einer einzelnen Spec-Datei (bei Verwendung von Mocha oder Jasmine) oder alle Steps innerhalb einer Feature-Datei (bei Verwendung von Cucumber). Wenn du das Abbruchverhalten innerhalb der Tests einer einzelnen Testdatei steuern möchtest, sieh dir die verfügbaren [Framework](frameworks)-Optionen an.

</Option>

### specFileRetries

<Option type="Number" default="0">

Wie oft eine komplette Spec-Datei wiederholt werden soll, wenn sie als Ganzes fehlschlägt.

</Option>

### specFileRetriesDelay

<Option type="Number" default="0">

Verzögerung in Sekunden zwischen den Wiederholungsversuchen einer Spec-Datei

</Option>

### specFileRetriesDeferred

<Option type="Boolean" default="true">

Legt fest, ob wiederholte Spec-Dateien sofort wiederholt oder ans Ende der Warteschlange verschoben werden sollen.

</Option>

### groupLogsByTestSpec

<Option type="Boolean" default="false">

Wählt die Ansicht der Log-Ausgabe.

Wenn auf `false` gesetzt, werden Logs aus verschiedenen Testdateien in Echtzeit ausgegeben. Bitte beachte, dass sich dadurch bei paralleler Ausführung die Log-Ausgaben verschiedener Dateien vermischen können.

Wenn auf `true` gesetzt, werden die Log-Ausgaben nach Test-Spec gruppiert und erst ausgegeben, wenn die Test-Spec abgeschlossen ist.

Standardmäßig ist der Wert `false`, sodass Logs in Echtzeit ausgegeben werden.

</Option>

### autoAssertOnTestEnd

<Option type="Boolean" default="true">

Steuert, ob WebdriverIO am Ende jedes Tests automatisch alle Soft Assertions auswertet. Wenn auf `true` gesetzt, werden alle gesammelten Soft Assertions automatisch geprüft und führen zum Fehlschlagen des Tests, falls eine Assertion fehlgeschlagen ist. Wenn auf `false` gesetzt, musst du die Assert-Methode manuell aufrufen, um Soft Assertions zu prüfen.

</Option>

### services

<Option type="String[]|Object[]" default="[]">

Services übernehmen eine bestimmte Aufgabe, um die du dich nicht kümmern möchtest. Sie erweitern dein Test-Setup nahezu ohne Aufwand.

</Option>

### framework

<Option type="String" default="mocha" values="mocha | jasmine | cucumber">

Definiert das Testframework, das vom WDIO-Testrunner verwendet werden soll.

</Option>

### mochaOpts, jasmineOpts und cucumberOpts

<Option type="Object" default={`{ timeout: 10000 }`}>

Spezifische frameworkbezogene Optionen. Welche Optionen verfügbar sind, findest du in der Dokumentation des jeweiligen Framework-Adapters. Mehr dazu unter [Frameworks](frameworks).

</Option>

### cucumberFeaturesWithLineNumbers

<Option type="String[]" default="[]">

Liste von Cucumber-Features mit Zeilennummern (bei [Verwendung des Cucumber-Frameworks](./Frameworks.md#using-cucumber)).

</Option>

### reporters

<Option type="String[]|Object[]" default="[]">

Liste der zu verwendenden Reporter. Ein Reporter kann entweder ein String oder ein Array der Form
`['reporterName', { /* reporter options */}]` sein, wobei das erste Element ein String mit dem Reporternamen und das zweite Element ein Objekt mit Reporter-Optionen ist.

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

Legt fest, in welchem Intervall die Reporter prüfen sollen, ob sie synchronisiert sind, wenn sie ihre Logs asynchron melden (z. B. wenn Logs an einen Drittanbieter gestreamt werden).

</Option>

### reporterSyncTimeout

<Option type="Number" default="5000 (ms)">

Legt die maximale Zeit fest, die Reporter haben, um das Hochladen aller ihrer Logs abzuschließen, bevor der Testrunner einen Fehler wirft.

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

Eine Liste von String-Mustern mit Glob-Unterstützung, die den Testrunner anweisen, zusätzlich weitere Dateien zu beobachten, z. B. Anwendungsdateien, wenn er mit dem Flag `--watch` ausgeführt wird. Standardmäßig beobachtet der Testrunner bereits alle Spec-Dateien.

</Option>

### updateSnapshots

<Option type="'new' | 'all' | 'none'" default="none if not provided and tests run in CI, new if not provided, otherwise what's been provided">

Auf true setzen, wenn du deine Snapshots aktualisieren möchtest. Idealerweise als Teil eines CLI-Parameters verwendet, z. B. `wdio run wdio.conf.js --s`.

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

WDIO verwendet `tsx`, um TypeScript-Dateien zu kompilieren. Deine TSConfig wird automatisch im aktuellen Arbeitsverzeichnis erkannt, du kannst hier aber einen benutzerdefinierten Pfad angeben oder die Umgebungsvariable TSX_TSCONFIG_PATH setzen.

Siehe die `tsx`-Dokumentation: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

</Option>

### displayServerEnabled

<Option type="Boolean" default="true">

Startet unter Linux ein virtuelles Display für den Testlauf, wenn weder `DISPLAY` noch `WAYLAND_DISPLAY` gesetzt ist. Setze dies auf `false`, wenn du headless oder ausschließlich auf einem Cloud-Dienst oder Remote-Grid testest. Die Option steuert nur, ob ein Display-Server gestartet wird: Ist nur `WAYLAND_DISPLAY` gesetzt, setzt der Testrunner für den Lauf trotzdem `XDG_SESSION_TYPE`, `GDK_BACKEND` und `ELECTRON_OZONE_PLATFORM_HINT` auf `wayland`. Siehe [Headless & Display-Server](/docs/headless-and-display-servers).

</Option>

### displayServer

<Option type="String" default="auto" values="auto | wayland | xvfb">

Welcher Display-Server gestartet werden soll. `auto` versucht es mit Weston und greift auf Xvfb zurück, wenn Weston fehlt oder nicht startet. `wayland` und `xvfb` versuchen nur den jeweiligen Server.

</Option>

### displayServerAutoInstall

<Option type="Boolean" default="false">

Installiert einen fehlenden Display-Server über den Paketmanager des Systems, wenn keiner der installierten startet.

</Option>

### displayServerAutoInstallMode

<Option type="String" default="sudo" values="root | sudo">

Wie die integrierte Installation abläuft: `root` installiert nur, wenn der Prozess als root läuft; `sudo` verwendet das nicht-interaktive `sudo -n`, wenn nicht als root ausgeführt, oder installiert ohne `sudo`, wenn `sudo` nicht installiert ist.

</Option>

### displayServerAutoInstallCommand

<Option type="String | String[]">

Ein Befehl, der anstelle der integrierten Installation ausgeführt wird – unverändert und ohne `sudo`. Er wird nur mit `displayServerAutoInstall: true` ausgeführt. Ein String wird in einer Shell ausgeführt, ein Array ohne Shell. Bei `auto` wird er zuerst für Weston ausgeführt und erneut für Xvfb nur dann, wenn Weston weiterhin nicht verfügbar ist oder nicht startet und Xvfb noch fehlt. Setze `displayServer` auf den Server, den der Befehl installiert, um den Versuch mit dem anderen Server zu überspringen.

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

Farbtiefe des virtuellen Displays. Nur für Xvfb.

</Option>

## Hooks

Der WDIO-Testrunner ermöglicht es dir, Hooks zu setzen, die zu bestimmten Zeitpunkten im Test-Lebenszyklus ausgelöst werden. Dies ermöglicht benutzerdefinierte Aktionen (z. B. einen Screenshot aufnehmen, wenn ein Test fehlschlägt).

Jeder Hook erhält als Parameter spezifische Informationen über den Lebenszyklus (z. B. Informationen über die Test-Suite oder den Test). Mehr über alle Hook-Eigenschaften erfährst du in [unserer Beispielkonfiguration](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Hinweis:** Einige Hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` und `onComplete`) werden in einem anderen Prozess ausgeführt und können daher keine globalen Daten mit den anderen Hooks teilen, die im Worker-Prozess laufen.

### onPrepare

Wird einmal ausgeführt, bevor alle Worker gestartet werden.

Parameter:

- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `param` (`object[]`): Liste der Capability-Details

### onWorkerStart

Wird ausgeführt, bevor ein Worker-Prozess gestartet wird, und kann verwendet werden, um einen bestimmten Service für diesen Worker zu initialisieren sowie Laufzeitumgebungen asynchron anzupassen.

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
- `exitCode` (`number`): 0 – Erfolg, 1 – Fehlschlag. Ein Worker, der durch ein Signal beendet wurde, meldet stattdessen `128` + die Signalnummer, z. B. `139` bei einem `SIGSEGV`
- `specs` (`string[]`): Specs, die im Worker-Prozess ausgeführt werden
- `retries` (`number`): Anzahl der verwendeten Wiederholungen auf Spec-Ebene, wie in [_„Wiederholungen pro Spec-Datei hinzufügen“_](./Retry.md#add-retries-on-a-per-specfile-basis) definiert
- `signal` (`string`): Signal, das den Worker beendet hat, z. B. `SIGSEGV`, oder `null`, wenn er sich selbst beendet hat

### beforeSession

Wird direkt vor der Initialisierung der WebDriver-Session und des Testframeworks ausgeführt. Damit kannst du Konfigurationen abhängig von der Capability oder Spec anpassen.

Parameter:

- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `caps` (`object`): enthält die Capabilities für die Session, die im Worker gestartet wird
- `specs` (`string[]`): Specs, die im Worker-Prozess ausgeführt werden

### before

Wird ausgeführt, bevor die Testausführung beginnt. Zu diesem Zeitpunkt hast du Zugriff auf alle globalen Variablen wie `browser`. Es ist der perfekte Ort, um benutzerdefinierte Befehle zu definieren.

Parameter:

- `caps` (`object`): enthält die Capabilities für die Session, die im Worker gestartet wird
- `specs` (`string[]`): Specs, die im Worker-Prozess ausgeführt werden
- `browser` (`object`): Instanz der erstellten Browser-/Geräte-Session

### beforeSuite

Hook, der ausgeführt wird, bevor die Suite startet (nur in Mocha/Jasmine)

Parameter:

- `suite` (`object`): Details der Suite

### beforeHook

Hook, der ausgeführt wird, *bevor* ein Hook innerhalb der Suite startet (läuft z. B. vor dem Aufruf von beforeEach in Mocha)

Parameter:

- `test` (`object`): Details des Tests
- `context` (`object`): Testkontext (entspricht dem World-Objekt in Cucumber)

### afterHook

Hook, der ausgeführt wird, *nachdem* ein Hook innerhalb der Suite endet (läuft z. B. nach dem Aufruf von afterEach in Mocha)

Parameter:

- `test` (`object`): Details des Tests
- `context` (`object`): Testkontext (entspricht dem World-Objekt in Cucumber)
- `result` (`object`): Hook-Ergebnis (enthält die Eigenschaften `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Funktion, die vor einem Test ausgeführt wird (nur in Mocha/Jasmine).

Parameter:

- `test` (`object`): Details des Tests
- `context` (`object`): Scope-Objekt, mit dem der Test ausgeführt wurde

### beforeCommand

Wird ausgeführt, bevor ein WebdriverIO-Befehl ausgeführt wird.

Parameter:

- `commandName` (`string`): Name des Befehls
- `args` (`*`): Argumente, die der Befehl erhalten würde

### afterCommand

Wird ausgeführt, nachdem ein WebdriverIO-Befehl ausgeführt wurde.

Parameter:

- `commandName` (`string`): Name des Befehls
- `args` (`*`): Argumente, die der Befehl erhalten würde
- `result` (`*`): Ergebnis des Befehls
- `error` (`Error`): Fehlerobjekt, falls vorhanden

### afterTest

Funktion, die ausgeführt wird, nachdem ein Test (in Mocha/Jasmine) beendet ist.

Parameter:

- `test` (`object`): Details des Tests
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

- `suite` (`object`): Details der Suite

### after

Wird ausgeführt, nachdem alle Tests abgeschlossen sind. Du hast weiterhin Zugriff auf alle globalen Variablen aus dem Test.

Parameter:

- `result` (`number`): 0 – Test bestanden, 1 – Test fehlgeschlagen
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

- `exitCode` (`number`): 0 – Erfolg, 1 – Fehlschlag
- `config` (`object`): WebdriverIO-Konfigurationsobjekt
- `caps` (`object`): enthält die Capabilities für die Session, die im Worker gestartet wird
- `result` (`object`): Ergebnisobjekt mit den Testergebnissen

### onReload

Wird ausgeführt, wenn ein Neuladen stattfindet.

Parameter:

- `oldSessionId` (`string`): Session-ID der alten Session
- `newSessionId` (`string`): Session-ID der neuen Session

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
- `result` (`object`): Ergebnisobjekt mit den Szenarioergebnissen
- `result.passed` (`boolean`): true, wenn das Szenario bestanden wurde
- `result.error` (`string`): Fehler-Stack, falls das Szenario fehlgeschlagen ist
- `result.duration` (`number`): Dauer des Szenarios in Millisekunden
- `context` (`object`): Cucumber-World-Objekt

### beforeStep

Wird vor einem Cucumber-Step ausgeführt.

Parameter:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber-Step-Objekt
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber-Szenario-Objekt
- `context` (`object`): Cucumber-World-Objekt

### afterStep

Wird nach einem Cucumber-Step ausgeführt.

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

- `params`: Informationen zur Assertion
- `params.matcherName` (`string`): Name des Matchers, den der Test aufgerufen hat (z. B. `toHaveTitle`). Bei einem Alias ist es der Name des Alias (z. B. `toBeExisting`, nicht `toExist`).
- `params.expectedValue`: Wert, der an den Matcher übergeben wird
- `params.options`: Optionen der Assertion

### afterAssertion

Hook, der ausgeführt wird, nachdem eine WebdriverIO-Assertion stattgefunden hat.

Parameter:

- `params`: Informationen zur Assertion
- `params.matcherName` (`string`): Name des Matchers, den der Test aufgerufen hat (z. B. `toHaveTitle`). Bei einem Alias ist es der Name des Alias (z. B. `toBeExisting`, nicht `toExist`).
- `params.expectedValue`: Wert, der an den Matcher übergeben wird
- `params.options`: Optionen der Assertion
- `params.result` (`object`): Ergebnis des Matchers, mit `pass` (`boolean`) und `message()`. `pass` ist `true`, wenn der Wert dem erwarteten Wert entspricht, auch bei `.not`: Mit `.not` ist die Assertion erfolgreich, wenn `pass` den Wert `false` hat.