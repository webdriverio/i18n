---
id: service-options
title: Επιλογές Υπηρεσίας
description: "Ρυθμίστε τις προεπιλεγμένες επιλογές της υπηρεσίας visual, συμπεριλαμβανομένων της λήψης στιγμιότυπων οθόνης, των στιγμιότυπων πλήρους σελίδας, των baselines, των φακέλων και των αναφορών."
---

Οι επιλογές υπηρεσίας είναι οι επιλογές που μπορούν να οριστούν κατά τη δημιουργία της υπηρεσίας και θα χρησιμοποιούνται σε κάθε κλήση μεθόδου.

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Ρύθμιση
    // =====
    services: [
        [
            "visual",
            {
                // Οι επιλογές
            },
        ],
    ],
    // ...
};
```

# Προεπιλεγμένες Επιλογές

## Λήψη στιγμιότυπων οθόνης

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Απόκρυψη των γραμμών κύλισης στην εφαρμογή. Αν οριστεί σε true, όλες οι γραμμές κύλισης θα απενεργοποιηθούν πριν από τη λήψη ενός στιγμιότυπου οθόνης. Είναι ορισμένο από προεπιλογή σε `true` για την αποφυγή επιπλέον προβλημάτων.

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

Ενεργοποίηση/Απενεργοποίηση του "αναβοσβήματος" του κέρσορα σε όλα τα `input`, `textarea`, `[contenteditable]` της εφαρμογής. Αν οριστεί σε `true`, ο κέρσορας θα οριστεί σε `transparent` πριν από τη λήψη ενός στιγμιότυπου οθόνης
και θα επαναφερθεί όταν ολοκληρωθεί

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

Ενεργοποίηση/Απενεργοποίηση όλων των CSS animations στην εφαρμογή. Αν οριστεί σε `true`, όλα τα animations θα απενεργοποιηθούν πριν από τη λήψη ενός στιγμιότυπου οθόνης
και θα επαναφερθούν όταν ολοκληρωθεί

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No" contexts="Web">

Αυτό θα αποκρύψει όλο το κείμενο σε μια σελίδα, ώστε να χρησιμοποιηθεί μόνο η διάταξη (layout) για τη σύγκριση. Η απόκρυψη θα γίνει προσθέτοντας το στυλ `'color': 'transparent !important'` σε **κάθε** στοιχείο.

Για την έξοδο δείτε το [Test Output](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Χρησιμοποιώντας αυτή τη σημαία, κάθε στοιχείο που περιέχει κείμενο (άρα όχι μόνο `p, h1, h2, h3, h4, h5, h6, span, a, li`, αλλά και `div|button|..`) θα λάβει αυτή την ιδιότητα. **Δεν** υπάρχει επιλογή προσαρμογής αυτού.
:::

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No" contexts="Web, Hybrid App (Webview)">

Περιθώριο (padding) σε pixels συσκευής που προστίθεται σε κάθε πλευρά των περιοχών που αγνοούνται, κάνοντας κάθε περιοχή 2× αυτής της τιμής πλατύτερη και ψηλότερη. Αυτό βοηθά στην αποφυγή διαφορών 1 px στα όρια, οι οποίες μπορεί να εμφανιστούν σε οθόνες υψηλού DPR ή με το πρωτόκολλο στιγμιότυπων οθόνης BiDi. Ορίστε σε `0` για απενεργοποίηση.

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Οι γραμματοσειρές, συμπεριλαμβανομένων των γραμματοσειρών τρίτων, μπορούν να φορτωθούν συγχρονισμένα ή ασύγχρονα. Η ασύγχρονη φόρτωση σημαίνει ότι οι γραμματοσειρές ενδέχεται να φορτωθούν αφού το WebdriverIO κρίνει ότι μια σελίδα έχει φορτωθεί πλήρως. Για την αποφυγή προβλημάτων απόδοσης γραμματοσειρών, αυτό το module, από προεπιλογή, θα περιμένει να φορτωθούν όλες οι γραμματοσειρές πριν από τη λήψη ενός στιγμιότυπου οθόνης.

</Option>
## Στιγμιότυπα πλήρους σελίδας

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview) **Introduced in visual-service@7.0.0">

Από προεπιλογή, τα στιγμιότυπα πλήρους σελίδας στο desktop web λαμβάνονται με χρήση του πρωτοκόλλου WebDriver BiDi, το οποίο επιτρέπει γρήγορα, σταθερά και συνεπή στιγμιότυπα οθόνης χωρίς κύλιση.
Όταν το userBasedFullPageScreenshot οριστεί σε true, η διαδικασία λήψης στιγμιότυπου προσομοιώνει έναν πραγματικό χρήστη: κάνει κύλιση στη σελίδα, λαμβάνει στιγμιότυπα μεγέθους viewport και τα συρράπτει. Αυτή η μέθοδος είναι χρήσιμη για σελίδες με περιεχόμενο lazy-loaded ή δυναμική απόδοση που εξαρτάται από τη θέση κύλισης.

Χρησιμοποιήστε αυτή την επιλογή αν η σελίδα σας βασίζεται σε περιεχόμενο που φορτώνεται κατά την κύλιση ή αν θέλετε να διατηρήσετε τη συμπεριφορά παλαιότερων μεθόδων λήψης στιγμιότυπων.

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No" contexts="Web">

Το χρονικό όριο σε χιλιοστά του δευτερολέπτου αναμονής μετά από μια κύλιση. Αυτό μπορεί να βοηθήσει στον εντοπισμό σελίδων με lazy loading.

:::info

Αυτό θα λειτουργήσει μόνο όταν η επιλογή υπηρεσίας/μεθόδου `userBasedFullPageScreenshot` έχει οριστεί σε `true`, δείτε επίσης [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedfullpagescreenshot)

:::

</Option>
## Κινητά & συσκευές

---

### `isHybridApp`

<Option type="boolean" default="false" required="No" contexts="Hybrid App (Webview)">

Ορίστε το σε `true` όταν δοκιμάζετε μια υβριδική εφαρμογή (ένα native κέλυφος με ένα ή περισσότερα ενσωματωμένα webviews). Αυτό προσαρμόζει τον τρόπο με τον οποίο το module χειρίζεται τις αποκοπές της γραμμής κατάστασης και της γραμμής διευθύνσεων για οθόνες βασισμένες σε webview, επιστρέφοντας σε ασφαλείς προεπιλογές όταν τα δεδομένα native ορθογωνίων της συσκευής δεν είναι διαθέσιμα.

</Option>
### `addIOSBezelCorners`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

Προσθήκη γωνιών πλαισίου (bezel) και notch/dynamic island στο στιγμιότυπο οθόνης για συσκευές iOS.

:::info ΣΗΜΕΙΩΣΗ
Αυτό μπορεί να γίνει μόνο όταν το όνομα της συσκευής **ΜΠΟΡΕΙ** να προσδιοριστεί αυτόματα και αντιστοιχεί στην ακόλουθη λίστα κανονικοποιημένων ονομάτων συσκευών. Η κανονικοποίηση θα γίνει από αυτό το module.
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
-   iPad Mini 6ης Γενιάς: `ipadmini`
-   iPad Air 4ης Γενιάς: `ipadair`
-   iPad Air 5ης Γενιάς: `ipadair`
-   iPad Pro (11 ιντσών) 1ης Γενιάς: `ipadpro11`
-   iPad Pro (11 ιντσών) 2ης Γενιάς: `ipadpro11`
-   iPad Pro (11 ιντσών) 3ης Γενιάς: `ipadpro11`
-   iPad Pro (12.9 ιντσών) 3ης Γενιάς: `ipadpro129`
-   iPad Pro (12.9 ιντσών) 4ης Γενιάς: `ipadpro129`
-   iPad Pro (12.9 ιντσών) 5ης Γενιάς: `ipadpro129`
:::

</Option>
### `addressBarShadowPadding`

<Option type="number" default="6" required="No" contexts="Web">

Το περιθώριο (padding) που πρέπει να προστεθεί στη γραμμή διευθύνσεων σε iOS και Android για σωστή αποκοπή του viewport.

</Option>
### `toolBarShadowPadding`

<Option type="number" default={`6 for Android and \`15\` for iOS (\`6\` by default and \`9\` will be added automatically for the possible home bar on iPhones with a notch or iPads that have a home bar)`} required="No" contexts="Web">

