---
id: setting-up-webdriverio
title: Ρύθμιση του WebdriverIO στο περιβάλλον σας
description: "Διαμορφώστε το wdio.conf.ts και τα capabilities του Appium για να εκκινήσετε μια εφαρμογή Flutter με το Appium Flutter Driver σε Android και iOS."
---

Το αρχείο `wdio.conf.ts` είναι το βασικό αρχείο διαμόρφωσης κάθε έργου WebdriverIO. Εδώ ορίζετε πού εκτελούνται τα tests, ποια test frameworks θα χρησιμοποιηθούν και τα απαραίτητα `capabilities` ώστε το Appium να αρχικοποιήσει σωστά την εφαρμογή Flutter.

:::warning
Το `appium-flutter-driver` λειτουργεί διαφορετικά από τους παραδοσιακούς native drivers (όπως το `UiAutomator2` ή το `XCUITest`). Επικοινωνεί με την επέκταση δοκιμών του Flutter (`flutter_driver`) μέσω ενός προσαρμοσμένου πρωτοκόλλου. Γι' αυτόν τον λόγο, οι τυπικές εντολές native αυτοματοποίησης ενδέχεται να μη λειτουργούν με τον ίδιο τρόπο ή να απαιτούν αυστηρά τη χρήση του `appium-flutter-finder`.

Για να κατανοήσετε πλήρως τους περιορισμούς, τις υποστηριζόμενες εντολές και τις επεκτάσεις του πρωτοκόλλου, ανατρέξτε στο επίσημο αποθετήριο του εργαλείου: [Appium Flutter Driver on GitHub](https://github.com/appium/appium-flutter-driver).
:::

### Διαμόρφωση Capabilities (Android & iOS)

```typescript
export const config: WebdriverIO.Config = {
    // ... άλλες ρυθμίσεις του wdio.conf.ts (runner, specs, κ.λπ.)
    

    services: [
        ['appium', {
            // Το WebdriverIO διαχειρίζεται τον κύκλο ζωής του Appium server
            args: {},
            command: 'appium'
        }]
    ],

    capabilities: [
        // ==========================================
        // ΔΙΑΜΟΡΦΩΣΗ ANDROID
        // ==========================================
        {
            'platformName': 'Android',
            'appium:automationName': 'Flutter', // Ορίζει την υποχρεωτική χρήση του Flutter driver
            'appium:deviceName': 'Android_Emulator', // Όνομα του διαμορφωμένου emulator ή της πραγματικής συσκευής σας
            // ΠΑΡΑΤΗΡΗΣΗ ΓΙΑ ΤΗ ΔΙΑΔΡΟΜΗ (Δείτε τη σημείωση για τα Λειτουργικά Συστήματα παρακάτω)
            'appium:app': './build/app/outputs/flutter-apk/app-debug.apk', 
            'appium:autoGrantPermissions': true
        },
        
        // ==========================================
        // ΔΙΑΜΟΡΦΩΣΗ IOS (Απαιτεί macOS)
        // ==========================================
        {
            'platformName': 'iOS',
            'appium:automationName': 'Flutter', // Ορίζει την υποχρεωτική χρήση του Flutter driver
            'appium:deviceName': 'iPhone Simulator', // Όνομα του iOS simulator ή της πραγματικής συσκευής
            'appium:platformVersion': '17.2', // Αλλάξτε το στην έκδοση λειτουργικού συστήματος-στόχο
            // ΠΑΡΑΤΗΡΗΣΗ ΓΙΑ ΤΗ ΔΙΑΔΡΟΜΗ (Δείτε τη σημείωση για τα Λειτουργικά Συστήματα παρακάτω)
            // Χρησιμοποιήστε .app για τον iOS Simulator ή .ipa για πραγματικές συσκευές iOS
            'appium:app': './ios/build/Build/Products/Debug-iphonesimulator/Runner.app',
            'appium:noReset': false
        }
    ],

    // ... υπόλοιπη διαμόρφωση
};
```

### Σημαντικές παρατηρήσεις για τις διαδρομές αρχείων (appium:app)

Ο ορισμός της διαδρομής του δυαδικού αρχείου της εφαρμογής (`.apk` για Android, `.app` ή `.ipa` για iOS) μέσα στην ιδιότητα `appium:app` απαιτεί ιδιαίτερη προσοχή, ανάλογα με το λειτουργικό σύστημα και το περιβάλλον-στόχο:

- **Στα Windows**: Το λειτουργικό σύστημα χρησιμοποιεί ανάποδες καθέτους (`\`) για τις διαδρομές καταλόγων. Όταν ορίζετε τη διαδρομή προς το αρχείο `.apk` στα Windows, φροντίστε να κάνετε escape τις ανάποδες καθέτους στο αρχείο διαμόρφωσης (π.χ. `.\\build\\app\\outputs\\flutter-apk\\app-debug.apk`) ή να χρησιμοποιείτε με συνέπεια κανονικές καθέτους (`/`), τις οποίες το Node.js αναλύει σωστά.
- **Σε macOS / Linux**: Χρησιμοποιούνται τυπικές διαδρομές με κανονικές καθέτους (`/`). Να θυμάστε ότι τα builds για iOS (`.app` για Simulator ή `.ipa` για πραγματικές συσκευές) μπορούν να μεταγλωττιστούν μόνο σε περιβάλλοντα macOS.
- **iOS Simulator έναντι πραγματικών συσκευών**: Χρησιμοποιήστε πακέτα `.app` κατά την εκτέλεση στον iOS Simulator και υπογεγραμμένα πακέτα `.ipa` κατά την εκτέλεση σε φυσικές συσκευές iOS.
- **Απόλυτες έναντι σχετικών διαδρομών**: Συνιστάται ιδιαίτερα η χρήση σχετικών διαδρομών με αφετηρία τη ρίζα του έργου (με χρήση του `./`), ώστε να διασφαλίζεται η φορητότητα μεταξύ διαφορετικών μηχανημάτων ανάπτυξης και περιβαλλόντων Continuous Integration (CI).