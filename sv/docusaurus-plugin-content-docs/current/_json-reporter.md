---
id: json-reporter
title: Json Reporter
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-json-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Installation

```bash
npm install @wdio/json-reporter --save-dev
```

## Konfiguration

### Resultat till `stdout`

```js
reporters: [
    'dot',
    ['json', { stdout: true }]
],
```

### Resultat till fil

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results'
    }]
],
```

### Resultat till fil med anpassat filnamn

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

## Resultatfiler

Med WDIO v5 och uppåt har rapporteringen flyttats från en centraliserad process till en som hanteras av var och en av "sessionerna" som startats för parallell testutförande. Denna förändring bidrog till att minska mängden kommunikation under WDIO-testutförande och förbättrade därmed prestandan. Nackdelen är att det inte längre är möjligt att få en enda rapport för all testutförande.

`@wdio/json-reporter` tillhandahåller en hjälpfunktion för att slå samman flera json-filer till en enda fil. Följ stegen nedan för att dra nytta av denna funktion.

Du kan utföra detta i [`onComplete`](https://webdriver.io/docs/configuration#oncomplete) i din `wdio.conf.js`:

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

_Obs:_ `wdio-custom-filename.json` är valfritt, om parametern inte anges är standardvärdet `wdio-merged.json`.

## Bidrag

Källkoden för denna reporter var starkt inspirerad av [`wdio-json-reporter`](https://github.com/fijijavis/wdio-json-reporter) community reporter av [Jim Davis](https://github.com/fijijavis). Tack för allt arbete med att underhålla projektet!

---

För mer information om WebdriverIO, se [hemsidan](http://webdriver.io).