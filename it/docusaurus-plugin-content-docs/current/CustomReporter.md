---
id: customreporter
title: Reporter Personalizzato
description: "Crea un reporter personalizzato per il testrunner WDIO basato su @wdio/reporter, gestisci gli eventi del runner e pubblicalo su NPM."
---

Puoi scrivere il tuo reporter personalizzato per il test runner WDIO, adattato alle tue esigenze. Ed è facile!

Tutto ciò che devi fare è creare un modulo node che eredita dal pacchetto `@wdio/reporter`, in modo che possa ricevere messaggi dal test.

La configurazione di base dovrebbe essere simile a questa:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * fa sì che il reporter scriva sullo stream di output per impostazione predefinita
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Per utilizzare questo reporter, tutto ciò che devi fare è assegnarlo alla proprietà `reporter` nella tua configurazione.


Il tuo file `wdio.conf.js` dovrebbe apparire così:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * usa la classe reporter importata
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * usa il percorso assoluto del reporter
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

Puoi anche pubblicare il reporter su NPM in modo che tutti possano utilizzarlo. Dai al pacchetto un nome come gli altri reporter `wdio-<reportername>-reporter` e taggalo con parole chiave come `wdio` o `wdio-reporter`.

## Gestore di Eventi

Puoi registrare un gestore di eventi per diversi eventi che vengono attivati durante i test. Tutti i seguenti gestori riceveranno payload con informazioni utili sullo stato attuale e sui progressi.

La struttura di questi oggetti payload dipende dall'evento ed è unificata tra i framework (Mocha, Jasmine e Cucumber). Una volta implementato un reporter personalizzato, dovrebbe funzionare con tutti i framework.

Il seguente elenco contiene tutti i possibili metodi che puoi aggiungere alla tua classe reporter:

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
    onContextEnd() {} // sperimentale, vedi "Reporter e test paralleli"
    onSuiteEnd() {}
    onRunnerEnd() {}
}
```

I nomi dei metodi sono abbastanza autoesplicativi.

Per stampare qualcosa in corrispondenza di un determinato evento, utilizza il metodo `this.write(...)`, fornito dalla classe padre `WDIOReporter`. Questo invia il contenuto a `stdout` oppure a un file di log (a seconda delle opzioni del reporter).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Nota che non puoi posticipare in alcun modo l'esecuzione del test.

Tutti i gestori di eventi dovrebbero eseguire routine sincrone (altrimenti incorrerai in race condition).

Assicurati di consultare la [sezione degli esempi](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) dove puoi trovare un esempio di reporter personalizzato che stampa il nome dell'evento per ciascun evento.

Se hai implementato un reporter personalizzato che potrebbe essere utile per la community, non esitare a fare una Pull Request in modo che possiamo rendere il reporter disponibile al pubblico!

Inoltre, se esegui il testrunner WDIO tramite l'interfaccia `Launcher`, non puoi applicare un reporter personalizzato come funzione nel modo seguente:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // questo NON funzionerà, perché CustomReporter non è serializzabile
    reporters: ['dot', CustomReporter]
})
```

## Reporter e test paralleli

Con i [test paralleli in un file spec](./ParallelTests.md), i test di un file spec si sovrappongono: `onTestStart` di un test può arrivare prima di `onTestEnd` di un altro, e i comandi di test diversi si intercalano. `WDIOReporter` gestisce questo aspetto per te. In modalità parallela gli eventi del framework includono due campi aggiuntivi:

- `parentUid` su `suite:start`, `hook:start` e `test:start`: l'uid della suite proprietaria (`null` per una suite di primo livello). Il reporter aggiunge la suite, l'hook o il test a quella suite, non alla suite avviata per ultima.
- `contextId` sugli eventi di test e di comando: il contesto di navigazione del test. Il reporter aggiunge l'output dei comandi al test che è stato eseguito in quel contesto.

Le statistiche di test, hook e suite mantengono questi campi quando l'evento li contiene: in `onTestEnd(test)`, `test.contextId` è il contesto di navigazione del test e `test.parentUid` l'uid della sua suite. Senza la modalità parallela, le statistiche non hanno tali proprietà.

Gli alberi `suites`, `tests` e `hooks` del reporter sono quindi corretti. Se il tuo reporter mantiene un proprio stato, indicizzalo tramite l'`uid` del test o della suite invece di tracciare un singolo test corrente.

L'output che arriva senza un evento, come l'output della console o un evento `process.emit` personalizzato, non ha un `uid`. Chiama `this.getContextTest()` per ottenere il test il cui contesto di navigazione lo ha scritto. In modalità parallela restituisce il test avviato per ultimo in quel contesto, anche dopo il suo `test:end`, quando vengono eseguiti i suoi hook `afterEach` e `after`, e `undefined` quando nessun test è stato avviato in quel contesto o dopo il suo `context:end`; senza la modalità parallela restituisce il test avviato per ultimo. Gli hook `before()` di un test parallelo vengono eseguiti prima del suo `test:start`, quindi nessun test possiede ancora il contesto; `this.getContextId()` restituisce l'id grezzo del contesto, che rimane lo stesso per l'intero test.

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

Gli hook `afterEach` e `after` di un test parallelo vengono eseguiti dopo il suo `test:end`. Per sapere quando un contesto è terminato, utilizza `onContextEnd(payload)`. Viene chiamato dopo l'ultimo hook del test, e il contesto non invia altri eventi dopo di esso. Il payload contiene `cid`, `specs`, `uid` (l'ultimo test del contesto) e `contextId`. Chiudi o scrivi lì ciò che il tuo reporter mantiene per quel contesto.

:::warning Sperimentale

`context:end` e `onContextEnd` sono sperimentali: per ora solo il `parallelMode` di Mocha li invia, e il nome e il payload possono cambiare.

:::

## Attendere fino a `isSynchronised`

Se il tuo reporter deve eseguire operazioni asincrone per riportare i dati (ad es. caricamento di file di log o altre risorse), puoi sovrascrivere il metodo `isSynchronised` nel tuo reporter personalizzato per far sì che il runner WebdriverIO attenda finché non hai elaborato tutto. Un esempio di questo può essere visto nel [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * sovrascrive il metodo isSynchronised
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * sincronizza i file di log
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
             * rimuove i log trasferiti dal contenitore dei log
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

In questo modo il runner attenderà finché tutte le informazioni di log non saranno caricate.

## Pubblicare il Reporter su NPM

Per rendere il reporter più facile da utilizzare e da scoprire per la community di WebdriverIO, segui questi consigli:

* I servizi dovrebbero utilizzare questa convenzione di denominazione: `wdio-*-reporter`
* Usa le parole chiave NPM: `wdio-plugin`, `wdio-reporter`
* La voce `main` dovrebbe esportare (`export`) un'istanza del reporter
* Reporter di esempio: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Seguire lo schema di denominazione consigliato consente di aggiungere i servizi per nome:

```js
// Aggiunge wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Aggiungere il Servizio Pubblicato alla CLI e alla Documentazione di WDIO

Apprezziamo davvero ogni nuovo plugin che possa aiutare altre persone a eseguire test migliori! Se hai creato un plugin di questo tipo, considera di aggiungerlo alla nostra CLI e alla documentazione per renderlo più facile da trovare.

Apri una pull request con le seguenti modifiche:

- aggiungi il tuo servizio all'elenco dei [reporter supportati](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) nel modulo CLI
- amplia l'[elenco dei reporter](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json) per aggiungere la tua documentazione alla pagina ufficiale di Webdriver.io