---
id: organizingsuites
title: Organiser la suite de tests
description: "Organisez une suite de tests croissante en partageant des fichiers de configuration, en regroupant les specs en suites, en exécutant les specs de manière séquentielle et en incluant ou excluant des tests."
---

À mesure que les projets grandissent, de plus en plus de tests d'intégration sont inévitablement ajoutés. Cela augmente le temps de build et ralentit la productivité.

Pour éviter cela, vous devriez exécuter vos tests en parallèle. WebdriverIO teste déjà chaque spec (ou _feature file_ dans Cucumber) en parallèle au sein d'une seule session. En général, essayez de ne tester qu'une seule fonctionnalité par fichier spec. Essayez de ne pas avoir trop ou trop peu de tests dans un fichier. (Cependant, il n'y a pas de règle d'or en la matière.)

Une fois que vos tests comportent plusieurs fichiers spec, vous devriez commencer à exécuter vos tests simultanément. Pour ce faire, ajustez la propriété `maxInstances` dans votre fichier de configuration. WebdriverIO vous permet d'exécuter vos tests avec une simultanéité maximale, ce qui signifie que quel que soit le nombre de fichiers et de tests que vous avez, ils peuvent tous s'exécuter en parallèle.  (Cela reste soumis à certaines limites, comme le CPU de votre ordinateur, les restrictions de simultanéité, etc.)

> Supposons que vous ayez 3 capabilities différentes (Chrome, Firefox et Safari) et que vous ayez défini `maxInstances` à `1`. Le test runner WDIO lancera 3 processus. Par conséquent, si vous avez 10 fichiers spec et que vous définissez `maxInstances` à `10`, _tous_ les fichiers spec seront testés simultanément, et 30 processus seront lancés.

Vous pouvez définir la propriété `maxInstances` globalement pour appliquer l'attribut à tous les navigateurs.

Si vous exécutez votre propre grille WebDriver, vous pouvez (par exemple) avoir plus de capacité pour un navigateur que pour un autre. Dans ce cas, vous pouvez _limiter_ le `maxInstances` dans votre objet capability :

```js
// wdio.conf.js
export const config = {
    // ...
    // définir maxInstance pour tous les navigateurs
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances peut être écrasé par capability. Ainsi, si vous avez une grille WebDriver
        // interne avec seulement 5 instances firefox disponibles, vous pouvez vous assurer que pas plus de
        // 5 instances ne sont démarrées à la fois.
        browserName: 'chrome'
    }],
    // ...
}
```

Pour exécuter également les tests *à l'intérieur* d'un même fichier spec en même temps, chacun dans sa propre fenêtre de navigateur, consultez [Tests parallèles dans un fichier spec](./ParallelTests.md).

## Hériter du fichier de configuration principal

Si vous exécutez votre suite de tests dans plusieurs environnements (par exemple, dev et intégration), il peut être utile d'utiliser plusieurs fichiers de configuration pour garder les choses gérables.

Comme pour le [concept de page object](pageobjects), la première chose dont vous aurez besoin est un fichier de configuration principal. Il contient toutes les configurations que vous partagez entre les environnements.

Créez ensuite un autre fichier de configuration pour chaque environnement, et complétez la configuration principale avec celles spécifiques à chaque environnement :

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// utiliser le fichier de configuration principal par défaut mais écraser les informations spécifiques à l'environnement
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // plus de caps définies ici
        // ...
    ],

    // exécuter les tests sur sauce au lieu de localement
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// ajouter un reporter supplémentaire
config.reporters.push('allure')
```

## Regrouper les specs de test en suites

Vous pouvez regrouper les specs de test en suites et exécuter uniquement des suites spécifiques au lieu de toutes.

Tout d'abord, définissez vos suites dans votre configuration WDIO :

```js
// wdio.conf.js
export const config = {
    // définir tous les tests
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // définir des suites spécifiques
    suites: {
        login: [
            './test/specs/login.success.spec.js',
            './test/specs/login.failure.spec.js'
        ],
        otherFeature: [
            // ...
        ]
    },
    // ...
}
```

Maintenant, si vous souhaitez exécuter une seule suite, vous pouvez passer le nom de la suite en argument CLI :

```sh
wdio wdio.conf.js --suite login
```

Ou exécuter plusieurs suites à la fois :

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Regrouper les specs de test pour une exécution séquentielle

Comme décrit ci-dessus, l'exécution simultanée des tests présente des avantages. Cependant, il existe des cas où il serait bénéfique de regrouper des tests pour les exécuter séquentiellement dans une seule instance. C'est principalement le cas lorsqu'il y a un coût de mise en place important, par exemple la transpilation de code ou le provisionnement d'instances cloud, mais il existe également des modèles d'utilisation avancés qui bénéficient de cette capacité.

Pour regrouper des tests à exécuter dans une seule instance, définissez-les sous forme de tableau dans la définition des specs.

```json
    "specs": [
        [
            "./test/specs/test_login.js",
            "./test/specs/test_product_order.js",
            "./test/specs/test_checkout.js"
        ],
        "./test/specs/test_b*.js",
    ],
