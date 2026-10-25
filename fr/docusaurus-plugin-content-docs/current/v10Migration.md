---
id: v10-migration
title: De la v9 à la v10
description: Mettre à jour un projet WebdriverIO v9 vers la v10, avec toutes les modifications incompatibles et un skill pour agent de codage qui applique ce guide.
---

Ce guide rassemble les modifications incompatibles de WebdriverIO `v10` et ce que vous devez faire pour chacune.

Contrairement aux versions majeures précédentes, le [codemod](https://github.com/webdriverio/codemod) de WebdriverIO ne peut pas appliquer la plupart de ces changements, car ils dépendent de ce que vos tests veulent réellement dire. Les [signatures de commandes héritées](#legacy-command-signatures) ci-dessous sont des remplacements mécaniques. Chacune des autres sections explique comment trouver les endroits concernés dans votre suite.

## Migrer avec un agent de codage

Donnez à votre agent le skill de migration v10 et demandez-lui de migrer la suite vers WebdriverIO v10 en suivant cette page. Le skill décrit la procédure : ce qu'il faut rechercher, quel codemod exécuter et quand s'arrêter. Cette page fait foi pour chaque modification incompatible.

Installez-le depuis le projet que vous mettez à jour. Le [CLI skills](https://skills.sh) lit [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) depuis ce dépôt et l'écrit dans le répertoire de skills des agents que vous choisissez :

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

`--skill wdio-v10-migration` installe ce skill. Les skills destinés au travail sur le dépôt WebdriverIO sont marqués comme internes et ne sont pas proposés. Le CLI demande pour quels agents installer le skill et l'écrit dans le répertoire de projet de chaque agent. Vous pouvez aussi joindre ce fichier à la conversation.

Les sélecteurs stricts et les listes `specs` / `exclude` sans préfixe dans les capabilities n'apparaissent qu'à l'exécution de la suite. Le skill ne peut pas en décider à partir du seul code source.

## Node.js

WebdriverIO v10 nécessite Node.js 22.23.4, 24.22.1 ou 26.12.1, ou une version ultérieure de ces lignes. Ce sont les premières versions avec le [magasin de certificats CA mis à jour](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) suite à la compromission de l'autorité intermédiaire eMudhra. Node.js 18 et 20 ne sont plus pris en charge, et Node.js 23 et 25 ne sont pas pris en charge. La CI couvre Node.js 22, 24 et 26.

## Tests de composants

Le browser runner fonctionne toujours dans Chrome 90, Edge 90, Firefox 90 et Safari 14.1 ou plus récent. Voir [Prise en charge des navigateurs](/docs/component-testing#browser-support).

Le code passé à `browser.execute` reste en ES2021, afin de pouvoir s'exécuter dans des navigateurs plus anciens sous test. Ce plancher n'a pas changé.

## Mocha

`@wdio/mocha-framework` et `@wdio/browser-runner` dépendent de [Mocha 12](https://mochajs.org/blog/mocha-12-stable/). Mocha 12 nécessite Node.js `^20.19.0 || >=22.12.0`, ce que couvre le plancher v10 de Node.js 22.23.4.

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

`mochaOpts.compilers` a disparu. Mocha a supprimé l'option `--compilers`, dépréciée depuis longtemps, donc les associations de compilateurs restantes sont ignorées. Chargez les transpileurs ou autres fichiers de configuration avec `mochaOpts.require`.

WebdriverIO suit le timeout de Mocha : `this.timeout()` dans un test ou un hook, et `mochaOpts.timeout: 0`, qui désactive le timeout. En v9, WebdriverIO ignorait `this.timeout()` dans un test, et à partir de la 9.22, `mochaOpts.timeout: 0` faisait échouer tous les tests (« Timeout after -3ms »). L'argument `retry` de WebdriverIO ne relance pas un test après un timeout. Voir [Les timeouts Mocha et les hooks WebdriverIO](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks), également pour `mochaOpts.parallelMode`. Nouveau en v10 : [des tests parallèles dans un fichier de spec](./ParallelTests.md) avec `mochaOpts.parallelMode` ou `cucumberOpts.parallelMode`.

`failHookAffectedTests` vaut `true` par défaut. Un hook `before` ou `beforeEach` en échec fait échouer les tests que ce hook a fait sauter. Définissez `mochaOpts.failHookAffectedTests` à `false` pour ne signaler que le hook.

Le titre d'un hook contient la description ou le nom de la fonction du hook, comme dans Mocha : `"before each" hook: login for "my test"` pour `beforeEach('login', fn)` ou `beforeEach(function login () {})`, ou aucun nom pour un hook anonyme : `"before each" hook for "my test"`. En v9, il contenait `wrappedHook`, le nom de l'enveloppe WebdriverIO. Vous voyez ce titre dans l'erreur d'un test qu'un hook en échec a fait sauter, et dans les noms des hooks de niveau racine, par exemple dans Allure.

Utilisez `expect-webdriverio` 8, voir [expect-webdriverio 8](#expect-webdriverio-8). Mocha peut charger ce paquet deux fois dans un même processus ; il partage l'état des assertions entre ces copies ([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221)).

Changements de Mocha 12 susceptibles de transparaître via `mochaOpts` :

- `grep` accepte les drapeaux RegExp modernes.
- `ui` reste `bdd`, `tdd`, `qunit` ou `exports`. Les interfaces personnalisées doivent conserver le suffixe `*-bdd`, `*-tdd` ou `*-qunit`.
- `parallel` n'est toujours pas pris en charge. WDIO gère le parallélisme des specs ; le pool de workers de Mocha génère une erreur si vous l'activez.

Mocha 12 est d'abord ESM (`"type": "module"`). Le `require('mocha')` programmatique fonctionne toujours sur Node 22 via `require(esm)`. Le CLI Mocha de WDIO (`wdio run … --mochaOpts.*`) est inchangé ; le CLI propre à Mocha utilise désormais `util.parseArgs` au lieu de yargs.

## Cucumber

`@wdio/cucumber-framework` dépend de [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

Cucumber 13 nécessite Node.js 22, 24 ou 26 ou plus récent. Il ne fonctionne pas sur Node.js 20, 23 ou 25. Le paquet du framework déclare la plage v10, qui exclut aussi Node.js 23 et 25.

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

`tagExpression` n'a pas d'alias. Le définir lève une erreur, afin qu'un filtre restant ne puisse pas exécuter silencieusement tous les scénarios.

Cucumber 13 n'exporte plus `Cli`. Les exécutions programmatiques passent par `runCucumber` de `@cucumber/cucumber/api`, ce que l'adaptateur utilise déjà.

Les autres modifications incompatibles de Cucumber 13 (chemins de formateurs ambigus, workers parallèles, `BeforeAll` / `AfterAll`) sont décrites dans le [guide de mise à niveau de Cucumber](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

### uid des features

L'uid d'une feature Cucumber est le chemin du fichier de feature depuis `rootDir`, et non le nom du fichier : `features/admin/login.feature:1:1` au lieu de `login.feature:1:1`. Deux fichiers de feature portant le même nom dans des dossiers différents ne partagent plus d'uid. Les propriétés `parent` et `fullTitle` d'un scénario utilisent cet uid. Les caractères `%`, `:` et `#` du chemin sont encodés en `%25`, `%3A` et `%23`, de sorte que `uid.split(':')[1]` reste la ligne et qu'un `#` ne débute qu'un numéro de partie. Dans les specs groupées avec un ordre aléatoire, une feature qui recommence a l'uid de suite `<uid>#2`.

Avec `scenarioLevelReporter: true`, le `historyId` d'Allure provient de `fullTitle`, donc l'historique Allure de chaque scénario repart de zéro avec ce changement. Il repart aussi de zéro lorsque `rootDir` ou le chemin du fichier de feature change. Pour conserver un seul historique pour des fichiers de configuration situés dans des dossiers différents, définissez le même `rootDir` dans chacun d'eux.

## Jasmine

`@wdio/jasmine-framework` dépend de [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0). Jasmine 6 est testé sur Node.js 20, 22 et 24. Le plancher v10 de Node.js 22.23.4 couvre déjà cette plage.

`jasmineNodeOpts` a été supprimé. Configurez Jasmine avec `jasmineOpts`. Définir `jasmineNodeOpts` lève une erreur :

```text
The option "jasmineNodeOpts" was removed in WebdriverIO v10. Use "jasmineOpts" instead.
```

```diff
- jasmineNodeOpts: { defaultTimeoutInterval: 60000 }
+ jasmineOpts: { defaultTimeoutInterval: 60000 }
```

`jasmineOpts.failFast` n'est plus lu. Utilisez `jasmineOpts.stopOnSpecFailure`. Un `failFast` restant n'arrête pas la suite. Le `failFast` de Cucumber est une option différente et fonctionne toujours.

```diff
- jasmineOpts: { failFast: true }
+ jasmineOpts: { stopOnSpecFailure: true }
```

`jasmineOpts.stopSpecOnExpectationFailure` a été supprimé. Utilisez `jasmineOpts.oneFailurePerSpec`. Définir l'ancienne clé lève une erreur :

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

Les matchers synchrones de Jasmine sont de nouveau synchrones. En v9, le `expect` global était le `expectAsync` de Jasmine, donc `expect(1).toBe(1)` renvoyait une promesse. En v10, les matchers intégrés de Jasmine et ceux que vous ajoutez avec `jasmine.addMatchers` renvoient `undefined`. Les matchers WebdriverIO, les matchers asynchrones de Jasmine et les matchers de `jasmine.addAsyncMatchers` renvoient toujours une promesse, continuez donc à les `await`. Vous n'avez pas besoin de remplacer `await expect($('#logo')).toBeDisplayed()` par `expectAsync()` : le `expect` global transmet pour vous les matchers WebdriverIO à `expectAsync`. `await expect(1).toBe(1)` continue de fonctionner.

Une assertion synchrone en échec sans `await` fait désormais échouer la spec. En v9, c'était une promesse rejetée : si rien ne l'attendait, la spec pouvait réussir, avec seulement un rejet non géré dans le journal. Après la mise à jour, examinez les specs qui commencent à échouer. Elles cachaient un échec en v9, et la correction se trouve dans le test ou dans l'application, pas dans l'appel à `expect` :

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9 : réussissait même lorsque `onSave` n'était pas appelé
    // v10 : échoue lorsque `onSave` n'est pas appelé
    expect(onSave).toHaveBeenCalled()
})
```

Le résultat d'un matcher synchrone est désormais `undefined`, donc `.then()` ou `.catch()` dessus lève une `TypeError` :

```diff
- expect(total).toBe(3).then(() => log('ok'))
+ expect(total).toBe(3)
+ log('ok')
```

Autres effets de ce changement :

- `oneFailurePerSpec` arrête désormais la spec à sa première assertion en échec : immédiatement pour un matcher synchrone, et lorsque la promesse se résout pour un matcher asynchrone attendu.
- Les matchers d'espions de Jasmine fonctionnent sans `await`. En v9, `toHaveBeenCalled`, `toHaveSpyInteractions` et `toHaveNoOtherSpyInteractions` échouaient avec « Does not take arguments », et un espion non appelé réussissait sans `await`.
- `jasmine.addMatchers` n'est plus remplacé, donc Jasmine n'affiche plus son avertissement « Monkey patching detected ».

`toHaveSize` a deux significations. Sur une valeur WebdriverIO, c'est le matcher WebdriverIO qui vérifie la taille de l'élément : un élément, un tableau d'éléments (y compris le résultat de `$$().filter()`), un `Element[]`, un élément multi-remote, un navigateur, un browsing context, un mock, l'enveloppe `some()`, ou une promesse comme un `$()` chaînable. Sur toute autre valeur, c'est le matcher de Jasmine qui vérifie la longueur. En v9, c'était toujours le matcher de Jasmine qui s'exécutait.

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine, synchrone
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, asynchrone
```

Les types suivent les mêmes règles. `@wdio/jasmine-framework` type désormais le `expect` global avec les matchers de Jasmine, plus les matchers WebdriverIO et les matchers asynchrones de Jasmine, qui renvoient une promesse. Retirez `expect-webdriverio/jasmine-wdio-expect-async` des `types` de votre `tsconfig.json`, car il type tous les matchers comme asynchrones. Ajoutez `jasmine` s'il n'y figure pas :

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "types": ["node", "@wdio/globals/types", "expect-webdriverio/jasmine-wdio-expect-async", "@wdio/jasmine-framework"]
+        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
     }
 }
```

`expect.oneOf()` et `expect.multiRemote()` fonctionnent désormais aussi dans les specs Jasmine. Auparavant, ils n'étaient pas présents sur le `expect` de Jasmine à l'exécution.

## expect-webdriverio 8

`@wdio/globals`, `@wdio/runner` et `@wdio/browser-runner` exigent `expect-webdriverio` 8 comme dépendance pair (peer dependency). En v9, c'était `expect-webdriverio` 5, 6 ou 7. Si votre `package.json` liste `expect-webdriverio`, mettez-le à jour vers la version 8 dans la même modification que les paquets `@wdio/*`.

`expect-webdriverio` 8 a ses propres modifications incompatibles. Son [guide de migration v7 vers v8](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) liste chaque changement et son remplacement. Depuis `expect-webdriverio` 5 ou 6, lisez aussi son [guide de migration v5 vers v6](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v5-to-v6) : la version 8 supprime les API que les versions 5.6.9 à 6.0.0 avaient dépréciées. La version 7 n'a pas de guide de migration. Elle ajoute la prise en charge du multi-remote, et `toMatchSnapshot()` et `toMatchInlineSnapshot()` sur `$$()` stockent désormais le `outerHTML` de chaque élément : mettez à jour ces snapshots. Ces changements sont les plus susceptibles d'affecter une suite de tests :

- `toHaveText` sur `$$()` compare les éléments index par index. Un tableau attendu dans un ordre différent de celui de la page échoue. Utilisez l'ordre de la page, `expect.oneOf()` ou `expect.arrayContaining()`.
- Un tableau de valeurs attendues sur un seul élément fait échouer `toHaveText`, `toHaveHTML`, `toHaveComputedLabel`, `toHaveComputedRole` et `toHaveElementClass`. Utilisez `expect.oneOf()`. Pour `toHaveElementClass`, un tableau signifiait « possède l'une de ces classes » : utilisez `expect.oneOf()`, ou une assertion par classe lorsque l'élément doit toutes les avoir.
- Un matcher de liste (`expect.arrayContaining()`, `expect.arrayOf()`) sur un seul élément, ou avec `some()`, lève une erreur. Sur `$$()`, il compare les valeurs de tous les éléments à la fois.
- Un attribut ou une propriété manquant ne correspond jamais, pas même à un matcher qui n'accepte aucune valeur, comme `expect.not.stringContaining()`.
- Les valeurs `URL`, `Set`, `Map` et binaires sont comparées par leur contenu. Une assertion qui réussissait par erreur peut désormais échouer.
- Les types utilitaires ne sont plus globaux. Un fichier qui utilise `Test`, `TestResult`, `Scenario` ou `WdioCustomMatchers` sans import échoue avec `Cannot find name` : utilisez `Frameworks.Test`, `Frameworks.TestResult` et `Frameworks.Scenario` de `@wdio/types`, et `ExpectWebdriverIO.Matchers`.
- `setFeatureFlags()` et l'option `featureFlags` ont été supprimés.
- Ces API dépréciées ont été supprimées : `setOptions` (utilisez `setDefaultOptions`), `getConfig` (utilisez `getDefaultOptions`), `matchers` (utilisez `wdioCustomMatchers`), `toHaveAttr` (utilisez `toHaveAttribute`), `toHaveClass` (utilisez `toHaveElementClass`), `toBeRequestedWithResponse()` (utilisez `toBeRequestedWith({ response })`), et `expect-webdriverio/types` (utilisez `expect-webdriverio/expect-global`).
- Les hooks `beforeAssertion` et `afterAssertion` reçoivent le nom de l'alias appelé par le test, pour `toBeExisting`, `toBePresent`, `toHaveLink`, `toHaveValue` et `toBeRequested`. En v9, ils recevaient le nom du matcher derrière l'alias, par exemple `toExist` pour `toBeExisting`.
- Sur un navigateur multi-remote, passez le résultat de `$$()` à `expect`. Un tableau simple comme `[...elements]` ou `Array.from(elements)` n'est pas reconnu comme des éléments, et l'assertion échoue.

Sur un navigateur multi-remote, une assertion vérifie chaque instance, et `expect.multiRemote()` fournit une valeur attendue par instance. Voir [Assertions multiremote](/docs/multiremote#assertions).

## Paquets de drivers

WebdriverIO v10 démarre Firefox, Edge et Safari avec `geckodriver` 8, `edgedriver` 8 et `safaridriver` 3. En v9, il utilisait `geckodriver` et `edgedriver` 6 ou 7, et `safaridriver` 1 ou 2. WebdriverIO les installe, vous n'avez donc pas à les lister vous-même. Si votre `package.json` liste l'un d'eux, mettez-le à jour dans la même modification que les paquets `@wdio/*`.

`geckodriver` et `edgedriver` prennent `@wdio/logger` comme dépendance pair, ils journalisent donc via le logger de votre installation WebdriverIO. En v9, `geckodriver` et `edgedriver` apportaient leur propre copie de `@wdio/logger`, et cette seconde copie vidait le fichier de log dans `outputDir`. Exécutez `npm ls @wdio/logger` : chaque copie doit être en version 10. Un plugin ou un service qui dépend encore de la version 9 a le même effet.

Les [notes de mise à niveau des drivers](https://github.com/webdriverio/driver#upgrading-to-geckodriver-8-edgedriver-8-and-safaridriver-3) listent tous les changements. Ceux-ci peuvent affecter un projet WebdriverIO :

- Les téléchargements de drivers utilisent `HTTPS_PROXY` et `HTTP_PROXY`. En v9, les téléchargements de `geckodriver` et `edgedriver` les ignoraient. Si un proxy est défini dans votre environnement mais que le CDN des drivers doit être joint directement, ajoutez son hôte à `NO_PROXY`.
- `geckodriver` ne lit plus `GECKODRIVER_FILEPATH`. Utilisez `GECKODRIVER_PATH`.
- `wdio:edgedriverOptions` et `wdio:safaridriverOptions` acceptent `spawnOpts`, comme `wdio:chromedriverOptions`.

## Téléchargements de navigateurs

En v9, WebdriverIO extrayait lui-même les fichiers zip de Chrome, Chromium et Chromedriver. En v10, il utilise la commande système `unzip` sous Linux et macOS (`tar.exe` ou PowerShell sous Windows). Les images Docker allégées, comme `node:24-slim`, ne l'ont pas : installez-la, voir [Docker](/docs/docker#images-where-webdriverio-downloads-the-browser).

En v9, les téléchargements de Chrome, Chromium, Firefox et Chromedriver utilisaient `HTTPS_PROXY` et `HTTP_PROXY`. En v10, ils ne les utilisent que lorsque `proxy-agent` est installé dans votre projet, ou lorsque Node.js s'exécute avec `NODE_USE_ENV_PROXY=1`. WebdriverIO journalise un avertissement lorsqu'une variable de proxy est définie mais que le téléchargement l'ignorerait. Voir [Proxy pour les téléchargements de navigateurs et de drivers](/docs/proxy#proxy-for-browser-and-driver-downloads).

## Global multi-remote

Le global en minuscules `multiremotebrowser` a été supprimé, de `@wdio/globals` ainsi que des globaux de `eslint-plugin-wdio`. Utilisez `multiRemoteBrowser`.

```diff
- import { multiremotebrowser } from '@wdio/globals'
+ import { multiRemoteBrowser } from '@wdio/globals'
```

## Capabilities

`specs` et `exclude` dans les capabilities ne sont plus lus. Utilisez `wdio:specs` et `wdio:exclude`.

```diff
  capabilities: [{
      browserName: 'chrome',
-     specs: ['./test/specs/chrome/**/*.js'],
-     exclude: ['./test/specs/chrome/skip.js']
+     'wdio:specs': ['./test/specs/chrome/**/*.js'],
+     'wdio:exclude': ['./test/specs/chrome/skip.js']
  }]
```

Les clés de configuration de premier niveau restent `specs` et `exclude`. Une liste sans préfixe restante sur une capability ne sélectionne pas de fichiers pour cette capability. La capability utilise alors les `specs` et `exclude` de premier niveau.

Les alias `tunnelIdentifier` et `parentTunnel` ont été supprimés des types d'options Sauce Labs. Utilisez `tunnelName` et `tunnelOwner`.

## TypeScript

Les types `Element`, `MultiRemoteBrowser` et `MultiRemoteElement` exportés par `webdriverio` ont été supprimés. Utilisez l'espace de noms global `WebdriverIO`.

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

`ChainablePromiseElement` déclare désormais `then`, et `ChainablePromiseArray` déclare `then`, `catch` et `finally`. Les types chaînables décrivent la valeur avant `await`. Ils ne correspondent plus à la valeur attendue :

```ts
let elem: ChainablePromiseElement
elem = await $('h1')
// TS2741: Property 'then' is missing in type 'Element' but required in type 'ChainablePromiseElement'.

let elems: ChainablePromiseArray
elems = await $$('li')
// TS2322: Type 'ElementArray' is not assignable to type 'ChainablePromiseArray'.
```

Typez la valeur attendue en `WebdriverIO.Element` ou `WebdriverIO.ElementArray` :

```diff
- let elem: ChainablePromiseElement = await $('h1')
- let elems: ChainablePromiseArray = await $$('li')
+ let elem: WebdriverIO.Element = await $('h1')
+ let elems: WebdriverIO.ElementArray = await $$('li')
```

Les deux types chaînables correspondent désormais à `T extends PromiseLike<unknown>`. Un type conditionnel qui teste `PromiseLike` prend une autre branche pour `$()` et `$$()` qu'en v9. Par exemple, `Awaited<ChainablePromiseElement>` est désormais `WebdriverIO.Element`, et `Awaited<ChainablePromiseArray>` est `WebdriverIO.ElementArray`.

Les propriétés d'un `$$()` non attendu ont changé de type. Elles sont disponibles immédiatement, avant que la requête ne se résolve, lisez-les donc sans `await` ni `.then()` :

| Propriété | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | le parent, pas une promesse (voir ci-dessous) |
| `foundWith` | aucune | la commande qui a trouvé la liste, p. ex. `$$` ou `custom$$` |
| `props` | aucune | les arguments supplémentaires de cette commande |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

Sur une requête chaînée comme `$('form').$$('input')`, `parent` est le chaînable `$('form')` jusqu'à ce que la liste se résolve, puis l'élément résolu ensuite. Attendez la liste avant d'utiliser `parent` comme élément.

À l'exécution, `filter()`, `filterSeries()` et `slice()` sur une liste `$$()` renvoient une liste d'éléments, pas un tableau simple. Le résultat conserve les `selector`, `foundWith`, `parent` et `props` de la liste source. En v9, `filter()` renvoyait un tableau simple sans ces propriétés. Les types ne le reflètent pas encore : `filter()` et `filterSeries()` sont déclarés comme renvoyant `Promise<WebdriverIO.Element[]>`, et `slice()` renvoie `WebdriverIO.Element[]`, donc TypeScript signale une erreur lorsque vous lisez ces propriétés sur le résultat.

WebdriverIO ne relance pas la requête pour la liste dérivée elle-même : un index au-delà de sa fin n'attend pas d'autres correspondances, et ne renvoie jamais un élément exclu par le filtre. Ses membres restent les éléments de la requête source, avec leurs `selector` et `index` d'origine. Si un membre devient obsolète, WebdriverIO le récupère à nouveau depuis la requête source à cet index, ce qui peut être un autre élément si la page a changé. Un code qui relance la requête d'une liste à partir des propriétés de la liste, par exemple `parent[foundWith](selector, ...props)`, obtient la liste complète, et non la liste filtrée.

Les paquets publiés définissent `typeScriptVersion` à 6.0.3, ce qui correspond à la version de TypeScript avec laquelle ce dépôt est compilé.

`browser.mock()` accepte le `URLPattern` de `urlpattern-polyfill` et le `URLPattern` natif (global dans Node.js 24, et typé par la bibliothèque `dom` de TypeScript 6).

TypeScript 6 déprécie `"moduleResolution": "node"` et `"baseUrl"`, et fait de `strict` la valeur par défaut. `create-wdio` génère désormais `"moduleResolution": "bundler"` pour les projets ESM et `"NodeNext"` pour les projets CommonJS. Si vous mettez à jour TypeScript dans un projet existant, modifiez ces options dans votre `tsconfig.json`.

Pour un projet ESM :

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
+        "moduleResolution": "bundler",
         "module": "ESNext"
     }
 }
```

Pour un projet CommonJS, utilisez `NodeNext` pour les deux options, comme le fait `create-wdio` :

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
-        "module": "CommonJS"
+        "moduleResolution": "NodeNext",
+        "module": "NodeNext"
     }
 }
