---
id: wdio-novus-visual-regression-service
title: Servizio di Regressione Visiva Novus
custom_edit_url: https://github.com/Jnegrier/wdio-novus-visual-regression-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-novus-visual-regression-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/Jnegrier/wdio-novus-visual-regression-service) | [npm](https://www.npmjs.com/package/wdio-novus-visual-regression-service)

[![Build Status](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service.svg?branch=master)](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service)

> Test di regressione visiva per WebdriverIO

Basato sul lavoro di Jan-André Zinser su [wdio-visual-regression-service](https://github.com/zinserjan/wdio-visual-regression-service) e [wdio-screenshot](https://github.com/zinserjan/wdio-screenshot)

## Installazione

Puoi installare wdio-novus-visual-regression-service tramite NPM come di consueto:

```sh
$ npm install wdio-novus-visual-regression-service --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui.](https://webdriver.io/docs/gettingstarted)

## Configurazione
Configura wdio-novus-visual-regression-service aggiungendo `novus-visual-regression` alla sezione dei servizi della tua configurazione WebdriverIO e definisci la strategia di confronto desiderata nelle opzioni del servizio.

```js
// wdio.conf.js

var path = require('path');
var VisualRegressionCompare = require('wdio-novus-visual-regression-service/compare');

function getScreenshotName(basePath) {
  return function(context) {
    var type = context.type;
    var testName = context.test.title;
    var browserVersion = parseInt(context.browser.version, 10);
    var browserName = context.browser.name;
    var browserViewport = context.meta.viewport;
    var browserWidth = browserViewport.width;
    var browserHeight = browserViewport.height;

    return path.join(basePath, `${testName}_${type}_${browserName}_v${browserVersion}_${browserWidth}x${browserHeight}.png`);
  };
}

exports.config = {
  // ...
  services: [
    [
      'novus-visual-regression',
      {
        compare: new VisualRegressionCompare.LocalCompare({
          referenceName: getScreenshotName(path.join(process.cwd(), 'screenshots/reference')),
          screenshotName: getScreenshotName(path.join(process.cwd(), 'screenshots/screen')),
          diffName: getScreenshotName(path.join(process.cwd(), 'screenshots/diff')),
          misMatchTolerance: 0.01,
        }),
        viewportChangePause: 300,
        viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
        orientations: ['landscape', 'portrait'],
      }
    ]
  ],
  // ...
};
```

### Opzioni
Sotto la chiave `visualRegression` nel tuo wdio.config.js puoi passare un oggetto di configurazione con la seguente struttura:

* **compare** `Object` <br />
metodo di confronto degli screenshot, vedi [Metodi di Confronto](#compare-methods)

* **viewportChangePause**  `Number`  (predefinito: 100) <br />
attendi x millisecondi dopo il cambio del viewport. Può richiedere del tempo per il browser per ridisegnare l'interfaccia. Questo potrebbe portare a problemi di rendering e produrre risultati incoerenti tra le esecuzioni.

* **viewports** `Object[{ width: Number, height: Number }]`  (predefinito: *[viewport-corrente]*) (**solo desktop**)<br />
   tutti gli screenshot saranno acquisiti in diverse dimensioni di viewport (ad es. per test di design responsive)

* **orientations** `String[] {landscape, portrait}`  (predefinito: *[orientamento-corrente]*) (**solo mobile**)<br />
    tutti gli screenshot saranno acquisiti in diversi orientamenti dello schermo (ad es. per test di design responsive)

### Metodi di Confronto
wdio-novus-visual-regression-service consente l'uso di diversi metodi di confronto degli screenshot.

#### VisualRegressionCompare.LocalCompare
Come suggerisce il nome, *LocalCompare* cattura gli screenshot localmente sul tuo computer e li confronta con le esecuzioni precedenti.

Puoi passare le seguenti opzioni al suo costruttore come oggetto:

* **referenceName** `Function` <br />
passa una funzione che restituisce il nome del file per lo screenshot di riferimento. La funzione riceve un oggetto *context* come primo parametro con tutte le informazioni rilevanti sul comando.

* **screenshotName** `Function` <br />
passa una funzione che restituisce il nome del file per lo screenshot corrente. La funzione riceve un oggetto *context* come primo parametro con tutte le informazioni rilevanti sul comando.

* **diffName** `Function` <br />
passa una funzione che restituisce il nome del file per lo screenshot di differenza. La funzione riceve un oggetto *context* come primo parametro con tutte le informazioni rilevanti sul comando.

* **misMatchTolerance** `Number`  (predefinito: 0.01) <br />
numero tra 0 e 100 che definisce il grado di discrepanza per considerare due immagini come identiche, aumentando questo valore diminuirà la copertura del test.

* **ignoreComparison** `String`  (predefinito: nothing) <br />
passa una stringa con valore di `nothing`, `colors` o `antialiasing` per regolare il metodo di confronto.

Per un esempio di generazione dei nomi dei file degli screenshot in base al nome del test corrente, dai un'occhiata al codice di esempio di [Configurazione](#configuration).

#### VisualRegressionCompare.SaveScreenshot
Questo metodo è una variante ridotta di `VisualRegressionCompare.LocalCompare` per catturare solo screenshot. Questo è abbastanza utile quando vuoi solo creare screenshot di riferimento e sovrascrivere i precedenti senza confrontarli.

Puoi passare le seguenti opzioni al suo costruttore come oggetto:

* **screenshotName** `Function` <br />
passa una funzione che restituisce il nome del file per lo screenshot corrente. La funzione riceve un oggetto *context* come primo parametro con tutte le informazioni rilevanti sul comando.

#### VisualRegressionCompare.Spectre
Questo metodo viene utilizzato per caricare screenshot sull'applicazione web [Spectre](https://github.com/wearefriday/spectre).
Spectre è un'interfaccia utente per i test di regressione visiva. Memorizza gli screenshot e li confronta, il che è piuttosto utile per l'Integrazione Continua.

Puoi passare le seguenti opzioni al suo costruttore come oggetto:

* **url** `String` <br />
passa un URL del servizio web spectre.

* **project** `String` <br />
passa un nome per il tuo progetto.

* **suite** `String` <br />
passa un nome per la tua suite di test. Un progetto può contenere diverse suite.

* **test** `Function` <br />
passa una funzione che restituisce il nome del test per lo screenshot. La funzione riceve un oggetto *context* come primo parametro con tutte le informazioni rilevanti sul comando.

* **browser** `Function` <br />
passa una funzione che restituisce il browser per lo screenshot. La funzione riceve un oggetto *context* come primo parametro con tutte le informazioni rilevanti sul comando.

* **size** `Function` <br />
passa una funzione che restituisce la dimensione per lo screenshot. La funzione riceve un oggetto *context* come primo parametro con tutte le informazioni rilevanti sul comando.

* **fuzzLevel** `Number`  (predefinito: 30) <br />
numero tra 0 e 100 che definisce il fattore di sfocatura del metodo di confronto delle immagini di Spectre. Per maggiori dettagli, consulta la [documentazione di Spectre](https://github.com/wearefriday/spectre).

**Esempio**
```js
// wdio.conf.js

var path = require('path');
var VisualRegressionCompare = require('wdio-novus-visual-regression-service/compare');

exports.config = {
  // ...
  services: [
    [
      'novus-visual-regression',
      {
        compare: new VisualRegressionCompare.Spectre({
          url: 'http://localhost:3000',
          project: 'my project',
          suite: 'my test suite',
          test: function getTest(context) {
            return context.test.title;
          },
          browser: function getBrowser(context) {
            return context.browser.name;
          },
          size: function getSize(context) {
            return context.meta.viewport != null ? context.meta.viewport.width : context.meta.orientation;
          },
          fuzzLevel: 30
        }),
        viewportChangePause: 300,
        viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
        orientations: ['landscape', 'portrait'],
      }
    ]
  ],
  // ...
};
```

## Utilizzo
wdio-novus-visual-regression-service arricchisce un'istanza WebdriverIO con i seguenti comandi:
* `browser.checkViewport([{options}]);`
* `browser.checkDocument([{options}]);`
* `browser.checkElement(elementSelector, [{options}]);`


Tutti questi forniscono opzioni che ti aiuteranno a catturare screenshot in diverse dimensioni o a escludere parti irrilevanti (ad es. contenuti). Sono disponibili le seguenti opzioni:


* **exclude** `String[]|Object[]` (**non ancora implementato**)<br />
  esclude parti del tuo screenshot che cambiano frequentemente, puoi passare tutti i tipi di diverse [strategie di selezione WebdriverIO](http://webdriver.io/guide/usage/selectors.html)
  che interrogano uno o più elementi oppure puoi definire valori x e y che estendono un rettangolo o un poligono

* **hide** `Object[]`<br />
  nasconde tutti gli elementi interrogati da tutti i tipi di diverse [strategie di selezione WebdriverIO](http://webdriver.io/guide/usage/selectors.html) (tramite `visibility: hidden`)

* **remove** `Object[]`<br />
  rimuove tutti gli elementi interrogati da tutti i tipi di diverse [strategie di selezione WebdriverIO](http://webdriver.io/guide/usage/selectors.html) (tramite `display: none`)

* **viewports** `Object[{ width: Number, height: Number }]` (**solo desktop**)<br />
     Sovrascrive il valore globale *viewports* per questo comando. Tutti gli screenshot saranno acquisiti in diverse dimensioni di viewport (ad es. per test di design responsive)

* **orientations** `String[] {landscape, portrait}` (**solo mobile**)<br />
    Sovrascrive il valore globale *orientations* per questo comando. Tutti gli screenshot saranno acquisiti in diversi orientamenti dello schermo (ad es. per test di design responsive)

* **misMatchTolerance** `Number` <br />
    Sovrascrive il valore globale *misMatchTolerance* per questo comando. Passa un numero tra 0 e 100 che definisce il grado di discrepanza per considerare due immagini come identiche.

* **fuzzLevel** `Number` <br />
    Sovrascrive il valore globale *fuzzLevel* per questo comando. Passa un numero tra 0 e 100 che definisce il fattore di sfocatura del metodo di confronto delle immagini di Spectre.

* **ignoreComparison** `String` <br />
    Sovrascrive il valore globale *ignoreComparison* per questo comando. Passa una stringa con valore di `nothing`, `colors` o `antialiasing` per regolare il metodo di confronto.

* **viewportChangePause**  `Number` <br />
    Sovrascrive il valore globale *viewportChangePause* per questo comando. Attendi x millisecondi dopo il cambio del viewport.

### Licenza

MIT