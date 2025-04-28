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
-   **Stöds:** Webb

Padding som behöver läggas till adressfältet på iOS och Android för att göra en korrekt utskärning av visningsområdet.

### `autoElementScroll`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `true`
-   **Stöds:** Webb, Hybrid App (Webview)

Detta alternativ låter dig inaktivera automatisk rullning av element till visningsområdet när en elementskärmdump skapas.

### `addIOSBezelCorners`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Stöds:** Webb, Hybrid App (Webview), Native App

Lägg till kantskärmar och notch/dynamic island till skärmdumpen för iOS-enheter.

:::info NOTERA
Detta kan endast göras när enhetsnamnet **KAN** automatiskt bestämmas och matchar följande lista av normaliserade enhetsnamn. Normalisering kommer att utföras av denna modul.
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
-   **Stöds:** Webb, Hybrid App (Webview), Native App

Om ingen baseline-bild hittas under jämförelsen kopieras bilden automatiskt till baseline-mappen.

### `baselineFolder`

-   **Typ:** `string|()=> string`
-   **Obligatorisk:** Nej
-   **Standard:** `.path/to/testfile/__snapshots__/`
-   **Stöds:** Webb, Hybrid App (Webview), Native App

Katalogen som kommer att innehålla alla baseline-bilder som används under jämförelsen. Om inget anges kommer standardvärdet att användas, vilket lagrar filerna i en `__snapshots__/`-mapp bredvid den spec som kör de visuella testerna. En funktion som returnerar en `string` kan också användas för att ställa in värdet för `baselineFolder`:

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
-   **Stöds:** Webb, Hybrid App (Webview), Native App

Ta bort runtime-mappen (`actual` & `diff`) vid initialisering

