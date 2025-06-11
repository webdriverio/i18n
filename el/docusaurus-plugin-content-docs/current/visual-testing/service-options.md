---
id: service-options
title: Επιλογές Υπηρεσίας
---

Οι επιλογές υπηρεσίας είναι οι επιλογές που μπορούν να οριστούν κατά την αρχικοποίηση της υπηρεσίας και θα χρησιμοποιηθούν για κάθε κλήση μεθόδου.

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
-   **Υποστηρίζεται:** Web

Το γέμισμα που πρέπει να προστεθεί στη γραμμή διευθύνσεων στο iOS και Android για να γίνει σωστή περικοπή του viewport.

### `autoElementScroll`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `true`
-   **Υποστηρίζεται:** Web, Hybrid App (Webview)

Αυτή η επιλογή σάς επιτρέπει να απενεργοποιήσετε την αυτόματη κύλιση του στοιχείου στην προβολή όταν δημιουργείται ένα στιγμιότυπο οθόνης στοιχείου.

### `addIOSBezelCorners`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `false`
-   **Υποστηρίζεται:** Web, Hybrid App (Webview), Native App

Προσθέτει γωνίες bezel και notch/dynamic island στο στιγμιότυπο οθόνης για συσκευές iOS.

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
-   **Υποστηρίζεται:** Web, Hybrid App (Webview), Native App

Εάν δεν βρεθεί εικόνα αναφοράς κατά τη σύγκριση, η εικόνα αντιγράφεται αυτόματα στον φάκελο βάσης.

### `baselineFolder`

-   **Τύπος:** `string|()=> string`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `.path/to/testfile/__snapshots__/`
-   **Υποστηρίζεται:** Web, Hybrid App (Webview), Native App

