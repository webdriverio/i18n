---
id: visual-testing
title: Visuell testning
---


## Vad kan det göra?

WebdriverIO tillhandahåller bildjämförelser på skärmar, element eller hela sidor för

-   🖥️ Skrivbordswebbläsare (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Mobil- / surfplattewebbläsare (Chrome på Android-emulatorer / Safari på iOS-simulatorer / Simulatorer / verkliga enheter) via Appium
-   📱 Nativa appar (Android-emulatorer / iOS-simulatorer / verkliga enheter) via Appium (🌟 **NY** 🌟)
-   📳 Hybridappar via Appium

genom [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service) som är en lättviktig WebdriverIO-tjänst.

Detta gör att du kan:

-   spara eller jämföra **skärmar/element/helsidesbilder** mot en baslinje
-   automatiskt **skapa en baslinje** när ingen baslinje finns
-   **blockera anpassade regioner** och till och med **automatiskt exkludera** status- och/eller verktygsfält (endast mobil) under en jämförelse
-   öka elementdimensionerna för skärmbilder
-   **dölja text** under webbplatsjämförelse för att:
    -   **förbättra stabiliteten** och förhindra flakighet i teckensnittsrendering
    -   endast fokusera på **layouten** av en webbplats
-   använda **olika jämförelsemetoder** och en uppsättning **ytterligare matchare** för mer läsbara tester
-   verifiera hur din webbplats kommer att **stödja tabnavigering med ditt tangentbord**, se även [Tabba genom en webbplats](#tabbing-through-a-website)
-   och mycket mer, se [tjänst](./visual-testing/service-options) och [metod](./visual-testing/method-options) alternativ

Tjänsten är en lättviktsmodul för att hämta nödvändig data och skärmbilder för alla webbläsare/enheter. Jämförelsekraften kommer från [ResembleJS](https://github.com/Huddle/Resemble.js). Om du vill jämföra bilder online kan du kolla in [onlineverktyget](http://rsmbl.github.io/Resemble.js/).

:::info NOTERA För nativa/hybridappar
Metoderna `saveScreen`, `saveElement`, `checkScreen`, `checkElement` och matcharna `toMatchScreenSnapshot` och `toMatchElementSnapshot` kan användas för nativa appar/kontext.

Använd egenskapen `isHybridApp:true` i dina tjänstinställningar när du vill använda den för hybridappar.
:::

## Installation

Det enklaste sättet är att behålla `@wdio/visual-service` som en utvecklingsberoende i din `package.json`, via:

```sh
npm install --save-dev @wdio/visual-service
```

## Användning

`@wdio/visual-service` kan användas som en normal tjänst. Du kan ställa in den i din konfigurationsfil med följande:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // Några alternativ, se dokumentationen för mer
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                formatImageName: "{tag}-{logName}-{width}x{height}",
                screenshotPath: path.join(process.cwd(), "tmp"),
                savePerInstance: true,
                // ... fler alternativ
            },
        ],
    ],
    // ...
};
```

Fler tjänstalternativ finns [här](/docs/visual-testing/service-options).

När det är konfigurerat i din WebdriverIO-konfiguration kan du lägga till visuella tester till [dina tester](/docs/visual-testing/writing-tests).

### Kapaciteter
För att använda modulen för visuell testning **behöver du inte lägga till några extra alternativ till dina kapaciteter**. I vissa fall kan du dock vilja lägga till ytterligare metadata till dina visuella tester, som ett `logName`.

`logName` låter dig tilldela ett anpassat namn till varje kapacitet, som sedan kan inkluderas i bildfilnamnen. Detta är särskilt användbart för att skilja mellan skärmbilder tagna över olika webbläsare, enheter eller konfigurationer.

För att aktivera detta kan du definiera `logName` i avsnittet `capabilities` och se till att alternativet `formatImageName` i Visual Testing-tjänsten refererar till det. Så här kan du ställa in det:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    capabilities: [
        {
            browserName: 'chrome',
            'wdio-ics:options': {
                logName: 'chrome-mac-15', // Anpassat loggnamn för Chrome
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Anpassat loggnamn för Firefox
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // Några alternativ, se dokumentationen för mer
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // Formatet nedan kommer att använda `logName` från kapaciteter
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... fler alternativ
            },
        ],
    ],
    // ...
};
```

