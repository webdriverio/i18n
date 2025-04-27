---
id: isSelected
title: isSelected
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isSelected.ts
---

Поверне true або false залежно від того, чи вибраний в даний момент елемент `<option>` або `<input>` типу
checkbox або radio.

##### Використання

```js
$(selector).isSelected()
```

##### Приклади

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

##### Повертає

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true якщо елемент вибраний