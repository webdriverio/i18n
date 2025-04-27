---
id: scroll
title: desplazamiento
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/scroll.ts
---

Desplazarse dentro de la ventana del navegador. Ten en cuenta que las coordenadas `x` e `y` son relativas a la posición 
de desplazamiento actual, por lo tanto `browser.scroll(0, 0)` no realiza ninguna operación.

##### Uso

```js
browser.scroll(x, y)
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
      <td><code><var>x=0</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>posición de desplazamiento horizontal (predeterminado: `0`)</td>
    </tr>
    <tr>
      <td><code><var>y=0</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>posición de desplazamiento vertical (predeterminado: `0`)</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="scroll.js"
it('should demonstrate the scroll command', async () => {
    await browser.url('https://webdriver.io')

    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.scroll(0, 200)
    console.log(await browser.execute(() => window.scrollY)) // returns 200
});
```