---
id: service-options
title: Opciones de Servicio
---

Las opciones de servicio son las opciones que se pueden configurar cuando el servicio se instancia y se utilizarán para cada llamada a método.

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

## Opciones predeterminadas

### `addressBarShadowPadding`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Valor predeterminado:** `6`
-   **Contextos de aplicación compatibles:** Web

El relleno que debe añadirse a la barra de direcciones en iOS y Android para realizar un recorte adecuado del viewport.

### `autoElementScroll`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `true`
-   **Contextos de aplicación compatibles:** Web, Aplicación Híbrida (Webview)

Esta opción te permite desactivar el desplazamiento automático del elemento a la vista cuando se crea una captura de pantalla del elemento.

### `addIOSBezelCorners`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `false`
-   **Contextos de aplicación compatibles:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

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
-   **Valor predeterminado:** `true`
-   **Contextos de aplicación compatibles:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

Si no se encuentra una imagen de referencia durante la comparación, la imagen se copia automáticamente a la carpeta de referencia.

### `alwaysSaveActualImage`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `true`
-   **Contextos de aplicación compatibles:** Todos

Cuando se establece esta opción en `false`:

- no guardará la imagen actual cuando **no** hay diferencia
- no almacenará el archivo jsonreport cuando `createJsonReportFiles` esté establecido en `true`. También mostrará una advertencia en los registros de que `createJsonReportFiles` está deshabilitado

Esto debería crear un mejor rendimiento porque no se escriben archivos en el sistema y debería asegurarse de que no hay mucho ruido en la carpeta `actual`.

### `baselineFolder`

-   **Tipo:** `string|()=> string`
-   **Obligatorio:** No
-   **Valor predeterminado:** `.path/to/testfile/__snapshots__/`
-   **Contextos de aplicación compatibles:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

