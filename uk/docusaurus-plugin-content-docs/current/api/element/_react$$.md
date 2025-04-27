---
id: react$$
title: react$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/react$$.ts
---

Команда `react$$` - це корисна команда для запиту декількох React-компонентів за їх фактичною назвою та фільтрації їх за властивостями та станом.

:::info

Команда працює лише з додатками, що використовують React v16.x. Дізнайтеся більше про селектори React у посібнику [Селектори](/docs/selectors#react-selectors).

:::

##### Використання

```js
$(selector).react$$(selector, { props, state })
```

##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>selector</var></code></td>
      <td>`string`</td>
      <td>React компонента</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>Опції селектора React</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Object`</td>
      <td>React властивості, які має містити елемент</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>React стан, в якому має бути елемент</td>
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