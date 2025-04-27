---
id: dragAndDrop
title: dragAndDrop
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/dragAndDrop.ts
---

Faire glisser un élément vers un élément de destination ou une position.

:::info

La fonctionnalité de cette commande dépend fortement de la façon dont le glisser-déposer est
implémenté dans votre application. Si vous rencontrez des problèmes, veuillez poster votre exemple
dans [#4134](https://github.com/webdriverio/webdriverio/issues/4134).

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