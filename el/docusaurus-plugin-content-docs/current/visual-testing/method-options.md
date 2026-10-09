---
id: method-options
title: Επιλογές Μεθόδων
description: "Ορίστε ανά μέθοδο επιλογές αποθήκευσης, σύγκρισης και φακέλων για τις μεθόδους οπτικού ελέγχου, οι οποίες υπερισχύουν των επιλογών σε επίπεδο service."
---

Οι επιλογές μεθόδων είναι οι επιλογές που μπορούν να οριστούν ανά [μέθοδο](./methods). Αν η επιλογή έχει το ίδιο κλειδί με μια επιλογή που έχει οριστεί κατά την αρχικοποίηση του plugin, αυτή η επιλογή μεθόδου θα υπερισχύσει της τιμής της επιλογής του plugin.

:::info ΣΗΜΕΙΩΣΗ

-   Όλες οι επιλογές από τις [Επιλογές Αποθήκευσης](#save-options) μπορούν να χρησιμοποιηθούν για τις μεθόδους [Σύγκρισης](#compare-check-options)
-   Όλες οι επιλογές σύγκρισης μπορούν να χρησιμοποιηθούν κατά την αρχικοποίηση του service __ή__ για κάθε μεμονωμένη μέθοδο ελέγχου. Αν μια επιλογή μεθόδου έχει το ίδιο κλειδί με μια επιλογή που έχει οριστεί κατά την αρχικοποίηση του service, τότε η επιλογή σύγκρισης της μεθόδου θα υπερισχύσει της τιμής της επιλογής σύγκρισης του service.
- Όλες οι επιλογές μπορούν να χρησιμοποιηθούν για τα παρακάτω περιβάλλοντα εφαρμογών, εκτός αν αναφέρεται διαφορετικά:
    - Web
    - Hybrid App
    - Native App
- Τα παρακάτω παραδείγματα χρησιμοποιούν τις μεθόδους `save*`, αλλά μπορούν επίσης να χρησιμοποιηθούν με τις μεθόδους `check*`

:::

# Επιλογές Αποθήκευσης

## Εμφάνιση & απόδοση

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους](./methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Web, Hybrid App (Webview)

Απόκρυψη της/των γραμμής/ών κύλισης στην εφαρμογή. Αν οριστεί σε true, όλες οι γραμμές κύλισης θα απενεργοποιηθούν πριν από τη λήψη στιγμιότυπου οθόνης. Από προεπιλογή ορίζεται σε `true` για την αποφυγή επιπλέον προβλημάτων.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους](./methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Web, Hybrid App (Webview)

Ενεργοποίηση/Απενεργοποίηση του «αναβοσβησίματος» του δρομέα (caret) σε όλα τα `input`, `textarea`, `[contenteditable]` της εφαρμογής. Αν οριστεί σε `true`, ο δρομέας θα οριστεί σε `transparent` πριν από τη λήψη στιγμιότυπου οθόνης
και θα επανέλθει όταν ολοκληρωθεί.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους](./methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Web, Hybrid App (Webview)

Ενεργοποίηση/Απενεργοποίηση όλων των CSS animations στην εφαρμογή. Αν οριστεί σε `true`, όλα τα animations θα απενεργοποιηθούν πριν από τη λήψη στιγμιότυπου οθόνης
και θα επανέλθουν όταν ολοκληρωθεί

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους](./methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Web, Hybrid App (Webview)

Αυτό θα αποκρύψει όλο το κείμενο σε μια σελίδα, ώστε να χρησιμοποιηθεί μόνο η διάταξη για τη σύγκριση. Η απόκρυψη γίνεται προσθέτοντας το στυλ `'color': 'transparent !important'` σε __κάθε__ στοιχείο.

Για την έξοδο δείτε το [Έξοδος Ελέγχου](./test-output#enablelayouttesting).

:::info
Χρησιμοποιώντας αυτή τη σημαία, κάθε στοιχείο που περιέχει κείμενο (όχι μόνο `p, h1, h2, h3, h4, h5, h6, span, a, li`, αλλά και `div|button|..`) θα λάβει αυτή την ιδιότητα. __Δεν__ υπάρχει δυνατότητα προσαρμογής αυτού.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

</Option>
### `enableLegacyScreenshotMethod`

<Option type="boolean" default="false" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους](./methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Web, Hybrid App (Webview)

Χρησιμοποιήστε αυτή την επιλογή για να επιστρέψετε στην «παλαιότερη» μέθοδο λήψης στιγμιότυπων οθόνης που βασίζεται στο πρωτόκολλο W3C-WebDriver. Αυτό μπορεί να είναι χρήσιμο αν οι έλεγχοί σας βασίζονται σε υπάρχουσες εικόνες αναφοράς (baseline) ή αν εκτελείτε σε περιβάλλοντα που δεν υποστηρίζουν πλήρως τα νεότερα στιγμιότυπα οθόνης που βασίζονται στο BiDi.
Σημειώστε ότι η ενεργοποίηση αυτής της επιλογής μπορεί να παράγει στιγμιότυπα οθόνης με ελαφρώς διαφορετική ανάλυση ή ποιότητα.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους](./methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Web, Hybrid App (Webview)

Περιθώριο (padding) σε pixel συσκευής που προστίθεται σε κάθε πλευρά των περιοχών που αγνοούνται, κάνοντας κάθε περιοχή φαρδύτερη και ψηλότερη κατά 2× αυτή την τιμή. Αυτό βοηθά στην αποφυγή διαφορών 1 px στα όρια, που μπορεί να εμφανιστούν σε οθόνες με υψηλό DPR ή με το πρωτόκολλο στιγμιότυπων οθόνης BiDi. Ορίστε σε `0` για απενεργοποίηση.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        ignoreRegionPadding: 0
    }
)
```

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους](./methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Web, Hybrid App (Webview)

Οι γραμματοσειρές, συμπεριλαμβανομένων των γραμματοσειρών τρίτων, μπορούν να φορτωθούν συγχρονισμένα ή ασύγχρονα. Η ασύγχρονη φόρτωση σημαίνει ότι οι γραμματοσειρές μπορεί να φορτωθούν αφού το WebdriverIO κρίνει ότι μια σελίδα έχει φορτωθεί πλήρως. Για την αποφυγή προβλημάτων απόδοσης γραμματοσειρών, αυτό το module, από προεπιλογή, θα περιμένει να φορτωθούν όλες οι γραμματοσειρές πριν από τη λήψη στιγμιότυπου οθόνης.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

</Option>
## Ορατότητα στοιχείων

---

### `hideElements`

<Option type="array" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους](./methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Web, Hybrid App (Webview)

Αυτή η μέθοδος μπορεί να αποκρύψει 1 ή περισσότερα στοιχεία προσθέτοντάς τους την ιδιότητα `visibility: hidden`, παρέχοντας έναν πίνακα στοιχείων.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

</Option>
### `removeElements`

<Option type="array" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους](./methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Web, Hybrid App (Webview)

Αυτή η μέθοδος μπορεί να _αφαιρέσει_ 1 ή περισσότερα στοιχεία προσθέτοντάς τους την ιδιότητα `display: none`, παρέχοντας έναν πίνακα στοιχείων.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        removeElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

</Option>
## Ειδικές για στοιχεία

---

### `resizeDimensions`

<Option type="object" default={`{ top: 0, right: 0, bottom: 0, left: 0}`} required="No">

- **Χρησιμοποιείται με:** Μόνο για [`saveElement`](./methods#saveelement) ή [`checkElement`](./methods#checkelement)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Web, Hybrid App (Webview), Native App

Ένα αντικείμενο που πρέπει να περιέχει ποσότητα pixel για `top`, `right`, `bottom` και `left`, η οποία θα κάνει το απόκομμα του στοιχείου μεγαλύτερο.

```typescript
await browser.saveElement(
    'sample-tag',
    {
        resizeDimensions: {
            top: 50,
            left: 100,
            right: 10,
            bottom: 90,
        },
    }
)
```

</Option>
### `biDiOrigin`

<Option type="'document' | 'viewport'" default="'document'" required="No">

- **Χρησιμοποιείται με:** Μόνο για [`saveElement`](./methods#saveelement) ή [`checkElement`](./methods#checkelement)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Web, Hybrid App (Webview)

Επιλογή μόνο για BiDi που ελέγχει ποια αρχή συντεταγμένων χρησιμοποιείται κατά τη λήψη στιγμιότυπων οθόνης στοιχείων μέσω του πρωτοκόλλου WebDriver BiDi.

- `'document'` _(προεπιλογή)_: αποδίδει τη διάταξη του εγγράφου. Λειτουργεί για οποιαδήποτε θέση στοιχείου, αλλά **δεν** καταγράφει σύνθετα επίπεδα (composited layers) (π.χ. γραμμές κύλισης, σταθερές/sticky επικαλύψεις, στοιχεία με `will-change`).
- `'viewport'`: καταγράφει το σύνθετο πλαίσιο όπως έχει σχεδιαστεί, συμπεριλαμβανομένων των γραμμών κύλισης και των επικαλύψεων. Απαιτεί το στοιχείο να είναι **πλήρως ορατό** στο viewport και εμφανίζει περιγραφικό σφάλμα όταν το στοιχείο βρίσκεται εκτός ή είναι μεγαλύτερο από το viewport.

```typescript
await browser.saveElement(
    await $('#my-element'),
    'sample-tag',
    {
        biDiOrigin: 'viewport'
    }
)
```

</Option>
## Ειδικές για πλήρη σελίδα

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No">

- **Χρησιμοποιείται με:** Μόνο για [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) ή [`checkTabbablePage`](./methods#checktabbablepage)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Web, Hybrid App (Webview)

Όταν οριστεί σε `true`, αυτή η επιλογή ενεργοποιεί τη **στρατηγική κύλισης-και-συρραφής (scroll-and-stitch)** για τη λήψη στιγμιότυπων οθόνης πλήρους σελίδας.
Αντί να χρησιμοποιεί τις εγγενείς δυνατότητες λήψης στιγμιότυπων του browser, κάνει χειροκίνητη κύλιση στη σελίδα και συρράπτει πολλά στιγμιότυπα οθόνης μαζί.
Αυτή η μέθοδος είναι ιδιαίτερα χρήσιμη για σελίδες με **περιεχόμενο που φορτώνεται καθυστερημένα (lazy-loaded)** ή σύνθετες διατάξεις που απαιτούν κύλιση για να αποδοθούν πλήρως.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No">

- **Χρησιμοποιείται με:** Μόνο για [`saveFullPageScreen`](./methods#savefullpagescreen) ή [`saveTabbablePage`](./methods#savetabbablepage)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Web, Hybrid App (Webview)

Ο χρόνος αναμονής σε χιλιοστά του δευτερολέπτου μετά από μια κύλιση. Αυτό μπορεί να βοηθήσει στον εντοπισμό σελίδων με lazy loading.

> **ΣΗΜΕΙΩΣΗ:** Αυτό λειτουργεί μόνο όταν το `userBasedFullPageScreenshot` έχει οριστεί σε `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

