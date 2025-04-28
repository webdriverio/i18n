---
id: restore
title: återställ
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/restore.ts
---

Gör allt som `mock.clear()` gör, och tar också bort alla simulerade returvärden eller implementationer.
Återställda mockar skickar inte händelser och kan inte simulera svar.

##### Användning

```js
mock.restore()
```

##### Exempel

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    const mock = await browser.mock('**\/googlelogo_color_272x92dp.png')
    mock.respond('https://webdriver.io/img/webdriverio.png')
    await browser.url('https://google.com') // shows WebdriverIO logo instead of Google

    await mock.restore()
    await browser.url('https://google.com') // shows normal Google logo again
})
```