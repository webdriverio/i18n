---
id: assertion
title: Ισχυρισμός
---

Το [WDIO testrunner](https://webdriver.io/docs/clioptions) διαθέτει μια ενσωματωμένη βιβλιοθήκη ισχυρισμών που σας επιτρέπει να κάνετε ισχυρούς ισχυρισμούς σε διάφορες πτυχές του προγράμματος περιήγησης ή στοιχείων μέσα στην (διαδικτυακή) εφαρμογή σας. Επεκτείνει τη λειτουργικότητα του [Jests Matchers](https://jestjs.io/docs/en/using-matchers) με πρόσθετους, για δοκιμές e2e βελτιστοποιημένους, matchers, π.χ.:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

ή

```js
const selectOptions = await $$('form select>option')

// make sure there is at least one option in select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Για την πλήρη λίστα, δείτε το [expect API doc](/docs/api/expect-webdriverio).

## Μετάβαση από το Chai

Το [Chai](https://www.chaijs.com/) και το [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) μπορούν να συνυπάρχουν, και με μερικές μικρές προσαρμογές μπορεί να επιτευχθεί μια ομαλή μετάβαση στο expect-webdriverio. Αν έχετε αναβαθμίσει στο WebdriverIO v6 τότε από προεπιλογή θα έχετε πρόσβαση σε όλους τους ισχυρισμούς από το `expect-webdriverio` άμεσα. Αυτό σημαίνει ότι παγκοσμίως όπου χρησιμοποιείτε το `expect` θα καλούσατε έναν ισχυρισμό `expect-webdriverio`. Αυτό ισχύει, εκτός αν έχετε ορίσει το [`injectGlobals`](/docs/configuration#injectglobals) σε `false` ή έχετε ρητά αντικαταστήσει το παγκόσμιο `expect` για να χρησιμοποιήσετε το Chai. Σε αυτή την περίπτωση δεν θα έχετε πρόσβαση σε κανέναν από τους ισχυρισμούς expect-webdriverio χωρίς να εισάγετε ρητά το πακέτο expect-webdriverio όπου το χρειάζεστε.

Αυτός ο οδηγός θα δείξει παραδείγματα του πώς να μεταβείτε από το Chai αν έχει αντικατασταθεί τοπικά και πώς να μεταβείτε από το Chai αν έχει αντικατασταθεί παγκοσμίως.

### Τοπικά

Υποθέστε ότι το Chai εισήχθη ρητά σε ένα αρχείο, π.χ.:

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

Για να μεταφέρετε αυτόν τον κώδικα, αφαιρέστε την εισαγωγή του Chai και χρησιμοποιήστε τη νέα μέθοδο ισχυρισμού expect-webdriverio `toHaveUrl` αντί αυτού:

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Αν θέλατε να χρησιμοποιήσετε τόσο το Chai όσο και το expect-webdriverio στο ίδιο αρχείο, θα διατηρούσατε την εισαγωγή του Chai και το `expect` θα οριζόταν από προεπιλογή στον ισχυρισμό expect-webdriverio, π.χ.:

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

### Παγκοσμίως

Υποθέστε ότι το `expect` αντικαταστάθηκε παγκοσμίως για να χρησιμοποιήσει το Chai. Για να χρησιμοποιήσουμε τους ισχυρισμούς expect-webdriverio πρέπει να ορίσουμε παγκοσμίως μια μεταβλητή στο hook "before", π.χ.:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Τώρα το Chai και το expect-webdriverio μπορούν να χρησιμοποιηθούν παράλληλα. Στον κώδικά σας θα χρησιμοποιούσατε τους ισχυρισμούς Chai και expect-webdriverio ως εξής, π.χ.:

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

Για να μεταβείτε, θα μετακινούσατε σταδιακά κάθε ισχυρισμό Chai στο expect-webdriverio. Μόλις αντικατασταθούν όλοι οι ισχυρισμοί Chai σε όλη τη βάση κώδικα, το hook "before" μπορεί να διαγραφεί. Μια παγκόσμια αναζήτηση και αντικατάσταση για να αντικατασταθούν όλες οι περιπτώσεις του `wdioExpect` με `expect` θα ολοκληρώσει τη μετάβαση.