---
id: timeouts
title: Timeout
description: "Configura i timeout della sessione WebDriver, i timeout waitfor di WebdriverIO e i timeout del framework di test per mantenere i test affidabili."
---

Ogni comando in WebdriverIO è un'operazione asincrona. Una richiesta viene inviata al server Selenium (o a un servizio cloud come [Sauce Labs](https://saucelabs.com)), e la sua risposta contiene il risultato una volta che l'azione è stata completata o è fallita.

Pertanto, il tempo è una componente cruciale dell'intero processo di test. Quando una determinata azione dipende dallo stato di un'altra azione, è necessario assicurarsi che vengano eseguite nell'ordine corretto. I timeout svolgono un ruolo importante nella gestione di questi problemi.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## Timeout di WebDriver

### Timeout degli script di sessione

Una sessione ha un timeout degli script di sessione associato che specifica il tempo di attesa per l'esecuzione degli script asincroni. Salvo diversa indicazione, è di 30 secondi. Puoi impostare questo timeout in questo modo:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.execute(async () => {
    console.log('this should not fail')
    await new Promise((resolve) => setTimeout(resolve, 59000))
})
```

### Timeout di caricamento della pagina della sessione

Una sessione ha un timeout di caricamento della pagina associato che specifica il tempo di attesa per il completamento del caricamento della pagina. Salvo diversa indicazione, è di 300.000 millisecondi.

Puoi impostare questo timeout in questo modo:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad` è il nome dei [timeout](https://www.w3.org/TR/webdriver/#set-timeouts) di WebDriver. WebdriverIO v10 accetta solo questa chiave.

### Timeout di attesa implicita della sessione

Una sessione ha un timeout di attesa implicita associato. Questo specifica il tempo di attesa per la strategia di localizzazione implicita degli elementi quando si localizzano elementi tramite i comandi [`findElement`](/docs/api/webdriver#findelement) o [`findElements`](/docs/api/webdriver#findelements) (rispettivamente [`$`](/docs/api/browser/$) o [`$$`](/docs/api/browser/$$), quando si esegue WebdriverIO con o senza il testrunner WDIO). Salvo diversa indicazione, è di 0 millisecondi.

Puoi impostare questo timeout tramite:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## Timeout relativi a WebdriverIO

### Timeout `WaitFor*`

WebdriverIO fornisce diversi comandi per attendere che gli elementi raggiungano un determinato stato (ad es. abilitato, visibile, esistente). Questi comandi accettano un argomento selettore e un numero di timeout, che determina per quanto tempo l'istanza deve attendere che l'elemento raggiunga lo stato. L'opzione `waitforTimeout` consente di impostare il timeout globale per tutti i comandi `waitFor*`, così non è necessario impostare lo stesso timeout più e più volte. _(Nota la `f` minuscola!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

Nei tuoi test, ora puoi fare questo:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// puoi anche sovrascrivere il timeout predefinito se necessario
await myElem.waitForDisplayed({ timeout: 10000 })
```

### Un elemento che la pagina ha rimosso

Quando la pagina rimuove o renderizza di nuovo un elemento, WebdriverIO lo ritrova tramite il suo selettore e attende fino a `waitforTimeout`. Se è presente, il comando viene eseguito su di esso. In caso contrario, il comando fallisce con:

- `message`: `Can't call <command> on element with selector "<selector>" because element wasn't found` (un elemento di `$$()`: `… "<selector>" at index <n> …`; un genitore rimosso: il messaggio riguarda il genitore)
- `cause`: l'errore stale element reference del driver

`waitUntil` e `waitForEnabled` falliscono con un proprio errore, che ha questo errore come `cause`. `isDisplayed` e `isExisting` dell'elemento rimosso non attendono: restituiscono `false`. Per un figlio di un genitore rimosso, attendono e falliscono con questo errore.

```ts title="test/specs/removed.e2e.ts"
import { $, browser, expect } from '@wdio/globals'

describe('a removed element', () => {
    it('gives the error of an element that was not found again', async () => {
        await browser.url('https://webdriver.io')
        const title = await $('h1')
        await browser.execute(() => document.querySelectorAll('h1').forEach((h1) => h1.remove()))

        const error = await title.getText().then(() => null, (err: Error) => err)
        expect(error?.message).toContain('because element wasn\'t found')
    })
})
```

## Timeout relativi al framework

Il framework di test che utilizzi con WebdriverIO deve gestire i timeout, soprattutto perché tutto è asincrono. Ciò garantisce che il processo di test non si blocchi se qualcosa va storto.

Per impostazione predefinita, il timeout è di 10 secondi, il che significa che un singolo test non dovrebbe durare più di così.

Un singolo test in Mocha si presenta così:

```js
it('should login into the application', async () => {
    await browser.url('/login')

    const form = await $('form')
    const username = await $('#username')
    const password = await $('#password')

    await username.setValue('userXY')
    await password.setValue('******')
    await form.submit()

    expect(await browser.getTitle()).to.be.equal('Admin Area')
})
```

In Cucumber, il timeout si applica a una singola step definition. Tuttavia, se vuoi aumentare il timeout perché il tuo test dura più del valore predefinito, devi impostarlo nelle opzioni del framework.

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'}
  ]
}>
<TabItem value="mocha">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'mocha',
    mochaOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="jasmine">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'jasmine',
    jasmineOpts: {
        defaultTimeoutInterval: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="cucumber">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'cucumber',
    cucumberOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
</Tabs>

### Timeout di Mocha e gli hook di WebdriverIO

Un test o un hook di Mocha può modificare il proprio timeout con `this.timeout(ms)`. Usa una `function`, non una arrow function, per ottenere `this`. WebdriverIO segue la modifica, anche `this.timeout(0)`, che disattiva il timeout. Con `mochaOpts.parallelMode`, si applica solo `mochaOpts.timeout`: `this.timeout()` in un test o in un hook genera un errore, e un timeout di una suite o di `it(...).timeout()` viene ignorato, con un avviso. Vedi [Test paralleli in un file spec](./ParallelTests.md#hooks-and-timeouts).

Il timeout di un test include il tempo del suo hook `beforeTest`, poiché Mocha avvia il timer prima dell'hook. Con l'[opzione retry](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) di WebdriverIO, tutti i tentativi di un test condividono un unico timeout.

Quando un test o un hook va in timeout, WebdriverIO esegue `afterTest` (o `afterHook`) prima che Mocha avvii il test successivo, in modo che quell'hook non possa essere eseguito contemporaneamente al test successivo. Mocha attende questi hook fino a un ulteriore timeout del test.