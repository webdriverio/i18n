---
id: compare-options
title: Opciones de comparación
description: "Ajusta cómo se comparan las capturas de pantalla con las opciones de sensibilidad visual, pixelmatch, bloqueo de áreas en móviles e informes del servicio visual."
---

Las opciones de comparación son opciones que influyen en la forma en que se ejecuta la comparación.

:::info NOTA
Todas las opciones de comparación se pueden usar durante la instanciación del servicio o para cada `checkElement`, `checkScreen` y `checkFullPageScreen` individual. Si una opción de método tiene la misma clave que una opción establecida durante la instanciación del servicio, la opción de comparación del método sobrescribirá el valor de la opción de comparación del servicio.
:::

## Sensibilidad visual

---

:::info Historial de versiones de las opciones `ignore*`
Los preajustes `ignore*` cambiaron de comportamiento una vez, como un cambio incompatible, cuando el motor de comparación pasó de ResembleJS a Pixelmatch:

| Versión | Motor | Notas |
| --- | --- | --- |
| v9 e inferiores | ResembleJS | Semántica original de `ignore*` (basada en RGB/brillo, con el orden de preajustes propio de resemble). |
| v10 y superiores | Pixelmatch | Los preajustes `ignore*` se corresponden con ajustes de umbral/AA de pixelmatch. Los valores predeterminados y el comportamiento actuales se documentan para cada opción a continuación; las nuevas funcionalidades/correcciones posteriores se indican con una nota "Desde" en la opción correspondiente. |
| v11 y superiores | Pixelmatch 8 | Los colores se comparan en el espacio de color OKLab con la distancia HyAB (antes: YIQ). La escala del umbral y los preajustes `ignore*` no cambiaron, pero los porcentajes de discrepancia pueden diferir ligeramente respecto a v10. |

:::

**Orden "el último gana":** cuando se habilita más de un indicador `ignore*` al mismo tiempo, solo se aplica realmente un preajuste, siguiendo este orden (el posterior gana): `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`. Se registra una advertencia indicando qué preajuste ganó.

### `ignoreColors`

<Option type="boolean" default="false" required="no">

-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Sobrescribirá la configuración del plugin_
-   **Desde:** `v10.1.0`: comparación solo de brillo usando los pesos de luminancia de resemble (`0.3/0.59/0.11`).

Compara solo el brillo, ignorando las diferencias de tono/color. Preajuste: umbral estricto (~16/255), el antialiasing no se perdona.

**Úsalo cuando** se espera que el color en sí varíe (p. ej., interfaces con temas, imágenes que cambian de color según el entorno), pero aun así quieres detectar cambios de diseño o de brillo.

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="no">

-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Sobrescribirá la configuración del plugin_
-   **Desde:** `v10.1.0`: aplica su propia regla de umbral/AA de forma independiente de otros indicadores `ignore*`.

Compara imágenes y descarta las diferencias del canal alfa. Preajuste: umbral estricto (~16/255), el antialiasing no se perdona.

**Úsalo cuando** el renderizado de transparencia/opacidad sea inestable (p. ej., superposiciones, elementos semitransparentes), pero los colores reales de los píxeles subyacentes importen.

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="no">

-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Sobrescribirá la configuración del plugin_
-   **Desde:** `v10`: el valor predeterminado cambió a `true` (era `false` en v9 e inferiores).

Perdona los píxeles con antialiasing durante la comparación (umbral relajado ~32/255). Este es el único preajuste que perdona el antialiasing, y está habilitado por defecto para que el ruido de renderizado de subpíxeles no haga fallar las comparaciones de entrada. Establécelo en `false` para una comparación estricta en la que los píxeles con antialiasing deban contar como discrepancias.

**Úsalo para** resolver la fuente más común de inestabilidad en las pruebas visuales: bordes de texto y formas que se renderizan con un antialiasing ligeramente distinto entre máquinas/navegadores aunque nada haya cambiado realmente.

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="no">

