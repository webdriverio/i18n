---
id: shadow$
title: shadow$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$.ts
---

Доступ до елемента всередині тіньового DOM (shadowRoot) даного елемента. Якщо ви працюєте 
з багатьма вкладеними тіньовими коренями, альтернативний підхід до `shadow$` — це 
використання [глибоких селекторів](https://webdriver.io/docs/selectors#deep-selectors).

:::info

WebdriverIO автоматично проникає через тіньові корені при використанні команд `$` або `$$`.
Ця команда потрібна лише якщо ви автоматизуєте в середовищі, яке ще не 
підтримує WebDriver Bidi, наприклад, тестування мобільного веб з Appium.

:::

##### Usage

```js
$(selector).shadow$(selector)
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
it('should return an element inside a shadowRoot', async () => {
    const innerEl = await $('custom-component').shadow$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### Returns

- **&lt;WebdriverIO.Element&gt;**