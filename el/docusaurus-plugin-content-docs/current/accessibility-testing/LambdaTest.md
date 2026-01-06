---
id: lambdatest
title: Δοκιμές Προσβασιμότητας LambdaTest
---

# Δοκιμές Προσβασιμότητας LambdaTest

Μπορείτε εύκολα να ενσωματώσετε δοκιμές προσβασιμότητας στις σουίτες δοκιμών WebdriverIO σας χρησιμοποιώντας το [LambdaTest Accessibility Testing](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).

## Πλεονεκτήματα των Δοκιμών Προσβασιμότητας LambdaTest

Οι Δοκιμές Προσβασιμότητας LambdaTest σας βοηθούν να εντοπίσετε και να διορθώσετε προβλήματα προσβασιμότητας στις διαδικτυακές εφαρμογές σας. Τα παρακάτω είναι τα βασικά πλεονεκτήματα:

* Ενσωματώνεται απρόσκοπτα με τον υπάρχοντα αυτοματισμό δοκιμών WebdriverIO.
* Αυτοματοποιημένη σάρωση προσβασιμότητας κατά την εκτέλεση των δοκιμών.
* Ολοκληρωμένη αναφορά συμμόρφωσης WCAG.
* Λεπτομερής παρακολούθηση προβλημάτων με καθοδήγηση αποκατάστασης.
* Υποστήριξη για πολλαπλά πρότυπα WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Πληροφορίες προσβασιμότητας σε πραγματικό χρόνο στον πίνακα ελέγχου του LambdaTest.

## Ξεκινήστε με τις Δοκιμές Προσβασιμότητας LambdaTest

Ακολουθήστε αυτά τα βήματα για να ενσωματώσετε τις σουίτες δοκιμών WebdriverIO σας με τις Δοκιμές Προσβασιμότητας του LambdaTest:

1. Εγκαταστήστε το πακέτο υπηρεσίας LambdaTest WebdriverIO.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. Ενημερώστε το αρχείο ρύθμισης `wdio.conf.js`.

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

3. Εκτελέστε τις δοκιμές σας όπως συνήθως. Το LambdaTest θα σαρώσει αυτόματα για προβλήματα προσβασιμότητας κατά την εκτέλεση των δοκιμών.

```bash
npx wdio run wdio.conf.js
```

## Επιλογές Διαμόρφωσης

Το αντικείμενο `accessibilityOptions` υποστηρίζει τις ακόλουθες παραμέτρους:

* **wcagVersion**: Καθορίστε την έκδοση προτύπου WCAG για έλεγχο
  - `wcag20` - WCAG 2.0 Επίπεδο Α
  - `wcag21a` - WCAG 2.1 Επίπεδο Α
  - `wcag21aa` - WCAG 2.1 Επίπεδο ΑΑ (προεπιλογή)
  - `wcag22aa` - WCAG 2.2 Επίπεδο ΑΑ

* **bestPractice**: Συμπερίληψη συστάσεων βέλτιστης πρακτικής (προεπιλογή: `false`)

* **needsReview**: Συμπερίληψη ζητημάτων που χρειάζονται χειροκίνητη αξιολόγηση (προεπιλογή: `true`)

## Προβολή Αναφορών Προσβασιμότητας

Μετά την ολοκλήρωση των δοκιμών σας, μπορείτε να δείτε λεπτομερείς αναφορές προσβασιμότητας στον [Πίνακα Ελέγχου LambdaTest](https://automation.lambdatest.com/):

1. Πλοηγηθείτε στην εκτέλεση της δοκιμής σας
2. Κάντε κλικ στην καρτέλα "Accessibility"
3. Επιθεωρήστε τα αναγνωρισμένα προβλήματα με επίπεδα σοβαρότητας
4. Λάβετε καθοδήγηση αποκατάστασης για κάθε ζήτημα

Για πιο λεπτομερείς πληροφορίες, επισκεφτείτε την [τεκμηρίωση Αυτοματισμού Προσβασιμότητας LambdaTest](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).