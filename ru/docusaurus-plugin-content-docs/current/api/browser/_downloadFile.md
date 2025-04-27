---
id: downloadFile
title: downloadFile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/downloadFile.ts
---

Скачивание файла с удаленного компьютера, на котором запущен узел Selenium, в локальную файловую систему
с использованием команды [`downloadFile`](https://webdriver.io/docs/api/selenium#downloadFile).

:::info
Обратите внимание, что эта команда поддерживается только если вы используете
[Selenium Grid](https://www.selenium.dev/documentation/en/grid/) с Chrome, Edge или Firefox
и у вас установлен флаг `se:downloadsEnabled` в capabilities.
:::

##### Использование

```js
browser.downloadFile(fileName, targetDirectory)
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
      <td><code><var>fileName</var></code></td>
      <td>`string`</td>
      <td>удаленный путь к файлу</td>
    </tr>
    <tr>
      <td><code><var>targetDirectory</var></code></td>
      <td>`string`</td>
      <td>целевое расположение на локальном компьютере</td>
    </tr>
  </tbody>
</table>