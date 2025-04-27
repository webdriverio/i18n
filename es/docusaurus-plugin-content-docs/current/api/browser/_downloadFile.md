---
id: downloadFile
title: downloadFile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/downloadFile.ts
---

Descarga un archivo desde el ordenador remoto que ejecuta el nodo Selenium al sistema de archivos local
utilizando el comando [`downloadFile`](https://webdriver.io/docs/api/selenium#downloadFile).

:::info
Ten en cuenta que este comando solo es compatible si utilizas una
[Selenium Grid](https://www.selenium.dev/documentation/en/grid/) con Chrome, Edge o Firefox
y tienes la bandera `se:downloadsEnabled` establecida en las capacidades.
:::

##### Uso

```js
browser.downloadFile(fileName, targetDirectory)
```

##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>fileName</var></code></td>
      <td>`string`</td>
      <td>ruta remota al archivo</td>
    </tr>
    <tr>
      <td><code><var>targetDirectory</var></code></td>
      <td>`string`</td>
      <td>ubicación de destino en el ordenador local</td>
    </tr>
  </tbody>
</table>