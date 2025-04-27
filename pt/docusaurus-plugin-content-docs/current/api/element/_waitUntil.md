---
id: waitUntil
title: waitUntil
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitUntil.ts
---

Este comando de espera é sua arma universal se você deseja esperar por algo. Ele espera uma condição
e aguarda até que essa condição seja cumprida com um valor verdadeiro.

:::info

Ao contrário de outros comandos de elemento, o WebdriverIO não esperará que o elemento exista para executar
este comando.

:::

Um exemplo comum é esperar até que um determinado elemento contenha um certo texto (veja o exemplo).

##### Uso

```js
$(selector).waitUntil(condition, { timeout, timeoutMsg, interval })
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
      <td><code><var>condition</var></code></td>
      <td>`Function`</td>
      <td>condição para aguardar</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`WaitUntilOptions`</td>
      <td>opções do comando</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>tempo em ms (padrão definido com base no valor de configuração [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>mensagem de erro para lançar quando waitUntil atinge o tempo limite</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>intervalo entre verificações de condição (padrão definido com base no valor de configuração [`waitforInterval`](/docs/configuration#waitforinterval))</td>
    </tr>
  </tbody>
</table>

##### Exemplos

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/waitUntilExample.js#L6-L14
```

##### Retorna

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  verdadeiro se a condição for cumprida