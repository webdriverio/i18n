---
id: cross-framework
title: Υποστήριξη πολλαπλών frameworks
description: "Συγκρίνετε πόσο πλήρως η λειτουργία trace του DevTools καταγράφει εκτελέσεις WebdriverIO, Selenium και Nightwatch, και ποια κενά έχει κάθε adapter."
---

Η μορφή του trace και ο player `show-trace` είναι πανομοιότυπα σε WebdriverIO / Selenium / Nightwatch· αυτή η σελίδα δείχνει πού διαφέρει η πληρότητα της καταγραφής. Για την πλήρη αναφορά της λειτουργίας trace, δείτε το [Trace Mode](/docs/devtools/wdio/trace-mode).

Οι μετασχηματισμοί που δημιουργούν ένα trace βρίσκονται στο [`@wdio/devtools-trace`](https://github.com/webdriverio/devtools/tree/main/packages/trace), ένα επίπεδο κάτω από τους adapters, επομένως **η μορφή του trace και ο player `show-trace` είναι πανομοιότυπα για κάθε adapter** — το ίδιο `.zip` (ή κατάλογος) ανοίγει στον ίδιο player ανεξάρτητα από το ποιος το παρήγαγε. Οι τρεις adapters παρακάτω μοιράζονται επιπλέον τις βασικές επιλογές (`mode`, `traceGranularity`, `tracePolicy`, `traceFormat`, `filmstrip`, `emitArtifactsManifest`, `captureAssertions`).

**Η πληρότητα της καταγραφής διαφέρει ανά adapter**, ωστόσο — το WebdriverIO είναι το πιο πλήρες· τα Selenium και Nightwatch καλύπτουν τη βασική ροή με τα κενά που σημειώνονται παρακάτω. Η σύνταξη ενεργοποίησης που αφορά κάθε framework βρίσκεται στη σελίδα του αντίστοιχου adapter — δείτε [Selenium](/docs/devtools/selenium#trace-mode) και [Nightwatch](/docs/devtools/nightwatch#trace-mode).

Ο adapter της Python (δείτε τις καρτέλες **Python** στη σελίδα [Selenium](/docs/devtools/selenium)) γράφει το ίδιο αρχείο και ανοίγει στον ίδιο player, αλλά δεν περιλαμβάνεται σε αυτόν τον πίνακα: δεν εκτελεί JavaScript στη διεργασία του test, οπότε το backend δημιουργεί το trace από τη ροή που καταγράφηκε, αντί να το δημιουργεί ο adapter εντός της διεργασίας. Η κοκκομέρεια (granularity) και η διατήρηση (retention) έχουν ισοδύναμα στην Python — `--devtools-trace-granularity session|test` και `--devtools-trace-policy`, με τις τιμές του τελευταίου που λαμβάνουν υπόψη τις επαναλήψεις να υποβαθμίζονται σε `retain-on-failure`, επειδή τίποτα σε αυτό το κανάλι δεν μεταφέρει αριθμό προσπάθειας. Οι γραμμές χωρίς ισοδύναμο στην Python είναι αυτές που αφορούν artifacts ανά test: `screenshot`, `video` και inline επισύναψη στο Allure. Το τι καταγράφει - DOM time-travel, το πυκνό filmstrip, το δέντρο A11y και το overlay στοιχείων, εντολές, console, δίκτυο, assertions, χειριστήρια εκτέλεσης και Preserve & Rerun - περιγράφεται στη δική του σελίδα.

| Δυνατότητα | WebdriverIO | Selenium | Nightwatch |
|---|---|---|---|
| Λειτουργία trace + player `show-trace` | ✅ | ✅ | ✅ |
| DOM time-travel (καταγραφή μεταλλάξεων) | ✅ | ✅ ¹ | ✅ |
| Καρτέλα A11y + overlay επιλογής locator (trace player) | ✅ | ✅ | ✅ |
| Transcript + Copy-for-LLM | ✅ | ✅ | ✅ |
| `screenshot` / `video` ανά test | ✅ inline Allure | ✅ inline Allure | ⚠️ μόνο παραγωγή ² |
| Αυτόματη ανίχνευση `emitArtifactsManifest` | ✅ | ✅ | ⚠️ μόνο με ρητή ενεργοποίηση |
| `tracePolicy` με επίγνωση επαναλήψεων | ✅ | ✅ | ⚠️ μόνο `retain-on-failure` ³ |
| `traceGranularity: 'test'` | ✅ | ✅ | ⚠️ Cucumber / exports-object· το BDD `describe/it` συμπτύσσεται σε ένα τμήμα session |
| Ένθεση Cucumber Feature→Scenario→Step | Scenario→Step ⁴ | ✅ πλήρης | Feature→Scenario ⁵ |
| Καταγραφή BiDi (console / δίκτυο / εξαιρέσεις) | ✅ αυτόματα | ✅ αυτόματα | ⚠️ με ρητή ενεργοποίηση (`bidi: true` + `webSocketUrl`) |
| Screencast (filmstrip / video) | CDP push | CDP push | μόνο polling |
| Καρτέλα A11y + overlay στο live dashboard | ✅ | μόνο στον trace player | μόνο στον trace player |

¹ Το Selenium ανακατασκευάζει το DOM ανά πλοήγηση· ο χρονισμός αγκύρωσης είναι κατά προσέγγιση (το snapshot μιας πλοήγησης μπορεί να καθυστερεί σε σχέση με την εντολή που την προκάλεσε).
² Το Nightwatch δεν διαθέτει live API επισύναψης στο Allure, επομένως τα artifacts ανά test γράφονται στον κατάλογο εξόδου του trace και καταγράφονται στο manifest, αλλά δεν επισυνάπτονται σε κάποιο test του Allure.
³ Το `--retries` του Nightwatch επανεκτελεί ένα test εσωτερικά χωρίς να ενεργοποιεί ξανά τα hooks ανά test του plugin, επομένως οι πολιτικές με επίγνωση επαναλήψεων (`on-first-retry`, `retain-on-first-failure`, …) υποβαθμίζονται σε `retain-on-failure`.
⁴ Το WebdriverIO δεν μεταφέρει ακόμη την ιεραρχία σε επίπεδο feature, επομένως η ένθεση Cucumber είναι Scenario→Step.
⁵ Το Nightwatch δεν σημαίνει ακόμη ένθεση ανά step (μόνο Feature→Scenario).