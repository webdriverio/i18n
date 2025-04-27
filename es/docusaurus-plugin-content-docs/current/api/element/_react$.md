---
id: react$
title: react$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/react$.ts
---

El comando `react$` es un comando útil para consultar Componentes React por su 
nombre real y filtrarlos por props y state.

:::info

El comando solo funciona con aplicaciones que utilizan React v16.x. Lea más sobre los selectores 
React en la guía de [Selectores](/docs/selectors#react-selectors).

:::

##### Uso

```js
$(selector).react$(selector, { props, state })
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
      <td>Opciones del selector React</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Object`</td>
      <td>Props de React que el elemento debería contener</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>Estado de React en el que debería estar el elemento</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="pause.js"
it('should calculate 7 * 6', async () => {
    await browser.url('https://ahfarmer.github.io/calculator/');
    const appWrapper = await browser.$('div#root')

    await browser.react$('t', {
        props: { name: '7' }
    }).click()
    await browser.react$('t', {
        props: { name: 'x' }
    }).click()
    await browser.react$('t', {
        props: { name: '6' }
    }).click()
    await browser.react$('t', {
        props: { name: '=' }
    }).click()

    console.log(await $('.component-display').getText()); // imprime "42"
});
```

##### Devuelve

- **&lt;WebdriverIO.Element&gt;**