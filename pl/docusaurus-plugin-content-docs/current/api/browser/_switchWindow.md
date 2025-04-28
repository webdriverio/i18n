---
id: switchWindow
title: switchWindow
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchWindow.ts
---

Przełącz fokus na określoną kartę / okno.

##### Użycie

```js
browser.switchWindow(matcher)
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>matcher</var></code></td>
      <td>`String, RegExp`</td>
      <td>Ciąg znaków lub wyrażenie regularne, które pasuje do tytułu strony lub adresu URL, nazwy okna lub identyfikatora okna</td>
    </tr>
  </tbody>
</table>

##### Przykład

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