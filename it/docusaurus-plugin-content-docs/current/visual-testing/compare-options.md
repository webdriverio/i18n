---
id: compare-options
title: Opzioni di Confronto
---

Le opzioni di confronto sono opzioni che influenzano il modo in cui viene eseguito il confronto da parte di [ResembleJS](https://github.com/Huddle/Resemble.js).

:::info NOTA
Tutte le opzioni di confronto possono essere utilizzate durante l'istanziazione del servizio o per ogni singolo `checkElement`, `checkScreen` e `checkFullPageScreen`. Se un'opzione di metodo ha la stessa chiave di un'opzione impostata durante l'istanziazione del servizio, allora l'opzione di confronto del metodo sovrascriverà il valore dell'opzione di confronto del servizio.
:::

### `ignoreAlpha`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Può essere utilizzato anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_

Confronta le immagini e scarta l'alfa.

### `blockOutSideBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Può essere utilizzato solo per `checkScreen()`. Sovrascriverà l'impostazione del plugin. Questo è **solo per iPad**_

Blocca automaticamente la barra laterale per iPad in modalità orizzontale durante i confronti. Questo previene errori sul componente nativo tab/privato/segnalibro.

### `blockOutStatusBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Può essere utilizzato anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin. Questo è **solo per Mobile**_

Blocca automaticamente la barra di stato e la barra degli indirizzi durante i confronti. Questo previene errori su ora, wifi o stato della batteria.

### `blockOutToolBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Può essere utilizzato anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin. Questo è **solo per Mobile**_

Blocca automaticamente la barra degli strumenti.

### `ignoreAntialiasing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Può essere utilizzato anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_

Confronta le immagini e scarta l'anti-aliasing.

### `ignoreColors`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Può essere utilizzato anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_

Anche se le immagini sono a colori, il confronto confronterà 2 immagini in bianco e nero.

### `ignoreLess`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Può essere utilizzato anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_

Confronta le immagini utilizzando `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Può essere utilizzato anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_

Confronta le immagini utilizzando `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `ignoreTransparentPixel`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Può essere utilizzato anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_

Confronta le immagini e ignora tutti i pixel che hanno una certa trasparenza in una delle immagini.

### `rawMisMatchPercentage`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Può essere utilizzato anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_

Se true, la percentuale restituita sarà come `0.12345678`, il valore predefinito è `0.12`

### `returnAllCompareData`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Può essere utilizzato anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_

Questo restituirà tutti i dati di confronto, non solo la percentuale di mancata corrispondenza.

### `saveAboveTolerance`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no
-   **Remark:** _Può essere utilizzato anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_

Valore consentito di `misMatchPercentage` che impedisce il salvataggio di immagini con differenze.

### `largeImageThreshold`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no
-   **Remark:** _Può essere utilizzato anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_

Il confronto di immagini di grandi dimensioni può portare a problemi di prestazioni.
Quando si fornisce un numero per il numero di pixel qui (maggiore di 0), l'algoritmo di confronto salta i pixel quando la larghezza o l'altezza dell'immagine è maggiore di `largeImageThreshold` pixel.

### `scaleImagesToSameSize`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Può essere utilizzato anche per `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Sovrascriverà l'impostazione del plugin_

Scala 2 immagini alla stessa dimensione prima dell'esecuzione del confronto. È altamente consigliato abilitare `ignoreAntialiasing` e `ignoreAlpha`