---
id: debugging
title: Débogage
description: "Déboguez les tests WebdriverIO avec browser.debug, les points d'arrêt VS Code ou WebStorm, des stratégies pour les tests instables, ainsi que le profilage CPU et mémoire (heap)."
---

Le débogage est nettement plus difficile lorsque plusieurs processus lancent des dizaines de tests dans plusieurs navigateurs.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Pour commencer, il est extrêmement utile de limiter le parallélisme en définissant `maxInstances` sur `1`, et de cibler uniquement les specs et navigateurs qui doivent être débogués.

Dans `wdio.conf` :

```js
export const config = {
    // ...
    maxInstances: 1,
    specs: [
        '**/myspec.spec.js'
    ],
    capabilities: [{
        browserName: 'firefox'
    }],
    // ...
}
```

## La commande Debug

Dans de nombreux cas, vous pouvez utiliser [`browser.debug()`](/docs/api/browser/debug) pour mettre votre test en pause et inspecter le navigateur.

Votre interface en ligne de commande passera également en mode REPL. Ce mode vous permet d'expérimenter avec des commandes et des éléments de la page. En mode REPL, vous pouvez accéder à l'objet `browser`&mdash;ou aux fonctions `$` et `$$`&mdash;comme vous le feriez dans vos tests.

Lorsque vous utilisez `browser.debug()`, vous devrez probablement augmenter le délai d'expiration (timeout) du lanceur de tests afin d'éviter que celui-ci ne fasse échouer le test parce qu'il prend trop de temps. Par exemple :

Dans `wdio.conf` :

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Consultez [timeouts](timeouts) pour plus d'informations sur la façon de procéder avec d'autres frameworks.

Pour poursuivre les tests après le débogage, utilisez dans le terminal le raccourci `^C` ou la commande `.exit`.

### Mettre en pause pour un agent de codage (`--debug=agent`)

`wdio run --debug=agent` augmente le délai d'expiration du framework à 24 heures et met le worker en pause lorsqu'une spec appelle `await browser.debug()` ou lorsqu'un test échoue. L'exécution affiche une ligne comme celle-ci :

```text
Paused in cart.e2e.ts › adds a blue t-shirt. Inspect with `wdio session -s debug-0-0 snapshot`, continue with `wdio session -s debug-0-0 resume`.
```

Inspectez le navigateur en pause avec [`wdio session`](/docs/session/debug) (`snapshot`, `exec`, …), puis utilisez `wdio session -s debug-0-0 resume` pour continuer. `wdio session -s debug-0-0 close` fait échouer le test en pause avec `Session closed from wdio session`. Le nom de la session est `debug-<cid>` (`debug-0-0` pour le premier worker). La suite de ce flux de travail est décrite dans la section [WebdriverIO Session](/docs/session).
## Configuration dynamique

Notez que `wdio.conf.js` peut contenir du Javascript. Comme vous ne souhaitez probablement pas modifier définitivement votre délai d'expiration à 1 jour, il peut souvent être utile de modifier ces paramètres depuis la ligne de commande à l'aide d'une variable d'environnement.

Grâce à cette technique, vous pouvez modifier dynamiquement la configuration :

```js
const debug = process.env.DEBUG
const defaultCapabilities = ...
const defaultTimeoutInterval = ...
const defaultSpecs = ...

export const config = {
    // ...
    maxInstances: debug ? 1 : 100,
    capabilities: debug ? [{ browserName: 'chrome' }] : defaultCapabilities,
    execArgv: debug ? ['--inspect'] : [],
    jasmineOpts: {
      defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : defaultTimeoutInterval
    }
    // ...
}
```

Vous pouvez ensuite préfixer la commande `wdio` avec le flag `debug` :

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...et déboguer votre fichier de spec avec les DevTools !

## Débogage avec Visual Studio Code (VSCode)

Si vous souhaitez déboguer vos tests avec des points d'arrêt dans la dernière version de VSCode, vous disposez de deux options pour démarrer le débogueur, l'option 1 étant la méthode la plus simple :
 1. attacher automatiquement le débogueur
 2. attacher le débogueur à l'aide d'un fichier de configuration

### VSCode Toggle Auto Attach

Vous pouvez attacher automatiquement le débogueur en suivant ces étapes dans VSCode :
 - Appuyez sur CMD + Shift + P (Linux et Macos) ou CTRL + Shift + P (Windows)
 - Tapez « attach » dans le champ de saisie
 - Sélectionnez « Debug: Toggle Auto Attach »
 - Sélectionnez « Only With Flag »

 C'est tout ! Désormais, lorsque vous exécutez vos tests (n'oubliez pas que le flag --inspect doit être défini dans votre configuration comme indiqué précédemment), le débogueur démarrera automatiquement et s'arrêtera au premier point d'arrêt rencontré.

### Fichier de configuration VSCode

