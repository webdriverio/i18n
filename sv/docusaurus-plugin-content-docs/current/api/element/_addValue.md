---
id: addValue
title: addValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/addValue.ts
---

Lägg till ett värde i ett input- eller textarea-element som hittas med den angivna selektorn.

:::info

Om du vill använda specialtecken, t.ex. för att kopiera och klistra in ett värde från en input till en annan, använd 
[`keys`](/docs/api/browser/keys)-kommandot.

:::

##### Användning

```js
$(selector).addValue(value)
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>`string, number`</td>
      <td>värde som ska läggas till</td>
    </tr>
  </tbody>
</table>

##### Exempel

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    let input = await $('.input')
    await input.addValue('test')
    await input.addValue(123)

    value = await input.getValue()
    assert(value === 'test123') // true
})
```