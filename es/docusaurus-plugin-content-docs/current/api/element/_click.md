---
id: click
title: click
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/click.ts
---

Hacer clic en un elemento.

Esto emite un comando WebDriver `click` para el elemento seleccionado, que generalmente desplaza y luego hace clic en el
elemento seleccionado cuando no se pasan opciones. Cuando se pasa un objeto de opciones, utiliza la clase de acción en lugar del clic de webdriver, lo que
proporciona capacidades adicionales como pasar el tipo de botón, coordenadas, etc. Por defecto, al usar opciones se envía un comando de acción de liberación
después de realizar la acción de clic; pasa `option.skipRelease=true` para omitir esta acción.

:::info

Si tienes elementos de posición fija (como un encabezado o pie de página fijo) que cubren el
elemento seleccionado después de desplazarse dentro de la ventana gráfica, el clic se emitirá en las coordenadas dadas, pero
será recibido por tu elemento fijo (superpuesto). En estos casos se lanza el siguiente error:

```
Element is not clickable at point (x, x). Other element would receive the click: ..."
```

Para solucionar esto, intenta encontrar el elemento superpuesto y eliminarlo mediante el comando `execute` para que no interfiera
con el clic. También puedes intentar desplazarte al elemento tú mismo usando `scroll` con un desplazamiento apropiado para tu
escenario.

:::

:::info

El comando click también se puede usar para simular una pulsación larga en un dispositivo móvil. Esto se hace configurando la `duration`.
Consulta el ejemplo a continuación para obtener más información.

:::

##### Uso

```js
$(selector).click({ button, x, y, skipRelease, duration })
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
      <td>`ClickOptions`</td>
      <td>Opciones de clic (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.button</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string, number`</td>
      <td>Puede ser uno de `[0, "left", 1, "middle", 2, "right"]` <br /><strong>SOLO WEB</strong> (Escritorio/Móvil)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Hace clic a X píxeles horizontales de la ubicación del elemento (desde el punto central del elemento)<br /><strong>Soporte WEB y Nativo</strong> (Escritorio/Móvil)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Hace clic a Y píxeles verticales de la ubicación del elemento (desde el punto central del elemento)<br /><strong>Soporte WEB y Nativo</strong> (Escritorio/Móvil)</td>
    </tr>
    <tr>
      <td><code><var>options.skipRelease</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`boolean`</td>
      <td>Booleano (opcional) <br /><strong>SOLO WEB</strong> (Escritorio/Móvil)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Duración del clic, también conocido como "Pulsación larga" <br /><strong>SOLO APLICACIONES NATIVAS MÓVILES</strong> (Móvil)</td>
    </tr>
  </tbody>
</table>

##### Ejemplos

```html title="example.html"
<button id="myButton" onclick="document.getElementById('someText').innerHTML='I was clicked'">Click me</button>
<div id="someText">I was not clicked</div>
```

```js title="click.js"
it('should demonstrate the click command', async () => {
    const myButton = await $('#myButton')
    await myButton.click()
    const myText = await $('#someText')
    const text = await myText.getText()
    assert(text === 'I was clicked') // true
})
```

```js title="example.js"
it('should fetch menu links and visit each page', async () => {
    const links = await $$('#menu a')
    await links.forEach(async (link) => {
        await link.click()
    })
})

```

```html title="example.html"
<button id="myButton">Click me</button>
```

```js title="example.js"
it('should demonstrate a click using an offset', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ x: 30 }) // clicks 30 horizontal pixels away from location of the button (from center point of element)
})

```

```html title="example.html"
<button id="myButton">Click me</button>
```

```js title="example.js"
it('should demonstrate a right click passed as string', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 'right' }) // opens the contextmenu at the location of the button
})
it('should demonstrate a right click passed as number while adding an offset', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 2, x: 30, y: 40 }) // opens the contextmenu 30 horizontal and 40 vertical pixels away from location of the button (from the center of element)
})
it('should skip sending releaseAction command that cause unexpected alert closure', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 2, x: 30, y: 40, skipRelease:true }) // skips sending releaseActions
})

```

```js title="longpress.example.js"
it('should be able to open the contacts menu on iOS by executing a longPress', async () => {
    const contacts = await $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    await contacts.click({ duration: 2000 })
})
```