---
id: addValue
title: addValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/addValue.ts
---

Додати значення до поля введення або текстової області, знайденої за допомогою вказаного селектора.

:::info

Якщо ви хочете використовувати спеціальні символи, наприклад, щоб скопіювати та вставити значення з одного поля в інше, використовуйте команду
[`keys`](/docs/api/browser/keys).

:::

##### Використання

```js
$(selector).addValue(value)
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

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    let input = await $('.input')
    await input.addValue('test')
    await input.addValue(123)

    value = await input.getValue()
    assert(value === 'test123') // true
})
```