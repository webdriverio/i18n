---
id: react$$
title: react$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/react$$.ts
---

Команда `react$$` - це корисна команда для запиту кількох компонентів React за їх фактичною назвою та фільтрації їх за допомогою props і state.

:::info

Команда працює лише з додатками, що використовують React v16.x. Дізнайтеся більше про селектори React у розділі [Селектори](/docs/selectors#react-selectors).

:::

##### Використання

```js
browser.react$$(selector, { props, state })
```

##### Параметри

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
      <td>компонента React</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>Опції селектора React</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Object`</td>
      <td>React props, які повинен містити елемент</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>React state, в якому повинен бути елемент</td>
    </tr>
  </tbody>
</table>

##### Приклад

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

##### Повертає

- **&lt;WebdriverIO.ElementArray&gt;**