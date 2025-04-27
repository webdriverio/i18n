---
id: dragAndDrop
title: dragAndDrop
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/dragAndDrop.ts
---

Faire glisser un élément vers un élément de destination ou une position.

:::info

La fonctionnalité de cette commande dépend fortement de la façon dont le glisser-déposer est
implémenté dans votre application. Si vous rencontrez des problèmes, veuillez publier votre exemple
dans [#4134](https://github.com/webdriverio/webdriverio/issues/4134).

Assurez-vous également que l'élément que vous faites glisser et la cible où vous le déposez sont tous deux visibles à l'écran.

Cette commande ne fonctionne qu'avec les composants à jour suivants :
 - Serveur Appium (version 2.0.0 ou supérieure)
 - `appium-uiautomator2-driver` (pour Android)
 - `appium-xcuitest-driver` (pour iOS)

Assurez-vous que votre environnement Appium local ou basé sur le cloud est régulièrement mis à jour pour éviter les problèmes de compatibilité.

:::

##### Utilisation

```js
$(selector).dragAndDrop(target, { duration })
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
      <td><code><var>target</var></code></td>
      <td>`Element, DragAndDropCoordinate`</td>
      <td>élément de destination ou objet avec les propriétés x et y</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`DragAndDropOptions`</td>
      <td>options de la commande dragAndDrop</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Number`</td>
      <td>durée du glissement</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js title="example.test.js"
it('should demonstrate the dragAndDrop command', async () => {
    const elem = $('#someElem')
    const target = $('#someTarget')

    // drag and drop to other element
    await elem.dragAndDrop(target)

    // drag and drop relative from current position
    await elem.dragAndDrop({ x: 100, y: 200 })
})
```