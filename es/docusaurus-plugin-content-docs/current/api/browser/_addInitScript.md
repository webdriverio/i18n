---
id: addInitScript
title: addInitScript
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addInitScript.ts
---

Agrega un script que se evaluará en uno de los siguientes escenarios:

- Siempre que se navegue por la página.
- Siempre que el marco secundario esté adjunto o se navegue. En este caso, el script se evalúa en
  el contexto del marco recién adjunto.

El script se evalúa después de que se crea el documento pero antes de que se ejecute cualquiera de sus scripts.
Para eliminar el script de inicialización de la página nuevamente, llame a la función que
devolvió esta función.

Esto es útil para modificar el entorno JavaScript, por ejemplo, para sembrar Math.random.

##### Uso

```js
browser.addInitScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>`Function`</td>
      <td>función que se inyectará como script de inicialización</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>`number, string, boolean`</td>
      <td>parámetros para el script</td>
    </tr>
  </tbody>
</table>

##### Ejemplos

```js title="addInitScript.js"
const script = await browser.addInitScript((seed) => {
    Math.random = () => seed
}, 42)

await browser.url('https://webdriver.io')
console.log(await browser.execute(() => Math.random())) // returns 42

await reset()
await browser.url('https://webdriver.io')
console.log(await browser.execute(() => Math.random())) // returns a random number

hermore you can also use the `emit` function to send data back to the Node.js environment.
 is useful if you want to observe certain events in the browser environment, e.g.:

```

```js title="addInitScriptWithEmit.js"
const script = await browser.addInitScript((emit) => {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      emit(mutation.target.nodeName)
    }
  })
  observer.observe(document, { childList: true, subtree: true })
})

script.on('data', (data) => {
  console.log(data) // prints: BODY, DIV, P, ...
})
```