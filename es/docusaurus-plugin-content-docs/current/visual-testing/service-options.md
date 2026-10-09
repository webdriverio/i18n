---
id: service-options
title: Opciones del servicio
description: "Configura las opciones predeterminadas del servicio visual, incluidas la captura de pantallas, las capturas de página completa, las líneas base, las carpetas y los informes."
---

Las opciones del servicio son las opciones que se pueden establecer cuando se instancia el servicio y se utilizarán en cada llamada a un método.

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Configuración
    // =====
    services: [
        [
            "visual",
            {
                // Las opciones
            },
        ],
    ],
    // ...
};
```

# Opciones predeterminadas

## Captura de pantallas

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Oculta las barras de desplazamiento en la aplicación. Si se establece en true, todas las barras de desplazamiento se desactivarán antes de tomar una captura de pantalla. Su valor predeterminado es `true` para evitar problemas adicionales.

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

Activa/desactiva el "parpadeo" del cursor en todos los `input`, `textarea` y `[contenteditable]` de la aplicación. Si se establece en `true`, el cursor se establecerá en `transparent` antes de tomar una captura de pantalla
y se restablecerá al terminar

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

Activa/desactiva todas las animaciones CSS en la aplicación. Si se establece en `true`, todas las animaciones se desactivarán antes de tomar una captura de pantalla
y se restablecerán al terminar

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No" contexts="Web">

Esto ocultará todo el texto de una página para que solo se utilice el diseño en la comparación. El ocultamiento se realiza añadiendo el estilo `'color': 'transparent !important'` a **cada** elemento.

Para ver el resultado, consulta [Resultado de las pruebas](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Al usar esta opción, cada elemento que contenga texto (es decir, no solo `p, h1, h2, h3, h4, h5, h6, span, a, li`, sino también `div|button|..`) recibirá esta propiedad. **No** hay ninguna opción para personalizar esto.
:::

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No" contexts="Web, Hybrid App (Webview)">

Relleno en píxeles del dispositivo que se añade a cada lado de las regiones ignoradas, haciendo que cada región sea 2× este valor más ancha y más alta. Esto ayuda a evitar diferencias de 1 px en los bordes que pueden aparecer en pantallas con DPR alto o con el protocolo de capturas de pantalla BiDi. Establécelo en `0` para desactivarlo.

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Las fuentes, incluidas las fuentes de terceros, pueden cargarse de forma síncrona o asíncrona. La carga asíncrona significa que las fuentes podrían cargarse después de que WebdriverIO determine que una página se ha cargado por completo. Para evitar problemas de renderizado de fuentes, este módulo, de forma predeterminada, esperará a que se carguen todas las fuentes antes de tomar una captura de pantalla.

</Option>
## Capturas de página completa

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview) **Introduced in visual-service@7.0.0">

De forma predeterminada, las capturas de página completa en la web de escritorio se realizan utilizando el protocolo WebDriver BiDi, que permite capturas de pantalla rápidas, estables y consistentes sin desplazamiento.
Cuando userBasedFullPageScreenshot se establece en true, el proceso de captura simula a un usuario real: se desplaza por la página, toma capturas del tamaño del viewport y las une. Este método es útil para páginas con contenido de carga diferida (lazy loading) o renderizado dinámico que depende de la posición de desplazamiento.

Usa esta opción si tu página depende de contenido que se carga al desplazarse o si quieres conservar el comportamiento de los métodos de captura más antiguos.

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No" contexts="Web">

El tiempo de espera en milisegundos después de un desplazamiento. Esto puede ayudar a identificar páginas con carga diferida (lazy loading).

:::info

Esto solo funcionará cuando la opción del servicio/método `userBasedFullPageScreenshot` esté establecida en `true`, consulta también [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedfullpagescreenshot)

:::

</Option>
## Móvil y dispositivo

---

### `isHybridApp`

<Option type="boolean" default="false" required="No" contexts="Hybrid App (Webview)">

Establece esto en `true` cuando pruebes una aplicación híbrida (un contenedor nativo con uno o más webviews integrados). Esto ajusta cómo el módulo gestiona los recortes de la barra de estado y de la barra de direcciones en pantallas basadas en webview, recurriendo a valores predeterminados seguros cuando no están disponibles los datos nativos del rectángulo del dispositivo.

</Option>
### `addIOSBezelCorners`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

Añade las esquinas del bisel y el notch/dynamic island a la captura de pantalla en dispositivos iOS.

:::info NOTA
Esto solo se puede hacer cuando el nombre del dispositivo **PUEDE** determinarse automáticamente y coincide con la siguiente lista de nombres de dispositivos normalizados. La normalización la realiza este módulo.
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
-   iPad Mini 6.ª generación: `ipadmini`
-   iPad Air 4.ª generación: `ipadair`
-   iPad Air 5.ª generación: `ipadair`
-   iPad Pro (11 pulgadas) 1.ª generación: `ipadpro11`
-   iPad Pro (11 pulgadas) 2.ª generación: `ipadpro11`
-   iPad Pro (11 pulgadas) 3.ª generación: `ipadpro11`
-   iPad Pro (12,9 pulgadas) 3.ª generación: `ipadpro129`
-   iPad Pro (12,9 pulgadas) 4.ª generación: `ipadpro129`
-   iPad Pro (12,9 pulgadas) 5.ª generación: `ipadpro129`
:::

</Option>
### `addressBarShadowPadding`

<Option type="number" default="6" required="No" contexts="Web">

El relleno que debe añadirse a la barra de direcciones en iOS y Android para realizar un recorte correcto del viewport.

</Option>
### `toolBarShadowPadding`

<Option type="number" default={`6 for Android and \`15\` for iOS (\`6\` by default and \`9\` will be added automatically for the possible home bar on iPhones with a notch or iPads that have a home bar)`} required="No" contexts="Web">

