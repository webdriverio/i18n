---
id: qajonatasmartins-wdio-google-chat-service
title: Сервис Google Chat
custom_edit_url: https://github.com/qajonatasmartins/wdio-google-chat-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @qajonatasmartins/wdio-google-chat-service является сторонним пакетом, для получения дополнительной информации см. [GitHub](https://github.com/qajonatasmartins/wdio-google-chat-service) | [npm](https://www.npmjs.com/package/wdio-google-chat-service)

Библиотека Webdriverio для отправки результатов тестирования в виде уведомлений/сообщений в пространства Google Chat.

## Установка

`npm install wdio-google-chat-service --save-dev`

или

`yarn add wdio-google-chat-service`

## Настройки

Сначала импортируйте сервис в файл конфигурации wdio `wdio.conf.js`

```
// wdio.conf.js
const GoogleChatService = require('wdio-google-chat-service');
```

Чтобы использовать сервис, вам необходимо иметь URL вебхука Google Chat для отправки уведомлений и добавить URL в 'webhook'

Пример:

```
services: [[GoogleChatService, {
            webhookUrl: 'https://chat.googleapis.com/v1/spaces/xxxxxxxxx/messages?key=xxxxxxxx&token=xxxxxxxxx',
            notifyOnlyOnFailure: false //Отправлять уведомления только в случае неудачного теста
        }]
],
```

## Получение вебхука Google Chat

Примечание: Google Chat предоставляет вебхуки только для бизнес-аккаунтов. Если вы используете личную учетную запись, опция вебхука может быть недоступна.

1. Создайте пространство в Google Chat
2. Нажмите на стрелку рядом с названием пространства чата
3. Нажмите [Manage Webhooks]
4. Добавьте или скопируйте представленный URL вебхука
5. Вставьте URL вебхука в сервис в опцию 'webhookUrl', как показано в примере выше.

## Возможности

- Поддержка запуска тестов с mocha
- Подробная информация об ошибках
- Отправка уведомлений только в случае неудачных тестов

## Результаты

![Успешные и неудачные тесты](https://github.com/qajonatasmartins/wdio-google-chat-service/blob/main/./img/testPassAndFail.png)