---
id: touchAction
title: touchAction
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/touchAction.ts
---

:::caution Varning för utfasning

Kommandot `touchAction` är __föråldrat__ och kommer att tas bort i en framtida version.
Vi rekommenderar att du använder kommandot [`action`](/docs/api/browser/action) istället med
pekartyp `touch`, t.ex.:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

Touch Action API:et utgör grunden för alla gester som kan automatiseras i Appium.
Det är för närvarande endast tillgängligt för nativa appar och kan inte användas för att interagera med webbappar.
Kärnan i detta är möjligheten att kedja ihop _ad hoc_ individuella åtgärder, som sedan kommer att
tillämpas på ett element i applikationen på enheten. De grundläggande åtgärderna som kan användas är:

- press (skicka element eller (`x`, `y`) eller båda)
- longPress (skicka element eller (`x`, `y`) eller båda)
- tap (skicka element eller (`x`, `y`) eller båda)
- moveTo (skicka absoluta `x`, `y` koordinater)
- wait (skicka `ms` (som millisekunder))
- release (inga argument)

##### Användning

```js
browser.touchAction(action)
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
      <td><code><var>action</var></code></td>
      <td>`TouchActions`</td>
      <td>åtgärd att utföra</td>
    </tr>
  </tbody>
</table>

##### Exempel

```js title="touchAction.js"
it('should do a touch gesture', async () => {
    const screen = await $('//UITextbox');

    // simple touch action on element
    await browser.touchAction({
        action: 'tap',
        element: screen
    });

    // simple touch action x y variables
    // tap location is 30px right and 20px down relative from the viewport
    await browser.touchAction({
        action: 'tap',
        x: 30,
        y:20
    })

    // simple touch action x y variables
    // tap location is 30px right and 20px down relative from the center of the element
    await browser.touchAction({
        action: 'tap',
        x: 30,
        y:20,
        element: screen
    })

    // multi action on an element
    // drag&drop from position 200x200 down 100px on the screen
    await browser.touchAction([
        { action: 'press', x: 200, y: 200 },
        { action: 'moveTo', x: 200, y: 300 },
        'release'
    ])
});
```