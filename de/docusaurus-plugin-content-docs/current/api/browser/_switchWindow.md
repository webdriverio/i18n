---
id: switchWindow
title: switchWindow
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchWindow.ts
---

Wechselt den Fokus zu einem bestimmten Tab / Fenster.

##### Verwendung

```js
browser.switchWindow(matcher)
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>matcher</var></code></td>
      <td>`String, RegExp`</td>
      <td>String oder regulärer Ausdruck, der entweder dem Seitentitel oder der URL, dem Fensternamen oder dem Fensterhandle entspricht</td>
    </tr>
  </tbody>
</table>

##### Beispiel

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
