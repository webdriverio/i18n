---
id: timeouts
title: Timeout
description: "Configura i timeout della sessione WebDriver, i timeout waitfor di WebdriverIO e i timeout del framework di test per mantenere i test affidabili."
---

Ogni comando in WebdriverIO è un'operazione asincrona. Viene inviata una richiesta al server Selenium (o a un servizio cloud come [Sauce Labs](https://saucelabs.com)), e la sua risposta contiene il risultato una volta che l'azione è stata completata o è fallita.

Pertanto, il tempo è una componente cruciale nell'intero processo di test. Quando una determinata azione dipende dallo stato di un'altra azione, è necessario assicurarsi che vengano eseguite nell'ordine corretto. I timeout svolgono un ruolo importante nella gestione di questi problemi.

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

> `pageLoad` è il nome dei [timeout](https://www.w3.org/TR/webdriver/#set-timeouts) di WebDriver. WebdriverIO v10 accetta solo quella chiave.

### Timeout di attesa implicita della sessione

Una sessione ha un timeout di attesa implicita associato. Questo specifica il tempo di attesa per la strategia implicita di localizzazione degli elementi quando si localizzano elementi usando i comandi [`findElement`](/docs/api/webdriver#findelement) o [`findElements`](/docs/api/webdriver#findelements) (rispettivamente [`$`](/docs/api/browser/$) o [`$$`](/docs/api/browser/$$), quando si esegue WebdriverIO con o senza il testrunner WDIO). Salvo diversa indicazione, è di 0 millisecondi.

Puoi impostare questo timeout tramite:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## Timeout relativi a WebdriverIO

### Timeout `WaitFor*`

WebdriverIO fornisce diversi comandi per attendere che gli elementi raggiungano un determinato stato (ad es. abilitato, visibile, esistente). Questi comandi accettano come argomenti un selettore e un numero di timeout, che determina per quanto tempo l'istanza deve attendere che l'elemento raggiunga lo stato. L'opzione `waitforTimeout` ti permette di impostare il timeout globale per tutti i comandi `waitFor*`, così non devi impostare lo stesso timeout più e più volte. _(Nota la `f` minuscola!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

Nei tuoi test, ora puoi fare così:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// puoi anche sovrascrivere il timeout predefinito se necessario
await myElem.waitForDisplayed({ timeout: 10000 })
```

## Timeout relativi al framework

Il framework di test che stai usando con WebdriverIO deve gestire i timeout, soprattutto perché tutto è asincrono. Questo garantisce che il processo di test non si blocchi se qualcosa va storto.

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

In Cucumber, il timeout si applica a una singola definizione di step. Tuttavia, se vuoi aumentare il timeout perché il tuo test richiede più tempo del valore predefinito, devi impostarlo nelle opzioni del framework.

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