El relleno que debe añadirse a la barra de herramientas en iOS y Android para realizar un recorte correcto del viewport.

</Option>
## Gestión de archivos y carpetas

---

### `baselineFolder`

<Option type="string|()=> string" default=".path/to/testfile/__snapshots__/" required="No" contexts="Web, Hybrid App (Webview), Native App">

El directorio que contendrá todas las imágenes de línea base que se utilizan durante la comparación. Si no se establece, se usará el valor predeterminado, que almacenará los archivos en una carpeta `__snapshots__/` junto al spec que ejecuta las pruebas visuales. También se puede usar una función que devuelva un `string` para establecer el valor de `baselineFolder`:

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

</Option>
### `screenshotPath`

<Option type="string | () => string" default=".tmp/" required="no" contexts="Web, Hybrid App (Webview), Native App">

El directorio que contendrá todas las capturas de pantalla actuales/de diferencias. Si no se establece, se usará el valor predeterminado. También se puede usar una función que
devuelva un string para establecer el valor de screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// O
{
    screenshotPath: () => {
        // Haz algo de magia aquí
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

</Option>
### `clearRuntimeFolder`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

Elimina la carpeta de ejecución (`actual` y `diff) al inicializar

:::info NOTA
Esto solo funcionará cuando [`screenshotPath`](#screenshotpath) se establezca mediante las opciones del plugin, y **NO FUNCIONARÁ** cuando establezcas las carpetas en los métodos
:::

</Option>
### `savePerInstance`

<Option type="boolean" default="false" required="no" contexts="Web, Hybrid App (Webview), Native App">

Guarda las imágenes de cada instancia en una carpeta separada, de modo que, por ejemplo, todas las capturas de pantalla de Chrome se guardarán en una carpeta de Chrome como `desktop_chrome`.

</Option>
### `formatImageName`

<Option type="string" default={`{tag}-{browserName}-{width}x{height}-dpr-{dpr}`} required="No" contexts="Web, Hybrid App (Webview), Native App">

El nombre de las imágenes guardadas se puede personalizar pasando el parámetro `formatImageName` con una cadena de formato como:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Se pueden pasar las siguientes variables para dar formato a la cadena, y se leerán automáticamente de las capabilities de la instancia.
Si no se pueden determinar, se utilizarán los valores predeterminados.

-   `browserName`: El nombre del navegador en las capabilities proporcionadas
-   `browserVersion`: La versión del navegador proporcionada en las capabilities
-   `deviceName`: El nombre del dispositivo de las capabilities
-   `dpr`: La relación de píxeles del dispositivo (device pixel ratio)
-   `height`: La altura de la pantalla
-   `logName`: El logName de las capabilities
-   `mobile`: Esto añadirá `_app`, o el nombre del navegador después del `deviceName`, para distinguir las capturas de aplicaciones de las capturas del navegador
-   `platformName`: El nombre de la plataforma en las capabilities proporcionadas
-   `platformVersion`: La versión de la plataforma proporcionada en las capabilities
-   `tag`: La etiqueta que se proporciona en los métodos que se están llamando
-   `width`: El ancho de la pantalla

:::info

No puedes proporcionar rutas/carpetas personalizadas en `formatImageName`. Si quieres cambiar la ruta, revisa cómo cambiar las siguientes opciones:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) por método

:::

</Option>
## Comportamiento de línea base y guardado

---

### `autoSaveBaseline`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview), Native App">

Si no se encuentra ninguna imagen de línea base durante la comparación, la imagen se copia automáticamente a la carpeta de línea base.

</Option>
### `autoElementScroll`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Esta opción te permite desactivar el desplazamiento automático del elemento hasta que sea visible cuando se crea una captura de pantalla de un elemento.

</Option>
### `alwaysSaveActualImage`

<Option type="boolean" default="true" required="No" contexts="All">

Al establecer esta opción en `false`:

- no se guardará la imagen actual cuando **no** haya diferencias
- no se almacenará el archivo de informe JSON cuando `createJsonReportFiles` esté establecido en `true`. También se mostrará una advertencia en los logs indicando que `createJsonReportFiles` está desactivado

Esto debería mejorar el rendimiento, ya que no se escriben archivos en el sistema, y debería asegurar que no haya mucho ruido en la carpeta `actual`.

</Option>
## Informes

---

### `createJsonReportFiles` **(NUEVO)**

<Option type="boolean" default="false" required="No">

Ahora tienes la opción de exportar los resultados de la comparación a un archivo de informe JSON. Al proporcionar la opción `createJsonReportFiles: true`, cada imagen que se compare creará un informe almacenado en la carpeta `actual`, junto a cada resultado de imagen `actual`. El resultado tendrá este aspecto:

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

Cuando se hayan ejecutado todas las pruebas, se generará un nuevo archivo JSON con la colección de las comparaciones, que se encuentra en la raíz de tu carpeta `actual`. Los datos se agrupan por:

-   `describe` para Jasmine/Mocha o `Feature` para CucumberJS
-   `it` para Jasmine/Mocha o `Scenario` para CucumberJS
    y luego se ordenan por:
-   `commandName`, que son los nombres de los métodos de comparación utilizados para comparar las imágenes
-   `instanceData`, primero el navegador, luego el dispositivo y luego la plataforma
    tendrá este aspecto

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

Los datos del informe te darán la oportunidad de crear tu propio informe visual sin tener que hacer toda la magia y la recopilación de datos por tu cuenta.

:::info NOTA
Necesitas usar `@wdio/visual-testing` versión `5.2.0` o superior
:::

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No" contexts="Web, Hybrid App (Webview), Native App">

La proximidad en píxeles utilizada para agrupar los píxeles de diferencia en el informe JSON generado por [`createJsonReportFiles`](#createjsonreportfiles). Los valores más altos agrupan más píxeles en menos cuadros delimitadores; los valores más bajos producen cuadros más precisos pero más numerosos.

</Option>
## General

---

### `logLevel`

<Option type="string" default="info" required="No" contexts="Web, Hybrid App (Webview), Native App">

Añade logs adicionales; las opciones son `debug | info | warn | silent`

Los errores siempre se registran en la consola.

</Option>
## Opciones de tabulación

:::info NOTA

Este módulo también permite dibujar la forma en que un usuario usaría su teclado para _tabular_ por el sitio web, dibujando líneas y puntos de un elemento tabulable a otro.<br/>
El trabajo está inspirado en la publicación del blog de [Viv Richards](https://github.com/vivrichards600) sobre ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
La forma en que se seleccionan los elementos tabulables se basa en el módulo [tabbable](https://github.com/davidtheclark/tabbable). Si hay algún problema relacionado con la tabulación, consulta el [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) y especialmente la [sección More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Las opciones que se pueden cambiar para las líneas y los puntos si usas los métodos `{save|check}Tabbable`. Las opciones se explican a continuación.

</Option>
#### `tabbableOptions.circle`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Las opciones para cambiar el círculo.

</Option>
##### `tabbableOptions.circle.backgroundColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

El color de fondo del círculo.

</Option>
##### `tabbableOptions.circle.borderColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

El color del borde del círculo.

</Option>
##### `tabbableOptions.circle.borderWidth`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

El ancho del borde del círculo.

</Option>
##### `tabbableOptions.circle.fontColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

El color de la fuente del texto en el círculo. Solo se mostrará si [`showNumber`](./#tabbableoptionscircleshownumber) está establecido en `true`.

</Option>
##### `tabbableOptions.circle.fontFamily`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

La familia de la fuente del texto en el círculo. Solo se mostrará si [`showNumber`](./#tabbableoptionscircleshownumber) está establecido en `true`.

Asegúrate de establecer fuentes que sean compatibles con los navegadores.

</Option>
##### `tabbableOptions.circle.fontSize`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

El tamaño de la fuente del texto en el círculo. Solo se mostrará si [`showNumber`](./#tabbableoptionscircleshownumber) está establecido en `true`.

</Option>
##### `tabbableOptions.circle.size`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

El tamaño del círculo.

</Option>
##### `tabbableOptions.circle.showNumber`

<Option type="showNumber" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Muestra el número de la secuencia de tabulación en el círculo.

</Option>
#### `tabbableOptions.line`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Las opciones para cambiar la línea.

</Option>
##### `tabbableOptions.line.color`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

El color de la línea.

</Option>
##### `tabbableOptions.line.width`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

El ancho de la línea.

</Option>
## Opciones de comparación

### `compareOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) for all default values" required="No" contexts="Web, Hybrid App (Webview), Native App (See [Method Compare options](./method-options#compare-check-options) for more information)">

Las opciones de comparación también se pueden establecer como opciones del servicio; se describen en las [Opciones de comparación de los métodos](/docs/visual-testing/method-options#compare-check-options)

</Option>