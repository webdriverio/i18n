---
id: service-options
title: Servicealternativ
---

Service-alternativ är de alternativ som kan ställas in när tjänsten instansieras och kommer att användas för varje metodanrop.

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // The options
            },
        ],
    ],
    // ...
};
```

## Standardalternativ

### `addressBarShadowPadding`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** `6`
-   **Stödda applikationskontexter:** Webb

Utfyllnaden som behöver läggas till adressfältet på iOS och Android för att göra en korrekt utskärning av visningsområdet.

### `autoElementScroll`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `true`
-   **Stödda applikationskontexter:** Webb, Hybrid-app (Webview)

Detta alternativ låter dig inaktivera automatisk rullning av element in i vyn när en element-skärmdump skapas.

### `addIOSBezelCorners`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Stödda applikationskontexter:** Webb, Hybrid-app (Webview), Native-app

Lägg till ramhörn och notch/dynamic island till skärmdumpen för iOS-enheter.

:::info OBS
Detta kan endast göras när enhetsnamnet **KAN** bestämmas automatiskt och matchar följande lista av normaliserade enhetsnamn. Normalisering kommer att utföras av denna modul.
**iPhone:**

-   iPhone X: `iphonex`
-   iPhone XS: `iphonexs`
-   iPhone XS Max: `iphonexsmax`
-   iPhone XR: `iphonexr`
-   iPhone 11: `iphone11`
-   iPhone 11 Pro: `iphone11pro`
-   iPhone 11 Pro Max: `iphone11promax`
-   iPhone 12: `iphone12`
-   iPhone 12 Mini: `iphone12mini`
-   iPhone 12 Pro: `iphone12pro`
-   iPhone 12 Pro Max: `iphone12promax`
-   iPhone 13: `iphone13`
-   iPhone 13 Mini: `iphone13mini`
-   iPhone 13 Pro: `iphone13pro`
-   iPhone 13 Pro Max: `iphone13promax`
-   iPhone 14: `iphone14`
-   iPhone 14 Plus: `iphone14plus`
-   iPhone 14 Pro: `iphone14pro`
-   iPhone 14 Pro Max: `iphone14promax`
    **iPads:**
-   iPad Mini 6th Generation: `ipadmini`
-   iPad Air 4th Generation: `ipadair`
-   iPad Air 5th Generation: `ipadair`
-   iPad Pro (11-inch) 1st Generation: `ipadpro11`
-   iPad Pro (11-inch) 2nd Generation: `ipadpro11`
-   iPad Pro (11-inch) 3rd Generation: `ipadpro11`
-   iPad Pro (12.9-inch) 3rd Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 4th Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 5th Generation: `ipadpro129`
:::

### `autoSaveBaseline`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `true`
-   **Stödda applikationskontexter:** Webb, Hybrid-app (Webview), Native-app

Om ingen baseline-bild hittas under jämförelsen kopieras bilden automatiskt till baseline-mappen.

### `alwaysSaveActualImage`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `true`
-   **Stödda applikationskontexter:** Alla

När detta alternativ sätts till `false` kommer det att:

- inte spara den faktiska bilden när det **inte** finns någon skillnad
- inte lagra jsonrapport-filen när `createJsonReportFiles` är satt till `true`. Det kommer också visa en varning i loggarna att `createJsonReportFiles` är inaktiverat

Detta bör skapa bättre prestanda eftersom inga filer skrivs till systemet och bör säkerställa att det inte finns mycket brus i mappen `actual`.

### `baselineFolder`

-   **Typ:** `string|()=> string`
-   **Obligatorisk:** Nej
-   **Standard:** `.path/to/testfile/__snapshots__/`
-   **Stödda applikationskontexter:** Webb, Hybrid-app (Webview), Native-app

Katalogen som kommer att innehålla alla baseline-bilder som används under jämförelsen. Om den inte är inställd kommer standardvärdet att användas, vilket lagrar filerna i en `__snapshots__/`-mapp bredvid specifikationen som kör de visuella testerna. En funktion som returnerar en `string` kan också användas för att ställa in `baselineFolder`-värdet:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// ELLER
{
    baselineFolder: () => {
        // Gör lite magi här
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Stödda applikationskontexter:** Webb, Hybrid-app (Webview), Native-app

Radera runtime-mappen (`actual` & `diff`) vid initialisering

:::info OBS
Detta fungerar endast när [`screenshotPath`](#screenshotpath) är inställd via plugin-alternativen och **KOMMER INTE ATT FUNGERA** när du ställer in mapparna i metoderna
:::

### `createJsonReportFiles` **(NY)**

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`

