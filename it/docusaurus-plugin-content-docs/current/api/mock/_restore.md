---
id: restore
title: restore
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/restore.ts
---

Fa tutto ciò che fa `mock.clear()`, e rimuove anche eventuali valori di ritorno simulati o implementazioni.
Il mock ripristinato non emette eventi e non può simulare risposte.

##### Utilizzo

```js
mock.restore()
```

##### Esempio

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    const mock = await browser.mock('**\/googlelogo_color_272x92dp.png')
    mock.respond('https://webdriver.io/img/webdriverio.png')
    await browser.url('https://google.com') // shows WebdriverIO logo instead of Google

    await mock.restore()
    await browser.url('https://google.com') // shows normal Google logo again
})
```