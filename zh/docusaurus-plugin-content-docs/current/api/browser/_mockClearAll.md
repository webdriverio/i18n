---
id: mockClearAll
title: 清除所有模拟
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mockClearAll.ts
---

重置会话中所有已注册模拟存储的所有信息。

##### 用法

```js
browser.mockClearAll()
```

##### 示例

```js title="mockClearAll.js"
it('should clear all mocks', async () => {
    const docMock = await browser.mock('**', {
        headers: { 'Content-Type': 'text/html' }
    })
    const jsMock = await browser.mock('**', {
        headers: { 'Content-Type': 'application/javascript' }
    })

    await browser.url('https://guinea-pig.webdriver.io/')
    console.log(docMock.calls.length, jsMock.calls.length) // returns "1 4"

    await browser.url('https://guinea-pig.webdriver.io/')
    console.log(docMock.calls.length, jsMock.calls.length) // returns "2 4" (JavaScript comes from cache)

    await browser.mockClearAll()
    console.log(docMock.calls.length, jsMock.calls.length) // returns "0 0"
})
```