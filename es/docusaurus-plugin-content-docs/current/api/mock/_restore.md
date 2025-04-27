---
id: restore
title: restaurar
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/restore.ts
---

Hace todo lo que `mock.clear()` hace, y también elimina cualquier valor de retorno simulado o implementaciones.
El mock restaurado no emite eventos y no puede simular respuestas.

##### Uso

```js
mock.restore()
```

##### Ejemplo

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    const mock = await browser.mock('**\/googlelogo_color_272x92dp.png')
    mock.respond('https://webdriver.io/img/webdriverio.png')
    await browser.url('https://google.com') // shows WebdriverIO logo instead of Google

    await mock.restore()
    await browser.url('https://google.com') // shows normal Google logo again
})
```