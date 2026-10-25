---
id: customreporter
title: Reporter personnalisé
description: "Créez un reporter personnalisé pour le testrunner WDIO basé sur @wdio/reporter, gérez les événements du runner et publiez-le sur NPM."
---

Vous pouvez écrire votre propre reporter personnalisé pour le test runner WDIO, adapté à vos besoins. Et c'est facile !

Tout ce que vous avez à faire est de créer un module node qui hérite du package `@wdio/reporter`, afin qu'il puisse recevoir les messages du test.

La configuration de base devrait ressembler à ceci :

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * faire en sorte que le reporter écrive dans le flux de sortie par défaut
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Pour utiliser ce reporter, il vous suffit de l'assigner à la propriété `reporter` dans votre configuration.


Votre fichier `wdio.conf.js` devrait ressembler à ceci :

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * utiliser la classe de reporter importée
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * utiliser le chemin absolu vers le reporter
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

Vous pouvez également publier le reporter sur NPM afin que tout le monde puisse l'utiliser. Nommez le package comme les autres reporters `wdio-<reportername>-reporter`, et ajoutez-lui des mots-clés comme `wdio` ou `wdio-reporter`.

## Gestionnaire d'événements

Vous pouvez enregistrer un gestionnaire d'événements pour plusieurs événements déclenchés pendant les tests. Tous les gestionnaires suivants recevront des payloads contenant des informations utiles sur l'état et la progression actuels.

La structure de ces objets payload dépend de l'événement, et elle est unifiée entre les frameworks (Mocha, Jasmine et Cucumber). Une fois que vous avez implémenté un reporter personnalisé, il devrait fonctionner pour tous les frameworks.

La liste suivante contient toutes les méthodes possibles que vous pouvez ajouter à votre classe de reporter :

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onRunnerStart() {}
    onBeforeCommand() {}
    onAfterCommand() {}
    onSuiteStart() {}
    onHookStart() {}
    onHookEnd() {}
    onTestStart() {}
    onTestPass() {}
    onTestFail() {}
    onTestSkip() {}
    onTestEnd() {}
    onContextEnd() {} // expérimental, voir "Reporters et tests parallèles"
    onSuiteEnd() {}
    onRunnerEnd() {}
}
```

Les noms des méthodes sont assez explicites.

Pour afficher quelque chose lors d'un événement donné, utilisez la méthode `this.write(...)`, fournie par la classe parente `WDIOReporter`. Elle diffuse le contenu soit vers `stdout`, soit vers un fichier de log (selon les options du reporter).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Notez que vous ne pouvez en aucun cas différer l'exécution des tests.

Tous les gestionnaires d'événements doivent exécuter des routines synchrones (sinon vous rencontrerez des conditions de concurrence).

N'oubliez pas de consulter la [section d'exemples](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) où vous trouverez un exemple de reporter personnalisé qui affiche le nom de l'événement pour chaque événement.

Si vous avez implémenté un reporter personnalisé qui pourrait être utile à la communauté, n'hésitez pas à faire une Pull Request afin que nous puissions mettre le reporter à disposition du public !

De plus, si vous exécutez le testrunner WDIO via l'interface `Launcher`, vous ne pouvez pas appliquer un reporter personnalisé sous forme de fonction comme suit :

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // ceci ne fonctionnera PAS, car CustomReporter n'est pas sérialisable
    reporters: ['dot', CustomReporter]
})
```

## Reporters et tests parallèles

Avec les [tests parallèles dans un fichier de spec](./ParallelTests.md), les tests d'un même fichier de spec se chevauchent : le `onTestStart` d'un test peut survenir avant le `onTestEnd` d'un autre, et les commandes de différents tests s'entremêlent. `WDIOReporter` gère cela pour vous. En mode parallèle, les événements du framework transportent deux champs supplémentaires :

- `parentUid` sur `suite:start`, `hook:start` et `test:start` : l'uid de la suite propriétaire (`null` pour une suite de niveau supérieur). Le reporter ajoute la suite, le hook ou le test à cette suite, et non à la suite qui a démarré en dernier.
- `contextId` sur les événements de test et de commande : le contexte de navigation du test. Le reporter ajoute la sortie des commandes au test qui s'est exécuté dans ce contexte.