-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Sobrescribirá la configuración del plugin_
-   **Desde:** `v10.1.0`: aplica su propia regla de umbral/AA de forma independiente de otros indicadores `ignore*`.

Compara imágenes usando una tolerancia RGB relajada (~16/255 por canal en el espacio YIQ). Preajuste: umbral estricto, el antialiasing no se perdona.

**Úsalo cuando** quieras un poco de margen para el ruido de renderizado menor (artefactos de compresión tipo JPEG, ligero redondeo de color) sin perdonar el antialiasing.

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="no">

-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Sobrescribirá la configuración del plugin_
-   **Desde:** `v10.1.0`: aplica su propia regla de umbral/AA de forma independiente de otros indicadores `ignore*`.

Usa tolerancia cero: cualquier diferencia de píxel cuenta como discrepancia, incluido el antialiasing.

**Úsalo cuando** necesites una prueba perfecta a nivel de píxel de que no ha cambiado absolutamente nada, p. ej., para verificar que una corrección no introdujo ninguna regresión, por pequeña que sea.

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="no">

-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Sobrescribirá la configuración del plugin_

Escala 2 imágenes al mismo tamaño antes de ejecutar la comparación. Se recomienda encarecidamente habilitar `ignoreAntialiasing` e `ignoreAlpha`

</Option>
## Control directo de pixelmatch

---

:::info Añadido en v10.1.0
`compareOptions.pixelmatch` no tiene equivalente en v9 (ResembleJS). Es una forma totalmente nueva de controlar el motor de comparación directamente, en lugar de usar un preajuste `ignore*`.
:::

### `compareOptions.pixelmatch`

<Option type="object" default="undefined" required="no">

-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Sobrescribirá la configuración del plugin para ese método específico_
-   **Añadido en:** `v10.1.0`