Du har nu möjlighet att exportera jämförelseresultaten till en JSON-rapportfil. Genom att ange alternativet `createJsonReportFiles: true` kommer varje bild som jämförs att skapa en rapport som lagras i mappen `actual`, bredvid varje `actual`-bildresultat. Utskriften kommer att se ut så här:

```json
{
    "parent": "check methods",
    "test": "should fail comparing with a baseline",
    "tag": "examplePageFail",
    "instanceData": {
        "browser": {
            "name": "chrome-headless-shell",
            "version": "126.0.6478.183"
        },
        "platform": {
            "name": "mac",
            "version": "not-known"
        }
    },
    "commandName": "checkScreen",
    "boundingBoxes": {
        "diffBoundingBoxes": [
            {
                "left": 1088,
                "top": 717,
                "right": 1186,
                "bottom": 730
            }
            //....
        ],
        "ignoredBoxes": [
            {
                "left": 159,
                "top": 652,
                "right": 356,
                "bottom": 703
            }
            //...
        ]
    },
    "fileData": {
        "actualFilePath": "/Users/wdio/visual-testing/.tmp/actual/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "baselineFilePath": "/Users/wdio/visual-testing/localBaseline/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "diffFilePath": "/Users/wdio/visual-testing/.tmp/diff/desktop_chrome-headless-shell/examplePageFail-local-chrome-latest-1366x768png",
        "fileName": "examplePageFail-local-chrome-latest-1366x768.png",
        "size": {
            "actual": {
                "height": 768,
                "width": 1366
            },
            "baseline": {
                "height": 768,
                "width": 1366
            },
            "diff": {
                "height": 768,
                "width": 1366
            }
        }
    },
    "misMatchPercentage": "12.90",
    "rawMisMatchPercentage": 12.900729014153246
}
```

När alla tester är utförda kommer en ny JSON-fil med samlingen av jämförelserna att genereras och kan hittas i roten av din `actual`-mapp. Datan är grupperad efter:

-   `describe` för Jasmine/Mocha eller `Feature` för CucumberJS
-   `it` för Jasmine/Mocha eller `Scenario` för CucumberJS
    och sedan sorterad efter:
-   `commandName`, vilket är jämförelsemetodnamnen som används för att jämföra bilderna
-   `instanceData`, webbläsare först, sedan enhet, sedan plattform
    det kommer att se ut så här

```json
[
    {
        "description": "check methods",
        "data": [
            {
                "test": "should fail comparing with a baseline",
                "data": [
                    {
                        "tag": "examplePageFail",
                        "instanceData": {},
                        "commandName": "checkScreen",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "14.34",
                        "rawMisMatchPercentage": 14.335403703025868
                    },
                    {
                        "tag": "exampleElementFail",
                        "instanceData": {},
                        "commandName": "checkElement",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "1.34",
                        "rawMisMatchPercentage": 1.335403703025868
                    }
                ]
            }
        ]
    }
]
```

Rapportdatan ger dig möjlighet att bygga din egen visuella rapport utan att göra all magi och datainsamling själv.

:::info OBS
Du behöver använda `@wdio/visual-testing` version `5.2.0` eller högre
:::

### `disableBlinkingCursor`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Stödda applikationskontexter:** Webb, Hybrid-app (Webview)

Aktivera/inaktivera alla `input`, `textarea`, `[contenteditable]` markör "blinkningar" i applikationen. Om inställt till `true` kommer markören att sättas till `transparent` innan en skärmdump tas och återställas när det är klart

### `disableCSSAnimation`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Stödda applikationskontexter:** Webb, Hybrid-app (Webview)

Aktivera/inaktivera alla CSS-animeringar i applikationen. Om inställt till `true` kommer alla animationer att inaktiveras innan en skärmdump tas och återställas när det är klart

### `enableLayoutTesting`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Stödda applikationskontexter:** Webb

Detta kommer att dölja all text på en sida så att endast layouten används för jämförelse. Döljandet görs genom att lägga till stilen `'color': 'transparent !important'` till **varje** element.

