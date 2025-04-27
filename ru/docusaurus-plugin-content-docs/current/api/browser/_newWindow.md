---
id: newWindow
title: newWindow
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/newWindow.ts
---

Открыть новое окно или вкладку в браузере (по умолчанию открывается новое окно, если не указано иное).
Эта команда является эквивалентом функции `window.open()`. Эта команда не работает в мобильных средах.

__Примечание:__ При вызове этой команды вы автоматически переключаетесь на новое окно или вкладку.

##### Использование

```js
browser.newWindow(url, { type, windowName, windowFeatures })
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
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>URL-адрес сайта для открытия</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`NewWindowOptions`</td>
      <td>параметры команды newWindow</td>
    </tr>
    <tr>
      <td><code><var>options.type</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`string`</td>
      <td>тип нового окна: 'tab' или 'window'</td>
    </tr>
    <tr>
      <td><code><var>options.windowName</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`String`</td>
      <td>имя нового окна</td>
    </tr>
    <tr>
      <td><code><var>options.windowFeatures</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`String`</td>
      <td>особенности открытого окна (например, размер, положение, полосы прокрутки и т.д.)</td>
    </tr>
  </tbody>
</table>

##### Примеры

```js title="newWindowSync.js"
it('should open a new window', async () => {
    await browser.url('https://google.com')
    console.log(await browser.getTitle()) // outputs: "Google"

    const result = await browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
    })
    console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
    console.log(result.type) // outputs: "window"
    const handles = await browser.getWindowHandles()
    await browser.switchToWindow(handles[1])
    await browser.closeWindow()
    await browser.switchToWindow(handles[0])
    console.log(await browser.getTitle()) // outputs: "Google"
});

```

```js title="newTabSync.js"
  it('should open a new tab', async () => {
      await browser.url('https://google.com')
      console.log(await browser.getTitle()) // outputs: "Google"

      await browser.newWindow('https://webdriver.io', {
          type:'tab',
          windowName: 'WebdriverIO window',
          windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1',
      })
      console.log(await browser.getTitle()) // outputs: "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
      console.log(result.type) // outputs: "tab"
      const handles = await browser.getWindowHandles()
      await browser.switchToWindow(handles[1])
      await browser.closeWindow()
      await browser.switchToWindow(handles[0])
      console.log(await browser.getTitle()) // outputs: "Google"
 });
```

##### Возвращает

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**           Объект, содержащий дескриптор окна и тип нового окна `{handle: string, type: string}` handle - ID дескриптора окна новой вкладки или окна, type - Тип нового окна, либо 'tab', либо 'window'    
##### Выбрасывает

- **Error**:  Если `url` недействителен, если команда используется на мобильном устройстве или `type` не является 'tab' или 'window'.