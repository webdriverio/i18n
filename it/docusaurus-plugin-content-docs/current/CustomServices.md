---
id: customservices
title: Servizi Personalizzati
description: "Scrivi un servizio launcher o worker personalizzato per il testrunner WDIO utilizzando gli hook del testrunner, gestisci gli errori del servizio e pubblicalo su NPM."
---

Puoi scrivere il tuo servizio personalizzato per il test runner WDIO per adattarlo alle tue esigenze.

I servizi sono componenti aggiuntivi creati per logiche riutilizzabili, al fine di semplificare i test, gestire la tua suite di test e integrare i risultati. I servizi hanno accesso a tutti gli stessi [hook](/docs/configurationfile) disponibili nel `wdio.conf.js`.

Esistono due tipi di servizi che possono essere definiti: un servizio launcher che ha accesso solo agli hook `onPrepare`, `onWorkerStart`, `onWorkerEnd` e `onComplete`, che vengono eseguiti una sola volta per ogni esecuzione dei test, e un servizio worker che ha accesso a tutti gli altri hook e viene eseguito per ogni worker. Nota che non è possibile condividere variabili (globali) tra i due tipi di servizi, poiché i servizi worker vengono eseguiti in un processo (worker) diverso.

Un servizio launcher può essere definito come segue:

```js
export default class CustomLauncherService {
    // Se un hook restituisce una promise, WebdriverIO attenderà che quella promise venga risolta per continuare.
    async onPrepare(config, capabilities) {
        // TODO: qualcosa prima dell'avvio di tutti i worker
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: qualcosa dopo l'arresto dei worker
    }

    // metodi personalizzati del servizio ...
}
```

Mentre un servizio worker dovrebbe essere simile a questo:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` contiene tutte le opzioni specifiche del servizio
     * ad es. se definito come segue:
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
     * l'oggetto browser viene passato qui per la prima volta
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: qualcosa prima dell'esecuzione di tutti i test, ad es.:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: qualcosa dopo l'esecuzione di tutti i test
    }

    beforeTest(test, context) {
        // TODO: qualcosa prima di ogni esecuzione di test Mocha/Jasmine
    }

    beforeScenario(test, context) {
        // TODO: qualcosa prima di ogni esecuzione di scenario Cucumber
    }

    // altri hook o metodi personalizzati del servizio ...
}
```

Si consiglia di memorizzare l'oggetto browser tramite il parametro passato nel costruttore. Infine, esponi entrambi i tipi di worker come segue:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Se stai usando TypeScript e vuoi assicurarti che i parametri dei metodi hook siano type safe, puoi definire la classe del tuo servizio come segue:

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

## Servizi Worker Condizionali

Un servizio può decidere se il suo codice worker è necessario per un'esecuzione dei test o per un determinato worker. Esistono due controlli opzionali:

| Controllo | Dove viene eseguito | Argomenti | Effetto della restituzione di `false` |
| --- | --- | --- | --- |
| Export nominato del modulo `shouldLoad` | Processo launcher, dopo l'importazione del modulo del servizio | Configurazione, tutte le capability configurate | Il modulo del servizio non viene importato in nessun worker. Il suo servizio launcher viene comunque eseguito. |
| Metodo statico del servizio worker `shouldRun` | Processo worker, prima della costruzione del servizio | Opzioni del servizio, capability di quel worker, configurazione | Il servizio worker non viene costruito, quindi nessuno dei suoi hook viene eseguito in quel worker. |

Usa `shouldLoad(config, capabilities)` per i moduli di servizio configurati tramite nome o percorso. Si tratta di una decisione a livello di pacchetto: se lo stesso servizio compare più volte con opzioni diverse, il risultato si applica a tutte quelle voci. Ad esempio, un servizio personalizzato che richiede credenziali remote potrebbe esportare:

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

Usa `static shouldRun(options, capabilities, config)` per decidere separatamente per ogni voce di servizio e per ogni worker. Funziona anche con classi di servizio personalizzate passate direttamente in `services`. Ad esempio, questo servizio può limitare i propri hook a un browser configurato:

```js
// wdio-custom-service/service.js
export default class CustomWorkerService {
    static shouldRun(options, capabilities, config) {
        return !options.browserName || options.browserName === capabilities.browserName
    }

    before(capabilities, specs, browser) {
        // Viene eseguito solo nei worker che hanno superato shouldRun.
    }
}
```

Con `services: [['custom', { browserName: 'chrome' }]]`, questo servizio worker viene costruito solo per le capability di Chrome, a condizione che anche il controllo `shouldLoad` del pacchetto lo consenta. Il worker deve importare il modulo del servizio per chiamare `shouldRun`; restituire `false` da questo metodo non impedisce tale importazione né influisce sul servizio launcher.

Entrambi i controlli possono restituire un booleano o una promise di un booleano. WebdriverIO attende ciascun risultato, e solo `false` disabilita il caricamento o la costruzione. I servizi senza questi controlli mantengono il loro comportamento esistente. Gli oggetti di servizio già costruiti contenenti hook rimangono invariati.

Se uno dei due controlli genera un'eccezione o viene rifiutato, l'inizializzazione del servizio fallisce con un errore che identifica il servizio. Questo differisce dagli errori generati dagli hook dei servizi, descritti di seguito.

## Gestione degli Errori del Servizio

Un Error generato durante un hook del servizio verrà registrato nei log mentre il runner continua l'esecuzione. Se un hook nel tuo servizio è critico per la configurazione o la chiusura del test runner, è possibile utilizzare `SevereServiceError`, esposto dal pacchetto `webdriverio`, per arrestare il runner.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: qualcosa di critico per la configurazione prima dell'avvio di tutti i worker

        throw new SevereServiceError('Something went wrong.')
    }

    // metodi personalizzati del servizio ...
}
```

## Importare il Servizio da un Modulo

L'unica cosa da fare ora per utilizzare questo servizio è assegnarlo alla proprietà `services`.

Modifica il tuo file `wdio.conf.js` in modo che sia simile a questo:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * usa la classe del servizio importata
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * usa il percorso assoluto del servizio
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## Pubblicare il Servizio su NPM

Per rendere i servizi più facili da utilizzare e da scoprire per la community di WebdriverIO, segui queste raccomandazioni:

* I servizi dovrebbero usare questa convenzione di denominazione: `wdio-*-service`
* Usa le parole chiave NPM: `wdio-plugin`, `wdio-service`
* L'entry `main` dovrebbe esportare (`export`) un'istanza del servizio
* Servizi di esempio: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

Seguire lo schema di denominazione consigliato consente di aggiungere i servizi tramite il nome:

```js
// Aggiungi wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### Aggiungere il Servizio Pubblicato alla CLI e alla Documentazione di WDIO

Apprezziamo davvero ogni nuovo plugin che possa aiutare altre persone a eseguire test migliori! Se hai creato un plugin di questo tipo, considera di aggiungerlo alla nostra CLI e alla documentazione per renderlo più facile da trovare.

Apri una pull request con le seguenti modifiche:

- aggiungi il tuo servizio all'elenco dei [servizi supportati](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) nel modulo CLI
- arricchisci l'[elenco dei servizi](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/services.json) per aggiungere la tua documentazione alla pagina ufficiale di Webdriver.io