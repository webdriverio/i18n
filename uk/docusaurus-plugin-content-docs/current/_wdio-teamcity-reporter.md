---
id: wdio-teamcity-reporter
title: Teamcity Reporter Репортер
custom_edit_url: https://github.com/webdriverio-community/wdio-teamcity-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-teamcity-reporter є пакетом від сторонніх розробників, для отримання додаткової інформації відвідайте [GitHub](https://github.com/webdriverio-community/wdio-teamcity-reporter) | [npm](https://www.npmjs.com/package/wdio-teamcity-reporter)

WebdriverIO Teamcity репортер, який дозволяє відображати результати тестів у реальному часі, робить інформацію про тести доступною на вкладці "Tests" сторінки результатів збірки.


## Встановлення

```bash
npm install wdio-teamcity-reporter --save-dev
```

Інструкції з встановлення WebdriverIO можна знайти тут: https://webdriver.io/docs/gettingstarted


## Конфігурація

Додайте репортер у ваш файл [wdio.conf.js](http://webdriver.io/guide/testrunner/configurationfile.html):

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

### Опції

- `captureStandardOutput (boolean)` — якщо `true`, всі повідомлення стандартного виводу (і стандартної помилки), отримані між повідомленнями `testStarted` та `testFinished`, будуть вважатися виводом тесту. Значення за замовчуванням — `false` та передбачає використання сервісних повідомлень testStdOut і testStdErr для звітування про вивід тесту. За замовчуванням `false`.
- `flowId (boolean)` — якщо `true`, властивість `flowId` буде додана до всіх повідомлень. Відстеження потоку необхідне, наприклад, для розрізнення окремих процесів, що виконуються паралельно. За замовчуванням `true`.
- `message (string)` — можливість надати конкретний формат для властивості name. Можливі ключі: `[browser]`, `[title]`. Наприклад, `[browser] / [title]`. За замовчуванням `[title]`.


## Посилання

- Посилання на документацію Teamcity про повідомлення звітування: https://confluence.jetbrains.com/display/TCD65/Build+Script+Interaction+with+TeamCity
- Тест-драйв Teamcity: https://blog.jetbrains.com/teamcity/2019/08/getting-started-with-teamcity-testdrive/


## Ліцензія

> The MIT License