---
id: service-options
title: Tjänstalternativ
description: "Konfigurera standardalternativ för den visuella tjänsten, inklusive skärmdumpstagning, helsidesskärmdumpar, baslinjer, mappar och rapportering."
---

Tjänstalternativ är de alternativ som kan anges när tjänsten instansieras och som används vid varje metodanrop.

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
                // Alternativen
            },
        ],
    ],
    // ...
};
```

# Standardalternativ

## Skärmdumpstagning

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Döljer rullningslister i applikationen. Om värdet är true inaktiveras alla rullningslister innan en skärmdump tas. Standardvärdet är `true` för att förhindra ytterligare problem.

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

Aktiverar/inaktiverar "blinkningen" av markören i alla `input`, `textarea` och `[contenteditable]` i applikationen. Om värdet är `true` sätts markören till `transparent` innan en skärmdump tas
och återställs när det är klart

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

Aktiverar/inaktiverar alla CSS-animationer i applikationen. Om värdet är `true` inaktiveras alla animationer innan en skärmdump tas
och återställs när det är klart

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No" contexts="Web">

Detta döljer all text på en sida så att endast layouten används vid jämförelsen. Döljningen görs genom att lägga till stilen `'color': 'transparent !important'` på **varje** element.

För utdata, se [Testutdata](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Genom att använda denna flagga får varje element som innehåller text (alltså inte bara `p, h1, h2, h3, h4, h5, h6, span, a, li`, utan även `div|button|..`) denna egenskap. Det finns **inget** alternativ för att skräddarsy detta.
:::

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No" contexts="Web, Hybrid App (Webview)">

Utfyllnad i enhetspixlar som läggs till på varje sida av ignorerade regioner, vilket gör varje region 2× detta värde bredare och högre. Detta hjälper till att undvika gränsskillnader på 1 px som kan uppstå på skärmar med hög DPR eller med BiDi-skärmdumpsprotokollet. Ange `0` för att inaktivera.

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Typsnitt, inklusive typsnitt från tredje part, kan laddas synkront eller asynkront. Asynkron laddning innebär att typsnitt kan laddas efter att WebdriverIO har fastställt att en sida är helt laddad. För att förhindra problem med typsnittsrendering väntar denna modul som standard på att alla typsnitt har laddats innan en skärmdump tas.

</Option>
## Helsidesskärmdumpar

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview) **Introduced in visual-service@7.0.0">

Som standard tas helsidesskärmdumpar på webb för datorer med hjälp av WebDriver BiDi-protokollet, vilket möjliggör snabba, stabila och konsekventa skärmdumpar utan rullning.
När userBasedFullPageScreenshot är satt till true simulerar skärmdumpsprocessen en riktig användare: den rullar genom sidan, tar skärmdumpar i visningsområdets storlek och sätter ihop dem. Denna metod är användbar för sidor med lat laddat innehåll eller dynamisk rendering som beror på rullningspositionen.

Använd detta alternativ om din sida förlitar sig på att innehåll laddas vid rullning eller om du vill behålla beteendet hos äldre skärmdumpsmetoder.

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No" contexts="Web">

Tidsgränsen i millisekunder att vänta efter en rullning. Detta kan hjälpa till att identifiera sidor med lat laddning.

:::info

Detta fungerar endast när tjänst-/metodalternativet `userBasedFullPageScreenshot` är satt till `true`, se även [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedfullpagescreenshot)

:::

</Option>
## Mobil & enhet

---

### `isHybridApp`

<Option type="boolean" default="false" required="No" contexts="Hybrid App (Webview)">

Sätt detta till `true` när du testar en hybridapp (ett nativt skal med en eller flera inbäddade webviews). Detta justerar hur modulen hanterar utskärningar för statusfält och adressfält på webview-baserade skärmar och faller tillbaka på säkra standardvärden när data om enhetens rektanglar inte finns tillgänglig från det nativa lagret.

</Option>
### `addIOSBezelCorners`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

Lägg till ramhörn och notch/dynamic island på skärmdumpen för iOS-enheter.

:::info OBS
Detta kan endast göras när enhetsnamnet **KAN** fastställas automatiskt och matchar följande lista över normaliserade enhetsnamn. Normaliseringen görs av denna modul.
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
-   iPad Mini 6:e generationen: `ipadmini`
-   iPad Air 4:e generationen: `ipadair`
-   iPad Air 5:e generationen: `ipadair`
-   iPad Pro (11 tum) 1:a generationen: `ipadpro11`
-   iPad Pro (11 tum) 2:a generationen: `ipadpro11`
-   iPad Pro (11 tum) 3:e generationen: `ipadpro11`
-   iPad Pro (12,9 tum) 3:e generationen: `ipadpro129`
-   iPad Pro (12,9 tum) 4:e generationen: `ipadpro129`
-   iPad Pro (12,9 tum) 5:e generationen: `ipadpro129`
:::

</Option>
### `addressBarShadowPadding`

<Option type="number" default="6" required="No" contexts="Web">

Utfyllnaden som behöver läggas till adressfältet på iOS och Android för att göra en korrekt utskärning av visningsområdet.

</Option>
### `toolBarShadowPadding`

<Option type="number" default={`6 for Android and \`15\` for iOS (\`6\` by default and \`9\` will be added automatically for the possible home bar on iPhones with a notch or iPads that have a home bar)`} required="No" contexts="Web">

