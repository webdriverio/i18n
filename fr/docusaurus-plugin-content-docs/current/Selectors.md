---
id: selectors
title: Sélecteurs
description: "Trouvez des éléments avec CSS, texte, XPath, nom d'accessibilité, rôle ARIA et d'autres stratégies de sélection, et découvrez lesquelles sont les plus robustes."
---

Le [protocole WebDriver](https://w3c.github.io/webdriver/) fournit plusieurs stratégies de sélection pour interroger un élément. WebdriverIO les simplifie pour que la sélection d'éléments reste simple. Veuillez noter que même si les commandes pour interroger des éléments s'appellent `$` et `$$`, elles n'ont rien à voir avec jQuery ou le [Sizzle Selector Engine](https://github.com/jquery/sizzle).

Bien qu'il existe de nombreux sélecteurs différents, seuls quelques-uns d'entre eux offrent un moyen robuste de trouver le bon élément. Par exemple, étant donné le bouton suivant :

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

| Sélecteur | Recommandé | Remarques |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 Jamais | Le pire - trop générique, aucun contexte. |
| `$('.btn.btn-large')` | 🚨 Jamais | Mauvais. Couplé au style. Très susceptible de changer. |
| `$('#main')` | ⚠️ Avec parcimonie | Mieux. Mais toujours couplé au style ou aux écouteurs d'événements JS. |
| `$(() => document.queryElement('button'))` | ⚠️ Avec parcimonie | Requête efficace, complexe à écrire. |
| `$('button[name="submission"]')` | ⚠️ Avec parcimonie | Couplé à l'attribut `name` qui a une sémantique HTML. |
| `$('button[data-testid="submit"]')` | ✅ Bon | Nécessite un attribut supplémentaire, non lié à l'a11y. |
| `$('aria/Submit')` | ✅ Bon | Bon. Ressemble à la façon dont l'utilisateur interagit avec la page. Il est recommandé d'utiliser des fichiers de traduction pour que vos tests ne cassent pas lorsque les traductions sont mises à jour. Sur les sessions WebDriver BiDi, cela utilise l'arbre d'accessibilité du navigateur. Sur les sessions Classic, cela se rabat sur XPath et peut être plus lent sur les grandes pages. |
| `$('button=Submit')` | ✅ Toujours | Le meilleur. Ressemble à la façon dont l'utilisateur interagit avec la page et est rapide. Il est recommandé d'utiliser des fichiers de traduction pour que vos tests ne cassent pas lorsque les traductions sont mises à jour. |

## Mode strict

Depuis la v10, la commande [`$`](/docs/api/browser/$) est __stricte__ : elle représente exactement un élément. Si le sélecteur correspond à plus d'un élément, la commande lève une `StrictSelectorError` au lieu de choisir silencieusement la première correspondance :

```js
// there are 12 buttons on the page
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
```

C'est le même comportement que les [locators de Playwright](https://playwright.dev/docs/locators#strictness). Cypress diffère : ses requêtes peuvent se résoudre en plusieurs éléments, et ce sont les commandes d'action telles que [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) qui rejettent par défaut un sujet à plusieurs éléments. Le mode strict révèle les sélecteurs trop larges, qui sinon interagiraient silencieusement avec le mauvais élément dès que la page s'agrandit.

La règle s'applique à chaque étape d'une [chaîne](#chain-selectors) et à chaque type de sélecteur que `$` accepte — sélecteurs sous forme de chaîne (y compris ceux qui traversent le shadow DOM), [fonctions JS](#js-function), [sélecteurs mobiles](#mobile-selectors) et références de [stratégies personnalisées](#custom-selector-strategies).

### Ce qui n'est pas affecté

- `$$` continue de renvoyer zéro ou plusieurs éléments, sous forme d'[`ElementArray`](/docs/api/browser/$$). Attendez la liste (ou sa `.length`) avant de lire le nombre ou d'utiliser `for...of`. `for await` fonctionne directement sur la liste.
- Les commandes utilitaires dédiées `custom$`, `shadow$` et `react$` ne sont pas strictes — elles renvoient toujours leur première correspondance, tout comme leurs équivalents `$$`.
- Un sélecteur qui ne correspond à rien renvoie toujours un élément résolu de manière paresseuse, donc [`waitForExist`](/docs/api/element/waitForExist) et le comportement d'[attente automatique](/docs/autowait) restent inchangés.
- Passer une référence d'élément, par exemple `$(await browser.getActiveElement())`, fait toujours référence à un seul nœud et n'est jamais vérifié.

:::info Migration vers la v10

Pour savoir comment auditer votre suite à la recherche de violations du mode strict, affiner des requêtes individuelles ou les exclure, et désactiver le mode strict pour l'ensemble du projet, consultez le [guide de migration v10](/docs/v10-migration).

:::

## Sélecteur de requête CSS

Sauf indication contraire, WebdriverIO interrogera les éléments en utilisant le modèle de [sélecteur CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), par exemple :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## Texte de lien

Pour obtenir un élément d'ancrage contenant un texte spécifique, interrogez le texte en le faisant commencer par un signe égal (`=`).

Par exemple :

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

Vous pouvez interroger cet élément en appelant :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## Texte de lien partiel

Pour trouver un élément d'ancrage dont le texte visible correspond partiellement à votre valeur de recherche,
interrogez-le en utilisant `*=` devant la chaîne de requête (par exemple `*=driver`).

Vous pouvez également interroger l'élément de l'exemple ci-dessus en appelant :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Remarque :__ Vous ne pouvez pas mélanger plusieurs stratégies de sélection dans un seul sélecteur. Utilisez plusieurs requêtes d'éléments chaînées pour atteindre le même objectif, par exemple :

```js
const elem = await $('header h1*=Welcome') // doesn't work!!!
// use instead
const elem = await $('header').$('*=driver')
```

## Élément avec un certain texte

La même technique peut également être appliquée aux éléments. De plus, il est aussi possible d'effectuer une correspondance insensible à la casse en utilisant `.=` ou `.*=` dans la requête.

Par exemple, voici une requête pour un titre de niveau 1 avec le texte « Welcome to my Page » :

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

Vous pouvez interroger cet élément en appelant :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

Ou en utilisant une requête sur un texte partiel :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

La même chose fonctionne pour les noms d'`id` et de `class` :

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Vous pouvez interroger cet élément en appelant :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Remarque :__ Vous ne pouvez pas mélanger plusieurs stratégies de sélection dans un seul sélecteur. Utilisez plusieurs requêtes d'éléments chaînées pour atteindre le même objectif, par exemple :

```js
const elem = await $('header h1*=Welcome') // doesn't work!!!
// use instead
const elem = await $('header').$('h1*=Welcome')
```

## Nom de balise

Pour interroger un élément avec un nom de balise spécifique, utilisez `<tag>` ou `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

Vous pouvez interroger cet élément en appelant :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Attribut name

Pour interroger des éléments avec un attribut name spécifique, utilisez un sélecteur CSS tel que `[name="some-name"]`. Dans une session mobile, ce même raccourci est envoyé avec la stratégie de localisation `name` d'Appium :

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Remarque :__ La stratégie de localisation `name` est un localisateur Appium. Les sessions desktop conservent `[name="some-name"]` sur la stratégie CSS.

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

Vous pouvez également utiliser xPath pour parcourir l'arbre DOM vers le haut et vers le bas :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Sélecteur de nom d'accessibilité

Interrogez des éléments par leur nom accessible. Le nom accessible est ce qui est annoncé par un lecteur d'écran lorsque cet élément reçoit le focus. La valeur du nom accessible peut être à la fois du contenu visuel ou des alternatives textuelles masquées.

Sur les sessions [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) (Chrome, Edge, Firefox et autres navigateurs compatibles BiDi), WebdriverIO utilise d'abord [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) avec un localisateur d'accessibilité. Celui-ci interroge directement l'arbre d'accessibilité du navigateur et est généralement beaucoup plus rapide que l'approximation XPath. Si le localisateur d'accessibilité ne trouve rien, WebdriverIO se rabat sur l'heuristique XPath Classic afin que les requêtes `aria/` existantes continuent de correspondre.

:::info

Vous pouvez en savoir plus sur ce sélecteur dans notre [article de blog de publication](/blog/2022/09/05/accessibility-selector)

:::

### Récupérer par `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### Récupérer par `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### Récupérer par contenu

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### Récupérer par titre

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### Récupérer par propriété `alt`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## Sélecteur de rôle

Interrogez des éléments par leur rôle ARIA et leur nom accessible, de la façon dont un lecteur d'écran les décrit : « le bouton *Add to cart* ». Un rôle accompagné d'un nom continue de correspondre lorsque les noms de classe, les identifiants de test ou la structure du DOM changent.

```js
await $('role/button[name="Add to cart"]').click()
await expect($('role/heading[name="Order summary"]')).toBeDisplayed()

// role only
const rows = await $$('role/row')

// scoped to a parent element
const dialog = $('role/dialog[name="Checkout"]')
await dialog.$('role/button[name="Pay now"]').click()
```

La syntaxe est `role/<role>` ou `role/<role>[name="<accessible name>"]`. Les guillemets simples fonctionnent également, et un guillemet à l'intérieur du nom est échappé avec une barre oblique inverse : `role/button[name="Say \"hi\""]`.

- Le nom doit correspondre au nom accessible complet.
- Le rôle doit être un rôle ARIA. Une faute de frappe échoue en indiquant le rôle valide le plus proche, par exemple `"buton" is not an ARIA role. Did you mean "button"?`.
- `img` et son nom ARIA 1.3 `image` sont le même rôle.
- Le sélecteur suit le [mode strict](#strict-mode) de `$` comme tout autre sélecteur.

Dans une session [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/), WebdriverIO transmet le rôle et le nom à [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes). Le navigateur calcule lui-même les deux, de la même manière que les technologies d'assistance voient la page. Les éléments à l'intérieur des shadow roots ouverts et des frames, y compris les frames d'une autre origine, sont trouvés. Si le navigateur ne trouve aucun élément, il n'y a pas de repli sur une heuristique. Notez que c'est le navigateur qui décide du rôle : par exemple, une `<table>` sans en-têtes ni légende peut être une table de mise en page, et ses lignes n'ont alors pas de rôle `row`.

Dans une session WebDriver Classic, et lorsqu'un navigateur ne prend pas en charge le localisateur de rôle, WebdriverIO calcule le rôle et le nom accessible dans la page avec [`dom-accessibility-api`](https://github.com/eps1lon/dom-accessibility-api), l'implémentation qu'utilise Testing Library. Un champ de texte sans libellé est nommé par son `placeholder`, comme le font les navigateurs. Le sélecteur de rôle n'est pas disponible dans un contexte d'application mobile native. Utilisez-y un [accessibility id](#accessibility-id).

## ARIA - Attribut role

Pour interroger des éléments en fonction des [rôles ARIA](https://www.w3.org/TR/html-aria/#docconformance), vous pouvez directement spécifier le rôle de l'élément comme `[role=button]` en tant que paramètre de sélecteur. Ce sélecteur estime le rôle à partir du nom de l'élément et de ses attributs. Préférez le [sélecteur de rôle](#role-selector), qui utilise le rôle calculé par le navigateur et peut également correspondre au nom accessible :

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## Attribut ID

La stratégie de localisation « id » n'est pas prise en charge dans le protocole WebDriver ; il convient d'utiliser plutôt les stratégies de sélection CSS ou xPath pour trouver des éléments par ID.

Cependant, certains pilotes (par exemple [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) peuvent encore [prendre en charge](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) ce sélecteur.

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

Vous pouvez également utiliser des fonctions JavaScript pour récupérer des éléments à l'aide des API web natives. Bien entendu, vous ne pouvez le faire qu'à l'intérieur d'un contexte web (par exemple, `browser`, ou un contexte web sur mobile).

Étant donné la structure HTML suivante :

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

Vous pouvez interroger l'élément frère de `#elem` comme suit :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## Sélecteurs profonds

:::warning

À partir de la `v9` de WebdriverIO, ce sélecteur spécial n'est plus nécessaire, car WebdriverIO traverse automatiquement le Shadow DOM pour vous. Il est recommandé d'abandonner ce sélecteur en supprimant le `>>>` qui le précède.

:::

De nombreuses applications frontend s'appuient fortement sur des éléments avec [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Il est techniquement impossible d'interroger des éléments dans le shadow DOM sans solutions de contournement. Les commandes [`shadow$`](https://webdriver.io/docs/api/element/shadow$) et [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) étaient de telles solutions de contournement, avec leurs [limitations](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow). Avec le sélecteur profond, vous pouvez désormais interroger tous les éléments de n'importe quel shadow DOM en utilisant la commande de requête habituelle.

Supposons que nous ayons une application avec la structure suivante :

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

Avec ce sélecteur, vous pouvez interroger l'élément `<button />` imbriqué dans un autre shadow DOM, par exemple :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## Sélecteurs mobiles

Pour les tests mobiles hybrides, il est important que le serveur d'automatisation soit dans le bon *contexte* avant d'exécuter des commandes. Pour automatiser des gestes, le pilote doit idéalement être défini sur le contexte natif. Mais pour sélectionner des éléments du DOM, le pilote devra être défini sur le contexte webview de la plateforme. Ce n'est *qu'alors* que les méthodes mentionnées ci-dessus peuvent être utilisées.

Pour les tests mobiles natifs, il n'y a pas de basculement entre contextes, car vous devez utiliser des stratégies mobiles et utiliser directement la technologie d'automatisation sous-jacente de l'appareil. C'est particulièrement utile lorsqu'un test nécessite un contrôle précis sur la recherche d'éléments.

### Android UiAutomator

Le framework UI Automator d'Android offre plusieurs moyens de trouver des éléments. Vous pouvez utiliser l'[API UI Automator](https://developer.android.com/tools/testing-support-library/index.html#uia-apis), en particulier la [classe UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector), pour localiser des éléments. Dans Appium, vous envoyez le code Java, sous forme de chaîne, au serveur, qui l'exécute dans l'environnement de l'application et renvoie l'élément ou les éléments.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher et ViewMatcher (Espresso uniquement)

La stratégie DataMatcher d'Android permet de trouver des éléments par [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

Et de même par [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (Espresso uniquement)

La stratégie view tag offre un moyen pratique de trouver des éléments par leur [tag](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29).

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

Lors de l'automatisation d'une application iOS, le [framework UI Automation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) d'Apple peut être utilisé pour trouver des éléments.

Cette [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) JavaScript dispose de méthodes pour accéder à la vue et à tout ce qu'elle contient.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

Vous pouvez également utiliser la recherche par prédicat dans iOS UI Automation avec Appium pour affiner encore davantage la sélection d'éléments. Consultez [cette page](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md) pour plus de détails.

### Chaînes de prédicat et chaînes de classes iOS XCUITest

Avec iOS 10 et versions ultérieures (en utilisant le pilote `XCUITest`), vous pouvez utiliser des [chaînes de prédicat](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules) :

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

La stratégie de localisation `accessibility id` est conçue pour lire un identifiant unique pour un élément d'interface. Cela présente l'avantage de ne pas changer lors de la localisation ou de tout autre processus susceptible de modifier le texte. De plus, cela peut aider à créer des tests multiplateformes, si des éléments fonctionnellement identiques ont le même accessibility id.

- Pour iOS, il s'agit de l'`accessibility identifier` décrit par Apple [ici](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html).
- Pour Android, l'`accessibility id` correspond au `content-description` de l'élément, comme décrit [ici](https://developer.android.com/training/accessibility/accessible-app.html).

Pour les deux plateformes, obtenir un élément (ou plusieurs éléments) par leur `accessibility id` est généralement la meilleure méthode. C'est également la méthode préférée par rapport à la stratégie dépréciée `name`.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### Nom de classe

La stratégie `class name` est une `string` représentant un élément d'interface dans la vue actuelle.

- Pour iOS, il s'agit du nom complet d'une [classe UIAutomation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html), qui commence par `UIA-`, comme `UIATextField` pour un champ de texte. Une référence complète est disponible [ici](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- Pour Android, il s'agit du nom pleinement qualifié d'une [classe](https://developer.android.com/reference/android/widget/package-summary.html) [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator), comme `android.widget.EditText` pour un champ de texte. Une référence complète est disponible [ici](https://developer.android.com/reference/android/widget/package-summary.html).
- Pour Youi.tv, il s'agit du nom complet d'une classe Youi.tv, qui commence par `CYI-`, comme `CYIPushButtonView` pour un élément bouton-poussoir. Une référence complète est disponible sur la [page GitHub de You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// Exemple iOS
await $('UIATextField').click()
// Exemple Android
await $('android.widget.DatePicker').click()
// Exemple Youi.tv
await $('CYIPushButtonView').click()
```

## Chaînage de sélecteurs

Si vous souhaitez être plus précis dans votre requête, vous pouvez chaîner des sélecteurs jusqu'à trouver le bon
élément. Si vous appelez `element` avant votre commande effective, WebdriverIO démarre la requête à partir de cet élément.

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

Et que vous souhaitez ajouter le produit B au panier, il serait difficile de le faire uniquement avec le sélecteur CSS.

Avec le chaînage de sélecteurs, c'est bien plus simple. Il suffit d'affiner l'élément souhaité étape par étape :

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Sélecteur d'image Appium

En utilisant la stratégie de localisation `-image`, il est possible d'envoyer à Appium un fichier image représentant un élément auquel vous souhaitez accéder.

Formats de fichier pris en charge : `jpg,png,gif,bmp,svg`

Une référence complète est disponible [ici](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**Remarque** : Avec ce sélecteur, Appium prend en interne une capture d'écran (de l'application) et utilise le sélecteur d'image fourni
pour vérifier si l'élément peut être trouvé dans cette capture d'écran (de l'application).

Sachez qu'Appium peut redimensionner la capture d'écran (de l'application) prise pour qu'elle corresponde à la taille CSS de votre écran (d'application) (cela se produit
sur les iPhones, mais aussi sur les Mac dotés d'un écran Retina, car le DPR est supérieur à 1). Cela entraînera l'absence de correspondance, car
le sélecteur d'image fourni peut avoir été extrait de la capture d'écran originale.
Vous pouvez corriger cela en modifiant les paramètres du serveur Appium ; consultez la [documentation Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings)
pour les paramètres et [ce commentaire](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) pour une explication détaillée.

## Sélecteurs React

WebdriverIO offre un moyen de sélectionner des composants React en fonction du nom du composant. Pour cela, vous avez le choix entre deux commandes : `react$` et `react$$`.

Ces commandes vous permettent de sélectionner des composants dans le [VirtualDOM React](https://reactjs.org/docs/faq-internals.html) et de renvoyer soit un seul élément WebdriverIO, soit un tableau d'éléments (selon la fonction utilisée).

**Remarque** : Les commandes `react$` et `react$$` ont des fonctionnalités similaires, sauf que `react$$` renverra *toutes* les instances correspondantes sous forme de tableau d'éléments WebdriverIO, et `react$` renverra la première instance trouvée.

Les commandes fonctionnent avec React 16 à 19, pour une application qui démarre avec `createRoot` ou avec `ReactDOM.render`. Elles lisent les composants du rendu actuel, elles trouvent donc aussi les composants ajoutés par un changement d'état. Si React n'a pas encore rendu de racine de la page, elles attendent jusqu'à 5 secondes.

#### Exemple de base

```jsx
// index.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'

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

createRoot(document.querySelector('#root')).render(<App />)
```

Dans le code ci-dessus, il y a une simple instance de `MyComponent` dans l'application, que React rend à l'intérieur d'un élément HTML avec `id="root"`.

Avec la commande `browser.react$`, vous pouvez sélectionner une instance de `MyComponent` :

```js
const myCmp = await browser.react$('MyComponent')
```

Maintenant que l'élément WebdriverIO est stocké dans la variable `myCmp`, vous pouvez exécuter des commandes d'élément sur celui-ci.

#### Filtrage des composants

Vous pouvez filtrer votre sélection par les props et/ou l'état du composant. Pour ce faire, passez `props` et/ou `state` dans le deuxième argument de la commande.

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

Si vous souhaitez sélectionner l'instance de `MyComponent` qui a une prop `name` égale à `WebdriverIO`, vous pouvez exécuter la commande ainsi :

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

Si vous vouliez filtrer notre sélection par état, la commande `browser` ressemblerait à ceci :

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

Un filtre correspond lorsque chacune de ses clés que le composant possède également correspond. Une clé que le composant ne possède pas est ignorée. Un objet imbriqué correspond de la même manière, et un tableau correspond lorsqu'il a une valeur en commun avec le tableau du composant. `null`, `false` et `0` correspondent à la même valeur. Pour un composant fonction avec des hooks, l'état est celui du premier hook (`useState` ou `useReducer`) : si le premier hook est un autre hook, par exemple `useRef`, le filtre d'état ne correspond pas. Avec à la fois `props` et `state`, un composant doit correspondre aux deux.

#### Règles des sélecteurs

- `*` correspond à un ou plusieurs caractères : `browser.react$$('My*')` trouve `MyComponent` et `MyOtherComponent`.
- Des noms séparés par des espaces trouvent un composant à l'intérieur d'un autre : `browser.react$$('List Item')` trouve chaque `Item` à l'intérieur d'une `List`.
- Le nom d'un composant est son `displayName`, ou à défaut le nom de sa fonction ou de sa classe. Un composant `React.memo` porte le nom de sa fonction (le build de développement de React 17 lui donne aussi le `displayName` de l'objet memo). Un composant `React.forwardRef` n'a pas de nom, sauf s'il a un `displayName`.
- Pour un composant d'ordre supérieur avec un nom comme `withRouter(MyComponent)`, c'est le nom entre parenthèses qui est utilisé : `MyComponent`.
- Sans portée d'élément, les commandes recherchent dans toutes les racines React de la page, dans l'ordre du document, y compris les racines à l'intérieur d'autres racines et les racines dans des shadow roots ouverts. `react$` donne la première correspondance. Pour rechercher dans une seule racine, appelez la commande sur son conteneur ou sur un élément de cette racine : `$('#other-root').react$$('MyComponent')`.
- Les résultats arrivent racine après racine. Dans une racine, ils arrivent dans l'ordre de l'arbre des composants, niveau par niveau, et non dans l'ordre du document. `react$$` donne chaque nœud DOM une seule fois.
- Pour une application dans une frame, appelez la commande sur le contexte de navigation de la frame, ou sur un élément de la frame : `(await page.frame({ selector: 'iframe' })).react$$('MyComponent')`.

Limites connues :

- Un composant qui ne rend que du texte donne un nœud texte. Avec WebDriver Classic, un nœud texte ne peut pas être renvoyé, et la commande échoue avec `javascript error: circular reference`.
- Pendant que React hydrate une frontière `Suspense` d'une page rendue côté serveur, les composants qu'elle contient n'existent pas encore. Attendez que la page ait terminé son hydratation.

#### Gestion de `React.Fragment`

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

Avec l'exemple ci-dessus, voici comment les commandes fonctionneraient :

```js
await browser.react$('MyComponent') // renvoie l'élément WebdriverIO pour le premier <div />
await browser.react$$('MyComponent') // renvoie les éléments WebdriverIO pour le tableau [<div />, <div />]
```

**Remarque :** Si vous avez plusieurs instances de `MyComponent` et que vous utilisez `react$$` pour sélectionner ces composants fragments, un tableau unidimensionnel de tous les nœuds vous sera renvoyé. En d'autres termes, si vous avez 3 instances de `<MyComponent />`, vous recevrez un tableau contenant six éléments WebdriverIO.

## Stratégies de sélection personnalisées


Si votre application nécessite une manière spécifique de récupérer des éléments, vous pouvez définir vous-même une stratégie de sélection personnalisée utilisable avec `custom$` et `custom$$`. Pour cela, enregistrez votre stratégie une seule fois au début du test, par exemple dans un hook `before` :

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

Étant donné l'extrait HTML suivant :

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

Utilisez-la ensuite en appelant :

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**Remarque :** cela ne fonctionne que dans un environnement web dans lequel la commande [`execute`](/docs/api/browser/execute) peut être exécutée.