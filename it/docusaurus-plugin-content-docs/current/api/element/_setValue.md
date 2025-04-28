---
id: setValue
title: setValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/setValue.ts
---

Invia una sequenza di tasti a un elemento dopo che l'input è stato cancellato prima. Se l'elemento non ha bisogno
di essere cancellato prima, utilizza [`addValue`](/docs/api/element/addValue).

:::info

Se desideri utilizzare caratteri speciali, ad esempio per copiare e incollare un valore da un input a un altro, usa il
comando [`keys`](/docs/api/browser/keys).

:::

##### Utilizzo

```js
$(selector).setValue(value)
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

```js title="setValue.js"
it('should set value for a certain element', async () => {
    const input = await $('.input');
    await input.setValue('test')
    await input.setValue(123)

    console.log(await input.getValue()); // outputs: '123'
});
```