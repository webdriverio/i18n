---
id: setValue
title: setValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/setValue.ts
---

Envía una secuencia de pulsaciones de teclas a un elemento después de que la entrada haya sido borrada previamente. Si el elemento no necesita
ser borrado primero, entonces use [`addValue`](/docs/api/element/addValue).

:::info

Si desea utilizar caracteres especiales, por ejemplo, para copiar y pegar un valor de una entrada a otra, use el
comando [`keys`](/docs/api/browser/keys).

:::

##### Uso

```js
$(selector).setValue(value)
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

```js title="setValue.js"
it('should set value for a certain element', async () => {
    const input = await $('.input');
    await input.setValue('test')
    await input.setValue(123)

    console.log(await input.getValue()); // outputs: '123'
});
```