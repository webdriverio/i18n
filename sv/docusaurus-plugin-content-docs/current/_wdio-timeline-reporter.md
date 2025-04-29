---
id: wdio-timeline-reporter
title: Tidslinjeraportör
custom_edit_url: https://github.com/QualityOps/wdio-timeline-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-timeline-reporter is a 3rd party package, for more information please see [GitHub](https://github.com/QualityOps/wdio-timeline-reporter) | [npm](https://www.npmjs.com/package/wdio-timeline-reporter)


> En komplett WebdriverIO-rapportör för en samlad visualisering av dina testresultat eftersom "Att se är att tro"

![example.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/example.png)

## Varför

Eftersom vi spenderar mycket tid på att felsöka misslyckade tester genom att växla från terminalutdata till att granska felskärmbilder etc. Den här rapportören samlar all typisk information du behöver i en rapport. Kör tester och få en fin tidslinje över händelser du kan titta tillbaka på för att ytterligare verifiera att allt ser bra ut.

#### Funktioner inkluderar:

- Fungerar utmärkt med Mocha och Jasmine-ramverk. Fungerar även med Cucumber men varje steg kommer att rapporteras som ett test
- Tydlig sammanfattning av testresultaten.
- Detaljer om varje testkörning inklusive alla skärmbilder som tagits under testutförandet.
- Filtrering av testresultat. Utmärkt för att fokusera på misslyckade tester
- Felstackspårning kopplad till testet.
- Möjlighet att lägga till ytterligare information till test under körning.
- Ingen efterbehandling krävs. Vid slutförandet av wdio-testprocessen genereras en statisk html-rapportfil.
- Tidslinjetjänst för att hantera tagning av skärmbilder inklusive storleksändring av bilderna.

En exempel-html-rapport kan hittas [här](http://htmlpreview.github.io/?https://github.com/QualityOps/wdio-timeline-reporter/blob/master/images/example-timeline-report.html)

Instruktioner om hur man installerar `WebdriverIO` finns [här](http://webdriver.io/guide/getstarted/install.html).

## Installation

**FÖR VERSION KOMPATIBEL MED WEBDRIVERIO V4 SE [HÄR](https://github.com/QualityOps/wdio-timeline-reporter/tree/v4)**

```shell
npm install --save wdio-timeline-reporter
```

Ett beroende kommer att läggas till i din `package.json`

```json
{
  "dependencies": {
    "wdio-timeline-reporter": "^5.1.0"
  }
}
```

### Användning

Lägg till `timeline` i reporters-arrayen i din wdio-konfigurationsfil.

Importera och lägg också till `TimelineService` från wdio-timeline-reporter.

Tjänsten är obligatorisk för att kombinera rapporter och skapa html eftersom rapportörer nu initieras per körningsinstans i webdriverio 5. [Se öppen diskussion på webdriverio](https://github.com/webdriverio/webdriverio/issues/3780)

TimelineService kan också hantera tagning av skärmbilder under testutförande. Du har möjlighet att minska storleken och kvaliteten på bilderna och att bädda in bilderna i rapporten som base64. Dessa är konfigurerbara med hjälp av [rapportöralternativ.](#reporter-options)

```js
// wdio.conf.js
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
exports.config = {
  // ...
  reporters: [['timeline', { outputDir: './desired_location' }]],
  // ...
  services: [[TimelineService]]
};
```

### Rapportöralternativ

Om du vill åsidosätta standardkonfigurationen för rapportören lägger du till ett reporterOptions-objektlitteral till timeline-arrayen under reporters som visas nedan.

![reporter-options.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/reporter-options.png)

| index | description                                                                                                                                                                                            |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1.    | Katalog där html-fil och skärmbilder kommer att skapas i. Obligatoriskt alternativ                                                                                                                     |
| 2.    | Namn på rapport-html-fil. Standardvärde är `timeline-report.html`                                                                                                                                      |
| 3.    | Bädda in bilder som base64 i html-fil. Standardvärde är `false`                                                                                                                                        |
| 4.    | Objektalternativ för bildmanipulation                                                                                                                                                                  |
| 5.    | Ställ in JPEG-kvalitet. Endast relevant om alternativet `resize` är `true`. Ju mindre värde, desto mindre bildstorlek och kvalitet. Standardvärdet är `70`. Maxvärdet som tillåts är `100`             |
| 6.    | Ändra storlek på bild. Standardvärde är `false`                                                                                                                                                        |
| 7.    | värde för att minska det totala antalet pixlar med. Endast relevant om alternativet `resize` är true. Standard är `1` Giltiga värden `1 - 5`                                                           |
| 8.    | hur ofta skärmbilder ska tas. Stödda värden är `on:error`, `before:click`, `none`. Standard är `none`. `before:click` är ett bra alternativ för att skapa en tidslinje av skärmbilder av appen som testas. |

### Lägg till ytterligare information till testkontext

Det är möjligt att lägga till ytterligare information till ett test med hjälp av den statiska metoden `addContext`. Detta kan vara användbart för att lägga till viktig information som kan hjälpa till vid felsökning av misslyckade tester, till exempel en användare som skapats under testkörningen med ett dynamiskt användarnamn

#### Grundläggande användning

Den statiska metoden `TimelineReporter.addContext` accepterar antingen en strängparameter eller ett objektlitteral med två egenskaper `title` och `value` t.ex

```js
{ title: 'sessionId', value: 'b59bb9ec-ab15-475e-9ce6-de8a14ca0cd3' }
```

värdet kan också vara en länk

##### Mocha-exempel

```js
const TimelineReporter = require('wdio-timeline-reporter').default;

describe('Suite', function() {
  it('Test', function() {
    // object literal parameter
    TimelineReporter.addContext({
      title: 'Test User',
      value: 'user id created during the test'
    });

    // value as anchor tag
    TimelineReporter.addContext({
      title: 'Dynamic link',
      value: '<a href="">Some important link related to test</a>'
    });

    // string parameter
    TimelineReporter.addContext('This test might be flaky');
  });
});
```

## Erkännande

Skulle vilja ge en shout-out till författarna och underhållarna av [wdio-json-reporter](https://github.com/fijijavis/wdio-json-reporter) Att gå igenom deras v5-lösning hjälpte till att snabba upp mitt arbete