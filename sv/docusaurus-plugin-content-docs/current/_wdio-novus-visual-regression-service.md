---
id: wdio-novus-visual-regression-service
title: Novus Visuell Regressionstjänst
custom_edit_url: https://github.com/Jnegrier/wdio-novus-visual-regression-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-novus-visual-regression-service är ett tredjepartspaket, för mer information se [GitHub](https://github.com/Jnegrier/wdio-novus-visual-regression-service) | [npm](https://www.npmjs.com/package/wdio-novus-visual-regression-service)

[![Build Status](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service.svg?branch=master)](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service)

> Visuell regressionstestning för WebdriverIO

Baserat på arbetet av Jan-André Zinser på [wdio-visual-regression-service](https://github.com/zinserjan/wdio-visual-regression-service) och [wdio-screenshot](https://github.com/zinserjan/wdio-screenshot)

## Installation

Du kan installera wdio-novus-visual-regression-service via NPM som vanligt:

```sh
$ npm install wdio-novus-visual-regression-service --save-dev
```

Instruktioner om hur man installerar `WebdriverIO` finns [här.](https://webdriver.io/docs/gettingstarted)

## Konfiguration
Konfigurera wdio-novus-visual-regression-service genom att lägga till `novus-visual-regression` i tjänstavsnittet i din WebdriverIO-konfiguration och definiera din önskade jämförelsestrategi i tjänstalternativen.

```js
// wdio.conf.js

var path = require('path');
var VisualRegressionCompare = require('wdio-novus-visual-regression-service/compare');

function getScreenshotName(basePath) {
  return function(context) {
    var type = context.type;
    var testName = context.test.title;
    var browserVersion = parseInt(context.browser.version, 10);
    var browserName = context.browser.name;
    var browserViewport = context.meta.viewport;
    var browserWidth = browserViewport.width;
    var browserHeight = browserViewport.height;

    return path.join(basePath, `${testName}_${type}_${browserName}_v${browserVersion}_${browserWidth}x${browserHeight}.png`);
  };
}

exports.config = {
  // ...
  services: [
    [
      'novus-visual-regression',
      {
        compare: new VisualRegressionCompare.LocalCompare({
          referenceName: getScreenshotName(path.join(process.cwd(), 'screenshots/reference')),
          screenshotName: getScreenshotName(path.join(process.cwd(), 'screenshots/screen')),
          diffName: getScreenshotName(path.join(process.cwd(), 'screenshots/diff')),
          misMatchTolerance: 0.01,
        }),
        viewportChangePause: 300,
        viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
        orientations: ['landscape', 'portrait'],
      }
    ]
  ],
  // ...
};
```

### Alternativ
Under nyckeln `visualRegression` i din wdio.config.js kan du skicka ett konfigurationsobjekt med följande struktur:

* **compare** `Object` <br />
skärmdumpsjämförelsemetod, se [Jämförelsemetoder](#compare-methods)

* **viewportChangePause**  `Number`  ( standard: 100 ) <br />
vänta x millisekunder efter viewportändring. Det kan ta en stund för webbläsaren att återge. Detta kan leda till renderingsproblem och ger inkonsekventa resultat mellan körningar.

* **viewports** `Object[{ width: Number, height: Number }]`  ( standard: *[aktuell-viewport]* ) (**endast desktop**)<br />
   alla skärmdumpar kommer att tas i olika viewportdimensioner (t.ex. för responsiva designtester)

* **orientations** `String[] {landscape, portrait}`  ( standard: *[aktuell-orientering]* ) (**endast mobil**)<br />
    alla skärmdumpar kommer att tas i olika skärmorientering (t.ex. för responsiva designtester)

### Jämförelsemetoder
wdio-novus-visual-regression-service möjliggör användning av olika metoder för skärmdumpsjämförelse.

#### VisualRegressionCompare.LocalCompare
Som namnet antyder tar *LocalCompare* skärmdumpar lokalt på din dator och jämför dem med tidigare körningar.

Du kan skicka följande alternativ till konstruktören som objekt:

* **referenceName** `Function` <br />
skicka in en funktion som returnerar filnamnet för referensskärmdumpen. Funktionen tar emot ett *context*-objekt som första parameter med all relevant information om kommandot.

* **screenshotName** `Function` <br />
skicka in en funktion som returnerar filnamnet för den aktuella skärmdumpen. Funktionen tar emot ett *context*-objekt som första parameter med all relevant information om kommandot.

* **diffName** `Function` <br />
skicka in en funktion som returnerar filnamnet för diff-skärmdumpen. Funktionen tar emot ett *context*-objekt som första parameter med all relevant information om kommandot.

* **misMatchTolerance** `Number`  ( standard: 0.01 ) <br />
nummer mellan 0 och 100 som definierar graden av avvikelse för att betrakta två bilder som identiska, att öka detta värde minskar testtäckningen.

* **ignoreComparison** `String`  ( standard: inget ) <br />
skicka in en sträng med värdet `nothing`, `colors` eller `antialiasing` för att justera jämförelsemetoden.

För ett exempel på generering av skärmdumpsfilnamn beroende på det aktuella testnamnet, ta en titt på exempelkoden i [Konfiguration](#configuration).

#### VisualRegressionCompare.SaveScreenshot
Denna metod är en förenklad variant av `VisualRegressionCompare.LocalCompare` för att endast ta skärmdumpar. Detta är ganska användbart när du bara vill skapa referensskärmdumpar och skriva över den tidigare utan att jämföra.

Du kan skicka följande alternativ till konstruktören som objekt:

* **screenshotName** `Function` <br />
skicka in en funktion som returnerar filnamnet för den aktuella skärmdumpen. Funktionen tar emot ett *context*-objekt som första parameter med all relevant information om kommandot.

#### VisualRegressionCompare.Spectre
Denna metod används för att ladda upp skärmdumpar till webbapplikationen [Spectre](https://github.com/wearefriday/spectre).
Spectre är ett användargränssnitt för visuell regressionstestning. Det lagrar skärmdumparna och jämför dem, vilket är ganska användbart för kontinuerlig integration.

Du kan skicka följande alternativ till konstruktören som objekt:

* **url** `String` <br />
skicka in en spectre webbtjänst-url.

* **project** `String` <br />
skicka in ett namn för ditt projekt.

* **suite** `String` <br />
skicka in ett namn för din testsvit. Ett projekt kan innehålla flera sviter.

* **test** `Function` <br />
skicka in en funktion som returnerar testnamnet för skärmdumpen. Funktionen tar emot ett *context*-objekt som första parameter med all relevant information om kommandot.

* **browser** `Function` <br />
skicka in en funktion som returnerar webbläsaren för skärmdumpen. Funktionen tar emot ett *context*-objekt som första parameter med all relevant information om kommandot.

* **size** `Function` <br />
skicka in en funktion som returnerar storleken för skärmdumpen. Funktionen tar emot ett *context*-objekt som första parameter med all relevant information om kommandot.

* **fuzzLevel** `Number`  ( standard: 30 ) <br />
nummer mellan 0 och 100 som definierar fuzz-faktorn för Spectres bildjämförelsemetod. För mer information, se [Spectre-dokumentationen](https://github.com/wearefriday/spectre).

**Exempel**
```js
// wdio.conf.js

var path = require('path');
var VisualRegressionCompare = require('wdio-novus-visual-regression-service/compare');

exports.config = {
  // ...
  services: [
    [
      'novus-visual-regression',
      {
        compare: new VisualRegressionCompare.Spectre({
          url: 'http://localhost:3000',
          project: 'my project',
          suite: 'my test suite',
          test: function getTest(context) {
            return context.test.title;
          },
          browser: function getBrowser(context) {
            return context.browser.name;
          },
          size: function getSize(context) {
            return context.meta.viewport != null ? context.meta.viewport.width : context.meta.orientation;
          },
          fuzzLevel: 30
        }),
        viewportChangePause: 300,
        viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
        orientations: ['landscape', 'portrait'],
      }
    ]
  ],
  // ...
};
```

## Användning
wdio-novus-visual-regression-service utökar en WebdriverIO-instans med följande kommandon:
* `browser.checkViewport([{options}]);`
* `browser.checkDocument([{options}]);`
* `browser.checkElement(elementSelector, [{options}]);`


Alla dessa tillhandahåller alternativ som hjälper dig att ta skärmdumpar i olika dimensioner eller att utesluta irrelevanta delar (t.ex. innehåll). Följande alternativ är
tillgängliga:


* **exclude** `String[]|Object[]` (**ännu inte implementerat**)<br />
  uteslut ofta föränderliga delar av din skärmdump, du kan antingen skicka alla möjliga olika [WebdriverIO-väljarestrategier](http://webdriver.io/guide/usage/selectors.html)
  som frågar ett eller flera element eller så kan du definiera x- och y-värden som sträcker ut en rektangel eller polygon

* **hide** `Object[]`<br />
  döljer alla element som efterfrågas av alla möjliga olika [WebdriverIO-väljarestrategier](http://webdriver.io/guide/usage/selectors.html) (via `visibility: hidden`)

* **remove** `Object[]`<br />
  tar bort alla element som efterfrågas av alla möjliga olika [WebdriverIO-väljarestrategier](http://webdriver.io/guide/usage/selectors.html) (via `display: none`)

* **viewports** `Object[{ width: Number, height: Number }]` (**endast desktop**)<br />
     Åsidosätter det globala *viewports*-värdet för detta kommando. Alla skärmdumpar kommer att tas i olika viewportdimensioner (t.ex. för responsiva designtester)

* **orientations** `String[] {landscape, portrait}` (**endast mobil**)<br />
    Åsidosätter det globala *orientations*-värdet för detta kommando. Alla skärmdumpar kommer att tas i olika skärmorientering (t.ex. för responsiva designtester)

* **misMatchTolerance** `Number` <br />
    Åsidosätter det globala *misMatchTolerance*-värdet för detta kommando. Skicka in ett nummer mellan 0 och 100 som definierar graden av avvikelse för att betrakta två bilder som identiska.

* **fuzzLevel** `Number` <br />
    Åsidosätter det globala *fuzzLevel*-värdet för detta kommando. Skicka in ett nummer mellan 0 och 100 som definierar fuzz-faktorn för Spectres bildjämförelsemetod.

* **ignoreComparison** `String` <br />
    Åsidosätter det globala *ignoreComparison*-värdet för detta kommando. Skicka in en sträng med värdet `nothing`, `colors` eller `antialiasing` för att justera jämförelsemetoden.

* **viewportChangePause**  `Number` <br />
    Åsidosätter det globala *viewportChangePause*-värdet för detta kommando. Vänta x millisekunder efter viewportändring.

### Licens

MIT