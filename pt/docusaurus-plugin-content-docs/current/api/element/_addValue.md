---
id: addValue
title: addValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/addValue.ts
---

Adiciona um valor a um elemento de entrada (input) ou área de texto (textarea) encontrado pelo seletor fornecido.

:::info

Se você deseja usar caracteres especiais, por exemplo, para copiar e colar um valor de uma entrada para outra, use o comando
[`keys`](/docs/api/browser/keys).

:::

##### Uso

```js
$(selector).addValue(value)
```

##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>`string, number`</td>
      <td>valor a ser adicionado</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    let input = await $('.input')
    await input.addValue('test')
    await input.addValue(123)

    value = await input.getValue()
    assert(value === 'test123') // true
})
```