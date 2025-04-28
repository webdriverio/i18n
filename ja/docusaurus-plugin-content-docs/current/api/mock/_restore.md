---
id: restore
title: 復元
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/restore.ts
---

`mock.clear()`が行うすべてのことを実行し、さらにモックされた戻り値や実装を削除します。
復元されたモックはイベントを発行せず、レスポンスをモックすることもできません。

##### 使用法

```js
mock.restore()
```

##### 例

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    const mock = await browser.mock('**\/googlelogo_color_272x92dp.png')
    mock.respond('https://webdriver.io/img/webdriverio.png')
    await browser.url('https://google.com') // shows WebdriverIO logo instead of Google

    await mock.restore()
    await browser.url('https://google.com') // shows normal Google logo again
})
```