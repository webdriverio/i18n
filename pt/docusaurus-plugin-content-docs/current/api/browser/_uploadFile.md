---
id: uploadFile
title: uploadFile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/uploadFile.ts
---

Faz upload de um arquivo para o servidor Selenium Standalone ou outro driver de navegador
(por exemplo, Chromedriver ou EdgeDriver) usando o comando [`file`](https://webdriver.io/docs/api/selenium#file).
_Nota:_ este comando só é suportado se você usar um Selenium Hub,
Chromedriver ou EdgeDriver diretamente.

__Nota:__ este comando usa um recurso de protocolo não oficial que atualmente
só é suportado no Chrome e ao executar um [Selenium Grid](https://www.selenium.dev/documentation/en/grid/).

##### Uso

```js
browser.uploadFile(localPath)
```

##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>localPath</var></code></td>
      <td>`string`</td>
      <td>caminho local para o arquivo</td>
    </tr>
  </tbody>
</table>

##### Exemplo

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
            **<code><var>return</var></code>:** URL remota