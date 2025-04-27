---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/execute.ts
---

Injeta um trecho de JavaScript na página para execução no contexto do frame atualmente selecionado
usando o elemento fornecido como escopo, porque está no escopo do elemento, significa que o WebdriverIO irá
automaticamente esperar que o elemento exista antes de executar o script.
Assume-se que o script executado seja síncrono e o resultado da avaliação do script é retornado ao
cliente.

O argumento script define o script a ser executado na forma de um corpo de função. O valor retornado por
essa função será retornado ao cliente. A função será invocada com o array de args fornecido
e os valores podem ser acessados através do objeto arguments na ordem especificada.

Os argumentos podem ser qualquer JSON-primitivo, array ou objeto JSON. Objetos JSON que definem uma referência WebElement
serão convertidos para o elemento DOM correspondente. Da mesma forma, qualquer WebElement no resultado
do script será retornado ao cliente como objetos JSON WebElement.

##### Uso

```js
$(selector).execute(script, arguments)
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

```js title="execute.js"
it('should wait for the element to exist, then executes javascript on the page with the element as first argument', async () => {
    const text = await $('div').execute((elem, a, b, c, d) => {
        return elem.textContent + a + b + c + d
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### Retorna

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              O resultado do script.