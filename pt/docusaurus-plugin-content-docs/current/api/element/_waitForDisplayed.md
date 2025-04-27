---
id: waitForDisplayed
title: waitForDisplayed
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForDisplayed.ts
---

Aguarde que um elemento seja exibido ou não exibido durante a quantidade de milissegundos fornecida.

:::info

Ao contrário de outros comandos de elemento, o WebdriverIO não esperará que o elemento exista para executar
este comando.

:::

##### Uso

```js
$(selector).waitForDisplayed({ timeout, reverse, timeoutMsg, interval, withinViewport })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`WaitForOptions`</td>
      <td>opções de waitForDisplayed (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>tempo em ms (padrão definido com base no valor de configuração [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>se verdadeiro, espera pelo oposto (padrão: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>se existir, substitui a mensagem de erro padrão</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>intervalo entre verificações (padrão: `waitforInterval`)</td>
    </tr>
    <tr>
      <td><code><var>options.withinViewport</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>defina como `true` para esperar até que o elemento seja exibido dentro da viewport (padrão: `false`)</td>
    </tr>
  </tbody>
</table>

##### Exemplos

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitForDisplayed/index.html#L3-L8
```

```js reference title="waitForDisplayedExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9ac16b4d4cf4bc8ec87f6369439a2d0bcaae4483/waitForDisplayed/waitForDisplayedExample.js#L6-L14
```

##### Retorna

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true    se o elemento estiver exibido (ou não, se a flag estiver definida)