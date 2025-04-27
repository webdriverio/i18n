---
id: selectByVisibleText
title: selectByVisibleText
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/selectByVisibleText.ts
---

காட்சிப்படுத்தப்பட்ட உரை வாதத்துடன் பொருந்தும் தேர்வு விருப்பத்தை தேர்ந்தெடுக்கவும்.

##### பயன்பாடு

```js
$(selector).selectByVisibleText(text)
```

##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>text</var></code></td>
      <td>`String, Number`</td>
      <td>தேர்ந்தெடுக்கப்பட வேண்டிய தேர்வு உறுப்பின் உரை</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டுகள்

```html title="example.html"
<select id="selectbox">
    <option value="someValue0">uno</option>
    <option value="someValue1">dos</option>
    <option value="someValue2">tres</option>
    <option value="someValue3">cuatro</option>
    <option value="someValue4">cinco</option>
    <option value="someValue5">seis</option>
</select>
```

```js title="selectByVisibleText.js"
it('demonstrate the selectByVisibleText command', async () => {
    const selectBox = await $('#selectbox');
    console.log(await selectBox.getText('option:checked')); // returns "uno"
    await selectBox.selectByVisibleText('cuatro');
    console.log(await selectBox.getText('option:checked')); // returns "cuatro"
})
```