---
id: browserstack
title: Δοκιμές Προσβασιμότητας BrowserStack
---

# Δοκιμές Προσβασιμότητας BrowserStack

Μπορείτε εύκολα να ενσωματώσετε δοκιμές προσβασιμότητας στις σουίτες δοκιμών WebdriverIO χρησιμοποιώντας το [Χαρακτηριστικό Αυτοματοποιημένων δοκιμών του BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

## Πλεονεκτήματα των Αυτοματοποιημένων Δοκιμών στο BrowserStack Accessibility Testing

Για να χρησιμοποιήσετε τις Αυτοματοποιημένες δοκιμές στο BrowserStack Accessibility Testing, οι δοκιμές σας πρέπει να εκτελούνται στο BrowserStack Automate.

Τα ακόλουθα είναι τα πλεονεκτήματα των Αυτοματοποιημένων δοκιμών:

* Ενσωματώνεται απρόσκοπτα στην προϋπάρχουσα σουίτα αυτοματοποιημένων δοκιμών σας.
* Δεν απαιτούνται αλλαγές κώδικα στις περιπτώσεις δοκιμών.
* Απαιτεί μηδενική πρόσθετη συντήρηση για δοκιμές προσβασιμότητας.
* Κατανοήστε τις ιστορικές τάσεις και αποκτήστε πληροφορίες για τις περιπτώσεις δοκιμών.

## Ξεκινήστε με το BrowserStack Accessibility Testing

Ακολουθήστε αυτά τα βήματα για να ενσωματώσετε τις σουίτες δοκιμών WebdriverIO με το Accessibility Testing του BrowserStack:

1. Εγκαταστήστε το πακέτο npm `@wdio/browserstack-service`.

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. Ενημερώστε το αρχείο διαμόρφωσης `wdio.conf.js`.

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
        // Optional configuration options
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

Μπορείτε να δείτε αναλυτικές οδηγίες [εδώ](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).