```
Dans l'exemple ci-dessus, les tests 'test_login.js', 'test_product_order.js' et 'test_checkout.js' seront exécutés séquentiellement dans une seule instance et chacun des tests "test_b*" s'exécutera simultanément dans des instances individuelles.

Il est également possible de regrouper des specs définies dans des suites, vous pouvez donc désormais définir des suites comme ceci :
```json
    "suites": {
        end2end: [
            [
                "./test/specs/test_login.js",
                "./test/specs/test_product_order.js",
                "./test/specs/test_checkout.js"
            ]
        ],
        allb: ["./test/specs/test_b*.js"]
},
```
et dans ce cas, tous les tests de la suite "end2end" seraient exécutés dans une seule instance.

Lors de l'exécution séquentielle de tests à l'aide d'un pattern, les fichiers spec seront exécutés par ordre alphabétique

```json
  "suites": {
    end2end: ["./test/specs/test_*.js"]
  },
```

Cela exécutera les fichiers correspondant au pattern ci-dessus dans l'ordre suivant :

```
  [
      "./test/specs/test_checkout.js",
      "./test/specs/test_login.js",
      "./test/specs/test_product_order.js"
  ]
```

## Exécuter des tests sélectionnés

Dans certains cas, vous pouvez souhaiter n'exécuter qu'un seul test (ou un sous-ensemble de tests) de vos suites.

Avec le paramètre `--spec`, vous pouvez spécifier quelle _suite_ (Mocha, Jasmine) ou _feature_ (Cucumber) doit être exécutée. Le chemin est résolu relativement à votre répertoire de travail actuel.

Par exemple, pour exécuter uniquement votre test de connexion :

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Ou exécuter plusieurs specs à la fois :

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Si la valeur de `--spec` ne pointe pas vers un fichier spec particulier, elle est plutôt utilisée pour filtrer les noms de fichiers spec définis dans votre configuration.

Pour exécuter toutes les specs contenant le mot « dialog » dans le nom du fichier spec, vous pourriez utiliser :

```sh
wdio wdio.conf.js --spec dialog
```

Notez que chaque fichier de test s'exécute dans un seul processus de test runner. Comme nous n'analysons pas les fichiers à l'avance (voir la section suivante pour des informations sur le piping de noms de fichiers vers `wdio`), vous _ne pouvez pas_ utiliser (par exemple) `describe.only` en haut de votre fichier spec pour indiquer à Mocha de n'exécuter que cette suite.

Cette fonctionnalité vous aidera à atteindre le même objectif.

Lorsque l'option `--spec` est fournie, elle remplacera tous les patterns définis par le `specs` de la configuration ou le `wdio:specs` d'une capability.

## Exclure des tests sélectionnés

Si nécessaire, si vous devez exclure un ou plusieurs fichiers spec particuliers d'une exécution, vous pouvez utiliser le paramètre `--exclude` (Mocha, Jasmine) ou feature (Cucumber).

Par exemple, pour exclure votre test de connexion de l'exécution des tests :

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Ou exclure plusieurs fichiers spec :

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Ou exclure un fichier spec lors du filtrage à l'aide d'une suite :

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Si la valeur de `--exclude` ne pointe pas vers un fichier spec particulier, elle est plutôt utilisée pour filtrer les noms de fichiers spec définis dans votre configuration.

Pour exclure toutes les specs contenant le mot « dialog » dans le nom du fichier spec, vous pourriez utiliser :

```sh
wdio wdio.conf.js --exclude dialog
```

### Exclure une suite entière

Vous pouvez également exclure une suite entière par son nom. Si la valeur d'exclusion correspond à un nom de suite défini dans votre configuration et ne ressemble pas à un chemin de fichier, la suite entière sera ignorée :

```sh
wdio wdio.conf.js --suite login --suite checkout --exclude login
```

Cela exécutera uniquement la suite `checkout`, en ignorant entièrement la suite `login`.

Les exclusions mixtes (suites et patterns de spec) fonctionnent comme prévu :

```sh
wdio wdio.conf.js --suite login --exclude dialog --exclude signup
```

Dans cet exemple, si `signup` est un nom de suite défini, cette suite sera exclue. Le pattern `dialog` filtrera tous les fichiers spec contenant « dialog » dans leur nom de fichier.

:::note
Si vous spécifiez à la fois `--suite X` et `--exclude X`, l'exclusion est prioritaire et la suite `X` ne sera pas exécutée.
:::

Lorsque l'option `--exclude` est fournie, elle remplacera tous les patterns définis par le `exclude` de la configuration ou le `wdio:exclude` d'une capability.

## Exécuter des suites et des specs de test

Exécutez une suite entière ainsi que des specs individuelles.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Exécuter plusieurs specs de test spécifiques

Il est parfois nécessaire&mdash;dans le contexte de l'intégration continue ou autre&mdash;de spécifier plusieurs ensembles de specs à exécuter. L'utilitaire en ligne de commande `wdio` de WebdriverIO accepte les noms de fichiers transmis par pipe (depuis `find`, `grep` ou autres).

Les noms de fichiers transmis par pipe remplacent la liste de globs ou de noms de fichiers spécifiés dans la liste `spec` de la configuration.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Remarque :** Cela ne_ remplacera pas _le flag `--spec` pour l'exécution d'une seule spec._

## Exécuter des tests spécifiques avec MochaOpts

Vous pouvez également filtrer quel `suite|describe` et/ou `it|test` spécifique vous souhaitez exécuter en passant un argument spécifique à mocha : `--mochaOpts.grep` à la CLI wdio.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Remarque :** Mocha filtrera les tests après que le test runner WDIO a créé les instances, vous pourriez donc voir plusieurs instances être lancées sans être réellement exécutées._

## Exclure des tests spécifiques avec MochaOpts

Vous pouvez également filtrer quel `suite|describe` et/ou `it|test` spécifique vous souhaitez exclure en passant un argument spécifique à mocha : `--mochaOpts.invert` à la CLI wdio. `--mochaOpts.invert` effectue l'inverse de `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Remarque :** Mocha filtrera les tests après que le test runner WDIO a créé les instances, vous pourriez donc voir plusieurs instances être lancées sans être réellement exécutées._

