---
id: service-options
title: Servicealternativ
---

Service options är de alternativ som kan ställas in när tjänsten instansieras och kommer att användas för varje metodanrop.

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
-   **Stöds:** Web

Padding som behöver läggas till adressfältet på iOS och Android för att göra en korrekt urklippning av viewporten.

### `autoElementScroll`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `true`
-   **Stöds:** Web, Hybrid App (Webview)

Det här alternativet låter dig inaktivera automatisk scrollning av elementet till visning när en elementskärmdump skapas.

### `addIOSBezelCorners`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Stöds:** Web, Hybrid App (Webview), Native App

Lägg till bezelkanter och skärmutskärning/dynamisk ö till skärmdumpen för iOS-enheter.

:::info OBS
Detta kan endast göras när enhetsnamnet **KAN** automatiskt avgöras och matchar följande lista över normaliserade enhetsnamn. Normalisering kommer att göras av denna modul.
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
-   **Stöds:** Web, Hybrid App (Webview), Native App

Om ingen baslinjebild hittas under jämförelsen kopieras bilden automatiskt till baslinjemappen.

### `baselineFolder`

-   **Typ:** `string|()=> string`
-   **Obligatorisk:** Nej
-   **Standard:** `.path/to/testfile/__snapshots__/`
-   **Stöds:** Web, Hybrid App (Webview), Native App

Katalogen som kommer att innehålla alla baslinjebilder som används under jämförelsen. Om den inte anges kommer standardvärdet att användas, vilket kommer att lagra filerna i en `__snapshots__/`-mapp bredvid specifikationen som kör de visuella testerna. En funktion som returnerar en `string` kan också användas för att ställa in värdet för `baselineFolder`:

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
-   **Stöds:** Web, Hybrid App (Webview), Native App

Ta bort körningsmappen (`actual` & `diff`) vid initialisering

