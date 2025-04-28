---
id: clearValue
title: clearValue（値のクリア）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/clearValue.ts
---

input要素またはtextarea要素の値をクリアします。このコマンドを使用する前に、要素と対話できることを確認してください。無効化されている、または読み取り専用モードのinput要素はクリアできません。

##### 使用方法

```js
$(selector).clearValue()
```

##### 例

```js title="clearValue.js"
it('should demonstrate the clearValue command', async () => {
    const elem = await $('.input')
    await elem.setValue('test123')

    const value = await elem.getValue()
    console.log(value) // returns 'test123'

    await elem.clearValue()
    value = await elem.getValue()
    assert(value === ''); // true
})
```