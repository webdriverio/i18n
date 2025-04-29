---
id: qajonatasmartins-wdio-google-chat-service
title: Сервіс Google Chat
custom_edit_url: https://github.com/qajonatasmartins/wdio-google-chat-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @qajonatasmartins/wdio-google-chat-service є пакетом сторонніх розробників, для отримання додаткової інформації перегляньте [GitHub](https://github.com/qajonatasmartins/wdio-google-chat-service) | [npm](https://www.npmjs.com/package/wdio-google-chat-service)

Бібліотека Webdriverio для надсилання результатів тестування як сповіщень/повідомлень до просторів Google Chat.

## Встановлення

`npm install wdio-google-chat-service --save-dev`

або

`yarn add wdio-google-chat-service`

## Налаштування

Спочатку імпортуйте сервіс у конфігураційний файл wdio `wdio.conf.js`

```
// wdio.conf.js
const GoogleChatService = require('wdio-google-chat-service');
```

Для використання сервісу вам потрібно мати URL вебхука Google Chat для надсилання сповіщень і додати URL до 'webhook'

Приклад:

```
services: [[GoogleChatService, {
            webhookUrl: 'https://chat.googleapis.com/v1/spaces/xxxxxxxxx/messages?key=xxxxxxxx&token=xxxxxxxxx',
            notifyOnlyOnFailure: false //Send notification only in case of test failure
        }]
],
```

## Отримання вебхука Google Chat

Примітка: Google Chat має вебхук лише для бізнес-акаунтів. Якщо ви використовуєте особистий акаунт, у вас не повинно бути опції вебхука.

1. Створіть простір у Google Chat
2. Натисніть на стрілку назви чат-простору
3. Натисніть [Manage Webhooks]
4. Додайте або скопіюйте представлений URL вебхука.
5. Вставте URL вебхука у сервіс у параметрі 'webhookUrl', як у прикладі вище.

## Можливості

- Підтримка запуску mocha
- Деталі помилок
- Надсилання сповіщень лише у випадку невдалого тестування

## Результати

![Test pass and fail](https://github.com/qajonatasmartins/wdio-google-chat-service/blob/main/./img/testPassAndFail.png)