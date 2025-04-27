---
id: uploadFile
title: फ़ाइल अपलोड करें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/uploadFile.ts
---

Selenium Standalone सर्वर या अन्य ब्राउज़र ड्राइवर (जैसे Chromedriver या EdgeDriver) पर [`file`](https://webdriver.io/docs/api/selenium#file) कमांड का उपयोग करके फ़ाइल अपलोड करता है।
_नोट:_ यह कमांड केवल तभी समर्थित है जब आप Selenium Hub, Chromedriver या EdgeDriver का सीधे उपयोग करते हैं।

__नोट:__ यह कमांड एक अनौपचारिक प्रोटोकॉल सुविधा का उपयोग करती है जो वर्तमान में केवल Chrome में और [Selenium Grid](https://www.selenium.dev/documentation/en/grid/) चलाते समय समर्थित है।

##### उपयोग

```js
browser.uploadFile(localPath)
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>localPath</var></code></td>
      <td>`string`</td>
      <td>फ़ाइल का स्थानीय पथ</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

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

##### रिटर्न

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  रिमोट URL