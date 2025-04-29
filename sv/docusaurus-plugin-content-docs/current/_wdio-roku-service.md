---
id: wdio-roku-service
title: Roku Service
custom_edit_url: https://github.com/theREDspace/wdio-roku-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-roku-service är ett tredjepartspaket, för mer information se [GitHub](https://github.com/theREDspace/wdio-roku-service) | [npm](https://www.npmjs.com/package/wdio-roku-service)
Denna tjänst åsidosätter många delar av WebdriverIO för att möjliggöra användning med Roku-appar och ger tillgång till [Roku ECP](https://developer.roku.com/en-ca/docs/developer-program/dev-tools/external-control-api.md) för att styra Roku under testning.

## Krav

### Roku
En testkanal/channel.zip och en Roku-enhet (med utvecklarläge aktiverat) på samma nätverk som din mac.

### WebdriverIO
Detta är inte en fristående produkt -- den används som ett WebdriverIO testramverkstillägg (eller Service, enligt deras terminologi). Innan du använder detta bör du gå igenom installationen för WDIO genom att köra `npm init wdio@latest`.

När du går igenom installationsstegen, så du inte behöver navigera genom alla frågor/alternativ, kan du välja följande alternativ under initialiseringsfasen:
- Roku Testing (OBS: Använd detta om ditt repo endast kommer att användas för Roku-testning eftersom det kommer att bli standard och den enda installerade tjänsten. Annars, använd E2E Testing så att du kan installera flera tjänster.)
- On my local machine (Endast E2E)
- Web (Endast E2E)
- Chrome (Endast E2E)
- Mocha
- Typescript [modules fungerar för både TS och JS, så välj det som passar dig]
- autogenerate some test files (Y)
-- standardplats
- page objects (Y)
-- standardplats
- spec reporter
- additional plugins (N)
- Visual Testing (N)
- services (roku)
- npm install (Y)

### Typescript Config
Om du vill använda Typescript för att skriva tester måste du se till att följande alternativ är inställda i tsconfig.json-filen som genereras av Webdriverio.
```
"moduleResolution": "nodenext",
"module": "NodeNext",
```
Du kan sedan använda tjänsten genom att importera den till dina tester som beskrivs nedan.

### WDIO Config
För närvarande stöds endast testning för en enda Roku-enhet. Följande konfigurationsuppdateringar krävs:
* `maxInstances` och `maxInstancesPerCapability` bör vara 1. Testning på flera enheter samtidigt stöds inte och kommer att resultera i duplicerade kommandon som skickas till Roku. Det bör endast finnas en enda capability.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {

maxInstances: 1,

    capabilities: [{
        browserName: 'chrome'
        // eller om du vill ha headless-läge:
        browserName: 'chrome',
        'goog:chromeOptions': { 
            args: ['--headless', '--disable-gpu']
        }
    }],
    //...
}
```

* Det rekommenderas att öka `waitforInterval` och `waitforTimeout`, eftersom varje intervall innebär nedladdning av xml från Roku. För att få mer användning av `browser.debug()`-funktionen kan du också välja att förlänga din mocha testrunner timeout till 5+ minuter för utveckling.
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {
    waitforTimeout: 30000,
    
    //valfritt:
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000
    },
    //...
}
```

Du är nu redo att skriva ditt första test!

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

Det uppmuntras också att du använder `browser.debug()`-funktionen i wdio för att stoppa ditt test för felsökning och testförfattande:

```js
// ...
    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
        await browser.debug()
        // testet stannar, en REPL blir tillgänglig för kommandon

```
Om chrome inte är i headless-läge kan du se sista gången `openRokuXML()` anropades (troligen genom ett `waitForX` eller `expect`). Med hjälp av REPL i din terminal kan du använda alla giltiga `$`-kommandon och några viktiga anpassade kommandon som lagts till (`browser.openRokuXML()` och `browser.saveScreenshot('path/to/ss.jpg')`) -- `controller`-klassen är inte kopplad till `browser`-objektet, så du kan för närvarande inte använda dessa. Lyckligtvis sitter du förmodligen bredvid Roku och har en fjärrkontroll som du kan använda för att navigera och då och då anropa `browser.openRokuXML()` för att se vad som hände med sidans tillstånd! Och kom ihåg att XML fungerar nativt med xpathing i själva chrome-webbläsaren, så du kan utvärdera/utveckla dina selektorer direkt i chrome-konsolen under felsökning.

### .env
Se filen `.env.example`. Kopiera den och döp om den till `.env` i ditt WebdriverIO-projekt som använder denna tjänst. Du vill förmodligen också lägga till den i din .gitignore.

* `ROKU_IP` bör vara IP-adressen till din Roku. Kommandona kommer att använda denna IP för att kommunicera med den. Detta är obligatoriskt.
* `ROKU_USER` och `ROKU_PW`: Inloggningsuppgifter behövs för att installera ett arkiv, samt för att ta skärmdumpar.
* `ROKU_APP_PATH` bör vara den absoluta sökvägen till Roku channel zip-filen.
* `ROKU_CHANNEL_ID` bör vara kanal-ID för din Roku-kanal (detta är vanligtvis "dev").
* `DEBUG=wdio-roku-service` aktiverar felsökningsmeddelanden. Ta bort '#' i början av raden om du vill ha dessa.

## Förändrade funktioner
### Browser
* `waitUntil` kommer att hämta xml från Roku vid varje iteration för att kontrollera förändringar.
* `saveScreenshot` kommer att ladda ner en skärmdump av nuvarande skärm från Roku. Observera att dessa skärmdumpar är i .jpg-format, istället för .png som WebdriverIO vanligtvis använder.
* `openRokuXML` kommer att hämta xml från Roku om du behöver göra det manuellt istället för med väntefunktioner.

### Elements
* Alla väntefunktioner stöds på samma sätt som Browser. `waitForClickable` mappas till `waitForDisplayed`, och `waitForStable` mappas till `waitForExist`.
* `click`, `doubleClick` och `moveTo` stöds inte. Du måste navigera appen manuellt.
* `isFocused` kommer att kontrollera om attributet `focused` på elementet är sant.
* `isDisplayed` kommer att kontrollera attributet `bounds` på elementet och att `visible` inte är satt till false. Om `withinViewport` är angivet kommer gränserna att jämföras med Rokus skärmstorlek.
* `getSize` och `getLocation` tar värdena från attributet `bounds`, returnerar 0 för storlek och -Infinity för position om det inte finns.

Andra funktioner har inte ändrats, men många fungerar som förväntat.

### Matchers
De flesta matchare har uppdaterats för att hämta xml under väntan. Några har något annorlunda funktionalitet.
* `toBeDisplayed`, `toBeDisplayedInViewport`, `toBeFocused`, `toBeExisting`, `toBePresent`, `toExist`, `toHaveSize`, `toHaveWidth`, `toHaveHeight` och `toHaveAttribute` fungerar alla som förväntat, med ändringarna till Element i åtanke.
* `toHaveElementProperty` mappar till `toHaveAttribute`.
* `toHaveElementClass` kontrollerar attributet `name` på elementet.
* `toHaveId` mappas till `toHaveElementClass`.
* `toHaveText` kontrollerar attributet `text` på elementet.
* `toHaveChildren` kontrollerar attributet `children` på elementet.
* `toHaveHTML` kommer att behandla xml som om det vore HTML, vilket troligen inte är särskilt användbart.

Följande stöds för närvarande inte:
* `toBeSelected` - Kan stödjas snart efter att ha fastställt hur xml för valda knappar ser ut, om det finns en skillnad.
* `toBeChecked` - Kan stödjas snart efter att ha fastställt hur xml för markerade kryssrutor ser ut, om det finns en skillnad.
* `toHaveComputedLabel` - Om du har en motsvarighet till detta på dina Roku-element, kontrollera attributet med `toHaveAttribute`.
* `toHaveComputedRole` - Om du har en motsvarighet till detta på dina Roku-element, kontrollera attributet med `toHaveAttribute`.
* `toHaveHref` - Om du har URL:er på dina Roku-element, kontrollera attributet med `toHaveAttribute`.
* `toHaveStyle` - XML-elementen har inte stilar.
* `toHaveClipboardText` - Detta är inte känt.
* `toHaveTitle` - Titeln kommer att vara det slumpmässigt genererade tillfälliga filnamnet på xml.
* `toHaveUrl` - URL:en kommer att vara sökvägen till xml-filen på din dator.

## Användning
### Kanalinstallation

Detta kräver att din kanal har tilldelats ett ID.
```js
import { installByID } from 'wdio-roku-service/install';

async before() {
    await installByID(process.env.ROKU_CHANNEL_ID);
}
```

Arkivinstallation

Det rekommenderas att lagra sökvägen i .env, särskilt om du har flera utvecklare som kan ha olika platser och/eller filnamn.
```js
import { installFromZip } from 'wdio-roku-service/install';

async before() {
    await installFromZip(process.env.ROKU_ARCHIVE_PATH);
}
```

Förinstallerad kanal

Om du redan har installerat kanalen själv före testning kan du helt enkelt lansera den.
```js
import { launchChannel, exitChannel } from 'wdio-roku-service/channel';

async before() {
    // Stäng kanalen om den redan är öppen. Om kanalen stöder omedelbar återupptagning kommer detta bara att lägga den i bakgrunden
    await exitChannel();
    // Att använda kanal-ID 'dev' startar den sidoladdade applikationen.
    await launchChannel('dev');
}
```

### Testning
`wdio-roku-service/controller` ger möjlighet att skicka knapptrykningar till Roku. `keySequence` är den huvudsakliga, som skickar flera knapptrykningar i sekvens.
```js
import { Buttons, keySequence } from 'wdio-roku-service/controller';

// Navigera genom appen
await keySequence(Buttons.LEFT, Buttons.LEFT, Buttons.SELECT, Buttons.DOWN, Buttons.SELECT);
// Hämta det aktuella app-gränssnittet från Roku och ladda det i webbläsaren
await browser.openRokuXML();
// Eller använd väntefunktioner, som upprepade gånger laddar XML tills timeout eller att villkoret uppfylls
await browser.waitUntil(condition);
await element.waitForDisplayed();
// använd WDIO matchers på roku XML som om det var en webbsida
await expect(element).toHaveAttr('focused');
```

`wdio-roku-service/controller` har också funktioner för att hålla eller släppa knappar samt skriva text med ett tangentbord.
```js
import { Buttons, keyboardInput, keyPress, keySequence } from 'wdio-roku-service/controller';

await keySequence(Buttons.DOWN, Buttons.DOWN, Buttons.SELECT);
await keyboardInput('example');
await keyPress(Buttons.ENTER);
await browser.openRokuXML();
```

### Deeplinking
`wdio-roku-service/channel` tillhandahåller kanalrelaterad funktionalitet. `inputChannel` låter dig skicka godtycklig information till din app.
```js
import { exitChannel, launchChannel, MediaType } from 'wdio-roku-service/channel';
await exitChannel();
await launchChannel(process.env.ROKU_CHANNEL_ID, myContent, MediaType.MOVIE, {myExtraParameter:true});
await expect(MyContent.header).toBeDisplayed();
```

### Andra funktioner
`wdio-roku-service/info` tillhandahåller diverse funktionalitet, som att hämta app-ikonen eller föräldralösa noder.
```js
import { getAppIcon } from 'wdio-roku-service/info';
const response = await getAppIcon(process.env.ROKU_CHANNEL_ID);
expect(response.headers.get('Content-Type')).toBe('image/jpg');
```
`wdio-roku-service/ecp` är det direkta gränssnittet med ECP om du behöver göra något mycket specifikt.
```js
import { ECP } from 'wdio-roku-service/ecp';
await ECP('search/browse?keyword=voyage&type=movie&tmsid=MV000058030000', 'POST');
```

## Vanliga fallgropar
* Roku-element har sin text i ett 'text'-attribut, inte mellan sina taggar. När du gör selektorer kommer `$('element=Text')` inte att fungera för nästan alla element. Istället måste du göra `$('element[text=Text]')`.

## Funktionsplanering
* Det kommer snart att lämnas in en PR som gör det möjligt att installera denna tjänst under `npm init wdio@latest`-frågeformuläret.
* För närvarande utvärderas Socket-kommunikation med Roku så att fler funktioner kan verktygas, såsom ett sätt att väcka en sovande Roku.
* Nätverksproxyfeature(r) som gör det möjligt att lyssna på nätverksaktivitet.

## Utnyttja Allure Reporting med bifogade skärmdumpar och XML-filer

Allure Reporting har inte någon konfiguration på plats för att generera skärmdumpar av appen eller en kopia av XML-koden som representerar det aktuella tillståndet för Roku-appen vid någon punkt under testen. Dokumentationen som följer förklarar hur man åtgärdar detta så att en skärmdump av appens aktuella tillstånd genereras och bifogas Allure-rapporten varje gång ett `it`-test slutför sin körning. Det gör det också möjligt att få en källkodsögonblicksbild av XML som representerar det aktuella Roku-appens tillstånd när ett `it`-test misslyckas.

För fullständig dokumentation om Allure Reporter, besök @wdio/allure-reporter docs https://webdriver.io/docs/allure-reporter/

### Utils.js beroende
Lägg till följande kod i en fil som heter `Utils.js`. Denna fil kan finnas i din `/helpers`-mapp eller liknande.
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

### wdio.conf.js kod
Lägg till följande importuttalanden i filen `wdio.conf.js`:
```js
import { readFile, rm } from 'node:fs/promises'
import { addAttachment } from '@wdio/allure-reporter'
import { FILE_EXTENSIONS, FILE_MIME_TYPES, getFileNameWithTimestamp } from './<Utils.js file path>/Utils.js'  // Ersätt <Utils.js file path> med faktisk relativ sökväg till filen Utils.js

```

Definiera följande `afterTest`-hook i filen `wdio.conf.js`. Om du redan har fungerande kod i denna hook, lägg till koden nedan till den.
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

### Förväntat beteende
Med denna kod på plats i projektets konfiguration är förväntningen att varje gång ett `it`-test körs, oavsett testets resultat, kommer en skärmdump att tas i slutet av körningen och bifogas till dess relevanta avsnitt i Allure-rapporten. I det specifika fallet där testet misslyckas kommer en ögonblicksbild av appens tillstånd i XML-format också att bifogas till testets avsnitt i Allure-rapporten.

### Anteckningar
* Allure-rapporter stöder som standard skärmdumpar i `.png`-format. Metodåsidosättningar i denna tjänst stöder bilder i `.jpg`-format istället.
* XML-bilagor kan bläddras i själva Allure-rapporten eller öppnas i en separat flik i en webbläsare.