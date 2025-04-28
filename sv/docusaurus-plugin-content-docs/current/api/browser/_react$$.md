---
id: react$$
title: react$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/react$$.ts
---

Kommandot `react$$` är ett användbart kommando för att söka efter flera React-komponenter 
genom deras faktiska namn och filtrera dem efter props och state.

:::info

Kommandot fungerar endast med applikationer som använder React v16.x. Läs mer om React-
väljare i [Selectors](/docs/selectors#react-selectors) guiden.

:::

##### Användning

```js
browser.react$$(selector, { props, state })
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>selector</var></code></td>
      <td>`string`</td>
      <td>av React-komponent</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>React-väljaralternativ</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Object`</td>
      <td>React props som elementet ska innehålla</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>React state som elementet ska vara i</td>
    </tr>
  </tbody>
</table>

##### Exempel

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

##### Returnerar

- **&lt;WebdriverIO.ElementArray&gt;**