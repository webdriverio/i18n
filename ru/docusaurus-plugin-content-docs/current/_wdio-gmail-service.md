---
id: wdio-gmail-service
title: Сервис Gmail
custom_edit_url: https://github.com/webdriverio-community/wdio-gmail-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-gmail-service — это сторонний пакет, для получения дополнительной информации см. [GitHub](https://github.com/webdriverio-community/wdio-gmail-service) | [npm](https://www.npmjs.com/package/wdio-gmail-service)

Плагин WebdriverIO для получения электронных писем из Google Mail с использованием [Gmail Tester](https://github.com/levz0r/gmail-tester).

## Установка

Самый простой способ — сохранить `wdio-gmail-service` как `devDependency` в вашем package.json.

```json
{
  "devDependencies": {
    "wdio-gmail-service": "^2.0.0"
  }
}
```

Вы можете сделать это просто:

```sh
npm install wdio-gmail-service --save-dev
```

## Использование

### Аутентификация Gmail

Вам нужно следовать инструкциям в [Gmail Tester](https://github.com/levz0r/gmail-tester) для создания `credentials.json` (файл аутентификации OAuth2) и `token.json` (токен OAuth2).

### Конфигурация

Добавьте сервис, добавив `gmail` в список сервисов, например:

```js
// wdio.conf.js
import path from 'path'

export const config = {
    // ...
    services: [['gmail', {
        credentialsJsonPath: path.join(process.cwd(), './credentials.json'),
        tokenJsonPath: join(process.cwd(), './token.json'),
        intervalSec: 10,
        timeoutSec: 60
    }]]
    // ...
};
```

## Параметры сервиса

### credentialsJsonPath
Абсолютный путь к файлу учетных данных JSON.

Тип: `string`

Обязательно: `true`

### tokenJsonPath
Абсолютный путь к файлу токена JSON.

Тип: `string`

Обязательно: `true`

### intervalSec
Интервал между проверками входящих писем Gmail.

Тип: `number`

По умолчанию: `10`

Обязательно: `false`

### timeoutSec
Максимальное время ожидания для поиска письма с заданными фильтрами.

Тип: `number`

По умолчанию: `60`

Обязательно: `false`


## Написание тестов

В вашем тесте WebdriverIO теперь можно проверить, было ли получено письмо.

```js
describe('Example', () => {
    it('Should check email', () => {
        // perform some actions that will send an email to setup gmail account
        const emails = await browser.checkInbox({ from: 'AccountSupport@ubi.com', subject: 'Ubisoft Password Change Request' });
        expect(emails[0].body.html).toContain('https://account-uplay.ubi.com/en-GB/action/change-password?genomeid=')
    })
})
```

## Параметры `checkInbox`

Параметры команды требуют хотя бы один из `from`, `to` или `subject`:

### `from`
Фильтр по адресу электронной почты отправителя.

Тип: `String`

### `to`
Фильтр по адресу электронной почты получателя.

Тип: `String`

### `subject`
Фильтр по теме письма.

Тип: `String`

### `includeBody`
Установите в true, чтобы получить декодированные тела писем.

Тип: `boolean`

### `includeAttachments`
Установите в true, чтобы получить вложения электронной почты в кодировке base64.

Тип: `boolean`

### `before`
Фильтровать сообщения, полученные до указанной даты.

Тип: `Date`

### `after`
Фильтровать сообщения, полученные после указанной даты.

Тип: `Date`

### `label`
Метка по умолчанию — 'INBOX', но может быть изменена на 'SPAM', 'TRASH' или пользовательскую метку. Полный список встроенных меток см. на https://developers.google.com/gmail/api/guides/labels?hl=en

Тип: `String`

---

Для получения дополнительной информации о WebdriverIO посетите [домашнюю страницу](https://webdriver.io).