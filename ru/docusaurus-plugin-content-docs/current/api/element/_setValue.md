---
id: setValue
title: setValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/setValue.ts
---

Отправляет последовательность нажатий клавиш в элемент после предварительной очистки ввода. Если элемент не нужно
предварительно очищать, используйте [`addValue`](/docs/api/element/addValue).

:::info

Если вы хотите использовать специальные символы, например, для копирования и вставки значения из одного поля ввода в другое, используйте
команду [`keys`](/docs/api/browser/keys).

:::

##### Использование

```js
$(selector).setValue(value)
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

```js title="setValue.js"
it('should set value for a certain element', async () => {
    const input = await $('.input');
    await input.setValue('test')
    await input.setValue(123)

    console.log(await input.getValue()); // outputs: '123'
});
```