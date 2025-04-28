---
id: uploadFile
title: uploadFile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/uploadFile.ts
---

Laddar upp en fil till Selenium Standalone-servern eller annan webbläsardrivrutin
(t.ex. Chromedriver eller EdgeDriver) genom att använda [`file`](https://webdriver.io/docs/api/selenium#file)-kommandot.
_Observera:_ att detta kommando endast stöds om du använder en Selenium Hub,
Chromedriver eller EdgeDriver direkt.

__Observera:__ detta kommando använder en inofficiell protokollfunktion som för närvarande
endast stöds i Chrome och när du kör ett [Selenium Grid](https://www.selenium.dev/documentation/en/grid/).

##### Användning

```js
browser.uploadFile(localPath)
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>localPath</var></code></td>
      <td>`string`</td>
      <td>lokal sökväg till fil</td>
    </tr>
  </tbody>
</table>

##### Exempel

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

##### Returnerar

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  fjärr-URL