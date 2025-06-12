---
id: assertion
title: Ισχυρισμός
---

Το [WDIO testrunner](https://webdriver.io/docs/clioptions) έρχεται με μια ενσωματωμένη βιβλιοθήκη ισχυρισμών που σας επιτρέπει να κάνετε ισχυρούς ισχυρισμούς σε διάφορες πτυχές του προγράμματος περιήγησης ή στοιχείων μέσα στην (web) εφαρμογή σας. Επεκτείνει τη λειτουργικότητα [Jests Matchers](https://jestjs.io/docs/en/using-matchers) με επιπλέον matchers βελτιστοποιημένους για e2e δοκιμές, π.χ.:

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

## Ήπιοι Ισχυρισμοί

Το WebdriverIO περιλαμβάνει ήπιους ισχυρισμούς από προεπιλογή από το expect-webdriver(5.2.0). Οι ήπιοι ισχυρισμοί επιτρέπουν στις δοκιμές σας να συνεχίσουν την εκτέλεση ακόμα και όταν ένας ισχυρισμός αποτυγχάνει. Όλες οι αποτυχίες συλλέγονται και αναφέρονται στο τέλος της δοκιμής.

### Χρήση

```js
// These won't throw immediately if they fail
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Regular assertions still throw immediately
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Μετάβαση από το Chai

Το [Chai](https://www.chaijs.com/) και το [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) μπορούν να συνυπάρχουν, και με μερικές μικρές προσαρμογές μπορεί να επιτευχθεί μια ομαλή μετάβαση στο expect-webdriverio. Εάν έχετε αναβαθμίσει στο WebdriverIO v6, τότε από προεπιλογή θα έχετε πρόσβαση σε όλους τους ισχυρισμούς από το `expect-webdriverio` από προεπιλογή. Αυτό σημαίνει ότι παγκοσμίως όπου χρησιμοποιείτε το `expect` θα καλείτε έναν ισχυρισμό `expect-webdriverio`. Αυτό ισχύει, εκτός αν έχετε ορίσει το [`injectGlobals`](/docs/configuration#injectglobals) σε `false` ή έχετε ρητά παρακάμψει το παγκόσμιο `expect` για να χρησιμοποιήσετε το Chai. Σε αυτήν την περίπτωση, δεν θα έχετε πρόσβαση σε κανέναν από τους ισχυρισμούς expect-webdriverio χωρίς να εισάγετε ρητά το πακέτο expect-webdriverio όπου το χρειάζεστε.

Αυτός ο οδηγός θα δείξει παραδείγματα για το πώς να μεταβείτε από το Chai εάν έχει παρακαμφθεί τοπικά και πώς να μεταβείτε από το Chai εάν έχει παρακαμφθεί παγκοσμίως.

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

Για να μεταφέρετε αυτόν τον κώδικα, αφαιρέστε την εισαγωγή του Chai και χρησιμοποιήστε τη νέα μέθοδο ισχυρισμού του expect-webdriverio `toHaveUrl` αντί γι' αυτό:

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Εάν θέλετε να χρησιμοποιήσετε τόσο το Chai όσο και το expect-webdriverio στο ίδιο αρχείο, θα διατηρήσετε την εισαγωγή του Chai και το `expect` θα είναι από προεπιλογή ο ισχυρισμός expect-webdriverio, π.χ.:

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

Υποθέστε ότι το `expect` αντικαταστάθηκε παγκοσμίως για να χρησιμοποιεί το Chai. Για να χρησιμοποιήσετε τους ισχυρισμούς expect-webdriverio πρέπει να ορίσετε παγκοσμίως μια μεταβλητή στο "before" hook, π.χ.:

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

Για να γίνει η μετάβαση, θα μετακινούσατε σταδιακά κάθε ισχυρισμό Chai στο expect-webdriverio. Μόλις αντικατασταθούν όλοι οι ισχυρισμοί Chai σε όλη τη βάση κώδικα, το "before" hook μπορεί να διαγραφεί. Μια παγκόσμια αναζήτηση και αντικατάσταση για να αντικαταστήσετε όλες τις περιπτώσεις του `wdioExpect` με `expect` θα ολοκληρώσει τη μετάβαση.