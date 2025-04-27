---
id: organizingsuites
title: Organisation des suites de tests
---

À mesure que les projets grandissent, de plus en plus de tests d'intégration sont inévitablement ajoutés. Cela augmente le temps de construction et ralentit la productivité.

Pour éviter cela, vous devriez exécuter vos tests en parallèle. WebdriverIO teste déjà chaque spécification (ou _fichier de fonctionnalité_ dans Cucumber) en parallèle au sein d'une même session. En général, essayez de ne tester qu'une seule fonctionnalité par fichier de spécification. Essayez de ne pas avoir trop ou trop peu de tests dans un seul fichier. (Cependant, il n'y a pas de règle d'or ici.)

Une fois que vos tests comportent plusieurs fichiers de spécification, vous devriez commencer à exécuter vos tests simultanément. Pour ce faire, ajustez la propriété `maxInstances` dans votre fichier de configuration. WebdriverIO vous permet d'exécuter vos tests avec une concurrence maximale, ce qui signifie que peu importe le nombre de fichiers et de tests que vous avez, ils peuvent tous s'exécuter en parallèle. (Cela reste soumis à certaines limites, comme le CPU de votre ordinateur, les restrictions de concurrence, etc.)

> Supposons que vous ayez 3 capacités différentes (Chrome, Firefox et Safari) et que vous ayez défini `maxInstances` à `1`. Le lanceur de test WDIO générera 3 processus. Par conséquent, si vous avez 10 fichiers de spécification et que vous définissez `maxInstances` à `10`, _tous_ les fichiers de spécification seront testés simultanément, et 30 processus seront générés.

Vous pouvez définir la propriété `maxInstances` globalement pour définir l'attribut pour tous les navigateurs.

Si vous exécutez votre propre grille WebDriver, vous pouvez (par exemple) avoir plus de capacité pour un navigateur que pour un autre. Dans ce cas, vous pouvez _limiter_ le `maxInstances` dans votre objet de capacité :

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
        // maxInstances peut être écrasé par capacité. Donc si vous avez une grille WebDriver interne
        // avec seulement 5 instances firefox disponibles, vous pouvez vous assurer que pas plus de
        // 5 instances ne démarrent en même temps.
        browserName: 'chrome'
    }],
    // ...
}
```

## Hériter du fichier de configuration principal

Si vous exécutez votre suite de tests dans plusieurs environnements (par exemple, développement et intégration), il peut être utile d'utiliser plusieurs fichiers de configuration pour faciliter la gestion.

Similaire au [concept d'objet de page](pageobjects), la première chose dont vous aurez besoin est un fichier de configuration principal. Il contient toutes les configurations que vous partagez entre les environnements.

Ensuite, créez un autre fichier de configuration pour chaque environnement, et complétez la configuration principale avec celles spécifiques à l'environnement :

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// avoir le fichier de configuration principal comme défaut mais écraser les informations spécifiques à l'environnement
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // plus de capacités définies ici
        // ...
    ],

    // exécuter les tests sur sauce au lieu de localement
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// ajouter un rapporteur supplémentaire
config.reporters.push('allure')
```

## Regroupement des spécifications de test en suites

Vous pouvez regrouper les spécifications de test en suites et exécuter des suites spécifiques individuelles au lieu de toutes les exécuter.

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

Maintenant, si vous souhaitez exécuter une seule suite, vous pouvez passer le nom de la suite comme argument CLI :

```sh
wdio wdio.conf.js --suite login
```

Ou exécuter plusieurs suites à la fois :

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Regroupement des spécifications de test pour une exécution séquentielle

Comme décrit ci-dessus, il y a des avantages à exécuter les tests simultanément. Cependant, il existe des cas où il serait bénéfique de regrouper les tests pour les exécuter séquentiellement dans une seule instance. Des exemples de cela sont principalement lorsqu'il y a un coût de configuration important, par exemple la transpilation de code ou le provisionnement d'instances cloud, mais il existe également des modèles d'utilisation avancés qui bénéficient de cette capacité.

Pour regrouper les tests à exécuter dans une seule instance, définissez-les comme un tableau dans la définition des spécifications.

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

Il est également possible de regrouper les spécifications définies dans les suites, vous pouvez donc maintenant également définir des suites comme ceci :
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

Lors de l'exécution séquentielle des tests à l'aide d'un modèle, les fichiers de spécification seront exécutés dans un ordre alphabétique

```json
  "suites": {
    end2end: ["./test/specs/test_*.js"]
  },
```

Cela exécutera les fichiers correspondant au modèle ci-dessus dans l'ordre suivant :

```
  [
      "./test/specs/test_checkout.js",
      "./test/specs/test_login.js",
      "./test/specs/test_product_order.js"
  ]
```

## Exécuter des tests sélectionnés

Dans certains cas, vous souhaiterez peut-être n'exécuter qu'un seul test (ou un sous-ensemble de tests) de vos suites.

Avec le paramètre `--spec`, vous pouvez spécifier quelle _suite_ (Mocha, Jasmine) ou _fonctionnalité_ (Cucumber) doit être exécutée. Le chemin est résolu relativement à votre répertoire de travail actuel.

