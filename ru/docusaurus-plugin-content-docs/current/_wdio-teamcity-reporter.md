---
id: wdio-teamcity-reporter
title: Репортер Teamcity
custom_edit_url: https://github.com/webdriverio-community/wdio-teamcity-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-teamcity-reporter является сторонним пакетом, для получения дополнительной информации смотрите [GitHub](https://github.com/webdriverio-community/wdio-teamcity-reporter) | [npm](https://www.npmjs.com/package/wdio-teamcity-reporter)

WebdriverIO Teamcity reporter, который позволяет отображать результаты тестов в реальном времени, делает информацию о тестах доступной на вкладке Tests на странице результатов сборки.

## Установка

```bash
npm install wdio-teamcity-reporter --save-dev
```

Инструкции по установке WebdriverIO можно найти здесь: https://webdriver.io/docs/gettingstarted

## Конфигурация

Добавьте репортер в ваш файл [wdio.conf.js](http://webdriver.io/guide/testrunner/configurationfile.html):

```javascript
exports.config = {
  // ...
  reporters: [
    [
      'teamcity',
      {
        captureStandardOutput: false, // optional
        flowId: true, // optional
        message: '[title]', // optional
      }
    ]
  ],
  // ...
}
```

### Опции

- `captureStandardOutput (boolean)` — если `true`, все сообщения стандартного вывода (и стандартной ошибки), полученные между сообщениями `testStarted` и `testFinished`, будут считаться выводом теста. Значение по умолчанию — `false`, что предполагает использование служебных сообщений testStdOut и testStdErr для отчета о выводе теста. По умолчанию `false`.
- `flowId (boolean)` — если `true`, ко всем сообщениям будет добавлено свойство `flowId`. Отслеживание потока необходимо, например, для различения отдельных процессов, работающих параллельно. По умолчанию `true`.
- `message (string)` — возможность предоставить определенный формат для свойства name. Возможные ключи: `[browser]`, `[title]`. Пример, `[browser] / [title]`. По умолчанию `[title]`.

## Ссылки

- Ссылка на документацию Teamcity о сообщениях в отчетах: https://confluence.jetbrains.com/display/TCD65/Build+Script+Interaction+with+TeamCity
- Тестовый запуск Teamcity: https://blog.jetbrains.com/teamcity/2019/08/getting-started-with-teamcity-testdrive/

## Лицензия

> The MIT License