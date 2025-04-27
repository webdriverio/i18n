---
id: longPress
title: longPress
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/longPress.ts
---

Effectue un geste d'appui prolongé sur l'élément donné à l'écran.

Cela émet une commande WebDriver `action` pour l'élément sélectionné. Elle est basée sur la commande `click`.

:::info

Cette commande ne fonctionne qu'avec les composants à jour suivants :
 - Serveur Appium (version 2.0.0 ou supérieure)
 - `appium-uiautomator2-driver` (pour Android)
 - `appium-xcuitest-driver` (pour iOS)

Assurez-vous que votre environnement Appium local ou basé sur le cloud est régulièrement mis à jour pour éviter les problèmes de compatibilité.

:::

##### Utilisation

```js
$(selector).longPress({ x, y, duration })
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
      <td>`LongPressOptions`</td>
      <td>Options d'appui prolongé (optionnel)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>Nombre (optionnel)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>Nombre (optionnel)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>Durée de l'appui en ms, par défaut 1500 ms <br /><strong>MOBILE UNIQUEMENT</strong></td>
    </tr>
  </tbody>
</table>

##### Exemples

```js title="longpress.offset.js"
it('should demonstrate a longPress using an offset on the iOS Contacts icon', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    // clicks 30 horizontal and 10 vertical pixels away from location of the icon (from center point of element)
    await contacts.longPress({ x: 30, y: 10 })
})

```

```js title="longpress.example.js"
it('should be able to open the contacts menu on iOS by executing a longPress of 5 seconds', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    await contacts.longPress({ duration: 5 * 1000 })
})
```