Par exemple, pour exécuter uniquement votre test de connexion :

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Ou exécuter plusieurs spécifications à la fois :

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Si la valeur `--spec` ne pointe pas vers un fichier de spécification particulier, elle est utilisée pour filtrer les noms de fichiers de spécification définis dans votre configuration.

Pour exécuter toutes les spécifications contenant le mot "dialog" dans les noms de fichiers de spécification, vous pourriez utiliser :

```sh
wdio wdio.conf.js --spec dialog
```

Notez que chaque fichier de test s'exécute dans un processus d'exécution de test unique. Comme nous ne scannons pas les fichiers à l'avance (voir la section suivante pour plus d'informations sur le transfert de noms de fichiers vers `wdio`), vous _ne pouvez pas_ utiliser (par exemple) `describe.only` en haut de votre fichier de spécification pour indiquer à Mocha de n'exécuter que cette suite.

Cette fonctionnalité vous aidera à atteindre le même objectif.

Lorsque l'option `--spec` est fournie, elle remplacera tous les modèles définis par le paramètre `specs` au niveau de la configuration ou de la capacité.

## Exclure des tests sélectionnés

Si nécessaire, si vous devez exclure un ou plusieurs fichiers de spécification particuliers d'une exécution, vous pouvez utiliser le paramètre `--exclude` (Mocha, Jasmine) ou fonctionnalité (Cucumber).

Par exemple, pour exclure votre test de connexion de l'exécution du test :

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Ou exclure plusieurs fichiers de spécification :

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Ou exclure un fichier de spécification lors du filtrage à l'aide d'une suite :

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Si la valeur `--exclude` ne pointe pas vers un fichier de spécification particulier, elle est utilisée pour filtrer les noms de fichiers de spécification définis dans votre configuration.

Pour exclure toutes les spécifications contenant le mot "dialog" dans les noms de fichiers de spécification, vous pourriez utiliser :

```sh
wdio wdio.conf.js --exclude dialog
```

Lorsque l'option `--exclude` est fournie, elle remplacera tous les modèles définis par le paramètre `exclude` au niveau de la configuration ou de la capacité.

## Exécuter des suites et des spécifications de test

Exécutez une suite entière avec des spécifications individuelles.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Exécuter plusieurs spécifications de test spécifiques

Il est parfois nécessaire, dans le contexte de l'intégration continue et ailleurs, de spécifier plusieurs ensembles de spécifications à exécuter. L'utilitaire de ligne de commande `wdio` de WebdriverIO accepte les noms de fichiers transmis par pipeline (à partir de `find`, `grep` ou autres).

Les noms de fichiers transmis par pipeline remplacent la liste de modèles ou de noms de fichiers spécifiés dans la liste `spec` de la configuration.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Remarque :** Cela_ ne _remplacera pas le drapeau `--spec` pour l'exécution d'une seule spécification._

## Exécution de tests spécifiques avec MochaOpts

Vous pouvez également filtrer quels `suite|describe` et/ou `it|test` spécifiques vous souhaitez exécuter en passant un argument spécifique à mocha : `--mochaOpts.grep` à l'interface de ligne de commande wdio.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Remarque :** Mocha filtrera les tests après que le lanceur de test WDIO ait créé les instances, vous pourriez donc voir plusieurs instances être générées mais pas réellement exécutées._

## Exclure des tests spécifiques avec MochaOpts

Vous pouvez également filtrer quels `suite|describe` et/ou `it|test` spécifiques vous souhaitez exclure en passant un argument spécifique à mocha : `--mochaOpts.invert` à l'interface de ligne de commande wdio. `--mochaOpts.invert` effectue l'inverse de `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Remarque :** Mocha filtrera les tests après que le lanceur de test WDIO ait créé les instances, vous pourriez donc voir plusieurs instances être générées mais pas réellement exécutées._

## Arrêter les tests après un échec

Avec l'option `bail`, vous pouvez demander à WebdriverIO d'arrêter les tests après l'échec d'un test.

Cela est utile avec de grandes suites de tests lorsque vous savez déjà que votre build échouera, mais que vous souhaitez éviter l'attente prolongée d'une exécution complète des tests.

L'option `bail` attend un nombre, qui spécifie combien d'échecs de test peuvent se produire avant que WebDriver n'arrête l'ensemble de l'exécution des tests. La valeur par défaut est `0`, ce qui signifie qu'il exécute toujours toutes les spécifications de test qu'il peut trouver.

Veuillez consulter la [page des options](configuration) pour des informations supplémentaires sur la configuration de bail.
## Hiérarchie des options d'exécution

Lors de la déclaration des spécifications à exécuter, il existe une certaine hiérarchie définissant quel modèle aura la priorité. Actuellement, voici comment cela fonctionne, de la priorité la plus élevée à la plus basse :

> Argument CLI `--spec` > modèle `specs` de capacité > modèle `specs` de configuration
> Argument CLI `--exclude` > modèle `exclude` de configuration > modèle `exclude` de capacité

Si seul le paramètre de configuration est donné, il sera utilisé pour toutes les capacités. Cependant, si vous définissez le modèle au niveau de la capacité, il sera utilisé à la place du modèle de configuration. Enfin, tout