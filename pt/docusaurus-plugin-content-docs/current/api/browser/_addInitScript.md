---
id: addInitScript
title: addInitScript
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addInitScript.ts
---

Adiciona um script que seria avaliado em um dos seguintes cenários:

- Sempre que a página é navegada.
- Sempre que o frame filho é anexado ou navegado. Nesse caso, o script é avaliado no
  contexto do frame recém-anexado.

O script é avaliado após a criação do documento, mas antes que qualquer um de seus scripts seja executado.
Para remover o script de inicialização da página novamente, chame a função que foi
retornada por esta função.

Isso é útil para modificar o ambiente JavaScript, por exemplo, para alimentar o Math.random.

##### Uso

```js
browser.addInitScript(script, args)
```

##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>script</var></code></td>
      <td>`Function`</td>
      <td>função a ser injetada como script de inicialização</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>`number, string, boolean`</td>
      <td>parâmetros para o script</td>
    </tr>
  </tbody>
</table>

##### Exemplos

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