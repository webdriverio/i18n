---
id: wdio-gmail-service
title: Сервіс Gmail
custom_edit_url: https://github.com/webdriverio-community/wdio-gmail-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-gmail-service це сторонній пакет, для більш детальної інформації перегляньте [GitHub](https://github.com/webdriverio-community/wdio-gmail-service) | [npm](https://www.npmjs.com/package/wdio-gmail-service)

Плагін WebdriverIO для отримання електронних листів з Google Mail за допомогою [Gmail Tester](https://github.com/levz0r/gmail-tester).

## Встановлення

Найпростіший спосіб — зберегти `wdio-gmail-service` як `devDependency` у вашому package.json.

```json
{
  "devDependencies": {
    "wdio-gmail-service": "^2.0.0"
  }
}
```

Ви можете просто зробити це за допомогою:

```sh
npm install wdio-gmail-service --save-dev
```

## Використання

### Аутентифікація Gmail

Вам потрібно буде слідувати інструкціям на [Gmail Tester](https://github.com/levz0r/gmail-tester), щоб створити `credentials.json` (файл аутентифікації OAuth2) та `token.json` (токен OAuth2).

### Конфігурація

Додайте сервіс, додавши `gmail` до списку сервісів, наприклад:

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

## Опції сервісу

### credentialsJsonPath
Абсолютний шлях до файлу JSON з обліковими даними.

Тип: `string`

Обов'язково: `true`

### tokenJsonPath
Абсолютний шлях до файлу JSON з токеном.

Тип: `string`

Обов'язково: `true`

### intervalSec
Інтервал між перевірками поштової скриньки Gmail.

Тип: `number`

За замовчуванням: `10`

Обов'язково: `false`

### timeoutSec
Максимальний час очікування для пошуку електронного листа за заданими фільтрами.

Тип: `number`

За замовчуванням: `60`

Обов'язково: `false`


## Написання тестів

У вашому тесті WebdriverIO тепер ви можете перевірити, чи було отримано електронний лист.

```js
describe('Example', () => {
    it('Should check email', () => {
        // perform some actions that will send an email to setup gmail account
        const emails = await browser.checkInbox({ from: 'AccountSupport@ubi.com', subject: 'Ubisoft Password Change Request' });
        expect(emails[0].body.html).toContain('https://account-uplay.ubi.com/en-GB/action/change-password?genomeid=')
    })
})
```

## Параметри `checkInbox`

Параметри команди вимагають щонайменше один з: `from`, `to` або `subject`:

### `from`
Фільтр за адресою електронної пошти відправника.

Тип: `String`

### `to`
Фільтр за адресою електронної пошти отримувача.

Тип: `String`

### `subject`
Фільтр за темою електронного листа.

Тип: `String`

### `includeBody`
Встановіть значення true, щоб отримати декодовані тексти електронних листів.

Тип: `boolean`

### `includeAttachments`
Встановіть значення true, щоб отримати вкладення електронних листів, закодовані в base64.

Тип: `boolean`

### `before`
Фільтрувати повідомлення, отримані до вказаної дати.

Тип: `Date`

### `after`
Фільтрувати повідомлення, отримані після вказаної дати.

Тип: `Date`

### `label`
Мітка за замовчуванням — 'INBOX', але її можна змінити на 'SPAM', 'TRASH' або власну мітку. Для повного списку вбудованих міток див. https://developers.google.com/gmail/api/guides/labels?hl=en

Тип: `String`

---

Для отримання додаткової інформації про WebdriverIO перегляньте [домашню сторінку](https://webdriver.io).