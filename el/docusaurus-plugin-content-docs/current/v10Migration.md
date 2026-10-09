---
id: v10-migration
title: Από το v9 στο v10
description: Αναβαθμίστε ένα έργο WebdriverIO v9 στο v10, με όλες τις ασύμβατες αλλαγές και ένα skill για coding agent που εφαρμόζει αυτόν τον οδηγό.
---

Αυτός ο οδηγός συγκεντρώνει τις ασύμβατες αλλαγές του WebdriverIO `v10` και τι πρέπει να κάνετε για καθεμία.

Σε αντίθεση με προηγούμενες κύριες εκδόσεις, οι περισσότερες από αυτές τις αλλαγές δεν μπορούν να εφαρμοστούν από το [codemod](https://github.com/webdriverio/codemod) του WebdriverIO, επειδή εξαρτώνται από το τι πραγματικά σημαίνουν τα τεστ σας. Οι [παλαιές υπογραφές εντολών](#legacy-command-signatures) παρακάτω είναι μηχανικές αντικαταστάσεις. Κάθε άλλη ενότητα περιγράφει πώς να βρείτε τα σημεία που επηρεάζονται στη σουίτα σας.

## Μετάβαση με coding agent

Δώστε στον agent σας το skill μετάβασης στο v10 και ζητήστε του να μεταφέρει τη σουίτα στο WebdriverIO v10, ακολουθώντας αυτή τη σελίδα. Το skill είναι η διαδικασία: τι να αναζητήσει, ποιο codemod να εκτελέσει και πότε να σταματήσει. Αυτή η σελίδα είναι η πηγή αλήθειας για κάθε ασύμβατη αλλαγή.

Εγκαταστήστε το από το έργο που αναβαθμίζετε. Το [skills CLI](https://skills.sh) διαβάζει το [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) από αυτό το αποθετήριο και το γράφει στον κατάλογο skills των agents που επιλέγετε:

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

Το `--skill wdio-v10-migration` εγκαθιστά αυτό το skill. Τα skills για εργασία πάνω στο αποθετήριο του WebdriverIO είναι σημειωμένα ως εσωτερικά και δεν προσφέρονται. Το CLI ρωτά για ποιους agents να γίνει η εγκατάσταση και γράφει το skill στον κατάλογο έργου κάθε agent. Μπορείτε επίσης να επισυνάψετε αυτό το αρχείο στη συνομιλία.

Οι αυστηροί selectors και οι σκέτες λίστες `specs` / `exclude` στα capabilities εμφανίζονται μόνο όταν εκτελείται η σουίτα. Το skill δεν μπορεί να τα αποφασίσει μόνο από τον πηγαίο κώδικα.

## Node.js

Το WebdriverIO v10 απαιτεί Node.js 22.19.0 ή νεότερο. Τα Node.js 18 και 20 δεν υποστηρίζονται πλέον. Το CI καλύπτει τα Node.js 22, 24 και 26.

## Component tests

Ο browser runner εξακολουθεί να εκτελείται σε Chrome 90, Edge 90, Firefox 90 και Safari 14.1 ή νεότερα. Δείτε [Υποστήριξη browser](/docs/component-testing#browser-support).

Ο κώδικας που περνάτε στο `browser.execute` παραμένει σε ES2021, ώστε να μπορεί να εκτελείται σε παλαιότερους browsers υπό δοκιμή. Αυτό το κατώτατο όριο δεν άλλαξε.

## Mocha

Τα `@wdio/mocha-framework` και `@wdio/browser-runner` εξαρτώνται από το [Mocha 12](https://mochajs.org/blog/mocha-12-stable/). Το Mocha 12 χρειάζεται Node.js `^20.19.0 || >=22.12.0`, κάτι που καλύπτεται από το κατώτατο όριο 22.19.0 του v10.

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

Το `mochaOpts.compilers` καταργήθηκε. Το Mocha αφαίρεσε τη σημαία `--compilers`, που ήταν από καιρό deprecated, οπότε οι εναπομείναντες αντιστοιχισμοί compilers αγνοούνται. Φορτώστε transpilers ή άλλα αρχεία ρύθμισης με το `mochaOpts.require`.

Το `failHookAffectedTests` έχει προεπιλογή `true`. Ένα αποτυχημένο hook `before` ή `beforeEach` κάνει να αποτύχουν τα τεστ που παρέλειψε αυτό το hook. Ορίστε το `mochaOpts.failHookAffectedTests` σε `false` για να αναφέρεται μόνο το hook.

Χρησιμοποιήστε το `expect-webdriverio` 8, δείτε [expect-webdriverio 8](#expect-webdriverio-8). Το Mocha μπορεί να φορτώσει αυτό το πακέτο δύο φορές σε μία διεργασία· το πακέτο μοιράζεται την κατάσταση των assertions μεταξύ αυτών των αντιγράφων ([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221)).

Αλλαγές του Mocha 12 που μπορεί να διαρρεύσουν μέσω του `mochaOpts`:

- Το `grep` δέχεται σύγχρονες σημαίες RegExp.
- Το `ui` εξακολουθεί να είναι `bdd`, `tdd`, `qunit` ή `exports`. Τα προσαρμοσμένα interfaces πρέπει να διατηρούν την κατάληξη `*-bdd`, `*-tdd` ή `*-qunit`.
- Το `parallel` εξακολουθεί να μην υποστηρίζεται. Το WDIO διαχειρίζεται τον παραλληλισμό των specs· η δεξαμενή workers του Mocha θα προκαλέσει σφάλμα αν την ενεργοποιήσετε.

Το Mocha 12 είναι πρωτίστως ESM (`"type": "module"`). Το προγραμματιστικό `require('mocha')` εξακολουθεί να λειτουργεί στο Node 22 μέσω `require(esm)`. Το Mocha CLI του WDIO (`wdio run … --mochaOpts.*`) δεν αλλάζει· το δικό CLI του Mocha χρησιμοποιεί πλέον το `util.parseArgs` αντί για το yargs.

## Cucumber

Το `@wdio/cucumber-framework` εξαρτάται από το [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

Το Cucumber 13 απαιτεί Node.js 22, 24 ή 26 ή νεότερο. Δεν εκτελείται σε Node.js 20, 23 ή 25. Το πακέτο του framework δηλώνει το ίδιο εύρος, ξεκινώντας από το κατώτατο όριο 22.19.0 του v10.

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

Το `tagExpression` δεν έχει alias. Ο ορισμός του προκαλεί σφάλμα, ώστε ένα ξεχασμένο φίλτρο να μην μπορεί να εκτελέσει σιωπηλά κάθε σενάριο.

Το Cucumber 13 δεν εξάγει πλέον το `Cli`. Οι προγραμματιστικές εκτελέσεις γίνονται μέσω του `runCucumber` από το `@cucumber/cucumber/api`, το οποίο ήδη χρησιμοποιεί ο adapter.

Άλλες ασύμβατες αλλαγές του Cucumber 13 (διφορούμενες διαδρομές formatter, παράλληλοι workers, `BeforeAll` / `AfterAll`) περιγράφονται στον [οδηγό αναβάθμισης του Cucumber](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

## Jasmine

Το `@wdio/jasmine-framework` εξαρτάται από το [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0). Το Jasmine 6 έχει δοκιμαστεί σε Node.js 20, 22 και 24. Το κατώτατο όριο 22.19.0 του v10 καλύπτει ήδη αυτό το εύρος.

Το `jasmineNodeOpts` αφαιρέθηκε. Ρυθμίστε το Jasmine με το `jasmineOpts`. Ο ορισμός του `jasmineNodeOpts` προκαλεί σφάλμα:

```text
The option "jasmineNodeOpts" was removed in WebdriverIO v10. Use "jasmineOpts" instead.
```

```diff
- jasmineNodeOpts: { defaultTimeoutInterval: 60000 }
+ jasmineOpts: { defaultTimeoutInterval: 60000 }
```

Το `jasmineOpts.failFast` δεν διαβάζεται πλέον. Χρησιμοποιήστε το `jasmineOpts.stopOnSpecFailure`. Ένα ξεχασμένο `failFast` δεν σταματά τη σουίτα. Το `failFast` του Cucumber είναι διαφορετική επιλογή και εξακολουθεί να λειτουργεί.

```diff
- jasmineOpts: { failFast: true }
+ jasmineOpts: { stopOnSpecFailure: true }
```

Το `jasmineOpts.stopSpecOnExpectationFailure` αφαιρέθηκε. Χρησιμοποιήστε το `jasmineOpts.oneFailurePerSpec`. Ο ορισμός του παλιού κλειδιού προκαλεί σφάλμα:

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

Οι σύγχρονοι matchers του Jasmine είναι ξανά σύγχρονοι. Στο v9, το καθολικό `expect` ήταν το `expectAsync` του Jasmine, οπότε το `expect(1).toBe(1)` επέστρεφε promise. Στο v10, οι ενσωματωμένοι matchers του Jasmine και οι matchers που προσθέτετε με το `jasmine.addMatchers` επιστρέφουν `undefined`. Οι matchers του WebdriverIO, οι ασύγχρονοι matchers του Jasmine και οι matchers του `jasmine.addAsyncMatchers` εξακολουθούν να επιστρέφουν promise, οπότε συνεχίστε να τους κάνετε `await`. Δεν χρειάζεται να αλλάξετε το `await expect($('#logo')).toBeDisplayed()` σε `expectAsync()`: το καθολικό `expect` στέλνει τους matchers του WebdriverIO στο `expectAsync` για εσάς. Το `await expect(1).toBe(1)` συνεχίζει να λειτουργεί.

Ένα αποτυχημένο σύγχρονο assertion χωρίς `await` κάνει πλέον το spec να αποτύχει. Στο v9, ήταν ένα απορριφθέν promise: αν τίποτα δεν το περίμενε, το spec μπορούσε να περάσει, με μόνο ένα unhandled rejection στο log. Μετά την αναβάθμιση, εξετάστε τα specs που αρχίζουν να αποτυγχάνουν. Είχαν μια κρυφή αποτυχία στο v9, και η διόρθωση βρίσκεται στο τεστ ή στην εφαρμογή, όχι στην κλήση `expect`:

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9: περνούσε ακόμη και όταν το `onSave` δεν είχε κληθεί
    // v10: αποτυγχάνει όταν το `onSave` δεν έχει κληθεί
    expect(onSave).toHaveBeenCalled()
})
```

Το αποτέλεσμα ενός σύγχρονου matcher είναι πλέον `undefined`, οπότε το `.then()` ή το `.catch()` πάνω του προκαλεί `TypeError`:

```diff
- expect(total).toBe(3).then(() => log('ok'))
+ expect(total).toBe(3)
+ log('ok')
```

Άλλες επιπτώσεις αυτής της αλλαγής:

- Το `oneFailurePerSpec` σταματά πλέον το spec στο πρώτο αποτυχημένο assertion του: αμέσως για έναν σύγχρονο matcher, και όταν διευθετηθεί το promise για έναν ασύγχρονο matcher με `await`.
- Οι spy matchers του Jasmine λειτουργούν χωρίς `await`. Στο v9, τα `toHaveBeenCalled`, `toHaveSpyInteractions` και `toHaveNoOtherSpyInteractions` αποτύγχαναν με "Does not take arguments", και ένα spy που δεν είχε κληθεί περνούσε χωρίς `await`.
- Το `jasmine.addMatchers` δεν αντικαθίσταται πλέον, οπότε το Jasmine δεν εμφανίζει πια την προειδοποίηση "Monkey patching detected".

Το `toHaveSize` έχει δύο σημασίες. Σε μια τιμή WebdriverIO, είναι ο matcher του WebdriverIO και ελέγχει το μέγεθος του στοιχείου: ένα στοιχείο, έναν πίνακα στοιχείων (συμπεριλαμβανομένου του αποτελέσματος του `$$().filter()`), ένα `Element[]`, ένα multi-remote στοιχείο, έναν browser, ένα browsing context, ένα mock, το wrapper `some()` ή ένα promise όπως ένα chainable `$()`. Σε οποιαδήποτε άλλη τιμή, είναι ο matcher του Jasmine και ελέγχει το μήκος. Στο v9, εκτελούνταν πάντα ο matcher του Jasmine.

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine, σύγχρονο
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, ασύγχρονο
```

Οι τύποι ακολουθούν τους ίδιους κανόνες. Το `@wdio/jasmine-framework` δίνει πλέον στο καθολικό `expect` τους τύπους των matchers του Jasmine, μαζί με τους matchers του WebdriverIO και τους ασύγχρονους matchers του Jasmine, οι οποίοι επιστρέφουν promise. Αφαιρέστε το `expect-webdriverio/jasmine-wdio-expect-async` από το `types` στο `tsconfig.json` σας, επειδή δίνει σε κάθε matcher ασύγχρονο τύπο. Προσθέστε το `jasmine` αν δεν υπάρχει:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "types": ["node", "@wdio/globals/types", "expect-webdriverio/jasmine-wdio-expect-async", "@wdio/jasmine-framework"]
+        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
     }
 }
```

Τα `expect.oneOf()` και `expect.multiRemote()` λειτουργούν πλέον και σε specs του Jasmine. Πριν, δεν υπήρχαν στο `expect` του Jasmine κατά την εκτέλεση.

## expect-webdriverio 8

Τα `@wdio/globals`, `@wdio/runner` και `@wdio/browser-runner` απαιτούν το `expect-webdriverio` 8 ως peer dependency. Στο v9, ήταν το `expect-webdriverio` 7. Αν το `package.json` σας περιλαμβάνει το `expect-webdriverio`, ενημερώστε το στην έκδοση 8 στην ίδια αλλαγή με τα πακέτα `@wdio/*`.

Το `expect-webdriverio` 8 έχει τις δικές του ασύμβατες αλλαγές. Ο [οδηγός μετάβασης από v7 σε v8](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) απαριθμεί κάθε αλλαγή και την αντικατάστασή της. Αυτές οι αλλαγές είναι οι πιο πιθανές να επηρεάσουν μια σουίτα τεστ:

- Το `toHaveText` στο `$$()` συγκρίνει τα στοιχεία δείκτη προς δείκτη. Ένας αναμενόμενος πίνακας με σειρά διαφορετική από τη σελίδα αποτυγχάνει. Χρησιμοποιήστε τη σειρά της σελίδας, το `expect.oneOf()` ή το `expect.arrayContaining()`.
- Ένας πίνακας αναμενόμενων τιμών σε ένα μεμονωμένο στοιχείο αποτυγχάνει στα `toHaveText`, `toHaveHTML`, `toHaveComputedLabel` και `toHaveComputedRole`. Χρησιμοποιήστε το `expect.oneOf()`.
- Τα `setFeatureFlags()` και η επιλογή `featureFlags` αφαιρέθηκαν.
- Αυτά τα deprecated APIs αφαιρέθηκαν: `setOptions` (χρησιμοποιήστε `setDefaultOptions`), `getConfig` (χρησιμοποιήστε `getDefaultOptions`), `matchers` (χρησιμοποιήστε `wdioCustomMatchers`), `toHaveAttr` (χρησιμοποιήστε `toHaveAttribute`), `toHaveClass` (χρησιμοποιήστε `toHaveElementClass`), `toBeRequestedWithResponse()` (χρησιμοποιήστε `toBeRequestedWith({ response })`) και `expect-webdriverio/types` (χρησιμοποιήστε `expect-webdriverio/expect-global`).
- Τα hooks `beforeAssertion` και `afterAssertion` λαμβάνουν το όνομα του alias που κάλεσε το τεστ, για τα `toBeExisting`, `toBePresent`, `toHaveLink`, `toHaveValue` και `toBeRequested`. Στο v9, λάμβαναν το όνομα του matcher πίσω από το alias, για παράδειγμα `toExist` για το `toBeExisting`.
- Σε έναν multi-remote browser, δώστε στο `expect` το αποτέλεσμα του `$$()`. Ένας απλός πίνακας όπως `[...elements]` ή `Array.from(elements)` δεν αναγνωρίζεται ως στοιχεία, και το assertion αποτυγχάνει.

Σε έναν multi-remote browser, ένα assertion ελέγχει κάθε instance, και το `expect.multiRemote()` δίνει μία αναμενόμενη τιμή ανά instance. Δείτε [Multiremote assertions](/docs/multiremote#assertions).

## Καθολική μεταβλητή Multi-remote

Η καθολική μεταβλητή με πεζά `multiremotebrowser` αφαιρέθηκε, από το `@wdio/globals` και επίσης από τις καθολικές μεταβλητές του `eslint-plugin-wdio`. Χρησιμοποιήστε το `multiRemoteBrowser`.

```diff
- import { multiremotebrowser } from '@wdio/globals'
+ import { multiRemoteBrowser } from '@wdio/globals'
```

## Capabilities

Τα `specs` και `exclude` στα capabilities δεν διαβάζονται πλέον. Χρησιμοποιήστε τα `wdio:specs` και `wdio:exclude`.

```diff
  capabilities: [{
      browserName: 'chrome',
-     specs: ['./test/specs/chrome/**/*.js'],
-     exclude: ['./test/specs/chrome/skip.js']
+     'wdio:specs': ['./test/specs/chrome/**/*.js'],
+     'wdio:exclude': ['./test/specs/chrome/skip.js']
  }]
```

Τα κλειδιά ανώτατου επιπέδου της ρύθμισης παραμένουν `specs` και `exclude`. Μια ξεχασμένη σκέτη λίστα σε ένα capability δεν επιλέγει αρχεία για αυτό το capability. Το capability τότε χρησιμοποιεί τα `specs` και `exclude` ανώτατου επιπέδου.

Τα aliases `tunnelIdentifier` και `parentTunnel` αφαιρέθηκαν από τους τύπους επιλογών του Sauce Labs. Χρησιμοποιήστε τα `tunnelName` και `tunnelOwner`.

## TypeScript

Οι τύποι `Element`, `MultiRemoteBrowser` και `MultiRemoteElement` που εξάγονταν από το `webdriverio` αφαιρέθηκαν. Χρησιμοποιήστε το καθολικό namespace `WebdriverIO`.

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

Το `ChainablePromiseElement` δηλώνει πλέον `then`, και το `ChainablePromiseArray` δηλώνει `then`, `catch` και `finally`. Οι chainable τύποι περιγράφουν την τιμή πριν από το `await`. Δεν ταιριάζουν πλέον με την τιμή μετά το `await`:

```ts
let elem: ChainablePromiseElement
elem = await $('h1')
// TS2741: Property 'then' is missing in type 'Element' but required in type 'ChainablePromiseElement'.

let elems: ChainablePromiseArray
elems = await $$('li')
// TS2322: Type 'ElementArray' is not assignable to type 'ChainablePromiseArray'.
```

Δώστε στην τιμή μετά το `await` τον τύπο `WebdriverIO.Element` ή `WebdriverIO.ElementArray`:

```diff
- let elem: ChainablePromiseElement = await $('h1')
- let elems: ChainablePromiseArray = await $$('li')
+ let elem: WebdriverIO.Element = await $('h1')
+ let elems: WebdriverIO.ElementArray = await $$('li')
```

Και οι δύο chainable τύποι ταιριάζουν πλέον με το `T extends PromiseLike<unknown>`. Ένας conditional τύπος που ελέγχει για `PromiseLike` ακολουθεί για τα `$()` και `$$()` διαφορετικό κλάδο από ό,τι στο v9. Για παράδειγμα, το `Awaited<ChainablePromiseElement>` είναι πλέον `WebdriverIO.Element`, και το `Awaited<ChainablePromiseArray>` είναι `WebdriverIO.ElementArray`.

Οι ιδιότητες ενός `$$()` χωρίς `await` άλλαξαν τύπο. Είναι διαθέσιμες αμέσως, πριν επιλυθεί το query, οπότε διαβάστε τες χωρίς `await` ή `.then()`:

| Ιδιότητα | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | ο γονέας, όχι promise (δείτε παρακάτω) |
| `foundWith` | καμία | η εντολή που βρήκε τη λίστα, π.χ. `$$` ή `custom$$` |
| `props` | καμία | τα επιπλέον ορίσματα αυτής της εντολής |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

Σε ένα αλυσιδωτό query όπως το `$('form').$$('input')`, το `parent` είναι το chainable `$('form')` μέχρι να επιλυθεί η λίστα, και το επιλυμένο στοιχείο μετά από αυτό. Κάντε `await` τη λίστα πριν χρησιμοποιήσετε το `parent` ως στοιχείο.

Κατά την εκτέλεση, τα `filter()`, `filterSeries()` και `slice()` σε μια λίστα `$$()` επιστρέφουν λίστα στοιχείων, όχι απλό πίνακα. Το αποτέλεσμα διατηρεί τα `selector`, `foundWith`, `parent` και `props` της αρχικής λίστας. Στο v9, το `filter()` επέστρεφε απλό πίνακα χωρίς αυτές τις ιδιότητες. Οι τύποι δεν το δείχνουν ακόμη αυτό: τα `filter()` και `filterSeries()` δηλώνεται ότι επιστρέφουν `Promise<WebdriverIO.Element[]>`, και το `slice()` επιστρέφει `WebdriverIO.Element[]`, οπότε το TypeScript αναφέρει σφάλμα όταν διαβάζετε αυτές τις ιδιότητες στο αποτέλεσμα.

Το WebdriverIO δεν εκτελεί ξανά το query για την ίδια την παράγωγη λίστα: ένας δείκτης πέρα από το τέλος της δεν περιμένει για περισσότερες αντιστοιχίες, και δεν επιστρέφει ποτέ ένα στοιχείο που εξαίρεσε το φίλτρο. Τα μέλη της εξακολουθούν να είναι τα στοιχεία του αρχικού query, με τα αρχικά τους `selector` και `index`. Αν ένα μέλος γίνει stale, το WebdriverIO το ανακτά ξανά από το αρχικό query σε αυτόν τον δείκτη, που μπορεί να είναι άλλο στοιχείο αν η σελίδα άλλαξε. Κώδικας που εκτελεί ξανά το query μιας λίστας από τις ιδιότητες της λίστας, για παράδειγμα `parent[foundWith](selector, ...props)`, παίρνει την πλήρη λίστα, όχι τη φιλτραρισμένη.

Τα δημοσιευμένα πακέτα ορίζουν το `typeScriptVersion` σε 6.0.3, ταιριάζοντας με την έκδοση TypeScript με την οποία μεταγλωττίζεται αυτό το αποθετήριο.

Το `browser.mock()` δέχεται το `URLPattern` του `urlpattern-polyfill` και το εγγενές `URLPattern` (καθολικό στο Node.js 24, και με τύπους από τη βιβλιοθήκη `dom` του TypeScript 6).

Το TypeScript 6 καθιστά deprecated τα `"moduleResolution": "node"` και `"baseUrl"`, και κάνει το `strict` προεπιλογή. Το `create-wdio` παράγει πλέον `"moduleResolution": "bundler"` για έργα ESM και `"NodeNext"` για έργα CommonJS. Αν ενημερώσετε το TypeScript σε ένα υπάρχον έργο, αλλάξτε αυτές τις επιλογές στο `tsconfig.json` σας.

Για ένα έργο ESM:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
+        "moduleResolution": "bundler",
         "module": "ESNext"
     }
 }
```

Για ένα έργο CommonJS, χρησιμοποιήστε `NodeNext` και για τις δύο επιλογές, όπως κάνει το `create-wdio`:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
-        "module": "CommonJS"
+        "moduleResolution": "NodeNext",
+        "module": "NodeNext"
     }
 }
