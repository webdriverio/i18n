---
id: addInitScript
title: addInitScript
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addInitScript.ts
---

Додає скрипт, який буде виконаний в одному з наступних сценаріїв:

- При кожній навігації по сторінці.
- При кожному прикріпленні або навігації дочірнього фрейму. У цьому випадку скрипт 
  виконується в контексті новоприкріпленого фрейму.

Скрипт виконується після створення документа, але перед запуском будь-яких його скриптів.
Щоб видалити скрипт ініціалізації зі сторінки, викличте функцію, яка була 
повернута цією функцією.

Це корисно для зміни середовища JavaScript, наприклад, для ініціалізації Math.random.

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