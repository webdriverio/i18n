---
id: addInitScript
title: addInitScript
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addInitScript.ts
---

Lägger till ett skript som utvärderas i ett av följande scenarier:

- När sidan navigeras.
- När en underram kopplas eller navigeras. I detta fall utvärderas skriptet i
  sammanhanget av den nyligen kopplade ramen.

Skriptet utvärderas efter att dokumentet har skapats men innan något av dess skript har körts.
För att ta bort initialiseringsskriptet från sidan igen, anropa funktionen som returnerades
av denna funktion.

Detta är användbart för att förbättra JavaScript-miljön, t.ex. för att så Math.random.

##### Användning

```js
browser.addInitScript(script, args)
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>script</var></code></td>
      <td>`Function`</td>
      <td>funktion som ska injiceras som initialiseringsskript</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>`number, string, boolean`</td>
      <td>parametrar för skriptet</td>
    </tr>
  </tbody>
</table>

##### Exempel

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