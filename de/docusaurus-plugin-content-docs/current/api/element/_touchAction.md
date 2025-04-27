---
id: touchAction
title: touchAction
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/touchAction.ts
---

:::caution Warnhinweis zur Veraltung

Der Befehl `touchAction` ist __veraltet__ und wird in einer zukünftigen Version entfernt.
Wir empfehlen stattdessen den [`action`](/docs/api/browser/action) Befehl mit
dem Zeigertyp `touch` zu verwenden, z.B.:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

Die Touch Action API bildet die Grundlage für alle Gesten, die in Appium automatisiert werden können.
Sie ist derzeit nur für native Apps verfügbar und kann nicht zur Interaktion mit Webapps verwendet werden.
Im Kern steht die Möglichkeit, einzelne _ad hoc_ Aktionen zu verketten, die dann auf ein Element
in der Anwendung auf dem Gerät angewendet werden. Die grundlegenden Aktionen, die verwendet werden können, sind:

- press (Element oder (x,y) oder beides übergeben)
- longPress (Element oder (x,y) oder beides übergeben)
- tap (Element oder (x,y) oder beides übergeben)
- moveTo (absolute x,y-Koordinaten übergeben)
- wait (ms (als Millisekunden) übergeben)
- release (keine Argumente)

##### Verwendung

```js
$(selector).touchAction(action)
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>action</var></code></td>
      <td>`TouchActions`</td>
      <td>auszuführende Aktion</td>
    </tr>
  </tbody>
</table>

##### Beispiel

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
