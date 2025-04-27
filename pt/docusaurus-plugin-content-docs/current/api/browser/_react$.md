---
id: react$
title: react$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/react$.ts
---

O comando `react$` é um comando útil para consultar Componentes React pelo seu
nome real e filtrá-los por props e state.

:::info

O comando funciona apenas com aplicações usando React v16.x. Leia mais sobre seletores React
no guia de [Seletores](/docs/selectors#react-selectors).

:::

##### Uso

```js
browser.react$(selector, { props, state })
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
      <td>`string`</td>
      <td>do componente React</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>Opções do seletor React</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Object`</td>
      <td>Props React que o elemento deve conter</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>Estado React em que o elemento deve estar</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="pause.js"
it('should calculate 7 * 6', async () => {
    await browser.url('https://ahfarmer.github.io/calculator/');
    const appWrapper = await $('div#root')

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

    console.log(await $('.component-display').getText()); // prints "42"
});
```

##### Retorna

- **&lt;WebdriverIO.Element&gt;**