Il est possible d'exécuter tous les fichiers de spec ou seulement ceux sélectionnés. La ou les configurations de débogage doivent être ajoutées à `.vscode/launch.json`. Pour déboguer la spec sélectionnée, ajoutez la configuration suivante :
```
{
    "name": "run select spec",
    "type": "node",
    "request": "launch",
    "args": ["wdio.conf.js", "--spec", "${file}"],
    "cwd": "${workspaceFolder}",
    "autoAttachChildProcesses": true,
    "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
    "console": "integratedTerminal",
    "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "${workspaceFolder}/lib/**/*.js",
        "<node_internals>/**/*.js"
    ]
},
```

Pour exécuter tous les fichiers de spec, supprimez `"--spec", "${file}"` de `"args"`

Exemple : [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

Informations complémentaires : https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## REPL dynamique avec Atom

Si vous êtes un hacker [Atom](https://atom.io/), vous pouvez essayer [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) de [@kurtharriger](https://github.com/kurtharriger), un REPL dynamique qui vous permet d'exécuter des lignes de code individuelles dans Atom. Regardez [cette](https://www.youtube.com/watch?v=kdM05ChhLQE) vidéo YouTube pour voir une démo.

## Débogage avec WebStorm / Intellij
Vous pouvez créer une configuration de débogage node.js comme ceci :
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Regardez cette [vidéo YouTube](https://www.youtube.com/watch?v=Qcqnmle6Wu8) pour plus d'informations sur la création d'une configuration.

## Débogage des tests instables (flaky)

Les tests instables peuvent être très difficiles à déboguer. Voici donc quelques conseils pour essayer de reproduire localement le résultat instable obtenu dans votre CI.

### Réseau
Pour déboguer une instabilité liée au réseau, utilisez la commande [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Vitesse de rendu
Pour déboguer une instabilité liée à la vitesse de l'appareil, utilisez la commande [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Cela ralentira le rendu de vos pages, ce qui peut avoir de nombreuses causes, comme l'exécution de plusieurs processus dans votre CI susceptibles de ralentir vos tests.
```js
await browser.throttleCPU(4)
```

### Vitesse d'exécution des tests

Si vos tests ne semblent pas affectés, il est possible que WebdriverIO soit plus rapide que la mise à jour du framework frontend / navigateur. Cela se produit lors de l'utilisation d'assertions synchrones, car WebdriverIO n'a alors plus aucune possibilité de réessayer ces assertions. Voici quelques exemples de code qui peuvent échouer pour cette raison :
```js
expect(elementList.length).toEqual(7) // la liste n'est peut-être pas encore remplie au moment de l'assertion
expect(await elem.getText()).toEqual('this button was clicked 3 times') // le texte n'est peut-être pas encore mis à jour au moment de l'assertion, ce qui provoque une erreur ("this button was clicked 2 times" ne correspond pas à la valeur attendue "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // l'élément n'est peut-être pas encore affiché
```
Pour résoudre ce problème, il convient d'utiliser plutôt des assertions asynchrones. Les exemples ci-dessus ressembleraient à ceci :
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
Avec ces assertions, WebdriverIO attendra automatiquement que la condition soit remplie. Lors de l'assertion d'un texte, cela signifie que l'élément doit exister et que le texte doit être égal à la valeur attendue.
Nous en parlons davantage dans notre [Guide des bonnes pratiques](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions).

## Profilage des performances

WebdriverIO vous permet de capturer des profils de performance de vos tests afin d'identifier les goulots d'étranglement dans l'exécution de vos tests ou les fuites de mémoire. Cette fonctionnalité utilise les capacités de profilage natives de Node.js.

### Profilage CPU

Pour capturer un profil CPU, vous pouvez utiliser le flag CLI `--cpu-prof` ou définir `cpuProf: true` dans votre configuration.

```bash
npx wdio run wdio.conf.js --cpu-prof
```

Cela générera un fichier `.cpuprofile` dans le répertoire `./profiles` (par défaut) pour chaque processus worker. Vous pouvez charger ce fichier dans **Chrome DevTools > Performance > Load Profile** pour analyser l'exécution.

### Profilage de la mémoire (heap)

Pour capturer un profil de la mémoire (heap), utilisez le flag CLI `--heap-prof` ou définissez `heapProf: true` dans votre configuration.

```bash
npx wdio run wdio.conf.js --heap-prof
```

Cela génère un fichier `.heapprofile` dans le répertoire `./profiles` (en utilisant le profileur de heap par échantillonnage). Vous pouvez le charger dans **Chrome DevTools > Memory > Load** pour analyser l'utilisation de la mémoire.

### Métriques de temps

Lorsque le profilage est activé, WebdriverIO enregistre également automatiquement des métriques de temps pour les phases de préparation (setup), d'exécution et de nettoyage (teardown) de votre test, ce qui vous aide à comprendre où le temps est consommé.

```
📊 Performance Metrics:
────────────────────────────────────────
  Setup:     1.25s
  Execution: 3.42s
  Teardown:  0.15s
```