```

TypeScript 6 change aussi la valeur par défaut de `types` en `[]`, il ne charge donc plus tous les paquets `@types/*` installés. Si votre `tsconfig.json` n'a pas de liste `types`, des globaux comme `describe` et `it` de Mocha échouent avec `Cannot find name`. Listez les paquets de types utilisés par vos tests, comme le fait `create-wdio`. Par exemple, avec Mocha :

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

`npm create wdio@latest` écrit `compilerOptions.target` et `compilerOptions.lib` en `es2024`. La vérification de types de ce fichier nécessite TypeScript 5.7 ou plus récent. `tsx`, qui exécute la configuration et les tests, ne vérifie pas les types, donc un compilateur plus ancien n'a d'importance que lorsque vous exécutez vous-même `tsc`.

Un `tsconfig.json` existant n'est pas réécrit. Une configuration générée qui étend une autre configuration conserve les `target` et `lib` du parent.

Dans le hook `afterAssertion`, le type de `params.result` est désormais `{ pass, message }`, tel que les matchers le fournissent. En v9, le type était `{ result, message }`, mais `params.result.result` valait toujours `undefined` à l'exécution. Lisez `params.result.pass` :

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

`pass` vaut `true` lorsque la valeur correspond à la valeur attendue, y compris avec `.not`. Ainsi, avec `.not`, l'assertion réussit lorsque `pass` vaut `false`. Le hook n'indique pas si le test a utilisé `.not`.

## Hooks de commandes

Une commande d'élément exécute les hooks `beforeCommand` et `afterCommand` une seule fois, avec les arguments de la commande. En v9, elle les exécutait 2 ou 3 fois, et le premier appel recevait `[]` comme `args`. Une commande qui s'exécute à l'intérieur d'une autre (par exemple `getElementText` dans `getText`) a toujours sa propre paire. Les hooks ne s'exécutent pas pour la fonction d'événement `emit`. Un hook qui compte les commandes ou mesure leur durée voit chaque commande une seule fois.

Pour une commande d'élément, `beforeCommand` s'exécute avant que WebdriverIO n'attende l'élément, donc l'élément peut encore être absent à ce moment. `afterCommand` s'exécute après l'attente et les éventuelles nouvelles tentatives, avec le résultat ou l'erreur de la dernière tentative. Un hook qui a besoin de l'élément trouvé utilise `afterCommand`.

Une commande modifiée avec `overwriteCommand()`, et une requête chaînée sur une promesse (`$('a').$('b')`), peuvent encore exécuter les hooks plus d'une fois.

## Reporters

L'événement `result` du navigateur est transmis aux reporters sous le nom `client:afterCommand`. Ce payload et le type `AfterCommandArgs` n'ont plus de propriété `name`. Lisez `command` à la place. Les commandes personnalisées envoyaient déjà `command`.

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

`addEnvironment(name, value)` de `@wdio/allure-reporter` a été supprimé. Il n'avait aucun effet. Définissez les lignes d'environnement avec [`reportedEnvironmentVars`](/docs/allure-reporter) dans les options du reporter Allure.

### Reporter JSON Cucumber

`wdio-cucumberjs-json-reporter` a été intégré au dépôt WebdriverIO sous le nom [`@wdio/cucumberjs-json-reporter`](/docs/cucumberjs-json-reporter). Le paquet communautaire est réservé à la v9 : il installe `@wdio/reporter` 9 et `@wdio/logger` 9.

```sh
npm uninstall wdio-cucumberjs-json-reporter
npm install @wdio/cucumberjs-json-reporter --save-dev
```

`reporters: ['cucumberjs-json']` reste identique : WebdriverIO charge `@wdio/cucumberjs-json-reporter` pour ce nom. Remplacez les imports dans vos fichiers de steps :

```diff
- import cucumberJson from 'wdio-cucumberjs-json-reporter'
+ import cucumberJson from '@wdio/cucumberjs-json-reporter'
```

Les options sont les mêmes. Les fichiers JSON suivent de plus près le format JSON de Cucumber. Vérifiez les outils et scripts qui les lisent :

- L'`id` du scénario est `<feature id>;<scenario id>`, et `<feature id>;<rule id>;<scenario id>` pour un scénario dans une `Rule:`, comme dans le format JSON de Cucumber. Auparavant, les parties n'avaient pas de séparateur.
- L'`id` de la feature conserve des caractères comme `:` et `/` (seuls les espaces deviennent `-`), comme dans le format JSON de Cucumber. Les noms des fichiers JSON ne changent pas, mais une partie feature de plus de 200 octets (par exemple de nombreux caractères non ASCII) est tronquée et se termine par un hash (Linux autorise 255 octets dans un nom de fichier), et un nom de périphérique Windows comme `con` commence par `_`.
- Le `keyword` de la feature et du scénario correspond aux mots-clés du fichier, par exemple `Scenario Outline` ou `Fonctionnalité`, comme dans le format JSON de Cucumber. Auparavant, ils valaient toujours `Feature` et `Scenario`.
- Les scénarios et les steps ont une `line`.
- Les tags sont `{ name, line }`, comme dans le format JSON de Cucumber ; les tags d'un scénario reçoivent la ligne du fichier de feature. Auparavant, c'étaient des objets internes de Cucumber avec `location`, `id` ou `astNodeId` (aléatoire à chaque exécution), et les tags d'un scénario n'avaient pas de ligne.
- Les hooks sont des steps avec `hidden: true` et sans `name`. Auparavant, un hook avait un `name` vide.
- Un argument doc string est `{ content, line }`. Auparavant, c'était le texte de la doc string.
- Un hook que Cucumber saute (après un hook en échec, ou un hook qui renvoie `'skipped'`) a le statut `skipped`, et un hook qui renvoie `'pending'` a le statut `pending`, comme dans le format JSON de Cucumber. Auparavant, ils valaient `passed`.
- Le statut d'un step ambigu est `ambiguous`, comme dans le format JSON de Cucumber, et son `error_message` liste les définitions de steps correspondantes. Auparavant, c'était `skipped` sans raison, ou `failed` avec `cucumberOpts.failAmbiguousDefinitions`.
- Le statut d'un step non défini est `undefined`. Auparavant, c'était `failed`, ou `pending` avec `cucumberOpts.ignoreUndefinedDefinitions`.
- Un scénario que Cucumber relance (`cucumberOpts.retry`) ne contient que les steps de sa dernière tentative. Auparavant, il contenait les steps de toutes les tentatives.
- Avec `cucumberOpts.tagsInTitle`, les noms de feature et de scénario, les ids et les noms de fichiers ne contiennent pas de tags.
- Lorsqu'un worker exécute plusieurs fichiers de feature (specs groupées), le reporter écrit un fichier par feature. Auparavant, tous les scénarios allaient dans le fichier de la première feature.
- Dans une session multi-remote, les métadonnées proviennent de la première instance.

Ces éléments étaient manquants ou incorrects auparavant : les steps `*`, le mot-clé des steps `But`, les pièces jointes provenant du hook `before` de WebdriverIO, un objet joint en `text/plain` (c'est du texte JSON, pas `[object Object]`), et une chaîne JSON jointe en `application/json` (elle reste telle quelle, elle n'est pas encodée une seconde fois). Les mots-clés des steps suivent l'en-tête `# language:` du fichier de feature, puis `cucumberOpts.language` (l'option `language` du reporter uniquement lorsque `cucumberOpts.language` n'est pas défini). Avec `cucumberOpts.scenarioLevelReporter: true`, le reporter n'écrit aucun fichier et journalise un avertissement : le format a besoin des steps.

### Reporter vidéo

`wdio-video-reporter` a été intégré au dépôt WebdriverIO sous le nom [`@wdio/video-reporter`](/docs/video-reporter). Le paquet communautaire est réservé à la v9 : il installe `@wdio/reporter` 9 et `@wdio/logger` 9.

```sh
npm uninstall wdio-video-reporter
npm install @wdio/video-reporter --save-dev
```

Le paquet communautaire installait lui-même ffmpeg. `@wdio/video-reporter` ne le fait pas : [installez ffmpeg](/docs/video-reporter#install-ffmpeg) sur chaque machine qui exécute les tests, y compris en CI et dans les images Docker, ou définissez l'option `ffmpegPath` ou la variable d'environnement `FFMPEG_PATH`. Sans ffmpeg, le reporter journalise un avertissement et ne produit aucune vidéo.

```sh
brew install ffmpeg                                         # macOS
sudo apt-get update && sudo apt-get install -y ffmpeg       # Ubuntu, Debian
winget install --id Gyan.FFmpeg -e                          # Windows
```

`reporters: ['video']` reste identique : WebdriverIO charge `@wdio/video-reporter` pour ce nom. Remplacez les imports de `wdio-video-reporter` par `@wdio/video-reporter`. Les options sont les mêmes, avec ces changements :

- `snapshotCommands` utilise la dernière partie des endpoints W3C WebDriver. L'ancienne valeur par défaut listait aussi des noms du JSON Wire Protocol comme `buttonup`, `moveto`, `keys` ou `accept_alert`. Ces noms ne correspondent jamais à une commande v10. Utilisez les noms de la [liste par défaut](/docs/video-reporter#snapshotcommands), par exemple `actions`, `value` ou `accept`.
- Dans une session WebDriver BiDi, le reporter capture aussi une image après `url`, `back`, `forward`, `refresh` et `actions`.
- Dans une session WebDriver BiDi, le reporter capture les images avec WebDriver BiDi, et la commande suivante attend l'image de la commande précédente (environ 50 à 70 ms dans Chrome), de sorte que chaque image montre la page de sa commande. Auparavant, dans Chrome, une capture d'écran au début d'une navigation WebDriver BiDi pouvait faire attendre le test 10 secondes.
- Dans une session multi-remote, seules les commandes de la première instance capturent une image. Auparavant, les commandes de chaque instance capturaient une image de la première instance.
- Une commande `GET` ne fait que lire la page, elle ne produit donc aucune image, sauf avec `recordAllActions`. Auparavant, `getUrl`, `getSize` ou `getValue` produisaient une image, car la dernière partie de leur endpoint (`url`, `rect`, `value`) figure dans `snapshotCommands`.
- La date dans les noms des fichiers vidéo est `YYYY-MM-DD--HH-MM-SS-mmm` sur toutes les machines. Auparavant, elle utilisait la locale de la machine.
- `videoFormat` accepte `webm` (par défaut) et `mp4`. Auparavant, `videoFormat: 'default'` produisait des vidéos mp4 ; désormais, il journalise un avertissement et produit des vidéos webm. Utilisez `videoFormat: 'mp4'`.
- Avec le reporter Allure, un test sans vidéo ne reçoit plus de pièce jointe vidéo vide.

### Reporter HTML

`wdio-html-nice-reporter` a été intégré au dépôt WebdriverIO sous le nom [`@wdio/html-reporter`](/docs/html-reporter). L'ancien paquet est réservé à la v9.

```sh
npm uninstall wdio-html-nice-reporter
npm install @wdio/html-reporter --save-dev
```

Le nom du reporter est `html`. Changez le nom dans `reporters` ainsi que les imports :

```diff
- import { ReportAggregator } from 'wdio-html-nice-reporter'
+ import { ReportAggregator } from '@wdio/html-reporter'

  reporters: [
-     ['html-nice', { outputDir: './reports/html-reports/' }]
+     ['html', { outputDir: './reports/html-reports/' }]
  ]
```

Les options sont les mêmes. Modifiez aussi ceci :

- `ReportEvents` provient de `@wdio/html-reporter`. Les tests qui utilisent encore `@rpii/wdio-report-events` fonctionnent, car les deux envoient les mêmes événements.
- Le script en ligne de commande est `node_modules/@wdio/html-reporter/build/makeReport.js`. C'était `node_modules/wdio-html-nice-reporter/lib/makeReport.js`.
- Avec Cucumber, le rapport compte les scénarios, pas les steps, et ne compte que la dernière tentative d'un scénario relancé.

## `$` est strict

`$` représente désormais __exactement un__ élément. Si le sélecteur se résout en plus d'un élément, la commande lève une `StrictSelectorError` au lieu d'utiliser silencieusement la première correspondance :

```js
// v9 — clique sur le premier bouton, même s'il y en a 12
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

Cela correspond aux [locators de Playwright](https://playwright.dev/docs/locators#strictness). Cypress diffère : ses requêtes peuvent se résoudre en plusieurs éléments, et ce sont les commandes d'action comme [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) qui rejettent par défaut un sujet à plusieurs éléments. Un sélecteur qui se résout discrètement en plusieurs éléments est presque toujours un bug latent : il passe aujourd'hui et interagit avec le mauvais élément dès que quelqu'un ajoute un second bouton à la page.

La règle s'applique à chaque étape d'une chaîne (`$('form').$('input')`) et à chaque type de sélecteur accepté par `$` — sélecteurs sous forme de chaîne (y compris ceux qui traversent le shadow DOM), fonctions JS, sélecteurs mobiles et références de stratégies personnalisées.

### Ce qui n'a pas changé

- `$$` renvoie toujours zéro ou plusieurs éléments.
- Les commandes utilitaires dédiées `custom$`, `shadow$` et `react$` ne sont pas strictes — elles renvoient toujours leur première correspondance, tout comme leurs équivalents `$$`.
- Un sélecteur qui ne correspond à rien renvoie toujours un élément résolu de manière paresseuse, donc `waitForExist` et l'[attente automatique](/docs/autowait) se comportent comme avant.
- Passer une référence d'élément, p. ex. `$(await browser.getActiveElement())`, désigne toujours un seul nœud et n'est jamais vérifié.

### Comment auditer votre suite

Il n'existe pas de codemod pour cela : vous seul pouvez dire si une seconde correspondance est un bug ou intentionnelle. Deux approches pratiques :

1. __Exécutez votre suite.__ Chaque violation lève une erreur avec le sélecteur et le nombre de correspondances, ce qui suffit généralement pour la corriger sur-le-champ.
2. __Vérifiez les sélecteurs larges en amont.__ Pour chaque `$(...)` générique dans vos page objects, affichez combien d'éléments il trouve réellement :

   ```js
   console.log(await $$('button').length) // 12 → `$('button')` est trop large
   ```

Ensuite, soit affinez le sélecteur — idéalement vers une requête orientée utilisateur comme `$('button=Submit')` ou `$('aria/Submit')`, voir [Sélecteurs](/docs/selectors) — soit indiquez explicitement que vous voulez la première correspondance :

```js
await $('button[type="submit"]').click()
// ...ou, si c'est vraiment le premier que vous voulez
await $$('button')[0].click()
```

### Désactivation

Pour une seule requête :

```js
await $('button', { strict: false }).click()
```

Pour tout un projet, en rétablissant le comportement de la v9 :

```js title="wdio.conf.js"
export const config = {
    // ...
    strictSelectors: false
}
```

Un élément se souvient de la manière dont il a été recherché, donc le récupérer à nouveau — après une référence d'élément obsolète, ou via `waitForExist` — conserve le caractère strict de l'appel d'origine.

:::info

En interne, un `$` strict émet une requête `findElements` au lieu de `findElement`, car compter les correspondances est le seul moyen d'appliquer la règle. Il s'agit d'un seul aller-retour dans les deux cas, mais c'est visible pour les services personnalisés et les mocks WebDriver qui se basent sur la commande `findElement`.

:::

## Listes d'éléments avant `await`

Depuis la v10, `$$()` renvoie un [`ElementArray`](/docs/api/browser/$$) : un vrai tableau que vous pouvez `await`. En v9, un `$$()` non attendu était une promesse.

| `$$('li')` avant `await` | v9 | v10 |
| --- | --- | --- |
| `instanceof Promise` | `true` | `false` |
| `Array.isArray()` | `false` | `true` |
| `then`, `catch`, `finally` | fonctions | fonctions, jusqu'au chargement de la liste |

Tant que la liste n'est pas chargée, `length` est une promesse, et `[...list]`, `Array.from(list)` et `for...of` lèvent `Cannot synchronously iterate over an element list that has not resolved yet`.

Il en va de même pour `custom$$`, `shadow$$` et `react$$`, ainsi que pour `$$()` sur un navigateur multi-remote. Un `$()` non attendu reste une promesse.

`await` donne la même liste, chargée et sans `then`. `length` est alors un nombre, et `for...of`, `[...list]` et `Array.from()` fonctionnent. Avant `await`, vous pouvez utiliser `for await`, un index (`$$('li')[0]`), `at()`, `slice()` et les méthodes d'itération asynchrones (`map`, `filter`, `forEach`, ...). Ces méthodes renvoient une promesse : faites `await` sur le résultat de `filter()` avant de lire un index.

Un index au-delà de la fin d'une liste `$$(selector)` n'est pas `undefined`, y compris après `await`. C'est un élément qui attend que la liste atteigne cet index, comme `$$('li')[5]` avant `await` : `isExisting()` renvoie `false` et une commande comme `getText()` lève `Index out of bounds`, dans les deux cas après `waitforTimeout`. En v9, `(await $$('li'))[5]` valait `undefined`. Ainsi, `if (list[5])` est toujours vrai, et `list.at(5)` n'est jamais `undefined`. Comparez l'index avec `length`, qui n'attend pas :

```diff
  const list = await $$('li')
- if (list[5]) {
+ if (list.length > 5) {
```

Après `await`, un index négatif, ainsi qu'une liste issue de `slice()` ou `filter()`, donnent `undefined` au-delà de la fin. Avant `await`, `list[i]` avec un index entier supérieur ou égal à 0, et `at()`, donnent une promesse, qui est toujours truthy.

Un code qui n'attend une valeur que lorsqu'elle est une `Promise`, ou qui lit `length` sans `await`, ne lève pas d'erreur. Il lit une promesse en guise de longueur : `list.length > 0` et une boucle comme `for (let i = 0; i < list.length; i++)` voient `false`, mais `if (list.length)` et `list.length !== 0` voient `true`. Faites toujours `await` sur la valeur. `await` sur une valeur déjà chargée renvoie cette valeur :

```diff
- if (value instanceof Promise) {
-     value = await value
- }
+ value = await value
```

```diff
- if ($$('button').length > 0) {
+ if (await $$('button').length > 0) {
```

## Signatures de commandes héritées

La v9 acceptait encore d'anciennes formes positionnelles en émettant un avertissement. La v10 n'accepte que l'objet d'options.

Le [codemod](https://github.com/webdriverio/codemod) v10 réécrit `addCommand` et `overwriteCommand` lorsque le troisième argument est un booléen, `getHTML(true)` et `getHTML(false)`, et `getCookies` lorsque le filtre est une chaîne ou un tableau à un élément. Un appel `getCookies` avec plus d'un nom est laissé inchangé, car un filtre correspond à un seul nom.

Installez d'abord le codemod. WebdriverIO n'en dépend pas.

```sh
npm install jscodeshift @wdio/codemod
npx jscodeshift -t ./node_modules/@wdio/codemod/v10 ./e2e/
```

Utilisez `--parser=tsx` pour les fichiers TypeScript.

### `addCommand` et `overwriteCommand`

```diff
- browser.addCommand('myFn', fn, true)
+ browser.addCommand('myFn', fn, { attachToElement: true })

- browser.overwriteCommand('click', fn, true)
+ browser.overwriteCommand('click', fn, { attachToElement: true })
```

Un troisième argument booléen est une erreur TypeScript. À l'exécution, il lève :

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

`proto` et `instances` appartiennent à ce même objet d'options. Omettez le troisième argument pour attacher une commande au navigateur.

### `getCookies`

Les filtres sous forme de chaîne ou de tableau de chaînes sont rejetés. Passez un [objet de filtre de cookies](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter). Un appel filtre un seul nom ; appelez-le à nouveau pour un autre nom.

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

`getCookies()` sans argument renvoie toujours tous les cookies visibles par la page.

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

`getHTML()` sans argument inclut toujours la balise propre de l'élément.

### `newWindow`

`windowName` et `windowFeatures` ont disparu. Ils ne s'appliquaient qu'à WebDriver Classic. La commande accepte toujours `type` :

```diff
- await browser.newWindow('https://webdriver.io', {
-     windowName: 'WebdriverIO window',
-     windowFeatures: 'width=420,height=230,resizable,scrollbars=yes,status=1',
- })
+ await browser.newWindow('https://webdriver.io', { type: 'window' })
```

Utilisez `type: 'tab'` pour ouvrir un onglet.

Dans une session WebDriver BiDi, `newWindow()` renvoie le nouveau [browsing context](/docs/api/browsingContext) et n'y bascule pas. En v9, il basculait. Ainsi, `browser.closeWindow()` après `newWindow()` ferme désormais le premier onglet, et non le nouveau. Exécutez les commandes destinées au nouvel onglet sur le contexte renvoyé par `newWindow()`, et fermez-le avec `closeWindow()` sur ce contexte :

```diff
- await browser.newWindow('https://webdriver.io', { type: 'tab' })
- console.log(await browser.getTitle())
- await browser.closeWindow()
+ const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })
+ console.log(await tab.getTitle())
+ await tab.closeWindow()
```

En TypeScript, le type du résultat est `WebdriverIO.BrowsingContext | { handle, type }`, car une session WebDriver Classic renvoie le handle de fenêtre. Dans une session BiDi, affinez-le : `await browser.newWindow(url, { type: 'tab' }) as WebdriverIO.BrowsingContext`.

Le navigateur reste sur le premier onglet. Supprimez un appel `switchWindow()` qui y revenait : `switchWindow` lève une erreur dans une session BiDi. Voir [`switchToFrame`](#switchtoframe) pour le modèle des browsing contexts.

### `startActivity`

Seul l'objet d'options est accepté. `appWaitPackage`, `appWaitActivity` et `optionalIntentArguments` ont disparu. Ils ne s'appliquaient qu'à l'endpoint HTTP Appium supprimé. `mobile: startActivity` ne les accepte pas, et les passer lève une erreur.

```diff
- await browser.startActivity('com.example.app', '.MainActivity')
- await browser.startActivity({
-     appPackage: 'com.example.app',
-     appActivity: '.MainActivity',
-     appWaitPackage: 'com.example.app',
-     appWaitActivity: '.MainActivity',
-     optionalIntentArguments: '--ez extra true',
- })
+ await browser.startActivity({
+     appPackage: 'com.example.app',
+     appActivity: '.MainActivity',
+ })
```

## Commandes supprimées

`browser.throttle` et les commandes dépréciées `touchAction` ont été supprimées.

| v9 | v10 |
| --- | --- |
| `browser.throttle('Regular3G')` | [`browser.throttleNetwork('Regular3G')`](/docs/api/browser/throttleNetwork) |
| `browser.touchAction(...)` / `element.touchAction(...)` | L'[API Actions](/docs/api/browser/action) avec un pointeur tactile, ou les commandes mobiles [`tap`](/docs/api/mobile/tap) et [`swipe`](/docs/api/mobile/swipe) |

Un geste tactile avec l'API Actions :

```js
await browser.action('pointer', { parameters: { pointerType: 'touch' } })
    .move({ x: 100, y: 500 })
    .down()
    .move({ x: 100, y: 100, duration: 300 })
    .up()
    .perform()
```

## `uploadFile`

`browser.uploadFile()` est supprimé. Il compressait un fichier local en zip et l'envoyait à l'endpoint `file` de Selenium, qui ne fait partie ni de WebDriver ni de WebDriver BiDi. Renseignez un champ de fichier avec [`element.setFiles()`](/docs/api/element/setFiles).

```diff
- const remotePath = await browser.uploadFile('/path/to/file.png')
- await $('#file-upload').setValue(remotePath)
+ await $('#file-upload').setFiles('/path/to/file.png')
+ await $('#file-upload').setFiles(['/path/to/a.png', '/path/to/b.png'])
```

`setFiles` nécessite une session BiDi. Les chemins sont ouverts par le navigateur. Un chemin relatif est résolu par rapport à `process.cwd()`. La mise à disposition de fichiers via Selenium Grid ne fait pas partie de la v10. Une suite qui dépendait de `uploadFile` pour transférer des octets vers un nœud doit placer le fichier là où le navigateur peut le lire, puis appeler `setFiles`.

Sur une session locale classique, `element.setValue('/local/path')` saisit toujours un chemin que le navigateur local peut déjà voir. L'endpoint Selenium brut reste `browser.file()` pour les utilisateurs de Grid qui l'appellent directement.

## `executeAsync`

`browser.executeAsync` et `element.executeAsync` sont supprimés. Passez une fonction `async` à [`execute`](/docs/api/browser/execute). La valeur de retour de la fonction, y compris une promesse renvoyée, est le résultat de la commande. Le timeout `script` s'applique toujours, y compris dans une session WebDriver BiDi : un script qui s'exécute plus longtemps échoue avec une erreur `script timeout`. Pour un timeout `script` supérieur à [`bidiResponseTimeout`](/docs/configuration#bidiresponsetimeout) (180 secondes par défaut), augmentez les deux.

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

Abandonnez le callback `done` de WebDriver. Un script sous forme de chaîne qui attendait ce callback comme dernier argument doit à la place renvoyer une promesse. À l'exécution, `executeAsync` n'est pas une fonction.

## `switchToFrame`

`browser.switchToFrame` n'est plus une commande publique.

Dans une session WebDriver BiDi, `switchFrame` et `switchWindow` lèvent une erreur. Un onglet, une fenêtre et un frame sont des `WebdriverIO.BrowsingContext` que vous détenez. `browser.url()` navigue dans le contexte de premier niveau initial de la session et le renvoie. `browser.newWindow()` renvoie le nouveau contexte et n'y bascule pas. `context.frame()` renvoie un frame enfant. `context.parent` est le frame à partir duquel vous l'avez ouvert.

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` est la chaîne de l'URL du document. Naviguez dans un contexte détenu avec `context.navigate(url)`. Les métadonnées de chargement de `browser.url()` se trouvent dans `context.request`.

Dans une session Classic, continuez d'appeler `switchFrame` avec un élément, ou `null` pour le frame de premier niveau. Une chaîne ou une fonction y est rejetée.

```diff
- await browser.switchToFrame(await $('iframe'))
- await browser.switchToFrame(null)
+ await browser.switchFrame($('iframe'))
+ await browser.switchFrame(null)
```

## `setTimeout`

La clé `page load` du JSON Wire Protocol est rejetée. Utilisez `pageLoad`.

```diff
- await browser.setTimeout({ 'page load': 10000 })
+ await browser.setTimeout({ pageLoad: 10000 })
```

`implicit` et `script` sont inchangés.

## Accès aux instances multi-remote

Un navigateur multi-remote ne stocke plus chaque session comme sa propre propriété. Il en va de même pour un élément multi-remote. `getInstance` et `select` permettent de cibler une session.

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

Une augmentation TypeScript qui ajoute `myChromeBrowser: WebdriverIO.Browser` à `WebdriverIO.MultiRemoteBrowser` ne correspond plus à une propriété à l'exécution. Supprimez cette augmentation et appelez `getInstance`.

Avec le testrunner et `injectGlobals` laissé activé, le nom de l'instance reste un global (`myChromeBrowser.url(...)`). Ce global est la session unique. Ce n'est pas `browser.myChromeBrowser`.

Les résultats des commandes restent dans l'ordre des capabilities : la première entrée appartient à la première clé de l'objet capabilities.

`browser.$$()` sur un navigateur multi-remote renvoie un `WebdriverIO.MultiRemoteElementArray`, et non un simple `MultiRemoteElement[]`. C'est toujours un tableau, donc une lecture par index comme `elements[0]` continue de fonctionner.

Ses méthodes `map`, `filter`, `forEach`, `find`, `findIndex`, `some`, `every` et `reduce` sont asynchrones, comme sur un `WebdriverIO.ElementArray`, et renvoient une promesse, y compris après `await`. Il en va de même pour les listes renvoyées par `custom$$()`, `react$$()` et `shadow$$()`. En v9, c'étaient les méthodes synchrones d'un tableau simple :

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

`custom$()`, `react$()` et, sur un élément, `shadow$()`, `nextElement()`, `previousElement()` et `parentElement()` renvoient un seul `WebdriverIO.MultiRemoteElement`, comme `$()`. En v9, ils renvoyaient un élément par instance dans un tableau simple. Lisez l'élément d'un navigateur avec `getInstance` :

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

`custom$$()`, `react$$()` et, sur un élément, `shadow$$()` renvoient un seul `WebdriverIO.MultiRemoteElementArray`, comme `$$()`. En v9, ils renvoyaient une liste par instance dans un tableau simple. Chaque entrée cible toutes les instances. Une instance qui trouve moins d'éléments n'a pas d'élément à cet index :

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

`WebdriverIO.MultiRemoteElement['selector']` a le type `Selector`, comme `WebdriverIO.Element['selector']`. En v9, il avait le type `string`, mais la valeur pouvait aussi être une fonction ou une référence de stratégie personnalisée. Un code TypeScript qui l'utilise comme une chaîne, par exemple `element.selector.includes('…')`, doit d'abord vérifier le type.

`WDIO_ENABLE_MULTI_REMOTE_SELECT` et `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY` ont été supprimés. `select()` est toujours disponible, et `$$()` renvoie toujours le tableau d'éléments ci-dessus. Supprimez les deux variables.

## Réponses de mock binaires

`mock.respond()` et `mock.respondOnce()` acceptent des payloads `Uint8Array` et `ArrayBuffer`, y compris un `Buffer` polyfillé dans les tests de composants sans `Buffer` global.

`mock.getBinaryResponse()` est désormais typé `Uint8Array | null`. Il renvoie toujours un `Buffer` dans Node.js, mais renvoie un `Uint8Array` dans le navigateur. Pour utiliser des méthodes spécifiques à Buffer dans Node.js, convertissez d'abord un résultat non nul :

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## Mocks réseau multi-remote

`browser.mock()` sur un navigateur multi-remote renvoie un `WebdriverIO.MultiRemoteMock`, et non un tableau de mocks. `respond`, `restore` et les autres méthodes de mock s'exécutent sur chaque instance. Lisez les requêtes capturées depuis le mock d'un navigateur. Utilisez le type `WebdriverIO.MultiRemoteMock` de l'espace de noms global `WebdriverIO`.

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

`getInstance` lève `Multi-remote object has no instance named "<name>"` lorsque le nom ne fait pas partie de `instances`. Un mock issu de `browser.select('myFirefoxBrowser', 'myChromeBrowser')` liste ces instances dans cet ordre, qui peut différer de `browser.instances`. Ne supposez pas que `mocks[0]` correspond à un navigateur particulier.

## Réponses de mock qui contournent le backend

`mock.respond(..., { fetchResponse: false })` n'appelle pas le backend. En v9, un mock qui filtrait aussi sur `statusCode` ou `responseHeaders` ignorait ce filtre et répondait quand même à toutes les requêtes correspondantes. En v10, `respond()` et `respondOnce()` lèvent une erreur, car ces filtres ne peuvent être évalués qu'à partir de la réponse du backend.

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

Pour conserver le filtre, omettez `fetchResponse` afin que le mock récupère la réponse, vérifie le statut ou les en-têtes, puis remplace le corps.

## Références d'éléments

Les ids d'éléments utilisent la clé W3C WebDriver `element-6066-11e4-a52e-4f735466cecf` et la propriété `elementId`. Le champ `ELEMENT` du JSON Wire Protocol ne fait plus partie du contrat des éléments.

`WebdriverIO.Element` ne déclare plus `ELEMENT`. Lisez `element.elementId`, que les instances d'éléments exposent déjà.

`browser.execute`, et les scripts intégrés qui envoient un élément dans la page (`getHTML`, `isClickable`, `isDisplayed`, `scrollIntoView`, etc.), ne transmettent que la référence W3C :

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

Un corps de réponse find-element qui ne contient que `{ ELEMENT: '...' }` n'est pas un élément. Incluez la clé W3C. Si les deux clés sont présentes, WebdriverIO utilise l'id W3C.

Jasmine affiche un résultat `$()` chaîné via `toJSON`. Cette valeur est la même référence W3C, `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }`.

Avec WebDriver BiDi, un script qui renvoie une `NodeList` (par exemple issue de `querySelectorAll`) ou une `HTMLCollection` (par exemple `element.children`) donne désormais une liste de références d'éléments, comme le fait WebDriver Classic. En v9, il donnait des valeurs BiDi brutes, donc `browser.execute` renvoyait des objets qui n'étaient pas des éléments, et une stratégie `custom$` ou `custom$$` qui renvoyait `querySelectorAll(...)` ne trouvait aucun élément. Un contournement comme `Array.from(document.querySelectorAll(...))` fonctionne toujours, et vous pouvez le supprimer :

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## Sélecteurs React

`react$` et `react$$` fonctionnent désormais avec React 16 à 19, pour une application qui démarre avec `createRoot` ou avec `ReactDOM.render`. Auparavant, `browser.react$` et `browser.react$$` échouaient avec React 18 et ultérieur (`Could not find the root element of your application`), et dans toutes les versions, un résultat pouvait provenir du rendu précédant la dernière mise à jour, de sorte qu'un composant ajouté par un changement d'état n'était pas trouvé.

Sur une page où React n'a pas encore rendu de racine, les commandes attendent désormais jusqu'à 5 secondes avant d'échouer. Auparavant, elles échouaient immédiatement, donc une application qui démarrait tard n'était pas trouvée.

Les commandes n'utilisent plus la bibliothèque [resq](https://github.com/baruchvlz/resq), et WebdriverIO ne l'installe plus. Les règles des sélecteurs ne changent pas (voir [Sélecteurs React](/docs/selectors#react-selectors)), à ces exceptions près :

- `react$` avec à la fois `props` et `state` trouve un composant qui correspond aux deux. Auparavant, il ignorait `props` lorsque `state` était aussi fourni.
- `react$$` renvoie chaque nœud DOM une seule fois. Auparavant, un composant d'ordre supérieur et son enfant donnaient le même élément deux fois dans certains navigateurs.
- Un fragment contenant un fragment donne une liste plate de nœuds. Auparavant, `react$` pouvait renvoyer une liste.
- Un filtre avec une valeur `null` fonctionne. Auparavant, il échouait avec `Cannot convert undefined or null to object`.
- Sans portée d'élément, les commandes recherchent dans toutes les racines React de la page, dans l'ordre du document, y compris les racines à l'intérieur d'autres racines et les racines dans des shadow roots ouvertes. `react$` renvoie la première correspondance. Auparavant, elles ne recherchaient que dans la première racine, même si React ne l'avait pas encore rendue ou l'avait démontée, et ne recherchaient pas dans les shadow roots. Sur une page avec plus d'une racine, `react$$` peut désormais renvoyer davantage d'éléments : pour ne rechercher que dans une racine, appelez la commande sur son conteneur, par exemple `$('#root').react$$('MyComponent')`.
- Sur le conteneur d'une racine située dans une autre racine, les commandes recherchent dans la racine interne. Auparavant, elles recherchaient dans la racine externe.
- Sur le browsing context d'un frame, et sur un élément d'un frame, les commandes fonctionnent. Auparavant, la commande de contexte échouait avec `this.executeScript is not a function`, et la commande d'élément échouait avec `Could not find instance of React in given element`.

Le script interne `webdriverio/scripts/resq` est supprimé.

## Tests de composants

`@wdio/browser-runner` réexporte `fn`, `spyOn` et les types de mock depuis `@vitest/spy` 5 (auparavant 3). Un mock que votre code appelle avec `new` nécessite une implémentation `function` ou `class`. Une fonction fléchée lève `is not a constructor`, et `mockReturnValue` lève une erreur lorsque le mock est appelé avec `new`.

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

Pour les autres changements concernant les espions, voir le [guide de migration de Vitest](https://vitest.dev/guide/migration).

## Puppeteer

`webdriverio` accepte `puppeteer-core` `>=24 <26`, y compris Puppeteer 25. `getPuppeteer()` et `@wdio/lighthouse-service` sont testés sur cette ligne.

## ESLint

`eslint-plugin-wdio` nécessite ESLint 10. ESLint 9 a atteint sa [fin de vie](https://eslint.org/version-support/) le 2026-08-06 et n'est plus pris en charge. Avec TypeScript, utilisez `typescript-eslint` 8.56.0 ou ultérieur.

```sh
npm install --save-dev eslint@10 eslint-plugin-wdio
```

`eslint-plugin-wdio` n'exporte que la configuration flat `flat/recommended`. Le nom eslintrc `plugin:wdio/recommended` est supprimé.

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    wdioConfig['flat/recommended'],
]
```

La configuration recommandée bascule vers la règle sensible aux types `wdio/no-floating-promise`, à la place de `wdio/await-expect`, lorsque le paquet `typescript-eslint` est installé. Installer uniquement `@typescript-eslint/eslint-plugin` ne suffit pas.

```sh
npm install --save-dev typescript typescript-eslint
```

Dans ce mode, la configuration analyse chaque fichier qu'elle cible avec le project service de TypeScript. Limitez-la aux fichiers TypeScript, et assurez-vous qu'ils font partie d'un `tsconfig.json` :

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

Un fichier JavaScript ciblé qui ne fait pas partie du projet TypeScript, comme `wdio.conf.js`, échoue avec « was not found by the project service ». Pour analyser aussi les fichiers JavaScript, définissez `"allowJs": true`, ajoutez-les à `include` dans `tsconfig.json`, et élargissez le motif à `**/*.{js,mjs,cjs,ts,mts,cts,tsx}`.

## Frameworks personnalisés

`setupExpect` sur un adaptateur de framework personnalisé n'accepte plus de `Map` de matchers, et le runner n'ajoute plus de méthode `entries` à l'objet des matchers. Itérez avec `Object.entries(wdioMatchers)`.

## Profil Firefox

`@wdio/firefox-profile-service` ne traite plus `legacy` comme une option du service. Ce drapeau ne s'appliquait qu'à Firefox 55 et antérieur. Supprimez-le. Un `legacy: true` restant est écrit dans le profil comme une préférence nommée `legacy`.

## Protocole WebDriver

Chaque session est une session [W3C WebDriver](https://w3c.github.io/webdriver/). WebdriverIO ne parle ni le JSON Wire Protocol ni le Mobile JSON Wire Protocol. La v9 a supprimé ces commandes. La v10 abandonne aussi l'enveloppe de réponse utilisée par ces protocoles, donc un serveur qui la renvoie encore ne peut pas démarrer de session.

`browser.isW3C` est supprimé, y compris la valeur auparavant transmise dans le message `sessionStarted` du worker. Passer `isW3C` à `attach` est ignoré. L'ensemble des commandes BiDi reste sur le client. Une connexion BiDi active dépend toujours de `webSocketUrl`.

### `browser.back()` et `browser.forward()` en BiDi

Les appels restent `await browser.back()` et `await browser.forward()`. Aucune de ces commandes ne prend d'argument ni ne renvoie de valeur.

Dans une session BiDi, ces commandes appellent `browsingContext.traverseHistory` avec un `delta` de `-1` ou `1` sur le browsing context de premier niveau, puis attendent l'état de préparation du document correspondant à `pageLoadStrategy`. `none` rend la main dès que la commande de parcours est acceptée. `eager` attend `browsingContext.domContentLoaded`. `normal`, la valeur par défaut, attend `browsingContext.load`. Une restauration depuis le back-forward cache n'émet pas ces événements ; la commande rend la main lorsque le `readyState` du document validé correspond déjà à la stratégie. L'attente utilise le timeout de chargement de page de la session (`timeouts.pageLoad`, 300000 ms s'il n'est pas défini). Les sessions Classic envoient toujours `POST /session/:sessionId/back` et `POST /session/:sessionId/forward`.

Une entrée d'historique manquante entraîne toujours un rejet. En BiDi, le message provient de `browsingContext.traverseHistory` et contient `no such history entry`, plutôt que le texte d'erreur WebDriver classique. Un parcours qui n'atteint jamais l'état de préparation attendu est rejeté avec `History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` ou `browsingContext.load`.

### Réponse de nouvelle session

Create Session doit renvoyer le corps W3C. WebdriverIO lit `value.sessionId` et `value.capabilities` :

```json
{
  "value": {
    "sessionId": "8e8a5c2e",
    "capabilities": {
      "browserName": "chrome",
      "browserVersion": "131.0.6778.85"
    }
  }
}
```

Un corps JSON Wire Protocol est rejeté. Ce corps place `sessionId` et `status` à côté de `value`, et place les capabilities directement dans `value` :

```json
{
  "sessionId": "8e8a5c2e",
  "status": 0,
  "value": {
    "browserName": "chrome",
    "version": "131.0"
  }
}
```

La création de session lève alors `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` La même erreur est levée lorsque `value.capabilities` est absent, même si `value.sessionId` est présent.

Un objet de capabilities plat dans votre configuration reste valide. WebdriverIO enveloppe `{ browserName: 'chrome' }` dans `alwaysMatch` avant d'envoyer la requête. Les clés préfixées par un fournisseur mélangées à des clés hors de l'ensemble des capabilities W3C sont toujours rejetées. Placez les paramètres du fournisseur dans `sauce:options`, `bstack:options`, `appium:options` ou une autre clé préfixée.

### Réponses des commandes

Le résultat d'une commande est `{ "value": … }`. Un HTTP 200 sans `error` dans `value` est un succès. Un élément manquant est un HTTP 404 avec `value.error` défini à `"no such element"`, ce qui permet toujours une recherche d'élément paresseuse. Un `status` numérique dans le corps est ignoré, y compris `status: 0` et l'ancien code `status: 7` (« no such element »). Envoyez plutôt l'objet d'erreur W3C.

Le type d'erreur exporté `JSONWPCommandError` s'appelle désormais `SessionRequestError`.

### Serveurs

Les drivers avec lesquels WebdriverIO fonctionne parlent déjà W3C sur la connexion client :

- ChromeDriver est W3C par défaut depuis Chrome 75. Edge basé sur Chromium suit le même comportement. Le ChromeDriver actuel accepte encore `goog:chromeOptions.w3c: false`, qui rebascule cette session vers le protocole hérité. WebdriverIO ne prend pas en charge ce basculement.
- geckodriver et le safaridriver d'Apple sont exclusivement W3C. Une réponse de Safari qui omet `platformName` ou `browserVersion` reste W3C.
- Selenium 4 et Grid 4 parlent W3C. Grid a cessé de traduire le JSON Wire Protocol en 4.9.
- Appium 2 a abandonné le JSON Wire Protocol et le Mobile JSON Wire Protocol. Appium 3 a aussi abandonné les formes de paramètres restantes. La v10 nécessite Appium 3, voir ci-dessous. Une session mobile qui omet `setWindowRect` reste W3C ; cette capability signifie que l'appareil ne peut pas redimensionner une fenêtre.

Ces serveurs parlent encore le JSON Wire Protocol et ne sont pas pris en charge : Selenium 3, PhantomJS, EdgeHTML (`--jwp`), et WinAppDriver en connexion directe. Le driver Windows d'Appium reste pris en charge en tant que client W3C. Il traduit les commandes pour WinAppDriver, y compris Get Element Property vers l'endpoint d'attribut. Pointez WebdriverIO vers Appium, et non vers le port de WinAppDriver.

[`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) ne permet pas à ces serveurs de fonctionner avec la v10. Le démarrage de session exige toujours le corps W3C ci-dessus, et les résultats des commandes ignorent toujours un `status` numérique. Restez sur WebdriverIO 9 si ce serveur est toujours nécessaire.

