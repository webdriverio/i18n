---
id: nightwatch
title: Nightwatch DevTools
description: "Προσθέστε το περιβάλλον αποσφαλμάτωσης DevTools σε μια σουίτα δοκιμών Nightwatch χωρίς αλλαγές στις δοκιμές και ρυθμίστε screencasts, καταγραφή BiDi και λειτουργία trace."
---

Προσαρμογέας Nightwatch για το [WebdriverIO DevTools](https://github.com/webdriverio/devtools) - φέρνει το ίδιο οπτικό περιβάλλον αποσφαλμάτωσης στη σουίτα δοκιμών Nightwatch σας χωρίς καμία αλλαγή στον κώδικα των δοκιμών.

## Εγκατάσταση

```bash
npm install @wdio/nightwatch-devtools
```

## Ρύθμιση

### Τυπικό Nightwatch (σε στυλ mocha)

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // Απαιτείται για την καταγραφή αιτημάτων δικτύου
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

Εκτελέστε τις δοκιμές σας κανονικά - το περιβάλλον DevTools ανοίγει αυτόματα σε νέο παράθυρο προγράμματος περιήγησης:

```bash
nightwatch
```

> Δεν απαιτούνται αλλαγές στα αρχεία δοκιμών σας.

### Cucumber / BDD

Εισαγάγετε το `cucumberHooksPath` μαζί με την κύρια εξαγωγή και περάστε το στην επιλογή `require` του Cucumber. Αυτό καταχωρεί hooks σεναρίων `Before` / `After` που αντικατοπτρίζουν τη συμπεριφορά `beforeScenario` / `afterScenario` της υπηρεσίας WebdriverIO.

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default
const { cucumberHooksPath } = require('@wdio/nightwatch-devtools')

module.exports = {
  src_folders: ['features/step_definitions'],

  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'features',
      require: [cucumberHooksPath] // <-- καταχώρηση των Cucumber hooks του DevTools
    }
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

## Επιλογές διαμόρφωσης

| Επιλογή | Τύπος | Προεπιλογή | Περιγραφή |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Θύρα για τον backend διακομιστή του DevTools. Αυξάνεται αυτόματα αν είναι ήδη σε χρήση. |
| `hostname` | `string` | `'localhost'` | Hostname στο οποίο δεσμεύεται ο backend διακομιστής. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Εγγραφή βίντεο `.webm` ανά συνεδρία. Δείτε το [Screencast](#screencast) παρακάτω. |
| `bidi` | `boolean` | `false` | Ενεργοποίηση της καταγραφής WebDriver BiDi για την κονσόλα του προγράμματος περιήγησης + εξαιρέσεις JS + δίκτυο. Απαιτεί `webSocketUrl: true` στα capabilities σας και chromedriver με υποστήριξη BiDi. Όταν είναι συνδεδεμένο, η διαδρομή δικτύου μέσω του Chrome perf-log ανά εντολή απενεργοποιείται ώστε τα αιτήματα να μην διπλασιάζονται. |
| `mode` | `'live' \| 'trace'` | `'live'` | Το `live` ανοίγει το περιβάλλον DevTools· το `trace` το παραλείπει και γράφει αντί αυτού ένα φορητό αρχείο. Δείτε το [Trace Mode](/docs/devtools/wdio/trace-mode). |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Διάταξη του αρχείου trace. Ισχύει μόνο όταν `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Ένα trace ανά συνεδρία / αρχείο spec / δοκιμή. Το `'test'` γράφει το καθένα στο `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Ισχύει μόνο όταν `mode: 'trace'`. Δείτε το [Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). **Επιφύλαξη:** η διεπαφή BDD `describe/it` συμπτύσσεται σε ένα ενιαίο τμήμα εμβέλειας συνεδρίας (δείτε το [Τεμαχισμός ανά δοκιμή](#per-test-slicing--the-bdd-describeit-caveat)). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Ποια traces θα διατηρούνται. Συνδυάζεται με `traceGranularity: 'test'`. Ισχύει μόνο όταν `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Εγγραφή ενός πυκνού, συνεχούς filmstrip screencast μέσα στο trace για αναπαραγωγή με δυνατότητα κύλισης στο trace player — όχι μόνο ενός καρέ ανά ενέργεια. Εκτελεί τον καταγραφέα screencast (λειτουργία polling στο Nightwatch) για τη συνεδρία. Ισχύει μόνο όταν `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Στιγμιότυπο οθόνης ανά δοκιμή. Μόνο σε λειτουργία trace + `traceGranularity: 'test'`. **Μόνο παραγωγή** — το PNG γράφεται στον κατάλογο εξόδου του trace (και στο manifest όταν `emitArtifactsManifest: true`)· δεν επισυνάπτεται inline στο Allure (δείτε τη σημείωση παρακάτω). |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Τμήμα βίντεο ανά δοκιμή, που διατηρείται σύμφωνα με την καθορισμένη πολιτική (π.χ. `'retain-on-failure'`). Μόνο σε λειτουργία trace + `traceGranularity: 'test'`. Μια τιμή διαφορετική από `off` εκκινεί από μόνη της τον καταγραφέα screencast — **δεν** χρειάζεστε επιπλέον `filmstrip` ή `screencast.enabled`. **Μόνο παραγωγή** — το `.webm` γράφεται στον κατάλογο εξόδου του trace (και στο manifest όταν `emitArtifactsManifest: true`)· δεν επισυνάπτεται inline στο Allure. |
| `emitArtifactsManifest` | `boolean` | `false` | Εγγραφή του manifest `devtools-artifacts-<sessionId>.json` (το γενικό ευρετήριο που χρησιμοποιούν reporters/CI για να εντοπίσουν τα παραγόμενα αρχεία) δίπλα στο trace. **Προαιρετική ενεργοποίηση για το Nightwatch** — δεν υπάρχει ζωντανό σήμα Allure για αυτόματη ανίχνευση, οπότε σε αντίθεση με WDIO/Selenium δεν ενεργοποιείται ποτέ αυτόματα. Ισχύει μόνο όταν `mode: 'trace'`. |
| `captureAssertions` | `boolean` | `true` | Καταγραφή των assertions ως γραμμές ενεργειών στο trace — `node:assert` καθώς και τα εγγενή `browser.assert`/`browser.verify`, συμπεριλαμβανομένων των αρνητικών matchers `.not.*`. Ορίστε `false` για απενεργοποίηση. |

> **Η inline επισύναψη στο Allure δεν υποστηρίζεται για το Nightwatch.** Ο επίσημος reporter `nightwatch-allure` λειτουργεί εκ των υστέρων (χωρίς API ζωντανής επισύναψης), και το `attachment()` του `allure-js-commons` δεν κάνει τίποτα σε μια εκτέλεση Nightwatch. Έτσι, τα αρχεία `screenshot` / `video` *παράγονται* (αρχεία, καθώς και το manifest αρχείων όταν `emitArtifactsManifest: true`) στον κατάλογο εξόδου του trace, αλλά δεν επισυνάπτονται σε δοκιμή Allure. Ο τεμαχισμός ανά δοκιμή — και επομένως αυτά τα αρχεία — έχει νόημα για τις διεπαφές Cucumber και exports-object· η διεπαφή BDD `describe/it` συμπτύσσεται σε επίπεδο συνεδρίας, οπότε ο έλεγχος ανά δοκιμή δεν έχει καμία επίδραση εκεί.

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## Screencast

Εγγραφή ενός συνεχούς βίντεο `.webm` της συνεδρίας του προγράμματος περιήγησης. Η εγγραφή ξεκινά με την πρώτη συνεδρία που εντοπίζει το plugin και ολοκληρώνεται στο hook `after()` του Nightwatch.

**Μόνο λειτουργία polling.** Το Nightwatch δεν παρέχει σταθερή πρόσβαση στο CDP όπως το WebdriverIO (`browser.getPuppeteer()`) και το Selenium (`driver.createCDPConnection`), επομένως το screencast καταγράφει καρέ καλώντας το `browser.takeScreenshot()` σε σταθερό διάστημα. Λειτουργεί σε κάθε πρόγραμμα περιήγησης που υποστηρίζει το Nightwatch.

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| Επιλογή | Τύπος | Προεπιλογή | Σημειώσεις |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | Κεντρικός διακόπτης. |
| `pollIntervalMs` | `number` | `200` | Διάστημα λήψης στιγμιοτύπων (ms). Χαμηλότερη τιμή = πιο ομαλό βίντεο, περισσότερα round-trips WebDriver. 200 ms ≈ 5 fps. |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Μορφή pixel ανά καρέ που παραδίδεται στον κωδικοποιητή ffmpeg πριν από το τελικό mux σε `.webm`. Σε λειτουργία polling τα αρχικά στιγμιότυπα λαμβάνονται πάντα ως PNG, οπότε αυτό **δεν** αλλάζει την καταγραφή - μόνο τη μορφή που λαμβάνει ο κωδικοποιητής ανά καρέ. |
| `maxWidth` / `maxHeight` / `quality` | - | - | Επιλογές μόνο για CDP, αγνοούνται σε λειτουργία polling. Αναφέρονται για συμβατότητα δομής με τους προσαρμογείς WDIO/Selenium. |

**Προαπαιτούμενα:** `fluent-ffmpeg` (ήδη εξάρτηση χρόνου εκτέλεσης του πακέτου) καθώς και το εκτελέσιμο `ffmpeg` στο PATH. macOS: `brew install ffmpeg`. Linux: `apt install ffmpeg`. Χωρίς ffmpeg ο καταγραφέας εξακολουθεί να εκτελείται, αλλά το βήμα κωδικοποίησης καταγράφει μια προειδοποίηση και παραλείπει την εγγραφή του αρχείου.

**Έξοδος:** το αρχείο βίντεο γράφεται δίπλα στο αρχείο δοκιμής που μόλις εκτελέστηκε (με εναλλακτική τον κατάλογο του `nightwatch.conf.*` και, ως τελευταία λύση, το `process.cwd()`). Η πλήρης διαδρομή εμφανίζεται στη γραμμή καταγραφής του Nightwatch `📹 Screencast video: <path>` και το βίντεο μεταδίδεται επίσης στην καρτέλα Screencast του dashboard.

Για την πλήρη αναφορά της λειτουργίας screencast (υποστήριξη προγραμμάτων περιήγησης, διαδρομές εξόδου και στους τρεις προσαρμογείς), δείτε τη [σελίδα Screencast](/docs/devtools/wdio/screencast).

## Καταγραφή BiDi (προαιρετική)

Ενεργοποιήστε την καταγραφή WebDriver BiDi για μηνύματα κονσόλας του προγράμματος περιήγησης, εξαιρέσεις JS και αιτήματα δικτύου. Ισοδύναμη με τη διαδρομή που χρησιμοποιεί το selenium-devtools - και οι δύο προσαρμογείς μοιράζονται την ίδια λογική σύνδεσης στο `@wdio/devtools-core`.

```js
globals: nightwatchDevtools({
  port: 3000,
  bidi: true
})
```

Χρειάζεστε επίσης `webSocketUrl: true` στα capabilities σας ώστε το chromedriver να εκθέτει πράγματι το κανάλι BiDi:

```js
desiredCapabilities: {
  browserName: 'chrome',
  webSocketUrl: true,                           // ← ενεργοποιεί το BiDi
  'goog:chromeOptions': { /* ... */ }
}
```

Όταν το BiDi είναι συνδεδεμένο, η διαδρομή καταγραφής δικτύου μέσω του Chrome performance-log ανά εντολή απενεργοποιείται ώστε τα αιτήματα να μην εμφανίζονται δύο φορές στο dashboard. Αν λείπει το `webSocketUrl` ή η έκδοση του chromedriver δεν εκθέτει BiDi, η σύνδεση αποτυγχάνει σιωπηλά και η εναλλακτική μέσω perf-log συνεχίζει να λειτουργεί.

## Λειτουργία trace

Διαδρομή καταγραφής χωρίς γραφικό περιβάλλον — δεν ανοίγει παράθυρο DevTools. Στο τέλος της συνεδρίας ο προσαρμογέας γράφει ένα φορητό `trace-<sessionId>.zip` (ή κατάλογο) σε έναν φάκελο `test-results/` (δίπλα στον επιλυμένο κατάλογο δοκιμής / διαμόρφωσης), με την ίδια δομή όπως το αρχείο trace του WebdriverIO.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // προαιρετικό· προεπιλογή 'zip'
})
```

### Λεπτομέρεια και Cucumber

Το `traceGranularity` επιλέγει τι καλύπτει ένα αρχείο — `'session'` (προεπιλογή), `'spec'` ή `'test'`.

Το Nightwatch κλείνει το πρόγραμμα περιήγησης μετά από κάθε σενάριο Cucumber. Ένα trace `'session'` τα καλύπτει όλα: ένα zip για ολόκληρη την εκτέλεση, με κάθε σενάριο ένθετο κάτω από το feature του. Το `'test'` γράφει ένα zip ανά σενάριο στον δικό του φάκελο, κάτι που συνιστάται για το Cucumber — μικρότερα αρχεία, και η λεπτομέρεια στην οποία βασίζεται η διατήρηση του `tracePolicy`.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // ένα trace ανά σενάριο Cucumber
})
```

Στη διεπαφή BDD `describe/it`, το `'test'` συμπτύσσεται σε ένα ενιαίο τμήμα εμβέλειας συνεδρίας: το Nightwatch εκτελεί κάθε `it()` εσωτερικά και ενεργοποιεί το hook ανά δοκιμή του plugin μόνο μία φορά ανά module. Το δέντρο ενεργειών εξακολουθεί να εμφανίζει κάθε `it` ως ξεχωριστή ομάδα.

Η δέσμευση θύρας του backend, το παράθυρο του περιβάλλοντος και η επιλογή `screencast` παραλείπονται όλα σε λειτουργία trace. Για την πλήρη αναφορά της λειτουργίας (περιεχόμενα αρχείου, viewer, δοκιμές σε κινητά, πότε να επιλέξετε `zip` ή `ndjson-directory`), δείτε τη [σελίδα Trace Mode](/docs/devtools/wdio/trace-mode).

Το Nightwatch μοιράζεται την ίδια διοχέτευση trace με τους προσαρμογείς WebdriverIO και Selenium, οπότε η δομή του αρχείου είναι πανομοιότυπη ανεξάρτητα από τον προσαρμογέα που το παρήγαγε. Ένα trace του Nightwatch περιέχει την πλήρη καταγραφή ανά ενέργεια — ένα στιγμιότυπο οθόνης, το στιγμιότυπο του δέντρου προσβασιμότητας με εσοχές βάθους, τη λίστα αλληλεπιδραστικών στοιχείων και το Markdown transcript — ώστε να ανοίγει στον player `show-trace` με ταξίδι στον χρόνο DOM/στιγμιοτύπων, τις καρτέλες **A11y** και **Transcript**, την επικάλυψη στοιχείων pick-locator και (για το Cucumber) την ένθεση **Feature → Scenario → Step**.

Ανοίξτε ένα trace με το εκτελέσιμο `show-trace`, που περιλαμβάνεται στο `@wdio/nightwatch-devtools` (χωρίς επιπλέον εξάρτηση):

```sh
npx show-trace test-results/trace-<sessionId>.zip   # σε έργο που εγκαθιστά τον προσαρμογέα
pnpm show-trace test-results/trace-<sessionId>.zip  # από το monorepo του devtools
```

Δείτε τη σελίδα [Trace Player](/docs/devtools/trace-player) για τον πλήρη οδηγό και τις συντομεύσεις πληκτρολογίου.

### Τεμαχισμός ανά δοκιμή & η επιφύλαξη του BDD `describe/it`

Οι επιλογές ανά δοκιμή — `traceGranularity: 'test'`, καθώς και οι επιλογές `tracePolicy`, `screenshot` και `video` που συνδυάζονται με αυτήν — χρειάζονται ένα hook ανά δοκιμή για να αποκόψουν το τμήμα κάθε δοκιμής. Η διεπαφή **exports-object (σε στυλ mocha)** και το **Cucumber** (hooks ανά σενάριο) παρέχουν ένα τέτοιο, οπότε έχουν πραγματικό τεμαχισμό ανά δοκιμή. Η διεπαφή **BDD `describe/it`** είναι η εξαίρεση: το Nightwatch εκτελεί κάθε `it()` εσωτερικά και ενεργοποιεί το hook ανά δοκιμή του plugin μόνο μία φορά ανά module, οπότε το `traceGranularity: 'test'` συμπτύσσεται σε ένα ενιαίο τμήμα **εμβέλειας συνεδρίας** που αντιστοιχεί στην πρώτη δοκιμή. Το manifest αρχείων εξακολουθεί να απαριθμεί κάθε testcase με τη σωστή κατάστασή του· μόνο η αντιστοίχιση τμημάτων/αρχείων ανά δοκιμή συμπτύσσεται. Τα traces σε επίπεδο συνεδρίας και spec δεν επηρεάζονται.

## Παραδείγματα

Λειτουργικά παραδείγματα βρίσκονται στον κατάλογο `examples/` στο ανώτερο επίπεδο του αποθετηρίου. Κάντε build το workspace μία φορά (`pnpm install && pnpm build`) και στη συνέχεια εκτελέστε από τη ρίζα του αποθετηρίου:

| Κατάλογος | Runner | Εντολή |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch σε στυλ mocha | `pnpm demo:nightwatch` |

## Δυνατότητες

Ο προσαρμογέας Nightwatch παρέχει την ίδια εμπειρία περιβάλλοντος DevTools με το WebdriverIO. Κάθε δυνατότητα παρακάτω καταγράφεται αυτόματα με τη βασική ρύθμιση `globals: nightwatchDevtools({ port: 3000 })` — χωρίς διαμόρφωση ανά δυνατότητα (τα αρχεία καταγραφής δικτύου χρειάζονται επιπλέον το `'goog:loggingPrefs': { performance: 'ALL' }`, όπως φαίνεται στη [Ρύθμιση](#setup)). Οι σύνδεσμοι οδηγούν στην πλήρη αναφορά κάθε δυνατότητας.

- **[Interactive Test Rerunning & Visualization](/docs/devtools/wdio/interactive-test-rerunning)** - Ζωντανές προεπισκοπήσεις του προγράμματος περιήγησης, στιγμιότυπα οθόνης ανά εντολή και επανεκτέλεση δοκιμών/σουιτών με ένα κλικ
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** - Αποθήκευση στιγμιοτύπου μιας αποτυχημένης δοκιμής, επανεκτέλεσή της και σύγκριση των δύο εκτελέσεων δίπλα-δίπλα
- **[Multi-Framework Support](/docs/devtools/wdio/multi-framework-support)** - Τυπικοί runners (σε στυλ mocha) και Cucumber/BDD
- **[Console Logs](/docs/devtools/wdio/console-logs)** - Καταγραφή και επιθεώρηση της εξόδου κονσόλας του προγράμματος περιήγησης (σε πραγματικό χρόνο με `bidi: true`)
- **[Network Logs](/docs/devtools/wdio/network-logs)** - Παρακολούθηση κλήσεων API και δραστηριότητας δικτύου
- **[Metadata](/docs/devtools/wdio/metadata)** - Capabilities συνεδρίας, περιβάλλον και χρονισμός ανά συνεδρία προγράμματος περιήγησης
- **[TestLens](/docs/devtools/wdio/testlens)** - Μετάβαση από οποιαδήποτε εντολή στη γραμμή κώδικα που την ενεργοποίησε
- **[Session Screencast](/docs/devtools/wdio/screencast)** - Συνεχής εγγραφή `.webm` της συνεδρίας του προγράμματος περιήγησης
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Καταγραφή χωρίς γραφικό περιβάλλον που παράγει ένα φορητό `trace.zip` (χωρίς παράθυρο περιβάλλοντος)

Το Screencast είναι η μόνη δυνατότητα με δικές της επιλογές (πλήρης λίστα στο [Screencast](#screencast)):

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## Περιορισμοί

Το Nightwatch δεν παρέχει το ίδιο βάθος hooks πλαισίου με το WebdriverIO, οπότε υπάρχουν μερικές διαφορές σε σχέση με την υπηρεσία WDIO DevTools:

| Περιορισμός | Λεπτομέρεια |
|-----------|--------|
| Χωρίς εγγενή hooks εντολών | Το Nightwatch δεν διαθέτει hook `beforeCommand` / `afterCommand`. Οι εντολές υποκλέπτονται αντί αυτού μέσω ενός proxy wrapper του προγράμματος περιήγησης. |
| Περιορισμένο πλαίσιο δοκιμής | Το `browser.currentTest` παρέχει λιγότερα μεταδεδομένα από το πλαίσιο του WDIO runner· τα ονόματα δοκιμών και οι διαδρομές αρχείων απαιτούν πρόσθετους ευρετικούς κανόνες. |
| Επίπεδη ένθεση σουιτών | Το Nightwatch δεν υποστηρίζει εγγενώς πολλαπλά ένθετα μπλοκ `describe`· το plugin αναφέρει το πολύ δύο επίπεδα. |
| Καθυστερημένη διαθεσιμότητα αποτελεσμάτων | Τα αποτελέσματα των δοκιμών οριστικοποιούνται μόνο στο `afterEach` και δεν είναι διαθέσιμα κατά τη διάρκεια της δοκιμής. |
| Screencast μόνο σε λειτουργία polling | Σε αντίθεση με το WDIO (CDP push μέσω `browser.getPuppeteer()`) και το Selenium (CDP push μέσω `driver.createCDPConnection`), το Nightwatch δεν διαθέτει σταθερή πρόσβαση στο CDP, οπότε τα καρέ καταγράφονται με polling του `browser.takeScreenshot()`. Λειτουργεί σε κάθε πρόγραμμα περιήγησης που υποστηρίζει το Nightwatch· μικρό κόστος ανά καρέ ανάλογο του διαστήματος polling. |
| Τεμαχισμός trace ανά δοκιμή (BDD `describe/it`) | Η διεπαφή BDD ενεργοποιεί το hook ανά δοκιμή του plugin μία φορά ανά module, οπότε το `traceGranularity: 'test'` συμπτύσσεται σε ένα τμήμα εμβέλειας συνεδρίας. Οι διεπαφές exports-object (σε στυλ mocha) και Cucumber έχουν πραγματικό τεμαχισμό ανά δοκιμή. Δείτε το [Τεμαχισμός ανά δοκιμή](#per-test-slicing--the-bdd-describeit-caveat). |
| Αρχεία trace μόνο παραγωγής | Τα αρχεία `screenshot` / `video` ανά δοκιμή γράφονται στον κατάλογο εξόδου του trace (και στο manifest όταν `emitArtifactsManifest: true`) αλλά δεν επισυνάπτονται inline στο Allure — το Nightwatch δεν διαθέτει API ζωντανής επισύναψης Allure. |

Η συνολική ισοτιμία δυνατοτήτων με την υπηρεσία WebdriverIO DevTools είναι περίπου **80-90%**.