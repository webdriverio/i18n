---
id: custom$
title: custom$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/custom$.ts
---

Команда `custom$` позволяет использовать пользовательскую стратегию, объявленную с помощью `browser.addLocatorStrategy`.
Подробнее о пользовательских стратегиях селекторов читайте в [документации по селекторам](../../selectors#custom-selector-strategies).

##### Использование

```js
browser.custom$(strategyName, strategyArguments)
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Подробности</th>
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

##### Примеры

```js reference title="customStrategy.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L2-L11
```

```html reference title="example.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/example.html#L8-L12
```

```js reference title="customStrategy.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L16-L19
```

```js title="example.js"
it('should fetch the project title', async () => {
    await browser.url('https://webdriver.io')
    browser.addLocatorStrategy('myStrat', (selector) => {
        return document.querySelectorAll(selector)
    })

    const projectTitle = await browser.custom$('myStrat', '.projectTitle')

    console.log(await projectTitle.getText()) // WEBDRIVER I/O
})
```

##### Возвращает

- **&lt;WebdriverIO.Element&gt;**