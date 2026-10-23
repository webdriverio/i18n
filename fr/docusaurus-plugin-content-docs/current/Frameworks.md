---
id: frameworks
title: Frameworks
description: "Configurez Mocha, Jasmine ou Cucumber.js comme framework de test pour le testrunner WDIO, ou intégrez des frameworks tiers comme Serenity/JS."
---

WebdriverIO Runner prend en charge nativement [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/) et [Cucumber.js](https://cucumber.io/). Vous pouvez également l'intégrer à des frameworks open source tiers, comme [Serenity/JS](#using-serenityjs).

:::tip Intégrer WebdriverIO avec des frameworks de test
Pour intégrer WebdriverIO à un framework de test, vous avez besoin d'un package adaptateur disponible sur NPM.
Notez que le package adaptateur doit être installé au même endroit que WebdriverIO.
Ainsi, si vous avez installé WebdriverIO globalement, assurez-vous d'installer également le package adaptateur globalement.
:::

L'intégration de WebdriverIO à un framework de test vous permet d'accéder à l'instance WebDriver via la variable globale `browser`
dans vos fichiers de spec ou vos définitions d'étapes.
Notez que WebdriverIO se charge également d'instancier et de terminer la session Selenium, vous n'avez donc pas à le faire
vous-même.

## Utiliser Mocha

Tout d'abord, installez le package adaptateur depuis NPM :

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

Par défaut, WebdriverIO fournit une [bibliothèque d'assertions](assertion) intégrée que vous pouvez utiliser immédiatement :

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO v10 embarque [Mocha 12](https://mochajs.org/) et prend en charge les [interfaces](https://mochajs.org/#interfaces) `BDD` (par défaut), `TDD` et `QUnit` de Mocha.

Si vous souhaitez écrire vos specs dans le style TDD, définissez la propriété `ui` de votre configuration `mochaOpts` sur `tdd`. Vos fichiers de test doivent alors être écrits ainsi :

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Si vous souhaitez définir d'autres paramètres spécifiques à Mocha, vous pouvez le faire avec la clé `mochaOpts` dans votre fichier de configuration. La liste de toutes les options est disponible sur le [site web du projet Mocha](https://mochajs.org/api/mocha).

__Remarque :__ WebdriverIO ne prend pas en charge l'utilisation obsolète des callbacks `done` dans Mocha :

```js
it('should test something', (done) => {
    done() // lève "done is not a function"
})
```

### Options de Mocha

Les options suivantes peuvent être appliquées dans votre `wdio.conf.js` pour configurer votre environnement Mocha. __Remarque :__ toutes les options de Mocha ne sont pas prises en charge. `parallel` appartient toujours au pool de workers propre à Mocha et provoquera une erreur ici — le testrunner WDIO parallélise déjà les specs entre les capabilities et les workers. Pour exécuter simultanément les tests d'un même fichier de spec, utilisez [`parallelMode`](#parallelmode). La CLI de Mocha 12 a également abandonné yargs au profit de `util.parseArgs` de Node ; cela n'affecte qu'une invocation directe de `mocha`, et non les `mochaOpts` transmises via `wdio`. Vous pouvez passer ces options de framework en tant qu'arguments, par exemple :

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

Cela transmettra les options Mocha suivantes :

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Les options Mocha suivantes sont prises en charge :

#### require

<Option type="string|string[]" default="[]">

L'option `require` est utile lorsque vous souhaitez ajouter ou étendre certaines fonctionnalités de base (option du framework WebdriverIO).

</Option>

#### allowUncaught

<Option type="boolean" default="false">

Propager les erreurs non interceptées.

</Option>

#### bail

<Option type="boolean" default="false">

Arrêter après le premier échec de test.

</Option>

#### checkLeaks

<Option type="boolean" default="false">

Vérifier les fuites de variables globales.

</Option>

#### delay

<Option type="boolean" default="false">

Retarder l'exécution de la suite racine.

</Option>

#### failHookAffectedTests

<Option type="boolean" default="true">

Signaler comme un échec chaque test ignoré à cause d'un hook `before` ou `beforeEach` en échec. WebdriverIO active cette option afin qu'un hook de configuration défaillant soit visible sur chaque spec qu'il a fait ignorer. Définissez-la sur `false` pour ne signaler que le hook.

</Option>

#### fgrep

<Option type="string" default="null">

Filtrer les tests selon une chaîne donnée.

</Option>

#### forbidOnly

<Option type="boolean" default="false">

Les tests marqués `only` font échouer la suite.

</Option>

#### forbidPending

<Option type="boolean" default="false">

Les tests en attente font échouer la suite.

</Option>

#### fullTrace

<Option type="boolean" default="false">

Trace de pile complète en cas d'échec.

</Option>

#### global

<Option type="string[]" default="[]">

Variables attendues dans la portée globale.

</Option>

#### grep

<Option type="RegExp|string" default="null">

Filtrer les tests selon une expression régulière donnée. Mocha 12 accepte les flags RegExp modernes dans ce filtre (par exemple `s` ou `d`).

</Option>

#### invert

<Option type="boolean" default="false">

Inverser les correspondances du filtre de tests.

</Option>

#### maxParallelContexts

<Option type="number" default="os.cpus().length">

Nombre de tests exécutés simultanément lorsque [`parallelMode`](#parallelmode) est défini. Voir [Tests parallèles dans un fichier de spec](./ParallelTests.md#options).

</Option>

#### parallelMode

<Option type="'contexts' | 'userContexts'" default="undefined">

Exécuter simultanément les tests d'un fichier de spec, chacun dans son propre contexte de navigation WebDriver BiDi. `'contexts'` partage les cookies et le stockage entre les tests, `'userContexts'` les isole. Nécessite la capability `'wdio:experimentalBiDiCommands': true`. `bail` et `retries` ne sont pas pris en charge dans ce mode. Voir [Tests parallèles dans un fichier de spec](./ParallelTests.md).

</Option>

#### retries

<Option type="number" default="0">

Nombre de tentatives pour relancer les tests en échec.

</Option>

#### timeout

<Option type="number" default="30000">

Valeur du seuil de délai d'expiration (en ms).

</Option>

## Utiliser Jasmine

Tout d'abord, installez le package adaptateur depuis NPM :

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Vous pouvez ensuite configurer votre environnement Jasmine en définissant une propriété `jasmineOpts` dans votre configuration. La liste de toutes les options est disponible sur le [site web du projet Jasmine](https://jasmine.github.io/api/edge/Configuration.html).

### Options de Jasmine

Les options suivantes peuvent être appliquées dans votre `wdio.conf.js` pour configurer votre environnement Jasmine à l'aide de la propriété `jasmineOpts`. Pour plus d'informations sur ces options de configuration, consultez la [documentation de Jasmine](https://jasmine.github.io/api/edge/Configuration). Vous pouvez passer ces options de framework en tant qu'arguments, par exemple :

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Cela transmettra les options Jasmine suivantes :

```ts
{
    grep: 'my test',
    failSpecWithNoExpectations: true,
    random: false
}
```

Les options Jasmine suivantes sont prises en charge :

#### defaultTimeoutInterval

<Option type="number" default="60000">

Intervalle de délai d'expiration par défaut pour les opérations Jasmine.

</Option>

#### helpers

<Option type="string[]" default="[]">

Tableau de chemins de fichiers (et de globs) relatifs à spec_dir à inclure avant les specs Jasmine.

</Option>

#### requires

<Option type="string[]" default="[]">

L'option `requires` est utile lorsque vous souhaitez ajouter ou étendre certaines fonctionnalités de base.

</Option>

#### random

<Option type="boolean" default="false">

Indique s'il faut rendre aléatoire l'ordre d'exécution des specs. La valeur par défaut propre à Jasmine est `true`, mais WebdriverIO exécute les specs dans l'ordre, sauf si vous définissez cette option.

</Option>

#### seed

<Option type="Function" default="null">

Graine à utiliser comme base de la randomisation. Null entraîne la détermination aléatoire de la graine au début de l'exécution.

</Option>

#### failSpecWithNoExpectations

<Option type="boolean" default="false">

Indique s'il faut faire échouer la spec si elle n'a exécuté aucune attente. Par défaut, une spec n'ayant exécuté aucune attente est signalée comme réussie. Définir cette option sur true signalera une telle spec comme un échec.

</Option>

#### oneFailurePerSpec

<Option type="boolean" default="false">

Arrêter une spec à sa première attente en échec. Un matcher synchrone en échec arrête immédiatement la spec, et un matcher asynchrone attendu l'arrête lorsque sa promesse est résolue. Les autres specs continuent de s'exécuter.

</Option>

#### specFilter

<Option type="Function" default="(spec) => true">

Fonction à utiliser pour filtrer les specs.

</Option>

#### grep

<Option type="string|Regexp" default="null">

N'exécuter que les tests correspondant à cette chaîne ou à cette expression régulière. (Applicable uniquement si aucune fonction `specFilter` personnalisée n'est définie)

</Option>

#### invertGrep

<Option type="boolean" default="false">

Si true, inverse les tests correspondants et n'exécute que les tests qui ne correspondent pas à l'expression utilisée dans `grep`. (Applicable uniquement si aucune fonction `specFilter` personnalisée n'est définie)

</Option>

#### stopOnSpecFailure

<Option type="boolean" default="false">

Arrêter le fichier de spec à sa première spec (`it`) en échec : les autres specs du fichier ne s'exécutent pas, y compris dans d'autres blocs `describe`. Les autres fichiers de spec s'exécutent dans leurs propres workers et continuent.

</Option>

#### cleanStack

<Option type="boolean" default="true">

Supprimer les lignes des packages `node_modules` des traces de pile des échecs.

</Option>

#### expectationResultHandler

<Option type="Function" default="null">

Appelée avec `(passed, assertion)` pour chaque attente, par exemple pour prendre une capture d'écran lorsqu'une attente échoue. Si la fonction lève une erreur pour une attente réussie, l'attente échoue avec cette erreur.

</Option>

### Assertions

Avec Jasmine, le `expect` global combine les matchers de Jasmine et les [matchers WebdriverIO](/docs/api/expect-webdriverio) :

- Les matchers de Jasmine (`toBe`, `toEqual`, `toHaveBeenCalled`, …) et les matchers que vous ajoutez avec `jasmine.addMatchers` sont synchrones. Ils renvoient `undefined`, vous n'avez donc pas besoin de `await`.
- Les matchers WebdriverIO, les matchers asynchrones de Jasmine (`toBeResolved`, `toBeRejectedWith`, …) et les matchers que vous ajoutez avec `jasmine.addAsyncMatchers` renvoient une promesse. Utilisez toujours `await` avec eux.

Utilisez `expect()` pour les deux types : il envoie chaque matcher vers `expect` ou `expectAsync` de Jasmine à votre place. `await expectAsync($('#logo')).toBeDisplayed()` fonctionne également. Pour TypeScript, `@wdio/jasmine-framework` dans `types` fournit également les matchers WebdriverIO à `expectAsync()`.

```js
it('checks the page', async () => {
    expect([1, 2]).toHaveSize(2)                                   // Jasmine, synchrone
    await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, asynchrone
    await expect(loadData()).toBeResolved()                        // matcher asynchrone Jasmine
})
```

`toHaveSize` existe dans les deux bibliothèques. Le matcher WebdriverIO s'exécute sur les valeurs WebdriverIO : un élément, un tableau d'éléments ou `Element[]` (par exemple le résultat de `$$().filter()`), un élément multi-remote, un navigateur, un contexte de navigation, un mock, le wrapper `some()`, ou une promesse telle qu'un `$()` chaînable. Le matcher de Jasmine s'exécute sur toutes les autres valeurs.

Les matchers asymétriques des deux bibliothèques fonctionnent, dans Jasmine comme dans les matchers WebdriverIO : `jasmine.any()`, `jasmine.objectContaining()`, `jasmine.stringMatching()`, … et `expect.any()`, `expect.stringContaining()`, `expect.oneOf()`, `expect.multiRemote()`, `expect.not.stringContaining()`, …. Pour utiliser `some()`, importez-le :

```js
import { some } from 'expect-webdriverio/api'

await expect(some($$('li'))).toHaveAttribute('data-state', 'on')
```

Les parties Jest de `expect` ne sont pas disponibles avec Jasmine : les matchers propres à Jest tels que `toStrictEqual` ou `toHaveLength`, ainsi que `expect.soft()`. Pour ajouter un matcher personnalisé, utilisez `expect.extend()` dans un fichier de spec ou dans le hook `before` (voir [Matchers personnalisés](/docs/custommatchers)), ou `jasmine.addMatchers` pour un matcher synchrone et `jasmine.addAsyncMatchers` pour un matcher asynchrone.

Pour TypeScript, ajoutez `jasmine` à `types`, voir [Configuration de TypeScript](/docs/typescript).

## Utiliser Cucumber

Tout d'abord, installez le package adaptateur depuis NPM :

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Si vous souhaitez utiliser Cucumber, définissez la propriété `framework` sur `cucumber` en ajoutant `framework: 'cucumber'` au [fichier de configuration](configurationfile).

Les options de Cucumber peuvent être fournies dans le fichier de configuration avec `cucumberOpts`. Consultez la liste complète des options [ici](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options). L'adaptateur utilise Cucumber 13. `tagExpression` a été supprimé ; filtrez avec `tags`. Consultez le [guide de migration vers la v10](v10-migration#cucumber).

Pour démarrer rapidement avec Cucumber, jetez un œil à notre projet [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate), qui fournit toutes les définitions d'étapes dont vous avez besoin pour commencer, et vous écrirez des fichiers de fonctionnalités en un rien de temps.

### Options de Cucumber

Les options suivantes peuvent être appliquées dans votre `wdio.conf.js` pour configurer votre environnement Cucumber à l'aide de la propriété `cucumberOpts` :

:::tip Ajuster les options via la ligne de commande
Les `cucumberOpts`, comme des `tags` personnalisés pour filtrer les tests, peuvent être spécifiées via la ligne de commande. Cela se fait en utilisant le format `cucumberOpts.{optionName}="value"`.

Par exemple, si vous souhaitez exécuter uniquement les tests marqués avec `@smoke`, vous pouvez utiliser la commande suivante :

```sh
# Lorsque vous voulez exécuter uniquement les tests portant le tag "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

Cette commande définit l'option `tags` de `cucumberOpts` sur `@smoke`, garantissant que seuls les tests portant ce tag sont exécutés.

:::

#### backtrace

<Option type="Boolean" default="false">

Afficher la trace complète des erreurs.

</Option>

#### requireModule

<Option type="string[]" default="[]">

Charger des modules avant de charger les fichiers de support.

</Option>
Exemple :

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // ou
    requireModule: [
        [
            '@babel/register',
            {
                rootMode: 'upward',
                ignore: ['node_modules']
            }
        ]
    ]
 }
 ```

#### failFast

<Option type="boolean" default="false">

Interrompre l'exécution au premier échec.

</Option>

#### name

<Option type="RegExp[]" default="[]">

N'exécuter que les scénarios dont le nom correspond à l'expression (répétable).

</Option>

#### require

<Option type="string[]" default="[]">

Charger les fichiers contenant vos définitions d'étapes avant d'exécuter les fonctionnalités. Vous pouvez également spécifier un glob vers vos définitions d'étapes.

</Option>
Exemple :

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import

<Option type="String[]" default="[]">

Chemins vers votre code de support, pour ESM.

</Option>
Exemple :

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict

<Option type="boolean" default="false">

Faire échouer l'exécution en cas d'étape en attente. Une étape non définie fait également échouer l'exécution sans `strict`, sauf si [`ignoreUndefinedDefinitions`](#ignoreundefineddefinitions) est `true`.

</Option>

#### tags

<Option type="String" default="">

N'exécuter que les fonctionnalités ou scénarios dont les tags correspondent à l'expression. Un fichier de fonctionnalité sans scénario correspondant est signalé comme ignoré et ne démarre aucune session de navigateur.
Veuillez consulter la [documentation de Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) pour plus de détails.

</Option>

#### timeout

<Option type="Number" default="60000">

Délai d'expiration en millisecondes pour les définitions d'étapes.

</Option>

#### retry

<Option type="Number" default="0">

Spécifier le nombre de tentatives pour relancer les cas de test en échec.

</Option>

#### retryTagFilter

<Option type="String">

Ne relancer que les scénarios dont les tags correspondent à l'expression de tags. Nécessite [`retry`](#retry).

</Option>

#### language

<Option type="String" default="en">

Langue par défaut de vos fichiers de fonctionnalités

</Option>

#### order

<Option type="String" default="defined">

Exécuter les scénarios dans l'ordre des fichiers de fonctionnalités (`'defined'`) ou dans un ordre aléatoire (`'random'`). Avec `'random:<seed>'`, par exemple `'random:42'`, l'ordre aléatoire est le même à chaque exécution. Avec `'random'`, le journal affiche la graine de l'exécution (`Random order using seed: 42`).

</Option>

#### format

<Option type="string[]">

Nom et chemin du fichier de sortie du formateur à utiliser.
WebdriverIO prend principalement en charge uniquement les [formateurs](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) qui écrivent leur sortie dans un fichier. Les formateurs ne s'exécutent pas avec [`parallelMode`](#parallelmode-1).

</Option>

#### formatOptions

<Option type="object">

Options à fournir aux formateurs

</Option>

#### tagsInTitle

<Option type="Boolean" default="false">

Ajouter les tags cucumber au nom de la fonctionnalité ou du scénario

</Option>
***Veuillez noter qu'il s'agit d'une option spécifique à @wdio/cucumber-framework, non reconnue par cucumber-js lui-même***<br/>

#### ignoreUndefinedDefinitions

<Option type="Boolean" default="false">

Signaler une étape non définie comme en attente, avec ` (undefined step)` à la fin de son titre, et ne pas faire échouer l'exécution pour cette raison.

</Option>
***Veuillez noter qu'il s'agit d'une option spécifique à @wdio/cucumber-framework, non reconnue par cucumber-js lui-même***<br/>

#### failAmbiguousDefinitions

<Option type="Boolean" default="false">

Signaler une étape ambiguë (une étape qui correspond à plusieurs définitions d'étapes) comme en échec, avec la liste des définitions d'étapes correspondantes. Avec `false`, l'étape est signalée comme ignorée, avec la liste comme motif. Dans les deux cas, l'exécution échoue. Exception : sans `parallelMode`, l'exécution réussit avec `ignoreUndefinedDefinitions: true` et `failAmbiguousDefinitions: false`.

</Option>
***Veuillez noter qu'il s'agit d'une option spécifique à @wdio/cucumber-framework, non reconnue par cucumber-js lui-même***<br/>

#### profiles

<Option type="string[]" default="[]">

Les profils du fichier de configuration Cucumber à utiliser.

</Option>
***Veuillez noter que seules certaines valeurs spécifiques (worldParameters, name, retryTagFilter) sont prises en charge dans les profils, car `cucumberOpts` est prioritaire. De plus, lorsque vous utilisez un profil, assurez-vous que les valeurs mentionnées ne sont pas déclarées dans `cucumberOpts`.***

#### file

<Option type="string | false" default="undefined">

Chemin du fichier de configuration Cucumber à charger, ou `false` pour n'en charger aucun. Sans cette option, Cucumber recherche ses fichiers de configuration par défaut.

</Option>

#### dryRun

<Option type="Boolean" default="false">

N'exécuter aucune étape ni aucun hook : Cucumber se contente de faire correspondre chaque étape à ses définitions d'étapes, de sorte que les étapes non définies et ambiguës sont tout de même signalées. L'exécution n'échoue pas.

</Option>

#### worldParameters

<Option type="object" default="{}">

Paramètres pour votre World, sous la forme `this.parameters`.

</Option>

#### scenarioLevelReporter

<Option type="Boolean" default="false">

Signaler chaque scénario comme un seul test. Ses étapes et ses hooks ne sont pas signalés.

</Option>
***Veuillez noter qu'il s'agit d'une option spécifique à @wdio/cucumber-framework, non reconnue par cucumber-js lui-même***<br/>

#### parallelMode

<Option type="'contexts' | 'userContexts'" default="undefined">

Exécuter simultanément les scénarios d'un fichier de fonctionnalité, chacun dans son propre contexte de navigation WebDriver BiDi. `'contexts'` partage les cookies et le stockage entre les scénarios, `'userContexts'` les isole. Nécessite la capability `'wdio:experimentalBiDiCommands': true`. Voir [Tests parallèles dans un fichier de spec](./ParallelTests.md).

</Option>
***Veuillez noter qu'il s'agit d'une option spécifique à @wdio/cucumber-framework, non reconnue par cucumber-js lui-même***<br/>

#### maxParallelContexts

<Option type="number" default="os.cpus().length">

Nombre de scénarios exécutés simultanément lorsque [`parallelMode`](#parallelmode-1) est défini. Voir [Tests parallèles dans un fichier de spec](./ParallelTests.md#options).

</Option>
***Veuillez noter qu'il s'agit d'une option spécifique à @wdio/cucumber-framework, non reconnue par cucumber-js lui-même***<br/>

### Ignorer des tests dans cucumber

Notez que si vous souhaitez ignorer un test à l'aide des capacités de filtrage habituelles de cucumber disponibles dans `cucumberOpts`, vous le ferez pour tous les navigateurs et appareils configurés dans les capabilities. Afin de pouvoir ignorer des scénarios uniquement pour certaines combinaisons de capabilities, sans démarrer de session si ce n'est pas nécessaire, webdriverio fournit la syntaxe de tag spécifique suivante pour cucumber :

`@skip([condition])`

où condition est une combinaison optionnelle de propriétés de capabilities avec leurs valeurs qui, lorsqu'elles correspondent **toutes**, entraînent l'ignorance du scénario ou de la fonctionnalité marqué(e). Bien entendu, vous pouvez ajouter plusieurs tags aux scénarios et fonctionnalités pour ignorer un test selon plusieurs conditions différentes.

Vous pouvez également utiliser l'annotation '@skip' pour ignorer des tests sans modifier `tags`. Dans ce cas, les tests ignorés seront affichés dans le rapport de test.

Voici quelques exemples de cette syntaxe :
- `@skip` ou `@skip()` : ignorera toujours l'élément marqué
- `@skip(browserName="chrome")` : le test ne sera pas exécuté sur les navigateurs chrome.
- `@skip(browserName="firefox";platformName="linux")` : ignorera le test lors des exécutions firefox sous linux.
- `@skip(browserName=["chrome","firefox"])` : les éléments marqués seront ignorés pour les navigateurs chrome et firefox.
- `@skip(browserName=/i.*explorer/)` : les capabilities dont le navigateur correspond à l'expression régulière seront ignorées (comme `iexplorer`, `internet explorer`, `internet-explorer`, ...).

### Importer les helpers de définition d'étapes

Pour utiliser des helpers de définition d'étapes comme `Given`, `When` ou `Then`, ou des hooks, vous devez les importer depuis `@cucumber/cucumber`, par exemple ainsi :

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

Maintenant, si vous utilisez déjà Cucumber pour d'autres types de tests sans rapport avec WebdriverIO, pour lesquels vous utilisez une version spécifique, vous devez importer ces helpers dans vos tests e2e depuis le package Cucumber de WebdriverIO, par exemple :

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

Cela garantit que vous utilisez les bons helpers au sein du framework WebdriverIO et vous permet d'utiliser une version indépendante de Cucumber pour d'autres types de tests.

### Publier un rapport

Cucumber offre une fonctionnalité permettant de publier vos rapports d'exécution de tests sur `https://reports.cucumber.io/`, qui peut être contrôlée soit en définissant le flag `publish` dans `cucumberOpts`, soit en configurant la variable d'environnement `CUCUMBER_PUBLISH_TOKEN`. Cependant, lorsque vous utilisez `WebdriverIO` pour l'exécution des tests, cette approche présente une limitation : elle met à jour les rapports séparément pour chaque fichier de fonctionnalité, ce qui rend difficile la consultation d'un rapport consolidé.

Pour surmonter cette limitation, nous avons introduit une méthode basée sur les promesses appelée `publishCucumberReport` dans `@wdio/cucumber-framework`. Cette méthode doit être appelée dans le hook `onComplete`, qui est l'endroit idéal pour l'invoquer. `publishCucumberReport` nécessite en entrée le répertoire des rapports où sont stockés les rapports cucumber message.

Vous pouvez générer des rapports `cucumber message` en configurant l'option `format` dans vos `cucumberOpts`. Il est fortement recommandé de fournir un nom de fichier dynamique dans l'option de format `cucumber message` afin d'éviter d'écraser les rapports et de garantir que chaque exécution de test est correctement enregistrée.

Avant d'utiliser cette fonction, assurez-vous de définir les variables d'environnement suivantes :
- CUCUMBER_PUBLISH_REPORT_URL : l'URL où vous souhaitez publier le rapport Cucumber. Si elle n'est pas fournie, l'URL par défaut 'https://messages.cucumber.io/api/reports' sera utilisée.
- CUCUMBER_PUBLISH_REPORT_TOKEN : le jeton d'autorisation requis pour publier le rapport. Si ce jeton n'est pas défini, la fonction se terminera sans publier le rapport.

Voici un exemple des configurations nécessaires et des extraits de code pour la mise en œuvre :

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... Autres options de configuration
    cucumberOpts: {
        // ... Configuration des options Cucumber
        format: [
            ['message', `./reports/${uuidv4()}.ndjson`],
            ['json', './reports/test-report.json']
        ]
    },
    async onComplete() {
        await publishCucumberReport('./reports');
    }
}
```

Veuillez noter que `./reports/` est le répertoire où seront stockés les rapports `cucumber message`.

## Utiliser Serenity/JS

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) est un framework open source conçu pour rendre les tests d'acceptation et de régression de systèmes logiciels complexes plus rapides, plus collaboratifs et plus faciles à faire évoluer.

Pour les suites de tests WebdriverIO, Serenity/JS offre :
- [Rapports enrichis](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Vous pouvez utiliser Serenity/JS
  en remplacement direct de n'importe quel framework WebdriverIO intégré pour produire des rapports d'exécution de tests détaillés et une documentation vivante de votre projet.
- [API du Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - Pour rendre votre code de test portable et réutilisable entre projets et équipes,
  Serenity/JS vous offre une [couche d'abstraction](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) optionnelle au-dessus des API natives de WebdriverIO.
- [Bibliothèques d'intégration](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - Pour les suites de tests qui suivent le Screenplay Pattern,
  Serenity/JS fournit également des bibliothèques d'intégration optionnelles pour vous aider à écrire des [tests d'API](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io),
  [gérer des serveurs locaux](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [effectuer des assertions](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io), et bien plus encore !

![Serenity BDD Report Example](/img/serenity-bdd-reporter.png)

### Installer Serenity/JS

Pour ajouter Serenity/JS à un [projet WebdriverIO existant](https://webdriver.io/docs/gettingstarted), installez les modules Serenity/JS suivants depuis NPM :

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

En savoir plus sur les modules Serenity/JS :
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Configurer Serenity/JS

Pour activer l'intégration avec Serenity/JS, configurez WebdriverIO comme suit :

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // Indiquer à WebdriverIO d'utiliser le framework Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Configuration de Serenity/JS
    serenity: {
        // Configurer Serenity/JS pour utiliser l'adaptateur approprié à votre test runner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Enregistrer les services de reporting Serenity/JS, alias la "stage crew"
        crew: [
            // Optionnel, afficher les résultats d'exécution des tests sur la sortie standard
            '@serenity-js/console-reporter',

            // Optionnel, produire des rapports Serenity BDD et une documentation vivante (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // Optionnel, capturer automatiquement des captures d'écran en cas d'échec d'interaction
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configurer votre runner Cucumber
    cucumberOpts: {
        // voir les options de configuration Cucumber ci-dessous
    },

    // ... ou le runner Jasmine
    jasmineOpts: {
        // voir les options de configuration Jasmine ci-dessous
    },

    // ... ou le runner Mocha
    mochaOpts: {
        // voir les options de configuration Mocha ci-dessous
    },

    runner: 'local',

    // Toute autre configuration WebdriverIO
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // Indiquer à WebdriverIO d'utiliser le framework Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Configuration de Serenity/JS
    serenity: {
        // Configurer Serenity/JS pour utiliser l'adaptateur approprié à votre test runner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Enregistrer les services de reporting Serenity/JS, alias la "stage crew"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configurer votre runner Cucumber
    cucumberOpts: {
        // voir les options de configuration Cucumber ci-dessous
    },

    // ... ou le runner Jasmine
    jasmineOpts: {
        // voir les options de configuration Jasmine ci-dessous
    },

    // ... ou le runner Mocha
    mochaOpts: {
        // voir les options de configuration Mocha ci-dessous
    },

    runner: 'local',

    // Toute autre configuration WebdriverIO
};
```

</TabItem>
</Tabs>

En savoir plus sur :
- [Les options de configuration Cucumber de Serenity/JS](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Les options de configuration Jasmine de Serenity/JS](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Les options de configuration Mocha de Serenity/JS](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Le fichier de configuration WebdriverIO](configurationfile)

### Produire des rapports Serenity BDD et une documentation vivante

Les [rapports Serenity BDD et la documentation vivante](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) sont générés par [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli),
un programme Java téléchargé et géré par le module [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io).

Pour produire des rapports Serenity BDD, votre suite de tests doit :
- télécharger la CLI Serenity BDD, en appelant `serenity-bdd update`, qui met en cache le `jar` de la CLI localement
- produire des rapports Serenity BDD `.json` intermédiaires, en enregistrant [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) conformément aux [instructions de configuration](#configuring-serenityjs)
- invoquer la CLI Serenity BDD lorsque vous souhaitez produire le rapport, en appelant `serenity-bdd run`

Le modèle utilisé par tous les [modèles de projet Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) repose
sur l'utilisation de :
- un script NPM [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) pour télécharger la CLI Serenity BDD
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) pour exécuter le processus de reporting même si la suite de tests elle-même a échoué (ce qui est précisément le moment où vous avez le plus besoin des rapports de test...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) comme méthode pratique pour supprimer les rapports de test restants de l'exécution précédente

```json title="package.json"
{
  "scripts": {
    "postinstall": "serenity-bdd update",
    "clean": "rimraf target",
    "test": "failsafe clean test:execute test:report",
    "test:execute": "wdio wdio.conf.ts",
    "test:report": "serenity-bdd run"
  }
}
```

Pour en savoir plus sur `SerenityBDDReporter`, veuillez consulter :
- les instructions d'installation dans la [documentation de `@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io),
- les exemples de configuration dans la [documentation de l'API `SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io),
- les [exemples Serenity/JS sur GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### Utiliser les API du Screenplay Pattern de Serenity/JS

Le [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) est une approche innovante et centrée sur l'utilisateur pour écrire des tests d'acceptation automatisés de haute qualité. Il vous oriente vers une utilisation efficace des couches d'abstraction,
aide vos scénarios de test à refléter le vocabulaire métier de votre domaine, et encourage de bonnes pratiques de test et d'ingénierie logicielle au sein de votre équipe.

Par défaut, lorsque vous enregistrez `@serenity-js/webdriverio` comme `framework` WebdriverIO,
Serenity/JS configure une [distribution](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) par défaut d'[acteurs](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io),
où chaque acteur peut :
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

Cela devrait suffire pour vous aider à commencer à introduire des scénarios de test qui suivent le Screenplay Pattern, même dans une suite de tests existante, par exemple :

```typescript title="specs/example.spec.ts"
import { actorCalled } from '@serenity-js/core'
import { Navigate, Page } from '@serenity-js/web'
import { Ensure, equals } from '@serenity-js/assertions'

describe('My awesome website', () => {
    it('can have test scenarios that follow the Screenplay Pattern', async () => {
        await actorCalled('Alice').attemptsTo(
            Navigate.to(`https://webdriver.io`),
            Ensure.that(
                Page.current().title(),
                equals(`WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO`)
            ),
        )
    })

    it('can have non-Screenplay scenarios too', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser)
            .toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Pour en savoir plus sur le Screenplay Pattern, consultez :
- [The Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Tests web avec Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)