---
id: touchAction
title: touchAction
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/touchAction.ts
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

Interfejs API Touch Action zapewnia podstawę wszystkich gestów, które można zautomatyzować w Appium.
Jest obecnie dostępny tylko dla natywnych aplikacji i nie może być używany do interakcji z aplikacjami webowymi.
Jego istotą jest możliwość łączenia poszczególnych działań _ad hoc_, które następnie zostaną
zastosowane do elementu w aplikacji na urządzeniu. Podstawowe działania, które można wykorzystać to:

- press (przekaż element lub (`x`, `y`) lub obydwa)
- longPress (przekaż element lub (`x`, `y`) lub obydwa)
- tap (przekaż element lub (`x`, `y`) lub obydwa)
- moveTo (przekaż bezwzględne współrzędne `x`, `y`)
- wait (przekaż `ms` (jako milisekundy))
- release (bez argumentów)

##### Użycie

```js
browser.touchAction(action)
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