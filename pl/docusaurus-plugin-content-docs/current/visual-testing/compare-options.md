---
id: compare-options
title: Opcje Porównywania
---

Opcje porównywania to ustawienia, które wpływają na sposób wykonywania porównania przez [ResembleJS](https://github.com/Huddle/Resemble.js).

:::info UWAGA
Wszystkie opcje porównywania mogą być używane podczas tworzenia instancji usługi lub dla każdego pojedynczego `checkElement`, `checkScreen` i `checkFullPageScreen`. Jeśli opcja metody ma ten sam klucz co opcja ustawiona podczas tworzenia instancji usługi, wówczas opcja porównawcza metody nadpisze wartość opcji porównawczej usługi.
:::

### `ignoreAlpha`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie
-   **Uwaga:** _Może być również używane dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie wtyczki_

Porównuje obrazy i ignoruje kanał alfa.

### `blockOutSideBar`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie
-   **Uwaga:** _Może być używane tylko dla `checkScreen()`. Nadpisze ustawienie wtyczki. To jest **tylko dla iPada**_

Automatycznie blokuje pasek boczny dla iPadów w trybie poziomym podczas porównań. Zapobiega to niepowodzeniom w natywnym komponencie kart/prywatnym/zakładek.

### `blockOutStatusBar`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie
-   **Uwaga:** _Może być również używane dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie wtyczki. To jest **tylko dla urządzeń mobilnych**_

Automatycznie blokuje pasek stanu i pasek adresu podczas porównań. Zapobiega to niepowodzeniom z powodu godziny, stanu WiFi lub baterii.

### `blockOutToolBar`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie
-   **Uwaga:** _Może być również używane dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie wtyczki. To jest **tylko dla urządzeń mobilnych**_

Automatycznie blokuje pasek narzędzi.

### `ignoreAntialiasing`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie
-   **Uwaga:** _Może być również używane dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie wtyczki_

Porównuje obrazy i ignoruje antyaliasing.

### `ignoreColors`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie
-   **Uwaga:** _Może być również używane dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie wtyczki_

Nawet jeśli obrazy są kolorowe, porównanie będzie zestawiać 2 czarno-białe obrazy.

### `ignoreLess`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie
-   **Uwaga:** _Może być również używane dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie wtyczki_

Porównuje obrazy z parametrami `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie
-   **Uwaga:** _Może być również używane dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie wtyczki_

Porównuje obrazy z parametrami `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `ignoreTransparentPixel`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie
-   **Uwaga:** _Może być również używane dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie wtyczki_

Porównuje obrazy i ignoruje wszystkie piksele, które mają jakąś przezroczystość w jednym z obrazów.

### `rawMisMatchPercentage`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie
-   **Uwaga:** _Może być również używane dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie wtyczki_

Jeśli true, zwrócony procent będzie miał format `0.12345678`, domyślnie jest `0.12`

### `returnAllCompareData`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie
-   **Uwaga:** _Może być również używane dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie wtyczki_

Zwróci wszystkie dane porównawcze, nie tylko procent niezgodności.

### `saveAboveTolerance`

-   **Typ:** `number`
-   **Domyślnie:** `0`
-   **Obowiązkowe:** nie
-   **Uwaga:** _Może być również używane dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie wtyczki_

Dopuszczalna wartość `misMatchPercentage`, która zapobiega zapisywaniu obrazów z różnicami.

### `largeImageThreshold`

-   **Typ:** `number`
-   **Domyślnie:** `0`
-   **Obowiązkowe:** nie
-   **Uwaga:** _Może być również używane dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie wtyczki_

Porównywanie dużych obrazów może prowadzić do problemów z wydajnością.
Gdy podana jest liczba pikseli (większa niż 0), algorytm porównawczy pomija piksele, gdy szerokość lub wysokość obrazu jest większa niż `largeImageThreshold` pikseli.

### `scaleImagesToSameSize`

-   **Typ:** `boolean`
-   **Domyślnie:** `false`
-   **Obowiązkowe:** nie
-   **Uwaga:** _Może być również używane dla `checkElement`, `checkScreen()` i `checkFullPageScreen()`. Nadpisze ustawienie wtyczki_

Skaluje 2 obrazy do tego samego rozmiaru przed wykonaniem porównania. Zdecydowanie zalecane jest włączenie `ignoreAntialiasing` i `ignoreAlpha`