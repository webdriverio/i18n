---
id: addValue
title: addValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/addValue.ts
---

Añadir un valor a un elemento input o textarea encontrado por el selector dado.

:::info

Si deseas usar caracteres especiales, por ejemplo, para copiar y pegar un valor de un input a otro, usa el
comando [`keys`](/docs/api/browser/keys).

:::

##### Uso

```js
$(selector).addValue(value)
```

##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>`string, number`</td>
      <td>valor que se añadirá</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    let input = await $('.input')
    await input.addValue('test')
    await input.addValue(123)

    value = await input.getValue()
    assert(value === 'test123') // true
})
```