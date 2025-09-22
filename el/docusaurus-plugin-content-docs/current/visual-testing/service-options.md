---
id: service-options
title: Επιλογές Υπηρεσίας
---

Οι επιλογές υπηρεσίας είναι οι επιλογές που μπορούν να οριστούν κατά την δημιουργία της υπηρεσίας και θα χρησιμοποιηθούν για κάθε κλήση μεθόδου.

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // The options
            },
        ],
    ],
    // ...
};
```

## Προεπιλεγμένες Επιλογές

### `addressBarShadowPadding`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `6`
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web

Η επένδυση που πρέπει να προστεθεί στη γραμμή διευθύνσεων στο iOS και Android για να γίνει σωστή αποκοπή του πεδίου προβολής.

### `autoElementScroll`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `true`
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web, Hybrid App (Webview)

Αυτή η επιλογή σας επιτρέπει να απενεργοποιήσετε την αυτόματη κύλιση του στοιχείου στην προβολή όταν δημιουργείται ένα στιγμιότυπο οθόνης του στοιχείου.

### `addIOSBezelCorners`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `false`
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web, Hybrid App (Webview), Native App

Προσθήκη γωνιών πλαισίου και notch/dynamic island στο στιγμιότυπο οθόνης για συσκευές iOS.

:::info ΣΗΜΕΙΩΣΗ
Αυτό μπορεί να γίνει μόνο όταν το όνομα της συσκευής **ΜΠΟΡΕΙ** να προσδιοριστεί αυτόματα και ταιριάζει με την ακόλουθη λίστα κανονικοποιημένων ονομάτων συσκευών. Η κανονικοποίηση θα γίνει από αυτή τη μονάδα.
**iPhone:**

-   iPhone X: `iphonex`
-   iPhone XS: `iphonexs`
-   iPhone XS Max: `iphonexsmax`
-   iPhone XR: `iphonexr`
-   iPhone 11: `iphone11`
-   iPhone 11 Pro: `iphone11pro`
-   iPhone 11 Pro Max: `iphone11promax`
-   iPhone 12: `iphone12`
-   iPhone 12 Mini: `iphone12mini`
-   iPhone 12 Pro: `iphone12pro`
-   iPhone 12 Pro Max: `iphone12promax`
-   iPhone 13: `iphone13`
-   iPhone 13 Mini: `iphone13mini`
-   iPhone 13 Pro: `iphone13pro`
-   iPhone 13 Pro Max: `iphone13promax`
-   iPhone 14: `iphone14`
-   iPhone 14 Plus: `iphone14plus`
-   iPhone 14 Pro: `iphone14pro`
-   iPhone 14 Pro Max: `iphone14promax`
    **iPads:**
-   iPad Mini 6th Generation: `ipadmini`
-   iPad Air 4th Generation: `ipadair`
-   iPad Air 5th Generation: `ipadair`
-   iPad Pro (11-inch) 1st Generation: `ipadpro11`
-   iPad Pro (11-inch) 2nd Generation: `ipadpro11`
-   iPad Pro (11-inch) 3rd Generation: `ipadpro11`
-   iPad Pro (12.9-inch) 3rd Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 4th Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 5th Generation: `ipadpro129`

:::

### `autoSaveBaseline`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `true`
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web, Hybrid App (Webview), Native App

Εάν δεν βρεθεί εικόνα αναφοράς κατά τη σύγκριση, η εικόνα αντιγράφεται αυτόματα στον φάκελο αναφοράς.

### `baselineFolder`

-   **Τύπος:** `string|()=> string`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `.path/to/testfile/__snapshots__/`
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web, Hybrid App (Webview), Native App

Ο κατάλογος που θα περιέχει όλες τις εικόνες αναφοράς που χρησιμοποιούνται κατά τη σύγκριση. Εάν δεν οριστεί, θα χρησιμοποιηθεί η προεπιλεγμένη τιμή που θα αποθηκεύσει τα αρχεία σε έναν φάκελο `__snapshots__/` δίπλα στο spec που εκτελεί τις οπτικές δοκιμές. Μια συνάρτηση που επιστρέφει μια `string` μπορεί επίσης να χρησιμοποιηθεί για να ορίσει την τιμή `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// Η
{
    baselineFolder: () => {
        // Κάντε κάποια μαγεία εδώ
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `false`
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web, Hybrid App (Webview), Native App

Διαγραφή φακέλου χρόνου εκτέλεσης (`actual` & `diff) κατά την αρχικοποίηση

:::info ΣΗΜΕΙΩΣΗ
Αυτό θα λειτουργήσει μόνο όταν το [`screenshotPath`](#screenshotpath) έχει οριστεί μέσω των επιλογών προσθέτου, και **ΔΕΝ ΘΑ ΛΕΙΤΟΥΡΓΗΣΕΙ** όταν ορίζετε τους φακέλους στις μεθόδους
:::

### `createJsonReportFiles` **(ΝΕΟ)**

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `false`

Τώρα έχετε τη δυνατότητα να εξάγετε τα αποτελέσματα σύγκρισης σε ένα αρχείο αναφοράς JSON. Παρέχοντας την επιλογή `createJsonReportFiles: true`, κάθε εικόνα που συγκρίνεται θα δημιουργήσει μια αναφορά που αποθηκεύεται στον φάκελο `actual`, δίπλα σε κάθε αποτέλεσμα εικόνας `actual`. Η έξοδος θα μοιάζει κάπως έτσι:

```json
{
    "parent": "check methods",
    "test": "should fail comparing with a baseline",
    "tag": "examplePageFail",
    "instanceData": {
        "browser": {
            "name": "chrome-headless-shell",
            "version": "126.0.6478.183"
        },
        "platform": {
            "name": "mac",
            "version": "not-known"
        }
    },
    "commandName": "checkScreen",
    "boundingBoxes": {
        "diffBoundingBoxes": [
            {
                "left": 1088,
                "top": 717,
                "right": 1186,
                "bottom": 730
            }
            //....
        ],
        "ignoredBoxes": [
            {
                "left": 159,
                "top": 652,
                "right": 356,
                "bottom": 703
            }
            //...
        ]
    },
    "fileData": {
        "actualFilePath": "/Users/wdio/visual-testing/.tmp/actual/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "baselineFilePath": "/Users/wdio/visual-testing/localBaseline/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "diffFilePath": "/Users/wdio/visual-testing/.tmp/diff/desktop_chrome-headless-shell/examplePageFail-local-chrome-latest-1366x768png",
        "fileName": "examplePageFail-local-chrome-latest-1366x768.png",
        "size": {
            "actual": {
                "height": 768,
                "width": 1366
            },
            "baseline": {
                "height": 768,
                "width": 1366
            },
            "diff": {
                "height": 768,
                "width": 1366
            }
        }
    },
    "misMatchPercentage": "12.90",
    "rawMisMatchPercentage": 12.900729014153246
}
```

Όταν εκτελεστούν όλες οι δοκιμές, ένα νέο αρχείο JSON με τη συλλογή των συγκρίσεων θα δημιουργηθεί και μπορεί να βρεθεί στη ρίζα του φακέλου `actual`. Τα δεδομένα ομαδοποιούνται ανά:

-   `describe` για Jasmine/Mocha ή `Feature` για CucumberJS
-   `it` για Jasmine/Mocha ή `Scenario` για CucumberJS
    και στη συνέχεια ταξινομούνται κατά:
-   `commandName`, που είναι τα ονόματα των μεθόδων σύγκρισης που χρησιμοποιούνται για τη σύγκριση των εικόνων
-   `instanceData`, πρώτα ο περιηγητής, μετά η συσκευή, μετά η πλατφόρμα
    θα μοιάζει κάπως έτσι

```json
[
    {
        "description": "check methods",
        "data": [
            {
                "test": "should fail comparing with a baseline",
                "data": [
                    {
                        "tag": "examplePageFail",
                        "instanceData": {},
                        "commandName": "checkScreen",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "14.34",
                        "rawMisMatchPercentage": 14.335403703025868
                    },
                    {
                        "tag": "exampleElementFail",
                        "instanceData": {},
                        "commandName": "checkElement",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "1.34",
                        "rawMisMatchPercentage": 1.335403703025868
                    }
                ]
            }
        ]
    }
]
```

Τα δεδομένα αναφοράς θα σας δώσουν την ευκαιρία να δημιουργήσετε τη δική σας οπτική αναφορά χωρίς να κάνετε όλη τη μαγεία και τη συλλογή δεδομένων μόνοι σας.

:::info ΣΗΜΕΙΩΣΗ
Χρειάζεστε την έκδοση `@wdio/visual-testing` 5.2.0 ή νεότερη
:::

### `disableBlinkingCursor`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `false`
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web, Hybrid App (Webview)

Ενεργοποίηση/Απενεργοποίηση όλων των "αναβοσβησμάτων" του δρομέα σε `input`, `textarea`, `[contenteditable]` στην εφαρμογή. Αν οριστεί ως `true`, ο δρομέας θα οριστεί ως `transparent` πριν από τη λήψη ενός στιγμιότυπου οθόνης
και θα επαναφερθεί όταν ολοκληρωθεί

### `disableCSSAnimation`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `false`
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web, Hybrid App (Webview)

Ενεργοποίηση/Απενεργοποίηση όλων των CSS animations στην εφαρμογή. Αν οριστεί ως `true`, όλα τα animations θα απενεργοποιηθούν πριν από τη λήψη ενός στιγμιότυπου οθόνης
και θα επαναφερθούν όταν ολοκληρωθεί

### `enableLayoutTesting`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `false`
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web

Αυτό θα κρύψει όλο το κείμενο σε μια σελίδα ώστε μόνο η διάταξη να χρησιμοποιείται για σύγκριση. Η απόκρυψη θα γίνει προσθέτοντας το στυλ `'color': 'transparent !important'` σε **κάθε** στοιχείο.

Για την έξοδο, δείτε [Test Output](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Με τη χρήση αυτής της σημαίας, κάθε στοιχείο που περιέχει κείμενο (όχι μόνο `p, h1, h2, h3, h4, h5, h6, span, a, li`, αλλά και `div|button|..`) θα λάβει αυτή την ιδιότητα. **Δεν** υπάρχει επιλογή να προσαρμόσετε αυτό.
:::

### `formatImageName`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web, Hybrid App (Webview), Native App

Το όνομα των αποθηκευμένων εικόνων μπορεί να προσαρμοστεί περνώντας την παράμετρο `formatImageName` με μια συμβολοσειρά μορφής όπως:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Οι ακόλουθες μεταβλητές μπορούν να περάσουν για να διαμορφώσουν τη συμβολοσειρά και θα διαβαστούν αυτόματα από τις δυνατότητες του στιγμιότυπου.
Αν δεν μπορούν να προσδιοριστούν, θα χρησιμοποιηθούν οι προεπιλογές.

-   `browserName`: Το όνομα του προγράμματος περιήγησης στις παρεχόμενες δυνατότητες
-   `browserVersion`: Η έκδοση του προγράμματος περιήγησης που παρέχεται στις δυνατότητες
-   `deviceName`: Το όνομα της συσκευής από τις δυνατότητες
-   `dpr`: Η αναλογία εικονοστοιχείων της συσκευής
-   `height`: Το ύψος της οθόνης
-   `logName`: Το logName από τις δυνατότητες
-   `mobile`: Αυτό θα προσθέσει `_app`, ή το όνομα του προγράμματος περιήγησης μετά το `deviceName` για να διακρίνει τα στιγμιότυπα οθόνης εφαρμογών από τα στιγμιότυπα οθόνης του προγράμματος περιήγησης
-   `platformName`: Το όνομα της πλατφόρμας στις παρεχόμενες δυνατότητες
-   `platformVersion`: Η έκδοση της πλατφόρμας που παρέχεται στις δυνατότητες
-   `tag`: Η ετικέτα που παρέχεται στις μεθόδους που καλούνται
-   `width`: Το πλάτος της οθόνης

:::info

Δεν μπορείτε να παρέχετε προσαρμοσμένες διαδρομές/φακέλους στο `formatImageName`. Εάν θέλετε να αλλάξετε τη διαδρομή, τότε ελέγξτε την αλλαγή των ακόλουθων επιλογών:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) ανά μέθοδο

:::

### `fullPageScrollTimeout`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `1500`
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web

Ο χρόνος αναμονής σε χιλιοστά του δευτερολέπτου μετά από μια κύλιση. Αυτό μπορεί να βοηθήσει στον εντοπισμό σελίδων με τεμπέλικη φόρτωση.

:::info

Αυτό θα λειτουργήσει μόνο όταν η επιλογή υπηρεσίας/μεθόδου `userBasedFullPageScreenshot` έχει οριστεί σε `true`, δείτε επίσης [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `true`
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web, Hybrid App (Webview)

Απόκρυψη γραμμών κύλισης στην εφαρμογή. Αν οριστεί ως true, όλες οι γραμμές κύλισης θα απενεργοποιηθούν πριν τη λήψη ενός στιγμιότυπου οθόνης. Αυτό έχει οριστεί ως προεπιλογή σε `true` για την αποφυγή επιπλέον ζητημάτων.

### `logLevel`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `info`
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web, Hybrid App (Webview), Native App

Προσθέτει επιπλέον καταγραφές, οι επιλογές είναι `debug | info | warn | silent`

Τα σφάλματα καταγράφονται πάντα στην κονσόλα.

### `savePerInstance`

-   **Τύπος:** `boolean`
-   **Προεπιλογή:** `false`
-   **Υποχρεωτικό:** όχι
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web, Hybrid App (Webview), Native App

Αποθηκεύστε τις εικόνες ανά στιγμιότυπο σε έναν ξεχωριστό φάκελο, έτσι για παράδειγμα όλα τα στιγμιότυπα οθόνης Chrome θα αποθηκευτούν σε έναν φάκελο Chrome όπως `desktop_chrome`.

### `screenshotPath`

-   **Τύπος:** `string | () => string`
-   **Προεπιλογή:** `.tmp/`
-   **Υποχρεωτικό:** όχι
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web, Hybrid App (Webview), Native App

Ο κατάλογος που θα περιέχει όλα τα πραγματικά/διαφορετικά στιγμιότυπα οθόνης. Αν δεν οριστεί, θα χρησιμοποιηθεί η προεπιλεγμένη τιμή. Μια συνάρτηση που
επιστρέφει μια συμβολοσειρά μπορεί επίσης να χρησιμοποιηθεί για να ορίσει την τιμή του screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// Η
{
    screenshotPath: () => {
        // Κάντε κάποια μαγεία εδώ
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `6` για Android και `15` για iOS (`6` από προεπιλογή και `9` θα προστεθεί αυτόματα για την πιθανή γραμμή αρχικής σε iPhones με notch ή iPads που έχουν γραμμή αρχικής)
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web

Η επένδυση που πρέπει να προστεθεί στη γραμμή εργαλείων στο iOS και Android για να γίνει σωστή αποκοπή του πεδίου προβολής.

### `userBasedFullPageScreenshot`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `false`
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web, Hybrid App (Webview) **Εισήχθη στο visual-service@7.0.0**

Από προεπιλογή, τα στιγμιότυπα οθόνης πλήρους σελίδας σε επιτραπέζιο web λαμβάνονται χρησιμοποιώντας το πρωτόκολλο WebDriver BiDi, το οποίο επιτρέπει γρήγορα, σταθερά και συνεπή στιγμιότυπα οθόνης χωρίς κύλιση.
Όταν το userBasedFullPageScreenshot οριστεί ως true, η διαδικασία λήψης στιγμιότυπου οθόνης προσομοιώνει έναν πραγματικό χρήστη: κύλιση μέσω της σελίδας, λήψη στιγμιότυπων οθόνης μεγέθους viewport και συρραφή τους μαζί. Αυτή η μέθοδος είναι χρήσιμη για σελίδες με περιεχόμενο που φορτώνεται τεμπέλικα ή δυναμική απόδοση που εξαρτάται από τη θέση κύλισης.

Χρησιμοποιήστε αυτήν την επιλογή αν η σελίδα σας βασίζεται στη φόρτωση περιεχομένου κατά την κύλιση ή αν θέλετε να διατηρήσετε τη συμπεριφορά παλαιότερων μεθόδων λήψης στιγμιότυπων οθόνης.

### `waitForFontsLoaded`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `true`
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web, Hybrid App (Webview)

Οι γραμματοσειρές, συμπεριλαμβανομένων των γραμματοσειρών τρίτων, μπορούν να φορτωθούν συγχρόνως ή ασύγχρονα. Η ασύγχρονη φόρτωση σημαίνει ότι οι γραμματοσειρές μπορεί να φορτωθούν μετά από το WebdriverIO καθορίζει ότι μια σελίδα έχει φορτωθεί πλήρως. Για να αποφύγετε προβλήματα απόδοσης γραμματοσειρών, αυτή η μονάδα, από προεπιλογή, θα περιμένει να φορτωθούν όλες οι γραμματοσειρές πριν από τη λήψη ενός στιγμιότυπου οθόνης.

## Επιλογές Tabbable

:::info ΣΗΜΕΙΩΣΗ

Αυτή η μονάδα υποστηρίζει επίσης το σχεδιασμό του τρόπου με τον οποίο ένας χρήστης θα χρησιμοποιούσε το πληκτρολόγιό του για να _περιηγηθεί_ μέσω της ιστοσελίδας, σχεδιάζοντας γραμμές και σημεία από ένα στοιχείο προσβάσιμο με tab στο άλλο.<br/>
Η εργασία εμπνέεται από τη δημοσίευση του [Viv Richards](https://github.com/vivrichards600) στο ιστολόγιό του σχετικά με το ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Ο τρόπος επιλογής των στοιχείων προσβάσιμων με tab βασίζεται στη μονάδα [tabbable](https://github.com/davidtheclark/tabbable). Εάν υπάρχουν προβλήματα σχετικά με την περιήγηση με tab, ελέγξτε το [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) και ειδικά την ενότητα [More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Τύπος:** `object`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web

Οι επιλογές που μπορούν να αλλάξουν για τις γραμμές και τα σημεία αν χρησιμοποιείτε τις μεθόδους `{save|check}Tabbable`. Οι επιλογές εξηγούνται παρακάτω.

#### `tabbableOptions.circle`

-   **Τύπος:** `object`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web

Οι επιλογές για να αλλάξετε τον κύκλο.

##### `tabbableOptions.circle.backgroundColor`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web

Το χρώμα φόντου του κύκλου.

##### `tabbableOptions.circle.borderColor`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web

Το χρώμα του περιγράμματος του κύκλου.

##### `tabbableOptions.circle.borderWidth`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web

Το πλάτος του περιγράμματος του κύκλου.

##### `tabbableOptions.circle.fontColor`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web

Το χρώμα της γραμματοσειράς του κειμένου στον κύκλο. Αυτό θα εμφανίζεται μόνο αν το [`showNumber`](./#tabbableoptionscircleshownumber) έχει οριστεί σε `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web

Η οικογένεια της γραμματοσειράς του κειμένου στον κύκλο. Αυτό θα εμφανίζεται μόνο αν το [`showNumber`](./#tabbableoptionscircleshownumber) έχει οριστεί σε `true`.

Βεβαιωθείτε ότι έχετε ορίσει γραμματοσειρές που υποστηρίζονται από τους περιηγητές.

##### `tabbableOptions.circle.fontSize`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web

Το μέγεθος της γραμματοσειράς του κειμένου στον κύκλο. Αυτό θα εμφανίζεται μόνο αν το [`showNumber`](./#tabbableoptionscircleshownumber) έχει οριστεί σε `true`.

##### `tabbableOptions.circle.size`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web

Το μέγεθος του κύκλου.

##### `tabbableOptions.circle.showNumber`

-   **Τύπος:** `showNumber`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web

Εμφάνιση του αριθμού ακολουθίας tab στον κύκλο.

#### `tabbableOptions.line`

-   **Τύπος:** `object`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web

Οι επιλογές για να αλλάξετε τη γραμμή.

##### `tabbableOptions.line.color`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web

Το χρώμα της γραμμής.

##### `tabbableOptions.line.width`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web

Το πλάτος της γραμμής.

## Επιλογές σύγκρισης

### `compareOptions`

-   **Τύπος:** `object`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηριζόμενα Πλαίσια Εφαρμογής:** Web, Hybrid App (Webview), Native App (Δείτε τις [Επιλογές σύγκρισης μεθόδου](./method-options#compare-check-options) για περισσότερες πληροφορίες)

Οι επιλογές σύγκρισης μπορούν επίσης να οριστούν ως επιλογές υπηρεσίας, περιγράφονται στις [Επιλογές σύγκρισης μεθόδου](/docs/visual-testing/method-options#compare-check-options)