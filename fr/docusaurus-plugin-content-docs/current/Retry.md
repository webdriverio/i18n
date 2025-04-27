---
id: retry
title: Réessayer les Tests Instables
---

Vous pouvez relancer certains tests avec le testrunner WebdriverIO qui s'avèrent instables en raison de problèmes comme un réseau instable ou des conditions de concurrence. (Cependant, il n'est pas recommandé d'augmenter simplement le taux de relance si les tests deviennent instables !)

## Relancer des suites dans Mocha

Depuis la version 3 de Mocha, vous pouvez relancer des suites de tests entières (tout ce qui se trouve à l'intérieur d'un bloc `describe`). Si vous utilisez Mocha, vous devriez privilégier ce mécanisme de relance plutôt que l'implémentation WebdriverIO qui ne vous permet de relancer que certains blocs de test (tout ce qui se trouve dans un bloc `it`). Pour utiliser la méthode `this.retries()`, le bloc de suite `describe` doit utiliser une fonction non liée `function(){}` au lieu d'une fonction fléchée `() => {}`, comme décrit dans la [documentation Mocha](https://mochajs.org/#arrow-functions). Avec Mocha, vous pouvez également définir un nombre de tentatives pour toutes les spécifications en utilisant `mochaOpts.retries` dans votre `wdio.conf.js`.

Voici un exemple :

```js
describe('retries', function () {
    // Retry all tests in this suite up to 4 times
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Specify this test to only retry up to 2 times
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Relancer des tests individuels dans Jasmine ou Mocha

Pour relancer un certain bloc de test, vous pouvez simplement appliquer le nombre de relances comme dernier paramètre après la fonction du bloc de test :

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
  ]
}>
<TabItem value="mocha">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, 3)
})
```

Cela fonctionne également pour les hooks :

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, 1)

    // ...
})
```

</TabItem>
<TabItem value="jasmine">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

Cela fonctionne également pour les hooks :

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Si vous utilisez Jasmine, le deuxième paramètre est réservé au délai d'attente. Pour appliquer un paramètre de relance, vous devez définir le délai d'attente à sa valeur par défaut `jasmine.DEFAULT_TIMEOUT_INTERVAL` puis appliquer votre nombre de relances.

</TabItem>
</Tabs>

Ce mécanisme de relance permet uniquement de relancer des hooks ou des blocs de test individuels. Si votre test est accompagné d'un hook pour configurer votre application, ce hook n'est pas exécuté. [Mocha offre](https://mochajs.org/#retry-tests) des relances de test natives qui fournissent ce comportement, tandis que Jasmine ne le fait pas. Vous pouvez accéder au nombre de relances exécutées dans le hook `afterTest`.

## Relancer dans Cucumber

### Relancer des suites complètes dans Cucumber

Pour cucumber >=6, vous pouvez fournir l'option de configuration [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) avec un paramètre `retryTagFilter` optionnel pour que tous ou certains de vos scénarios défaillants obtiennent des relances supplémentaires jusqu'à ce qu'ils réussissent. Pour que cette fonctionnalité fonctionne, vous devez définir `scenarioLevelReporter` sur `true`.

### Relancer des définitions d'étapes dans Cucumber

Pour définir un taux de relance pour certaines définitions d'étapes, appliquez simplement une option de relance, comme :

```js
export default function () {
    /**
     * step definition that runs max 3 times (1 actual run + 2 reruns)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

Les relances ne peuvent être définies que dans votre fichier de définitions d'étapes, jamais dans votre fichier de fonctionnalités.

## Ajouter des relances sur la base d'un fichier de spécification

Auparavant, seules les relances au niveau du test et de la suite étaient disponibles, ce qui convient dans la plupart des cas.

Mais dans tous les tests impliquant un état (comme sur un serveur ou dans une base de données), l'état peut rester invalide après le premier échec du test. Toute relance ultérieure peut n'avoir aucune chance de réussir, en raison de l'état invalide avec lequel elle commencerait.

Une nouvelle instance de `browser` est créée pour chaque fichier de spécification, ce qui en fait un endroit idéal pour s'accrocher et configurer d'autres états (serveur, bases de données). Les relances à ce niveau signifient que l'ensemble du processus de configuration sera simplement répété, comme s'il s'agissait d'un nouveau fichier de spécification.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * The number of times to retry the entire specfile when it fails as a whole
     */
    specFileRetries: 1,
    /**
     * Delay in seconds between the spec file retry attempts
     */
    specFileRetriesDelay: 0,
    /**
     * Retried specfiles are inserted at the beginning of the queue and retried immediately
     */
    specFileRetriesDeferred: false
}
```

## Exécuter un test spécifique plusieurs fois

Ceci permet d'éviter que des tests instables ne soient introduits dans une base de code. En ajoutant l'option cli `--repeat`, les spécifications ou suites spécifiées seront exécutées N fois. Lors de l'utilisation de ce drapeau cli, le drapeau `--spec` ou `--suite` doit également être spécifié.

Lors de l'ajout de nouveaux tests à une base de code, en particulier via un processus CI/CD, les tests pourraient passer et être fusionnés mais devenir instables plus tard. Cette instabilité peut provenir de nombreux facteurs comme des problèmes de réseau, la charge du serveur, la taille de la base de données, etc. L'utilisation du drapeau `--repeat` dans votre processus CD/CD peut aider à détecter ces tests instables avant qu'ils ne soient fusionnés dans une base de code principale.

Une stratégie à utiliser consiste à exécuter vos tests normalement dans votre processus CI/CD, mais si vous introduisez un nouveau test, vous pouvez alors exécuter un autre ensemble de tests avec la nouvelle spécification spécifiée dans `--spec` ainsi que `--repeat` pour qu'il exécute le nouveau test x fois. Si le test échoue à un moment donné, il ne sera pas fusionné et il faudra examiner pourquoi il a échoué.

```sh
# This will run the example.e2e.js spec 5 times
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```