---
id: addInitScript
title: addInitScript
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addInitScript.ts
---

Dodaje skrypt, który zostanie uruchomiony w jednym z poniższych scenariuszy:

- Za każdym razem, gdy strona jest nawigowana.
- Za każdym razem, gdy ramka podrzędna jest dołączana lub nawigowana. W tym przypadku skrypt jest wykonywany
  w kontekście nowo dołączonej ramki.

Skrypt jest wykonywany po utworzeniu dokumentu, ale przed uruchomieniem jakichkolwiek jego skryptów.
Aby ponownie usunąć skrypt inicjalizacyjny ze strony, wywołaj funkcję, która została
zwrócona przez tę funkcję.

Jest to przydatne do modyfikacji środowiska JavaScript, np. do ustawienia wartości początkowej Math.random.

##### Użycie

```js
browser.addInitScript(script, args)
```

##### Parametry

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
      <td>funkcja, która ma być wstrzyknięta jako skrypt inicjalizacyjny</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>`number, string, boolean`</td>
      <td>parametry dla skryptu</td>
    </tr>
  </tbody>
</table>

##### Przykłady

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