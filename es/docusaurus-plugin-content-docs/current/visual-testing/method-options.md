---
id: method-options
title: Opciones de Métodos
---

Las opciones de métodos son las opciones que se pueden establecer por [método](./methods). Si la opción tiene la misma clave que una opción que se ha establecido durante la instanciación del plugin, esta opción de método anulará el valor de la opción del plugin.

## Opciones de Guardado

### `disableBlinkingCursor`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `false`
-   **Compatible con:** Web, Aplicación Híbrida (Webview)

Activar/Desactivar el "parpadeo" del cursor en todos los elementos `input`, `textarea`, `[contenteditable]` en la aplicación. Si se establece en `true`, el cursor se establecerá como `transparent` antes de tomar una captura de pantalla
y se restablecerá cuando termine

### `disableCSSAnimation`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `false`
-   **Compatible con:** Web, Aplicación Híbrida (Webview)

Activar/Desactivar todas las animaciones CSS en la aplicación. Si se establece en `true`, todas las animaciones se desactivarán antes de tomar una captura de pantalla
y se restablecerán cuando termine

### `enableLayoutTesting`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `false`
-   **Usado con:** Todos los [métodos](./methods)
-   **Compatible con:** Web

Esto ocultará todo el texto en una página para que solo se use el diseño para la comparación. La ocultación se realizará añadiendo el estilo `'color': 'transparent !important'` a __cada__ elemento.

