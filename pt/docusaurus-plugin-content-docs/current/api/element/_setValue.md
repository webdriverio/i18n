---
id: setValue
title: setValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/setValue.ts
---

Envia uma sequência de pressionamentos de tecla para um elemento após o input ter sido limpo antes. Se o elemento não precisa 
ser limpo primeiro, então use [`addValue`](/docs/api/element/addValue).

:::info

Se você deseja usar caracteres especiais, por exemplo, para copiar e colar um valor de um input para outro, use o 
comando [`keys`](/docs/api/browser/keys).

:::

##### Uso

```js
$(selector).setValue(value)
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

```js title="setValue.js"
it('should set value for a certain element', async () => {
    const input = await $('.input');
    await input.setValue('test')
    await input.setValue(123)

    console.log(await input.getValue()); // outputs: '123'
});
```