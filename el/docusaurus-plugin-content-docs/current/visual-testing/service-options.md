---
id: service-options
title: Επιλογές Υπηρεσίας
---

Οι επιλογές υπηρεσίας είναι οι επιλογές που μπορούν να οριστούν κατά την αρχικοποίηση της υπηρεσίας και θα χρησιμοποιούνται για κάθε κλήση μεθόδου.

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

## Default Options

### `addressBarShadowPadding`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `6`
-   **Supported Application Contexts:** Web

Η αναπλήρωση που πρέπει να προστεθεί στη γραμμή διευθύνσεων στο iOS και Android για να γίνει σωστή περικοπή του προβαλλόμενου τμήματος.

### `autoElementScroll`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

Αυτή η επιλογή σάς επιτρέπει να απενεργοποιήσετε την αυτόματη κύλιση του στοιχείου στην προβολή όταν δημιουργείται ένα στιγμιότυπο οθόνης στοιχείου.

### `addIOSBezelCorners`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

Προσθέστε γωνίες πλαισίου και notch/dynamic island στο στιγμιότυπο οθόνης για συσκευές iOS.

:::info NOTE
Αυτό μπορεί να γίνει μόνο όταν το όνομα της συσκευής **ΜΠΟΡΕΙ** να προσδιοριστεί αυτόματα και αντιστοιχεί στην ακόλουθη λίστα κανονικοποιημένων ονομάτων συσκευών. Η κανονικοποίηση θα γίνει από αυτή τη μονάδα.
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

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

Εάν δεν βρεθεί εικόνα αναφοράς κατά τη σύγκριση, η εικόνα αντιγράφεται αυτόματα στον φάκελο αναφοράς.

### `alwaysSaveActualImage`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** All

Όταν ορίζετε αυτήν την επιλογή σε `false`, θα:

- μην αποθηκεύσει την πραγματική εικόνα όταν δεν υπάρχει διαφορά
- μην αποθηκεύσει το αρχείο jsonreport όταν το `createJsonReportFiles` έχει οριστεί σε `true`. Θα εμφανίσει επίσης μια προειδοποίηση στα αρχεία καταγραφής ότι το `createJsonReportFiles` είναι απενεργοποιημένο

Αυτό θα πρέπει να δημιουργήσει καλύτερη απόδοση επειδή δεν γράφονται αρχεία στο σύστημα και θα πρέπει να εξασφαλίσει ότι δεν υπάρχει πολύς θόρυβος στο φάκελο `actual`.

### `baselineFolder`

-   **Type:** `string|()=> string`
-   **Mandatory:** No
-   **Default:** `.path/to/testfile/__snapshots__/`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

Ο κατάλογος που θα περιέχει όλες τις εικόνες αναφοράς που χρησιμοποιούνται κατά τη σύγκριση. Εάν δεν οριστεί, θα χρησιμοποιηθεί η προεπιλεγμένη τιμή που θα αποθηκεύσει τα αρχεία σε έναν φάκελο `__snapshots__/` δίπλα στο spec που εκτελεί τις οπτικές δοκιμές. Μια συνάρτηση που επιστρέφει ένα `string` μπορεί επίσης να χρησιμοποιηθεί για να ορίσει την τιμή `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// OR
{
    baselineFolder: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

Διαγραφή φακέλου χρόνου εκτέλεσης (`actual` & `diff`) κατά την αρχικοποίηση

:::info NOTE
Αυτό θα λειτουργήσει μόνο όταν το [`screenshotPath`](#screenshotpath) έχει οριστεί μέσω των επιλογών του πρόσθετου, και **ΔΕΝ ΘΑ ΛΕΙΤΟΥΡΓΗΣΕΙ** όταν ορίζετε τους φακέλους στις μεθόδους
:::

### `createJsonReportFiles` **(NEW)**

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`

