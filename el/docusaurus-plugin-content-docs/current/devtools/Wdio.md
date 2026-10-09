---
id: wdio
title: WebDriverIO DevTools
description: "Εγκαταστήστε και διαμορφώστε την υπηρεσία WebdriverIO DevTools για να κάνετε debugging στα tests με αναπαραγωγή DOM, στιγμιότυπα οθόνης, καταγραφή δικτύου και κονσόλας και screencasts."
---

Μια υπηρεσία WebdriverIO που παρέχει ένα UI εργαλείων προγραμματιστή για την εκτέλεση, το debugging και την επιθεώρηση tests αυτοματοποίησης browser. Οι δυνατότητες περιλαμβάνουν αναπαραγωγή μεταλλάξεων DOM, στιγμιότυπα οθόνης ανά εντολή, επιθεώρηση αιτημάτων δικτύου, καταγραφή logs κονσόλας και εγγραφή screencast της συνεδρίας.

## Εγκατάσταση

```sh
npm install @wdio/devtools-service --save-dev
```

## Χρήση

### Test Runner

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

### Standalone

```ts
import { remote } from 'webdriverio'
import { setupForDevtools } from '@wdio/devtools-service'

const browser = await remote(setupForDevtools({
  capabilities: { browserName: 'chrome' }
}))
await browser.url('https://example.com')
await browser.deleteSession()
```

## Επιλογές Υπηρεσίας

```ts
services: [['devtools', options]]
```

