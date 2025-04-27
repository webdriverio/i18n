---
id: restore
title: restore
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/restore.ts
---

Делает всё то же, что и `mock.clear()`, а также удаляет все имитированные возвращаемые значения или реализации.
Восстановленный мок не генерирует события и не может имитировать ответы.

##### Использование

```js
mock.restore()
```

##### Пример

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    const mock = await browser.mock('**\/googlelogo_color_272x92dp.png')
    mock.respond('https://webdriver.io/img/webdriverio.png')
    await browser.url('https://google.com') // shows WebdriverIO logo instead of Google

    await mock.restore()
    await browser.url('https://google.com') // shows normal Google logo again
})
```
```