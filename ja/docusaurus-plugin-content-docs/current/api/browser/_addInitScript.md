---
id: addInitScript
title: 初期化スクリプトの追加
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addInitScript.ts
---

Adds a script which would be evaluated in one of the following scenarios:

- Whenever the page is navigated.
- Whenever the child frame is attached or navigated. In this case, the script is evaluated in
  the context of the newly attached frame.

The script is evaluated after the document was created but before any of its scripts were run.
In order to remove the initialization script from the page again, call the function that got
returned by this function.

This is useful to amend the JavaScript environment, e.g. to seed Math.random.

##### Usage

```js
browser.addInitScript(script, args)
```

##### Parameters

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
      <td>function to be injected as initialization script</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>`number, string, boolean`</td>
      <td>parameters for the script</td>
    </tr>
  </tbody>
</table>

##### Examples

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