Το περιθώριο (padding) που πρέπει να προστεθεί στη γραμμή εργαλείων σε iOS και Android για σωστή αποκοπή του viewport.

</Option>
## Διαχείριση αρχείων & φακέλων

---

### `baselineFolder`

<Option type="string|()=> string" default=".path/to/testfile/__snapshots__/" required="No" contexts="Web, Hybrid App (Webview), Native App">

Ο κατάλογος που θα περιέχει όλες τις εικόνες baseline που χρησιμοποιούνται κατά τη σύγκριση. Αν δεν οριστεί, θα χρησιμοποιηθεί η προεπιλεγμένη τιμή, η οποία θα αποθηκεύει τα αρχεία σε έναν φάκελο `__snapshots__/` δίπλα στο spec που εκτελεί τα visual tests. Μπορεί επίσης να χρησιμοποιηθεί μια συνάρτηση που επιστρέφει ένα `string` για τον ορισμό της τιμής `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// Ή
{
    baselineFolder: () => {
        // Κάντε λίγη μαγεία εδώ
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

</Option>
### `screenshotPath`

<Option type="string | () => string" default=".tmp/" required="no" contexts="Web, Hybrid App (Webview), Native App">

Ο κατάλογος που θα περιέχει όλα τα πραγματικά (actual)/διαφορετικά (diff) στιγμιότυπα οθόνης. Αν δεν οριστεί, θα χρησιμοποιηθεί η προεπιλεγμένη τιμή. Μπορεί επίσης να χρησιμοποιηθεί μια συνάρτηση που
επιστρέφει ένα string για τον ορισμό της τιμής screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// Ή
{
    screenshotPath: () => {
        // Κάντε λίγη μαγεία εδώ
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

</Option>
### `clearRuntimeFolder`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

Διαγραφή του φακέλου χρόνου εκτέλεσης (`actual` & `diff) κατά την αρχικοποίηση

