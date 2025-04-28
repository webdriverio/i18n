---
id: touchAction
title: touchAction
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/touchAction.ts
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
Attualmente è disponibile solo per le app native e non può essere utilizzata per interagire con le webapps.
Il suo nucleo è la capacità di concatenare azioni individuali _ad hoc_, che verranno poi
applicate a un elemento nell'applicazione sul dispositivo. Le azioni di base che possono essere utilizzate sono:

- press (passa elemento o (`x`, `y`) o entrambi)
- longPress (passa elemento o (`x`, `y`) o entrambi)
- tap (passa elemento o (`x`, `y`) o entrambi)
- moveTo (passa coordinate assolute `x`, `y`)
- wait (passa `ms` (in millisecondi))
- release (nessun argomento)

##### Utilizzo

```js
browser.touchAction(action)
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