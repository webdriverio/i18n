---
id: wdio-novus-visual-regression-service
title: Usługa Regresji Wizualnej Novus
custom_edit_url: https://github.com/Jnegrier/wdio-novus-visual-regression-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-novus-visual-regression-service jest pakietem zewnętrznym, więcej informacji znajdziesz na [GitHub](https://github.com/Jnegrier/wdio-novus-visual-regression-service) | [npm](https://www.npmjs.com/package/wdio-novus-visual-regression-service)

[![Build Status](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service.svg?branch=master)](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service)

> Testy regresji wizualnej dla WebdriverIO

Bazuje na pracy Jana-André Zinsera nad [wdio-visual-regression-service](https://github.com/zinserjan/wdio-visual-regression-service) i [wdio-screenshot](https://github.com/zinserjan/wdio-screenshot)

## Instalacja

Możesz zainstalować wdio-novus-visual-regression-service przez NPM jak zwykle:

```sh
$ npm install wdio-novus-visual-regression-service --save-dev
```

Instrukcje jak zainstalować `WebdriverIO` można znaleźć [tutaj.](https://webdriver.io/docs/gettingstarted)

## Konfiguracja
Skonfiguruj wdio-novus-visual-regression-service dodając `novus-visual-regression` do sekcji usług w konfiguracji WebdriverIO i zdefiniuj pożądaną strategię porównywania w opcjach usługi.

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

### Opcje
Pod kluczem `visualRegression` w pliku wdio.config.js możesz przekazać obiekt konfiguracyjny o następującej strukturze:

* **compare** `Object` <br />
metoda porównywania zrzutów ekranu, zobacz [Metody Porównywania](#compare-methods)

* **viewportChangePause**  `Number`  ( domyślnie: 100 ) <br />
odczekaj x milisekund po zmianie viewport. Przeglądarka może potrzebować chwili na ponowne renderowanie. Może to prowadzić do problemów z renderowaniem i daje niespójne wyniki między uruchomieniami.

* **viewports** `Object[{ width: Number, height: Number }]`  ( domyślnie: *[bieżący-viewport]* ) (**tylko desktop**)<br />
   wszystkie zrzuty ekranu będą wykonywane w różnych wymiarach viewport (np. dla testów responsywnego designu)

* **orientations** `String[] {landscape, portrait}`  ( domyślnie: *[bieżąca-orientacja]* ) (**tylko mobilne**)<br />
    wszystkie zrzuty ekranu będą wykonywane w różnych orientacjach ekranu (np. dla testów responsywnego designu)

### Metody Porównywania
wdio-novus-visual-regression-service umożliwia korzystanie z różnych metod porównywania zrzutów ekranu.

#### VisualRegressionCompare.LocalCompare
Jak sugeruje nazwa, *LocalCompare* wykonuje zrzuty ekranu lokalnie na komputerze i porównuje je z poprzednimi przebiegami.

Możesz przekazać następujące opcje do konstruktora jako obiekt:

* **referenceName** `Function` <br />
przekaż funkcję, która zwraca nazwę pliku dla referencyjnego zrzutu ekranu. Funkcja otrzymuje obiekt *context* jako pierwszy parametr ze wszystkimi istotnymi informacjami o poleceniu.

* **screenshotName** `Function` <br />
przekaż funkcję, która zwraca nazwę pliku dla bieżącego zrzutu ekranu. Funkcja otrzymuje obiekt *context* jako pierwszy parametr ze wszystkimi istotnymi informacjami o poleceniu.

* **diffName** `Function` <br />
przekaż funkcję, która zwraca nazwę pliku dla zrzutu ekranu różnic. Funkcja otrzymuje obiekt *context* jako pierwszy parametr ze wszystkimi istotnymi informacjami o poleceniu.

* **misMatchTolerance** `Number`  ( domyślnie: 0.01 ) <br />
liczba między 0 a 100, która określa stopień niedopasowania, aby uznać dwa obrazy za identyczne, zwiększenie tej wartości zmniejszy pokrycie testami.

* **ignoreComparison** `String`  ( domyślnie: nic ) <br />
przekaż ciąg z wartością `nothing`, `colors` lub `antialiasing`, aby dostosować metodę porównywania.

Przykład generowania nazw plików zrzutów ekranu w zależności od bieżącej nazwy testu znajduje się w przykładowym kodzie [Konfiguracja](#configuration).

#### VisualRegressionCompare.SaveScreenshot
Ta metoda jest okrojoną wersją `VisualRegressionCompare.LocalCompare` do przechwytywania tylko zrzutów ekranu. Jest to przydatne, gdy chcesz tylko utworzyć referencyjne zrzuty ekranu i nadpisać poprzednie bez porównywania.

Możesz przekazać następujące opcje do konstruktora jako obiekt:

* **screenshotName** `Function` <br />
przekaż funkcję, która zwraca nazwę pliku dla bieżącego zrzutu ekranu. Funkcja otrzymuje obiekt *context* jako pierwszy parametr ze wszystkimi istotnymi informacjami o poleceniu.

#### VisualRegressionCompare.Spectre
Ta metoda służy do przesyłania zrzutów ekranu do aplikacji webowej [Spectre](https://github.com/wearefriday/spectre).
Spectre to interfejs użytkownika do testów regresji wizualnej. Przechowuje zrzuty ekranu i porównuje je, co jest przydatne w Ciągłej Integracji.

Możesz przekazać następujące opcje do konstruktora jako obiekt:

* **url** `String` <br />
przekaż URL usługi webowej Spectre.

* **project** `String` <br />
przekaż nazwę dla swojego projektu.

* **suite** `String` <br />
przekaż nazwę dla swojego zestawu testów. Jeden projekt może zawierać kilka zestawów.

* **test** `Function` <br />
przekaż funkcję, która zwraca nazwę testu dla zrzutu ekranu. Funkcja otrzymuje obiekt *context* jako pierwszy parametr ze wszystkimi istotnymi informacjami o poleceniu.

* **browser** `Function` <br />
przekaż funkcję, która zwraca przeglądarkę dla zrzutu ekranu. Funkcja otrzymuje obiekt *context* jako pierwszy parametr ze wszystkimi istotnymi informacjami o poleceniu.

* **size** `Function` <br />
przekaż funkcję, która zwraca rozmiar dla zrzutu ekranu. Funkcja otrzymuje obiekt *context* jako pierwszy parametr ze wszystkimi istotnymi informacjami o poleceniu.

* **fuzzLevel** `Number`  ( domyślnie: 30 ) <br />
liczba między 0 a 100, która określa współczynnik rozmycia metody porównywania obrazów Spectre. Więcej szczegółów znajdziesz w [dokumentacji Spectre](https://github.com/wearefriday/spectre).

**Przykład**
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

## Użycie
wdio-novus-visual-regression-service rozszerza instancję WebdriverIO o następujące polecenia:
* `browser.checkViewport([{options}]);`
* `browser.checkDocument([{options}]);`
* `browser.checkElement(elementSelector, [{options}]);`


Wszystkie te polecenia oferują opcje, które pomogą Ci wykonać zrzuty ekranu w różnych wymiarach lub wykluczyć nieistotne części (np. treść). Dostępne są następujące opcje:


* **exclude** `String[]|Object[]` (**jeszcze nie zaimplementowane**)<br />
  wyklucz często zmieniające się części zrzutu ekranu, możesz przekazać różne [strategie selektorów WebdriverIO](http://webdriver.io/guide/usage/selectors.html),
  które wybierają jeden lub więcej elementów, lub możesz zdefiniować wartości x i y, które rozciągają prostokąt lub wielokąt

* **hide** `Object[]`<br />
  ukrywa wszystkie elementy wybrane przez różne [strategie selektorów WebdriverIO](http://webdriver.io/guide/usage/selectors.html) (przez `visibility: hidden`)

* **remove** `Object[]`<br />
  usuwa wszystkie elementy wybrane przez różne [strategie selektorów WebdriverIO](http://webdriver.io/guide/usage/selectors.html) (przez `display: none`)

* **viewports** `Object[{ width: Number, height: Number }]` (**tylko desktop**)<br />
     Nadpisuje globalną wartość *viewports* dla tego polecenia. Wszystkie zrzuty ekranu będą wykonywane w różnych wymiarach viewport (np. dla testów responsywnego designu)

* **orientations** `String[] {landscape, portrait}` (**tylko mobilne**)<br />
    Nadpisuje globalną wartość *orientations* dla tego polecenia. Wszystkie zrzuty ekranu będą wykonywane w różnych orientacjach ekranu (np. dla testów responsywnego designu)

* **misMatchTolerance** `Number` <br />
    Nadpisuje globalną wartość *misMatchTolerance* dla tego polecenia. Przekaż liczbę między 0 a 100, która określa stopień niedopasowania, aby uznać dwa obrazy za identyczne.

* **fuzzLevel** `Number` <br />
    Nadpisuje globalną wartość *fuzzLevel* dla tego polecenia. Przekaż liczbę między 0 a 100, która określa współczynnik rozmycia metody porównywania obrazów Spectre.

* **ignoreComparison** `String` <br />
    Nadpisuje globalną wartość *ignoreComparison* dla tego polecenia. Przekaż ciąg z wartością `nothing`, `colors` lub `antialiasing`, aby dostosować metodę porównywania.

* **viewportChangePause**  `Number` <br />
    Nadpisuje globalną wartość *viewportChangePause* dla tego polecenia. Odczekaj x milisekund po zmianie viewport.

### Licencja

MIT