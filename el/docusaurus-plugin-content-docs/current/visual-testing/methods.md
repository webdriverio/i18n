---
id: methods
title: Μέθοδοι
description: "Χρησιμοποιήστε τις μεθόδους save και check της υπηρεσίας visual για να καταγράψετε στιγμιότυπα οθόνης και να συγκρίνετε οθόνες, στοιχεία και πλήρεις σελίδες με εικόνες αναφοράς."
---

Οι παρακάτω μέθοδοι προστίθενται στο καθολικό αντικείμενο [`browser`](/docs/api/browser) του WebdriverIO.

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

- Desktop Browsers
- Mobile Browsers
- Mobile Hybrid Apps
- Mobile Native Apps

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

Δείτε τη σελίδα [Έξοδος Δοκιμών](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

Αποθηκεύει μια εικόνα του viewport.

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

- Desktop Browsers
- Mobile Browsers
- Mobile Hybrid Apps
- Mobile Native Apps

#### Παράμετροι
-   **`tag`:**
    -   **Υποχρεωτικό:** Ναι
    -   **Τύπος:** string
-   **`saveScreenOptions`:**
    -   **Υποχρεωτικό:** Όχι
    -   **Τύπος:** ένα αντικείμενο επιλογών, δείτε [Επιλογές Αποθήκευσης](./method-options#save-options)

#### Έξοδος:

Δείτε τη σελίδα [Έξοδος Δοκιμών](./test-output#savescreenelementfullpagescreen).

### `saveFullPageScreen`

#### Χρήση

Αποθηκεύει μια εικόνα ολόκληρης της οθόνης.

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

- Desktop Browsers
- Mobile Browsers

#### Παράμετροι
-   **`tag`:**
    -   **Υποχρεωτικό:** Ναι
    -   **Τύπος:** string
-   **`saveFullPageScreenOptions`:**
    -   **Υποχρεωτικό:** Όχι
    -   **Τύπος:** ένα αντικείμενο επιλογών, δείτε [Επιλογές Αποθήκευσης](./method-options#save-options)

#### Έξοδος:

Δείτε τη σελίδα [Έξοδος Δοκιμών](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Αποθηκεύει μια εικόνα ολόκληρης της οθόνης με τις γραμμές και τις κουκκίδες πλοήγησης με Tab (tabbable).

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

- Desktop Browsers

#### Παράμετροι
-   **`tag`:**
    -   **Υποχρεωτικό:** Ναι
    -   **Τύπος:** string
-   **`saveTabbableOptions`:**
    -   **Υποχρεωτικό:** Όχι
    -   **Τύπος:** ένα αντικείμενο επιλογών, δείτε [Επιλογές Αποθήκευσης](./method-options#save-options)

#### Έξοδος:

Δείτε τη σελίδα [Έξοδος Δοκιμών](./test-output#savescreenelementfullpagescreen).

## Μέθοδοι Ελέγχου

:::info ΣΥΜΒΟΥΛΗ
Όταν οι μέθοδοι `check` χρησιμοποιούνται για πρώτη φορά, θα δείτε την παρακάτω προειδοποίηση στα logs. Αυτό σημαίνει ότι δεν χρειάζεται να συνδυάσετε τις μεθόδους `save` και `check` αν θέλετε να δημιουργήσετε την εικόνα αναφοράς (baseline) σας.

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

- Desktop Browsers
- Mobile Browsers
- Mobile Hybrid Apps
- Mobile Native Apps

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

Δείτε τη σελίδα [Έξοδος Δοκιμών](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

Συγκρίνει μια εικόνα του viewport με μια εικόνα αναφοράς.

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

- Desktop Browsers
- Mobile Browsers
- Mobile Hybrid Apps
- Mobile Native Apps

#### Παράμετροι
-   **`tag`:**
    -   **Υποχρεωτικό:** Ναι
    -   **Τύπος:** string
-   **`checkScreenOptions`:**
    -   **Υποχρεωτικό:** Όχι
    -   **Τύπος:** ένα αντικείμενο επιλογών, δείτε [Επιλογές Σύγκρισης/Ελέγχου](./method-options#compare-check-options)

#### Έξοδος:

Δείτε τη σελίδα [Έξοδος Δοκιμών](./test-output#checkscreenelementfullpagescreen).

### `checkFullPageScreen`

Συγκρίνει μια εικόνα ολόκληρης της οθόνης με μια εικόνα αναφοράς.

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

- Desktop Browsers
- Mobile Browsers

#### Παράμετροι
-   **`tag`:**
    -   **Υποχρεωτικό:** Ναι
    -   **Τύπος:** string
-   **`checkFullPageOptions`:**
    -   **Υποχρεωτικό:** Όχι
    -   **Τύπος:** ένα αντικείμενο επιλογών, δείτε [Επιλογές Σύγκρισης/Ελέγχου](./method-options#compare-check-options)

#### Έξοδος:

Δείτε τη σελίδα [Έξοδος Δοκιμών](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

Συγκρίνει μια εικόνα ολόκληρης της οθόνης με τις γραμμές και τις κουκκίδες πλοήγησης με Tab (tabbable) με μια εικόνα αναφοράς.

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

- Desktop Browsers

#### Παράμετροι
-   **`tag`:**
    -   **Υποχρεωτικό:** Ναι
    -   **Τύπος:** string
-   **`checkTabbableOptions`:**
    -   **Υποχρεωτικό:** Όχι
    -   **Τύπος:** ένα αντικείμενο επιλογών, δείτε [Επιλογές Σύγκρισης/Ελέγχου](./method-options#compare-check-options)

#### Έξοδος:

Δείτε τη σελίδα [Έξοδος Δοκιμών](./test-output#checkscreenelementfullpagescreen).