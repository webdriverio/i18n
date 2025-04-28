---
id: addValue
title: addValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/addValue.ts
---

Aggiungi un valore a un elemento input o textarea trovato tramite il selettore specificato.

:::info

Se desideri utilizzare caratteri speciali, ad esempio per copiare e incollare un valore da un input a un altro, usa il comando 
[`keys`](/docs/api/browser/keys).

:::

##### Utilizzo

```js
$(selector).addValue(value)
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>`string, number`</td>
      <td>valore da aggiungere</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    let input = await $('.input')
    await input.addValue('test')
    await input.addValue(123)

    value = await input.getValue()
    assert(value === 'test123') // true
})
```