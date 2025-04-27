---
id: debug
title: відлагодження
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/debug.ts
---

Ця команда допомагає налагоджувати інтеграційні тести. Вона зупиняє запущений браузер і дає 
вам час увійти в нього та перевірити стан вашого додатку (наприклад, використовуючи інструменти розробника).
Ваш термінал перетворюється на інтерфейс [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop),
який дозволяє вам випробувати певні команди, знаходити елементи та тестувати дії на них.

[![WebdriverIO REPL](https://webdriver.io/img/repl.gif)](https://webdriver.io/img/repl.gif)

Якщо ви запускаєте тестовий раннер WDIO, переконайтеся, що ви збільшили властивість timeout тестового фреймворку, 
який використовуєте (наприклад, Mocha або Jasmine), щоб запобігти завершенню тесту через тайм-аут. 
Також уникайте виконання команди з кількома capabilities, що виконуються одночасно.

<iframe width="560" height="315" src="https://www.youtube.com/embed/xWwP-3B_YyE" frameborder="0" allowFullScreen></iframe>

##### Usage

```js
browser.debug()
```

##### Example

```js title="debug.js"
it('should demonstrate the debug command', async () => {
    await $('#input').setValue('FOO')
    await browser.debug() // jumping into the browser and change value of #input to 'BAR'
    const value = await $('#input').getValue()
    console.log(value) // outputs: "BAR"
})
```