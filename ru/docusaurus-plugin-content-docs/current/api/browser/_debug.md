---
id: debug
title: отладка
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/debug.ts
---

Эта команда помогает отлаживать интеграционные тесты. Она останавливает работающий браузер и дает вам время перейти в него и проверить состояние вашего приложения (например, с помощью инструментов разработчика).
Ваш терминал превращается в интерфейс [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop), который позволяет пробовать определенные команды, находить элементы и тестировать действия над ними.

[![WebdriverIO REPL](https://webdriver.io/img/repl.gif)](https://webdriver.io/img/repl.gif)

Если вы используете тестовый раннер WDIO, убедитесь, что увеличили значение свойства timeout тестового фреймворка, который вы используете (например, Mocha или Jasmine), чтобы предотвратить прерывание теста из-за тайм-аута. Также избегайте выполнения команды с несколькими одновременно запущенными capabilities.

<iframe width="560" height="315" src="https://www.youtube.com/embed/xWwP-3B_YyE" frameborder="0" allowFullScreen></iframe>

##### Использование

```js
browser.debug()
```

##### Пример

```js title="debug.js"
it('should demonstrate the debug command', async () => {
    await $('#input').setValue('FOO')
    await browser.debug() // jumping into the browser and change value of #input to 'BAR'
    const value = await $('#input').getValue()
    console.log(value) // outputs: "BAR"
})
```