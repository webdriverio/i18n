---
id: scrollIntoView
title: scrollIntoView
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/scrollIntoView.ts
---

Desplaza el elemento a la vista para Web de Escritorio/Móvil <strong>Y</strong> Aplicaciones Nativas Móviles.

:::info

El desplazamiento para Aplicaciones Nativas Móviles se realiza basándose en el comando móvil `swipe`.

Este comando solo funciona con los siguientes componentes actualizados:
 - Servidor Appium (versión 2.0.0 o superior)
 - `appium-uiautomator2-driver` (para Android)
 - `appium-xcuitest-driver` (para iOS)

Asegúrate de que tu entorno Appium local o en la nube se actualice regularmente para evitar problemas de compatibilidad.

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
      <td>opciones para `Element.scrollIntoView()`. Predeterminado para web escritorio/móvil: <br/> `{ block: 'start', inline: 'nearest' }` <br /> Predeterminado para Aplicación Nativa Móvil <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Solo Web Escritorio/Móvil</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string`</td>
      <td>Ver [Referencia MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>SOLO-WEB</strong> (Escritorio/Móvil)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string`</td>
      <td>Ver [Referencia MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>SOLO-WEB</strong> (Escritorio/Móvil)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string`</td>
      <td>Ver [Referencia MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>SOLO-WEB</strong> (Escritorio/Móvil)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Solo Aplicación Nativa Móvil</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string`</td>
      <td>Puede ser uno de `down`, `up`, `left` o `right`, por defecto es `up`. <br /><strong>SOLO-APLICACIÓN-NATIVA-MÓVIL</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>La cantidad máxima de desplazamientos hasta que dejará de buscar el elemento, por defecto es `10`. <br /><strong>SOLO-APLICACIÓN-NATIVA-MÓVIL</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>La duración en milisegundos para el deslizamiento. El valor predeterminado es `1500` ms. Cuanto menor sea el valor, más rápido será el deslizamiento.<br /><strong>SOLO-APLICACIÓN-NATIVA-MÓVIL</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Element`</td>
      <td>Elemento que se utiliza para desplazarse dentro. Si no se proporciona ningún elemento, utilizará el siguiente selector para iOS `-ios predicate string:type == "XCUIElementTypeApplication"` y el siguiente para Android `//android.widget.ScrollView'`. Si más elementos coinciden con el selector predeterminado, entonces por defecto seleccionará el primer elemento coincidente. <br /> <strong>SOLO-APLICACIÓN-NATIVA-MÓVIL</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>El porcentaje del elemento desplazable (predeterminado) para deslizar. Este es un valor entre 0 y 1. El valor predeterminado es `0.95`.<br /><strong>NUNCA</strong> deslices desde el extremo superior|inferior|izquierdo|derecho de la pantalla, podrías activar por ejemplo la barra de notificaciones u otras características del SO/App que pueden conducir a resultados inesperados.<br /> <strong>SOLO-APLICACIÓN-NATIVA-MÓVIL</strong></td>
    </tr>
  </tbody>
</table>

##### Ejemplos

```js title="desktop.mobile.web.scrollIntoView.js"
it('should demonstrate the desktop/mobile web scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to specific element
    await elem.scrollIntoView();
    // center element within the viewport
    await elem.scrollIntoView({ block: 'center', inline: 'center' });
});

```

```js title="mobile.native.app.scrollIntoView.js"
it('should demonstrate the mobile native app scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to a specific element in the default scrollable element for Android or iOS for a maximum of 10 scrolls
    await elem.scrollIntoView();
    // Scroll to the left in the scrollable element called '#scrollable' for a maximum of 5 scrolls
    await elem.scrollIntoView({
        direction: 'left',
        maxScrolls: 5,
        scrollableElement: $('#scrollable')
    });
});
```