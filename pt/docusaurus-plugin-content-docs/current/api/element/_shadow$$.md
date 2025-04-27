---
id: shadow$$
title: shadow$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$$.ts
---

Acessa elementos dentro do shadowRoot de um elemento específico. Se você estiver trabalhando 
com muitos shadow roots aninhados, uma abordagem alternativa ao `shadow$$` 
é usar o [seletor deep](https://webdriver.io/docs/selectors#deep-selectors).

:::info

O WebdriverIO penetra automaticamente através de shadow roots ao usar comandos `$` ou `$$`.
Este comando só é necessário se você automatizar em um ambiente que não 
suporta WebDriver Bidi ainda, por exemplo, testes web mobile com Appium.

:::

##### Uso

```js
$(selector).shadow$$(selector)
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
      <td><code><var>selector</var></code></td>
      <td>`String, Function`</td>
      <td>seletor ou Função JS para buscar um elemento específico</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="shadow$$.js"
it('should return elements inside a shadowRoot', async () => {
    const innerEl = await $('.input').shadow$$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### Retorna

- **&lt;WebdriverIO.ElementArray&gt;**