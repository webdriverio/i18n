---
id: method-options
title: Opciones de métodos
description: "Configura opciones de guardado, comparación y carpetas por método para los métodos de pruebas visuales, que sobrescriben las opciones a nivel de servicio."
---

Las opciones de métodos son las opciones que se pueden establecer por [método](./methods). Si la opción tiene la misma clave que una opción que se ha establecido durante la instanciación del plugin, esta opción del método sobrescribirá el valor de la opción del plugin.

:::info NOTA

-   Todas las opciones de las [Opciones de guardado](#save-options) se pueden usar para los métodos de [Comparación](#compare-check-options)
-   Todas las opciones de comparación se pueden usar durante la instanciación del servicio __o__ para cada método de verificación individual. Si una opción de método tiene la misma clave que una opción que se ha establecido durante la instanciación del servicio, entonces la opción de comparación del método sobrescribirá el valor de la opción de comparación del servicio.
- Todas las opciones se pueden usar para los siguientes contextos de aplicación, salvo que se indique lo contrario:
    - Web
    - Hybrid App
    - Native App
- Los ejemplos siguientes usan los métodos `save*`, pero también se pueden usar con los métodos `check*`

:::

# Opciones de guardado

## Visualización y renderizado

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No">

- **Se usa con:** Todos los [métodos](./methods)
- **Contextos de aplicación soportados:** Web, Hybrid App (Webview)

Oculta la(s) barra(s) de desplazamiento en la aplicación. Si se establece en true, todas las barras de desplazamiento se desactivarán antes de tomar una captura de pantalla. Por defecto está en `true` para evitar problemas adicionales.

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

- **Se usa con:** Todos los [métodos](./methods)
- **Contextos de aplicación soportados:** Web, Hybrid App (Webview)

Activa/desactiva el "parpadeo" del cursor en todos los `input`, `textarea` y `[contenteditable]` de la aplicación. Si se establece en `true`, el cursor se establecerá como `transparent` antes de tomar una captura de pantalla
y se restablecerá al terminar.

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

- **Se usa con:** Todos los [métodos](./methods)
- **Contextos de aplicación soportados:** Web, Hybrid App (Webview)

Activa/desactiva todas las animaciones CSS en la aplicación. Si se establece en `true`, todas las animaciones se desactivarán antes de tomar una captura de pantalla
y se restablecerán al terminar

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

- **Se usa con:** Todos los [métodos](./methods)
- **Contextos de aplicación soportados:** Web, Hybrid App (Webview)

Esto ocultará todo el texto de una página para que solo se use el diseño (layout) en la comparación. El ocultamiento se realiza añadiendo el estilo `'color': 'transparent !important'` a __cada__ elemento.

Para ver la salida, consulta [Salida de pruebas](./test-output#enablelayouttesting).

:::info
Al usar esta opción, cada elemento que contenga texto (no solo `p, h1, h2, h3, h4, h5, h6, span, a, li`, sino también `div|button|..`) recibirá esta propiedad. __No__ hay ninguna opción para personalizar esto.
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

- **Se usa con:** Todos los [métodos](./methods)
- **Contextos de aplicación soportados:** Web, Hybrid App (Webview)

Usa esta opción para volver al método de captura de pantalla "antiguo" basado en el protocolo W3C-WebDriver. Esto puede ser útil si tus pruebas dependen de imágenes de referencia existentes o si se ejecutan en entornos que no soportan completamente las capturas más nuevas basadas en BiDi.
Ten en cuenta que activar esto puede producir capturas de pantalla con una resolución o calidad ligeramente diferente.

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

- **Se usa con:** Todos los [métodos](./methods)
- **Contextos de aplicación soportados:** Web, Hybrid App (Webview)

Relleno en píxeles del dispositivo añadido a cada lado de las regiones ignoradas, haciendo que cada región sea 2× este valor más ancha y más alta. Esto ayuda a evitar diferencias de 1 px en los bordes que pueden aparecer en pantallas con DPR alto o con el protocolo de capturas BiDi. Establécelo en `0` para desactivarlo.

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

- **Se usa con:** Todos los [métodos](./methods)
- **Contextos de aplicación soportados:** Web, Hybrid App (Webview)

Las fuentes, incluidas las de terceros, pueden cargarse de forma síncrona o asíncrona. La carga asíncrona significa que las fuentes pueden cargarse después de que WebdriverIO determine que una página se ha cargado por completo. Para evitar problemas de renderizado de fuentes, este módulo, por defecto, esperará a que se carguen todas las fuentes antes de tomar una captura de pantalla.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

</Option>
## Visibilidad de elementos

---

### `hideElements`

<Option type="array" required="No">

- **Se usa con:** Todos los [métodos](./methods)
- **Contextos de aplicación soportados:** Web, Hybrid App (Webview)

Este método puede ocultar 1 o varios elementos añadiéndoles la propiedad `visibility: hidden`, proporcionando un array de elementos.

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

- **Se usa con:** Todos los [métodos](./methods)
- **Contextos de aplicación soportados:** Web, Hybrid App (Webview)

Este método puede _eliminar_ 1 o varios elementos añadiéndoles la propiedad `display: none`, proporcionando un array de elementos.

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
## Específicas de elementos

---

### `resizeDimensions`

<Option type="object" default={`{ top: 0, right: 0, bottom: 0, left: 0}`} required="No">

- **Se usa con:** Solo para [`saveElement`](./methods#saveelement) o [`checkElement`](./methods#checkelement)
- **Contextos de aplicación soportados:** Web, Hybrid App (Webview), Native App

Un objeto que debe contener una cantidad de píxeles `top`, `right`, `bottom` y `left` con la que se agrandará el recorte del elemento.

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

- **Se usa con:** Solo para [`saveElement`](./methods#saveelement) o [`checkElement`](./methods#checkelement)
- **Contextos de aplicación soportados:** Web, Hybrid App (Webview)

Opción exclusiva de BiDi que controla qué origen de coordenadas se usa al capturar capturas de pantalla de elementos mediante el protocolo WebDriver BiDi.

- `'document'` _(por defecto)_: renderiza el diseño del documento. Funciona para cualquier posición del elemento, pero **no** captura capas compuestas (p. ej., barras de desplazamiento, superposiciones fixed/sticky, elementos con `will-change`).
- `'viewport'`: captura el fotograma compuesto tal como se pinta, incluidas las barras de desplazamiento y las superposiciones. Requiere que el elemento sea **completamente visible** en el viewport; lanza un error descriptivo cuando el elemento está fuera del viewport o es más grande que este.

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
## Específicas de página completa

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No">

- **Se usa con:** Solo para [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) o [`checkTabbablePage`](./methods#checktabbablepage)
- **Contextos de aplicación soportados:** Web, Hybrid App (Webview)

Cuando se establece en `true`, esta opción activa la **estrategia de desplazar y unir** (scroll-and-stitch) para capturar capturas de pantalla de página completa.
En lugar de usar las capacidades nativas de captura del navegador, desplaza la página manualmente y une varias capturas de pantalla.
Este método es especialmente útil para páginas con **contenido de carga diferida** (lazy-loaded) o diseños complejos que requieren desplazamiento para renderizarse por completo.

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

- **Se usa con:** Solo para [`saveFullPageScreen`](./methods#savefullpagescreen) o [`saveTabbablePage`](./methods#savetabbablepage)
- **Contextos de aplicación soportados:** Web, Hybrid App (Webview)

El tiempo de espera en milisegundos después de un desplazamiento. Esto puede ayudar a identificar páginas con carga diferida.

> **NOTA:** Esto solo funciona cuando `userBasedFullPageScreenshot` está establecido en `true`

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

- **Se usa con:** Solo para [`saveFullPageScreen`](./methods#savefullpagescreen) o [`saveTabbablePage`](./methods#savetabbablepage)
- **Contextos de aplicación soportados:** Web, Hybrid App (Webview)

Este método ocultará uno o varios elementos añadiéndoles la propiedad `visibility: hidden`, proporcionando un array de elementos.
Esto resulta útil cuando, por ejemplo, una página contiene elementos fijos (sticky) que se desplazan con la página al hacer scroll, pero que producen un efecto molesto cuando se hace una captura de pantalla de página completa

> **NOTA:** Esto solo funciona cuando `userBasedFullPageScreenshot` está establecido en `true`

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

# Opciones de comparación (verificación)

Las opciones de comparación son opciones que influyen en la forma en que se ejecuta la comparación.

</Option>
## Sensibilidad visual

---

:::info Historial de versiones de las opciones `ignore*`
Estos ajustes predefinidos cambiaron de comportamiento una vez, como un cambio incompatible, cuando el motor de comparación pasó de ResembleJS (v9 e inferiores) a Pixelmatch (v10 y superiores). Consulta la [tabla de historial de versiones](./compare-options#visual-sensitivity) en la página de Opciones de comparación para más detalles. Todo lo posterior a v10.0.0 se indica con una nota "Desde" en la opción correspondiente más abajo.
:::

**Orden de prioridad (gana el último):** cuando se activa más de una opción `ignore*` al mismo tiempo, solo se aplica un ajuste predefinido, siguiendo este orden (gana el posterior): `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`. A partir de `v10.1.0` se registra una advertencia indicando qué ajuste predefinido ganó.

### `ignoreColors`

<Option type="boolean" default="false" required="No">

- **Se usa con:** Todos los [métodos Check](./methods#check-methods)
- **Contextos de aplicación soportados:** Todos
- **Desde:** `v10.1.0`: comparación solo de brillo usando los pesos de luma de resemble (`0.3/0.59/0.11`).

Compara solo el brillo (pesos de luma de resemble `0.3/0.59/0.11`), ignorando las diferencias de tono/color. Úsalo cuando se espera que el color varíe, pero aun así quieres detectar cambios de diseño o de brillo.

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

- **Se usa con:** Todos los [métodos Check](./methods#check-methods)
- **Contextos de aplicación soportados:** Todos
- **Desde:** `v10.1.0`: aplica su propia regla de umbral/AA independientemente de otras opciones `ignore*`.

Compara imágenes y descarta las diferencias del canal alfa. Úsalo cuando el renderizado de transparencia/opacidad es inestable, pero los colores de los píxeles subyacentes importan.

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

- **Se usa con:** Todos los [métodos Check](./methods#check-methods)
- **Contextos de aplicación soportados:** Todos
- **Desde:** `v10`: el valor por defecto cambió a `true` (era `false` en v9 e inferiores).

Tolera los píxeles con antialiasing durante la comparación. Establécelo en `false` para una comparación estricta en la que los píxeles con antialiasing deban contar como discrepancias. Esto resuelve la fuente más común de inestabilidad en las pruebas visuales: los bordes de texto/formas que se renderizan con un antialiasing ligeramente diferente entre máquinas aunque nada haya cambiado.

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

- **Se usa con:** Todos los [métodos Check](./methods#check-methods)
- **Contextos de aplicación soportados:** Todos
- **Desde:** `v10.1.0`: aplica su propia regla de umbral/AA independientemente de otras opciones `ignore*`.

Compara imágenes usando una tolerancia RGB relajada (~16/255 por canal en el espacio YIQ). El antialiasing no se tolera. Úsalo para tener un pequeño margen frente al ruido de renderizado (artefactos de compresión, redondeo de color) sin tolerar el antialiasing.

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

- **Se usa con:** Todos los [métodos Check](./methods#check-methods)
- **Contextos de aplicación soportados:** Todos
- **Desde:** `v10.1.0`: aplica su propia regla de umbral/AA independientemente de otras opciones `ignore*`.

Usa tolerancia cero: cualquier diferencia de píxel cuenta como discrepancia, incluido el antialiasing. Úsalo cuando necesites una prueba perfecta a nivel de píxel de que no ha cambiado absolutamente nada.

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

- **Se usa con:** Todos los [métodos Check](./methods#check-methods)
- **Contextos de aplicación soportados:** Todos
- **Añadido en:** `v10.1.0`

Sobrescribe el modo de comparación para una única llamada `check*` con ajustes directos de [pixelmatch](https://github.com/mapbox/pixelmatch) (`threshold`, `includeAA`, `diffColor`, `aaColor`, `diffColorAlt`, `alpha`, `diffMask`, `checkerboard`), en lugar de un ajuste predefinido `ignore*`. Úsalo cuando los ajustes predefinidos sean demasiado generales para una prueba concreta, p. ej., si necesita su propio valor de umbral o un color de diferencia que realmente destaque en tu informe. Consulta [Control directo de pixelmatch](./compare-options#direct-pixelmatch-control) para la referencia completa de campos y qué resuelve cada uno.

No se puede combinar con opciones `ignore*` en el mismo objeto de opciones de la llamada: eso lanza `CompareOptionsConflictError`. Sin embargo, sí puede sobrescribir una configuración del servicio que use ajustes predefinidos `ignore*` (o viceversa); se registra una advertencia cuando una llamada a un método cambia el modo de comparación de esta manera.

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

- **Se usa con:** Todos los [métodos Check](./methods#check-methods)
- **Contextos de aplicación soportados:** Todos

Escala 2 imágenes al mismo tamaño antes de ejecutar la comparación. Se recomienda encarecidamente activar `ignoreAntialiasing` e `ignoreAlpha`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

</Option>
## Bloqueos en móvil

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="No">

- **Se usa con:** _Esto es **solo para móvil**_
- **Contextos de aplicación soportados:** Hybrid (parte nativa) y Native Apps

Bloquea automáticamente la barra de estado y la barra de direcciones durante las comparaciones. Esto evita fallos debidos a la hora, el wifi o el estado de la batería.

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

- **Se usa con:** _Esto es **solo para móvil**_
- **Contextos de aplicación soportados:** Hybrid (parte nativa) y Native Apps

Bloquea automáticamente la barra de herramientas.

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

- **Se usa con:** _Solo se puede usar con `checkScreen()`. Esto es **solo para iPad**_
- **Contextos de aplicación soportados:** Todos

Bloquea automáticamente la barra lateral en iPads en modo horizontal durante las comparaciones. Esto evita fallos en el componente nativo de pestañas/privado/marcadores.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

</Option>
## Gestión de regiones

---

### `blockOut`

<Option type="array" required="No">

- **Se usa con:** Todos los [métodos Check](./methods#check-methods)
- **Contextos de aplicación soportados:** Todos

Un array de áreas rectangulares que se bloquean antes de la comparación. Cada entrada debe ser un objeto con los valores `x`, `y`, `width` y `height` (en píxeles). Las áreas bloqueadas se pintan por encima antes de calcular la diferencia, evitando que esas regiones contribuyan al porcentaje de discrepancia.

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

- **Se usa con:** Solo con el método `checkScreen`, **NO** con el método `checkElement`
- **Contextos de aplicación soportados:** Native App

Este método bloqueará automáticamente elementos o un área de la pantalla basándose en un array de elementos o en un objeto de `x|y|width|height`.

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
## Resultados e informes

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="No">

- **Se usa con:** Todos los [métodos Check](./methods#check-methods)
- **Contextos de aplicación soportados:** Todos

Si es true, el porcentaje devuelto será como `0.12345678`; por defecto es `0.12`

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

- **Se usa con:** Todos los [métodos Check](./methods#check-methods)
- **Contextos de aplicación soportados:** Todos

Esto devolverá todos los datos de comparación, no solo el porcentaje de discrepancia; consulta también [Salida de consola](./test-output#console-output-1)

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

- **Se usa con:** Todos los [métodos Check](./methods#check-methods)
- **Contextos de aplicación soportados:** Todos

Valor permitido de `misMatchPercentage` que evita guardar imágenes con diferencias

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

- **Se usa con:** Todos los [métodos Check](./methods#check-methods)
- **Contextos de aplicación soportados:** Todos

La proximidad en píxeles utilizada para agrupar los píxeles de diferencia en los informes JSON. Los valores más altos agrupan más píxeles en menos cuadros delimitadores; los valores más bajos producen cuadros más precisos pero más numerosos. Solo es relevante cuando [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles) está activado.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        diffPixelBoundingBoxProximity: 10
    }
)
```

# Opciones de carpetas

---

La carpeta de referencia (baseline) y las carpetas de capturas de pantalla (actual, diff) son opciones que se pueden establecer durante la instanciación del plugin o en el método. Para establecer las opciones de carpetas en un método concreto, pasa las opciones de carpetas al objeto de opciones del método. Esto se puede usar para:

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

// Puedes usar esto para todos los métodos
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

</Option>
### `actualFolder`

<Option type="string" required="No" contexts="All">

Carpeta para la captura que se ha tomado en la prueba.

</Option>
### `baselineFolder`

<Option type="string" required="No" contexts="All">

Carpeta para la imagen de referencia que se utiliza para comparar.

</Option>
### `diffFolder`

<Option type="string" required="No" contexts="All">

Carpeta para la imagen de diferencias generada durante la comparación.

</Option>