---
id: spec-reporter
title: Rapporteur Spec
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-spec-reporter/README.md
---


> Un plugin WebdriverIO pour générer des rapports dans le style spec.

![Spec Reporter](/img/spec.png "Spec Reporter")

## Installation

La façon la plus simple est de garder `@wdio/spec-reporter` comme devDependency dans votre `package.json`, via :

```sh
npm install @wdio/spec-reporter --save-dev
```

Les instructions sur comment installer `WebdriverIO` peuvent être trouvées [ici](https://webdriver.io/docs/gettingstarted).

## Configuration

Le code suivant montre la configuration par défaut du test runner wdio. Ajoutez simplement `'spec'` comme rapporteur
au tableau.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'spec'],
  // ...
};
```

## Options du Rapporteur Spec
### symbols
Fournissez des symboles personnalisés pour les tests `passed`, `failed` et/ou `skipped`

Type: `object`
Default: `{passed: '✓', skipped: '-', failed: '✖'}`

#### Exemple
```js
[
  "spec",
  {
    symbols: {
      passed: '[PASS]',
      failed: '[FAIL]',
    },
  },
]
```

### sauceLabsSharableLinks
Par défaut, les résultats de test dans Sauce Labs ne peuvent être consultés que par un membre de la même équipe, pas par un membre
d'une équipe différente. Cette option activera les [liens partageables](https://docs.saucelabs.com/test-results/sharing-test-results/#building-sharable-links)
par défaut, ce qui signifie que tous les tests exécutés dans Sauce Labs peuvent être consultés par tout le monde.
Ajoutez simplement `sauceLabsSharableLinks: false`, comme indiqué ci-dessous, dans les options du rapporteur pour désactiver cette fonctionnalité.

Type: `boolean`
Default: `true`

#### Exemple
```js
[
  "spec",
  {
    sauceLabsSharableLinks: false,
  },
]
```

### onlyFailures
N'imprimer que les résultats des spécifications en échec.

Type: `boolean`
Default: `false`

#### Exemple
```js
[
  "spec",
  {
    onlyFailures: true,
  },
]
```

### addConsoleLogs
Définir à `true` pour afficher les logs de console des étapes dans le rapport final

Type: `boolean`
Default: `false`

```js
[
  "spec",
  {
    addConsoleLogs: true,
  },
]
```

### realtimeReporting
Définir à `true` pour afficher l'état des tests en temps réel plutôt qu'à la fin de l'exécution

Type: `boolean`
Default: `false`

```js
[
  "spec",
  {
    realtimeReporting: true,
  },
]
```

### showPreface
Définir à `false` pour désactiver le préface `[ MutliRemoteBrowser ... ]` dans les rapports.

Type: `boolean`
Default: `true`

```js
[
  "spec",
  {
    showPreface: false,
  },
]
```

Avec cette option définie à `false`, vous verrez la sortie comme :
```
Running: loremipsum (v50) on Windows 10
Session ID: foobar

» /foo/bar/loo.e2e.js
Foo test
   green ✓ foo
   green ✓ bar

» /bar/foo/loo.e2e.js
Bar test
   green ✓ some test
   red ✖ a failed test
   red ✖ a failed test with no stack
```

et avec `true` (par défaut) chaque ligne sera préfixée avec le préface :
```
[loremipsum 50 Windows 10 #0-0] Running: loremipsum (v50) on Windows 10
[loremipsum 50 Windows 10 #0-0] Session ID: foobar
[loremipsum 50 Windows 10 #0-0]
[loremipsum 50 Windows 10 #0-0] » /foo/bar/loo.e2e.js
[loremipsum 50 Windows 10 #0-0] Foo test
[loremipsum 50 Windows 10 #0-0]    green ✓ foo
[loremipsum 50 Windows 10 #0-0]    green ✓ bar
[loremipsum 50 Windows 10 #0-0]
[loremipsum 50 Windows 10 #0-0] » /bar/foo/loo.e2e.js
[loremipsum 50 Windows 10 #0-0] Bar test
[loremipsum 50 Windows 10 #0-0]    green ✓ some test
[loremipsum 50 Windows 10 #0-0]    red ✖ a failed test
[loremipsum 50 Windows 10 #0-0]    red ✖ a failed test with no stack
[loremipsum 50 Windows 10 #0-0]
```

### color
Définir à `true` pour afficher une sortie colorée dans le terminal

Type: `boolean`
Default: `true`

```js
[
  "spec",
  {
    color: true,
  },
]
```

## Options d'Environnement

Il existe certaines options que vous pouvez définir via des variables d'environnement :

### `FORCE_COLOR`

Si défini à true, par exemple via `FORCE_COLOR=0 npx wdio run wdio.conf.js`, toute la coloration du terminal sera désactivée.