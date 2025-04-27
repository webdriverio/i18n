---
id: switchWindow
title: switchWindow
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchWindow.ts
---

Переключение фокуса на определенную вкладку / окно.

##### Использование

```js
browser.switchWindow(matcher)
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>matcher</var></code></td>
      <td>`String, RegExp`</td>
      <td>Строка или регулярное выражение, которое соответствует заголовку страницы, URL, имени окна или идентификатору окна</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="switchWindow.js"
it('should switch to another window', async () => {
    // open url
    await browser.url('https://google.com')

    // get window handle
    const handle = await browser.getWindowHandle()

    // create new window
    await browser.newWindow('https://webdriver.io')

    // switch back via url match
    await browser.switchWindow('google.com')

    // switch back via title match
    await browser.switchWindow('Next-gen browser and mobile automation test framework for Node.js')

    // switch back via window handle
    await browser.switchWindow(handle)
});
```