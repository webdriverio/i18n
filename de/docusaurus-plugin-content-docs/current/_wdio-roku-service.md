---
id: wdio-roku-service
title: Roku Service
custom_edit_url: https://github.com/theREDspace/wdio-roku-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-roku-service ist ein Paket von Drittanbietern. Weitere Informationen finden Sie auf [GitHub](https://github.com/theREDspace/wdio-roku-service) | [npm](https://www.npmjs.com/package/wdio-roku-service)
Dieser Service überschreibt viele Teile von WebdriverIO, um diese mit Roku-Apps verwenden zu können, und bietet Zugriff auf das [Roku ECP](https://developer.roku.com/en-ca/docs/developer-program/dev-tools/external-control-api.md), um den Roku während des Testens zu steuern.

## Anforderungen

### Roku
Ein Testkanal/channel.zip und ein Roku-Gerät (mit aktiviertem Entwicklermodus) im selben Netzwerk wie Ihr Mac.

### WebdriverIO
Dies ist kein eigenständiges Produkt - es wird als WebdriverIO-Testframework-Plugin (oder Service in deren Sprachgebrauch) verwendet. Bevor Sie diesen nutzen, sollten Sie das Setup für WDIO durchführen, indem Sie `npm init wdio@latest` ausführen.

Bei der Einrichtung können Sie folgende Optionen auswählen, um nicht alle Fragen/Optionen durchgehen zu müssen:
- Roku Testing (HINWEIS: Verwenden Sie dies, wenn Ihr Repo nur für Roku-Tests verwendet wird, da es zum Standard und einzigen installierten Service wird. Wählen Sie andernfalls E2E Testing, damit Sie mehrere Services installieren können.)
- On my local machine (nur E2E)
- Web (nur E2E)
- Chrome (nur E2E)
- Mocha
- Typescript [Module funktionieren sowohl für TS als auch für JS, wählen Sie also, was Sie bevorzugen]
- autogenerate some test files (Y)
-- Standardort
- page objects (Y)
-- Standardort
- spec reporter
- additional plugins (N)
- Visual Testing (N)
- services (roku)
- npm install (Y)

### Typescript Config
Wenn Sie Typescript zum Schreiben von Tests verwenden möchten, müssen Sie sicherstellen, dass die folgenden Optionen in der von Webdriverio generierten tsconfig.json-Datei festgelegt sind.
```
"moduleResolution": "nodenext",
"module": "NodeNext",
```
Sie können den Service dann verwenden, indem Sie ihn wie unten beschrieben in Ihre Tests importieren.

### WDIO Config
Derzeit wird das Testen nur für ein einzelnes Roku-Gerät unterstützt. Die folgenden Konfigurationsänderungen sind erforderlich:
* `maxInstances` und `maxInstancesPerCapability` sollten 1 sein. Das automatische Testen auf mehreren Geräten wird nicht unterstützt und führt dazu, dass duplizierte Befehle an den Roku gesendet werden. Es sollte nur eine einzige Capability geben.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {

maxInstances: 1,

    capabilities: [{
        browserName: 'chrome'
        // oder wenn Sie den Headless-Modus wünschen:
        browserName: 'chrome',
        'goog:chromeOptions': { 
            args: ['--headless', '--disable-gpu']
        }
    }],
    //...
}
```

* Es wird empfohlen, das `waitforInterval` und `waitforTimeout` zu erhöhen, da jedes Intervall das Herunterladen des XML vom Roku beinhaltet. Um mehr aus der `browser.debug()`-Funktion herauszuholen, können Sie auch das Mocha-Testrunner-Timeout für die Entwicklungsumgebung auf 5+ Minuten verlängern.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {
    waitforTimeout: 30000,
    
    //optional:
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000
    },
    //...
}
```

Sie sind bereit, Ihren ersten Test zu schreiben!

```js
import { installFromZip } from 'wdio-roku-service/install'
import { exitChannel } from 'wdio-roku-service/channel'
import { Buttons, keyPress, keySequence } from 'wdio-roku-service/controller'

describe('first test', () => {
    before('On the landing screen of the test channel', async () => {
        await installFromZip(process.env.ROKU_APP_PATH)
    })

    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
    })

    after('should return to home', async () => {
        await exitChannel()
    })
})

```

Es wird auch empfohlen, die `browser.debug()`-Funktion in wdio zu nutzen, um Ihren Test zum Debuggen und zum Erstellen von Tests anzuhalten:

```js
// ...
    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
        await browser.debug()
        // der Test wird angehalten, ein REPL wird für Befehle verfügbar

```
Wenn Chrome nicht im Headless-Modus ist, können Sie sehen, wann `openRokuXML()` zuletzt aufgerufen wurde (wahrscheinlich durch ein `waitForX` oder `expect`). Mit dem REPL in Ihrem Terminal können Sie alle gültigen `$`-Befehle und ein paar wichtige benutzerdefinierte Befehle verwenden (`browser.openRokuXML()` und `browser.saveScreenshot('path/to/ss.jpg')`) - die `controller`-Klasse ist nicht an das `browser`-Objekt angehängt, daher können Sie diese derzeit nicht verwenden. Glücklicherweise sitzen Sie wahrscheinlich neben dem Roku und haben eine Fernbedienung, mit der Sie navigieren und gelegentlich `browser.openRokuXML()` aufrufen können, um zu sehen, was mit dem Seitenzustand passiert ist! Und denken Sie daran, dass XML mit XPathing in der Chrome-Browser-Konsole selbst funktioniert, so dass Sie Ihre Selektoren direkt in der Chrome-Konsole während des Debuggings auswerten/entwickeln können.

### .env
Siehe die Datei `.env.example`. Kopieren Sie sie und benennen Sie sie in `.env` in Ihrem WebdriverIO-Projekt um, das diesen Service verwendet. Sie sollten sie wahrscheinlich auch in Ihre .gitignore aufnehmen.

* `ROKU_IP` sollte die IP Ihres Roku sein. Die Befehle verwenden diese IP, um mit ihm zu kommunizieren. Dies ist erforderlich.
* `ROKU_USER` und `ROKU_PW`: Anmeldeinformationen werden benötigt, um ein Archiv zu installieren und Screenshots zu erstellen.
* `ROKU_APP_PATH` sollte der absolute Pfad der Roku-Kanal-ZIP-Datei sein.
* `ROKU_CHANNEL_ID` sollte die Kanal-ID Ihres Roku-Kanals sein (normalerweise "dev").
* `DEBUG=wdio-roku-service` aktiviert Debug-Meldungen. Entfernen Sie das '#' am Anfang der Zeile, wenn Sie diese wünschen.

## Geänderte Funktionen
### Browser
* `waitUntil` ruft bei jeder Iteration das XML vom Roku ab, um Änderungen zu überprüfen.
* `saveScreenshot` lädt einen Screenshot des aktuellen Bildschirms vom Roku herunter. Beachten Sie, dass diese Screenshots im .jpg-Format vorliegen, nicht im .png-Format, das WebdriverIO normalerweise verwendet.
* `openRokuXML` ruft das XML vom Roku ab, wenn Sie es manuell tun müssen, anstatt mit Wartezeiten.

### Elemente
* Alle Wartezeiten werden auf die gleiche Weise wie Browser unterstützt. `waitForClickable` wird auf `waitForDisplayed` abgebildet, und `waitForStable` wird auf `waitForExist` abgebildet.
* `click`, `doubleClick` und `moveTo` werden nicht unterstützt. Sie müssen die App manuell navigieren.
* `isFocused` prüft, ob ein Attribut `focused` auf dem Element wahr ist.
* `isDisplayed` prüft, ob ein Attribut `bounds` auf dem Element vorhanden ist und `visible` nicht auf false gesetzt ist. Wenn `withinViewport` gesetzt ist, werden die Grenzen mit der Bildschirmgröße des Roku verglichen.
* `getSize` und `getLocation` übernehmen die Werte aus dem Attribut `bounds` und geben 0 für die Größe und -Infinity für die Position zurück, wenn es nicht vorhanden ist.

Andere Funktionen wurden nicht geändert, aber viele funktionieren wie erwartet.

### Matcher
Die meisten Matcher wurden aktualisiert, um das XML während des Wartens abzurufen. Einige haben eine leicht abweichende Funktionalität.
* `toBeDisplayed`, `toBeDisplayedInViewport`, `toBeFocused`, `toBeExisting`, `toBePresent`, `toExist`, `toHaveSize`, `toHaveWidth`, `toHaveHeight` und `toHaveAttribute` funktionieren alle wie erwartet, wobei die Änderungen an Element berücksichtigt werden.
* `toHaveElementProperty` wird auf `toHaveAttribute` abgebildet.
* `toHaveElementClass` prüft das Attribut `name` des Elements.
* `toHaveId` wird auf `toHaveElementClass` abgebildet.
* `toHaveText` prüft das Attribut `text` des Elements.
* `toHaveChildren` prüft das Attribut `children` des Elements.
* `toHaveHTML` behandelt das XML, als wäre es HTML, obwohl es wahrscheinlich nicht sehr nützlich ist.

Die folgenden werden derzeit nicht unterstützt:
* `toBeSelected` - Könnte bald unterstützt werden, nachdem festgestellt wurde, wie das XML für ausgewählte Schaltflächen aussieht, wenn es einen Unterschied gibt.
* `toBeChecked` - Könnte bald unterstützt werden, nachdem festgestellt wurde, wie das XML für angekreuzte Kontrollkästchen aussieht, wenn es einen Unterschied gibt.
* `toHaveComputedLabel` - Wenn Sie ein Äquivalent dazu auf Ihren Roku-Elementen haben, überprüfen Sie das Attribut mit `toHaveAttribute`.
* `toHaveComputedRole` - Wenn Sie ein Äquivalent dazu auf Ihren Roku-Elementen haben, überprüfen Sie das Attribut mit `toHaveAttribute`.
* `toHaveHref` - Wenn Sie URLs auf Ihren Roku-Elementen haben, überprüfen Sie das Attribut mit `toHaveAttribute`.
* `toHaveStyle` - Die XML-Elemente haben keine Stile.
* `toHaveClipboardText` - Dies ist nicht bekannt.
* `toHaveTitle` - Der Titel wird der zufällig generierte temporäre Dateiname des XML sein.
* `toHaveUrl` - Die URL wird der Pfad zur XML-Datei auf Ihrem Computer sein.

## Verwendung
### Kanal-Installation

Dies erfordert, dass Ihr Kanal eine zugewiesene ID hat.
```js
import { installByID } from 'wdio-roku-service/install';

async before() {
    await installByID(process.env.ROKU_CHANNEL_ID);
}
```

Archiv-Installation

Es wird empfohlen, den Pfad in der .env zu speichern, besonders wenn Sie mehrere Entwickler haben, die möglicherweise unterschiedliche Speicherorte und/oder Dateinamen haben.
```js
import { installFromZip } from 'wdio-roku-service/install';

async before() {
    await installFromZip(process.env.ROKU_ARCHIVE_PATH);
}
```

Vorinstallierter Kanal

Wenn Sie den Kanal bereits vor dem Testen selbst installiert haben, können Sie ihn einfach starten.
```js
import { launchChannel, exitChannel } from 'wdio-roku-service/channel';

async before() {
    // Den Kanal schließen, falls er bereits geöffnet ist. Wenn der Kanal Instant Resume unterstützt, wird er nur in den Hintergrund gesetzt
    await exitChannel();
    // Die Verwendung der Kanal-ID 'dev' startet die sideloaded Anwendung.
    await launchChannel('dev');
}
```

### Testen
`wdio-roku-service/controller` bietet die Möglichkeit, Tastendrücke an den Roku zu senden. `keySequence` ist die Hauptfunktion, die mehrere Tastendrücke hintereinander sendet.
```js
import { Buttons, keySequence } from 'wdio-roku-service/controller';

// Durch die App navigieren
await keySequence(Buttons.LEFT, Buttons.LEFT, Buttons.SELECT, Buttons.DOWN, Buttons.SELECT);
// Die aktuelle App-UI vom Roku abrufen und in den Browser laden
await browser.openRokuXML();
// Oder verwenden Sie Wartezeiten, die wiederholt das XML laden, bis es eine Zeitüberschreitung gibt oder die Bedingung erfüllt ist
await browser.waitUntil(condition);
await element.waitForDisplayed();
// WDIO-Matcher auf dem Roku-XML verwenden, als wäre es eine Webseite
await expect(element).toHaveAttr('focused');
```

`wdio-roku-service/controller` hat auch Funktionen zum Halten oder Loslassen von Tasten sowie zum Eingeben von Text in eine Tastatur.
```js
import { Buttons, keyboardInput, keyPress, keySequence } from 'wdio-roku-service/controller';

await keySequence(Buttons.DOWN, Buttons.DOWN, Buttons.SELECT);
await keyboardInput('example');
await keyPress(Buttons.ENTER);
await browser.openRokuXML();
```

### Deeplinking
`wdio-roku-service/channel` bietet kanalbezogene Funktionalität. `inputChannel` ermöglicht es Ihnen, beliebige Informationen an Ihre App zu senden.
```js
import { exitChannel, launchChannel, MediaType } from 'wdio-roku-service/channel';
await exitChannel();
await launchChannel(process.env.ROKU_CHANNEL_ID, myContent, MediaType.MOVIE, {myExtraParameter:true});
await expect(MyContent.header).toBeDisplayed();
```

### Andere Funktionen
`wdio-roku-service/info` bietet verschiedene Funktionen, wie das Abrufen des App-Symbols oder verwaister Knoten.
```js
import { getAppIcon } from 'wdio-roku-service/info';
const response = await getAppIcon(process.env.ROKU_CHANNEL_ID);
expect(response.headers.get('Content-Type')).toBe('image/jpg');
```
`wdio-roku-service/ecp` ist die direkte Schnittstelle zum ECP, wenn Sie etwas sehr Spezifisches tun müssen.
```js
import { ECP } from 'wdio-roku-service/ecp';
await ECP('search/browse?keyword=voyage&type=movie&tmsid=MV000058030000', 'POST');
```

## Häufige Fallstricke
* Roku-Elemente haben ihren Text in einem 'text'-Attribut, nicht zwischen ihren Tags. Bei Selektoren funktioniert `$('element=Text')` für fast jedes Element nicht. Stattdessen müssen Sie `$('element[text=Text]')` verwenden.

## Feature-Roadmap
* Es wird in Kürze ein PR eingereicht, der es ermöglicht, diesen Service während des `npm init wdio@latest`-Fragebogens zu installieren.
* Derzeit wird die Socket-Kommunikation mit dem Roku evaluiert, sodass mehr Funktionen entwickelt werden können, wie z.B. eine Möglichkeit, einen schlafenden Roku aufzuwecken.
* Netzwerk-Proxy-Funktion(en), die es ermöglichen, auf Netzwerkaktivitäten zu reagieren.

## Nutzung des Allure Reporting mit angehängten Screenshots und XML-Dateien

Ohne zusätzliche Konfiguration bietet Allure Reporting keine Möglichkeit, Screenshots der App oder eine Kopie des XML-Codes zu erstellen, der den aktuellen Zustand der Roku-App zu einem beliebigen Zeitpunkt der Testausführung darstellt. Die folgende Dokumentation erklärt, wie dies adressiert werden kann, sodass ein Screenshot des aktuellen App-Zustands erstellt und dem Allure-Bericht angehängt wird, wenn ein `it`-Test abgeschlossen ist. Es ermöglicht auch, einen Quell-Snapshot des XML zu erhalten, der den aktuellen Roku-App-Zustand repräsentiert, wenn ein `it`-Test fehlschlägt.

Die vollständige Dokumentation zu Allure Reporter finden Sie unter @wdio/allure-reporter docs https://webdriver.io/docs/allure-reporter/

### Utils.js-Abhängigkeit
Fügen Sie den folgenden Code zu einer Datei namens `Utils.js` hinzu. Diese Datei kann sich in Ihrem `/helpers`-Ordner oder ähnlichem befinden.
```js
/**
 * Returns a string representation of the 'now' timestamp in milliseconds for the epoch.
 */
export const getEpochTimestamp = async () => {
    return Date.now().toString()
}

/**
 * Returns a string representation of the 'now' timestamp following the pattern: {YYYY}-{MM}-{DD}_{hour in 24H}-{Minute}-{Second}-{Milliseconds}
 */
export const getLongFormatTimestamp = async () => {
    const now = new Date(Date.now())
    const result = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}`
    return result
}

