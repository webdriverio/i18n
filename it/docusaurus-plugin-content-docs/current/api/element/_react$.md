---
id: react$
title: react$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/react$.ts
---

Il comando `react$` è un comando utile per interrogare i Componenti React con il loro
nome effettivo e filtrarli per props e state.

:::info

Il comando funziona solo con applicazioni che utilizzano React v16.x. Leggi di più sui selettori React
nella guida [Selectors](/docs/selectors#react-selectors).

:::

##### Utilizzo

```js
$(selector).react$(selector, { props, state })
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
      <td>`string`</td>
      <td>del componente React</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>Opzioni del selettore React</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Object`</td>
      <td>Props React che l'elemento dovrebbe contenere</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>State React in cui l'elemento dovrebbe trovarsi</td>
    </tr>
  </tbody>
</table>

##### Esempio

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

    console.log(await $('.component-display').getText()); // prints "42"
});
```

##### Restituisce

- **&lt;WebdriverIO.Element&gt;**