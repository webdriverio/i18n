---
id: reference
title: Αναφορά Ρυθμίσεων
description: "Αναζητήστε κάθε επιλογή του DevTools για τη λειτουργία live και τη λειτουργία trace στους προσαρμογείς WebdriverIO, Selenium και Nightwatch, μαζί με τις προεπιλεγμένες τιμές."
---

Όλες οι επιλογές του DevTools με μια ματιά, για τους τρεις προσαρμογείς. Τα **ονόματα, οι τύποι και οι προεπιλεγμένες τιμές των επιλογών είναι ίδια** σε κάθε προσαρμογέα· όπου η συμπεριφορά διαφέρει, αυτό επισημαίνεται. Για την πλήρη επεξήγηση κάθε επιλογής trace, δείτε την αντίστοιχη ενότητα στη σελίδα [Λειτουργία Trace](/docs/devtools/wdio/trace-mode).

Περάστε τις επιλογές με τον τρόπο που τις δέχεται κάθε προσαρμογέας:

- **WebdriverIO** — `services: [['devtools', { … }]]`
- **Selenium** — `DevTools.configure({ … })`
- **Nightwatch** — `globals: nightwatchDevtools({ … })`

## Επιλογές λειτουργίας & λειτουργίας live

| Επιλογή | Τύπος / τιμές | Προεπιλογή | Σημειώσεις |
|---|---|---|---|
| `mode` | `'live' \| 'trace'` | `'live'` | Το `'live'` ανοίγει τον πίνακα ελέγχου του DevTools UI· το `'trace'` τον παραλείπει και γράφει ένα φορητό artifact. Οι δύο λειτουργίες είναι αμοιβαία αποκλειόμενες. |
| `port` | `number` | τυχαία | Θύρα στην οποία δεσμεύεται το DevTools UI / backend. Μόνο σε λειτουργία live. |
| `hostname` | `string` | `'localhost'` | Hostname στο οποίο δεσμεύεται ο διακομιστής. Μόνο σε λειτουργία live. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Συνεχές βίντεο της συνεδρίας (`.webm`). Μόνο σε λειτουργία live — για τη λειτουργία trace χρησιμοποιήστε το `video`. Δείτε [Screencast](/docs/devtools/wdio/screencast). |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600×1200 | Capabilities που χρησιμοποιούνται για το άνοιγμα του παραθύρου του DevTools UI. WebdriverIO, μόνο σε λειτουργία live. |

## Επιλογές λειτουργίας trace

Ισχύουν μόνο όταν `mode: 'trace'`.

| Επιλογή | Τύπος / τιμές | Προεπιλογή | Λεπτομέρειες |
|---|---|---|---|
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Ένα μεμονωμένο αρχείο συμπίεσης έναντι ενός αποσυμπιεσμένου καταλόγου. [Μορφή εξόδου](/docs/devtools/wdio/trace-mode#output-format--traceformat) |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Ένα trace ανά συνεδρία / αρχείο spec / test. Το `'test'` απαιτείται για στιγμιότυπα οθόνης/βίντεο ανά test και για ενσωματωμένη επισύναψη στο Allure. [Λεπτομέρεια trace](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Ποια traces διατηρούνται. Συνδυάζεται με `traceGranularity: 'test'`. [Διατήρηση](/docs/devtools/wdio/trace-mode#retention--tracepolicy) |
| `filmstrip` | `boolean` | `true` | Πυκνό, συνεχές screencast μέσα στο trace για ομαλή πλοήγηση· με `false` καταγράφεται ένα καρέ ανά ενέργεια. [Πυκνό filmstrip](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Στιγμιότυπο οθόνης ανά test (απαιτεί `traceGranularity: 'test'`). Επιλογή του service του WebdriverIO. [Στιγμιότυπο οθόνης & βίντεο ανά test](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `video` | `'off' \| <tracePolicy value>` | `'off'` | Τμήμα βίντεο ανά test (απαιτεί `traceGranularity: 'test'`). Επιλογή του service του WebdriverIO. [Στιγμιότυπο οθόνης & βίντεο ανά test](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `emitArtifactsManifest` | `boolean` | `false` | Γράφει το `devtools-artifacts-<sessionId>.json`. Ενεργοποιείται αυτόματα όταν εντοπίζεται reporter του Allure (προαιρετική ενεργοποίηση στο Nightwatch). [Manifest artifacts](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) |
| `captureAssertions` | `boolean` | `true` | Καταγράφει τα `node:assert` (και τους matchers `expect` του framework όπου υποστηρίζονται) ως ενέργειες του trace. [Assertions](/docs/devtools/wdio/trace-mode#assertions--captureassertions) |

## Μόνο για Nightwatch

| Επιλογή | Τύπος / τιμές | Προεπιλογή | Σημειώσεις |
|---|---|---|---|
| `bidi` | `boolean` | `false` | Προαιρετική ενεργοποίηση καταγραφής μέσω WebDriver BiDi (console + εξαιρέσεις JS + δίκτυο). Απαιτεί `webSocketUrl: true` στα capabilities. Στο WebdriverIO και στο Selenium, το BiDi συνδέεται αυτόματα. Δείτε [Nightwatch → Καταγραφή BiDi](/docs/devtools/nightwatch#bidi-capture-opt-in). |

## Διαφορές ανά προσαρμογέα

Ορισμένες δυνατότητες trace υποβαθμίζονται σε συγκεκριμένους προσαρμογείς — δείτε τον [πίνακα υποστήριξης μεταξύ frameworks](/docs/devtools/cross-framework) για την πλήρη εικόνα. Οι σημαντικότερες:

- **Διατήρηση με επίγνωση επαναλήψεων στο Nightwatch** — μόνο το `retain-on-failure` είναι αξιόπιστο· οι υπόλοιπες τιμές του `tracePolicy` υποβαθμίζονται σε αυτό.
- **BDD `describe/it` στο Nightwatch** — το `traceGranularity: 'test'` συμπτύσσεται σε ένα ενιαίο τμήμα σε επίπεδο συνεδρίας.
- **Επισύναψη στο Allure στο Nightwatch** — τα `screenshot`/`video` ανά test μόνο παράγονται (αρχεία + manifest) και δεν επισυνάπτονται ενσωματωμένα.