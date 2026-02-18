---
id: console-logs
title: Журналы консоли
---

Захват и проверка всех выводов консоли браузера во время выполнения тестов. DevTools записывает сообщения консоли из вашего приложения (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`), а также журналы фреймворка WebDriverIO на основе `logLevel`, настроенного в вашем `wdio.conf.ts`.

**Возможности:**
- Захват сообщений консоли в реальном времени во время выполнения теста
- Журналы консоли браузера (log, warn, error, info, debug)
- Журналы фреймворка WebDriverIO, отфильтрованные по настроенному `logLevel` (trace, debug, info, warn, error, silent)
- Отметки времени, показывающие точно, когда было зарегистрировано каждое сообщение
- Журналы консоли, отображаемые вместе с шагами теста и скриншотами браузера для контекста

**Конфигурация:**
```js
// wdio.conf.ts
export const config = {
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info', // Controls which framework logs are captured
    // ...
};
```

Это позволяет легко отлаживать ошибки JavaScript, отслеживать поведение приложения и видеть внутренние операции WebDriverIO во время выполнения тестов.

## Демо

### >_ Журналы консоли
![Console Logs](./demo/console-logs.gif)