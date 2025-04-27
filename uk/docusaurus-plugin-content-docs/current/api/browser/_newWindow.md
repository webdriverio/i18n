---
id: newWindow
title: newWindow
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/newWindow.ts
---

Відкриття нового вікна або вкладки у браузері (за замовчуванням відкривається нове вікно, якщо не вказано інше).
Ця команда є еквівалентом функції `window.open()`. Ця команда не працює у мобільних середовищах.

__Примітка:__ При виклику цієї команди ви автоматично перемикаєтесь на нове вікно або вкладку.

##### Usage

```js
browser.newWindow(url, { type, windowName, windowFeatures })
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
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>URL веб-сайту для відкриття</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`NewWindowOptions`</td>
      <td>опції команди newWindow</td>
    </tr>
    <tr>
      <td><code><var>options.type</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>тип нового вікна: 'tab' або 'window'</td>
    </tr>
    <tr>
      <td><code><var>options.windowName</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>назва нового вікна</td>
    </tr>
    <tr>
      <td><code><var>options.windowFeatures</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>особливості відкритого вікна (наприклад, розмір, позиція, смуги прокрутки тощо)</td>
    </tr>
  </tbody>
</table>

##### Examples

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

##### Returns

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**           Об'єкт, що містить ідентифікатор вікна та тип нового вікна `{handle: string, type: string}` handle - ідентифікатор віконного дескриптора нової вкладки або вікна, type - тип нового вікна, 'tab' або 'window'    
##### Throws

- **Error**:  Якщо `url` недійсний, якщо команда використовується на мобільних пристроях, або `type` не є 'tab' або 'window'.