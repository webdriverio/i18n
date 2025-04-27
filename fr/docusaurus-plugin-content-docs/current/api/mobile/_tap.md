---
id: tap
title: tap
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/tap.ts
---

Exécute un geste de tapotement sur :
- soit l'élément donné. Il fera **automatiquement défiler** s'il ne peut pas être trouvé.
- soit l'écran d'un appareil mobile en fournissant les coordonnées `x` et `y`

En interne, il utilise :
- Tapotement sur élément :
     - la commande `click` pour les environnements Web (navigateurs Chrome/Safari, ou applications hybrides)
     - l'Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
ou iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) pour les applications natives, incluant la commande `scrollIntoView`
pour le défilement automatique
- Tapotement sur écran :
     - la commande `action` pour les environnements Web (navigateurs Chrome/Safari, ou applications hybrides)
     - l'Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
ou iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) pour les applications natives

Cette différence fait de la commande `tap` une alternative plus fiable à la commande `click` pour les applications mobiles.

Pour les applications natives, cette commande diffère de la commande `click` car elle <strong>balayera automatiquement</strong> vers l'élément en utilisant la commande `scrollIntoView`,
qui n'est pas prise en charge pour les applications natives avec la commande `click`. Dans les applications hybrides ou les environnements web, le défilement automatique est pris en charge pour les commandes `click` et `tap`.

:::info

Cette commande ne fonctionne qu'avec les composants mis à jour suivants :
 - Serveur Appium (version 2.0.0 ou supérieure)
 - `appium-uiautomator2-driver` (pour Android)
 - `appium-xcuitest-driver` (pour iOS)

Assurez-vous que votre environnement Appium local ou basé sur le cloud est régulièrement mis à jour pour éviter les problèmes de compatibilité.

:::

:::caution Pour les tapotements sur écran

Si vous souhaitez tapoter sur une coordonnée spécifique de l'écran et que vous utilisez une capture d'écran pour déterminer les coordonnées, n'oubliez pas que
les coordonnées pour iOS sont basées sur la taille de l'écran de l'appareil, et non sur la taille de la capture d'écran. La taille de la capture d'écran est plus grande en raison du rapport de pixels de l'appareil.
Le rapport de pixels moyen jusqu'à l'iPhone 8 et les iPads actuels est de 2, pour les iPhones à partir de l'iPhone X, le rapport est de 3. Cela signifie que la taille de la capture d'écran
est 2 ou 3 fois plus grande que la taille de l'écran de l'appareil, ce qui signifie que si vous trouvez les coordonnées sur la capture d'écran, divisez-les par le rapport de pixels
de l'appareil pour obtenir les coordonnées d'écran correctes. Par exemple :

```js
const screenshotCoordinates = { x: 600, y: 900 };
const dpr = 3; // Exemple pour iPhone 16
const screenCoordinates = {
    x: screenshotCoordinates.x / dpr,
    y: screenshotCoordinates.y / dpr
};
await browser.tap(screenCoordinates);
```

:::

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
      <td>`TapOptions`</td>
      <td>Options de tapotement (optionnel)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Options de tapotement sur élément</strong></td>
            </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>Nombre (optionnel, obligatoire si y est défini) <br /><strong>Uniquement pour le tapotement sur ÉCRAN, pas pour le tapotement sur ÉLÉMENT</strong></td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>Nombre (optionnel, obligatoire si x est défini) <br /><strong>Uniquement pour le tapotement sur ÉCRAN, pas pour le tapotement sur ÉLÉMENT</strong></td>
    </tr>
    <tr>
              <td colspan="3"><strong>Options de tapotement sur écran</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`string`</td>
      <td>Peut être l'un des suivants : `down`, `up`, `left` ou `right`, la valeur par défaut est `down`. <br /><strong>Uniquement pour le tapotement sur ÉLÉMENT, pas pour le tapotement sur ÉCRAN</strong><br /><strong>MOBILE-NATIVE-APP-ONLY</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>Le nombre maximum de défilements jusqu'à ce qu'il arrête de rechercher l'élément, la valeur par défaut est `10`. <br /><strong>Uniquement pour le tapotement sur ÉLÉMENT, pas pour le tapotement sur ÉCRAN</strong><br /><strong>MOBILE-NATIVE-APP-ONLY</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Element`</td>
      <td>Élément utilisé pour défiler. Si aucun élément n'est fourni, il utilisera le sélecteur suivant pour iOS `-ios predicate string:type == "XCUIElementTypeApplication"` et le suivant pour Android `//android.widget.ScrollView'`. Si plusieurs éléments correspondent au sélecteur par défaut, alors par défaut il choisira le premier élément correspondant. <br /><strong>Uniquement pour le tapotement sur ÉLÉMENT, pas pour le tapotement sur ÉCRAN</strong><br /><strong>MOBILE-NATIVE-APP-ONLY</strong></td>
    </tr>
  </tbody>
</table>

##### Exemples

```js title="element.tap.example.js"
it('should be able to tap an on element', async () => {
    const elem = $('~myElement')
    // It will automatically scroll to the element if it's not already in the viewport
    await elem.tap()
})

```

```js title="element.tap.scroll.options.example.js"
it('should be able to swipe right 3 times in a custom scroll areas to an element and tap on the element', async () => {
    const elem = $('~myElement')
    // Swipe right 3 times in the custom scrollable element to find the element
    await elem.tap({
        direction: 'right',
        maxScrolls: 3,
        scrollableElement: $('#scrollable')
    })
})

```

```js title="screen.tap.example.js"
it('should be able to tap on screen coordinates', async () => {
    await browser.tap({ x: 200, y: 400 })
})
```