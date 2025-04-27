---
id: uploadFile
title: subirArchivo
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/uploadFile.ts
---

Sube un archivo al servidor Selenium Standalone u otro controlador de navegador
(por ejemplo, Chromedriver o EdgeDriver) utilizando el comando [`file`](https://webdriver.io/docs/api/selenium#file).
_Nota:_ este comando solo es compatible si utilizas un Selenium Hub,
Chromedriver o EdgeDriver directamente.

__Nota:__ este comando utiliza una característica no oficial del protocolo que actualmente
solo es compatible en Chrome y cuando se ejecuta un [Selenium Grid](https://www.selenium.dev/documentation/en/grid/).

##### Uso

```js
browser.uploadFile(localPath)
```

##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>localPath</var></code></td>
      <td>`string`</td>
      <td>ruta local al archivo</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

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

##### Retorna

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  URL remota