Utfyllnaden som behöver läggas till verktygsfältet på iOS och Android för att göra en korrekt utskärning av visningsområdet.

</Option>
## Fil- & mapphantering

---

### `baselineFolder`

<Option type="string|()=> string" default=".path/to/testfile/__snapshots__/" required="No" contexts="Web, Hybrid App (Webview), Native App">

Katalogen som kommer att innehålla alla baslinjebilder som används vid jämförelsen. Om den inte anges används standardvärdet, vilket lagrar filerna i en `__snapshots__/`-mapp bredvid den spec-fil som kör de visuella testerna. En funktion som returnerar en `string` kan också användas för att ange värdet för `baselineFolder`:

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

</Option>
### `screenshotPath`

<Option type="string | () => string" default=".tmp/" required="no" contexts="Web, Hybrid App (Webview), Native App">

Katalogen som kommer att innehålla alla faktiska/avvikande skärmdumpar. Om den inte anges används standardvärdet. En funktion som
returnerar en sträng kan också användas för att ange värdet för screenshotPath:

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

</Option>
### `clearRuntimeFolder`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

Radera körningsmappen (`actual` & `diff) vid initiering

:::info OBS
Detta fungerar endast när [`screenshotPath`](#screenshotpath) anges via pluginalternativen och **FUNGERAR INTE** när du anger mapparna i metoderna
:::

</Option>
### `savePerInstance`

<Option type="boolean" default="false" required="no" contexts="Web, Hybrid App (Webview), Native App">

Spara bilderna per instans i en separat mapp, så att till exempel alla Chrome-skärmdumpar sparas i en Chrome-mapp som `desktop_chrome`.

</Option>
### `formatImageName`

<Option type="string" default={`{tag}-{browserName}-{width}x{height}-dpr-{dpr}`} required="No" contexts="Web, Hybrid App (Webview), Native App">

Namnet på de sparade bilderna kan anpassas genom att skicka parametern `formatImageName` med en formatsträng som:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Följande variabler kan användas för att formatera strängen och läses automatiskt från instansens capabilities.
Om de inte kan fastställas används standardvärdena.

-   `browserName`: Namnet på webbläsaren i de angivna capabilities
-   `browserVersion`: Versionen av webbläsaren som anges i capabilities
-   `deviceName`: Enhetsnamnet från capabilities
-   `dpr`: Enhetens pixelförhållande (device pixel ratio)
-   `height`: Skärmens höjd
-   `logName`: logName från capabilities
-   `mobile`: Detta lägger till `_app` eller webbläsarnamnet efter `deviceName` för att skilja appskärmdumpar från webbläsarskärmdumpar
-   `platformName`: Namnet på plattformen i de angivna capabilities
-   `platformVersion`: Versionen av plattformen som anges i capabilities
-   `tag`: Taggen som anges i metoden som anropas
-   `width`: Skärmens bredd

:::info

Du kan inte ange anpassade sökvägar/mappar i `formatImageName`. Om du vill ändra sökvägen, se då över att ändra följande alternativ:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) per metod

:::

</Option>
## Baslinje- & sparbeteende

---

### `autoSaveBaseline`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview), Native App">

Om ingen baslinjebild hittas under jämförelsen kopieras bilden automatiskt till baslinjemappen.

</Option>
### `autoElementScroll`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Detta alternativ låter dig inaktivera den automatiska rullningen av elementet in i vyn när en elementskärmdump skapas.

</Option>
### `alwaysSaveActualImage`

<Option type="boolean" default="true" required="No" contexts="All">

När detta alternativ sätts till `false` kommer det att:

- inte spara den faktiska bilden när det **inte** finns någon skillnad
- inte lagra JSON-rapportfilen när `createJsonReportFiles` är satt till `true`. Det visar också en varning i loggarna om att `createJsonReportFiles` är inaktiverat

Detta bör ge bättre prestanda eftersom inga filer skrivs till systemet, och bör säkerställa att det inte blir mycket brus i mappen `actual`.

</Option>
## Rapportering

---

### `createJsonReportFiles` **(NY)**

<Option type="boolean" default="false" required="No">

Du har nu möjlighet att exportera jämförelseresultaten till en JSON-rapportfil. Genom att ange alternativet `createJsonReportFiles: true` skapar varje bild som jämförs en rapport som lagras i mappen `actual`, bredvid varje `actual`-bildresultat. Utdata ser ut så här:

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

När alla tester har körts genereras en ny JSON-fil med samlingen av jämförelserna, och den finns i roten av din `actual`-mapp. Datan grupperas efter:

-   `describe` för Jasmine/Mocha eller `Feature` för CucumberJS
-   `it` för Jasmine/Mocha eller `Scenario` för CucumberJS
    och sorteras sedan efter:
-   `commandName`, vilket är namnen på de jämförelsemetoder som används för att jämföra bilderna
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

Rapportdatan ger dig möjlighet att bygga din egen visuella rapport utan att själv behöva utföra all magi och datainsamling.

:::info OBS
Du behöver använda `@wdio/visual-testing` version `5.2.0` eller högre
:::

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No" contexts="Web, Hybrid App (Webview), Native App">

Pixelnärheten som används för att gruppera avvikande pixlar i JSON-rapporten som genereras av [`createJsonReportFiles`](#createjsonreportfiles). Högre värden grupperar fler pixlar i färre avgränsningsrutor; lägre värden ger mer exakta men fler rutor.

</Option>
## Allmänt

---

### `logLevel`

<Option type="string" default="info" required="No" contexts="Web, Hybrid App (Webview), Native App">

Lägger till extra loggar, alternativen är `debug | info | warn | silent`

Fel loggas alltid till konsolen.

</Option>
## Alternativ för tabbningsbara element

:::info OBS

Denna modul stöder också att rita upp hur en användare skulle använda sitt tangentbord för att _tabba_ genom webbplatsen, genom att rita linjer och punkter från tabbningsbart element till tabbningsbart element.<br/>
Arbetet är inspirerat av [Viv Richards](https://github.com/vivrichards600) och hans blogginlägg om ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Sättet som tabbningsbara element väljs ut på baseras på modulen [tabbable](https://github.com/davidtheclark/tabbable). Om det uppstår problem med tabbningen, se [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) och särskilt [avsnittet More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Alternativen som kan ändras för linjerna och punkterna om du använder `{save|check}Tabbable`-metoderna. Alternativen förklaras nedan.

</Option>
#### `tabbableOptions.circle`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Alternativen för att ändra cirkeln.

</Option>
##### `tabbableOptions.circle.backgroundColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Cirkelns bakgrundsfärg.

</Option>
##### `tabbableOptions.circle.borderColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Cirkelns kantfärg.

</Option>
##### `tabbableOptions.circle.borderWidth`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Cirkelns kantbredd.

</Option>
##### `tabbableOptions.circle.fontColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Färgen på typsnittet för texten i cirkeln. Detta visas endast om [`showNumber`](./#tabbableoptionscircleshownumber) är satt till `true`.

</Option>
##### `tabbableOptions.circle.fontFamily`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Typsnittsfamiljen för texten i cirkeln. Detta visas endast om [`showNumber`](./#tabbableoptionscircleshownumber) är satt till `true`.

Se till att ange typsnitt som stöds av webbläsarna.

</Option>
##### `tabbableOptions.circle.fontSize`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Typsnittsstorleken för texten i cirkeln. Detta visas endast om [`showNumber`](./#tabbableoptionscircleshownumber) är satt till `true`.

</Option>
##### `tabbableOptions.circle.size`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Cirkelns storlek.

</Option>
##### `tabbableOptions.circle.showNumber`

<Option type="showNumber" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Visa tabbordningens nummer i cirkeln.

</Option>
#### `tabbableOptions.line`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Alternativen för att ändra linjen.

</Option>
##### `tabbableOptions.line.color`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Linjens färg.

</Option>
##### `tabbableOptions.line.width`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Linjens bredd.

</Option>
## Jämförelsealternativ

### `compareOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) for all default values" required="No" contexts="Web, Hybrid App (Webview), Native App (See [Method Compare options](./method-options#compare-check-options) for more information)">

Jämförelsealternativen kan också anges som tjänstalternativ. De beskrivs i [Jämförelsealternativ för metoder](/docs/visual-testing/method-options#compare-check-options)

</Option>