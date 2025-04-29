---
id: wdio-novus-visual-regression-service
title: Сервіс Novus Visual Regression
custom_edit_url: https://github.com/Jnegrier/wdio-novus-visual-regression-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-novus-visual-regression-service є пакетом сторонніх розробників, для отримання додаткової інформації перегляньте [GitHub](https://github.com/Jnegrier/wdio-novus-visual-regression-service) | [npm](https://www.npmjs.com/package/wdio-novus-visual-regression-service)

[![Build Status](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service.svg?branch=master)](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service)

> Візуальне регресійне тестування для WebdriverIO

На основі роботи Jan-André Zinser над [wdio-visual-regression-service](https://github.com/zinserjan/wdio-visual-regression-service) та [wdio-screenshot](https://github.com/zinserjan/wdio-screenshot)

## Встановлення

Ви можете встановити wdio-novus-visual-regression-service через NPM як зазвичай:

```sh
$ npm install wdio-novus-visual-regression-service --save-dev
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут.](https://webdriver.io/docs/gettingstarted)

## Конфігурація
Налаштуйте wdio-novus-visual-regression-service, додавши `novus-visual-regression` до секції сервісів у вашій конфігурації WebdriverIO та визначте бажану стратегію порівняння в опціях сервісу.

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

### Опції
Під ключем `visualRegression` у вашому wdio.config.js ви можете передати об'єкт конфігурації з наступною структурою:

* **compare** `Object` <br />
метод порівняння знімків екрану, див. [Методи порівняння](#compare-methods)

* **viewportChangePause**  `Number`  (за замовчуванням: 100) <br />
чекати x мілісекунд після зміни вікна перегляду. Перемальовування браузера може зайняти деякий час. Це може призвести до проблем з рендерингом і створювати непослідовні результати між запусками.

* **viewports** `Object[{ width: Number, height: Number }]`  (за замовчуванням: *[поточне-вікно-перегляду]*) (**тільки для десктопу**)<br />
   всі знімки екрану будуть зроблені в різних розмірах вікна перегляду (наприклад, для тестів адаптивного дизайну)

* **orientations** `String[] {landscape, portrait}`  (за замовчуванням: *[поточна-орієнтація]*) (**тільки для мобільних**)<br />
    всі знімки екрану будуть зроблені в різних орієнтаціях екрану (наприклад, для тестів адаптивного дизайну)

### Методи порівняння
wdio-novus-visual-regression-service дозволяє використовувати різні методи порівняння знімків екрану.

#### VisualRegressionCompare.LocalCompare
Як випливає з назви, *LocalCompare* робить знімки екрану локально на вашому комп'ютері та порівнює їх з попередніми запусками.

Ви можете передати наступні опції в його конструктор як об'єкт:

* **referenceName** `Function` <br />
передайте функцію, яка повертає ім'я файлу для еталонного знімка екрану. Функція отримує об'єкт *context* як перший параметр з усією відповідною інформацією про команду.

* **screenshotName** `Function` <br />
передайте функцію, яка повертає ім'я файлу для поточного знімка екрану. Функція отримує об'єкт *context* як перший параметр з усією відповідною інформацією про команду.

* **diffName** `Function` <br />
передайте функцію, яка повертає ім'я файлу для знімка екрану з різницею. Функція отримує об'єкт *context* як перший параметр з усією відповідною інформацією про команду.

* **misMatchTolerance** `Number`  (за замовчуванням: 0.01) <br />
число від 0 до 100, яке визначає ступінь невідповідності, щоб вважати два зображення ідентичними; збільшення цього значення зменшить покриття тестів.

* **ignoreComparison** `String`  (за замовчуванням: nothing) <br />
передайте рядок зі значенням `nothing`, `colors` або `antialiasing` для налаштування методу порівняння.

Для прикладу створення імен файлів знімків екрану залежно від поточної назви тесту, погляньте на зразок коду в розділі [Конфігурація](#configuration).

#### VisualRegressionCompare.SaveScreenshot
Цей метод є спрощеним варіантом `VisualRegressionCompare.LocalCompare` для захоплення лише знімків екрану. Це досить корисно, коли ви просто хочете створити еталонні знімки екрану та перезаписати попередні без порівняння.

Ви можете передати наступні опції в його конструктор як об'єкт:

* **screenshotName** `Function` <br />
передайте функцію, яка повертає ім'я файлу для поточного знімка екрану. Функція отримує об'єкт *context* як перший параметр з усією відповідною інформацією про команду.

#### VisualRegressionCompare.Spectre
Цей метод використовується для завантаження знімків екрану у веб-додаток [Spectre](https://github.com/wearefriday/spectre).
Spectre - це інтерфейс для візуального регресійного тестування. Він зберігає знімки екрану та порівнює їх, що досить корисно для Continuous Integration.

Ви можете передати наступні опції в його конструктор як об'єкт:

* **url** `String` <br />
передайте url-адресу веб-сервісу spectre.

* **project** `String` <br />
передайте назву для вашого проекту.

* **suite** `String` <br />
передайте назву для вашого набору тестів. Один проект може містити кілька наборів.

* **test** `Function` <br />
передайте функцію, яка повертає назву тесту для знімка екрану. Функція отримує об'єкт *context* як перший параметр з усією відповідною інформацією про команду.

* **browser** `Function` <br />
передайте функцію, яка повертає браузер для знімка екрану. Функція отримує об'єкт *context* як перший параметр з усією відповідною інформацією про команду.

* **size** `Function` <br />
передайте функцію, яка повертає розмір для знімка екрану. Функція отримує об'єкт *context* як перший параметр з усією відповідною інформацією про команду.

* **fuzzLevel** `Number`  (за замовчуванням: 30) <br />
число від 0 до 100, яке визначає фактор розмиття методу порівняння зображень Spectre. Для більш детальної інформації, будь ласка, погляньте на [документацію Spectre](https://github.com/wearefriday/spectre).

**Приклад**
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

## Використання
wdio-novus-visual-regression-service розширює екземпляр WebdriverIO наступними командами:
* `browser.checkViewport([{options}]);`
* `browser.checkDocument([{options}]);`
* `browser.checkElement(elementSelector, [{options}]);`


Усі вони надають опції, які допоможуть вам захопити знімки екрану в різних розмірах або виключити неважливі частини (наприклад, вміст). Доступні наступні опції:


* **exclude** `String[]|Object[]` (**ще не реалізовано**)<br />
  виключіть часто змінювані частини вашого знімка екрану, ви можете передати всі види різних [стратегій селекторів WebdriverIO](http://webdriver.io/guide/usage/selectors.html),
  які запитують один або кілька елементів, або ви можете визначити значення x та y, які розтягують прямокутник або багатокутник

* **hide** `Object[]`<br />
  приховує всі елементи, запитані всіма видами різних [стратегій селекторів WebdriverIO](http://webdriver.io/guide/usage/selectors.html) (через `visibility: hidden`)

* **remove** `Object[]`<br />
  видаляє всі елементи, запитані всіма видами різних [стратегій селекторів WebdriverIO](http://webdriver.io/guide/usage/selectors.html) (через `display: none`)

* **viewports** `Object[{ width: Number, height: Number }]` (**тільки для десктопу**)<br />
     Перевизначає глобальне значення *viewports* для цієї команди. Всі знімки екрану будуть зроблені в різних розмірах вікна перегляду (наприклад, для тестів адаптивного дизайну)

* **orientations** `String[] {landscape, portrait}` (**тільки для мобільних**)<br />
    Перевизначає глобальне значення *orientations* для цієї команди. Всі знімки екрану будуть зроблені в різних орієнтаціях екрану (наприклад, для тестів адаптивного дизайну)

* **misMatchTolerance** `Number` <br />
    Перевизначає глобальне значення *misMatchTolerance* для цієї команди. Передайте число від 0 до 100, яке визначає ступінь невідповідності, щоб вважати два зображення ідентичними.

* **fuzzLevel** `Number` <br />
    Перевизначає глобальне значення *fuzzLevel* для цієї команди. Передайте число від 0 до 100, яке визначає фактор розмиття методу порівняння зображень Spectre.

* **ignoreComparison** `String` <br />
    Перевизначає глобальне значення *ignoreComparison* для цієї команди. Передайте рядок зі значенням `nothing`, `colors` або `antialiasing` для налаштування методу порівняння.

* **viewportChangePause**  `Number` <br />
    Перевизначає глобальне значення *viewportChangePause* для цієї команди. Чекати x мілісекунд після зміни вікна перегляду.

### Ліцензія

MIT