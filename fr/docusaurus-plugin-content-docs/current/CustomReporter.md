---
id: customreporter
title: Rapporteur Personnalisé
---

Vous pouvez écrire votre propre rapporteur personnalisé pour le test runner WDIO qui est adapté à vos besoins. Et c'est facile !

Tout ce que vous avez à faire est de créer un module Node qui hérite du package `@wdio/reporter`, afin qu'il puisse recevoir des messages du test.

La configuration de base devrait ressembler à ceci :

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * make reporter to write to the output stream by default
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Pour utiliser ce rapporteur, il vous suffit de l'assigner à la propriété `reporter` dans votre configuration.


Votre fichier `wdio.conf.js` devrait ressembler à ceci :

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * use imported reporter class
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * use absolute path to reporter
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

Vous pouvez également publier le rapporteur sur NPM pour que tout le monde puisse l'utiliser. Nommez le package comme les autres rapporteurs `wdio-<reportername>-reporter`, et étiquetez-le avec des mots-clés comme `wdio` ou `wdio-reporter`.

## Gestionnaire d'événements

Vous pouvez enregistrer un gestionnaire d'événements pour plusieurs événements qui sont déclenchés pendant les tests. Tous les gestionnaires suivants recevront des charges utiles avec des informations utiles sur l'état actuel et la progression.

La structure de ces objets de charge utile dépend de l'événement et est unifiée à travers les frameworks (Mocha, Jasmine et Cucumber). Une fois que vous implémentez un rapporteur personnalisé, il devrait fonctionner pour tous les frameworks.

La liste suivante contient toutes les méthodes possibles que vous pouvez ajouter à votre classe de rapporteur :

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

Pour imprimer quelque chose lors d'un certain événement, utilisez la méthode `this.write(...)`, qui est fournie par la classe parente `WDIOReporter`. Elle envoie le contenu soit vers `stdout`, soit vers un fichier journal (selon les options du rapporteur).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Notez que vous ne pouvez pas différer l'exécution du test de quelque manière que ce soit.

Tous les gestionnaires d'événements doivent exécuter des routines synchrones (sinon vous rencontrerez des conditions de course).

N'hésitez pas à consulter la [section d'exemples](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) où vous pouvez trouver un exemple de rapporteur personnalisé qui imprime le nom de l'événement pour chaque événement.

Si vous avez implémenté un rapporteur personnalisé qui pourrait être utile pour la communauté, n'hésitez pas à faire une Pull Request afin que nous puissions rendre le rapporteur disponible pour le public !

De plus, si vous exécutez le testrunner WDIO via l'interface `Launcher`, vous ne pouvez pas appliquer un rapporteur personnalisé en tant que fonction comme suit :

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // this will NOT work, because CustomReporter is not serializable
    reporters: ['dot', CustomReporter]
})
```

## Attendre jusqu'à `isSynchronised`

Si votre rapporteur doit exécuter des opérations asynchrones pour rapporter les données (par exemple, le téléchargement de fichiers journaux ou d'autres ressources), vous pouvez surcharger la méthode `isSynchronised` dans votre rapporteur personnalisé pour que le runner WebdriverIO attende jusqu'à ce que vous ayez tout calculé. Un exemple de cela peut être vu dans le [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts) :

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * overwrite isSynchronised method
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * sync log files
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
             * remove transferred logs from log bucket
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

De cette façon, le runner attendra jusqu'à ce que toutes les informations du journal soient téléchargées.

## Publier le rapporteur sur NPM

Pour rendre le rapporteur plus facile à utiliser et à découvrir par la communauté WebdriverIO, veuillez suivre ces recommandations :

* Les services devraient utiliser cette convention de nommage : `wdio-*-reporter`
* Utilisez les mots-clés NPM : `wdio-plugin`, `wdio-reporter`
* L'entrée `main` devrait `export` une instance du rapporteur
* Exemple de rapporteur : [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Suivre le modèle de nommage recommandé permet d'ajouter des services par leur nom :

```js
// Add wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Ajouter un service publié à WDIO CLI et à la documentation

Nous apprécions vraiment chaque nouveau plugin qui pourrait aider d'autres personnes à exécuter de meilleurs tests ! Si vous avez créé un tel plugin, veuillez envisager de l'ajouter à notre CLI et à notre documentation pour le rendre plus facile à trouver.

Veuillez soumettre une pull request avec les modifications suivantes :

- ajoutez votre service à la liste des [rapporteurs pris en charge](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) dans le module CLI
- améliorez la [liste des rapporteurs](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/reporters.json) pour ajouter votre documentation à la page officielle de Webdriver.io