---
id: restore
title: 恢复
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/restore.ts
---

执行`mock.clear()`的所有功能，并且还会移除任何模拟的返回值或实现。
恢复后的模拟不会发出事件，也无法模拟响应。

##### 用法

```js
mock.restore()
```

##### 示例

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    const mock = await browser.mock('**\/googlelogo_color_272x92dp.png')
    mock.respond('https://webdriver.io/img/webdriverio.png')
    await browser.url('https://google.com') // shows WebdriverIO logo instead of Google

    await mock.restore()
    await browser.url('https://google.com') // shows normal Google logo again
})
```