---
id: addInitScript
title: addInitScript
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addInitScript.ts
---

Добавляет скрипт, который будет выполняться в одном из следующих сценариев:

- При каждой навигации по странице.
- При подключении или навигации дочернего фрейма. В этом случае скрипт выполняется в
  контексте вновь подключенного фрейма.

Скрипт выполняется после создания документа, но до запуска любых его скриптов.
Чтобы удалить скрипт инициализации со страницы, вызовите функцию, которая была
возвращена этой функцией.

Это полезно для изменения среды JavaScript, например, для инициализации Math.random.

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
      <td>функция, внедряемая как скрипт инициализации</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>`number, string, boolean`</td>
      <td>параметры для скрипта</td>
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