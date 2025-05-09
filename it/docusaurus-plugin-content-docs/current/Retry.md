---
id: retry
title: Ripetizione dei Test Instabili
---

Con il testrunner di WebdriverIO è possibile rieseguire determinati test che risultano instabili a causa di fattori come una rete inaffidabile o condizioni di race. (Tuttavia, non è consigliabile aumentare semplicemente il tasso di ripetizione se i test diventano instabili!)

## Ripetere suite in Mocha

Dalla versione 3 di Mocha, è possibile rieseguire intere suite di test (tutto ciò che si trova all'interno di un blocco `describe`). Se utilizzi Mocha, dovresti preferire questo meccanismo di ripetizione invece dell'implementazione di WebdriverIO che consente solo di rieseguire determinati blocchi di test (tutto ciò che si trova all'interno di un blocco `it`). Per utilizzare il metodo `this.retries()`, il blocco della suite `describe` deve utilizzare una funzione non vincolata `function(){}` invece di una funzione freccia `() => {}`, come descritto nella [documentazione di Mocha](https://mochajs.org/#arrow-functions). Utilizzando Mocha, puoi anche impostare un conteggio di ripetizioni per tutte le specifiche usando `mochaOpts.retries` nel tuo `wdio.conf.js`.

Ecco un esempio:

```js
describe('retries', function () {
    // Retry all tests in this suite up to 4 times
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Specify this test to only retry up to 2 times
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Ripetere singoli test in Jasmine o Mocha

Per rieseguire un determinato blocco di test, puoi semplicemente applicare il numero di ripetizioni come ultimo parametro dopo la funzione del blocco di test:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
  ]
}>
<TabItem value="mocha">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, 3)
})
```

Lo stesso funziona anche per gli hook:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, 1)

    // ...
})
```

</TabItem>
<TabItem value="jasmine">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

Lo stesso funziona anche per gli hook:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Se stai utilizzando Jasmine, il secondo parametro è riservato al timeout. Per applicare un parametro di ripetizione, devi impostare il timeout al suo valore predefinito `jasmine.DEFAULT_TIMEOUT_INTERVAL` e poi applicare il conteggio delle ripetizioni.

</TabItem>
</Tabs>

Questo meccanismo di ripetizione consente solo di ripetere singoli hook o blocchi di test. Se il tuo test è accompagnato da un hook per configurare la tua applicazione, questo hook non viene eseguito. [Mocha offre](https://mochajs.org/#retry-tests) ripetizioni native dei test che forniscono questo comportamento, mentre Jasmine no. Puoi accedere al numero di ripetizioni eseguite nell'hook `afterTest`.

## Ripetizione in Cucumber

### Ripetere intere suite in Cucumber

Per cucumber >=6 puoi fornire l'opzione di configurazione [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) insieme a un parametro opzionale `retryTagFilter` per far sì che tutti o alcuni dei tuoi scenari falliti ottengano ulteriori tentativi fino al successo. Affinché questa funzionalità funzioni, devi impostare `scenarioLevelReporter` su `true`.

### Ripetere le definizioni dei passaggi in Cucumber

Per definire un tasso di ripetizione per una determinata definizione di passaggio, applica semplicemente un'opzione di ripetizione, come:

```js
export default function () {
    /**
     * step definition that runs max 3 times (1 actual run + 2 reruns)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

Le ripetizioni possono essere definite solo nel file delle definizioni dei passaggi, mai nel file delle funzionalità.

## Aggiungere ripetizioni su base per-specfile

In precedenza, erano disponibili solo ripetizioni a livello di test e suite, che vanno bene nella maggior parte dei casi.

Ma in qualsiasi test che coinvolge uno stato (come su un server o in un database), lo stato potrebbe rimanere non valido dopo il primo fallimento del test. Eventuali ripetizioni successive potrebbero non avere alcuna possibilità di passare, a causa dello stato non valido con cui inizierebbero.

Una nuova istanza di `browser` viene creata per ogni specfile, il che rende questo un punto ideale per agganciare e configurare altri stati (server, database). Le ripetizioni a questo livello significano che l'intero processo di configurazione verrà semplicemente ripetuto, proprio come se fosse per un nuovo specfile.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * The number of times to retry the entire specfile when it fails as a whole
     */
    specFileRetries: 1,
    /**
     * Delay in seconds between the spec file retry attempts
     */
    specFileRetriesDelay: 0,
    /**
     * Retried specfiles are inserted at the beginning of the queue and retried immediately
     */
    specFileRetriesDeferred: false
}
```

## Eseguire un test specifico più volte

Questo serve a prevenire l'introduzione di test instabili in una base di codice. Aggiungendo l'opzione cli `--repeat`, eseguirà le specifiche o suite specificate N volte. Quando si utilizza questo flag cli, deve essere specificato anche il flag `--spec` o `--suite`.

Quando si aggiungono nuovi test a una base di codice, specialmente attraverso un processo CI/CD, i test potrebbero passare e venire uniti ma diventare instabili in seguito. Questa instabilità potrebbe derivare da numerosi fattori come problemi di rete, carico del server, dimensione del database, ecc. L'utilizzo del flag `--repeat` nel tuo processo CD/CD può aiutare a individuare questi test instabili prima che vengano uniti a una base di codice principale.

Una strategia da utilizzare è eseguire i test normalmente nel processo CI/CD, ma se stai introducendo un nuovo test puoi eseguire un altro set di test con la nuova spec specificata in `--spec` insieme a `--repeat` in modo che esegua il nuovo test x volte. Se il test fallisce in uno qualsiasi di questi tentativi, il test non verrà unito e sarà necessario esaminare il motivo del fallimento.

```sh
# This will run the example.e2e.js spec 5 times
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```