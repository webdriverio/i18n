---
id: setValue
title: setValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/setValue.ts
---

Надсилає послідовність натискань клавіш елементу після попереднього очищення поля вводу. Якщо елемент не потрібно
попередньо очищати, використовуйте [`addValue`](/docs/api/element/addValue).

:::info

Якщо ви хочете використовувати спеціальні символи, наприклад, для копіювання та вставки значення з одного поля в інше, використовуйте
команду [`keys`](/docs/api/browser/keys).

:::

##### Використання

```js
$(selector).setValue(value)
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
      <td><code><var>value</var></code></td>
      <td>`string, number`</td>
      <td>значення, яке потрібно додати</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="setValue.js"
it('should set value for a certain element', async () => {
    const input = await $('.input');
    await input.setValue('test')
    await input.setValue(123)

    console.log(await input.getValue()); // outputs: '123'
});
```