</Option>
### `hideAfterFirstScroll`

<Option type="array" required="No">

- **Χρησιμοποιείται με:** Μόνο για [`saveFullPageScreen`](./methods#savefullpagescreen) ή [`saveTabbablePage`](./methods#savetabbablepage)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Web, Hybrid App (Webview)

Αυτή η μέθοδος θα αποκρύψει ένα ή περισσότερα στοιχεία προσθέτοντάς τους την ιδιότητα `visibility: hidden`, παρέχοντας έναν πίνακα στοιχείων.
Αυτό είναι χρήσιμο όταν, για παράδειγμα, μια σελίδα περιέχει sticky στοιχεία που κινούνται μαζί με τη σελίδα όταν γίνεται κύλιση, αλλά δημιουργούν ενοχλητικό αποτέλεσμα όταν λαμβάνεται στιγμιότυπο οθόνης πλήρους σελίδας

> **ΣΗΜΕΙΩΣΗ:** Αυτό λειτουργεί μόνο όταν το `userBasedFullPageScreenshot` έχει οριστεί σε `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        hideAfterFirstScroll: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

# Επιλογές Σύγκρισης (Ελέγχου)

Οι επιλογές σύγκρισης είναι επιλογές που επηρεάζουν τον τρόπο με τον οποίο εκτελείται η σύγκριση.

</Option>
## Οπτική ευαισθησία

---

:::info Ιστορικό εκδόσεων για τις επιλογές `ignore*`
Αυτές οι προρυθμίσεις άλλαξαν συμπεριφορά μία φορά, ως αλλαγή που σπάει τη συμβατότητα (breaking change), όταν η μηχανή σύγκρισης άλλαξε από το ResembleJS (v9 και παλαιότερες) στο Pixelmatch (v10 και νεότερες). Δείτε τον [πίνακα ιστορικού εκδόσεων](./compare-options#visual-sensitivity) στη σελίδα Επιλογές Σύγκρισης για λεπτομέρειες. Οτιδήποτε από την v10.0.0 και μετά επισημαίνεται με σημείωση «Από» στην αντίστοιχη επιλογή παρακάτω.
:::

**Σειρά «ο τελευταίος κερδίζει»:** όταν περισσότερες από μία σημαίες `ignore*` είναι ενεργοποιημένες ταυτόχρονα, εφαρμόζεται μόνο μία προρύθμιση, ακολουθώντας αυτή τη σειρά (η μεταγενέστερη κερδίζει): `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`. Από την `v10.1.0` καταγράφεται μια προειδοποίηση που αναφέρει ποια προρύθμιση επικράτησε.

### `ignoreColors`

<Option type="boolean" default="false" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους Ελέγχου](./methods#check-methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Όλα
- **Από:** `v10.1.0`: σύγκριση μόνο φωτεινότητας με χρήση των βαρών luma του resemble (`0.3/0.59/0.11`).

Συγκρίνει μόνο τη φωτεινότητα (βάρη luma του resemble `0.3/0.59/0.11`), αγνοώντας διαφορές απόχρωσης/χρώματος. Χρησιμοποιήστε το όταν το ίδιο το χρώμα αναμένεται να διαφέρει, αλλά θέλετε ακόμα να εντοπίζετε αλλαγές στη διάταξη ή τη φωτεινότητα.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους Ελέγχου](./methods#check-methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Όλα
- **Από:** `v10.1.0`: εφαρμόζει τον δικό της κανόνα threshold/AA ανεξάρτητα από άλλες σημαίες `ignore*`.

Σύγκριση εικόνων απορρίπτοντας τις διαφορές στο κανάλι alpha. Χρησιμοποιήστε το όταν η απόδοση διαφάνειας/αδιαφάνειας είναι ασταθής, αλλά τα χρώματα των pixel από κάτω έχουν σημασία.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους Ελέγχου](./methods#check-methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Όλα
- **Από:** `v10`: η προεπιλογή άλλαξε σε `true` (ήταν `false` στην v9 και παλαιότερες).

Παραβλέπει τα pixel με anti-aliasing κατά τη σύγκριση. Ορίστε σε `false` για αυστηρή σύγκριση όπου τα pixel με anti-aliasing πρέπει να μετρώνται ως αποκλίσεις. Αυτό λύνει την πιο συνηθισμένη αιτία αστάθειας στους οπτικούς ελέγχους: οι άκρες κειμένου/σχημάτων αποδίδονται με ελαφρώς διαφορετικό anti-aliasing σε διαφορετικά μηχανήματα, παρόλο που τίποτα δεν έχει αλλάξει.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους Ελέγχου](./methods#check-methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Όλα
- **Από:** `v10.1.0`: εφαρμόζει τον δικό της κανόνα threshold/AA ανεξάρτητα από άλλες σημαίες `ignore*`.

Σύγκριση εικόνων με χαλαρή ανοχή RGB (~16/255 ανά κανάλι στον χώρο YIQ). Το anti-aliasing δεν παραβλέπεται. Χρησιμοποιήστε το για λίγο περιθώριο απέναντι στον θόρυβο απόδοσης (τεχνουργήματα συμπίεσης, στρογγυλοποίηση χρωμάτων) χωρίς να παραβλέπεται το anti-aliasing.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους Ελέγχου](./methods#check-methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Όλα
- **Από:** `v10.1.0`: εφαρμόζει τον δικό της κανόνα threshold/AA ανεξάρτητα από άλλες σημαίες `ignore*`.

Χρήση μηδενικής ανοχής: οποιαδήποτε διαφορά pixel μετράται ως απόκλιση, συμπεριλαμβανομένου του anti-aliasing. Χρησιμοποιήστε το όταν χρειάζεστε απόδειξη ακρίβειας pixel ότι τίποτα απολύτως δεν άλλαξε.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

</Option>
### `pixelmatch`

<Option type="object" default="undefined" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους Ελέγχου](./methods#check-methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Όλα
- **Προστέθηκε στην:** `v10.1.0`

Παρακάμπτει τη λειτουργία σύγκρισης για μία μόνο κλήση `check*` με άμεσες ρυθμίσεις του [pixelmatch](https://github.com/mapbox/pixelmatch) (`threshold`, `includeAA`, `diffColor`, `aaColor`, `diffColorAlt`, `alpha`, `diffMask`, `checkerboard`), αντί για μια προρύθμιση `ignore*`. Χρησιμοποιήστε το όταν οι προρυθμίσεις είναι πολύ χονδροειδείς για έναν συγκεκριμένο έλεγχο, π.χ. χρειάζεται τη δική του τιμή threshold ή ένα χρώμα διαφοράς που να ξεχωρίζει πραγματικά στην αναφορά σας. Δείτε το [Άμεσος έλεγχος pixelmatch](./compare-options#direct-pixelmatch-control) για την πλήρη αναφορά των πεδίων και τι επιλύει το καθένα.

Δεν μπορεί να συνδυαστεί με επιλογές `ignore*` στο ίδιο αντικείμενο επιλογών της κλήσης: αυτό προκαλεί `CompareOptionsConflictError`. Μπορεί, ωστόσο, να παρακάμψει μια διαμόρφωση service που χρησιμοποιεί προρυθμίσεις `ignore*` (ή αντίστροφα)· καταγράφεται μια προειδοποίηση όταν μια κλήση μεθόδου αλλάζει τη λειτουργία σύγκρισης με αυτόν τον τρόπο.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        pixelmatch: { threshold: 0.05 }
    }
)
```

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους Ελέγχου](./methods#check-methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Όλα

Κλιμακώνει 2 εικόνες στο ίδιο μέγεθος πριν από την εκτέλεση της σύγκρισης. Συνιστάται ιδιαίτερα η ενεργοποίηση των `ignoreAntialiasing` και `ignoreAlpha`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

</Option>
## Αποκλεισμοί περιοχών σε κινητά

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="No">

- **Χρησιμοποιείται με:** _Αυτό είναι **μόνο για κινητά**_
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Hybrid (εγγενές τμήμα) και Native Apps

Αυτόματος αποκλεισμός της γραμμής κατάστασης και της γραμμής διευθύνσεων κατά τις συγκρίσεις. Αυτό αποτρέπει αποτυχίες λόγω της ώρας, του wifi ή της κατάστασης μπαταρίας.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="No">

- **Χρησιμοποιείται με:** _Αυτό είναι **μόνο για κινητά**_
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Hybrid (εγγενές τμήμα) και Native Apps

Αυτόματος αποκλεισμός της γραμμής εργαλείων.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="No">

- **Χρησιμοποιείται με:** _Μπορεί να χρησιμοποιηθεί μόνο για `checkScreen()`. Αυτό είναι **μόνο για iPad**_
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Όλα

Αυτόματος αποκλεισμός της πλευρικής γραμμής για iPad σε οριζόντιο προσανατολισμό κατά τις συγκρίσεις. Αυτό αποτρέπει αποτυχίες στο εγγενές στοιχείο καρτελών/ιδιωτικής περιήγησης/σελιδοδεικτών.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

</Option>
## Διαχείριση περιοχών

---

### `blockOut`

<Option type="array" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους Ελέγχου](./methods#check-methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Όλα

Ένας πίνακας ορθογώνιων περιοχών προς αποκλεισμό πριν από τη σύγκριση. Κάθε καταχώρηση πρέπει να είναι ένα αντικείμενο με τιμές `x`, `y`, `width` και `height` (σε pixel). Οι αποκλεισμένες περιοχές καλύπτονται πριν από τον υπολογισμό της διαφοράς, αποτρέποντας τη συνεισφορά αυτών των περιοχών στο ποσοστό απόκλισης.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOut: [
            { x: 0, y: 0, width: 100, height: 50 },
            { x: 300, y: 200, width: 80, height: 80 },
        ]
    }
)
```

</Option>
### `ignore`

<Option type="array" required="No">

- **Χρησιμοποιείται με:** Μόνο με τη μέθοδο `checkScreen`, **ΟΧΙ** με τη μέθοδο `checkElement`
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Native App

Αυτή η μέθοδος θα αποκλείσει αυτόματα στοιχεία ή μια περιοχή σε μια οθόνη με βάση έναν πίνακα στοιχείων ή ένα αντικείμενο `x|y|width|height`.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignore: [
            $('~element-1'),
            await $('~element-2'),
            {
                x: 150,
                y: 250,
                width: 100,
                height: 100,
            }
        ]
    }
)
```

