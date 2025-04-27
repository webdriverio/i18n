---
id: debugging
title: Débogage
---

Le débogage est beaucoup plus difficile lorsque plusieurs processus lancent des dizaines de tests dans plusieurs navigateurs.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Pour commencer, il est extrêmement utile de limiter le parallélisme en définissant `maxInstances` à `1`, et en ciblant uniquement les spécifications et les navigateurs qui doivent être déboguées.

Dans `wdio.conf`:

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

Dans de nombreux cas, vous pouvez utiliser [`browser.debug()`](/docs/api/browser/debug) pour mettre en pause votre test et inspecter le navigateur.

Votre interface en ligne de commande passera également en mode REPL. Ce mode vous permet de jouer avec les commandes et les éléments de la page. En mode REPL, vous pouvez accéder à l'objet `browser`&mdash;ou aux fonctions `$` et `$$`&mdash;comme vous pouvez le faire dans vos tests.

Lorsque vous utilisez `browser.debug()`, vous devrez probablement augmenter le délai d'attente du test runner pour éviter que celui-ci ne fasse échouer le test parce qu'il prend trop de temps. Par exemple:

Dans `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Voir [timeouts](timeouts) pour plus d'informations sur la façon de le faire avec d'autres frameworks.

Pour continuer avec les tests après le débogage, utilisez le raccourci `^C` dans le shell ou la commande `.exit`.
## Configuration dynamique

Notez que `wdio.conf.js` peut contenir du Javascript. Comme vous ne voulez probablement pas changer définitivement votre valeur de timeout à 1 jour, il peut être souvent utile de modifier ces paramètres depuis la ligne de commande en utilisant une variable d'environnement.

En utilisant cette technique, vous pouvez modifier dynamiquement la configuration:

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

Vous pouvez ensuite préfixer la commande `wdio` avec le drapeau `debug`:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...et déboguer votre fichier de spécification avec les DevTools!

## Débogage avec Visual Studio Code (VSCode)

Si vous souhaitez déboguer vos tests avec des points d'arrêt dans la dernière version de VSCode, vous avez deux options pour démarrer le débogueur, dont l'option 1 est la méthode la plus simple:
 1. attacher automatiquement le débogueur
 2. attacher le débogueur à l'aide d'un fichier de configuration

### VSCode Toggle Auto Attach

Vous pouvez attacher automatiquement le débogueur en suivant ces étapes dans VSCode:
 - Appuyez sur CMD + Shift + P (Linux et Macos) ou CTRL + Shift + P (Windows)
 - Tapez "attach" dans le champ de saisie
 - Sélectionnez "Debug: Toggle Auto Attach"
 - Sélectionnez "Only With Flag"

 C'est tout! Maintenant, lorsque vous exécutez vos tests (n'oubliez pas que vous aurez besoin du drapeau --inspect défini dans votre configuration comme indiqué précédemment), il démarrera automatiquement le débogueur et s'arrêtera au premier point d'arrêt qu'il atteint.

### Fichier de configuration VSCode

Il est possible d'exécuter tous les fichiers de spécification ou des fichiers sélectionnés. La ou les configurations de débogage doivent être ajoutées à `.vscode/launch.json`, pour déboguer une spécification sélectionnée, ajoutez la configuration suivante:
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

Pour exécuter tous les fichiers de spécification, supprimez `"--spec", "${file}"` de `"args"`

Exemple: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

Informations supplémentaires: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Repl dynamique avec Atom

Si vous êtes un hacker [Atom](https://atom.io/), vous pouvez essayer [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) par [@kurtharriger](https://github.com/kurtharriger) qui est un repl dynamique qui vous permet d'exécuter des lignes de code individuelles dans Atom. Regardez [cette](https://www.youtube.com/watch?v=kdM05ChhLQE) vidéo YouTube pour voir une démo.

## Débogage avec WebStorm / Intellij
Vous pouvez créer une configuration de débogage node.js comme ceci:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Regardez cette [vidéo YouTube](https://www.youtube.com/watch?v=Qcqnmle6Wu8) pour plus d'informations sur la façon de créer une configuration.

## Débogage des tests instables

Les tests instables peuvent être vraiment difficiles à déboguer, voici donc quelques conseils sur la façon dont vous pouvez essayer de reproduire localement le résultat instable que vous avez obtenu dans votre CI.

### Réseau
Pour déboguer l'instabilité liée au réseau, utilisez la commande [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Vitesse de rendu
Pour déboguer l'instabilité liée à la vitesse de l'appareil, utilisez la commande [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Cela ralentira le rendu de vos pages, ce qui peut être causé par de nombreuses choses comme l'exécution de plusieurs processus dans votre CI qui pourraient ralentir vos tests.
```js
await browser.throttleCPU(4)
```

### Vitesse d'exécution des tests

Si vos tests ne semblent pas être affectés, il est possible que WebdriverIO soit plus rapide que la mise à jour du framework frontend / navigateur. Cela se produit lors de l'utilisation d'assertions synchrones car WebdriverIO n'a plus la possibilité de réessayer ces assertions. Voici quelques exemples de code qui peuvent échouer à cause de cela:
```js
expect(elementList.length).toEqual(7) // la liste peut ne pas être remplie au moment de l'assertion
expect(await elem.getText()).toEqual('this button was clicked 3 times') // le texte peut ne pas être encore mis à jour au moment de l'assertion, ce qui entraîne une erreur ("this button was clicked 2 times" ne correspond pas à "this button was clicked 3 times" attendu)
expect(await elem.isDisplayed()).toBe(true) // peut ne pas être encore affiché
```
Pour résoudre ce problème, des assertions asynchrones doivent être utilisées à la place. Les exemples ci-dessus ressembleraient à ceci:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
En utilisant ces assertions, WebdriverIO attendra automatiquement que la condition corresponde. Lors de l'assertion de texte, cela signifie que l'élément doit exister et que le texte doit être égal à la valeur attendue.
Nous en parlons davantage dans notre [Guide des meilleures pratiques](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions).