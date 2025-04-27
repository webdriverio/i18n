---
id: switchFrame
title: switchFrame
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchFrame.ts
---

Alterna o contexto ativo para um frame, por exemplo, um iframe na página. Existem várias maneiras de consultar um frame
na página:

  - Se for fornecida uma string, ele muda para o frame com um id de contexto correspondente, url ou url que contenha essa string
    ```ts
    // muda para um frame que tem uma url específica ou contém uma string na url
    await browser.url('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe')
    // Nota: este frame está localizado em um iframe aninhado, no entanto, você só precisa fornecer
    // a url do frame do seu frame desejado
    await browser.switchFrame('https://www.w3schools.com')
    // verifica o título da página
    console.log(await browser.execute(() => [document.title, document.URL]))
    // saída: [ 'W3Schools Online Web Tutorials', 'https://www.w3schools.com/' ]
    ```

  - Se você tiver o id de contexto do frame, pode usá-lo diretamente
    ```ts
    // muda para um frame que tem um certo id de contexto
    await browser.switchFrame('A5734774C41F8C91D483BDD4022B2EF3')
    ```

  - Se for fornecido um elemento WebdriverIO que referencia um elemento `iframe`, ele mudará para esse frame
    ```ts
    // muda para um elemento de frame consultado do contexto atual
    await browser.switchFrame($('iframe'))
    ```

  - Se for fornecida uma função, ela percorrerá todos os iframes na página e chamará a função dentro do objeto
    de contexto. A função deve retornar um booleano indicando se o frame deve ser selecionado. A função
    será executada dentro do navegador e permite acesso a todas as APIs Web, por exemplo:
    ```ts
    // muda para o primeiro frame que contém um elemento com id "#frameContent"
    await browser.switchFrame(() => Boolean(document.querySelector('#frameContent')))
    // muda para o primeiro frame que contém "webdriver" na URL
    await browser.switchFrame(() => document.URL.includes('webdriver'))
    ```

  - Se for fornecido `null`, ele mudará para o frame de nível superior
    ```ts
    // primeiro muda para um frame
    await browser.switchFrame($('iframe'))
    // faz mais automação dentro desse frame, então...

    // muda para o frame de nível superior
    await browser.switchFrame(null)
    ```

Depois de mudar para um frame, todos os comandos subsequentes serão executados no contexto desse frame,
incluindo a navegação para páginas diferentes.

##### Uso

```js
browser.switchFrame(context)
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
      <td><code><var>context</var></code></td>
      <td>`string, object, function`</td>
      <td></td>
    </tr>
  </tbody>
</table>

##### Retorna

- **&lt;`Promise<string>`&gt;**
            **<code><var>returns</var></code>:**  o id do contexto ativo atual