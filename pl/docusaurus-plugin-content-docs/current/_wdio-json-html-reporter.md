---
id: wdio-json-html-reporter
title: Narzędzie do raportowania JSON HTML Reporter
custom_edit_url: https://github.com/aswinchembath/wdio-json-html-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-json-html-reporter to pakiet zewnętrzny, więcej informacji można znaleźć na [GitHub](https://github.com/aswinchembath/wdio-json-html-reporter) | [npm](https://www.npmjs.com/package/wdio-json-html-reporter)

Jest to niestandardowe narzędzie do raportowania WebDriverIO, które generuje szczegółowe raporty JSON podczas wykonywania testów i dostarcza przenośny generator raportów HTML do wizualizacji wyników testów. Rejestruje znaczniki czasowe, metadane wykonania i może przechwytywać zrzuty ekranu na żądanie. Pakiet jest zgodny z konwencją WebDriverIO dla narzędzi raportujących i jest publikowany jako pakiet npm pod nazwą `wdio-json-html-reporter`.

## Spis treści

- [Przegląd](#overview)
- [Funkcje](#features)
- [Instalacja](#installation)
  - [1. Zainstaluj pakiet](#1-install-the-package)
  - [2. Sprawdź instalację](#2-verify-installation)
  - [3. Zaktualizuj konfigurację WebDriverIO](#3-update-webdriverio-configuration)
  - [4. Uruchom swoje testy](#4-run-your-tests)
- [Użycie CLI](#cli-usage)
- [Opcja historii i generowanie zagregowanej historii](#history-option-and-aggregated-history-generation)
- [Zrzuty ekranu](#screenshots)

## Overview

WDIO JSON HTML REPORTER dostarcza dwa główne komponenty:

- **JSONReporter**: Niestandardowe narzędzie raportujące, które rozszerza interfejs reportera WebDriverIO, aby zbierać zdarzenia testowe i generować plik JSON z metadanymi, wynikami testów i (opcjonalnie) zrzutami ekranu.
- **HTMLReportGenerator**: Narzędzie do konwersji wielu plików raportu JSON do kompleksowego raportu HTML z interaktywnymi wykresami, filtrowaniem i funkcją eksportu. Dodatkowo, generator raportów obsługuje teraz opcjonalny plik historii, aby wyświetlać dane historyczne wykonania, jeśli są dostępne. Gdy nie dostarczono danych historycznych, raport pomija sekcję historyczną i pokazuje tylko unikalne błędy.

Te narzędzia pomagają uzyskać jasny wgląd w przebieg testów, co jest niezbędne do debugowania i ciągłej integracji.

## Features

- **Raportowanie JSON**: Szczegółowy raport ze znacznikami czasowymi, nazwami zestawów, wynikami testów, błędami i opcjonalnymi zrzutami ekranu.
- **Raportowanie HTML**: Konwertuje raporty JSON na przenośny raport HTML z pulpitem, wykresami, szczegółowym raportem testowym i możliwościami filtrowania.
- **Eksport do Excela**: Szczegółowy raport z testów można eksportować do pliku Excel.
- **Obsługa zrzutów ekranu**: Przechwytywanie zrzutów ekranu dla nieudanych testów (lub wszystkich testów) w zależności od konfiguracji.
- **Metadane wykonania**: Rejestruje informacje o przeglądarce, czasy rozpoczęcia/zakończenia wykonania i ogólny czas trwania.
- **Wykonanie historyczne (opcjonalne)**: Dostarczenie pliku historii JSON, aby uwzględnić dane historyczne wykonania według zestawu. Jeśli nie dostarczono danych historycznych, raport automatycznie ukryje tę sekcję i wyświetli tylko unikalne błędy.
- **Generowanie zagregowanej historii**: JSONReporter zawiera teraz funkcję generowania zagregowanej historii. Używając metody statycznej `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })`, możesz automatycznie skanować wszystkie pliki raportów JSON (pasujące do wzorca `test-report-*.json`) w katalogu raportów, agregować wyniki testów i obliczać porównania defektów na podstawie danych historycznych. Zagregowany rekord historii jest następnie dołączany do pliku historii i może być używany przez generator raportów HTML do wizualizacji trendów w czasie.

## Installation

Aby zainstalować pakiet `wdio-json-html-reporter`, wykonaj następujące kroki:

### 1. Install the package

Uruchom następujące polecenie, aby zainstalować pakiet jako zależność deweloperską:

```bash
npm install --save-dev wdio-json-html-reporter
```

### 2. Verify installation

Upewnij się, że pakiet został poprawnie zainstalowany, uruchamiając:

```bash
npm list wdio-json-html-reporter
```

Jeśli został zainstalowany poprawnie, powinieneś zobaczyć wynik podobny do:

```bash
wdio-json-html-reporter@x.x.x
```

### 3. Update WebDriverIO Configuration

Zmodyfikuj swój plik `wdio.conf.js` lub `wdio.conf.ts`, aby uwzględnić niestandardowe narzędzie raportujące:

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

Uruchom swój zestaw testów WebDriverIO:

```bash
npx wdio run wdio.conf.js
```

## CLI Usage

Oprócz integracji z WebDriverIO, możesz uruchomić generator raportów HTML bezpośrednio z wiersza poleceń za pomocą wbudowanego CLI.

**Użycie:**

```bash
generate-html <inputFolder> <outputFile> [historyFile]
```

Na przykład, jeśli masz pliki JSON w folderze o nazwie `test/reports/json-reports` i chcesz wygenerować raport HTML o nazwie `test/reports/report.html`, możesz uruchomić:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html
```

Jeśli masz również plik historii (np. `test/reports/history.json`), dołącz go jako opcjonalny czwarty parametr:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html test/reports/history.json
```

**Uwaga:**  
Funkcjonalność CLI jest uruchamiana tylko wtedy, gdy przekażesz komendę `generate-html` jako pierwszy parametr. Podczas uruchamiania przez WebDriverIO (np. za pomocą `wdio run wdio.conf.js`), logika CLI jest pomijana.

## History Option and Aggregated History Generation

Generator raportów HTML obsługuje teraz **opcję historii**. Pozwala to na dostarczenie pliku JSON zawierającego dane historyczne wykonania, które są łączone z raportem w sekcji "Historical Execution by Suite". Jeśli dostarczono plik historii zawierający prawidłowe dane, raport wyświetli trendy historyczne wraz z interaktywnymi wykresami i akordeonem dla każdego zestawu. Jeśli nie przekazano pliku historii lub jeśli plik nie zawiera żadnych danych o zestawach, raport automatycznie ukryje sekcję historyczną i wyświetli tylko przegląd unikalnych błędów.

Dodatkowo, JSONReporter zawiera teraz funkcję **generowania zagregowanej historii**. Dzięki metodzie statycznej `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })` możesz automatycznie skanować wszystkie pliki raportów JSON (pasujące do wzorca `test-report-*.json`) w katalogu raportów, agregować wyniki testów (sumowanie liczby testów i łączenie danych zestawów) oraz obliczać porównania defektów przez porównanie z ostatnim zagregowanym rekordem. Nowo wygenerowany rekord historii jest następnie dołączany do określonego pliku historii. Te zagregowane dane historyczne mogą być następnie wykorzystane przez generator raportów HTML do zapewnienia wglądu w historyczne wykonanie na przestrzeni wielu uruchomień testów.

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