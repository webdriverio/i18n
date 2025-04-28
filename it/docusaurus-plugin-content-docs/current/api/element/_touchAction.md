---
id: touchAction
title: touchAction
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/touchAction.ts
---

:::caution Avviso di Deprecazione

Il comando `touchAction` è __deprecato__ e sarà rimosso in una versione futura.
Raccomandiamo di utilizzare invece il comando [`action`](/docs/api/browser/action) con
il tipo di puntatore `touch`, ad esempio:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

L'API Touch Action fornisce la base di tutti i gesti che possono essere automatizzati in Appium.
Attualmente è disponibile solo per le app native e non può essere utilizzata per interagire con le webapp.
Il suo nucleo è la capacità di concatenare azioni individuali _ad hoc_, che verranno poi
applicate a un elemento nell'applicazione sul dispositivo. Le azioni di base che possono essere utilizzate sono:

- press (passa elemento o (x,y) o entrambi)
- longPress (passa elemento o (x,y) o entrambi)
- tap (passa elemento o (x,y) o entrambi)
- moveTo (passa coordinate x,y assolute)
- wait (passa ms (come millisecondi))
- release (nessun argomento)

##### Utilizzo

```js
$(selector).touchAction(action)
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>action</var></code></td>
      <td>`TouchActions`</td>
      <td>azione da eseguire</td>
    </tr>
  </tbody>
</table>

##### Esempio

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