```

Το TypeScript 6 αλλάζει επίσης την προεπιλογή του `types` σε `[]`, οπότε δεν φορτώνει πλέον κάθε εγκατεστημένο πακέτο `@types/*`. Αν το `tsconfig.json` σας δεν έχει λίστα `types`, καθολικές μεταβλητές όπως τα `describe` και `it` του Mocha αποτυγχάνουν με `Cannot find name`. Απαριθμήστε τα πακέτα τύπων που χρησιμοποιούν τα τεστ σας, όπως κάνει το `create-wdio`. Για παράδειγμα, με το Mocha:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

Το `npm create wdio@latest` γράφει τα `compilerOptions.target` και `compilerOptions.lib` ως `es2024`. Ο έλεγχος τύπων αυτού του αρχείου χρειάζεται TypeScript 5.7 ή νεότερο. Το `tsx`, που εκτελεί τη ρύθμιση και τα τεστ, δεν κάνει έλεγχο τύπων, οπότε ένας παλαιότερος compiler έχει σημασία μόνο όταν εκτελείτε εσείς το `tsc`.

Ένα υπάρχον `tsconfig.json` δεν ξαναγράφεται. Μια παραγόμενη ρύθμιση που επεκτείνει άλλη ρύθμιση διατηρεί τα `target` και `lib` της γονικής.

Στο hook `afterAssertion`, ο τύπος του `params.result` είναι πλέον `{ pass, message }`, όπως το δίνουν οι matchers. Στο v9, ο τύπος ήταν `{ result, message }`, αλλά το `params.result.result` ήταν πάντα `undefined` κατά την εκτέλεση. Διαβάστε το `params.result.pass`:

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

Το `pass` είναι `true` όταν η τιμή ταιριάζει με την αναμενόμενη τιμή, και με `.not`. Έτσι, με `.not`, το assertion περνά όταν το `pass` είναι `false`. Το hook δεν λέει αν το τεστ χρησιμοποίησε `.not`.

## Reporters

Το συμβάν `result` του browser προωθείται στους reporters ως `client:afterCommand`. Αυτό το payload και ο τύπος `AfterCommandArgs` δεν έχουν πλέον ιδιότητα `name`. Διαβάστε το `command` αντί αυτού. Οι προσαρμοσμένες εντολές έστελναν ήδη το `command`.

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

Το `addEnvironment(name, value)` στο `@wdio/allure-reporter` αφαιρέθηκε. Δεν είχε κανένα αποτέλεσμα. Ορίστε γραμμές περιβάλλοντος με το [`reportedEnvironmentVars`](/docs/allure-reporter) στις επιλογές του Allure reporter.

## Το `$` είναι αυστηρό

Το `$` αντιπροσωπεύει πλέον __ακριβώς ένα__ στοιχείο. Αν ο selector επιλύεται σε περισσότερα από ένα στοιχεία, η εντολή προκαλεί `StrictSelectorError` αντί να χρησιμοποιεί σιωπηλά την πρώτη αντιστοιχία:

```js
// v9 — κάνει κλικ στο πρώτο κουμπί, ακόμη κι αν υπάρχουν 12
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

Αυτό ταιριάζει με τους [locators του Playwright](https://playwright.dev/docs/locators#strictness). Το Cypress διαφέρει: τα queries του μπορούν να επιλύονται σε πολλά στοιχεία, και οι εντολές ενεργειών όπως το [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) είναι αυτές που απορρίπτουν από προεπιλογή ένα subject πολλαπλών στοιχείων. Ένας selector που επιλύεται σιωπηλά σε πολλά στοιχεία είναι σχεδόν πάντα ένα λανθάνον bug: περνά σήμερα και αλληλεπιδρά με το λάθος στοιχείο μόλις κάποιος προσθέσει ένα δεύτερο κουμπί στη σελίδα.

Ο κανόνας ισχύει για κάθε βήμα μιας αλυσίδας (`$('form').$('input')`) και για κάθε τύπο selector που δέχεται το `$` — string selectors (συμπεριλαμβανομένων αυτών που διαπερνούν το shadow DOM), JS functions, mobile selectors και αναφορές σε προσαρμοσμένες στρατηγικές.

### Τι δεν άλλαξε

- Το `$$` εξακολουθεί να επιστρέφει μηδέν ή πολλά στοιχεία. Από το v10, αυτή η λίστα είναι ένα [`ElementArray`](/docs/api/browser/$$): ένας πραγματικός πίνακας που μπορείτε να κάνετε `await`, με `for await` και ασύγχρονα `map` / `filter` διαθέσιμα πριν επιλυθεί. Το `await $$('button').length` είναι το πλήθος. Το `$$('button').length > 0` δεν είναι, επειδή το `length` είναι promise μέχρι να επιλυθεί η λίστα. Το `for (const el of $$('button'))` προκαλεί σφάλμα μέχρι να κάνετε `await` τη λίστα· χρησιμοποιήστε `for await`, ή `for...of` μετά το `await`.
- Οι ειδικές βοηθητικές εντολές `custom$`, `shadow$` και `react$` δεν είναι αυστηρές — εξακολουθούν να επιστρέφουν την πρώτη αντιστοιχία τους, όπως και τα αντίστοιχα `$$`.
- Ένας selector που δεν ταιριάζει με τίποτα εξακολουθεί να επιστρέφει ένα στοιχείο με lazy επίλυση, οπότε το `waitForExist` και η [αυτόματη αναμονή](/docs/autowait) συμπεριφέρονται όπως πριν.
- Η μεταβίβαση αναφοράς στοιχείου, π.χ. `$(await browser.getActiveElement())`, αναφέρεται πάντα σε έναν μόνο κόμβο και δεν ελέγχεται ποτέ.

### Πώς να ελέγξετε τη σουίτα σας

Δεν υπάρχει codemod για αυτό: μόνο εσείς μπορείτε να πείτε αν μια δεύτερη αντιστοιχία είναι bug ή σκόπιμη. Δύο πρακτικές προσεγγίσεις:

1. __Εκτελέστε τη σουίτα σας.__ Κάθε παραβίαση προκαλεί σφάλμα με τον selector και τον αριθμό αντιστοιχιών, κάτι που συνήθως αρκεί για να τη διορθώσετε επί τόπου.
2. __Ελέγξτε εκ των προτέρων τους ευρείς selectors.__ Για κάθε γενικό `$(...)` στα page objects σας, εκτυπώστε πόσα στοιχεία ταιριάζει πραγματικά:

   ```js
   console.log(await $$('button').length) // 12 → το `$('button')` είναι πολύ ευρύ
   ```

Στη συνέχεια, είτε περιορίστε τον selector — ιδανικά προς ένα query προσανατολισμένο στον χρήστη όπως `$('button=Submit')` ή `$('aria/Submit')`, δείτε [Selectors](/docs/selectors) — είτε δηλώστε ρητά ότι θέλετε την πρώτη αντιστοιχία:

```js
await $('button[type="submit"]').click()
// ...ή, αν το πρώτο είναι πραγματικά αυτό που εννοείτε
await $$('button')[0].click()
```

### Απενεργοποίηση

Για ένα μεμονωμένο query:

```js
await $('button', { strict: false }).click()
```

Για ολόκληρο έργο, επαναφέροντας τη συμπεριφορά του v9:

```js title="wdio.conf.js"
export const config = {
    // ...
    strictSelectors: false
}
```

Ένα στοιχείο θυμάται πώς αναζητήθηκε, οπότε η εκ νέου ανάκτησή του — μετά από stale element reference ή μέσω του `waitForExist` — διατηρεί την αυστηρότητα της αρχικής κλήσης.

:::info

Στο παρασκήνιο, ένα αυστηρό `$` στέλνει αίτημα `findElements` αντί για `findElement`, αφού η καταμέτρηση των αντιστοιχιών είναι ο μόνος τρόπος επιβολής του κανόνα. Πρόκειται για ένα μόνο round trip σε κάθε περίπτωση, αλλά είναι ορατό σε προσαρμοσμένα services και WebDriver mocks που βασίζονται στην εντολή `findElement`.

:::

## Παλαιές υπογραφές εντολών

Το v9 δεχόταν ακόμη παλαιότερες μορφές με θέσεις ορισμάτων και εμφάνιζε προειδοποίηση. Το v10 δέχεται μόνο το αντικείμενο επιλογών.

Το [codemod](https://github.com/webdriverio/codemod) του v10 ξαναγράφει τα `addCommand` και `overwriteCommand` όταν το τρίτο όρισμα είναι boolean, τα `getHTML(true)` και `getHTML(false)`, και το `getCookies` όταν το φίλτρο είναι string ή πίνακας ενός στοιχείου. Μια κλήση `getCookies` με περισσότερα από ένα ονόματα μένει αμετάβλητη, επειδή ένα φίλτρο ταιριάζει με ένα όνομα.

Εγκαταστήστε πρώτα το codemod. Το WebdriverIO δεν εξαρτάται από αυτό.

```sh
npm install jscodeshift @wdio/codemod
npx jscodeshift -t ./node_modules/@wdio/codemod/v10 ./e2e/
```

Χρησιμοποιήστε `--parser=tsx` για αρχεία TypeScript.

### `addCommand` και `overwriteCommand`

```diff
- browser.addCommand('myFn', fn, true)
+ browser.addCommand('myFn', fn, { attachToElement: true })

- browser.overwriteCommand('click', fn, true)
+ browser.overwriteCommand('click', fn, { attachToElement: true })
```

Ένα boolean τρίτο όρισμα είναι σφάλμα TypeScript. Κατά την εκτέλεση προκαλεί:

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

Τα `proto` και `instances` ανήκουν στο ίδιο αντικείμενο επιλογών. Παραλείψτε το τρίτο όρισμα για να προσαρτήσετε μια εντολή στον browser.

### `getCookies`

Τα φίλτρα string και πίνακα strings απορρίπτονται. Περάστε ένα [αντικείμενο φίλτρου cookie](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter). Μία κλήση φιλτράρει ένα όνομα· καλέστε την ξανά για άλλο όνομα.

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

Το `getCookies()` χωρίς ορίσματα εξακολουθεί να επιστρέφει κάθε cookie ορατό στη σελίδα.

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

Το `getHTML()` χωρίς ορίσματα εξακολουθεί να περιλαμβάνει το tag του ίδιου του στοιχείου.

### `newWindow`

Τα `windowName` και `windowFeatures` καταργήθηκαν. Ίσχυαν μόνο για το WebDriver Classic. Η εντολή εξακολουθεί να δέχεται το `type`:

```diff
- await browser.newWindow('https://webdriver.io', {
-     windowName: 'WebdriverIO window',
-     windowFeatures: 'width=420,height=230,resizable,scrollbars=yes,status=1',
- })
+ await browser.newWindow('https://webdriver.io', { type: 'window' })
```

Χρησιμοποιήστε `type: 'tab'` για να ανοίξετε καρτέλα.

### `startActivity`

Γίνεται δεκτό μόνο το αντικείμενο επιλογών. Τα `appWaitPackage`, `appWaitActivity` και `optionalIntentArguments` καταργήθηκαν. Ίσχυαν μόνο για το Appium HTTP endpoint που αφαιρέθηκε. Το `mobile: startActivity` δεν τα δέχεται, και η μεταβίβασή τους προκαλεί σφάλμα.

```diff
- await browser.startActivity('com.example.app', '.MainActivity')
- await browser.startActivity({
-     appPackage: 'com.example.app',
-     appActivity: '.MainActivity',
-     appWaitPackage: 'com.example.app',
-     appWaitActivity: '.MainActivity',
-     optionalIntentArguments: '--ez extra true',
- })
+ await browser.startActivity({
+     appPackage: 'com.example.app',
+     appActivity: '.MainActivity',
+ })
```

## Εντολές που αφαιρέθηκαν

Το `browser.throttle` και οι deprecated εντολές `touchAction` αφαιρέθηκαν.

| v9 | v10 |
| --- | --- |
| `browser.throttle('Regular3G')` | [`browser.throttleNetwork('Regular3G')`](/docs/api/browser/throttleNetwork) |
| `browser.touchAction(...)` / `element.touchAction(...)` | Το [Actions API](/docs/api/browser/action) με touch pointer, ή οι mobile εντολές [`tap`](/docs/api/mobile/tap) και [`swipe`](/docs/api/mobile/swipe) |

Μια χειρονομία αφής με το Actions API:

```js
await browser.action('pointer', { parameters: { pointerType: 'touch' } })
    .move({ x: 100, y: 500 })
    .down()
    .move({ x: 100, y: 100, duration: 300 })
    .up()
    .perform()
```

## `uploadFile`

Το `browser.uploadFile()` αφαιρέθηκε. Συμπίεζε ένα τοπικό αρχείο σε zip και το έστελνε στο endpoint `file` του Selenium, το οποίο δεν αποτελεί μέρος του WebDriver ή του WebDriver BiDi. Ορίστε ένα file input με το [`element.setFiles()`](/docs/api/element/setFiles).

```diff
- const remotePath = await browser.uploadFile('/path/to/file.png')
- await $('#file-upload').setValue(remotePath)
+ await $('#file-upload').setFiles('/path/to/file.png')
+ await $('#file-upload').setFiles(['/path/to/a.png', '/path/to/b.png'])
```

Το `setFiles` χρειάζεται BiDi session. Οι διαδρομές ανοίγονται από τον browser. Μια σχετική διαδρομή επιλύεται ως προς το `process.cwd()`. Η προετοιμασία αρχείων στο Selenium Grid δεν αποτελεί μέρος του v10. Μια σουίτα που βασιζόταν στο `uploadFile` για να στείλει bytes σε έναν node πρέπει να τοποθετήσει το αρχείο εκεί όπου μπορεί να το διαβάσει ο browser, και μετά να καλέσει το `setFiles`.

Σε ένα κλασικό τοπικό session, το `element.setValue('/local/path')` εξακολουθεί να πληκτρολογεί μια διαδρομή που ο τοπικός browser μπορεί ήδη να δει. Το raw endpoint του Selenium παραμένει ως `browser.file()` για χρήστες του Grid που το καλούν απευθείας.

## `executeAsync`

Τα `browser.executeAsync` και `element.executeAsync` αφαιρέθηκαν. Περάστε μια `async` function στο [`execute`](/docs/api/browser/execute). Η τιμή επιστροφής της function, συμπεριλαμβανομένου ενός promise που επιστρέφεται, είναι το αποτέλεσμα της εντολής. Το timeout `script` εξακολουθεί να ισχύει.

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

Αφαιρέστε το callback `done` του WebDriver. Ένα script σε μορφή string που περίμενε αυτό το callback ως τελευταίο όρισμα πρέπει πλέον να επιστρέφει promise. Κατά την εκτέλεση, το `executeAsync` δεν είναι function.

## `switchToFrame`

Το `browser.switchToFrame` δεν είναι πλέον δημόσια εντολή.

Σε ένα WebDriver BiDi session, τα `switchFrame` και `switchWindow` προκαλούν σφάλμα. Μια καρτέλα, ένα παράθυρο και ένα frame είναι ένα `WebdriverIO.BrowsingContext` που κρατάτε. Το `browser.url()` πλοηγεί το αρχικό top-level context του session και το επιστρέφει. Το `browser.newWindow()` επιστρέφει το νέο context και δεν μεταβαίνει σε αυτό. Το `context.frame()` επιστρέφει ένα θυγατρικό frame. Το `context.parent` είναι το frame από το οποίο το ανοίξατε.

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

Το `context.url` είναι το string του URL του εγγράφου. Πλοηγήστε ένα context που κρατάτε με το `context.navigate(url)`. Τα μεταδεδομένα φόρτωσης από το `browser.url()` είναι το `context.request`.

Σε ένα Classic session, συνεχίστε να καλείτε το `switchFrame` με ένα στοιχείο, ή `null` για το ανώτατο frame. Ένα string ή μια function απορρίπτονται εκεί.

```diff
- await browser.switchToFrame(await $('iframe'))
- await browser.switchToFrame(null)
+ await browser.switchFrame($('iframe'))
+ await browser.switchFrame(null)
```

## `setTimeout`

Το κλειδί `page load` του JSON Wire Protocol απορρίπτεται. Χρησιμοποιήστε το `pageLoad`.

```diff
- await browser.setTimeout({ 'page load': 10000 })
+ await browser.setTimeout({ pageLoad: 10000 })
```

Τα `implicit` και `script` δεν αλλάζουν.

## Πρόσβαση σε multi-remote instances

Ένας multi-remote browser δεν αποθηκεύει πλέον κάθε session ως δική του ιδιότητα. Το ίδιο ισχύει για ένα multi-remote στοιχείο. Τα `getInstance` και `select` είναι ο τρόπος να απευθυνθείτε σε ένα session.

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

Ένα TypeScript augmentation που προσθέτει `myChromeBrowser: WebdriverIO.Browser` στο `WebdriverIO.MultiRemoteBrowser` δεν αντιστοιχεί πλέον σε ιδιότητα κατά την εκτέλεση. Διαγράψτε αυτό το augmentation και καλέστε το `getInstance`.

Με τον testrunner και το `injectGlobals` ενεργοποιημένο, το όνομα του instance εξακολουθεί να είναι καθολική μεταβλητή (`myChromeBrowser.url(...)`). Αυτή η καθολική μεταβλητή είναι το μεμονωμένο session. Δεν είναι το `browser.myChromeBrowser`.

Τα αποτελέσματα των εντολών παραμένουν στη σειρά των capabilities: η πρώτη καταχώριση ανήκει στο πρώτο κλειδί του αντικειμένου capabilities.

Το `browser.$$()` σε έναν multi-remote browser επιστρέφει ένα `WebdriverIO.MultiRemoteElementArray`, όχι ένα απλό `MultiRemoteElement[]`. Εξακολουθεί να είναι πίνακας, οπότε μια ανάγνωση δείκτη όπως `elements[0]` συνεχίζει να λειτουργεί.

Οι μέθοδοί του `map`, `filter`, `forEach`, `find`, `findIndex`, `some`, `every` και `reduce` είναι ασύγχρονες, όπως σε ένα `WebdriverIO.ElementArray`, και επιστρέφουν promise, και μετά το `await`. Το ίδιο ισχύει για τις λίστες που επιστρέφουν τα `custom$$()`, `react$$()` και `shadow$$()`. Στο v9 αυτές ήταν οι σύγχρονες μέθοδοι ενός απλού πίνακα:

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

Τα `custom$()`, `react$()` και, σε ένα στοιχείο, τα `shadow$()`, `nextElement()`, `previousElement()` και `parentElement()` επιστρέφουν ένα `WebdriverIO.MultiRemoteElement`, όπως κάνει το `$()`. Στο v9 επέστρεφαν ένα στοιχείο ανά instance σε απλό πίνακα. Διαβάστε το στοιχείο ενός browser με το `getInstance`:

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

Τα `custom$$()`, `react$$()` και, σε ένα στοιχείο, το `shadow$$()` επιστρέφουν ένα `WebdriverIO.MultiRemoteElementArray`, όπως κάνει το `$$()`. Στο v9 επέστρεφαν μία λίστα ανά instance σε απλό πίνακα. Κάθε καταχώριση απευθύνεται σε κάθε instance. Ένα instance που βρίσκει λιγότερα στοιχεία δεν έχει στοιχείο σε αυτόν τον δείκτη:

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

Το `WebdriverIO.MultiRemoteElement['selector']` έχει τον τύπο `Selector`, όπως έχει το `WebdriverIO.Element['selector']`. Στο v9 είχε τον τύπο `string`, αλλά η τιμή μπορούσε επίσης να είναι function ή αναφορά σε προσαρμοσμένη στρατηγική. Κώδικας TypeScript που το χρησιμοποιεί ως string, για παράδειγμα `element.selector.includes('…')`, πρέπει πρώτα να ελέγξει τον τύπο.

Τα `WDIO_ENABLE_MULTI_REMOTE_SELECT` και `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY` αφαιρέθηκαν. Το `select()` είναι πάντα διαθέσιμο, και το `$$()` επιστρέφει πάντα τον παραπάνω πίνακα στοιχείων. Διαγράψτε και τις δύο μεταβλητές.

## Δυαδικές απαντήσεις mock

Τα `mock.respond()` και `mock.respondOnce()` δέχονται payloads `Uint8Array` και `ArrayBuffer`, συμπεριλαμβανομένου ενός polyfilled `Buffer` σε component tests χωρίς καθολικό `Buffer`.

Το `mock.getBinaryResponse()` έχει πλέον τύπο `Uint8Array | null`. Εξακολουθεί να επιστρέφει `Buffer` στο Node.js, αλλά επιστρέφει `Uint8Array` στον browser. Για να χρησιμοποιήσετε μεθόδους ειδικές για το Buffer στο Node.js, μετατρέψτε πρώτα ένα μη-null αποτέλεσμα:

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## Multi-remote network mocks

Το `browser.mock()` σε έναν multi-remote browser επιστρέφει ένα `WebdriverIO.MultiRemoteMock`, όχι πίνακα από mocks. Τα `respond`, `restore` και οι άλλες μέθοδοι mock εκτελούνται σε κάθε instance. Διαβάστε τα καταγεγραμμένα αιτήματα από το mock για έναν browser. Χρησιμοποιήστε τον τύπο `WebdriverIO.MultiRemoteMock` από το καθολικό namespace `WebdriverIO`.

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

Το `getInstance` προκαλεί `Multi-remote object has no instance named "<name>"` όταν το όνομα δεν είναι ένα από τα `instances`. Ένα mock από το `browser.select('myFirefoxBrowser', 'myChromeBrowser')` απαριθμεί αυτά τα instances με αυτή τη σειρά, η οποία μπορεί να διαφέρει από το `browser.instances`. Μην υποθέτετε ότι το `mocks[0]` είναι συγκεκριμένος browser.

## Απαντήσεις mock που παρακάμπτουν το backend

Το `mock.respond(..., { fetchResponse: false })` δεν καλεί το backend. Στο v9, ένα mock που φιλτράριζε επίσης σε `statusCode` ή `responseHeaders` αγνοούσε αυτό το φίλτρο και απαντούσε σε κάθε αίτημα που ταίριαζε. Στο v10, τα `respond()` και `respondOnce()` προκαλούν σφάλμα, επειδή αυτά τα φίλτρα μπορούν να αποφασιστούν μόνο από την απάντηση του backend.

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

Για να διατηρήσετε το φίλτρο, παραλείψτε το `fetchResponse` ώστε το mock να ανακτήσει την απάντηση, να ελέγξει την κατάσταση ή τα headers και στη συνέχεια να αντικαταστήσει το body.

## Αναφορές στοιχείων

Τα ids στοιχείων χρησιμοποιούν το κλειδί W3C WebDriver `element-6066-11e4-a52e-4f735466cecf` και την ιδιότητα `elementId`. Το πεδίο `ELEMENT` του JSON Wire Protocol δεν αποτελεί πλέον μέρος του συμβολαίου στοιχείων.

Το `WebdriverIO.Element` δεν δηλώνει πλέον `ELEMENT`. Διαβάστε το `element.elementId`, το οποίο ήδη εκθέτουν τα instances στοιχείων.

Το `browser.execute` και τα ενσωματωμένα scripts που στέλνουν ένα στοιχείο στη σελίδα (`getHTML`, `isClickable`, `isDisplayed`, `scrollIntoView` και τα υπόλοιπα) περνούν μόνο την αναφορά W3C:

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

Ένα body find-element που περιέχει μόνο `{ ELEMENT: '...' }` δεν είναι στοιχείο. Συμπεριλάβετε το κλειδί W3C. Αν υπάρχουν και τα δύο κλειδιά, το WebdriverIO χρησιμοποιεί το id W3C.

Το Jasmine εκτυπώνει ένα αλυσιδωτό αποτέλεσμα `$()` μέσω του `toJSON`. Αυτή η τιμή είναι η ίδια αναφορά W3C, `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }`.

Με το WebDriver BiDi, ένα script που επιστρέφει `NodeList` (για παράδειγμα από το `querySelectorAll`) ή `HTMLCollection` (για παράδειγμα `element.children`) δίνει πλέον μια λίστα αναφορών στοιχείων, όπως κάνει το WebDriver Classic. Στο v9 έδινε raw τιμές BiDi, οπότε το `browser.execute` επέστρεφε αντικείμενα που δεν είναι στοιχεία, και μια στρατηγική `custom$` ή `custom$$` που επέστρεφε `querySelectorAll(...)` δεν έβρισκε κανένα στοιχείο. Μια λύση παράκαμψης όπως `Array.from(document.querySelectorAll(...))` εξακολουθεί να λειτουργεί, και μπορείτε να την αφαιρέσετε:

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## React selectors

Τα `react$` και `react$$` λειτουργούν πλέον με React 16 έως 19, για μια εφαρμογή που ξεκινά με `createRoot` ή με `ReactDOM.render`. Πριν, τα `browser.react$` και `browser.react$$` αποτύγχαναν με React 18 και νεότερα (`Could not find the root element of your application`), και σε κάθε έκδοση ένα αποτέλεσμα μπορούσε να προέρχεται από το render πριν από την τελευταία ενημέρωση, οπότε ένα component που προστέθηκε από αλλαγή κατάστασης δεν βρισκόταν.

Σε μια σελίδα όπου το React δεν έχει κάνει ακόμη render ένα root, οι εντολές περιμένουν πλέον έως 5 δευτερόλεπτα για αυτό πριν αποτύχουν. Πριν, αποτύγχαναν αμέσως, οπότε μια εφαρμογή που ξεκινούσε αργά δεν βρισκόταν.

Οι εντολές δεν χρησιμοποιούν πλέον τη βιβλιοθήκη [resq](https://github.com/baruchvlz/resq), και το WebdriverIO δεν την εγκαθιστά πλέον. Οι κανόνες των selectors δεν αλλάζουν (δείτε [React Selectors](/docs/selectors#react-selectors)), με αυτές τις εξαιρέσεις:

- Το `react$` με `props` και `state` βρίσκει ένα component που ταιριάζει και στα δύο. Πριν, αγνοούσε τα `props` όταν δινόταν επίσης `state`.
- Το `react$$` δίνει κάθε κόμβο DOM μία φορά. Πριν, ένα higher-order component και το παιδί του έδιναν το ίδιο στοιχείο δύο φορές σε ορισμένους browsers.
- Ένα fragment που περιέχει fragment δίνει μία επίπεδη λίστα κόμβων. Πριν, το `react$` μπορούσε να επιστρέψει λίστα.
- Ένα φίλτρο με τιμή `null` λειτουργεί. Πριν, αποτύγχανε με `Cannot convert undefined or null to object`.
- Χωρίς εμβέλεια στοιχείου, οι εντολές αναζητούν σε όλα τα React roots της σελίδας, με τη σειρά του εγγράφου, και σε roots μέσα σε άλλα roots και σε roots μέσα σε ανοιχτά shadow roots. Το `react$` δίνει την πρώτη αντιστοιχία. Πριν, αναζητούσαν μόνο στο πρώτο root, ακόμη και σε ένα που το React δεν είχε κάνει ακόμη render ή είχε κάνει unmount, και δεν αναζητούσαν σε shadow roots. Σε μια σελίδα με περισσότερα από ένα roots, το `react$$` μπορεί πλέον να δώσει περισσότερα στοιχεία: για να αναζητήσετε μόνο σε ένα root, καλέστε την εντολή στον container του, για παράδειγμα `$('#root').react$$('MyComponent')`.
- Στον container ενός root μέσα σε άλλο root, οι εντολές αναζητούν στο εσωτερικό root. Πριν, αναζητούσαν στο εξωτερικό root.
- Στο browsing context ενός frame, και σε ένα στοιχείο ενός frame, οι εντολές λειτουργούν. Πριν, η εντολή του context αποτύγχανε με `this.executeScript is not a function`, και η εντολή του στοιχείου αποτύγχανε με `Could not find instance of React in given element`.

Το εσωτερικό script `webdriverio/scripts/resq` αφαιρέθηκε.

## Component testing

Το `@wdio/browser-runner` επανεξάγει τα `fn`, `spyOn` και τους τύπους mock από το `@vitest/spy` 5 (προηγουμένως 3). Ένα mock που ο κώδικάς σας καλεί με `new` χρειάζεται υλοποίηση `function` ή `class`. Μια arrow function προκαλεί `is not a constructor`, και το `mockReturnValue` προκαλεί σφάλμα όταν το mock καλείται με `new`.

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

Για άλλες αλλαγές στα spies, δείτε τον [οδηγό μετάβασης του Vitest](https://vitest.dev/guide/migration).

## Puppeteer

Το `webdriverio` δέχεται `puppeteer-core` `>=24 <26`, συμπεριλαμβανομένου του Puppeteer 25. Τα `getPuppeteer()` και `@wdio/lighthouse-service` δοκιμάζονται έναντι αυτής της σειράς εκδόσεων.

## ESLint

Το `eslint-plugin-wdio` απαιτεί ESLint 10. Το ESLint 9 έφτασε στο [τέλος ζωής](https://eslint.org/version-support/) στις 2026-08-06 και δεν υποστηρίζεται πλέον. Με TypeScript, χρησιμοποιήστε `typescript-eslint` 8.56.0 ή νεότερο.

```sh
npm install --save-dev eslint@10 eslint-plugin-wdio
```

Το `eslint-plugin-wdio` εξάγει μόνο τη flat ρύθμιση `flat/recommended`. Το όνομα eslintrc `plugin:wdio/recommended` αφαιρέθηκε.

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    wdioConfig['flat/recommended'],
]
```

Η προτεινόμενη ρύθμιση μεταβαίνει στον κανόνα `wdio/no-floating-promise` με επίγνωση τύπων, στη θέση του `wdio/await-expect`, όταν είναι εγκατεστημένο το πακέτο `typescript-eslint`. Η εγκατάσταση μόνο του `@typescript-eslint/eslint-plugin` δεν αρκεί.

```sh
npm install --save-dev typescript typescript-eslint
```

Σε αυτή τη λειτουργία, η ρύθμιση αναλύει κάθε αρχείο που ταιριάζει με το project service του TypeScript. Περιορίστε την σε αρχεία TypeScript, και βεβαιωθείτε ότι αποτελούν μέρος ενός `tsconfig.json`:

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

Ένα αρχείο JavaScript που ταιριάζει αλλά δεν ανήκει στο έργο TypeScript, όπως το `wdio.conf.js`, αποτυγχάνει με "was not found by the project service". Για να κάνετε lint και σε αρχεία JavaScript, ορίστε `"allowJs": true`, προσθέστε τα στο `include` στο `tsconfig.json`, και διευρύνετε το μοτίβο σε `**/*.{js,mjs,cjs,ts,mts,cts,tsx}`.

## Προσαρμοσμένα frameworks

Το `setupExpect` σε έναν προσαρμοσμένο adapter framework δεν δέχεται πλέον `Map` από matchers, και ο runner δεν προσθέτει πλέον μέθοδο `entries` στο αντικείμενο matchers. Διατρέξτε το με `Object.entries(wdioMatchers)`.

## Προφίλ Firefox

Το `@wdio/firefox-profile-service` δεν αντιμετωπίζει πλέον το `legacy` ως επιλογή του service. Αυτή η σημαία ίσχυε μόνο για Firefox 55 και παλαιότερα. Διαγράψτε την. Ένα ξεχασμένο `legacy: true` γράφεται στο προφίλ ως προτίμηση με όνομα `legacy`.

## Πρωτόκολλο WebDriver

Κάθε session είναι ένα [W3C WebDriver](https://w3c.github.io/webdriver/) session. Το WebdriverIO δεν μιλά το JSON Wire Protocol ή το Mobile JSON Wire Protocol. Το v9 αφαίρεσε αυτές τις εντολές. Το v10 αφαιρεί επίσης το περίβλημα απάντησης που χρησιμοποιούσαν αυτά τα πρωτόκολλα, οπότε ένας server που εξακολουθεί να το επιστρέφει δεν μπορεί να ξεκινήσει session.

Το `browser.isW3C` αφαιρέθηκε, συμπεριλαμβανομένης της τιμής που προηγουμένως προωθούνταν στο μήνυμα `sessionStarted` του worker. Η μεταβίβαση του `isW3C` στο `attach` αγνοείται. Το σύνολο εντολών BiDi παραμένει στον client. Μια ενεργή σύνδεση BiDi εξακολουθεί να εξαρτάται από το `webSocketUrl`.

### `browser.back()` και `browser.forward()` σε BiDi

Οι κλήσεις παραμένουν `await browser.back()` και `await browser.forward()`. Καμία από τις δύο εντολές δεν δέχεται όρισμα ούτε επιστρέφει τιμή.

Σε ένα BiDi session αυτές οι εντολές καλούν το `browsingContext.traverseHistory` με `delta` `-1` ή `1` στο top-level browsing context, και στη συνέχεια περιμένουν την ετοιμότητα εγγράφου στην οποία αντιστοιχεί το `pageLoadStrategy`. Το `none` επιστρέφει όταν γίνει δεκτή η εντολή διάσχισης. Το `eager` περιμένει το `browsingContext.domContentLoaded`. Το `normal`, η προεπιλογή, περιμένει το `browsingContext.load`. Μια επαναφορά από το back-forward cache δεν εκπέμπει αυτά τα συμβάντα· η εντολή επιστρέφει όταν το `readyState` του δεσμευμένου εγγράφου ταιριάζει ήδη με τη στρατηγική. Η αναμονή χρησιμοποιεί το timeout φόρτωσης σελίδας του session (`timeouts.pageLoad`, 300000 ms όταν δεν έχει οριστεί). Τα Classic sessions εξακολουθούν να στέλνουν στα `POST /session/:sessionId/back` και `POST /session/:sessionId/forward`.

Μια ανύπαρκτη καταχώριση ιστορικού εξακολουθεί να απορρίπτεται. Σε BiDi το μήνυμα προέρχεται από το `browsingContext.traverseHistory` και περιέχει `no such history entry`, αντί για το κλασικό κείμενο σφάλματος του WebDriver. Μια διάσχιση που δεν φτάνει ποτέ στην αναμενόμενη ετοιμότητα απορρίπτεται με `History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` ή `browsingContext.load`.

### Απάντηση νέου session

Το Create Session πρέπει να επιστρέφει το body του W3C. Το WebdriverIO διαβάζει τα `value.sessionId` και `value.capabilities`:

```json
{
  "value": {
    "sessionId": "8e8a5c2e",
    "capabilities": {
      "browserName": "chrome",
      "browserVersion": "131.0.6778.85"
    }
  }
}
```

Ένα body του JSON Wire Protocol απορρίπτεται. Αυτό το body τοποθετεί τα `sessionId` και `status` δίπλα στο `value`, και τοποθετεί τα capabilities στο ίδιο το `value`:

```json
{
  "sessionId": "8e8a5c2e",
  "status": 0,
  "value": {
    "browserName": "chrome",
    "version": "131.0"
  }
}
```

Η δημιουργία session τότε προκαλεί `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` Το ίδιο σφάλμα προκαλείται όταν λείπει το `value.capabilities`, ακόμη κι αν υπάρχει το `value.sessionId`.

Ένα επίπεδο αντικείμενο capabilities στη ρύθμισή σας εξακολουθεί να είναι έγκυρο. Το WebdriverIO περικλείει το `{ browserName: 'chrome' }` σε `alwaysMatch` πριν στείλει το αίτημα. Κλειδιά με πρόθεμα vendor αναμεμειγμένα με κλειδιά εκτός του συνόλου capabilities του W3C εξακολουθούν να απορρίπτονται. Βάλτε τις ρυθμίσεις vendor στα `sauce:options`, `bstack:options`, `appium:options` ή σε άλλο κλειδί με πρόθεμα.

### Απαντήσεις εντολών

Ένα αποτέλεσμα εντολής είναι `{ "value": … }`. HTTP 200 χωρίς `error` στο `value` σημαίνει επιτυχία. Ένα στοιχείο που λείπει είναι HTTP 404 με το `value.error` ορισμένο σε `"no such element"`, κάτι που εξακολουθεί να επιτρέπει lazy αναζήτηση στοιχείου. Ένα αριθμητικό `status` στο body αγνοείται, συμπεριλαμβανομένων των `status: 0` και του παλιού κωδικού `status: 7` ("no such element"). Στείλτε αντί αυτού το αντικείμενο σφάλματος του W3C.

Ο εξαγόμενος τύπος σφάλματος `JSONWPCommandError` είναι πλέον `SessionRequestError`.

### Servers

Οι drivers με τους οποίους εκτελείται το WebdriverIO μιλούν ήδη W3C στη σύνδεση του client:

- Το ChromeDriver είναι W3C από προεπιλογή από το Chrome 75. Το Edge που βασίζεται σε Chromium ακολουθεί το ίδιο. Το τρέχον ChromeDriver εξακολουθεί να δέχεται το `goog:chromeOptions.w3c: false`, το οποίο επαναφέρει εκείνο το session στο παλαιό πρωτόκολλο. Το WebdriverIO δεν υποστηρίζει αυτή την αλλαγή.
- Το geckodriver και το safaridriver της Apple είναι μόνο W3C. Μια απάντηση του Safari που παραλείπει το `platformName` ή το `browserVersion` εξακολουθεί να είναι W3C.
- Το Selenium 4 και το Grid 4 μιλούν W3C. Το Grid σταμάτησε να μεταφράζει το JSON Wire Protocol στην 4.9.
- Το Appium 2 εγκατέλειψε το JSON Wire Protocol και το Mobile JSON Wire Protocol. Το Appium 3 εγκατέλειψε επίσης τις εναπομείνασες μορφές παραμέτρων. Το v10 απαιτεί Appium 3, όπως καλύπτεται παρακάτω. Ένα mobile session που παραλείπει το `setWindowRect` εξακολουθεί να είναι W3C· αυτό το capability σημαίνει ότι η συσκευή δεν μπορεί να αλλάξει το μέγεθος ενός παραθύρου.

Αυτοί οι servers εξακολουθούν να μιλούν το JSON Wire Protocol και δεν υποστηρίζονται: Selenium 3, PhantomJS, EdgeHTML (`--jwp`) και WinAppDriver με απευθείας σύνδεση. Ο Appium Windows driver παραμένει υποστηριζόμενος ως W3C client. Μεταφράζει τις εντολές σε WinAppDriver, συμπεριλαμβανομένου του Get Element Property στο endpoint του attribute. Κατευθύνετε το WebdriverIO στο Appium, όχι στη θύρα του WinAppDriver.

Το [`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) δεν κάνει αυτούς τους servers να λειτουργούν με το v10. Η εκκίνηση session εξακολουθεί να απαιτεί το παραπάνω body του W3C, και τα αποτελέσματα εντολών εξακολουθούν να αγνοούν ένα αριθμητικό `status`. Παραμείνετε στο WebdriverIO 9 αν αυτός ο server εξακολουθεί να απαιτείται.

