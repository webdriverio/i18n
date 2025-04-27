---
id: element
title: L'Objet Element
---

Un Objet Element est un objet représentant un élément sur l'agent utilisateur distant, par exemple un [Nœud DOM](https://developer.mozilla.org/en-US/docs/Web/API/Element) lors de l'exécution d'une session dans un navigateur ou [un élément mobile](https://developer.apple.com/documentation/swift/sequence/element) pour mobile. Il peut être obtenu en utilisant l'une des nombreuses commandes de requête d'élément, par exemple [`$`](/docs/api/element/$), [`custom$`](/docs/api/element/custom$), [`react$`](/docs/api/element/react$) ou [`shadow$`](/docs/api/element/shadow$).

## Propriétés

Un objet élément possède les propriétés suivantes :

| Nom | Type | Détails |
| ---- | ---- | ------- |
| `sessionId` | `String` | Identifiant de session attribué par le serveur distant. |
| `elementId` | `String` | [Référence d'élément web](https://w3c.github.io/webdriver/#elements) associée qui peut être utilisée pour interagir avec l'élément au niveau du protocole |
| `selector` | `String` | [Sélecteur](/docs/selectors) utilisé pour interroger l'élément. |
| `parent` | `Object` | Soit l'[Objet Browser](/docs/api/browser) lorsque l'élément a été récupéré à partir de celui-ci (par exemple `const elem = browser.$('selector')`) ou un [Objet Element](/docs/api/element) s'il a été récupéré à partir d'un élément parent (par exemple `elem.$('selector')`) |
| `options` | `Object` | [Options](/docs/configuration) WebdriverIO selon la façon dont l'objet navigateur a été créé. Voir plus de [types de configuration](/docs/setuptypes). |

## Méthodes
Un objet élément fournit toutes les méthodes de la section protocole, par exemple le protocole [WebDriver](/docs/api/webdriver) ainsi que les commandes listées dans la section élément. Les commandes de protocole disponibles dépendent du type de session. Si vous exécutez une session de navigateur automatisée, aucune des commandes Appium [commands](/docs/api/appium) ne sera disponible et vice versa.

En plus de cela, les commandes suivantes sont disponibles :

| Nom | Paramètres | Détails |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Type: `String`)<br />- `fn` (Type: `Function`) | Permet de définir des commandes personnalisées qui peuvent être appelées depuis l'objet navigateur à des fins de composition. En savoir plus dans le guide [Commande personnalisée](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Type: `String`)<br />- `fn` (Type: `Function`) | Permet de remplacer n'importe quelle commande du navigateur par une fonctionnalité personnalisée. À utiliser avec précaution car cela peut confondre les utilisateurs du framework. En savoir plus dans le guide [Commande personnalisée](/docs/customcommands#overwriting-native-commands). |

## Remarques

### Chaîne d'éléments

Lorsque vous travaillez avec des éléments, WebdriverIO fournit une syntaxe spéciale pour simplifier leur interrogation et composer des recherches d'éléments imbriqués complexes. Comme les objets élément vous permettent de trouver des éléments dans leur branche d'arborescence à l'aide de méthodes de requête communes, les utilisateurs peuvent récupérer des éléments imbriqués comme suit :

```js
const header = await $('#header')
const headline = await header.$('#headline')
console.log(await headline.getText()) // affiche "I am a headline"
```

Avec des structures profondément imbriquées, l'attribution de tout élément imbriqué à un tableau pour l'utiliser ensuite peut être assez verbeuse. Par conséquent, WebdriverIO a le concept de requêtes d'éléments chaînées qui permettent de récupérer des éléments imbriqués comme ceci :

```js
console.log(await $('#header').$('#headline').getText())
```

Cela fonctionne également lors de la récupération d'un ensemble d'éléments, par exemple :

```js
// obtenir le texte du 3ème titre dans le 2ème en-tête
console.log(await $$('#header')[1].$$('#headline')[2].getText())
```

Lorsque vous travaillez avec un ensemble d'éléments, cela peut être particulièrement utile pour interagir avec eux, donc au lieu de faire :

```js
const elems = await $$('div')
const locations = await Promise.all(
    elems.map((el) => el.getLocation())
)
```

Vous pouvez directement appeler les méthodes Array sur la chaîne d'éléments, par exemple :

```js
const location = await $$('div').map((el) => el.getLocation())
```

identique à :

```js
const divs = await $$('div')
const location = await divs.map((el) => el.getLocation())
```

WebdriverIO utilise une implémentation personnalisée qui prend en charge les itérateurs asynchrones sous le capot, de sorte que toutes les commandes de leur API sont également prises en charge pour ces cas d'utilisation.

__Remarque :__ tous les itérateurs asynchrones renvoient une promesse même si votre callback n'en renvoie pas, par exemple :

```ts
const divs = await $$('div')
console.log(divs.map((div) => div.selector)) // ❌ renvoie "Promise<string>[]"
console.log(await divs.map((div) => div.selector)) // ✅ renvoie "string[]"
```

### Commandes personnalisées

Vous pouvez définir des commandes personnalisées dans la portée du navigateur pour abstraire les flux de travail couramment utilisés. Consultez notre guide sur les [Commandes personnalisées](/docs/customcommands#adding-custom-commands) pour plus d'informations.