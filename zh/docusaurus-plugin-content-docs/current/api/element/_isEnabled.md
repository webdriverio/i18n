---
id: isEnabled
title: isEnabled（是否启用）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isEnabled.ts
---

返回所选DOM元素是否启用的布尔值（true或false）。

##### 用法

```js
$(selector).isEnabled()
```

##### 示例

```html title="index.html"
<input type="text" name="inputField" class="input1">
<input type="text" name="inputField" class="input2" disabled>
<input type="text" name="inputField" class="input3" disabled="disabled">

```

```js title="isEnabled.js"
it('should detect if an element is enabled', async () => {
    let elem = await $('.input1')
    let isEnabled = await elem.isEnabled();
    console.log(isEnabled); // outputs: true

    elem = await $('.input2')
    isEnabled = await elem.isEnabled();
    console.log(isEnabled2); // outputs: false

    elem = await $('.input3')
    isEnabled = await elem.isEnabled();
    console.log(isEnabled3); // outputs: false
});
```

##### 返回值

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** 如果元素已启用则返回true