El directorio que contendrá todas las imágenes de referencia que se utilizan durante la comparación. Si no se establece, se utilizará el valor predeterminado que almacenará los archivos en una carpeta `__snapshots__/` junto a la especificación que ejecuta las pruebas visuales. También se puede usar una función que devuelva un `string` para establecer el valor de `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// OR
{
    baselineFolder: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `false`
-   **Contextos de aplicación compatibles:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

Elimina la carpeta de tiempo de ejecución (`actual` y `diff`) al inicializar

:::info NOTA
Esto solo funcionará cuando [`screenshotPath`](#screenshotpath) se establece a través de las opciones del plugin, y **NO FUNCIONARÁ** cuando configures las carpetas en los métodos
:::

### `createJsonReportFiles` **(NUEVO)**

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `false`

Ahora tienes la opción de exportar los resultados de la comparación a un archivo de informe JSON. Al proporcionar la opción `createJsonReportFiles: true`, cada imagen que se compara creará un informe almacenado en la carpeta `actual`, junto a cada resultado de imagen `actual`. La salida se verá así:

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
-   `instanceData`, navegador primero, luego dispositivo, luego plataforma
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

Los datos del informe te darán la oportunidad de crear tu propio informe visual sin tener que hacer toda la magia y la recopilación de datos tú mismo.

:::info NOTA
Necesitas usar la versión `5.2.0` o superior de `@wdio/visual-testing`
:::

### `disableBlinkingCursor`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `false`
-   **Contextos de aplicación compatibles:** Web, Aplicación Híbrida (Webview)

Habilita/Deshabilita el "parpadeo" del cursor en todos los elementos `input`, `textarea`, `[contenteditable]` en la aplicación. Si se establece en `true`, el cursor se configurará como `transparent` antes de tomar una captura de pantalla y se restablecerá cuando termine.

### `disableCSSAnimation`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `false`
-   **Contextos de aplicación compatibles:** Web, Aplicación Híbrida (Webview)

Habilita/Deshabilita todas las animaciones CSS en la aplicación. Si se establece en `true`, todas las animaciones se deshabilitarán antes de tomar una captura de pantalla y se restablecerán cuando termine.

### `enableLayoutTesting`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `false`
-   **Contextos de aplicación compatibles:** Web

Esto ocultará todo el texto de una página para que solo se use el diseño para la comparación. La ocultación se realizará añadiendo el estilo `'color': 'transparent !important'` a **cada** elemento.

Para ver la salida, consulta [Salida de prueba](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Al usar esta bandera, cada elemento que contiene texto (no solo `p, h1, h2, h3, h4, h5, h6, span, a, li`, sino también `div|button|..`) obtendrá esta propiedad. **No hay** opción para ajustar esto.
:::

### `formatImageName`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Valor predeterminado:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Contextos de aplicación compatibles:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

El nombre de las imágenes guardadas se puede personalizar pasando el parámetro `formatImageName` con un formato de cadena como:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Las siguientes variables pueden pasarse para formatear la cadena y se leerán automáticamente de las capacidades de la instancia.
Si no se pueden determinar, se usarán los valores predeterminados.

-   `browserName`: El nombre del navegador en las capacidades proporcionadas
-   `browserVersion`: La versión del navegador proporcionada en las capacidades
-   `deviceName`: El nombre del dispositivo de las capacidades
-   `dpr`: La relación de píxeles del dispositivo
-   `height`: La altura de la pantalla
-   `logName`: El logName de las capacidades
-   `mobile`: Esto agregará `_app`, o el nombre del navegador después del `deviceName` para distinguir capturas de pantalla de aplicaciones de capturas de pantalla del navegador
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
-   **Valor predeterminado:** `1500`
-   **Contextos de aplicación compatibles:** Web

El tiempo de espera en milisegundos después de un desplazamiento. Esto puede ayudar a identificar páginas con carga diferida.

:::info

Esto solo funcionará cuando la opción de servicio/método `userBasedFullPageScreenshot` esté configurada como `true`, consulta también [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `true`
-   **Contextos de aplicación compatibles:** Web, Aplicación Híbrida (Webview)

Oculta las barras de desplazamiento en la aplicación. Si se establece en true, todas las barras de desplazamiento se deshabilitarán antes de tomar una captura de pantalla. Esto está configurado por defecto como `true` para prevenir problemas adicionales.

### `logLevel`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Valor predeterminado:** `info`
-   **Contextos de aplicación compatibles:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

Añade registros adicionales, las opciones son `debug | info | warn | silent`

Los errores siempre se registran en la consola.

### `savePerInstance`

-   **Tipo:** `boolean`
-   **Valor predeterminado:** `false`
-   **Obligatorio:** no
-   **Contextos de aplicación compatibles:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

Guarda las imágenes por instancia en una carpeta separada, por ejemplo, todas las capturas de pantalla de Chrome se guardarán en una carpeta de Chrome como `desktop_chrome`.

### `screenshotPath`

-   **Tipo:** `string | () => string`
-   **Valor predeterminado:** `.tmp/`
-   **Obligatorio:** no
-   **Contextos de aplicación compatibles:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

El directorio que contendrá todas las capturas de pantalla actuales/diferentes. Si no se establece, se utilizará el valor predeterminado. También se puede utilizar una función que
devuelve una cadena para establecer el valor de screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// OR
{
    screenshotPath: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Valor predeterminado:** `6` para Android y `15` para iOS (`6` por defecto y `9` se agregará automáticamente para la posible barra de inicio en iPhones con muesca o iPads que tienen una barra de inicio)
-   **Contextos de aplicación compatibles:** Web

El relleno que debe añadirse a la barra de herramientas en iOS y Android para hacer un recorte adecuado del viewport.

### `userBasedFullPageScreenshot`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `false`
-   **Contextos de aplicación compatibles:** Web, Aplicación Híbrida (Webview) **Introducido en visual-service@7.0.0**

Por defecto, las capturas de pantalla de página completa en web de escritorio se capturan usando el protocolo WebDriver BiDi, que permite capturas de pantalla rápidas, estables y consistentes sin desplazamiento.
Cuando userBasedFullPageScreenshot se establece en true, el proceso de captura de pantalla simula a un usuario real: desplazándose por la página, capturando capturas de pantalla del tamaño del viewport y uniéndolas. Este método es útil para páginas con contenido de carga diferida o renderizado dinámico que depende de la posición de desplazamiento.

Usa esta opción si tu página depende de la carga de contenido durante el desplazamiento o si deseas preservar el comportamiento de métodos de captura de pantalla anteriores.

### `waitForFontsLoaded`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Valor predeterminado:** `true`
-   **Contextos de aplicación compatibles:** Web, Aplicación Híbrida (Webview)

Las fuentes, incluidas las fuentes de terceros, pueden cargarse de forma sincrónica o asincrónica. La carga asincrónica significa que las fuentes pueden cargarse después de que WebdriverIO determine que una página se ha cargado completamente. Para prevenir problemas de renderizado de fuentes, este módulo, por defecto, esperará a que todas las fuentes se carguen antes de tomar una captura de pantalla.

## Opciones Tabulables

:::info NOTA

Este módulo también admite dibujar la forma en que un usuario utilizaría su teclado para _tabular_ a través del sitio web, dibujando líneas y puntos de un elemento tabulable a otro.<br/>
El trabajo está inspirado en la publicación del blog de [Viv Richards](https://github.com/vivrichards600) sobre ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
La forma en que se seleccionan los elementos tabulables se basa en el módulo [tabbable](https://github.com/davidtheclark/tabbable). Si hay algún problema con la tabulación, consulta el [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) y especialmente la sección [Más detalles](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Tipo:** `object`
-   **Obligatorio:** No
-   **Valor predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Contextos de aplicación compatibles:** Web

Las opciones que pueden cambiarse para las líneas y puntos si utilizas los métodos `{save|check}Tabbable`. Las opciones se explican a continuación.

#### `tabbableOptions.circle`

-   **Tipo:** `object`
-   **Obligatorio:** No
-   **Valor predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Contextos de aplicación compatibles:** Web

Las opciones para cambiar el círculo.

##### `tabbableOptions.circle.backgroundColor`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Valor predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Contextos de aplicación compatibles:** Web

El color de fondo del círculo.

##### `tabbableOptions.circle.borderColor`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Valor predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Contextos de aplicación compatibles:** Web

El color del borde del círculo.

##### `tabbableOptions.circle.borderWidth`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Valor predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Contextos de aplicación compatibles:** Web

El ancho del borde del círculo.

##### `tabbableOptions.circle.fontColor`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Valor predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Contextos de aplicación compatibles:** Web

El color de la fuente del texto en el círculo. Esto solo se mostrará si [`showNumber`](./#tabbableoptionscircleshownumber) está establecido en `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Valor predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Contextos de aplicación compatibles:** Web

