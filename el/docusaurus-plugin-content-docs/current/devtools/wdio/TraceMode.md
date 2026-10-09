---
id: trace-mode
title: Λειτουργία Trace
description: "Καταγράψτε headless αρχεία trace με τη λειτουργία trace του DevTools και ρυθμίστε μορφή, λεπτομέρεια, διατήρηση, στιγμιότυπα οθόνης, βίντεο και assertions."
---

Διαδρομή headless καταγραφής — δεν ανοίγει κανένα παράθυρο του DevTools UI. Στο τέλος της συνεδρίας ο adapter γράφει τα αρχεία trace σε έναν φάκελο `test-results/` δίπλα στον κατάλογο των spec / config σας. Για λεπτομέρεια `session` / `spec` αυτό είναι ένα `trace-<sessionId>.zip` (ή ένας κατάλογος `trace-<sessionId>/`). Για λεπτομέρεια `test` κάθε τεστ αποκτά τον δικό του υποφάκελο (δείτε [Λεπτομέρεια trace](#trace-granularity--tracegranularity)). Το αρχείο είναι φορητό και περιέχει όλα όσα χρειάζονται για offline αναπαραγωγή, σύγκριση από AI agents ή για οποιονδήποτε καταναλωτή προτιμά ένα αρχείο αντί για ένα ζωντανό UI.

Η λειτουργία trace είναι **αμοιβαία αποκλειόμενη με τη ζωντανή λειτουργία (live mode)**. Επιλέξτε μία ανά συνεδρία: οι άνθρωποι που κάνουν διαδραστικό debugging θέλουν τη live λειτουργία· οι agents που συγκρίνουν εκτελέσεις ή τα CI bots που συλλέγουν αρχεία θέλουν τη λειτουργία trace.

## Ενεργοποίηση

```ts
// wdio.conf.ts
services: [
  [
    'devtools',
    {
      mode: 'trace',
      traceFormat: 'zip' // optional; 'zip' (default) | 'ndjson-directory'
    }
  ]
]
```

Ένα πλήρες config αναφοράς, έτοιμο για αντιγραφή-επικόλληση, διατίθεται στο [`examples/wdio/wdio.trace.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.trace.conf.ts).

Το Selenium και το Nightwatch διαθέτουν την ίδια διαδικασία trace — δείτε τις σελίδες των adapters τους για τη σύνταξη ενεργοποίησης ανά framework: [Selenium](/docs/devtools/selenium#trace-mode) · [Nightwatch](/docs/devtools/nightwatch#trace-mode).

## Τι περιέχει το αρχείο

| Αρχείο | Περιεχόμενα |
|---|---|
| `trace.trace` | NDJSON `context-options` + συμβάντα ενεργειών `before` / `after`· μία γραμμή ανά εγγραφή |
| `trace.network` | Εγγραφές δικτύου τύπου HAR, μία ανά γραμμή |
| `transcript.md` | Σύνοψη σε Markdown αναγνώσιμη από ανθρώπους/LLM με χρονισμούς, selectors και σημειώσεις τιμών |
| `resources/page@<id>-<ts>.jpeg` | Στιγμιότυπο οθόνης που λαμβάνεται σε κάθε ενέργεια που αφορά τον χρήστη |
| `resources/page@<id>-<ts>-elements.json` | Επίπεδη λίστα των διαδραστικών στοιχείων σε εκείνη την ενέργεια |
| `resources/page@<id>-<ts>-snapshot.txt` | Στιγμιότυπο του δέντρου προσβασιμότητας με εσοχές βάθους (φιλικό προς AI) |

### Τι θεωρείται «ενέργεια»

Οι εντολές φιλτράρονται μέσω μιας allow-list πριν παράγουν εγγραφές στο trace. Παραδείγματα που καταλήγουν στο trace:

- `url` / `get` → `Page.navigate`
- `click` → `Element.click`
- `setValue` / `sendKeys` → `Element.fill`
- `submit`, `clear`, `selectByVisibleText`, …

Εσωτερικές εντολές όπως οι `findElement`, `waitUntil`, `executeScript` εξαιρούνται σκόπιμα — δεν αντιπροσωπεύουν πρόθεση του χρήστη και θα γέμιζαν θόρυβο τη χρονογραμμή. Η πλήρης allow-list βρίσκεται στο [`@wdio/devtools-core/action-mapping.ts`](https://github.com/webdriverio/devtools/blob/main/packages/core/src/action-mapping.ts).

## Μορφή εξόδου — `traceFormat`

```ts
{
  mode: 'trace',
  traceFormat: 'zip' | 'ndjson-directory'  // default: 'zip'
}
```

- **`zip`** (προεπιλογή) — ένα ενιαίο αρχείο στο `test-results/trace-<sessionId>.zip`.
- **`ndjson-directory`** — τα ίδια αρχεία αποσυμπιεσμένα στο `test-results/trace-<sessionId>/`. Ένα βήμα αποσυμπίεσης λιγότερο για scripted ή agentic καταναλωτές που θέλουν να κάνουν grep / stream απευθείας το NDJSON.

Και οι δύο μορφές ανοίγουν στον επίσημο [player `show-trace`](/docs/devtools/trace-player) και σε άλλους συμβατούς trace viewers.

## Λεπτομέρεια trace — `traceGranularity`

Πόσα αρχεία trace παράγει μια εκτέλεση:

```ts
{
  mode: 'trace',
  traceGranularity: 'session' | 'spec' | 'test' // default: 'session'
}
```

| Τιμή | Έξοδος |
|---|---|
| `session` (προεπιλογή) | Ένα trace ανά worker/συνεδρία — `test-results/trace-<sessionId>.zip`. |
| `spec` | Ένα trace ανά αρχείο spec. Μικρότερο, ευκολότερο στην πλοήγηση. |
| `test` | Ένα trace **ανά τεστ**, το καθένα στον δικό του φάκελο: `test-results/<spec>-<title>-<browser>[-retry<N>]/trace.zip`. |

Για λεπτομέρεια `test` το όνομα του φακέλου σχηματίζεται από το basename του spec, ένα slug του τίτλου του τεστ, τον browser και ένα επίθημα `-retry<N>` στις επαναληπτικές προσπάθειες — π.χ. `test-results/login_e2e-logs-in-chrome/trace.zip`, με την πρώτη επανάληψη στο `test-results/login_e2e-logs-in-chrome-retry1/trace.zip`. Τα traces ανά τεστ είναι τα πιο εύκολα στην πλοήγηση και συνδυάζονται καλύτερα με μια πολιτική διατήρησης, ώστε να γράφονται μόνο τα traces που σας ενδιαφέρουν.

## Διατήρηση — `tracePolicy`

Από προεπιλογή διατηρείται κάθε trace (`'on'`). Για να κρατάτε μόνο τα ενδιαφέροντα — ιδανικό με `traceGranularity: 'test'`:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure' // default: 'on'
}
```

| Πολιτική | Διατηρεί το trace όταν… |
|---|---|
| `'on'` (προεπιλογή) | Πάντα — γράφεται κάθε trace. |
| `'retain-on-failure'` | Η **τελική** προσπάθεια του τεστ απέτυχε. Μια ακολουθία επαναλήψεων αποτυχία-μετά-επιτυχία καταλήγει σε `passed`, οπότε *δεν* διατηρείται — δεν κρατάτε άσκοπα ένα flaky τεστ που τελικά πέρασε. |
| `'retain-on-first-failure'` | Η **προσπάθεια 0** απέτυχε, ανεξάρτητα από το αν μια μεταγενέστερη επανάληψη πέτυχε. |
| `'on-first-retry'` | Το τεστ επαναλήφθηκε τουλάχιστον μία φορά (υπάρχει προσπάθεια 1). |
| `'on-all-retries'` | Υπάρχει οποιαδήποτε επαναληπτική προσπάθεια (προσπάθεια ≥ 1). |
| `'retain-on-failure-and-retries'` | Η τελική προσπάθεια απέτυχε **ή** το τεστ επαναλήφθηκε. |

Ένα τμήμα που δεν διατηρείται απορρίπτεται και δεν γράφεται ποτέ στον δίσκο. Οι πολιτικές που λαμβάνουν υπόψη τις επαναλήψεις βασίζονται σε ένα **μητρώο αποτελεσμάτων** ανά προσπάθεια, το οποίο ο adapter διατηρεί ανά σταθερό (ως προς τις επαναλήψεις) id τεστ, ώστε τα `retain-on-failure` και `retain-on-first-failure` να αξιολογούν τη σωστή προσπάθεια. Όπου ένας runner δεν εκθέτει πληροφορίες επανάληψης ανά προσπάθεια, κάθε πολιτική εκτός της `retain-on-failure` υποβαθμίζεται σε `retain-on-failure`· μια εκτέλεση χωρίς παρατηρημένα αποτελέσματα (π.χ. ένα απλό αυτόνομο script) αποτυγχάνει **ανοιχτά** (fails open) και διατηρεί το trace, αντί να διακινδυνεύσει την απόρριψη ενός που χρειάζεστε.

> Η διατήρηση με επίγνωση των επαναλήψεων έχει επαληθευτεί end-to-end για **WebdriverIO** (mocha / cucumber) και **Selenium** (mocha). Για το **Nightwatch**, το `retain-on-failure` λειτουργεί, αλλά οι υπόλοιπες πολιτικές με επίγνωση επαναλήψεων υποβαθμίζονται σε αυτό, επειδή το `--retries` του Nightwatch εκτελεί ξανά ένα testcase εσωτερικά χωρίς να ενεργοποιεί ξανά τα hooks ανά τεστ. Το διαδιεργασιακό `specFileRetries` του WDIO επίσης βρίσκεται εκτός του μητρώου (ανά worker). Δείτε τη [σελίδα του adapter Nightwatch](/docs/devtools/nightwatch#trace-mode) για τις λεπτομέρειες.

## Πυκνό filmstrip — `filmstrip`

**Από προεπιλογή** το trace καταγράφει ένα **πυκνό, συνεχές** screencast, ώστε ο player να παρέχει ομαλή αναπαραγωγή κατά το scrubbing αντί να πηδά από καρέ σε καρέ. Τα πυκνά καρέ βρίσκονται δίπλα στα καρέ ανά ενέργεια (που φέρουν τα στιγμιότυπα DOM). Ορίστε `filmstrip: false` για να καταγράφεται μόνο ένα καρέ ανά ενέργεια — ένα μικρότερο trace χωρίς συνεχή καταγραφή:

```ts
{
  mode: 'trace',
  filmstrip: false // opt out — one frame per action (default is true)
}
```

- Τα πυκνά καρέ προστίθενται **δίπλα** στα καρέ ανά ενέργεια (που φέρουν τα στιγμιότυπα DOM), οπότε δεν χάνονται δεδομένα DOM — όταν υπάρχουν πυκνά καρέ, αντικαθιστούν το αραιό filmstrip ανά ενέργεια για το scrubbing.
- Τα καρέ αραιώνονται κατά την εξαγωγή (≥100 ms απόσταση) και είναι content-addressed, οπότε πανομοιότυπα καρέ (μια στατική αναμονή) συμπτύσσονται σε έναν πόρο. Ο buffer της ζωντανής συνεδρίας περιορίζεται από το `screencast.maxBufferFrames` (προεπιλογή 2000).
- Η καταγραφή χρησιμοποιεί τον screencast recorder — CDP push σε Chrome/Chromium, polling στιγμιοτύπων οθόνης αλλού. Σε browsers εκτός Chrome το polling εκδίδει πολλές εντολές `takeScreenshot`· συνδυάστε το με την επιλογή σίγασης βημάτων του reporter σας (δείτε [Ενσωμάτωση Allure](/docs/devtools/allure)).

Το `filmstrip` είναι διαθέσιμο και στους τρεις adapters (WebdriverIO / Selenium / Nightwatch).

## Στιγμιότυπο οθόνης & βίντεο ανά τεστ — `screenshot` / `video`

Με `traceGranularity: 'test'` κάθε τεστ μπορεί επίσης να παράγει ένα αυτόνομο στιγμιότυπο οθόνης ή/και ένα τμήμα βίντεο ανά τεστ, αναπαράγοντας τη γνωστή εργονομία στιγμιοτύπου/βίντεο σε αποτυχία:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  screenshot: 'only-on-failure', // 'off' (default) | 'on' | 'only-on-failure'
  video: 'retain-on-failure'     // 'off' (default) | any tracePolicy value
}
```

| Επιλογή | Τιμές | Συμπεριφορά |
|---|---|---|
| `screenshot` | `'off'` (προεπιλογή) · `'on'` · `'only-on-failure'` | Το `'on'` καταγράφει μετά από κάθε τεστ· το `'only-on-failure'` μόνο μετά από ένα τεστ που αποτυγχάνει. PNG. |
| `video` | `'off'` (προεπιλογή) · οποιαδήποτε τιμή `tracePolicy` | Καταγράφει το screencast συνεχώς και διατηρεί το τμήμα κάθε τεστ σύμφωνα με την ίδια σημασιολογία διατήρησης με το `tracePolicy`. WebM. Ο ορισμός μιας τιμής διαφορετικής από `off` ξεκινά τον recorder από μόνος του — δεν χρειάζεστε επιπλέον `filmstrip` ή `screencast.enabled`. |

Και τα δύο περιορίζονται στη λειτουργία trace + `traceGranularity: 'test'` (το εύρος ανά τεστ στο οποίο προσαρτώνται). Σε πιο αδρές λεπτομέρειες δεν κάνουν τίποτα.

- **WebdriverIO** — τα `screenshot` / `video` είναι επιλογές του service· προσαρτώνται inline στο Allure όταν υπάρχει το `@wdio/allure-reporter`.
- **Selenium** — οι ίδιες επιλογές στο `DevToolsOptions` του· προσαρτώνται inline στο Allure μέσω του `allure-js-commons` όταν είναι ενεργός ένας Allure runner adapter.
- **Nightwatch** — **μόνο παραγωγή**: τα αρχεία γράφονται στον κατάλογο εξόδου του trace (και καταγράφονται στο manifest), αλλά δεν προσαρτώνται inline στο Allure — το Nightwatch δεν διαθέτει live Allure attach API. Δείτε [Περιορισμοί λειτουργίας Trace](/docs/devtools/limitations).

> Το `screencast.enabled` είναι η ξεχωριστή συνεχής καταγραφή `.webm` της **live λειτουργίας** και αγνοείται στη λειτουργία trace. Στη λειτουργία trace χρησιμοποιήστε `filmstrip` (πυκνά καρέ μέσα στο trace) ή `video` ανά τεστ· τα πεδία ρύθμισης του screencast (`quality`, `maxWidth`, `pollIntervalMs`, …) εξακολουθούν να ισχύουν για όποιον recorder εκτελείται.

## Manifest αρχείων — `emitArtifactsManifest`

Γράφει ένα `devtools-artifacts-<sessionId>.json` δίπλα στο trace — ένα γενικό ευρετήριο που καταναλώνουν reporters και CI για να ανακαλύψουν τα παραγόμενα αρχεία (κάθε trace / στιγμιότυπο οθόνης / βίντεο, συν την κατάσταση κάθε τεστ):

```ts
{
  mode: 'trace',
  emitArtifactsManifest: true // default: off; auto-on when Allure is detected
}
```

- **Απενεργοποιημένο από προεπιλογή.** **Ενεργοποιείται αυτόματα** όταν ανιχνεύεται ένας Allure reporter — το `@wdio/allure-reporter` του WebdriverIO στο config ή ένα ενεργό runtime `allure-js-commons` του Selenium.
- **Στο Nightwatch είναι opt-in**: δεν έχει ζωντανό σήμα Allure για αυτόματη ανίχνευση (το `nightwatch-allure` λειτουργεί εκ των υστέρων), οπότε δεν ενεργοποιείται ποτέ αυτόματα — ορίστε το ρητά αν θέλετε το manifest.

## Assertions — `captureAssertions`

Τα assertions εμφανίζονται ως πλήρεις γραμμές ενεργειών στο trace (ενεργό από προεπιλογή· ορίστε `captureAssertions: false` για απενεργοποίηση):

- **`node:assert`** — καταγράφεται και στους τρεις adapters ως γραμμές `assert.<method>`.
- **WebdriverIO `expect`** — οι matchers `expect(...)` που περνούν *και* που αποτυγχάνουν (`expect($el).toHaveText(...)`, `toBeExisting()`, …) εμφανίζονται ως γραμμές `expect.<matcher>` που φέρουν την αναμενόμενη τιμή, τη θέση του στοιχείου στον πηγαίο κώδικα και ένα στιγμιότυπο· οι εσωτερικές εντολές polling του matcher αποκρύπτονται ώστε να εμφανίζεται μόνο το assertion.
- **Nightwatch `browser.assert.*` / `browser.verify.*`** — τα εγγενή assertions εμφανίζονται ως γραμμές `assert.<m>` / `verify.<m>`.

Τα assertions που περνούν εμφανίζονται πράσινα· όσα αποτυγχάνουν εμφανίζονται κόκκινα με το μήνυμα σφάλματος.

## Δοκιμές σε κινητά

Η λειτουργία trace ανιχνεύει συνεδρίες κινητών μέσω του `platformName: 'android' | 'ios'` (χωρίς διάκριση πεζών-κεφαλαίων) και προσαρμόζεται:

- **Mobile web** (Chrome σε Android, Safari σε iOS): η ίδια διαδικασία στιγμιοτύπων βασισμένη στο DOM με το desktop.
- **Native mobile**: τα scripts DOM που εισάγονται στη σελίδα απενεργοποιούνται· χρησιμοποιείται το `getPageSource()` για τη λήψη του XML δέντρου του Appium, το οποίο τροφοδοτεί αντ' αυτού τον serializer στιγμιοτύπων.

Το `context-options` του trace καταγράφει `title: 'android — <deviceName>'` / `'ios — <deviceName>'` ώστε ο viewer να επισημαίνει σωστά τα καρέ. Ένα config αναφοράς WDIO για Android Chrome μέσω Appium διατίθεται στο [`examples/wdio/wdio.mobile.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.mobile.conf.ts).

## Προβολή του αρχείου

Ανοίξτε ένα trace στον επίσημο **[Trace Player](/docs/devtools/trace-player)** — το WebdriverIO DevTools UI σε ειδική λειτουργία player μόνο για ανάγνωση:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
```

Ο player σας προσφέρει ταξίδι στον χρόνο στο DOM, την καρτέλα A11y και το overlay επιλογής locator, την καρτέλα Transcript με Copy-for-LLM, τις καρτέλες Errors / Console / Network / Source και μια χρονογραμμή με δυνατότητα scrubbing. Το ίδιο φορητό `.zip` ανοίγει επίσης σε άλλους αυτόνομους trace viewers και μέσα στον ενσωματωμένο viewer μιας αναφοράς Allure. Δείτε τη σελίδα **[Trace Player](/docs/devtools/trace-player)** για τον πλήρη οδηγό, τις δυνατότητες και τις συντομεύσεις πληκτρολογίου.

## Μάθετε περισσότερα
Το bin `show-trace` που παρέχει κάθε adapter ανοίγει το ίδιο αρχείο στον player του DevTools, ο οποίος επιπλέον εκθέτει μια **καρτέλα A11y**: το δέντρο προσβασιμότητας που καταγράφεται ανά ενέργεια, όπου το κλικ σε μια γραμμή αντιγράφει τον locator εκείνου του στοιχείου.

Αυτοί οι locators γράφονται στη διάλεκτο του runner που έκανε την καταγραφή, οπότε επικολλώνται απευθείας στο framework που παρήγαγε το trace. Ένα στοιχείο που αναγνωρίζεται μόνο από το κείμενό του είναι `a*=Logout` στο WebdriverIO και `//a[contains(., "Logout")]` στο Selenium — με λεζάντα την κλήση που το επιλύει, `By.xpath()`. Το Nightwatch προτιμά έναν εγγενή CSS locator όπως `button[type="submit"]`, επειδή είναι ο μόνος runner που διαβάζει ένα σκέτο string selector με προεπιλεγμένη στρατηγική CSS, και καταφεύγει σε XPath (με λεζάντα `useXpath()` / `locateStrategy: 'xpath'`) μόνο όταν δεν υπάρχει μοναδικός CSS locator. Κάθε άλλος locator είναι φορητό CSS.

Για κατανάλωση από LLM / agents, διαβάστε απευθείας το `transcript.md` — είναι μια συμπαγής απόδοση των ενεργειών σε Markdown με selectors και τιμές.

- **[Trace Player](/docs/devtools/trace-player)** — ο πλήρης οδηγός του player `show-trace`, οι δυνατότητες και οι συντομεύσεις πληκτρολογίου.
- **[Ενσωμάτωση Allure](/docs/devtools/allure)** — πώς τα αρχεία trace / στιγμιοτύπων οθόνης / βίντεο προσαρτώνται σε μια αναφορά Allure.
- **[Υποστήριξη πολλαπλών Frameworks](/docs/devtools/cross-framework)** — ο πίνακας δυνατοτήτων ανά adapter (WebdriverIO / Selenium / Nightwatch).
- **[Περιορισμοί λειτουργίας Trace](/docs/devtools/limitations)** — τι παραλείπει η λειτουργία trace και τα γνωστά κενά ανά adapter.
- **[Αναφορά ρυθμίσεων](/docs/devtools/reference)** — όλες οι επιλογές με μια ματιά.