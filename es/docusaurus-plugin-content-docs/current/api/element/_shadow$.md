---
id: shadow$
title: shadow$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$.ts
---

Accede a un elemento dentro del shadowRoot de un elemento dado. Si estás trabajando
con muchos shadow roots anidados, un enfoque alternativo a `shadow$` es
utilizar el [selector profundo](https://webdriver.io/docs/selectors#deep-selectors).

:::info

WebdriverIO atraviesa automáticamente los shadow roots cuando se utilizan los comandos `$` o `$$`.
Este comando solo es necesario si automatizas en un entorno que no
soporta WebDriver Bidi todavía, por ejemplo, pruebas web móviles con Appium.

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
      <td>selector o función JS para obtener un elemento determinado</td>
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