La familia de la fuente del texto en el círculo. Esto solo se mostrará si [`showNumber`](./#tabbableoptionscircleshownumber) está establecido en `true`.

Asegúrate de establecer fuentes compatibles con los navegadores.

##### `tabbableOptions.circle.fontSize`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Valor predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Contextos de aplicación compatibles:** Web

El tamaño de la fuente del texto en el círculo. Esto solo se mostrará si [`showNumber`](./#tabbableoptionscircleshownumber) está establecido en `true`.

##### `tabbableOptions.circle.size`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Valor predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Contextos de aplicación compatibles:** Web

El tamaño del círculo.

##### `tabbableOptions.circle.showNumber`

-   **Tipo:** `showNumber`
-   **Obligatorio:** No
-   **Valor predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Contextos de aplicación compatibles:** Web

Muestra el número de secuencia de tabulación en el círculo.

#### `tabbableOptions.line`

-   **Tipo:** `object`
-   **Obligatorio:** No
-   **Valor predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Contextos de aplicación compatibles:** Web

Las opciones para cambiar la línea.

##### `tabbableOptions.line.color`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Valor predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Contextos de aplicación compatibles:** Web

El color de la línea.

##### `tabbableOptions.line.width`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Valor predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Contextos de aplicación compatibles:** Web

El ancho de la línea.

## Opciones de comparación

### `compareOptions`

-   **Tipo:** `object`
-   **Obligatorio:** No
-   **Valor predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) para todos los valores predeterminados
-   **Contextos de aplicación compatibles:** Web, Aplicación Híbrida (Webview), Aplicación Nativa (Ver [Opciones de método de comparación](./method-options#compare-check-options) para más información)

Las opciones de comparación también se pueden establecer como opciones de servicio, se describen en las [Opciones de método de comparación](/docs/visual-testing/method-options#compare-check-options)