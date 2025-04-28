---
id: customservices
title: Servizi Personalizzati
---

Puoi scrivere i tuoi servizi personalizzati per il test runner WDIO per adattarli alle tue esigenze.

I servizi sono componenti aggiuntivi creati per logiche riutilizzabili per semplificare i test, gestire la tua suite di test e integrare i risultati. I servizi hanno accesso a tutti gli stessi [hook](/docs/configurationfile) disponibili nel file `wdio.conf.js`.

Ci sono due tipi di servizi che possono essere definiti: un servizio launcher che ha accesso solo agli hook `onPrepare`, `onWorkerStart`, `onWorkerEnd` e `onComplete` che vengono eseguiti solo una volta per ogni esecuzione di test, e un servizio worker che ha accesso a tutti gli altri hook e viene eseguito per ogni worker. Nota che non puoi condividere variabili (globali) tra entrambi i tipi di servizi poiché i servizi worker vengono eseguiti in un processo (worker) diverso.

Un servizio launcher può essere definito come segue:

```js
export default class CustomLauncherService {
    // If a hook returns a promise, WebdriverIO will wait until that promise is resolved to continue.
    async onPrepare(config, capabilities) {
        // TODO: something before all workers launch
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: something after the workers shutdown
    }

    // custom service methods ...
}
```

Mentre un servizio worker dovrebbe apparire così:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` contains all options specific to the service
     * e.g. if defined as follows:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * the `serviceOptions` parameter will be: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * this browser object is passed in here for the first time
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: something before all tests are run, e.g.:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: something after all tests are run
    }

    beforeTest(test, context) {
        // TODO: something before each Mocha/Jasmine test run
    }

    beforeScenario(test, context) {
        // TODO: something before each Cucumber scenario run
    }

    // other hooks or custom service methods ...
}
```

Si consiglia di memorizzare l'oggetto browser attraverso il parametro passato nel costruttore. Infine, esponi entrambi i tipi di worker come segue:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Se stai utilizzando TypeScript e vuoi assicurarti che i parametri dei metodi hook siano type safe, puoi definire la tua classe di servizio come segue:

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

## Gestione degli Errori del Servizio

Un errore lanciato durante un hook del servizio verrà registrato mentre il runner continua. Se un hook nel tuo servizio è fondamentale per la configurazione o la chiusura del test runner, è possibile utilizzare `SevereServiceError` esposto dal pacchetto `webdriverio` per arrestare il runner.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: something critical for setup before all workers launch

        throw new SevereServiceError('Something went wrong.')
    }

    // custom service methods ...
}
```

## Importare Servizio da Modulo

L'unica cosa da fare ora per utilizzare questo servizio è assegnarlo alla proprietà `services`.

Modifica il tuo file `wdio.conf.js` in questo modo:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * use imported service class
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * use absolute path to service
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## Pubblicare il Servizio su NPM

Per rendere i servizi più facili da utilizzare e da scoprire per la comunità WebdriverIO, segui queste raccomandazioni:

* I servizi dovrebbero utilizzare questa convenzione di denominazione: `wdio-*-service`
* Usa le parole chiave NPM: `wdio-plugin`, `wdio-service`
* La voce `main` dovrebbe `export` un'istanza del servizio
* Servizi di esempio: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

Seguendo il modello di denominazione consigliato, i servizi possono essere aggiunti per nome:

```js
// Add wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### Aggiungi Servizio Pubblicato a WDIO CLI e Docs

Apprezziamo molto ogni nuovo plugin che può aiutare altre persone a eseguire test migliori! Se hai creato un tale plugin, considera di aggiungerlo alla nostra CLI e alla documentazione per renderlo più facile da trovare.

Effettua una pull request con le seguenti modifiche:

- aggiungi il tuo servizio all'elenco dei [servizi supportati](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) nel modulo CLI
- migliora l'[elenco dei servizi](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json) per aggiungere la tua documentazione alla pagina ufficiale di Webdriver.io