---
id: expect-webdriverio
title: Expect
custom_edit_url: https://github.com/webdriverio/expect-webdriverio/edit/main/README.md
---



Lorsque vous écrivez des tests, vous avez souvent besoin de vérifier que les valeurs remplissent certaines conditions. `expect` vous donne accès à un certain nombre de "matchers" qui vous permettent de valider différentes choses sur l'objet `browser`, un objet `element` ou `mock`.

## Options par défaut

Ces options par défaut ci-dessous sont liées aux options [`waitforTimeout`](https://webdriver.io/docs/options#waitfortimeout) et [`waitforInterval`](https://webdriver.io/docs/options#waitforinterval) définies dans la configuration.

Ne définissez les options ci-dessous que si vous souhaitez attendre des délais spécifiques pour vos assertions.

```js
{
    wait: 2000, // ms d'attente pour que l'expectative réussisse
    interval: 100, // intervalle entre les tentatives
}
```

Si vous souhaitez choisir des délais et des intervalles différents, définissez ces options comme ceci :

```js
// wdio.conf.js
import { setOptions } from 'expect-webdriverio'

export const config = {
    // ...
    before () {
        setOptions({ wait: 5000 })
    },
    // ...
}
```

### Options de Matcher

Chaque matcher peut prendre plusieurs options qui vous permettent de modifier l'assertion :

##### Options de commande

| Nom | Type | Détails |
| ---- | ---- | ------- |
| <code><var>wait</var></code> | number | temps en ms d'attente pour que l'expectative réussisse. Par défaut : `3000` |
| <code><var>interval</var></code> | number | intervalle entre les tentatives. Par défaut : `100` |
| <code><var>beforeAssertion</var></code> | function | fonction à appeler avant que l'assertion ne soit faite |
| <code><var>afterAssertion</var></code> | function | fonction à appeler après que l'assertion soit faite contenant les résultats de l'assertion |
| <code><var>message</var></code> | string | message utilisateur à ajouter avant l'erreur d'assertion |

##### Options de chaîne

Cette option peut être appliquée en plus des options de commande lorsque des chaînes sont en cours d'assertion.

| Nom | Type | Détails |
| ---- | ---- | ------- |
| <code><var>ignoreCase</var></code> | boolean | appliquer `toLowerCase` aux valeurs réelles et attendues |
| <code><var>trim</var></code> | boolean | appliquer `trim` à la valeur réelle |
| <code><var>replace</var></code> | Replacer \| Replacer[] | remplacer des parties de la valeur réelle qui correspondent à la chaîne/RegExp. Le remplaçant peut être une chaîne ou une fonction.
| <code><var>containing</var></code> | boolean | s'attend à ce que la valeur réelle contienne la valeur attendue, sinon égalité stricte. |
| <code><var>asString</var></code> | boolean | peut être utile pour forcer la conversion de la valeur de propriété en chaîne |
| <code><var>atStart</var></code> | boolean | s'attend à ce que la valeur réelle commence par la valeur attendue |
| <code><var>atEnd</var></code> | boolean | s'attend à ce que la valeur réelle se termine par la valeur attendue |
| <code><var>atIndex</var></code> | number | s'attend à ce que la valeur réelle ait la valeur attendue à l'index donné |

##### Options numériques

Cette option peut être appliquée en plus des options de commande lorsque des nombres sont en cours d'assertion.

| Nom | Type | Détails |
| ---- | ---- | ------- |
| <code><var>eq</var></code> | number | égal |
| <code><var>lte</var></code> | number | inférieur ou égal |
| <code><var>gte</var></code> | number | supérieur ou égal |

### Gestion des entités HTML

Une entité HTML est un morceau de texte ("chaîne") qui commence par une esperluette (`&`) et se termine par un point-virgule (`;`). Les entités sont fréquemment utilisées pour afficher des caractères réservés (qui seraient autrement interprétés comme du code HTML), et des caractères invisibles (comme les espaces insécables, par exemple `&nbsp;`).

Pour trouver ou interagir avec un tel élément, utilisez l'équivalent unicode de l'entité. par exemple :

```html
<div data="Some&nbsp;Value">Some&nbsp;Text</div>
```

```js
const myElem = await $('div[data="Some\u00a0Value"]')
await expect(myElem).toHaveAttribute('data', 'div[Some\u00a0Value')
await expect(myElem).toHaveText('Some\u00a0Text')
```

Vous pouvez trouver toutes les références unicode dans la [spécification HTML](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references).

**Remarque :** unicode n'est pas sensible à la casse, donc `\u00a0` et `\u00A0` fonctionnent tous les deux. Pour trouver un élément dans l'inspecteur du navigateur, supprimez `u` de l'unicode, par exemple : `div[data="Some\00a0Value"]`

## Matchers de navigateur

### toHaveUrl

Vérifie si le navigateur est sur une page spécifique.

##### Utilisation

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl('https://webdriver.io')
```

##### Utilisation

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl(expect.stringContaining('webdriver'))
```

### toHaveTitle

Vérifie si le site web a un titre spécifique.

##### Utilisation

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js')
await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
```

### toHaveClipboardText

Vérifie si le navigateur a un texte spécifique stocké dans son presse-papiers.

##### Utilisation

```js
import { Key } from 'webdriverio'

await browser.keys([Key.Ctrl, 'a'])
await browser.keys([Key.Ctrl, 'c'])
await expect(browser).toHaveClipboardText('some clipboard text')
await expect(browser).toHaveClipboardText(expect.stringContaining('clipboard text'))
```

## Matchers d'éléments

### toBeDisplayed

Appelle [`isDisplayed`](https://webdriver.io/docs/api/element/isDisplayed/) sur l'élément donné.

##### Utilisation

```js
const elem = await $('#someElem')
await expect(elem).toBeDisplayed()
```

### toExist

Appelle [`isExisting`](https://webdriver.io/docs/api/element/isExisting) sur l'élément donné.

##### Utilisation

```js
const elem = await $('#someElem')
await expect(elem).toExist()
```

### toBePresent

Identique à `toExist`.

##### Utilisation

```js
const elem = await $('#someElem')
await expect(elem).toBePresent()
```

### toBeExisting

Identique à `toExist`.

##### Utilisation

```js
const elem = await $('#someElem')
await expect(elem).toBeExisting()
```

### toBeFocused

Vérifie si l'élément a le focus. Cette assertion ne fonctionne que dans un contexte web.

##### Utilisation

```js
const elem = await $('#someElem')
await expect(elem).toBeFocused()
```

### toHaveAttribute

Vérifie si un élément a un certain attribut avec une valeur spécifique.

##### Utilisation

```js
const myInput = await $('input')
await expect(myInput).toHaveAttribute('class', 'form-control')
await expect(myInput).toHaveAttribute('class', expect.stringContaining('control'))
```

### toHaveAttr

Identique à `toHaveAttribute`.

##### Utilisation

```js
const myInput = await $('input')
await expect(myInput).toHaveAttr('class', 'form-control')
await expect(myInput).toHaveAttr('class', expect.stringContaining('control'))
```

### toHaveElementClass

Vérifie si un élément a un nom de classe unique. Peut également être appelé avec un tableau en paramètre lorsque l'élément peut avoir plusieurs noms de classe.

##### Utilisation

```js
const myInput = await $('input')
await expect(myInput).toHaveElementClass('form-control', { message: 'Not a form control!' })
await expect(myInput).toHaveElementClass(['form-control' , 'w-full'], { message: 'not full width' })
await expect(myInput).toHaveElementClass(expect.stringContaining('form'), { message: 'Not a form control!' })
```

### toHaveElementProperty

Vérifie si un élément a une certaine propriété.

##### Utilisation

```js
const elem = await $('#elem')
await expect(elem).toHaveElementProperty('height', 23)
await expect(elem).not.toHaveElementProperty('height', 0)
```

### toHaveValue

Vérifie si un élément d'entrée a une certaine valeur.

##### Utilisation

```js
const myInput = await $('input')
await expect(myInput).toHaveValue('admin-user', { ignoreCase: true })
await expect(myInput).toHaveValue(expect.stringContaining('user'), { ignoreCase: true })
```

### toBeClickable

Vérifie si un élément peut être cliqué en appelant [`isClickable`](https://webdriver.io/docs/api/element/isClickable) sur l'élément.

##### Utilisation

```js
const elem = await $('#elem')
await expect(elem).toBeClickable()
```

### toBeDisabled

Vérifie si un élément est désactivé en appelant [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) sur l'élément.

##### Utilisation

```js
const elem = await $('#elem')
await expect(elem).toBeDisabled()
// équivalent à
await expect(elem).not.toBeEnabled()
```

### toBeEnabled

Vérifie si un élément est activé en appelant [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) sur l'élément.

##### Utilisation

```js
const elem = await $('#elem')
await expect(elem).toBeEnabled()
// équivalent à
await expect(elem).not.toBeDisabled()
```

### toBeSelected

Vérifie si un élément est activé en appelant [`isSelected`](https://webdriver.io/docs/api/element/isSelected) sur l'élément.

##### Utilisation

```js
const elem = await $('#elem')
await expect(elem).toBeSelected()
```

### toBeChecked

Identique à `toBeSelected`.

##### Utilisation

```js
const elem = await $('#elem')
await expect(elem).toBeChecked()
```

### toHaveComputedLabel

Vérifie si l'élément a une étiquette WAI-ARIA calculée spécifique. Peut également être appelé avec un tableau en paramètre dans le cas où l'élément peut avoir différentes étiquettes.

##### Utilisation

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel('GitHub repository')
await expect(elem).toHaveComputedLabel(expect.stringContaining('repository'))
```

##### Utilisation

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel(['GitHub repository', 'Private repository'])
await expect(elem).toHaveComputedLabel([expect.stringContaining('GitHub'), expect.stringContaining('Private')])
```

### toHaveComputedRole

Vérifie si l'élément a un rôle WAI-ARIA calculé spécifique. Peut également être appelé avec un tableau en paramètre dans le cas où l'élément peut avoir différentes étiquettes.

##### Utilisation

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole('region')
await expect(elem).toHaveComputedRole(expect.stringContaining('ion'))
```

##### Utilisation

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole(['region', 'section'])
await expect(elem).toHaveComputedRole([expect.stringContaining('reg'), expect.stringContaining('sec')])
```

### toHaveHref

Vérifie si l'élément de lien a une cible de lien spécifique.

##### Utilisation

```js
const link = await $('a')
await expect(link).toHaveHref('https://webdriver.io')
await expect(link).toHaveHref(expect.stringContaining('webdriver.io'))
```

### toHaveLink

Identique à `toHaveHref`.

##### Utilisation

```js
const link = await $('a')
await expect(link).toHaveLink('https://webdriver.io')
await expect(link).toHaveLink(expect.stringContaining('webdriver.io'))
```

### toHaveId

Vérifie si l'élément a un attribut `id` spécifique.

##### Utilisation

```js
const elem = await $('#elem')
await expect(elem).toHaveId('elem')
```

### toHaveText

Vérifie si l'élément a un texte spécifique. Peut également être appelé avec un tableau en paramètre dans le cas où l'élément peut avoir différents textes.

##### Utilisation

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText('Next-gen browser and mobile automation test framework for Node.js')
await expect(elem).toHaveText(expect.stringContaining('test framework for Node.js'))
await expect(elem).toHaveText(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'])
await expect(elem).toHaveText([expect.stringContaining('test framework for Node.js'), expect.stringContaining('Started')])
```

Dans le cas où il y a une liste d'éléments dans la div ci-dessous :

```
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

Vous pouvez les affirmer en utilisant un tableau :

```js
const elem = await $$('ul > li')
await expect(elem).toHaveText(['Coffee', 'Tea', 'Milk'])
```

### toHaveHTML

Vérifie si l'élément a un texte spécifique. Peut également être appelé avec un tableau en paramètre dans le cas où l'élément peut avoir différents textes.

##### Utilisation

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML('<p class="hero__subtitle">Next-gen browser and mobile automation test framework for Node.js</p>')
await expect(elem).toHaveHTML(expect.stringContaining('Next-gen browser and mobile automation test framework for Node.js'))
await expect(elem).toHaveHTML('Next-gen browser and mobile automation test framework for Node.js', { includeSelectorTag: false })
```

##### Utilisation

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'], { includeSelectorTag: false })
await expect(elem).toHaveHTML([expect.stringContaining('automation test framework for Node.js'), expect.stringContaining('Started')], { includeSelectorTag: false })
```

### toBeDisplayedInViewport

Vérifie si un élément est dans la fenêtre d'affichage en appelant [`isDisplayedInViewport`](https://webdriver.io/docs/api/element/isDisplayedInViewport) sur l'élément.

##### Utilisation

```js
const elem = await $('#elem')
await expect(elem).toBeDisplayedInViewport()
```

### toHaveChildren

Vérifie le nombre d'enfants de l'élément récupéré en appelant la commande `element.$('./*')`.

##### Utilisation

```js
const list = await $('ul')
await expect(list).toHaveChildren() // la liste a au moins un élément
// équivalent à
await expect(list).toHaveChildren({ gte: 1 })

await expect(list).toHaveChildren(3) // la liste a 3 éléments
// équivalent à 
await expect(list).toHaveChildren({ eq: 3 })
```

### toHaveWidth

Vérifie si l'élément a une largeur spécifique.

##### Utilisation

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveWidth(32)
```

### toHaveHeight

Vérifie si l'élément a une hauteur spécifique.

##### Utilisation

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveHeight(32)
```

### toHaveSize

Vérifie si l'élément a une taille spécifique.

##### Utilisation

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveSize({ width: 32, height: 32 })
```

### toBeElementsArrayOfSize

Vérifie le nombre d'éléments récupérés en utilisant la commande [`$$`](https://webdriver.io/docs/api/element/$).

**Remarque :** Ce matcher mettra à jour le tableau passé avec les derniers éléments si l'assertion réussit. Cependant, si vous avez réaffecté la variable, vous devrez récupérer à nouveau les éléments.

##### Utilisation

```js
const listItems = await $$('ul>li')
await expect(listItems).toBeElementsArrayOfSize(5) // 5 éléments dans la liste

await expect(listItems).toBeElementsArrayOfSize({ lte: 10 })
// équivalent à
assert.ok(listItems.length <= 10)
```

## Matchers de réseau

### toBeRequested

Vérifie que le mock a été appelé

##### Utilisation

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequested()
```

### toBeRequestedTimes

Vérifie que le mock a été appelé le nombre de fois attendu

##### Utilisation

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequestedTimes(2) // await expect(mock).toBeRequestedTimes({ eq: 2 })

await expect(mock).toBeRequestedTimes({ gte: 5, lte: 10 }) // requête appelée au moins 5 fois mais moins de 11
```

### toBeRequestedWith

Vérifie que le mock a été appelé selon les options attendues.

La plupart des options prennent en charge les matchers partiels expect/jasmine comme [expect.objectContaining](https://jestjs.io/docs/en/expect#expectobjectcontainingobject)

##### Utilisation

```js
const mock = browser.mock('**/api/todo*', { method: 'POST' })

await expect(mock).toBeRequestedWith({
    url: 'http://localhost:8080/api/todo',          // [optionnel] string | function | custom matcher
    method: 'POST',                                 // [optionnel] string | array
    statusCode: 200,                                // [optionnel] number | array
    requestHeaders: { Authorization: 'foo' },       // [optionnel] object | function | custom matcher
    responseHeaders: { Authorization: 'bar' },      // [optionnel] object | function | custom matcher
    postData: { title: 'foo', description: 'bar' }, // [optionnel] object | function | custom matcher
    response: { success: true },                    // [optionnel] object | function | custom matcher
})

await expect(mock).toBeRequestedWith({
    url: expect.stringMatching(/.*\/api\/.*/i),
    method: ['POST', 'PUT'], // soit POST ou PUT
    statusCode: [401, 403],  // soit 401 ou 403
    requestHeaders: headers => headers.Authorization.startsWith('Bearer '),
    postData: expect.objectContaining({ released: true, title: expect.stringContaining('foobar') }),
    response: r => Array.isArray(r) && r.data.items.length === 20
})
```

## Matcher de snapshot

WebdriverIO prend en charge les tests de snapshot de base ainsi que les tests de snapshot DOM.

### toMatchSnapshot

Vérifie si un objet arbitraire correspond à une certaine valeur. Si vous passez un [`WebdriverIO.Element`](https://webdriver.io/docs/api/element), il prendra automatiquement un snapshot de son état [`outerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML).

##### Utilisation

```js
// snapshot d'objets arbitraires (pas besoin de "await" ici)
expect({ foo: 'bar' }).toMatchSnapshot()
// snapshot de `outerHTML` de WebdriverIO.Element (snapshot DOM, nécessite "await")
await expect($('elem')).toMatchSnapshot()
// snapshot du résultat de la commande d'élément
await expect($('elem').getCSSProperty('background-color')).toMatchSnapshot()
```

### toMatchInlineSnapshot

De même, vous pouvez utiliser `toMatchInlineSnapshot()` pour stocker le snapshot en ligne dans le fichier de test. Par exemple, étant donné :

```js
await expect($('img')).toMatchInlineSnapshot()
```

Au lieu de créer un fichier de snapshot, WebdriverIO modifiera directement le fichier de test pour mettre à jour le snapshot en tant que chaîne :

```js
await expect($('img')).toMatchInlineSnapshot(`"<img src="/public/apple-touch-icon-precomposed.png">"`)
```

## Matchers de snapshot visuel

<!--
    Ces matchers ne sont pas implémentés dans le projet `expect-webdriverio` et peuvent être trouvés
    ici : https://github.com/webdriverio-community/visual-testing/blob/e10f7005c1533f5b06811888a9cbb9020e6e765e/packages/service/src/matcher.ts
-->

Les matchers suivants sont implémentés dans le cadre du plugin `@wdio/visual-service` et ne sont disponibles que lorsque le service est configuré. Assurez-vous de suivre les [instructions de configuration](https://webdriver.io/docs/visual-testing) en conséquence.

### toMatchElementSnapshot

Vérifie si l'élément donné correspond au snapshot de référence.

##### Utilisation

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', 0, {
    // options
})
```

Le résultat attendu est par défaut `0`, donc vous pouvez écrire la même assertion comme :

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', {
    // options
})
```

ou ne pas passer d'options du tout :

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot()
```

### toMatchScreenSnapshot

Vérifie si l'écran actuel correspond au snapshot de référence.

##### Utilisation

```js
await expect(browser).toMatchScreenSnapshot('partialPage', 0, {
    // options
})
```

Le résultat attendu est par défaut `0`, donc vous pouvez écrire la même assertion comme :

```js
await expect(browser).toMatchScreenSnapshot('partialPage', {
    // options
})
```

ou ne pas passer d'options du tout :

```js
await expect(browser).toMatchScreenSnapshot('partialPage')
```

### toMatchFullPageSnapshot

Vérifie si la capture d'écran de la page entière correspond au snapshot de référence.

##### Utilisation

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', 0, {
    // options
})
```

Le résultat attendu est par défaut `0`, donc vous pouvez écrire la même assertion comme :

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', {
    // options
})
```

ou ne pas passer d'options du tout :

```js
await expect(browser).toMatchFullPageSnapshot('fullPage')
```

### toMatchTabbablePageSnapshot

Vérifie si la capture d'écran de la page entière incluant les marques d'onglets correspond au snapshot de référence.

##### Utilisation

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', 0, {
    // options
})
```

