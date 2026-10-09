---
id: base-appium-configuration
title: Βασική Διαμόρφωση Appium
description: "Εγκαταστήστε την υπηρεσία Appium και το πακέτο Flutter finder και διαμορφώστε τη βασική ρύθμιση του Appium για τον έλεγχο εφαρμογών Flutter με το WebdriverIO."
---

Το WebdriverIO χρησιμοποιεί το Appium για την εκτέλεση δοκιμών σε emulators, simulators και πραγματικές κινητές συσκευές. Το `@wdio/appium-service` διαχειρίζεται αυτόματα τον κύκλο ζωής του διακομιστή Appium κατά την εκτέλεση των δοκιμών.

Για τη γενική ρύθμιση του Appium και τις επιλογές capabilities, ανατρέξτε στην [Τεκμηρίωση της Υπηρεσίας Appium](https://webdriver.io/docs/appium-service/).

## Εγκατάσταση Εξαρτήσεων

Για να δοκιμάσετε εφαρμογές Flutter, εγκαταστήστε την υπηρεσία Appium και το πακέτο Flutter finder:

```bash
npm install --save-dev @wdio/appium-service appium appium-flutter-finder
```

### Εγκατάσταση του Appium Flutter Driver

Μπορείτε να εγκαταστήσετε τον Appium Flutter Driver (`appium-flutter-driver`) με έναν από τους δύο παρακάτω τρόπους:

#### Επιλογή 1: Ως Dev Dependency (Συνιστάται για CI/CD)

Η προσθήκη του driver απευθείας στα `devDependencies` σας διασφαλίζει ότι όλα τα μέλη της ομάδας και τα pipelines CI/CD έχουν τον driver εγκατεστημένο αυτόματα, χωρίς να απαιτούνται επιπλέον βήματα ρύθμισης:

```bash
npm install --save-dev appium-flutter-driver
```

> Μπορείτε επίσης να εγκαταστήσετε όλα τα απαιτούμενα πακέτα μαζί με μία μόνο εντολή:
> ```bash
> npm install --save-dev @wdio/appium-service appium appium-flutter-finder appium-flutter-driver
> ```

#### Επιλογή 2: Μέσω του Appium CLI (Τοπική Ρύθμιση)

Εναλλακτικά, μπορείτε να εγκαταστήσετε τον driver τοπικά στο περιβάλλον Appium σας χρησιμοποιώντας το Appium CLI:

```bash
npx appium driver install flutter
```

### Επισκόπηση Πακέτων

Αυτά τα πακέτα παρέχουν:
- **`@wdio/appium-service` & `appium`**: Εκκινεί και διαχειρίζεται τον διακομιστή Appium κατά την εκτέλεση των δοκιμών.
- **`appium-flutter-driver`**: Ο driver του Appium που είναι υπεύθυνος για την επικοινωνία με την επέκταση δοκιμών του Flutter.
- **`appium-flutter-finder`**: Βοηθητική βιβλιοθήκη που παρέχει στρατηγικές εντοπισμού ειδικές για το Flutter (`byValueKey`, `byText`, `byTooltip`).