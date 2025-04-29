---
id: wdio-html-nice-reporter
title: Reporter HTML
custom_edit_url: https://github.com/rpii/wdio-html-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-html-nice-reporter to pakiet zewnętrzny, więcej informacji znajdziesz na [GitHub](https://github.com/rpii/wdio-html-reporter) | [npm](https://www.npmjs.com/package/wdio-html-nice-reporter)
 # wdio-html-nice-reporter

Reporter dla webdriver.io, który generuje ładny raport HTML.  
Nazwa jest głupia, ale zapewnia integrację z webdriverio

### Nowość: już nie beta.

### Nowość: uporządkowano i przełączono logowanie na wdio-logging. Próbki są zaktualizowane.
    Musisz usunąć inicjalizację loggera log4Js ze swojej konfiguracji

### Nowość: przepisany jako moduł ES dla kompatybilności z webdriverio 8.
    Możesz potrzebować zmian w swojej aplikacji testowej

### Poprawka błędu: webdriverio zamykało się podczas asynchronicznego zapisu json.

### Poprawka błędu: zapis json nie był prawidłowo oczekiwany

### Świetna nowa poprawa: koniec z błędami braku pamięci z powodu json.stringify

### Świetna nowa funkcja: nagrywanie filmów z każdego testu


## [Changelog](https://github.com/rpii/wdio-html-reporter/blob/master/changes.md)

## Informacje

Ten projekt to przepisana wersja [@rpii/wdio-html-reporter](https://www.npmjs.com/package/wdio-html-reporter)
Jest napisany w typescript z wieloma ulepszeniami.



## Konfiguracja

### WDIO.config.ts

Poniższy kod pokazuje domyślną konfigurację test runnera wdio. Wystarczy dodać obiekt HtmlReporter jako kolejny reporter do tablicy reporters:

### Działający plik wdio.config.ts jest dostępny w [/samples/wdio.config.ts](https://github.com/rpii/wdio-html-reporter/blob/master//samples/wdio.config.ts)

poniżej znajdują się fragmenty z tego pliku.

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
## Opcje konfiguracji:
  
### Aby wygenerować główny raport dla wszystkich zestawów testów

webdriver.io będzie wywoływać reporter dla każdego zestawu testów. Nie agreguje raportów. Aby to zrobić, dodaj następujące procedury obsługi zdarzeń do pliku wdio.config.js

Dodaj do pliku konfiguracyjnego przeglądarki:
```
let reportAggregator : ReportAggregator;
```
Dodaj do obiektu konfiguracyjnego przeglądarki:
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


  
### Aby wygenerować plik pdf z tego raportu

Wymaga dodatkowego pluginu, aby wsparcie było lekkie dla tych, którzy tego nie chcą.
zobacz [@rpii/wdio-html-reporter-pdf](https://www.npmjs.com/package/@rpii/wdio-html-reporter-pdf)


## Przykładowy wynik:

![Report Screenshot](https://github.com/rpii/wdio-html-reporter/blob/master/TestReport.png)

## browserName

Musi być ustawiony ręcznie. Nie jest dostępny w czasie konfiguracji, ponieważ obiekt przeglądarki nie istnieje, dopóki nie rozpoczniesz sesji.