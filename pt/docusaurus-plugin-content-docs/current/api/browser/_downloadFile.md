---
id: downloadFile
title: downloadFile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/downloadFile.ts
---

Baixe um arquivo do computador remoto executando o nó Selenium para o sistema de arquivos local
usando o comando [`downloadFile`](https://webdriver.io/docs/api/selenium#downloadFile).

:::info
Observe que este comando só é suportado se você usar um
[Selenium Grid](https://www.selenium.dev/documentation/en/grid/) com Chrome, Edge ou Firefox
e tiver a flag `se:downloadsEnabled` definida nas capabilities.
:::

##### Uso

```js
browser.downloadFile(fileName, targetDirectory)
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
      <td><code><var>fileName</var></code></td>
      <td>`string`</td>
      <td>caminho remoto para o arquivo</td>
    </tr>
    <tr>
      <td><code><var>targetDirectory</var></code></td>
      <td>`string`</td>
      <td>localização de destino no computador local</td>
    </tr>
  </tbody>
</table>