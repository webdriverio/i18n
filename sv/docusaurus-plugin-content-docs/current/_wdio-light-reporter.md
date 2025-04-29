---
id: wdio-light-reporter
title: Light Reporter Reporter
custom_edit_url: https://github.com/sarfrajadstreaks/wdio-light-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-light-reporter är ett tredjepartspaket, för mer information se [GitHub](https://github.com/sarfrajadstreaks/wdio-light-reporter) | [npm](https://www.npmjs.com/package/wdio-light-reporter)

## Inspirerad av HTML och Mochawesome reporter

!Filosofi:

> Denna reporter stöder inte cucumber-rapportregenerering och är utvecklad med tanke på bdd- och mocha-ramverket.
> Här anses `describe()`-sektionen som testscenario och `it()` som testfall inom testscenarierna.

## FUNKTIONER

1. Enkel installation
2. Förbättrat användargränssnitt
3. Skärmdumpar inbäddade i html-rapport
4. addLabel() för att inkludera stegkontext eller namn


## Utgåvor
V 0.1.9 - Initial utgåva
V 0.2.6 - (senaste)
  1. Inkludera körningar i flera miljöer och segregera baserat på miljö.
  2. Fixa buggar
  3. Förbättrad prestanda.


## EXEMPEL

![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_1.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_2.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_3.png)

## Installation

NPM

```sh
npm install wdio-light-reporter --save-dev
```

## Konfiguration

```
reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:`demo${new Date()}`,    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
  }]
],
```

## Skärmdumpar

Reportern har inte kapacitet att automatiskt konfigurera för att ta skärmdumpar men om den konfigureras manuellt lyssnar den på händelsen och bifogar skärmdumparna i HTML-rapporten.
**För att inkludera skärmdumpar i rapporten, lägg till koden nedan i afterTest()-kroken i wdio conf-filen.**

```
afterTest: async function (test,context,{ error, result, duration, passed, retries }) {
    if (!passed) {await browser.takeScreenshot()}
},
```

## Resultatfiler

Varje körning regenererar json-rapport för varje spec-fil. För att generera kombinerad json- och HTML-rapport, lägg till koden nedan i **onComplete()**-kroken i wdio conf-filen.

```
 onComplete: function (exitCode, config, capabilities, results) {
    const mergeResults = require("wdio-light-reporter/src/mergeResults"); //you can add this on top of the file
    mergeResults("./Results");
 },
```

> Om du kör ditt test utan något --suite-alternativ så anses default som suite
> Reportern fungerar inte om du ger flera parametrar som suites under körning.
> wdio run `wdio.conf.js --suite firstSuite` - **(FUNGERAR BRA)** :)  
>  wdio run `wdio.conf.js --suite firstSuite --suite secondSuite` **(FUNGERAR INTE)** :(

## Lägga till kontext

> Du kan använda `useLabel()` för att lägga till kontext till steg eller lägga till för att inkludera det som steg.

```
const { addLabel } = require("wdio-light-reporter").default;
describe("Show how to use addLabel ", () => {
  it("report will added this a steps/context in report", async () => {
      addLabel("Log Example 1 as step 1")
      console.log("Log Example 1 )
      addLabel("Log Example 2 as step 2")
      console.log("Log Example 2 )
  })
})


```
## Uppdateringar
```
 reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:"demo",    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
      //autoClean:false       // removed autoClean and include the same functionality as default in mergeResult function
  }]
],
```
## Licens

MIT
**Gratis, Jajamän!**