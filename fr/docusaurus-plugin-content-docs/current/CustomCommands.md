---
id: customcommands
title: Commandes Personnalisées
---

Si vous souhaitez étendre l'instance `browser` avec votre propre ensemble de commandes, la méthode `addCommand` du navigateur est là pour vous. Vous pouvez écrire votre commande de manière asynchrone, tout comme dans vos spécifications.

## Paramètres

### Nom de la commande

Un nom qui définit la commande et qui sera attaché à la portée du navigateur ou de l'élément.

Type: `String`

### Fonction personnalisée

Une fonction qui est exécutée lorsque la commande est appelée. La portée `this` est soit [`WebdriverIO.Browser`](/docs/api/browser) soit [`WebdriverIO.Element`](/docs/api/element) selon que la commande est attachée à la portée du navigateur ou de l'élément.

Type: `Function`

### Options

Objet avec des options de configuration modifiant le comportement de la commande personnalisée

#### Portée cible

Indicateur permettant de décider s'il faut attacher la commande à la portée du navigateur ou de l'élément. Si défini sur `true`, la commande sera une commande d'élément.

Nom de l'option: `attachToElement`
Type: `Boolean`<br />
Par défaut: `false`

#### Désactiver implicitWait

Indicateur permettant de décider s'il faut attendre implicitement que l'élément existe avant d'appeler la commande personnalisée.

Nom de l'option: `disableElementImplicitWait`
Type: `Boolean`<br />
Par défaut: `false`

## Exemples

Cet exemple montre comment ajouter une nouvelle commande qui renvoie l'URL et le titre actuels en un seul résultat. La portée (`this`) est un objet [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` fait référence à la portée du `browser`
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

