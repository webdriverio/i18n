---
id: modules
title: Modules
---

WebdriverIO publie divers modules sur NPM et d'autres registres que vous pouvez utiliser pour créer votre propre framework d'automatisation. Consultez plus de documentation sur les types de configuration WebdriverIO [ici](/docs/setuptypes).

## `webdriver` et `devtools`

Les packages de protocole ([`webdriver`](https://www.npmjs.com/package/webdriver) et [`devtools`](https://www.npmjs.com/package/devtools)) exposent une classe avec les fonctions statiques suivantes qui vous permettent d'initier des sessions :

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Démarre une nouvelle session avec des capacités spécifiques. Selon la réponse de session, des commandes de différents protocoles seront fournies.

##### Paramètres

- `options`: [Options WebDriver](/docs/configuration#webdriver-options)
- `modifier`: fonction qui permet de modifier l'instance client avant qu'elle ne soit retournée
- `userPrototype`: objet de propriétés qui permet d'étendre le prototype de l'instance
- `customCommandWrapper`: fonction qui permet d'envelopper des fonctionnalités autour des appels de fonction

##### Retourne

- Objet [Browser](/docs/api/browser)

##### Exemple

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

Se connecte à une session WebDriver ou DevTools en cours d'exécution.

##### Paramètres

- `attachInstance`: instance à laquelle se connecter ou au moins un objet avec une propriété `sessionId` (par exemple `{ sessionId: 'xxx' }`)
- `modifier`: fonction qui permet de modifier l'instance client avant qu'elle ne soit retournée
- `userPrototype`: objet de propriétés qui permet d'étendre le prototype de l'instance
- `customCommandWrapper`: fonction qui permet d'envelopper des fonctionnalités autour des appels de fonction

##### Retourne

- Objet [Browser](/docs/api/browser)

##### Exemple

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

Recharge une session à partir de l'instance fournie.

##### Paramètres

- `instance`: instance de package à recharger

##### Exemple

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

Comme pour les packages de protocole (`webdriver` et `devtools`), vous pouvez également utiliser les API du package WebdriverIO pour gérer les sessions. Les API peuvent être importées en utilisant `import { remote, attach, multiremote } from 'webdriverio'` et contiennent les fonctionnalités suivantes :

#### `remote(options, modifier)`

Démarre une session WebdriverIO. L'instance contient toutes les commandes du package de protocole mais avec des fonctions d'ordre supérieur supplémentaires, voir [API docs](/docs/api).

##### Paramètres

- `options`: [Options WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: fonction qui permet de modifier l'instance client avant qu'elle ne soit retournée

##### Retourne

- Objet [Browser](/docs/api/browser)

##### Exemple

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

Se connecte à une session WebdriverIO en cours d'exécution.

##### Paramètres

- `attachOptions`: instance à laquelle se connecter ou au moins un objet avec une propriété `sessionId` (par exemple `{ sessionId: 'xxx' }`)

##### Retourne

- Objet [Browser](/docs/api/browser)

##### Exemple

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

Initie une instance multiremote qui vous permet de contrôler plusieurs sessions au sein d'une seule instance. Consultez nos [exemples multiremote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) pour des cas d'utilisation concrets.

##### Paramètres

- `multiremoteOptions`: un objet avec des clés représentant le nom du navigateur et leurs [Options WebdriverIO](/docs/configuration#webdriverio).

##### Retourne

- Objet [Browser](/docs/api/browser)

##### Exemple

```js
import { multiremote } from 'webdriverio'

const matrix = await multiremote({
    myChromeBrowser: {
        capabilities: { browserName: 'chrome' }
    },
    myFirefoxBrowser: {
        capabilities: { browserName: 'firefox' }
    }
})
await matrix.url('http://json.org')
await matrix.getInstance('browserA').url('https://google.com')

console.log(await matrix.getTitle())
// returns ['Google', 'JSON']
```

## `@wdio/cli`

Au lieu d'appeler la commande `wdio`, vous pouvez également inclure le test runner en tant que module et l'exécuter dans un environnement arbitraire. Pour cela, vous devrez importer le package `@wdio/cli` en tant que module, comme ceci :

<Tabs
  defaultValue="esm"
  values={[
    {label: 'EcmaScript Modules', value: 'esm'},
    {label: 'CommonJS', value: 'cjs'}
  ]
}>
<TabItem value="esm">

```js
import Launcher from '@wdio/cli'
```

</TabItem>
<TabItem value="cjs">

```js
const Launcher = require('@wdio/cli').default
```

</TabItem>
</Tabs>

Après cela, créez une instance du lanceur et exécutez le test.

#### `Launcher(configPath, opts)`

Le constructeur de la classe `Launcher` attend l'URL du fichier de configuration et un objet `opts` avec des paramètres qui remplaceront ceux de la configuration.

##### Paramètres

- `configPath`: chemin vers le `wdio.conf.js` à exécuter
- `opts`: arguments ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) pour remplacer les valeurs du fichier de configuration

##### Exemple

```js
const wdio = new Launcher(
    '/path/to/my/wdio.conf.js',
    { spec: '/path/to/a/single/spec.e2e.js' }
)

wdio.run().then((exitCode) => {
    process.exit(exitCode)
}, (error) => {
    console.error('Launcher failed to start the test', error.stacktrace)
    process.exit(1)
})
```

La commande `run` renvoie une [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Elle est résolue si les tests ont été exécutés avec succès ou ont échoué, et elle est rejetée si le lanceur n'a pas pu démarrer l'exécution des tests.

## `@wdio/browser-runner`

Lorsque vous exécutez des tests unitaires ou de composants à l'aide du [browser runner](/docs/runner#browser-runner) de WebdriverIO, vous pouvez importer des utilitaires de simulation pour vos tests, par exemple :

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Les exports nommés suivants sont disponibles :

#### `fn`

Fonction mock, voir plus dans la [documentation officielle de Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Fonction d'espionnage, voir plus dans la [documentation officielle de Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Méthode pour mocker un fichier ou un module de dépendance.

##### Paramètres

- `moduleName`: soit un chemin relatif vers le fichier à mocker, soit un nom de module.
- `factory`: fonction pour retourner la valeur mockée (optionnel)

##### Exemple

```js
mock('../src/constants.ts', () => ({
    SOME_DEFAULT: 'mocked out'
}))

mock('lodash', (origModuleFactory) => {
    const origModule = await origModuleFactory()
    return {
        ...origModule,
        pick: fn()
    }
})
```

#### `unmock`

Annule le mock d'une dépendance définie dans le répertoire de mock manuel (`__mocks__`).

##### Paramètres

- `moduleName`: nom du module à démocker.

##### Exemple

```js
unmock('lodash')
```