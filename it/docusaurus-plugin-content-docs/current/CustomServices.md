---
id: customservices
title: Servizi Personalizzati
---

Puoi scrivere i tuoi servizi personalizzati per il test runner WDIO per adattarli alle tue esigenze.

I servizi sono componenti aggiuntivi creati per logiche riutilizzabili al fine di semplificare i test, gestire la tua suite di test e integrare i risultati. I servizi hanno accesso a tutti gli stessi [hook](/docs/configurationfile) disponibili nel file `wdio.conf.js`.

Esistono due tipi di servizi che possono essere definiti: un servizio launcher che ha accesso solo agli hook `onPrepare`, `onWorkerStart`, `onWorkerEnd` e `onComplete` che vengono eseguiti solo una volta per ogni esecuzione di test, e un servizio worker che ha accesso a tutti gli altri hook e viene eseguito per ogni worker. Nota che non puoi condividere variabili (globali) tra entrambi i tipi di servizi poiché i servizi worker vengono eseguiti in un processo (worker) diverso.

Un servizio launcher può essere definito come segue:

```js
export default class CustomLauncherService {
    // Se un hook restituisce una promessa, WebdriverIO attenderà che quella promessa sia risolta per continuare.
    async onPrepare(config, capabilities) {
        // TODO: qualcosa prima che tutti i worker vengano avviati
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: qualcosa dopo che i worker si sono spenti
    }

    // metodi di servizio personalizzati ...
}
```

Mentre un servizio worker dovrebbe apparire così:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` contiene tutte le opzioni specifiche del servizio
     * ad esempio, se definito come segue:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * il parametro `serviceOptions` sarà: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * questo oggetto browser viene passato qui per la prima volta
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: qualcosa prima che tutti i test vengano eseguiti, ad esempio:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: qualcosa dopo che tutti i test sono stati eseguiti
    }

    beforeTest(test, context) {
        // TODO: qualcosa prima di ogni test Mocha/Jasmine
    }

    beforeScenario(test, context) {
        // TODO: qualcosa prima di ogni scenario Cucumber
    }

    // altri hook o metodi di servizio personalizzati ...
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

## Gestione degli errori del servizio

Un errore generato durante un hook del servizio verrà registrato mentre il runner continuerà. Se un hook nel tuo servizio è critico per la configurazione o la chiusura del test runner, è possibile utilizzare `SevereServiceError` esposto dal pacchetto `webdriverio` per fermare il runner.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: qualcosa di critico per la configurazione prima che tutti i worker vengano avviati

        throw new SevereServiceError('Qualcosa è andato storto.')
    }

    // metodi di servizio personalizzati ...
}
```

## Importare un servizio da un modulo

L'unica cosa da fare ora per utilizzare questo servizio è assegnarlo alla proprietà `services`.

Modifica il tuo file `wdio.conf.js` in modo che appaia così:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * usa la classe di servizio importata
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * usa il percorso assoluto al servizio
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## Pubblicare il servizio su NPM

Per rendere i servizi più facili da utilizzare e scoprire dalla comunità WebdriverIO, si prega di seguire queste raccomandazioni:

* I servizi dovrebbero utilizzare questa convenzione di denominazione: `wdio-*-service`
* Utilizzare le parole chiave NPM: `wdio-plugin`, `wdio-service`
* L'entry point `main` dovrebbe `export` un'istanza del servizio
* Servizi di esempio: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

Seguendo il modello di denominazione consigliato, i servizi possono essere aggiunti per nome:

```js
// Aggiunge wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### Aggiungere il servizio pubblicato alla CLI WDIO e alla documentazione

Apprezziamo molto ogni nuovo plugin che potrebbe aiutare altre persone a eseguire test migliori! Se hai creato un tale plugin, considera di aggiungerlo alla nostra CLI e documentazione per renderlo più facile da trovare.

Si prega di aprire una pull request con le seguenti modifiche:

- aggiungi il tuo servizio all'elenco dei [servizi supportati](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) nel modulo CLI
- migliora la [lista dei servizi](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json) per aggiungere la tua documentazione alla pagina ufficiale di Webdriver.io