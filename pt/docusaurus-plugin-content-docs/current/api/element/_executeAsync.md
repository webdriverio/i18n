---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/executeAsync.ts
---

:::warning
O comando `executeAsync` está obsoleto e será removido em uma versão futura.
Por favor, use o comando `execute` em vez disso, pois ele oferece melhor suporte para
tratamento de erros via `async`/`await`.
:::

Injeta um trecho de JavaScript na página para execução no contexto do frame atualmente selecionado
usando o elemento fornecido como escopo, por estar no escopo do elemento significa que o WebdriverIO irá
automaticamente esperar que o elemento exista antes de executar o script.
Assume-se que o script executado é assíncrono e deve sinalizar que terminou invocando
o callback fornecido, que é sempre fornecido como o argumento final para a função. O valor
para este callback será retornado ao cliente.

Comandos de script assíncronos não podem abranger carregamentos de página. Se um evento de descarregamento for acionado enquanto espera
por um resultado de script, um erro deve ser retornado ao cliente.

O argumento script define o script a ser executado na forma de um corpo de função. A função será
invocada com a matriz de args fornecida e os valores podem ser acessados ​​através do objeto arguments
na ordem especificada. O argumento final sempre será uma função de callback que deve ser invocada
para sinalizar que o script terminou.

Os argumentos podem ser qualquer primitiva JSON, array ou objeto JSON. Objetos JSON que definem uma referência WebElement
serão convertidos no elemento DOM correspondente. Da mesma forma, quaisquer WebElements no resultado
do script serão retornados ao cliente como objetos JSON WebElement.

:::caution

Por favor, use `execute` em vez disso
:::

##### Uso

```js
$(selector).executeAsync(script, arguments)
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
it('should wait for the element to exist, then executes async javascript on the page with the element as first argument', async () => {
    await browser.setTimeout({ script: 5000 })
    const text = await $('div').execute((elem, a, b, c, d) => {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(elem.textContent + a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### Retorna

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              O resultado do script.