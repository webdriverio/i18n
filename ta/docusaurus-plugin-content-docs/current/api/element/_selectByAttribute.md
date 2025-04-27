---
id: selectByAttribute
title: செலெக்ட்பைஅட்ரிபியூட்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/selectByAttribute.ts
---

குறிப்பிட்ட மதிப்புடன் ஆப்ஷனைத் தேர்ந்தெடுக்கவும்.

##### பயன்பாடு

```js
$(selector).selectByAttribute(attribute, value)
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
      <td><code><var>attribute</var></code></td>
      <td>`string`</td>
      <td>தேர்ந்தெடுக்கப்பட வேண்டிய ஆப்ஷன் எலிமென்ட்டின் பண்புக்கூறு</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>`String, Number`</td>
      <td>தேர்ந்தெடுக்கப்பட வேண்டிய ஆப்ஷன் எலிமென்ட்டின் மதிப்பு</td>
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
    <option name="someName5" value="someValue5">seis</option>
</select>
```

```js title="selectByAttribute.js"
it('Should demonstrate the selectByAttribute command', async () => {
    const selectBox = await $('#selectbox');
    const value = await selectBox.getValue();
    console.log(value); // returns "someValue0"

    await selectBox.selectByAttribute('value', 'someValue3');
    console.log(await selectBox.getValue()); // returns "someValue3"

    await selectBox.selectByAttribute('name', 'someName5');
    console.log(await selectBox.getValue()); // returns "someValue5"
});
```