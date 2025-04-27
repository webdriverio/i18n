---
id: runner
title: Runner
---

import CodeBlock from '@theme/CodeBlock';

Un runner dans WebdriverIO orchestre comment et où les tests sont exécutés lors de l'utilisation du testrunner. WebdriverIO prend actuellement en charge deux types différents de runners : le runner local et le runner de navigateur.

## Runner Local

Le [Runner Local](https://www.npmjs.com/package/@wdio/local-runner) initialise votre framework (par exemple Mocha, Jasmine ou Cucumber) dans un processus de travail et exécute tous vos fichiers de test dans votre environnement Node.js. Chaque fichier de test est exécuté dans un processus de travail distinct par capacité, permettant une concurrence maximale. Chaque processus de travail utilise une seule instance de navigateur et exécute donc sa propre session de navigateur, permettant une isolation maximale.

Étant donné que chaque test est exécuté dans son propre processus isolé, il n'est pas possible de partager des données entre les fichiers de test. Il existe deux façons de contourner ce problème :

- utiliser le [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service) pour partager des données entre tous les workers
- regrouper les fichiers de spécification (en savoir plus dans [Organisation de la suite de tests](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

Si rien d'autre n'est défini dans le `wdio.conf.js`, le Runner Local est le runner par défaut dans WebdriverIO.

### Installation

Pour utiliser le Runner Local, vous pouvez l'installer via :

```sh
npm install --save-dev @wdio/local-runner
```

### Configuration

Le Runner Local est le runner par défaut dans WebdriverIO, il n'est donc pas nécessaire de le définir dans votre `wdio.conf.js`. Si vous souhaitez le définir explicitement, vous pouvez le faire comme suit :

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## Runner de Navigateur

Contrairement au [Runner Local](https://www.npmjs.com/package/@wdio/local-runner), le [Runner de Navigateur](https://www.npmjs.com/package/@wdio/browser-runner) initialise et exécute le framework dans le navigateur. Cela vous permet d'exécuter des tests unitaires ou des tests de composants dans un navigateur réel plutôt que dans un JSDOM comme de nombreux autres frameworks de test.

Bien que [JSDOM](https://www.npmjs.com/package/jsdom) soit largement utilisé à des fins de test, ce n'est finalement pas un véritable navigateur et vous ne pouvez pas émuler des environnements mobiles avec lui. Avec ce runner, WebdriverIO vous permet d'exécuter facilement vos tests dans le navigateur et d'utiliser les commandes WebDriver pour interagir avec les éléments rendus sur la page.

Voici un aperçu de l'exécution de tests dans JSDOM par rapport au Runner de Navigateur WebdriverIO

| | JSDOM | WebdriverIO Browser Runner |
|-|-------|----------------------------|
|1.| Exécute vos tests dans Node.js en utilisant une réimplémentation des standards web, notamment les standards WHATWG DOM et HTML | Exécute votre test dans un navigateur réel et exécute le code dans un environnement que vos utilisateurs utilisent |
|2.| Les interactions avec les composants ne peuvent être imitées que via JavaScript | Vous pouvez utiliser l'[API WebdriverIO](api) pour interagir avec les éléments via le protocole WebDriver |
|3.| Le support Canvas nécessite des [dépendances supplémentaires](https://www.npmjs.com/package/canvas) et [a des limitations](https://github.com/Automattic/node-canvas/issues) | Vous avez accès à la véritable [API Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) |
|4.| JSDOM a certaines [mises en garde](https://github.com/jsdom/jsdom#caveats) et des API Web non prises en charge | Toutes les API Web sont prises en charge car les tests s'exécutent dans un navigateur réel |
|5.| Impossible de détecter les erreurs entre navigateurs | Prise en charge de tous les navigateurs, y compris les navigateurs mobiles |
|6.| Ne peut __pas__ tester les états pseudo des éléments | Prise en charge des états pseudo tels que `:hover` ou `:active` |

Ce runner utilise [Vite](https://vitejs.dev/) pour compiler votre code de test et le charger dans le navigateur. Il est livré avec des préréglages pour les frameworks de composants suivants :

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

Chaque fichier de test / groupe de fichiers de test s'exécute dans une seule page, ce qui signifie qu'entre chaque test, la page est rechargée pour garantir l'isolation entre les tests.

### Installation

Pour utiliser le Runner de Navigateur, vous pouvez l'installer via :

```sh
npm install --save-dev @wdio/browser-runner
```

### Configuration

Pour utiliser le Runner de Navigateur, vous devez définir une propriété `runner` dans votre fichier `wdio.conf.js`, par exemple :

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### Options du Runner

Le Runner de Navigateur permet les configurations suivantes :

#### `preset`

Si vous testez des composants utilisant l'un des frameworks mentionnés ci-dessus, vous pouvez définir un préréglage qui garantit que tout est configuré prêt à l'emploi. Cette option ne peut pas être utilisée avec `viteConfig`.

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

Définissez votre propre [configuration Vite](https://vitejs.dev/config/). Vous pouvez soit passer un objet personnalisé, soit importer un fichier `vite.conf.ts` existant si vous utilisez Vite.js pour le développement. Notez que WebdriverIO conserve des configurations Vite personnalisées pour configurer le harnais de test.

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
    // que vous souhaitez résoudre uniquement lorsque la valeur est lue
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

Si défini sur `true`, le runner mettra à jour les capacités pour exécuter les tests en mode headless. Par défaut, ceci est activé dans les environnements CI où une variable d'environnement `CI` est définie sur `'1'` ou `'true'`.

__Type :__ `boolean`<br />
__Défaut :__ `false`, défini sur `true` si la variable d'environnement `CI` est définie

#### `rootDir`

Répertoire racine du projet.

__Type :__ `string`<br />
__Défaut :__ `process.cwd()`

#### `coverage`

WebdriverIO prend en charge les rapports de couverture de test via [`istanbul`](https://istanbul.js.org/). Voir [Options de couverture](#coverage-options) pour plus de détails.

__Type :__ `object`<br />
__Défaut :__ `undefined`

### Options de couverture

Les options suivantes permettent de configurer les rapports de couverture.

#### `enabled`

Active la collecte de couverture.

__Type :__ `boolean`<br />
__Défaut :__ `false`

#### `include`

Liste des fichiers inclus dans la couverture sous forme de motifs glob.

__Type :__ `string[]`<br />
__Défaut :__ `[**]`

#### `exclude`

Liste des fichiers exclus de la couverture sous forme de motifs glob.

__Type :__ `string[]`<br />
__Défaut :__

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
__Défaut :__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

Répertoire dans lequel écrire le rapport de couverture.

__Type :__ `string`<br />
__Défaut :__ `./coverage`

#### `reporter`

Rapporteurs de couverture à utiliser. Voir la [documentation d'istanbul](https://istanbul.js.org/docs/advanced/alternative-reporters/) pour une liste détaillée de tous les rapporteurs.

__Type :__ `string[]`<br />
__Défaut :__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

Vérifier les seuils par fichier. Voir `lines`, `functions`, `branches` et `statements` pour les seuils réels.

__Type :__ `boolean`<br />
__Défaut :__ `false`

#### `clean`

Nettoyer les résultats de couverture avant d'exécuter les tests.

__Type :__ `boolean`<br />
__Défaut :__ `true`

#### `lines`

Seuil pour les lignes.

__Type :__ `number`<br />
__Défaut :__ `undefined`

#### `functions`

Seuil pour les fonctions.

__Type :__ `number`<br />
__Défaut :__ `undefined`

#### `branches`

Seuil pour les branches.

__Type :__ `number`<br />
__Défaut :__ `undefined`

#### `statements`

Seuil pour les déclarations.

__Type :__ `number`<br />
__Défaut :__ `undefined`

### Limitations

Lors de l'utilisation du runner de navigateur WebdriverIO, il est important de noter que les boîtes de dialogue bloquantes comme `alert` ou `confirm` ne peuvent pas être utilisées nativement. Cela est dû au fait qu'elles bloquent la page web, ce qui signifie que WebdriverIO ne peut pas continuer à communiquer avec la page, provoquant un blocage de l'exécution.

Dans de telles situations, WebdriverIO fournit des mocks par défaut avec des valeurs de retour par défaut pour ces API. Cela garantit que si l'utilisateur utilise accidentellement des API web de popup synchrones, l'exécution ne se bloquera pas. Cependant, il est toujours recommandé à l'utilisateur de mocker ces API web pour une meilleure expérience. En savoir plus dans [Mocking](/docs/component-testing/mocking).

### Exemples

Assurez-vous de consulter la documentation sur les [tests de composants](https://webdriver.io/docs/component-testing) et jetez un œil au [dépôt d'exemples](https://github.com/webdriverio/component-testing-examples) pour des exemples utilisant ces frameworks et divers autres.