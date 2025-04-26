---
id: compare-options
title: Vergleichsoptionen
---

Vergleichsoptionen sind Optionen, die die Art und Weise beeinflussen, wie der Vergleich durch [ResembleJS](https://github.com/Huddle/Resemble.js) ausgeführt wird.

:::info HINWEIS
Alle Vergleichsoptionen können während der Service-Instanziierung oder für jeden einzelnen `checkElement`, `checkScreen` und `checkFullPageScreen` verwendet werden. Wenn eine Methodenoption den gleichen Schlüssel hat wie eine Option, die während der Instanziierung des Dienstes festgelegt wurde, dann überschreibt die Methoden-Vergleichsoption den Wert der Service-Vergleichsoption.
:::

### `ignoreAlpha`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Vergleicht Bilder und verwirft Alpha.

### `blockOutSideBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can only be used for `checkScreen()`. It will override the plugin setting. This is **iPad only**_

Blockiert automatisch die Seitenleiste für iPads im Querformat während der Vergleiche. Dies verhindert Fehler bei der nativen Tab/Privat/Lesezeichen-Komponente.

### `blockOutStatusBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting. This is **Mobile only**_

Blockiert automatisch die Status- und Adressleiste während der Vergleiche. Dies verhindert Fehler bei Zeit-, WLAN- oder Batteriestatus.

### `blockOutToolBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting. This is **Mobile only**_

Blockiert automatisch die Werkzeugleiste.

### `ignoreAntialiasing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Vergleicht Bilder und verwirft Anti-Aliasing.

### `ignoreColors`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Auch wenn die Bilder farbig sind, vergleicht der Vergleich 2 Schwarz-Weiß-Bilder.

### `ignoreLess`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Vergleicht Bilder mit `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`.

### `ignoreNothing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Vergleicht Bilder mit `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`.

### `ignoreTransparentPixel`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Vergleicht Bilder und ignoriert alle Pixel, die in einem der Bilder eine gewisse Transparenz aufweisen.

### `rawMisMatchPercentage`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Wenn true, wird der Rückgabeprozentsatz wie `0.12345678` sein, Standard ist `0.12`.

### `returnAllCompareData`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Dies gibt alle Vergleichsdaten zurück, nicht nur den Mismatch-Prozentsatz.

### `saveAboveTolerance`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Zulässiger Wert von `misMatchPercentage`, der das Speichern von Bildern mit Unterschieden verhindert.

### `largeImageThreshold`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Der Vergleich großer Bilder kann zu Leistungsproblemen führen.
Wenn hier eine Zahl für die Anzahl der Pixel angegeben wird (höher als 0), überspringt der Vergleichsalgorithmus Pixel, wenn die Bildbreite oder -höhe größer als `largeImageThreshold` Pixel ist.

### `scaleImagesToSameSize`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Skaliert 2 Bilder auf die gleiche Größe vor der Ausführung des Vergleichs. Es wird dringend empfohlen, `ignoreAntialiasing` und `ignoreAlpha` zu aktivieren.