---
id: keys
title: teclas
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/keys.ts
---

Envie uma sequência de pressionamentos de teclas para o elemento "ativo". Você pode tornar um elemento de entrada ativo apenas clicando
nele. Para usar caracteres como "Seta para a esquerda" ou "Backspace", importe o objeto `Key` do pacote WebdriverIO.

Modificadores como `Control`, `Shift`, `Alt` e `Command` permanecerão pressionados, então você precisa acioná-los novamente para
liberá-los. No entanto, modificar um clique requer que você use a API de Ações do WebDriver através do método
[performActions](https://webdriver.io/docs/api/webdriver#performactions).

:::info

As teclas de controle diferem com base no sistema operacional em que o navegador está sendo executado, por exemplo, MacOS: `Command` e Windows: `Control`.
O WebdriverIO fornece uma tecla de controle modificadora compatível com diferentes navegadores chamada `Ctrl` (veja o exemplo abaixo).

:::

##### Uso

```js
browser.keys(value)
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
      <td><code><var>value</var></code></td>
      <td>`String, String[]`</td>
      <td>A sequência de teclas a serem digitadas. Um array ou string deve ser fornecido.</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js reference title="keys.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/355434bdef13d29608d6d5fbfbeaa034c8a2aa74/keys/keys.js#L1-L17
```