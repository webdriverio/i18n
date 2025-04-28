---
id: timeouts
title: Timeout
---

Each command in WebdriverIO is an asynchronous operation. A request is fired to the Selenium server (or a cloud service like [Sauce Labs](https://saucelabs.com)), and its response contains the result once the action has completed or failed.

Pertanto, il tempo è una componente cruciale nell'intero processo di test. Quando una determinata azione dipende dallo stato di un'azione diversa, è necessario assicurarsi che vengano eseguite nell'ordine corretto. I timeout giocano un ruolo importante quando si affrontano questi problemi.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## Timeout WebDriver

### Timeout Script di Sessione

Una sessione ha un timeout script associato che specifica un tempo di attesa per l'esecuzione di script asincroni. Se non diversamente specificato, è di 30 secondi. Puoi impostare questo timeout in questo modo:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### Timeout Caricamento Pagina di Sessione

Una sessione ha un timeout di caricamento pagina associato che specifica un tempo di attesa per il completamento del caricamento della pagina. Se non diversamente specificato, è di 300.000 millisecondi.

Puoi impostare questo timeout in questo modo:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> La parola chiave `pageLoad` fa parte della [specifica](https://www.w3.org/TR/webdriver/#set-timeouts) ufficiale di WebDriver, ma potrebbe non essere [supportata](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687) per il tuo browser (il nome precedente era `page load`).

### Timeout di Attesa Implicita di Sessione

Una sessione ha un timeout di attesa implicita associato. Questo specifica il tempo di attesa per la strategia di localizzazione implicita degli elementi quando si cercano elementi utilizzando i comandi [`findElement`](/docs/api/webdriver#findelement) o [`findElements`](/docs/api/webdriver#findelements) (rispettivamente [`$`](/docs/api/browser/$) o [`$$`](/docs/api/browser/$$), quando si esegue WebdriverIO con o senza il test runner WDIO). Se non diversamente specificato, è di 0 millisecondi.

Puoi impostare questo timeout tramite:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## Timeout relativi a WebdriverIO

### Timeout `WaitFor*`

WebdriverIO fornisce molteplici comandi per attendere che gli elementi raggiungano un determinato stato (ad esempio abilitato, visibile, esistente). Questi comandi accettano un argomento selettore e un numero di timeout, che determina per quanto tempo l'istanza dovrebbe attendere che quell'elemento raggiunga lo stato. L'opzione `waitforTimeout` consente di impostare il timeout globale per tutti i comandi `waitFor*`, quindi non è necessario impostare lo stesso timeout più e più volte. _(Nota la "f" minuscola!)_

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

## Timeout relativi al framework

Il framework di testing che stai utilizzando con WebdriverIO deve gestire i timeout, specialmente perché tutto è asincrono. Assicura che il processo di test non si blocchi se qualcosa va storto.

Per impostazione predefinita, il timeout è di 10 secondi, il che significa che un singolo test non dovrebbe durare più di tanto.

Un singolo test in Mocha assomiglia a:

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

In Cucumber, il timeout si applica a una singola definizione di step. Tuttavia, se desideri aumentare il timeout perché il tuo test richiede più tempo del valore predefinito, devi impostarlo nelle opzioni del framework.

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