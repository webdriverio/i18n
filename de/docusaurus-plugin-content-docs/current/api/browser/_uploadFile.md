---
id: uploadFile
title: uploadFile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/uploadFile.ts
---

Lädt eine Datei auf den Selenium Standalone Server oder einen anderen Browser-Treiber
(z.B. Chromedriver oder EdgeDriver) hoch, indem der [`file`](https://webdriver.io/docs/api/selenium#file) Befehl verwendet wird.
_Hinweis:_ Dieser Befehl wird nur unterstützt, wenn Sie einen Selenium Hub,
Chromedriver oder EdgeDriver direkt verwenden.

__Hinweis:__ Dieser Befehl verwendet eine inoffizielle Protokollfunktion, die derzeit
nur in Chrome und bei der Ausführung eines [Selenium Grid](https://www.selenium.dev/documentation/en/grid/) unterstützt wird.

##### Verwendung

```js
browser.uploadFile(localPath)
```

##### Parameter

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
      <td>lokaler Pfad zur Datei</td>
    </tr>
  </tbody>
</table>

##### Beispiel

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

##### Rückgabewert

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  Remote-URL