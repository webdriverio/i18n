---
id: clear
title: clear（クリア）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/clear.ts
---

`mock.calls` 配列に格納されているすべての情報をリセットします。

##### 使用方法

```js
mock.clear()
```

##### 例

```js title="clear.js"
it('should clear mock', async () => {
    const mock = await browser.mock('https://google.com/')
    await browser.url('https://google.com')

    console.log(mock.calls.length) // returns 1
    mock.clear()
    console.log(mock.calls.length) // returns 0
})
```