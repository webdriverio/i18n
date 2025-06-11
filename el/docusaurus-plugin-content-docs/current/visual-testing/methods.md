---
id: methods
title: Μέθοδοι
---

Οι ακόλουθες μέθοδοι προστίθενται στο καθολικό WebdriverIO αντικείμενο [`browser`](/docs/api/browser).

## Μέθοδοι Αποθήκευσης

:::info ΣΥΜΒΟΥΛΗ
Χρησιμοποιήστε τις Μεθόδους Αποθήκευσης μόνο όταν **δεν** θέλετε να συγκρίνετε οθόνες, αλλά θέλετε μόνο να έχετε ένα στιγμιότυπο στοιχείου/οθόνης.
:::

### `saveElement`

Αποθηκεύει μια εικόνα ενός στοιχείου.

#### Χρήση

```ts
await browser.saveElement(
    // element
    await $('#element-selector'),
    // tag
    'your-reference',
    // saveElementOptions
    {
        // ...
    }
);
```

#### Υποστήριξη

- Περιηγητές Υπολογιστή
- Περιηγητές Κινητών
- Υβριδικές Εφαρμογές Κινητών
- Εγγενείς Εφαρμογές Κινητών

#### Παράμετροι

-   **`element`:**
    -   **Υποχρεωτικό:** Ναι
    -   **Τύπος:** WebdriverIO Element
-   **`tag`:**
    -   **Υποχρεωτικό:** Ναι
    -   **Τύπος:** string
