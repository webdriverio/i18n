---
id: downloadFile
title: downloadFile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/downloadFile.ts
---

Pobierz plik z komputera zdalnego obsługującego węzeł Selenium do lokalnego systemu plików
za pomocą polecenia [`downloadFile`](https://webdriver.io/docs/api/selenium#downloadFile).

:::info
Zauważ, że to polecenie jest obsługiwane tylko wtedy, gdy używasz
[Selenium Grid](https://www.selenium.dev/documentation/en/grid/) z Chrome, Edge lub Firefox
i masz ustawioną flagę `se:downloadsEnabled` w capabilities.
:::

##### Użycie

```js
browser.downloadFile(fileName, targetDirectory)
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
      <td><code><var>fileName</var></code></td>
      <td>`string`</td>
      <td>zdalna ścieżka do pliku</td>
    </tr>
    <tr>
      <td><code><var>targetDirectory</var></code></td>
      <td>`string`</td>
      <td>lokalizacja docelowa na komputerze lokalnym</td>
    </tr>
  </tbody>
</table>