Ο κατάλογος που θα περιέχει όλες τις εικόνες αναφοράς που χρησιμοποιούνται κατά τη σύγκριση. Εάν δεν οριστεί, θα χρησιμοποιηθεί η προεπιλεγμένη τιμή που θα αποθηκεύει τα αρχεία σε έναν φάκελο `__snapshots__/` δίπλα στο spec που εκτελεί τις οπτικές δοκιμές. Μια συνάρτηση που επιστρέφει ένα `string` μπορεί επίσης να χρησιμοποιηθεί για να ορίσει την τιμή `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// Ή
{
    baselineFolder: () => {
        // Κάνετε κάποια μαγεία εδώ
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `false`
-   **Υποστηρίζεται:** Web, Hybrid App (Webview), Native App

Διαγραφή του φακέλου χρόνου εκτέλεσης (`actual` & `diff`) κατά την αρχικοποίηση

:::info ΣΗΜΕΙΩΣΗ
Αυτό θα λειτουργήσει μόνο όταν το [`screenshotPath`](#screenshotpath) έχει οριστεί μέσω των επιλογών του πρόσθετου, και **ΔΕΝ ΘΑ ΛΕΙΤΟΥΡΓΗΣΕΙ** όταν ορίζετε τους φακέλους στις μεθόδους
:::

### `createJsonReportFiles` **(ΝΕΟ)**

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `false`

Τώρα έχετε την επιλογή να εξάγετε τα αποτελέσματα σύγκρισης σε ένα αρχείο αναφοράς JSON. Παρέχοντας την επιλογή `createJsonReportFiles: true`, κάθε εικόνα που συγκρίνεται θα δημιουργήσει μια αναφορά που αποθηκεύεται στον φάκελο `actual`, δίπλα σε κάθε αποτέλεσμα εικόνας `actual`. Η έξοδος θα μοιάζει κάπως έτσι:

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

Όταν εκτελεστούν όλες οι δοκιμές, θα δημιουργηθεί ένα νέο αρχείο JSON με τη συλλογή των συγκρίσεων που μπορεί να βρεθεί στη ρίζα του φακέλου `actual`. Τα δεδομένα ομαδοποιούνται κατά:

-   `describe` για Jasmine/Mocha ή `Feature` για CucumberJS
-   `it` για Jasmine/Mocha ή `Scenario` για CucumberJS
    και στη συνέχεια ταξινομούνται κατά:
-   `commandName`, που είναι τα ονόματα μεθόδων σύγκρισης που χρησιμοποιούνται για τη σύγκριση των εικόνων
-   `instanceData`, πρώτα το πρόγραμμα περιήγησης, μετά η συσκευή, μετά η πλατφόρμα
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
Χρειάζεστε την έκδοση `@wdio/visual-testing` έκδοσης `5.2.0` ή νεότερη
:::

### `disableBlinkingCursor`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `false`
-   **Υποστηρίζεται:** Web, Hybrid App (Webview)

Ενεργοποιεί/Απενεργοποιεί όλους τους δείκτες "που αναβοσβήνουν" σε `input`, `textarea`, `[contenteditable]` στην εφαρμογή. Αν οριστεί σε `true`, ο δείκτης θα οριστεί σε `transparent` πριν τη λήψη στιγμιότυπου οθόνης και θα επαναφερθεί όταν ολοκληρωθεί

### `disableCSSAnimation`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `false`
-   **Υποστηρίζεται:** Web, Hybrid App (Webview)

Ενεργοποιεί/Απενεργοποιεί όλα τα CSS animations στην εφαρμογή. Αν οριστεί σε `true`, όλα τα animations θα απενεργοποιηθούν πριν τη λήψη στιγμιότυπου οθόνης και θα επαναφερθούν όταν ολοκληρωθεί

### `enableLayoutTesting`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `false`
-   **Υποστηρίζεται:** Web

Αυτό θα αποκρύψει όλο το κείμενο σε μια σελίδα, έτσι ώστε μόνο η διάταξη να χρησιμοποιηθεί για σύγκριση. Η απόκρυψη θα γίνει προσθέτοντας το στυλ `'color': 'transparent !important'` σε **κάθε** στοιχείο.

Για την έξοδο δείτε [Test Output](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Χρησιμοποιώντας αυτή τη σημαία, κάθε στοιχείο που περιέχει κείμενο (όχι μόνο `p, h1, h2, h3, h4, h5, h6, span, a, li`, αλλά και `div|button|..`) θα λάβει αυτή την ιδιότητα. Δεν υπάρχει **καμία** επιλογή για προσαρμογή αυτού.
:::

### `formatImageName`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Υποστηρίζεται:** Web, Hybrid App (Webview), Native App

Το όνομα των αποθηκευμένων εικόνων μπορεί να προσαρμοστεί περνώντας την παράμετρο `formatImageName` με μια συμβολοσειρά μορφής όπως:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Οι ακόλουθες μεταβλητές μπορούν να περαστούν για τη μορφοποίηση της συμβολοσειράς και θα διαβαστούν αυτόματα από τις δυνατότητες του στιγμιότυπου.
Εάν δεν μπορούν να προσδιοριστούν, θα χρησιμοποιηθούν οι προεπιλογές.

-   `browserName`: Το όνομα του προγράμματος περιήγησης στις παρεχόμενες δυνατότητες
-   `browserVersion`: Η έκδοση του προγράμματος περιήγησης που παρέχεται στις δυνατότητες
-   `deviceName`: Το όνομα της συσκευής από τις δυνατότητες
-   `dpr`: Η αναλογία pixel της συσκευής
-   `height`: Το ύψος της οθόνης
-   `logName`: Το logName από τις δυνατότητες
-   `mobile`: Αυτό θα προσθέσει `_app`, ή το όνομα του προγράμματος περιήγησης μετά το `deviceName` για να διακρίνει τα στιγμιότυπα εφαρμογών από τα στιγμιότυπα προγράμματος περιήγησης
-   `platformName`: Το όνομα της πλατφόρμας στις παρεχόμενες δυνατότητες
-   `platformVersion`: Η έκδοση της πλατφόρμας που παρέχεται στις δυνατότητες
-   `tag`: Η ετικέτα που παρέχεται στις μεθόδους που καλούνται
-   `width`: Το πλάτος της οθόνης

:::info

Δεν μπορείτε να παρέχετε προσαρμοσμένες διαδρομές/φακέλους στο `formatImageName`. Αν θέλετε να αλλάξετε τη διαδρομή, ελέγξτε την αλλαγή των ακόλουθων επιλογών:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) ανά μέθοδο

:::

### `fullPageScrollTimeout`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `1500`
-   **Υποστηρίζεται:** Web

Το χρονικό όριο σε χιλιοστά του δευτερολέπτου για αναμονή μετά από μια κύλιση. Αυτό μπορεί να βοηθήσει στον εντοπισμό σελίδων με lazy loading.

:::info

Αυτό θα λειτουργήσει μόνο όταν η επιλογή υπηρεσίας/μεθόδου `userBasedFullPageScreenshot` έχει οριστεί σε `true`, δείτε επίσης [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `true`
-   **Υποστηρίζεται:** Web, Hybrid App (Webview)

Απόκρυψη των γραμμών κύλισης στην εφαρμογή. Εάν οριστεί σε true, όλες οι γραμμές κύλισης θα απενεργοποιηθούν πριν τη λήψη στιγμιότυπου οθόνης. Αυτό ορίζεται εξ ορισμού σε `true` για την αποφυγή επιπλέον ζητημάτων.

### `logLevel`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `info`
-   **Υποστηρίζεται:** Web, Hybrid App (Webview), Native App

Προσθέτει επιπλέον καταγραφές, οι επιλογές είναι `debug | info | warn | silent`

Τα σφάλματα καταγράφονται πάντα στην κονσόλα.

### `savePerInstance`

-   **Τύπος:** `boolean`
-   **Προεπιλογή:** `false`
-   **Υποχρεωτικό:** Όχι
-   **Υποστηρίζεται:** Web, Hybrid App (Webview), Native App

Αποθηκεύει τις εικόνες ανά περίπτωση σε ξεχωριστό φάκελο, έτσι για παράδειγμα όλα τα στιγμιότυπα Chrome θα αποθηκευτούν σε ένα φάκελο Chrome όπως `desktop_chrome`.

### `screenshotPath`

-   **Τύπος:** `string | () => string`
-   **Προεπιλογή:** `.tmp/`
-   **Υποχρεωτικό:** Όχι
-   **Υποστηρίζεται:** Web, Hybrid App (Webview), Native App

Ο κατάλογος που θα περιέχει όλα τα πραγματικά/διαφορετικά στιγμιότυπα οθόνης. Εάν δεν οριστεί, θα χρησιμοποιηθεί η προεπιλεγμένη τιμή. Μια συνάρτηση που
επιστρέφει μια συμβολοσειρά μπορεί επίσης να χρησιμοποιηθεί για να ορίσει την τιμή screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// Ή
{
    screenshotPath: () => {
        // Κάνετε κάποια μαγεία εδώ
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `6` για Android και `15` για iOS (`6` ως προεπιλογή και `9` θα προστεθούν αυτόματα για την πιθανή home bar σε iPhones με notch ή iPads που έχουν home bar)
-   **Υποστηρίζεται:** Web

Το γέμισμα που πρέπει να προστεθεί στη γραμμή εργαλείων στο iOS και Android για να γίνει σωστή περικοπή του viewport.

### `userBasedFullPageScreenshot`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `false`
-   **Υποστηρίζεται:** Web, Hybrid App (Webview) **Εισήχθη στο visual-service@7.0.0**

Από προεπιλογή, τα στιγμιότυπα πλήρους σελίδας στο επιτραπέζιο web λαμβάνονται χρησιμοποιώντας το πρωτόκολλο WebDriver BiDi, το οποίο επιτρέπει γρήγορα, σταθερά και συνεπή στιγμιότυπα χωρίς κύλιση.
Όταν το userBasedFullPageScreenshot είναι ορισμένο σε true, η διαδικασία λήψης στιγμιότυπου προσομοιώνει έναν πραγματικό χρήστη: κύλιση μέσω της σελίδας, λήψη στιγμιότυπων μεγέθους viewport και συρραφή τους μαζί. Αυτή η μέθοδος είναι χρήσιμη για σελίδες με περιεχόμενο που φορτώνεται με καθυστέρηση ή δυναμική απόδοση που εξαρτάται από τη θέση κύλισης.

Χρησιμοποιήστε αυτή την επιλογή αν η σελίδα σας βασίζεται στο περιεχόμενο που φορτώνεται κατά την κύλιση ή αν θέλετε να διατηρήσετε τη συμπεριφορά παλαιότερων μεθόδων λήψης στιγμιότυπων.

### `waitForFontsLoaded`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `true`
-   **Υποστηρίζεται:** Web, Hybrid App (Webview)

Οι γραμματοσειρές, συμπεριλαμβανομένων των γραμματοσειρών τρίτων, μπορούν να φορτωθούν συγχρονισμένα ή ασύγχρονα. Η ασύγχρονη φόρτωση σημαίνει ότι οι γραμματοσειρές μπορεί να φορτωθούν αφού το WebdriverIO καθορίσει ότι μια σελίδα έχει φορτωθεί πλήρως. Για να αποφευχθούν προβλήματα απόδοσης γραμματοσειρών, αυτή η μονάδα, από προεπιλογή, θα περιμένει να φορτωθούν όλες οι γραμματοσειρές πριν τη λήψη στιγμιότυπου οθόνης.

## Επιλογές Tabbable

:::info ΣΗΜΕΙΩΣΗ

Αυτή η μονάδα υποστηρίζει επίσης το σχεδιασμό του τρόπου με τον οποίο ένας χρήστης θα χρησιμοποιούσε το πληκτρολόγιό του για να _μετακινηθεί με tab_ μέσω του ιστότοπου, σχεδιάζοντας γραμμές και κουκκίδες από στοιχείο tabbable σε στοιχείο tabbable.<br/>
Η εργασία είναι εμπνευσμένη από την ανάρτηση του [Viv Richards](https://github.com/vivrichards600) στο blog του σχετικά με το ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Ο τρόπος επιλογής των στοιχείων tabbable βασίζεται στη μονάδα [tabbable](https://github.com/davidtheclark/tabbable). Εάν υπάρχουν προβλήματα σχετικά με το tabbing, ελέγξτε το [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) και ειδικά την ενότητα [More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Τύπος:** `object`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηρίζεται:** Web

Οι επιλογές που μπορούν να αλλάξουν για τις γραμμές και τις κουκκίδες αν χρησιμοποιείτε τις μεθόδους `{save|check}Tabbable`. Οι επιλογές εξηγούνται παρακάτω.

#### `tabbableOptions.circle`

-   **Τύπος:** `object`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηρίζεται:** Web

Οι επιλογές για την αλλαγή του κύκλου.

##### `tabbableOptions.circle.backgroundColor`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηρίζεται:** Web

Το χρώμα φόντου του κύκλου.

##### `tabbableOptions.circle.borderColor`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηρίζεται:** Web

Το χρώμα περιγράμματος του κύκλου.

##### `tabbableOptions.circle.borderWidth`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηρίζεται:** Web

Το πλάτος περιγράμματος του κύκλου.

##### `tabbableOptions.circle.fontColor`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηρίζεται:** Web

Το χρώμα της γραμματοσειράς του κειμένου στον κύκλο. Αυτό θα εμφανίζεται μόνο εάν το [`showNumber`](./#tabbableoptionscircleshownumber) έχει οριστεί σε `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηρίζεται:** Web