Τώρα έχετε τη δυνατότητα να εξάγετε τα αποτελέσματα σύγκρισης σε ένα αρχείο αναφοράς JSON. Παρέχοντας την επιλογή `createJsonReportFiles: true`, κάθε εικόνα που συγκρίνεται θα δημιουργήσει μια αναφορά που αποθηκεύεται στον φάκελο `actual`, δίπλα σε κάθε αποτέλεσμα εικόνας `actual`. Το αποτέλεσμα θα μοιάζει με αυτό:

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

Όταν εκτελεστούν όλες οι δοκιμές, θα δημιουργηθεί ένα νέο αρχείο JSON με τη συλλογή των συγκρίσεων που μπορεί να βρεθεί στη ρίζα του φακέλου σας `actual`. Τα δεδομένα ομαδοποιούνται κατά:

-   `describe` για Jasmine/Mocha ή `Feature` για CucumberJS
-   `it` για Jasmine/Mocha ή `Scenario` για CucumberJS
    και στη συνέχεια ταξινομούνται κατά:
-   `commandName`, που είναι τα ονόματα των μεθόδων σύγκρισης που χρησιμοποιούνται για τη σύγκριση των εικόνων
-   `instanceData`, πρώτα ο περιηγητής, μετά η συσκευή, μετά η πλατφόρμα
    θα μοιάζει με αυτό

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

Τα δεδομένα της αναφοράς θα σας δώσουν την ευκαιρία να δημιουργήσετε τη δική σας οπτική αναφορά χωρίς να κάνετε όλη τη μαγεία και τη συλλογή δεδομένων μόνοι σας.

:::info NOTE
Πρέπει να χρησιμοποιήσετε την έκδοση `@wdio/visual-testing` 5.2.0 ή νεότερη
:::

### `disableBlinkingCursor`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

Ενεργοποίηση/Απενεργοποίηση του "αναβοσβησίματος" του δρομέα σε όλα τα `input`, `textarea`, `[contenteditable]` στην εφαρμογή. Εάν οριστεί σε `true`, ο δρομέας θα οριστεί σε `transparent` πριν τη λήψη ενός στιγμιότυπου οθόνης και θα επαναφερθεί όταν ολοκληρωθεί

### `disableCSSAnimation`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

Ενεργοποίηση/Απενεργοποίηση όλων των CSS animations στην εφαρμογή. Εάν οριστεί σε `true`, όλα τα animations θα απενεργοποιηθούν πριν τη λήψη ενός στιγμιότυπου οθόνης και θα επαναφερθούν όταν ολοκληρωθεί

### `enableLayoutTesting`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web

Αυτό θα αποκρύψει όλο το κείμενο σε μια σελίδα ώστε μόνο η διάταξη θα χρησιμοποιηθεί για σύγκριση. Η απόκρυψη θα γίνει προσθέτοντας το στυλ `'color': 'transparent !important'` σε **κάθε** στοιχείο.

