---
id: selectByVisibleText
title: दृश्यमान पाठ द्वारा चयन
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/selectByVisibleText.ts
---

तर्क से मेल खाने वाले प्रदर्शित पाठ वाले विकल्प का चयन करें।

##### उपयोग

```js
$(selector).selectByVisibleText(text)
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>text</var></code></td>
      <td>`String, Number`</td>
      <td>चयनित किए जाने वाले विकल्प तत्व का पाठ</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

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