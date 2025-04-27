---
id: shadow$$
title: shadow$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$$.ts
---

Доступ до елементів всередині shadowRoot даного елемента. Якщо ви працюєте
з великою кількістю вкладених тіньових коренів, альтернативним підходом до `shadow$$`
є використання [глибокого селектора](https://webdriver.io/docs/selectors#deep-selectors).

:::info

WebdriverIO автоматично проникає через тіньові корені при використанні команд `$` або `$$`.
Ця команда потрібна тільки якщо ви автоматизуєте у середовищі, яке не
підтримує WebDriver Bidi, наприклад, мобільне веб-тестування з Appium.

:::

##### Usage

```js
$(selector).shadow$$(selector)
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
      <td>`String, Function`</td>
      <td>selector or JS Function to fetch a certain element</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="shadow$$.js"
it('should return elements inside a shadowRoot', async () => {
    const innerEl = await $('.input').shadow$$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### Returns

- **&lt;WebdriverIO.ElementArray&gt;**