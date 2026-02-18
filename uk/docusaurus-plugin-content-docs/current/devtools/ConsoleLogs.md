---
id: console-logs
title: Консольні Логи
---

Захоплюйте та перевіряйте всі виводи браузерної консолі під час виконання тесту. DevTools записує консольні повідомлення з вашого застосунку (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`) а також логи фреймворку WebDriverIO на основі `logLevel`, налаштованого у вашому `wdio.conf.ts`.

**Функції:**
- Захоплення консольних повідомлень у режимі реального часу під час виконання тесту
- Логи консолі браузера (log, warn, error, info, debug)
- Логи фреймворку WebDriverIO відфільтровані за налаштованим `logLevel` (trace, debug, info, warn, error, silent)
- Часові мітки, що показують, коли саме було записано кожне повідомлення
- Консольні логи відображаються разом з кроками тесту та знімками екрану браузера для контексту

**Конфігурація:**
```js
// wdio.conf.ts
export const config = {
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info', // Controls which framework logs are captured
    // ...
};
```

Це полегшує налагодження JavaScript помилок, відстеження поведінки застосунку та перегляд внутрішніх операцій WebDriverIO під час виконання тесту.

## Демо

### >_ Консольні Логи
![Console Logs](./demo/console-logs.gif)