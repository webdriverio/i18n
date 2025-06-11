---
id: method-options
title: Επιλογές Μεθόδων
---

Οι επιλογές μεθόδων είναι οι επιλογές που μπορούν να οριστούν ανά [μέθοδο](./methods). Εάν η επιλογή έχει το ίδιο κλειδί με μια επιλογή που έχει οριστεί κατά τη στιγμιοποίηση του προσθέτου, αυτή η επιλογή μεθόδου θα αντικαταστήσει την τιμή της επιλογής του προσθέτου.

## Επιλογές Αποθήκευσης

### `disableBlinkingCursor`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview)

Ενεργοποίηση/Απενεργοποίηση όλων των "αναβοσβησμάτων" του δρομέα στα `input`, `textarea`, `[contenteditable]` στην εφαρμογή. Εάν οριστεί σε `true`, ο δρομέας θα οριστεί ως `transparent` πριν τη λήψη ενός στιγμιότυπου οθόνης
και θα επαναφερθεί όταν ολοκληρωθεί

### `disableCSSAnimation`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview)

Ενεργοποίηση/Απενεργοποίηση όλων των CSS animations στην εφαρμογή. Εάν οριστεί σε `true`, όλα τα animations θα απενεργοποιηθούν πριν τη λήψη ενός στιγμιότυπου οθόνης
και θα επαναφερθούν όταν ολοκληρωθεί

### `enableLegacyScreenshotMethod`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview)

Χρησιμοποιήστε αυτήν την επιλογή για να επιστρέψετε στην "παλαιότερη" μέθοδο στιγμιότυπων οθόνης που βασίζεται στο πρωτόκολλο W3C-WebDriver. Αυτό μπορεί να είναι χρήσιμο εάν οι δοκιμές σας βασίζονται σε υπάρχουσες εικόνες αναφοράς ή εάν εκτελείτε σε περιβάλλοντα που δεν υποστηρίζουν πλήρως τα νεότερα στιγμιότυπα οθόνης που βασίζονται σε BiDi.
Σημειώστε ότι η ενεργοποίηση αυτής της επιλογής μπορεί να παράγει στιγμιότυπα οθόνης με ελαφρώς διαφορετική ανάλυση ή ποιότητα.

### `enableLayoutTesting`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Used with:** All [methods](./methods)
-   **Supported:** Web

Αυτό θα κρύψει όλο το κείμενο σε μια σελίδα έτσι ώστε μόνο η διάταξη να χρησιμοποιηθεί για σύγκριση. Η απόκρυψη θα γίνει προσθέτοντας το στυλ `'color': 'transparent !important'` σε __κάθε__ στοιχείο.

