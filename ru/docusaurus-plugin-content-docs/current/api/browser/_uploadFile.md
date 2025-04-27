---
id: uploadFile
title: Загрузка файла
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/uploadFile.ts
---

Загружает файл на сервер Selenium Standalone или другой драйвер браузера
(например, Chromedriver или EdgeDriver) с помощью команды [`file`](https://webdriver.io/docs/api/selenium#file).
_Примечание:_ эта команда поддерживается только если вы используете Selenium Hub,
Chromedriver или EdgeDriver напрямую.

__Примечание:__ эта команда использует неофициальную функцию протокола, которая в настоящее время
поддерживается только в Chrome и при запуске [Selenium Grid](https://www.selenium.dev/documentation/en/grid/).

##### Использование

```js
browser.uploadFile(localPath)
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>localPath</var></code></td>
      <td>`string`</td>
      <td>локальный путь к файлу</td>
    </tr>
  </tbody>
</table>

##### Пример

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

##### Возвращает

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  удаленный URL