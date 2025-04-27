---
id: restore
title: 恢复
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/restore.ts
---

此命令可以恢复使用`emulate`命令设置的特定或所有模拟行为。

##### 用法

```js
browser.restore()
```

##### 示例

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