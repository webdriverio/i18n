---
id: service-options
title: Opciones de Servicio
---

Las opciones de servicio son las opciones que se pueden establecer cuando se instancia el servicio y se utilizarán para cada llamada de método.

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // The options
            },
        ],
    ],
    // ...
};
```

## Opciones Predeterminadas

### `addressBarShadowPadding`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Predeterminado:** `6`
-   **Soportado:** Web

El relleno que debe agregarse a la barra de direcciones en iOS y Android para hacer un recorte adecuado de la ventana gráfica.

### `autoElementScroll`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `true`
-   **Soportado:** Web, Aplicación Híbrida (Webview)

Esta opción te permite desactivar el desplazamiento automático del elemento a la vista cuando se crea una captura de pantalla del elemento.

### `addIOSBezelCorners`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `false`
-   **Soportado:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

Añade esquinas de bisel y muesca/isla dinámica a la captura de pantalla para dispositivos iOS.

:::info NOTA
Esto solo se puede hacer cuando el nombre del dispositivo **PUEDE** determinarse automáticamente y coincide con la siguiente lista de nombres de dispositivos normalizados. La normalización será realizada por este módulo.
**iPhone:**

-   iPhone X: `iphonex`
-   iPhone XS: `iphonexs`
-   iPhone XS Max: `iphonexsmax`
-   iPhone XR: `iphonexr`
-   iPhone 11: `iphone11`
-   iPhone 11 Pro: `iphone11pro`
-   iPhone 11 Pro Max: `iphone11promax`
-   iPhone 12: `iphone12`
-   iPhone 12 Mini: `iphone12mini`
-   iPhone 12 Pro: `iphone12pro`
-   iPhone 12 Pro Max: `iphone12promax`
-   iPhone 13: `iphone13`
-   iPhone 13 Mini: `iphone13mini`
-   iPhone 13 Pro: `iphone13pro`
-   iPhone 13 Pro Max: `iphone13promax`
-   iPhone 14: `iphone14`
-   iPhone 14 Plus: `iphone14plus`
-   iPhone 14 Pro: `iphone14pro`
-   iPhone 14 Pro Max: `iphone14promax`
    **iPads:**
-   iPad Mini 6th Generation: `ipadmini`
-   iPad Air 4th Generation: `ipadair`
-   iPad Air 5th Generation: `ipadair`
-   iPad Pro (11-inch) 1st Generation: `ipadpro11`
-   iPad Pro (11-inch) 2nd Generation: `ipadpro11`
-   iPad Pro (11-inch) 3rd Generation: `ipadpro11`
-   iPad Pro (12.9-inch) 3rd Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 4th Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 5th Generation: `ipadpro129`

:::

### `autoSaveBaseline`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `true`
-   **Soportado:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

Si no se encuentra una imagen de referencia durante la comparación, la imagen se copia automáticamente a la carpeta de referencia.

### `baselineFolder`

-   **Tipo:** `string|()=> string`
-   **Obligatorio:** No
-   **Predeterminado:** `.path/to/testfile/__snapshots__/`
-   **Soportado:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

El directorio que contendrá todas las imágenes de referencia que se utilizan durante la comparación. Si no se establece, se utilizará el valor predeterminado que almacenará los archivos en una carpeta `__snapshots__/` junto a la especificación que ejecuta las pruebas visuales. También se puede utilizar una función que devuelva una `string` para establecer el valor de `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// O
{
    baselineFolder: () => {
        // Haz algo de magia aquí
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `false`
-   **Soportado:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

Eliminar la carpeta de tiempo de ejecución (`actual` y `diff`) en la inicialización

:::info NOTA
Esto solo funcionará cuando [`screenshotPath`](#screenshotpath) se establece a través de las opciones del plugin, y **NO FUNCIONARÁ** cuando configures las carpetas en los métodos
:::

### `createJsonReportFiles` **(NUEVO)**

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `false`

Ahora tienes la opción de exportar los resultados de comparación a un archivo de informe JSON. Al proporcionar la opción `createJsonReportFiles: true`, cada imagen que se compara creará un informe almacenado en la carpeta `actual`, junto a cada resultado de imagen `actual`. La salida se verá así:

```json
{
    "parent": "check methods",
    "test": "should fail comparing with a baseline",
    "tag": "examplePageFail",
    "instanceData": {
        "browser": {
            "name": "chrome-headless-shell",
            "version": "126.0.6478.183"
        },
        "platform": {
            "name": "mac",
            "version": "not-known"
        }
    },
    "commandName": "checkScreen",
    "boundingBoxes": {
        "diffBoundingBoxes": [
            {
                "left": 1088,
                "top": 717,
                "right": 1186,
                "bottom": 730
            }
            //....
        ],
        "ignoredBoxes": [
            {
                "left": 159,
                "top": 652,
                "right": 356,
                "bottom": 703
            }
            //...
        ]
    },
    "fileData": {
        "actualFilePath": "/Users/wdio/visual-testing/.tmp/actual/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "baselineFilePath": "/Users/wdio/visual-testing/localBaseline/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "diffFilePath": "/Users/wdio/visual-testing/.tmp/diff/desktop_chrome-headless-shell/examplePageFail-local-chrome-latest-1366x768png",
        "fileName": "examplePageFail-local-chrome-latest-1366x768.png",
        "size": {
            "actual": {
                "height": 768,
                "width": 1366
            },
            "baseline": {
                "height": 768,
                "width": 1366
            },
            "diff": {
                "height": 768,
                "width": 1366
            }
        }
    },
    "misMatchPercentage": "12.90",
    "rawMisMatchPercentage": 12.900729014153246
}
```

Cuando todas las pruebas se ejecutan, se generará un nuevo archivo JSON con la colección de comparaciones que se puede encontrar en la raíz de tu carpeta `actual`. Los datos se agrupan por:

-   `describe` para Jasmine/Mocha o `Feature` para CucumberJS
-   `it` para Jasmine/Mocha o `Scenario` para CucumberJS
    y luego se ordenan por:
-   `commandName`, que son los nombres de métodos de comparación utilizados para comparar las imágenes
-   `instanceData`, primero navegador, luego dispositivo, luego plataforma
    se verá así

```json
[
    {
        "description": "check methods",
        "data": [
            {
                "test": "should fail comparing with a baseline",
                "data": [
                    {
                        "tag": "examplePageFail",
                        "instanceData": {},
                        "commandName": "checkScreen",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "14.34",
                        "rawMisMatchPercentage": 14.335403703025868
                    },
                    {
                        "tag": "exampleElementFail",
                        "instanceData": {},
                        "commandName": "checkElement",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "1.34",
                        "rawMisMatchPercentage": 1.335403703025868
                    }
                ]
            }
        ]
    }
]
```

Los datos del informe te darán la oportunidad de construir tu propio informe visual sin tener que hacer toda la magia y recopilación de datos tú mismo.

:::info NOTA
Necesitas usar `@wdio/visual-testing` versión `5.2.0` o superior
:::

### `disableBlinkingCursor`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `false`
-   **Soportado:** Web, Aplicación Híbrida (Webview)

Activar/Desactivar el "parpadeo" del cursor en todos los elementos `input`, `textarea`, `[contenteditable]` en la aplicación. Si se establece en `true`, el cursor se establecerá como `transparent` antes de tomar una captura de pantalla
y se restablecerá cuando termine

### `disableCSSAnimation`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `false`
-   **Soportado:** Web, Aplicación Híbrida (Webview)

Activar/Desactivar todas las animaciones CSS en la aplicación. Si se establece en `true`, todas las animaciones se desactivarán antes de tomar una captura de pantalla
y se restablecerán cuando termine

### `enableLayoutTesting`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `false`
-   **Soportado:** Web

Esto ocultará todo el texto en una página para que solo se utilice el diseño para la comparación. La ocultación se realizará añadiendo el estilo `'color': 'transparent !important'` a **cada** elemento.

Para la salida, consulta [Salida de Prueba](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Al usar esta bandera, cada elemento que contiene texto (no solo `p, h1, h2, h3, h4, h5, h6, span, a, li`, sino también `div|button|..`) recibirá esta propiedad. **No** hay opción para personalizar esto.
:::

### `formatImageName`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Soportado:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

El nombre de las imágenes guardadas se puede personalizar pasando el parámetro `formatImageName` con una cadena de formato como:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Las siguientes variables se pueden pasar para formatear la cadena y se leerán automáticamente de las capacidades de la instancia.
Si no se pueden determinar, se utilizarán los valores predeterminados.

-   `browserName`: El nombre del navegador en las capacidades proporcionadas
-   `browserVersion`: La versión del navegador proporcionada en las capacidades
-   `deviceName`: El nombre del dispositivo de las capacidades
-   `dpr`: La relación de píxeles del dispositivo
-   `height`: La altura de la pantalla
-   `logName`: El logName de las capacidades
-   `mobile`: Esto añadirá `_app`, o el nombre del navegador después del `deviceName` para distinguir capturas de pantalla de aplicaciones de capturas de pantalla de navegador
-   `platformName`: El nombre de la plataforma en las capacidades proporcionadas
-   `platformVersion`: La versión de la plataforma proporcionada en las capacidades
-   `tag`: La etiqueta que se proporciona en los métodos que se están llamando
-   `width`: El ancho de la pantalla

:::info

No puedes proporcionar rutas/carpetas personalizadas en el `formatImageName`. Si deseas cambiar la ruta, consulta cómo cambiar las siguientes opciones:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) por método

:::

### `fullPageScrollTimeout`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Predeterminado:** `1500`
-   **Soportado:** Web

El tiempo de espera en milisegundos después de un desplazamiento. Esto puede ayudar a identificar páginas con carga diferida.

:::info

Esto solo funcionará cuando la opción de servicio/método `userBasedFullPageScreenshot` esté establecida en `true`, consulta también [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `true`
-   **Soportado:** Web, Aplicación Híbrida (Webview)

Ocultar barras de desplazamiento en la aplicación. Si se establece en true, todas las barras de desplazamiento se desactivarán antes de tomar una captura de pantalla. Esto está establecido por defecto en `true` para prevenir problemas adicionales.

### `logLevel`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** `info`
-   **Soportado:** Web, Aplicación Híbrida (Webview), Aplicación Nativa