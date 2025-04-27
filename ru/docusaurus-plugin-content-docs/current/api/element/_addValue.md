---
id: addValue
title: addValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/addValue.ts
---

Добавить значение в элемент ввода или текстовое поле, найденное по заданному селектору.

:::info

Если вы хотите использовать специальные символы, например, для копирования и вставки значения из одного поля ввода в другое, используйте команду
[`keys`](/docs/api/browser/keys).

:::

##### Использование

```js
$(selector).addValue(value)
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>`string, number`</td>
      <td>значение для добавления</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    let input = await $('.input')
    await input.addValue('test')
    await input.addValue(123)

    value = await input.getValue()
    assert(value === 'test123') // true
})
```