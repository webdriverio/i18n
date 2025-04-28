---
id: mockClearAll
title: mockClearAll
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mockClearAll.ts
---

セッションに登録されているすべてのモックに格納されている情報をリセットします。

##### 使用法

```js
browser.mockClearAll()
```

##### 例

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