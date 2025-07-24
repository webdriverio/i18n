---
id: service-options
title: Opciones de Servicio
---

Las opciones de servicio son las opciones que se pueden establecer cuando se instancia el servicio y se utilizarán para cada llamada a método.

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

El relleno que debe agregarse a la barra de direcciones en iOS y Android para hacer un recorte adecuado de la ventana.

### `autoElementScroll`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `true`
-   **Soportado:** Web, Aplicación Híbrida (Webview)

Esta opción te permite desactivar el desplazamiento automático del elemento a la vista cuando se crea una captura de pantalla de un elemento.

### `addIOSBezelCorners`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `false`
-   **Soportado:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

Agregar esquinas de bisel y muesca/isla dinámica a la captura de pantalla para dispositivos iOS.

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

El directorio que contendrá todas las imágenes de referencia que se utilizan durante la comparación. Si no se establece, se utilizará el valor predeterminado que almacenará los archivos en una carpeta `__snapshots__/` junto al archivo de especificación que ejecuta las pruebas visuales. También se puede utilizar una función que devuelva una `string` para establecer el valor de `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// O
{
    baselineFolder: () => {
        // Hacer algo de magia aquí
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `false`
-   **Soportado:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

Eliminar la carpeta de tiempo de ejecución (`actual` y `diff`) al inicializar

:::info NOTA
Esto solo funcionará cuando [`screenshotPath`](#screenshotpath) esté configurado a través de las opciones del plugin, y **NO FUNCIONARÁ** cuando configures las carpetas en los métodos
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

Cuando todas las pruebas se ejecutan, se generará un nuevo archivo JSON con la colección de comparaciones que se puede encontrar en la raíz de tu carpeta `actual`. Los datos están agrupados por:

-   `describe` para Jasmine/Mocha o `Feature` para CucumberJS
-   `it` para Jasmine/Mocha o `Scenario` para CucumberJS
    y luego ordenados por:
-   `commandName`, que son los nombres de los métodos de comparación utilizados para comparar las imágenes
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

Los datos del informe te darán la oportunidad de construir tu propio informe visual sin tener que hacer toda la magia y la recopilación de datos por ti mismo.

:::info NOTA
Necesitas usar `@wdio/visual-testing` versión `5.2.0` o superior
:::

### `disableBlinkingCursor`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `false`
-   **Soportado:** Web, Aplicación Híbrida (Webview)

Activar/Desactivar el "parpadeo" del cursor en todos los elementos `input`, `textarea`, `[contenteditable]` en la aplicación. Si se establece en `true`, el cursor se establecerá como `transparent` antes de tomar una captura de pantalla y se restablecerá cuando se complete

### `disableCSSAnimation`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `false`
-   **Soportado:** Web, Aplicación Híbrida (Webview)

Activar/Desactivar todas las animaciones CSS en la aplicación. Si se establece en `true`, todas las animaciones se desactivarán antes de tomar una captura de pantalla y se restablecerán cuando se complete

### `enableLayoutTesting`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `false`
-   **Soportado:** Web

Esto ocultará todo el texto en una página para que solo se utilice el diseño para la comparación. El ocultamiento se realizará agregando el estilo `'color': 'transparent !important'` a **cada** elemento.

Para la salida, consulta [Salida de Prueba](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Al usar esta bandera, cada elemento que contiene texto (no solo `p, h1, h2, h3, h4, h5, h6, span, a, li`, sino también `div|button|..`) recibirá esta propiedad. **NO** hay opción para adaptar esto.
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
-   **Predeterminado:** `1500`
-   **Soportado:** Web

El tiempo de espera en milisegundos después de un desplazamiento. Esto puede ayudar a identificar páginas con carga perezosa.

:::info

Esto solo funcionará cuando la opción de servicio/método `userBasedFullPageScreenshot` esté configurada como `true`, consulta también [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `true`
-   **Soportado:** Web, Aplicación Híbrida (Webview)

Oculta las barras de desplazamiento en la aplicación. Si se establece en true, todas las barras de desplazamiento se desactivarán antes de tomar una captura de pantalla. Esto está configurado por defecto como `true` para evitar problemas adicionales.

### `logLevel`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** `info`
-   **Soportado:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

Agrega registros adicionales, las opciones son `debug | info | warn | silent`

Los errores siempre se registran en la consola.

### `savePerInstance`

-   **Tipo:** `boolean`
-   **Predeterminado:** `false`
-   **Obligatorio:** no
-   **Soportado:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

Guarda las imágenes por instancia en una carpeta separada, por ejemplo, todas las capturas de pantalla de Chrome se guardarán en una carpeta de Chrome como `desktop_chrome`.

### `screenshotPath`

-   **Tipo:** `string | () => string`
-   **Predeterminado:** `.tmp/`
-   **Obligatorio:** no
-   **Soportado:** Web, Aplicación Híbrida (Webview), Aplicación Nativa

El directorio que contendrá todas las capturas de pantalla actuales/diferentes. Si no se establece, se utilizará el valor predeterminado. También se puede utilizar una función que devuelva una cadena para establecer el valor de screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// O
{
    screenshotPath: () => {
        // Hacer algo de magia aquí
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Predeterminado:** `6` para Android y `15` para iOS (`6` por defecto y `9` se agregará automáticamente para la posible barra de inicio en iPhones con una muesca o iPads que tienen una barra de inicio)
-   **Soportado:** Web

El relleno que debe agregarse a la barra de herramientas en iOS y Android para hacer un recorte adecuado de la ventana.

### `userBasedFullPageScreenshot`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `false`
-   **Soportado:** Web, Aplicación Híbrida (Webview) **Introducido en visual-service@7.0.0**

Por defecto, las capturas de pantalla de página completa en web de escritorio se capturan utilizando el protocolo WebDriver BiDi, que permite capturas de pantalla rápidas, estables y consistentes sin desplazamiento.
Cuando userBasedFullPageScreenshot está configurado como true, el proceso de captura de pantalla simula a un usuario real: desplazándose por la página, capturando capturas de pantalla del tamaño de la ventana y uniéndolas. Este método es útil para páginas con contenido de carga perezosa o renderizado dinámico que depende de la posición de desplazamiento.

Usa esta opción si tu página depende de la carga de contenido mientras se desplaza o si deseas preservar el comportamiento de los métodos de captura de pantalla más antiguos.

### `waitForFontsLoaded`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `true`
-   **Soportado:** Web, Aplicación Híbrida (Webview)

Las fuentes, incluidas las fuentes de terceros, pueden cargarse de forma síncrona o asíncrona. La carga asíncrona significa que las fuentes podrían cargarse después de que WebdriverIO determine que una página se ha cargado completamente. Para evitar problemas de renderizado de fuentes, este módulo, por defecto, esperará a que todas las fuentes se carguen antes de tomar una captura de pantalla.

## Opciones Tabulables

:::info NOTA

Este módulo también admite dibujar la forma en que un usuario usaría su teclado para _tabular_ a través del sitio web, dibujando líneas y puntos de elemento tabulable a elemento tabulable.<br/>
El trabajo está inspirado en la publicación del blog de [Viv Richards](https://github.com/vivrichards600) sobre ["AUTOMATIZANDO LA TABULABILIDAD DE LA PÁGINA (¿ES ESA UNA PALABRA?) CON PRUEBAS VISUALES"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
La forma en que se seleccionan los elementos tabulables se basa en el módulo [tabbable](https://github.com/davidtheclark/tabbable). Si hay algún problema con respecto a la tabulación, consulta el [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) y especialmente la [sección Más detalles](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Tipo:** `object`
-   **Obligatorio:** No
-   **Predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Soportado:** Web

Las opciones que pueden cambiarse para las líneas y puntos si utilizas los métodos `{save|check}Tabbable`. Las opciones se explican a continuación.

#### `tabbableOptions.circle`

-   **Tipo:** `object`
-   **Obligatorio:** No
-   **Predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Soportado:** Web

Las opciones para cambiar el círculo.

##### `tabbableOptions.circle.backgroundColor`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Soportado:** Web

El color de fondo del círculo.

##### `tabbableOptions.circle.borderColor`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Soportado:** Web

El color del borde del círculo.

##### `tabbableOptions.circle.borderWidth`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Soportado:** Web

El ancho del borde del círculo.

##### `tabbableOptions.circle.fontColor`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Soportado:** Web

El color de la fuente del texto en el círculo. Esto solo se mostrará si [`showNumber`](./#tabbableoptionscircleshownumber) está configurado como `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Soportado:** Web

