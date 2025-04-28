---
id: touchAction
title: touchAction
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/touchAction.ts
---

:::caution Varning för utfasning

Kommandot `touchAction` är __föråldrat__ och kommer att tas bort i en framtida version.
Vi rekommenderar att du använder [`action`](/docs/api/browser/action)-kommandot istället med
pekartyp `touch`, t.ex.:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

Touch Action API:et utgör grunden för alla gester som kan automatiseras i Appium.
Det är för närvarande endast tillgängligt för nativa appar och kan inte användas för att interagera med webbappar.
I grunden har den möjligheten att kedja ihop _ad hoc_ individuella åtgärder, som sedan
tillämpas på ett element i applikationen på enheten. De grundläggande åtgärder som kan användas är:

- press (skicka element eller (x,y) eller båda)
- longPress (skicka element eller (x,y) eller båda)
- tap (skicka element eller (x,y) eller båda)
- moveTo (skicka absoluta x,y-koordinater)
- wait (skicka ms (som millisekunder))
- release (inga argument)

##### Användning

```js
$(selector).touchAction(action)
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
    await screen.touchAction('tap');

    // simple touch action using selector and x y variables
    // tap location is 30px right and 20px down relative from the center of the element
    await screen.touchAction({
        action: 'tap', x: 30, y:20
    })

    // multi action on an element (drag&drop)
    await screen.touchAction([
        'press',
        { action: 'moveTo', x: 200, y: 300 },
        'release'
    ])

    // drag&drop to element
    const otherElement = await $('//UIAApplication[1]/UIAElement[2]')
    await screen.touchAction([
        'press',
        { action: 'moveTo', element: otherElement },
        'release'
    ])
});
```