Pasa la configuración directamente a [pixelmatch](https://github.com/mapbox/pixelmatch) en lugar de usar un preajuste `ignore*`. **Úsalo cuando los cinco preajustes `ignore*` sean demasiado generales:** necesitas un valor de umbral específico que los preajustes no ofrecen, o una imagen de diferencias que sea realmente legible en tus informes/salida de CI en lugar del resaltado magenta predeterminado.

:::warning Mutuamente excluyentes dentro del mismo objeto de opciones
Poner cualquier clave `ignore*` y `pixelmatch` en el **mismo** objeto de opciones lanza `CompareOptionsConflictError`, incluso cuando el valor de `ignore*` es `false` (consulta el ejemplo no válido más abajo). Elige un modo por objeto: preajustes `ignore*` o `pixelmatch`, nunca ambos.

Esto solo se aplica dentro de un mismo objeto. La configuración del servicio y las opciones de una llamada a un método son objetos separados, por lo que una llamada `check*` **sí puede** usar un modo diferente al de la configuración del servicio; por ejemplo, el servicio usa preajustes `ignore*` pero una llamada pasa `pixelmatch` en su lugar (o viceversa). En ese caso no hay error, solo se registra una advertencia que indica el cambio de modo de comparación.
:::

| Campo | Tipo | Predeterminado | Para qué sirve |
| --- | --- | --- | --- |
| `threshold` | `number` | `0.1` | Sensibilidad desde 0 (cualquier diferencia de píxel falla) hasta 1 (casi nada falla). Úsalo para ajustar un valor de sensibilidad exacto en lugar de elegir el preajuste `ignore*` más cercano. |
| `includeAA` | `boolean` | `false` | `true` cuenta los píxeles de borde con antialiasing como discrepancias; `false` los perdona. Desactívalo si las diferencias de renderizado en los bordes de fuentes/formas causan fallos inestables. |
| `diffColor` | `[number, number, number]` | `[255, 0, 255]` (magenta) | Color RGB para los píxeles discrepantes en la imagen de diferencias. Cámbialo si el magenta se confunde con tu interfaz (p. ej., un tema rosa/morado) y las discrepancias son difíciles de detectar. |
| `aaColor` | `[number, number, number]` | `[255, 0, 255]` (magenta) | Color RGB para los píxeles con antialiasing, mantenido visualmente separado de las discrepancias reales para que puedas distinguir de un vistazo el "ruido de renderizado" de un "error real". |
| `diffColorAlt` | `[number, number, number]` | `[255, 0, 255]` (magenta) | Color RGB para los píxeles que se añadieron o eliminaron (no solo recoloreados), útil para distinguir desplazamientos de diseño frente a cambios de color. |
| `alpha` | `number` | `0.1` | Opacidad de la superposición de diferencias sobre la captura de pantalla real. Auméntala para que las diferencias destaquen más en los informes; redúcela para seguir viendo claramente la interfaz subyacente. No está relacionado con el preajuste `ignoreAlpha`. |
| `diffMask` | `boolean` | `false` | Establécelo en `true` para generar solo la diferencia en bruto (fondo transparente) en lugar de la diferencia dibujada sobre tu captura de pantalla, útil para crear tu propio visor/informe de diferencias personalizado. |
| `checkerboard` | `boolean` | `true` | Controla cómo se renderizan los píxeles semitransparentes en la imagen de diferencias. Desactívalo si el patrón de tablero de ajedrez se confunde fácilmente con contenido real en tus capturas de pantalla. |

**Configuración del servicio:**

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['visual', {
            compareOptions: {
                pixelmatch: {
                    threshold: 0.063,
                    includeAA: true,
                },
            },
        }],
    ],
}
```

**Sobrescritura en el método cuando el servicio usa preajustes `ignore*`:**

```js
await browser.checkScreen('homepage', {
    pixelmatch: { threshold: 0.05 },
})
```

**Sobrescritura en el método cuando el servicio usa `pixelmatch`:**

```js
await browser.checkScreen('homepage', {
    ignoreLess: true,
})
```

**No válido: lanza `CompareOptionsConflictError`**

```js
compareOptions: {
    ignoreLess: false,
    pixelmatch: { threshold: 0.063 },
}
```

Consulta la [documentación de pixelmatch](https://github.com/mapbox/pixelmatch) para conocer la semántica completa de las opciones.

</Option>
## Bloqueo de áreas en móviles

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="no">

-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Sobrescribirá la configuración del plugin. Esto es **solo para móviles**_

Bloquea automáticamente la barra de estado y la barra de direcciones durante las comparaciones. Esto evita fallos debidos a la hora, el wifi o el estado de la batería.

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="no">

-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Sobrescribirá la configuración del plugin. Esto es **solo para móviles**_

Bloquea automáticamente la barra de herramientas.

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="no">

-   **Observación:** _Solo se puede usar para `checkScreen()`. Sobrescribirá la configuración del plugin. Esto es **solo para iPad**_

Bloquea automáticamente la barra lateral en iPads en modo horizontal durante las comparaciones. Esto evita fallos en el componente nativo de pestañas/privado/marcadores.

</Option>
## Resultados e informes

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="no">

-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Sobrescribirá la configuración del plugin_

Si es true, el porcentaje devuelto será como `0.12345678`; el valor predeterminado es `0.12`

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="no">

-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Sobrescribirá la configuración del plugin_

Esto devolverá todos los datos de la comparación, no solo el porcentaje de discrepancia

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="no">

-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Sobrescribirá la configuración del plugin_

Valor permitido de `misMatchPercentage` que evita guardar imágenes con diferencias

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="no">

-   **Observación:** _También se puede usar para `checkElement`, `checkScreen()` y `checkFullPageScreen()`. Solo es relevante cuando [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles) está habilitado._

La proximidad en píxeles utilizada para agrupar los píxeles de diferencia en los informes JSON. Los valores más altos agrupan más píxeles en menos cuadros delimitadores; los valores más bajos producen cuadros más precisos pero más numerosos.

</Option>