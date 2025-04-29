---
id: addInitScript
title: addInitScript
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addInitScript.ts
---

Fügt ein Skript hinzu, das in einem der folgenden Szenarien ausgeführt wird:

- Wann immer die Seite navigiert wird.
- Wann immer ein Unterframe angehängt oder navigiert wird. In diesem Fall wird das Skript
  im Kontext des neu angehängten Frames ausgewertet.

Das Skript wird ausgewertet, nachdem das Dokument erstellt wurde, aber bevor eines seiner Skripte ausgeführt wurde.
Um das Initialisierungsskript wieder von der Seite zu entfernen, rufen Sie die Funktion auf, die von
dieser Funktion zurückgegeben wurde.

Dies ist nützlich, um die JavaScript-Umgebung zu erweitern, z.B. um Math.random zu initialisieren.

##### Verwendung

```js
browser.addInitScript(script, args)
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>script</var></code></td>
      <td>`Function`</td>
      <td>Funktion, die als Initialisierungsskript injiziert werden soll</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>`number, string, boolean`</td>
      <td>Parameter für das Skript</td>
    </tr>
  </tbody>
</table>

##### Beispiele

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