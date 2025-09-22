---
id: method-options
title: Opciones de Método
---

Las opciones de métodos son las opciones que se pueden configurar por [método](./methods). Si la opción tiene la misma clave que una opción que se ha establecido durante la instanciación del plugin, esta opción de método anulará el valor de la opción del plugin.

:::info NOTA

-   Todas las opciones de [Opciones de Guardado](#save-options) pueden ser utilizadas para los métodos de [Comparación](#compare-check-options)
-   Todas las opciones de comparación pueden ser utilizadas durante la instanciación del servicio __o__ para cada método de verificación individual. Si una opción de método tiene la misma clave que una opción que se ha establecido durante la instanciación del servicio, entonces la opción de comparación del método anulará el valor de la opción de comparación del servicio.
- Todas las opciones pueden ser utilizadas para los siguientes contextos de aplicación a menos que se mencione lo contrario:
    - Web
    - App Híbrida
    - App Nativa
- Los ejemplos a continuación son con los métodos `save*`, pero también pueden ser utilizados con los métodos `check*`

:::

## Opciones de Guardado

### `disableBlinkingCursor`

- **Tipo:** `boolean`
- **Obligatorio:** No
- **Predeterminado:** `false`
- **Usado con:** Todos los [métodos](./methods)
- **Contextos de Aplicación Soportados:** Web, App Híbrida (Webview)

Habilita/Deshabilita el "parpadeo" del cursor en todos los elementos `input`, `textarea`, `[contenteditable]` en la aplicación. Si se establece en `true`, el cursor se establecerá como `transparent` antes de tomar una captura de pantalla
y se restablecerá al terminar.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

### `disableCSSAnimation`

- **Tipo:** `boolean`
- **Obligatorio:** No
- **Predeterminado:** `false`
- **Usado con:** Todos los [métodos](./methods)
- **Contextos de Aplicación Soportados:** Web, App Híbrida (Webview)

Habilita/Deshabilita todas las animaciones CSS en la aplicación. Si se establece en `true`, todas las animaciones serán deshabilitadas antes de tomar una captura de pantalla
y se restablecerán al terminar.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

### `enableLegacyScreenshotMethod`

- **Tipo:** `boolean`
- **Obligatorio:** No
- **Predeterminado:** `false`
- **Usado con:** Todos los [métodos](./methods)
- **Contextos de Aplicación Soportados:** Web, App Híbrida (Webview)

Utilice esta opción para volver al método "antiguo" de capturas de pantalla basado en el protocolo W3C-WebDriver. Esto puede ser útil si sus pruebas dependen de imágenes de referencia existentes o si está ejecutando en entornos que no admiten completamente las capturas de pantalla basadas en BiDi más recientes.
Tenga en cuenta que habilitar esto puede producir capturas de pantalla con una resolución o calidad ligeramente diferentes.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

### `enableLayoutTesting`

- **Tipo:** `boolean`
- **Obligatorio:** No
- **Predeterminado:** `false`
- **Usado con:** Todos los [métodos](./methods)
- **Contextos de Aplicación Soportados:** Web, App Híbrida (Webview)

Esto ocultará todo el texto en una página para que solo se utilice el diseño para la comparación. La ocultación se realizará agregando el estilo `'color': 'transparent !important'` a __cada__ elemento.

Para la salida, consulte [Salida de Prueba](./test-output#enablelayouttesting).

:::info
Al usar esta opción, cada elemento que contiene texto (no solo `p, h1, h2, h3, h4, h5, h6, span, a, li`, sino también `div|button|..`) recibirá esta propiedad. __NO__ hay opción para personalizarlo.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

### `hideScrollBars`

- **Tipo:** `boolean`
- **Obligatorio:** No
- **Predeterminado:** `true`
- **Usado con:** Todos los [métodos](./methods)
- **Contextos de Aplicación Soportados:** Web, App Híbrida (Webview)

Oculta las barras de desplazamiento en la aplicación. Si se establece en true, todas las barras de desplazamiento se deshabilitarán antes de tomar una captura de pantalla. Esto se establece por defecto en `true` para prevenir problemas adicionales.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

### `hideElements`

- **Tipo:** `array`
- **Obligatorio:** No
- **Usado con:** Todos los [métodos](./methods)
- **Contextos de Aplicación Soportados:** Web, App Híbrida (Webview)

Este método puede ocultar 1 o múltiples elementos agregando la propiedad `visibility: hidden` a ellos proporcionando un array de elementos.

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

### `removeElements`

- **Tipo:** `array`
- **Obligatorio:** No
- **Usado con:** Todos los [métodos](./methods)
- **Contextos de Aplicación Soportados:** Web, App Híbrida (Webview)

Este método puede _eliminar_ 1 o múltiples elementos agregando la propiedad `display: none` a ellos proporcionando un array de elementos.

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

### `resizeDimensions`

- **Tipo:** `object`
- **Obligatorio:** No
- **Predeterminado:** `{ top: 0, right: 0, bottom: 0, left: 0}`
- **Usado con:** Solo para [`saveElement`](./methods#saveelement) o [`checkElement`](./methods#checkelement)
- **Contextos de Aplicación Soportados:** Web, App Híbrida (Webview), App Nativa

Un objeto que debe contener una cantidad de píxeles `top`, `right`, `bottom` y `left` que necesitan hacer que el recorte del elemento sea más grande.

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

### `userBasedFullPageScreenshot`

- **Tipo:** `boolean`
- **Obligatorio:** No
- **Predeterminado:** `false`
- **Usado con:** Solo para [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) o [`checkTabbablePage`](./methods#checktabbablepage)
- **Contextos de Aplicación Soportados:** Web, App Híbrida (Webview)

Cuando se establece en `true`, esta opción habilita la **estrategia de desplazamiento y costura** para capturar capturas de pantalla de página completa.
En lugar de utilizar las capacidades nativas de captura de pantalla del navegador, se desplaza manualmente a través de la página y une varias capturas de pantalla.
Este método es especialmente útil para páginas con **contenido cargado perezosamente** o diseños complejos que requieren desplazamiento para renderizarse completamente.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

### `fullPageScrollTimeout`

- **Tipo:** `number`
- **Obligatorio:** No
- **Predeterminado:** `1500`
- **Usado con:** Solo para [`saveFullPageScreen`](./methods#savefullpagescreen) o [`saveTabbablePage`](./methods#savetabbablepage)
- **Contextos de Aplicación Soportados:** Web, App Híbrida (Webview)

El tiempo de espera en milisegundos después de un desplazamiento. Esto puede ayudar a identificar páginas con carga perezosa.

> **NOTA:** Esto solo funciona cuando `userBasedFullPageScreenshot` está establecido en `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

### `hideAfterFirstScroll`

- **Tipo:** `array`
- **Obligatorio:** No
- **Usado con:** Solo para [`saveFullPageScreen`](./methods#savefullpagescreen) o [`saveTabbablePage`](./methods#savetabbablepage)
- **Contextos de Aplicación Soportados:** Web, App Híbrida (Webview)

Este método ocultará uno o varios elementos agregando la propiedad `visibility: hidden` a ellos proporcionando un array de elementos.
Esto será útil cuando una página, por ejemplo, contiene elementos fijos que se desplazarán con la página si se desplaza la página pero dará un efecto molesto cuando se realiza una captura de pantalla de página completa.

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

### `waitForFontsLoaded`

- **Tipo:** `boolean`
- **Obligatorio:** No
- **Predeterminado:** `true`
- **Usado con:** Todos los [métodos](./methods)
- **Contextos de Aplicación Soportados:** Web, App Híbrida (Webview)

Las fuentes, incluidas las fuentes de terceros, pueden cargarse de forma síncrona o asíncrona. La carga asíncrona significa que las fuentes podrían cargarse después de que WebdriverIO determine que una página se ha cargado completamente. Para evitar problemas de renderizado de fuentes, este módulo, de forma predeterminada, esperará a que todas las fuentes se carguen antes de tomar una captura de pantalla.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

## Opciones de Comparación (Check)

Las opciones de comparación son opciones que influyen en la forma en que se ejecuta la comparación, mediante [ResembleJS](https://github.com/Huddle/Resemble.js).

### `ignoreAlpha`

- **Tipo:** `boolean`
- **Predeterminado:** `false`
- **Obligatorio:** No
- **Usado con:** Todos los [métodos de Verificación](./methods#check-methods)
- **Contextos de Aplicación Soportados:** Todos

Compara imágenes y descarta el alfa.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

### `blockOutSideBar`

- **Tipo:** `boolean`
- **Predeterminado:** `true`
- **Obligatorio:** No
- **Usado con:** _Solo puede usarse para `checkScreen()`. Esto es **solo para iPad**_
- **Contextos de Aplicación Soportados:** Todos

Bloquea automáticamente la barra lateral para iPads en modo horizontal durante las comparaciones. Esto evita fallos en el componente nativo de pestañas/privado/marcadores.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

### `blockOutStatusBar`

- **Tipo:** `boolean`
- **Predeterminado:** `true`
- **Obligatorio:** No
- **Usado con:** _Esto es **solo para Móvil**_
- **Contextos de Aplicación Soportados:** Híbrido (parte nativa) y Apps Nativas

Bloquea automáticamente la barra de estado y la barra de direcciones durante las comparaciones. Esto evita fallos en la hora, el wifi o el estado de la batería.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

### `blockOutToolBar`

- **Tipo:** `boolean`
- **Predeterminado:** `true`
- **Obligatorio:** No
- **Usado con:** _Esto es **solo para Móvil**_
- **Contextos de Aplicación Soportados:** Híbrido (parte nativa) y Apps Nativas

Bloquea automáticamente la barra de herramientas.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

### `ignoreAntialiasing`

- **Tipo:** `boolean`
- **Predeterminado:** `false`
- **Obligatorio:** No
- **Usado con:** Todos los [métodos de Verificación](./methods#check-methods)
- **Contextos de Aplicación Soportados:** Todos

Compara imágenes y descarta el antialiasing.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

### `ignoreColors`

- **Tipo:** `boolean`
- **Predeterminado:** `false`
- **Obligatorio:** No
- **Usado con:** Todos los [métodos de Verificación](./methods#check-methods)
- **Contextos de Aplicación Soportados:** Todos

Aunque las imágenes están en color, la comparación comparará 2 imágenes en blanco/negro

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

### `ignoreLess`

- **Tipo:** `boolean`
- **Predeterminado:** `false`
- **Obligatorio:** No
- **Usado con:** Todos los [métodos de Verificación](./methods#check-methods)
- **Contextos de Aplicación Soportados:** Todos

Compara imágenes y compara con `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

### `ignoreNothing`

- **Tipo:** `boolean`
- **Predeterminado:** `false`
- **Obligatorio:** No
- **Usado con:** Todos los [métodos de Verificación](./methods#check-methods)
- **Contextos de Aplicación Soportados:** Todos

Compara imágenes y compara con `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

### `rawMisMatchPercentage`

- **Tipo:** `boolean`
- **Predeterminado:** `false`
- **Obligatorio:** No
- **Usado con:** Todos los [métodos de Verificación](./methods#check-methods)
- **Contextos de Aplicación Soportados:** Todos

Si es true, el porcentaje de retorno será como `0.12345678`, por defecto es `0.12`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

### `returnAllCompareData`

- **Tipo:** `boolean`
- **Predeterminado:** `false`
- **Obligatorio:** No
- **Usado con:** Todos los [métodos de Verificación](./methods#check-methods)
- **Contextos de Aplicación Soportados:** Todos

Esto devolverá todos los datos de comparación, no solo el porcentaje de desajuste, ver también [Salida de Consola](./test-output#console-output-1)

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

### `saveAboveTolerance`

- **Tipo:** `number`
- **Predeterminado:** `0`
- **Obligatorio:** No
- **Usado con:** Todos los [métodos de Verificación](./methods#check-methods)
- **Contextos de Aplicación Soportados:** Todos

Valor permitido de `misMatchPercentage` que evita guardar imágenes con diferencias

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

### `largeImageThreshold`

- **Tipo:** `number`
- **Predeterminado:** `0`
- **Obligatorio:** No
- **Usado con:** Todos los [métodos de Verificación](./methods#check-methods)
- **Contextos de Aplicación Soportados:** Todos

Comparar imágenes grandes puede llevar a problemas de rendimiento.
Al proporcionar un número para la cantidad de píxeles aquí (mayor que 0), el algoritmo de comparación omite píxeles cuando el ancho o alto de la imagen es mayor que `largeImageThreshold` píxeles.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        largeImageThreshold: 1500
    }
)
```

### `scaleImagesToSameSize`

- **Tipo:** `boolean`
- **Predeterminado:** `false`
- **Obligatorio:** No
- **Usado con:** Todos los [métodos de Verificación](./methods#check-methods)
- **Contextos de Aplicación Soportados:** Todos

Escala 2 imágenes al mismo tamaño antes de la ejecución de la comparación. Altamente recomendable habilitar `ignoreAntialiasing` e `ignoreAlpha`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

### `ignore`

- **Tipo:** `array`
- **Obligatorio:** No
- **Usado con:** Solo con el método `checkScreen`, **NO** con el método `checkElement`
- **Contextos de Aplicación Soportados:** App Nativa

Este método bloqueará automáticamente elementos o un área en una pantalla basándose en un array de elementos o un objeto de `x|y|width|height`.

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

## Opciones de carpeta

La carpeta de referencia y las carpetas de capturas de pantalla (actual, diff) son opciones que se pueden establecer durante la instanciación del plugin o método. Para establecer las opciones de carpeta en un método particular, pase las opciones de carpeta al objeto de opciones de métodos. Esto puede utilizarse para:

- Web
- App Híbrida
- App Nativa

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

- **Tipo:** `string`
- **Obligatorio:** No
- **Contextos de Aplicación Soportados:** Todos

Carpeta para la instantánea que ha sido capturada en la prueba.

### `baselineFolder`

- **Tipo:** `string`
- **Obligatorio:** No
- **Contextos de Aplicación Soportados:** Todos

Carpeta para la imagen de referencia que se utiliza para comparar.

### `diffFolder`

- **Tipo:** `string`
- **Obligatorio:** No
- **Contextos de Aplicación Soportados:** Todos

Carpeta para la diferencia de imagen renderizada por ResembleJS.