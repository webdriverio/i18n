---
id: newWindow
title: newWindow
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/newWindow.ts
---

ブラウザで新しいウィンドウまたはタブを開きます（指定がない場合はデフォルトで新しいウィンドウになります）。
このコマンドは`window.open()`関数と同等です。このコマンドはモバイル環境では動作しません。

__注意:__ このコマンドを呼び出すと、自動的に新しいウィンドウまたはタブに切り替わります。

##### 使用法

```js
browser.newWindow(url, { type, windowName, windowFeatures })
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
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>開くウェブサイトのURL</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`NewWindowOptions`</td>
      <td>newWindowコマンドのオプション</td>
    </tr>
    <tr>
      <td><code><var>options.type</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`string`</td>
      <td>新しいウィンドウのタイプ: 'tab'または'window'</td>
    </tr>
    <tr>
      <td><code><var>options.windowName</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`String`</td>
      <td>新しいウィンドウの名前</td>
    </tr>
    <tr>
      <td><code><var>options.windowFeatures</var></code><br /><span className="label labelWarning">オプション</span></td>
      <td>`String`</td>
      <td>開いたウィンドウの特性（サイズ、位置、スクロールバーなど）</td>
    </tr>
  </tbody>
</table>

##### 例

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

##### 戻り値

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**           ウィンドウハンドルと新しいウィンドウのタイプを含むオブジェクト `{handle: string, type: string}` handle - 新しいタブまたはウィンドウのウィンドウハンドルのID、type - 新しいウィンドウのタイプ、'tab'または'window'のいずれか    
##### 例外

- **Error**:  `url`が無効な場合、コマンドがモバイルで使用された場合、または`type`が'tab'または'window'でない場合。