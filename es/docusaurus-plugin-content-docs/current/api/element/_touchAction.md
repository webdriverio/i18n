---
id: touchAction
title: touchAction
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/touchAction.ts
---

:::caution Advertencia de Obsolescencia

El comando `touchAction` está __obsoleto__ y será eliminado en una versión futura.
Recomendamos usar el comando [`action`](/docs/api/browser/action) en su lugar con
el tipo de puntero `touch`, por ejemplo:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

La API Touch Action proporciona la base de todos los gestos que se pueden automatizar en Appium.
Actualmente solo está disponible para aplicaciones nativas y no se puede usar para interactuar con aplicaciones web.
Su esencia es la capacidad de encadenar acciones individuales _ad hoc_, que luego se
aplicarán a un elemento en la aplicación en el dispositivo. Las acciones básicas que se pueden usar son:

- press (pasar elemento o (x,y) o ambos)
- longPress (pasar elemento o (x,y) o ambos)
- tap (pasar elemento o (x,y) o ambos)
- moveTo (pasar coordenadas absolutas x,y)
- wait (pasar ms (como milisegundos))
- release (sin argumentos)

##### Uso

```js
$(selector).touchAction(action)
```

##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>action</var></code></td>
      <td>`TouchActions`</td>
      <td>acción a ejecutar</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

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