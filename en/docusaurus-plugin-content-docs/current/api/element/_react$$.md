---
id: react$$
title: react$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/react$$.ts
---

The `react$$` command is a useful command to query multiple React Components
by their actual name and filter them by props and state.

:::info

The command only works with applications using React v16.x. Read more about React
selectors in the [Selectors](/docs/selectors#react-selectors) guide.

:::

##### Usage

```js
$(selector).react$$(selector, { props, state })
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>selector</var></code></td>
      <td>`string`</td>
      <td>of React component</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>React selector options</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Object`</td>
      <td>React props the element should contain</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>React state the element should be in</td>
    </tr>
  </tbody>
</table>

##### Example

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

##### Returns

- **&lt;WebdriverIO.ElementArray&gt;**
    

