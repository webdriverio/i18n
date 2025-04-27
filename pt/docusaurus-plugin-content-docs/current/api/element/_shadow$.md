---
id: shadow$
title: shadow$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$.ts
---

Acessa um elemento dentro do shadowRoot de um elemento específico. Se você está trabalhando
com muitos shadow roots aninhados, uma abordagem alternativa ao `shadow$` é
usar o [seletor deep](https://webdriver.io/docs/selectors#deep-selectors).

:::info

O WebdriverIO automaticamente atravessa os shadow roots quando utiliza os comandos `$` ou `$$`.
Este comando só é necessário se você estiver automatizando em um ambiente que não
suporta WebDriver Bidi ainda, por exemplo, testes de web mobile com Appium.

:::

##### Usage

```js
$(selector).shadow$(selector)
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>selector</var></code></td>
      <td>`String, Function`</td>
      <td>selector or JS Function to fetch a certain element</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="shadow$$.js"
it('should return an element inside a shadowRoot', async () => {
    const innerEl = await $('custom-component').shadow$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### Returns

- **&lt;WebdriverIO.Element&gt;**
    