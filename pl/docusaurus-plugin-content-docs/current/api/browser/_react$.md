---
id: react$
title: react$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/react$.ts
---

Polecenie `react$` jest przydatnym poleceniem do wyszukiwania komponentów React po ich
rzeczywistej nazwie oraz filtrowania ich według właściwości (props) i stanu (state).

:::info

Polecenie działa tylko z aplikacjami używającymi React v16.x. Przeczytaj więcej o selektorach React
w przewodniku [Selektory](/docs/selectors#react-selectors).

:::

##### Użycie

```js
browser.react$(selector, { props, state })
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>selector</var></code></td>
      <td>`string`</td>
      <td>komponentu React</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>Opcje selektora React</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Object`</td>
      <td>Właściwości React, które powinien zawierać element</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>Stan React, w którym powinien być element</td>
    </tr>
  </tbody>
</table>

##### Przykład

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

##### Zwraca

- **&lt;WebdriverIO.Element&gt;**