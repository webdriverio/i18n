---
id: shadow$
title: shadow$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$.ts
---

Доступ к элементу внутри теневого DOM (shadowRoot) данного элемента. Если вы работаете 
с множеством вложенных теневых корней, альтернативой `shadow$` может быть 
использование [глубокого селектора](https://webdriver.io/docs/selectors#deep-selectors).

:::info

WebdriverIO автоматически проникает через теневые корни при использовании команд `$` или `$$`.
Эта команда нужна только если вы автоматизируете в среде, которая еще не 
поддерживает WebDriver Bidi, например, при тестировании мобильных веб-приложений с Appium.

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