---
id: uploadFile
title: uploadFile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/uploadFile.ts
---

[`file`](https://webdriver.io/docs/api/selenium#file)コマンドを使用して、ファイルをSelenium Standaloneサーバーまたは他のブラウザドライバー（例：ChromedriverやEdgeDriver）にアップロードします。
_注意:_ このコマンドは、Selenium HubやChromedriver、EdgeDriverを直接使用している場合にのみサポートされています。

__注意:__ このコマンドは非公式のプロトコル機能を使用しており、現在のところChrome環境および[Selenium Grid](https://www.selenium.dev/documentation/en/grid/)を実行している場合にのみサポートされています。

##### 使用方法

```js
browser.uploadFile(localPath)
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
      <td><code><var>localPath</var></code></td>
      <td>`string`</td>
      <td>ファイルのローカルパス</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="uploadFile.js"
import path from 'node:path'

it('should upload a file', async () => {
    await browser.url('https://the-internet.herokuapp.com/upload')

    const filePath = '/path/to/some/file.png'
    const remoteFilePath = await browser.uploadFile(filePath)

    await $('#file-upload').setValue(remoteFilePath)
    await $('#file-submit').click()
});
```

##### 戻り値

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  リモートURL