:::info OBS
Detta fungerar endast när [`screenshotPath`](#screenshotpath) är inställd genom plugin-alternativen, och **KOMMER INTE ATT FUNGERA** när du ställer in mapparna i metoderna
:::

### `createJsonReportFiles` **(NYTT)**

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`

Du har nu möjlighet att exportera jämförelseresultaten till en JSON-rapportfil. Genom att ange alternativet `createJsonReportFiles: true` kommer varje bild som jämförs att skapa en rapport som lagras i mappen `actual`, bredvid varje `actual`-bildresultat. Utdata kommer att se ut så här:

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

När alla tester har utförts kommer en ny JSON-fil med samlingen av jämförelserna att genereras och kan hittas i rotkatalogen för din mapp `actual`. Data grupperas efter:

-   `describe` för Jasmine/Mocha eller `Feature` för CucumberJS
-   `it` för Jasmine/Mocha eller `Scenario` för CucumberJS
    och sorteras sedan efter:
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

Rapportdata ger dig möjlighet att bygga din egen visuella rapport utan att göra all magi och datainsamling själv.

:::info OBS
Du behöver använda `@wdio/visual-testing` version `5.2.0` eller högre
:::

### `disableBlinkingCursor`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Stöds:** Web, Hybrid App (Webview)

Aktivera/inaktivera all "blinkande" markör i `input`, `textarea`, `[contenteditable]` i applikationen. Om inställd på `true` kommer markören att ställas in på `transparent` innan en skärmdump tas och återställas när det är klart

### `disableCSSAnimation`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Stöds:** Web, Hybrid App (Webview)

Aktivera/inaktivera alla CSS-animationer i applikationen. Om inställd på `true` kommer alla animationer att inaktiveras innan en skärmdump tas och återställas när det är klart

### `enableLayoutTesting`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Stöds:** Web

Detta döljer all text på en sida så att endast layouten används för jämförelse. Döljandet görs genom att lägga till stilen `'color': 'transparent !important'` till **varje** element.

För utdata se [Test Output](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Genom att använda denna flagga kommer varje element som innehåller text (så inte bara `p, h1, h2, h3, h4, h5, h6, span, a, li`, utan också `div|button|..`) att få denna egenskap. Det finns **ingen** möjlighet att anpassa detta.
:::

### `formatImageName`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Stöds:** Web, Hybrid App (Webview), Native App

Namnet på de sparade bilderna kan anpassas genom att skicka parametern `formatImageName` med en formaterad sträng som:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Följande variabler kan skickas för att formatera strängen och kommer automatiskt att läsas från instansens capabilities.
Om de inte kan bestämmas kommer standardvärdena att användas.

-   `browserName`: Namnet på webbläsaren i de angivna capabilities
-   `browserVersion`: Versionen av webbläsaren som anges i capabilities
-   `deviceName`: Enhetsnamnet från capabilities
-   `dpr`: Enhetens pixelförhållande
-   `height`: Skärmens höjd
-   `logName`: LogName från capabilities
-   `mobile`: Detta lägger till `_app` eller webbläsarnamnet efter `deviceName` för att skilja app-skärmdumpar från webbläsarskärmdumpar
-   `platformName`: Namnet på plattformen i de angivna capabilities
-   `platformVersion`: Versionen av plattformen som anges i capabilities
-   `tag`: Taggen som tillhandahålls i metoderna som anropas
-   `width`: Skärmens bredd

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
-   **Stöds:** Web

Timeout i millisekunder att vänta efter en scrollning. Detta kan hjälpa till att identifiera sidor med lat inläsning.

:::info

Detta fungerar endast när tjänst-/metodalternativet `userBasedFullPageScreenshot` är inställt på `true`, se även [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `true`
-   **Stöds:** Web, Hybrid App (Webview)

Dölj rullningslister i applikationen. Om inställd på true kommer alla rullningslister att inaktiveras innan en skärmdump tas. Detta är inställt på standard `true` för att förhindra extra problem.

### `logLevel`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** `info`
-   **Stöds:** Web, Hybrid App (Webview), Native App

Lägger till extra loggar, alternativen är `debug | info | warn | silent`

Fel loggas alltid till konsolen.

### `savePerInstance`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej
-   **Stöds:** Web, Hybrid App (Webview), Native App

Spara bilderna per instans i en separat mapp så att till exempel alla Chrome-skärmdumpar sparas i en Chrome-mapp som `desktop_chrome`.

### `screenshotPath`

-   **Typ:** `string | () => string`
-   **Standard:** `.tmp/`
-   **Obligatorisk:** nej
-   **Stöds:** Web, Hybrid App (Webview), Native App

Katalogen som kommer att innehålla alla faktiska/olika skärmdumpar. Om den inte anges kommer standardvärdet att användas. En funktion som
returnerar en sträng kan också användas för att ställa in värdet för screenshotPath:

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
-   **Standard:** `6` för Android och `15` för iOS (`6` som standard och `9` läggs till automatiskt för den möjliga hemknappen på iPhones med en skärmutskärning eller iPads som har en hemknapp)
-   **Stöds:** Web

Padding som behöver läggas till verktygsfältet på iOS och Android för att göra en korrekt urklippning av viewporten.

### `userBasedFullPageScreenshot`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Stöds:** Web, Hybrid App (Webview) **Introducerat i visual-service@7.0.0**

Som standard tas skärmdumpar av hela sidor på desktop-webben med WebDriver BiDi-protokollet, vilket möjliggör snabba, stabila och konsekventa skärmdumpar utan scrollning.
När userBasedFullPageScreenshot är inställt på true, simulerar skärmdumpsprocessen en verklig användare: scrollar genom sidan, tar skärmdumpar i viewportstorlek och sätter ihop dem. Denna metod är användbar för sidor med lat inläsning av innehåll eller dynamisk rendering som beror på scrollpositionen.

Använd detta alternativ om din sida är beroende av innehållsinläsning medan du scrollar eller om du vill bevara beteendet hos äldre skärmdumpsmetoder.

### `waitForFontsLoaded`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `true`
-   **Stöds:** Web, Hybrid App (Webview)

Typsnitt, inklusive tredjepartstypsnitt, kan laddas synkront eller asynkront. Asynkron inläsning innebär att typsnitt kan laddas efter att WebdriverIO har fastställt att en sida har fullständigt laddats. För att förhindra problem med typsnittsrendering kommer denna modul som standard att vänta på att alla typsnitt ska laddas innan en skärmdump tas.

## Tabbable-alternativ

:::info OBS

Denna modul stödjer också att rita hur en användare skulle använda sitt tangentbord för att _tabba_ genom webbplatsen genom att rita linjer och punkter från tabbable-element till tabbable-element.<br/>
Arbetet är inspirerat av [Viv Richards](https://github.com/vivrichards600) blogginlägg om ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Sättet tabbable-element väljs på baseras på modulen [tabbable](https://github.com/davidtheclark/tabbable). Om det finns några problem angående tabbningen, kontrollera [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) och särskilt avsnittet [More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Typ:** `object`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Web

Alternativen som kan ändras för linjerna och punkterna om du använder `{save|check}Tabbable`-metoderna. Alternativen förklaras nedan.

#### `tabbableOptions.circle`

-   **Typ:** `object`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Web

Alternativen för att ändra cirkeln.

##### `tabbableOptions.circle.backgroundColor`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Web

Bakgrundsfärgen för cirkeln.

##### `tabbableOptions.circle.borderColor`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Web

Kantfärgen för cirkeln.

##### `tabbableOptions.circle.borderWidth`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Web

Kantbredden för cirkeln.

##### `tabbableOptions.circle.fontColor`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Web

Färgen på texten i cirkeln. Detta kommer endast att visas om [`showNumber`](./#tabbableoptionscircleshownumber) är inställd på `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Web

Familjen av teckensnittet för texten i cirkeln. Detta kommer endast att visas om [`showNumber`](./#tabbableoptionscircleshownumber) är inställd på `true`.

Se till att ställa in typsnitt som stöds av webbläsarna.

##### `tabbableOptions.circle.fontSize`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Web

Storleken på teckensnittet för texten i cirkeln. Detta kommer endast att visas om [`showNumber`](./#tabbableoptionscircleshownumber) är inställd på `true`.

##### `tabbableOptions.circle.size`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Web

Storleken på cirkeln.

##### `tabbableOptions.circle.showNumber`

-   **Typ:** `showNumber`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Web

Visa tabbsekvensens nummer i cirkeln.

#### `tabbableOptions.line`

-   **Typ:** `object`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Web

Alternativen för att ändra linjen.

##### `tabbableOptions.line.color`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Web

Färgen på linjen.

##### `tabbableOptions.line.width`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Web

Bredden på linjen.

## Jämförelsealternativ

### `compareOptions`

-   **Typ:** `object`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) för alla standardvärden
-   **Stöds:** Web, Hybrid App (Webview), Native App (Se [Method Compare options](./method-options#compare-check-options) för mer information)

Jämförelsealternativen kan också ställas in som service-alternativ, de beskrivs i [Method Compare options](/docs/visual-testing/method-options#compare-check-options)