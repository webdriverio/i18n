---
id: wdio-cucumber-viewport-logger-service
title: Сервіс логування вьюпорта для Cucumber
custom_edit_url: https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumber-viewport-logger-service це пакет сторонніх розробників, для отримання додаткової інформації, будь ласка, перегляньте [GitHub](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service) | [npm](https://www.npmjs.com/package/wdio-cucumber-viewport-logger-service)
## Сервіс логування вьюпорта для Cucumber у WebdriverIO

Цей сервіс додає можливість логування кроків Cucumber та іншої налагоджувальної інформації безпосередньо у вікно вашого браузера у вашому рішенні на основі WebdriverIO. Особливо корисним це може бути у випадках використання пристроїв або віртуальних машин без прямого *фізичного* доступу до них та можливості налаштувати інтерактивну сесію для глибокого налагодження ваших e2e тестів.

![demo](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/raw/main/img/demo.gif)

### Швидкий старт

Встановіть пакет:

```bash
npm install wdio-cucumber-viewport-logger-service --save-dev
```

Додайте сервіс до вашого розділу конфігурації `services`, наприклад:

```js
  services: [
    //...
    'cucumber-viewport-logger',
    //...
]
```

### Опції сервісу

| Опція  | Опис | Тип |Значення за замовчуванням |
| --- | --- | --- | --- |
| `numberOfSteps`  | кількість кроків, які будуть відображатись у вьюпорті  | number |3 |
| `enabled`  | увімкнути/вимкнути сервіс | boolean |true |
| `styles`  | CSS стилі для обгортки логера, *ключових слів кроків* та *тексту кроків*, див. приклад нижче  | object |{} |

```js
// wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
            numberOfSteps: 5,
            enabled: process.env.VP_LOGGER === '1', // сервіс буде увімкнено лише коли ви встановите змінну оточення `VP_LOGGER` у значення `1`
            // встановіть власні CSS стилі для конкретних елементів
            styles: {
                wrapper: { backgroundColor: 'white' },
                keyword: { color: 'red' },
                text: {
                    fontSize: '30px',
                    color: 'green',
                },
                closeButton: {
                    color: 'red',
                },
            },
        },]
    ]
    // ...
};
```

### API

> `logToViewport(message, styles)` - виводить користувацьке повідомлення з власним CSS стилем (не обов'язково), ви можете використовувати це у ваших визначеннях кроків
наприклад:
>```js
>When(/^I render message: "([^"]*)"$/, { timeout: 120000 }, function (message) {
>    browser.logToViewport(message, { text: { color: 'green' } });
>});
>```


> `removeViewportLogMessage()` - видаляє секцію повідомлень з вьюпорта, може бути корисним, наприклад, для виконання візуальної перевірки

### pointerEvents: 'none'

За замовчуванням, всі події миші (клік, наведення, тощо) проходять крізь секцію повідомлень, наприклад: замість натискання на секцію повідомлень, ваш клік "проходить" до елемента, що знаходиться за повідомленням (елемента вашого додатку). Якщо ви бажаєте змінити цю поведінку, встановіть стиль обгортки 'pointerEvents' на значення 'auto', наприклад:
```js

/ wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
     
            styles: {
                wrapper: { pointerEvents: 'auto' },
            },
        },]
    ]
    // ...
};
```