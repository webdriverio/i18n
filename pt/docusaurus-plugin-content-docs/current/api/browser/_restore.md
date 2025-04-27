---
id: restore
title: restaurar
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/restore.ts
---

Este comando restaura comportamentos emulados específicos ou todos que foram definidos usando o comando `emulate`.

##### Uso

```js
browser.restore()
```

##### Exemplo

```js title="restore.js"
before(async () => {
    await browser.emulate('geolocation', { latitude: 52.52, longitude: 13.405 })
    await browser.emulate('userAgent', 'foobar')
    await browser.emulate('colorScheme', 'dark')
    await browser.emulate('onLine', false)
})

it('should restore all emulated behavior', async () => {
    await browser.url('https://webdriver.io')
    // test within an emulated environment...
})

after(async () => {
    // restore all emulated behavior
    await browser.restore()
    // or only restore specific emulated behavior
    // await browser.restore(['geolocation', 'userAgent'])
})
```