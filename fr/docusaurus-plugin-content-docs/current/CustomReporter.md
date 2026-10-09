---
id: customreporter
title: Reporter personnalisé
description: "Créez un reporter personnalisé pour le testrunner WDIO à partir de @wdio/reporter, gérez les événements du runner et publiez-le sur NPM."
---

Vous pouvez écrire votre propre reporter personnalisé pour le test runner WDIO, adapté à vos besoins. Et c'est facile !

Tout ce que vous avez à faire est de créer un module node qui hérite du package `@wdio/reporter`, afin qu'il puisse recevoir les messages provenant du test.

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

Vous pouvez enregistrer un gestionnaire d'événements pour plusieurs événements déclenchés pendant les tests. Tous les gestionnaires suivants recevront des payloads contenant des informations utiles sur l'état actuel et la progression.

La structure de ces objets payload dépend de l'événement et est unifiée entre les frameworks (Mocha, Jasmine et Cucumber). Une fois que vous avez implémenté un reporter personnalisé, il devrait fonctionner pour tous les frameworks.

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

Tous les gestionnaires d'événements doivent exécuter des routines synchrones (sinon vous rencontrerez des situations de concurrence).

N'oubliez pas de consulter la [section d'exemples](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) où vous trouverez un exemple de reporter personnalisé qui affiche le nom de chaque événement.

Si vous avez implémenté un reporter personnalisé qui pourrait être utile à la communauté, n'hésitez pas à faire une Pull Request afin que nous puissions rendre le reporter accessible au public !

De plus, si vous exécutez le testrunner WDIO via l'interface `Launcher`, vous ne pouvez pas appliquer un reporter personnalisé sous forme de fonction comme suit :

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // cela ne fonctionnera PAS, car CustomReporter n'est pas sérialisable
    reporters: ['dot', CustomReporter]
})
```

## Attendre jusqu'à `isSynchronised`

Si votre reporter doit exécuter des opérations asynchrones pour rapporter les données (par exemple, le téléversement de fichiers de log ou d'autres ressources), vous pouvez surcharger la méthode `isSynchronised` dans votre reporter personnalisé pour que le runner WebdriverIO attende que vous ayez tout traité. Un exemple est visible dans le [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts) :

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
             * retirer les logs transférés du bucket de logs
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

Ainsi, le runner attendra que toutes les informations de log soient téléversées.

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

### Ajouter le service publié à la CLI WDIO et à la documentation

Nous apprécions vraiment chaque nouveau plugin qui pourrait aider d'autres personnes à exécuter de meilleurs tests ! Si vous avez créé un tel plugin, pensez à l'ajouter à notre CLI et à notre documentation pour qu'il soit plus facile à trouver.

Veuillez ouvrir une pull request avec les modifications suivantes :

- ajoutez votre service à la liste des [reporters pris en charge](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) dans le module CLI
- complétez la [liste des reporters](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json) pour ajouter votre documentation à la page officielle de Webdriver.io