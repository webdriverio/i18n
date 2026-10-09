---
id: allure
title: Ενσωμάτωση με το Allure
description: "Επισυνάψτε αυτόματα στην αναφορά Allure τα αρχεία που παράγει το DevTools σε λειτουργία trace, όπως αρχεία zip του trace, στιγμιότυπα οθόνης και βίντεο."
---

Τα αρχεία της λειτουργίας trace — το zip του trace καθώς και το στιγμιότυπο οθόνης και το βίντεο κάθε test — επισυνάπτονται αυτόματα σε μια αναφορά Allure, ώστε να μπορείτε να τα ανοίξετε απευθείας από την αναφορά. Δείτε τη [Λειτουργία Trace](/docs/devtools/wdio/trace-mode) για το πώς να ενεργοποιήσετε τη λειτουργία trace και να παράγετε αυτά τα αρχεία.

Όταν υπάρχει reporter του Allure, τα αρχεία της λειτουργίας trace επισυνάπτονται αυτόματα στην αναφορά Allure — χωρίς επιπλέον ρυθμίσεις:

- **`traceGranularity: 'test'`** — το `trace.zip` κάθε test (`application/zip`, ένα αρχείο προς λήψη που ανοίγει στο `show-trace`), το `screenshot` (`image/png`, ενσωματωμένο) και το `video` (`video/webm`, ενσωματωμένο) επισυνάπτονται στην κάρτα του αντίστοιχου test. Αυτή είναι η διακριτότητα που πρέπει να χρησιμοποιήσετε για αναφορά Allure ανά test.
- **`traceGranularity: 'session'` / `'spec'`** — ένα trace που καλύπτει ολόκληρο το session/spec γράφεται στον δίσκο και καταγράφεται στο [manifest των αρχείων](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest), αλλά **δεν** επισυνάπτεται σε μεμονωμένες κάρτες test: ένα trace session/spec ολοκληρώνεται μόνο αφού εκτελεστούν όλα τα tests του, οπότε μέχρι τότε οι κάρτες Allure τους έχουν κλείσει και δεν υπάρχει ανοιχτό test στο οποίο να επισυναφθεί. Για να το εμφανίσετε παρ' όλα αυτά, επεξεργαστείτε το manifest στο δικό σας hook `onComplete`.

Υποστήριξη ανά adapter:

| Adapter | Μηχανισμός επισύναψης |
|---|---|
| **WebdriverIO** | Πλήρης υποστήριξη μέσω του `addAttachment` του `@wdio/allure-reporter`. |
| **Selenium** | Μέσω του `attachment()` του `allure-js-commons` — ανεξάρτητο από το runtime, επισυνάπτει κάτω από οποιονδήποτε runner adapter του Allure, υπό την προϋπόθεση ότι υπάρχει ενεργό runtime του `allure-js-commons`. |
| **Nightwatch** | **Μόνο παραγωγή** — τα αρχεία + το manifest γράφονται, αλλά δεν επισυνάπτονται ενσωματωμένα (δεν υπάρχει live API επισύναψης του Allure). |

**Ενσωματωμένος trace viewer.** Επειδή το αρχείο χρησιμοποιεί μια φορητή, τυποποιημένη μορφή αποθήκευσης trace-viewer, ο **ενσωματωμένος trace viewer** της ίδιας της αναφοράς Allure (Allure ≥ 2.35) μπορεί να ανοίξει το επισυναπτόμενο `trace.zip` απευθείας μέσα στην αναφορά.

**Θόρυβος στην αναφορά.** Στη λειτουργία trace, η καταγραφή εκτελεί ένα `takeScreenshot` ανά ενέργεια για να δημιουργήσει το χρονολόγιο· το Allure καταγράφει κάθε εντολή WebDriver ως βήμα και ένα στιγμιότυπο οθόνης ανά `takeScreenshot`. Περιορίστε αυτόν τον καταιγισμό με τις επιλογές του ίδιου του reporter — οι επισυνάψεις trace / στιγμιοτύπων οθόνης / βίντεο δεν επηρεάζονται:

```ts
reporters: [
  ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: true
  }]
]
```