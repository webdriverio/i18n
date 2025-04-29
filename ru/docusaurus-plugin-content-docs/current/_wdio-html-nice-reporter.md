---
id: wdio-html-nice-reporter
title: HTML Репортер
custom_edit_url: https://github.com/rpii/wdio-html-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-html-nice-reporter - это сторонний пакет, для получения дополнительной информации см. [GitHub](https://github.com/rpii/wdio-html-reporter) | [npm](https://www.npmjs.com/package/wdio-html-nice-reporter)
 # wdio-html-nice-reporter

Репортер для webdriver.io, который генерирует красивый HTML-отчёт.  
Название может показаться глупым, но оно обеспечивает интеграцию с webdriverio

### Новое: больше не бета-версия.

### Новое: исправлено и переключено логирование на wdio-logging. Примеры обновлены.
    Вам нужно удалить инициализацию log4Js логгера из вашей конфигурации

### Новое: переписано как ES модуль для совместимости с webdriverio 8.
    Возможно, вам потребуются изменения в вашем тестовом приложении

### Исправление ошибки: webdriverio завершал работу во время асинхронной записи json.

### Исправление ошибки: запись json не ожидалась корректно

### Отличное новое улучшение: больше нет ошибок нехватки памяти из-за json.stringify

### Отличная новая функция: запись видео каждого теста


## [Список изменений](https://github.com/rpii/wdio-html-reporter/blob/master/changes.md)

## Информация

Этот проект - переработка [@rpii/wdio-html-reporter](https://www.npmjs.com/package/wdio-html-reporter)
Он написан на typescript со многими улучшениями.



## Конфигурация

### WDIO.config.ts

Следующий код показывает конфигурацию тестового запуска wdio по умолчанию. Просто добавьте объект HtmlReporter как еще один репортер в массив reporters:

### Рабочий wdio.config.ts предоставляется в [/samples/wdio.config.ts](https://github.com/rpii/wdio-html-reporter/blob/master//samples/wdio.config.ts)

ниже приведены фрагменты из этого файла.

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
## Настройки конфигурации:
  
### Для создания главного отчета для всех наборов тестов

webdriver.io будет вызывать репортер для каждого набора тестов. Он не объединяет отчеты. Чтобы сделать это, добавьте следующие обработчики событий в свой wdio.config.js

Добавьте в файл конфигурации браузера:
```
let reportAggregator : ReportAggregator;
```
Добавьте в объект конфигурации браузера:
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


  
### Для создания PDF-файла из этого отчета

Требуется дополнительный плагин, чтобы сохранить легкость поддержки для тех, кому это не нужно.
см. [@rpii/wdio-html-reporter-pdf](https://www.npmjs.com/package/@rpii/wdio-html-reporter-pdf)


## Пример вывода:

![Report Screenshot](https://github.com/rpii/wdio-html-reporter/blob/master/TestReport.png)

## browserName

Это должно быть установлено вручную. Оно недоступно во время конфигурации, так как объект браузера не существует до тех пор, пока вы не начнете сессию.