| Επιλογή | Τύπος | Προεπιλογή | Περιγραφή |
|---|---|---|---|
| `port` | `number` | τυχαία | Η θύρα στην οποία ακούει ο server του DevTools UI |
| `hostname` | `string` | `'localhost'` | Το hostname στο οποίο δεσμεύεται ο server του DevTools UI |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600x1200 | Capabilities που χρησιμοποιούνται για το άνοιγμα του παραθύρου του DevTools UI |
| `screencast` | `ScreencastOptions` | - | Εγγραφή βίντεο της συνεδρίας ([δείτε Screencast](/docs/devtools/wdio/screencast)) |
| `mode` | `'live' \| 'trace'` | `'live'` | Το `live` ανοίγει το DevTools UI· το `trace` το παραλείπει και γράφει αντί αυτού ένα φορητό artifact ([δείτε Trace Mode](/docs/devtools/wdio/trace-mode)) |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Διάταξη του trace artifact — ενιαίο αρχείο συμπίεσης έναντι αποσυμπιεσμένου καταλόγου. Ισχύει μόνο όταν `mode: 'trace'` |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Ένα trace ανά συνεδρία / αρχείο spec / test. Το `'test'` γράφει το καθένα στο `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Ισχύει μόνο όταν `mode: 'trace'` ([δείτε Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity)) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Ποια traces θα διατηρούνται. Συνδυάζεται με `traceGranularity: 'test'`. Ισχύει μόνο όταν `mode: 'trace'` |
| `filmstrip` | `boolean` | `true` | Καταγράφει ένα πυκνό, συνεχές filmstrip screencast *μέσα* στο trace για ομαλή αναπαραγωγή με δυνατότητα κύλισης στον player — πυκνά καρέ δίπλα στα καρέ ανά ενέργεια, αραιωμένα και με διευθυνσιοδότηση βάσει περιεχομένου κατά την εξαγωγή. Ισχύει μόνο όταν `mode: 'trace'` |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Στιγμιότυπο οθόνης ανά test, επισυναπτόμενο inline στο Allure (`image/png`). Απαιτεί `mode: 'trace'` + `traceGranularity: 'test'` |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Βίντεο screencast ανά test, που διατηρείται σύμφωνα με τη δοθείσα πολιτική και επισυνάπτεται inline στο Allure (`video/webm`). Απαιτεί `mode: 'trace'` + `traceGranularity: 'test'` |
| `emitArtifactsManifest` | `boolean` | `false` | Γράφει το `devtools-artifacts-<sessionId>.json` — ένα γενικό ευρετήριο κάθε παραγόμενου artifact μαζί με την κατάσταση κάθε test, για reporters/CI. Ενεργοποιείται αυτόματα όταν το `@wdio/allure-reporter` υπάρχει στο config. Ισχύει μόνο όταν `mode: 'trace'` |
| `captureAssertions` | `boolean` | `true` | Καταγραφή των assertions ως γραμμές ενεργειών στο trace — `node:assert` καθώς και επιτυχημένοι/αποτυχημένοι matchers `expect(...)`. Ορίστε σε `false` για απενεργοποίηση |

## Ξεκινώντας

1. Εκτελέστε τα WebdriverIO tests σας
2. Το DevTools UI ανοίγει αυτόματα σε ένα εξωτερικό παράθυρο browser
3. Τα tests αρχίζουν να εκτελούνται αμέσως με οπτικοποίηση σε πραγματικό χρόνο
4. Δείτε ζωντανή προεπισκόπηση του browser, την πρόοδο των tests και την εκτέλεση των εντολών
5. Μετά την ολοκλήρωση της αρχικής εκτέλεσης, χρησιμοποιήστε τα κουμπιά αναπαραγωγής για να επανεκτελέσετε μεμονωμένα tests ή suites
6. Πατήστε το κουμπί διακοπής οποιαδήποτε στιγμή για να τερματίσετε τα tests που εκτελούνται
7. Εξερευνήστε ενέργειες, metadata, logs κονσόλας και πηγαίο κώδικα στις καρτέλες του workbench

## Δυνατότητες

Εξερευνήστε αναλυτικά τις δυνατότητες του WebDriverIO DevTools:

- **[Διαδραστική Επανεκτέλεση & Οπτικοποίηση Tests](/docs/devtools/wdio/interactive-test-rerunning)** - Προεπισκοπήσεις browser σε πραγματικό χρόνο με επανεκτέλεση tests
- **[Διατήρηση & Επανεκτέλεση (Σύγκριση)](/docs/devtools/wdio/preserve-and-rerun)** - Κρατήστε στιγμιότυπο ενός αποτυχημένου test, επανεκτελέστε το και συγκρίνετε τις δύο εκτελέσεις δίπλα-δίπλα
- **[Υποστήριξη Πολλαπλών Frameworks](/docs/devtools/wdio/multi-framework-support)** - Λειτουργεί με Mocha, Jasmine και Cucumber
- **[Logs Κονσόλας](/docs/devtools/wdio/console-logs)** - Καταγραφή και επιθεώρηση της εξόδου της κονσόλας του browser
- **[Logs Δικτύου](/docs/devtools/wdio/network-logs)** - Παρακολούθηση κλήσεων API και δραστηριότητας δικτύου
- **[Metadata](/docs/devtools/wdio/metadata)** - Capabilities συνεδρίας, περιβάλλον και χρονισμοί ανά συνεδρία browser
- **[TestLens](/docs/devtools/wdio/testlens)** - Μετάβαση στον πηγαίο κώδικα με έξυπνη πλοήγηση κώδικα
- **[Screencast Συνεδρίας](/docs/devtools/wdio/screencast)** - Αυτόματη εγγραφή βίντεο των συνεδριών browser
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Headless διαδρομή καταγραφής που παράγει ένα φορητό artifact `trace.zip` (χωρίς παράθυρο UI)· υποστηρίζει μορφές εξόδου `zip` και `ndjson-directory`, granularity ανά συνεδρία/spec/test, πολιτικές διατήρησης που λαμβάνουν υπόψη τις επαναλήψεις και ένα προαιρετικό πυκνό `filmstrip`, όλα προβάσιμα στον επίσημο player `show-trace`

## Trace Player

Ένα trace που καταγράφηκε με `mode: 'trace'` ανοίγει στον επίσημο player `show-trace` (`npx show-trace path/to/trace.zip`) — time-travel στο DOM, η καρτέλα A11y και η επικάλυψη στοιχείων pick-locator, η καρτέλα Transcript με Copy-for-LLM, οι καρτέλες Errors / Console / Network / Source και ένα timeline με δυνατότητα κύλισης (πυκνό filmstrip, ένθεση Cucumber Feature → Scenario → Step).

Δείτε τη σελίδα **[Trace Player](/docs/devtools/trace-player)** για τον πλήρη οδηγό και άλλους συμβατούς viewers.

## Αναφορές Allure

Με το `@wdio/allure-reporter` στο config, τα artifacts του trace mode (το trace zip, καθώς και το στιγμιότυπο οθόνης και το βίντεο ανά test με `traceGranularity: 'test'`) επισυνάπτονται αυτόματα στην αναφορά Allure, και το `emitArtifactsManifest` ενεργοποιείται αυτόματα.

Δείτε το **[Allure Integration](/docs/devtools/allure)** για τις λεπτομέρειες των επισυνάψεων και τις επιλογές απόκρυψης βημάτων του reporter.