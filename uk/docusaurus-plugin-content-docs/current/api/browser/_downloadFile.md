---
id: downloadFile
title: downloadFile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/downloadFile.ts
---

Завантажити файл з віддаленого комп'ютера, на якому працює вузол Selenium, до локальної файлової системи
за допомогою команди [`downloadFile`](https://webdriver.io/docs/api/selenium#downloadFile).

:::info
Зверніть увагу, що ця команда підтримується лише якщо ви використовуєте
[Selenium Grid](https://www.selenium.dev/documentation/en/grid/) з Chrome, Edge або Firefox
і маєте встановлений прапорець `se:downloadsEnabled` у capabilities.
:::

##### Використання

```js
browser.downloadFile(fileName, targetDirectory)
```

##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>fileName</var></code></td>
      <td>`string`</td>
      <td>віддалений шлях до файлу</td>
    </tr>
    <tr>
      <td><code><var>targetDirectory</var></code></td>
      <td>`string`</td>
      <td>цільове розташування на локальному комп'ютері</td>
    </tr>
  </tbody>
</table>