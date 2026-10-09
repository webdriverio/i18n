---
id: visual-testing
title: Visuell testning
description: "Jämför skärmdumpar av skärmar, element eller helsidor mot baslinjer med @wdio/visual-service, inklusive installation och användning."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Vad kan den göra?

WebdriverIO erbjuder bildjämförelser av skärmar, element eller en helsida för

-   🖥️ Skrivbordswebbläsare (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Mobil- / surfplattewebbläsare (Chrome på Android-emulatorer / Safari på iOS-simulatorer / simulatorer / riktiga enheter) via Appium
-   📱 Native-appar (Android-emulatorer / iOS-simulatorer / riktiga enheter) via Appium (🌟 **NYTT** 🌟)
-   📳 Hybridappar via Appium

genom [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service) som är en lättviktig WebdriverIO-tjänst.

Detta låter dig:

-   spara eller jämföra **skärmar/element/helsidor** mot en baslinje
-   automatiskt **skapa en baslinje** när ingen baslinje finns
-   **maskera anpassade regioner** och till och med **automatiskt exkludera** en statusrad och/eller verktygsfält (endast mobil) under en jämförelse
-   öka dimensionerna för elementskärmdumpar
-   **dölja text** vid jämförelse av webbplatser för att:
    -   **förbättra stabiliteten** och förhindra instabilitet vid typsnittsrendering
    -   endast fokusera på webbplatsens **layout**
-   använda **olika jämförelsemetoder** och en uppsättning **ytterligare matchers** för mer lättlästa tester
-   verifiera hur din webbplats **stöder tabbning med tangentbordet)**, se även [Tabba genom en webbplats](#tabbing-through-a-website)
-   och mycket mer, se [tjänst](./visual-testing/service-options)- och [metod](./visual-testing/method-options)-alternativen

Tjänsten är en lättviktig modul för att hämta nödvändig data och skärmdumpar för alla webbläsare/enheter. Jämförelsekraften kommer från [Pixelmatch](https://github.com/mapbox/pixelmatch), ett snabbt och precist bibliotek för perceptuell bildjämförelse som använder färgrymden YIQ. Bilder bearbetas med [fast-png](https://github.com/image-js/fast-png), en PNG-codec utan native-beroenden.

:::info OBS För Native-/Hybridappar
Metoderna `saveScreen`, `saveElement`, `checkScreen`, `checkElement` och matcharna `toMatchScreenSnapshot` och `toMatchElementSnapshot` kan användas för Native-appar/kontext.

Använd egenskapen `isHybridApp:true` i dina tjänstinställningar när du vill använda den för hybridappar.
:::

:::caution Uppgraderar du från v9 (eller lägre)?

`@wdio/visual-service` **v10** bytte jämförelsemotor från **ResembleJS** till **[Pixelmatch](https://github.com/mapbox/pixelmatch)**. Pixelmatch använder en perceptuell (YIQ) färgmodell istället för rå RGB, så avvikelseprocenten kommer att skilja sig från v9. Detta innebär:

-   **Din testkod behöver inte ändras.** Alla metodnamn, alternativnamn och matchers är identiska.
-   **Dina baslinjebilder kan behöva uppdateras.** Efter uppgraderingen, kör din testsvit och granska eventuella visuella skillnader. Du kan uppdatera enskilda misslyckade baslinjer med `--update-visual-baseline`, eller radera hela din baslinjemapp och låta `autoSaveBaseline` återskapa den från grunden. Se [FAQ](/docs/visual-testing/faq#my-visual-tests-fail-with-a-difference-how-can-i-update-my-baseline) för detaljer.

:::

## Installation

Det enklaste sättet är att ha `@wdio/visual-service` som ett dev-beroende i din `package.json`, via:

```sh
npm install --save-dev @wdio/visual-service
```

## Användning

`@wdio/visual-service` kan användas som en vanlig tjänst. Du kan konfigurera den i din konfigurationsfil med följande:

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
                // Några alternativ, se dokumentationen för fler
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

När den är konfigurerad i din WebdriverIO-konfiguration kan du börja lägga till visuella assertions i [dina tester](/docs/visual-testing/writing-tests).

### Capabilities
För att använda modulen för visuell testning **behöver du inte lägga till några extra alternativ i dina capabilities**. I vissa fall kan du dock vilja lägga till ytterligare metadata till dina visuella tester, till exempel ett `logName`.

Med `logName` kan du tilldela ett anpassat namn till varje capability, som sedan kan inkluderas i bildfilnamnen. Detta är särskilt användbart för att skilja mellan skärmdumpar tagna i olika webbläsare, enheter eller konfigurationer.

För att aktivera detta kan du definiera `logName` i avsnittet `capabilities` och se till att alternativet `formatImageName` i tjänsten för visuell testning refererar till det. Så här kan du konfigurera det:

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
                // Några alternativ, se dokumentationen för fler
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // Formatet nedan använder `logName` från capabilities
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... fler alternativ
            },
        ],
    ],
    // ...
};
```

#### Hur det fungerar
1. Konfigurera `logName`:

    - I avsnittet `capabilities`, tilldela ett unikt `logName` till varje webbläsare eller enhet. Till exempel identifierar `chrome-mac-15` tester som körs i Chrome på macOS version 15.

2. Anpassad bildnamngivning:

    - Alternativet `formatImageName` integrerar `logName` i skärmdumpens filnamn. Om till exempel `tag` är homepage och upplösningen är `1920x1080` kan det resulterande filnamnet se ut så här:

        `homepage-chrome-mac-15-1920x1080.png`

3. Fördelar med anpassad namngivning:

    - Det blir mycket enklare att skilja mellan skärmdumpar från olika webbläsare eller enheter, särskilt när du hanterar baslinjer och felsöker avvikelser.

4. Anmärkning om standardvärden:

    -Om `logName` inte är angivet i capabilities kommer alternativet `formatImageName` att visa det som en tom sträng i filnamnen (`homepage--15-1920x1080.png`)

### WebdriverIO multi-remote

Vi stöder även [multi-remote](https://webdriver.io/docs/multiremote/). För att detta ska fungera korrekt, se till att du lägger till `wdio-ics:options` i dina
capabilities som du kan se nedan. Detta säkerställer att varje skärmdump får ett eget unikt namn.

[Att skriva dina tester](/docs/visual-testing/writing-tests) skiljer sig inte på något sätt jämfört med att använda [testrunnern](https://webdriver.io/docs/testrunner)

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

Här är ett minimalt exempel på hur du använder `@wdio/visual-service` via `remote`-alternativ:

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

// "Starta" tjänsten för att lägga till de anpassade kommandona till `browser`
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// eller använd detta för att ENDAST spara en skärmdump
await browser.saveFullPageScreen("examplePaged", {});

// eller använd detta för validering. Båda metoderna behöver inte kombineras, se FAQ
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### Tabba genom en webbplats

Du kan kontrollera om en webbplats är tillgänglig genom att använda tangentbordets <kbd>TAB</kbd>-tangent. Att testa denna del av tillgängligheten har alltid varit ett tidskrävande (manuellt) arbete och ganska svårt att göra genom automatisering.
Med metoderna `saveTabbablePage` och `checkTabbablePage` kan du nu rita linjer och punkter på din webbplats för att verifiera tabbordningen.

Var medveten om att detta endast är användbart för skrivbordswebbläsare och **INTE\*\*** för mobila enheter. Alla skrivbordswebbläsare stöder denna funktion.

:::note

Arbetet är inspirerat av [Viv Richards](https://github.com/vivrichards600) och hans blogginlägg om ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

Sättet som tabbbara element väljs på baseras på modulen [tabbable](https://github.com/davidtheclark/tabbable). Om det finns några problem med tabbningen, kontrollera [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) och särskilt avsnittet [More ](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)Details.

:::

#### Hur fungerar det

Båda metoderna skapar ett `canvas`-element på din webbplats och ritar linjer och punkter för att visa var din TAB skulle hamna om en slutanvändare använde den. Därefter skapas en helsidesskärmdump för att ge dig en bra överblick över flödet.

:::important

**Använd `saveTabbablePage` endast när du behöver skapa en skärmdump och INTE vill jämföra den **med en **baslinjebild**.\*\*\*\*

:::

När du vill jämföra tabbflödet med en baslinje kan du använda metoden `checkTabbablePage`. Du behöver **INTE** använda de två metoderna tillsammans. Om det redan finns en baslinjebild skapad, vilket kan göras automatiskt genom att ange `autoSaveBaseline: true` när du instansierar tjänsten,
kommer `checkTabbablePage` först att skapa den _faktiska_ bilden och sedan jämföra den mot baslinjen.

##### Alternativ

Båda metoderna använder samma alternativ som `saveFullPageScreen` eller `compareFullPageScreen`.

#### Exempel

Detta är ett exempel på hur tabbningen fungerar på vår [försökskaninwebbplats](https://guinea-pig.webdriver.io/image-compare.html):

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### Uppdatera misslyckade visuella ögonblicksbilder automatiskt

Uppdatera baslinjebilderna via kommandoraden genom att lägga till argumentet `--update-visual-baseline`. Detta kommer att

-   automatiskt kopiera den faktiska tagna skärmdumpen och placera den i baslinjemappen
-   om det finns skillnader låta testet passera eftersom baslinjen har uppdaterats

**Användning:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

När du kör med loggläget info/debug kommer du att se följande loggar tillagda

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

Denna modul inkluderar TypeScript-stöd, vilket gör att du kan dra nytta av automatisk komplettering, typsäkerhet och en förbättrad utvecklarupplevelse när du använder tjänsten för visuell testning.

### Steg 1: Lägg till typdefinitioner
För att säkerställa att TypeScript känner igen modulens typer, lägg till följande post i fältet types i din tsconfig.json:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Steg 2: Aktivera typsäkerhet för tjänstalternativ
För att tvinga fram typkontroll av tjänstalternativen, uppdatera din WebdriverIO-konfiguration:

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

### Version 10 och senare (aktuell)

För version 10 och senare har denna modul inga ytterligare systemberoenden utöver de allmänna [projektkraven](/docs/gettingstarted#system-requirements). Den använder [Pixelmatch](https://github.com/mapbox/pixelmatch) för perceptuell bildjämförelse och [fast-png](https://github.com/image-js/fast-png) för bildkodning/-avkodning. Båda är ren JavaScript utan några native-beroenden.

### Version 5 till 9 (äldre)

Version 5 till 9 använde [Jimp](https://github.com/jimp-dev/jimp), ett bildbehandlingsbibliotek för Node skrivet helt i JavaScript, utan några native-beroenden. Inga ytterligare systemberoenden krävdes.

### Version 4 och lägre

För version 4 och lägre förlitar sig denna modul på [Canvas](https://github.com/Automattic/node-canvas), en canvas-implementation för Node.js. Canvas är beroende av [Cairo](https://cairographics.org/).

#### Installationsdetaljer

Som standard laddas binärfiler för macOS, Linux och Windows ned under ditt projekts `npm install`. Om du inte har ett operativsystem eller en processorarkitektur som stöds kommer modulen att kompileras på ditt system. Detta kräver flera beroenden, inklusive Cairo och Pango.

För detaljerad installationsinformation, se [node-canvas-wikin](https://github.com/Automattic/node-canvas/wiki/_pages). Nedan finns installationsinstruktioner på en rad för vanliga operativsystem. Observera att `libgif/giflib`, `librsvg` och `libjpeg` är valfria och endast behövs för stöd för GIF, SVG respektive JPEG. Cairo v1.10.0 eller senare krävs.

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

    **Mac OS X v10.11+:** Om du nyligen har uppdaterat till Mac OS X v10.11+ och har problem vid kompilering, kör följande kommando: `xcode-select --install`. Läs mer om problemet [på Stack Overflow](http://stackoverflow.com/a/32929012/148072).
    Om du har Xcode 10.0 eller senare installerat behöver du NPM 6.4.1 eller senare för att bygga från källkod.

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