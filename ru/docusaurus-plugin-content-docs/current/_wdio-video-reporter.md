---
id: wdio-video-reporter
title: Видео Репортер
custom_edit_url: https://github.com/presidenten/wdio-video-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-video-reporter — это сторонний пакет, для получения дополнительной информации см. [GitHub](https://github.com/presidenten/wdio-video-reporter) | [npm](https://www.npmjs.com/package/wdio-video-reporter)

![Logo](https://raw.githubusercontent.com/presidenten/wdio-video-reporter-example-report/master/wdio-video-reporter.png)

Это репортер для [Webdriver IO v6 и выше](https://webdriver.io/), который генерирует видео выполнения ваших тестов wdio. Если вы используете Allure, тестовые случаи автоматически украшаются видео. (Для Webdriver IO v5 используйте wdio-video-reporter версии ^2.0.0.)

Видео сохраняются в `wdio.config.outputDir`

Ознакомьтесь с примером отчета Allure с включенными видео неудачных тестов здесь:
https://presidenten.github.io/wdio-video-reporter-example-report/

![example-allure-report](https://media.giphy.com/media/7Fgle7bHGrxR3zY6Gw/giphy.gif)

Преимущества:
- Хорошие видео в ваших отчетах Allure
- Удобные видео с человеческой скоростью, даже если тесты быстрые
- Работает с Selenium grid
- Работает со всеми webdriver'ами, которые поддерживают `saveScreenshot`
- Проверено на следующих настольных браузерах с использованием Selenium 3.141.59:
  - Chrome
  - Firefox
  - Safari
  - Internet Explorer 11
  - Microsoft Edge
- Проверено на следующих устройствах iOS и Android с [Appium](http://appium.io/docs/en/about-appium/getting-started/) 1.13.0-beta3:
  - Iphone 8
  - Ipad Gen 6
  - Samsung galaxy S9
  - Samsung galaxy tab A10

Недостатки:
- Работает, делая снимки экрана после "действий", что делает тесты немного медленнее. Это смягчается тщательным выбором сообщений [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol), которые должны приводить к снимкам экрана
- Драйверы Selenium не включают диалоговые окна и всплывающие окна в снимках экрана, поэтому они не видны на видео


Быстрый старт
===========

Ознакомьтесь с простым шаблоном в [wdio-template](https://github.com/presidenten/wdio-template), чтобы быстро начать работу.

Клонируйте один из репозиториев и установите зависимости с помощью `yarn` или `npm install`. Затем запустите `yarn e2e` или `npm run e2e` в директории demo и, наконец, `yarn report` или `npm run report`, чтобы увидеть отчет Allure.


Установка
============

Установите репортер
--------------------

`yarn add wdio-video-reporter`
или
`npm install wdio-video-reporter`


Добавьте репортер в конфигурацию
--------------------------

В начале файла `wdio.conf.js` подключите библиотеку:
```
const video = require('wdio-video-reporter');
```

Затем добавьте видео репортер в конфигурацию в свойстве reporters:

```
 reporters: [
    [video, {
      saveAllVideos: false,       // Если true, также сохраняет видео для успешных тестов
      videoSlowdownMultiplier: 3, // Выше, чтобы получить более медленные видео, ниже для более быстрых [Значение 1-100]
    }],
  ],
```


Использование с Allure
-----------------

Добавление репортера Allure автоматически обновляет отчеты видео без необходимости настройки чего-либо :-)

```
 reporters: [
    [video, {
      saveAllVideos: false,       // Если true, также сохраняет видео для успешных тестов
      videoSlowdownMultiplier: 3, // Выше, чтобы получить более медленные видео, ниже для более быстрых [Значение 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }],
  ],
```


Конфигурация
=============

Обычные параметры конфигурации
-------------------------------

Большинство пользователей могут захотеть установить следующие параметры

- `saveAllVideos` Установите значение true, чтобы сохранять видео для успешных тестов. `По умолчанию: false`
- `videoSlowdownMultiplier` Целое число между [1-100]. Увеличьте, если видео воспроизводятся слишком быстро. `По умолчанию: 3`
- `videoRenderTimeout` Максимальное количество секунд ожидания рендеринга видео. `По умолчанию: 5`
- `outputDir` Если не установлено, используется wdio.config.outputDir. `По умолчанию: undefined`
- `outputDir` Если не установлено, используется wdio.config.outputDir. `По умолчанию: undefined`
- `maxTestNameCharacters` Максимальная длина имени теста. `По умолчанию: 250`

Расширенные параметры конфигурации
---------------------------------

Продвинутые пользователи, которые хотят изменить, когда двигатель делает снимок экрана, могут отредактировать следующие параметры. Эти массивы могут быть заполнены последним словом сообщения [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol), т.е. /session/:sessionId/`buttondown`.

- `addExcludedActions` Добавьте действия, для которых снимки экрана не нужны. `По умолчанию: []`
- `addJsonWireActions` Добавьте действия, для которых снимки экрана отсутствуют. `По умолчанию: []`
- `recordAllActions` Пропустите фильтрацию и снимайте всё. (Не рекомендуется) `По умолчанию: false`

Чтобы увидеть обработанные сообщения, установите `wdio.config.logLevel: 'debug'` и проверьте `outputDir/wdio-X-Y-Video-reporter.log`. Это также оставит директорию с выходными снимками экрана для проверки.

Чтобы полностью избежать дополнительного логирования и получить только видеофайлы, установите `wdio.config.logLevel: 'silent'`.

Поддержка Cucumber
----------------

Если вы используете репортер Allure, вам необходимо убедиться, что вы сделали следующее:

- Используйте `chai` вместо встроенных node assertions, иначе неудачные тесты будут отображаться как сломанные в определениях ваших шагов
- Добавьте `useCucumberStepReporter: true` в параметры Allure в файле `wdio.conf.js`, типичная конфигурация будет выглядеть так:
```
  reporters: [
    [video, {
      saveAllVideos: false,       // Если true, также сохраняет видео для успешных тестов
      videoSlowdownMultiplier: 3, // Выше, чтобы получить более медленные видео, ниже для более быстрых [Значение 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter: true
    }],
  ],
```
Для полного примера, ознакомьтесь с веткой cucumber в [wdio-template](https://github.com/presidenten/wdio-template/tree/cucumber)


Настройка Appium
------------

С версии `wdio-video-reporter` v1.2.4 есть поддержка, которая помогает Allure различать браузеры safari и chrome на настольных компьютерах и устройствах.
Репортер использует пользовательское свойство `deviceType` для идентификации различных устройств.
Рекомендуемые значения: `phone` и `tablet`.
Также рекомендуется включить `browserVersion` для _всех_ браузеров, чтобы избежать ошибки в Chrome webdriver при использовании устройств в той же Selenium grid, что и настольные браузеры Chrome.

Сгенерированные видеофайлы также получат `deviceType`, добавленный к имени браузера.

Пример конфигурации appium:
```
  "capabilities": [
    {
      ...
      "deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    }
  ],
```

И `wdio-config.json`:
```
  "capabilities": [
    {
      ...
      "appium:deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    },
  ],
```


Вклад
============

Сделайте форк, внесите изменения, напишите тесты, выполните линтинг, запустите тесты, соберите и проверьте в демо, что изменения работают должным образом, затем создайте PR.

Папка demo работает с собранной версией библиотеки, поэтому не забудьте собрать, если вы добавили новые функции и хотите их опробовать.


Благодарности
======

Спасибо [Johnson E](https://github.com/jonn-set) за исправление поддержки Cucumber, о которой просили многие пользователи.