/**
 * An object containing the string representations of possible file extensions used for reporting purposes.
 */
export const FILE_EXTENSIONS = {
    JPG: '.jpg',
    XML: '.xml'
}

/**
 * An object containing the string representations of possible MIME types used for reporting purposes.
 */
export const FILE_MIME_TYPES = {
    JPG: 'image/jpeg',
    XML: 'application/xml'
}

/**
 * A function to generate a filename with a possible prefix, a timestamp and one of the possible extensions provided.
 * @param {string} fileExtension Use one of the values from the FILE_EXTENSIONS object defined previously.
 * @param {string} [fileNamePrefix] A prefix to be appended at the beginning of the filename if provided.  Defaults to an empty string.
 */
export const getFileNameWithTimestamp = async (fileExtension, fileNamePrefix = '') => {
    return (fileNamePrefix !== '')
        ? `${fileNamePrefix}_${await getLongFormatTimestamp()}${fileExtension}`
        : `${await getLongFormatTimestamp()}${fileExtension}`
}

```

### wdio.conf.js-Code
Fügen Sie die folgenden Import-Anweisungen in der Datei `wdio.conf.js` hinzu:
```js
import { readFile, rm } from 'node:fs/promises'
import { addAttachment } from '@wdio/allure-reporter'
import { FILE_EXTENSIONS, FILE_MIME_TYPES, getFileNameWithTimestamp } from './<Utils.js file path>/Utils.js'  // Replace <Utils.js file path> with actual relative path to file Utils.js

