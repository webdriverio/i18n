---
id: pause
title: pause
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/pause.ts
---

Pausa la ejecución durante un tiempo específico. Se recomienda no usar este comando para esperar a que
aparezca un elemento. Para evitar resultados de prueba inestables, es mejor usar comandos como
[`waitForExist`](/docs/api/element/waitForExist) u otros comandos waitFor*.

##### Uso

```js
browser.pause(milliseconds)
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
      <td><code><var>milliseconds</var></code></td>
      <td>`number`</td>
      <td>tiempo en ms</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="pause.js"
it('should pause the execution', async () => {
    const starttime = new Date().getTime()
    await browser.pause(3000)
    const endtime = new Date().getTime()
    console.log(endtime - starttime) // muestra: 3000
});
```