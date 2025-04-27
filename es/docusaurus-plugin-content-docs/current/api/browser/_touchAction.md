---
id: touchAction
title: touchAction
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/touchAction.ts
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

La API de Touch Action proporciona la base de todos los gestos que se pueden automatizar en Appium.
Actualmente solo está disponible para aplicaciones nativas y no se puede usar para interactuar con aplicaciones web.
En su núcleo está la capacidad de encadenar acciones individuales _ad hoc_, que luego se
aplicarán a un elemento en la aplicación en el dispositivo. Las acciones básicas que se pueden usar son:

- press (pasar elemento o (`x`, `y`) o ambos)
- longPress (pasar elemento o (`x`, `y`) o ambos)
- tap (pasar elemento o (`x`, `y`) o ambos)
- moveTo (pasar coordenadas absolutas `x`, `y`)
- wait (pasar `ms` (en milisegundos))
- release (sin argumentos)

##### Uso

```js
browser.touchAction(action)
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