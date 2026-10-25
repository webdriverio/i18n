---
id: parallel-tests
title: Tests parallèles dans un fichier de spec
description: "Exécutez simultanément les tests Mocha ou les scénarios Cucumber d'un même fichier de spec, chacun dans son propre browsing context WebDriver BiDi, avec mochaOpts.parallelMode ou cucumberOpts.parallelMode, une forme de browser pooling similaire au fullyParallel de Playwright."
---

Depuis la v10, WebdriverIO peut exécuter simultanément les tests d'un même fichier de spec. Chaque `it()` Mocha ou scénario Cucumber obtient sa propre fenêtre de navigateur (un [browsing context](https://w3c.github.io/webdriver-bidi/#browsing-context) WebDriver BiDi) dans un seul worker et une seule session de navigateur. Utilisez cette fonctionnalité pour les fichiers de spec contenant de nombreux tests indépendants : ils se terminent plus vite, et vous n'avez pas besoin de plus de processus worker ni de sessions de navigateur, car chaque test ne coûte que l'ouverture d'une fenêtre.

Il s'agit d'une forme de browser pooling : les tests partagent un pool de fenêtres dans un seul navigateur, et non un pool de navigateurs. Si vous venez de Playwright, `parallelMode: 'userContexts'` est l'équivalent le plus proche de [`fullyParallel: true`](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file) : chaque test obtient son propre contexte isolé. La différence est que Playwright répartit les tests d'un fichier entre plusieurs processus worker, chacun avec son propre navigateur, tandis que WebdriverIO les exécute simultanément dans un seul worker et un seul navigateur.

Ceci est distinct de [`maxInstances`](./OrganizingTestSuites.md), qui exécute des fichiers de spec entiers en parallèle, avec un worker et une session par spec. Vous pouvez combiner les deux : `maxInstances` définit combien de fichiers de spec s'exécutent en même temps, et `maxParallelContexts` définit combien de tests s'exécutent en même temps à l'intérieur de chacun de ces fichiers.

:::warning Expérimental
Le mode parallèle nécessite la capability expérimentale `'wdio:experimentalBiDiCommands'`, qui modifie l'implémentation des commandes d'éléments dans tous les tests, et pas seulement dans les tests parallèles. Consultez [Changements de comportement des commandes d'éléments BiDi](#behavior-changes-of-the-bidi-element-commands).
:::

## Activer le mode parallèle

Vous avez besoin de :

- une session WebDriver BiDi (le comportement par défaut, sauf si vous définissez `'wdio:enforceWebDriverClassic': true`),
- la capability `'wdio:experimentalBiDiCommands': true`,
- `@wdio/mocha-framework` ou `@wdio/cucumber-framework`. Jasmine ne prend pas en charge le mode parallèle.

Si la session n'utilise pas BiDi, ou si la capability est absente, WebdriverIO affiche un avertissement et exécute les tests les uns après les autres. Sans `parallelMode`, rien ne change.

### Mocha

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./test/specs/**/*.e2e.ts'],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'wdio:experimentalBiDiCommands': true
    }],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        parallelMode: 'contexts',
        maxParallelContexts: 4
    }
}
```

Le fichier de spec ne nécessite aucune modification :

```ts title="test/specs/pages.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('shows the API page', async () => {
        await browser.url('https://webdriver.io/docs/api')
        await expect($('h1')).toHaveText('Introduction')
    })

    it('shows the getting started page', async () => {
        await browser.url('https://webdriver.io/docs/gettingstarted')
        await expect($('h1')).toHaveText('Getting Started')
    })
})
```

Les deux tests s'exécutent en même temps, chacun dans sa propre fenêtre. `browser.url()`, `$()` et `expect()` agissent sur la fenêtre du test qui les appelle.

### Cucumber

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./features/**/*.feature'],
    capabilities: [{
        browserName: 'chrome',
        'wdio:experimentalBiDiCommands': true
    }],
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./features/step-definitions/**/*.ts'],
        parallelMode: 'contexts',
        maxParallelContexts: 4
    }
}
```

Chaque scénario d'un fichier feature s'exécute dans sa propre fenêtre. Les profils (`cucumberOpts.profiles`, `cucumberOpts.file`), les specs avec numéros de ligne (`--spec ./features/login.feature:5`) ainsi que les options `tags`, `name`, `order`, `strict`, `dryRun`, `failFast`, `retry` et `retryTagFilter` fonctionnent comme lors d'une exécution séquentielle. Les features, scénarios, steps et hooks sont rapportés comme lors d'une exécution séquentielle, y compris avec `ignoreUndefinedDefinitions`, `failAmbiguousDefinitions`, `tagsInTitle` et `scenarioLevelReporter`.