## Arrêter les tests après un échec

Avec l'option `bail`, vous pouvez indiquer à WebdriverIO d'arrêter les tests après l'échec d'un test.

C'est utile avec de grandes suites de tests lorsque vous savez déjà que votre build va échouer, mais que vous voulez éviter la longue attente d'une exécution complète des tests.

L'option `bail` attend un nombre, qui spécifie combien d'échecs de tests peuvent se produire avant que WebDriver n'arrête toute l'exécution des tests. La valeur par défaut est `0`, ce qui signifie qu'il exécute toujours toutes les specs de test qu'il peut trouver.

Veuillez consulter la [page Options](configuration) pour plus d'informations sur la configuration de bail.
## Hiérarchie des options d'exécution

Lors de la déclaration des specs à exécuter, il existe une certaine hiérarchie définissant quel pattern sera prioritaire. Actuellement, voici comment cela fonctionne, de la priorité la plus élevée à la plus basse :

> Argument CLI `--spec` > capability `wdio:specs` > config `specs`
> Argument CLI `--exclude` > config `exclude` > capability `wdio:exclude`

Si seul le paramètre de configuration est fourni, il sera utilisé pour toutes les capabilities. Cependant, si le pattern est défini au niveau de la capability, il sera utilisé à la place du pattern de la configuration. Enfin, tout pattern de spec défini en ligne de commande remplacera tous les autres patterns fournis.

### Utiliser des patterns de spec définis par capability

Lorsque vous définissez un pattern de spec au niveau de la capability, il remplacera tous les patterns définis au niveau de la configuration. C'est utile lorsqu'il est nécessaire de séparer les tests en fonction de capabilities d'appareils différentes. Dans de tels cas, il est plus utile d'utiliser un pattern de spec générique au niveau de la configuration, et des patterns plus spécifiques au niveau de la capability.

Par exemple, supposons que vous ayez deux répertoires, l'un pour les tests Android et l'autre pour les tests iOS.

Votre fichier de configuration peut définir le pattern ainsi, pour les tests non spécifiques à un appareil :

```js
{
    specs: ['tests/general/**/*.js']
}
```

mais ensuite, vous aurez différentes capabilities pour vos appareils Android et iOS, où les patterns pourraient ressembler à ceci :

```json
{
  "platformName": "Android",
  "wdio:specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "wdio:specs": [
    "tests/ios/**/*.js"
  ]
}
```

Si vous avez besoin de ces deux capabilities dans votre fichier de configuration, l'appareil Android n'exécutera que les tests sous l'espace de noms « android », et les tests iOS n'exécuteront que les tests sous l'espace de noms « ios » !

```js
//wdio.conf.js
export const config = {
    "specs": [
        "tests/general/**/*.js"
    ],
    "capabilities": [
        {
            platformName: "Android",
            "wdio:specs": ["tests/android/**/*.js"],
            //...
        },
        {
            platformName: "iOS",
            "wdio:specs": ["tests/ios/**/*.js"],
            //...
        },
        {
            platformName: "Chrome",
            //les specs au niveau de la configuration seront utilisées
        }
    ]
}
```