---
id: clear
title: clear（清除）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/clear.ts
---

重置存储在 `mock.calls` 数组中的所有信息。

##### 用法

```js
mock.clear()
```

##### 示例

```js title="clear.js"
it('should clear mock', async () => {
    const mock = await browser.mock('https://google.com/')
    await browser.url('https://google.com')

    console.log(mock.calls.length) // returns 1
    mock.clear()
    console.log(mock.calls.length) // returns 0
})
```