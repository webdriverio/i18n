---
id: setTimeout
title: setTimeout
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setTimeout.ts
---

Define os tempos limite associados à sessão atual, as durações de tempo limite controlam comportamentos
como tempo limite na injeção de scripts, navegação de documentos e recuperação de elementos.
Para mais informações e exemplos, consulte o [guia de timeouts](https://webdriver.io/docs/timeouts#selenium-timeouts).

:::info

Não é recomendado definir timeouts `implicit` pois eles afetam o comportamento do WebdriverIO
e podem causar erros em certos comandos, por exemplo, `waitForExist` com flag reversa.

:::

##### Uso

```js
browser.setTimeout({ implicit, pageLoad, script })
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
      <td><code><var>timeouts</var></code></td>
      <td>`Timeouts`</td>
      <td>Objeto contendo valores de tempo limite da sessão</td>
    </tr>
    <tr>
      <td><code><var>timeouts.implicit</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>Tempo em milissegundos para repetir a estratégia de localização de elemento ao encontrar um elemento.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.pageLoad</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>Tempo em milissegundos para aguardar que o documento termine de carregar.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.script</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>Scripts injetados com [`execute`](https://webdriver.io/docs/api/browser/execute) ou [`executeAsync`](https://webdriver.io/docs/api/browser/executeAsync) serão executados até atingirem a duração do tempo limite do script, também fornecida em milissegundos.</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="setTimeout.js"
it('should change timeout duration for session with long code duration', async () => {
    await browser.setTimeout({
        'pageLoad': 10000,
        'script': 60000
    });
    // Execute code which takes a long time
    await browser.executeAsync((done) => {
        console.log('Wake me up before you go!');
        setTimeout(done, 59000);
    });
});
```