---
id: wdio-light-reporter
title: Light Reporter Reporter
custom_edit_url: https://github.com/sarfrajadstreaks/wdio-light-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-light-reporter - это сторонний пакет, для получения дополнительной информации см. [GitHub](https://github.com/sarfrajadstreaks/wdio-light-reporter) | [npm](https://www.npmjs.com/package/wdio-light-reporter)

## Вдохновлен HTML и Mochawesome репортерами

!Философия:

> Этот репортер не поддерживает повторное создание отчетов cucumber и разработан с учетом работы с фреймворками bdd и mocha.
> Здесь секция `describe()` рассматривается как тестовый сценарий, а `it()` как тестовый случай внутри тестовых сценариев.

## ФУНКЦИИ

1. Простая настройка
2. Улучшенный интерфейс
3. Скриншоты, встроенные в HTML-отчет
4. addLabel() для включения контекста шагов или имени

## Релизы
V 0.1.9 - Начальный релиз
V 0.2.6 - (последний)
  1. Включает запуски в нескольких средах и разделяет по средам.
  2. Исправление ошибок
  3. Улучшенная производительность.

## ПРИМЕРЫ

![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_1.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_2.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_3.png)

## Установка

NPM

```sh
npm install wdio-light-reporter --save-dev
```

## Конфигурация

```
reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:`demo${new Date()}`,    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
  }]
],
```

## Скриншоты

Репортер не имеет возможности автоматически настраиваться для создания скриншотов, однако при ручной настройке он прослушивает событие и прикрепляет скриншоты в HTML-отчет.
**Чтобы включить скриншоты в отчет, добавьте следующий код в хук afterTest() в файле wdio conf.**

```
afterTest: async function (test,context,{ error, result, duration, passed, retries }) {
    if (!passed) {await browser.takeScreenshot()}
},
```

## Файлы результатов

Каждый запуск повторно генерирует JSON-отчет для каждого файла spec, чтобы сгенерировать объединенный JSON и HTML-отчет, добавьте следующий код в хук **onComplete()** в файле wdio conf

```
 onComplete: function (exitCode, config, capabilities, results) {
    const mergeResults = require("wdio-light-reporter/src/mergeResults"); //you can add this on top of the file
    mergeResults("./Results");
 },
```

> Если вы запускаете тест без опции --suite, то он считает suite как default
> Репортер не работает, если вы указываете несколько параметров как suites при запуске.
> wdio run `wdio.conf.js --suite firstSuite` - **(РАБОТАЕТ НОРМАЛЬНО)** :)  
>  wdio run `wdio.conf.js --suite firstSuite --suite secondSuite` **(НЕ РАБОТАЕТ)** :(

## Добавление контекста

> Вы можете использовать `useLabel()` для добавления контекста к любым шагам или добавить его для включения в качестве шагов.

```
const { addLabel } = require("wdio-light-reporter").default;
describe("Show how to use addLabel ", () => {
  it("report will added this a steps/context in report", async () => {
      addLabel("Log Example 1 as step 1")
      console.log("Log Example 1 )
      addLabel("Log Example 2 as step 2")
      console.log("Log Example 2 )
  })
})


```
## Обновления
```
 reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:"demo",    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
      //autoClean:false       // removed autoClean and include the same functionality as default in mergeResult function
  }]
],
```
## Лицензия

MIT
**Бесплатно, Да!**