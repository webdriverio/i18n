---
id: shadow$$
title: shadow$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$$.ts
---

Acceder a elementos dentro del shadowRoot de un elemento dado. Si estás trabajando
con muchos shadow roots anidados, un enfoque alternativo a `shadow$$`
es usar el [selector deep](https://webdriver.io/docs/selectors#deep-selectors).

:::info

WebdriverIO automáticamente atraviesa los shadow roots cuando se utilizan los comandos `$` o `$$`.
Este comando solo es necesario si automatizas dentro de un entorno que no
soporta WebDriver Bidi todavía, p. ej. pruebas web móviles con Appium.

:::

##### Uso

```js
$(selector).shadow$$(selector)
```

##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>selector</var></code></td>
      <td>`String, Function`</td>
      <td>selector o Función JS para obtener un elemento determinado</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="shadow$$.js"
it('should return elements inside a shadowRoot', async () => {
    const innerEl = await $('.input').shadow$$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### Devuelve

- **&lt;WebdriverIO.ElementArray&gt;**
    