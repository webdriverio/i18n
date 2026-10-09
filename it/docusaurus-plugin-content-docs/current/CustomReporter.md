---
id: customreporter
title: Reporter Personalizzato
description: "Crea un reporter personalizzato per il testrunner WDIO basato su @wdio/reporter, gestisci gli eventi del runner e pubblicalo su NPM."
---

Puoi scrivere il tuo reporter personalizzato per il test runner WDIO, adattato alle tue esigenze. Ed è facile!

Tutto ciò che devi fare è creare un modulo node che erediti dal pacchetto `@wdio/reporter`, in modo che possa ricevere messaggi dal test.

La configurazione di base dovrebbe essere simile a:

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

Puoi anche pubblicare il reporter su NPM in modo che tutti possano usarlo. Dai al pacchetto un nome come gli altri reporter `wdio-<reportername>-reporter`, e taggalo con parole chiave come `wdio` o `wdio-reporter`.

## Gestore di Eventi

Puoi registrare un gestore di eventi per diversi eventi che vengono attivati durante i test. Tutti i seguenti gestori riceveranno payload con informazioni utili sullo stato attuale e sull'avanzamento.

La struttura di questi oggetti payload dipende dall'evento ed è unificata tra i framework (Mocha, Jasmine e Cucumber). Una volta implementato un reporter personalizzato, dovrebbe funzionare per tutti i framework.

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
    onSuiteEnd() {}
    onRunnerEnd() {}
}
```

I nomi dei metodi sono piuttosto autoesplicativi.

Per stampare qualcosa su un determinato evento, usa il metodo `this.write(...)`, fornito dalla classe padre `WDIOReporter`. Questo invia il contenuto in streaming su `stdout` oppure su un file di log (a seconda delle opzioni del reporter).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Nota che non puoi in alcun modo ritardare l'esecuzione del test.

Tutti i gestori di eventi dovrebbero eseguire routine sincrone (altrimenti incorrerai in race condition).

Assicurati di consultare la [sezione degli esempi](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) dove puoi trovare un esempio di reporter personalizzato che stampa il nome dell'evento per ogni evento.

Se hai implementato un reporter personalizzato che potrebbe essere utile per la community, non esitare a fare una Pull Request così da poter rendere il reporter disponibile al pubblico!

Inoltre, se esegui il testrunner WDIO tramite l'interfaccia `Launcher`, non puoi applicare un reporter personalizzato come funzione nel modo seguente:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // questo NON funzionerà, perché CustomReporter non è serializzabile
    reporters: ['dot', CustomReporter]
})
```

## Attendere fino a `isSynchronised`

Se il tuo reporter deve eseguire operazioni asincrone per riportare i dati (ad es. caricamento di file di log o altre risorse), puoi sovrascrivere il metodo `isSynchronised` nel tuo reporter personalizzato per far sì che il runner di WebdriverIO attenda finché non hai elaborato tutto. Un esempio di ciò si può vedere in [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

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

In questo modo il runner attenderà fino a quando tutte le informazioni di log saranno caricate.

## Pubblicare il Reporter su NPM

Per rendere il reporter più facile da utilizzare e da scoprire per la community di WebdriverIO, segui queste raccomandazioni:

* I servizi dovrebbero usare questa convenzione di denominazione: `wdio-*-reporter`
* Usa le parole chiave NPM: `wdio-plugin`, `wdio-reporter`
* La voce `main` dovrebbe esportare (`export`) un'istanza del reporter
* Reporter di esempio: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Seguire lo schema di denominazione raccomandato permette di aggiungere i servizi tramite nome:

```js
// Aggiunge wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Aggiungere il Servizio Pubblicato alla CLI e alla Documentazione di WDIO

Apprezziamo davvero ogni nuovo plugin che possa aiutare altre persone a eseguire test migliori! Se hai creato un plugin del genere, considera di aggiungerlo alla nostra CLI e alla documentazione per renderlo più facile da trovare.

Apri una pull request con le seguenti modifiche:

- aggiungi il tuo servizio all'elenco dei [reporter supportati](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) nel modulo CLI
- amplia l'[elenco dei reporter](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json) per aggiungere la tua documentazione alla pagina ufficiale di Webdriver.io