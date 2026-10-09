---
id: runner
title: Runner
description: "Choisissez entre le runner local et le runner navigateur, et configurez les options du runner navigateur telles que les presets, la configuration Vite et la couverture de code."
---

import CodeBlock from '@theme/CodeBlock';

Un runner dans WebdriverIO orchestre comment et où les tests sont exécutés lors de l'utilisation du testrunner. WebdriverIO prend actuellement en charge deux types de runner différents : le runner local et le runner navigateur.

## Local Runner

Le [Local Runner](https://www.npmjs.com/package/@wdio/local-runner) lance votre framework (par exemple Mocha, Jasmine ou Cucumber) dans un processus worker et exécute tous vos fichiers de test dans votre environnement Node.js. Chaque fichier de test est exécuté dans un processus worker distinct par capability, ce qui permet une concurrence maximale. Chaque processus worker utilise une seule instance de navigateur et exécute donc sa propre session de navigateur, ce qui permet une isolation maximale.

Étant donné que chaque test est exécuté dans son propre processus isolé, il n'est pas possible de partager des données entre les fichiers de test. Il existe deux façons de contourner ce problème :

- utiliser le [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service) pour partager des données entre tous les workers
- regrouper les fichiers de spec (en savoir plus dans [Organiser la suite de tests](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

Si rien d'autre n'est défini dans le `wdio.conf.js`, le Local Runner est le runner par défaut de WebdriverIO.

### Installation

Pour utiliser le Local Runner, vous pouvez l'installer via :

```sh
npm install --save-dev @wdio/local-runner
```

### Configuration

Le Local Runner est le runner par défaut de WebdriverIO, il n'est donc pas nécessaire de le définir dans votre `wdio.conf.js`. Si vous souhaitez le définir explicitement, vous pouvez le faire comme suit :

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## Browser Runner

Contrairement au [Local Runner](https://www.npmjs.com/package/@wdio/local-runner), le [Browser Runner](https://www.npmjs.com/package/@wdio/browser-runner) lance et exécute le framework dans le navigateur. Cela vous permet d'exécuter des tests unitaires ou des tests de composants dans un véritable navigateur plutôt que dans un JSDOM comme de nombreux autres frameworks de test. Le bundle de test s'exécute dans Chrome 90, Edge 90, Firefox 90 et Safari 14.1 ou plus récent. Voir [Prise en charge des navigateurs](/docs/component-testing#browser-support).

Bien que [JSDOM](https://www.npmjs.com/package/jsdom) soit largement utilisé à des fins de test, il ne s'agit finalement pas d'un véritable navigateur et vous ne pouvez pas non plus émuler des environnements mobiles avec. Avec ce runner, WebdriverIO vous permet d'exécuter facilement vos tests dans le navigateur et d'utiliser les commandes WebDriver pour interagir avec les éléments affichés sur la page.

Voici un aperçu de l'exécution des tests dans JSDOM par rapport au Browser Runner de WebdriverIO

| | JSDOM | WebdriverIO Browser Runner |
|-|-------|----------------------------|
|1.| Exécute vos tests dans Node.js en utilisant une réimplémentation des standards web, notamment les standards WHATWG DOM et HTML | Exécute votre test dans un véritable navigateur et exécute le code dans un environnement que vos utilisateurs utilisent |
|2.| Les interactions avec les composants ne peuvent être qu'imitées via JavaScript | Vous pouvez utiliser l'[API WebdriverIO](api) pour interagir avec les éléments via le protocole WebDriver |
|3.| La prise en charge de Canvas nécessite des [dépendances supplémentaires](https://www.npmjs.com/package/canvas) et [présente des limitations](https://github.com/Automattic/node-canvas/issues) | Vous avez accès à la véritable [API Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) |
|4.| JSDOM présente certaines [mises en garde](https://github.com/jsdom/jsdom#caveats) et des API Web non prises en charge | Toutes les API Web sont prises en charge car les tests s'exécutent dans un véritable navigateur |
|5.| Impossible de détecter les erreurs entre navigateurs | Prise en charge de tous les navigateurs, y compris les navigateurs mobiles |
|6.| Ne peut __pas__ tester les pseudo-états des éléments | Prise en charge des pseudo-états tels que `:hover` ou `:active` |

Ce runner utilise [Vite](https://vitejs.dev/) pour compiler votre code de test et le charger dans le navigateur. Il est fourni avec des presets pour les frameworks de composants suivants :

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

Chaque fichier de test / groupe de fichiers de test s'exécute dans une seule page, ce qui signifie qu'entre chaque test, la page est rechargée pour garantir l'isolation entre les tests.

### Installation

Pour utiliser le Browser Runner, vous pouvez l'installer via :

```sh
npm install --save-dev @wdio/browser-runner
```

### Configuration

Pour utiliser le Browser Runner, vous devez définir une propriété `runner` dans votre fichier `wdio.conf.js`, par exemple :

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### Options du runner

Le Browser Runner permet les configurations suivantes :

#### `preset`

Si vous testez des composants en utilisant l'un des frameworks mentionnés ci-dessus, vous pouvez définir un preset qui garantit que tout est configuré prêt à l'emploi. Cette option ne peut pas être utilisée avec `viteConfig`.

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
    // ou utilisez une fonction si votre configuration vite contient beaucoup de plugins
    // que vous souhaitez uniquement résoudre lorsque la valeur est lue
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

Si défini sur `true`, le runner mettra à jour les capabilities pour exécuter les tests en mode headless. Par défaut, cette option est activée dans les environnements CI où une variable d'environnement `CI` est définie sur `'1'` ou `'true'`.

__Type :__ `boolean`<br />
__Par défaut :__ `false`, défini sur `true` si la variable d'environnement `CI` est définie

#### `rootDir`

Répertoire racine du projet.

__Type :__ `string`<br />
__Par défaut :__ `process.cwd()`

#### `coverage`

WebdriverIO prend en charge les rapports de couverture de tests via [`istanbul`](https://istanbul.js.org/). Voir [Options de couverture](#coverage-options) pour plus de détails.

__Type :__ `object`<br />
__Par défaut :__ `undefined`

### Options de couverture

Les options suivantes permettent de configurer les rapports de couverture.

#### `enabled`

Active la collecte de la couverture.

__Type :__ `boolean`<br />
__Par défaut :__ `false`

#### `include`

Liste des fichiers inclus dans la couverture sous forme de motifs glob.

__Type :__ `string[]`<br />
__Par défaut :__ `[**]`

#### `exclude`

Liste des fichiers exclus de la couverture sous forme de motifs glob.

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

Reporters de couverture à utiliser. Voir la [documentation d'istanbul](https://istanbul.js.org/docs/advanced/alternative-reporters/) pour une liste détaillée de tous les reporters.

__Type :__ `string[]`<br />
__Par défaut :__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

Vérifie les seuils par fichier. Voir `lines`, `functions`, `branches` et `statements` pour les seuils réels.

__Type :__ `boolean`<br />
__Par défaut :__ `false`

#### `clean`

Nettoie les résultats de couverture avant d'exécuter les tests.

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

Lors de l'utilisation du Browser Runner de WebdriverIO, il est important de noter que les boîtes de dialogue bloquant le thread comme `alert` ou `confirm` ne peuvent pas être utilisées nativement. En effet, elles bloquent la page web, ce qui signifie que WebdriverIO ne peut plus communiquer avec la page, provoquant le blocage de l'exécution.

Dans de telles situations, WebdriverIO fournit des mocks par défaut avec des valeurs de retour par défaut pour ces API. Cela garantit que si l'utilisateur utilise accidentellement des API web de popup synchrones, l'exécution ne se bloquera pas. Cependant, il est tout de même recommandé à l'utilisateur de mocker ces API web pour une meilleure expérience. En savoir plus dans [Mocking](/docs/component-testing/mocking).

### Exemples

Assurez-vous de consulter la documentation sur les [tests de composants](https://webdriver.io/docs/component-testing) et de jeter un œil au [dépôt d'exemples](https://github.com/webdriverio/component-testing-examples) pour des exemples utilisant ces frameworks et divers autres.