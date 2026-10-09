---
id: runner
title: Runner
description: "Επιλέξτε μεταξύ του τοπικού runner και του browser runner και διαμορφώστε επιλογές του browser runner, όπως presets, ρυθμίσεις Vite και κάλυψη κώδικα."
---

import CodeBlock from '@theme/CodeBlock';

Ένας runner στο WebdriverIO ενορχηστρώνει το πώς και το πού εκτελούνται τα τεστ όταν χρησιμοποιείτε το testrunner. Το WebdriverIO υποστηρίζει προς το παρόν δύο διαφορετικούς τύπους runner: τον τοπικό (local) runner και τον browser runner.

## Local Runner

Ο [Local Runner](https://www.npmjs.com/package/@wdio/local-runner) εκκινεί το framework σας (π.χ. Mocha, Jasmine ή Cucumber) μέσα σε μια διεργασία worker και εκτελεί όλα τα αρχεία τεστ σας μέσα στο περιβάλλον Node.js. Κάθε αρχείο τεστ εκτελείται σε ξεχωριστή διεργασία worker ανά capability, επιτρέποντας μέγιστη ταυτόχρονη εκτέλεση. Κάθε διεργασία worker χρησιμοποιεί ένα μόνο στιγμιότυπο browser και επομένως εκτελεί τη δική της συνεδρία browser, επιτρέποντας μέγιστη απομόνωση.

Δεδομένου ότι κάθε τεστ εκτελείται στη δική του απομονωμένη διεργασία, δεν είναι δυνατή η κοινή χρήση δεδομένων μεταξύ αρχείων τεστ. Υπάρχουν δύο τρόποι για να το παρακάμψετε αυτό:

- χρησιμοποιήστε το [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service) για να μοιράζεστε δεδομένα μεταξύ όλων των workers
- ομαδοποιήστε τα αρχεία spec (διαβάστε περισσότερα στο [Organizing Test Suite](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

Αν δεν έχει οριστεί κάτι άλλο στο `wdio.conf.js`, ο Local Runner είναι ο προεπιλεγμένος runner στο WebdriverIO.

### Εγκατάσταση

Για να χρησιμοποιήσετε τον Local Runner, μπορείτε να τον εγκαταστήσετε μέσω:

```sh
npm install --save-dev @wdio/local-runner
```

### Ρύθμιση

Ο Local Runner είναι ο προεπιλεγμένος runner στο WebdriverIO, επομένως δεν χρειάζεται να τον ορίσετε μέσα στο `wdio.conf.js` σας. Αν θέλετε να τον ορίσετε ρητά, μπορείτε να το κάνετε ως εξής:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## Browser Runner

Σε αντίθεση με τον [Local Runner](https://www.npmjs.com/package/@wdio/local-runner), ο [Browser Runner](https://www.npmjs.com/package/@wdio/browser-runner) εκκινεί και εκτελεί το framework μέσα στον browser. Αυτό σας επιτρέπει να εκτελείτε unit tests ή component tests σε έναν πραγματικό browser αντί για ένα JSDOM, όπως κάνουν πολλά άλλα test frameworks. Το test bundle εκτελείται σε Chrome 90, Edge 90, Firefox 90 και Safari 14.1 ή νεότερες εκδόσεις. Δείτε το [Browser support](/docs/component-testing#browser-support).

Παρόλο που το [JSDOM](https://www.npmjs.com/package/jsdom) χρησιμοποιείται ευρέως για σκοπούς testing, τελικά δεν είναι πραγματικός browser ούτε μπορείτε να εξομοιώσετε κινητά περιβάλλοντα με αυτό. Με αυτόν τον runner, το WebdriverIO σας δίνει τη δυνατότητα να εκτελείτε εύκολα τα τεστ σας στον browser και να χρησιμοποιείτε εντολές WebDriver για να αλληλεπιδράτε με στοιχεία που αποδίδονται στη σελίδα.

Ακολουθεί μια επισκόπηση της εκτέλεσης τεστ μέσα στο JSDOM σε σύγκριση με τον Browser Runner του WebdriverIO

| | JSDOM | WebdriverIO Browser Runner |
|-|-------|----------------------------|
|1.| Εκτελεί τα τεστ σας μέσα στο Node.js χρησιμοποιώντας μια επανυλοποίηση των web standards, κυρίως των προτύπων WHATWG DOM και HTML | Εκτελεί το τεστ σας σε πραγματικό browser και τρέχει τον κώδικα σε ένα περιβάλλον που χρησιμοποιούν οι χρήστες σας |
|2.| Οι αλληλεπιδράσεις με components μπορούν μόνο να μιμηθούν μέσω JavaScript | Μπορείτε να χρησιμοποιήσετε το [WebdriverIO API](api) για να αλληλεπιδράτε με στοιχεία μέσω του πρωτοκόλλου WebDriver |
|3.| Η υποστήριξη Canvas απαιτεί [επιπλέον εξαρτήσεις](https://www.npmjs.com/package/canvas) και [έχει περιορισμούς](https://github.com/Automattic/node-canvas/issues) | Έχετε πρόσβαση στο πραγματικό [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) |
|4.| Το JSDOM έχει ορισμένες [επιφυλάξεις](https://github.com/jsdom/jsdom#caveats) και μη υποστηριζόμενα Web APIs | Όλα τα Web APIs υποστηρίζονται, καθώς τα τεστ εκτελούνται σε πραγματικό browser |
|5.| Αδύνατος ο εντοπισμός σφαλμάτων μεταξύ διαφορετικών browsers | Υποστήριξη για όλους τους browsers, συμπεριλαμβανομένων των mobile browsers |
|6.| __Δεν__ μπορεί να ελέγξει pseudo states στοιχείων | Υποστήριξη για pseudo states όπως `:hover` ή `:active` |

Αυτός ο runner χρησιμοποιεί το [Vite](https://vitejs.dev/) για να μεταγλωττίσει τον κώδικα των τεστ σας και να τον φορτώσει στον browser. Συνοδεύεται από presets για τα ακόλουθα component frameworks:

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

Κάθε αρχείο τεστ / ομάδα αρχείων τεστ εκτελείται μέσα σε μία μόνο σελίδα, πράγμα που σημαίνει ότι μεταξύ κάθε τεστ η σελίδα επαναφορτώνεται για να διασφαλιστεί η απομόνωση μεταξύ των τεστ.

### Εγκατάσταση

Για να χρησιμοποιήσετε τον Browser Runner, μπορείτε να τον εγκαταστήσετε μέσω:

```sh
npm install --save-dev @wdio/browser-runner
```

### Ρύθμιση

Για να χρησιμοποιήσετε τον Browser runner, πρέπει να ορίσετε μια ιδιότητα `runner` μέσα στο αρχείο `wdio.conf.js` σας, π.χ.:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### Επιλογές Runner

Ο Browser runner επιτρέπει τις ακόλουθες ρυθμίσεις:

#### `preset`

Αν ελέγχετε components χρησιμοποιώντας ένα από τα frameworks που αναφέρθηκαν παραπάνω, μπορείτε να ορίσετε ένα preset που διασφαλίζει ότι όλα είναι ρυθμισμένα από την αρχή. Αυτή η επιλογή δεν μπορεί να χρησιμοποιηθεί μαζί με το `viteConfig`.

__Τύπος:__ `vue` | `svelte` | `solid` | `react` | `preact` | `stencil`<br />
__Παράδειγμα:__

```js title="wdio.conf.js"
export const {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

#### `viteConfig`

Ορίστε τη δική σας [ρύθμιση Vite](https://vitejs.dev/config/). Μπορείτε είτε να περάσετε ένα προσαρμοσμένο αντικείμενο είτε να εισάγετε ένα υπάρχον αρχείο `vite.conf.ts` αν χρησιμοποιείτε το Vite.js για development. Σημειώστε ότι το WebdriverIO διατηρεί τις προσαρμοσμένες ρυθμίσεις Vite για να στήσει το test harness.

__Τύπος:__ `string` ή [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) ή `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__Παράδειγμα:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // ή απλώς:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // ή χρησιμοποιήστε μια συνάρτηση αν η ρύθμιση vite περιέχει πολλά plugins
    // τα οποία θέλετε να επιλύονται μόνο όταν διαβάζεται η τιμή
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

Αν οριστεί σε `true`, ο runner θα ενημερώσει τα capabilities ώστε να εκτελούνται τα τεστ σε headless λειτουργία. Από προεπιλογή, αυτό είναι ενεργοποιημένο σε περιβάλλοντα CI όπου μια μεταβλητή περιβάλλοντος `CI` έχει οριστεί σε `'1'` ή `'true'`.

__Τύπος:__ `boolean`<br />
__Προεπιλογή:__ `false`, ορίζεται σε `true` αν έχει οριστεί η μεταβλητή περιβάλλοντος `CI`

#### `rootDir`

Ο ριζικός κατάλογος του project.

__Τύπος:__ `string`<br />
__Προεπιλογή:__ `process.cwd()`

#### `coverage`

Το WebdriverIO υποστηρίζει αναφορές κάλυψης τεστ (test coverage) μέσω του [`istanbul`](https://istanbul.js.org/). Δείτε τις [Επιλογές Κάλυψης](#coverage-options) για περισσότερες λεπτομέρειες.

__Τύπος:__ `object`<br />
__Προεπιλογή:__ `undefined`

### Επιλογές Κάλυψης

Οι ακόλουθες επιλογές επιτρέπουν τη ρύθμιση των αναφορών κάλυψης.

#### `enabled`

Ενεργοποιεί τη συλλογή δεδομένων κάλυψης.

__Τύπος:__ `boolean`<br />
__Προεπιλογή:__ `false`

#### `include`

Λίστα αρχείων που περιλαμβάνονται στην κάλυψη ως glob patterns.

__Τύπος:__ `string[]`<br />
__Προεπιλογή:__ `[**]`

#### `exclude`

Λίστα αρχείων που εξαιρούνται από την κάλυψη ως glob patterns.

__Τύπος:__ `string[]`<br />
__Προεπιλογή:__

```
[
  'coverage/**',
  'dist/**',
  'packages/*/test{,s}/**',
  '**/*.d.ts',
  'cypress/**',
  'test{,s}/**',
  'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
  '**/__tests__/**',
  '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
  '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
]
```

#### `extension`

Λίστα επεκτάσεων αρχείων που πρέπει να περιλαμβάνει η αναφορά.

__Τύπος:__ `string | string[]`<br />
__Προεπιλογή:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

Κατάλογος στον οποίο θα γραφτεί η αναφορά κάλυψης.

__Τύπος:__ `string`<br />
__Προεπιλογή:__ `./coverage`

#### `reporter`

Οι reporters κάλυψης που θα χρησιμοποιηθούν. Δείτε την [τεκμηρίωση του istanbul](https://istanbul.js.org/docs/advanced/alternative-reporters/) για αναλυτική λίστα όλων των reporters.

__Τύπος:__ `string[]`<br />
__Προεπιλογή:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

Έλεγχος ορίων (thresholds) ανά αρχείο. Δείτε τα `lines`, `functions`, `branches` και `statements` για τα πραγματικά όρια.

__Τύπος:__ `boolean`<br />
__Προεπιλογή:__ `false`

#### `clean`

Καθαρισμός των αποτελεσμάτων κάλυψης πριν από την εκτέλεση των τεστ.

__Τύπος:__ `boolean`<br />
__Προεπιλογή:__ `true`

#### `lines`

Όριο για τις γραμμές.

__Τύπος:__ `number`<br />
__Προεπιλογή:__ `undefined`

#### `functions`

Όριο για τις συναρτήσεις.

__Τύπος:__ `number`<br />
__Προεπιλογή:__ `undefined`

#### `branches`

Όριο για τις διακλαδώσεις.

__Τύπος:__ `number`<br />
__Προεπιλογή:__ `undefined`

#### `statements`

Όριο για τις εντολές (statements).

__Τύπος:__ `number`<br />
__Προεπιλογή:__ `undefined`

### Περιορισμοί

Όταν χρησιμοποιείτε τον browser runner του WebdriverIO, είναι σημαντικό να σημειωθεί ότι διάλογοι που μπλοκάρουν το thread, όπως τα `alert` ή `confirm`, δεν μπορούν να χρησιμοποιηθούν εγγενώς. Αυτό συμβαίνει επειδή μπλοκάρουν την ιστοσελίδα, πράγμα που σημαίνει ότι το WebdriverIO δεν μπορεί να συνεχίσει να επικοινωνεί με τη σελίδα, με αποτέλεσμα η εκτέλεση να «κολλάει».

Σε τέτοιες περιπτώσεις, το WebdriverIO παρέχει προεπιλεγμένα mocks με προεπιλεγμένες τιμές επιστροφής για αυτά τα APIs. Αυτό διασφαλίζει ότι, αν ο χρήστης χρησιμοποιήσει κατά λάθος σύγχρονα popup web APIs, η εκτέλεση δεν θα κολλήσει. Ωστόσο, εξακολουθεί να συνιστάται στον χρήστη να κάνει mock αυτά τα web APIs για καλύτερη εμπειρία. Διαβάστε περισσότερα στο [Mocking](/docs/component-testing/mocking).

### Παραδείγματα

Φροντίστε να ρίξετε μια ματιά στην τεκμηρίωση σχετικά με το [component testing](https://webdriver.io/docs/component-testing) και στο [αποθετήριο παραδειγμάτων](https://github.com/webdriverio/component-testing-examples) για παραδείγματα που χρησιμοποιούν αυτά και διάφορα άλλα frameworks.