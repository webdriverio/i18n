---
id: wdio-light-reporter
title: Light Reporter Reporter
custom_edit_url: https://github.com/sarfrajadstreaks/wdio-light-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-light-reporter є пакетом від сторонніх розробників, для отримання додаткової інформації перегляньте [GitHub](https://github.com/sarfrajadstreaks/wdio-light-reporter) | [npm](https://www.npmjs.com/package/wdio-light-reporter)

## Натхненний HTML та Mochawesome репортером

!Філософія:

> Цей репортер не підтримує регенерацію звітів cucumber і розроблений з урахуванням фреймворків bdd та mocha.
> Тут секція `describe()` розглядається як тестовий сценарій, а `it()` як тест-кейс всередині тестових сценаріїв.

## ОСОБЛИВОСТІ

1. Легке налаштування
2. Покращений інтерфейс
3. Знімки екрану вбудовані в html звіт
4. addLabel() для включення контексту кроків або імені


## Релізи
V 0.1.9 - Початковий реліз
V 0.2.6 - (останній)
  1. Включає запуски в кількох середовищах і розділяє на основі середовища.
  2. Виправлення помилок
  3. Покращена продуктивність.


## ПРИКЛАДИ

![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_1.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_2.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_3.png)

## Встановлення

NPM

```sh
npm install wdio-light-reporter --save-dev
```

## Налаштування

```
reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:`demo${new Date()}`,    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
  }]
],
```

## Знімки екрану

Репортер не має можливості автоматично налаштовуватися для створення знімків екрану, але якщо налаштувати вручну, він прослуховує подію та прикріплює знімки екрану до HTML-звіту.
**Щоб включити знімки екрану у звіт, додайте наведений нижче код у хук afterTest() у файлі wdio conf.**

```
afterTest: async function (test,context,{ error, result, duration, passed, retries }) {
    if (!passed) {await browser.takeScreenshot()}
},
```

## Файли результатів

Кожен запуск регенерує json-звіт для кожного spec-файлу, щоб згенерувати комбінований json та HTML-звіт, додайте наведений нижче код у хук **onComplete()** у файлі wdio conf

```
 onComplete: function (exitCode, config, capabilities, results) {
    const mergeResults = require("wdio-light-reporter/src/mergeResults"); //you can add this on top of the file
    mergeResults("./Results");
 },
```

> Якщо ви запускаєте тест без опції --suite, тоді він вважає suite як default
> Репортер не працює, якщо ви вказуєте кілька параметрів як suites під час запуску.
> wdio run `wdio.conf.js --suite firstSuite` - **(ПРАЦЮЄ ДОБРЕ)** :)  
>  wdio run `wdio.conf.js --suite firstSuite --suite secondSuite` **(НЕ ПРАЦЮЄ)** :(

## Додавання контексту

> Ви можете використовувати `useLabel()`, щоб додати контекст до будь-яких кроків або додати, щоб включити його як кроки.

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
## Оновлення
```
 reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:"demo",    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
      //autoClean:false       // removed autoClean and include the same functionality as default in mergeResult function
  }]
],
```
## Ліцензія

MIT
**Безкоштовно, та ще й як!**