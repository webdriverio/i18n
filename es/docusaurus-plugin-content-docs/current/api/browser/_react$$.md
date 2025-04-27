---
id: react$$
title: react$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/react$$.ts
---

El comando `react$$` es un comando útil para consultar múltiples Componentes de React por su nombre real y filtrarlos por props y state.

:::info

El comando solo funciona con aplicaciones que utilizan React v16.x. Lea más sobre selectores de React en la guía de [Selectores](/docs/selectors#react-selectors).

:::

##### Uso

```js
browser.react$$(selector, { props, state })
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
      <td>`string`</td>
      <td>del componente React</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>Opciones del selector de React</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Object`</td>
      <td>Props de React que el elemento debe contener</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>Estado de React en el que debe estar el elemento</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="pause.js"
it('should calculate 7 * 6', async () => {
    await browser.url('https://ahfarmer.github.io/calculator/');

    const orangeButtons = await browser.react$$('t', {
        props: { orange: true }
    })
    console.log(await orangeButtons.map((btn) => btn.getText()));
    // prints "[ '÷', 'x', '-', '+', '=' ]"
});
```

##### Devuelve

- **&lt;WebdriverIO.ElementArray&gt;**