---
id: isSelected
title: isSelected（是否已选中）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isSelected.ts
---

将返回一个布尔值，表示`<option>`或类型为checkbox或radio的`<input>`元素当前是否被选中。

##### 用法

```js
$(selector).isSelected()
```

##### 示例

```html title="index.html"
<select name="selectbox" id="selectbox">
    <option value="John Doe">John Doe</option>
    <option value="Layla Terry" selected="selected">Layla Terry</option>
    <option value="Bill Gilbert">Bill Gilbert"</option>
</select>

```

```js title="isSelected.js"
it('should detect if an element is selected', async () => {
    let element = await $('[value="Layla Terry"]');
    console.log(await element.isSelected()); // outputs: true

    element = await $('[value="Bill Gilbert"]')
    console.log(await element.isSelected()); // outputs: false
});
```

##### 返回值

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  如果元素被选中则返回true