#### Hur det fungerar
1. Ställa in `logName`:

    - I avsnittet `capabilities`, tilldela ett unikt `logName` till varje webbläsare eller enhet. Till exempel identifierar `chrome-mac-15` tester som körs på Chrome på macOS version 15.

2. Anpassad bildnamngivning:

    - Alternativet `formatImageName` integrerar `logName` i skärmbildsfilnamnen. Om till exempel `tag` är hemsida och upplösningen är `1920x1080` kan det resulterande filnamnet se ut så här:

        `homepage-chrome-mac-15-1920x1080.png`

3. Fördelar med anpassad namngivning:

    - Det blir mycket enklare att skilja mellan skärmbilder från olika webbläsare eller enheter, särskilt vid hantering av baslinjer och felsökning av avvikelser.

4. Notera om standardvärden:

    -Om `logName` inte är inställt i kapaciteterna kommer alternativet `formatImageName` att visa det som en tom sträng i filnamnen (`homepage--15-1920x1080.png`)

### WebdriverIO MultiRemote

Vi stöder även [MultiRemote](https://webdriver.io/docs/multiremote/). För att detta ska fungera ordentligt, se till att du lägger till `wdio-ics:options` till dina
kapaciteter som du kan se nedan. Detta säkerställer att varje skärmbild får ett eget unikt namn.

[Att skriva dina tester](/docs/visual-testing/writing-tests) kommer inte att vara annorlunda jämfört med att använda [testrunner](https://webdriver.io/docs/testrunner)

```js
// wdio.conf.js
export const config = {
    capabilities: {
        chromeBrowserOne: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // DETTA!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-one",
                },
            },
        },
        chromeBrowserTwo: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // DETTA!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### Köra programmatiskt

Här är ett minimalt exempel på hur man använder `@wdio/visual-service` via `remote`-alternativ:

```js
import { remote } from "webdriverio";
import VisualService from "@wdio/visual-service";

let visualService = new VisualService({
    autoSaveBaseline: true,
});

const browser = await remote({
    logLevel: "silent",
    capabilities: {
        browserName: "chrome",
    },
});

// "Starta" tjänsten för att lägga till anpassade kommandon till `browser`
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// eller använd detta för att ENDAST spara en skärmbild
await browser.saveFullPageScreen("examplePaged", {});

// eller använd detta för validering. Båda metoderna behöver inte kombineras, se FAQ
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### Tabba genom en webbplats

Du kan kontrollera om en webbplats är tillgänglig genom att använda tangentbordsknappen <kbd>TAB</kbd>. Att testa denna del av tillgänglighet har alltid varit ett tidskrävande (manuellt) jobb och ganska svårt att göra genom automatisering.
Med metoderna `saveTabbablePage` och `checkTabbablePage` kan du nu rita linjer och punkter på din webbplats för att verifiera tabordningen.

Var medveten om att detta bara är användbart för skrivbordswebbläsare och **INTE\*\*** för mobila enheter. Alla skrivbordswebbläsare stöder denna funktion.

:::note

Arbetet är inspirerat av [Viv Richards](https://github.com/vivrichards600) blogginlägg om ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

Sättet tabbara element väljs baseras på modulen [tabbable](https://github.com/davidtheclark/tabbable). Om det finns några problem gällande tabbning, kolla [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) och särskilt avsnittet [More Details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

#### Hur fungerar det

Båda metoderna skapar ett `canvas`-element på din webbplats och ritar linjer och punkter för att visa dig var din TAB skulle gå om en slutanvändare skulle använda den. Efter det skapas en helsidesbildskärmbild för att ge dig en bra översikt över flödet.

:::important

**Använd `saveTabbablePage` endast när du behöver skapa en skärmbild och INTE vill jämföra den **med en **baslinje**-bild.\*\*\*\*

:::

När du vill jämföra tabbningsflödet med en baslinje kan du använda metoden `checkTabbablePage`. Du behöver **INTE** använda de två metoderna tillsammans. Om det redan finns en baslinjebild, vilket automatiskt kan göras genom att ange `autoSaveBaseline: true` när du instansierar tjänsten,
kommer `checkTabbablePage` först att skapa den _aktuella_ bilden och sedan jämföra den med baslinjen.

##### Alternativ

Båda metoderna använder samma alternativ som [`saveFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#savefullpagescreen-or-savetabbablepage) eller
[`compareFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#comparefullpagescreen-or-comparetabbablepage).

#### Exempel

Detta är ett exempel på hur tabbning fungerar på vår [guinea pig-webbplats](https://guinea-pig.webdriver.io/image-compare.html):

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### Automatiskt uppdatera misslyckade visuella ögonblicksbilder

Uppdatera baslinjebilderna via kommandoraden genom att lägga till argumentet `--update-visual-baseline`. Detta kommer att

-   automatiskt kopiera den faktiska skärmbilden och lägga den i baslinjen-mappen
-   om det finns skillnader kommer det att låta testet passera eftersom baslinjen har uppdaterats

**Användning:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

När du kör loggar i info/felsökningsläge ser du följande loggar läggas till

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## Typescript-stöd

Denna modul inkluderar TypeScript-stöd, vilket gör att du kan dra nytta av automatisk komplettering, typsäkerhet och förbättrad utvecklarupplevelse när du använder Visual Testing-tjänsten.

### Steg 1: Lägg till typdefinitioner
För att säkerställa att TypeScript känner igen modultyperna, lägg till följande post i typfältet i din tsconfig.json:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Steg 2: Aktivera typsäkerhet för tjänstalternativ
För att tvinga typkontroll på tjänstalternativen, uppdatera din WebdriverIO-konfiguration:

```ts
// wdio.conf.ts
import { join } from 'node:path';
// Importera typdefinitionen
import type { VisualServiceOptions } from '@wdio/visual-service';

export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // Tjänstalternativ
                baselineFolder: join(process.cwd(), './__snapshots__/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
            } satisfies VisualServiceOptions, // Säkerställer typsäkerhet
        ],
    ],
    // ...
};
```

## Systemkrav

### Version 5 och uppåt

För version 5 och uppåt är denna modul en rent JavaScript-baserad modul utan ytterligare systemberoenden utöver de allmänna [projektkraven](/docs/gettingstarted#system-requirements). Den använder [Jimp](https://github.com/jimp-dev/jimp) som är ett bildbehandlingsbibliotek för Node skrivet helt i JavaScript, utan några systemspecifika beroenden.

### Version 4 och lägre

För version 4 och lägre förlitar sig denna modul på [Canvas](https://github.com/Automattic/node-canvas), en canvas-implementation för Node.js. Canvas beror på [Cairo](https://cairographics.org/).

#### Installationsdetaljer

Som standard kommer binärfiler för macOS, Linux och Windows att laddas ned under ditt projekts `npm install`. Om du inte har ett operativsystem eller en processorarkitektur som stöds kommer modulen att kompileras på ditt system. Detta kräver flera beroenden, inklusive Cairo och Pango.

För detaljerad installationsinformation, se [node-canvas wiki](https://github.com/Automattic/node-canvas/wiki/_pages). Nedan finns installationsinstruktioner på en rad för vanliga operativsystem. Observera att `libgif/giflib`, `librsvg` och `libjpeg` är valfria och endast behövs för stöd för GIF, SVG respektive JPEG. Cairo v1.10.0 eller senare krävs.

<Tabs
defaultValue="osx"
values={[
{label: 'OS', value: 'osx'},
{label: 'Ubuntu', value: 'ubuntu'},
{label: 'Fedora', value: 'fedora'},
{label: 'Solaris', value: 'solaris'},
{label: 'OpenBSD', value: 'openbsd'},
{label: 'Window', value: 'windows'},
{label: 'Others', value: 'others'},
]}

> <TabItem value="osx">

     Med [Homebrew](https://brew.sh/):

     ```sh
     brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
     ```

    **Mac OS X v10.11+:** Om du nyligen har uppdaterat till Mac OS X v10.11+ och upplever problem vid kompilering, kör följande kommando: `xcode-select --install`. Läs mer om problemet [på Stack Overflow](http://stackoverflow.com/a/32929012/148072).
    Om du har Xcode 10.0 eller högre installerat behöver du NPM 6.4.1 eller högre för att bygga från källkod.

</TabItem>
<TabItem value="ubuntu">

    ```sh
    sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
    ```

</TabItem>
<TabItem value="fedora">

    ```sh
    sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
    ```

</TabItem>
<TabItem value="solaris">

    ```sh
    pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
    ```

</TabItem>
<TabItem value="openbsd">

    ```sh
    doas pkg_add cairo pango png jpeg giflib
    ```

</TabItem>
<TabItem value="windows">

    Se [wikin](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)

</TabItem>
<TabItem value="others">

    Se [wikin](https://github.com/Automattic/node-canvas/wiki)

</TabItem>
</Tabs>