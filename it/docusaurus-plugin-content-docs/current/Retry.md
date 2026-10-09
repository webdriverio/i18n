---
id: retry
title: Ripetere i Test Instabili
description: "Ripeti i test instabili in Mocha, Jasmine o Cucumber, riesegui interi file spec ed esegui un test specifico più volte per rilevarne l'instabilità."
---

Puoi rieseguire con il testrunner di WebdriverIO determinati test che risultano instabili a causa di fattori come una rete inaffidabile o race condition. (Tuttavia, non è consigliabile aumentare semplicemente il numero di riesecuzioni se i test diventano instabili!)

## Rieseguire suite in Mocha

Dalla versione 3 di Mocha, puoi rieseguire intere suite di test (tutto ciò che si trova all'interno di un blocco `describe`). Se usi Mocha dovresti preferire questo meccanismo di ripetizione invece dell'implementazione di WebdriverIO, che consente solo di rieseguire determinati blocchi di test (tutto ciò che si trova all'interno di un blocco `it`). Per usare il metodo `this.retries()`, il blocco della suite `describe` deve usare una funzione non vincolata `function(){}` invece di una arrow function `() => {}`, come descritto nella [documentazione di Mocha](https://mochajs.org/#arrow-functions). Con Mocha puoi anche impostare un numero di ripetizioni per tutte le spec usando `mochaOpts.retries` nel tuo `wdio.conf.js`.

Ecco un esempio:

```js
describe('retries', function () {
    // Ripeti tutti i test in questa suite fino a 4 volte
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Specifica che questo test venga ripetuto solo fino a 2 volte
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Rieseguire singoli test in Jasmine o Mocha

Per rieseguire un determinato blocco di test puoi semplicemente indicare il numero di riesecuzioni come ultimo parametro dopo la funzione del blocco di test:

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
     * spec che viene eseguita al massimo 4 volte (1 esecuzione effettiva + 3 riesecuzioni)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // restituisce il numero di ripetizioni
        // ...
    }, 3)
})
```

Lo stesso funziona anche per gli hook:

```js
describe('my flaky app', () => {
    /**
     * hook che viene eseguito al massimo 2 volte (1 esecuzione effettiva + 1 riesecuzione)
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
     * spec che viene eseguita al massimo 4 volte (1 esecuzione effettiva + 3 riesecuzioni)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // restituisce il numero di ripetizioni
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

Lo stesso funziona anche per gli hook:

```js
describe('my flaky app', () => {
    /**
     * hook che viene eseguito al massimo 2 volte (1 esecuzione effettiva + 1 riesecuzione)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Se stai usando Jasmine, il secondo parametro è riservato al timeout. Per applicare un parametro di ripetizione devi impostare il timeout al suo valore predefinito `jasmine.DEFAULT_TIMEOUT_INTERVAL` e poi indicare il numero di ripetizioni.

</TabItem>
</Tabs>

Questo meccanismo di ripetizione consente solo di ripetere singoli hook o blocchi di test. Se il tuo test è accompagnato da un hook per configurare la tua applicazione, questo hook non viene eseguito. [Mocha offre](https://mochajs.org/#retry-tests) ripetizioni native dei test che forniscono questo comportamento, mentre Jasmine no. Puoi accedere al numero di ripetizioni eseguite nell'hook `afterTest`.

## Riesecuzione in Cucumber

### Rieseguire suite complete in Cucumber

Per cucumber >=6 puoi fornire l'opzione di configurazione [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) insieme a un parametro opzionale `retryTagFilter` per far sì che tutti o alcuni dei tuoi scenari falliti ottengano ripetizioni aggiuntive fino al successo. Affinché questa funzionalità funzioni, devi impostare `scenarioLevelReporter` su `true`.

### Rieseguire le Step Definition in Cucumber

Per definire un numero di riesecuzioni per determinate step definition, applica semplicemente un'opzione di ripetizione, ad esempio:

```js
export default function () {
    /**
     * step definition che viene eseguita al massimo 3 volte (1 esecuzione effettiva + 2 riesecuzioni)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

Le riesecuzioni possono essere definite solo nel file delle step definition, mai nel file delle feature.

## Aggiungere ripetizioni per singolo file spec

In precedenza erano disponibili solo ripetizioni a livello di test e di suite, che vanno bene nella maggior parte dei casi.

Ma in tutti i test che coinvolgono uno stato (ad esempio su un server o in un database), lo stato potrebbe rimanere non valido dopo il primo fallimento di un test. Le ripetizioni successive potrebbero non avere alcuna possibilità di successo, a causa dello stato non valido da cui partirebbero.

Per ogni file spec viene creata una nuova istanza di `browser`, il che lo rende il punto ideale in cui agganciarsi e configurare qualsiasi altro stato (server, database). Le ripetizioni a questo livello significano che l'intero processo di configurazione verrà semplicemente ripetuto, proprio come se si trattasse di un nuovo file spec.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * Il numero di volte in cui ripetere l'intero file spec quando fallisce nel suo complesso
     */
    specFileRetries: 1,
    /**
     * Ritardo in secondi tra i tentativi di ripetizione del file spec
     */
    specFileRetriesDelay: 0,
    /**
     * I file spec ripetuti vengono inseriti all'inizio della coda e ripetuti immediatamente
     */
    specFileRetriesDeferred: false
}
```

## Eseguire un test specifico più volte

Questo serve a prevenire l'introduzione di test instabili in una codebase. Aggiungendo l'opzione cli `--repeat`, le spec o le suite specificate verranno eseguite N volte. Quando si usa questo flag cli, è necessario specificare anche il flag `--spec` o `--suite`.

Quando si aggiungono nuovi test a una codebase, specialmente attraverso un processo CI/CD, i test potrebbero passare ed essere integrati, ma diventare instabili in seguito. Questa instabilità potrebbe derivare da diversi fattori, come problemi di rete, carico del server, dimensioni del database, ecc. Usare il flag `--repeat` nel tuo processo CD/CD può aiutare a individuare questi test instabili prima che vengano integrati nella codebase principale.

Una strategia possibile è eseguire i test normalmente nel processo CI/CD, ma se stai introducendo un nuovo test puoi eseguire un ulteriore set di test con la nuova spec indicata in `--spec` insieme a `--repeat`, in modo che il nuovo test venga eseguito x volte. Se il test fallisce anche solo una di quelle volte, non verrà integrato e sarà necessario analizzare il motivo del fallimento.

```sh
# Questo eseguirà la spec example.e2e.js 5 volte
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```