</Option>
## Αποτελέσματα & αναφορές

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους Ελέγχου](./methods#check-methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Όλα

Αν είναι true, το επιστρεφόμενο ποσοστό θα είναι της μορφής `0.12345678`, η προεπιλογή είναι `0.12`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους Ελέγχου](./methods#check-methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Όλα

Αυτό θα επιστρέψει όλα τα δεδομένα σύγκρισης, όχι μόνο το ποσοστό απόκλισης, δείτε επίσης το [Έξοδος Κονσόλας](./test-output#console-output-1)

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους Ελέγχου](./methods#check-methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Όλα

Επιτρεπτή τιμή του `misMatchPercentage` που αποτρέπει την αποθήκευση εικόνων με διαφορές

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No">

- **Χρησιμοποιείται με:** Όλες τις [μεθόδους Ελέγχου](./methods#check-methods)
- **Υποστηριζόμενα Περιβάλλοντα Εφαρμογών:** Όλα

Η εγγύτητα σε pixel που χρησιμοποιείται για την ομαδοποίηση των pixel διαφοράς στις αναφορές JSON. Υψηλότερες τιμές ομαδοποιούν περισσότερα pixel σε λιγότερα πλαίσια οριοθέτησης· χαμηλότερες τιμές παράγουν πιο ακριβή αλλά περισσότερα πλαίσια. Σχετικό μόνο όταν είναι ενεργοποιημένο το [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles).

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        diffPixelBoundingBoxProximity: 10
    }
)
```

# Επιλογές φακέλων

---

Ο φάκελος εικόνων αναφοράς (baseline) και οι φάκελοι στιγμιότυπων οθόνης (actual, diff) είναι επιλογές που μπορούν να οριστούν κατά την αρχικοποίηση του plugin ή της μεθόδου. Για να ορίσετε τις επιλογές φακέλων σε μια συγκεκριμένη μέθοδο, περάστε τις επιλογές φακέλων στο αντικείμενο επιλογών της μεθόδου. Αυτό μπορεί να χρησιμοποιηθεί για:

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

// Μπορείτε να το χρησιμοποιήσετε για όλες τις μεθόδους
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

</Option>
### `actualFolder`

<Option type="string" required="No" contexts="All">

Φάκελος για το στιγμιότυπο που έχει ληφθεί στον έλεγχο.

</Option>
### `baselineFolder`

<Option type="string" required="No" contexts="All">

Φάκελος για την εικόνα αναφοράς (baseline) με την οποία γίνεται η σύγκριση.

</Option>
### `diffFolder`

<Option type="string" required="No" contexts="All">

Φάκελος για την εικόνα διαφοράς που αποδίδεται κατά τη σύγκριση.

</Option>