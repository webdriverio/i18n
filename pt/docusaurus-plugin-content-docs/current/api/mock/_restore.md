---
id: restore
title: restaurar
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/restore.ts
---

Faz tudo o que `mock.clear()` faz, e também remove quaisquer valores de retorno simulados ou implementações.
O mock restaurado não emite eventos e não pode simular respostas.

##### Uso

```js
mock.restore()
```

##### Exemplo

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    const mock = await browser.mock('**\/googlelogo_color_272x92dp.png')
    mock.respond('https://webdriver.io/img/webdriverio.png')
    await browser.url('https://google.com') // shows WebdriverIO logo instead of Google

    await mock.restore()
    await browser.url('https://google.com') // shows normal Google logo again
})
```