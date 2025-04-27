---
id: compare-options
title: Options de comparaison
---

Les options de comparaison sont des options qui influencent la façon dont la comparaison, par [ResembleJS](https://github.com/Huddle/Resemble.js), est exécutée.

:::info REMARQUE
Toutes les options de comparaison peuvent être utilisées lors de l'instanciation du service ou pour chaque `checkElement`, `checkScreen` et `checkFullPageScreen` individuel. Si une option de méthode a la même clé qu'une option définie lors de l'instanciation du service, alors l'option de comparaison de la méthode remplacera la valeur de l'option de comparaison du service.
:::

### `ignoreAlpha`

-   **Type:** `boolean`
-   **Défaut:** `false`
-   **Obligatoire:** non
-   **Remarque:** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_

Compare les images et ignore la transparence (alpha).

### `blockOutSideBar`

-   **Type:** `boolean`
-   **Défaut:** `false`
-   **Obligatoire:** non
-   **Remarque:** _Peut uniquement être utilisé pour `checkScreen()`. Cela remplacera le paramètre du plugin. Ceci est **uniquement pour iPad**_

Bloque automatiquement la barre latérale pour les iPads en mode paysage pendant les comparaisons. Cela évite les échecs sur le composant natif onglet/privé/favori.

### `blockOutStatusBar`

-   **Type:** `boolean`
-   **Défaut:** `false`
-   **Obligatoire:** non
-   **Remarque:** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin. Ceci est **uniquement pour Mobile**_

Bloque automatiquement la barre d'état et la barre d'adresse pendant les comparaisons. Cela évite les échecs liés à l'heure, au Wi-Fi ou à l'état de la batterie.

### `blockOutToolBar`

-   **Type:** `boolean`
-   **Défaut:** `false`
-   **Obligatoire:** non
-   **Remarque:** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin. Ceci est **uniquement pour Mobile**_

Bloque automatiquement la barre d'outils.

### `ignoreAntialiasing`

-   **Type:** `boolean`
-   **Défaut:** `false`
-   **Obligatoire:** non
-   **Remarque:** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_

Compare les images et ignore l'anti-crénelage.

### `ignoreColors`

-   **Type:** `boolean`
-   **Défaut:** `false`
-   **Obligatoire:** non
-   **Remarque:** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_

Même si les images sont en couleur, la comparaison comparera 2 images en noir et blanc.

### `ignoreLess`

-   **Type:** `boolean`
-   **Défaut:** `false`
-   **Obligatoire:** non
-   **Remarque:** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_

Compare les images avec `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Type:** `boolean`
-   **Défaut:** `false`
-   **Obligatoire:** non
-   **Remarque:** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_

Compare les images avec `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `ignoreTransparentPixel`

-   **Type:** `boolean`
-   **Défaut:** `false`
-   **Obligatoire:** non
-   **Remarque:** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_

Compare les images et ignore tous les pixels qui ont une certaine transparence dans l'une des images.

### `rawMisMatchPercentage`

-   **Type:** `boolean`
-   **Défaut:** `false`
-   **Obligatoire:** non
-   **Remarque:** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_

Si vrai, le pourcentage retourné sera comme `0.12345678`, par défaut c'est `0.12`

### `returnAllCompareData`

-   **Type:** `boolean`
-   **Défaut:** `false`
-   **Obligatoire:** non
-   **Remarque:** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_

Cela retournera toutes les données de comparaison, pas seulement le pourcentage de différence.

### `saveAboveTolerance`

-   **Type:** `number`
-   **Défaut:** `0`
-   **Obligatoire:** non
-   **Remarque:** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_

Valeur admissible de `misMatchPercentage` qui empêche la sauvegarde des images présentant des différences.

### `largeImageThreshold`

-   **Type:** `number`
-   **Défaut:** `0`
-   **Obligatoire:** non
-   **Remarque:** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_

La comparaison de grandes images peut entraîner des problèmes de performance.
Lorsqu'un nombre de pixels est fourni ici (supérieur à 0), l'algorithme de comparaison ignore des pixels lorsque la largeur ou la hauteur de l'image est supérieure à `largeImageThreshold` pixels.

### `scaleImagesToSameSize`

-   **Type:** `boolean`
-   **Défaut:** `false`
-   **Obligatoire:** non
-   **Remarque:** _Peut également être utilisé pour `checkElement`, `checkScreen()` et `checkFullPageScreen()`. Cela remplacera le paramètre du plugin_

Redimensionne 2 images à la même taille avant l'exécution de la comparaison. Il est fortement recommandé d'activer `ignoreAntialiasing` et `ignoreAlpha`