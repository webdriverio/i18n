---
id: shadow$
title: shadow$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$.ts
---

Accedi a un elemento all'interno del shadowRoot di un elemento dato. Se stai lavorando
con molti shadow root annidati, un approccio alternativo a `shadow$` è
utilizzare il [selettore deep](https://webdriver.io/docs/selectors#deep-selectors).

:::info

WebdriverIO attraversa automaticamente i shadow root quando utilizzi i comandi `$` o `$$`.
Questo comando è necessario solo se automatizzi in un ambiente che non
supporta ancora WebDriver Bidi, ad esempio nei test web mobile con Appium.

:::

##### Utilizzo

```js
$(selector).shadow$(selector)
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>selector</var></code></td>
      <td>`String, Function`</td>
      <td>selettore o funzione JS per recuperare un determinato elemento</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="shadow$$.js"
it('should return an element inside a shadowRoot', async () => {
    const innerEl = await $('custom-component').shadow$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### Restituisce

- **&lt;WebdriverIO.Element&gt;**