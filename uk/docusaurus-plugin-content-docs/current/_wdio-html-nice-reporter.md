---
id: wdio-html-nice-reporter
title: HTML репортер
custom_edit_url: https://github.com/rpii/wdio-html-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-html-nice-reporter є пакетом сторонніх розробників, для отримання додаткової інформації див. [GitHub](https://github.com/rpii/wdio-html-reporter) | [npm](https://www.npmjs.com/package/wdio-html-nice-reporter)
 # wdio-html-nice-reporter

Репортер для webdriver.io, який генерує гарний HTML звіт.  
Назва дивна, але забезпечує інтеграцію з webdriverio

### Нове: більше не бета.

### Нове: очищено та перемкнено логування на wdio-logging. Зразки оновлено.
    Вам потрібно видалити ініціалізацію логера log4Js з вашої конфігурації

### Нове: переписано як ES модуль для сумісності з webdriverio 8.
    Вам можуть знадобитися зміни у вашому тестовому застосунку

### Виправлено помилку: webdriverio завершував роботу під час асинхронного запису json.

### Виправлено помилку: json запис не був правильно очікуваний

### Чудове нове покращення: більше ніяких помилок з браком пам'яті через json.stringify

### Чудова нова функція: запис відео кожного тесту


## [Журнал змін](https://github.com/rpii/wdio-html-reporter/blob/master/changes.md)

## Інформація

Цей проект є переписаною версією [@rpii/wdio-html-reporter](https://www.npmjs.com/package/wdio-html-reporter)
Він написаний на typescript з багатьма вдосконаленнями.



## Конфігурація

### WDIO.config.ts

Наступний код показує конфігурацію тестового запускача wdio за замовчуванням. Просто додайте об'єкт HtmlReporter як ще один репортер до масиву reporters:

### Робочий wdio.config.ts надано в [/samples/wdio.config.ts](https://github.com/rpii/wdio-html-reporter/blob/master//samples/wdio.config.ts)

нижче наведено фрагменти з цього файлу.

```typescript

// wdio.config.ts
import {ReportGenerator, HtmlReporter} from 'wdio-html-nice-reporter';
let reportAggregator: ReportGenerator;

const BaseConfig: WebdriverIO.Config = {
    
  reporters: ['spec',
        ["html-nice", {
            outputDir: './reports/html-reports/',
            filename: 'report.html',
            reportTitle: 'Test Report Title',
            linkScreenshots: true,
            //to show the report in a browser when done
            showInBrowser: true,
            collapseTests: false,
            //to turn on screenshots after every test
            useOnAfterCommandForScreenshot: false
        }
        ]
    ]
    
 
};
```
## Параметри конфігурації:
  
### Щоб згенерувати головний звіт для всіх наборів тестів

webdriver.io викликатиме репортер для кожного набору тестів. Він не агрегує звіти. Для цього додайте наступні обробники подій до вашого wdio.config.js

Додайте до файлу конфігурації браузера:
```
let reportAggregator : ReportAggregator;
```
Додайте до об'єкту конфігурації браузера:
```javascript
    onPrepare: function(config, capabilities) {

    reportAggregator = new ReportGenerator({
        outputDir: './reports/html-reports/',
        filename: 'master-report.html',
        reportTitle: 'Master Report',
        browserName: capabilities.browserName,
        collapseTests: true
    });
    reportAggregator.clean();
}


onComplete: function (exitCode, config, capabilities, results) {
    (async () => {
        await reportAggregator.createReport();
    })();
}


``` 


  
### Щоб згенерувати pdf файл з цього звіту

Потрібен додатковий плагін, щоб зберегти підтримку легкою для тих, хто цього не хоче.
дивіться [@rpii/wdio-html-reporter-pdf](https://www.npmjs.com/package/@rpii/wdio-html-reporter-pdf)


## Приклад виводу:

![Report Screenshot](https://github.com/rpii/wdio-html-reporter/blob/master/TestReport.png)

## browserName

Це потрібно встановити вручну. Це недоступно під час конфігурації, оскільки об'єкт браузера не існує, поки ви не почнете сесію.