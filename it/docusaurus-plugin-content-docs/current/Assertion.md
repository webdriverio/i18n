---
id: assertion
title: Asserzione
---

Il [WDIO testrunner](https://webdriver.io/docs/clioptions) include una libreria di asserzioni integrata che consente di effettuare potenti asserzioni su vari aspetti del browser o elementi all'interno della tua applicazione (web). Estende la funzionalità di [Jests Matchers](https://jestjs.io/docs/en/using-matchers) con ulteriori matcher ottimizzati per i test e2e, ad esempio:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

oppure

```js
const selectOptions = await $$('form select>option')

// make sure there is at least one option in select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Per l'elenco completo, consulta la [documentazione API di expect](/docs/api/expect-webdriverio).

## Asserzioni Soft

WebdriverIO include asserzioni soft di default da expect-webdriver(5.2.0). Le asserzioni soft consentono ai tuoi test di continuare l'esecuzione anche quando un'asserzione fallisce. Tutti i fallimenti vengono raccolti e segnalati alla fine del test.

### Utilizzo

```js
// These won't throw immediately if they fail
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Regular assertions still throw immediately
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Migrazione da Chai

[Chai](https://www.chaijs.com/) e [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) possono coesistere, e con alcune piccole modifiche è possibile ottenere una transizione fluida verso expect-webdriverio. Se hai aggiornato a WebdriverIO v6, avrai accesso a tutte le asserzioni di `expect-webdriverio` sin dall'inizio. Ciò significa che ovunque tu usi `expect` chiamerai un'asserzione `expect-webdriverio`. Questo a meno che tu non abbia impostato [`injectGlobals`](/docs/configuration#injectglobals) su `false` o abbia esplicitamente sovrascritto il globale `expect` per utilizzare Chai. In questo caso non avresti accesso a nessuna delle asserzioni expect-webdriverio senza importare esplicitamente il pacchetto expect-webdriverio dove necessario.

Questa guida mostrerà esempi di come migrare da Chai se è stato sovrascritto localmente e come migrare da Chai se è stato sovrascritto globalmente.

### Locale

Supponiamo che Chai sia stato importato esplicitamente in un file, ad esempio:

```js
// myfile.js - original code
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

Per migrare questo codice, rimuovi l'importazione di Chai e usa invece il nuovo metodo di asserzione expect-webdriverio `toHaveUrl`:

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Se volessi utilizzare sia Chai che expect-webdriverio nello stesso file, manterresti l'importazione di Chai e `expect` di default sarebbe l'asserzione expect-webdriverio, ad esempio:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Chai assertion
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    })
})
```

### Globale

Supponiamo che `expect` sia stato sovrascritto globalmente per utilizzare Chai. Per utilizzare le asserzioni expect-webdriverio, dobbiamo impostare globalmente una variabile nell'hook "before", ad esempio:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Ora Chai e expect-webdriverio possono essere utilizzati insieme. Nel tuo codice utilizzeresti le asserzioni Chai e expect-webdriverio come segue, ad esempio:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Chai assertion
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    });
});
```

Per migrare, sposteresti gradualmente ogni asserzione Chai verso expect-webdriverio. Una volta che tutte le asserzioni Chai sono state sostituite in tutta la base di codice, l'hook "before" può essere eliminato. Una ricerca e sostituzione globale per sostituire tutte le istanze di `wdioExpect` con `expect` completerà quindi la migrazione.