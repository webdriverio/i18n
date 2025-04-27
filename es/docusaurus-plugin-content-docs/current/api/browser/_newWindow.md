---
id: newWindow
title: nuevaVentana
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/newWindow.ts
---

Abrir una nueva ventana o pestaña en el navegador (por defecto abre una nueva ventana si no se especifica).
Este comando es la función equivalente a `window.open()`. Este comando no funciona en entornos móviles.

__Nota:__ Al llamar a este comando cambias automáticamente a la nueva ventana o pestaña.

##### Uso

```js
browser.newWindow(url, { type, windowName, windowFeatures })
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
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>URL del sitio web para abrir</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`NewWindowOptions`</td>
      <td>opciones del comando newWindow</td>
    </tr>
    <tr>
      <td><code><var>options.type</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string`</td>
      <td>tipo de nueva ventana: 'tab' o 'window'</td>
    </tr>
    <tr>
      <td><code><var>options.windowName</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>nombre de la nueva ventana</td>
    </tr>
    <tr>
      <td><code><var>options.windowFeatures</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>características de la ventana abierta (p. ej. tamaño, posición, barras de desplazamiento, etc.)</td>
    </tr>
  </tbody>
</table>

##### Ejemplos

```js title="newWindowSync.js"
it('should open a new window', async () => {
    await browser.url('https://google.com')
    console.log(await browser.getTitle()) // outputs: "Google"

    const result = await browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
    })
    console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
    console.log(result.type) // outputs: "window"
    const handles = await browser.getWindowHandles()
    await browser.switchToWindow(handles[1])
    await browser.closeWindow()
    await browser.switchToWindow(handles[0])
    console.log(await browser.getTitle()) // outputs: "Google"
});

```

```js title="newTabSync.js"
  it('should open a new tab', async () => {
      await browser.url('https://google.com')
      console.log(await browser.getTitle()) // outputs: "Google"

      await browser.newWindow('https://webdriver.io', {
          type:'tab',
          windowName: 'WebdriverIO window',
          windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
      })
      console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
      console.log(result.type) // outputs: "tab"
      const handles = await browser.getWindowHandles()
      await browser.switchToWindow(handles[1])
      await browser.closeWindow()
      await browser.switchToWindow(handles[0])
      console.log(await browser.getTitle()) // outputs: "Google"
 });
```

##### Devuelve

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**           Un objeto que contiene el identificador de la ventana y el tipo de nueva ventana `{handle: string, type: string}` handle - El ID del identificador de ventana de la nueva pestaña o ventana, type - El tipo de la nueva ventana, ya sea 'tab' o 'window'    
##### Lanza

- **Error**:  Si `url` es inválida, si el comando se usa en móvil, o si `type` no es 'tab' o 'window'.