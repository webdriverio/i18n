---
id: selectors
title: Sélecteurs
---

Le [Protocole WebDriver](https://w3c.github.io/webdriver/) fournit plusieurs stratégies de sélection pour interroger un élément. WebdriverIO les simplifie pour faciliter la sélection des éléments. Veuillez noter que même si la commande pour interroger les éléments s'appelle `$` et `$$`, elles n'ont rien à voir avec jQuery ou le [Moteur de Sélection Sizzle](https://github.com/jquery/sizzle).

Bien qu'il existe de nombreux sélecteurs différents, seuls quelques-uns d'entre eux offrent un moyen fiable de trouver le bon élément. Par exemple, étant donné le bouton suivant :

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
| `$('button')` | 🚨 Jamais | Le pire - trop générique, sans contexte. |
| `$('.btn.btn-large')` | 🚨 Jamais | Mauvais. Couplé au style. Très susceptible de changer. |
| `$('#main')` | ⚠️ Avec parcimonie | Mieux. Mais toujours couplé au style ou aux écouteurs d'événements JS. |
| `$(() => document.queryElement('button'))` | ⚠️ Avec parcimonie | Requête efficace, complexe à écrire. |
| `$('button[name="submission"]')` | ⚠️ Avec parcimonie | Couplé à l'attribut `name` qui a une sémantique HTML. |
| `$('button[data-testid="submit"]')` | ✅ Bon | Nécessite un attribut supplémentaire, non lié à l'a11y. |
| `$('aria/Submit')` ou `$('button=Submit')` | ✅ Toujours | Le meilleur. Ressemble à la façon dont l'utilisateur interagit avec la page. Il est recommandé d'utiliser les fichiers de traduction de votre frontend pour que vos tests ne échouent jamais lorsque les traductions sont mises à jour |

## Sélecteur CSS

Sauf indication contraire, WebdriverIO interrogera les éléments en utilisant le modèle de [sélecteur CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), par exemple :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## Texte de lien

Pour obtenir un élément d'ancrage avec un texte spécifique, interrogez le texte en commençant par un signe égal (`=`).

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
interrogez-le en utilisant `*=` devant la chaîne de requête (par exemple, `*=driver`).

Vous pouvez également interroger l'élément de l'exemple ci-dessus en appelant :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Remarque :__ Vous ne pouvez pas mélanger plusieurs stratégies de sélection dans un seul sélecteur. Utilisez plutôt plusieurs requêtes d'éléments chaînées pour atteindre le même objectif, par exemple :

```js
const elem = await $('header h1*=Welcome') // ne fonctionne pas !!!
// utilisez plutôt
const elem = await $('header').$('*=driver')
```

## Élément avec un texte spécifique

La même technique peut être appliquée aux éléments également. De plus, il est également possible de faire une correspondance insensible à la casse en utilisant `.=` ou `.*=` dans la requête.

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

La même chose fonctionne pour les noms d'`id` et de `class` :

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Vous pouvez interroger cet élément en appelant :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Remarque :__ Vous ne pouvez pas mélanger plusieurs stratégies de sélection dans un seul sélecteur. Utilisez plutôt plusieurs requêtes d'éléments chaînées pour atteindre le même objectif, par exemple :

```js
const elem = await $('header h1*=Welcome') // ne fonctionne pas !!!
// utilisez plutôt
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

## Attribut Name

Pour interroger des éléments avec un attribut name spécifique, vous pouvez soit utiliser un sélecteur CSS3 normal, soit la stratégie de nom fournie par le [JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) en passant quelque chose comme [name="some-name"] comme paramètre de sélecteur :

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Remarque :__ Cette stratégie de sélection est obsolète et ne fonctionne que dans les anciens navigateurs qui sont exécutés par le protocole JSONWireProtocol ou en utilisant Appium.

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

Vous pouvez utiliser xPath pour également parcourir l'arbre DOM vers le haut et vers le bas :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Sélecteur de nom d'accessibilité

Interrogez les éléments par leur nom accessible. Le nom accessible est ce qui est annoncé par un lecteur d'écran lorsque cet élément reçoit le focus. La valeur du nom accessible peut être à la fois du contenu visuel ou des alternatives textuelles cachées.

:::info

Vous pouvez en savoir plus sur ce sélecteur dans notre [article de blog de lancement](/blog/2022/09/05/accessibility-selector)

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

## ARIA - Attribut Role

Pour interroger des éléments basés sur les [rôles ARIA](https://www.w3.org/TR/html-aria/#docconformance), vous pouvez spécifier directement le rôle de l'élément comme `[role=button]` en tant que paramètre de sélecteur :

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## Attribut ID

La stratégie de localisation "id" n'est pas prise en charge dans le protocole WebDriver, il faut utiliser les stratégies de sélecteur CSS ou xPath pour trouver des éléments en utilisant l'ID.

Cependant, certains pilotes (par exemple [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) pourraient encore [prendre en charge](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) ce sélecteur.

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

Vous pouvez également utiliser des fonctions JavaScript pour récupérer des éléments en utilisant les API web natives. Bien sûr, vous ne pouvez le faire que dans un contexte web (par exemple, `browser`, ou contexte web sur mobile).

Étant donné la structure HTML suivante :

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

Vous pouvez interroger l'élément frère de `#elem` comme suit :

```