---
id: compare-options
title: Comparar Opciones
---

Las opciones de comparación son opciones que influyen en la forma en que se ejecuta la comparación, por [ResembleJS](https://github.com/Huddle/Resemble.js).

:::info NOTA
Todas las opciones de comparación pueden utilizarse durante la instanciación del servicio o para cada `checkElement`, `checkScreen` y `checkFullPageScreen` individual. Si una opción de método tiene la misma clave que una opción que se ha establecido durante la instanciación del servicio, entonces la opción de comparación del método anulará el valor de la opción de comparación del servicio.
:::

### `ignoreAlpha`

-   **Tipo:** `boolean`
-   **Predeterminado:** `false`
-   **Obligatorio:** no
-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Anulará la configuración del plugin_

Compara imágenes y descarta el canal alfa.

### `blockOutSideBar`

-   **Tipo:** `boolean`
-   **Predeterminado:** `false`
-   **Obligatorio:** no
-   **Observación:** _Solo se puede usar para `checkScreen()`. Anulará la configuración del plugin. Esto es **solo para iPad**_

Bloquea automáticamente la barra lateral para iPads en modo horizontal durante las comparaciones. Esto evita fallos en el componente nativo de pestaña/privado/marcador.

### `blockOutStatusBar`

-   **Tipo:** `boolean`
-   **Predeterminado:** `false`
-   **Obligatorio:** no
-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Anulará la configuración del plugin. Esto es **solo para móviles**_

Bloquea automáticamente la barra de estado y la barra de direcciones durante las comparaciones. Esto evita fallos en la hora, el estado del wifi o la batería.

### `blockOutToolBar`

-   **Tipo:** `boolean`
-   **Predeterminado:** `false`
-   **Obligatorio:** no
-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Anulará la configuración del plugin. Esto es **solo para móviles**_

Bloquea automáticamente la barra de herramientas.

### `ignoreAntialiasing`

-   **Tipo:** `boolean`
-   **Predeterminado:** `false`
-   **Obligatorio:** no
-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Anulará la configuración del plugin_

Compara imágenes y descarta el anti-aliasing.

### `ignoreColors`

-   **Tipo:** `boolean`
-   **Predeterminado:** `false`
-   **Obligatorio:** no
-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Anulará la configuración del plugin_

Aunque las imágenes estén en color, la comparación comparará 2 imágenes en blanco y negro.

### `ignoreLess`

-   **Tipo:** `boolean`
-   **Predeterminado:** `false`
-   **Obligatorio:** no
-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Anulará la configuración del plugin_

Compara imágenes con `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Tipo:** `boolean`
-   **Predeterminado:** `false`
-   **Obligatorio:** no
-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Anulará la configuración del plugin_

Compara imágenes con `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `ignoreTransparentPixel`

-   **Tipo:** `boolean`
-   **Predeterminado:** `false`
-   **Obligatorio:** no
-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Anulará la configuración del plugin_

Compara imágenes e ignorará todos los píxeles que tengan alguna transparencia en una de las imágenes.

### `rawMisMatchPercentage`

-   **Tipo:** `boolean`
-   **Predeterminado:** `false`
-   **Obligatorio:** no
-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Anulará la configuración del plugin_

Si es verdadero, el porcentaje de retorno será como `0.12345678`, por defecto es `0.12`

### `returnAllCompareData`

-   **Tipo:** `boolean`
-   **Predeterminado:** `false`
-   **Obligatorio:** no
-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Anulará la configuración del plugin_

Esto devolverá todos los datos de comparación, no solo el porcentaje de discrepancia.

### `saveAboveTolerance`

-   **Tipo:** `number`
-   **Predeterminado:** `0`
-   **Obligatorio:** no
-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Anulará la configuración del plugin_

Valor permitido de `misMatchPercentage` que evita guardar imágenes con diferencias.

### `largeImageThreshold`

-   **Tipo:** `number`
-   **Predeterminado:** `0`
-   **Obligatorio:** no
-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Anulará la configuración del plugin_

Comparar imágenes grandes puede provocar problemas de rendimiento.
Al proporcionar un número para la cantidad de píxeles aquí (mayor que 0), el algoritmo de comparación omite píxeles cuando el ancho o alto de la imagen es mayor que `largeImageThreshold` píxeles.

### `scaleImagesToSameSize`

-   **Tipo:** `boolean`
-   **Predeterminado:** `false`
-   **Obligatorio:** no
-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Anulará la configuración del plugin_

Escala 2 imágenes al mismo tamaño antes de la ejecución de la comparación. Se recomienda encarecidamente habilitar `ignoreAntialiasing` e `ignoreAlpha`