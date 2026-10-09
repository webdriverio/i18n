---
id: seleniumgrid
title: Selenium Grid
description: "Συνδέστε τα τεστ του WebdriverIO σε ένα υπάρχον Selenium Grid ορίζοντας το protocol, το hostname, το port και το path στη διαμόρφωσή σας."
---

Μπορείτε να χρησιμοποιήσετε το WebdriverIO με το υπάρχον στιγμιότυπο Selenium Grid που διαθέτετε. Για να συνδέσετε τα τεστ σας στο Selenium Grid, χρειάζεται απλώς να ενημερώσετε τις επιλογές στις διαμορφώσεις του test runner σας.

Ακολουθεί ένα απόσπασμα κώδικα από ένα δείγμα wdio.conf.ts.

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
Πρέπει να δώσετε τις κατάλληλες τιμές για το protocol, το hostname, το port και το path με βάση τη ρύθμιση του Selenium Grid σας.
Αν εκτελείτε το Selenium Grid στο ίδιο μηχάνημα με τα test scripts σας, ακολουθούν μερικές τυπικές επιλογές:

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

### Βασικός έλεγχος ταυτότητας με προστατευμένο Selenium Grid

Συνιστάται ιδιαίτερα να ασφαλίσετε το Selenium Grid σας. Αν έχετε ένα προστατευμένο Selenium Grid που απαιτεί έλεγχο ταυτότητας, μπορείτε να περάσετε headers ελέγχου ταυτότητας μέσω των επιλογών. 
Ανατρέξτε στην ενότητα [headers](https://webdriver.io/docs/configuration/#headers) της τεκμηρίωσης για περισσότερες πληροφορίες.

### Διαμορφώσεις timeout με δυναμικό Selenium Grid

Όταν χρησιμοποιείτε ένα δυναμικό Selenium Grid όπου τα browser pods δημιουργούνται κατά απαίτηση, η δημιουργία session ενδέχεται να αντιμετωπίσει cold start. Σε τέτοιες περιπτώσεις, συνιστάται να αυξήσετε τα timeouts δημιουργίας session. Η προεπιλεγμένη τιμή στις επιλογές είναι 120 δευτερόλεπτα, αλλά μπορείτε να την αυξήσετε αν το grid σας χρειάζεται περισσότερο χρόνο για να δημιουργήσει ένα νέο session. 

```ts
connectionRetryTimeout: 180000,
```

### Προηγμένες διαμορφώσεις

Για προηγμένες διαμορφώσεις, ανατρέξτε στο [αρχείο διαμόρφωσης](https://webdriver.io/docs/configurationfile) του Testrunner.

### Λειτουργίες αρχείων με Selenium Grid

Όταν εκτελείτε test cases με ένα απομακρυσμένο Selenium Grid, ο browser εκτελείται σε ένα απομακρυσμένο μηχάνημα και πρέπει να δώσετε ιδιαίτερη προσοχή στα test cases που περιλαμβάνουν μεταφορτώσεις (uploads) και λήψεις (downloads) αρχείων.

### Λήψεις αρχείων

Για browsers βασισμένους στο Chromium, μπορείτε να ανατρέξετε στην τεκμηρίωση [Download file](https://webdriver.io/docs/api/browser/downloadFile). Αν τα test scripts σας χρειάζεται να διαβάσουν το περιεχόμενο ενός αρχείου που έχει ληφθεί, πρέπει να το κατεβάσετε από τον απομακρυσμένο κόμβο Selenium στο μηχάνημα του test runner. Ακολουθεί ένα παράδειγμα αποσπάσματος κώδικα από το δείγμα διαμόρφωσης `wdio.conf.ts` για τον browser Chrome:

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

### Μεταφόρτωση αρχείων με απομακρυσμένο Selenium Grid

Η [`element.setFiles()`](/docs/api/element/setFiles) ορίζει ένα file input μέσω του WebDriver BiDi. Οι διαδρομές που περνάτε ανοίγονται από τον browser, επομένως πρέπει να υπάρχουν στο μηχάνημα που εκτελεί τον browser. Το WebdriverIO δεν μεταφέρει ένα τοπικό αρχείο σε έναν κόμβο Selenium.

```ts
await $('#file-upload').setFiles('/path/on/the/node/file.png')
```

Ένα suite που χρησιμοποιούσε την `browser.uploadFile()` για να στείλει bytes στον κόμβο πρέπει να τοποθετήσει το αρχείο εκεί όπου ο browser μπορεί να το διαβάσει και στη συνέχεια να καλέσει την `setFiles`. Το endpoint [`file`](/docs/api/selenium#file) του Selenium εξακολουθεί να είναι διαθέσιμο ως `browser.file()` για τους Chromedriver, Edgedriver και Selenium Grid. Δεν είναι εντολή WebDriver ή WebDriver BiDi.

### Άλλες λειτουργίες αρχείων/grid

Υπάρχουν μερικές ακόμη λειτουργίες που μπορείτε να εκτελέσετε με το Selenium Grid. Οι οδηγίες για το Selenium Standalone θα πρέπει να λειτουργούν σωστά και με το Selenium Grid. Ανατρέξτε στην τεκμηρίωση του [Selenium Standalone](https://webdriver.io/docs/api/selenium/) για τις διαθέσιμες επιλογές.


### Επίσημη τεκμηρίωση του Selenium Grid

Για περισσότερες πληροφορίες σχετικά με το Selenium Grid, μπορείτε να ανατρέξετε στην επίσημη [τεκμηρίωση](https://www.selenium.dev/documentation/grid/) του Selenium Grid. 

Αν θέλετε να εκτελέσετε το Selenium Grid σε Docker, Docker compose ή Kubernetes, ανατρέξτε στο [αποθετήριο GitHub](https://github.com/SeleniumHQ/docker-selenium) του Selenium-Docker.