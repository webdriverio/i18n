---
id: setuptypes
title: Τύποι Εγκατάστασης
description: "Συγκρίνετε τους τρόπους χρήσης του WebdriverIO, από τα raw protocol bindings έως τη λειτουργία standalone και το WDIO testrunner, και επιλέξτε τον κατάλληλο."
---

Το WebdriverIO μπορεί να χρησιμοποιηθεί για διάφορους σκοπούς. Υλοποιεί το API του πρωτοκόλλου WebDriver και μπορεί να εκτελέσει έναν browser με αυτοματοποιημένο τρόπο. Το framework έχει σχεδιαστεί για να λειτουργεί σε οποιοδήποτε περιβάλλον και για κάθε είδους εργασία. Είναι ανεξάρτητο από οποιαδήποτε frameworks τρίτων και απαιτεί μόνο το Node.js για να εκτελεστεί.

## Protocol Bindings

Για βασικές αλληλεπιδράσεις με το πρωτόκολλο WebDriver, το WebdriverIO χρησιμοποιεί τα δικά του protocol bindings που βασίζονται στο NPM package [`webdriver`](https://www.npmjs.com/package/webdriver):

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

Όλες οι [εντολές πρωτοκόλλου](api/webdriver) επιστρέφουν την ακατέργαστη απόκριση από τον driver αυτοματοποίησης. Το package είναι πολύ ελαφρύ και __δεν__ υπάρχει έξυπνη λογική, όπως αυτόματες αναμονές (auto-waits), για την απλοποίηση της αλληλεπίδρασης με τη χρήση του πρωτοκόλλου.

Οι εντολές πρωτοκόλλου που εφαρμόζονται στο instance εξαρτώνται από την αρχική απόκριση session του driver. Για παράδειγμα, εάν η απόκριση υποδεικνύει ότι ξεκίνησε ένα mobile session, το package εφαρμόζει τις εντολές Appium στο prototype του instance.

Για περισσότερες πληροφορίες σχετικά με το interface του package `webdriver`, ανατρέξτε στο [Modules API](/docs/api/modules).

Το [WebdriverIO DevTools](/docs/devtools) δεν είναι πρωτόκολλο αυτοματοποίησης. Είναι το περιβάλλον εντοπισμού σφαλμάτων (debugging UI) για την παρακολούθηση μιας εκτέλεσης σε πραγματικό χρόνο και την αναπαραγωγή των traces στη συνέχεια.

## Λειτουργία Standalone

Για να απλοποιήσει την αλληλεπίδραση με το πρωτόκολλο WebDriver, το package `webdriverio` υλοποιεί μια ποικιλία εντολών πάνω από το πρωτόκολλο (π.χ. την εντολή [`dragAndDrop`](api/element/dragAndDrop)) καθώς και βασικές έννοιες όπως οι [έξυπνοι selectors](selectors) ή οι [αυτόματες αναμονές](autowait). Το παραπάνω παράδειγμα μπορεί να απλοποιηθεί ως εξής:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

Η χρήση του WebdriverIO σε λειτουργία standalone εξακολουθεί να σας δίνει πρόσβαση σε όλες τις εντολές πρωτοκόλλου, αλλά παρέχει ένα υπερσύνολο πρόσθετων εντολών που προσφέρουν αλληλεπίδραση υψηλότερου επιπέδου με τον browser. Σας επιτρέπει να ενσωματώσετε αυτό το εργαλείο αυτοματοποίησης στο δικό σας project (δοκιμών) για να δημιουργήσετε μια νέα βιβλιοθήκη αυτοματοποίησης. Δημοφιλή παραδείγματα περιλαμβάνουν το [Oxygen](https://github.com/oxygenhq/oxygen) ή το [CodeceptJS](http://codecept.io). Μπορείτε επίσης να γράψετε απλά Node scripts για να κάνετε scraping περιεχομένου από τον ιστό (ή οτιδήποτε άλλο απαιτεί έναν browser σε λειτουργία).

Εάν δεν έχουν οριστεί συγκεκριμένες επιλογές, το WebdriverIO θα επιχειρεί πάντα να κατεβάσει και να ρυθμίσει τον browser driver που αντιστοιχεί στην ιδιότητα `browserName` στα capabilities σας. Στην περίπτωση του Chrome και του Firefox, ενδέχεται επίσης να τους εγκαταστήσει, ανάλογα με το αν μπορεί να βρει τον αντίστοιχο browser στο μηχάνημα.

Για περισσότερες πληροφορίες σχετικά με τα interfaces του package `webdriverio`, ανατρέξτε στο [Modules API](/docs/api/modules).

## Το WDIO Testrunner

Ο κύριος σκοπός του WebdriverIO, ωστόσο, είναι το end-to-end testing σε μεγάλη κλίμακα. Γι' αυτό υλοποιήσαμε ένα test runner που σας βοηθά να δημιουργήσετε μια αξιόπιστη σουίτα δοκιμών, εύκολη στην ανάγνωση και τη συντήρηση.

Το test runner αντιμετωπίζει πολλά προβλήματα που είναι συνηθισμένα όταν εργάζεστε με απλές βιβλιοθήκες αυτοματοποίησης. Αρχικά, οργανώνει τις εκτελέσεις των δοκιμών σας και διαχωρίζει τα test specs, ώστε οι δοκιμές σας να μπορούν να εκτελούνται με μέγιστο παραλληλισμό. Επίσης, χειρίζεται τη διαχείριση των sessions και παρέχει πολλές δυνατότητες που σας βοηθούν να εντοπίζετε προβλήματα και να βρίσκετε σφάλματα στις δοκιμές σας.

Ακολουθεί το ίδιο παράδειγμα με παραπάνω, γραμμένο ως test spec και εκτελεσμένο από το WDIO:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

Το test runner είναι μια αφαίρεση δημοφιλών test frameworks όπως τα Mocha, Jasmine ή Cucumber. Για να εκτελέσετε τις δοκιμές σας χρησιμοποιώντας το WDIO test runner, ανατρέξτε στην ενότητα [Ξεκινώντας](gettingstarted) για περισσότερες πληροφορίες.

Για περισσότερες πληροφορίες σχετικά με το interface του testrunner package `@wdio/cli`, ανατρέξτε στο [Modules API](/docs/api/modules).