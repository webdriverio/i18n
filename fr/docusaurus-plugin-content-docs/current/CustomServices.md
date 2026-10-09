---
id: customservices
title: Services personnalisés
description: "Écrivez un service de lancement ou de worker personnalisé pour le testrunner WDIO à l'aide des hooks du testrunner, gérez les erreurs des services et publiez-le sur NPM."
---

Vous pouvez écrire votre propre service personnalisé pour le test runner WDIO afin de l'adapter à vos besoins.

Les services sont des extensions créées pour une logique réutilisable afin de simplifier les tests, gérer votre suite de tests et intégrer les résultats. Les services ont accès à tous les mêmes [hooks](/docs/configurationfile) disponibles dans le `wdio.conf.js`.

Il existe deux types de services pouvant être définis : un service de lancement (launcher) qui n'a accès qu'aux hooks `onPrepare`, `onWorkerStart`, `onWorkerEnd` et `onComplete`, qui ne sont exécutés qu'une seule fois par exécution de tests, et un service de worker qui a accès à tous les autres hooks et qui est exécuté pour chaque worker. Notez que vous ne pouvez pas partager de variables (globales) entre ces deux types de services, car les services de worker s'exécutent dans un processus (worker) différent.

Un service de lancement peut être défini comme suit :

```js
export default class CustomLauncherService {
    // Si un hook renvoie une promesse, WebdriverIO attendra que cette promesse soit résolue pour continuer.
    async onPrepare(config, capabilities) {
        // TODO: quelque chose avant le lancement de tous les workers
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: quelque chose après l'arrêt des workers
    }

    // méthodes de service personnalisées ...
}
```

Tandis qu'un service de worker devrait ressembler à ceci :

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` contient toutes les options spécifiques au service
     * par ex. si défini comme suit :
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * le paramètre `serviceOptions` sera : `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * l'objet browser est transmis ici pour la première fois
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: quelque chose avant l'exécution de tous les tests, par ex. :
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: quelque chose après l'exécution de tous les tests
    }

    beforeTest(test, context) {
        // TODO: quelque chose avant chaque exécution de test Mocha/Jasmine
    }

    beforeScenario(test, context) {
        // TODO: quelque chose avant chaque exécution de scénario Cucumber
    }

    // autres hooks ou méthodes de service personnalisées ...
}
```

Il est recommandé de stocker l'objet browser via le paramètre transmis dans le constructeur. Enfin, exposez les deux types de workers comme suit :

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Si vous utilisez TypeScript et souhaitez vous assurer que les paramètres des méthodes de hook sont typés de manière sûre, vous pouvez définir votre classe de service comme suit :

```ts
import type { Capabilities, Options, Services } from '@wdio/types'

export default class CustomWorkerService implements Services.ServiceInstance {
    constructor (
        private _options: MyServiceOptions,
        private _capabilities: Capabilities.RemoteCapability,
        private _config: WebdriverIO.Config,
    ) {
        // ...
    }

    // ...
}
```

## Services de worker conditionnels

Un service peut décider si son code de worker est nécessaire pour une exécution de tests ou pour un worker particulier. Il existe deux vérifications optionnelles :

| Vérification | Où elle s'exécute | Arguments | Effet du retour de `false` |
| --- | --- | --- | --- |
| Export de module nommé `shouldLoad` | Processus de lancement, après l'importation du module de service | Configuration, toutes les capabilities configurées | Le module de service n'est importé dans aucun worker. Son service de lancement s'exécute toujours. |
| Méthode statique `shouldRun` du service de worker | Processus worker, avant la construction du service | Options du service, capabilities de ce worker, configuration | Le service de worker n'est pas construit, donc aucun de ses hooks ne s'exécute dans ce worker. |

Utilisez `shouldLoad(config, capabilities)` pour les modules de service configurés par nom ou par chemin. Il s'agit d'une décision à l'échelle du package : si le même service apparaît plusieurs fois avec des options différentes, le résultat s'applique à toutes ces entrées. Par exemple, un service personnalisé qui nécessite des identifiants distants pourrait exporter :

```js
// wdio-custom-service/index.js
import CustomLauncherService from './launcher.js'
import CustomWorkerService from './service.js'

export function shouldLoad(config, capabilities) {
    return Boolean(config.user && config.key)
}

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Utilisez `static shouldRun(options, capabilities, config)` pour décider séparément pour chaque entrée de service et chaque worker. Cela fonctionne également avec les classes de service personnalisées transmises directement dans `services`. Par exemple, ce service peut restreindre ses hooks à un navigateur configuré :

```js
// wdio-custom-service/service.js
export default class CustomWorkerService {
    static shouldRun(options, capabilities, config) {
        return !options.browserName || options.browserName === capabilities.browserName
    }

    before(capabilities, specs, browser) {
        // S'exécute uniquement dans les workers ayant passé shouldRun.
    }
}
```

Avec `services: [['custom', { browserName: 'chrome' }]]`, ce service de worker n'est construit que pour les capabilities Chrome, à condition que la vérification `shouldLoad` du package l'autorise également. Le worker doit importer le module de service pour appeler `shouldRun` ; renvoyer `false` depuis cette méthode n'empêche pas cette importation et n'affecte pas le service de lancement.

Les deux vérifications peuvent renvoyer un booléen ou une promesse de booléen. WebdriverIO attend chaque résultat, et seul `false` désactive le chargement ou la construction. Les services sans ces vérifications conservent leur comportement existant. Les objets de service déjà construits contenant des hooks restent inchangés.

Si l'une des vérifications lève une exception ou est rejetée, l'initialisation du service échoue avec une erreur identifiant le service. Cela diffère des erreurs levées par les hooks de service, décrites ci-dessous.

## Gestion des erreurs de service

Une erreur levée pendant un hook de service sera journalisée tandis que le runner continue. Si un hook de votre service est critique pour la configuration ou le nettoyage du test runner, la `SevereServiceError` exposée par le package `webdriverio` peut être utilisée pour arrêter le runner.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: quelque chose de critique pour la configuration avant le lancement de tous les workers

        throw new SevereServiceError('Something went wrong.')
    }

    // méthodes de service personnalisées ...
}
```

## Importer un service depuis un module

La seule chose à faire maintenant pour utiliser ce service est de l'assigner à la propriété `services`.

Modifiez votre fichier `wdio.conf.js` pour qu'il ressemble à ceci :

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * utiliser la classe de service importée
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * utiliser le chemin absolu vers le service
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## Publier un service sur NPM

Pour rendre les services plus faciles à utiliser et à découvrir par la communauté WebdriverIO, veuillez suivre ces recommandations :

* Les services doivent utiliser cette convention de nommage : `wdio-*-service`
* Utilisez les mots-clés NPM : `wdio-plugin`, `wdio-service`
* L'entrée `main` doit `export` une instance du service
* Exemples de services : [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

Suivre le modèle de nommage recommandé permet d'ajouter les services par leur nom :

```js
// Ajouter wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### Ajouter un service publié au CLI WDIO et à la documentation

Nous apprécions vraiment chaque nouveau plugin qui pourrait aider d'autres personnes à exécuter de meilleurs tests ! Si vous avez créé un tel plugin, pensez à l'ajouter à notre CLI et à notre documentation pour qu'il soit plus facile à trouver.

Veuillez soumettre une pull request avec les modifications suivantes :

- ajoutez votre service à la liste des [services pris en charge](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) dans le module CLI
- complétez la [liste des services](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/services.json) pour ajouter votre documentation à la page officielle de Webdriver.io