Για την έξοδο δείτε [Test Output](./test-output#enablelayouttesting)

:::info
Χρησιμοποιώντας αυτή τη σημαία, κάθε στοιχείο που περιέχει κείμενο (όχι μόνο `p, h1, h2, h3, h4, h5, h6, span, a, li`, αλλά και `div|button|..`) θα λάβει αυτή την ιδιότητα. __Δεν__ υπάρχει επιλογή προσαρμογής αυτού.
:::

### `hideScrollBars`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Used with:** All [methods](./methods)
-   **Supported:** Web, Hybrid App (Webview)

Απόκρυψη γραμμών κύλισης στην εφαρμογή. Εάν οριστεί σε true, όλες οι γραμμές κύλισης θα απενεργοποιηθούν πριν τη λήψη ενός στιγμιότυπου οθόνης. Αυτό ορίζεται από προεπιλογή σε `true` για την αποφυγή επιπλέον ζητημάτων.

### `hideElements`

-   **Type:** `array`
-   **Mandatory:** no
-   **Used with:** All [methods](./methods)
-   **Supported:** Web, Hybrid App (Webview), Native App

Αυτή η μέθοδος μπορεί να κρύψει 1 ή πολλαπλά στοιχεία προσθέτοντας την ιδιότητα `visibility: hidden` σε αυτά παρέχοντας έναν πίνακα στοιχείων.

### `removeElements`

-   **Type:** `array`
-   **Mandatory:** no
-   **Used with:** All [methods](./methods)
-   **Supported:** Web, Hybrid App (Webview), Native App

Αυτή η μέθοδος μπορεί να _αφαιρέσει_ 1 ή πολλαπλά στοιχεία προσθέτοντας την ιδιότητα `display: none` σε αυτά παρέχοντας έναν πίνακα στοιχείων.

### `resizeDimensions`

-   **Type:** `object`
-   **Mandatory:** no
-   **Default:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **Used with:** Only for [`saveElement`](./methods#saveelement) or [`checkElement`](./methods#checkelement)
-   **Supported:** Web, Hybrid App (Webview), Native App

Ένα αντικείμενο που πρέπει να περιέχει ένα ποσό pixel `top`, `right`, `bottom` και `left` που πρέπει να κάνουν το περικομμένο στοιχείο μεγαλύτερο.

### `userBasedFullPageScreenshot`

* **Type:** `boolean`
* **Mandatory:** No
* **Default:** `false`
* **Supported:** Web, Hybrid App (Webview)

Όταν οριστεί σε `true`, αυτή η επιλογή ενεργοποιεί τη **στρατηγική κύλισης και συρραφής** για τη λήψη στιγμιότυπων οθόνης πλήρους σελίδας.
Αντί να χρησιμοποιεί τις εγγενείς δυνατότητες λήψης στιγμιότυπων οθόνης του προγράμματος περιήγησης, κάνει κύλιση στη σελίδα χειροκίνητα και συρράπτει πολλαπλά στιγμιότυπα οθόνης μαζί.
Αυτή η μέθοδος είναι ιδιαίτερα χρήσιμη για σελίδες με **περιεχόμενο που φορτώνεται με καθυστέρηση** ή πολύπλοκες διατάξεις που απαιτούν κύλιση για πλήρη απόδοση.

### `fullPageScrollTimeout`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `1500`
-   **Used with:** Only for [`saveFullPageScreen`](./methods#savefullpagescreen) or [`saveTabbablePage`](./methods#savetabbablepage)
-   **Supported:** Web

Το χρονικό όριο σε χιλιοστά δευτερολέπτου για αναμονή μετά από μια κύλιση. Αυτό μπορεί να βοηθήσει στον εντοπισμό σελίδων με καθυστερημένη φόρτωση.

> **ΣΗΜΕΙΩΣΗ:** Αυτό λειτουργεί μόνο όταν το `userBasedFullPageScreenshot` έχει οριστεί σε `true`

### `hideAfterFirstScroll`

-   **Type:** `array`
-   **Mandatory:** no
-   **Used with:** Only for [`saveFullPageScreen`](./methods#savefullpagescreen) or [`saveTabbablePage`](./methods#savetabbablepage)
-   **Supported:** Web

Αυτή η μέθοδος θα κρύψει ένα ή περισσότερα στοιχεία προσθέτοντας την ιδιότητα `visibility: hidden` σε αυτά παρέχοντας έναν πίνακα στοιχείων.
Αυτό θα είναι χρήσιμο όταν μια σελίδα για παράδειγμα περιέχει κολλημένα στοιχεία που θα κυλίσουν με τη σελίδα αν η σελίδα κυλιστεί αλλά θα δώσουν ένα ενοχλητικό εφέ όταν ληφθεί ένα στιγμιότυπο πλήρους σελίδας

> **ΣΗΜΕΙΩΣΗ:** Αυτό λειτουργεί μόνο όταν το `userBasedFullPageScreenshot` έχει οριστεί σε `true`

### `waitForFontsLoaded`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Used with:** All [methods](./methods)
-   **Supported:** Web, Hybrid App (Webview)

Οι γραμματοσειρές, συμπεριλαμβανομένων των γραμματοσειρών τρίτων μερών, μπορούν να φορτωθούν σύγχρονα ή ασύγχρονα. Η ασύγχρονη φόρτωση σημαίνει ότι οι γραμματοσειρές μπορεί να φορτωθούν αφού το WebdriverIO καθορίσει ότι μια σελίδα έχει φορτωθεί πλήρως. Για να αποφευχθούν προβλήματα απόδοσης γραμματοσειρών, αυτή η μονάδα, από προεπιλογή, θα περιμένει να φορτωθούν όλες οι γραμματοσειρές πριν τη λήψη ενός στιγμιότυπου οθόνης.

## Επιλογές Σύγκρισης (Ελέγχου)

Οι επιλογές σύγκρισης είναι επιλογές που επηρεάζουν τον τρόπο με τον οποίο εκτελείται η σύγκριση από το [ResembleJS](https://github.com/Huddle/Resemble.js).

:::info ΣΗΜΕΙΩΣΗ

-   Όλες οι επιλογές από τις [Επιλογές Αποθήκευσης](#επιλογές-αποθήκευσης) μπορούν να χρησιμοποιηθούν για τις μεθόδους Σύγκρισης
-   Όλες οι επιλογές σύγκρισης μπορούν να χρησιμοποιηθούν κατά τη στιγμιοποίηση της υπηρεσίας __ή__ για κάθε μέθοδο ελέγχου ξεχωριστά. Εάν μια επιλογή μεθόδου έχει το ίδιο κλειδί με μια επιλογή που έχει οριστεί κατά τη στιγμιοποίηση της υπηρεσίας, τότε η επιλογή σύγκρισης της μεθόδου θα αντικαταστήσει την τιμή της επιλογής σύγκρισης της υπηρεσίας.
- Όλες οι επιλογές μπορούν να χρησιμοποιηθούν για:
    - Web
    - Hybrid App
    - Native App

:::

### `ignoreAlpha`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Σύγκριση εικόνων και απόρριψη του άλφα.

### `blockOutSideBar`

-   **Type:** `boolean`
-   **Default:** `true`
-   **Mandatory:** no
-   **Remark:** _Can only be used for `checkScreen()`. This is **iPad only**_

Αυτόματη αποκλείση της πλευρικής γραμμής για iPad σε οριζόντια λειτουργία κατά τις συγκρίσεις. Αυτό αποτρέπει αποτυχίες στο εγγενές στοιχείο καρτέλας/ιδιωτικής/σελιδοδείκτη.

### `blockOutStatusBar`

-   **Type:** `boolean`
-   **Default:** `true`
-   **Mandatory:** no
-   **Remark:** _This is **Mobile only**_

Αυτόματη αποκλείση της γραμμής κατάστασης και διεύθυνσης κατά τις συγκρίσεις. Αυτό αποτρέπει αποτυχίες στην ώρα, το wifi ή την κατάσταση της μπαταρίας.

### `blockOutToolBar`

-   **Type:** `boolean`
-   **Default:** `true`
-   **Mandatory:** no
-   **Remark:** _This is **Mobile only**_

Αυτόματη αποκλείση της γραμμής εργαλείων.

### `ignoreAntialiasing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Σύγκριση εικόνων και απόρριψη της εξομάλυνσης.

### `ignoreColors`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Ακόμα και αν οι εικόνες είναι έγχρωμες, η σύγκριση θα συγκρίνει 2 ασπρόμαυρες εικόνες

### `ignoreLess`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Σύγκριση εικόνων και σύγκριση με `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Σύγκριση εικόνων και σύγκριση με `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `rawMisMatchPercentage`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Εάν είναι αληθές, το ποσοστό επιστροφής θα είναι όπως `0.12345678`, από προεπιλογή είναι `0.12`

### `returnAllCompareData`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Αυτό θα επιστρέψει όλα τα δεδομένα σύγκρισης, όχι μόνο το ποσοστό αναντιστοιχίας

### `saveAboveTolerance`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no

Επιτρεπτή τιμή του `misMatchPercentage` που αποτρέπει την αποθήκευση εικόνων με διαφορές

### `largeImageThreshold`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no

Η σύγκριση μεγάλων εικόνων μπορεί να οδηγήσει σε προβλήματα απόδοσης.
Όταν παρέχεται ένας αριθμός για τον αριθμό των pixel εδώ (υψηλότερος από 0), ο αλγόριθμος σύγκρισης παραλείπει pixel όταν το πλάτος ή το ύψος της εικόνας είναι μεγαλύτερο από `largeImageThreshold` pixel.

### `scaleImagesToSameSize`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Κλιμακώνει 2 εικόνες στο ίδιο μέγεθος πριν την εκτέλεση της σύγκρισης. Συνιστάται έντονα να ενεργοποιήσετε τα `ignoreAntialiasing` και `ignoreAlpha`

## Επιλογές φακέλου

Ο φάκελος αναφοράς και οι φάκελοι στιγμιότυπων οθόνης (πραγματικό, διαφορά) είναι επιλογές που μπορούν να οριστούν κατά τη στιγμιοποίηση του προσθέτου ή της μεθόδου. Για να ορίσετε τις επιλογές φακέλου σε μια συγκεκριμένη μέθοδο, περάστε τις επιλογές φακέλου στο αντικείμενο επιλογών των μεθόδων. Αυτό μπορεί να χρησιμοποιηθεί για:

- Web
- Hybrid App
- Native App

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// You can use this for all methods
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

-   **Type:** `string`
-   **Mandatory:** no

Φάκελος για το στιγμιότυπο που έχει ληφθεί στη δοκιμή.

### `baselineFolder`

-   **Type:** `string`
-   **Mandatory:** no

Φάκελος για την εικόνα αναφοράς που χρησιμοποιείται για σύγκριση.

### `diffFolder`

-   **Type:** `string`
-   **Mandatory:** no

Φάκελος για τη διαφορά εικόνας που αποδίδεται από το ResembleJS.