---
id: autocompletion
title: Αυτόματη συμπλήρωση
description: "Αποκτήστε αυτόματη συμπλήρωση και ενσωματωμένη τεκμηρίωση API για τις εντολές του WebdriverIO στο IntelliJ, το WebStorm και το Visual Studio Code."
---

## IntelliJ

Η αυτόματη συμπλήρωση λειτουργεί απευθείας, χωρίς επιπλέον ρυθμίσεις, στο IDEA και στο WebStorm.

Αν γράφετε κώδικα εδώ και αρκετό καιρό, πιθανότατα σας αρέσει η αυτόματη συμπλήρωση. Η αυτόματη συμπλήρωση είναι διαθέσιμη απευθείας σε πολλούς επεξεργαστές κώδικα.

![Autocompletion](/img/autocompletion/0.png)

Για την τεκμηρίωση του κώδικα χρησιμοποιούνται ορισμοί τύπων βασισμένοι στο [JSDoc](http://usejsdoc.org/). Αυτό σας βοηθά να βλέπετε περισσότερες λεπτομέρειες για τις παραμέτρους και τους τύπους τους.

![Autocompletion](/img/autocompletion/1.png)

Χρησιμοποιήστε τις τυπικές συντομεύσεις <kbd>⇧ + ⌥ + SPACE</kbd> στην πλατφόρμα IntelliJ για να δείτε τη διαθέσιμη τεκμηρίωση:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Το Visual Studio Code συνήθως έχει ενσωματωμένη αυτόματα την υποστήριξη τύπων και δεν απαιτείται καμία ενέργεια.

![Autocompletion](/img/autocompletion/14.png)

Αν χρησιμοποιείτε απλή (vanilla) JavaScript και θέλετε σωστή υποστήριξη τύπων, πρέπει να δημιουργήσετε ένα `jsconfig.json` στον ριζικό φάκελο του έργου σας και να αναφέρετε τα πακέτα wdio που χρησιμοποιείτε, π.χ.:

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