---
id: uploadFile
title: uploadFile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/uploadFile.ts
---

Przesyła plik na serwer Selenium Standalone lub inny sterownik przeglądarki
(np. Chromedriver lub EdgeDriver) za pomocą komendy [`file`](https://webdriver.io/docs/api/selenium#file).
_Uwaga:_ ta komenda jest obsługiwana tylko jeśli używasz Selenium Hub,
Chromedriver lub EdgeDriver bezpośrednio.

__Uwaga:__ ta komenda używa nieoficjalnej funkcji protokołu, która jest obecnie
obsługiwana tylko w Chrome i podczas uruchamiania [Selenium Grid](https://www.selenium.dev/documentation/en/grid/).

##### Użycie

```js
browser.uploadFile(localPath)
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>localPath</var></code></td>
      <td>`string`</td>
      <td>lokalna ścieżka do pliku</td>
    </tr>
  </tbody>
</table>

##### Przykład

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

##### Zwraca

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  zdalny URL