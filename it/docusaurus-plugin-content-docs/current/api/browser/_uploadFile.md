---
id: uploadFile
title: uploadFile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/uploadFile.ts
---

Carica un file sul server Selenium Standalone o su altri driver di browser
(ad esempio Chromedriver o EdgeDriver) utilizzando il comando [`file`](https://webdriver.io/docs/api/selenium#file).
_Nota:_ questo comando è supportato solo se si utilizza un Selenium Hub,
Chromedriver o EdgeDriver direttamente.

__Nota:__ questo comando utilizza una funzionalità di protocollo non ufficiale che attualmente
è supportata solo in Chrome e quando si esegue un [Selenium Grid](https://www.selenium.dev/documentation/en/grid/).

##### Utilizzo

```js
browser.uploadFile(localPath)
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>localPath</var></code></td>
      <td>`string`</td>
      <td>percorso locale del file</td>
    </tr>
  </tbody>
</table>

##### Esempio

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

##### Restituisce

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  URL remoto    