Les statistiques des tests, hooks et suites conservent ces champs lorsque l'événement les contient : dans `onTestEnd(test)`, `test.contextId` est le contexte de navigation du test et `test.parentUid` l'uid de sa suite. Sans le mode parallèle, les statistiques n'ont pas ces propriétés.

Les arborescences `suites`, `tests` et `hooks` du reporter sont donc correctes. Si votre reporter conserve son propre état, indexez-le par l'`uid` du test ou de la suite au lieu de suivre un seul test courant.

Les sorties qui arrivent sans événement, comme la sortie console ou un événement `process.emit` personnalisé, n'ont pas d'`uid`. Appelez `this.getContextTest()` pour obtenir le test dont le contexte de navigation les a écrites. En mode parallèle, elle renvoie le test qui a démarré en dernier dans ce contexte, y compris après son `test:end`, lorsque ses hooks `afterEach` et `after` s'exécutent, et `undefined` lorsqu'aucun test n'a démarré dans ce contexte ou après son `context:end` ; sans le mode parallèle, elle renvoie le test qui a démarré en dernier. Les hooks `before()` d'un test parallèle s'exécutent avant son `test:start`, donc aucun test ne possède encore le contexte ; `this.getContextId()` renvoie l'identifiant brut du contexte, qui reste le même pendant toute la durée du test.

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestStart(test) {
        this.write(`start ${test.uid} ${test.title}\n`)
    }
    onTestEnd(test) {
        this.write(`end   ${test.uid} ${test.state}\n`)
    }
}
```

Les hooks `afterEach` et `after` d'un test parallèle s'exécutent après son `test:end`. Pour savoir quand un contexte est terminé, utilisez `onContextEnd(payload)`. Elle est appelée après le dernier hook du test, et le contexte n'envoie plus aucun événement ensuite. Le payload contient `cid`, `specs`, `uid` (le dernier test du contexte) et `contextId`. C'est là que vous devez fermer ou écrire ce que votre reporter conserve pour ce contexte.

:::warning Expérimental

`context:end` et `onContextEnd` sont expérimentaux : seul le `parallelMode` de Mocha les envoie pour le moment, et le nom ainsi que le payload peuvent changer.

:::

## Attendre jusqu'à `isSynchronised`

Si votre reporter doit exécuter des opérations asynchrones pour rapporter les données (par exemple, l'envoi de fichiers de log ou d'autres ressources), vous pouvez surcharger la méthode `isSynchronised` dans votre reporter personnalisé afin que le runner WebdriverIO attende que vous ayez tout traité. Un exemple est visible dans le [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts) :

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * surcharger la méthode isSynchronised
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * synchroniser les fichiers de log
     */
    sync () {
        // ...
        request({
            method: 'POST',
            uri: this.options.sourceAddress,
            body: logLines
        }, (err, resp) => {
            // ...
            /**
             * supprimer les logs transférés du bucket de logs
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

De cette façon, le runner attendra que toutes les informations de log soient envoyées.

## Publier le reporter sur NPM

Pour rendre le reporter plus facile à utiliser et à découvrir par la communauté WebdriverIO, veuillez suivre ces recommandations :

* Les services doivent utiliser cette convention de nommage : `wdio-*-reporter`
* Utilisez les mots-clés NPM : `wdio-plugin`, `wdio-reporter`
* L'entrée `main` doit `export` une instance du reporter
* Exemple de reporter : [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Suivre le modèle de nommage recommandé permet d'ajouter les services par leur nom :

```js
// Ajouter wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Ajouter le service publié au CLI WDIO et à la documentation

Nous apprécions vraiment chaque nouveau plugin qui pourrait aider d'autres personnes à exécuter de meilleurs tests ! Si vous avez créé un tel plugin, pensez à l'ajouter à notre CLI et à notre documentation pour qu'il soit plus facile à trouver.

Veuillez soumettre une pull request avec les modifications suivantes :

- ajoutez votre service à la liste des [reporters pris en charge](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) dans le module CLI
- enrichissez la [liste des reporters](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json) pour ajouter votre documentation à la page officielle de Webdriver.io