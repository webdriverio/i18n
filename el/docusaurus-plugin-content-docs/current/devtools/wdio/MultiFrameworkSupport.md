---
id: multi-framework-support
title: Υποστήριξη Πολλαπλών Frameworks
description: "Χρησιμοποιήστε την υπηρεσία DevTools με Mocha, Jasmine ή Cucumber χωρίς ρυθμίσεις ειδικές για κάθε framework."
---

Το DevTools λειτουργεί αυτόματα με Mocha, Jasmine και Cucumber χωρίς να απαιτεί ρυθμίσεις ειδικές για κάθε framework. Απλώς προσθέστε την υπηρεσία στη διαμόρφωση του WebDriverIO και όλες οι λειτουργίες θα δουλεύουν απρόσκοπτα, ανεξάρτητα από το test framework που χρησιμοποιείτε.

**Υποστηριζόμενα Frameworks:**
- **Mocha** - Εκτέλεση σε επίπεδο test και suite με φιλτράρισμα grep
- **Jasmine** - Πλήρης ενσωμάτωση με φιλτράρισμα βασισμένο σε grep
- **Cucumber** - Εκτέλεση σε επίπεδο scenario και example με στόχευση feature:line

Η ίδια διεπαφή αποσφαλμάτωσης, η επανεκτέλεση tests και οι λειτουργίες οπτικοποίησης λειτουργούν με συνέπεια σε όλα τα frameworks.

## Διαμόρφωση

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // ή 'jasmine' ή 'cucumber'
    services: ['devtools'],
    // ...
};
```