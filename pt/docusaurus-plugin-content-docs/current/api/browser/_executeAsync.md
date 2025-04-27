---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/executeAsync.ts
---

:::warning
O comando `executeAsync` está obsoleto e será removido em uma versão futura.
Por favor, use o comando `execute` em vez disso, pois ele fornece melhor suporte para
tratamento de erros via `async`/`await`.
:::

Injeta um trecho de JavaScript na página para execução no contexto do frame atualmente selecionado.
O script executado é assumido como assíncrono e deve sinalizar que está concluído invocando
o callback fornecido, que é sempre fornecido como o argumento final para a função. O valor
para este callback será retornado ao cliente.

Comandos de script assíncronos não podem abranger carregamentos de página. Se um evento de descarregamento for acionado enquanto espera
por um resultado de script, um erro deve ser retornado ao cliente.

O argumento script define o script a ser executado na forma de um corpo de função. A função será
invocada com o array de args fornecido e os valores podem ser acessados através do objeto arguments
na ordem especificada. O argumento final será sempre uma função de callback que deve ser invocada
para sinalizar que o script terminou.

Os argumentos podem ser qualquer primitiva JSON, array ou objeto JSON. Objetos JSON que definem uma referência WebElement
serão convertidos para o elemento DOM correspondente. Da mesma forma, quaisquer WebElements no resultado
do script serão retornados ao cliente como objetos JSON WebElement.

:::caution

Por favor, use `execute` em vez disso
:::

##### Uso

```js
browser.executeAsync(script, arguments)
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
      <td>`String, Function`</td>
      <td>O script a ser executado.</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`*`</td>
      <td>argumentos do script</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="executeAsync.js"
it('should execute async JavaScript on the page', async () => {
    await browser.setTimeout({ script: 5000 })
    const result = await browser.executeAsync(function(a, b, c, d, done) {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### Retorna

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              O resultado do script.