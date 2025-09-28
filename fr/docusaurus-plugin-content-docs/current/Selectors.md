---
id: selectors
title: Sélecteurs
---

Le [Protocole WebDriver](https://w3c.github.io/webdriver/) fournit plusieurs stratégies de sélection pour interroger un élément. WebdriverIO les simplifie pour que la sélection d'éléments reste simple. Veuillez noter que même si la commande pour interroger les éléments s'appelle `$` et `$$`, elles n'ont rien à voir avec jQuery ou le [Moteur de Sélection Sizzle](https://github.com/jquery/sizzle).

Bien qu'il existe de nombreux sélecteurs différents disponibles, seuls quelques-uns d'entre eux offrent un moyen robuste de trouver le bon élément. Par exemple, étant donné le bouton suivant :

```html
<button
  id="main"
  class="btn btn-large"
  name="submission"
  role="button"
  data-testid="submit"
>
  Submit
</button>
```

Nous __recommandons__ et __ne recommandons pas__ les sélecteurs suivants :

| Sélecteur | Recommandé | Notes |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 Jamais | Le pire - trop générique, pas de contexte. |
| `$('.btn.btn-large')` | 🚨 Jamais | Mauvais. Couplé au style. Très sujet aux changements. |
| `$('#main')` | ⚠️ Avec parcimonie | Mieux. Mais toujours couplé au style ou aux écouteurs d'événements JS. |
| `$(() => document.queryElement('button'))` | ⚠️ Avec parcimonie | Interrogation efficace, complexe à écrire. |
| `$('button[name="submission"]')` | ⚠️ Avec parcimonie | Couplé à l'attribut `name` qui a une sémantique HTML. |
| `$('button[data-testid="submit"]')` | ✅ Bon | Nécessite un attribut supplémentaire, non lié à l'accessibilité. |
| `$('aria/Submit')` | ✅ Bon | Bon. Ressemble à la façon dont l'utilisateur interagit avec la page. Il est recommandé d'utiliser des fichiers de traduction pour que vos tests ne se cassent pas lorsque les traductions sont mises à jour. Remarque : Ce sélecteur peut être plus lent que les autres sur les grandes pages. |
| `$('button=Submit')` | ✅ Toujours | Le meilleur. Ressemble à la façon dont l'utilisateur interagit avec la page et est rapide. Il est recommandé d'utiliser des fichiers de traduction pour que vos tests ne se cassent pas lorsque les traductions sont mises à jour. |

## Sélecteur CSS

Sauf indication contraire, WebdriverIO interrogera les éléments en utilisant le modèle de [sélecteur CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), par exemple :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## Texte de Lien

Pour obtenir un élément d'ancrage avec un texte spécifique, interrogez le texte commençant par un signe égal (`=`).

Par exemple :

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

Vous pouvez interroger cet élément en appelant :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## Texte Partiel de Lien

Pour trouver un élément d'ancrage dont le texte visible correspond partiellement à votre valeur de recherche,
interrogez-le en utilisant `*=` devant la chaîne de recherche (par exemple, `*=driver`).

Vous pouvez également interroger l'élément de l'exemple ci-dessus en appelant :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Remarque :__ Vous ne pouvez pas mélanger plusieurs stratégies de sélection dans un seul sélecteur. Utilisez plutôt plusieurs requêtes d'éléments enchaînées pour atteindre le même objectif, par exemple :

```js
const elem = await $('header h1*=Welcome') // ne fonctionne pas !!!
// utilisez plutôt
const elem = await $('header').$('*=driver')
```

## Élément avec un texte spécifique

La même technique peut être appliquée aux éléments également. De plus, il est également possible d'effectuer une correspondance insensible à la casse en utilisant `.=` ou `.*=` dans la requête.

Par exemple, voici une requête pour un titre de niveau 1 avec le texte "Welcome to my Page" :

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

Vous pouvez interroger cet élément en appelant :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

Ou en utilisant une requête de texte partiel :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

Cela fonctionne aussi pour les noms d'`id` et de `class` :

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Vous pouvez interroger cet élément en appelant :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Remarque :__ Vous ne pouvez pas mélanger plusieurs stratégies de sélection dans un seul sélecteur. Utilisez plutôt plusieurs requêtes d'éléments enchaînées pour atteindre le même objectif, par exemple :

```js
const elem = await $('header h1*=Welcome') // ne fonctionne pas !!!
// utilisez plutôt
const elem = await $('header').$('h1*=Welcome')
```

## Nom de Balise

Pour interroger un élément avec un nom de balise spécifique, utilisez `<tag>` ou `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

Vous pouvez interroger cet élément en appelant :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Attribut Name

Pour interroger des éléments avec un attribut name spécifique, vous pouvez soit utiliser un sélecteur CSS3 normal, soit la stratégie de nom fournie par le [JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) en passant quelque chose comme [name="some-name"] en paramètre de sélecteur :

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Remarque :__ Cette stratégie de sélection est obsolète et ne fonctionne que dans les anciens navigateurs qui utilisent le protocole JSONWireProtocol ou en utilisant Appium.

## xPath

Il est également possible d'interroger des éléments via un [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath) spécifique.

Un sélecteur xPath a un format comme `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

Vous pouvez interroger le deuxième paragraphe en appelant :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

Vous pouvez utiliser xPath pour également traverser l'arbre DOM vers le haut et vers le bas :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Sélecteur de Nom Accessible

Interrogez les éléments par leur nom accessible. Le nom accessible est ce qui est annoncé par un lecteur d'écran lorsque cet élément reçoit le focus. La valeur du nom accessible peut être à la fois du contenu visuel ou des alternatives textuelles cachées.

:::info

Vous pouvez en savoir plus sur ce sélecteur dans notre [article de blog de sortie](/blog/2022/09/05/accessibility-selector)

:::

### Récupération par `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### Récupération par `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### Récupération par contenu

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### Récupération par titre

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### Récupération par propriété `alt`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## ARIA - Attribut Role

Pour interroger des éléments basés sur les [rôles ARIA](https://www.w3.org/TR/html-aria/#docconformance), vous pouvez spécifier directement le rôle de l'élément comme `[role=button]` en tant que paramètre de sélecteur :

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## Attribut ID

La stratégie de localisation "id" n'est pas prise en charge dans le protocole WebDriver, on doit utiliser soit des stratégies de sélecteur CSS ou xPath à la place pour trouver des éléments en utilisant l'ID.

Cependant, certains pilotes (par exemple, [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) pourraient toujours [prendre en charge](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) ce sélecteur.

Les syntaxes de sélecteur actuellement prises en charge pour l'ID sont :

```js
//localisateur css
const button = await $('#someid')
//localisateur xpath
const button = await $('//*[@id="someid"]')
//stratégie id
// Remarque : fonctionne uniquement dans Appium ou des frameworks similaires qui prennent en charge la stratégie de localisation "ID"
const button = await $('id=resource-id/iosname')
```

## Fonction JS

Vous pouvez également utiliser des fonctions JavaScript pour récupérer des éléments à l'aide des API web natives. Bien sûr, vous ne pouvez le faire que dans un contexte web (par exemple, `browser`, ou contexte web sur mobile).

Étant donné la structure HTML suivante :

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

Vous pouvez interroger l'élément frère de `#elem` comme suit :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## Sélecteurs Profonds

:::warning

À partir de la `v9` de WebdriverIO, ce sélecteur spécial n'est plus nécessaire car WebdriverIO traverse automatiquement le Shadow DOM pour vous. Il est recommandé de migrer de ce sélecteur en supprimant le `>>>` devant.

:::

De nombreuses applications frontend reposent fortement sur des éléments avec [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Il est techniquement impossible d'interroger des éléments dans le shadow DOM sans solutions de contournement. Les commandes [`shadow$`](https://webdriver.io/docs/api/element/shadow$) et [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) étaient de telles solutions qui avaient leurs [limitations](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow). Avec le sélecteur profond, vous pouvez désormais interroger tous les éléments dans n'importe quel shadow DOM en utilisant la commande d'interrogation commune.

Supposons que nous ayons une application avec la structure suivante :

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

Avec ce sélecteur, vous pouvez interroger l'élément `<button />` qui est imbriqué dans un autre shadow DOM, par exemple :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## Sélecteurs Mobiles

Pour les tests mobiles hybrides, il est important que le serveur d'automatisation soit dans le *contexte* correct avant d'exécuter des commandes. Pour automatiser les gestes, le pilote devrait idéalement être défini dans un contexte natif. Mais pour sélectionner des éléments du DOM, le pilote devra être défini dans le contexte webview de la plateforme. Ce n'est qu'*alors* que les méthodes mentionnées ci-dessus peuvent être utilisées.

Pour les tests mobiles natifs, il n'y a pas de changement de contexte, car vous devez utiliser des stratégies mobiles et utiliser directement la technologie d'automatisation du périphérique sous-jacent. C'est particulièrement utile lorsqu'un test a besoin d'un contrôle précis pour trouver des éléments.

### Android UiAutomator

Le framework UI Automator d'Android fournit plusieurs façons de trouver des éléments. Vous pouvez utiliser l'[API UI Automator](https://developer.android.com/tools/testing-support-library/index.html#uia-apis), en particulier la [classe UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector) pour localiser des éléments. Dans Appium, vous envoyez le code Java, sous forme de chaîne, au serveur, qui l'exécute dans l'environnement de l'application, renvoyant l'élément ou les éléments.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher et ViewMatcher (Espresso uniquement)

La stratégie DataMatcher d'Android fournit un moyen de trouver des éléments par [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

Et de même [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (Espresso uniquement)

La stratégie de balise de vue fournit un moyen pratique de trouver des éléments par leur [balise](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29).

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

Lors de l'automatisation d'une application iOS, le [framework UI Automation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) d'Apple peut être utilisé pour trouver des éléments.

Cette [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) JavaScript possède des méthodes pour accéder à la vue et à tout ce qu'elle contient.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

Vous pouvez également utiliser la recherche par prédicat dans iOS UI Automation dans Appium pour affiner davantage la sélection des éléments. Voir [ici](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md) pour plus de détails.

### Chaînes de prédicats iOS XCUITest et chaînes de classes

Avec iOS 10 et supérieur (en utilisant le pilote `XCUITest`), vous pouvez utiliser des [chaînes de prédicats](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules) :

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

Et des [chaînes de classes](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules) :

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### Accessibility ID

La stratégie de localisation `accessibility id` est conçue pour lire un identifiant unique pour un élément d'interface utilisateur. Cela présente l'avantage de ne pas changer lors de la localisation ou de tout autre processus susceptible de modifier le texte. De plus, cela peut aider à créer des tests multiplateforme, si des éléments fonctionnellement identiques ont le même identifiant d'accessibilité.

- Pour iOS, il s'agit de l'`identifiant d'accessibilité` défini par Apple [ici](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html).
- Pour Android, l'`accessibility id` correspond à la `description de contenu` de l'élément, comme décrit [ici](https://developer.android.com/training/accessibility/accessible-app.html).

Pour les deux plateformes, obtenir un élément (ou plusieurs éléments) par leur `accessibility id` est généralement la meilleure méthode. C'est également la méthode préférée par rapport à la stratégie obsolète `name`.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### Nom de Classe

La stratégie `class name` est une `chaîne` représentant un élément d'interface utilisateur sur la vue actuelle.

- Pour iOS, c'est le nom complet d'une [classe UIAutomation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html), et commencera par `UIA-`, comme `UIATextField` pour un champ de texte. Une référence complète peut être trouvée [ici](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- Pour Android, c'est le nom pleinement qualifié d'une [classe UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator) [class](https://developer.android.com/reference/android/widget/package-summary.html), tel que `android.widget.EditText` pour un champ de texte. Une référence complète peut être trouvée [ici](https://developer.android.com/reference/android/widget/package-summary.html).
- Pour Youi.tv, c'est le nom complet d'une classe Youi.tv, et commencera par `CYI-`, tel que `CYIPushButtonView` pour un élément de bouton poussoir. Une référence complète peut être trouvée sur la [page GitHub du You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// Exemple iOS
await $('UIATextField').click()
// Exemple Android
await $('android.widget.DatePicker').click()
// Exemple Youi.tv
await $('CYIPushButtonView').click()
```

## Chaîner les Sélecteurs

Si vous souhaitez être plus précis dans votre requête, vous pouvez chaîner les sélecteurs jusqu'à ce que vous ayez trouvé le bon élément. Si vous appelez `element` avant votre commande réelle, WebdriverIO commence la requête à partir de cet élément.

Par exemple, si vous avez une structure DOM comme :

```html
<div class="row">
  <div class="entry">
    <label>Product A</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product B</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product C</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
</div>
```

Et que vous voulez ajouter le produit B au panier, ce serait difficile de le faire uniquement en utilisant le sélecteur CSS.

Avec le chaînage des sélecteurs, c'est beaucoup plus facile. Réduisez simplement l'élément souhaité étape par étape :

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Sélecteur d'Image Appium

En utilisant la stratégie de localisation `-image`, il est possible d'envoyer à Appium un fichier image représentant un élément auquel vous souhaitez accéder.

Formats de fichiers pris en charge `jpg,png,gif,bmp,svg`

Une référence complète peut être trouvée [ici](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**Remarque** : La façon dont Appium fonctionne avec ce sélecteur est qu'il prendra en interne une capture d'écran (de l'application) et utilisera le sélecteur d'image fourni pour vérifier si l'élément peut être trouvé dans cette capture d'écran.

Sachez qu'Appium peut redimensionner la capture d'écran prise pour la faire correspondre à la taille CSS de votre écran (cela se produira sur les iPhones mais aussi sur les machines Mac avec un écran Retina car le DPR est supérieur à 1). Cela entraînera la non-correspondance car le sélecteur d'image fourni peut avoir été pris à partir de la capture d'écran originale.
Vous pouvez corriger cela en mettant à jour les paramètres du serveur Appium, voir la [documentation Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings) pour les paramètres et [ce commentaire](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) pour une explication détaillée.

## Sélecteurs React

WebdriverIO fournit un moyen de sélectionner des composants React basés sur le nom du composant. Pour ce faire, vous avez le choix entre deux commandes : `react$` et `react$$`.

Ces commandes vous permettent de sélectionner des composants du [DOM Virtuel React](https://reactjs.org/docs/faq-internals.html) et de renvoyer soit un seul élément WebdriverIO, soit un tableau d'éléments (selon la fonction utilisée).

**Remarque** : Les commandes `react$` et `react$$` sont similaires en fonctionnalité, sauf que `react$$` renverra *toutes* les instances correspondantes sous forme de tableau d'éléments WebdriverIO, et `react$` renverra la première instance trouvée.

#### Exemple de base

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <div>
            MyComponent
        </div>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Dans le code ci-dessus, il y a une simple instance de `MyComponent` dans l'application, que React rend à l'intérieur d'un élément HTML avec `id="root"`.

Avec la commande `browser.react$`, vous pouvez sélectionner une instance de `MyComponent` :

```js
const myCmp = await browser.react$('MyComponent')
```

Maintenant que vous avez l'élément WebdriverIO stocké dans la variable `myCmp`, vous pouvez exécuter des commandes d'élément contre celui-ci.

#### Filtrage des composants

La bibliothèque que WebdriverIO utilise en interne permet de filtrer votre sélection par props et/ou état du composant. Pour ce faire, vous devez passer un deuxième argument pour les props et/ou un troisième argument pour l'état à la commande du navigateur.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent(props) {
    return (
        <div>
            Hello { props.name || 'World' }!
        </div>
    )
}

function App() {
    return (
        <div>
            <MyComponent name="WebdriverIO" />
            <MyComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Si vous voulez sélectionner l'instance de `MyComponent` qui a une prop `name` comme `WebdriverIO`, vous pouvez exécuter la commande comme ceci :

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

Si vous vouliez filtrer votre sélection par état, la commande `browser` ressemblerait à quelque chose comme :

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

#### Traiter avec `React.Fragment`

Lorsque vous utilisez la commande `react$` pour sélectionner des [fragments](https://reactjs.org/docs/fragments.html) React, WebdriverIO renverra le premier enfant de ce composant comme nœud du composant. Si vous utilisez `react$$`, vous recevrez un tableau contenant tous les nœuds HTML à l'intérieur des fragments qui correspondent au sélecteur.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <React.Fragment>
            <div>
                MyComponent
            </div>
            <div>
                MyComponent
            </div>
        </React.Fragment>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Étant donné l'exemple ci-dessus, voici comment fonctionnent les commandes :

```js
await browser.react$('MyComponent') // renvoie l'élément WebdriverIO pour le premier <div />
await browser.react$$('MyComponent') // renvoie les éléments WebdriverIO pour le tableau [<div />, <div />]
```

**Remarque :** Si vous avez plusieurs instances de `MyComponent` et que vous utilisez `react$$` pour sélectionner ces composants de fragment, un tableau unidimensionnel de tous les nœuds vous sera renvoyé. En d'autres termes, si vous avez 3 instances de `<MyComponent />`, un tableau avec six éléments WebdriverIO vous sera renvoyé.

## Stratégies de Sélection Personnalisées

Si votre application nécessite une façon spécifique de récupérer des éléments, vous pouvez définir vous-même une stratégie de sélection personnalisée que vous pouvez utiliser avec `custom$` et `custom$$`. Pour cela, enregistrez votre stratégie une fois au début du test, par exemple dans un hook `before` :

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

Étant donné l'extrait HTML suivant :

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

Puis utilisez-le en appelant :

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**Remarque :** cela ne fonctionne que dans un environnement web dans lequel la commande [`execute`](/docs/api/browser/execute) peut être exécutée.