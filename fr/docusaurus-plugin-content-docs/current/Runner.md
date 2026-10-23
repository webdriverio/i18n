---
id: runner
title: Runner
description: "Choisissez entre le runner local et le runner navigateur, et configurez les options du runner navigateur telles que les presets, la configuration Vite et la couverture."
---

import CodeBlock from '@theme/CodeBlock';

Dans WebdriverIO, un runner orchestre la manière dont les tests sont exécutés et l'endroit où ils le sont lorsque vous utilisez le testrunner. WebdriverIO prend actuellement en charge deux types de runner : le runner local et le runner navigateur.

## Runner local

Le [Runner local](https://www.npmjs.com/package/@wdio/local-runner) initialise votre framework (par exemple Mocha, Jasmine ou Cucumber) dans un processus worker et exécute tous vos fichiers de test dans votre environnement Node.js. Chaque fichier de test est exécuté dans un processus worker distinct par capability, ce qui permet une concurrence maximale. Chaque processus worker utilise une seule instance de navigateur et exécute donc sa propre session de navigateur, ce qui garantit une isolation maximale.

Étant donné que chaque test est exécuté dans son propre processus isolé, il n'est pas possible de partager des données entre les fichiers de test. Il existe deux façons de contourner cette limitation :

- utiliser le [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service) pour partager des données entre tous les workers
- regrouper les fichiers de spec (pour en savoir plus, consultez [Organiser la suite de tests](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

Si rien d'autre n'est défini dans le fichier `wdio.conf.js`, le Runner local est le runner par défaut de WebdriverIO.

### Installation

Pour utiliser le Runner local, vous pouvez l'installer via :

```sh
npm install --save-dev @wdio/local-runner
```

### Configuration

Le Runner local est le runner par défaut de WebdriverIO, il n'est donc pas nécessaire de le définir dans votre `wdio.conf.js`. Si vous souhaitez le définir explicitement, vous pouvez le faire comme suit :

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## Runner navigateur

Contrairement au [Runner local](https://www.npmjs.com/package/@wdio/local-runner), le [Runner navigateur](https://www.npmjs.com/package/@wdio/browser-runner) initialise et exécute le framework dans le navigateur. Cela vous permet d'exécuter des tests unitaires ou des tests de composants dans un véritable navigateur plutôt que dans JSDOM, comme le font de nombreux autres frameworks de test. Le bundle de test fonctionne dans Chrome 90, Edge 90, Firefox 90 et Safari 14.1 ou versions ultérieures. Consultez [Prise en charge des navigateurs](/docs/component-testing#browser-support).

Bien que [JSDOM](https://www.npmjs.com/package/jsdom) soit largement utilisé à des fins de test, il ne s'agit finalement pas d'un véritable navigateur et il ne permet pas non plus d'émuler des environnements mobiles. Avec ce runner, WebdriverIO vous permet d'exécuter facilement vos tests dans le navigateur et d'utiliser des commandes WebDriver pour interagir avec les éléments affichés sur la page.

Voici une comparaison entre l'exécution de tests dans JSDOM et dans le Runner navigateur de WebdriverIO

| | JSDOM | Runner navigateur de WebdriverIO |
|-|-------|----------------------------|
|1.| Exécute vos tests dans Node.js à l'aide d'une réimplémentation des standards web, notamment les standards WHATWG DOM et HTML | Exécute vos tests dans un véritable navigateur et fait tourner le code dans l'environnement qu'utilisent vos utilisateurs |
|2.| Les interactions avec les composants ne peuvent être qu'imitées via JavaScript | Vous pouvez utiliser l'[API WebdriverIO](api) pour interagir avec les éléments via le protocole WebDriver |
|3.| La prise en charge de Canvas nécessite des [dépendances supplémentaires](https://www.npmjs.com/package/canvas) et [comporte des limitations](https://github.com/Automattic/node-canvas/issues) | Vous avez accès à la véritable [API Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) |
|4.| JSDOM présente certaines [mises en garde](https://github.com/jsdom/jsdom#caveats) et des API Web non prises en charge | Toutes les API Web sont prises en charge, car les tests s'exécutent dans un véritable navigateur |
|5.| Impossible de détecter les erreurs entre navigateurs | Prise en charge de tous les navigateurs, y compris les navigateurs mobiles |
|6.| Ne peut __pas__ tester les pseudo-états des éléments | Prise en charge des pseudo-états tels que `:hover` ou `:active` |

Ce runner utilise [Vite](https://vitejs.dev/) pour compiler votre code de test et le charger dans le navigateur. Il est fourni avec des presets pour les frameworks de composants suivants :

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

Chaque fichier de test / groupe de fichiers de test s'exécute dans une seule page, ce qui signifie que la page est rechargée entre chaque test afin de garantir l'isolation entre les tests.

### Installation

Pour utiliser le Runner navigateur, vous pouvez l'installer via :

```sh
npm install --save-dev @wdio/browser-runner
```

### Configuration

Pour utiliser le Runner navigateur, vous devez définir une propriété `runner` dans votre fichier `wdio.conf.js`, par exemple :

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### Options du runner

Le Runner navigateur permet les configurations suivantes :

#### `preset`

Si vous testez des composants à l'aide de l'un des frameworks mentionnés ci-dessus, vous pouvez définir un preset qui garantit que tout est configuré dès le départ. Cette option ne peut pas être utilisée conjointement avec `viteConfig`.

__Type :__ `vue` | `svelte` | `solid` | `react` | `preact` | `stencil`<br />
__Exemple :__

```js title="wdio.conf.js"
export const {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

#### `viteConfig`

Définissez votre propre [configuration Vite](https://vitejs.dev/config/). Vous pouvez soit passer un objet personnalisé, soit importer un fichier `vite.conf.ts` existant si vous utilisez Vite.js pour le développement. Notez que WebdriverIO conserve les configurations Vite personnalisées pour mettre en place l'environnement de test.

__Type :__ `string` ou [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) ou `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__Exemple :__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // ou simplement :
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // ou utilisez une fonction si votre configuration Vite contient de nombreux plugins
    // que vous ne souhaitez résoudre qu'au moment où la valeur est lue
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

Si défini à `true`, le runner mettra à jour les capabilities pour exécuter les tests en mode headless. Par défaut, cette option est activée dans les environnements CI où une variable d'environnement `CI` est définie à `'1'` ou `'true'`.

__Type :__ `boolean`<br />
__Par défaut :__ `false`, défini à `true` si la variable d'environnement `CI` est définie

#### `rootDir`

Répertoire racine du projet.

__Type :__ `string`<br />
__Par défaut :__ `process.cwd()`

#### `coverage`

WebdriverIO prend en charge les rapports de couverture de tests via [`istanbul`](https://istanbul.js.org/). Consultez les [Options de couverture](#coverage-options) pour plus de détails.

__Type :__ `object`<br />
__Par défaut :__ `undefined`

### Options de couverture

Les options suivantes permettent de configurer les rapports de couverture.

#### `enabled`

Active la collecte de la couverture.

__Type :__ `boolean`<br />
__Par défaut :__ `false`

#### `include`

Liste des fichiers inclus dans la couverture, sous forme de motifs glob.

__Type :__ `string[]`<br />
__Par défaut :__ `[**]`

#### `exclude`

Liste des fichiers exclus de la couverture, sous forme de motifs glob.

__Type :__ `string[]`<br />
__Par défaut :__

```
[
  'coverage/**',
  'dist/**',
  'packages/*/test{,s}/**',
  '**/*.d.ts',
  'cypress/**',
  'test{,s}/**',
  'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
  '**/__tests__/**',
  '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
  '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
]
```

#### `extension`

Liste des extensions de fichiers que le rapport doit inclure.

__Type :__ `string | string[]`<br />
__Par défaut :__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

Répertoire dans lequel écrire le rapport de couverture.

__Type :__ `string`<br />
__Par défaut :__ `./coverage`

#### `reporter`

Reporters de couverture à utiliser. Consultez la [documentation d'istanbul](https://istanbul.js.org/docs/advanced/alternative-reporters/) pour une liste détaillée de tous les reporters.

__Type :__ `string[]`<br />
__Par défaut :__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

Vérifie les seuils par fichier. Consultez `lines`, `functions`, `branches` et `statements` pour les seuils proprement dits.

__Type :__ `boolean`<br />
__Par défaut :__ `false`

#### `clean`

Nettoie les résultats de couverture avant l'exécution des tests. Le répertoire des rapports n'est nettoyé que lorsque `enabled` vaut `true`, de sorte que le contenu existant n'est pas modifié tant que la couverture est désactivée.

__Type :__ `boolean`<br />
__Par défaut :__ `true`

#### `lines`

Seuil pour les lignes.

__Type :__ `number`<br />
__Par défaut :__ `undefined`

#### `functions`

Seuil pour les fonctions.

__Type :__ `number`<br />
__Par défaut :__ `undefined`

#### `branches`

Seuil pour les branches.

__Type :__ `number`<br />
__Par défaut :__ `undefined`

#### `statements`

Seuil pour les instructions.

__Type :__ `number`<br />
__Par défaut :__ `undefined`

### Limitations

Lorsque vous utilisez le Runner navigateur de WebdriverIO, il est important de noter que les boîtes de dialogue bloquant le thread, comme `alert` ou `confirm`, ne peuvent pas être utilisées nativement. En effet, elles bloquent la page web, ce qui signifie que WebdriverIO ne peut plus communiquer avec la page, provoquant ainsi le blocage de l'exécution.

Dans de telles situations, WebdriverIO fournit des mocks par défaut avec des valeurs de retour par défaut pour ces API. Cela garantit que si l'utilisateur utilise accidentellement des API web de popup synchrones, l'exécution ne se bloquera pas. Il est toutefois recommandé à l'utilisateur de mocker ces API web pour une meilleure expérience. Pour en savoir plus, consultez [Mocking](/docs/component-testing/mocking).

### Exemples

N'oubliez pas de consulter la documentation sur les [tests de composants](https://webdriver.io/docs/component-testing) et de jeter un œil au [dépôt d'exemples](https://github.com/webdriverio/component-testing-examples) pour des exemples utilisant ces frameworks ainsi que divers autres.