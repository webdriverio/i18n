---
id: wdio-slack-service
title: Slack Сервис
custom_edit_url: https://github.com/carmenmitru/wdio-slack-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-service это сторонний пакет, для получения дополнительной информации, пожалуйста, смотрите [GitHub](https://github.com/carmenmitru/wdio-slack-service) | [npm](https://www.npmjs.com/package/wdio-slack-service)
Библиотека Webdriverio для отправки результатов тестов в виде уведомлений/сообщений Slack в каналы

## Установка

Самый простой способ - сохранить `wdio-slack-service` как devDependency в вашем файле `package.json`.

```json
{
  "devDependencies": {
    "wdio-slack-service": "2.0.8"
  }
}
```

Вы можете сделать это просто:

```bash
npm install wdio-slack-service --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь.](https://webdriver.io/docs/gettingstarted.html)

## Конфигурация

Сначала импортируйте сервис в конфигурационный файл wdio `wdio.conf.js`

```js
// wdio.conf.js
const slack = require('wdio-slack-service');
```

Для использования сервиса вам нужен webhook URL Slack для отправки уведомлений, и вам нужно добавить `slack` в ваш массив `services`

Пример:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        [slack, {
            webHookUrl: "<SLACK_WEBHOOK_URL>", // Используется для публикации уведомления в определенный канал
            notifyOnlyOnFailure: true, // Отправлять уведомление только при неудачном тесте
            messageTitle: "<NOTIFICATION_TITLE>" // Название уведомления
        }]
]
```
## Возможности

- Отправка уведомлений независимо от результатов тестов
- Отправка уведомлений только при неудаче теста
- Поддержка `mocha`, `jasmine` и `cucumber`
- Повторные запуски тестов будут записаны с дополнительной информацией
- Информация о длительности теста
- Детали ошибок
- Отчеты о сценариях/шагах Cucumber
- Информация о браузере и версии

## Как это работает
Для `mocha`/`jasmine` уведомление будет отправлено на уровне спецификации, а для `cucumber` - на уровне функционала. Допустим, если у вас есть 10 файлов спецификаций/функционала, вы получите 10 уведомлений, так как они срабатывают в хуке `after`

## Параметры

Для отправки уведомления у вас должен быть webhook URL Slack. Чтобы узнать, как создать webhook URL Slack, посмотрите эту [страницу](https://api.slack.com/messaging/webhooks)

### webHookUrl

Этот URL используется для идентификации/аутентификации отправляемого сообщения и отправки его в канал Slack

Тип: `String` <br/>
Опционально: `НЕТ` <br/>
По умолчанию: `НЕ УКАЗАНО`

### notifyOnlyOnFailure

Если вы хотите получать уведомления Slack только при неудаче теста, установите для этого параметра значение `true`. В противном случае, он отправляет уведомления для всех тестовых выполнений независимо от успеха/неудачи

Тип: `Boolean` <br/>
Опционально: `ДА` <br/>
По умолчанию: `false`

### messageTitle

Заголовок уведомления

Тип: `String` <br/>
Опционально: `ДА` <br/>
По умолчанию: `Webdriverio Slack Reporter`

## Скриншоты

### Cucumber Успех/Неудача

![Cucumber Pass/fail](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumber.PNG)

### Cucumber Повторная попытка

![Cucumber Retry](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumberretry.PNG)

### Все успешно

![All Pass](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/allpass.PNG)

### Неудача Успех

![Fail Pass](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/failpass.PNG)

### Повторная попытка не удалась

![Retry Failed](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retryfail.PNG)

### Повторная попытка успешна

![Retry Passed](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retrypassed.PNG)

---

Для получения дополнительной информации о WebdriverIO посетите [домашнюю страницу](https://webdriver.io).