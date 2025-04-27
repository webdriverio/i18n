---
id: shadow$$
title: shadow$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$$.ts
---

Доступ к элементам внутри shadowRoot данного элемента. Если вы работаете 
с множеством вложенных теневых корней (shadow roots), альтернативным подходом к `shadow$$` 
является использование [глубокого селектора](https://webdriver.io/docs/selectors#deep-selectors).

:::info

WebdriverIO автоматически проникает через теневые корни при использовании команд `$` или `$$`.
Эта команда нужна только если вы автоматизируете в среде, которая еще 
не поддерживает WebDriver Bidi, например, при тестировании мобильного веба с Appium.

:::

##### Использование

```js
$(selector).shadow$$(selector)
```

##### Параметры

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

##### Пример

```js title="shadow$$.js"
it('should return elements inside a shadowRoot', async () => {
    const innerEl = await $('.input').shadow$$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### Возвращает

- **&lt;WebdriverIO.ElementArray&gt;**