:::info ΣΗΜΕΙΩΣΗ
Αυτό θα λειτουργήσει μόνο όταν το [`screenshotPath`](#screenshotpath) έχει οριστεί μέσω των επιλογών του plugin, και **ΔΕΝ ΘΑ ΛΕΙΤΟΥΡΓΗΣΕΙ** όταν ορίζετε τους φακέλους στις μεθόδους
:::

</Option>
### `savePerInstance`

<Option type="boolean" default="false" required="no" contexts="Web, Hybrid App (Webview), Native App">

Αποθήκευση των εικόνων ανά instance σε ξεχωριστό φάκελο, ώστε για παράδειγμα όλα τα στιγμιότυπα του Chrome να αποθηκεύονται σε έναν φάκελο Chrome όπως `desktop_chrome`.

</Option>
### `formatImageName`

<Option type="string" default={`{tag}-{browserName}-{width}x{height}-dpr-{dpr}`} required="No" contexts="Web, Hybrid App (Webview), Native App">

Το όνομα των αποθηκευμένων εικόνων μπορεί να προσαρμοστεί περνώντας την παράμετρο `formatImageName` με ένα string μορφοποίησης όπως:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Οι ακόλουθες μεταβλητές μπορούν να χρησιμοποιηθούν για τη μορφοποίηση του string και θα διαβαστούν αυτόματα από τα capabilities του instance.
Αν δεν μπορούν να προσδιοριστούν, θα χρησιμοποιηθούν οι προεπιλογές.

-   `browserName`: Το όνομα του browser στα παρεχόμενα capabilities
-   `browserVersion`: Η έκδοση του browser που παρέχεται στα capabilities
-   `deviceName`: Το όνομα της συσκευής από τα capabilities
-   `dpr`: Ο λόγος pixel της συσκευής (device pixel ratio)
-   `height`: Το ύψος της οθόνης
-   `logName`: Το logName από τα capabilities
-   `mobile`: Αυτό θα προσθέσει `_app`, ή το όνομα του browser μετά το `deviceName` για τη διάκριση των στιγμιότυπων εφαρμογών από τα στιγμιότυπα browser
-   `platformName`: Το όνομα της πλατφόρμας στα παρεχόμενα capabilities
-   `platformVersion`: Η έκδοση της πλατφόρμας που παρέχεται στα capabilities
-   `tag`: Το tag που παρέχεται στις μεθόδους που καλούνται
-   `width`: Το πλάτος της οθόνης

:::info

Δεν μπορείτε να παρέχετε προσαρμοσμένες διαδρομές/φακέλους στο `formatImageName`. Αν θέλετε να αλλάξετε τη διαδρομή, ελέγξτε την αλλαγή των ακόλουθων επιλογών:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) ανά μέθοδο

