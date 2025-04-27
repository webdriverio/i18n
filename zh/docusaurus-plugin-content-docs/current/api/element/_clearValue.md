---
id: clearValue
title: 清除值
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/clearValue.ts
---

清除输入框或文本区域元素的值。在使用此命令之前，请确保您可以与元素进行交互。您无法清除处于禁用或只读模式的输入元素的值。

##### 用法

```js
$(selector).clearValue()
```

##### 示例

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