`webdriver.remote.sessionid` ne signale plus une session Selenium standalone. Selenium Grid 4 est toujours détecté via `se:cdp`.

La clé de timeout `page load` est traitée dans [`setTimeout`](#settimeout). Les ids d'éléments sont traités dans [Références d'éléments](#element-references). Sur desktop, `[name="..."]` est un sélecteur CSS. La stratégie de localisation `name` reste disponible pour les sessions mobiles.

## Appium

WebdriverIO 10 nécessite **Appium 3** et les drivers officiels actuels (UiAutomator2, XCUITest, Espresso, Windows, Mac2, etc.). Appium 1.x et 2.x ne sont pas pris en charge. Restez sur WebdriverIO 9 si vous ne pouvez pas mettre à jour le serveur.

```sh
npm i -D appium@^3
appium driver update installed
```

`@wdio/appium-service` déclare une dépendance pair optionnelle `appium` en `>=3` et refuse de lancer un serveur plus ancien. `create-wdio` installe `appium@^3` lorsque Appium est absent ou antérieur à la version 3.

Les fournisseurs cloud qui exposent encore Appium 2 ont besoin d'une image Appium 3, sinon vous devez rester sur WebdriverIO 9.

### Les commandes mobiles ne se rabattent plus sur HTTP

En v9, de nombreux utilitaires mobiles essayaient `browser.execute('mobile: …')` et, en cas d'erreur de méthode inconnue, se rabattaient sur un endpoint HTTP Appium supprimé. En v10, ce repli a disparu : la même erreur vous invite à passer à Appium 3. Préférez les commandes mobiles de WebdriverIO (`browser.lock()`, `browser.shake()`, …) ou `browser.execute('mobile: …')` directement.

### Commandes de protocole supprimées

Appium 3 a [supprimé de nombreux endpoints dépréciés du base-driver](https://appium.io/docs/en/latest/guides/migrating-2-to-3/). WebdriverIO n'expose plus de méthodes client pour la plupart de ces routes (par exemple `appiumLock`, `touchPerform`, et la table du Mobile JSON Wire Protocol). Utilisez à la place les W3C Actions, la commande mobile correspondante, ou une méthode d'exécution `mobile:` du driver.

### Portée de `--allow-insecure` dans Appium

Appium 3 exige un préfixe de portée (driver ou `*`) sur les fonctionnalités `--allow-insecure`, par exemple `uiautomator2:adb_shell` ou `*:adb_shell`.

### Les capabilities Appium sans préfixe ne sélectionnent plus une session Appium

`automationName`, `deviceName` et `appiumVersion` sans préfixe `appium:` n'indiquent plus à WebdriverIO d'ignorer le driver du navigateur et d'attacher le service Appium. Utilisez la capability préfixée, ou imbriquez-la sous `appium:options` :

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

`wdio repl` émet désormais ces clés préfixées, y compris `appium:app`, `appium:platformVersion` et `appium:udid`.

### `getValue` sur mobile lit la propriété de l'élément

`element.getValue()` appelle Get Element Property sur toutes les sessions, y compris Appium 3. Sur une session mobile, il appelait auparavant Get Element Attribute.

### Signature de `stopRecordingScreen` alignée sur `startRecordingScreen`

`driver.stopRecordingScreen` n'accepte désormais qu'un seul argument `options`, au lieu des 4 arguments précédents, en s'alignant sur `driver.startRecordingScreen`. Déplacez les arguments individuels dans un objet :

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## Nommage multi-remote

Les API orthographiées `multiremote` ou `Multiremote` sont désormais en camelCase / PascalCase : `multiRemote` / `MultiRemote`. Les anciens noms n'ont pas d'alias.

| v9 | v10 |
|----|-----|
| `multiremote()` (`webdriverio`) | `multiRemote()` |
| `WebdriverIO.MultiremoteConfig` | `WebdriverIO.MultiRemoteConfig` |
| `isMultiremote` sur le navigateur, les résultats de `$` et `$$` | `isMultiRemote` |
| `Capabilities.RequestedMultiremoteCapabilities` | `Capabilities.RequestedMultiRemoteCapabilities` |
| `Capabilities.WithRequestedMultiremoteCapabilities` | `Capabilities.WithRequestedMultiRemoteCapabilities` |
| `runner.isMultiremote` (reporters) | `runner.isMultiRemote` |
| `Launcher#isMultiremote`, `Launcher#isParallelMultiremote` (`@wdio/cli`) | `isMultiRemote`, `isParallelMultiRemote` |
| `isMultiremote` dans `Workers.WorkerMessage`, `WorkerInstance` (`@wdio/local-runner`) et `SpecReporter#getTestLink()` | `isMultiRemote` |
| `browser.multiremoteFetch()` (`@wdio/webdriver-mock-service`) | `browser.multiRemoteFetch()` |

Recherchez `multiremote` et `Multiremote` (en respectant la casse) et remplacez chaque occurrence. Les rapports Allure étiquettent aussi les tests multi-remote avec `isMultiRemote` au lieu de `isMultiremote`.

## Écrans virtuels sous Linux

`@wdio/xvfb` est remplacé par `@wdio/display-server`. Au lieu d'envelopper chaque worker dans `xvfb-run`, le testrunner démarre un seul serveur d'affichage pour toute l'exécution, avant le hook `onPrepare` de tout service. Il privilégie Weston en mode headless et se rabat sur Xvfb. Voir [Headless et serveurs d'affichage](/docs/headless-and-display-servers) pour plus de détails.

Les options sont renommées. Les anciens noms fonctionnent encore en v10 mais journalisent un avertissement de dépréciation, et seront supprimés en v11. Si vous définissez les deux noms, le nouveau l'emporte :

```diff
- autoXvfb: false,
+ displayServerEnabled: false,
- xvfbAutoInstall: true,
+ displayServerAutoInstall: true,
- xvfbAutoInstallMode: 'sudo',
+ displayServerAutoInstallMode: 'sudo',
- xvfbAutoInstallCommand: 'my-install-command',
+ displayServerAutoInstallCommand: 'my-install-command',
```

`xvfbMaxRetries` et `xvfbRetryDelay` n'ont aucun effet, et seront aussi supprimés en v11. Le démarrage n'est plus retenté : si Weston ne démarre pas, le testrunner essaie Xvfb, et si aucun ne démarre, l'exécution continue sans écran.

Une configuration qui définit l'une des quatre options renommées sans son remplaçant, et ne définit pas `displayServer`, continue d'utiliser Xvfb comme en v9. À moins qu'elle ne désactive le serveur d'affichage, elle journalise aussi `Preferring Xvfb, as v9 did, because the config sets v9 display keys`. Une fois les options renommées, ajoutez `displayServer: 'xvfb'` pour conserver Xvfb, ou omettez-le pour privilégier Weston. En mode auto, une commande d'installation personnalisée s'exécute d'abord pour Weston, puis à nouveau pour Xvfb uniquement si Weston n'est toujours pas disponible ou ne démarre pas et que Xvfb est toujours absent ; définissez donc `displayServer` sur le serveur qu'elle installe pour éviter la tentative de l'autre serveur.

L'installation automatique ne prend plus en charge `yum`, que la v9 utilisait sur les hôtes sans `dnf`. La v10 ne détecte que `apt-get`, `dnf`, `zypper`, `pacman`, `apk` et `xbps-install` ; installez donc Xvfb vous-même sur un hôte ne disposant que de `yum`.

Un tableau `xvfbAutoInstallCommand` s'exécutait via un shell en v9, donc des éléments comme `&&` ou `VAR=value` fonctionnaient. Les tableaux s'exécutent désormais sans shell, quel que soit le nom de l'option ; utilisez donc une chaîne pour la syntaxe shell.

Autres changements que vous pourriez remarquer :

- Tous les workers partagent un seul écran. En v9, chaque worker avait son propre écran. Les pages Chrome et Edge peuvent désormais ne pas avoir le focus, voir [Focus de fenêtre](/docs/headless-and-display-servers#window-focus).
- Le numéro d'écran Xvfb n'est pas fixe. Lisez-le depuis `DISPLAY` au lieu de supposer `:99`.
- Un hôte où seul `WAYLAND_DISPLAY` est défini est désormais considéré comme ayant un écran. La v9 y exécutait les workers sous Xvfb, puisque `DISPLAY` n'était pas défini. La v10 ne démarre rien, ouvre les fenêtres du navigateur sur votre compositeur, et définit `XDG_SESSION_TYPE`, `GDK_BACKEND` et `ELECTRON_OZONE_PLATFORM_HINT` à `wayland` pour l'exécution. Pour les exécuter sous Xvfb comme avant, supprimez `WAYLAND_DISPLAY` et définissez `displayServer: 'xvfb'`.
- L'écran par défaut est en 1920x1080. La v9 utilisait la valeur par défaut de `xvfb-run`, soit 1280x1024 sur Debian et Ubuntu et 640x480 sur Fedora, RHEL et Arch. Pour conserver la taille utilisée par vos références, définissez `displayServerWidth` et `displayServerHeight` en conséquence.
- Les navigateurs choisissent Wayland ou X11 selon le `XDG_SESSION_TYPE` défini par le serveur d'affichage. Sous Weston, WebdriverIO ajoute aussi `--ozone-platform=wayland` aux Chrome et Edge qu'il lance, car Chrome et Edge antérieurs à 140 (Chrome for Testing antérieur à 135) ignorent `XDG_SESSION_TYPE`. Weston ne fournit pas de `DISPLAY`, donc si vos tests ou outils ont besoin de X11, définissez `displayServer: 'xvfb'`.
- Si vous utilisiez directement `XvfbManager` ou l'instance `xvfb` de `@wdio/xvfb`, utilisez à la place `DisplayServerManager` de `@wdio/display-server`. Là où vous exécutiez `xvfb.init()` et enveloppiez des commandes dans `xvfb-run`, ou lanciez des processus via `ProcessFactory`, démarrez un écran et transmettez son environnement aux processus qui en ont besoin. L'exemple utilise Xvfb en 1280x1024, comme la v9 sur Debian et Ubuntu. Sur un hôte où seul `WAYLAND_DISPLAY` est défini, supprimez-le d'abord, sinon `startDaemon()` ne démarre rien :

  ```js
  import { spawn } from 'node:child_process'
  import { once } from 'node:events'
  import { DisplayServerManager } from '@wdio/display-server'

  const manager = new DisplayServerManager({ displayServer: 'xvfb' })
  const daemon = await manager.startDaemon({ width: 1280, height: 1024 })
  // startDaemon() renvoie aussi null lorsqu'un écran existe déjà
  if (!daemon && manager.shouldRun()) {
      throw new Error('Xvfb could not be started')
  }
  try {
      const child = spawn('your-command', { shell: true, stdio: 'inherit', env: { ...process.env, ...daemon?.env } })
      const [code] = await once(child, 'exit')
      process.exitCode = code ?? 1
  } finally {
      await daemon?.stop()
  }
  ```

## Émulation

`browser.emulate()` pilote le module d'émulation de WebDriver BiDi pour le browsing context de premier niveau courant. La v9 injectait un script de préchargement qui modifiait `navigator.geolocation.getCurrentPosition`, `navigator.userAgent`, `window.matchMedia` et `navigator.onLine`. Ces scripts ont disparu. `browser.emulate('clock', …)` installe toujours de faux timers dans la page courante et dans les pages ouvertes ensuite.

Un rechargement n'est plus nécessaire pour les portées BiDi.

```diff
  await browser.emulate('onLine', false)
- // seul `navigator.onLine` changeait ; le trafic continuait de passer
+ // le browsing context est hors ligne, y compris fetch, WebSocket et WebTransport
```

- `onLine: false` appelle `emulation.setNetworkConditions` avec `{ type: 'offline' }`. `true` et la restauration de la portée l'annulent. Le débit et la latence restent du ressort de `browser.throttleNetwork()`.
- `colorScheme` définit la media feature `prefers-color-scheme`, donc le CSS `@media (prefers-color-scheme)` suit `matchMedia`.
- `userAgent` est la surcharge du user-agent du navigateur, et non une propriété `navigator.userAgent` modifiée.
- `geolocation` utilise la pile de géolocalisation du navigateur. Une page peut encore nécessiter `browser.setPermissions({ name: 'geolocation' }, 'granted')`. `{ error: 'positionUnavailable' }` signale cette erreur au lieu de coordonnées.
- `colorScheme` et `media` partagent une même table de media features. L'appel le plus récent remplace la table entière, et restaurer l'une ou l'autre portée la vide.
- `device` définit le user agent, le viewport, le tactile, la mise en page du texte mobile et la balise meta viewport à partir du descripteur de l'appareil. Il ne modifie pas `screen` ni `orientation`.

Les nouvelles portées sont `media`, `locale`, `timezone`, `touch`, `orientation`, `screen`, `viewportMeta`, `textLayout`, `scripting`, `scrollbar` et `forcedColors`. Un navigateur qui n'implémente pas une commande rejette l'appel avec sa propre erreur (`unknown command` ou `unsupported operation`). WebdriverIO ne se rabat ni sur un script de préchargement ni sur CDP. Si `device` est rejeté en cours de route, le user agent, le viewport, le tactile, la mise en page du texte et la meta viewport précédents sont rétablis.

`wdio session emulate` accepte les mêmes portées. Il ne vous demande plus de recharger pour une surcharge qui s'applique immédiatement. Les préréglages `emulate network` et `emulate cpu` sont inchangés et restent réservés à Chromium. Voir [Émulation](/docs/emulation).

## Prochaines étapes

- Copiez le [skill de migration](#migrate-with-a-coding-agent) dans le projet et demandez à un agent de l'appliquer.
- [WebdriverIO pour les agents de codage](/docs/ai-agents) pour écrire de nouveaux tests v10.
- [Headless et serveurs d'affichage](/docs/headless-and-display-servers) lorsque la suite s'exécute sous Linux.