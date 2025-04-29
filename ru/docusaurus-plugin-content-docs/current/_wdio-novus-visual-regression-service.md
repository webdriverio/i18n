---
id: wdio-novus-visual-regression-service
title: Сервис визуальной регрессии Novus
custom_edit_url: https://github.com/Jnegrier/wdio-novus-visual-regression-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-novus-visual-regression-service - это сторонний пакет, для получения дополнительной информации см. [GitHub](https://github.com/Jnegrier/wdio-novus-visual-regression-service) | [npm](https://www.npmjs.com/package/wdio-novus-visual-regression-service)

[![Build Status](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service.svg?branch=master)](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service)

> Тестирование визуальной регрессии для WebdriverIO

Основано на работе Jan-André Zinser над [wdio-visual-regression-service](https://github.com/zinserjan/wdio-visual-regression-service) и [wdio-screenshot](https://github.com/zinserjan/wdio-screenshot)

## Установка

Вы можете установить wdio-novus-visual-regression-service через NPM как обычно:

```sh
$ npm install wdio-novus-visual-regression-service --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь.](https://webdriver.io/docs/gettingstarted)

## Конфигурация
Настройте wdio-novus-visual-regression-service, добавив `novus-visual-regression` в раздел services вашей конфигурации WebdriverIO и определите желаемую стратегию сравнения в опциях сервиса.

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

### Опции
Под ключом `visualRegression` в вашем wdio.config.js вы можете передать объект конфигурации со следующей структурой:

* **compare** `Object` <br />
метод сравнения скриншотов, см. [Методы сравнения](#compare-methods)

* **viewportChangePause**  `Number`  ( по умолчанию: 100 ) <br />
ожидание x миллисекунд после изменения области просмотра. Браузеру может потребоваться время для перерисовки. Это может привести к проблемам с рендерингом и привести к противоречивым результатам между запусками.

* **viewports** `Object[{ width: Number, height: Number }]`  ( по умолчанию: *[текущая-область-просмотра]* ) (**только для настольных ПК**)<br />
   все скриншоты будут сделаны в разных размерах окна просмотра (например, для тестов адаптивного дизайна)

* **orientations** `String[] {landscape, portrait}`  ( по умолчанию: *[текущая-ориентация]* ) (**только для мобильных**)<br />
    все скриншоты будут сделаны в разных ориентациях экрана (например, для тестов адаптивного дизайна)

### Методы сравнения
wdio-novus-visual-regression-service позволяет использовать различные методы сравнения скриншотов.

#### VisualRegressionCompare.LocalCompare
Как следует из названия, *LocalCompare* делает скриншоты локально на вашем компьютере и сравнивает их с предыдущими запусками.

Вы можете передать следующие опции в его конструктор в виде объекта:

* **referenceName** `Function` <br />
передать функцию, которая возвращает имя файла для эталонного скриншота. Функция получает объект *context* в качестве первого параметра со всей соответствующей информацией о команде.

* **screenshotName** `Function` <br />
передать функцию, которая возвращает имя файла для текущего скриншота. Функция получает объект *context* в качестве первого параметра со всей соответствующей информацией о команде.

* **diffName** `Function` <br />
передать функцию, которая возвращает имя файла для скриншота с различиями. Функция получает объект *context* в качестве первого параметра со всей соответствующей информацией о команде.

* **misMatchTolerance** `Number`  ( по умолчанию: 0.01 ) <br />
число от 0 до 100, которое определяет степень несоответствия, при которой два изображения считаются идентичными, увеличение этого значения уменьшит покрытие тестами.

* **ignoreComparison** `String`  ( по умолчанию: ничего ) <br />
передайте строку со значением `nothing` , `colors` или `antialiasing` для настройки метода сравнения.

Для примера генерации имен файлов скриншотов в зависимости от текущего имени теста, посмотрите пример кода из раздела [Конфигурация](#configuration).

#### VisualRegressionCompare.SaveScreenshot
Этот метод является упрощенным вариантом `VisualRegressionCompare.LocalCompare` для создания только скриншотов. Это очень полезно, когда вы просто хотите создать эталонные скриншоты и перезаписать предыдущие без сравнения.

Вы можете передать следующие опции в его конструктор в виде объекта:

* **screenshotName** `Function` <br />
передать функцию, которая возвращает имя файла для текущего скриншота. Функция получает объект *context* в качестве первого параметра со всей соответствующей информацией о команде.

#### VisualRegressionCompare.Spectre
Этот метод используется для загрузки скриншотов в веб-приложение [Spectre](https://github.com/wearefriday/spectre).
Spectre - это пользовательский интерфейс для тестирования визуальной регрессии. Он хранит скриншоты и сравнивает их, что очень полезно для непрерывной интеграции.

Вы можете передать следующие опции в его конструктор в виде объекта:

* **url** `String` <br />
передать URL веб-сервиса spectre.

* **project** `String` <br />
передать имя для вашего проекта.

* **suite** `String` <br />
передать имя для вашего тестового набора. Один проект может содержать несколько наборов.

* **test** `Function` <br />
передать функцию, которая возвращает имя теста для скриншота. Функция получает объект *context* в качестве первого параметра со всей соответствующей информацией о команде.

* **browser** `Function` <br />
передать функцию, которая возвращает браузер для скриншота. Функция получает объект *context* в качестве первого параметра со всей соответствующей информацией о команде.

* **size** `Function` <br />
передать функцию, которая возвращает размер для скриншота. Функция получает объект *context* в качестве первого параметра со всей соответствующей информацией о команде.

* **fuzzLevel** `Number`  ( по умолчанию: 30 ) <br />
число от 0 до 100, которое определяет фактор размытия метода сравнения изображений Spectre. Для более подробной информации, пожалуйста, посмотрите [документацию Spectre](https://github.com/wearefriday/spectre).

**Пример**
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

## Использование
wdio-novus-visual-regression-service расширяет экземпляр WebdriverIO следующими командами:
* `browser.checkViewport([{options}]);`
* `browser.checkDocument([{options}]);`
* `browser.checkElement(elementSelector, [{options}]);`


Все эти команды предоставляют опции, которые помогут вам делать скриншоты в разных размерах или исключать нерелевантные части (например, контент). Доступны следующие опции:


* **exclude** `String[]|Object[]` (**еще не реализовано**)<br />
  исключите часто меняющиеся части вашего скриншота, вы можете передать различные [стратегии селекторов WebdriverIO](http://webdriver.io/guide/usage/selectors.html)
  которые запрашивают один или несколько элементов, или вы можете определить значения x и y, которые растягивают прямоугольник или многоугольник

* **hide** `Object[]`<br />
  скрывает все элементы, запрошенные всеми видами различных [стратегий селекторов WebdriverIO](http://webdriver.io/guide/usage/selectors.html) (через `visibility: hidden`)

* **remove** `Object[]`<br />
  удаляет все элементы, запрошенные всеми видами различных [стратегий селекторов WebdriverIO](http://webdriver.io/guide/usage/selectors.html) (через `display: none`)

* **viewports** `Object[{ width: Number, height: Number }]` (**только для настольных ПК**)<br />
     Переопределяет глобальное значение *viewports* для этой команды. Все скриншоты будут сделаны в разных размерах области просмотра (например, для тестов адаптивного дизайна)

* **orientations** `String[] {landscape, portrait}` (**только для мобильных**)<br />
    Переопределяет глобальное значение *orientations* для этой команды. Все скриншоты будут сделаны в разных ориентациях экрана (например, для тестов адаптивного дизайна)

* **misMatchTolerance** `Number` <br />
    Переопределяет глобальное значение *misMatchTolerance* для этой команды. Передайте число от 0 до 100, которое определяет степень несоответствия, при которой два изображения считаются идентичными.

* **fuzzLevel** `Number` <br />
    Переопределяет глобальное значение *fuzzLevel* для этой команды. Передайте число от 0 до 100, которое определяет фактор размытия метода сравнения изображений Spectre.

* **ignoreComparison** `String` <br />
    Переопределяет глобальное значение *ignoreComparison* для этой команды. Передайте строку со значением `nothing` , `colors` или `antialiasing` для настройки метода сравнения.

* **viewportChangePause**  `Number` <br />
    Переопределяет глобальное значение *viewportChangePause* для этой команды. Ожидание x миллисекунд после изменения области просмотра.

### Лицензия

MIT