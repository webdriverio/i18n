---
id: uploadFile
title: கோப்பை பதிவேற்று
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/uploadFile.ts
---

Uploads a file to the Selenium Standalone server or other browser driver
(e.g. Chromedriver or EdgeDriver) by using the [`file`](https://webdriver.io/docs/api/selenium#file) command.
_Note:_ that this command is only supported if you use a Selenium Hub,
Chromedriver or EdgeDriver directly.

__Note:__ this command uses an un-official protocol feature that is currently
only supported in Chrome and when running a [Selenium Grid](https://www.selenium.dev/documentation/en/grid/).

##### Usage

```js
browser.uploadFile(localPath)
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
      <td><code><var>localPath</var></code></td>
      <td>`string`</td>
      <td>கோப்பின் உள்ளூர் பாதை</td>
    </tr>
  </tbody>
</table>

##### Example

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

##### Returns

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  தொலைநிலை URL