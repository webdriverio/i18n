---
id: wdio-performancetotal-service
title: Сервис PerformanceTotal
custom_edit_url: https://github.com/tzurp/performance-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-performancetotal-service это сторонний пакет, для получения дополнительной информации посетите [GitHub](https://github.com/tzurp/performance-total) | [npm](https://www.npmjs.com/package/wdio-performancetotal-service)
Примечание:<br/>
Для WebdriverIO v9 используйте версию 4.x.x.<br/>
Для WebdriverIO v8 используйте версию 3.x.x.<br/>
Для WebdriverIO v7 используйте версию 2.x.x.<br/>
Для WebdriverIO v6 используйте версию 1.x.x.

---

![chart](https://github.com/tzurp/performance-total/blob/master/resources/chart.png)

С этим плагином для [webdriver.io](https://webdriver.io/) вы можете легко добавить анализ производительности к любому процессу в ваших тестах, будь то чистый UI, API или их комбинация. Этот плагин предоставляет простой и эффективный способ измерения времени отклика различных процедур и выявления потенциальных узких мест в вашем приложении. С этой информацией вы можете принимать обоснованные решения об оптимизации и улучшениях для повышения общей производительности вашего приложения.

## Установка

Самый простой способ установить этот модуль как зависимость для разработки - использовать следующую команду:

```
npm install wdio-performancetotal-service --save-dev
```

## Использование

Добавьте wdio-performancetotal-service в ваш `wdio.conf.js`:

```typescript
exports.config = {
  // ...
  services: ['performancetotal']
  // ...
};
```
...или с опциями сервиса:

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

### Опции

#### __disableAppendToExistingFile__

Когда установлено значение `true`, новые запуски тестов будут начинаться с чистого листа и перезаписывать существующие данные о производительности.
Когда установлено значение `false` (по умолчанию), данные о производительности будут добавляться к существующим данным.

> **⚠️ Предупреждение:**
>
> Это действие навсегда удалит все ваши данные о производительности. Убедитесь, что у вас есть резервная копия перед началом.

#### __performanceResultsFileName__

Вы можете переопределить имя файла результатов по умолчанию (`performance-results`).
Вновь созданный файл результатов обычно перезаписывает старый файл. Если вы хотите сохранить старые файлы, рекомендуется добавить к имени файла временную метку. Например:

```typescript
...
performanceResultsFileName: `performance-results_${new Date().getTime()}`
...
```

#### __dropResultsFromFailedTest__

По умолчанию `false`. Когда значение установлено на `true`, анализ производительности из неудачных тестов будет исключен.

#### __recentDays__

По умолчанию `0` (без ограничений). Чтобы установить количество дней для анализа производительности, укажите количество дней. Также поддерживаются части дней (например, `recentDays: 0.5`)

#### __performanceResultsDirectory__

Вы можете переопределить путь по умолчанию для каталога результатов в корневом каталоге проекта.
Например:

```typescript
...
performanceResultsDirectory: "results-dir/performance-total-results"
...
```

#### __analyzeByBrowser__

По умолчанию `false`. Если `true`, данные о производительности будут анализироваться также по типу браузера.


### Использование в тесте

Просто импортируйте __performancetotal__ там, где он вам нужен, будь то в вашем тестовом файле или любом другом классе. Этот объект предоставляет методы для измерения данных о производительности в ваших тестах, включая sampleStart и sampleEnd для начала и окончания измерений производительности.
Вот пример того, как можно использовать объект performancetotal для измерения производительности запуска двух веб-сайтов:

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

Вы можете получить время, затраченное на один образец производительности, вызвав performancetotal.getSampleTime(sampleName) в своем тесте. Это позволяет проверить производительность определенного участка кода и убедиться, что он соответствует вашим ожиданиям.

```typescript
// Get the time taken for a single sample
const sampleTime = performancetotal.getSampleTime(sampleName);

```

## Получение результатов

Когда все тесты завершены, в корневой папке вашего проекта создается новый каталог результатов (имя каталога по умолчанию - performance-results). Внутри этого каталога создаются два файла: performance-results.json и performance-results.csv. Эти файлы содержат проанализированные данные для каждого образца, включая среднее время, стандартную ошибку среднего (SEM), количество образцов, минимальное значение, максимальное значение, самое раннее время и самое позднее время. Вы можете использовать эти данные для выявления любых регрессий или улучшений производительности с течением времени.

### Анализ данных о производительности в массовом порядке

Для анализа существующих данных о производительности в массовом порядке без генерации новых тестов рекомендуется использовать [инструмент __performancetotal-cli__](https://www.npmjs.com/package/performancetotal-cli).

## Поддержка Typescript

Для этого плагина поддерживается Typescript.

## Поддержка

Для получения поддержки и предложений не стесняйтесь обращаться ко мне по адресу [tzur.paldi@outlook.com](https://github.com/tzurp/performance-total/blob/master/mailto:tzur.paldi@outlook.com).