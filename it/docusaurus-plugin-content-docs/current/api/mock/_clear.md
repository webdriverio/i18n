---
id: clear
title: clear
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/clear.ts
---

Reimposta tutte le informazioni memorizzate nell'array `mock.calls`.

##### Utilizzo

```js
mock.clear()
```

##### Esempio

```js title="clear.js"
it('should clear mock', async () => {
    const mock = await browser.mock('https://google.com/')
    await browser.url('https://google.com')

    console.log(mock.calls.length) // returns 1
    mock.clear()
    console.log(mock.calls.length) // returns 0
})
```