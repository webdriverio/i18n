---
id: click
title: click
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/click.ts
---

Cliquer sur un élément.

Cette commande exécute une commande WebDriver `click` pour l'élément sélectionné, qui généralement fait défiler jusqu'à l'élément puis clique dessus quand aucune option n'est passée. Lorsqu'un objet d'options est passé, elle utilise la classe d'action au lieu du clic WebDriver, ce qui offre des capacités supplémentaires comme le passage du type de bouton, des coordonnées, etc. Par défaut, lors de l'utilisation des options, une commande d'action de relâchement est envoyée après l'exécution de l'action de clic; passez `option.skipRelease=true` pour ignorer cette action.

:::info

Si vous avez des éléments à position fixe (comme un en-tête ou un pied de page fixe) qui recouvrent l'élément sélectionné après son défilement dans la fenêtre d'affichage, le clic sera émis aux coordonnées indiquées, mais sera reçu par votre élément fixe (superposé). Dans ces cas, l'erreur suivante est générée :

```
Element is not clickable at point (x, x). Other element would receive the click: ..."
```

Pour contourner ce problème, essayez de trouver l'élément superposé et de le supprimer via la commande `execute` afin qu'il n'interfère pas avec le clic. Vous pouvez également essayer de faire défiler vous-même jusqu'à l'élément en utilisant `scroll` avec un décalage approprié à votre scénario.

:::

:::info

La commande de clic peut également être utilisée pour simuler un appui prolongé sur un appareil mobile. Cela se fait en définissant la `duration`.
Voir l'exemple ci-dessous pour plus d'informations.

:::

##### Utilisation

```js
$(selector).click({ button, x, y, skipRelease, duration })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`ClickOptions`</td>
      <td>Options de clic (optionnel)</td>
    </tr>
    <tr>
      <td><code><var>options.button</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`string, number`</td>
      <td>Peut être l'un des `[0, "left", 1, "middle", 2, "right"]` <br /><strong>WEB UNIQUEMENT</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>Clique à X pixels horizontalement de l'emplacement de l'élément (depuis le point central de l'élément)<br /><strong>WEB et Natif</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>Clique à Y pixels verticalement de l'emplacement de l'élément (depuis le point central de l'élément)<br /><strong>Support WEB et Natif</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.skipRelease</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`boolean`</td>
      <td>Booléen (optionnel) <br /><strong>WEB UNIQUEMENT</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>Durée du clic, aussi appelé "LongPress" <br /><strong>APPLICATIONS NATIVES MOBILES UNIQUEMENT</strong> (Mobile)</td>
    </tr>
  </tbody>
</table>

##### Exemples

```html title="example.html"
<button id="myButton" onclick="document.getElementById('someText').innerHTML='I was clicked'">Click me</button>
<div id="someText">I was not clicked</div>
```

```js title="click.js"
it('should demonstrate the click command', async () => {
    const myButton = await $('#myButton')
    await myButton.click()
    const myText = await $('#someText')
    const text = await myText.getText()
    assert(text === 'I was clicked') // true
})
```

```js title="example.js"
it('should fetch menu links and visit each page', async () => {
    const links = await $$('#menu a')
    await links.forEach(async (link) => {
        await link.click()
    })
})

```

```html title="example.html"
<button id="myButton">Click me</button>
```

```js title="example.js"
it('should demonstrate a click using an offset', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ x: 30 }) // clicks 30 horizontal pixels away from location of the button (from center point of element)
})

```

```html title="example.html"
<button id="myButton">Click me</button>
```

```js title="example.js"
it('should demonstrate a right click passed as string', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 'right' }) // opens the contextmenu at the location of the button
})
it('should demonstrate a right click passed as number while adding an offset', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 2, x: 30, y: 40 }) // opens the contextmenu 30 horizontal and 40 vertical pixels away from location of the button (from the center of element)
})
it('should skip sending releaseAction command that cause unexpected alert closure', async () => {
    const myButton = await $('#myButton')
    await myButton.click({ button: 2, x: 30, y: 40, skipRelease:true }) // skips sending releaseActions
})

```

```js title="longpress.example.js"
it('should be able to open the contacts menu on iOS by executing a longPress', async () => {
    const contacts = await $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    await contacts.click({ duration: 2000 })
})
```