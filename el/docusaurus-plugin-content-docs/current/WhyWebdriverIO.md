---
id: why-webdriverio
title: Γιατί WebdriverIO;
description: Τι διαφοροποιεί το WebdriverIO από άλλα εργαλεία αυτοματοποίησης δοκιμών - ένα API για κάθε πλατφόρμα, πρότυπα του web, ανοιχτή διακυβέρνηση και κορυφαία υποστήριξη για coding agents.
---

Το WebdriverIO είναι ένα framework αυτοματοποίησης δοκιμών ανοιχτού κώδικα για Node.js. Με έναν test runner και ένα API μπορείτε να αυτοματοποιήσετε προγράμματα περιήγησης, native και hybrid εφαρμογές για κινητά, εφαρμογές desktop και επεκτάσεις editor, και επιπλέον να προσθέσετε οπτικές δοκιμές, δοκιμές προσβασιμότητας και δοκιμές components. Διευθύνεται από την κοινότητά του υπό την αιγίδα του [OpenJS Foundation](https://openjsf.org/).

## Ένα framework για κάθε πλατφόρμα

Οι περισσότερες ομάδες παραδίδουν κάτι περισσότερο από έναν ιστότοπο. Το WebdriverIO σάς επιτρέπει να τα δοκιμάσετε όλα με τους ίδιους selectors, assertions, reporters και την ίδια ρύθμιση CI:

| Πλατφόρμα | Πώς το αυτοματοποιεί το WebdriverIO | Ξεκινήστε εδώ |
| --- | --- | --- |
| Προγράμματα περιήγησης | WebDriver και WebDriver BiDi σε Chrome, Firefox, Safari και Edge | [Web Browsers](/docs/platforms/web) |
| Web components | Δοκιμές components σε πραγματικό πρόγραμμα περιήγησης για React, Vue, Svelte, Solid, Preact, Lit και Stencil | [Component Testing](/docs/component-testing) |
| Εφαρμογές για κινητά | Native, hybrid και mobile web σε iOS και Android μέσω Appium, συμπεριλαμβανομένου του Flutter | [Mobile Apps](/docs/platforms/mobile) |
| Εφαρμογές desktop | Εφαρμογές Electron, Tauri και Dioxus σε macOS, Windows και Linux, native εφαρμογές macOS μέσω Appium | [Desktop Apps](/docs/platforms/desktop) |
| Editors και επεκτάσεις | Επεκτάσεις VS Code και επεκτάσεις προγραμμάτων περιήγησης | [Extensions & Editors](/docs/platforms/apps-and-extensions) |
| Οπτικές παλινδρομήσεις | Συγκρίσεις οθόνης, στοιχείων και ολόκληρης σελίδας για web και κινητά | [Visual Testing](/docs/visual-testing) |

Η ίδια δοκιμή μπορεί ακόμη και να χειρίζεται πολλά από αυτά ταυτόχρονα, π.χ. μια εφαρμογή για κινητά και ένα web dashboard σε ένα σενάριο, με το [multi-remote](/docs/multiremote).

## Βασισμένο σε πρότυπα του web

Το WebdriverIO αυτοματοποιεί τα προγράμματα περιήγησης μέσω του [WebDriver](https://w3c.github.io/webdriver/) και του [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/), των προτύπων του W3C που κάθε κατασκευαστής προγραμμάτων περιήγησης υλοποιεί και [δοκιμάζει](https://wpt.fyi/results/webdriver/tests). Οι δοκιμές σας εκτελούνται στις ίδιες εκδόσεις προγραμμάτων περιήγησης που έχουν οι χρήστες σας, και οι αλληλεπιδράσεις όπως τα κλικ και τα πατήματα πλήκτρων αποστέλλονται από το ίδιο το πρόγραμμα περιήγησης αντί να προσομοιώνονται με JavaScript. Το WebDriver BiDi προσθέτει network mocking, συμβάντα console και log και πολλά άλλα σε όλα τα προγράμματα περιήγησης, όχι μόνο στο Chromium.

Όταν χρειάζεστε δυνατότητες συγκεκριμένες για κάποιο πρόγραμμα περιήγησης, το WebdriverIO σάς δίνει πρόσβαση στο Chrome DevTools Protocol μέσω του [Puppeteer](/docs/api/browser/getPuppeteer). Διαβάστε περισσότερα στα [Automation Protocols](/docs/automationProtocols).

## Καθοδηγούμενο από την κοινότητα με ανοιχτή διακυβέρνηση

Το WebdriverIO δεν είναι προϊόν κάποιου προμηθευτή εργαλείων δοκιμών. Το έργο:

- ανήκει στο [OpenJS Foundation](https://openjsf.org/), έναν ουδέτερο ως προς τους προμηθευτές μη κερδοσκοπικό οργανισμό, ο οποίος το δεσμεύει νομικά να εξυπηρετεί τα συμφέροντα όλων των χρηστών του
- ακολουθεί ένα δημόσιο [μοντέλο διακυβέρνησης](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md): οποιοσδήποτε μπορεί να συνεισφέρει, και οι committers και η Technical Steering Committee προέρχονται από την κοινότητα
- δεν έχει επί πληρωμή εκδόσεις ούτε κλειδωμένες λειτουργίες· κάθε λειτουργία είναι δωρεάν και μπορείτε να εκτελείτε τις δοκιμές σας οπουδήποτε, τοπικά ή σε οποιονδήποτε πάροχο cloud
- διοχετεύει τις χορηγίες πίσω στους ανθρώπους που το αναπτύσσουν μέσω ενός [προγράμματος υποτροφιών για συνεισφέροντες](/blog/2024/02/15/new-contributor-stipend-program)
- προσφέρει δωρεάν υποστήριξη από την κοινότητα στο [Discord](https://discord.webdriver.io) και στο [GitHub Discussions](https://github.com/webdriverio/webdriverio/discussions)

## Έτοιμο για coding agents

Η τεκμηρίωση, τα εργαλεία και τα αποτελέσματα των δοκιμών έχουν σχεδιαστεί έτσι ώστε οι coding agents να μπορούν να δουλεύουν με το WebdriverIO αυτόνομα:

- **Τεκμηρίωση έτοιμη για agents**: κάθε σελίδα είναι διαθέσιμη σε Markdown, υπάρχει ένα επιμελημένο [`llms.txt`](https://webdriver.io/llms.txt) και ένας MCP server τεκμηρίωσης στο `https://webdriver.io/mcp`.
- **WebdriverIO MCP**: ο server [`@wdio/mcp`](/docs/mcp) επιτρέπει σε έναν agent να χειρίζεται προγράμματα περιήγησης και εφαρμογές για κινητά, ώστε να εξερευνά το UI σας και να επαληθεύει selectors.
- **Traces**: η [λειτουργία trace του DevTools](/docs/devtools/wdio/trace-mode) καταγράφει ένα απομαγνητοφωνημένο αρχείο σε Markdown, στιγμιότυπα οθόνης και στιγμιότυπα προσβασιμότητας για κάθε αποτυχημένη δοκιμή.

Δείτε το [WebdriverIO for Coding Agents](/docs/ai-agents) για τη ρύθμιση.

## Όλα όσα χρειάζεστε, εύκολα επεκτάσιμο

- Ένας [test runner](/docs/testrunner) με υποστήριξη για Mocha, Jasmine και Cucumber, παράλληλη εκτέλεση, [sharding](/docs/sharding), [επαναλήψεις](/docs/retry) και [watch mode](/docs/watcher)
- [Αυτόματη αναμονή](/docs/autowait) για κάθε αλληλεπίδραση και ενσωματωμένη [βιβλιοθήκη assertions](/docs/assertion)
- [Network mocking](/docs/mocksandspies), [εξομοίωση](/docs/emulation) και [snapshot testing](/docs/snapshot)
- Ένα [dashboard αποσφαλμάτωσης και trace viewer](/docs/devtools)
- [70+ services και reporters](/docs/ecosystem) για clouds, frameworks και CI, καθώς και απλά APIs για να γράψετε τα δικά σας [commands](/docs/customcommands), [services](/docs/customservices) και [reporters](/docs/customreporter)

## Πότε να επιλέξετε κάτι άλλο

Το WebdriverIO είναι κατάλληλη επιλογή όταν δοκιμάζετε περισσότερες από μία πλατφόρμες, θέλετε να εκτελείτε δοκιμές σε πραγματικά προγράμματα περιήγησης και συσκευές ή εκτιμάτε ένα ανεξάρτητο εργαλείο που ανήκει στην κοινότητα. Αν δοκιμάζετε πάντα μόνο μία web εφαρμογή σε ένα μόνο πρόγραμμα περιήγησης και δεν χρειάζεστε κινητά, desktop ή συσκευές cloud, ένα εργαλείο μόνο για προγράμματα περιήγησης μπορεί να φαίνεται πιο ελαφρύ για να ξεκινήσετε. Αν δεν είστε σίγουροι, [δημιουργήστε ένα έργο](/docs/gettingstarted) με `npm init wdio@latest` και δοκιμάστε το: η ρύθμιση διαρκεί περίπου ένα λεπτό.

## Επόμενα βήματα

- [Getting Started](/docs/gettingstarted) - δημιουργήστε ένα έργο και εκτελέστε την πρώτη σας δοκιμή
- [Setup Types](/docs/setuptypes) - test runner ή standalone mode
- [WebdriverIO for Coding Agents](/docs/ai-agents) - ρυθμίστε τον agent σας