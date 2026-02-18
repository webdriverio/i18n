---
id: multi-framework-support
title: Υποστήριξη Πολλαπλών Frameworks
---

Το DevTools λειτουργεί αυτόματα με τα Mocha, Jasmine και Cucumber χωρίς να απαιτείται καμία ειδική ρύθμιση για συγκεκριμένο framework. Απλά προσθέστε την υπηρεσία στη ρύθμιση WebDriverIO και όλες οι λειτουργίες θα δουλεύουν απρόσκοπτα ανεξάρτητα από το ποιο framework δοκιμών χρησιμοποιείτε.

**Υποστηριζόμενα Frameworks:**
- **Mocha** - Εκτέλεση σε επίπεδο δοκιμής και σουίτας με φιλτράρισμα grep
- **Jasmine** - Πλήρης ενσωμάτωση με φιλτράρισμα βασισμένο σε grep
- **Cucumber** - Εκτέλεση σε επίπεδο σεναρίου και παραδείγματος με στόχευση feature:line

Η ίδια διεπαφή αποσφαλμάτωσης, επανεκτέλεση δοκιμών και λειτουργίες οπτικοποίησης λειτουργούν με συνέπεια σε όλα τα frameworks.

## Configuration

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // or 'jasmine' or 'cucumber'
    services: ['devtools'],
    // ...
};
```