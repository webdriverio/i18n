---
id: wdio-json-html-reporter
title: JSON HTML Reporter Reporter
custom_edit_url: https://github.com/aswinchembath/wdio-json-html-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-json-html-reporter ist ein Paket von Drittanbietern. Weitere Informationen finden Sie auf [GitHub](https://github.com/aswinchembath/wdio-json-html-reporter) | [npm](https://www.npmjs.com/package/wdio-json-html-reporter)

Dies ist ein benutzerdefinierter WebDriverIO-Reporter, der während der Testausführung detaillierte JSON-Berichte generiert und einen portablen HTML-Berichtsgenerator bereitstellt, um Ihre Testergebnisse zu visualisieren. Er protokolliert Zeitstempel, Ausführungsmetadaten und kann bei Bedarf Screenshots aufnehmen. Das Paket folgt der WebDriverIO-Konvention für Reporter und wird als npm-Paket unter dem Namen `wdio-json-html-reporter` veröffentlicht.

## Inhaltsverzeichnis

- [Überblick](#overview)
- [Funktionen](#features)
- [Installation](#installation)
  - [1. Paket installieren](#1-install-the-package)
  - [2. Installation überprüfen](#2-verify-installation)
  - [3. WebDriverIO-Konfiguration aktualisieren](#3-update-webdriverio-configuration)
  - [4. Tests ausführen](#4-run-your-tests)
- [CLI-Nutzung](#cli-usage)
- [Verlaufsoption und aggregierte Verlaufsgenerierung](#history-option-and-aggregated-history-generation)
- [Screenshots](#screenshots)

## Overview

WDIO JSON HTML REPORTER bietet zwei Hauptkomponenten:

- **JSONReporter**: Ein benutzerdefinierter Reporter, der die WebDriverIO-Reporter-Schnittstelle erweitert, um Testereignisse zu sammeln und eine JSON-Datei mit Metadaten, Testergebnissen und (optional) Screenshots zu generieren.
- **HTMLReportGenerator**: Ein Hilfsprogramm zum Konvertieren mehrerer JSON-Berichtsdateien in einen umfassenden HTML-Bericht mit interaktiven Diagrammen, Filterung und Exportfunktionen. Darüber hinaus unterstützt der Berichtsgenerator jetzt eine optionale Verlaufsdatei, um historische Ausführungsdaten anzuzeigen, falls verfügbar. Wenn keine Verlaufsdaten bereitgestellt werden, lässt der Bericht den historischen Abschnitt weg und zeigt nur die eindeutigen Fehler an.

Diese Werkzeuge helfen Ihnen, klare Einblicke in Ihre Testläufe zu gewinnen, was für das Debugging und die kontinuierliche Integration unerlässlich ist.

## Features

- **JSON-Berichterstattung**: Detaillierter Bericht mit Zeitstempeln, Suite-Namen, Testergebnissen, Fehlern und optionalen Screenshots.
- **HTML-Berichterstattung**: Konvertiert JSON-Berichte in einen portablen HTML-Bericht mit Dashboard, Diagrammen, detailliertem Testbericht und Filtermöglichkeiten.
- **Export nach Excel**: Der detaillierte Testbericht kann in eine Excel-Datei exportiert werden.
- **Screenshot-Unterstützung**: Erfassung von Screenshots für fehlgeschlagene Tests (oder alle Tests) basierend auf Ihrer Konfiguration.
- **Ausführungsmetadaten**: Protokolliert Browser-Informationen, Start-/Endzeiten der Ausführung und Gesamtdauer.
- **Ausführungsverlauf (optional)**: Stellen Sie eine Verlaufs-JSON-Datei bereit, um historische Ausführungsdaten nach Suite einzubeziehen. Wenn keine historischen Daten bereitgestellt werden, blendet der Bericht diesen Abschnitt automatisch aus und zeigt nur die eindeutigen Fehler an.
- **Aggregierte Verlaufsgenerierung**: Der JSON-Reporter enthält jetzt eine Funktion zur aggregierten Verlaufsgenerierung. Mit der statischen Methode `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })` können Sie automatisch alle JSON-Berichtsdateien (die dem Muster `test-report-*.json` entsprechen) in Ihrem Berichtsverzeichnis scannen, Testergebnisse aggregieren und Defektvergleiche basierend auf historischen Daten berechnen. Der aggregierte Verlaufsdatensatz wird dann Ihrer Verlaufsdatei hinzugefügt und kann vom HTML-Berichtsgenerator verwendet werden, um Trends im Laufe der Zeit zu visualisieren.

## Installation

Um das Paket `wdio-json-html-reporter` zu installieren, folgen Sie diesen Schritten:

### 1. Install the package

Führen Sie den folgenden Befehl aus, um das Paket als Entwicklungsabhängigkeit zu installieren:

```bash
npm install --save-dev wdio-json-html-reporter
```

### 2. Verify installation

Stellen Sie sicher, dass das Paket korrekt installiert wurde, indem Sie ausführen:

```bash
npm list wdio-json-html-reporter
```

Bei korrekter Installation sollten Sie eine Ausgabe ähnlich der folgenden sehen:

```bash
wdio-json-html-reporter@x.x.x
```

### 3. Update WebDriverIO Configuration

Ändern Sie Ihre Datei `wdio.conf.js` oder `wdio.conf.ts`, um den benutzerdefinierten Reporter einzubeziehen:

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

Führen Sie Ihre WebDriverIO-Testsuite aus:

```bash
npx wdio run wdio.conf.js
```

## CLI Usage

Zusätzlich zur Integration mit WebDriverIO können Sie den HTML-Berichtsgenerator direkt von der Kommandozeile aus mit der eingebauten CLI ausführen.

**Verwendung:**

```bash
generate-html <inputFolder> <outputFile> [historyFile]
```

Wenn Sie beispielsweise Ihre JSON-Dateien in einem Ordner namens `test/reports/json-reports` haben und einen HTML-Bericht namens `test/reports/report.html` generieren möchten, können Sie Folgendes ausführen:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html
```

Wenn Sie auch eine Verlaufsdatei haben (z.B. `test/reports/history.json`), fügen Sie sie als optionalen vierten Parameter hinzu:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html test/reports/history.json
```

**Hinweis:**  
Die CLI-Funktionalität wird nur ausgelöst, wenn Sie den Befehl `generate-html` als ersten Parameter übergeben. Wenn Sie über WebDriverIO ausführen (z.B. mit `wdio run wdio.conf.js`), wird die CLI-Logik umgangen.

## History Option and Aggregated History Generation

Der HTML-Berichtsgenerator unterstützt jetzt eine **Verlaufsoption**. Dies ermöglicht es Ihnen, eine JSON-Datei mit historischen Ausführungsdaten bereitzustellen, die in den Bericht unter dem Abschnitt "Historische Ausführung nach Suite" eingefügt wird. Wenn die Verlaufsdatei bereitgestellt wird und gültige Daten enthält, zeigt der Bericht historische Trends zusammen mit interaktiven Diagrammen und einem Akkordeon für jede Suite an. Wenn keine Verlaufsdatei übergeben wird oder wenn die Datei keine Suite-Daten enthält, blendet der Bericht automatisch den historischen Abschnitt aus und zeigt nur die Übersicht der eindeutigen Fehler an.

Darüber hinaus umfasst der JSON-Reporter jetzt eine Funktion zur **aggregierten Verlaufsgenerierung**. Mit der statischen Methode `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })` können Sie automatisch alle JSON-Berichtsdateien (die dem Muster `test-report-*.json` entsprechen) in Ihrem Berichtsverzeichnis scannen, Testergebnisse aggregieren (Testzählungen summieren und Suite-Daten zusammenführen) und Defektvergleiche berechnen, indem Sie mit dem letzten aggregierten Datensatz vergleichen. Der neu generierte Verlaufsdatensatz wird dann der angegebenen Verlaufsdatei hinzugefügt. Diese aggregierten Verlaufsdaten können anschließend vom HTML-Berichtsgenerator verwendet werden, um historische Ausführungseinblicke über mehrere Testläufe hinweg zu bieten.

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