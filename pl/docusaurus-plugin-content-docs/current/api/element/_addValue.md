---
id: addValue
title: addValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/addValue.ts
---

Dodaj wartość do elementu input lub textarea znalezionego za pomocą podanego selektora.

:::info

Jeśli chcesz używać znaków specjalnych, np. aby skopiować i wkleić wartość z jednego pola do drugiego, użyj
polecenia [`keys`](/docs/api/browser/keys).

:::

##### Użycie

```js
$(selector).addValue(value)
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>`string, number`</td>
      <td>wartość do dodania</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    let input = await $('.input')
    await input.addValue('test')
    await input.addValue(123)

    value = await input.getValue()
    assert(value === 'test123') // true
})
```