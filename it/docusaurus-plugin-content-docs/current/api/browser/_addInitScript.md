---
id: addInitScript
title: addInitScript
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addInitScript.ts
---

Aggiunge uno script che verrà valutato in uno dei seguenti scenari:

- Ogni volta che si naviga nella pagina.
- Ogni volta che un frame figlio viene collegato o navigato. In questo caso, lo script viene valutato
  nel contesto del frame appena collegato.

Lo script viene valutato dopo che il documento è stato creato ma prima che qualsiasi script sia stato eseguito.
Per rimuovere nuovamente lo script di inizializzazione dalla pagina, chiamare la funzione che è stata
restituita da questa funzione.

Questo è utile per modificare l'ambiente JavaScript, ad esempio per inizializzare Math.random.

##### Utilizzo

```js
browser.addInitScript(script, args)
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>script</var></code></td>
      <td>`Function`</td>
      <td>funzione da iniettare come script di inizializzazione</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>`number, string, boolean`</td>
      <td>parametri per lo script</td>
    </tr>
  </tbody>
</table>

##### Esempi

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