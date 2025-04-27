---
id: setWindowSize
title: setWindowSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setWindowSize.ts
---

Redimensionne la taille externe de la fenêtre du navigateur selon la largeur et la hauteur fournies. Selon votre système d'exploitation, certaines fenêtres de navigateur pourraient ne pas vous permettre d'avoir une largeur inférieure à `500px`. Si vous souhaitez imiter la fenêtre d'affichage d'un iPhone par exemple, vous devriez envisager d'utiliser la commande `setViewport`.

##### Usage

```js
browser.setWindowSize(width, height)
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>width</var></code></td>
      <td>`number`</td>
      <td>le navigateur sera redimensionné à la largeur fournie</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>`number`</td>
      <td>le navigateur sera redimensionné à la hauteur fournie</td>
    </tr>
  </tbody>
</table>

##### Returns

- **&lt;Null|Object&gt;**
            **<code><var>return</var></code>:** Null pour les navigateurs *NO*W3C et Objet `{x, y, width, height}` pour les navigateurs W3C