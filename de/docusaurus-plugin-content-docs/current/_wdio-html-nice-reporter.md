---
id: wdio-html-nice-reporter
title: HTML Reporter
custom_edit_url: https://github.com/rpii/wdio-html-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-html-nice-reporter ist ein Paket von Drittanbietern, weitere Informationen finden Sie auf [GitHub](https://github.com/rpii/wdio-html-reporter) | [npm](https://www.npmjs.com/package/wdio-html-nice-reporter)
 # wdio-html-nice-reporter

Ein Reporter für webdriver.io, der einen ansprechenden HTML-Bericht generiert.  
Der Name ist albern, aber bietet Integration mit webdriverio

### Neu: nicht mehr Beta.

### Neu: Bereinigung und Umstellung der Protokollierung auf wdio-logging. Beispiele sind aktualisiert.
    Sie müssen die log4Js-Logger-Initialisierung aus Ihrer Konfiguration entfernen

### Neu: Umgeschrieben als ES-Modul für webdriverio 8-Kompatibilität.
    Möglicherweise benötigen Sie Änderungen in Ihrer Testanwendung

### Fehlerbehebung: webdriverio wurde mitten im asynchronen JSON-Schreibvorgang heruntergefahren.

### Fehlerbehebung: JSON-Schreibvorgang wurde nicht korrekt abgewartet

### Großartige neue Verbesserung: keine Out-of-Memory-Fehler mehr aufgrund von json.stringify

### Großartige neue Funktion: Aufzeichnung von Videos für jeden Test


## [Changelog](https://github.com/rpii/wdio-html-reporter/blob/master/changes.md)

## Information

Dieses Projekt ist eine Neuimplementierung von [@rpii/wdio-html-reporter](https://www.npmjs.com/package/wdio-html-reporter)
Es ist in Typescript mit vielen Verbesserungen geschrieben.



## Konfiguration

### WDIO.config.ts

Der folgende Code zeigt die Standard-Konfiguration des WDIO-Test-Runners. Fügen Sie einfach ein HtmlReporter-Objekt als weiteren Reporter zum reporters-Array hinzu:

### Eine funktionierende wdio.config.ts wird in [/samples/wdio.config.ts](https://github.com/rpii/wdio-html-reporter/blob/master//samples/wdio.config.ts) bereitgestellt

Nachfolgend finden Sie Ausschnitte aus dieser Datei.

```typescript

// wdio.config.ts
import {ReportGenerator, HtmlReporter} from 'wdio-html-nice-reporter';
let reportAggregator: ReportGenerator;

const BaseConfig: WebdriverIO.Config = {
    
  reporters: ['spec',
        ["html-nice", {
            outputDir: './reports/html-reports/',
            filename: 'report.html',
            reportTitle: 'Test Report Title',
            linkScreenshots: true,
            //to show the report in a browser when done
            showInBrowser: true,
            collapseTests: false,
            //to turn on screenshots after every test
            useOnAfterCommandForScreenshot: false
        }
        ]
    ]
    
 
};
```
## Konfigurationsoptionen:
  
### Um einen Hauptbericht für alle Suiten zu generieren

webdriver.io ruft den Reporter für jede Testsuite auf. Es aggregiert die Berichte nicht. Um dies zu tun, fügen Sie die folgenden Event-Handler zu Ihrer wdio.config.js hinzu

Zur Browser-Konfigurationsdatei hinzufügen:
```
let reportAggregator : ReportAggregator;
```
Zum Browser-Konfigurationsobjekt hinzufügen:
```javascript
    onPrepare: function(config, capabilities) {

    reportAggregator = new ReportGenerator({
        outputDir: './reports/html-reports/',
        filename: 'master-report.html',
        reportTitle: 'Master Report',
        browserName: capabilities.browserName,
        collapseTests: true
    });
    reportAggregator.clean();
}


onComplete: function (exitCode, config, capabilities, results) {
    (async () => {
        await reportAggregator.createReport();
    })();
}


``` 


  
### Um eine PDF-Datei aus diesem Bericht zu generieren

Erfordert ein zusätzliches Plugin, um die Unterstützung für diejenigen leichtgewichtig zu halten, die es nicht benötigen.
Siehe [@rpii/wdio-html-reporter-pdf](https://www.npmjs.com/package/@rpii/wdio-html-reporter-pdf)


## Beispielausgabe:

![Report Screenshot](https://github.com/rpii/wdio-html-reporter/blob/master/TestReport.png)

## browserName

Dies muss manuell eingestellt werden. Es ist zur Konfigurationszeit nicht verfügbar, da das Browser-Objekt erst existiert, wenn Sie eine Sitzung starten.