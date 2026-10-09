---
id: retry
title: Relancer les tests instables
description: "Relancez les tests instables dans Mocha, Jasmine ou Cucumber, réexécutez des fichiers de spécification entiers et exécutez un test spécifique plusieurs fois pour détecter l'instabilité."
---

Vous pouvez réexécuter avec le testrunner WebdriverIO certains tests qui s'avèrent instables en raison, par exemple, d'un réseau peu fiable ou de conditions de concurrence. (Cependant, il n'est pas recommandé d'augmenter simplement le taux de réexécution si les tests deviennent instables !)

## Réexécuter des suites dans Mocha

Depuis la version 3 de Mocha, vous pouvez réexécuter des suites de tests entières (tout ce qui se trouve dans un bloc `describe`). Si vous utilisez Mocha, vous devriez privilégier ce mécanisme de relance plutôt que l'implémentation de WebdriverIO, qui ne permet de réexécuter que certains blocs de test (tout ce qui se trouve dans un bloc `it`). Pour utiliser la méthode `this.retries()`, le bloc de suite `describe` doit utiliser une fonction non liée `function(){}` au lieu d'une fonction fléchée `() => {}`, comme décrit dans la [documentation de Mocha](https://mochajs.org/#arrow-functions). Avec Mocha, vous pouvez également définir un nombre de relances pour toutes les spécifications à l'aide de `mochaOpts.retries` dans votre `wdio.conf.js`.

Voici un exemple :

```js
describe('retries', function () {
    // Relancer tous les tests de cette suite jusqu'à 4 fois
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Indiquer que ce test ne doit être relancé que 2 fois au maximum
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Réexécuter des tests individuels dans Jasmine ou Mocha

Pour réexécuter un bloc de test donné, il suffit d'indiquer le nombre de réexécutions comme dernier paramètre après la fonction du bloc de test :

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
     * spécification exécutée 4 fois maximum (1 exécution réelle + 3 réexécutions)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // renvoie le nombre de relances
        // ...
    }, 3)
})
```

Cela fonctionne également pour les hooks :

```js
describe('my flaky app', () => {
    /**
     * hook exécuté 2 fois maximum (1 exécution réelle + 1 réexécution)
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
     * spécification exécutée 4 fois maximum (1 exécution réelle + 3 réexécutions)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // renvoie le nombre de relances
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

Cela fonctionne également pour les hooks :

```js
describe('my flaky app', () => {
    /**
     * hook exécuté 2 fois maximum (1 exécution réelle + 1 réexécution)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Si vous utilisez Jasmine, le deuxième paramètre est réservé au délai d'expiration (timeout). Pour appliquer un paramètre de relance, vous devez définir le timeout à sa valeur par défaut `jasmine.DEFAULT_TIMEOUT_INTERVAL`, puis indiquer votre nombre de relances.

</TabItem>
</Tabs>

Ce mécanisme de relance permet uniquement de relancer des hooks ou des blocs de test individuels. Si votre test est accompagné d'un hook servant à configurer votre application, ce hook n'est pas exécuté. [Mocha propose](https://mochajs.org/#retry-tests) des relances de tests natives qui offrent ce comportement, ce qui n'est pas le cas de Jasmine. Vous pouvez accéder au nombre de relances effectuées dans le hook `afterTest`.

## Réexécution dans Cucumber

### Réexécuter des suites complètes dans Cucumber

Pour cucumber >=6, vous pouvez fournir l'option de configuration [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) ainsi qu'un paramètre optionnel `retryTagFilter` afin que tous vos scénarios en échec, ou seulement certains d'entre eux, bénéficient de relances supplémentaires jusqu'à leur réussite. Pour que cette fonctionnalité fonctionne, vous devez définir `scenarioLevelReporter` sur `true`.

### Réexécuter des définitions d'étapes dans Cucumber

Pour définir un taux de réexécution pour certaines définitions d'étapes, il suffit de leur appliquer une option de relance, comme ceci :

```js
export default function () {
    /**
     * définition d'étape exécutée 3 fois maximum (1 exécution réelle + 2 réexécutions)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

Les réexécutions ne peuvent être définies que dans votre fichier de définitions d'étapes, jamais dans votre fichier de fonctionnalités (feature file).

## Ajouter des relances par fichier de spécification

Auparavant, seules les relances au niveau des tests et des suites étaient disponibles, ce qui convient dans la plupart des cas.

Mais dans les tests qui impliquent un état (par exemple sur un serveur ou dans une base de données), cet état peut rester invalide après le premier échec d'un test. Les relances suivantes peuvent alors n'avoir aucune chance de réussir, en raison de l'état invalide dans lequel elles démarreraient.

Une nouvelle instance de `browser` est créée pour chaque fichier de spécification, ce qui en fait un endroit idéal pour se brancher et configurer tout autre état (serveur, bases de données). Les relances à ce niveau signifient que l'ensemble du processus de configuration sera simplement répété, exactement comme s'il s'agissait d'un nouveau fichier de spécification.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * Le nombre de fois où relancer l'intégralité du fichier de spécification lorsqu'il échoue dans son ensemble
     */
    specFileRetries: 1,
    /**
     * Délai en secondes entre les tentatives de relance du fichier de spécification
     */
    specFileRetriesDelay: 0,
    /**
     * Les fichiers de spécification relancés sont insérés au début de la file d'attente et relancés immédiatement
     */
    specFileRetriesDeferred: false
}
```

## Exécuter un test spécifique plusieurs fois

Cela permet d'éviter l'introduction de tests instables dans une base de code. En ajoutant l'option CLI `--repeat`, les spécifications ou suites indiquées seront exécutées N fois. Lorsque vous utilisez ce flag CLI, le flag `--spec` ou `--suite` doit également être spécifié.

Lorsque de nouveaux tests sont ajoutés à une base de code, notamment via un processus CI/CD, ils peuvent réussir et être fusionnés, puis devenir instables par la suite. Cette instabilité peut provenir de nombreux facteurs, comme des problèmes réseau, la charge du serveur, la taille de la base de données, etc. Utiliser le flag `--repeat` dans votre processus CI/CD peut aider à détecter ces tests instables avant qu'ils ne soient fusionnés dans la base de code principale.

Une stratégie possible consiste à exécuter vos tests normalement dans votre processus CI/CD, mais, si vous introduisez un nouveau test, à lancer ensuite une autre série de tests avec la nouvelle spécification indiquée dans `--spec` accompagnée de `--repeat`, afin que le nouveau test soit exécuté x fois. Si le test échoue ne serait-ce qu'une seule fois, il ne sera pas fusionné et il faudra examiner la raison de son échec.

```sh
# Ceci exécutera la spécification example.e2e.js 5 fois
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```