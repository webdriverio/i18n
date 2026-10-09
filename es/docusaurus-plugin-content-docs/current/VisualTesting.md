---
id: visual-testing
title: Pruebas visuales
description: "Compara capturas de pantalla de pantallas, elementos o páginas completas con imágenes de referencia mediante @wdio/visual-service, incluyendo su instalación y uso."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## ¿Qué puede hacer?

WebdriverIO ofrece comparaciones de imágenes de pantallas, elementos o páginas completas para

-   🖥️ Navegadores de escritorio (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Navegadores móviles / de tableta (Chrome en emuladores de Android / Safari en simuladores de iOS / simuladores / dispositivos reales) a través de Appium
-   📱 Apps nativas (emuladores de Android / simuladores de iOS / dispositivos reales) a través de Appium (🌟 **NUEVO** 🌟)
-   📳 Apps híbridas a través de Appium

mediante [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service), que es un servicio ligero de WebdriverIO.

Esto te permite:

-   guardar o comparar capturas de **pantallas/elementos/páginas completas** con una imagen de referencia (baseline)
-   **crear automáticamente una imagen de referencia** cuando no existe ninguna
-   **ocultar regiones personalizadas** e incluso **excluir automáticamente** la barra de estado y/o las barras de herramientas (solo en móviles) durante una comparación
-   aumentar las dimensiones de las capturas de elementos
-   **ocultar texto** durante la comparación de sitios web para:
    -   **mejorar la estabilidad** y evitar inconsistencias en el renderizado de fuentes
    -   centrarte únicamente en el **diseño (layout)** de un sitio web
-   usar **diferentes métodos de comparación** y un conjunto de **matchers adicionales** para obtener pruebas más legibles
-   verificar cómo tu sitio web **admite la navegación con la tecla Tab de tu teclado)**, consulta también [Navegar con Tab por un sitio web](#tabbing-through-a-website)
-   y mucho más, consulta las opciones del [servicio](./visual-testing/service-options) y de los [métodos](./visual-testing/method-options)

El servicio es un módulo ligero que obtiene los datos y las capturas de pantalla necesarios para todos los navegadores/dispositivos. La potencia de comparación proviene de [Pixelmatch](https://github.com/mapbox/pixelmatch), una biblioteca de comparación perceptual de imágenes rápida y precisa que utiliza el espacio de color YIQ. Las imágenes se procesan con [fast-png](https://github.com/image-js/fast-png), un códec PNG sin dependencias nativas.

:::info NOTA para apps nativas/híbridas
Los métodos `saveScreen`, `saveElement`, `checkScreen`, `checkElement` y los matchers `toMatchScreenSnapshot` y `toMatchElementSnapshot` pueden utilizarse para apps/contextos nativos.

Utiliza la propiedad `isHybridApp:true` en la configuración del servicio cuando quieras usarlo para apps híbridas.
:::

:::caution ¿Actualizando desde v9 (o inferior)?

`@wdio/visual-service` **v10** cambió el motor de comparación de **ResembleJS** a **[Pixelmatch](https://github.com/mapbox/pixelmatch)**. Pixelmatch utiliza un modelo de color perceptual (YIQ) en lugar de RGB sin procesar, por lo que los porcentajes de diferencia serán distintos a los de v9. Esto significa que:

-   **Tu código de pruebas no necesita cambiar.** Todos los nombres de métodos, nombres de opciones y matchers son idénticos.
-   **Es posible que tengas que actualizar tus imágenes de referencia.** Tras actualizar, ejecuta tu suite de pruebas y revisa las diferencias visuales. Puedes actualizar individualmente las imágenes de referencia que fallen con `--update-visual-baseline`, o eliminar toda tu carpeta de imágenes de referencia y dejar que `autoSaveBaseline` la vuelva a crear desde cero. Consulta las [preguntas frecuentes](/docs/visual-testing/faq#my-visual-tests-fail-with-a-difference-how-can-i-update-my-baseline) para más detalles.

:::

## Instalación

La forma más sencilla es mantener `@wdio/visual-service` como dependencia de desarrollo en tu `package.json`, mediante:

```sh
npm install --save-dev @wdio/visual-service
```

## Uso

`@wdio/visual-service` puede utilizarse como un servicio normal. Puedes configurarlo en tu archivo de configuración de la siguiente manera:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // Algunas opciones, consulta la documentación para ver más
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                formatImageName: "{tag}-{logName}-{width}x{height}",
                screenshotPath: path.join(process.cwd(), "tmp"),
                savePerInstance: true,
                // ... más opciones
            },
        ],
    ],
    // ...
};
```

Puedes encontrar más opciones del servicio [aquí](/docs/visual-testing/service-options).

Una vez configurado en tu configuración de WebdriverIO, puedes empezar a añadir aserciones visuales a [tus pruebas](/docs/visual-testing/writing-tests).

### Capabilities
Para usar el módulo de pruebas visuales, **no necesitas añadir ninguna opción adicional a tus capabilities**. Sin embargo, en algunos casos puede que quieras añadir metadatos adicionales a tus pruebas visuales, como un `logName`.

El `logName` te permite asignar un nombre personalizado a cada capability, que luego puede incluirse en los nombres de archivo de las imágenes. Esto es especialmente útil para distinguir las capturas de pantalla tomadas en diferentes navegadores, dispositivos o configuraciones.

Para habilitarlo, puedes definir `logName` en la sección `capabilities` y asegurarte de que la opción `formatImageName` del servicio de pruebas visuales haga referencia a él. Así es como puedes configurarlo:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    capabilities: [
        {
            browserName: 'chrome',
            'wdio-ics:options': {
                logName: 'chrome-mac-15', // Nombre de log personalizado para Chrome
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Nombre de log personalizado para Firefox
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // Algunas opciones, consulta la documentación para ver más
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // El siguiente formato utilizará el `logName` de las capabilities
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... más opciones
            },
        ],
    ],
    // ...
};
```

