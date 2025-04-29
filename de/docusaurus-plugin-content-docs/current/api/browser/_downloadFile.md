---
id: downloadFile
title: downloadFile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/downloadFile.ts
---

Laden Sie eine Datei vom entfernten Computer, auf dem Selenium-Node läuft, auf das lokale Dateisystem herunter, indem Sie den Befehl [`downloadFile`](https://webdriver.io/docs/api/selenium#downloadFile) verwenden.

:::info
Beachten Sie, dass dieser Befehl nur unterstützt wird, wenn Sie ein
[Selenium Grid](https://www.selenium.dev/documentation/en/grid/) mit Chrome, Edge oder Firefox verwenden
und das Flag `se:downloadsEnabled` in den Capabilities gesetzt haben.
:::

##### Verwendung

```js
browser.downloadFile(fileName, targetDirectory)
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
      <td><code><var>fileName</var></code></td>
      <td>`string`</td>
      <td>Remotepfad zur Datei</td>
    </tr>
    <tr>
      <td><code><var>targetDirectory</var></code></td>
      <td>`string`</td>
      <td>Zielspeicherort auf dem lokalen Computer</td>
    </tr>
  </tbody>
</table>