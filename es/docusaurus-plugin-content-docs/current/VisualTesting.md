---
id: visual-testing
title: Pruebas Visuales
---


## ¿Qué puede hacer?

WebdriverIO proporciona comparaciones de imágenes en pantallas, elementos o página completa para

-   🖥️ Navegadores de escritorio (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Navegadores móviles / tabletas (Chrome en emuladores Android / Safari en Simuladores iOS / Simuladores / dispositivos reales) a través de Appium
-   📱 Aplicaciones nativas (emuladores Android / Simuladores iOS / dispositivos reales) a través de Appium (🌟 **NUEVO** 🌟)
-   📳 Aplicaciones híbridas a través de Appium

a través del [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service) que es un servicio ligero de WebdriverIO.

Esto te permite:

-   guardar o comparar pantallas de **pantallas/elementos/página completa** contra una línea base
-   **crear automáticamente una línea base** cuando no hay ninguna
-   **bloquear regiones personalizadas** e incluso **excluir automáticamente** barras de estado y/o herramientas (solo móvil) durante una comparación
-   aumentar las dimensiones de las capturas de pantalla de elementos
-   **ocultar texto** durante la comparación de sitios web para:
    -   **mejorar la estabilidad** y prevenir la inestabilidad en la renderización de fuentes
    -   enfocarse solo en el **diseño** de un sitio web
-   usar **diferentes métodos de comparación** y un conjunto de **comparadores adicionales** para pruebas más legibles
-   verificar cómo tu sitio web **soportará la navegación con teclado**, ver también [Navegación por tabulación en un sitio web](#tabbing-through-a-website)
-   y mucho más, consulta las opciones de [servicio](./visual-testing/service-options) y [método](./visual-testing/method-options)

El servicio es un módulo ligero para recuperar los datos y capturas de pantalla necesarios para todos los navegadores/dispositivos. El poder de comparación proviene de [ResembleJS](https://github.com/Huddle/Resemble.js). Si quieres comparar imágenes en línea, puedes consultar la [herramienta en línea](http://rsmbl.github.io/Resemble.js/).

:::info NOTA Para Aplicaciones Nativas/Híbridas
Los métodos `saveScreen`, `saveElement`, `checkScreen`, `checkElement` y los comparadores `toMatchScreenSnapshot` y `toMatchElementSnapshot` pueden ser utilizados para Aplicaciones/Contextos Nativos.

Por favor, utiliza la propiedad `isHybridApp:true` en la configuración de tu servicio cuando quieras usarlo para Aplicaciones Híbridas.
:::

## Instalación

La forma más sencilla es mantener `@wdio/visual-service` como una dependencia de desarrollo en tu `package.json`, mediante:

```sh
npm install --save-dev @wdio/visual-service
```

## Uso

`@wdio/visual-service` puede ser utilizado como un servicio normal. Puedes configurarlo en tu archivo de configuración de la siguiente manera:

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
                // Algunas opciones, consulta la documentación para más información
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

Más opciones de servicio se pueden encontrar [aquí](/docs/visual-testing/service-options).

Una vez configurado en tu configuración de WebdriverIO, puedes agregar aserciones visuales a [tus pruebas](/docs/visual-testing/writing-tests).

### Capacidades
Para usar el módulo de Pruebas Visuales, **no necesitas agregar ninguna opción extra a tus capacidades**. Sin embargo, en algunos casos, es posible que desees agregar metadatos adicionales a tus pruebas visuales, como un `logName`.

El `logName` te permite asignar un nombre personalizado a cada capacidad, que luego puede incluirse en los nombres de archivo de las imágenes. Esto es particularmente útil para distinguir capturas de pantalla tomadas en diferentes navegadores, dispositivos o configuraciones.

Para habilitarlo, puedes definir `logName` en la sección `capabilities` y asegurarte de que la opción `formatImageName` en el servicio de Pruebas Visuales lo referencie. Así es como puedes configurarlo:

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
                logName: 'chrome-mac-15', // Nombre de registro personalizado para Chrome
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Nombre de registro personalizado para Firefox
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // Algunas opciones, consulta la documentación para más información
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // El formato a continuación usará el `logName` de las capacidades
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... más opciones
            },
        ],
    ],
    // ...
};
```

#### Cómo funciona
1. Configurando el `logName`:

    - En la sección `capabilities`, asigna un `logName` único a cada navegador o dispositivo. Por ejemplo, `chrome-mac-15` identifica pruebas ejecutadas en Chrome en macOS versión 15.

2. Nomenclatura personalizada de imágenes:

    - La opción `formatImageName` integra el `logName` en los nombres de archivo de las capturas de pantalla. Por ejemplo, si el `tag` es homepage y la resolución es `1920x1080`, el nombre de archivo resultante podría verse así:

        `homepage-chrome-mac-15-1920x1080.png`

3. Beneficios de la nomenclatura personalizada:

    - Distinguir entre capturas de pantalla de diferentes navegadores o dispositivos se vuelve mucho más fácil, especialmente al gestionar líneas base y depurar discrepancias.

4. Nota sobre los valores predeterminados:

    - Si `logName` no está configurado en las capacidades, la opción `formatImageName` lo mostrará como una cadena vacía en los nombres de archivo (`homepage--15-1920x1080.png`)

### WebdriverIO MultiRemote

También soportamos [MultiRemote](https://webdriver.io/docs/multiremote/). Para que esto funcione correctamente, asegúrate de agregar `wdio-ics:options` a tus
capacidades como puedes ver a continuación. Esto asegurará que cada captura de pantalla tenga su propio nombre único.

[Escribir tus pruebas](/docs/visual-testing/writing-tests) no será diferente en comparación con el uso del [testrunner](https://webdriver.io/docs/testrunner)

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
                // ¡ESTO!
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
                // ¡ESTO!
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### Ejecución programática

Aquí hay un ejemplo mínimo de cómo usar `@wdio/visual-service` a través de opciones `remote`:

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

// "Inicia" el servicio para agregar los comandos personalizados al `browser`
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// o usa esto SOLO para guardar una captura de pantalla
await browser.saveFullPageScreen("examplePaged", {});

// o usa esto para validar. Ambos métodos no necesitan combinarse, consulta las FAQ
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### Navegación por tabulación en un sitio web

Puedes verificar si un sitio web es accesible utilizando la tecla <kbd>TAB</kbd> del teclado. Probar esta parte de la accesibilidad siempre ha sido un trabajo (manual) que consume mucho tiempo y bastante difícil de hacer a través de la automatización.
Con los métodos `saveTabbablePage` y `checkTabbablePage`, ahora puedes dibujar líneas y puntos en tu sitio web para verificar el orden de tabulación.

Ten en cuenta que esto solo es útil para navegadores de escritorio y **NO** para dispositivos móviles. Todos los navegadores de escritorio admiten esta función.

:::note

El trabajo está inspirado en la publicación del blog de [Viv Richards](https://github.com/vivrichards600) sobre ["AUTOMATIZANDO LA TABULACIÓN DE PÁGINA (¿ES ESA UNA PALABRA?) CON PRUEBAS VISUALES"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

La forma en que se seleccionan los elementos tabulables se basa en el módulo [tabbable](https://github.com/davidtheclark/tabbable). Si hay algún problema relacionado con la tabulación, consulta el [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) y especialmente la sección [Más detalles](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

#### Cómo funciona

Ambos métodos crearán un elemento `canvas` en tu sitio web y dibujarán líneas y puntos para mostrarte dónde iría tu TAB si un usuario final lo usara. Después de eso, creará una captura de pantalla de página completa para darte una buena visión general del flujo.

:::important

**Usa `saveTabbablePage` solo cuando necesites crear una captura de pantalla y NO quieras compararla con una imagen de línea base.**

:::

Cuando quieras comparar el flujo de tabulación con una línea base, puedes usar el método `checkTabbablePage`. **NO** necesitas usar los dos métodos juntos. Si ya hay una imagen de línea base creada, que puede hacerse automáticamente proporcionando `autoSaveBaseline: true` cuando instancias el servicio,
el `checkTabbablePage` primero creará la imagen _actual_ y luego la comparará con la línea base.

##### Opciones

Ambos métodos utilizan las mismas opciones que [`saveFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#savefullpagescreen-or-savetabbablepage) o
[`compareFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#comparefullpagescreen-or-comparetabbablepage).

#### Ejemplo

Este es un ejemplo de cómo funciona la tabulación en nuestro [sitio web de conejillo de indias](https://guinea-pig.webdriver.io/image-compare.html):

![Ejemplo de tabulación WDIO](/img/visual/tabbable-chrome-latest-1366x768.png)

### Actualizar automáticamente las instantáneas visuales fallidas

Actualiza las imágenes de línea base a través de la línea de comandos agregando el argumento `--update-visual-baseline`. Esto

-   copiará automáticamente la captura de pantalla real y la colocará en la carpeta de línea base
-   si hay diferencias, hará que la prueba pase porque la línea base ha sido actualizada

**Uso:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Al ejecutar en modo de registro info/debug, verás los siguientes registros agregados

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

Este módulo incluye soporte para TypeScript, lo que te permite beneficiarte de la autocompletación, seguridad de tipos y una mejor experiencia de desarrollo al usar el servicio de Pruebas Visuales.

### Paso 1: Agregar definiciones de tipos
Para asegurarte de que TypeScript reconozca los tipos del módulo, agrega la siguiente entrada al campo types en tu tsconfig.json:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Paso 2: Habilitar la seguridad de tipos para las opciones del servicio
Para aplicar la verificación de tipos en las opciones del servicio, actualiza tu configuración de WebdriverIO:

```ts
// wdio.conf.ts
import { join } from 'node:path';
// Importa la definición de tipo
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

### Versión 5 y superiores

Para la versión 5 y superiores, este módulo es un módulo puramente basado en JavaScript sin dependencias adicionales del sistema más allá de