De plus, vous pouvez étendre l'instance d'élément avec votre propre ensemble de commandes, en passant `true` comme argument final. La portée (`this`) dans ce cas est un objet [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` est la valeur de retour de $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

Par défaut, les commandes personnalisées d'élément attendent que l'élément existe avant d'appeler la commande personnalisée. Même si la plupart du temps c'est souhaité, si ce n'est pas le cas, cela peut être désactivé avec `disableImplicitWait` :

```js
browser.addCommand("waitAndClick", async function () {
    // `this` est la valeur de retour de $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


Les commandes personnalisées vous donnent la possibilité de regrouper une séquence spécifique de commandes que vous utilisez fréquemment en un seul appel. Vous pouvez définir des commandes personnalisées à n'importe quel moment dans votre suite de tests ; assurez-vous simplement que la commande est définie *avant* sa première utilisation. (Le hook `before` dans votre `wdio.conf.js` est un bon endroit pour les créer.)

Une fois définies, vous pouvez les utiliser comme suit :

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__Remarque :__ Si vous enregistrez une commande personnalisée dans la portée du `browser`, la commande ne sera pas accessible pour les éléments. De même, si vous enregistrez une commande dans la portée de l'élément, elle ne sera pas accessible dans la portée du `browser` :

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // affiche "function"
console.log(typeof elem.myCustomBrowserCommand()) // affiche "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // affiche "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // affiche "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // affiche "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // affiche "2"
```

__Remarque :__ Si vous avez besoin de chaîner une commande personnalisée, la commande doit se terminer par `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Faites attention à ne pas surcharger la portée du `browser` avec trop de commandes personnalisées.

Nous recommandons de définir la logique personnalisée dans [les objets de page](pageobjects), afin qu'ils soient liés à une page spécifique.

### Multiremote

`addCommand` fonctionne de manière similaire pour multiremote, sauf que la nouvelle commande se propagera aux instances enfants. Vous devez être attentif lorsque vous utilisez l'objet `this` car le `browser` multiremote et ses instances enfants ont des `this` différents.

Cet exemple montre comment ajouter une nouvelle commande pour multiremote.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` fait référence à :
    //      - Portée MultiRemoteBrowser pour le navigateur
    //      - Portée Browser pour les instances
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiRemoteBrowser.getUrlAndTitle()
/*
{
    url: [ 'https://webdriver.io/', 'https://webdriver.io/' ],
    title: [
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO'
    ],
    customVar: undefined
}
*/

multiRemoteBrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## Étendre les définitions de types

Avec TypeScript, il est facile d'étendre les interfaces WebdriverIO. Ajoutez des types à vos commandes personnalisées comme ceci :

1. Créez un fichier de définition de type (par exemple, `./src/types/wdio.d.ts`)
2. a. Si vous utilisez un fichier de définition de type de style module (utilisant import/export et `declare global WebdriverIO` dans le fichier de définition de type), assurez-vous d'inclure le chemin du fichier dans la propriété `include` de `tsconfig.json`.

   b. Si vous utilisez des fichiers de définition de type de style ambiant (pas d'import/export dans les fichiers de définition de type et `declare namespace WebdriverIO` pour les commandes personnalisées), assurez-vous que le `tsconfig.json` ne contient *pas* de section `include`, car cela fera que tous les fichiers de définition de type non répertoriés dans la section `include` ne seront pas reconnus par TypeScript.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (utilisant import/export)', value: 'modules'},
    {label: 'Définitions de type ambiantes (pas de include dans tsconfig)', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```json title="tsconfig.json"
{
    "compilerOptions": { ... },
    "include": [
        "./test/**/*.ts",
        "./src/types/**/*.ts"
    ]
}
```

</TabItem>
<TabItem value="ambient">

```json title="tsconfig.json"
{
    "compilerOptions": { ... }
}
```

</TabItem>
</Tabs>

3. Ajoutez des définitions pour vos commandes selon votre mode d'exécution.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (utilisant import/export)', value: 'modules'},
    {label: 'Définitions de type ambiantes', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```typescript
declare global {
    namespace WebdriverIO {
        interface Browser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface MultiRemoteBrowser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface Element {
            elementCustomCommand: (arg: any) => Promise<number>
        }
    }
}
```

</TabItem>
<TabItem value="ambient">

```typescript
declare namespace WebdriverIO {
    interface Browser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface MultiRemoteBrowser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface Element {
        elementCustomCommand: (arg: any) => Promise<number>
    }
}
```

</TabItem>
</Tabs>

## Intégrer des bibliothèques tierces

Si vous utilisez des bibliothèques externes (par exemple, pour effectuer des appels à une base de données) qui prennent en charge les promesses, une bonne approche pour les intégrer est d'encapsuler certaines méthodes API avec une commande personnalisée.

Lorsque vous retournez la promesse, WebdriverIO s'assure qu'il ne continue pas avec la commande suivante tant que la promesse n'est pas résolue. Si la promesse est rejetée, la commande lancera une erreur.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Ensuite, utilisez-la simplement dans vos spécifications de test WDIO :

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // renvoie le corps de la réponse
})
```

**Remarque :** Le résultat de votre commande personnalisée est le résultat de la promesse que vous retournez.

## Surcharge des commandes

Vous pouvez également surcharger les commandes natives avec `overwriteCommand`.

Il n'est pas recommandé de le faire, car cela peut conduire à un comportement imprévisible du framework !

L'approche globale est similaire à `addCommand`, la seule différence est que le premier argument de la fonction de commande est la fonction originale que vous allez surcharger. Veuillez consulter quelques exemples ci-dessous.

### Surcharge des commandes du navigateur

```js
/**
 * Affiche les millisecondes avant la pause et renvoie sa valeur.
 *
 * @param pause - nom de la commande à surcharger
 * @param this de func - l'instance originale du navigateur sur laquelle la fonction a été appelée
 * @param originalPauseFunction de func - la fonction de pause originale
 * @param ms de func - les paramètres réels passés
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// puis utilisez-la comme avant
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Surcharge des commandes d'élément

Surcharger des commandes au niveau de l'élément est presque identique. Passez simplement `true` comme troisième argument à `overwriteCommand` :

```js
/**
 * Tente de faire défiler jusqu'à l'élément s'il n'est pas cliquable.
 * Passez { force: true } pour cliquer avec JS même si l'élément n'est pas visible ou cliquable.
 * Montre que le type d'argument de la fonction originale peut être conservé avec `options?: ClickOptions`
 *
 * @param this de func - l'élément sur lequel la fonction originale a été appelée
 * @param originalClickFunction de func - la fonction de pause originale
 * @param options de func - les paramètres réels passés
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // tentative de clic
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // défiler jusqu'à l'élément et cliquer à nouveau
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // cliquer avec js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // N'oubliez pas de l'attacher à l'élément
)

// puis utilisez-la comme avant
const elem = await $('body')
await elem.click()

// ou passez des paramètres
await elem.click({ force: true })
```

## Ajouter plus de commandes WebDriver

Si vous utilisez le protocole WebDriver et exécutez des tests sur une plateforme qui prend en charge des commandes supplémentaires non définies par les définitions de protocole dans [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), vous pouvez les ajouter manuellement via l'interface `addCommand`. Le package `webdriver` offre un wrapper de commande qui permet d'enregistrer ces nouveaux points de terminaison de la même manière que les autres commandes, fournissant les mêmes vérifications de paramètres et gestion d'erreurs. Pour enregistrer ce nouveau point de terminaison, importez le wrapper de commande et enregistrez une nouvelle commande avec celui-ci comme suit :

```js
import { command } from 'webdriver'

browser.addCommand('myNewCommand', command('POST', '/session/:sessionId/foobar/:someId', {
    command: 'myNewCommand',
    description: 'a new WebDriver command',
    ref: 'https://vendor.com/commands/#myNewCommand',
    variables: [{
        name: 'someId',
        description: 'some id to something'
    }],
    parameters: [{
        name: 'foo',
        type: 'string',
        description: 'a valid parameter',
        required: true
    }]
}))
```

L'appel de cette commande avec des paramètres invalides entraîne la même gestion d'erreur que les commandes de protocole prédéfinies, par exemple :

```js
// appeler la commande sans paramètre d'URL requis et sans charge utile
await browser.myNewCommand()

/**
 * résulte dans l'erreur suivante :
 * Error: Wrong parameters applied for myNewCommand
 * Usage: myNewCommand(someId, foo)
 *
 * Property Description:
 *   "someId" (string): some id to something
 *   "foo" (string): a valid parameter
 *
 * For more info see https://my-api.com
 *    at Browser.protocolCommand (...)
 *    ...
 */
```

L'appel correct de la commande, par exemple `browser.myNewCommand('foo', 'bar')`, effectue correctement une requête WebDriver vers par exemple `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` avec une charge utile comme `{ foo: 'bar' }`.

:::note
Le paramètre d'URL `:sessionId` sera automatiquement remplacé par l'identifiant de session de la session WebDriver. D'autres paramètres d'URL peuvent être appliqués mais doivent être définis dans `variables`.
:::

Voir des exemples de définition de commandes de protocole dans le package [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).