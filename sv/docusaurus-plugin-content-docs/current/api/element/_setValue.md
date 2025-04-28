---
id: setValue
title: setValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/setValue.ts
---

Skicka en sekvens av tangenttryckningar till ett element efter att inmatningen har rensats först. Om elementet inte behöver 
rensas först, använd då [`addValue`](/docs/api/element/addValue).

:::info

Om du vill använda specialtecken, t.ex. för att kopiera och klistra in ett värde från en inmatning till en annan, använd
[`keys`](/docs/api/browser/keys) kommandot.

:::

##### Användning

```js
$(selector).setValue(value)
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

```js title="setValue.js"
it('should set value for a certain element', async () => {
    const input = await $('.input');
    await input.setValue('test')
    await input.setValue(123)

    console.log(await input.getValue()); // outputs: '123'
});
```