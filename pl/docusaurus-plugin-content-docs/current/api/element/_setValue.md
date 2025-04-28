---
id: setValue
title: setValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/setValue.ts
---

Wysyła sekwencję naciśnięć klawiszy do elementu po uprzednim wyczyszczeniu pola wprowadzania. Jeśli element nie wymaga
wcześniejszego wyczyszczenia, użyj [`addValue`](/docs/api/element/addValue).

:::info

Jeśli chcesz używać znaków specjalnych, np. do kopiowania i wklejania wartości z jednego pola do drugiego, użyj komendy
[`keys`](/docs/api/browser/keys).

:::

##### Użycie

```js
$(selector).setValue(value)
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

```js title="setValue.js"
it('should set value for a certain element', async () => {
    const input = await $('.input');
    await input.setValue('test')
    await input.setValue(123)

    console.log(await input.getValue()); // outputs: '123'
});
```