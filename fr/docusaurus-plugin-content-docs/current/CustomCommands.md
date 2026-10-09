---
id: customcommands
title: Commandes personnalisées
description: "Ajoutez vos propres commandes de navigateur et d'élément avec addCommand, écrasez des commandes existantes et étendez les définitions de types TypeScript."
---

Si vous souhaitez étendre l'instance `browser` avec votre propre ensemble de commandes, la méthode de navigateur `addCommand` est faite pour vous. Vous pouvez écrire votre commande de manière asynchrone, comme dans vos specs.

## Paramètres

### Nom de la commande

<Option type="String">

Un nom qui définit la commande et qui sera attaché à la portée du navigateur ou de l'élément.

</Option>

### Fonction personnalisée

<Option type="Function">

Une fonction qui est exécutée lorsque la commande est appelée. La portée `this` est [`WebdriverIO.Browser`](/docs/api/browser), [`WebdriverIO.Element`](/docs/api/element) ou `WebdriverIO.BrowsingContext`, selon que la commande est attachée au navigateur, aux éléments ou aux contextes de navigation.

</Option>

### Options

Objet contenant des options de configuration qui modifient le comportement de la commande personnalisée

#### Portée cible

<Option type="Boolean" default="false" name="attachToElement">

Indicateur permettant de décider s'il faut attacher la commande à la portée du navigateur ou de l'élément. S'il est défini sur `true`, la commande sera une commande d'élément.

</Option>

<Option type="Boolean" default="false" name="attachToBrowsingContext">

Indicateur permettant d'attacher la commande à chaque contexte de navigation : les onglets, fenêtres et frames que renvoient `browser.url()`, `browser.newWindow()`, `browser.browsingContexts()` et `context.frame()` dans une session WebDriver BiDi. Il ne peut pas être combiné avec `attachToElement`. Voir [Contextes de navigation](#browsing-contexts).

</Option>

#### Désactiver implicitWait

<Option type="Boolean" default="false" name="disableElementImplicitWait">

Indicateur permettant de décider s'il faut attendre implicitement que l'élément existe avant d'appeler la commande personnalisée.

</Option>

## Exemples

Cet exemple montre comment ajouter une nouvelle commande qui renvoie l'URL et le titre actuels en un seul résultat. La portée (`this`) est un objet [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` fait référence à la portée `browser`
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

