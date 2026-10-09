---
id: writing-tests
title: Συγγραφή Τεστ
description: "Γράψτε τεστ WebdriverIO για εφαρμογές Flutter μεταβαίνοντας στο context του Flutter και αλληλεπιδρώντας με widgets μέσω της επέκτασης flutter_driver."
---

Αυτή η ενότητα καλύπτει την πρακτική δομή για τη δημιουργία αυτοματοποιημένων σεναρίων ελέγχου και τον τρόπο αλληλεπίδρασης απευθείας με το εσωτερικό δέντρο στοιχείων του Flutter χρησιμοποιώντας το WebdriverIO.

### Γιατί είναι Απαραίτητη η Εναλλαγή Context;

Κατά την έναρξη μιας συνεδρίας αυτοματοποίησης με το Appium, ο driver ξεκινά την εκτέλεση αντιστοιχίζοντας το εγγενές context του λειτουργικού συστήματος, γνωστό ως `NATIVE_APP`. Αυτό το context μπορεί να δει μόνο το εγγενές κέλυφος που περιβάλλει την εφαρμογή (όπως τη γραμμή κατάστασης του συστήματος ή τους εγγενείς διαλόγους Android/iOS).

Δεδομένου ότι το Flutter αποδίδει τη διεπαφή χρήστη του μέσα σε ένα απομονωμένο Canvas, τα εσωτερικά στοιχεία είναι αόρατα μέσα στο context `NATIVE_APP`. Για να στείλουμε εντολές απευθείας στην επέκταση ελέγχου του Flutter (`flutter_driver`), πρέπει να αλλάξουμε ρητά την εστίαση της αυτοματοποίησης στο context `FLUTTER`. Χωρίς αυτήν την εναλλαγή, οποιαδήποτε προσπάθεια εντοπισμού ενός Widget θα οδηγήσει σε σφάλμα μη εύρεσης στοιχείου.

:::tip Βέλτιστη Πρακτική: Πάντα Εναλλαγή Context στο `beforeEach`
Συνιστάται ως βέλτιστη πρακτική να συμπεριλαμβάνετε το `await driver.switchContext('FLUTTER')` σε ένα hook `beforeEach` σε κάθε αρχείο τεστ. Αυτό διασφαλίζει ότι κάθε τεστ ξεκινά την εκτέλεση στο context `FLUTTER`, αποφεύγοντας την αστάθεια ή τη διαρροή κατάστασης εάν ένα προηγούμενο τεστ άλλαξε σε `NATIVE_APP` (π.χ. για τον χειρισμό διαλόγων αδειών του λειτουργικού συστήματος) ή εάν μια συνεδρία επαναφέρει το ενεργό context.
:::

### Γιατί είναι Απαραίτητο το `appium-flutter-finder`;

Οι παραδοσιακοί selectors του WebdriverIO, όπως `$('~selector')` ή `$('#id')`, έχουν σχεδιαστεί για τον εντοπισμό στοιχείων χρησιμοποιώντας στρατηγικές που προορίζονται για διεπαφές Web ή εγγενείς διεπαφές κινητών (όπως resource IDs ή XPath).

Το Flutter διαχειρίζεται τα δικά του εσωτερικά στοιχεία και χρησιμοποιεί ιδιόκτητες μεθόδους αναζήτησης (όπως `byValueKey`, `byText`, `byType`). Η βιβλιοθήκη `appium-flutter-finder` είναι απαραίτητη επειδή λειτουργεί ως μεταφραστής: εκθέτει αυτές τις στρατηγικές εντοπισμού που είναι ειδικές για το Flutter σε μια σειριοποιημένη μορφή (Base64/JSON) την οποία ο `appium-flutter-driver` μπορεί να ερμηνεύσει και να εκτελέσει μέσα στην Εικονική Μηχανή (VM) της Dart.

### Πρακτικά Παραδείγματα Τεστ

Τεκμηριώνουμε συνηθισμένα σενάρια χρησιμοποιώντας το `appium-flutter-finder` για τον εντοπισμό widgets, σε συνδυασμό με άμεσες εντολές επέκτασης που εκτελούνται μέσω του `driver.execute('flutter:<command>')`.

:::info Εντολές Επέκτασης & Finders του Flutter Driver
Ο `appium-flutter-driver` παρέχει εξειδικευμένες εντολές για την αλληλεπίδραση με εφαρμογές Flutter, όπως:
- `flutter:waitFor`: Περιμένει μέχρι ένα widget να γίνει ορατό.
- `flutter:waitForAbsent`: Περιμένει μέχρι ένα widget να εξαφανιστεί.
- `flutter:scroll` / `flutter:scrollIntoView` / `flutter:scrollUntilVisible`: Χειρίζεται την κύλιση μέσα σε προβολές με δυνατότητα κύλισης.
- `flutter:setTextEntryEmulation`: Ρυθμίζει τη συμπεριφορά εισαγωγής κειμένου.

