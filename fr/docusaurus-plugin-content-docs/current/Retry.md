---
id: retry
title: Relancer les tests instables
description: "Relancez les tests instables dans Mocha, Jasmine ou Cucumber, réexécutez des fichiers de spécifications entiers et exécutez un test spécifique plusieurs fois pour détecter l'instabilité."
---

Vous pouvez réexécuter avec le testrunner WebdriverIO certains tests qui s'avèrent instables en raison de problèmes comme un réseau peu fiable ou des conditions de concurrence. (Cependant, il n'est pas recommandé d'augmenter simplement le nombre de réexécutions si les tests deviennent instables !)

## Réexécuter des suites dans Mocha

Depuis la version 3 de Mocha, vous pouvez réexécuter des suites de tests entières (tout ce qui se trouve dans un bloc `describe`). Si vous utilisez Mocha, vous devriez privilégier ce mécanisme de réexécution plutôt que l'implémentation de WebdriverIO, qui ne permet de réexécuter que certains blocs de test (tout ce qui se trouve dans un bloc `it`). Pour utiliser la méthode `this.retries()`, le bloc de suite `describe` doit utiliser une fonction non liée `function(){}` au lieu d'une fonction fléchée `() => {}`, comme décrit dans la [documentation de Mocha](https://mochajs.org/#arrow-functions). Avec Mocha, vous pouvez également définir un nombre de réexécutions pour toutes les spécifications en utilisant `mochaOpts.retries` dans votre `wdio.conf.js`.

Voici un exemple :

```js
describe('retries', function () {
    // Réessayer tous les tests de cette suite jusqu'à 4 fois
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Spécifier que ce test ne doit être réessayé que jusqu'à 2 fois
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Réexécuter des tests individuels dans Jasmine ou Mocha

Pour réexécuter un bloc de test spécifique, il suffit d'indiquer le nombre de réexécutions comme dernier paramètre après la fonction du bloc de test :

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
     * spécification exécutée au maximum 4 fois (1 exécution réelle + 3 réexécutions)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // renvoie le nombre de réexécutions
        // ...
    }, 3)
})
```

Cela fonctionne également pour les hooks :

```js
describe('my flaky app', () => {
    /**
     * hook exécuté au maximum 2 fois (1 exécution réelle + 1 réexécution)
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
     * spécification exécutée au maximum 4 fois (1 exécution réelle + 3 réexécutions)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // renvoie le nombre de réexécutions
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

Cela fonctionne également pour les hooks :

```js
describe('my flaky app', () => {
    /**
     * hook exécuté au maximum 2 fois (1 exécution réelle + 1 réexécution)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Si vous utilisez Jasmine, le deuxième paramètre est réservé au délai d'expiration (timeout). Pour appliquer un paramètre de réexécution, vous devez définir le timeout à sa valeur par défaut `jasmine.DEFAULT_TIMEOUT_INTERVAL`, puis indiquer votre nombre de réexécutions.

</TabItem>
</Tabs>

Ce mécanisme de réexécution ne permet de réessayer que des hooks ou des blocs de test individuels. Si votre test est accompagné d'un hook servant à configurer votre application, ce hook n'est pas exécuté. [Mocha propose](https://mochajs.org/#retry-tests) des réexécutions de tests natives qui offrent ce comportement, contrairement à Jasmine. Vous pouvez accéder au nombre de réexécutions effectuées dans le hook `afterTest`.

Avec Mocha, toutes les tentatives d'un test ou d'un hook partagent son timeout : Mocha démarre le minuteur une seule fois et fait échouer le test lorsque l'ensemble des tentatives dure plus longtemps que le timeout. Ce mécanisme réessaie donc un test ou un hook qui échoue (par exemple une assertion ou une commande en échec), mais pas un test ou un hook qui atteint son timeout, car une tentative ultérieure ne pourrait pas se terminer à temps. L'erreur de timeout d'un test ou d'un hook avec les réexécutions WebdriverIO indique la tentative qui a expiré, par exemple `(WDIO attempt 2/3)`. Pour les tests susceptibles d'expirer, utilisez [les réexécutions de Mocha](https://mochajs.org/#retry-tests) (`this.retries()`) : Mocha exécute chaque tentative avec un timeout complet.

## Réexécution dans Cucumber

### Réexécuter des suites complètes dans Cucumber

Pour cucumber >=6, vous pouvez fournir l'option de configuration [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) ainsi qu'un paramètre optionnel `retryTagFilter` afin que tous vos scénarios en échec, ou certains d'entre eux, bénéficient de tentatives supplémentaires jusqu'à leur réussite.

### Réexécuter des définitions d'étapes dans Cucumber

Pour définir un nombre de réexécutions pour certaines définitions d'étapes, appliquez-leur simplement une option de réexécution, comme ceci :

```js
export default function () {
    /**
     * définition d'étape exécutée au maximum 3 fois (1 exécution réelle + 2 réexécutions)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

Les réexécutions ne peuvent être définies que dans votre fichier de définitions d'étapes, jamais dans votre fichier de fonctionnalités (feature file).

## Ajouter des réexécutions par fichier de spécification

Auparavant, seules les réexécutions au niveau des tests et des suites étaient disponibles, ce qui convient dans la plupart des cas.

Mais dans les tests qui impliquent un état (par exemple sur un serveur ou dans une base de données), cet état peut rester invalide après le premier échec. Les réexécutions suivantes risquent alors de n'avoir aucune chance de réussir, en raison de l'état invalide dans lequel elles démarreraient.

Une nouvelle instance `browser` est créée pour chaque fichier de spécification, ce qui en fait un endroit idéal pour mettre en place et configurer tout autre état (serveur, bases de données). Les réexécutions à ce niveau signifient que l'ensemble du processus de configuration sera simplement répété, comme s'il s'agissait d'un nouveau fichier de spécification.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * Nombre de fois où réessayer le fichier de spécification entier lorsqu'il échoue dans son ensemble
     */
    specFileRetries: 1,
    /**
     * Délai en secondes entre les tentatives de réexécution du fichier de spécification
     */
    specFileRetriesDelay: 0,
    /**
     * Les fichiers de spécification réessayés sont insérés au début de la file d'attente et réessayés immédiatement
     */
    specFileRetriesDeferred: false
}
```

## Exécuter un test spécifique plusieurs fois

Cela permet d'éviter l'introduction de tests instables dans une base de code. En ajoutant l'option CLI `--repeat`, les spécifications ou suites indiquées seront exécutées N fois. Lorsque vous utilisez ce flag CLI, le flag `--spec` ou `--suite` doit également être spécifié.

Lors de l'ajout de nouveaux tests à une base de code, en particulier via un processus CI/CD, les tests peuvent réussir et être fusionnés, mais devenir instables par la suite. Cette instabilité peut provenir de nombreux facteurs, comme des problèmes réseau, la charge du serveur, la taille de la base de données, etc. Utiliser le flag `--repeat` dans votre processus CI/CD peut aider à détecter ces tests instables avant qu'ils ne soient fusionnés dans la base de code principale.

Une stratégie consiste à exécuter vos tests normalement dans votre processus CI/CD, mais si vous introduisez un nouveau test, vous pouvez alors exécuter une autre série de tests avec la nouvelle spécification indiquée dans `--spec` accompagnée de `--repeat`, afin que le nouveau test soit exécuté x fois. Si le test échoue ne serait-ce qu'une seule fois, il ne sera pas fusionné et il faudra examiner la raison de son échec.

```sh
# Ceci exécutera la spécification example.e2e.js 5 fois
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```