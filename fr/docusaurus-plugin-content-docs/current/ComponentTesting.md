---
id: component-testing
title: Tests de Composants
---

Avec le [Browser Runner](/docs/runner#browser-runner) de WebdriverIO, vous pouvez exécuter des tests dans un navigateur de bureau ou mobile réel tout en utilisant WebdriverIO et le protocole WebDriver pour automatiser et interagir avec ce qui est rendu sur la page. Cette approche présente [de nombreux avantages](/docs/runner#browser-runner) par rapport à d'autres frameworks de test qui ne permettent de tester que contre [JSDOM](https://www.npmjs.com/package/jsdom).

## Comment ça fonctionne ?

Le Browser Runner utilise [Vite](https://vitejs.dev/) pour rendre une page de test et initialiser un framework de test pour exécuter vos tests dans le navigateur. Actuellement, il ne prend en charge que Mocha, mais Jasmine et Cucumber sont [sur la feuille de route](https://github.com/orgs/webdriverio/projects/1). Cela permet de tester tout type de composants, même pour les projets qui n'utilisent pas Vite.

Le serveur Vite est démarré par le testrunner WebdriverIO et configuré de manière à ce que vous puissiez utiliser tous les rapporteurs et services comme vous en aviez l'habitude pour les tests e2e normaux. De plus, il initialise une instance [`browser`](/docs/api/browser) qui vous permet d'accéder à un sous-ensemble de l'[API WebdriverIO](/docs/api) pour interagir avec tous les éléments de la page. Comme pour les tests e2e, vous pouvez accéder à cette instance via la variable `browser` attachée à la portée globale ou en l'important depuis `@wdio/globals` selon la façon dont [`injectGlobals`](/docs/api/globals) est défini.

WebdriverIO prend en charge nativement les frameworks suivants :

- [__Nuxt__](https://nuxt.com/) : Le testrunner de WebdriverIO détecte une application Nuxt et configure automatiquement les composables de votre projet et aide à simuler le backend Nuxt, en savoir plus dans la [documentation Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/) : Le testrunner de WebdriverIO détecte si vous utilisez TailwindCSS et charge correctement l'environnement dans la page de test

## Configuration

Pour configurer WebdriverIO pour les tests unitaires ou de composants dans le navigateur, initiez un nouveau projet WebdriverIO via :

```bash
npm init wdio@latest ./
# ou
yarn create wdio ./
```

Une fois que l'assistant de configuration démarre, choisissez `browser` pour exécuter des tests unitaires et de composants et choisissez l'un des préréglages si vous le souhaitez, sinon optez pour _"Other"_ si vous souhaitez uniquement exécuter des tests unitaires de base. Vous pouvez également configurer une configuration Vite personnalisée si vous utilisez déjà Vite dans votre projet. Pour plus d'informations, consultez toutes les [options du runner](/docs/runner#runner-options).

:::info

__Remarque :__ WebdriverIO exécutera par défaut les tests de navigateur en mode headless dans un environnement CI, par exemple si une variable d'environnement `CI` est définie sur `'1'` ou `'true'`. Vous pouvez configurer manuellement ce comportement en utilisant l'option [`headless`](/docs/runner#headless) pour le runner.

:::

À la fin de ce processus, vous devriez trouver un `wdio.conf.js` qui contient diverses configurations WebdriverIO, y compris une propriété `runner`, par exemple :

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

En définissant différentes [capabilities](/docs/configuration#capabilities), vous pouvez exécuter vos tests dans différents navigateurs, en parallèle si vous le souhaitez.

Si vous n'êtes toujours pas sûr de comment tout fonctionne, regardez le tutoriel suivant sur comment démarrer avec les Tests de Composants dans WebdriverIO :

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## Harnais de Test

C'est totalement à vous de décider ce que vous voulez exécuter dans vos tests et comment vous souhaitez rendre les composants. Cependant, nous recommandons d'utiliser [Testing Library](https://testing-library.com/) comme framework utilitaire car il fournit des plugins pour divers frameworks de composants, tels que React, Preact, Svelte et Vue. Il est très utile pour rendre les composants dans la page de test et il nettoie automatiquement ces composants après chaque test.

Vous pouvez mélanger les primitives de Testing Library avec les commandes WebdriverIO comme vous le souhaitez, par exemple :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__Remarque :__ l'utilisation des méthodes de rendu de Testing Library aide à supprimer les composants créés entre les tests. Si vous n'utilisez pas Testing Library, assurez-vous d'attacher vos composants de test à un conteneur qui est nettoyé entre les tests.

## Scripts de Configuration

Vous pouvez configurer vos tests en exécutant des scripts arbitraires dans Node.js ou dans le navigateur, par exemple en injectant des styles, en simulant des API de navigateur ou en vous connectant à un service tiers. Les [hooks](/docs/configuration#hooks) de WebdriverIO peuvent être utilisés pour exécuter du code dans Node.js tandis que [`mochaOpts.require`](/docs/frameworks#require) vous permet d'importer des scripts dans le navigateur avant que les tests ne soient chargés, par exemple :

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // fournir un script de configuration à exécuter dans le navigateur
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // configurer l'environnement de test dans Node.js
    }
    // ...
}
```

Par exemple, si vous souhaitez simuler tous les appels [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) dans votre test avec le script de configuration suivant :

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// exécuter du code avant que tous les tests ne soient chargés
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // exécuter du code après le chargement du fichier de test
}

export const mochaGlobalTeardown = () => {
    // exécuter du code après l'exécution du fichier de spécification
}

```

Maintenant, dans vos tests, vous pouvez fournir des valeurs de réponse personnalisées pour toutes les requêtes du navigateur. En savoir plus sur les fixtures globaux dans la [documentation Mocha](https://mochajs.org/#global-fixtures).

## Surveiller les Fichiers de Test et d'Application

Il existe plusieurs façons de déboguer vos tests de navigateur. La plus simple est de démarrer le testrunner WebdriverIO avec le flag `--watch`, par exemple :

```sh
$ npx wdio run ./wdio.conf.js --watch
```

Cela exécutera tous les tests initialement et s'arrêtera une fois que tous sont exécutés. Vous pouvez ensuite apporter des modifications à des fichiers individuels qui seront alors réexécutés individuellement. Si vous définissez [`filesToWatch`](/docs/configuration#filestowatch) pointant vers vos fichiers d'application, il réexécutera tous les tests lorsque des modifications sont apportées à votre application.

## Débogage

Bien qu'il ne soit pas (encore) possible de définir des points d'arrêt dans votre IDE et de les faire reconnaître par le navigateur distant, vous pouvez utiliser la commande [`debug`](/docs/api/browser/debug) pour arrêter le test à n'importe quel moment. Cela vous permet d'ouvrir DevTools pour ensuite déboguer le test en définissant des points d'arrêt dans l'[onglet sources](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools).

Lorsque la commande `debug` est appelée, vous obtiendrez également une interface repl Node.js dans votre terminal, indiquant :

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

Appuyez sur `Ctrl` ou `Command` + `c` ou entrez `.exit` pour continuer avec le test.

## Exécution à l'aide d'une Grille Selenium

Si vous avez configuré une [Grille Selenium](https://www.selenium.dev/documentation/grid/) et que vous exécutez votre navigateur via cette grille, vous devez définir l'option `host` du browser runner pour permettre au navigateur d'accéder au bon hôte où les fichiers de test sont servis, par exemple :

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // IP réseau de la machine qui exécute le processus WebdriverIO
        host: 'http://172.168.0.2'
    }]
}
```

Cela garantira que le navigateur ouvre correctement la bonne instance de serveur hébergée sur l'instance qui exécute les tests WebdriverIO.

## Exemples

Vous pouvez trouver divers exemples de test de composants utilisant des frameworks de composants populaires dans notre [dépôt d'exemples](https://github.com/webdriverio/component-testing-examples).