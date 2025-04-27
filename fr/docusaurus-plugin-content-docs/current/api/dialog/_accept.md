---
id: accept
title: accept
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/accept.ts
---

Retourne lorsque la boîte de dialogue a été acceptée.

##### Utilisation

```js
await dialog.accept(promptText)
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
      <td><code><var>promptText</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`string`</td>
      <td>Un texte à saisir dans l'invite. N'a aucun effet si le type de la boîte de dialogue n'est pas une invite.</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js title="dialogAccept.js"
await dialog.accept();
await dialog.accept(promptText);
```