---
id: keys
title: touches
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/keys.ts
---

Envoyer une séquence de touches à l'élément "actif". Vous pouvez rendre un élément de saisie actif en cliquant simplement dessus. Pour utiliser des caractères comme "Flèche gauche" ou "Retour arrière", importez l'objet `Key` du package WebdriverIO.

Les modificateurs comme `Control`, `Shift`, `Alt` et `Command` resteront enfoncés, vous devez donc les déclencher à nouveau pour les relâcher. La modification d'un clic nécessite cependant l'utilisation de l'API Actions WebDriver via la méthode [performActions](https://webdriver.io/docs/api/webdriver#performactions).

:::info

Les touches de contrôle diffèrent selon le système d'exploitation sur lequel le navigateur est exécuté, par exemple MacOS : `Command` et Windows : `Control`. WebdriverIO fournit une touche de contrôle modificateur multiplateforme appelée `Ctrl` (voir l'exemple ci-dessous).

:::

##### Utilisation

```js
browser.keys(value)
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
      <td><code><var>value</var></code></td>
      <td>`String, String[]`</td>
      <td>La séquence de touches à saisir. Un tableau ou une chaîne doit être fourni.</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="keys.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/355434bdef13d29608d6d5fbfbeaa034c8a2aa74/keys/keys.js#L1-L17
```