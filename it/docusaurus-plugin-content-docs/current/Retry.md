---
id: retry
title: Riprovare Test Instabili
---

Puoi rieseguire alcuni test con il testrunner WebdriverIO che risultano instabili a causa di cose come una rete instabile o condizioni di race condition. (Tuttavia, non è consigliabile semplicemente aumentare il tasso di ripetizione se i test diventano instabili!)

## Rieseguire suite in Mocha

Dalla versione 3 di Mocha, puoi rieseguire intere suite di test (tutto all'interno di un blocco `describe`). Se utilizzi Mocha dovresti preferire questo meccanismo di retry invece dell'implementazione WebdriverIO che consente solo di rieseguire determinati blocchi di test (tutto all'interno di un blocco `it`). Per utilizzare il metodo `this.retries()`, il blocco della suite `describe` deve utilizzare una funzione non vincolata `function(){}` invece di una funzione arrow `() => {}`, come descritto nella [documentazione di Mocha](https://mochajs.org/#arrow-functions). Utilizzando Mocha puoi anche impostare un conteggio di ripetizioni per tutte le specifiche utilizzando `mochaOpts.retries` nel tuo `wdio.conf.js`.

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

## Rieseguire singoli test in Jasmine o Mocha

Per rieseguire un determinato blocco di test è possibile applicare il numero di ripetizioni come ultimo parametro dopo la funzione del blocco di test:

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

Se stai utilizzando Jasmine, il secondo parametro è riservato al timeout. Per applicare un parametro di ripetizione è necessario impostare il timeout al suo valore predefinito `jasmine.DEFAULT_TIMEOUT_INTERVAL` e quindi applicare il conteggio delle ripetizioni.

</TabItem>
</Tabs>

Questo meccanismo di ripetizione consente solo di riprovare singoli hook o blocchi di test. Se il tuo test è accompagnato da un hook per configurare la tua applicazione, questo hook non viene eseguito. [Mocha offre](https://mochajs.org/#retry-tests) ripetizioni di test native che forniscono questo comportamento mentre Jasmine no. Puoi accedere al numero di tentativi eseguiti nell'hook `afterTest`.

## Ripetere in Cucumber

### Rieseguire suite complete in Cucumber

Per cucumber >=6 puoi fornire l'opzione di configurazione [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) insieme al parametro opzionale `retryTagFilter` per fare in modo che tutti o alcuni dei tuoi scenari falliti ottengano ulteriori tentativi fino al successo. Affinché questa funzionalità funzioni, è necessario impostare `scenarioLevelReporter` su `true`.

### Rieseguire le definizioni dei passi in Cucumber

Per definire un tasso di ripetizione per una certa definizione di passo, basta applicare un'opzione di ripetizione, come:

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

Le ripetizioni possono essere definite solo nel file delle definizioni dei passi, mai nel file delle feature.

## Aggiungere ripetizioni su base per-specfile

In precedenza, erano disponibili solo ripetizioni a livello di test e suite, che vanno bene nella maggior parte dei casi.

Ma in qualsiasi test che coinvolge lo stato (come su un server o in un database) lo stato potrebbe rimanere non valido dopo il primo fallimento del test. Eventuali tentativi successivi potrebbero non avere alcuna possibilità di passare, a causa dello stato non valido con cui inizierebbero.

Una nuova istanza di `browser` viene creata per ogni specfile, il che lo rende un posto ideale per collegarsi e configurare altri stati (server, database). Le ripetizioni a questo livello significano che l'intero processo di setup sarà semplicemente ripetuto, proprio come se fosse per un nuovo specfile.

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

Questo serve per evitare che test instabili vengano introdotti in una base di codice. Aggiungendo l'opzione cli `--repeat` eseguirà le specifiche o suite specificate N volte. Quando si utilizza questo flag cli, deve essere specificato anche il flag `--spec` o `--suite`.

Quando si aggiungono nuovi test a una base di codice, specialmente attraverso un processo CI/CD, i test potrebbero passare e venire uniti ma diventare instabili in seguito. Questa instabilità potrebbe derivare da una serie di cose come problemi di rete, carico del server, dimensione del database, ecc. L'utilizzo del flag `--repeat` nel processo CI/CD può aiutare a rilevare questi test instabili prima che vengano uniti a una base di codice principale.

Una strategia da utilizzare è eseguire i test normalmente nel processo CI/CD, ma se stai introducendo un nuovo test puoi quindi eseguire un altro set di test con la nuova specifica specificata in `--spec` insieme a `--repeat` in modo che esegua il nuovo test x numero di volte. Se il test fallisce una qualsiasi di quelle volte, il test non verrà unito e sarà necessario esaminare il motivo per cui è fallito.

```sh
# This will run the example.e2e.js spec 5 times
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```