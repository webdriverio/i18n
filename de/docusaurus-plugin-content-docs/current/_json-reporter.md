---
id: json-reporter
title: Json Reporter
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-json-reporter/README.md
---



## Installation

```bash
npm install @wdio/json-reporter --save-dev
```

## Konfiguration

### Ergebnisse an `stdout`

```js
reporters: [
    'dot',
    ['json', { stdout: true }]
],
```

### Ergebnisse in Datei

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results'
    }]
],
```

### Ergebnisse in Datei mit benutzerdefiniertem Dateinamen

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results',
        outputFileFormat: (opts) => {
            return `results-${opts.cid}.${opts.capabilities.browserName}.json`
        }
    }]
],
```

## Ergebnisdateien

Mit WDIO v5 und höher wurde die Berichterstattung von einem zentralisierten Prozess zu einem Prozess verschoben, der von jeder der für die parallele Testausführung erstellten "Sessions" verwaltet wird. Diese Änderung hat dazu beigetragen, die Menge der Kommunikation während der WDIO-Testausführung zu reduzieren und damit die Leistung zu verbessern. Der Nachteil ist, dass es nicht mehr möglich ist, einen einzigen Bericht für alle Testausführungen zu erhalten.

`@wdio/json-reporter` bietet eine Hilfsfunktion zum Zusammenführen der mehreren JSON-Dateien in eine einzige Datei. Befolgen Sie die folgenden Schritte, um diese Funktion zu nutzen.

Sie können dies im [`onComplete`](https://webdriver.io/docs/configuration#oncomplete) Ihrer `wdio.conf.js` ausführen:

```javascript
// wdio.conf.js
import mergeResults from '@wdio/json-reporter/mergeResults'

export const config = {
    // ...
    onComplete: function (exitCode, config, capabilities, results) {
        mergeResults('./results', 'wdio-.*-json-reporter.json', 'wdio-custom-filename.json')
    }
    // ...
}
```

_Hinweis:_ `wdio-custom-filename.json` ist optional. Wenn der Parameter nicht angegeben wird, ist der Standardwert `wdio-merged.json`.

## Mitwirkung

Der Quellcode dieses Reporters wurde stark vom [`wdio-json-reporter`](https://github.com/fijijavis/wdio-json-reporter) Community-Reporter von [Jim Davis](https://github.com/fijijavis) inspiriert. Vielen Dank für die ganze Arbeit bei der Pflege des Projekts!

---

Weitere Informationen zu WebdriverIO finden Sie auf der [Homepage](http://webdriver.io).