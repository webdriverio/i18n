---
id: isSelected
title: 選択されているかの確認
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isSelected.ts
---

`<option>` または `<input>` 要素（チェックボックスまたはラジオボタンのタイプ）が現在選択されているかどうかを、true または false で返します。

##### 使用方法

```js
$(selector).isSelected()
```

##### 例

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

##### 戻り値

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** 要素が選択されている場合はtrue