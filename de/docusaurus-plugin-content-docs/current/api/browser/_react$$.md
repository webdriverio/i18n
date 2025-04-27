---
id: react$$
title: react$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/react$$.ts
---

Der Befehl `react$$` ist ein nützlicher Befehl, um mehrere React-Komponenten nach ihrem tatsächlichen Namen abzufragen und sie nach Props und State zu filtern.

:::info

Der Befehl funktioniert nur mit Anwendungen, die React v16.x verwenden. Lesen Sie mehr über React-Selektoren im [Selektoren](/docs/selectors#react-selectors) Leitfaden.

:::

##### Verwendung

```js
browser.react$$(selector, { props, state })
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>selector</var></code></td>
      <td>`string`</td>
      <td>der React-Komponente</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>React-Selektor-Optionen</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Object`</td>
      <td>React-Props, die das Element enthalten sollte</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>React-State, in dem sich das Element befinden sollte</td>
    </tr>
  </tbody>
</table>

##### Beispiel

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

##### Gibt zurück

- **&lt;WebdriverIO.ElementArray&gt;**
