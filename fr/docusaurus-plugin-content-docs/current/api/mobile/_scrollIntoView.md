---
id: scrollIntoView
title: scrollIntoView
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/scrollIntoView.ts
---

Fait défiler l'élément dans la zone visible pour les applications Web Desktop/Mobile <strong>ET</strong> les applications natives mobiles.

:::info

Le défilement pour les applications natives mobiles est basé sur la commande mobile `swipe`.

Cette commande ne fonctionne qu'avec les composants à jour suivants :
 - Serveur Appium (version 2.0.0 ou supérieure)
 - `appium-uiautomator2-driver` (pour Android)
 - `appium-xcuitest-driver` (pour iOS)

Assurez-vous que votre environnement Appium local ou dans le cloud est régulièrement mis à jour pour éviter les problèmes de compatibilité.

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
      <td>options pour `Element.scrollIntoView()`. Par défaut pour desktop/mobile web : <br/> `{ block: 'start', inline: 'nearest' }` <br /> Par défaut pour l'application native mobile <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Desktop/Mobile Web uniquement</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`string`</td>
      <td>Voir [Référence MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>WEB UNIQUEMENT</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`string`</td>
      <td>Voir [Référence MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>WEB UNIQUEMENT</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`string`</td>
      <td>Voir [Référence MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>WEB UNIQUEMENT</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Application native mobile uniquement</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`string`</td>
      <td>Peut être `down`, `up`, `left` ou `right`, la valeur par défaut est `up`. <br /><strong>APPLICATION-NATIVE-MOBILE UNIQUEMENT</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>Le nombre maximum de défilements avant d'arrêter la recherche de l'élément, la valeur par défaut est `10`. <br /><strong>APPLICATION-NATIVE-MOBILE UNIQUEMENT</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>La durée en millisecondes pour le balayage. La valeur par défaut est `1500` ms. Plus la valeur est basse, plus le balayage est rapide.<br /><strong>APPLICATION-NATIVE-MOBILE UNIQUEMENT</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Element`</td>
      <td>Élément utilisé pour faire défiler à l'intérieur. Si aucun élément n'est fourni, il utilisera le sélecteur suivant pour iOS `-ios predicate string:type == "XCUIElementTypeApplication"` et le suivant pour Android `//android.widget.ScrollView'`. Si plusieurs éléments correspondent au sélecteur par défaut, il choisira par défaut le premier élément correspondant. <br /> <strong>APPLICATION-NATIVE-MOBILE UNIQUEMENT</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>Le pourcentage de l'élément défilable (par défaut) à balayer. C'est une valeur entre 0 et 1. La valeur par défaut est `0.95`.<br /><strong>NE JAMAIS</strong> balayer depuis l'extrême haut|bas|gauche|droite de l'écran, vous pourriez déclencher par exemple la barre de notification ou d'autres fonctionnalités de l'OS/App qui peuvent conduire à des résultats inattendus.<br /> <strong>APPLICATION-NATIVE-MOBILE UNIQUEMENT</strong></td>
    </tr>
  </tbody>
</table>

##### Exemples

```js title="desktop.mobile.web.scrollIntoView.js"
it('should demonstrate the desktop/mobile web scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to specific element
    await elem.scrollIntoView();
    // center element within the viewport
    await elem.scrollIntoView({ block: 'center', inline: 'center' });
});

```

```js title="mobile.native.app.scrollIntoView.js"
it('should demonstrate the mobile native app scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to a specific element in the default scrollable element for Android or iOS for a maximum of 10 scrolls
    await elem.scrollIntoView();
    // Scroll to the left in the scrollable element called '#scrollable' for a maximum of 5 scrolls
    await elem.scrollIntoView({
        direction: 'left',
        maxScrolls: 5,
        scrollableElement: $('#scrollable')
    });
});
```