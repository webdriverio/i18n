---
id: swipe
title: glisser
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/swipe.ts
---

Glisser dans une direction spécifique dans la fenêtre d'affichage ou l'élément pour les applications web pour ordinateur/mobile <strong>ET</strong> les applications natives mobiles.

:::info

Le glissement pour les applications natives mobiles est basé sur le protocole d'actions W3C, simulant une pression et un mouvement du doigt.
C'est différent de la commande [`mobile: scrollGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) pour Android
ou [`mobile: scroll`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll) pour iOS qui est basée sur le protocole du pilote Appium et est
uniquement disponible pour les plateformes mobiles dans le contexte NATIVE.

Cette commande ne fonctionne qu'avec les composants à jour suivants :
 - Serveur Appium (version 2.0.0 ou supérieure)
 - `appium-uiautomator2-driver` (pour Android)
 - `appium-xcuitest-driver` (pour iOS)

Assurez-vous que votre environnement Appium local ou basé sur le cloud est régulièrement mis à jour pour éviter les problèmes de compatibilité.

:::

:::caution Glissement basé sur les coordonnées

Évitez d'utiliser les options `from` et `to` sauf si absolument nécessaire. Elles sont spécifiques à l'appareil et peuvent ne pas fonctionner de manière cohérente sur tous les appareils.
Utilisez l'option `scrollableElement` pour des glissements fiables à l'intérieur d'un élément.

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
      <td>`object, boolean`</td>
      <td>options pour `browser.swipe()`. Par défaut pour desktop/mobile web : <br/> `{ direction: 'up', duration: 1500, percent: 0.95, scrollableElement: WebdriverIO.Element }`</td>
    </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`string`</td>
      <td>Peut être l'un des suivants : `down`, `up`, `left` ou `right`, la valeur par défaut est `up`. <br /><strong>UNIQUEMENT POUR APPLICATIONS NATIVES MOBILES</strong></td>
    </tr>
    <tr>
                      <td colspan="3"><strong>Bas (Down)</strong><br /><strong>Point de départ :</strong><br/>Vous placez votre doigt vers le haut de l'écran.<br/><strong>Mouvement :</strong><br/>Vous glissez votre doigt vers le bas de l'écran.<br/><strong>Action :</strong><br/>Cela varie selon le contexte :<br />- Sur l'écran d'accueil ou dans les applications, cela fait généralement défiler le contenu vers le haut.<br />- Depuis le bord supérieur, cela ouvre souvent le panneau de notifications ou les paramètres rapides.<br />- Dans les navigateurs ou les applications de lecture, cela peut être utilisé pour faire défiler le contenu.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Gauche (Left)</strong><br /><strong>Point de départ :</strong><br/>Vous placez votre doigt sur le côté droit de l'écran.<br/><strong>Mouvement :</strong><br/>Vous glissez votre doigt horizontalement vers la gauche.><br/><strong>Action :</strong><br/>La réponse à ce geste dépend de l'application :<br />- Cela peut passer à l'élément suivant dans un carrousel ou un ensemble d'images.<br />- Dans un contexte de navigation, cela pourrait revenir à la page précédente ou fermer la vue actuelle.<br />- Sur l'écran d'accueil, cela passe généralement au bureau virtuel ou à l'écran suivant.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Droite (Right)</strong><br /><strong>Point de départ :</strong><br/>Vous placez votre doigt sur le côté gauche de l'écran.<br/><strong>Mouvement :</strong><br/>Vous glissez votre doigt horizontalement vers la droite.<br/><strong>Action :</strong><br/>Similaire au glissement vers la gauche, mais dans la direction opposée :<br />-- Cela passe souvent à l'élément précédent dans un carrousel ou une galerie.<br />- Peut être utilisé pour ouvrir des menus latéraux ou des tiroirs de navigation dans les applications.<br />- Sur l'écran d'accueil, cela passe généralement au bureau virtuel précédent.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Haut (Up)</strong><br /><strong>Point de départ :</strong><br/>Vous placez votre doigt vers le bas de l'écran.<br/><strong>Mouvement :</strong><br/>Vous glissez votre doigt vers le haut de l'écran.><br/><strong>Action :</strong><br/>Selon le contexte, différentes actions peuvent se produire :<br />- Sur l'écran d'accueil ou dans une liste, cela fait généralement défiler le contenu vers le bas.<br />- Dans une application en plein écran, cela pourrait ouvrir des options supplémentaires ou le tiroir d'applications.<br />- Sur certaines interfaces, cela pourrait déclencher une action de 'rafraîchissement' ou ouvrir une barre de recherche.</td>
            </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>La durée en millisecondes pour le glissement. La valeur par défaut est `1500` ms. Plus la valeur est basse, plus le glissement est rapide.</td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Element`</td>
      <td>Élément utilisé pour glisser à l'intérieur. Si aucun élément n'est fourni, il utilisera le sélecteur suivant pour iOS `-ios predicate string:type == "XCUIElementTypeApplication"` et le suivant pour Android `//android.widget.ScrollView'`. Si plusieurs éléments correspondent au sélecteur par défaut, alors par défaut il choisira le premier élément correspondant. <br /> <strong>UNIQUEMENT POUR APPLICATIONS NATIVES MOBILES</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>Le pourcentage de l'élément défilable (par défaut) à glisser. C'est une valeur entre 0 et 1. La valeur par défaut est `0.95`.<br /><strong>NE JAMAIS</strong> glisser depuis l'extrême haut|bas|gauche|droite de l'écran, vous pourriez déclencher par exemple la barre de notification ou d'autres fonctionnalités du système d'exploitation/de l'application, ce qui peut entraîner des résultats inattendus.<br />Cela n'a aucun effet si `from` et `to` sont fournis.</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Les valeurs ci-dessous n'ont d'effet que si le `scrollableElement` n'est <strong>PAS</strong> fourni, sinon elles sont ignorées.</strong></td>
            </tr>
    <tr>
      <td><code><var>options.from</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`object`</td>
      <td>Les coordonnées x et y du début du glissement. Si un `scrollableElement` est fourni, alors ces coordonnées n'ont aucun effet.</td>
    </tr>
    <tr>
      <td><code><var>options.from.x</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>La coordonnée x du début du glissement.</td>
    </tr>
    <tr>
      <td><code><var>options.from.y</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>La coordonnée y du début du glissement.</td>
    </tr>
    <tr>
      <td><code><var>options.to</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`object`</td>
      <td>Les coordonnées x et y de la fin du glissement. Si un `scrollableElement` est fourni, alors ces coordonnées n'ont aucun effet.</td>
    </tr>
    <tr>
      <td><code><var>options.to.x</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>La coordonnée x de la fin du glissement.</td>
    </tr>
    <tr>
      <td><code><var>options.to.y</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>La coordonnée y de la fin du glissement.</td>
    </tr>
  </tbody>
</table>

##### Exemples

```js title="swipe.js"
it('should execute a default swipe', async () => {
    // Default will be a swipe from the bottom to the top, meaning it will swipe UP
    await browser.swipe();
});

```

```js title="swipe.with.options.js"
it('should execute a swipe with options', async () => {
    await browser.swipe({
        direction: 'left',                  // Swipe from right to left
        duration: 5000,                     // Last for 5 seconds
        percent: 0.5,                       // Swipe 50% of the scrollableElement
        scrollableElement: $('~carousel'),  // The element to swipe within
    })
});
```