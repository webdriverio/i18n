---
id: async-migration
title: Da Sync ad Async
description: "Migra i test WebdriverIO dall'esecuzione sincrona dei comandi a quella asincrona passo dopo passo, inclusi i cicli forEach, le asserzioni e i page object sincroni."
---

A causa di modifiche in V8, il team di WebdriverIO ha [annunciato](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) la deprecazione dell'esecuzione sincrona dei comandi entro aprile 2023. Il team ha lavorato duramente per rendere la transizione il più semplice possibile. In questa guida spieghiamo come migrare gradualmente la tua suite di test da sync ad async. Come progetto di esempio utilizziamo il [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), ma l'approccio è lo stesso anche per tutti gli altri progetti.

## Promise in JavaScript

Il motivo per cui l'esecuzione sincrona era popolare in WebdriverIO è che elimina la complessità della gestione delle promise. In particolare, se provieni da altri linguaggi in cui questo concetto non esiste in questa forma, all'inizio può creare confusione. Tuttavia, le Promise sono uno strumento molto potente per gestire il codice asincrono e il JavaScript di oggi rende davvero semplice lavorarci. Se non hai mai lavorato con le Promise, ti consigliamo di consultare la [guida di riferimento MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), poiché spiegarle qui andrebbe oltre lo scopo di questa guida.

## Transizione ad Async

Il testrunner di WebdriverIO può gestire l'esecuzione async e sync all'interno della stessa suite di test. Ciò significa che puoi migrare gradualmente i tuoi test e i tuoi PageObject passo dopo passo, al tuo ritmo. Ad esempio, il Cucumber Boilerplate ha definito [un ampio insieme di step definition](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) da copiare nel tuo progetto. Possiamo procedere e migrare una step definition o un file alla volta.

:::tip

WebdriverIO offre un [codemod](https://github.com/webdriverio/codemod) che permette di trasformare il codice sincrono in codice asincrono in modo quasi completamente automatico. Esegui prima il codemod come descritto nella documentazione e usa questa guida per la migrazione manuale, se necessario.

:::

In molti casi, tutto ciò che serve è rendere `async` la funzione in cui chiami i comandi WebdriverIO e aggiungere un `await` davanti a ogni comando. Prendendo in esame il primo file da trasformare nel progetto boilerplate, `clearInputField.ts`, passiamo da:

```ts
export default (selector: Selector) => {
    $(selector).clearValue();
};
```

a:

```ts
export default async (selector: Selector) => {
    await $(selector).clearValue();
};
```

Tutto qui. Puoi vedere il commit completo con tutti gli esempi di riscrittura qui:

#### Commit:

- _trasformazione di tutte le step definition_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
Questa transizione è indipendente dall'utilizzo o meno di TypeScript. Se usi TypeScript, assicurati semplicemente di modificare alla fine la proprietà `types` nel tuo `tsconfig.json` da `webdriverio/sync` a `@wdio/globals/types`. Assicurati inoltre che il target di compilazione sia impostato almeno su `ES2018`.
:::

## Casi speciali

Ci sono ovviamente sempre casi speciali a cui bisogna prestare un po' più di attenzione.

### Cicli ForEach

Se hai un ciclo `forEach`, ad esempio per iterare sugli elementi, devi assicurarti che la callback dell'iteratore sia gestita correttamente in modo asincrono, ad esempio:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

La funzione che passiamo a `forEach` è una funzione iteratore. In un mondo sincrono, cliccherebbe su tutti gli elementi prima di proseguire. Se trasformiamo questo in codice asincrono, dobbiamo assicurarci di attendere che ogni funzione iteratore termini l'esecuzione. Aggiungendo `async`/`await`, queste funzioni iteratore restituiranno una promise che dobbiamo risolvere. A questo punto, `forEach` non è più ideale per iterare sugli elementi, perché non restituisce il risultato della funzione iteratore, ovvero la promise che dobbiamo attendere. Pertanto dobbiamo sostituire `forEach` con `map`, che restituisce tale promise. `map`, così come tutti gli altri metodi iteratori degli Array come `find`, `every`, `reduce` e altri, sono implementati in modo da rispettare le promise all'interno delle funzioni iteratore e sono quindi semplificati per l'uso in un contesto asincrono. L'esempio precedente, una volta trasformato, appare così:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

Ad esempio, per recuperare tutti gli elementi `<h3 />` e ottenerne il contenuto testuale, puoi eseguire:

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * restituisce:
 * [
 *   'Extendable',
 *   'Compatible',
 *   'Feature Rich',
 *   'Who is using WebdriverIO?',
 *   'Support for Modern Web and Mobile Frameworks',
 *   'Google Lighthouse Integration',
 *   'Watch Talks about WebdriverIO',
 *   'Get Started With WebdriverIO within Minutes'
 * ]
 */
```

Se questo ti sembra troppo complicato, potresti considerare l'uso di semplici cicli for, ad esempio:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

`$$` restituisce un [`ElementArray`](/docs/api/browser/$$). Puoi anche iterarlo prima di attendere la lista:

```js
for await (const elem of $$('div')) {
    await elem.click()
}
```

`for (const elem of $$('div'))` genera un errore finché la lista non è stata risolta, perché un ciclo sincrono non può attendere la query. Attendi prima la lista, come nell'esempio sopra, oppure usa `for await`.

### Asserzioni WebdriverIO

Se usi l'helper di asserzioni di WebdriverIO [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio), assicurati di inserire un `await` davanti a ogni chiamata `expect`, ad esempio:

```ts
expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

deve essere trasformato in:

```ts
await expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

### Metodi PageObject sincroni e test asincroni

Se hai scritto i PageObject nella tua suite di test in modo sincrono, non potrai più utilizzarli nei test asincroni. Se hai bisogno di usare un metodo PageObject sia nei test sync che in quelli async, ti consigliamo di duplicare il metodo e offrirlo per entrambi gli ambienti, ad esempio:

```js
class MyPageObject extends Page {
    /**
     * definisce gli elementi
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // codice sincrono
    }

    someMethodAsync () {
        // versione asincrona di MyPageObject.someMethod()
    }
}
```

Una volta terminata la migrazione, puoi rimuovere i metodi PageObject sincroni e sistemare i nomi.

Se non vuoi mantenere due versioni diverse di un metodo PageObject, puoi anche migrare l'intero PageObject ad async e usare [`browser.call`](https://webdriver.io/docs/api/browser/call) per eseguire il metodo in un ambiente sincrono, ad esempio:

```js
// prima:
// MyPageObject.someMethod()
// dopo:
browser.call(() => MyPageObject.someMethod())
```

Il comando `call` si assicurerà che il metodo asincrono `someMethod` sia risolto prima di passare al comando successivo.

## Conclusione

Come puoi vedere nella [PR di riscrittura risultante](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files), la complessità di questa riscrittura è piuttosto contenuta. Ricorda che puoi riscrivere una step definition alla volta. WebdriverIO è perfettamente in grado di gestire l'esecuzione sync e async in un unico framework.