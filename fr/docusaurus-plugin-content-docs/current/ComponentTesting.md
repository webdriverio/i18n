---
id: component-testing
title: Tests de composants
description: "Exécutez des tests unitaires et de composants dans de vrais navigateurs avec le Browser Runner de WebdriverIO, propulsé par Vite, y compris la configuration, le harnais de test et le débogage."
---

Avec le [Browser Runner](/docs/runner#browser-runner) de WebdriverIO, vous pouvez exécuter des tests dans un véritable navigateur de bureau ou mobile tout en utilisant WebdriverIO et le protocole WebDriver pour automatiser et interagir avec ce qui est rendu sur la page. Cette approche présente [de nombreux avantages](/docs/runner#browser-runner) par rapport à d'autres frameworks de test qui ne permettent de tester qu'avec [JSDOM](https://www.npmjs.com/package/jsdom).

## Navigateurs pris en charge

Le Browser Runner exécute le bundle de test dans le navigateur. Ce bundle fonctionne dans Chrome 90, Edge 90, Firefox 90 et Safari 14.1, ainsi que dans les versions ultérieures de ces navigateurs.

Les tests end-to-end s'exécutent dans Node.js. Le code passé à [`browser.execute`](/docs/api/browser/execute) s'exécute quant à lui dans le navigateur automatisé, qui peut être plus ancien que les versions ci-dessus. Limitez ce code à ES2021.

## Comment ça fonctionne ?

Le Browser Runner utilise [Vite](https://vitejs.dev/) pour rendre une page de test et initialiser un framework de test afin d'exécuter vos tests dans le navigateur. Actuellement, il ne prend en charge que Mocha, mais Jasmine et Cucumber sont [sur la feuille de route](https://github.com/orgs/webdriverio/projects/1). Cela permet de tester tout type de composants, même pour des projets qui n'utilisent pas Vite.

Le serveur Vite est démarré par le testrunner WebdriverIO et configuré de sorte que vous puissiez utiliser tous les reporters et services comme vous en avez l'habitude pour les tests e2e classiques. De plus, il initialise une instance [`browser`](/docs/api/browser) qui vous permet d'accéder à un sous-ensemble de l'[API WebdriverIO](/docs/api) pour interagir avec n'importe quel élément de la page. Comme pour les tests e2e, vous pouvez accéder à cette instance via la variable `browser` attachée à la portée globale ou en l'important depuis `@wdio/globals`, selon la configuration de [`injectGlobals`](/docs/api/globals).

WebdriverIO prend en charge nativement les frameworks suivants :

- [__Nuxt__](https://nuxt.com/) : le testrunner de WebdriverIO détecte une application Nuxt et configure automatiquement les composables de votre projet tout en aidant à simuler le backend Nuxt. Pour en savoir plus, consultez la [documentation Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/) : le testrunner de WebdriverIO détecte si vous utilisez TailwindCSS et charge correctement l'environnement dans la page de test

## Configuration

Pour configurer WebdriverIO pour les tests unitaires ou de composants dans le navigateur, initialisez un nouveau projet WebdriverIO via :

```bash
npm init wdio@latest ./
# or
yarn create wdio ./
```

Une fois l'assistant de configuration lancé, choisissez `browser` pour exécuter des tests unitaires et de composants, puis sélectionnez l'un des préréglages si vous le souhaitez, ou bien optez pour _"Other"_ si vous voulez uniquement exécuter des tests unitaires basiques. Vous pouvez également définir une configuration Vite personnalisée si vous utilisez déjà Vite dans votre projet. Pour plus d'informations, consultez toutes les [options du runner](/docs/runner#runner-options).

:::info

__Remarque :__ par défaut, WebdriverIO exécute les tests de navigateur en mode headless dans la CI, par exemple lorsqu'une variable d'environnement `CI` est définie à `'1'` ou `'true'`. Vous pouvez configurer manuellement ce comportement à l'aide de l'option [`headless`](/docs/runner#headless) du runner.

:::

À la fin de ce processus, vous devriez trouver un fichier `wdio.conf.js` contenant diverses configurations WebdriverIO, dont une propriété `runner`, par exemple :

```ts reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

En définissant différentes [capabilities](/docs/configuration#capabilities), vous pouvez exécuter vos tests dans différents navigateurs, en parallèle si vous le souhaitez.

Si vous ne savez toujours pas exactement comment tout cela fonctionne, regardez le tutoriel suivant pour bien démarrer avec les tests de composants dans WebdriverIO :

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## Harnais de test

Vous êtes entièrement libre de choisir ce que vous exécutez dans vos tests et la manière dont vous rendez les composants. Nous recommandons toutefois d'utiliser [Testing Library](https://testing-library.com/) comme framework utilitaire, car il fournit des plugins pour divers frameworks de composants, tels que React, Preact, Svelte et Vue. Il est très utile pour rendre des composants dans la page de test et nettoie automatiquement ces composants après chaque test.

Vous pouvez combiner librement les primitives de Testing Library avec les commandes WebdriverIO, par exemple :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__Remarque :__ l'utilisation des méthodes de rendu de Testing Library permet de supprimer les composants créés entre les tests. Si vous n'utilisez pas Testing Library, veillez à attacher vos composants de test à un conteneur qui est nettoyé entre les tests.

## Scripts de configuration

Vous pouvez préparer vos tests en exécutant des scripts arbitraires dans Node.js ou dans le navigateur, par exemple pour injecter des styles, simuler des API du navigateur ou vous connecter à un service tiers. Les [hooks](/docs/configuration#hooks) de WebdriverIO permettent d'exécuter du code dans Node.js, tandis que [`mochaOpts.require`](/docs/frameworks#require) vous permet d'importer des scripts dans le navigateur avant le chargement des tests, par exemple :

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

Par exemple, si vous souhaitez simuler tous les appels [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) de votre test avec le script de configuration suivant :

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// exécuter du code avant le chargement de tous les tests
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // exécuter du code après le chargement du fichier de test
}

export const mochaGlobalTeardown = () => {
    // exécuter du code après l'exécution du fichier de spec
}

```

Dans vos tests, vous pouvez désormais fournir des valeurs de réponse personnalisées pour toutes les requêtes du navigateur. Pour en savoir plus sur les fixtures globales, consultez la [documentation Mocha](https://mochajs.org/#global-fixtures).

## Surveiller les fichiers de test et d'application

Il existe plusieurs façons de déboguer vos tests de navigateur. La plus simple consiste à démarrer le testrunner WebdriverIO avec l'option `--watch`, par exemple :

```sh
$ npx wdio run ./wdio.conf.js --watch
```

Cela exécutera d'abord tous les tests, puis s'arrêtera une fois ceux-ci terminés. Vous pourrez ensuite modifier des fichiers individuels, qui seront alors réexécutés individuellement. Si vous définissez un [`filesToWatch`](/docs/configuration#filestowatch) pointant vers les fichiers de votre application, tous les tests seront réexécutés lorsque des modifications seront apportées à votre application.

## Débogage

Bien qu'il ne soit pas (encore) possible de définir des points d'arrêt dans votre IDE et de les faire reconnaître par le navigateur distant, vous pouvez utiliser la commande [`debug`](/docs/api/browser/debug) pour arrêter le test à n'importe quel moment. Cela vous permet d'ouvrir les DevTools afin de déboguer le test en définissant des points d'arrêt dans l'[onglet Sources](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools).

Lorsque la commande `debug` est appelée, vous obtiendrez également une interface REPL Node.js dans votre terminal, indiquant :

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

Appuyez sur `Ctrl` ou `Command` + `c` ou saisissez `.exit` pour poursuivre le test.

## Exécuter avec une Selenium Grid

Si vous avez mis en place une [Selenium Grid](https://www.selenium.dev/documentation/grid/) et que vous exécutez votre navigateur via cette grille, vous devez définir l'option `host` du Browser Runner afin de permettre au navigateur d'accéder au bon hôte où les fichiers de test sont servis, par exemple :

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // adresse IP réseau de la machine qui exécute le processus WebdriverIO
        host: 'http://172.168.0.2'
    }]
}
```

Cela garantit que le navigateur ouvre correctement la bonne instance de serveur hébergée sur la machine qui exécute les tests WebdriverIO.

## Exemples

Vous trouverez divers exemples de tests de composants utilisant des frameworks de composants populaires dans notre [dépôt d'exemples](https://github.com/webdriverio/component-testing-examples).