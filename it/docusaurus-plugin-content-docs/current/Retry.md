---
id: retry
title: Ripetere i Test Instabili
description: "Ripeti i test instabili in Mocha, Jasmine o Cucumber, riesegui interi file spec ed esegui un test specifico più volte per rilevarne l'instabilità."
---

Puoi rieseguire con il testrunner di WebdriverIO alcuni test che si rivelano instabili a causa di fattori come una rete inaffidabile o race condition. (Tuttavia, non è consigliabile aumentare semplicemente il numero di riesecuzioni quando i test diventano instabili!)

## Rieseguire suite in Mocha

Dalla versione 3 di Mocha, puoi rieseguire intere suite di test (tutto ciò che si trova all'interno di un blocco `describe`). Se utilizzi Mocha dovresti preferire questo meccanismo di retry invece dell'implementazione di WebdriverIO, che consente solo di rieseguire determinati blocchi di test (tutto ciò che si trova all'interno di un blocco `it`). Per utilizzare il metodo `this.retries()`, il blocco suite `describe` deve usare una funzione non vincolata `function(){}` invece di una arrow function `() => {}`, come descritto nella [documentazione di Mocha](https://mochajs.org/#arrow-functions). Con Mocha puoi anche impostare un numero di retry per tutte le spec utilizzando `mochaOpts.retries` nel tuo `wdio.conf.js`.

Ecco un esempio:

```js
describe('retries', function () {
    // Riprova tutti i test in questa suite fino a 4 volte
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Specifica che questo test venga riprovato solo fino a 2 volte
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
     * spec eseguita al massimo 4 volte (1 esecuzione effettiva + 3 riesecuzioni)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // restituisce il numero di retry
        // ...
    }, 3)
})
```

Lo stesso funziona anche per gli hook:

```js
describe('my flaky app', () => {
    /**
     * hook eseguito al massimo 2 volte (1 esecuzione effettiva + 1 riesecuzione)
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
     * spec eseguita al massimo 4 volte (1 esecuzione effettiva + 3 riesecuzioni)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // restituisce il numero di retry
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

Lo stesso funziona anche per gli hook:

```js
describe('my flaky app', () => {
    /**
     * hook eseguito al massimo 2 volte (1 esecuzione effettiva + 1 riesecuzione)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Se utilizzi Jasmine, il secondo parametro è riservato al timeout. Per applicare un parametro di retry devi impostare il timeout al suo valore predefinito `jasmine.DEFAULT_TIMEOUT_INTERVAL` e poi indicare il numero di retry.

</TabItem>
</Tabs>

Questo meccanismo di retry consente solo di riprovare singoli hook o blocchi di test. Se il tuo test è accompagnato da un hook per configurare l'applicazione, questo hook non viene eseguito. [Mocha offre](https://mochajs.org/#retry-tests) retry nativi dei test che garantiscono questo comportamento, mentre Jasmine no. Puoi accedere al numero di retry eseguiti nell'hook `afterTest`.

Con Mocha, tutti i tentativi di un test o di un hook condividono il relativo timeout: Mocha avvia il timer una sola volta e fa fallire il test quando la somma di tutti i tentativi supera il timeout. Pertanto questo meccanismo riprova un test o un hook che fallisce (ad esempio per un'asserzione o un comando falliti), ma non uno che raggiunge il timeout, perché un tentativo successivo non riuscirebbe a terminare in tempo. L'errore di timeout di un test o di un hook con i retry di WebdriverIO indica il tentativo che è andato in timeout, ad esempio `(WDIO attempt 2/3)`. Per i test che possono andare in timeout, usa i [retry di Mocha](https://mochajs.org/#retry-tests) (`this.retries()`): Mocha esegue nuovamente ogni tentativo con un timeout completo.

## Riesecuzione in Cucumber

### Rieseguire suite complete in Cucumber

Per cucumber >=6 puoi fornire l'opzione di configurazione [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) insieme al parametro opzionale `retryTagFilter` per far sì che tutti o alcuni degli scenari falliti vengano riprovati ulteriormente fino al successo.

### Rieseguire Step Definition in Cucumber

Per definire un numero di riesecuzioni per determinate step definition, applica semplicemente un'opzione di retry, ad esempio:

```js
export default function () {
    /**
     * step definition eseguita al massimo 3 volte (1 esecuzione effettiva + 2 riesecuzioni)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

Le riesecuzioni possono essere definite solo nel file delle step definition, mai nel file feature.

## Aggiungere retry per singolo file spec

In precedenza erano disponibili solo retry a livello di test e di suite, che nella maggior parte dei casi vanno bene.

Ma in qualsiasi test che coinvolga uno stato (ad esempio su un server o in un database), lo stato potrebbe rimanere non valido dopo il primo fallimento del test. Eventuali retry successivi potrebbero non avere alcuna possibilità di riuscire, a causa dello stato non valido da cui partirebbero.

Per ogni file spec viene creata una nuova istanza di `browser`, il che rende questo il punto ideale in cui agganciarsi e configurare qualsiasi altro stato (server, database). I retry a questo livello significano che l'intero processo di configurazione verrà semplicemente ripetuto, proprio come se si trattasse di un nuovo file spec.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * Numero di volte in cui riprovare l'intero file spec quando fallisce nel suo complesso
     */
    specFileRetries: 1,
    /**
     * Ritardo in secondi tra i tentativi di retry del file spec
     */
    specFileRetriesDelay: 0,
    /**
     * I file spec riprovati vengono inseriti all'inizio della coda e riprovati immediatamente
     */
    specFileRetriesDeferred: false
}
```

## Eseguire un test specifico più volte

Questo serve a evitare che test instabili vengano introdotti in una codebase. Aggiungendo l'opzione cli `--repeat`, le spec o le suite specificate verranno eseguite N volte. Quando si utilizza questo flag cli, è necessario specificare anche il flag `--spec` o `--suite`.

Quando si aggiungono nuovi test a una codebase, soprattutto tramite un processo CI/CD, i test potrebbero passare ed essere integrati, ma diventare instabili in seguito. Questa instabilità potrebbe derivare da diversi fattori, come problemi di rete, carico del server, dimensioni del database, ecc. Utilizzare il flag `--repeat` nel tuo processo CD/CD può aiutare a individuare questi test instabili prima che vengano integrati nella codebase principale.

Una strategia possibile è eseguire i test normalmente nel processo CI/CD ma, se stai introducendo un nuovo test, eseguire un ulteriore set di test con la nuova spec indicata in `--spec` insieme a `--repeat`, in modo che il nuovo test venga eseguito x volte. Se il test fallisce anche solo una di queste volte, non verrà integrato e sarà necessario analizzare il motivo del fallimento.

```sh
# Questo eseguirà la spec example.e2e.js 5 volte
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```