-   **`saveElementOptions`:**
    -   **Υποχρεωτικό:** Όχι
    -   **Τύπος:** ένα αντικείμενο επιλογών, δείτε [Επιλογές Αποθήκευσης](./method-options#save-options)

#### Έξοδος:

Δείτε τη σελίδα [Έξοδος Δοκιμής](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

Αποθηκεύει μια εικόνα μιας προβολής.

#### Χρήση

```ts
await browser.saveScreen(
    // tag
    'your-reference',
    // saveScreenOptions
    {
        // ...
    }
);
```

#### Υποστήριξη

- Περιηγητές Υπολογιστή
- Περιηγητές Κινητών
- Υβριδικές Εφαρμογές Κινητών
- Εγγενείς Εφαρμογές Κινητών

#### Παράμετροι
-   **`tag`:**
    -   **Υποχρεωτικό:** Ναι
    -   **Τύπος:** string
-   **`saveScreenOptions`:**
    -   **Υποχρεωτικό:** Όχι
    -   **Τύπος:** ένα αντικείμενο επιλογών, δείτε [Επιλογές Αποθήκευσης](./method-options#save-options)

#### Έξοδος:

Δείτε τη σελίδα [Έξοδος Δοκιμής](./test-output#savescreenelementfullpagescreen).

### `saveFullPageScreen`

#### Χρήση

Αποθηκεύει μια εικόνα της πλήρους οθόνης.

```ts
await browser.saveFullPageScreen(
    // tag
    'your-reference',
    // saveFullPageScreenOptions
    {
        // ...
    }
);
```

#### Υποστήριξη

- Περιηγητές Υπολογιστή
- Περιηγητές Κινητών

#### Παράμετροι
-   **`tag`:**
    -   **Υποχρεωτικό:** Ναι
    -   **Τύπος:** string
-   **`saveFullPageScreenOptions`:**
    -   **Υποχρεωτικό:** Όχι
    -   **Τύπος:** ένα αντικείμενο επιλογών, δείτε [Επιλογές Αποθήκευσης](./method-options#save-options)

#### Έξοδος:

Δείτε τη σελίδα [Έξοδος Δοκιμής](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Αποθηκεύει μια εικόνα της πλήρους οθόνης με τις γραμμές και τα σημεία tabbable.

#### Χρήση

```ts
await browser.saveTabbablePage(
    // tag
    'your-reference',
    // saveTabbableOptions
    {
        // ...
    }
);
```

#### Υποστήριξη

- Περιηγητές Υπολογιστή

#### Παράμετροι
-   **`tag`:**
    -   **Υποχρεωτικό:** Ναι
    -   **Τύπος:** string
-   **`saveTabbableOptions`:**
    -   **Υποχρεωτικό:** Όχι
    -   **Τύπος:** ένα αντικείμενο επιλογών, δείτε [Επιλογές Αποθήκευσης](./method-options#save-options)

#### Έξοδος:

Δείτε τη σελίδα [Έξοδος Δοκιμής](./test-output#savescreenelementfullpagescreen).

## Μέθοδοι Ελέγχου

:::info ΣΥΜΒΟΥΛΗ
Όταν οι μέθοδοι `check` χρησιμοποιούνται για πρώτη φορά, θα δείτε την παρακάτω προειδοποίηση στα αρχεία καταγραφής. Αυτό σημαίνει ότι δεν χρειάζεται να συνδυάσετε τις μεθόδους `save` και `check` αν θέλετε να δημιουργήσετε τη βασική σας γραμμή.

```shell
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/project/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
 If you want the module to auto save a non existing image to the baseline you
 can provide 'autoSaveBaseline: true' to the options.
#####################################################################################
```

:::

### `checkElement`

Συγκρίνει μια εικόνα ενός στοιχείου με μια εικόνα αναφοράς.

#### Χρήση

```ts
await browser.checkElement(
    // element
    '#element-selector',
    // tag
    'your-reference',
    // checkElementOptions
    {
        // ...
    }
);
```

#### Υποστήριξη

- Περιηγητές Υπολογιστή
- Περιηγητές Κινητών
- Υβριδικές Εφαρμογές Κινητών
- Εγγενείς Εφαρμογές Κινητών

#### Παράμετροι
-   **`element`:**
    -   **Υποχρεωτικό:** Ναι
    -   **Τύπος:** WebdriverIO Element
-   **`tag`:**
    -   **Υποχρεωτικό:** Ναι
    -   **Τύπος:** string
-   **`checkElementOptions`:**
    -   **Υποχρεωτικό:** Όχι
    -   **Τύπος:** ένα αντικείμενο επιλογών, δείτε [Επιλογές Σύγκρισης/Ελέγχου](./method-options#compare-check-options)

#### Έξοδος:

Δείτε τη σελίδα [Έξοδος Δοκιμής](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

Συγκρίνει μια εικόνα μιας προβολής με μια εικόνα αναφοράς.

#### Χρήση

```ts
await browser.checkScreen(
    // tag
    'your-reference',
    // checkScreenOptions
    {
        // ...
    }
);
```

#### Υποστήριξη

- Περιηγητές Υπολογιστή
- Περιηγητές Κινητών
- Υβριδικές Εφαρμογές Κινητών
- Εγγενείς Εφαρμογές Κινητών

#### Παράμετροι
-   **`tag`:**
    -   **Υποχρεωτικό:** Ναι
    -   **Τύπος:** string
-   **`checkScreenOptions`:**
    -   **Υποχρεωτικό:** Όχι
    -   **Τύπος:** ένα αντικείμενο επιλογών, δείτε [Επιλογές Σύγκρισης/Ελέγχου](./method-options#compare-check-options)

#### Έξοδος:

Δείτε τη σελίδα [Έξοδος Δοκιμής](./test-output#checkscreenelementfullpagescreen).

### `checkFullPageScreen`

Συγκρίνει μια εικόνα της πλήρους οθόνης με μια εικόνα αναφοράς.

#### Χρήση

```ts
await browser.checkFullPageScreen(
    // tag
    'your-reference',
    // checkFullPageOptions
    {
        // ...
    }
);
```

#### Υποστήριξη

- Περιηγητές Υπολογιστή
- Περιηγητές Κινητών

#### Παράμετροι
-   **`tag`:**
    -   **Υποχρεωτικό:** Ναι
    -   **Τύπος:** string
-   **`checkFullPageOptions`:**
    -   **Υποχρεωτικό:** Όχι
    -   **Τύπος:** ένα αντικείμενο επιλογών, δείτε [Επιλογές Σύγκρισης/Ελέγχου](./method-options#compare-check-options)

#### Έξοδος:

Δείτε τη σελίδα [Έξοδος Δοκιμής](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

Συγκρίνει μια εικόνα της πλήρους οθόνης με τις γραμμές και τα σημεία tabbable με μια εικόνα αναφοράς.

#### Χρήση

```ts
await browser.checkTabbablePage(
    // tag
    'your-reference',
    // checkTabbableOptions
    {
        // ...
    }
);
```

#### Υποστήριξη

- Περιηγητές Υπολογιστή

#### Παράμετροι
-   **`tag`:**
    -   **Υποχρεωτικό:** Ναι
    -   **Τύπος:** string
-   **`checkTabbableOptions`:**
    -   **Υποχρεωτικό:** Όχι
    -   **Τύπος:** ένα αντικείμενο επιλογών, δείτε [Επιλογές Σύγκρισης/Ελέγχου](./method-options#compare-check-options)

#### Έξοδος:

Δείτε τη σελίδα [Έξοδος Δοκιμής](./test-output#checkscreenelementfullpagescreen).