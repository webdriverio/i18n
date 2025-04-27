---
id: isSelected
title: isSelected
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isSelected.ts
---

Retourne vrai ou faux selon qu'un élément `<option>` ou `<input>` de type
case à cocher ou bouton radio est actuellement sélectionné.

##### Utilisation

```js
$(selector).isSelected()
```

##### Exemples

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

##### Retourne

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** vrai si l'élément est sélectionné