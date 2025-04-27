---
id: react$
title: react$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/react$.ts
---

Команда `react$` - це корисна команда для запиту React-компонентів за їхньою 
фактичною назвою та фільтрації їх за props і state.

:::info

Команда працює лише з додатками, що використовують React v16.x. Дізнайтеся більше про селектори React 
у посібнику [Селектори](/docs/selectors#react-selectors).

:::

##### Використання

```js
browser.react$(selector, { props, state })
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
      <td>React-компонента</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>Опції селектора React</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>`Object`</td>
      <td>Props React, які має містити елемент</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>React-стан, у якому повинен бути елемент</td>
    </tr>
  </tbody>
</table>

##### Приклад

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

##### Повертає

- **&lt;WebdriverIO.Element&gt;**