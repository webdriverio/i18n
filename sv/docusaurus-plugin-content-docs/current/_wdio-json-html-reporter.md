---
id: wdio-json-html-reporter
title: JSON HTML Reporter Rapportör
custom_edit_url: https://github.com/aswinchembath/wdio-json-html-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-json-html-reporter is a 3rd party package, for more information please see [GitHub](https://github.com/aswinchembath/wdio-json-html-reporter) | [npm](https://www.npmjs.com/package/wdio-json-html-reporter)

Detta är en anpassad WebDriverIO-rapportör som genererar detaljerade JSON-rapporter under testutförande och tillhandahåller en portabel HTML-rapportgenerator för att visualisera dina testresultat. Den loggar tidsstämplar, körningsmetadata, och kan ta skärmdumpar vid behov. Paketet följer WebDriverIO-konventionen för rapportörer och publiceras som ett npm-paket under namnet `wdio-json-html-reporter`.

## Innehållsförteckning

- [Översikt](#overview)
- [Funktioner](#features)
- [Installation](#installation)
  - [1. Installera paketet](#1-install-the-package)
  - [2. Verifiera installation](#2-verify-installation)
  - [3. Uppdatera WebDriverIO-konfigurationen](#3-update-webdriverio-configuration)
  - [4. Kör dina tester](#4-run-your-tests)
- [CLI-användning](#cli-usage)
- [Historikalternativ och aggregerad historikgenerering](#history-option-and-aggregated-history-generation)
- [Skärmdumpar](#screenshots)

## Overview

WDIO JSON HTML REPORTER tillhandahåller två huvudkomponenter:

- **JSONReporter**: En anpassad rapportör som utökar WebDriverIO-rapportörens gränssnitt för att samla in testhändelser och generera en JSON-fil med metadata, testresultat och (valfritt) skärmdumpar.
- **HTMLReportGenerator**: Ett verktyg för att konvertera flera JSON-rapportfiler till en omfattande HTML-rapport med interaktiva diagram, filtrering och exportfunktionalitet. Dessutom stöder rapportgeneratorn nu en valfri historikfil för att visa historiska körningsdata om sådana finns tillgängliga. När inga historikdata tillhandahålls utelämnar rapporten historikavsnittet och visar endast unika fel.

Dessa verktyg hjälper dig att få tydliga insikter i dina testkörningar, vilket är viktigt för felsökning och kontinuerlig integration.

## Features

- **JSON-rapportering**: Detaljerad rapport med tidsstämplar, svitnamn, testresultat, fel och valfria skärmdumpar.
- **HTML-rapportering**: Omvandlar JSON-rapporter till en portabel HTML-rapport med en instrumentpanel, diagram, detaljerad testrapport och filtreringsmöjligheter.
- **Export till Excel**: Den detaljerade testrapporten kan exporteras till en Excel-fil.
- **Stöd för skärmdumpar**: Ta skärmdumpar för misslyckade tester (eller alla tester) baserat på din konfiguration.
- **Körningsmetadata**: Loggar webbläsarinformation, körningens start-/sluttider och total varaktighet.
- **Historisk körning (valfritt)**: Tillhandahåll en historik-JSON-fil för att inkludera historiska körningsdata per svit. Om inga historiska data tillhandahålls kommer rapporten automatiskt att dölja detta avsnitt och endast visa unika fel.
- **Aggregerad historikgenerering**: JSON-rapportören inkluderar nu en funktion för aggregerad historikgenerering. Med den statiska metoden `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })` kan du automatiskt skanna alla JSON-rapportfiler (som matchar mönstret `test-report-*.json`) i din rapportkatalog, aggregera testresultat och beräkna defektjämförelser baserat på historiska data. Den aggregerade historikposten läggs sedan till i din historikfil och kan användas av HTML-rapportgeneratorn för att visualisera trender över tid.

## Installation

För att installera paketet `wdio-json-html-reporter`, följ dessa steg:

### 1. Install the package

Kör följande kommando för att installera paketet som ett utvecklingsberoende:

```bash
npm install --save-dev wdio-json-html-reporter
```

### 2. Verify installation

Säkerställ att paketet har installerats korrekt genom att köra:

```bash
npm list wdio-json-html-reporter
```

Om det är korrekt installerat bör du se en utmatning som liknar:

```bash
wdio-json-html-reporter@x.x.x
```

### 3. Update WebDriverIO Configuration

Ändra din `wdio.conf.js` eller `wdio.conf.ts` fil för att inkludera den anpassade rapportören:

```javascript
import { JSONReporter, HTMLReportGenerator } from 'wdio-json-html-reporter';

export const config = {
  reporters: [
    [JSONReporter, { outputFile: './reports/test-results.json', screenshotOption: 'OnFailure' }],  // Options: "No", "OnFailure", "Full"
  ],
  onComplete: async function() {
    const outputFilePath = './reports/test-report.html';
    const jsonFolder = './reports'; // Directory where JSON reports are saved

    // If you want to include historical data, specify the history JSON file path here.
    const historyFile = './reports/history.json'; // Optional

    // Optionally, generate aggregated history data before generating the HTML report.
    // JSONReporter.generateAggregateHistory({ reportPaths: jsonFolder, historyPath: historyFile });

    const reportGenerator = new HTMLReportGenerator(outputFilePath, historyFile);
    await reportGenerator.convertJSONFolderToHTML(jsonFolder);
  }
};
```

### 4. Run Your Tests

Kör din WebDriverIO-testsvit:

```bash
npx wdio run wdio.conf.js
```

## CLI Usage

Förutom integrering med WebDriverIO kan du köra HTML-rapportgeneratorn direkt från kommandoraden med den inbyggda CLI:n.

**Användning:**

```bash
generate-html <inputFolder> <outputFile> [historyFile]
```

Till exempel, om du har dina JSON-filer i en mapp som heter `test/reports/json-reports` och vill generera en HTML-rapport med namnet `test/reports/report.html`, kan du köra:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html
```

Om du också har en historikfil (t.ex. `test/reports/history.json`), inkludera den som en valfri fjärde parameter:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html test/reports/history.json
```

**Obs:**  
CLI-funktionaliteten utlöses endast när du skickar kommandot `generate-html` som första parameter. När du kör via WebDriverIO (t.ex. med `wdio run wdio.conf.js`) kringgås CLI-logiken.

## History Option and Aggregated History Generation

HTML-rapportgeneratorn stöder nu ett **historikalternativ**. Detta gör att du kan tillhandahålla en JSON-fil som innehåller historiska körningsdata som slås samman i rapporten under avsnittet "Historical Execution by Suite". Om historikfilen tillhandahålls och innehåller giltiga data kommer rapporten att visa historiska trender tillsammans med interaktiva diagram och ett dragspel för varje svit. Om ingen historikfil skickas eller om filen inte innehåller några svitdata kommer rapporten automatiskt att dölja det historiska avsnittet och endast visa översikten över unika fel.

Dessutom inkluderar JSON-rapportören nu en funktion för **aggregerad historikgenerering**. Med den statiska metoden `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })` kan du automatiskt skanna alla JSON-rapportfiler (som matchar mönstret `test-report-*.json`) i din rapportkatalog, aggregera testresultat (summera testantal och slå samman svitdata), och beräkna defektjämförelser genom att jämföra med den senaste aggregerade posten. Den nyligen genererade historikposten läggs sedan till i den angivna historikfilen. Dessa aggregerade historikdata kan sedan användas av HTML-rapportgeneratorn för att ge historiska körningsinsikter över flera testkörningar.

## Screenshots

### Dashboard  
![Dashboard](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/dashboard.png)

### Test Results  
![Test Results](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/testdetails.png)

### Screenshots  
![Screenshots](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/screesnshots.png)

### Filters  
![Filters](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/filters.png)

### Excel Export  
![Excel Export](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/exportedfile.png)