:::

</Option>
## Συμπεριφορά baseline & αποθήκευσης

---

### `autoSaveBaseline`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview), Native App">

Αν δεν βρεθεί εικόνα baseline κατά τη σύγκριση, η εικόνα αντιγράφεται αυτόματα στον φάκελο baseline.

</Option>
### `autoElementScroll`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Αυτή η επιλογή σας επιτρέπει να απενεργοποιήσετε την αυτόματη κύλιση του στοιχείου ώστε να γίνει ορατό όταν δημιουργείται ένα στιγμιότυπο στοιχείου.

</Option>
### `alwaysSaveActualImage`

<Option type="boolean" default="true" required="No" contexts="All">

Όταν αυτή η επιλογή οριστεί σε `false`:

- δεν θα αποθηκεύεται η πραγματική εικόνα όταν **δεν** υπάρχει διαφορά
- δεν θα αποθηκεύεται το αρχείο jsonreport όταν το `createJsonReportFiles` έχει οριστεί σε `true`. Θα εμφανίζεται επίσης μια προειδοποίηση στα logs ότι το `createJsonReportFiles` είναι απενεργοποιημένο

Αυτό θα πρέπει να βελτιώσει την απόδοση, επειδή δεν γράφονται αρχεία στο σύστημα, και θα πρέπει να διασφαλίσει ότι δεν υπάρχει πολύς "θόρυβος" στον φάκελο `actual`.

</Option>
## Αναφορές

---

### `createJsonReportFiles` **(ΝΕΟ)**

<Option type="boolean" default="false" required="No">

Έχετε πλέον την επιλογή να εξάγετε τα αποτελέσματα σύγκρισης σε ένα αρχείο αναφοράς JSON. Παρέχοντας την επιλογή `createJsonReportFiles: true`, κάθε εικόνα που συγκρίνεται θα δημιουργεί μια αναφορά αποθηκευμένη στον φάκελο `actual`, δίπλα σε κάθε αποτέλεσμα εικόνας `actual`. Η έξοδος θα μοιάζει ως εξής:

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

Όταν εκτελεστούν όλα τα tests, θα δημιουργηθεί ένα νέο αρχείο JSON με τη συλλογή των συγκρίσεων, το οποίο μπορεί να βρεθεί στη ρίζα του φακέλου `actual`. Τα δεδομένα ομαδοποιούνται κατά:

-   `describe` για Jasmine/Mocha ή `Feature` για CucumberJS
-   `it` για Jasmine/Mocha ή `Scenario` για CucumberJS
    και στη συνέχεια ταξινομούνται κατά:
-   `commandName`, που είναι τα ονόματα των μεθόδων σύγκρισης που χρησιμοποιούνται για τη σύγκριση των εικόνων
-   `instanceData`, πρώτα browser, μετά συσκευή, μετά πλατφόρμα
    και θα μοιάζει ως εξής

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

Τα δεδομένα της αναφοράς σάς δίνουν τη δυνατότητα να δημιουργήσετε τη δική σας οπτική αναφορά χωρίς να κάνετε μόνοι σας όλη τη "μαγεία" και τη συλλογή δεδομένων.

:::info ΣΗΜΕΙΩΣΗ
Πρέπει να χρησιμοποιείτε το `@wdio/visual-testing` έκδοση `5.2.0` ή νεότερη
:::

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No" contexts="Web, Hybrid App (Webview), Native App">

