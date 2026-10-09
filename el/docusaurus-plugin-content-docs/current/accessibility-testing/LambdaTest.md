---
id: testmuai
title: Έλεγχος Προσβασιμότητας TestMu AI (Πρώην LambdaTest)
description: "Ενεργοποιήστε τον έλεγχο προσβασιμότητας του TestMu AI (πρώην LambdaTest) στη σουίτα WebdriverIO σας, διαμορφώστε τις επιλογές σάρωσης και δείτε τις αναφορές προσβασιμότητας."
---

# Έλεγχος Προσβασιμότητας TestMu AI

Μπορείτε εύκολα να ενσωματώσετε ελέγχους προσβασιμότητας στις σουίτες δοκιμών WebdriverIO σας χρησιμοποιώντας το [TestMu AI Accessibility Testing](https://www.testmuai.com/support/docs/accessibility-automation-settings/).

## Πλεονεκτήματα του Ελέγχου Προσβασιμότητας TestMu AI

Ο Έλεγχος Προσβασιμότητας TestMu AI σάς βοηθά να εντοπίσετε και να διορθώσετε ζητήματα προσβασιμότητας στις διαδικτυακές σας εφαρμογές. Τα βασικά πλεονεκτήματα είναι τα εξής:

* Ενσωματώνεται απρόσκοπτα με τον υπάρχοντα αυτοματισμό δοκιμών WebdriverIO.
* Αυτοματοποιημένη σάρωση προσβασιμότητας κατά την εκτέλεση των δοκιμών.
* Ολοκληρωμένες αναφορές συμμόρφωσης με τα WCAG.
* Λεπτομερής παρακολούθηση ζητημάτων με οδηγίες αποκατάστασης.
* Υποστήριξη για πολλαπλά πρότυπα WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Πληροφορίες προσβασιμότητας σε πραγματικό χρόνο στον πίνακα ελέγχου του TestMu AI.

## Ξεκινήστε με τον Έλεγχο Προσβασιμότητας TestMu AI

Ακολουθήστε τα παρακάτω βήματα για να ενσωματώσετε τις σουίτες δοκιμών WebdriverIO σας με τον Έλεγχο Προσβασιμότητας του TestMu AI:

1. Εγκαταστήστε το πακέτο υπηρεσίας WebdriverIO του TestMu AI.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. Ενημερώστε το αρχείο διαμόρφωσης `wdio.conf.js`.

```javascript
exports.config = {
    //...
    user: process.env.LT_USERNAME || '<lambdatest_username>',
    key: process.env.LT_ACCESS_KEY || '<lambdatest_access_key>',

    capabilities: [{
        browserName: 'chrome',
        'LT:Options': {
            platform: 'Windows 10',
            version: 'latest',
            accessibility: true, // Ενεργοποίηση ελέγχου προσβασιμότητας
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // Έκδοση WCAG (wcag20, wcag21a, wcag21aa, wcag22aa)
                bestPractice: false,
                needsReview: true
            }
        }
    }],

    services: [
        ['lambdatest', {
            tunnel: false
        }]
    ],
    //...
};
```

3. Εκτελέστε τις δοκιμές σας κανονικά. Το TestMu AI θα σαρώσει αυτόματα για ζητήματα προσβασιμότητας κατά την εκτέλεση των δοκιμών.

```bash
npx wdio run wdio.conf.js
```

## Επιλογές Διαμόρφωσης

Το αντικείμενο `accessibilityOptions` υποστηρίζει τις ακόλουθες παραμέτρους:

* **wcagVersion**: Καθορίστε την έκδοση του προτύπου WCAG έναντι της οποίας θα γίνει ο έλεγχος
  - `wcag20` - WCAG 2.0 Επίπεδο A
  - `wcag21a` - WCAG 2.1 Επίπεδο A
  - `wcag21aa` - WCAG 2.1 Επίπεδο AA (προεπιλογή)
  - `wcag22aa` - WCAG 2.2 Επίπεδο AA

* **bestPractice**: Συμπερίληψη συστάσεων βέλτιστων πρακτικών (προεπιλογή: `false`)

* **needsReview**: Συμπερίληψη ζητημάτων που απαιτούν χειροκίνητη αξιολόγηση (προεπιλογή: `true`)

## Προβολή Αναφορών Προσβασιμότητας

Αφού ολοκληρωθούν οι δοκιμές σας, μπορείτε να δείτε λεπτομερείς αναφορές προσβασιμότητας στον [Πίνακα Ελέγχου TestMu AI](https://automation.lambdatest.com/):

1. Μεταβείτε στην εκτέλεση της δοκιμής σας
2. Κάντε κλικ στην καρτέλα "Accessibility"
3. Εξετάστε τα ζητήματα που εντοπίστηκαν μαζί με τα επίπεδα σοβαρότητάς τους
4. Λάβετε οδηγίες αποκατάστασης για κάθε ζήτημα

Για περισσότερες λεπτομερείς πληροφορίες, επισκεφθείτε την [τεκμηρίωση TestMu AI Accessibility Automation](https://www.testmuai.com/support/docs/accessibility-automation-settings/).