---
id: touchAction
title: touchAction
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/touchAction.ts
---

:::caution Avertissement de dépréciation

La commande `touchAction` est __dépréciée__ et sera supprimée dans une future version.
Nous recommandons d'utiliser la commande [`action`](/docs/api/browser/action) à la place avec
le type de pointeur `touch`, par exemple:

```ts
await browser.action('pointer', {
  parameters: { pointerType: 'touch' }
})
```

:::

L'API Touch Action fournit la base de tous les gestes qui peuvent être automatisés dans Appium.
Elle est actuellement uniquement disponible pour les applications natives et ne peut pas être utilisée pour interagir avec des applications web.
À la base, elle permet d'enchaîner des actions individuelles _ad hoc_, qui seront ensuite
appliquées à un élément de l'application sur l'appareil. Les actions de base qui peuvent être utilisées sont:

- press (passer un élément ou (x,y) ou les deux)
- longPress (passer un élément ou (x,y) ou les deux)
- tap (passer un élément ou (x,y) ou les deux)
- moveTo (passer des coordonnées absolues x,y)
- wait (passer ms (en millisecondes))
- release (pas d'arguments)

##### Utilisation

```js
$(selector).touchAction(action)
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
      <td><code><var>action</var></code></td>
      <td>`TouchActions`</td>
      <td>action à exécuter</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js title="touchAction.js"
it('should do a touch gesture', async () => {
    const screen = await $('//UITextbox');

    // simple touch action on element
    await screen.touchAction('tap');

    // simple touch action using selector and x y variables
    // tap location is 30px right and 20px down relative from the center of the element
    await screen.touchAction({
        action: 'tap', x: 30, y:20
    })

    // multi action on an element (drag&drop)
    await screen.touchAction([
        'press',
        { action: 'moveTo', x: 200, y: 300 },
        'release'
    ])

    // drag&drop to element
    const otherElement = await $('//UIAApplication[1]/UIAElement[2]')
    await screen.touchAction([
        'press',
        { action: 'moveTo', element: otherElement },
        'release'
    ])
});
```