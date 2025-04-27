---
id: react$$
title: react$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/react$$.ts
---

Команда `react$$` - это полезная команда для запроса нескольких React-компонентов 
по их фактическому имени и фильтрации их по props и state.

:::info

Команда работает только с приложениями, использующими React v16.x. Узнайте больше о селекторах React 
в руководстве [Селекторы](/docs/selectors#react-selectors).

:::

##### Использование

```js
$(selector).react$$(selector, { props, state })
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>selector</var></code></td>
      <td>`string`</td>
      <td>React-компонента</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>Опции селектора React</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Object`</td>
      <td>React props, которые должен содержать элемент</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>React state, в котором должен находиться элемент</td>
    </tr>
  </tbody>
</table>

##### Пример

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

##### Возвращает

- **&lt;WebdriverIO.ElementArray&gt;**