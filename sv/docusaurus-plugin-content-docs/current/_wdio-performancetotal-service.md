---
id: wdio-performancetotal-service
title: PerformanceTotal Service
custom_edit_url: https://github.com/tzurp/performance-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-performancetotal-service är ett tredjepartspaket, för mer information se [GitHub](https://github.com/tzurp/performance-total) | [npm](https://www.npmjs.com/package/wdio-performancetotal-service)
Notera:<br/>
För WebdriverIO v9 använd version 4.x.x.<br/>
För WebdriverIO v8 använd version 3.x.x.<br/>
För WebdriverIO v7 använd version 2.x.x.<br/>
För WebdriverIO v6 använd version 1.x.x.

---

![chart](https://github.com/tzurp/performance-total/blob/master/resources/chart.png)

Med denna plugin för [webdriver.io](https://webdriver.io/) kan du enkelt lägga till prestandaanalys till alla flöden i dina tester, oavsett om det är ett rent UI, API eller en kombination av båda. Denna plugin erbjuder ett enkelt och effektivt sätt att mäta svarstider för olika procedurer och identifiera potentiella flaskhalsar i din applikation. Med denna information kan du fatta välgrundade beslut om optimeringar och förbättringar för att förbättra den övergripande prestandan i din applikation.

## Installation

Det enklaste sättet att installera denna modul som en dev-beroende är genom att använda följande kommando:

```
npm install wdio-performancetotal-service --save-dev
```

## Användning

Lägg till wdio-performancetotal-service i din `wdio.conf.js`:

```typescript
exports.config = {
  // ...
  services: ['performancetotal']
  // ...
};
```
...eller med tjänstalternativ:

```typescript
exports.config = {
  // ...
  services: [
      ['performancetotal',
      // Alternativen (med standardvärden)
        {
            disableAppendToExistingFile: false,
            performanceResultsFileName: "performance-results",
            dropResultsFromFailedTest: false,
            performanceResultsDirectory: "performance-results",
            analyzeByBrowser: false,
            recentDays: 0
        }]
      ]
  // ...
};
```

### Alternativ

#### __disableAppendToExistingFile__

När inställd på `true` kommer nya testköningar att starta från början och skriva över befintlig prestandadata.
När inställd på `false` (standard) kommer prestandadata att läggas till i den befintliga datan.

> **⚠️ Varning:**
>
> Denna åtgärd kommer att radera all din prestandadata permanent. Se till att du har en säkerhetskopia innan du fortsätter.

#### __performanceResultsFileName__

Du kan åsidosätta standardnamnet för resultatfilen (`performance-results`).
En nyligen skapad resultatfil skriver normalt över den gamla filen. Om du vill behålla gamla filer rekommenderas det att lägga till en tidsstämpel i filnamnet. Till exempel:

```typescript
...
performanceResultsFileName: `performance-results_${new Date().getTime()}`
...
```

#### __dropResultsFromFailedTest__

Standard är `false`. När värdet är inställt på `true` skulle prestandaanalys från misslyckade tester uteslutas.

#### __recentDays__

Standard är `0` (ingen gräns). För att ställa in antalet dagar att beakta för prestandaanalys, ange antalet dagar. Delar av dagar stöds också (t.ex. `recentDays: 0.5`)

#### __performanceResultsDirectory__

Du kan åsidosätta standardsökvägen för resultatmappen i projektets rotmapp.
Till exempel:

```typescript
...
performanceResultsDirectory: "results-dir/performance-total-results"
...
```

#### __analyzeByBrowser__

Standard är `false`. Om `true` skulle prestandadata också analyseras utifrån webbläsartypen.


### Användning i test

Importera bara __performancetotal__ där du behöver det, oavsett om det är i din testfil eller någon annan klass. Detta objekt tillhandahåller metoder för att mäta prestandadata i dina tester, inklusive sampleStart och sampleEnd för att starta och avsluta prestandamätningar.
Här är ett exempel på hur du kan använda performancetotal-objektet för att mäta startprestandan för två webbplatser:

```typescript
// Detta testfall mäter startprestandan för Github och SourceForge med hjälp av performancetotal-objektet.

import { performancetotal } from "wdio-performancetotal-service";

it("should test github and sourceforge startup performance", () => {
    // Starta en ny prestandamätning för Github
    performancetotal.sampleStart("GH-Startup");

    // Navigera till Github
    browser.url("https://github.com/");

    // Avsluta Github-mätningen och spara resultaten
    performancetotal.sampleEnd("GH-Startup");

    // ...

    // Starta en ny prestandamätning för SourceForge
    performancetotal.sampleStart("SF-Startup");

    // Navigera till SourceForge
    await browser.url("https://sourceforge.net/");

    // Avsluta SourceForge-mätningen och spara resultaten
    performancetotal.sampleEnd("SF-Startup");
});

```

Du kan hämta tiden som tagits för ett enskilt prestandaprov genom att anropa performancetotal.getSampleTime(sampleName) i ditt test. Detta låter dig kontrollera prestandan för en specifik del av koden och säkerställa att den uppfyller dina förväntningar.

```typescript
// Få tiden som tagits för ett enskilt prov
const sampleTime = performancetotal.getSampleTime(sampleName);

```

## Få resultaten

När alla tester är slutförda skapas en ny resultatmapp i projektets rotmapp (standardmappnamnet är performance-results). I denna mapp skapas två filer: performance-results.json och performance-results.csv. Dessa filer innehåller analyserad data för varje prov, inklusive genomsnittlig tid, standardfel för medelvärdet (SEM), antal prover, minimivärde, maximivärde, tidigaste tid och senaste tid. Du kan använda denna data för att identifiera eventuella prestandaförsämringar eller förbättringar över tid.

### Analysera prestandadata i bulk

För att analysera befintlig prestandadata i bulk utan att generera nya tester rekommenderas att använda [__performancetotal-cli__ verktyget](https://www.npmjs.com/package/performancetotal-cli).

## Typescript-stöd

Typescript stöds för denna plugin.

## Support

För support och förslag, känn dig fri att kontakta mig på [tzur.paldi@outlook.com](https://github.com/tzurp/performance-total/blob/master/mailto:tzur.paldi@outlook.com).