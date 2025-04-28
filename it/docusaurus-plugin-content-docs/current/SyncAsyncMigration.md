---
id: async-migration
title: Da Sync ad Async
---

A causa dei cambiamenti in V8, il team di WebdriverIO ha [annunciato](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) che l'esecuzione sincrona dei comandi sarà deprecata entro aprile 2023. Il team ha lavorato duramente per rendere la transizione il più semplice possibile. In questa guida spieghiamo come puoi migrare gradualmente la tua suite di test da sync ad async. Come progetto di esempio utilizziamo il [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), ma l'approccio è lo stesso per tutti gli altri progetti.

## Promises in JavaScript

Il motivo per cui l'esecuzione sincrona era popolare in WebdriverIO è che rimuove la complessità della gestione delle promises. In particolare, se provieni da altri linguaggi dove questo concetto non esiste in questo modo, all'inizio può risultare confuso. Tuttavia, le Promises sono uno strumento molto potente per gestire il codice asincrono e il JavaScript di oggi rende effettivamente facile lavorare con esse. Se non hai mai lavorato con le Promises, ti consigliamo di consultare la [guida di riferimento MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), poiché sarebbe fuori tema spiegarlo qui.

## Transizione ad Async

Il testrunner di WebdriverIO può gestire l'esecuzione asincrona e sincrona all'interno della stessa suite di test. Ciò significa che puoi migrare lentamente i tuoi test e PageObjects passo dopo passo al tuo ritmo. Ad esempio, il Cucumber Boilerplate ha definito [un ampio set di definizioni di step](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) che puoi copiare nel tuo progetto. Possiamo procedere e migrare una definizione di step o un file alla volta.

:::tip

WebdriverIO offre un [codemod](https://github.com/webdriverio/codemod) che consente di trasformare il codice sincronizzato in codice asincrono quasi completamente in automatico. Esegui il codemod come descritto nella documentazione prima e usa questa guida per la migrazione manuale se necessario.

:::

In molti casi, tutto ciò che è necessario fare è rendere la funzione in cui chiami i comandi WebdriverIO `async` e aggiungere un `await` davanti a ogni comando. Guardando il primo file `clearInputField.ts` da trasformare nel progetto boilerplate, trasformiamo da:

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

Ecco fatto. Puoi vedere il commit completo con tutti gli esempi di riscrittura qui:

#### Commits:

- _transform all step definitions_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
Questa transizione è indipendente dal fatto che tu utilizzi TypeScript o meno. Se utilizzi TypeScript, assicurati di cambiare eventualmente la proprietà `types` nel tuo `tsconfig.json` da `webdriverio/sync` a `@wdio/globals/types`. Assicurati inoltre che il tuo target di compilazione sia impostato almeno su `ES2018`.
:::

## Casi Speciali

Ci sono naturalmente sempre casi speciali in cui è necessario prestare un po' più di attenzione.

### Cicli ForEach

Se hai un ciclo `forEach`, ad esempio per iterare sugli elementi, devi assicurarti che la callback dell'iteratore sia gestita correttamente in modo asincrono, ad esempio:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

La funzione che passiamo a `forEach` è una funzione iteratrice. In un mondo sincrono cliccherebbe su tutti gli elementi prima di andare avanti. Se trasformiamo questo in codice asincrono, dobbiamo assicurarci di attendere che ogni funzione iteratrice completi l'esecuzione. Aggiungendo `async`/`await`, queste funzioni iteratrici restituiranno una promise che dobbiamo risolvere. Ora, `forEach` non è più ideale per iterare sugli elementi perché non restituisce il risultato della funzione iteratrice, la promise che dobbiamo attendere. Pertanto dobbiamo sostituire `forEach` con `map` che restituisce quella promise. Il `map` così come tutti gli altri metodi iteratori degli Array come `find`, `every`, `reduce` e altri sono implementati in modo da rispettare le promise all'interno delle funzioni iteratrici e sono quindi semplificati per l'uso in un contesto asincrono. L'esempio sopra trasformato appare così:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

Ad esempio, per recuperare tutti gli elementi `<h3 />` e ottenere il loro contenuto testuale, puoi eseguire:

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * returns:
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

Se questo sembra troppo complicato, potresti considerare l'uso di semplici cicli for, ad esempio:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

### Asserzioni WebdriverIO

Se utilizzi l'helper di asserzione WebdriverIO [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio), assicurati di mettere un `await` davanti a ogni chiamata `expect`, ad esempio:

```ts
expect($('input')).toHaveAttributeContaining('class', 'form')
```

deve essere trasformato in:

```ts
await expect($('input')).toHaveAttributeContaining('class', 'form')
```

### Metodi PageObject Sync e Test Async

Se hai scritto PageObjects nella tua suite di test in modo sincrono, non potrai più usarli nei test asincroni. Se hai bisogno di utilizzare un metodo PageObject sia in test sincroni che asincroni, consigliamo di duplicare il metodo e offrirli per entrambi gli ambienti, ad esempio:

```js
class MyPageObject extends Page {
    /**
     * define elements
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // sync code
    }

    someMethodAsync () {
        // async version of MyPageObject.someMethod()
    }
}
```

Una volta completata la migrazione, puoi rimuovere i metodi PageObject sincroni e pulire la nomenclatura.

Se non ti piace mantenere due diverse versioni di un metodo PageObject, puoi anche migrare l'intero PageObject ad async e utilizzare [`browser.call`](https://webdriver.io/docs/api/browser/call) per eseguire il metodo in un ambiente sincrono, ad esempio:

```js
// before:
// MyPageObject.someMethod()
// after:
browser.call(() => MyPageObject.someMethod())
```

Il comando `call` assicurerà che il metodo asincrono `someMethod` venga risolto prima di passare al comando successivo.

## Conclusione

Come puoi vedere nella [PR di riscrittura risultante](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files), la complessità di questa riscrittura è abbastanza semplice. Ricorda che puoi riscrivere una definizione di step alla volta. WebdriverIO è perfettamente in grado di gestire l'esecuzione sincrona e asincrona in un singolo framework.