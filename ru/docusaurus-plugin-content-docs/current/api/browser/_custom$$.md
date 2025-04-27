---
id: custom$$
title: custom$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/custom$$.ts
---

Метод `customs$$` позволяет использовать пользовательскую стратегию, объявленную с помощью `browser.addLocatorStrategy`.
Подробнее о пользовательских стратегиях селектора читайте в [документации по селекторам](../../selectors#custom-selector-strategies).

##### Использование

```js
browser.custom$$(strategyName, strategyArguments)
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
      <td><code><var>strategyName</var></code></td>
      <td>`string`</td>
      <td></td>
    </tr>
    <tr>
      <td><code><var>strategyArguments</var></code></td>
      <td>`*`</td>
      <td></td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="example.js"
it('should get all the plugin wrapper buttons', async () => {
    await browser.url('https://webdriver.io')
    await browser.addLocatorStrategy('myStrategy', (selector) => {
        return document.querySelectorAll(selector)
    })

    const pluginWrapper = await browser.custom$$('myStrategy', '.pluginWrapper')

    console.log(await pluginWrapper.length) // 4
})
```

##### Возвращает

- **&lt;WebdriverIO.ElementArray&gt;**