## Options

| Option | Valeurs | Défaut | Description |
| --- | --- | --- | --- |
| `parallelMode` | `'contexts'`, `'userContexts'` | non défini (séquentiel) | Active le mode parallèle et détermine ce que les tests partagent. |
| `maxParallelContexts` | nombre | `os.cpus().length` | Nombre de tests exécutés en même temps. |

Définissez-les dans `mochaOpts` ou dans `cucumberOpts`.

`maxParallelContexts` définit le nombre de slots. Chaque slot exécute un test à la fois, ouvre la fenêtre de son test suivant pendant que le test en cours s'exécute, et ferme la fenêtre précédente en arrière-plan. Jusqu'à 3 × `maxParallelContexts` fenêtres, plus la première fenêtre de la session, peuvent donc être ouvertes brièvement : chaque slot peut contenir une fenêtre active, une fenêtre préchargée et une fenêtre en cours de fermeture. Le mode parallèle ne ferme que les fenêtres qu'il a ouvertes.

## Choisir entre `contexts` et `userContexts`

| | `'contexts'` | `'userContexts'` |
| --- | --- | --- |
| Fenêtre par test | oui | oui |
| Cookies, `localStorage`, service workers | partagés par tous les tests | isolés par test ([user context](https://w3c.github.io/webdriver-bidi/#user-context)) |
| Connexion | une seule fois, si les tests réutilisent le cookie de session | dans chaque test |
| Prise en charge par le driver | tout navigateur BiDi | nécessite la prise en charge de `browser.createUserContext()`, sinon l'exécution échoue |

Choisissez `'contexts'` par défaut. Choisissez `'userContexts'` lorsque les tests ne doivent pas voir les cookies ou le stockage des autres, par exemple des tests qui se connectent avec des utilisateurs différents. Comme `'contexts'`, `'userContexts'` se rabat sur une exécution séquentielle avec un avertissement lorsque la session n'est pas WebDriver BiDi ou que `'wdio:experimentalBiDiCommands'` est absent des capabilities. Si le driver ne prend pas en charge `browser.createUserContext`, l'exécution échoue au lieu de se rabattre sur le mode séquentiel.

Un onglet ou une fenêtre qu'un test ouvre avec `browser.newWindow(url)` s'ouvre depuis la fenêtre du test, et dispose donc des cookies et du stockage du test. Pour ouvrir une fenêtre en dehors de l'isolation des cookies et du stockage du test, créez-la avec `browser.browsingContextCreate()`, et récupérez son browsing context depuis `browser.browsingContexts()` :

```js
const { context } = await browser.browsingContextCreate({ type: 'window' })
await browser.browsingContextNavigate({ context, url: 'https://example.com', wait: 'complete' })
const outside = (await browser.browsingContexts()).find((c) => c.contextId === context)
await outside.$('h1').getText()
```

## Ce que possède chaque test

À l'intérieur d'un test parallèle, ces commandes agissent sur la propre fenêtre du test :

- navigation : `url`, `back`, `forward`, `refresh`, `getUrl`, `getTitle`
- commandes d'éléments : `$`, `$$`, `shadow$`, `click`, `setValue`, `getText`, les commandes `waitFor*`, et d'autres
- `execute`, `actions`, `addInitScript`
- cookies : `getCookies`, `setCookies`, `deleteCookies` utilisent la partition de cookies du test
- `mock()` : un mock créé dans un test parallèle n'intercepte et n'enregistre que les requêtes de la fenêtre de ce test et de ses frames, de sorte que deux tests peuvent mocker la même URL
- captures d'écran : `saveScreenshot`, `takeElementScreenshot`

## Commandes qui lèvent une erreur en mode parallèle

Certaines commandes agissent sur l'ensemble du navigateur ou de la session, elles ne peuvent donc pas cibler la fenêtre d'un seul test. À l'intérieur d'un test parallèle, elles lèvent une erreur au lieu d'affecter un autre test :

| Commandes | Pourquoi | Alternative |
| --- | --- | --- |
| `getWindowSize`, `setWindowSize` | la fenêtre du système d'exploitation est partagée | utilisez `browser.setViewport()` pour dimensionner la page d'un test. Les tests parallèles partagent une seule fenêtre du système d'exploitation |
| `throttleNetwork`, `throttleCPU` | elles s'appliquent à l'ensemble du navigateur | exécutez ces tests sans le mode parallèle |
| `closeWindow`, `switchToParentFrame` | elles modifient la fenêtre active, que tous les tests partagent | gardez chaque test dans sa propre fenêtre |
| `reloadSession`, `setTimeout` | elles modifient la session que tous les tests partagent | appelez-les dans le hook `before` de `wdio.conf.ts` |
| `acceptAlert`, `dismissAlert`, `getAlertText`, `sendAlertText` | les alertes appartiennent à un browsing context | appelez-les sur le contexte que renvoie `browser.url()` : `const page = await browser.url('https://webdriver.io'); await page.acceptAlert()`. Utilisez `page.acceptAlert(text)` au lieu de `sendAlertText(text)`. `dismissAlert()` et `getAlertText()` fonctionnent également sur le contexte |
| `getComputedRole`, `getComputedLabel` | WebDriver BiDi ne peut pas les lire | exécutez ces tests sans le mode parallèle |

`switchWindow` a été supprimée pour toutes les sessions WebDriver BiDi dans la v10, et pas seulement en mode parallèle. Elle lève l'erreur ``switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. Hold the browsing context returned by `browser.url()` or `browser.newWindow()`, or find one with `browser.browsingContexts()`.`` Conservez l'objet de contexte au lieu de basculer vers celui-ci.

WebdriverIO ferme automatiquement les invites, sauf si quelque chose écoute l'événement `dialog` ; enregistrez donc un listener (`browser.on('dialog', () => {})`) avant de répondre à une invite depuis un test.

Toutes les autres commandes WebDriver Classic lèvent également une erreur. Seules `status`, `getTimeouts` et `getWindowHandles` sont autorisées. Si une commande WebdriverIO se rabat sur WebDriver Classic en mode parallèle sans que vous ayez appelé une commande Classic, veuillez [le signaler](https://github.com/webdriverio/webdriverio/issues/new/choose).

## Hooks et timeouts

### Mocha

- `before()` et `after()` dans un fichier de spec s'exécutent **une fois par test**, et non une fois par `describe`, car chaque test a sa propre fenêtre. Chaque test exécute `before`, `beforeEach`, le test, `afterEach` et `after` dans sa fenêtre. Placez la configuration qui doit s'exécuter une seule fois par fichier de spec dans les hooks `beforeSuite` / `afterSuite` de `wdio.conf.ts`. Ceux-ci s'exécutent une seule fois, en dehors de toute fenêtre de test.
- Comme chaque test exécute ses propres hooks, un hook en échec n'affecte que son propre test. Un `before()` en échec est rapporté une fois pour chaque test, et non une fois pour le `describe`. Un `beforeEach()` ou `afterEach()` en échec n'arrête pas les autres tests du `describe`. Lors d'une exécution séquentielle, Mocha les ignore. Avec `failHookAffectedTests` (le comportement par défaut), le test qu'un `before()` ou `beforeEach()` en échec ignore échoue avec le même texte que lors d'une exécution séquentielle. Seul le titre du hook peut différer : un `beforeEach()` en échec nomme le test de sa propre fenêtre (`"before each" hook for "t2"`), tandis qu'une exécution séquentielle nomme le premier test pour tous.
- Seul `mochaOpts.timeout` s'applique. `this.timeout()` dans un test ou un hook lève une erreur, et `it(...).timeout()` ou un timeout de `describe` est ignoré avec un avertissement. Consultez [Timeouts Mocha et hooks WebdriverIO](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks).
- `mochaOpts.bail` et les retries de Mocha ne sont pas pris en charge et font échouer l'exécution : `mochaOpts.retries`, `this.retries(n)` dans un `describe` et `it(...).retries(n)`. `this.retries()` dans un test ou un hook lève une erreur. Les [retries WebdriverIO](./Retry.md) (`it(title, fn, retries)`) fonctionnent en mode parallèle.
- `.only()`, `this.skip()`, `grep`, `fgrep` et `invert` fonctionnent comme lors d'une exécution séquentielle.
- Une erreur qu'aucun test n'attend (par exemple un timer qui lève une erreur) fait échouer le test ou le hook de la fenêtre dont elle provient, et les autres tests continuent. Comme lors d'une exécution séquentielle, un rejet non géré ne fait pas échouer un test, et avec `mochaOpts.allowUncaught` l'erreur met fin au worker. Une erreur qui survient après la fin de son test, alors que d'autres tests sont encore en cours, fait échouer l'exécution et est journalisée, mais aucun test ne l'affiche (une exécution séquentielle l'affiche sur le test en cours à ce moment-là). Après la fermeture de la dernière fenêtre, une telle erreur met fin au worker, comme lors d'une exécution séquentielle. Il en va de même pour une erreur provenant d'un event emitter que votre code a créé en dehors d'un test, et sur Node.js 22 pour une erreur provenant de `queueMicrotask()`, car la fenêtre du test n'y est pas connue.
- `mochaOpts.dryRun`, `forbidPending` et `checkLeaks` ne s'appliquent pas encore en mode parallèle : les tests s'exécutent, un test en attente n'échoue pas, et une fuite globale n'est pas signalée.

### Cucumber

- `BeforeAll` / `AfterAll` et les hooks `beforeFeature` / `afterFeature` de `wdio.conf.ts` s'exécutent une fois par worker, et non une fois par feature. `beforeFeature` / `afterFeature` reçoivent l'uri et la feature du premier fichier feature uniquement, ce qui a de l'importance lorsqu'un worker exécute plusieurs fichiers feature, par exemple des specs groupées. Ils s'exécutent en dehors de la fenêtre de tout scénario, ils ne doivent donc pas utiliser de commandes qui en nécessitent une.
- `Before` / `After`, `BeforeStep` / `AfterStep` et les hooks de scénario et de step de `wdio.conf.ts` s'exécutent pour chaque scénario, dans la fenêtre de ce scénario.
- `cucumberOpts.strict` vaut `false` par défaut dans WebdriverIO. Un step en attente ne fait échouer le scénario qu'avec `strict: true`.
- Avec `failFast`, les scénarios déjà en cours dans d'autres fenêtres se terminent après le premier échec. Les scénarios qui n'ont pas démarré sont rapportés comme ignorés, comme lors d'une exécution séquentielle.
- Avec `ignoreUndefinedDefinitions: true`, un step ambigu (avec `failAmbiguousDefinitions: false`), ou un step en attente avec `strict: true`, fait échouer l'exécution. Une exécution séquentielle réussit dans ce cas.
- Les formatters Cucumber (`format`, `formatOptions`, `publish`) ne s'exécutent pas, ils n'écrivent donc aucun fichier.

### Les deux frameworks

La fenêtre d'un test se ferme dès que le test se termine. Ne démarrez pas de timers ou de promesses qui continuent de s'exécuter après la fin du test.

## Changements de comportement des commandes d'éléments BiDi

`'wdio:experimentalBiDiCommands': true` remplace l'implémentation de plusieurs commandes d'éléments dans tous les tests de la session, séquentiels ou parallèles :

- `addValue` et `clearValue` déclenchent des événements DOM synthétiques, et non des événements clavier de confiance.
- `getAttribute` suit les règles WebDriver pour les valeurs de propriétés et d'attributs.
- `click` est envoyé via l'API Actions.

Exécutez votre suite une fois avec la capability et sans `parallelMode` pour identifier les tests qui dépendent du comportement Classic.

## Reporters

Les reporters qui étendent [`@wdio/reporter`](./CustomReporter.md) rapportent les tests parallèles sous la bonne suite, et rattachent une commande au test dont le browsing context l'a envoyée.

`@wdio/allure-reporter` prend en charge le mode parallèle avec Mocha. Il écrit le résultat d'un test lorsque le test et ses hooks `afterEach()` et `after()` se terminent. Les hooks `before()` et `after()` s'exécutent une fois par test en mode parallèle, le rapport affiche donc leurs fixtures une fois par test. Avec Cucumber, Allure ne prend pas encore en charge le mode parallèle : les résultats, steps et pièces jointes de scénarios qui se chevauchent peuvent se retrouver sous le mauvais scénario ; utilisez-le donc avec des exécutions séquentielles.

`@wdio/spec-reporter` ne prend pas encore en charge le mode parallèle : un bloc `describe` Mocha qui suit un autre bloc, ou un scénario Cucumber qui démarre pendant qu'un autre s'exécute, est affiché imbriqué sous celui-ci, et avec `retry` de Cucumber le nombre de tests réussis peut être erroné. Les résultats des tests et le code de sortie sont corrects.

`@wdio/cucumberjs-json-reporter` ne prend pas encore en charge le mode parallèle : les steps et pièces jointes de scénarios qui se chevauchent peuvent se retrouver dans le mauvais scénario, et le reporter affiche un avertissement. Utilisez-le avec des exécutions séquentielles.

`@wdio/html-reporter` ne prend pas encore en charge le mode parallèle : les logs, captures d'écran et vidéos qu'un test envoie après le démarrage d'un autre test peuvent se retrouver sous le mauvais test. Utilisez-le avec des exécutions séquentielles.

`@wdio/video-reporter` enregistre chaque test parallèle dans sa propre vidéo. Avec Cucumber, il ne rattache pas les vidéos à Allure.

Un reporter personnalisé ne doit pas supposer qu'un test se termine avant que le suivant ne démarre. Consultez [Reporters et tests parallèles](./CustomReporter.md#reporters-and-parallel-tests).

## Fournisseurs cloud

Les fournisseurs cloud enregistrent une vidéo, un ensemble de logs et un statut de test par session de navigateur. En mode parallèle, de nombreux tests partagent cette session, le tableau de bord du fournisseur ne peut donc pas séparer la vidéo, les logs ou le statut de réussite/échec par test. `userContexts` nécessite également que la grille du fournisseur prenne en charge `browser.createUserContext` (et `browser.removeUserContext` avec Mocha). Le mode parallèle n'a encore été testé sur aucun fournisseur cloud.

Nous vous recommandons de désactiver le mode parallèle lorsque vous exécutez vos tests chez un fournisseur cloud et d'utiliser [`maxInstances`](./OrganizingTestSuites.md) pour exécuter les fichiers de spec en parallèle. Pour le désactiver, supprimez `parallelMode` des options du framework. Si vous supprimez uniquement `'wdio:experimentalBiDiCommands'`, les tests s'exécutent les uns après les autres et chaque exécution affiche un avertissement.

## Dépannage

### `parallelMode: "contexts" requires 'wdio:experimentalBiDiCommands': true to be set in capabilities`

Ajoutez `'wdio:experimentalBiDiCommands': true` à la capability. Sans cela, les tests s'exécutent les uns après les autres. Avec Cucumber, le message est `Parallel mode (cucumberOpts.parallelMode: "contexts") requires "wdio:experimentalBiDiCommands" to be set in capabilities`.

### `... is set but the browser session does not support WebDriver Bidi`

La session utilise WebDriver Classic. Supprimez `'wdio:enforceWebDriverClassic': true` de la capability, ou utilisez un navigateur et un driver prenant en charge WebDriver BiDi. Avec Cucumber, le message est `Parallel mode (cucumberOpts.parallelMode: "contexts") requires a WebDriver Bidi session. Falling back to sequential execution.`

### `parallelMode: "userContexts" requires browser.createUserContext and browser.removeUserContext, which this driver does not support`

Le driver ne peut pas créer de user contexts. Utilisez `parallelMode: 'contexts'` ou mettez à jour le navigateur et le driver. Avec Cucumber, le message est `cucumberOpts.parallelMode "userContexts" requires browser.createUserContext, which this driver does not provide. Use a driver with BiDi user context support or set parallelMode to "contexts" (shares cookies and storage between scenarios).`

### `... is not supported inside parallel mode tests because ...` ou `... is not supported in parallel mode`

Le test a appelé une commande de la section [Commandes qui lèvent une erreur en mode parallèle](#commands-that-throw-in-parallel-mode). Utilisez l'alternative indiquée dans le tableau.

### `bail is not supported in parallel mode` / `retries is not supported in parallel mode`

Supprimez `mochaOpts.bail` ou `mochaOpts.retries`, ou le `this.retries(n)` / `.retries(n)` du test nommé dans l'erreur, ou exécutez le fichier de spec sans `parallelMode`. Pour relancer un test en mode parallèle, utilisez les [retries WebdriverIO](./Retry.md) (`it(title, fn, retries)`).

### `Suite-level hooks (before()/after()) run once per test in parallel mode`

Le fichier de spec contient des hooks `before()` ou `after()`. Ils s'exécutent pour chaque test. Déplacez la configuration qui ne doit s'exécuter qu'une seule fois vers `beforeSuite` / `afterSuite` dans `wdio.conf.ts`.

## Pages associées

- [Organiser les suites de tests](./OrganizingTestSuites.md) : exécuter des fichiers de spec en parallèle avec `maxInstances`
- [Sharding](./Sharding.md) : répartir la suite sur plusieurs machines
- [Frameworks](./Frameworks.md) : toutes les options Mocha et Cucumber
- [Protocoles d'automatisation](./AutomationProtocols.md) : WebDriver BiDi et WebDriver Classic