#### Cómo funciona
1. Configuración del `logName`:

    - En la sección `capabilities`, asigna un `logName` único a cada navegador o dispositivo. Por ejemplo, `chrome-mac-15` identifica las pruebas que se ejecutan en Chrome en macOS versión 15.

2. Nombres de imagen personalizados:

    - La opción `formatImageName` integra el `logName` en los nombres de archivo de las capturas de pantalla. Por ejemplo, si el `tag` es homepage y la resolución es `1920x1080`, el nombre de archivo resultante podría verse así:

        `homepage-chrome-mac-15-1920x1080.png`

3. Ventajas de los nombres personalizados:

    - Distinguir entre capturas de pantalla de diferentes navegadores o dispositivos resulta mucho más fácil, especialmente al gestionar imágenes de referencia y depurar discrepancias.

4. Nota sobre los valores predeterminados:

    -Si `logName` no está definido en las capabilities, la opción `formatImageName` lo mostrará como una cadena vacía en los nombres de archivo (`homepage--15-1920x1080.png`)

### WebdriverIO multi-remote

También admitimos [multi-remote](https://webdriver.io/docs/multiremote/). Para que funcione correctamente, asegúrate de añadir `wdio-ics:options` a tus
capabilities, como puedes ver a continuación. Esto garantizará que cada captura de pantalla tenga su propio nombre único.

[Escribir tus pruebas](/docs/visual-testing/writing-tests) no será diferente en comparación con usar el [testrunner](https://webdriver.io/docs/testrunner)

```js
// wdio.conf.js
export const config = {
    capabilities: {
        chromeBrowserOne: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // ¡¡¡ESTO!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-one",
                },
            },
        },
        chromeBrowserTwo: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // ¡¡¡ESTO!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### Ejecución programática

Aquí tienes un ejemplo mínimo de cómo usar `@wdio/visual-service` mediante las opciones de `remote`:

```js
import { remote } from "webdriverio";
import VisualService from "@wdio/visual-service";

let visualService = new VisualService({
    autoSaveBaseline: true,
});

const browser = await remote({
    logLevel: "silent",
    capabilities: {
        browserName: "chrome",
    },
});

// "Inicia" el servicio para añadir los comandos personalizados al `browser`
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// o usa esto ÚNICAMENTE para guardar una captura de pantalla
await browser.saveFullPageScreen("examplePaged", {});

// o usa esto para validar. No es necesario combinar ambos métodos, consulta las preguntas frecuentes
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### Navegar con Tab por un sitio web

Puedes comprobar si un sitio web es accesible usando la tecla <kbd>TAB</kbd> del teclado. Probar esta parte de la accesibilidad siempre ha sido un trabajo (manual) que consume mucho tiempo y bastante difícil de realizar mediante automatización.
Con los métodos `saveTabbablePage` y `checkTabbablePage`, ahora puedes dibujar líneas y puntos en tu sitio web para verificar el orden de tabulación.

Ten en cuenta que esto solo es útil para navegadores de escritorio y **NO\*\*** para dispositivos móviles. Todos los navegadores de escritorio admiten esta funcionalidad.

:::note

Este trabajo está inspirado en la publicación del blog de [Viv Richards](https://github.com/vivrichards600) sobre ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

La forma en que se seleccionan los elementos tabulables se basa en el módulo [tabbable](https://github.com/davidtheclark/tabbable). Si hay algún problema relacionado con la tabulación, consulta el [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) y especialmente la sección [More ](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)Details.

:::

#### Cómo funciona

Ambos métodos crearán un elemento `canvas` en tu sitio web y dibujarán líneas y puntos para mostrarte adónde iría tu TAB si un usuario final lo usara. Después, crearán una captura de pantalla de la página completa para ofrecerte una buena visión general del flujo.

:::important

**Usa `saveTabbablePage` solo cuando necesites crear una captura de pantalla y NO quieras compararla **con una imagen de **referencia**.\*\*\*\*

:::

Cuando quieras comparar el flujo de tabulación con una imagen de referencia, puedes usar el método `checkTabbablePage`. **NO** necesitas usar los dos métodos juntos. Si ya existe una imagen de referencia, lo cual puede hacerse automáticamente proporcionando `autoSaveBaseline: true` al instanciar el servicio,
`checkTabbablePage` primero creará la imagen _actual_ y luego la comparará con la imagen de referencia.

##### Opciones

Ambos métodos utilizan las mismas opciones que `saveFullPageScreen` o `compareFullPageScreen`.

#### Ejemplo

Este es un ejemplo de cómo funciona la tabulación en nuestro [sitio web de pruebas (guinea pig)](https://guinea-pig.webdriver.io/image-compare.html):

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### Actualizar automáticamente las instantáneas visuales fallidas

Actualiza las imágenes de referencia desde la línea de comandos añadiendo el argumento `--update-visual-baseline`. Esto

-   copiará automáticamente la captura de pantalla actual tomada y la colocará en la carpeta de imágenes de referencia
-   si hay diferencias, dejará que la prueba pase porque la imagen de referencia se ha actualizado

**Uso:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Al ejecutar en modo de logs info/debug, verás que se añaden los siguientes logs

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## Soporte para TypeScript

Este módulo incluye soporte para TypeScript, lo que te permite beneficiarte del autocompletado, la seguridad de tipos y una mejor experiencia de desarrollo al usar el servicio de pruebas visuales.

### Paso 1: Añadir las definiciones de tipos
Para asegurarte de que TypeScript reconozca los tipos del módulo, añade la siguiente entrada al campo types de tu tsconfig.json:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Paso 2: Habilitar la seguridad de tipos para las opciones del servicio
Para aplicar la comprobación de tipos en las opciones del servicio, actualiza tu configuración de WebdriverIO:

```ts
// wdio.conf.ts
import { join } from 'node:path';
// Importa la definición de tipos
import type { VisualServiceOptions } from '@wdio/visual-service';

export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // Opciones del servicio
                baselineFolder: join(process.cwd(), './__snapshots__/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
            } satisfies VisualServiceOptions, // Garantiza la seguridad de tipos
        ],
    ],
    // ...
};
```

## Requisitos del sistema

### Versión 10 y posteriores (actual)

A partir de la versión 10, este módulo no tiene dependencias de sistema adicionales más allá de los [requisitos generales del proyecto](/docs/gettingstarted#system-requirements). Utiliza [Pixelmatch](https://github.com/mapbox/pixelmatch) para la comparación perceptual de imágenes y [fast-png](https://github.com/image-js/fast-png) para la codificación/decodificación de imágenes. Ambos están escritos íntegramente en JavaScript y no tienen dependencias nativas.

### Versiones 5 a 9 (legacy)

Las versiones 5 a 9 utilizaban [Jimp](https://github.com/jimp-dev/jimp), una biblioteca de procesamiento de imágenes para Node escrita completamente en JavaScript, sin dependencias nativas. No se requerían dependencias de sistema adicionales.

### Versión 4 e inferiores

Para la versión 4 e inferiores, este módulo depende de [Canvas](https://github.com/Automattic/node-canvas), una implementación de canvas para Node.js. Canvas depende de [Cairo](https://cairographics.org/).

#### Detalles de instalación

De forma predeterminada, los binarios para macOS, Linux y Windows se descargarán durante el `npm install` de tu proyecto. Si no tienes un sistema operativo o una arquitectura de procesador compatibles, el módulo se compilará en tu sistema. Esto requiere varias dependencias, incluidas Cairo y Pango.

Para obtener información detallada sobre la instalación, consulta la [wiki de node-canvas](https://github.com/Automattic/node-canvas/wiki/_pages). A continuación se muestran instrucciones de instalación de una sola línea para los sistemas operativos más comunes. Ten en cuenta que `libgif/giflib`, `librsvg` y `libjpeg` son opcionales y solo son necesarios para la compatibilidad con GIF, SVG y JPEG, respectivamente. Se requiere Cairo v1.10.0 o posterior.

<Tabs
defaultValue="osx"
values={[
{label: 'OS', value: 'osx'},
{label: 'Ubuntu', value: 'ubuntu'},
{label: 'Fedora', value: 'fedora'},
{label: 'Solaris', value: 'solaris'},
{label: 'OpenBSD', value: 'openbsd'},
{label: 'Window', value: 'windows'},
{label: 'Others', value: 'others'},
]}

> <TabItem value="osx">

     Usando [Homebrew](https://brew.sh/):

     ```sh
     brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
     ```

    **Mac OS X v10.11+:** Si has actualizado recientemente a Mac OS X v10.11+ y tienes problemas al compilar, ejecuta el siguiente comando: `xcode-select --install`. Lee más sobre el problema [en Stack Overflow](http://stackoverflow.com/a/32929012/148072).
    Si tienes instalado Xcode 10.0 o superior, para compilar desde el código fuente necesitas NPM 6.4.1 o superior.

</TabItem>
<TabItem value="ubuntu">

    ```sh
    sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
    ```

</TabItem>
<TabItem value="fedora">

    ```sh
    sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
    ```

</TabItem>
<TabItem value="solaris">

    ```sh
    pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
    ```

</TabItem>
<TabItem value="openbsd">

    ```sh
    doas pkg_add cairo pango png jpeg giflib
    ```

</TabItem>
<TabItem value="windows">

    Consulta la [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)

</TabItem>
<TabItem value="others">

    Consulta la [wiki](https://github.com/Automattic/node-canvas/wiki)

</TabItem>
</Tabs>