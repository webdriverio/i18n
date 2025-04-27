---
id: selectByVisibleText
title: selectByVisibleText
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/selectByVisibleText.ts
---

Вибір опції з відображуваним текстом, що відповідає аргументу.

##### Використання

```js
$(selector).selectByVisibleText(text)
```

##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>text</var></code></td>
      <td>`String, Number`</td>
      <td>текст елемента опції, який буде вибрано</td>
    </tr>
  </tbody>
</table>

##### Приклади

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