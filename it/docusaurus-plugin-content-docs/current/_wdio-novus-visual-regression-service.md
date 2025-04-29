---
id: wdio-novus-visual-regression-service
title: Servizio di Regressione Visiva Novus
custom_edit_url: https://github.com/Jnegrier/wdio-novus-visual-regression-service/edit/master/README.md
---


> wdio-novus-visual-regression-service è un pacchetto di terze parti, per ulteriori informazioni vedere [GitHub](https://github.com/Jnegrier/wdio-novus-visual-regression-service) | [npm](https://www.npmjs.com/package/wdio-novus-visual-regression-service)

[![Build Status](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service.svg?branch=master)](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service)

> Test di regressione visiva per WebdriverIO

Basato sul lavoro di Jan-André Zinser su [wdio-visual-regression-service](https://github.com/zinserjan/wdio-visual-regression-service) e [wdio-screenshot](https://github.com/zinserjan/wdio-screenshot)

## Installazione

Puoi installare wdio-novus-visual-regression-service tramite NPM come al solito:

```sh
$ npm install wdio-novus-visual-regression-service --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui.](https://webdriver.io/docs/gettingstarted)

## Configurazione
Configura wdio-novus-visual-regression-service aggiungendo `novus-visual-regression` alla sezione dei servizi del tuo config WebdriverIO e definisci la strategia di confronto desiderata nelle opzioni del servizio.

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

* **viewportChangePause**  `Number`  ( default: 100 ) <br />
attendi x millisecondi dopo il cambio di viewport. Può richiedere del tempo al browser per ridisegnare. Questo potrebbe portare a problemi di rendering e produrre risultati inconsistenti tra le esecuzioni.

* **viewports** `Object[{ width: Number, height: Number }]`  ( default: *[current-viewport]* ) (**solo desktop**)<br />
   tutti gli screenshot saranno acquisiti in dimensioni di viewport diverse (ad esempio per test di design responsive)

* **orientations** `String[] {landscape, portrait}`  ( default: *[current-orientation]* ) (**solo mobile**)<br />
    tutti gli screenshot saranno acquisiti con orientamenti di schermo diversi (ad esempio per test di design responsive)

### Metodi di Confronto
wdio-novus-visual-regression-service consente l'utilizzo di diversi metodi di confronto degli screenshot.

#### VisualRegressionCompare.LocalCompare
Come suggerisce il nome, *LocalCompare* cattura gli screenshot localmente sul tuo computer e li confronta con le esecuzioni precedenti.

Puoi passare le seguenti opzioni al suo costruttore come oggetto:

* **referenceName** `Function` <br />
passa una funzione che restituisce il nome del file per lo screenshot di riferimento. La funzione riceve un oggetto *context* come primo parametro con tutte le informazioni rilevanti sul comando.

* **screenshotName** `Function` <br />
passa una funzione che restituisce il nome del file per lo screenshot corrente. La funzione riceve un oggetto *context* come primo parametro con tutte le informazioni rilevanti sul comando.

* **diffName** `Function` <br />
passa una funzione che restituisce il nome del file per lo screenshot diff. La funzione riceve un oggetto *context* come primo parametro con tutte le informazioni rilevanti sul comando.

* **misMatchTolerance** `Number`  ( default: 0.01 ) <br />
numero tra 0 e 100 che definisce il grado di mancata corrispondenza per considerare due immagini come identiche, aumentando questo valore diminuirà la copertura dei test.

* **ignoreComparison** `String`  ( default: nothing ) <br />
passa una stringa con valore di `nothing`, `colors` o `antialiasing` per regolare il metodo di confronto.

Per un esempio di generazione di nomi di file di screenshot dipendenti dal nome del test corrente, dai un'occhiata al codice di esempio di [Configurazione](#configuration).

#### VisualRegressionCompare.SaveScreenshot
Questo metodo è una variante semplificata di `VisualRegressionCompare.LocalCompare` per catturare solo screenshot. Questo è molto utile quando vuoi creare solo screenshot di riferimento e sovrascrivere quelli precedenti senza fare il diff.

Puoi passare le seguenti opzioni al suo costruttore come oggetto:

* **screenshotName** `Function` <br />
passa una funzione che restituisce il nome del file per lo screenshot corrente. La funzione riceve un oggetto *context* come primo parametro con tutte le informazioni rilevanti sul comando.

#### VisualRegressionCompare.Spectre
Questo metodo viene utilizzato per caricare screenshot sull'applicazione web [Spectre](https://github.com/wearefriday/spectre).
Spectre è un'interfaccia utente per il test di regressione visiva. Memorizza gli screenshot e li confronta, il che è piuttosto utile per l'Integrazione Continua.

Puoi passare le seguenti opzioni al suo costruttore come oggetto:

* **url** `String` <br />
passa un URL del webservice spectre.

* **project** `String` <br />
passa un nome per il tuo progetto.

* **suite** `String` <br />
passa un nome per la tua testsuite. Un progetto può contenere diverse suite.

* **test** `Function` <br />
passa una funzione che restituisce il nome del test per lo screenshot. La funzione riceve un oggetto *context* come primo parametro con tutte le informazioni rilevanti sul comando.

* **browser** `Function` <br />
passa una funzione che restituisce il browser per lo screenshot. La funzione riceve un oggetto *context* come primo parametro con tutte le informazioni rilevanti sul comando.

* **size** `Function` <br />
passa una funzione che restituisce la dimensione per lo screenshot. La funzione riceve un oggetto *context* come primo parametro con tutte le informazioni rilevanti sul comando.

* **fuzzLevel** `Number`  ( default: 30 ) <br />
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


Tutti questi forniscono opzioni che ti aiuteranno a catturare screenshot in dimensioni diverse o ad escludere parti irrilevanti (ad esempio contenuti). Sono disponibili le seguenti opzioni:


* **exclude** `String[]|Object[]` (**non ancora implementato**)<br />
  esclude parti del tuo screenshot che cambiano frequentemente, puoi passare tutti i tipi di diverse [strategie di selezione WebdriverIO](http://webdriver.io/guide/usage/selectors.html)
  che interrogano uno o più elementi o puoi definire valori x e y che formano un rettangolo o un poligono

* **hide** `Object[]`<br />
  nasconde tutti gli elementi interrogati da tutti i tipi di diverse [strategie di selezione WebdriverIO](http://webdriver.io/guide/usage/selectors.html) (tramite `visibility: hidden`)

* **remove** `Object[]`<br />
  rimuove tutti gli elementi interrogati da tutti i tipi di diverse [strategie di selezione WebdriverIO](http://webdriver.io/guide/usage/selectors.html) (tramite `display: none`)

* **viewports** `Object[{ width: Number, height: Number }]` (**solo desktop**)<br />
     Sovrascrive il valore globale *viewports* per questo comando. Tutti gli screenshot saranno acquisiti in dimensioni di viewport diverse (ad esempio per test di design responsive)

* **orientations** `String[] {landscape, portrait}` (**solo mobile**)<br />
    Sovrascrive il valore globale *orientations* per questo comando. Tutti gli screenshot saranno acquisiti con orientamenti di schermo diversi (ad esempio per test di design responsive)

* **misMatchTolerance** `Number` <br />
    Sovrascrive il valore globale *misMatchTolerance* per questo comando. Passa un numero tra 0 e 100 che definisce il grado di mancata corrispondenza per considerare due immagini come identiche.

* **fuzzLevel** `Number` <br />
    Sovrascrive il valore globale *fuzzLevel* per questo comando. Passa un numero tra 0 e 100 che definisce il fattore di sfocatura del metodo di confronto delle immagini di Spectre.

* **ignoreComparison** `String` <br />
    Sovrascrive il valore globale *ignoreComparison* per questo comando. Passa una stringa con valore di `nothing`, `colors` o `antialiasing` per regolare il metodo di confronto.

* **viewportChangePause**  `Number` <br />
    Sovrascrive il valore globale *viewportChangePause* per questo comando. Attendi x millisecondi dopo il cambio di viewport.

### Licenza

MIT