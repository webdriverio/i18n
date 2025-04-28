---
id: isSelected
title: isSelected
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isSelected.ts
---

Kommer att returnera sant eller falskt om ett `<option>` eller `<input>` element av typen
checkbox eller radio är för närvarande valt.

##### Användning

```js
$(selector).isSelected()
```

##### Exempel

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

##### Returnerar

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** sant om elementet är valt