Η εγγύτητα σε pixels που χρησιμοποιείται για την ομαδοποίηση των διαφορετικών pixels στην αναφορά JSON που δημιουργείται από το [`createJsonReportFiles`](#createjsonreportfiles). Υψηλότερες τιμές ομαδοποιούν περισσότερα pixels σε λιγότερα bounding boxes· χαμηλότερες τιμές παράγουν πιο ακριβή αλλά περισσότερα boxes.

</Option>
## Γενικά

---

### `logLevel`

<Option type="string" default="info" required="No" contexts="Web, Hybrid App (Webview), Native App">

Προσθέτει επιπλέον logs, οι επιλογές είναι `debug | info | warn | silent`

Τα σφάλματα καταγράφονται πάντα στην κονσόλα.

</Option>
## Επιλογές Tabbable

:::info ΣΗΜΕΙΩΣΗ

Αυτό το module υποστηρίζει επίσης τη σχεδίαση του τρόπου με τον οποίο ένας χρήστης θα χρησιμοποιούσε το πληκτρολόγιό του για να μετακινηθεί με _tab_ στον ιστότοπο, σχεδιάζοντας γραμμές και κουκκίδες από στοιχείο σε στοιχείο που μπορεί να λάβει εστίαση με tab.<br/>
Η εργασία είναι εμπνευσμένη από την ανάρτηση ιστολογίου του [Viv Richards](https://github.com/vivrichards600) σχετικά με το ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Ο τρόπος επιλογής των tabbable στοιχείων βασίζεται στο module [tabbable](https://github.com/davidtheclark/tabbable). Αν υπάρχουν προβλήματα σχετικά με το tabbing, ελέγξτε το [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) και ειδικά την [ενότητα More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Οι επιλογές που μπορούν να αλλάξουν για τις γραμμές και τις κουκκίδες αν χρησιμοποιείτε τις μεθόδους `{save|check}Tabbable`. Οι επιλογές εξηγούνται παρακάτω.

</Option>
#### `tabbableOptions.circle`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Οι επιλογές για την αλλαγή του κύκλου.

</Option>
##### `tabbableOptions.circle.backgroundColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Το χρώμα φόντου του κύκλου.

</Option>
##### `tabbableOptions.circle.borderColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Το χρώμα περιγράμματος του κύκλου.

</Option>
##### `tabbableOptions.circle.borderWidth`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Το πάχος περιγράμματος του κύκλου.

</Option>
##### `tabbableOptions.circle.fontColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Το χρώμα της γραμματοσειράς του κειμένου μέσα στον κύκλο. Αυτό θα εμφανίζεται μόνο αν το [`showNumber`](./#tabbableoptionscircleshownumber) έχει οριστεί σε `true`.

</Option>
##### `tabbableOptions.circle.fontFamily`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Η οικογένεια της γραμματοσειράς του κειμένου μέσα στον κύκλο. Αυτό θα εμφανίζεται μόνο αν το [`showNumber`](./#tabbableoptionscircleshownumber) έχει οριστεί σε `true`.

Βεβαιωθείτε ότι ορίζετε γραμματοσειρές που υποστηρίζονται από τους browsers.

</Option>
##### `tabbableOptions.circle.fontSize`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Το μέγεθος της γραμματοσειράς του κειμένου μέσα στον κύκλο. Αυτό θα εμφανίζεται μόνο αν το [`showNumber`](./#tabbableoptionscircleshownumber) έχει οριστεί σε `true`.

</Option>
##### `tabbableOptions.circle.size`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Το μέγεθος του κύκλου.

</Option>
##### `tabbableOptions.circle.showNumber`

<Option type="showNumber" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Εμφάνιση του αριθμού της σειράς tab μέσα στον κύκλο.

</Option>
#### `tabbableOptions.line`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Οι επιλογές για την αλλαγή της γραμμής.

</Option>
##### `tabbableOptions.line.color`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Το χρώμα της γραμμής.

</Option>
##### `tabbableOptions.line.width`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Το πάχος της γραμμής.

</Option>
## Επιλογές σύγκρισης

### `compareOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) for all default values" required="No" contexts="Web, Hybrid App (Webview), Native App (See [Method Compare options](./method-options#compare-check-options) for more information)">

Οι επιλογές σύγκρισης μπορούν επίσης να οριστούν ως επιλογές υπηρεσίας· περιγράφονται στις [Επιλογές σύγκρισης μεθόδων](/docs/visual-testing/method-options#compare-check-options)

</Option>