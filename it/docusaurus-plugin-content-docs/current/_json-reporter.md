---
id: json-reporter
title: Reporter Json
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-json-reporter/README.md
---



## Installazione

```bash
npm install @wdio/json-reporter --save-dev
```

## Configurazione

### Risultati su `stdout`

```js
reporters: [
    'dot',
    ['json', { stdout: true }]
],
```

### Risultati su File

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results'
    }]
],
```

### Risultati su File con nome file personalizzato

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

## File di Risultato

Con WDIO v5 e successive, la generazione di report è passata da un processo centralizzato a uno gestito da ciascuna delle "sessioni" avviate per l'esecuzione di test in parallelo. Questa modifica ha contribuito a ridurre la quantità di comunicazioni durante l'esecuzione dei test WDIO e quindi a migliorare le prestazioni. Lo svantaggio è che non è più possibile ottenere un singolo report per tutta l'esecuzione dei test.

`@wdio/json-reporter` fornisce una funzione di utilità per unire i molteplici file json in un unico file. Segui i passaggi seguenti per sfruttare questa utilità.

Puoi eseguire questo nell'[`onComplete`](https://webdriver.io/docs/configuration#oncomplete) del tuo `wdio.conf.js`:

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

_Nota:_ `wdio-custom-filename.json` è opzionale, se il parametro non viene fornito il valore predefinito è `wdio-merged.json`.

## Contributo

Il codice sorgente di questo reporter è stato fortemente ispirato dal reporter della comunità [`wdio-json-reporter`](https://github.com/fijijavis/wdio-json-reporter) di [Jim Davis](https://github.com/fijijavis). Grazie per tutto il lavoro di manutenzione del progetto!

---

Per ulteriori informazioni su WebdriverIO visita la [homepage](http://webdriver.io).