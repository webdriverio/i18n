---
id: wdio-novus-visual-regression-service
title: Novus Visual Regression Service
custom_edit_url: https://github.com/Jnegrier/wdio-novus-visual-regression-service/edit/master/README.md
---


> wdio-novus-visual-regression-service ist ein Paket von Drittanbietern, weitere Informationen finden Sie auf [GitHub](https://github.com/Jnegrier/wdio-novus-visual-regression-service) | [npm](https://www.npmjs.com/package/wdio-novus-visual-regression-service)

[![Build Status](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service.svg?branch=master)](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service)

> Visual Regression Testing für WebdriverIO

Basierend auf der Arbeit von Jan-André Zinser an [wdio-visual-regression-service](https://github.com/zinserjan/wdio-visual-regression-service) und [wdio-screenshot](https://github.com/zinserjan/wdio-screenshot)

## Installation

Sie können wdio-novus-visual-regression-service wie üblich über NPM installieren:

```sh
$ npm install wdio-novus-visual-regression-service --save-dev
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier.](https://webdriver.io/docs/gettingstarted)

## Configuration
Richten Sie wdio-novus-visual-regression-service ein, indem Sie `novus-visual-regression` zum Service-Bereich Ihrer WebdriverIO-Konfiguration hinzufügen und definieren Sie Ihre gewünschte Vergleichsstrategie in den Service-Optionen.

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

### Options
Unter dem Schlüssel `visualRegression` in Ihrer wdio.config.js können Sie ein Konfigurationsobjekt mit der folgenden Struktur übergeben:

* **compare** `Object` <br />
Screenshot-Vergleichsmethode, siehe [Compare Methods](#compare-methods)

* **viewportChangePause**  `Number`  ( default: 100 ) <br />
Warten Sie x Millisekunden nach der Änderung des Viewports. Es kann eine Weile dauern, bis der Browser neu rendert. Dies könnte zu Rendering-Problemen führen und inkonsistente Ergebnisse zwischen den Durchläufen erzeugen.

* **viewports** `Object[{ width: Number, height: Number }]`  ( default: *[current-viewport]* ) (**nur Desktop**)<br />
   Alle Screenshots werden in verschiedenen Viewport-Dimensionen aufgenommen (z.B. für Responsive-Design-Tests)

* **orientations** `String[] {landscape, portrait}`  ( default: *[current-orientation]* ) (**nur mobil**)<br />
    Alle Screenshots werden in verschiedenen Bildschirmorientierungen aufgenommen (z.B. für Responsive-Design-Tests)

### Compare Methods
wdio-novus-visual-regression-service ermöglicht die Verwendung verschiedener Screenshot-Vergleichsmethoden.

#### VisualRegressionCompare.LocalCompare
Wie der Name schon sagt, nimmt *LocalCompare* Screenshots lokal auf Ihrem Computer auf und vergleicht sie mit früheren Durchläufen.

Sie können dem Konstruktor folgende Optionen als Objekt übergeben:

* **referenceName** `Function` <br />
Übergeben Sie eine Funktion, die den Dateinamen für den Referenz-Screenshot zurückgibt. Die Funktion erhält ein *context*-Objekt als ersten Parameter mit allen relevanten Informationen über den Befehl.

* **screenshotName** `Function` <br />
Übergeben Sie eine Funktion, die den Dateinamen für den aktuellen Screenshot zurückgibt. Die Funktion erhält ein *context*-Objekt als ersten Parameter mit allen relevanten Informationen über den Befehl.

* **diffName** `Function` <br />
Übergeben Sie eine Funktion, die den Dateinamen für den Diff-Screenshot zurückgibt. Die Funktion erhält ein *context*-Objekt als ersten Parameter mit allen relevanten Informationen über den Befehl.

* **misMatchTolerance** `Number`  ( default: 0.01 ) <br />
Eine Zahl zwischen 0 und 100, die den Grad der Abweichung definiert, ab dem zwei Bilder als identisch betrachtet werden. Eine Erhöhung dieses Wertes verringert die Testabdeckung.

* **ignoreComparison** `String`  ( default: nothing ) <br />
Übergeben Sie einen String mit dem Wert `nothing`, `colors` oder `antialiasing`, um die Vergleichsmethode anzupassen.

Ein Beispiel für die Generierung von Screenshot-Dateinamen in Abhängigkeit vom aktuellen Testnamen finden Sie im Beispielcode unter [Configuration](#configuration).

#### VisualRegressionCompare.SaveScreenshot
Diese Methode ist eine abgespeckte Variante von `VisualRegressionCompare.LocalCompare`, um nur Screenshots zu erstellen. Dies ist nützlich, wenn Sie nur Referenz-Screenshots erstellen und die vorherigen überschreiben möchten, ohne einen Diff durchzuführen.

Sie können dem Konstruktor folgende Optionen als Objekt übergeben:

* **screenshotName** `Function` <br />
Übergeben Sie eine Funktion, die den Dateinamen für den aktuellen Screenshot zurückgibt. Die Funktion erhält ein *context*-Objekt als ersten Parameter mit allen relevanten Informationen über den Befehl.

#### VisualRegressionCompare.Spectre
Diese Methode wird zum Hochladen von Screenshots in die Webanwendung [Spectre](https://github.com/wearefriday/spectre) verwendet.
Spectre ist eine UI für visuelles Regressionstesting. Es speichert die Screenshots und vergleicht sie, was für Continuous Integration sehr nützlich ist.

Sie können dem Konstruktor folgende Optionen als Objekt übergeben:

* **url** `String` <br />
Übergeben Sie eine Spectre-Webservice-URL.

* **project** `String` <br />
Übergeben Sie einen Namen für Ihr Projekt.

* **suite** `String` <br />
Übergeben Sie einen Namen für Ihre Testsuite. Ein Projekt kann mehrere Suites enthalten.

* **test** `Function` <br />
Übergeben Sie eine Funktion, die den Testnamen für den Screenshot zurückgibt. Die Funktion erhält ein *context*-Objekt als ersten Parameter mit allen relevanten Informationen über den Befehl.

* **browser** `Function` <br />
Übergeben Sie eine Funktion, die den Browser für den Screenshot zurückgibt. Die Funktion erhält ein *context*-Objekt als ersten Parameter mit allen relevanten Informationen über den Befehl.

* **size** `Function` <br />
Übergeben Sie eine Funktion, die die Größe für den Screenshot zurückgibt. Die Funktion erhält ein *context*-Objekt als ersten Parameter mit allen relevanten Informationen über den Befehl.

* **fuzzLevel** `Number`  ( default: 30 ) <br />
Eine Zahl zwischen 0 und 100, die den Fuzz-Faktor der Bildvergleichsmethode von Spectre definiert. Weitere Details finden Sie in der [Spectre-Dokumentation](https://github.com/wearefriday/spectre).

**Beispiel**
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

## Usage
wdio-novus-visual-regression-service erweitert eine WebdriverIO-Instanz um die folgenden Befehle:
* `browser.checkViewport([{options}]);`
* `browser.checkDocument([{options}]);`
* `browser.checkElement(elementSelector, [{options}]);`


Alle diese bieten Optionen, die Ihnen helfen, Screenshots in verschiedenen Dimensionen aufzunehmen oder irrelevante Teile (z.B. Inhalte) auszuschließen. Die folgenden Optionen sind verfügbar:


* **exclude** `String[]|Object[]` (**noch nicht implementiert**)<br />
  Schließen Sie häufig wechselnde Teile Ihres Screenshots aus. Sie können entweder alle Arten von verschiedenen [WebdriverIO-Selektorstrategien](http://webdriver.io/guide/usage/selectors.html) übergeben, die ein oder mehrere Elemente abfragen, oder Sie können x- und y-Werte definieren, die ein Rechteck oder Polygon aufspannen.

* **hide** `Object[]`<br />
  Blendet alle Elemente aus, die von allen Arten von verschiedenen [WebdriverIO-Selektorstrategien](http://webdriver.io/guide/usage/selectors.html) abgefragt werden (über `visibility: hidden`)

* **remove** `Object[]`<br />
  Entfernt alle Elemente, die von allen Arten von verschiedenen [WebdriverIO-Selektorstrategien](http://webdriver.io/guide/usage/selectors.html) abgefragt werden (über `display: none`)

* **viewports** `Object[{ width: Number, height: Number }]` (**nur Desktop**)<br />
     Überschreibt den globalen *viewports*-Wert für diesen Befehl. Alle Screenshots werden in verschiedenen Viewport-Dimensionen aufgenommen (z.B. für Responsive-Design-Tests)

* **orientations** `String[] {landscape, portrait}` (**nur mobil**)<br />
    Überschreibt den globalen *orientations*-Wert für diesen Befehl. Alle Screenshots werden in verschiedenen Bildschirmorientierungen aufgenommen (z.B. für Responsive-Design-Tests)

* **misMatchTolerance** `Number` <br />
    Überschreibt den globalen *misMatchTolerance*-Wert für diesen Befehl. Übergeben Sie eine Zahl zwischen 0 und 100, die den Grad der Abweichung definiert, ab dem zwei Bilder als identisch betrachtet werden.

* **fuzzLevel** `Number` <br />
    Überschreibt den globalen *fuzzLevel*-Wert für diesen Befehl. Übergeben Sie eine Zahl zwischen 0 und 100, die den Fuzz-Faktor der Bildvergleichsmethode von Spectre definiert.

* **ignoreComparison** `String` <br />
    Überschreibt den globalen *ignoreComparison*-Wert für diesen Befehl. Übergeben Sie einen String mit dem Wert `nothing`, `colors` oder `antialiasing`, um die Vergleichsmethode anzupassen.

* **viewportChangePause**  `Number` <br />
    Überschreibt den globalen *viewportChangePause*-Wert für diesen Befehl. Warten Sie x Millisekunden nach der Änderung des Viewports.

### License

MIT