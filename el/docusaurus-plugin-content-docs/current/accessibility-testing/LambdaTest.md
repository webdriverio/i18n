---
id: testmuai
title: Δοκιμές Προσβασιμότητας TestMu AI (Πρώην LambdaTest)
---

# TestMu AI Accessibility Testing

Μπορείτε εύκολα να ενσωματώσετε δοκιμές προσβασιμότητας στις σουίτες δοκιμών WebdriverIO σας χρησιμοποιώντας το [TestMu AI Accessibility Testing](https://www.testmuai.com/support/docs/accessibility-automation-settings/).

## Πλεονεκτήματα του TestMu AI Accessibility Testing

Το TestMu AI Accessibility Testing σας βοηθάει να εντοπίσετε και να διορθώσετε προβλήματα προσβασιμότητας στις διαδικτυακές εφαρμογές σας. Τα ακόλουθα είναι τα βασικά πλεονεκτήματα:

* Ενσωματώνεται απρόσκοπτα με τον υπάρχοντα αυτοματισμό δοκιμών WebdriverIO.
* Αυτοματοποιημένη σάρωση προσβασιμότητας κατά την εκτέλεση των δοκιμών.
* Ολοκληρωμένη αναφορά συμμόρφωσης με WCAG.
* Λεπτομερής παρακολούθηση προβλημάτων με οδηγίες αποκατάστασης.
* Υποστήριξη για πολλαπλά πρότυπα WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Πληροφορίες προσβασιμότητας σε πραγματικό χρόνο στον πίνακα ελέγχου του TestMu AI.

## Ξεκινήστε με το TestMu AI Accessibility Testing

Ακολουθήστε αυτά τα βήματα για να ενσωματώσετε τις σουίτες δοκιμών WebdriverIO σας με το Accessibility Testing του TestMu AI:

1. Εγκαταστήστε το πακέτο υπηρεσίας TestMu AI WebdriverIO.

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
            accessibility: true, // Enable accessibility testing
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // WCAG version (wcag20, wcag21a, wcag21aa, wcag22aa)
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

3. Εκτελέστε τις δοκιμές σας ως συνήθως. Το TestMu AI θα σαρώσει αυτόματα για προβλήματα προσβασιμότητας κατά την εκτέλεση των δοκιμών.

```bash
npx wdio run wdio.conf.js
```

## Επιλογές Διαμόρφωσης

Το αντικείμενο `accessibilityOptions` υποστηρίζει τις ακόλουθες παραμέτρους:

* **wcagVersion**: Καθορίστε την έκδοση του προτύπου WCAG για τον έλεγχο
  - `wcag20` - WCAG 2.0 Επίπεδο A
  - `wcag21a` - WCAG 2.1 Επίπεδο A
  - `wcag21aa` - WCAG 2.1 Επίπεδο AA (προεπιλογή)
  - `wcag22aa` - WCAG 2.2 Επίπεδο AA

* **bestPractice**: Συμπεριλάβετε συστάσεις βέλτιστων πρακτικών (προεπιλογή: `false`)

* **needsReview**: Συμπεριλάβετε ζητήματα που χρειάζονται χειροκίνητη αναθεώρηση (προεπιλογή: `true`)

## Προβολή Αναφορών Προσβασιμότητας

Μετά την ολοκλήρωση των δοκιμών σας, μπορείτε να δείτε λεπτομερείς αναφορές προσβασιμότητας στον [Πίνακα Ελέγχου TestMu AI](https://automation.lambdatest.com/):

1. Πλοηγηθείτε στην εκτέλεση της δοκιμής σας
2. Κάντε κλικ στην καρτέλα "Accessibility"
3. Εξετάστε τα προβλήματα που εντοπίστηκαν με επίπεδα σοβαρότητας
4. Λάβετε οδηγίες αποκατάστασης για κάθε ζήτημα

Για πιο λεπτομερείς πληροφορίες, επισκεφθείτε την [τεκμηρίωση Accessibility Automation του TestMu AI](https://www.testmuai.com/support/docs/accessibility-automation-settings/).