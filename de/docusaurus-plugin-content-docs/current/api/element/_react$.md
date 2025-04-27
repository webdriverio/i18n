---
id: react$
title: react$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/react$.ts
---

Der Befehl `react$` ist ein nützlicher Befehl, um React-Komponenten nach ihrem tatsächlichen Namen abzufragen und sie nach Props und State zu filtern.

:::info

Der Befehl funktioniert nur mit Anwendungen, die React v16.x verwenden. Lesen Sie mehr über React-Selektoren im [Selektoren](/docs/selectors#react-selectors) Leitfaden.

:::

##### Verwendung

```js
$(selector).react$(selector, { props, state })
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

##### Gibt zurück

- **&lt;WebdriverIO.Element&gt;**
