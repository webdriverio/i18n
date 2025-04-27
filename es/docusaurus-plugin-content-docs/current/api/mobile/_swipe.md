---
id: swipe
title: swipe
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/swipe.ts
---

Desliza en una dirección específica dentro del viewport o elemento para aplicaciones web de escritorio/móvil <strong>Y</strong> aplicaciones nativas móviles.

:::info

El deslizamiento para aplicaciones nativas móviles se basa en el protocolo W3C-actions, simulando la presión y el movimiento de un dedo.
Esto es diferente del comando [`mobile: scrollGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) para Android
o [`mobile: scroll`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll) para iOS, que se basa en el protocolo del controlador Appium y está
disponible solo para plataformas móviles en el contexto NATIVE.

Este comando solo funciona con los siguientes componentes actualizados:
 - Servidor Appium (versión 2.0.0 o superior)
 - `appium-uiautomator2-driver` (para Android)
 - `appium-xcuitest-driver` (para iOS)

Asegúrate de que tu entorno Appium local o en la nube se actualice regularmente para evitar problemas de compatibilidad.

:::

:::caution Deslizamiento basado en coordenadas

Evita usar las opciones `from` y `to` a menos que sea absolutamente necesario. Estas son específicas del dispositivo y pueden no funcionar de manera consistente en todos los dispositivos.
Usa la opción `scrollableElement` para deslizamientos confiables dentro de un elemento.

:::

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
      <td>`object, boolean`</td>
      <td>opciones para `browser.swipe()`. Por defecto para web de escritorio/móvil: <br/> `{ direction: 'up', duration: 1500, percent: 0.95, scrollableElement: WebdriverIO.Element }`</td>
    </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string`</td>
      <td>Puede ser uno de `down`, `up`, `left` o `right`, por defecto es `up`. <br /><strong>SOLO PARA APLICACIONES NATIVAS MÓVILES</strong></td>
    </tr>
    <tr>
                      <td colspan="3"><strong>Down</strong><br /><strong>Punto de inicio:</strong><br/>Colocas tu dedo hacia la parte superior de la pantalla.<br/><strong>Movimiento:</strong><br/>Deslizas tu dedo hacia abajo hacia la parte inferior de la pantalla.<br/><strong>Acción:</strong><br/>Esto también varía según el contexto:<br />- En la pantalla de inicio o en aplicaciones, normalmente desplaza el contenido hacia arriba.<br />- Desde el borde superior, a menudo abre el panel de notificaciones o configuraciones rápidas.<br />- En navegadores o aplicaciones de lectura, se puede usar para desplazarse por el contenido.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Left</strong><br /><strong>Punto de inicio:</strong><br/>Colocas tu dedo en el lado derecho de la pantalla.<br/><strong>Movimiento:</strong><br/>Deslizas tu dedo horizontalmente hacia la izquierda.><br/><strong>Acción:</strong><br/>La respuesta a este gesto depende de la aplicación:<br />- Puede moverse al siguiente elemento en un carrusel o un conjunto de imágenes.<br />- En un contexto de navegación, podría volver a la página anterior o cerrar la vista actual.<br />- En la pantalla de inicio, generalmente cambia al siguiente escritorio o pantalla virtual.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Right</strong><br /><strong>Punto de inicio:</strong><br/>Colocas tu dedo en el lado izquierdo de la pantalla.<br/><strong>Movimiento:</strong><br/>Deslizas tu dedo horizontalmente hacia la derecha.<br/><strong>Acción:</strong><br/>Similar a deslizar hacia la izquierda, pero en la dirección opuesta:<br />-- A menudo se mueve al elemento anterior en un carrusel o galería.<br />- Se puede usar para abrir menús laterales o cajones de navegación en aplicaciones.<br />- En la pantalla de inicio, normalmente cambia al escritorio virtual anterior.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Up</strong><br /><strong>Punto de inicio:</strong><br/>Colocas tu dedo hacia la parte inferior de la pantalla.<br/><strong>Movimiento:</strong><br/>Deslizas tu dedo hacia arriba hacia la parte superior de la pantalla.><br/><strong>Acción:</strong><br/>Dependiendo del contexto, pueden ocurrir diferentes acciones:<br />- En la pantalla de inicio o en una lista, esto generalmente desplaza el contenido hacia abajo.<br />- En una aplicación de pantalla completa, podría abrir opciones adicionales o el cajón de aplicaciones.<br />- En ciertas interfaces, podría activar una acción de 'actualización' o abrir una barra de búsqueda.</td>
            </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>La duración en milisegundos para el deslizamiento. Por defecto es `1500` ms. Cuanto menor sea el valor, más rápido será el deslizamiento.</td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Element`</td>
      <td>Elemento que se utiliza para deslizar dentro. Si no se proporciona ningún elemento, utilizará el siguiente selector para iOS `-ios predicate string:type == "XCUIElementTypeApplication"` y el siguiente para Android `//android.widget.ScrollView'`. Si más elementos coinciden con el selector predeterminado, entonces por defecto seleccionará el primer elemento coincidente. <br /> <strong>SOLO PARA APLICACIONES NATIVAS MÓVILES</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>El porcentaje del elemento desplazable (por defecto) para deslizar. Este es un valor entre 0 y 1. Por defecto es `0.95`.<br /><strong>NUNCA</strong> deslices desde el extremo superior|inferior|izquierdo|derecho de la pantalla, podrías activar por ejemplo la barra de notificaciones u otras características del SO/App que pueden llevar a resultados inesperados.<br />Esto no tiene efecto si se proporcionan `from` y `to`.</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Los valores a continuación <strong>SOLO</strong> tienen efecto si el `scrollableElement` <strong>NO</strong> se proporciona, de lo contrario se ignoran.</strong></td>
            </tr>
    <tr>
      <td><code><var>options.from</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`object`</td>
      <td>Las coordenadas x e y del inicio del deslizamiento. Si se proporciona un `scrollableElement`, entonces estas coordenadas no tienen efecto.</td>
    </tr>
    <tr>
      <td><code><var>options.from.x</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>La coordenada x del inicio del deslizamiento.</td>
    </tr>
    <tr>
      <td><code><var>options.from.y</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>La coordenada y del inicio del deslizamiento.</td>
    </tr>
    <tr>
      <td><code><var>options.to</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`object`</td>
      <td>Las coordenadas x e y del final del deslizamiento. Si se proporciona un `scrollableElement`, entonces estas coordenadas no tienen efecto.</td>
    </tr>
    <tr>
      <td><code><var>options.to.x</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>La coordenada x del final del deslizamiento.</td>
    </tr>
    <tr>
      <td><code><var>options.to.y</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>La coordenada y del final del deslizamiento.</td>
    </tr>
  </tbody>
</table>

##### Ejemplos

```js title="swipe.js"
it('should execute a default swipe', async () => {
    // Default will be a swipe from the bottom to the top, meaning it will swipe UP
    await browser.swipe();
});

```

```js title="swipe.with.options.js"
it('should execute a swipe with options', async () => {
    await browser.swipe({
        direction: 'left',                  // Swipe from right to left
        duration: 5000,                     // Last for 5 seconds
        percent: 0.5,                       // Swipe 50% of the scrollableElement
        scrollableElement: $('~carousel'),  // The element to swipe within
    })
});
```