Για την πλήρη λίστα των διαθέσιμων εντολών, παραμέτρων και τύπων επιστροφής, δείτε την [Τεκμηρίωση Εντολών του Appium Flutter Driver](https://github.com/appium/appium-flutter-driver#commands), τον [πηγαίο κώδικα του Node.js Finder](https://github.com/appium/appium-flutter-driver/tree/main/finder/nodejs) και το [appium-flutter-finder στο npm](https://www.npmjs.com/package/appium-flutter-finder).
:::

### Παράδειγμα Α — Απλή αλληλεπίδραση (Ροή μετρητή)

```typescript
// counter.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter Counter Flow', () => {

    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The counter should be successfully incremented by clicking the button.', async () => {
        const incrementButton = find.byTooltip('Increment');
        const counterText = find.byValueKey('counter_text');

        const initialValue = await driver.getElementText(counterText);
        expect(initialValue).toBe('0');

        await driver.elementClick(incrementButton);

        const finalValue = await driver.getElementText(counterText);
        expect(finalValue).toBe('1');
    });
});
```

### Παράδειγμα Β — Σταθερή Πλοήγηση (Αποφυγή Timeouts)

```typescript
// redirects.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter Redirects Flow', () => {

    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should be able to navigate between the Redirect Example views and back to the first view.', async () => {
        const buttonGoToRedirectExampleTwoView = find.byValueKey('redirect_example_two_button');
        await driver.elementClick(buttonGoToRedirectExampleTwoView);

        const redirectExampleTwoBody = find.byValueKey('redirect_example_two_body');
        await driver.execute('flutter:waitFor', redirectExampleTwoBody);
        const textRedirectExampleTwoBody = await driver.getElementText(redirectExampleTwoBody);
        expect(textRedirectExampleTwoBody).toBe('This is the Redirect Example Two View');

        const buttonGoBackToRedirectExampleView = find.byValueKey('redirect_example_two_back_button');
        await driver.elementClick(buttonGoBackToRedirectExampleView);

        const redirectExampleBody = find.byValueKey('redirect_example_body');
        await driver.execute('flutter:waitFor', redirectExampleBody);
        const textRedirectExampleBody = await driver.getElementText(redirectExampleBody);
        expect(textRedirectExampleBody).toBe('This is the Redirect Example View');
    });
});
```

### Παράδειγμα Γ — Εναλλαγή Contexts (Εγγενείς Διάλογοι & Άδειες Λειτουργικού Συστήματος)

```typescript
// native_dialog_context.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter & Native Context Switching Flow', () => {
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should trigger a native dialog, interact with OS controls, and return to Flutter context.', async () => {
        // 1. Στο context FLUTTER: κάντε κλικ στο widget που ενεργοποιεί έναν διάλογο άδειας ή ειδοποίησης σε επίπεδο λειτουργικού συστήματος
        const buttonRequestPermission = find.byValueKey('request_permission_button');
        await driver.elementClick(buttonRequestPermission);

        // 2. Εναλλαγή στο context NATIVE_APP για αλληλεπίδραση με τον διάλογο του λειτουργικού συστήματος
        await driver.switchContext('NATIVE_APP');

        // Εντοπισμός και κλικ στο εγγενές κουμπί χρησιμοποιώντας τους τυπικούς selectors του WebdriverIO
        const nativeAllowButton = await $('//*[@text="Allow" or @text="While using the app" or @label="Allow"]');
        await nativeAllowButton.waitForDisplayed();
        await nativeAllowButton.click();

        // 3. Επιστροφή στο context FLUTTER για συνέχιση της επαλήθευσης των widgets του Flutter
        await driver.switchContext('FLUTTER');

        const permissionStatusText = find.byValueKey('permission_status_text');
        await driver.execute('flutter:waitFor', permissionStatusText);
        const status = await driver.getElementText(permissionStatusText);
        expect(status).toBe('Permission Granted');
    });
});
```

## Ροή Build και Εκτέλεσης

Για να διασφαλίσετε ότι οι πρόσφατες αλλαγές στον κώδικα Dart και στα Keys είναι ορατές στα τεστ, ακολουθείτε πάντα αυτά τα βήματα:

```bash
flutter build apk -t lib/main_e2e.dart --debug
npx wdio run wdio.conf.ts
```

Μπορείτε να δείτε τα παραδείγματα κώδικα στο αποθετήριο: https://github.com/webdriverio/appium-boilerplate