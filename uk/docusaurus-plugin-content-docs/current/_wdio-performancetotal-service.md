---
id: wdio-performancetotal-service
title: Сервіс PerformanceTotal
custom_edit_url: https://github.com/tzurp/performance-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-performancetotal-service є стороннім пакетом, для більш детальної інформації відвідайте [GitHub](https://github.com/tzurp/performance-total) | [npm](https://www.npmjs.com/package/wdio-performancetotal-service)
Примітка:<br/>
Для WebdriverIO v9 використовуйте версію 4.x.x.<br/>
Для WebdriverIO v8 використовуйте версію 3.x.x.<br/>
Для WebdriverIO v7 використовуйте версію 2.x.x.<br/>
Для WebdriverIO v6 використовуйте версію 1.x.x.

---

![chart](https://github.com/tzurp/performance-total/blob/master/resources/chart.png)

За допомогою цього плагіна для [webdriver.io](https://webdriver.io/) ви можете легко додати аналіз продуктивності до будь-якого потоку у ваших тестах, будь то чистий UI, API або їх комбінація. Цей плагін надає простий та ефективний спосіб вимірювання часу відгуку різних процедур та виявлення потенційних вузьких місць у вашому додатку. За допомогою цієї інформації ви можете приймати обґрунтовані рішення щодо оптимізації та покращень для підвищення загальної продуктивності вашого додатку.

## Встановлення

Найпростіший спосіб встановити цей модуль як dev-залежність - використати наступну команду:

```
npm install wdio-performancetotal-service --save-dev
```

## Використання

Додайте wdio-performancetotal-service до вашого `wdio.conf.js`:

```typescript
exports.config = {
  // ...
  services: ['performancetotal']
  // ...
};
```
...або з опціями сервісу:

```typescript
exports.config = {
  // ...
  services: [
      ['performancetotal',
      // The options (with default values)
        {
            disableAppendToExistingFile: false,
            performanceResultsFileName: "performance-results",
            dropResultsFromFailedTest: false,
            performanceResultsDirectory: "performance-results",
            analyzeByBrowser: false,
            recentDays: 0
        }]
      ]
  // ...
};
```

### Опції

#### __disableAppendToExistingFile__

Якщо встановлено `true`, нові тестові запуски почнуться з чистого аркуша і перезапишуть будь-які існуючі дані продуктивності.
Якщо встановлено `false` (за замовчуванням), дані продуктивності будуть додані до існуючих даних.

> **⚠️ Увага:**
>
> Ця дія назавжди видалить усі ваші дані продуктивності. Переконайтеся, що у вас є резервна копія перед тим, як продовжити.

#### __performanceResultsFileName__

Ви можете перевизначити назву файлу результатів за замовчуванням (`performance-results`).
Новостворений файл результатів зазвичай перезаписує старий файл. Якщо ви хочете зберегти старі файли, рекомендується додавати часову мітку до назви файлу. Наприклад:

```typescript
...
performanceResultsFileName: `performance-results_${new Date().getTime()}`
...
```

#### __dropResultsFromFailedTest__

За замовчуванням `false`. Коли значення встановлено на `true`, аналіз продуктивності з невдалих тестів буде виключено.

#### __recentDays__

За замовчуванням `0` (без обмежень). Щоб встановити кількість днів для аналізу продуктивності, встановіть кількість днів. Підтримуються також часткові дні (наприклад, `recentDays: 0.5`)

#### __performanceResultsDirectory__

Ви можете перевизначити шлях за замовчуванням для каталогу результатів у кореневому каталозі проекту.
Наприклад:

```typescript
...
performanceResultsDirectory: "results-dir/performance-total-results"
...
```

#### __analyzeByBrowser__

За замовчуванням `false`. Якщо `true`, дані продуктивності також будуть аналізуватися за типом браузера.


### Використання в тесті

Просто імпортуйте __performancetotal__ там, де він вам потрібен, чи то у вашому тестовому файлі, чи будь-якому іншому класі. Цей об'єкт надає методи для вимірювання даних продуктивності у ваших тестах, включаючи sampleStart та sampleEnd для початку та закінчення вимірювань продуктивності.
Ось приклад того, як можна використовувати об'єкт performancetotal для вимірювання продуктивності запуску двох веб-сайтів:

```typescript
// This test case measures the startup performance of Github and SourceForge using the performancetotal object.

import { performancetotal } from "wdio-performancetotal-service";

it("should test github and sourceforge startup performance", () => {
    // Start a new performance measurement for Github
    performancetotal.sampleStart("GH-Startup");

    // Navigate to Github
    browser.url("https://github.com/");

    // End the Github measurement and save the results
    performancetotal.sampleEnd("GH-Startup");

    // ...

    // Start a new performance measurement for SourceForge
    performancetotal.sampleStart("SF-Startup");

    // Navigate to SourceForge
    await browser.url("https://sourceforge.net/");

    // End the SourceForge measurement and save the results
    performancetotal.sampleEnd("SF-Startup");
});

```

Ви можете отримати час, витрачений на один зразок продуктивності, викликавши performancetotal.getSampleTime(sampleName) у вашому тесті. Це дозволяє перевірити продуктивність конкретної частини коду та переконатися, що вона відповідає вашим очікуванням.

```typescript
// Get the time taken for a single sample
const sampleTime = performancetotal.getSampleTime(sampleName);

```

## Отримання результатів

Після завершення всіх тестів у кореневій папці вашого проекту створюється новий каталог результатів (назва каталогу за замовчуванням - performance-results). У цьому каталозі створюються два файли: performance-results.json та performance-results.csv. Ці файли містять проаналізовані дані для кожного зразка, включаючи середній час, стандартну помилку середнього (SEM), кількість зразків, мінімальне значення, максимальне значення, найранніший час та найпізніший час. Ви можете використовувати ці дані для виявлення будь-яких регресій або покращень продуктивності з часом.

### Аналіз даних продуктивності оптом

Для аналізу існуючих даних продуктивності оптом без генерації нових тестів рекомендується використовувати [інструмент __performancetotal-cli__](https://www.npmjs.com/package/performancetotal-cli).

## Підтримка Typescript

Цей плагін підтримує Typescript.

## Підтримка

Для підтримки та пропозицій, не соромтеся звертатися до мене за адресою [tzur.paldi@outlook.com](https://github.com/tzurp/performance-total/blob/master/mailto:tzur.paldi@outlook.com).