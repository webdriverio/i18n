---
id: customservices
title: Services personnalisés
---

Vous pouvez écrire votre propre service personnalisé pour le lanceur de tests WDIO afin de répondre parfaitement à vos besoins.

Les services sont des modules complémentaires créés pour une logique réutilisable afin de simplifier les tests, gérer votre suite de tests et intégrer les résultats. Les services ont accès à tous les mêmes [hooks](/docs/configurationfile) disponibles dans le fichier `wdio.conf.js`.

Il existe deux types de services qui peuvent être définis : un service lanceur qui n'a accès qu'aux hooks `onPrepare`, `onWorkerStart`, `onWorkerEnd` et `onComplete` qui ne sont exécutés qu'une seule fois par exécution de test, et un service worker qui a accès à tous les autres hooks et est exécuté pour chaque worker. Notez que vous ne pouvez pas partager des variables (globales) entre les deux types de services car les services worker s'exécutent dans un processus (worker) différent.

Un service lanceur peut être défini comme suit :

```js
export default class CustomLauncherService {
    // Si un hook renvoie une promesse, WebdriverIO attendra que cette promesse soit résolue pour continuer.
    async onPrepare(config, capabilities) {
        // TODO: quelque chose avant que tous les workers ne démarrent
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: quelque chose après l'arrêt des workers
    }

    // méthodes de service personnalisées ...
}
```

Tandis qu'un service worker devrait ressembler à ceci :

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` contient toutes les options spécifiques au service
     * par exemple, si défini comme suit :
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
     * cet objet browser est passé ici pour la première fois
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: quelque chose avant que tous les tests ne soient exécutés, par exemple :
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: quelque chose après que tous les tests sont exécutés
    }

    beforeTest(test, context) {
        // TODO: quelque chose avant chaque test Mocha/Jasmine
    }

    beforeScenario(test, context) {
        // TODO: quelque chose avant chaque scénario Cucumber
    }

    // autres hooks ou méthodes de service personnalisées ...
}
```

Il est recommandé de stocker l'objet browser via le paramètre passé dans le constructeur. Enfin, exposez les deux types de workers comme suit :

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Si vous utilisez TypeScript et souhaitez vous assurer que les paramètres des méthodes de hook sont typés correctement, vous pouvez définir votre classe de service comme suit :

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

## Gestion des erreurs de service

Une erreur lancée pendant un hook de service sera enregistrée tandis que le lanceur continue. Si un hook dans votre service est critique pour la configuration ou le démontage du lanceur de test, le `SevereServiceError` exposé depuis le package `webdriverio` peut être utilisé pour arrêter le lanceur.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: quelque chose de critique pour la configuration avant le lancement de tous les workers

        throw new SevereServiceError('Quelque chose s\'est mal passé.')
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

Pour rendre les services plus faciles à consommer et à découvrir par la communauté WebdriverIO, veuillez suivre ces recommandations :

* Les services devraient utiliser cette convention de nommage : `wdio-*-service`
* Utilisez les mots-clés NPM : `wdio-plugin`, `wdio-service`
* L'entrée `main` devrait `export` une instance du service
* Exemples de services : [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

Suivre le modèle de nommage recommandé permet d'ajouter des services par leur nom :

```js
// Ajouter wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### Ajouter un service publié à la CLI WDIO et à la documentation

Nous apprécions vraiment chaque nouveau plugin qui pourrait aider d'autres personnes à exécuter de meilleurs tests ! Si vous avez créé un tel plugin, veuillez envisager de l'ajouter à notre CLI et à notre documentation pour le rendre plus facile à trouver.

Veuillez soumettre une pull request avec les modifications suivantes :

- ajoutez votre service à la liste des [services pris en charge](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) dans le module CLI
- améliorez la [liste des services](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json) pour ajouter votre documentation à la page officielle de Webdriver.io