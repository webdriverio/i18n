---
id: isDisplayed
title: isDisplayed
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isDisplayed.ts
---

Renvoie true si l'élément DOM sélectionné est affiché (même lorsque l'élément est en dehors de la zone visible). Il utilise
la méthode [`checkVisibility`](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#visibilityproperty)
fournie par le navigateur pour déterminer si un élément est affiché ou non. Comme WebdriverIO agit comme un
utilisateur réel, les valeurs par défaut pour les options `contentVisibilityAuto`, `opacityProperty` et `visibilityProperty`
sont définies à `true` pour obtenir un comportement plus strict par défaut. Cela signifie que la commande vérifiera si l'élément est
visible en fonction de la valeur de ses propriétés `content-visibility`, `opacity` et `visibility`.

Si vous souhaitez également vérifier que l'élément se trouve dans la zone visible, fournissez l'option `withinViewport` à la commande.

:::info

Contrairement à d'autres commandes d'élément, WebdriverIO n'attendra pas que l'élément
existe pour exécuter cette commande.

:::

WebdriverIO, lors de l'exécution de tests de navigateur, utilise un [script personnalisé](https://github.com/webdriverio/webdriverio/blob/59d349ca847950354d02b9e548f60cc50e7871f0/packages/webdriverio/src/scripts/isElementDisplayed.ts)
spécialement conçu pour évaluer la visibilité des éléments. Ce script est essentiel pour déterminer si un
élément est affiché sur la page. À l'inverse, pour les scénarios de test mobile natif avec Appium, WebdriverIO
s'appuie sur la commande [`isElementDisplayed`](https://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#elementdisplayed)
fournie par Appium. Cette commande évalue la visibilité des éléments en utilisant des critères établis par le
pilote Appium sous-jacent, assurant des évaluations précises et spécifiques au pilote pour les applications mobiles.

##### Utilisation

```js
$(selector).isDisplayed(withinViewport, contentVisibilityAuto, opacityProperty, visibilityProperty)
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
      <td><code><var>withinViewport=false</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Boolean`</td>
      <td>`true` pour vérifier si l'élément est dans la zone visible. `false` par défaut.</td>
    </tr>
    <tr>
      <td><code><var>contentVisibilityAuto=true</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Boolean`</td>
      <td>`true` pour vérifier si la propriété content-visibility de l'élément a (ou hérite) la valeur auto, et qu'elle saute actuellement son rendu. `true` par défaut.</td>
    </tr>
    <tr>
      <td><code><var>opacityProperty=true</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Boolean`</td>
      <td>`true` pour vérifier si la propriété d'opacité de l'élément a (ou hérite) une valeur de 0. `true` par défaut.</td>
    </tr>
    <tr>
      <td><code><var>visibilityProperty=true</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Boolean`</td>
      <td>`true` pour vérifier si l'élément est invisible en raison de la valeur de sa propriété de visibilité. `true` par défaut.</td>
    </tr>
  </tbody>
</table>

##### Exemples

```html title="index.html"
<div id="noSize"></div>
<div id="noSizeWithContent">Hello World!</div>
<div id="notDisplayed" style="width: 10px; height: 10px; display: none"></div>
<div id="notVisible" style="width: 10px; height: 10px; visibility: hidden"></div>
<div id="zeroOpacity" style="width: 10px; height: 10px; opacity: 0"></div>
<div id="notInViewport" style="width: 10px; height: 10px; position:fixed; top: 999999; left: 999999"></div>
```

```js title="isDisplayed.js"
it('should detect if an element is displayed', async () => {
    elem = await $('#notExisting');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSize');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSizeWithContent');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true

    let elem = await $('#notDisplayed');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notVisible');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#zeroOpacity');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notInViewport');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true
});
isDisplayedWithinViewport.js
it('should detect if an element is visible within the viewport', async () => {
    let isDisplayedInViewport = await $('#notDisplayed').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notVisible').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notExisting').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notInViewport').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#zeroOpacity').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false
});
```

##### Retourne

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true si l'élément est affiché