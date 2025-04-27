---
id: uploadFile
title: 上传文件
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/uploadFile.ts
---

通过使用[`file`](https://webdriver.io/docs/api/selenium#file)命令将文件上传到Selenium Standalone服务器或其他浏览器驱动程序（例如Chromedriver或EdgeDriver）。
_注意：_此命令仅在您直接使用Selenium Hub、Chromedriver或EdgeDriver时才受支持。

__注意：__此命令使用的是非官方协议功能，目前仅在Chrome浏览器和运行[Selenium Grid](https://www.selenium.dev/documentation/en/grid/)时支持。

##### 用法

```js
browser.uploadFile(localPath)
```

##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>localPath</var></code></td>
      <td>`string`</td>
      <td>文件的本地路径</td>
    </tr>
  </tbody>
</table>

##### 示例

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

##### 返回

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  远程URL    