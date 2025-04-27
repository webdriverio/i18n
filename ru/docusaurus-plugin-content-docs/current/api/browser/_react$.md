---
id: react$
title: react$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/react$.ts
---

Команда `react$` - это полезная команда для поиска React компонентов по их 
фактическому имени и фильтрации их по props и state.

:::info

Команда работает только с приложениями, использующими React v16.x. Подробнее о селекторах React 
читайте в руководстве [Селекторы](/docs/selectors#react-selectors).

:::

##### Использование

```js
browser.react$(selector, { props, state })
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
      <td>React компонента</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`ReactSelectorOptions`</td>
      <td>Опции селектора React</td>
    </tr>
    <tr>
      <td><code><var>options.props</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`Object`</td>
      <td>React props, которые должен содержать элемент</td>
    </tr>
    <tr>
      <td><code><var>options.state</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`Array<any>, number, string, object, boolean`</td>
      <td>React state, в котором должен быть элемент</td>
    </tr>
  </tbody>
</table>

##### Пример

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

    console.log(await $('.component-display').getText()); // выводит "42"
});
```

##### Возвращает

- **&lt;WebdriverIO.Element&gt;**