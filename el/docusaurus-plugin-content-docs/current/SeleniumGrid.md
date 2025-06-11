---
id: seleniumgrid
title: Selenium Grid
---

Μπορείτε να χρησιμοποιήσετε το WebdriverIO με την υπάρχουσα εγκατάσταση Selenium Grid σας. Για να συνδέσετε τις δοκιμές σας με το Selenium Grid, χρειάζεται απλώς να ενημερώσετε τις επιλογές στις ρυθμίσεις του test runner σας.

Εδώ είναι ένα απόσπασμα κώδικα από ένα δείγμα wdio.conf.ts.

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...

}
```
Πρέπει να παρέχετε τις κατάλληλες τιμές για το πρωτόκολλο, το hostname, τη θύρα και τη διαδρομή με βάση τη ρύθμιση του Selenium Grid σας.
Εάν εκτελείτε το Selenium Grid στον ίδιο υπολογιστή με τα σενάρια δοκιμών σας, εδώ είναι ορισμένες τυπικές επιλογές:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'http',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    // ...

}
```

### Βασική πιστοποίηση με προστατευμένο Selenium Grid

Συνιστάται ιδιαίτερα να ασφαλίσετε το Selenium Grid σας. Αν έχετε ένα προστατευμένο Selenium Grid που απαιτεί πιστοποίηση, μπορείτε να περάσετε επικεφαλίδες πιστοποίησης μέσω επιλογών.
Παρακαλώ ανατρέξτε στην ενότητα [headers](https://webdriver.io/docs/configuration/#headers) στην τεκμηρίωση για περισσότερες πληροφορίες.

### Ρυθμίσεις χρονικού ορίου με δυναμικό Selenium Grid

Όταν χρησιμοποιείτε ένα δυναμικό Selenium Grid όπου τα pods των προγραμμάτων περιήγησης δημιουργούνται κατ' απαίτηση, η δημιουργία συνεδρίας μπορεί να αντιμετωπίσει καθυστέρηση εκκίνησης. Σε τέτοιες περιπτώσεις, συνιστάται να αυξήσετε τα χρονικά όρια δημιουργίας συνεδρίας. Η προεπιλεγμένη τιμή στις επιλογές είναι 120 δευτερόλεπτα, αλλά μπορείτε να την αυξήσετε εάν το grid σας χρειάζεται περισσότερο χρόνο για τη δημιουργία μιας νέας συνεδρίας.

```ts
connectionRetryTimeout: 180000,
```

### Προηγμένες ρυθμίσεις

Για προηγμένες ρυθμίσεις, ανατρέξτε στο [configuration file](https://webdriver.io/docs/configurationfile) του Testrunner.

### Λειτουργίες αρχείων με Selenium Grid

Όταν εκτελείτε περιπτώσεις δοκιμών με απομακρυσμένο Selenium Grid, το πρόγραμμα περιήγησης εκτελείται σε έναν απομακρυσμένο υπολογιστή, και πρέπει να δώσετε ιδιαίτερη προσοχή σε περιπτώσεις δοκιμών που περιλαμβάνουν αποστολές και λήψεις αρχείων.

### Λήψεις αρχείων

Για προγράμματα περιήγησης που βασίζονται στο Chromium, μπορείτε να ανατρέξετε στην τεκμηρίωση [Download file](https://webdriver.io/docs/api/browser/downloadFile). Εάν τα σενάρια δοκιμών σας χρειάζεται να διαβάσουν το περιεχόμενο ενός ληφθέντος αρχείου, πρέπει να το κατεβάσετε από τον απομακρυσμένο κόμβο Selenium στον υπολογιστή του test runner. Ακολουθεί ένα παράδειγμα αποσπάσματος κώδικα από τη δειγματική ρύθμιση `wdio.conf.ts` για το πρόγραμμα περιήγησης Chrome:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'se:downloadsEnabled': true
    }],
    //...
}
```

### Αποστολή αρχείων με απομακρυσμένο Selenium Grid

Για να αποστείλετε ένα αρχείο σε μια εφαρμογή ιστού στο απομακρυσμένο πρόγραμμα περιήγησης, πρέπει πρώτα να αποστείλετε το αρχείο στο απομακρυσμένο grid. Μπορείτε να ανατρέξετε στην τεκμηρίωση [uploadFile](https://webdriver.io/docs/api/browser/uploadFile) για λεπτομέρειες.

### Άλλες λειτουργίες αρχείων/grid

Υπάρχουν μερικές ακόμη λειτουργίες που μπορείτε να εκτελέσετε με το Selenium Grid. Οι οδηγίες για το Selenium Standalone θα πρέπει να λειτουργούν καλά και με το Selenium Grid. Παρακαλώ ανατρέξτε στην τεκμηρίωση [Selenium Standalone](https://webdriver.io/docs/api/selenium/) για τις διαθέσιμες επιλογές.

### Επίσημη τεκμηρίωση Selenium Grid

Για περισσότερες πληροφορίες σχετικά με το Selenium Grid, μπορείτε να ανατρέξετε στην επίσημη [τεκμηρίωση](https://www.selenium.dev/documentation/grid/) του Selenium Grid.

Εάν επιθυμείτε να εκτελέσετε το Selenium Grid σε Docker, Docker compose ή Kubernetes, ανατρέξτε στο [GitHub repository](https://github.com/SeleniumHQ/docker-selenium) Selenium-Docker.