Για το αποτέλεσμα δείτε [Test Output](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Χρησιμοποιώντας αυτή τη σημαία κάθε στοιχείο που περιέχει κείμενο (όχι μόνο `p, h1, h2, h3, h4, h5, h6, span, a, li`, αλλά και `div|button|..`) θα πάρει αυτήν την ιδιότητα. Δεν υπάρχει **καμία** επιλογή για προσαρμογή αυτού.
:::

### `formatImageName`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

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
-   `mobile`: Αυτό θα προσθέσει `_app`, ή το όνομα του προγράμματος περιήγησης μετά το `deviceName` για να διακρίνει τα στιγμιότυπα οθόνης της εφαρμογής από τα στιγμιότυπα οθόνης του προγράμματος περιήγησης
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

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `1500`
-   **Supported Application Contexts:** Web

Το χρονικό όριο σε milliseconds για αναμονή μετά από μια κύλιση. Αυτό μπορεί να βοηθήσει στον εντοπισμό σελίδων με lazy loading.

:::info

Αυτό θα λειτουργήσει μόνο όταν η επιλογή υπηρεσίας/μεθόδου `userBasedFullPageScreenshot` έχει οριστεί σε `true`, δείτε επίσης [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

Απόκρυψη γραμμών κύλισης στην εφαρμογή. Εάν οριστεί σε true, όλες οι γραμμές κύλισης θα απενεργοποιηθούν πριν τη λήψη ενός στιγμιότυπου οθόνης. Αυτό ορίζεται σε προεπιλεγμένο `true` για την αποφυγή πρόσθετων προβλημάτων.

### `logLevel`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `info`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

Προσθέτει επιπλέον αρχεία καταγραφής, οι επιλογές είναι `debug | info | warn | silent`

Τα σφάλματα καταγράφονται πάντα στην κονσόλα.

### `savePerInstance`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

Αποθηκεύστε τις εικόνες ανά στιγμιότυπο σε ξεχωριστό φάκελο, έτσι για παράδειγμα όλα τα στιγμιότυπα οθόνης Chrome θα αποθηκευτούν σε έναν φάκελο Chrome όπως `desktop_chrome`.

### `screenshotPath`

-   **Type:** `string | () => string`
-   **Default:** `.tmp/`
-   **Mandatory:** no
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

Ο κατάλογος που θα περιέχει όλα τα πραγματικά/διαφορετικά στιγμιότυπα οθόνης. Εάν δεν οριστεί, θα χρησιμοποιηθεί η προεπιλεγμένη τιμή. Μια συνάρτηση που επιστρέφει μια συμβολοσειρά μπορεί επίσης να χρησιμοποιηθεί για να ορίσει την τιμή screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// OR
{
    screenshotPath: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `6` για Android και `15` για iOS (`6` ως προεπιλογή και `9` θα προστεθούν αυτόματα για την πιθανή γραμμή αρχικής σελίδας στα iPhones με notch ή iPads που έχουν γραμμή αρχικής σελίδας)
-   **Supported Application Contexts:** Web

Το padding που πρέπει να προστεθεί στη γραμμή εργαλείων στο iOS και Android για να γίνει σωστή περικοπή του προβαλλόμενου τμήματος.

### `userBasedFullPageScreenshot`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview) **Introduced in visual-service@7.0.0**

Από προεπιλογή, τα στιγμιότυπα οθόνης πλήρους σελίδας στο επιτραπέζιο web λαμβάνονται χρησιμοποιώντας το πρωτόκολλο WebDriver BiDi, το οποίο επιτρέπει γρήγορα, σταθερά και συνεπή στιγμιότυπα οθόνης χωρίς κύλιση.
Όταν το userBasedFullPageScreenshot είναι ορισμένο σε true, η διαδικασία λήψης στιγμιότυπου οθόνης προσομοιώνει έναν πραγματικό χρήστη: κυλίοντας μέσα από τη σελίδα, λαμβάνοντας στιγμιότυπα οθόνης μεγέθους προβολής και συρράπτοντάς τα. Αυτή η μέθοδος είναι χρήσιμη για σελίδες με περιεχόμενο που φορτώνεται με καθυστέρηση ή δυναμική απόδοση που εξαρτάται από τη θέση κύλισης.

Χρησιμοποιήστε αυτήν την επιλογή εάν η σελίδα σας βασίζεται στο περιεχόμενο που φορτώνεται κατά την κύλιση ή εάν θέλετε να διατηρήσετε τη συμπεριφορά των παλαιότερων μεθόδων λήψης στιγμιότυπων οθόνης.

### `waitForFontsLoaded`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

Οι γραμματοσειρές, συμπεριλαμβανομένων των γραμματοσειρών τρίτων, μπορούν να φορτωθούν συγχρονισμένα ή ασύγχρονα. Η ασύγχρονη φόρτωση σημαίνει ότι οι γραμματοσειρές μπορεί να φορτωθούν αφού το WebdriverIO καθορίσει ότι μια σελίδα έχει φορτωθεί πλήρως. Για να αποτρέψετε προβλήματα απόδοσης γραμματοσειρών, αυτή η μονάδα, από προεπιλογή, θα περιμένει να φορτωθούν όλες οι γραμματοσειρές πριν τη λήψη ενός στιγμιότυπου οθόνης.

## Tabbable Options

:::info NOTE

Αυτή η ενότητα υποστηρίζει επίσης τη σχεδίαση του τρόπου με τον οποίο ένας χρήστης θα χρησιμοποιούσε το πληκτρολόγιό του για να περιηγηθεί μέσω του ιστότοπου σχεδιάζοντας γραμμές και κουκκίδες από στοιχείο σε στοιχείο που μπορεί να έχει εστίαση με το tab.<br/>
Η εργασία είναι εμπνευσμένη από το άρθρο του [Viv Richards](https://github.com/vivrichards600) στο blog του σχετικά με ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Ο τρόπος που επιλέγονται τα στοιχεία που μπορούν να έχουν εστίαση με το tab βασίζεται στη μονάδα [tabbable](https://github.com/davidtheclark/tabbable). Εάν υπάρχουν προβλήματα σχετικά με την περιήγηση με tab, ελέγξτε το [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) και ειδικά την ενότητα [More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Supported Application Contexts:** Web

Οι επιλογές που μπορούν να αλλάξουν για τις γραμμές και τις κουκκίδες αν χρησιμοποιείτε τις μεθόδους `{save|check}Tabbable`. Οι επιλογές εξηγούνται παρακάτω.

#### `tabbableOptions.circle`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Supported Application Contexts:** Web

Οι επιλογές για να αλλάξετε τον κύκλο.

##### `tabbableOptions.circle.backgroundColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Supported Application Contexts:** Web

Το χρώμα φόντου του κύκλου.

##### `tabbableOptions.circle.borderColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Supported Application Contexts:** Web

Το χρώμα περιγράμματος του κύκλου.

##### `tabbableOptions.circle.borderWidth`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Supported Application Contexts:** Web

Το πλάτος του περιγράμματος του κύκλου.

##### `tabbableOptions.circle.fontColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Supported Application Contexts:** Web

Το χρώμα της γραμματοσειράς του κειμένου στον κύκλο. Αυτό θα εμφανίζεται μόνο εάν το [`showNumber`](./#tabbableoptionscircleshownumber) έχει οριστεί σε `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Supported Application Contexts:** Web

Η οικογένεια της γραμματοσειράς του κειμένου στον κύκλο. Αυτό θα εμφανίζεται μόνο εάν το [`showNumber`](./#tabbableoptionscircleshownumber) έχει οριστεί σε `true`.

Βεβαιωθείτε ότι έχετε ορίσει γραμματοσειρές που υποστηρίζονται από τους περιηγητές.

##### `tabbableOptions.circle.fontSize`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Supported Application Contexts:** Web

Το μέγεθος της γραμματοσειράς του κειμένου στον κύκλο. Αυτό θα εμφανίζεται μόνο εάν το [`showNumber`](./#tabbableoptionscircleshownumber) έχει οριστεί σε `true`.

##### `tabbableOptions.circle.size`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Supported Application Contexts:** Web

Το μέγεθος του κύκλου.

##### `tabbableOptions.circle.showNumber`

-   **Type:** `showNumber`
-   **Mandatory:** No
-   **Default:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Supported Application Contexts:** Web

Εμφάνιση του αριθμού ακολουθίας tab στον κύκλο.

#### `tabbableOptions.line`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Supported Application Contexts:** Web

Οι επιλογές για να αλλάξετε τη γραμμή.

##### `tabbableOptions.line.color`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Supported Application Contexts:** Web

Το χρώμα της γραμμής.

##### `tabbableOptions.line.width`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) για όλες τις προεπιλεγμένες τιμές
-   **Supported Application Contexts:** Web

Το πλάτος της γραμμής.

## Compare options

### `compareOptions`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** Δείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) για όλες τις προεπιλεγμένες τιμές
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App (Δείτε [Method Compare options](./method-options#compare-check-options) για περισσότερες πληροφορίες)

Οι επιλογές σύγκρισης μπορούν επίσης να οριστούν ως επιλογές υπηρεσίας, περιγράφονται στις [Method Compare options](/docs/visual-testing/method-options#compare-check-options)