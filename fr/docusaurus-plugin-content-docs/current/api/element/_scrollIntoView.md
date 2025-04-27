---
id: scrollIntoView
title: scrollIntoView
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/scrollIntoView.ts
---

Faire défiler l'élément dans la zone visible pour les applications Web Desktop/Mobile <strong>ET</strong> les applications natives mobiles.

:::info

Le défilement pour les applications natives mobiles est effectué à l'aide de la commande mobile `swipe`.

:::

##### Utilisation

```js
$(selector).scrollIntoView({ behavior, block, inline, direction, maxScrolls, duration, scrollableElement, percent })
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
      <td>`object, boolean`</td>
      <td>options pour `Element.scrollIntoView()`. Par défaut pour desktop/mobile web: <br/> `{ block: 'start', inline: 'nearest' }` <br /> Par défaut pour les applications natives mobiles <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Desktop/Mobile Web Uniquement</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`string`</td>
      <td>Voir [Référence MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>WEB-UNIQUEMENT</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`string`</td>
      <td>Voir [Référence MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>WEB-UNIQUEMENT</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`string`</td>
      <td>Voir [Référence MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>WEB-UNIQUEMENT</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Applications Natives Mobiles Uniquement</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`string`</td>
      <td>Peut être `down`, `up`, `left` ou `right`, par défaut c'est `up`. <br /><strong>APPLICATION-NATIVE-MOBILE-UNIQUEMENT</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>Le nombre maximum de défilements avant d'arrêter la recherche de l'élément, par défaut c'est `10`. <br /><strong>APPLICATION-NATIVE-MOBILE-UNIQUEMENT</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>La durée en millisecondes pour le balayage. Par défaut, c'est `1500` ms. Plus la valeur est basse, plus le balayage est rapide.<br /><strong>APPLICATION-NATIVE-MOBILE-UNIQUEMENT</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Element`</td>
      <td>Élément utilisé pour faire défiler. Si aucun élément n'est fourni, il utilisera le sélecteur suivant pour iOS `-ios predicate string:type == "XCUIElementTypeApplication"` et le suivant pour Android `//android.widget.ScrollView'`. Si plusieurs éléments correspondent au sélecteur par défaut, il choisira par défaut le premier élément correspondant. <br /> <strong>APPLICATION-NATIVE-MOBILE-UNIQUEMENT</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>Le pourcentage de l'élément défilable (par défaut) à balayer. C'est une valeur entre 0 et 1. Par défaut c'est `0.95`.<br /><strong>NE JAMAIS</strong> balayer depuis l'exact haut|bas|gauche|droite de l'écran, vous pourriez déclencher par exemple la barre de notification ou d'autres fonctionnalités OS/App ce qui peut mener à des résultats inattendus.<br /> <strong>APPLICATION-NATIVE-MOBILE-UNIQUEMENT</strong></td>
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