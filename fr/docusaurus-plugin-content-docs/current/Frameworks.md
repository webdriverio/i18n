---
id: frameworks
title: Frameworks
---

WebdriverIO Runner prend en charge nativement [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/) et [Cucumber.js](https://cucumber.io/). Vous pouvez également l'intégrer avec des frameworks open-source tiers, comme [Serenity/JS](#using-serenityjs).

:::tip Intégration de WebdriverIO avec des frameworks de test
Pour intégrer WebdriverIO avec un framework de test, vous avez besoin d'un package adaptateur disponible sur NPM.
Notez que le package adaptateur doit être installé au même endroit que WebdriverIO.
Donc, si vous avez installé WebdriverIO globalement, assurez-vous d'installer également le package adaptateur globalement.
:::

L'intégration de WebdriverIO avec un framework de test vous permet d'accéder à l'instance WebDriver en utilisant la variable globale `browser`
dans vos fichiers de spécification ou définitions d'étapes.
Notez que WebdriverIO prendra également en charge l'instanciation et la fin de la session Selenium, vous n'avez donc pas à le faire
vous-même.

## Utilisation de Mocha

Tout d'abord, installez le package adaptateur depuis NPM :

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

Par défaut, WebdriverIO fournit une [bibliothèque d'assertion](assertion) intégrée que vous pouvez utiliser immédiatement :

```js
describe('mon site web génial', () => {
    it('devrait faire des assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO prend en charge les interfaces `BDD` (par défaut), `TDD` et `QUnit` de Mocha [interfaces](https://mochajs.org/#interfaces).

Si vous souhaitez écrire vos spécifications en style TDD, définissez la propriété `ui` dans votre configuration `mochaOpts` sur `tdd`. Maintenant, vos fichiers de test doivent être écrits comme ceci :

```js
suite('mon site web génial', () => {
    test('devrait faire des assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Si vous souhaitez définir d'autres paramètres spécifiques à Mocha, vous pouvez le faire avec la clé `mochaOpts` dans votre fichier de configuration. Une liste de toutes les options se trouve sur le [site web du projet Mocha](https://mochajs.org/api/mocha).

__Remarque :__ WebdriverIO ne prend pas en charge l'utilisation obsolète des callbacks `done` dans Mocha :

```js
it('devrait tester quelque chose', (done) => {
    done() // génère "done is not a function"
})
```

### Options de Mocha

Les options suivantes peuvent être appliquées dans votre `wdio.conf.js` pour configurer votre environnement Mocha. __Remarque :__ toutes les options ne sont pas prises en charge, par exemple, l'application de l'option `parallel` provoquera une erreur car le testrunner WDIO a sa propre façon d'exécuter des tests en parallèle. Vous pouvez passer ces options de framework comme arguments, par exemple :

```sh
wdio run wdio.conf.ts --mochaOpts.grep "mon test" --mochaOpts.bail --no-mochaOpts.checkLeaks
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
L'option `require` est utile lorsque vous souhaitez ajouter ou étendre des fonctionnalités de base (option de framework WebdriverIO).

Type: `string|string[]`<br />
Défaut: `[]`

#### compilers
Utilisez le(s) module(s) donné(s) pour compiler des fichiers. Les compilateurs seront inclus avant les requires (option de framework WebdriverIO).

Type: `string[]`<br />
Défaut: `[]`

#### allowUncaught
Propager les erreurs non capturées.

Type: `boolean`<br />
Défaut: `false`

#### bail
Arrêter après le premier échec de test.

Type: `boolean`<br />
Défaut: `false`

#### checkLeaks
Vérifier les fuites de variables globales.

Type: `boolean`<br />
Défaut: `false`

#### delay
Retarder l'exécution de la suite racine.

Type: `boolean`<br />
Défaut: `false`

#### fgrep
Filtre de test pour une chaîne donnée.

Type: `string`<br />
Défaut: `null`

#### forbidOnly
Les tests marqués `only` échouent la suite.

Type: `boolean`<br />
Défaut: `false`

#### forbidPending
Les tests en attente échouent la suite.

Type: `boolean`<br />
Défaut: `false`

#### fullTrace
Trace complète de la pile lors d'un échec.

Type: `boolean`<br />
Défaut: `false`

#### global
Variables attendues dans la portée globale.

Type: `string[]`<br />
Défaut: `[]`

#### grep
Filtre de test pour une expression régulière donnée.

Type: `RegExp|string`<br />
Défaut: `null`

#### invert
Inverser les correspondances du filtre de test.

Type: `boolean`<br />
Défaut: `false`

#### retries
Nombre de fois pour réessayer les tests échoués.

Type: `number`<br />
Défaut: `0`

#### timeout
Valeur de seuil de délai d'attente (en ms).

Type: `number`<br />
Défaut: `30000`

## Utilisation de Jasmine

Tout d'abord, installez le package adaptateur depuis NPM :

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Vous pouvez ensuite configurer votre environnement Jasmine en définissant une propriété `jasmineOpts` dans votre configuration. Une liste de toutes les options se trouve sur le [site web du projet Jasmine](https://jasmine.github.io/api/3.5/Configuration.html).

### Options de Jasmine

Les options suivantes peuvent être appliquées dans votre `wdio.conf.js` pour configurer votre environnement Jasmine en utilisant la propriété `jasmineOpts`. Pour plus d'informations sur ces options de configuration, consultez la [documentation Jasmine](https://jasmine.github.io/api/edge/Configuration). Vous pouvez passer ces options de framework comme arguments, par exemple :

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "mon test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Cela transmettra les options Mocha suivantes :

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Les options Jasmine suivantes sont prises en charge :

#### defaultTimeoutInterval
Intervalle de délai d'attente par défaut pour les opérations Jasmine.

Type: `number`<br />
Défaut: `60000`

#### helpers
Tableau de chemins de fichiers (et globs) relatifs à spec_dir à inclure avant les spécifications jasmine.

Type: `string[]`<br />
Défaut: `[]`

#### requires
L'option `requires` est utile lorsque vous souhaitez ajouter ou étendre des fonctionnalités de base.

Type: `string[]`<br />
Défaut: `[]`

#### random
Indique s'il faut randomiser l'ordre d'exécution des spécifications.

Type: `boolean`<br />
Défaut: `true`

#### seed
Graine à utiliser comme base de randomisation. Null fait en sorte que la graine soit déterminée aléatoirement au début de l'exécution.

Type: `Function`<br />
Défaut: `null`

#### failSpecWithNoExpectations
Indique s'il faut faire échouer la spécification si elle n'a exécuté aucune attente. Par défaut, une spécification qui n'a exécuté aucune attente est signalée comme réussie. Définir cette option sur true signalera une telle spécification comme un échec.

Type: `boolean`<br />
Défaut: `false`

#### oneFailurePerSpec
Indique s'il faut faire en sorte que les spécifications n'aient qu'un seul échec d'attente.

Type: `boolean`<br />
Défaut: `false`

#### specFilter
Fonction à utiliser pour filtrer les spécifications.

Type: `Function`<br />
Défaut: `(spec) => true`

#### grep
Exécuter uniquement les tests correspondant à cette chaîne ou expression régulière. (Applicable uniquement si aucune fonction `specFilter` personnalisée n'est définie)

Type: `string|Regexp`<br />
Défaut: `null`

#### invertGrep
Si vrai, inverse les tests correspondants et n'exécute que les tests qui ne correspondent pas à l'expression utilisée dans `grep`. (Applicable uniquement si aucune fonction `specFilter` personnalisée n'est définie)

Type: `boolean`<br />
Défaut: `false`

## Utilisation de Cucumber

Tout d'abord, installez le package adaptateur depuis NPM :

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Si vous souhaitez utiliser Cucumber, définissez la propriété `framework` sur `cucumber` en ajoutant `framework: 'cucumber'` au [fichier de configuration](configurationfile).

Les options pour Cucumber peuvent être données dans le fichier de configuration avec `cucumberOpts`. Consultez la liste complète des options [ici](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options).

Pour démarrer rapidement avec Cucumber, jetez un œil à notre projet [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) qui est livré avec toutes les définitions d'étapes dont vous avez besoin pour commencer, et vous écrirez des fichiers de fonctionnalités immédiatement.

### Options de Cucumber

Les options suivantes peuvent être appliquées dans votre `wdio.conf.js` pour configurer votre environnement Cucumber en utilisant la propriété `cucumberOpts` :

:::tip Ajustement des options via la ligne de commande
Les `cucumberOpts`, comme les `tags` personnalisés pour filtrer les tests, peuvent être spécifiés via la ligne de commande. Cela se fait en utilisant le format `cucumberOpts.{optionName}="value"`.

Par exemple, si vous souhaitez exécuter uniquement les tests qui sont tagués avec `@smoke`, vous pouvez utiliser la commande suivante :

```sh
# Lorsque vous souhaitez exécuter uniquement les tests qui portent le tag "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="nom de scénario" --cucumberOpts.failFast
```

Cette commande définit l'option `tags` dans `cucumberOpts` sur `@smoke`, garantissant que seuls les tests avec ce tag sont exécutés.

:::

#### backtrace
Afficher la trace complète pour les erreurs.

Type: `Boolean`<br />
Défaut: `true`

#### requireModule
Requérir des modules avant de requérir des fichiers de support.

Type: `string[]`<br />
Défaut: `[]`<br />
Exemple:

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
Abandonner l'exécution au premier échec.

Type: `boolean`<br />
Défaut: `false`

#### name
Exécuter uniquement les scénarios dont le nom correspond à l'expression (répétable).

Type: `RegExp[]`<br />
Défaut: `[]`

#### require
Requérir des fichiers contenant vos définitions d'étapes avant d'exécuter les fonctionnalités. Vous pouvez également spécifier un glob pour vos définitions d'étapes.

Type: `string[]`<br />
Défaut: `[]`
Exemple:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import
Chemins vers votre code de support, pour ESM.

Type: `String[]`<br />
Défaut: `[]`
Exemple:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
Échouer s'il y a des étapes non définies ou en attente.

Type: `boolean`<br />
Défaut: `false`

#### tags
Exécuter uniquement les fonctionnalités ou scénarios avec des tags correspondant à l'expression.
Veuillez consulter la [documentation Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) pour plus de détails.

Type: `String`<br />
Défaut: ``

#### timeout
Délai d'attente en millisecondes pour les définitions d'étapes.

Type: `Number`<br />
Défaut: `30000`

#### retry
Spécifiez le nombre de fois pour réessayer les cas de test échoués.

Type: `Number`<br />
Défaut: `0`

#### retryTagFilter
Réessaye uniquement les fonctionnalités ou scénarios avec des tags correspondant à l'expression (répétable). Cette option nécessite que '--retry' soit spécifié.

Type: `RegExp`

#### language
Langue par défaut pour vos fichiers de fonctionnalités

Type: `String`<br />
Défaut: `en`

#### order
Exécuter les tests dans un ordre défini / aléatoire

Type: `String`<br />
Défaut: `defined`

#### format
Nom et chemin du fichier de sortie du formateur à utiliser.
WebdriverIO prend principalement en charge uniquement les [Formateurs](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) qui écrivent la sortie dans un fichier.

Type: `string[]`<br />

#### formatOptions
Options à fournir aux formateurs

Type: `object`<br />

#### tagsInTitle
Ajouter des tags cucumber au nom de la fonctionnalité ou du scénario

Type: `Boolean`<br />
Défaut: `false