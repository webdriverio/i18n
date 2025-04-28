---
id: downloadFile
title: downloadFile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/downloadFile.ts
---

Ladda ner en fil från fjärrdatorn som kör Selenium-noden till det lokala filsystemet
genom att använda kommandot [`downloadFile`](https://webdriver.io/docs/api/selenium#downloadFile).

:::info
Observera att detta kommando endast stöds om du använder ett
[Selenium Grid](https://www.selenium.dev/documentation/en/grid/) med Chrome, Edge eller Firefox
och har flaggan `se:downloadsEnabled` inställd i capabilities.
:::

##### Användning

```js
browser.downloadFile(fileName, targetDirectory)
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
      <td><code><var>fileName</var></code></td>
      <td>`string`</td>
      <td>fjärrsökväg till fil</td>
    </tr>
    <tr>
      <td><code><var>targetDirectory</var></code></td>
      <td>`string`</td>
      <td>målplats på lokal dator</td>
    </tr>
  </tbody>
</table>