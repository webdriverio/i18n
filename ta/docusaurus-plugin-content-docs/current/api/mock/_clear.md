---
id: clear
title: அழி
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/clear.ts
---

`mock.calls` அரேயில் சேமிக்கப்பட்டுள்ள அனைத்து தகவல்களையும் மீட்டமைக்கிறது.

##### பயன்பாடு

```js
mock.clear()
```

##### எடுத்துக்காட்டு

```js title="clear.js"
it('should clear mock', async () => {
    const mock = await browser.mock('https://google.com/')
    await browser.url('https://google.com')

    console.log(mock.calls.length) // returns 1
    mock.clear()
    console.log(mock.calls.length) // returns 0
})
```