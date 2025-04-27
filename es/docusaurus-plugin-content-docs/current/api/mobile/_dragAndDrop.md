---
id: dragAndDrop
title: dragAndDrop
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/dragAndDrop.ts
---

Arrastra un elemento a un elemento o posición de destino.

:::info

La funcionalidad de este comando depende en gran medida de la forma en que se implementa arrastrar y soltar en tu aplicación. Si experimentas problemas, por favor publica tu ejemplo en [#4134](https://github.com/webdriverio/webdriverio/issues/4134).

También asegúrate de que tanto el elemento que estás arrastrando como el objetivo donde lo estás soltando sean visibles en la pantalla.

Este comando solo funciona con los siguientes componentes actualizados:
 - Servidor Appium (versión 2.0.0 o superior)
 - `appium-uiautomator2-driver` (para Android)
 - `appium-xcuitest-driver` (para iOS)

Asegúrate de que tu entorno Appium local o basado en la nube se actualice regularmente para evitar problemas de compatibilidad.

:::

##### Uso

```js
$(selector).dragAndDrop(target, { duration })
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
      <td><code><var>target</var></code></td>
      <td>`Element, DragAndDropCoordinate`</td>
      <td>elemento de destino u objeto con propiedades x e y</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`DragAndDropOptions`</td>
      <td>opciones del comando dragAndDrop</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>cuánto tiempo debe durar el arrastre</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="example.test.js"
it('should demonstrate the dragAndDrop command', async () => {
    const elem = $('#someElem')
    const target = $('#someTarget')

    // drag and drop to other element
    await elem.dragAndDrop(target)

    // drag and drop relative from current position
    await elem.dragAndDrop({ x: 100, y: 200 })
})
```