De plus, vous pouvez étendre l'instance d'élément avec votre propre ensemble de commandes en définissant `attachToElement` sur `true`. Dans ce cas, la portée (`this`) est un objet [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` est la valeur de retour de $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

Par défaut, les commandes personnalisées d'élément attendent que l'élément existe avant d'appeler la commande personnalisée. Même si c'est souhaitable la plupart du temps, ce comportement peut être désactivé avec `disableImplicitWait` :

```js
browser.addCommand("waitAndClick", async function () {
    // `this` est la valeur de retour de $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```

Les commandes personnalisées vous permettent de regrouper une séquence spécifique de commandes que vous utilisez fréquemment en un seul appel. Vous pouvez définir des commandes personnalisées à n'importe quel endroit de votre suite de tests ; assurez-vous simplement que la commande est définie *avant* sa première utilisation. (Le hook `before` de votre `wdio.conf.js` est un bon endroit pour les créer.)

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

__Remarque :__ Si vous enregistrez une commande personnalisée dans la portée `browser`, la commande ne sera pas accessible pour les éléments. De même, si vous enregistrez une commande dans la portée de l'élément, elle ne sera pas accessible dans la portée `browser` :

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

__Remarque :__ Si vous avez besoin de chaîner une commande personnalisée, le nom de la commande doit se terminer par `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Veillez à ne pas surcharger la portée `browser` avec trop de commandes personnalisées.

Nous recommandons de définir la logique personnalisée dans des [page objects](pageobjects), afin qu'elle soit liée à une page spécifique.

### Contextes de navigation

Dans une session WebDriver BiDi, un onglet, une fenêtre et une frame sont chacun un `WebdriverIO.BrowsingContext`. Définissez `attachToBrowsingContext` sur `true` pour ajouter une commande à tous ces contextes. La portée (`this`) est le contexte sur lequel la commande a été appelée, et `this.browser` est le navigateur auquel il appartient :

```js
browser.addCommand('heading', async function () {
    // `this` est l'onglet, la fenêtre ou la frame
    return this.$('h1').getText()
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
console.log(await page.heading())

const frame = await page.frame('iframe')
console.log(await frame.heading())
```

La commande est disponible sur les contextes qui existent déjà et sur chaque contexte créé ultérieurement, y compris les frames d'une autre origine. Une commande qui n'a de sens que pour un onglet ou une fenêtre peut vérifier `this.isFrame`.

`addCommand` et `overwriteCommand` appelés sur un contexte de navigation lui-même lèvent une erreur. Enregistrez la commande sur le navigateur.

### Multi-remote

`addCommand` fonctionne de manière similaire pour le multi-remote, sauf que la nouvelle commande se propage aux instances enfants. Vous devez être attentif lorsque vous utilisez l'objet `this`, car le `browser` multi-remote et ses instances enfants ont des `this` différents.

Cet exemple montre comment ajouter une nouvelle commande pour le multi-remote.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` fait référence à :
    //      - la portée MultiRemoteBrowser pour le navigateur
    //      - la portée Browser pour les instances
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

Avec TypeScript, il est facile d'étendre les interfaces de WebdriverIO. Ajoutez des types à vos commandes personnalisées comme ceci :

1. Créez un fichier de définition de types (par ex. `./src/types/wdio.d.ts`)
2. a. Si vous utilisez un fichier de définition de types de style module (utilisant import/export et `declare global WebdriverIO` dans le fichier de définition de types), assurez-vous d'inclure le chemin du fichier dans la propriété `include` du `tsconfig.json`.

   b. Si vous utilisez des fichiers de définition de types de style ambiant (pas d'import/export dans les fichiers de définition de types et `declare namespace WebdriverIO` pour les commandes personnalisées), assurez-vous que le `tsconfig.json` ne contient *aucune* section `include`, car cela empêcherait TypeScript de reconnaître tous les fichiers de définition de types non listés dans la section `include`.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions (no tsconfig include)', value: 'ambient'},
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

3. Ajoutez les définitions de vos commandes selon votre mode d'exécution.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions', value: 'ambient'},
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

        interface BrowsingContext {
            contextCustomCommand: (arg: any) => Promise<string>
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

    interface BrowsingContext {
        contextCustomCommand: (arg: any) => Promise<string>
    }
}
```

</TabItem>
</Tabs>

## Intégrer des bibliothèques tierces

Si vous utilisez des bibliothèques externes (par ex. pour effectuer des appels à une base de données) qui prennent en charge les promesses, une bonne approche pour les intégrer consiste à encapsuler certaines méthodes de leur API dans une commande personnalisée.

Lorsque vous renvoyez la promesse, WebdriverIO s'assure de ne pas passer à la commande suivante tant que la promesse n'est pas résolue. Si la promesse est rejetée, la commande lèvera une erreur.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Ensuite, utilisez-la simplement dans vos specs de test WDIO :

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // renvoie le corps de la réponse
})
```

**Remarque :** Le résultat de votre commande personnalisée est le résultat de la promesse que vous renvoyez.

## Écraser des commandes

Vous pouvez également écraser des commandes natives avec `overwriteCommand`.

Ce n'est pas recommandé, car cela peut entraîner un comportement imprévisible du framework !

L'approche générale est similaire à `addCommand`, la seule différence étant que le premier argument de la fonction de commande est la fonction d'origine que vous êtes sur le point d'écraser. Veuillez consulter quelques exemples ci-dessous.

### Écraser des commandes de navigateur

```js
/**
 * Affiche les millisecondes avant la pause et renvoie leur valeur.
 *
 * @param pause - nom de la commande à écraser
 * @param this of func - l'instance de navigateur d'origine sur laquelle la fonction a été appelée
 * @param originalPauseFunction of func - la fonction pause d'origine
 * @param ms of func - les paramètres réellement passés
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// puis utilisez-la comme avant
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Écraser des commandes d'élément

Écraser des commandes au niveau de l'élément est presque identique. Définissez `attachToElement` sur `true` :

```js
/**
 * Tente de faire défiler jusqu'à l'élément s'il n'est pas cliquable.
 * Passez { force: true } pour cliquer avec JS même si l'élément n'est pas visible ou cliquable.
 * Montre que le type d'argument de la fonction d'origine peut être conservé avec `options?: ClickOptions`
 *
 * @param this of func - l'élément sur lequel la fonction d'origine a été appelée
 * @param originalClickFunction of func - la fonction pause d'origine
 * @param options of func - les paramètres réellement passés
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

                    // faire défiler jusqu'à l'élément et cliquer à nouveau
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // clic avec js
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

### Écraser des commandes de contexte de navigation

Définissez `attachToBrowsingContext` sur `true` pour écraser une commande intégrée ou personnalisée de chaque onglet, fenêtre et frame. La commande d'origine est liée au contexte sur lequel elle a été appelée :

```js
browser.overwriteCommand('getTitle', async function (this, originalGetTitle) {
    const title = await originalGetTitle()
    return this.isFrame ? `frame: ${title}` : title
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
const frame = await page.frame('iframe')
console.log(await frame.getTitle()) // "frame: ..."
```

## Ajouter d'autres commandes WebDriver

Si vous utilisez le protocole WebDriver et exécutez des tests sur une plateforme qui prend en charge des commandes supplémentaires non définies par l'une des définitions de protocole de [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), vous pouvez les ajouter manuellement via l'interface `addCommand`. Le package `webdriver` propose un wrapper de commande qui permet d'enregistrer ces nouveaux endpoints de la même manière que les autres commandes, en fournissant les mêmes vérifications de paramètres et la même gestion des erreurs. Pour enregistrer ce nouvel endpoint, importez le wrapper de commande et enregistrez une nouvelle commande avec celui-ci comme suit :

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

Appeler cette commande avec des paramètres invalides entraîne la même gestion des erreurs que pour les commandes de protocole prédéfinies, par ex. :

```js
// appel de la commande sans le paramètre d'url requis ni le payload
await browser.myNewCommand()

/**
 * produit l'erreur suivante :
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

Appeler la commande correctement, par ex. `browser.myNewCommand('foo', 'bar')`, effectue correctement une requête WebDriver vers, par ex., `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` avec un payload tel que `{ foo: 'bar' }`.

:::note
Le paramètre d'url `:sessionId` sera automatiquement remplacé par l'identifiant de la session WebDriver. D'autres paramètres d'url peuvent être utilisés, mais ils doivent être définis dans `variables`.
:::

Consultez des exemples de définition de commandes de protocole dans le package [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).