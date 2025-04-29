---
id: wdio-performancetotal-service
title: PerformanceTotal Service
custom_edit_url: https://github.com/tzurp/performance-total/edit/master/README.md
---


> wdio-performancetotal-service ist ein Drittanbieter-Paket, für weitere Informationen siehe [GitHub](https://github.com/tzurp/performance-total) | [npm](https://www.npmjs.com/package/wdio-performancetotal-service)
Hinweis:<br/>
Für WebdriverIO v9 verwende Version 4.x.x.<br/>
Für WebdriverIO v8 verwende Version 3.x.x.<br/>
Für WebdriverIO v7 verwende Version 2.x.x.<br/>
Für WebdriverIO v6 verwende Version 1.x.x.

---

![chart](https://github.com/tzurp/performance-total/blob/master/resources/chart.png)

Mit diesem Plugin für [webdriver.io](https://webdriver.io/) können Sie ganz einfach Leistungsanalysen zu jedem Ablauf in Ihren Tests hinzufügen, sei es eine reine UI, API oder eine Kombination aus beidem. Dieses Plugin bietet eine einfache und effiziente Möglichkeit, die Antwortzeiten verschiedener Verfahren zu messen und potenzielle Engpässe in Ihrer Anwendung zu identifizieren. Mit diesen Informationen können Sie fundierte Entscheidungen über Optimierungen und Verbesserungen treffen, um die Gesamtleistung Ihrer Anwendung zu verbessern.

## Installation

Der einfachste Weg, dieses Modul als Entwicklungsabhängigkeit zu installieren, ist die Verwendung des folgenden Befehls:

```
npm install wdio-performancetotal-service --save-dev
```

## Verwendung

Fügen Sie wdio-performancetotal-service zu Ihrer `wdio.conf.js` hinzu:

```typescript
exports.config = {
  // ...
  services: ['performancetotal']
  // ...
};
```
...oder mit den Service-Optionen:

```typescript
exports.config = {
  // ...
  services: [
      ['performancetotal',
      // Die Optionen (mit Standardwerten)
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

### Optionen

#### __disableAppendToExistingFile__

Wenn auf `true` gesetzt, beginnen neue Testläufe frisch und überschreiben alle vorhandenen Leistungsdaten.
Wenn auf `false` gesetzt (Standard), werden Leistungsdaten zu den vorhandenen Daten hinzugefügt.

> **⚠️ Vorsicht:**
>
> Diese Aktion löscht alle Ihre Leistungsdaten dauerhaft. Stellen Sie sicher, dass Sie ein Backup haben, bevor Sie fortfahren.

#### __performanceResultsFileName__

Sie können den Standard-Ergebnisdateinamen (`performance-results`) überschreiben.
Eine neu erstellte Ergebnisdatei überschreibt normalerweise die alte Datei. Wenn Sie alte Dateien behalten möchten, wird empfohlen, einen Zeitstempel zum Dateinamen hinzuzufügen. Zum Beispiel:

```typescript
...
performanceResultsFileName: `performance-results_${new Date().getTime()}`
...
```

#### __dropResultsFromFailedTest__

Standardwert ist `false`. Wenn der Wert auf `true` gesetzt ist, wird die Leistungsanalyse aus fehlgeschlagenen Tests ausgeschlossen.

#### __recentDays__

Standardwert ist `0` (keine Begrenzung). Um die Anzahl der Tage für die Leistungsanalyse festzulegen, geben Sie die Anzahl der Tage an. Auch Teiletage werden unterstützt (z.B. `recentDays: 0.5`)

#### __performanceResultsDirectory__

Sie können den Standardpfad für das Ergebnisverzeichnis im Projektstammverzeichnis überschreiben.
Zum Beispiel:

```typescript
...
performanceResultsDirectory: "results-dir/performance-total-results"
...
```

#### __analyzeByBrowser__

Standardwert ist `false`. Wenn `true`, werden die Leistungsdaten auch nach Browsertyp analysiert.


### Verwendung im Test

Importieren Sie einfach __performancetotal__ dort, wo Sie es benötigen, sei es in Ihrer Testdatei oder einer anderen Klasse. Dieses Objekt bietet Methoden zum Messen von Leistungsdaten in Ihren Tests, einschließlich sampleStart und sampleEnd für das Starten und Beenden von Leistungsmessungen.
Hier ist ein Beispiel, wie Sie das performancetotal-Objekt verwenden könnten, um die Startleistung von zwei Websites zu messen:

```typescript
// Dieser Testfall misst die Startleistung von Github und SourceForge mit dem performancetotal-Objekt.

import { performancetotal } from "wdio-performancetotal-service";

it("should test github and sourceforge startup performance", () => {
    // Starte eine neue Leistungsmessung für Github
    performancetotal.sampleStart("GH-Startup");

    // Navigiere zu Github
    browser.url("https://github.com/");

    // Beende die Github-Messung und speichere die Ergebnisse
    performancetotal.sampleEnd("GH-Startup");

    // ...

    // Starte eine neue Leistungsmessung für SourceForge
    performancetotal.sampleStart("SF-Startup");

    // Navigiere zu SourceForge
    await browser.url("https://sourceforge.net/");

    // Beende die SourceForge-Messung und speichere die Ergebnisse
    performancetotal.sampleEnd("SF-Startup");
});

```

Sie können die Zeit, die für eine einzelne Leistungsstichprobe benötigt wurde, abrufen, indem Sie in Ihrem Test performancetotal.getSampleTime(sampleName) aufrufen. Dies ermöglicht es Ihnen, die Leistung eines bestimmten Codeabschnitts zu überprüfen und sicherzustellen, dass sie Ihren Erwartungen entspricht.

```typescript
// Erhalten Sie die Zeit, die für eine einzelne Stichprobe benötigt wurde
const sampleTime = performancetotal.getSampleTime(sampleName);

```

## Abrufen der Ergebnisse

Wenn alle Tests abgeschlossen sind, wird ein neues Ergebnisverzeichnis im Stammordner Ihres Projekts erstellt (der Standardverzeichnisname ist performance-results). In diesem Verzeichnis werden zwei Dateien erstellt: performance-results.json und performance-results.csv. Diese Dateien enthalten analysierte Daten für jede Stichprobe, einschließlich der durchschnittlichen Zeit, des Standardfehlers des Mittelwerts (SEM), der Anzahl der Stichproben, des Minimalwerts, des Maximalwerts, der frühesten Zeit und der spätesten Zeit. Sie können diese Daten verwenden, um Leistungsrückgänge oder -verbesserungen im Laufe der Zeit zu identifizieren.

### Analyse von Leistungsdaten in großen Mengen

Um bestehende Leistungsdaten in großen Mengen zu analysieren, ohne neue Tests zu generieren, wird die Verwendung des [__performancetotal-cli__ Tools](https://www.npmjs.com/package/performancetotal-cli) empfohlen.

## Typescript-Unterstützung

Typescript wird für dieses Plugin unterstützt.

## Support

Für Support und Vorschläge können Sie mich gerne unter [tzur.paldi@outlook.com](https://github.com/tzurp/performance-total/blob/master/mailto:tzur.paldi@outlook.com) kontaktieren.