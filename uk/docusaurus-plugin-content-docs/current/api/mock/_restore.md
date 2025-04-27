---
id: restore
title: відновити
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/restore.ts
---

Виконує все, що робить `mock.clear()`, а також видаляє будь-які підроблені значення або реалізації.
Відновлений мок не генерує події та не може підробляти відповіді.

##### Використання

```js
mock.restore()
```

##### Приклад

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    const mock = await browser.mock('**\/googlelogo_color_272x92dp.png')
    mock.respond('https://webdriver.io/img/webdriverio.png')
    await browser.url('https://google.com') // shows WebdriverIO logo instead of Google

    await mock.restore()
    await browser.url('https://google.com') // shows normal Google logo again
})
```