För utdata, se [Test Output](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Genom att använda denna flagga kommer varje element som innehåller text (alltså inte bara `p, h1, h2, h3, h4, h5, h6, span, a, li`, utan även `div|button|..`) att få denna egenskap. Det finns **inget** alternativ för att anpassa detta.
:::

### `formatImageName`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Stödda applikationskontexter:** Webb, Hybrid-app (Webview), Native-app

Namnet på de sparade bilderna kan anpassas genom att skicka parametern `formatImageName` med en formaterad sträng som:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Följande variabler kan skickas för att formatera strängen och kommer automatiskt att läsas från instansens kapaciteter.
Om de inte kan bestämmas kommer standardvärdena att användas.

-   `browserName`: Namnet på webbläsaren i de tillhandahållna kapaciteterna
-   `browserVersion`: Versionen av webbläsaren som anges i kapaciteterna
-   `deviceName`: Enhetsnamnet från kapaciteterna
-   `dpr`: Enhetens pixelförhållande
-   `height`: Höjden på skärmen
-   `logName`: LogName från kapaciteterna
-   `mobile`: Detta lägger till `_app`, eller webbläsarnamnet efter `deviceName` för att skilja app-skärmdumpar från webbläsarskärmdumpar
-   `platformName`: Namnet på plattformen i de tillhandahållna kapaciteterna
-   `platformVersion`: Versionen av plattformen som anges i kapaciteterna
-   `tag`: Taggen som anges i metoderna som anropas
-   `width`: Bredden på skärmen

:::info

Du kan inte ange anpassade sökvägar/mappar i `formatImageName`. Om du vill ändra sökvägen, kontrollera då följande alternativ:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) per metod

:::

### `fullPageScrollTimeout`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** `1500`
-   **Stödda applikationskontexter:** Webb

Timeout i millisekunder att vänta efter en rullning. Detta kan hjälpa till att identifiera sidor med lat laddning.

:::info

