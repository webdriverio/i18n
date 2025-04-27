---
id: isSelected
title: isSelected
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isSelected.ts
---

Will return true or false whether or not an `<option>` or `<input>` element of type
checkbox or radio is currently selected.

##### Usage

```js
$(selector).isSelected()
```

##### Examples

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

##### Returns

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true if element is selected    

