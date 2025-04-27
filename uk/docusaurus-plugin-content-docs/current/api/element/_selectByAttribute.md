---
id: selectByAttribute
title: selectByAttribute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/selectByAttribute.ts
---

Вибір опції з певним значенням.

##### Використання

```js
$(selector).selectByAttribute(attribute, value)
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
      <td><code><var>attribute</var></code></td>
      <td>`string`</td>
      <td>атрибут елемента опції, який потрібно вибрати</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>`String, Number`</td>
      <td>значення елемента опції, який потрібно вибрати</td>
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