La familia de la fuente del texto en el círculo. Esto solo se mostrará si [`showNumber`](./#tabbableoptionscircleshownumber) está configurado como `true`.

Asegúrate de establecer fuentes que sean compatibles con los navegadores.

##### `tabbableOptions.circle.fontSize`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Soportado:** Web

El tamaño de la fuente del texto en el círculo. Esto solo se mostrará si [`showNumber`](./#tabbableoptionscircleshownumber) está configurado como `true`.

##### `tabbableOptions.circle.size`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Soportado:** Web

El tamaño del círculo.

##### `tabbableOptions.circle.showNumber`

-   **Tipo:** `showNumber`
-   **Obligatorio:** No
-   **Predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Soportado:** Web

Muestra el número de secuencia de tabulación en el círculo.

#### `tabbableOptions.line`

-   **Tipo:** `object`
-   **Obligatorio:** No
-   **Predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Soportado:** Web

Las opciones para cambiar la línea.

##### `tabbableOptions.line.color`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Soportado:** Web

El color de la línea.

##### `tabbableOptions.line.width`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos los valores predeterminados
-   **Soportado:** Web

El ancho de la línea.

## Opciones de comparación

### `compareOptions`

-   **Tipo:** `object`
-   **Obligatorio:** No
-   **Predeterminado:** Ver [aquí](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) para todos los valores predeterminados
-   **Soportado:** Web, Aplicación Híbrida (Webview), Aplicación Nativa (Ver [Opciones de comparación de método](./method-options#compare-check-options) para más información)

Las opciones de comparación también se pueden establecer como opciones de servicio, se describen en las [Opciones de comparación de método](/docs/visual-testing/method-options#compare-check-options)