---
id: component-testing
title: Έλεγχος Στοιχείων
description: "Εκτελέστε unit tests και tests στοιχείων σε πραγματικούς browsers με τον browser runner του WebdriverIO, που βασίζεται στο Vite, συμπεριλαμβανομένης της εγκατάστασης, του test harness και της αποσφαλμάτωσης."
---

Με τον [Browser Runner](/docs/runner#browser-runner) του WebdriverIO μπορείτε να εκτελείτε tests μέσα σε έναν πραγματικό desktop ή mobile browser, χρησιμοποιώντας το WebdriverIO και το πρωτόκολλο WebDriver για να αυτοματοποιείτε και να αλληλεπιδράτε με ό,τι αποδίδεται στη σελίδα. Αυτή η προσέγγιση έχει [πολλά πλεονεκτήματα](/docs/runner#browser-runner) σε σύγκριση με άλλα test frameworks που επιτρέπουν έλεγχο μόνο έναντι του [JSDOM](https://www.npmjs.com/package/jsdom).

## Υποστήριξη browsers

Ο browser runner εκτελεί το test bundle μέσα στον browser. Αυτό το bundle εκτελείται σε Chrome 90, Edge 90, Firefox 90 και Safari 14.1, καθώς και σε νεότερες εκδόσεις αυτών των browsers.

Τα end-to-end tests εκτελούνται σε Node.js. Ο κώδικας που περνιέται στο [`browser.execute`](/docs/api/browser/execute) εκτελείται αντίθετα στον αυτοματοποιημένο browser, ο οποίος μπορεί να είναι παλαιότερος από τις παραπάνω εκδόσεις. Διατηρήστε αυτόν τον κώδικα σε ES2021.

## Πώς Λειτουργεί;

Ο Browser Runner χρησιμοποιεί το [Vite](https://vitejs.dev/) για να αποδώσει μια σελίδα ελέγχου και να αρχικοποιήσει ένα test framework για την εκτέλεση των tests σας στον browser. Προς το παρόν υποστηρίζει μόνο το Mocha, αλλά τα Jasmine και Cucumber βρίσκονται [στο roadmap](https://github.com/orgs/webdriverio/projects/1). Αυτό επιτρέπει τον έλεγχο κάθε είδους στοιχείων ακόμη και σε projects που δεν χρησιμοποιούν το Vite.

Ο Vite server ξεκινά από τον testrunner του WebdriverIO και ρυθμίζεται έτσι ώστε να μπορείτε να χρησιμοποιείτε όλους τους reporters και τα services όπως συνηθίζατε στα κανονικά e2e tests. Επιπλέον, αρχικοποιεί ένα instance [`browser`](/docs/api/browser) που σας επιτρέπει να έχετε πρόσβαση σε ένα υποσύνολο του [WebdriverIO API](/docs/api) για να αλληλεπιδράτε με οποιαδήποτε στοιχεία στη σελίδα. Όπως και στα e2e tests, μπορείτε να έχετε πρόσβαση σε αυτό το instance μέσω της μεταβλητής `browser` που είναι συνδεδεμένη στο global scope ή εισάγοντάς το από το `@wdio/globals`, ανάλογα με το πώς έχει οριστεί το [`injectGlobals`](/docs/api/globals).

Το WebdriverIO έχει ενσωματωμένη υποστήριξη για τα ακόλουθα frameworks:

- [__Nuxt__](https://nuxt.com/): Ο testrunner του WebdriverIO εντοπίζει μια εφαρμογή Nuxt και ρυθμίζει αυτόματα τα composables του project σας, ενώ βοηθά στο mocking του Nuxt backend. Διαβάστε περισσότερα στα [έγγραφα του Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/): Ο testrunner του WebdriverIO εντοπίζει αν χρησιμοποιείτε το TailwindCSS και φορτώνει σωστά το περιβάλλον στη σελίδα ελέγχου

## Εγκατάσταση

Για να ρυθμίσετε το WebdriverIO για unit testing ή έλεγχο στοιχείων στον browser, δημιουργήστε ένα νέο project WebdriverIO μέσω:

```bash
npm init wdio@latest ./
# or
yarn create wdio ./
```

Μόλις ξεκινήσει ο οδηγός διαμόρφωσης, επιλέξτε `browser` για την εκτέλεση unit tests και ελέγχου στοιχείων και διαλέξτε ένα από τα presets αν το επιθυμείτε, διαφορετικά επιλέξτε _"Other"_ αν θέλετε να εκτελείτε μόνο βασικά unit tests. Μπορείτε επίσης να ορίσετε μια προσαρμοσμένη διαμόρφωση Vite αν χρησιμοποιείτε ήδη το Vite στο project σας. Για περισσότερες πληροφορίες, δείτε όλες τις [επιλογές του runner](/docs/runner#runner-options).

:::info

__Σημείωση:__ Το WebdriverIO από προεπιλογή εκτελεί τα browser tests σε CI σε headless λειτουργία, π.χ. όταν μια μεταβλητή περιβάλλοντος `CI` έχει οριστεί σε `'1'` ή `'true'`. Μπορείτε να ρυθμίσετε χειροκίνητα αυτή τη συμπεριφορά χρησιμοποιώντας την επιλογή [`headless`](/docs/runner#headless) του runner.

:::

Στο τέλος αυτής της διαδικασίας θα πρέπει να βρείτε ένα `wdio.conf.js` που περιέχει διάφορες διαμορφώσεις του WebdriverIO, συμπεριλαμβανομένης μιας ιδιότητας `runner`, π.χ.:

```ts reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

Ορίζοντας διαφορετικά [capabilities](/docs/configuration#capabilities) μπορείτε να εκτελείτε τα tests σας σε διαφορετικούς browsers, παράλληλα αν το επιθυμείτε.

Αν εξακολουθείτε να μην είστε σίγουροι πώς λειτουργούν όλα, παρακολουθήστε το ακόλουθο tutorial για το πώς να ξεκινήσετε με τον Έλεγχο Στοιχείων στο WebdriverIO:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## Test Harness

Εξαρτάται αποκλειστικά από εσάς τι θέλετε να εκτελείτε στα tests σας και πώς θέλετε να αποδίδετε τα στοιχεία. Ωστόσο, συνιστούμε τη χρήση του [Testing Library](https://testing-library.com/) ως βοηθητικό framework, καθώς παρέχει plugins για διάφορα component frameworks, όπως React, Preact, Svelte και Vue. Είναι πολύ χρήσιμο για την απόδοση στοιχείων στη σελίδα ελέγχου και καθαρίζει αυτόματα αυτά τα στοιχεία μετά από κάθε test.

Μπορείτε να συνδυάζετε τα primitives του Testing Library με εντολές του WebdriverIO όπως επιθυμείτε, π.χ.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__Σημείωση:__ η χρήση των μεθόδων render από το Testing Library βοηθά στην αφαίρεση των δημιουργημένων στοιχείων μεταξύ των tests. Αν δεν χρησιμοποιείτε το Testing Library, βεβαιωθείτε ότι προσαρτάτε τα στοιχεία ελέγχου σας σε ένα container που καθαρίζεται μεταξύ των tests.

## Scripts Εγκατάστασης

Μπορείτε να προετοιμάσετε τα tests σας εκτελώντας αυθαίρετα scripts σε Node.js ή στον browser, π.χ. εισάγοντας styles, κάνοντας mocking σε browser APIs ή συνδεόμενοι σε υπηρεσία τρίτου. Τα [hooks](/docs/configuration#hooks) του WebdriverIO μπορούν να χρησιμοποιηθούν για την εκτέλεση κώδικα σε Node.js, ενώ το [`mochaOpts.require`](/docs/frameworks#require) σας επιτρέπει να εισάγετε scripts στον browser πριν φορτωθούν τα tests, π.χ.:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // παρέχετε ένα script εγκατάστασης για εκτέλεση στον browser
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // ρύθμιση του περιβάλλοντος ελέγχου σε Node.js
    }
    // ...
}
```

Για παράδειγμα, αν θέλετε να κάνετε mock όλες τις κλήσεις [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) στο test σας με το ακόλουθο script εγκατάστασης:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// εκτέλεση κώδικα πριν φορτωθούν όλα τα tests
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // εκτέλεση κώδικα αφού φορτωθεί το αρχείο test
}

export const mochaGlobalTeardown = () => {
    // εκτέλεση κώδικα αφού εκτελεστεί το αρχείο spec
}

```

Τώρα στα tests σας μπορείτε να παρέχετε προσαρμοσμένες τιμές απόκρισης για όλα τα αιτήματα του browser. Διαβάστε περισσότερα για τα global fixtures στα [έγγραφα του Mocha](https://mochajs.org/#global-fixtures).

## Παρακολούθηση Αρχείων Test και Εφαρμογής

Υπάρχουν πολλοί τρόποι για να κάνετε αποσφαλμάτωση στα browser tests σας. Ο ευκολότερος είναι να ξεκινήσετε τον testrunner του WebdriverIO με τη σημαία `--watch`, π.χ.:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

Αυτό θα εκτελέσει αρχικά όλα τα tests και θα σταματήσει μόλις ολοκληρωθούν όλα. Στη συνέχεια μπορείτε να κάνετε αλλαγές σε μεμονωμένα αρχεία, τα οποία θα επανεκτελεστούν μεμονωμένα. Αν ορίσετε ένα [`filesToWatch`](/docs/configuration#filestowatch) που δείχνει στα αρχεία της εφαρμογής σας, θα επανεκτελεστούν όλα τα tests όταν γίνονται αλλαγές στην εφαρμογή σας.

## Αποσφαλμάτωση

Ενώ δεν είναι (ακόμη) δυνατό να ορίσετε breakpoints στο IDE σας και να αναγνωρίζονται από τον απομακρυσμένο browser, μπορείτε να χρησιμοποιήσετε την εντολή [`debug`](/docs/api/browser/debug) για να σταματήσετε το test σε οποιοδήποτε σημείο. Αυτό σας επιτρέπει να ανοίξετε τα DevTools και στη συνέχεια να κάνετε αποσφαλμάτωση στο test ορίζοντας breakpoints στην [καρτέλα sources](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools).

Όταν καλείται η εντολή `debug`, θα λάβετε επίσης μια διεπαφή Node.js repl στο τερματικό σας, που λέει:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

Πατήστε `Ctrl` ή `Command` + `c` ή πληκτρολογήστε `.exit` για να συνεχίσετε με το test.

## Εκτέλεση μέσω Selenium Grid

Αν έχετε ρυθμίσει ένα [Selenium Grid](https://www.selenium.dev/documentation/grid/) και εκτελείτε τον browser σας μέσω αυτού του grid, πρέπει να ορίσετε την επιλογή `host` του browser runner ώστε να επιτρέπεται στον browser να έχει πρόσβαση στον σωστό host όπου εξυπηρετούνται τα αρχεία test, π.χ.:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // διεύθυνση IP δικτύου του μηχανήματος που εκτελεί τη διεργασία WebdriverIO
        host: 'http://172.168.0.2'
    }]
}
```

Αυτό θα διασφαλίσει ότι ο browser ανοίγει σωστά το κατάλληλο instance του server που φιλοξενείται στο instance που εκτελεί τα tests του WebdriverIO.

## Παραδείγματα

Μπορείτε να βρείτε διάφορα παραδείγματα ελέγχου στοιχείων με δημοφιλή component frameworks στο [αποθετήριο παραδειγμάτων](https://github.com/webdriverio/component-testing-examples) μας.