Le résultat attendu est par défaut `0`, donc vous pouvez écrire la même assertion comme :

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', {
    // options
})
```

ou ne pas passer d'options du tout :

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable')
```

## Utilisation des expressions régulières

Vous pouvez également utiliser directement des expressions régulières pour tous les matchers qui font une comparaison de texte.

##### Utilisation

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText(/node\.js/i)
await expect(elem).toHaveText([/node\.js/i, 'Get Started'])
await expect(browser).toHaveTitle(/webdriverio/i)
await expect(browser).toHaveUrl(/webdriver\.io/)
await expect(elem).toHaveElementClass(/Container/i)
```

## Matchers par défaut

En plus des matchers `expect-webdriverio`, vous pouvez utiliser les assertions intégrées [expect](https://jestjs.io/docs/en/expect) de Jest ou [expect/expectAsync](https://jasmine.github.io/api/3.5/global.html#expect) pour Jasmine.

## Matchers asymétriques

WebdriverIO prend en charge l'utilisation de matchers asymétriques partout où vous comparez des valeurs textuelles, par exemple :

```ts
await expect(browser).toHaveTitle(expect.stringContaining('some title'))
```

ou

```ts
await expect(browser).toHaveTitle(expect.not.stringContaining('some title'))
```

## TypeScript

Si vous utilisez le [Testrunner WDIO](https://webdriver.io/docs/clioptions), tout sera automatiquement configuré. Suivez simplement le [guide de configuration](https://webdriver.io/docs/typescript#framework-setup) de la documentation. Cependant, si vous exécutez WebdriverIO avec un autre testrunner ou dans un simple script Node.js, vous devrez ajouter `expect-webdriverio` à `types` dans le `tsconfig.json`.

- `"expect-webdriverio"` pour tout le monde sauf les utilisateurs de Jasmine/Jest.
- `"expect-webdriverio/jasmine"` pour Jasmine
- `"expect-webdriverio/jest"` pour Jest

## JavaScript (VSCode)

Il est nécessaire de créer `jsconfig.json` à la racine du projet et de faire référence aux définitions de types pour que l'autocomplétion fonctionne en javascript vanilla.

```json
{
  "include": [
    "**/*.js",
    "**/*.json",
    "node_modules/expect-webdriverio"
  ]
}
```

## Ajouter vos propres matchers

Similaire à la façon dont `expect-webdriverio` étend les matchers Jasmine/Jest, il est possible d'ajouter des matchers personnalisés.

- Pour Jasmine, voir la documentation [custom matchers](https://jasmine.github.io/2.5/custom_matcher.html)
- Pour les autres, voir [expect.extend](https://jestjs.io/docs/en/expect#expectextendmatchers) de Jest

Les matchers personnalisés doivent être ajoutés dans le hook `before` de wdio

```js
// wdio.conf.js
{
    async before () {
        const { addCustomMatchers } = await import('./myMatchers')
        addCustomMatchers()
    }
}
```

```js
// myMatchers.js - Exemple Jest
export function addCustomMatchers () {
    if (global.expect.expect !== undefined) { // Solution temporaire. Voir https://github.com/webdriverio/expect-webdriverio/issues/835
        global.expect = global.expect.expect;
    }

    expect.extend({
        myMatcher (actual, expected) {
            return { pass: actual === expected, message: () => 'some message' }
        }
    })
}
```