Η οικογένεια της γραμματοσειράς του κειμένου στον κύκλο. Αυτό θα εμφανίζεται μόνο εάν το [`showNumber`](./#tabbableoptionscircleshownumber) έχει οριστεί σε `true`.

Βεβαιωθείτε ότι ορίζετε γραμματοσειρές που υποστηρίζονται από τα προγράμματα περιήγησης.

##### `tabbableOptions.circle.fontSize`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηρίζεται:** Web

Το μέγεθος της γραμματοσειράς του κειμένου στον κύκλο. Αυτό θα εμφανίζεται μόνο εάν το [`showNumber`](./#tabbableoptionscircleshownumber) έχει οριστεί σε `true`.

##### `tabbableOptions.circle.size`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηρίζεται:** Web

Το μέγεθος του κύκλου.

##### `tabbableOptions.circle.showNumber`

-   **Τύπος:** `showNumber`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηρίζεται:** Web

Εμφανίζει τον αριθμό της σειράς tab στον κύκλο.

#### `tabbableOptions.line`

-   **Τύπος:** `object`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηρίζεται:** Web

Οι επιλογές για την αλλαγή της γραμμής.

##### `tabbableOptions.line.color`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηρίζεται:** Web

Το χρώμα της γραμμής.

##### `tabbableOptions.line.width`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηρίζεται:** Web

Το πλάτος της γραμμής.

## Επιλογές σύγκρισης

### `compareOptions`

-   **Τύπος:** `object`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) για όλες τις προεπιλεγμένες τιμές
-   **Υποστηρίζεται:** Web, Hybrid App (Webview), Native App (Δείτε [Επιλογές σύγκρισης μεθόδου](./method-options#compare-check-options) για περισσότερες πληροφορίες)

Οι επιλογές σύγκρισης μπορούν επίσης να οριστούν ως επιλογές υπηρεσίας, περιγράφονται στις [Επιλογές σύγκρισης μεθόδου](/docs/visual-testing/method-options#compare-check-options)