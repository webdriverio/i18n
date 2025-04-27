---
id: react$
title: react$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/react$.ts
---

La commande `react$` est une commande utile pour interroger les composants React par leur
nom réel et les filtrer par props et state.

:::info

La commande ne fonctionne qu'avec les applications utilisant React v16.x. Pour en savoir plus sur les sélecteurs React,
consultez le guide des [Sélecteurs](/docs/selectors#react-selectors).

:::

##### Utilisation

```js
$(selector).react$(selector, { props, state })
```

##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>selector</var></code></td>
      <td>`string`</td>
      <td>du composant React</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>Options du sélecteur React</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Object`</td>
      <td>Props React que l'élément doit contenir</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>État React dans lequel l'élément doit être</td>
    </tr>
  </tbody>
</table>

##### Exemple

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

    console.log(await $('.component-display').getText()); // affiche "42"
});
```

##### Retourne

- **&lt;WebdriverIO.Element&gt;**