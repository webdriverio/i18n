---
id: isSelected
title: தேர்ந்தெடுக்கப்பட்டுள்ளதா
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isSelected.ts
---

ஒரு `<option>` அல்லது `<input>` வகை checkbox அல்லது radio எலிமெண்ட் 
தற்போது தேர்ந்தெடுக்கப்பட்டுள்ளதா என்பதை true அல்லது false என திருப்பி அனுப்பும்.

##### பயன்பாடு

```js
$(selector).isSelected()
```

##### எடுத்துக்காட்டுகள்

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

##### திருப்பி அனுப்புவது

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  எலிமெண்ட் தேர்ந்தெடுக்கப்பட்டிருந்தால் true