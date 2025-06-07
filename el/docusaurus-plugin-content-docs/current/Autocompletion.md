---
id: autocompletion
title: Αυτόματη συμπλήρωση
---

## IntelliJ

Η αυτόματη συμπλήρωση λειτουργεί εξ ορισμού στο IDEA και το WebStorm.

Αν γράφετε κώδικα προγραμματισμού για αρκετό καιρό, πιθανώς σας αρέσει η αυτόματη συμπλήρωση. Η αυτόματη συμπλήρωση είναι διαθέσιμη εξ ορισμού σε πολλούς επεξεργαστές κώδικα.

![Autocompletion](/img/autocompletion/0.png)

Ορισμοί τύπων βασισμένοι στο [JSDoc](http://usejsdoc.org/) χρησιμοποιούνται για την τεκμηρίωση του κώδικα. Βοηθά στην προβολή περισσότερων πρόσθετων λεπτομερειών σχετικά με τις παραμέτρους και τους τύπους τους.

![Autocompletion](/img/autocompletion/1.png)

Χρησιμοποιήστε τυπικές συντομεύσεις <kbd>⇧ + ⌥ + SPACE</kbd> στην πλατφόρμα IntelliJ για να δείτε τη διαθέσιμη τεκμηρίωση:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Το Visual Studio Code συνήθως έχει ενσωματωμένη αυτόματα την υποστήριξη τύπων και δεν απαιτείται καμία ενέργεια.

![Autocompletion](/img/autocompletion/14.png)

Εάν χρησιμοποιείτε vanilla JavaScript και θέλετε να έχετε σωστή υποστήριξη τύπων, πρέπει να δημιουργήσετε ένα `jsconfig.json` στη ρίζα του έργου σας και να αναφερθείτε στα χρησιμοποιούμενα πακέτα wdio, π.χ.:

```json title="jsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework"
        ]
    }
}
```