:::info NOTERA
Detta fungerar endast när [`screenshotPath`](#screenshotpath) är inställt genom plugin-alternativen, och **KOMMER INTE ATT FUNGERA** när du ställer in mapparna i metoderna
:::

### `createJsonReportFiles` **(NY)**

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`

Du har nu möjlighet att exportera jämförelseresultaten till en JSON-rapportfil. Genom att tillhandahålla alternativet `createJsonReportFiles: true`, kommer varje bild som jämförs att skapa en rapport som lagras i mappen `actual`, bredvid varje `actual`-bildresultat. Utdata kommer att se ut så här:

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

När alla tester har körts kommer en ny JSON-fil med samlingen av jämförelserna att genereras och kan hittas i roten av din `actual`-mapp. Data grupperas efter:

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

Rapportdata ger dig möjligheten att bygga din egen visuella rapport utan att behöva göra all magi och datainsamling själv.

:::info NOTERA
Du behöver använda `@wdio/visual-testing` version `5.2.0` eller högre
:::

### `disableBlinkingCursor`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Stöds:** Webb, Hybrid App (Webview)

Aktivera/inaktivera all `input`, `textarea`, `[contenteditable]` markör "blinkande" i applikationen. Om inställt på `true` kommer markören att ställas in på `transparent` innan en skärmdump tas och återställas efteråt

### `disableCSSAnimation`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Stöds:** Webb, Hybrid App (Webview)

Aktivera/inaktivera alla CSS-animationer i applikationen. Om inställt på `true` kommer alla animationer att inaktiveras innan en skärmdump tas och återställas efteråt

### `enableLayoutTesting`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Stöds:** Webb

Detta döljer all text på en sida så att endast layouten kommer att användas för jämförelse. Döljning kommer att göras genom att lägga till stilen `'color': 'transparent !important'` till **varje** element.

För utdata, se [Test Output](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Genom att använda denna flagga kommer varje element som innehåller text (alltså inte bara `p, h1, h2, h3, h4, h5, h6, span, a, li`, utan även `div|button|..`) att få denna egenskap. Det finns **ingen** möjlighet att anpassa detta.
:::

### `formatImageName`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Stöds:** Webb, Hybrid App (Webview), Native App

Namnet på de sparade bilderna kan anpassas genom att skicka parametern `formatImageName` med en formatsträng som:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Följande variabler kan skickas för att formatera strängen och kommer automatiskt att läsas från instansens kapabiliteter.
Om de inte kan bestämmas kommer standardvärdena att användas.

-   `browserName`: Namnet på webbläsaren i de tillhandahållna kapabiliteterna
-   `browserVersion`: Versionen av webbläsaren som anges i kapabiliteterna
-   `deviceName`: Enhetsnamnet från kapabiliteterna
-   `dpr`: Enhetens pixelförhållande
-   `height`: Skärmens höjd
-   `logName`: LogName från kapabiliteterna
-   `mobile`: Detta lägger till `_app`, eller webbläsarnamnet efter `deviceName` för att skilja appskärmdumpar från webbläsarskärmdumpar
-   `platformName`: Namnet på plattformen i de tillhandahållna kapabiliteterna
-   `platformVersion`: Versionen av plattformen som anges i kapabiliteterna
-   `tag`: Taggen som anges i metoderna som anropas
-   `width`: Skärmens bredd

:::info

Du kan inte ange anpassade sökvägar/mappar i `formatImageName`. Om du vill ändra sökvägen, vänligen kontrollera ändring av följande alternativ:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) per metod

:::

### `fullPageScrollTimeout`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** `1500`
-   **Stöds:** Webb

Tidsgränsen i millisekunder att vänta efter en rullning. Detta kan hjälpa till att identifiera sidor med lat laddning.

:::info

Detta fungerar endast när service/metodalternativet `userBasedFullPageScreenshot` är inställt på `true`, se även [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `true`
-   **Stöds:** Webb, Hybrid App (Webview)

Dölj rullningslister i applikationen. Om inställt på true kommer alla rullningslister att inaktiveras innan en skärmdump tas. Detta är inställt på standard `true` för att förhindra extra problem.

### `logLevel`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** `info`
-   **Stöds:** Webb, Hybrid App (Webview), Native App

Lägger till extra loggar, alternativen är `debug | info | warn | silent`

Fel loggas alltid till konsolen.

### `savePerInstance`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej
-   **Stöds:** Webb, Hybrid App (Webview), Native App

Spara bilderna per instans i en separat mapp så att exempelvis alla Chrome-skärmdumpar sparas i en Chrome-mapp som `desktop_chrome`.

### `screenshotPath`

-   **Typ:** `string | () => string`
-   **Standard:** `.tmp/`
-   **Obligatorisk:** nej
-   **Stöds:** Webb, Hybrid App (Webview), Native App

Katalogen som kommer att innehålla alla faktiska/olika skärmdumpar. Om inget anges kommer standardvärdet att användas. En funktion som
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
-   **Standard:** `6` för Android och `15` för iOS (`6` som standard och `9` läggs till automatiskt för den möjliga hemknappen på iPhones med en notch eller iPads som har en hemknapp)
-   **Stöds:** Webb

Padding som behöver läggas till verktygsfältet på iOS och Android för att göra en korrekt utskärning av visningsområdet.

### `userBasedFullPageScreenshot`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Stöds:** Webb, Hybrid App (Webview) **Introducerad i visual-service@7.0.0**

Som standard fångas fullsidesskärmdumpar på desktop-webben med WebDriver BiDi-protokollet, vilket möjliggör snabba, stabila och konsekventa skärmdumpar utan rullning.
När userBasedFullPageScreenshot är inställt på true simulerar skärmdumpsprocessen en verklig användare: rullning genom sidan, fånga visningsområdesstorleksskärmdumpar och sammanfoga dem. Denna metod är användbar för sidor med lat laddning av innehåll eller dynamisk rendering som beror på rullningsposition.

Använd detta alternativ om din sida är beroende av innehållsladdning under rullning eller om du vill bevara beteendet för äldre skärmdumpsmetoder.

### `waitForFontsLoaded`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `true`
-   **Stöds:** Webb, Hybrid App (Webview)

Typsnitt, inklusive tredjepartstypsnitt, kan laddas synkront eller asynkront. Asynkron laddning innebär att typsnitt kan laddas efter att WebdriverIO fastställer att en sida har laddats helt. För att förhindra problem med typsnittåtergivning kommer denna modul som standard att vänta på att alla typsnitt laddas innan en skärmdump tas.

## Tabbable-alternativ

:::info NOTERA

Denna modul stöder också att rita hur en användare skulle använda sitt tangentbord för att _tabba_ genom webbplatsen genom att rita linjer och punkter från tabbable element till tabbable element.<br/>
Arbetet är inspirerat av [Viv Richards](https://github.com/vivrichards600) hans blogginlägg om ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Sättet tabbable element väljs baseras på modulen [tabbable](https://github.com/davidtheclark/tabbable). Om det finns några problem angående tabbning, vänligen kontrollera [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) och särskilt [More details section](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Typ:** `object`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Webb

Alternativen som kan ändras för linjerna och punkterna om du använder `{save|check}Tabbable`-metoderna. Alternativen förklaras nedan.

#### `tabbableOptions.circle`

-   **Typ:** `object`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Webb

Alternativen för att ändra cirkeln.

##### `tabbableOptions.circle.backgroundColor`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Webb

Bakgrundsfärgen på cirkeln.

##### `tabbableOptions.circle.borderColor`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Webb

Kantfärgen på cirkeln.

##### `tabbableOptions.circle.borderWidth`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Webb

Kantbredden på cirkeln.

##### `tabbableOptions.circle.fontColor`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Webb

Färgen på texten i cirkeln. Detta kommer endast att visas om [`showNumber`](./#tabbableoptionscircleshownumber) är inställt på `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Webb

Typsnittsfamiljen för texten i cirkeln. Detta kommer endast att visas om [`showNumber`](./#tabbableoptionscircleshownumber) är inställt på `true`.

Se till att ställa in typsnitt som stöds av webbläsarna.

##### `tabbableOptions.circle.fontSize`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Webb

Storleken på texten i cirkeln. Detta kommer endast att visas om [`showNumber`](./#tabbableoptionscircleshownumber) är inställt på `true`.

##### `tabbableOptions.circle.size`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Webb

Storleken på cirkeln.

##### `tabbableOptions.circle.showNumber`

-   **Typ:** `showNumber`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Webb

Visa tabbsekvensens nummer i cirkeln.

#### `tabbableOptions.line`

-   **Typ:** `object`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Webb

Alternativen för att ändra linjen.

##### `tabbableOptions.line.color`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Webb

Färgen på linjen.

##### `tabbableOptions.line.width`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) för alla standardvärden
-   **Stöds:** Webb

Bredden på linjen.

## Jämförelsealternativ

### `compareOptions`

-   **Typ:** `object`
-   **Obligatorisk:** Nej
-   **Standard:** Se [här](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) för alla standardvärden
-   **Stöds:** Webb, Hybrid App (Webview), Native App (Se [Method Compare options](./method-options#compare-check-options) för mer information)

Jämförelsealternativen kan också ställas in som servicealternativ, de beskrivs i [Method Compare options](/docs/visual-testing/method-options#compare-check-options)