Detta fungerar endast när service/metodalternativet `userBasedFullPageScreenshot` är satt till `true`, se även [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `true`
-   **Stödda applikationskontexter:** Webb, Hybrid-app (Webview)

Dölj rullningslister i applikationen. Om inställt till true kommer alla rullningslister att inaktiveras innan en skärmdump tas. Detta är inställt till standard `true` för att förhindra extra problem.

### `logLevel`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** `info`
-   **Stödda applikationskontexter:** Webb, Hybrid-app (Webview), Native-app

Lägger till extra loggar, alternativ är `debug | info | warn | silent`

Fel loggas alltid till konsolen.

### `savePerInstance`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej
-   **Stödda applikationskontexter:** Webb, Hybrid-app (Webview), Native-app

Spara bilderna per instans i en separat mapp så att till exempel alla Chrome-skärmdumpar sparas i en Chrome-mapp som `desktop_chrome`.

### `screenshotPath`

-   **Typ:** `string | () => string`
-   **Standard:** `.tmp/`
-   **Obligatorisk:** nej
-   **Stödda applikationskontexter:** Webb, Hybrid-app (Webview), Native-app

Katalogen som kommer att innehålla alla faktiska/olika skärmdumpar. Om den inte är inställd kommer standardvärdet att användas. En funktion som
returnerar en sträng kan också användas för att ställa in screenshotPath-värdet:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// ELLER
{
    screenshotPath: () => {
        // Gör lite magi här
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** `6` för Android och `15` för iOS (`6` som standard och `9` läggs till automatiskt för den möjliga hemknappen på iPhone med en notch eller iPads som har en hemknapp)
-   **Stödda applikationskontexter:** Webb

Utfyllnaden som behöver läggas till verktygsfältet på iOS och Android för att göra en korrekt utskärning av visningsområdet.

### `userBasedFullPageScreenshot`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Stödda applikationskontexter:** Webb, Hybrid-app (Webview) **Introducerad i visual-service@7.0.0**

Som standard tas fullsidesbilder på desktop-webben med WebDriver BiDi-protokollet, vilket möjliggör snabba, stabila och konsekventa skärmbilder utan rullning.
När userBasedFullPageScreenshot är inställt på true simulerar skärmbildsprocessen en verklig användare: den rullar genom sidan, tar skärmbilder i visningsområdets storlek och syr ihop dem. Denna metod är användbar för sidor med latladdat innehåll eller dynamisk rendering som beror på rullningsposition.

Använd detta alternativ om din sida förlitar sig på innehåll som laddas medan du rullar eller om du vill bevara beteendet hos äldre skärmdumpsmetoder.

### `waitForFontsLoaded`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `true`
-   **Stödda applikationskontexter:** Webb, Hybrid-app (Webview)

Teckensnitt, inklusive tredjepartsteckensnitt, kan laddas synkront eller asynkront. Asynkron laddning betyder att teckensnitt kan laddas efter att WebdriverIO fastställer att en sida har laddats helt. För att förhindra problem med teckensnittåtergivning kommer denna modul som standard att vänta på att alla teckensnitt laddas innan en skärmdump tas.

## Tabbable-alternativ

:::info OBS

Denna modul stöder också att rita hur en användare skulle använda sitt tangentbord för att _tabba_ genom webbplatsen genom att rita linjer och prickar från tabbable-element till tabbable-element.<br/>
Arbetet är inspirerat av [Viv Richards](https://github.com/vivrichards600) hans blogginlägg om ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Sättet som tabbable-element väljs baseras på modulen [tabbable](https://github.com/davidtheclark/tabbable). Om det finns några problem angående tabbningen, kontrollera [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) och särskilt [More details-avsnittet](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Typ:** `object`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) för alla standardvärden
-   **Stödda applikationskontexter:** Webb

Alternativ som kan ändras för linjerna och prickarna om du använder `{save|check}Tabbable`-metoderna. Alternativen förklaras nedan.

#### `tabbableOptions.circle`

-   **Typ:** `object`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) för alla standardvärden
-   **Stödda applikationskontexter:** Webb

Alternativen för att ändra cirkeln.

##### `tabbableOptions.circle.backgroundColor`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) för alla standardvärden
-   **Stödda applikationskontexter:** Webb

Bakgrundsfärgen på cirkeln.

##### `tabbableOptions.circle.borderColor`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) för alla standardvärden
-   **Stödda applikationskontexter:** Webb

Ramfärgen på cirkeln.

##### `tabbableOptions.circle.borderWidth`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) för alla standardvärden
-   **Stödda applikationskontexter:** Webb

Rambredden på cirkeln.

##### `tabbableOptions.circle.fontColor`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) för alla standardvärden
-   **Stödda applikationskontexter:** Webb

Färgen på teckensnittet för texten i cirkeln. Detta visas endast om [`showNumber`](./#tabbableoptionscircleshownumber) är inställt på `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) för alla standardvärden
-   **Stödda applikationskontexter:** Webb

Familjen av teckensnittet för texten i cirkeln. Detta visas endast om [`showNumber`](./#tabbableoptionscircleshownumber) är inställt på `true`.

Se till att ställa in teckensnitt som stöds av webbläsarna.

##### `tabbableOptions.circle.fontSize`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) för alla standardvärden
-   **Stödda applikationskontexter:** Webb

Storleken på teckensnittet för texten i cirkeln. Detta visas endast om [`showNumber`](./#tabbableoptionscircleshownumber) är inställt på `true`.

##### `tabbableOptions.circle.size`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) för alla standardvärden
-   **Stödda applikationskontexter:** Webb

Storleken på cirkeln.

##### `tabbableOptions.circle.showNumber`

-   **Typ:** `showNumber`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) för alla standardvärden
-   **Stödda applikationskontexter:** Webb

Visa tabbsekvensens nummer i cirkeln.

#### `tabbableOptions.line`

-   **Typ:** `object`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) för alla standardvärden
-   **Stödda applikationskontexter:** Webb

Alternativen för att ändra linjen.

##### `tabbableOptions.line.color`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) för alla standardvärden
-   **Stödda applikationskontexter:** Webb

Färgen på linjen.

##### `tabbableOptions.line.width`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) för alla standardvärden
-   **Stödda applikationskontexter:** Webb

Bredden på linjen.

## Jämförelsealternativ

### `compareOptions`

-   **Typ:** `object`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) för alla standardvärden
-   **Stödda applikationskontexter:** Webb, Hybrid-app (Webview), Native-app (Se [Metod Jämförelsealternativ](./method-options#compare-check-options) för mer information)

Jämförelsealternativen kan också ställas in som service-alternativ, de beskrivs i [Metod Jämförelsealternativ](/docs/visual-testing/method-options#compare-check-options)