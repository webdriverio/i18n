---
id: modules
title: Modules
---

WebdriverIO publie divers modules sur NPM et d'autres registres que vous pouvez utiliser pour construire votre propre framework d'automatisation. Consultez plus de documentation sur les types de configuration de WebdriverIO [ici](/docs/setuptypes).

## `webdriver` et `devtools`

Les paquets de protocole ([`webdriver`](https://www.npmjs.com/package/webdriver) et [`devtools`](https://www.npmjs.com/package/devtools)) exposent une classe à laquelle sont rattachées les fonctions statiques suivantes, qui vous permettent d'initier des sessions :

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Démarre une nouvelle session avec des capacités spécifiques. En fonction de la réponse de la session, des commandes provenant de différents protocoles seront fournies.

##### Paramètres

- `options` : [Options WebDriver](/docs/configuration#webdriver-options)
- `modifier` : fonction qui permet de modifier l'instance du client avant qu'elle ne soit retournée
- `userPrototype` : objet de propriétés qui permet d'étendre le prototype de l'instance
- `customCommandWrapper` : fonction qui permet d'envelopper des fonctionnalités autour des appels de fonction

##### Retourne

- Objet [Browser](/docs/api/browser)

##### Exemple

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

S'attache à une session WebDriver ou DevTools en cours d'exécution.

##### Paramètres

- `attachInstance` : instance à laquelle attacher une session, ou au moins un objet avec une propriété `sessionId` (par ex. `{ sessionId: 'xxx' }`)
- `modifier` : fonction qui permet de modifier l'instance du client avant qu'elle ne soit retournée
- `userPrototype` : objet de propriétés qui permet d'étendre le prototype de l'instance
- `customCommandWrapper` : fonction qui permet d'envelopper des fonctionnalités autour des appels de fonction

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

- `instance` : instance du paquet à recharger

##### Exemple

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

De la même manière que pour les paquets de protocole (`webdriver` et `devtools`), vous pouvez également utiliser les API du paquet WebdriverIO pour gérer les sessions. Les API peuvent être importées avec `import { remote, attach, multiRemote } from 'webdriverio` et contiennent les fonctionnalités suivantes :

#### `remote(options, modifier)`

Démarre une session WebdriverIO. L'instance contient toutes les commandes du paquet de protocole, mais avec des fonctions d'ordre supérieur supplémentaires, voir la [documentation de l'API](/docs/api).

##### Paramètres

- `options` : [Options WebdriverIO](/docs/configuration#webdriverio)
- `modifier` : fonction qui permet de modifier l'instance du client avant qu'elle ne soit retournée

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

S'attache à une session WebdriverIO en cours d'exécution.

##### Paramètres

- `attachOptions` : instance à laquelle attacher une session, ou au moins un objet avec une propriété `sessionId` (par ex. `{ sessionId: 'xxx' }`)

##### Retourne

- Objet [Browser](/docs/api/browser)

##### Exemple

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiRemote(multiRemoteOptions)`

Initie une instance multi-remote qui vous permet de contrôler plusieurs sessions au sein d'une seule instance. Consultez nos [exemples multi-remote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) pour des cas d'utilisation concrets.

##### Paramètres

- `multiRemoteOptions` : un objet dont les clés représentent le nom du navigateur et leurs [Options WebdriverIO](/docs/configuration#webdriverio).

##### Retourne

- Objet [Browser](/docs/api/browser)

##### Exemple

```js
import { multiRemote } from 'webdriverio'

const matrix = await multiRemote({
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
// retourne ['Google', 'JSON']
```

#### `Key`

Un objet contenant des constantes de caractères spéciaux à utiliser avec la commande [`browser.keys`](/docs/api/browser/keys). Ces constantes représentent des touches spéciales qui peuvent être envoyées au navigateur, telles que `Enter`, `Tab`, `Escape`, les touches fléchées, les touches de fonction, et plus encore.

##### Exemple

```js
import { Key } from 'webdriverio'

// Appuyer sur la touche Entrée
await browser.keys(Key.Enter)

// Utiliser Ctrl+A pour tout sélectionner (fonctionne sur toutes les plateformes)
await browser.keys([Key.Ctrl, 'a'])

// Naviguer avec les touches fléchées
await browser.keys([Key.ArrowDown, Key.ArrowDown, Key.Enter])
```

##### Touches disponibles

Les touches spéciales suivantes sont disponibles via l'objet `Key` :

**Touches de modification :**

| Constante | Description |
|----------|-------------|
| `Key.Ctrl` | Touche Contrôle multiplateforme (Commande sur Mac, Contrôle sur Windows/Linux) |
| `Key.Control` | Touche Contrôle |
| `Key.Shift` | Touche Maj |
| `Key.Alt` | Touche Alt |
| `Key.Command` | Touche Commande (Mac) |
| `Key.NULL` | Touche Null/relâchement — relâche toutes les touches de modification actuellement maintenues |

**Touches de navigation :**

| Constante | Description |
|----------|-------------|
| `Key.Cancel` | Touche Annuler |
| `Key.Help` | Touche Aide |
| `Key.Backspace` | Touche Retour arrière |
| `Key.Tab` | Touche Tabulation |
| `Key.Clear` | Touche Effacer |
| `Key.Return` | Touche Retour |
| `Key.Enter` | Touche Entrée |
| `Key.Pause` | Touche Pause |
| `Key.Escape` | Touche Échap |
| `Key.Space` | Touche Espace |
| `Key.PageUp` | Touche Page précédente |
| `Key.PageDown` | Touche Page suivante |
| `Key.End` | Touche Fin |
| `Key.Home` | Touche Début |
| `Key.ArrowLeft` | Touche Flèche gauche |
| `Key.ArrowUp` | Touche Flèche haut |
| `Key.ArrowRight` | Touche Flèche droite |
| `Key.ArrowDown` | Touche Flèche bas |
| `Key.Insert` | Touche Insérer |
| `Key.Delete` | Touche Supprimer |

**Touches de caractères :**

| Constante | Description |
|----------|-------------|
| `Key.Semicolon` | Touche Point-virgule |
| `Key.Equals` | Touche Égal |

**Touches du pavé numérique :**

| Constante | Description |
|----------|-------------|
| `Key.Numpad0` - `Key.Numpad9` | Pavé numérique 0-9 |
| `Key.Multiply` | Multiplication du pavé numérique |
| `Key.Add` | Addition du pavé numérique |
| `Key.Separator` | Séparateur du pavé numérique |
| `Key.Subtract` | Soustraction du pavé numérique |
| `Key.Decimal` | Décimale du pavé numérique |
| `Key.Divide` | Division du pavé numérique |

**Touches de fonction :**

| Constante | Description |
|----------|-------------|
| `Key.F1` - `Key.F12` | Touches de fonction F1 à F12 |

**Autres touches :**

| Constante | Description |
|----------|-------------|
| `Key.ZenkakuHankaku` | Touche Zenkaku/Hankaku (japonais) |

:::info Touches de modification multiplateformes

La constante `Key.Ctrl` offre un moyen pratique d'utiliser le modificateur « contrôle » sur différents systèmes d'exploitation. Sur macOS, elle correspond à la touche `Command`, tandis que sur Windows et Linux elle correspond à la touche `Control`. C'est utile lors de l'écriture de tests qui doivent fonctionner sur plusieurs plateformes, par ex. pour les opérations de sélection totale (`Ctrl+A`), de copie (`Ctrl+C`) ou de collage (`Ctrl+V`).

:::

## `@wdio/cli`

Au lieu d'appeler la commande `wdio`, vous pouvez également inclure le test runner en tant que module et l'exécuter dans un environnement arbitraire. Pour cela, vous devrez importer le paquet `@wdio/cli` en tant que module, comme ceci :

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

Ensuite, créez une instance du launcher et exécutez le test.

#### `Launcher(configPath, opts)`

Le constructeur de la classe `Launcher` attend l'URL du fichier de configuration, ainsi qu'un objet `opts` avec des paramètres qui écraseront ceux de la configuration.

##### Paramètres

- `configPath` : chemin vers le `wdio.conf.js` à exécuter
- `opts` : arguments ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) pour écraser les valeurs du fichier de configuration

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

La commande `run` retourne une [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Elle est résolue si les tests ont été exécutés avec succès ou ont échoué, et elle est rejetée si le launcher n'a pas pu démarrer l'exécution des tests.

## `@wdio/browser-runner`

Lors de l'exécution de tests unitaires ou de composants à l'aide du [browser runner](/docs/runner#browser-runner) de WebdriverIO, vous pouvez importer des utilitaires de mocking pour vos tests, par ex. :

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Les exports nommés suivants sont disponibles :

#### `fn`

Fonction mock, voir plus dans la [documentation officielle de Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Fonction espion, voir plus dans la [documentation officielle de Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Méthode pour mocker un fichier ou un module de dépendance.

##### Paramètres

- `moduleName` : soit un chemin relatif vers le fichier à mocker, soit un nom de module.
- `factory` : fonction pour retourner la valeur mockée (facultatif)

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

Annule le mock d'une dépendance définie dans le répertoire de mocks manuels (`__mocks__`).

##### Paramètres

- `moduleName` : nom du module dont le mock doit être annulé.

##### Exemple

```js
unmock('lodash')
```