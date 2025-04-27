---
id: clear
title: क्लीयर (clear)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/clear.ts
---

`mock.calls` ऐरे में संग्रहित सभी जानकारी को रीसेट करता है।

##### उपयोग

```js
mock.clear()
```

##### उदाहरण

```js title="clear.js"
it('should clear mock', async () => {
    const mock = await browser.mock('https://google.com/')
    await browser.url('https://google.com')

    console.log(mock.calls.length) // returns 1
    mock.clear()
    console.log(mock.calls.length) // returns 0
})
```