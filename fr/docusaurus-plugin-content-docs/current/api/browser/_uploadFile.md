---
id: uploadFile
title: uploadFile
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/uploadFile.ts
---

Téléverse un fichier vers le serveur Selenium Standalone ou un autre pilote de navigateur 
(par exemple, Chromedriver ou EdgeDriver) en utilisant la commande [`file`](https://webdriver.io/docs/api/selenium#file).
_Remarque :_ cette commande n'est prise en charge que si vous utilisez un hub Selenium,
Chromedriver ou EdgeDriver directement.

__Remarque :__ cette commande utilise une fonctionnalité de protocole non officielle qui est actuellement
prise en charge uniquement dans Chrome et lors de l'exécution d'une [Grille Selenium](https://www.selenium.dev/documentation/en/grid/).

##### Utilisation

```js
browser.uploadFile(localPath)
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
      <td><code><var>localPath</var></code></td>
      <td>`string`</td>
      <td>chemin local vers le fichier</td>
    </tr>
  </tbody>
</table>

##### Exemple

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

##### Retourne

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  URL distante