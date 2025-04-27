---
id: mockRestoreAll
title: mockRestoreAll
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mockRestoreAll.ts
---

Stellt alle Mock-Informationen und -Verhaltensweisen zurück, die in allen registrierten
Mocks der Sitzung gespeichert sind.

##### Verwendung

```js
browser.mockRestoreAll()
```

##### Beispiel

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
