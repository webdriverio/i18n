---
id: touchAction
title: touchAction
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/touchAction.ts
---

:::caution Ostrzeżenie o przestarzałości

Komenda `touchAction` jest __przestarzała__ i zostanie usunięta w przyszłej wersji.
Zalecamy zamiast tego używanie komendy [`action`](/docs/api/browser/action) z
typem wskaźnika `touch`, np.:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

API Touch Action zapewnia podstawę wszystkich gestów, które można zautomatyzować w Appium.
Jest obecnie dostępne tylko dla natywnych aplikacji i nie może być używane do interakcji z aplikacjami webowymi.
Jego istotą jest możliwość łączenia w łańcuch pojedynczych akcji _ad hoc_, które następnie będą
zastosowane do elementu w aplikacji na urządzeniu. Podstawowe akcje, które można wykorzystać to:

- press (przekaż element lub (x,y) lub oba)
- longPress (przekaż element lub (x,y) lub oba)
- tap (przekaż element lub (x,y) lub oba)
- moveTo (przekaż absolutne współrzędne x,y)
- wait (przekaż ms (jako milisekundy))
- release (bez argumentów)

##### Użycie

```js
$(selector).touchAction(action)
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
      <td><code><var>action</var></code></td>
      <td>`TouchActions`</td>
      <td>akcja do wykonania</td>
    </tr>
  </tbody>
</table>

##### Przykład

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