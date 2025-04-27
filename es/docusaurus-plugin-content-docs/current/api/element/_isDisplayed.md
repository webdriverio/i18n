---
id: isDisplayed
title: isDisplayed
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isDisplayed.ts
---

Devuelve true si el elemento DOM seleccionado está visible (incluso cuando el elemento está fuera del viewport). Utiliza
el método [`checkVisibility`](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#visibilityproperty)
proporcionado por el navegador para determinar si un elemento está siendo mostrado o no. Dado que WebdriverIO actúa como un
usuario real, los valores predeterminados para las opciones `contentVisibilityAuto`, `opacityProperty` y `visibilityProperty`
están establecidos en `true` para predeterminar un comportamiento más estricto. Esto significa que el comando verificará si el elemento es
visible según el valor de sus propiedades `content-visibility`, `opacity` y `visibility`.

Si también deseas verificar que el elemento está dentro del viewport, proporciona la opción `withinViewport` al comando.

:::info

A diferencia de otros comandos de elementos, WebdriverIO no esperará a que el elemento
exista para ejecutar este comando.

:::

WebdriverIO, al realizar pruebas de navegador, utiliza un [script personalizado](https://github.com/webdriverio/webdriverio/blob/59d349ca847950354d02b9e548f60cc50e7871f0/packages/webdriverio/src/scripts/isElementDisplayed.ts)
específicamente diseñado para evaluar la visibilidad de los elementos. Este script es clave para determinar si un
elemento se muestra en la página. Por otro lado, para escenarios de pruebas móviles nativas con Appium, WebdriverIO
recurre al comando [`isElementDisplayed`](https://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#elementdisplayed)
proporcionado por Appium. Este comando evalúa la visibilidad de los elementos utilizando criterios establecidos por el
controlador subyacente de Appium, asegurando evaluaciones precisas y específicas del controlador para aplicaciones móviles.

##### Uso

```js
$(selector).isDisplayed(withinViewport, contentVisibilityAuto, opacityProperty, visibilityProperty)
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
      <td><code><var>withinViewport=false</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>`true` para verificar si el elemento está dentro del viewport. `false` por defecto.</td>
    </tr>
    <tr>
      <td><code><var>contentVisibilityAuto=true</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>`true` para verificar si la propiedad content-visibility del elemento tiene (o hereda) el valor auto, y actualmente está omitiendo su renderizado. `true` por defecto.</td>
    </tr>
    <tr>
      <td><code><var>opacityProperty=true</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>`true` para verificar si la propiedad opacity del elemento tiene (o hereda) un valor de 0. `true` por defecto.</td>
    </tr>
    <tr>
      <td><code><var>visibilityProperty=true</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>`true` para verificar si el elemento es invisible debido al valor de su propiedad visibility. `true` por defecto.</td>
    </tr>
  </tbody>
</table>

##### Ejemplos

```html title="index.html"
<div id="noSize"></div>
<div id="noSizeWithContent">Hello World!</div>
<div id="notDisplayed" style="width: 10px; height: 10px; display: none"></div>
<div id="notVisible" style="width: 10px; height: 10px; visibility: hidden"></div>
<div id="zeroOpacity" style="width: 10px; height: 10px; opacity: 0"></div>
<div id="notInViewport" style="width: 10px; height: 10px; position:fixed; top: 999999; left: 999999"></div>
```

```js title="isDisplayed.js"
it('should detect if an element is displayed', async () => {
    elem = await $('#notExisting');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSize');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSizeWithContent');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true

    let elem = await $('#notDisplayed');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notVisible');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#zeroOpacity');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notInViewport');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true
});
isDisplayedWithinViewport.js
it('should detect if an element is visible within the viewport', async () => {
    let isDisplayedInViewport = await $('#notDisplayed').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notVisible').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notExisting').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notInViewport').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#zeroOpacity').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false
});
```

##### Devuelve

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true si el elemento está visible