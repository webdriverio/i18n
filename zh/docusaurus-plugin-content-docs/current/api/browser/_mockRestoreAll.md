---
id: mockRestoreAll
title: mockRestoreAll（恢复所有模拟）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mockRestoreAll.ts
---

恢复会话中所有已注册模拟存储的所有模拟信息和行为。

##### 用法

```js
browser.mockRestoreAll()
```

##### 示例

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