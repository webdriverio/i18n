---
id: setValue
title: setValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/setValue.ts
---

Sende eine Folge von Tastenanschlägen an ein Element, nachdem die Eingabe zuvor gelöscht wurde. Wenn das Element nicht zuerst gelöscht werden muss, verwende [`addValue`](/docs/api/element/addValue).

:::info

Wenn du Sonderzeichen verwenden möchtest, z.B. um einen Wert von einer Eingabe in eine andere zu kopieren und einzufügen, verwende den Befehl [`keys`](/docs/api/browser/keys).

:::

##### Verwendung

```js
$(selector).setValue(value)
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

```js title="setValue.js"
it('should set value for a certain element', async () => {
    const input = await $('.input');
    await input.setValue('test')
    await input.setValue(123)

    console.log(await input.getValue()); // outputs: '123'
});
```
