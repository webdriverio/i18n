---
id: restore
title: மீட்டமை
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/restore.ts
---

இந்த கட்டளை `emulate` கட்டளையைப் பயன்படுத்தி அமைக்கப்பட்ட குறிப்பிட்ட அல்லது அனைத்து போலி நடத்தைகளையும் மீட்டெடுக்கிறது.

##### பயன்பாடு

```js
browser.restore()
```

##### உதாரணம்

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