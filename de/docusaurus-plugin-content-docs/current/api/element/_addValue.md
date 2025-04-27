---
id: addValue
title: addValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/addValue.ts
---

Füge einem Eingabe- oder Textbereichselement, das durch den angegebenen Selektor gefunden wurde, einen Wert hinzu.

:::info

Wenn du spezielle Zeichen verwenden möchtest, z.B. um einen Wert von einer Eingabe in eine andere zu kopieren und einzufügen, verwende den
[`keys`](/docs/api/browser/keys) Befehl.

:::

##### Verwendung

```js
$(selector).addValue(value)
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>`string, number`</td>
      <td>Wert, der hinzugefügt werden soll</td>
    </tr>
  </tbody>
</table>

##### Beispiel

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    let input = await $('.input')
    await input.addValue('test')
    await input.addValue(123)

    value = await input.getValue()
    assert(value === 'test123') // true
})
```