```

Definieren Sie den folgenden `afterTest`-Hook in der Datei `wdio.conf.js`. Wenn Sie bereits funktionierenden Code in diesem Hook haben, fügen Sie den unten bereitgestellten Code hinzu.
```js
afterTest: async function (test, context, result) {
        // Screenshot saving and attaching logic regardless of test outcome.
        const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.JPG)
        try {
            const tempScreenshotPath = `./allure-results/${fileName}`
            await browser.saveScreenshot(tempScreenshotPath)
            const screenShotData = await readFile(tempScreenshotPath)
            addAttachment(`${fileName}`, screenShotData, FILE_MIME_TYPES.JPG)
            await rm(tempScreenshotPath).catch((rmError) => {
                console.error(`Failed to remove file: ${tempScreenshotPath}`, rmError)
            })
        } catch (error) {
            console.error('Error handling screenshot or attachment: ', error)
        }

        // XML attaching logic on test failure.
        if (result.passed === false) {
            const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.XML, 'AppStateAfterTestFail')
            const rawSourceString = String(await browser.getPageSource())
            const extractedXMLSubstring = '<?xml version="1.0" encoding="UTF-8" ?>\n'.concat(rawSourceString.substring(rawSourceString.search('<app-ui xmlns="">'), rawSourceString.search('</app-ui>')).concat('</app-ui>')).replace('<app-ui xmlns="">', '<app-ui>')
            try {
                addAttachment(`${fileName}`, extractedXMLSubstring, FILE_MIME_TYPES.XML)
            } catch (error) {
                console.log(error)
            }
        }
    },
```

### Erwartetes Verhalten
Mit diesem Code in der Projektkonfiguration wird erwartet, dass jedes Mal, wenn ein `it`-Test ausgeführt wird, unabhängig vom Ergebnis des Tests, am Ende der Ausführung ein Screenshot erstellt und dem entsprechenden Abschnitt im Allure-Bericht angehängt wird. Wenn der Test fehlschlägt, wird auch ein Quell-Snapshot des App-Zustands im XML-Format dem Testabschnitt im Allure-Bericht angehängt.

### Hinweise
* Standardmäßig unterstützen Allure-Berichte Screenshots im `.png`-Format. Methodenüberschreibungen in diesem Service unterstützen das Bild im `.jpg`-Format.
* XML-Anhänge können im Allure-Bericht selbst durchsucht oder in einem separaten Tab in einem Browser geöffnet werden.