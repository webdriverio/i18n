---
id: downloadFile
title: downloadFile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/downloadFile.ts
---

Scarica un file dal computer remoto che esegue il nodo Selenium al file system locale
utilizzando il comando [`downloadFile`](https://webdriver.io/docs/api/selenium#downloadFile).

:::info
Nota che questo comando è supportato solo se utilizzi una
[Selenium Grid](https://www.selenium.dev/documentation/en/grid/) con Chrome, Edge o Firefox
e hai impostato il flag `se:downloadsEnabled` nelle capabilities.
:::

##### Utilizzo

```js
browser.downloadFile(fileName, targetDirectory)
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
      <td><code><var>fileName</var></code></td>
      <td>`string`</td>
      <td>percorso remoto del file</td>
    </tr>
    <tr>
      <td><code><var>targetDirectory</var></code></td>
      <td>`string`</td>
      <td>posizione di destinazione sul computer locale</td>
    </tr>
  </tbody>
</table>