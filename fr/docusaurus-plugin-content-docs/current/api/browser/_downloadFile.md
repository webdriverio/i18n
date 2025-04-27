---
id: downloadFile
title: downloadFile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/downloadFile.ts
---

Téléchargez un fichier de l'ordinateur distant exécutant le nœud Selenium vers le système de fichiers local
en utilisant la commande [`downloadFile`](https://webdriver.io/docs/api/selenium#downloadFile).

:::info
Notez que cette commande n'est prise en charge que si vous utilisez une
[Grille Selenium](https://www.selenium.dev/documentation/en/grid/) avec Chrome, Edge ou Firefox
et avez le drapeau `se:downloadsEnabled` défini dans les capacités.
:::

##### Utilisation

```js
browser.downloadFile(fileName, targetDirectory)
```

##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>fileName</var></code></td>
      <td>`string`</td>
      <td>chemin distant vers le fichier</td>
    </tr>
    <tr>
      <td><code><var>targetDirectory</var></code></td>
      <td>`string`</td>
      <td>emplacement cible sur l'ordinateur local</td>
    </tr>
  </tbody>
</table>