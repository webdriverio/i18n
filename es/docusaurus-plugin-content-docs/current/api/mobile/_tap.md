---
id: tap
title: tap
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/tap.ts
---

Realiza un gesto de toque en:
- o el elemento dado. **Se desplazará automáticamente** si no puede encontrarse.
- o la pantalla en un dispositivo móvil proporcionando coordenadas `x` e `y`

Internamente utiliza:
- Toque de elemento:
     - el comando `click` para entornos Web (navegadores Chrome/Safari, o aplicaciones híbridas)
     - el Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
o iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) para aplicaciones nativas, incluyendo el comando
`scrollIntoView` para desplazamiento automático
- Toque de pantalla:
     - el comando `action` para entornos Web (navegadores Chrome/Safari, o aplicaciones híbridas)
     - el Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
o iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) para aplicaciones nativas

Esta diferencia hace que el comando `tap` sea una alternativa más confiable al comando `click` para aplicaciones móviles.

Para aplicaciones nativas, este comando difiere del comando `click` ya que <strong>deslizará automáticamente</strong> hacia el elemento utilizando el comando `scrollIntoView`,
que no es compatible con aplicaciones nativas con el comando `click`. En aplicaciones híbridas o entornos web, el desplazamiento automático es compatible tanto con los comandos `click` como `tap`.

:::info

Este comando solo funciona con los siguientes componentes actualizados:
 - Servidor Appium (versión 2.0.0 o superior)
 - `appium-uiautomator2-driver` (para Android)
 - `appium-xcuitest-driver` (para iOS)

Asegúrate de que tu entorno Appium local o en la nube se actualice regularmente para evitar problemas de compatibilidad.

:::

:::caution Para toques en la pantalla

Si deseas tocar en una coordenada específica de la pantalla y utilizas una captura de pantalla para determinar las coordenadas, recuerda que las
coordenadas para iOS se basan en el tamaño de la pantalla del dispositivo, y no en el tamaño de la captura de pantalla. El tamaño de la captura de pantalla es mayor debido a la relación de píxeles del dispositivo.
La relación de píxeles promedio hasta el iPhone 8 y los iPads actuales es 2, para iPhones desde el iPhone X la relación es 3. Esto significa que el tamaño
de la captura de pantalla es 2 o 3 veces mayor que el tamaño de la pantalla del dispositivo, lo que significa que si encuentras las coordenadas en la captura de pantalla, divídelas por la relación
de píxeles del dispositivo para obtener las coordenadas correctas de la pantalla. Por ejemplo:

```js
const screenshotCoordinates = { x: 600, y: 900 };
const dpr = 3; // Ejemplo para iPhone 16
const screenCoordinates = {
    x: screenshotCoordinates.x / dpr,
    y: screenshotCoordinates.y / dpr
};
await browser.tap(screenCoordinates);
```

:::

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`TapOptions`</td>
      <td>Opciones de toque (opcional)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Opciones de toque de elemento</strong></td>
            </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Número (opcional, obligatorio si y está establecido) <br /><strong>Solo para toque en PANTALLA, no para toque en ELEMENTO</strong></td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Número (opcional, obligatorio si x está establecido) <br /><strong>Solo para toque en PANTALLA, no para toque en ELEMENTO</strong></td>
    </tr>
    <tr>
              <td colspan="3"><strong>Opciones de toque en pantalla</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Puede ser uno de `down`, `up`, `left` o `right`, el predeterminado es `down`. <br /><strong>Solo para toque en ELEMENTO, no para toque en PANTALLA</strong><br /><strong>SOLO-PARA-APLICACIONES-NATIVAS-MÓVILES</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>La cantidad máxima de desplazamientos hasta que dejará de buscar el elemento, el valor predeterminado es `10`. <br /><strong>Solo para toque en ELEMENTO, no para toque en PANTALLA</strong><br /><strong>SOLO-PARA-APLICACIONES-NATIVAS-MÓVILES</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Element`</td>
      <td>Elemento que se utiliza para desplazarse dentro. Si no se proporciona ningún elemento, utilizará el siguiente selector para iOS `-ios predicate string:type == "XCUIElementTypeApplication"` y el siguiente para Android `//android.widget.ScrollView'`. Si más elementos coinciden con el selector predeterminado, entonces por defecto seleccionará el primer elemento coincidente. <br /><strong>Solo para toque en ELEMENTO, no para toque en PANTALLA</strong><br /><strong>SOLO-PARA-APLICACIONES-NATIVAS-MÓVILES</strong></td>
    </tr>
  </tbody>
</table>

##### Examples

```js title="element.tap.example.js"
it('should be able to tap an on element', async () => {
    const elem = $('~myElement')
    // It will automatically scroll to the element if it's not already in the viewport
    await elem.tap()
})

```

```js title="element.tap.scroll.options.example.js"
it('should be able to swipe right 3 times in a custom scroll areas to an element and tap on the element', async () => {
    const elem = $('~myElement')
    // Swipe right 3 times in the custom scrollable element to find the element
    await elem.tap({
        direction: 'right',
        maxScrolls: 3,
        scrollableElement: $('#scrollable')
    })
})

```

```js title="screen.tap.example.js"
it('should be able to tap on screen coordinates', async () => {
    await browser.tap({ x: 200, y: 400 })
})
```