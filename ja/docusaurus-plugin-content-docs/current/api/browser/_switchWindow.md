---
id: switchWindow
title: ウィンドウの切り替え
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchWindow.ts
---

特定のタブ／ウィンドウにフォーカスを切り替えます。

##### 使用法

```js
browser.switchWindow(matcher)
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>matcher</var></code></td>
      <td>`String, RegExp`</td>
      <td>ページタイトルまたはURL、ウィンドウ名、またはウィンドウハンドルに一致する文字列または正規表現</td>
    </tr>
  </tbody>
</table>

##### 例

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