---
id: customreporter
title: Reporter Personalizzato
---

Puoi scrivere il tuo reporter personalizzato per il test runner WDIO che sia adattato alle tue esigenze. Ed è facile!

Tutto ciò che devi fare è creare un modulo node che eredita dal pacchetto `@wdio/reporter`, in modo che possa ricevere messaggi dal test.

La configurazione di base dovrebbe apparire così:

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

Per utilizzare questo reporter, tutto ciò che devi fare è assegnarlo alla proprietà `reporter` nella tua configurazione.

Il tuo file `wdio.conf.js` dovrebbe apparire così:

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

Puoi anche pubblicare il reporter su NPM in modo che tutti possano utilizzarlo. Nomina il pacchetto come altri reporter `wdio-<reportername>-reporter`, e taggalo con parole chiave come `wdio` o `wdio-reporter`.

## Gestore Eventi

Puoi registrare un gestore eventi per diversi eventi che vengono attivati durante il test. Tutti i seguenti gestori riceveranno payload con informazioni utili sullo stato attuale e sui progressi.

La struttura di questi oggetti payload dipende dall'evento e sono unificati tra i framework (Mocha, Jasmine e Cucumber). Una volta implementato un reporter personalizzato, dovrebbe funzionare per tutti i framework.

La seguente lista contiene tutti i possibili metodi che puoi aggiungere alla tua classe reporter:

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

I nomi dei metodi sono abbastanza esplicativi.

Per stampare qualcosa su un determinato evento, usa il metodo `this.write(...)`, che è fornito dalla classe padre `WDIOReporter`. Questo metodo trasmette il contenuto a `stdout` o a un file di log (a seconda delle opzioni del reporter).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Nota che non puoi differire l'esecuzione del test in alcun modo.

Tutti i gestori di eventi dovrebbero eseguire routine sincrone (altrimenti incorrerai in condizioni di gara).

Assicurati di controllare la [sezione di esempio](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) dove puoi trovare un reporter personalizzato di esempio che stampa il nome dell'evento per ogni evento.

Se hai implementato un reporter personalizzato che potrebbe essere utile per la community, non esitare a fare una Pull Request in modo che possiamo rendere il reporter disponibile per il pubblico!

Inoltre, se esegui il testrunner WDIO tramite l'interfaccia `Launcher`, non puoi applicare un reporter personalizzato come funzione come segue:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // this will NOT work, because CustomReporter is not serializable
    reporters: ['dot', CustomReporter]
})
```

## Attendi Fino a `isSynchronised`

Se il tuo reporter deve eseguire operazioni asincrone per riportare i dati (ad es. caricamento di file di log o altri asset) puoi sovrascrivere il metodo `isSynchronised` nel tuo reporter personalizzato per far attendere il runner WebdriverIO fino a quando non hai elaborato tutto. Un esempio di questo può essere visto nel [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

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

In questo modo il runner attenderà fino a quando tutte le informazioni di log non saranno caricate.

## Pubblicare Reporter su NPM

Per rendere i reporter più facili da utilizzare e da scoprire dalla community WebdriverIO, segui queste raccomandazioni:

* I servizi dovrebbero usare questa convenzione di denominazione: `wdio-*-reporter`
* Usa le parole chiave NPM: `wdio-plugin`, `wdio-reporter`
* L'entry `main` dovrebbe `export` un'istanza del reporter
* Reporter di esempio: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Seguendo il modello di denominazione consigliato, i servizi possono essere aggiunti per nome:

```js
// Add wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Aggiungi Servizio Pubblicato a WDIO CLI e Docs

Apprezziamo davvero ogni nuovo plugin che può aiutare altre persone a eseguire test migliori! Se hai creato un tale plugin, considera di aggiungerlo alla nostra CLI e alla documentazione per renderlo più facile da trovare.

Per favore, fai una pull request con le seguenti modifiche:

- aggiungi il tuo servizio alla lista dei [reporter supportati](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) nel modulo CLI
- migliora la [lista dei reporter](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/reporters.json) per aggiungere la tua documentazione alla pagina ufficiale di Webdriver.io