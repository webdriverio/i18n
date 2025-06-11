---
id: compare-options
title: Επιλογές Σύγκρισης
---

Οι επιλογές σύγκρισης είναι ρυθμίσεις που επηρεάζουν τον τρόπο εκτέλεσης της σύγκρισης από το [ResembleJS](https://github.com/Huddle/Resemble.js).

:::info ΣΗΜΕΙΩΣΗ
Όλες οι επιλογές σύγκρισης μπορούν να χρησιμοποιηθούν κατά την αρχικοποίηση της υπηρεσίας ή για κάθε μεμονωμένο `checkElement`, `checkScreen` και `checkFullPageScreen`. Εάν μια επιλογή μεθόδου έχει το ίδιο κλειδί με μια επιλογή που έχει οριστεί κατά την αρχικοποίηση της υπηρεσίας, τότε η επιλογή σύγκρισης της μεθόδου θα αντικαταστήσει την τιμή της επιλογής σύγκρισης της υπηρεσίας.
:::

### `ignoreAlpha`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Μπορεί επίσης να χρησιμοποιηθεί για `checkElement`, `checkScreen()` και `checkFullPageScreen()`. Θα αντικαταστήσει τη ρύθμιση του plugin_

Συγκρίνει εικόνες και απορρίπτει το άλφα.

### `blockOutSideBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Μπορεί να χρησιμοποιηθεί μόνο για `checkScreen()`. Θα αντικαταστήσει τη ρύθμιση του plugin. Αυτό ισχύει **μόνο για iPad**_

Αυτόματα αποκλείει την πλευρική γραμμή για iPads σε οριζόντια προβολή κατά τις συγκρίσεις. Αυτό αποτρέπει αποτυχίες στο εγγενές στοιχείο καρτέλας/ιδιωτικής περιήγησης/σελιδοδείκτη.

### `blockOutStatusBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Μπορεί επίσης να χρησιμοποιηθεί για `checkElement`, `checkScreen()` και `checkFullPageScreen()`. Θα αντικαταστήσει τη ρύθμιση του plugin. Αυτό ισχύει **μόνο για κινητά**_

Αυτόματα αποκλείει τη γραμμή κατάστασης και διευθύνσεων κατά τις συγκρίσεις. Αυτό αποτρέπει αποτυχίες στην ώρα, το WiFi ή την κατάσταση της μπαταρίας.

### `blockOutToolBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Μπορεί επίσης να χρησιμοποιηθεί για `checkElement`, `checkScreen()` και `checkFullPageScreen()`. Θα αντικαταστήσει τη ρύθμιση του plugin. Αυτό ισχύει **μόνο για κινητά**_

Αυτόματα αποκλείει τη γραμμή εργαλείων.

### `ignoreAntialiasing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Μπορεί επίσης να χρησιμοποιηθεί για `checkElement`, `checkScreen()` και `checkFullPageScreen()`. Θα αντικαταστήσει τη ρύθμιση του plugin_

Συγκρίνει εικόνες και απορρίπτει την εξομάλυνση.

### `ignoreColors`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Μπορεί επίσης να χρησιμοποιηθεί για `checkElement`, `checkScreen()` και `checkFullPageScreen()`. Θα αντικαταστήσει τη ρύθμιση του plugin_

Παρόλο που οι εικόνες είναι έγχρωμες, η σύγκριση θα συγκρίνει 2 ασπρόμαυρες εικόνες

### `ignoreLess`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Μπορεί επίσης να χρησιμοποιηθεί για `checkElement`, `checkScreen()` και `checkFullPageScreen()`. Θα αντικαταστήσει τη ρύθμιση του plugin_

Συγκρίνει εικόνες με `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Μπορεί επίσης να χρησιμοποιηθεί για `checkElement`, `checkScreen()` και `checkFullPageScreen()`. Θα αντικαταστήσει τη ρύθμιση του plugin_

Συγκρίνει εικόνες με `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `ignoreTransparentPixel`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Μπορεί επίσης να χρησιμοποιηθεί για `checkElement`, `checkScreen()` και `checkFullPageScreen()`. Θα αντικαταστήσει τη ρύθμιση του plugin_

Συγκρίνει εικόνες και θα αγνοήσει όλα τα pixel που έχουν κάποια διαφάνεια σε μία από τις εικόνες

### `rawMisMatchPercentage`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Μπορεί επίσης να χρησιμοποιηθεί για `checkElement`, `checkScreen()` και `checkFullPageScreen()`. Θα αντικαταστήσει τη ρύθμιση του plugin_

Αν είναι true, το ποσοστό επιστροφής θα είναι όπως `0.12345678`, η προεπιλογή είναι `0.12`

### `returnAllCompareData`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Μπορεί επίσης να χρησιμοποιηθεί για `checkElement`, `checkScreen()` και `checkFullPageScreen()`. Θα αντικαταστήσει τη ρύθμιση του plugin_

Αυτό θα επιστρέψει όλα τα δεδομένα σύγκρισης, όχι μόνο το ποσοστό αναντιστοιχίας

### `saveAboveTolerance`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no
-   **Remark:** _Μπορεί επίσης να χρησιμοποιηθεί για `checkElement`, `checkScreen()` και `checkFullPageScreen()`. Θα αντικαταστήσει τη ρύθμιση του plugin_

Επιτρεπτή τιμή του `misMatchPercentage` που αποτρέπει την αποθήκευση εικόνων με διαφορές

### `largeImageThreshold`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no
-   **Remark:** _Μπορεί επίσης να χρησιμοποιηθεί για `checkElement`, `checkScreen()` και `checkFullPageScreen()`. Θα αντικαταστήσει τη ρύθμιση του plugin_

Η σύγκριση μεγάλων εικόνων μπορεί να οδηγήσει σε προβλήματα απόδοσης.
Όταν παρέχετε έναν αριθμό για τον αριθμό των pixel εδώ (μεγαλύτερο από 0), ο αλγόριθμος σύγκρισης παραλείπει pixel όταν το πλάτος ή το ύψος της εικόνας είναι μεγαλύτερο από `largeImageThreshold` pixel.

### `scaleImagesToSameSize`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Μπορεί επίσης να χρησιμοποιηθεί για `checkElement`, `checkScreen()` και `checkFullPageScreen()`. Θα αντικαταστήσει τη ρύθμιση του plugin_

Κλιμακώνει 2 εικόνες στο ίδιο μέγεθος πριν από την εκτέλεση της σύγκρισης. Συνιστάται ιδιαίτερα να ενεργοποιήσετε το `ignoreAntialiasing` και το `ignoreAlpha`