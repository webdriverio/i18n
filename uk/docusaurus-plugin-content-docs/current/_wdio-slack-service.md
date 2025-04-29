---
id: wdio-slack-service
title: Slack Сервіс
custom_edit_url: https://github.com/carmenmitru/wdio-slack-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-service це сторонній пакет, для отримання додаткової інформації перегляньте [GitHub](https://github.com/carmenmitru/wdio-slack-service) | [npm](https://www.npmjs.com/package/wdio-slack-service)
Бібліотека Webdriverio для надсилання результатів тестів як Slack-повідомлення у канали

## Встановлення

Найпростіший спосіб - зберегти `wdio-slack-service` як devDependency у вашому `package.json`.

```json
{
  "devDependencies": {
    "wdio-slack-service": "2.0.8"
  }
}
```

Ви можете просто зробити це за допомогою:

```bash
npm install wdio-slack-service --save-dev
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут.](https://webdriver.io/docs/gettingstarted.html)

## Конфігурація

Спочатку імпортуйте сервіс до файлу конфігурації wdio `wdio.conf.js`

```js
// wdio.conf.js
const slack = require('wdio-slack-service');
```

Щоб використовувати сервіс, вам потрібно мати URL-адресу вебхука Slack для надсилання сповіщень, і вам потрібно додати `slack` до вашого масиву `services`

Приклад:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        [slack, {
            webHookUrl: "<SLACK_WEBHOOK_URL>", // Використовується для публікації сповіщень у певному каналі
            notifyOnlyOnFailure: true, // Надсилати сповіщення лише при невдалому тесті
            messageTitle: "<NOTIFICATION_TITLE>" // Назва сповіщення
        }]
]
```
## Функції

- Надсилання сповіщень незалежно від результатів тестів
- Надсилання сповіщень лише при невдалих тестах
- Підтримка `mocha`, `jasmine` та `cucumber`
- Повторні запуски тестів будуть зареєстровані з додатковою інформацією
- Інформація про тривалість тесту
- Деталі помилок
- Звітування про сценарії/кроки Cucumber
- Інформація про браузер та версію

## Як це працює
Для `mocha`/`jasmine` сповіщення надсилатимуться на рівні spec, а для `cucumber` - на рівні функціональності. Наприклад, якщо у вас є 10 spec/feature файлів, ви отримаєте 10 сповіщень, оскільки вони запускаються в хуку `after`

## Опції

Для надсилання сповіщення вам потрібен URL-адреса вебхука Slack. Щоб дізнатись, як створити URL-адресу вебхука Slack, див. цю [сторінку](https://api.slack.com/messaging/webhooks)

### webHookUrl

Ця URL-адреса використовується для ідентифікації/автентифікації повідомлення та надсилання його в канал Slack

Тип: `String` <br/>
Обов'язково: `НІ` <br/>
За замовчуванням: `NA`

### notifyOnlyOnFailure

Якщо ви хочете отримувати сповіщення Slack лише при невдалому тесті, встановіть цю опцію на `true`. В іншому випадку сповіщення надсилаються для всіх тестових запусків незалежно від результату (успіх/невдача)

Тип: `Boolean` <br/>
Обов'язково: `ТАК` <br/>
За замовчуванням: `false`

### messageTitle

Заголовок сповіщення

Тип: `String` <br/>
Обов'язково: `ТАК` <br/>
За замовчуванням: `Webdriverio Slack Reporter`

## Знімки екрану

### Cucumber Успіх/Невдача

![Cucumber Pass/fail](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumber.PNG)

### Cucumber Повторна спроба

![Cucumber Retry](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumberretry.PNG)

### Всі успішні

![All Pass](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/allpass.PNG)

### Невдача Успіх

![Fail Pass](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/failpass.PNG)

### Повторна спроба невдала

![Retry Failed](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retryfail.PNG)

### Повторна спроба успішна

![Retry Passed](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retrypassed.PNG)

---

Для отримання додаткової інформації про WebdriverIO перегляньте [домашню сторінку](https://webdriver.io).