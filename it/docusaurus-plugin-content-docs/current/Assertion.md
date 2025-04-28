---
id: assertion
title: Asserzioni
---

Il [WDIO testrunner](https://webdriver.io/docs/clioptions) viene fornito con una libreria di asserzioni integrata che ti permette di fare potenti asserzioni su vari aspetti del browser o elementi all'interno della tua applicazione (web). Estende la funzionalità di [Jests Matchers](https://jestjs.io/docs/en/using-matchers) con matcher aggiuntivi, ottimizzati per i test e2e, ad esempio:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

oppure

```js
const selectOptions = await $$('form select>option')

// assicurati che ci sia almeno un'opzione nel select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Per l'elenco completo, vedi la [documentazione API di expect](/docs/api/expect-webdriverio).

## Migrazione da Chai

[Chai](https://www.chaijs.com/) e [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) possono coesistere, e con alcuni piccoli aggiustamenti è possibile ottenere una transizione agevole verso expect-webdriverio. Se hai aggiornato a WebdriverIO v6, avrai accesso di default a tutte le asserzioni di `expect-webdriverio`. Ciò significa che globalmente, ovunque tu usi `expect`, chiamerai un'asserzione di `expect-webdriverio`. A meno che tu non abbia impostato [`injectGlobals`](/docs/configuration#injectglobals) a `false` o abbia esplicitamente sovrascritto il `expect` globale per usare Chai. In questo caso non avresti accesso a nessuna delle asserzioni di expect-webdriverio senza importare esplicitamente il pacchetto expect-webdriverio dove ne hai bisogno.

Questa guida mostrerà esempi di come migrare da Chai se è stato sovrascritto localmente e come migrare da Chai se è stato sovrascritto globalmente.

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

Per migrare questo codice, rimuovi l'importazione di Chai e usa il nuovo metodo di asserzione expect-webdriverio `toHaveUrl`:

```js
// myfile.js - codice migrato
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // nuovo metodo API expect-webdriverio https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Se volessi usare sia Chai che expect-webdriverio nello stesso file, dovresti mantenere l'importazione di Chai e `expect` sarebbe di default l'asserzione expect-webdriverio, ad esempio:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Asserzione Chai
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // asserzione expect-webdriverio
    })
})
```

### Globale

Supponiamo che `expect` sia stato sovrascritto globalmente per usare Chai. Per utilizzare le asserzioni expect-webdriverio dobbiamo impostare globalmente una variabile nell'hook "before", ad esempio:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Ora Chai e expect-webdriverio possono essere utilizzati uno accanto all'altro. Nel tuo codice useresti le asserzioni Chai e expect-webdriverio come segue, ad esempio:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Asserzione Chai
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // asserzione expect-webdriverio
    });
});
```

Per migrare, dovresti spostare gradualmente ogni asserzione Chai a expect-webdriverio. Una volta che tutte le asserzioni Chai sono state sostituite in tutta la base di codice, l'hook "before" può essere eliminato. Una ricerca e sostituzione globale per sostituire tutte le istanze di `wdioExpect` con `expect` completerà quindi la migrazione.