---
id: assertion
title: Ισχυρισμοί
description: "Γράψτε ισχυρισμούς για την κατάσταση του προγράμματος περιήγησης και των στοιχείων με την ενσωματωμένη βιβλιοθήκη expect-webdriverio, χρησιμοποιήστε ήπιους ισχυρισμούς (soft assertions) και μεταβείτε από το Chai."
---

Ο [WDIO testrunner](https://webdriver.io/docs/clioptions) διαθέτει μια ενσωματωμένη βιβλιοθήκη ισχυρισμών (assertions) που σας επιτρέπει να κάνετε ισχυρούς ισχυρισμούς για διάφορες πτυχές του προγράμματος περιήγησης ή των στοιχείων μέσα στην (web) εφαρμογή σας. Επεκτείνει τη λειτουργικότητα των [Jests Matchers](https://jestjs.io/docs/en/using-matchers) με επιπλέον matchers, βελτιστοποιημένους για e2e testing, π.χ.:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

ή

```js
const selectOptions = await $$('form select>option')

// βεβαιωθείτε ότι υπάρχει τουλάχιστον μία επιλογή στο select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Για την πλήρη λίστα, δείτε την [τεκμηρίωση του expect API](/docs/api/expect-webdriverio).

:::info Jasmine

Με το framework Jasmine, το `expect` συνδυάζει τους matchers του Jasmine και τους matchers του WebdriverIO. Οι σύγχρονοι matchers του Jasmine δεν χρειάζονται `await`, και τα τμήματα του `expect` που προέρχονται από το Jest, όπως το `expect.soft()`, δεν είναι διαθέσιμα. Δείτε [Χρήση του Jasmine](/docs/frameworks#assertions).

:::

## Ήπιοι Ισχυρισμοί (Soft Assertions)

Το WebdriverIO περιλαμβάνει από προεπιλογή ήπιους ισχυρισμούς από το `expect-webdriverio` (από την έκδοση 5.2.0). Οι ήπιοι ισχυρισμοί επιτρέπουν στα τεστ σας να συνεχίσουν την εκτέλεση ακόμα και όταν ένας ισχυρισμός αποτύχει. Όλες οι αποτυχίες συλλέγονται και αναφέρονται στο τέλος του τεστ.

### Χρήση

```js
// Αυτοί δεν θα προκαλέσουν σφάλμα αμέσως αν αποτύχουν
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Οι κανονικοί ισχυρισμοί εξακολουθούν να προκαλούν σφάλμα αμέσως
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Μετάβαση από το Chai

Το [Chai](https://www.chaijs.com/) και το [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) μπορούν να συνυπάρχουν, και με μερικές μικρές προσαρμογές μπορεί να επιτευχθεί μια ομαλή μετάβαση στο expect-webdriverio. Αν έχετε αναβαθμίσει στο WebdriverIO v6, τότε από προεπιλογή θα έχετε πρόσβαση σε όλους τους ισχυρισμούς του `expect-webdriverio` απευθείας. Αυτό σημαίνει ότι καθολικά, όπου χρησιμοποιείτε το `expect`, θα καλείτε έναν ισχυρισμό του `expect-webdriverio`. Αυτό ισχύει εκτός αν έχετε ορίσει το [`injectGlobals`](/docs/configuration#injectglobals) σε `false` ή έχετε ρητά αντικαταστήσει το καθολικό `expect` ώστε να χρησιμοποιεί το Chai. Σε αυτή την περίπτωση δεν θα έχετε πρόσβαση σε κανέναν από τους ισχυρισμούς του expect-webdriverio χωρίς να εισάγετε ρητά το πακέτο expect-webdriverio όπου το χρειάζεστε.

Αυτός ο οδηγός θα δείξει παραδείγματα για το πώς να μεταβείτε από το Chai αν έχει αντικατασταθεί τοπικά και πώς να μεταβείτε από το Chai αν έχει αντικατασταθεί καθολικά.

### Τοπικά

Ας υποθέσουμε ότι το Chai εισήχθη ρητά σε ένα αρχείο, π.χ.:

```js
// myfile.js - αρχικός κώδικας
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

Για να μεταφέρετε αυτόν τον κώδικα, αφαιρέστε την εισαγωγή του Chai και χρησιμοποιήστε αντ' αυτού τη νέα μέθοδο ισχυρισμού `toHaveUrl` του expect-webdriverio:

```js
// myfile.js - κώδικας μετά τη μετάβαση
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // νέα μέθοδος API του expect-webdriverio https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Αν θέλετε να χρησιμοποιήσετε τόσο το Chai όσο και το expect-webdriverio στο ίδιο αρχείο, θα διατηρήσετε την εισαγωγή του Chai και το `expect` θα αντιστοιχεί από προεπιλογή στον ισχυρισμό του expect-webdriverio, π.χ.:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // ισχυρισμός Chai
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // ισχυρισμός expect-webdriverio
    })
})
```

### Καθολικά

Ας υποθέσουμε ότι το `expect` αντικαταστάθηκε καθολικά ώστε να χρησιμοποιεί το Chai. Για να χρησιμοποιήσουμε ισχυρισμούς του expect-webdriverio, πρέπει να ορίσουμε καθολικά μια μεταβλητή στο hook "before", π.χ.:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Τώρα το Chai και το expect-webdriverio μπορούν να χρησιμοποιηθούν το ένα δίπλα στο άλλο. Στον κώδικά σας θα χρησιμοποιούσατε ισχυρισμούς Chai και expect-webdriverio ως εξής, π.χ.:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // ισχυρισμός Chai
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // ισχυρισμός expect-webdriverio
    });
});
```

Για τη μετάβαση, θα μεταφέρατε σταδιακά κάθε ισχυρισμό Chai στο expect-webdriverio. Μόλις αντικατασταθούν όλοι οι ισχυρισμοί Chai σε όλη τη βάση κώδικα, το hook "before" μπορεί να διαγραφεί. Μια καθολική εύρεση και αντικατάσταση όλων των εμφανίσεων του `wdioExpect` με `expect` θα ολοκληρώσει στη συνέχεια τη μετάβαση.