Το `webdriver.remote.sessionid` δεν σηματοδοτεί πλέον ένα Selenium standalone session. Το Selenium Grid 4 εξακολουθεί να ανιχνεύεται από το `se:cdp`.

Το κλειδί timeout `page load` καλύπτεται στο [`setTimeout`](#settimeout). Τα ids στοιχείων καλύπτονται στις [Αναφορές στοιχείων](#element-references). Σε desktop, το `[name="..."]` είναι CSS selector. Η στρατηγική εντοπισμού `name` παραμένει για mobile sessions.

## Appium

Το WebdriverIO 10 απαιτεί **Appium 3** και τρέχοντες επίσημους drivers (UiAutomator2, XCUITest, Espresso, Windows, Mac2 κ.λπ.). Τα Appium 1.x και 2.x δεν υποστηρίζονται. Παραμείνετε στο WebdriverIO 9 αν δεν μπορείτε να αναβαθμίσετε τον server.

```sh
npm i -D appium@^3
appium driver update installed
```

Το `@wdio/appium-service` δηλώνει ένα προαιρετικό peer `appium` με `>=3` και αρνείται να εκκινήσει παλαιότερο server. Το `create-wdio` εγκαθιστά το `appium@^3` όταν το Appium λείπει ή είναι παλαιότερο από το 3.

Οι cloud vendors που εξακολουθούν να προσφέρουν Appium 2 χρειάζονται image με Appium 3, αλλιώς πρέπει να παραμείνετε στο WebdriverIO 9.

### Οι mobile εντολές δεν επιστρέφουν πλέον σε HTTP

Στο v9, πολλοί mobile helpers δοκίμαζαν το `browser.execute('mobile: …')` και, σε σφάλμα άγνωστης μεθόδου, επέστρεφαν σε ένα Appium HTTP endpoint που έχει αφαιρεθεί. Στο v10 αυτή η εναλλακτική έχει καταργηθεί: το ίδιο σφάλμα σάς λέει να αναβαθμίσετε σε Appium 3. Προτιμήστε τις mobile εντολές του WebdriverIO (`browser.lock()`, `browser.shake()`, …) ή απευθείας το `browser.execute('mobile: …')`.

### Εντολές πρωτοκόλλου που αφαιρέθηκαν

Το Appium 3 [αφαίρεσε πολλά deprecated endpoints του base driver](https://appium.io/docs/en/latest/guides/migrating-2-to-3/). Το WebdriverIO δεν εκθέτει πλέον μεθόδους client για τις περισσότερες από αυτές τις διαδρομές (για παράδειγμα `appiumLock`, `touchPerform` και τον χάρτη του Mobile JSON Wire Protocol). Χρησιμοποιήστε αντί αυτών W3C Actions, την αντίστοιχη mobile εντολή ή μια μέθοδο execute `mobile:` του driver.

### Εμβέλεια του `--allow-insecure` στο Appium

Το Appium 3 απαιτεί πρόθεμα εμβέλειας driver ή `*` στις λειτουργίες του `--allow-insecure`, για παράδειγμα `uiautomator2:adb_shell` ή `*:adb_shell`.

### Τα Appium capabilities χωρίς πρόθεμα δεν επιλέγουν πλέον Appium session

Τα `automationName`, `deviceName` και `appiumVersion` χωρίς πρόθεμα `appium:` δεν λένε πλέον στο WebdriverIO να παραλείψει τον browser driver και να προσαρτήσει το Appium service. Χρησιμοποιήστε το capability με πρόθεμα, ή τοποθετήστε το μέσα στο `appium:options`:

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

Το `wdio repl` εκπέμπει πλέον αυτά τα κλειδιά με πρόθεμα, συμπεριλαμβανομένων των `appium:app`, `appium:platformVersion` και `appium:udid`.

### Το `getValue` σε mobile διαβάζει την ιδιότητα του στοιχείου

Το `element.getValue()` καλεί το Get Element Property σε κάθε session, συμπεριλαμβανομένου του Appium 3. Σε ένα mobile session καλούσε προηγουμένως το Get Element Attribute.

### Η υπογραφή του `stopRecordingScreen` ευθυγραμμίστηκε με το `startRecordingScreen`

Το `driver.stopRecordingScreen` δέχεται πλέον μόνο ένα όρισμα `options`, αντί για τα προηγούμενα 4 ορίσματα, ευθυγραμμιζόμενο με το `driver.startRecordingScreen`. Μετακινήστε τα μεμονωμένα ορίσματα μέσα σε ένα αντικείμενο:

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## Ονοματοδοσία multi-remote

Τα APIs που γράφονταν `multiremote` ή `Multiremote` είναι πλέον σε camelCase / PascalCase ως `multiRemote` / `MultiRemote`. Τα παλιά ονόματα δεν έχουν aliases.

| v9 | v10 |
|----|-----|
| `multiremote()` (`webdriverio`) | `multiRemote()` |
| `WebdriverIO.MultiremoteConfig` | `WebdriverIO.MultiRemoteConfig` |
| `isMultiremote` στον browser, στα αποτελέσματα `$` και `$$` | `isMultiRemote` |
| `Capabilities.RequestedMultiremoteCapabilities` | `Capabilities.RequestedMultiRemoteCapabilities` |
| `Capabilities.WithRequestedMultiremoteCapabilities` | `Capabilities.WithRequestedMultiRemoteCapabilities` |
| `runner.isMultiremote` (reporters) | `runner.isMultiRemote` |
| `Launcher#isMultiremote`, `Launcher#isParallelMultiremote` (`@wdio/cli`) | `isMultiRemote`, `isParallelMultiRemote` |
| `isMultiremote` στα `Workers.WorkerMessage`, `WorkerInstance` (`@wdio/local-runner`) και `SpecReporter#getTestLink()` | `isMultiRemote` |
| `browser.multiremoteFetch()` (`@wdio/webdriver-mock-service`) | `browser.multiRemoteFetch()` |

Αναζητήστε τα `multiremote` και `Multiremote` (με διάκριση πεζών-κεφαλαίων) και αντικαταστήστε κάθε αντιστοιχία. Οι αναφορές Allure επισημαίνουν επίσης τα multi-remote τεστ με `isMultiRemote` αντί για `isMultiremote`.

## Εικονικές οθόνες σε Linux

Το `@wdio/xvfb` αντικαθίσταται από το `@wdio/display-server`. Αντί να περικλείει κάθε worker σε `xvfb-run`, ο testrunner ξεκινά έναν display server για ολόκληρη την εκτέλεση, πριν από το hook `onPrepare` οποιουδήποτε service. Προτιμά το Weston σε headless λειτουργία και επιστρέφει στο Xvfb. Δείτε [Headless & Display Servers](/docs/headless-and-display-servers) για λεπτομέρειες.

Οι επιλογές μετονομάστηκαν. Τα παλιά ονόματα εξακολουθούν να λειτουργούν στο v10 αλλά καταγράφουν προειδοποίηση deprecation, και θα αφαιρεθούν στο v11. Αν ορίσετε και τα δύο ονόματα, υπερισχύει το νέο:

```diff
- autoXvfb: false,
+ displayServerEnabled: false,
- xvfbAutoInstall: true,
+ displayServerAutoInstall: true,
- xvfbAutoInstallMode: 'sudo',
+ displayServerAutoInstallMode: 'sudo',
- xvfbAutoInstallCommand: 'my-install-command',
+ displayServerAutoInstallCommand: 'my-install-command',
```

Τα `xvfbMaxRetries` και `xvfbRetryDelay` δεν έχουν κανένα αποτέλεσμα, και θα αφαιρεθούν επίσης στο v11. Η εκκίνηση δεν επαναλαμβάνεται πλέον: αν το Weston αποτύχει να ξεκινήσει, ο testrunner δοκιμάζει το Xvfb, και αν κανένα δεν ξεκινήσει, η εκτέλεση συνεχίζει χωρίς οθόνη.

Μια ρύθμιση που ορίζει μία από τις τέσσερις μετονομασμένες επιλογές χωρίς την αντικατάστασή της, και δεν ορίζει `displayServer`, συνεχίζει να χρησιμοποιεί το Xvfb όπως το v9. Εκτός αν απενεργοποιεί τον display server, καταγράφει επίσης `Preferring Xvfb, as v9 did, because the config sets v9 display keys`. Μόλις μετονομάσετε τις επιλογές, προσθέστε `displayServer: 'xvfb'` για να διατηρήσετε το Xvfb, ή παραλείψτε το για να προτιμηθεί το Weston. Σε αυτόματη λειτουργία, μια προσαρμοσμένη εντολή εγκατάστασης εκτελείται πρώτα για το Weston, και ξανά για το Xvfb μόνο αν το Weston εξακολουθεί να μην είναι διαθέσιμο ή αποτύχει να ξεκινήσει και το Xvfb λείπει ακόμη, οπότε ορίστε το `displayServer` στον server που εγκαθιστά η εντολή για να παραλείψετε την απόπειρα για τον άλλο server.

Η αυτόματη εγκατάσταση δεν υποστηρίζει πλέον το `yum`, το οποίο το v9 χρησιμοποιούσε σε hosts χωρίς `dnf`. Το v10 ανιχνεύει μόνο τα `apt-get`, `dnf`, `zypper`, `pacman`, `apk` και `xbps-install`, οπότε εγκαταστήστε το Xvfb μόνοι σας σε host που έχει μόνο `yum`.

Ένας πίνακας `xvfbAutoInstallCommand` εκτελούνταν μέσω shell στο v9, οπότε στοιχεία όπως `&&` ή `VAR=value` λειτουργούσαν. Οι πίνακες εκτελούνται πλέον χωρίς shell με οποιοδήποτε από τα δύο ονόματα επιλογής, οπότε χρησιμοποιήστε string για σύνταξη shell.

Άλλες αλλαγές που μπορεί να παρατηρήσετε:

- Όλοι οι workers μοιράζονται μία οθόνη. Στο v9, κάθε worker είχε δική του οθόνη. Οι σελίδες Chrome και Edge μπορεί πλέον να μην έχουν focus, δείτε [Focus παραθύρου](/docs/headless-and-display-servers#window-focus).
- Ο αριθμός οθόνης του Xvfb δεν είναι σταθερός. Διαβάστε τον από το `DISPLAY` αντί να υποθέτετε `:99`.
- Ένας host με ορισμένο μόνο το `WAYLAND_DISPLAY` θεωρείται πλέον ότι έχει οθόνη. Το v9 εκτελούσε εκεί τους workers υπό Xvfb, αφού το `DISPLAY` δεν ήταν ορισμένο. Το v10 δεν ξεκινά τίποτα, ανοίγει τα παράθυρα του browser στον compositor σας και ορίζει τα `XDG_SESSION_TYPE`, `GDK_BACKEND` και `ELECTRON_OZONE_PLATFORM_HINT` σε `wayland` για την εκτέλεση. Για να τους εκτελέσετε υπό Xvfb όπως πριν, αναιρέστε τον ορισμό του `WAYLAND_DISPLAY` και ορίστε `displayServer: 'xvfb'`.
- Η προεπιλεγμένη οθόνη είναι 1920x1080. Το v9 χρησιμοποιούσε την προεπιλογή του `xvfb-run`, που είναι 1280x1024 σε Debian και Ubuntu και 640x480 σε Fedora, RHEL και Arch. Για να διατηρήσετε το μέγεθος που χρησιμοποιούν τα baselines σας, ορίστε τα `displayServerWidth` και `displayServerHeight` σε αυτό.
- Οι browsers επιλέγουν Wayland ή X11 από το `XDG_SESSION_TYPE` που ορίζει ο display server. Υπό Weston, το WebdriverIO προσθέτει επίσης `--ozone-platform=wayland` στα Chrome και Edge που εκκινεί, αφού τα Chrome και Edge πριν από την 140 (Chrome for Testing πριν από την 135) αγνοούν το `XDG_SESSION_TYPE`. Το Weston δεν παρέχει `DISPLAY`, οπότε αν τα τεστ ή τα εργαλεία σας χρειάζονται X11, ορίστε `displayServer: 'xvfb'`.
- Αν χρησιμοποιούσατε απευθείας το `XvfbManager` ή το instance `xvfb` από το `@wdio/xvfb`, χρησιμοποιήστε αντί αυτών το `DisplayServerManager` από το `@wdio/display-server`. Όπου εκτελούσατε `xvfb.init()` και περικλείατε εντολές σε `xvfb-run`, ή δημιουργούσατε διεργασίες μέσω του `ProcessFactory`, ξεκινήστε μια οθόνη και περάστε το περιβάλλον της στις διεργασίες που το χρειάζονται. Το παράδειγμα χρησιμοποιεί Xvfb σε 1280x1024, όπως έκανε το v9 σε Debian και Ubuntu. Σε host όπου έχει οριστεί μόνο το `WAYLAND_DISPLAY`, αναιρέστε πρώτα τον ορισμό του, αλλιώς το `startDaemon()` δεν ξεκινά τίποτα:

  ```js
  import { spawn } from 'node:child_process'
  import { once } from 'node:events'
  import { DisplayServerManager } from '@wdio/display-server'

  const manager = new DisplayServerManager({ displayServer: 'xvfb' })
  const daemon = await manager.startDaemon({ width: 1280, height: 1024 })
  // το startDaemon() επιστρέφει επίσης null όταν υπάρχει ήδη οθόνη
  if (!daemon && manager.shouldRun()) {
      throw new Error('Xvfb could not be started')
  }
  try {
      const child = spawn('your-command', { shell: true, stdio: 'inherit', env: { ...process.env, ...daemon?.env } })
      const [code] = await once(child, 'exit')
      process.exitCode = code ?? 1
  } finally {
      await daemon?.stop()
  }
  ```

## Emulation

Το `browser.emulate()` χρησιμοποιεί το module emulation του WebDriver BiDi για το τρέχον top-level browsing context. Το v9 εισήγαγε ένα preload script που τροποποιούσε τα `navigator.geolocation.getCurrentPosition`, `navigator.userAgent`, `window.matchMedia` και `navigator.onLine`. Αυτά τα scripts καταργήθηκαν. Το `browser.emulate('clock', …)` εξακολουθεί να εγκαθιστά fake timers στην τρέχουσα σελίδα και στις σελίδες που ανοίγονται στη συνέχεια.

Δεν απαιτείται πλέον επαναφόρτωση για τις εμβέλειες BiDi.

```diff
  await browser.emulate('onLine', false)
- // άλλαζε μόνο το `navigator.onLine`· η κίνηση εξακολουθούσε να ρέει
+ // το browsing context είναι εκτός σύνδεσης, συμπεριλαμβανομένων των fetch, WebSocket και WebTransport
```

- Το `onLine: false` καλεί το `emulation.setNetworkConditions` με `{ type: 'offline' }`. Το `true` και η επαναφορά της εμβέλειας το καθαρίζουν. Η ταχύτητα μετάδοσης και η καθυστέρηση παραμένουν στο `browser.throttleNetwork()`.
- Το `colorScheme` ορίζει το media feature `prefers-color-scheme`, οπότε το CSS `@media (prefers-color-scheme)` ακολουθεί το `matchMedia`.
- Το `userAgent` είναι η παράκαμψη user-agent του browser, όχι μια τροποποιημένη ιδιότητα `navigator.userAgent`.
- Το `geolocation` χρησιμοποιεί τη στοίβα geolocation του browser. Μια σελίδα μπορεί να χρειάζεται ακόμη `browser.setPermissions({ name: 'geolocation' }, 'granted')`. Το `{ error: 'positionUnavailable' }` αναφέρει αυτό το σφάλμα αντί για συντεταγμένες.
- Τα `colorScheme` και `media` μοιράζονται έναν χάρτη media features. Η μεταγενέστερη κλήση αντικαθιστά ολόκληρο τον χάρτη, και η επαναφορά οποιασδήποτε από τις δύο εμβέλειες τον καθαρίζει.
- Το `device` ορίζει το user agent, το viewport, την αφή, τη διάταξη κειμένου για κινητά και το viewport meta από τον descriptor της συσκευής. Δεν αλλάζει τα `screen` ή `orientation`.

Νέες εμβέλειες είναι οι `media`, `locale`, `timezone`, `touch`, `orientation`, `screen`, `viewportMeta`, `textLayout`, `scripting`, `scrollbar` και `forcedColors`. Ένας browser που δεν υλοποιεί μια εντολή απορρίπτει την κλήση με το δικό του σφάλμα (`unknown command` ή `unsupported operation`). Το WebdriverIO δεν επιστρέφει σε preload script ή σε CDP. Αν το `device` απορριφθεί στη μέση, επαναφέρονται τα προηγούμενα user agent, viewport, αφή, διάταξη κειμένου και viewport meta.

Το `wdio session emulate` δέχεται τις ίδιες εμβέλειες. Δεν σας λέει πλέον να κάνετε επαναφόρτωση για μια παράκαμψη που ισχύει αμέσως. Τα presets `emulate network` και το `emulate cpu` δεν αλλάζουν και παραμένουν μόνο για Chromium. Δείτε [Emulation](/docs/emulation).

## Επόμενα βήματα

- Αντιγράψτε το [skill μετάβασης](#migrate-with-a-coding-agent) στο έργο και ζητήστε από έναν agent να το εφαρμόσει.
- [WebdriverIO για Coding Agents](/docs/ai-agents) για τη συγγραφή νέων τεστ v10.
- [Headless και Display Servers](/docs/headless-and-display-servers) όταν η σουίτα εκτελείται σε Linux.