---
id: mockRestoreAll
title: mockRestoreAll
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mockRestoreAll.ts
---

அமர்வில் பதிவுசெய்யப்பட்ட அனைத்து மாக்குகளிலும் சேமிக்கப்பட்டுள்ள அனைத்து மாக் தகவல்களையும் நடத்தைகளையும் மீட்டெடுக்கிறது.

##### பயன்பாடு

```js
browser.mockRestoreAll()
```

##### உதாரணம்

```js title="mockRestoreAll.js"
it('should restore all mocks', async () => {
    const googleMock = await browser.mock('https://google.com/')
    googleMock.respond('https://webdriver.io')
    const wdioMock = await browser.mock('https://webdriver.io')
    wdioMock.respond('http://json.org')

    await browser.url('https://google.com/')
    console.log(await browser.getTitle()) // JSON

    await browser.mockRestoreAll()

    await browser.url('https://google.com/')
    console.log(await browser.getTitle()) // Google
})
```