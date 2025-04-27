---
id: zoom
title: zoom
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/zoom.ts
---

Realiza un gesto de zoom en el elemento dado en la pantalla.

:::info

El zoom se realiza basado en gestos nativos móviles. Solo es compatible con los siguientes controladores:
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchopengesture) para Android
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) para iOS

Este comando solo funciona con los siguientes componentes actualizados:
 - Servidor Appium (versión 2.0.0 o superior)
 - `appium-uiautomator2-driver` (para Android)
 - `appium-xcuitest-driver` (para iOS)

Asegúrate de que tu entorno Appium local o basado en la nube se actualice regularmente para evitar problemas de compatibilidad.

:::

##### Uso

```js
$(selector).zoom({ duration, scale })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`PinchAndZoomOptions`</td>
      <td>Opciones de zoom (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>La duración en milisegundos de cuán rápido debe ejecutarse el zoom, mínimo es 500 ms y máximo es 10000 ms. El valor predeterminado es 1500 ms (1.5 segundos) (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>La escala de cuán grande debe ser el zoom según la pantalla. Los valores válidos deben ser números flotantes en el rango 0..1, donde 1.0 es 100% (opcional)</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="zoom.js"
it('should demonstrate a zoom on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Zoom with the default duration scale
    await mapsElement.zoom()
    // Zoom with a custom duration and scale
    await mapsElement.zoom({ duration: 4000, scale: 0.9 })
})
```