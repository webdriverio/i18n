---
id: browserstack
title: Έλεγχος Προσβασιμότητας BrowserStack
description: "Προσθέστε αυτοματοποιημένους ελέγχους προσβασιμότητας στα τεστ WebdriverIO που εκτελούνται στο BrowserStack Automate και εξετάστε τα προβλήματα που εντοπίστηκαν στις αναφορές του BrowserStack."
---

# Έλεγχος Προσβασιμότητας BrowserStack

Μπορείτε εύκολα να ενσωματώσετε τεστ προσβασιμότητας στις σουίτες τεστ WebdriverIO χρησιμοποιώντας τη [λειτουργία Αυτοματοποιημένων τεστ του BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

## Πλεονεκτήματα των Αυτοματοποιημένων Τεστ στο BrowserStack Accessibility Testing

Για να χρησιμοποιήσετε τα Αυτοματοποιημένα τεστ στο BrowserStack Accessibility Testing, τα τεστ σας θα πρέπει να εκτελούνται στο BrowserStack Automate.

Τα πλεονεκτήματα των Αυτοματοποιημένων τεστ είναι τα εξής:

* Ενσωματώνονται απρόσκοπτα στην υπάρχουσα σουίτα αυτοματοποιημένων τεστ σας.
* Δεν απαιτούνται αλλαγές κώδικα στις περιπτώσεις τεστ.
* Δεν απαιτείται καμία επιπλέον συντήρηση για τον έλεγχο προσβασιμότητας.
* Κατανοήστε τις ιστορικές τάσεις και αποκτήστε πληροφορίες για τις περιπτώσεις τεστ.

## Ξεκινήστε με το BrowserStack Accessibility Testing

Ακολουθήστε αυτά τα βήματα για να ενσωματώσετε τις σουίτες τεστ WebdriverIO με το Accessibility Testing του BrowserStack:

1. Εγκαταστήστε το npm πακέτο `@wdio/browserstack-service`.

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. Ενημερώστε το αρχείο ρυθμίσεων `wdio.conf.js`.

```javascript
exports.config = {
    //...
    user: '<browserstack_username>' || process.env.BROWSERSTACK_USERNAME,
    key: '<browserstack_access_key>' || process.env.BROWSERSTACK_ACCESS_KEY,
    commonCapabilities: {
      'bstack:options': {
        projectName: "Your static project name goes here",
        buildName: "Your static build/job name goes here"
      }
    },
    services: [
      ['browserstack', {
        accessibility: true,
        // Προαιρετικές επιλογές ρυθμίσεων
        accessibilityOptions: {
          'wcagVersion': 'wcag21a',
          'includeIssueType': {
            'bestPractice': false,
            'needsReview': true
          },
          'includeTagsInTestingScope': ['Specify tags of test cases to be included'],
          'excludeTagsInTestingScope': ['Specify tags of test cases to be excluded']
        },
      }]
    ],
    //...
  };
```

Μπορείτε να δείτε λεπτομερείς οδηγίες [εδώ](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).