Para la salida, consulte [Salida de Prueba](./test-output#enablelayouttesting)

:::info
Al usar esta bandera, cada elemento que contiene texto (no solo `p, h1, h2, h3, h4, h5, h6, span, a, li`, sino también `div|button|..`) recibirá esta propiedad. __No__ hay opción para personalizar esto.
:::

### `hideScrollBars`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `true`
-   **Usado con:** Todos los [métodos](./methods)
-   **Compatible con:** Web, Aplicación Híbrida (Webview)

Ocultar barra(s) de desplazamiento en la aplicación. Si se establece en true, todas las barras de desplazamiento se desactivarán antes de tomar una captura de pantalla. Esto está establecido por defecto en `true` para prevenir problemas adicionales.

### `hideElements`

-   **Tipo:** `array`
-   **Obligatorio:** no
-   **Usado con:** Todos los [métodos](./methods)
-   **Compatible con:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

Este método puede ocultar 1 o múltiples elementos añadiendo la propiedad `visibility: hidden` a ellos proporcionando un array de elementos.

### `removeElements`

-   **Tipo:** `array`
-   **Obligatorio:** no
-   **Usado con:** Todos los [métodos](./methods)
-   **Compatible con:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

Este método puede _eliminar_ 1 o múltiples elementos añadiendo la propiedad `display: none` a ellos proporcionando un array de elementos.

### `resizeDimensions`

-   **Tipo:** `object`
-   **Obligatorio:** no
-   **Valor predeterminado:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **Usado con:** Solo para [`saveElement`](./methods#saveelement) o [`checkElement`](./methods#checkelement)
-   **Compatible con:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

Un objeto que debe contener una cantidad de píxeles `top`, `right`, `bottom` y `left` que necesitan hacer que el recorte del elemento sea más grande.

### `fullPageScrollTimeout`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Valor predeterminado:** `1500`
-   **Usado con:** Solo para [`saveFullPageScreen`](./methods#savefullpagescreen) o [`saveTabbablePage`](./methods#savetabbablepage)
-   **Compatible con:** Web

El tiempo de espera en milisegundos después de un desplazamiento. Esto puede ayudar a identificar páginas con carga perezosa.

### `hideAfterFirstScroll`

-   **Tipo:** `array`
-   **Obligatorio:** no
-   **Usado con:** Solo para [`saveFullPageScreen`](./methods#savefullpagescreen) o [`saveTabbablePage`](./methods#savetabbablepage)
-   **Compatible con:** Web

Este método ocultará uno o varios elementos añadiendo la propiedad `visibility: hidden` a ellos proporcionando un array de elementos.
Esto será útil cuando una página, por ejemplo, tiene elementos fijos que se desplazarán con la página si la página se desplaza pero darán un efecto molesto cuando se realiza una captura de pantalla de página completa

### `waitForFontsLoaded`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `true`
-   **Usado con:** Todos los [métodos](./methods)
-   **Compatible con:** Web, Aplicación Híbrida (Webview)

Las fuentes, incluidas las fuentes de terceros, pueden cargarse de forma síncrona o asíncrona. La carga asíncrona significa que las fuentes podrían cargarse después de que WebdriverIO determine que una página se ha cargado completamente. Para evitar problemas de renderizado de fuentes, este módulo, por defecto, esperará a que todas las fuentes se carguen antes de tomar una captura de pantalla.

## Opciones de Comparación (Verificación)

Las opciones de comparación son opciones que influyen en la forma en que se ejecuta la comparación, por [ResembleJS](https://github.com/Huddle/Resemble.js).

:::info NOTA

-   Todas las opciones de [Opciones de Guardado](#opciones-de-guardado) pueden usarse para los métodos de Comparación
-   Todas las opciones de comparación pueden usarse durante la instanciación del servicio __o__ para cada método de verificación individual. Si una opción de método tiene la misma clave que una opción que se ha establecido durante la instanciación del servicio, entonces la opción de comparación del método anulará el valor de la opción de comparación del servicio.
- Todas las opciones pueden usarse para:
    - Web
    - Aplicación Híbrida
    - Aplicación Nativa

:::

### `ignoreAlpha`

-   **Tipo:** `boolean`
-   **Valor predeterminado:** `false`
-   **Obligatorio:** no

Comparar imágenes y descartar alfa.

### `blockOutSideBar`

-   **Tipo:** `boolean`
-   **Valor predeterminado:** `true`
-   **Obligatorio:** no
-   **Observación:** _Solo puede usarse para `checkScreen()`. Esto es **solo para iPad**_

Bloquear automáticamente la barra lateral para iPads en modo horizontal durante las comparaciones. Esto evita fallos en el componente nativo de pestaña/privado/marcador.

### `blockOutStatusBar`

-   **Tipo:** `boolean`
-   **Valor predeterminado:** `true`
-   **Obligatorio:** no
-   **Observación:** _Esto es **solo para Móvil**_

Bloquear automáticamente la barra de estado y la barra de direcciones durante las comparaciones. Esto evita fallos en la hora, el estado del wifi o la batería.

### `blockOutToolBar`

-   **Tipo:** `boolean`
-   **Valor predeterminado:** `true`
-   **Obligatorio:** no
-   **Observación:** _Esto es **solo para Móvil**_

Bloquear automáticamente la barra de herramientas.

### `ignoreAntialiasing`

-   **Tipo:** `boolean`
-   **Valor predeterminado:** `false`
-   **Obligatorio:** no

Comparar imágenes y descartar anti-aliasing.

### `ignoreColors`

-   **Tipo:** `boolean`
-   **Valor predeterminado:** `false`
-   **Obligatorio:** no

Aunque las imágenes estén en color, la comparación comparará 2 imágenes en blanco/negro

### `ignoreLess`

-   **Tipo:** `boolean`
-   **Valor predeterminado:** `false`
-   **Obligatorio:** no

Comparar imágenes y comparar con `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Tipo:** `boolean`
-   **Valor predeterminado:** `false`
-   **Obligatorio:** no

Comparar imágenes y comparar con `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `rawMisMatchPercentage`

-   **Tipo:** `boolean`
-   **Valor predeterminado:** `false`
-   **Obligatorio:** no

Si es true, el porcentaje de retorno será como `0.12345678`, por defecto es `0.12`

### `returnAllCompareData`

-   **Tipo:** `boolean`
-   **Valor predeterminado:** `false`
-   **Obligatorio:** no

Esto devolverá todos los datos de comparación, no solo el porcentaje de discrepancia

### `saveAboveTolerance`

-   **Tipo:** `number`
-   **Valor predeterminado:** `0`
-   **Obligatorio:** no

Valor permitido de `misMatchPercentage` que evita guardar imágenes con diferencias

### `largeImageThreshold`

-   **Tipo:** `number`
-   **Valor predeterminado:** `0`
-   **Obligatorio:** no

Comparar imágenes grandes puede llevar a problemas de rendimiento.
Al proporcionar un número para la cantidad de píxeles aquí (mayor que 0), el algoritmo de comparación omite píxeles cuando el ancho o alto de la imagen es mayor que `largeImageThreshold` píxeles.

### `scaleImagesToSameSize`

-   **Tipo:** `boolean`
-   **Valor predeterminado:** `false`
-   **Obligatorio:** no

Escala 2 imágenes al mismo tamaño antes de la ejecución de la comparación. Altamente recomendado habilitar `ignoreAntialiasing` e `ignoreAlpha`

## Opciones de carpeta

La carpeta de línea base y las carpetas de capturas de pantalla (actual, diff) son opciones que se pueden establecer durante la instanciación del plugin o método. Para establecer las opciones de carpeta en un método particular, pase las opciones de carpeta al objeto de opciones de métodos. Esto se puede usar para:

- Web
- Aplicación Híbrida
- Aplicación Nativa

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

### `actualFolder`

-   **Tipo:** `string`
-   **Obligatorio:** no

Carpeta para la instantánea que se ha capturado en la prueba.

### `baselineFolder`

-   **Tipo:** `string`
-   **Obligatorio:** no

Carpeta para la imagen de línea base que se está utilizando para comparar.

### `diffFolder`

-   **Tipo:** `string`
-   **Obligatorio:** no

Carpeta para la diferencia de imagen renderizada por ResembleJS.