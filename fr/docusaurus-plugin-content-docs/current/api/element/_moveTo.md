---
id: moveTo
title: moveTo
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/moveTo.ts
---

Déplacer la souris selon un décalage par rapport à l'élément spécifié. Si aucun élément n'est spécifié, 
le déplacement est relatif à la position actuelle du curseur. Si un élément est fourni mais 
sans décalage, la souris sera déplacée au centre de l'élément. Si l'élément 
n'est pas visible, il sera défilé pour être visible.

##### Usage

```js
$(selector).moveTo({ xOffset, yOffset })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`MoveToOptions`</td>
      <td>options de la commande moveTo</td>
    </tr>
    <tr>
      <td><code><var>options.xOffset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Décalage X vers lequel se déplacer, par rapport au centre de l'élément. Si non spécifié, la souris se déplacera au centre de l'élément.</td>
    </tr>
    <tr>
      <td><code><var>options.yOffset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Décalage Y vers lequel se déplacer, par rapport au centre de l'élément. Si non spécifié, la souris se déplacera au centre de l'élément.</td>
    </tr>
  </tbody>
</table>