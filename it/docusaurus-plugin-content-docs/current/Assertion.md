---
id: assertion
title: Asserzioni
description: "Scrivi asserzioni sullo stato del browser e degli elementi con la libreria integrata expect-webdriverio, usa le soft assertion ed esegui la migrazione da Chai."
---

Il [testrunner WDIO](https://webdriver.io/docs/clioptions) include una libreria di asserzioni integrata che consente di effettuare asserzioni potenti su vari aspetti del browser o degli elementi all'interno della tua applicazione (web). Estende le funzionalità dei [Matcher di Jest](https://jestjs.io/docs/en/using-matchers) con matcher aggiuntivi ottimizzati per il testing e2e, ad esempio:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

oppure

```js
const selectOptions = await $$('form select>option')

// assicurati che ci sia almeno un'opzione nella select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Per l'elenco completo, consulta la [documentazione dell'API expect](/docs/api/expect-webdriverio).

:::info Jasmine

Con il framework Jasmine, `expect` combina i matcher di Jasmine e i matcher di WebdriverIO. I matcher sincroni di Jasmine non richiedono `await`, e le parti Jest di `expect`, come `expect.soft()`, non sono disponibili. Consulta [Usare Jasmine](/docs/frameworks#assertions).

:::

## Soft Assertion

WebdriverIO include di default le soft assertion di `expect-webdriverio` (dalla versione 5.2.0). Le soft assertion permettono ai tuoi test di continuare l'esecuzione anche quando un'asserzione fallisce. Tutti i fallimenti vengono raccolti e riportati alla fine del test.

### Utilizzo

```js
// Queste non generano subito un errore se falliscono
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Le asserzioni normali generano comunque subito un errore
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Migrazione da Chai

[Chai](https://www.chaijs.com/) ed [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) possono coesistere e, con alcune piccole modifiche, è possibile ottenere una transizione graduale verso expect-webdriverio. Se hai aggiornato a WebdriverIO v6, avrai accesso di default a tutte le asserzioni di `expect-webdriverio` senza configurazioni aggiuntive. Ciò significa che, a livello globale, ovunque utilizzi `expect` invocherai un'asserzione di `expect-webdriverio`. Questo vale a meno che tu non abbia impostato [`injectGlobals`](/docs/configuration#injectglobals) su `false` o non abbia esplicitamente sovrascritto l'`expect` globale per usare Chai. In tal caso non avresti accesso a nessuna delle asserzioni di expect-webdriverio senza importare esplicitamente il pacchetto expect-webdriverio dove ti serve.

Questa guida mostrerà esempi di come migrare da Chai nel caso in cui sia stato sovrascritto localmente e nel caso in cui sia stato sovrascritto globalmente.

### Locale

Supponiamo che Chai sia stato importato esplicitamente in un file, ad esempio:

```js
// myfile.js - codice originale
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

Per migrare questo codice, rimuovi l'import di Chai e usa invece il nuovo metodo di asserzione di expect-webdriverio `toHaveUrl`:

```js
// myfile.js - codice migrato
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // nuovo metodo API di expect-webdriverio https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Se volessi usare sia Chai sia expect-webdriverio nello stesso file, manterresti l'import di Chai ed `expect` userebbe di default l'asserzione di expect-webdriverio, ad esempio:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // asserzione Chai
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // asserzione expect-webdriverio
    })
})
```

### Globale

Supponiamo che `expect` sia stato sovrascritto globalmente per usare Chai. Per poter usare le asserzioni di expect-webdriverio dobbiamo impostare globalmente una variabile nell'hook "before", ad esempio:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Ora Chai ed expect-webdriverio possono essere usati insieme. Nel tuo codice utilizzeresti le asserzioni di Chai ed expect-webdriverio come segue, ad esempio:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // asserzione Chai
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // asserzione expect-webdriverio
    });
});
```

Per migrare, sposteresti gradualmente ogni asserzione Chai su expect-webdriverio. Una volta sostituite tutte le asserzioni Chai nell'intera codebase, l'hook "before" può essere eliminato. Una ricerca e sostituzione globale di tutte le occorrenze di `wdioExpect` con `expect` completerà quindi la migrazione.