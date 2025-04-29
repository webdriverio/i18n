---
id: wdio-ocr-service
title: Servicio de Pruebas OCR
custom_edit_url: https://github.com/webdriverio/visual-testing/edit/main/README.md
---


> @wdio/ocr-service es un paquete de terceros, para más información consulta [GitHub](https://github.com/webdriverio/visual-testing) | [npm](https://www.npmjs.com/package/@wdio/ocr-service)

Para documentación sobre pruebas visuales con WebdriverIO, consulta la [documentación](https://webdriver.io/docs/visual-testing). Este proyecto contiene todos los módulos relevantes para ejecutar pruebas visuales con WebdriverIO. Dentro del directorio `./packages` encontrarás:

-   `@wdio/visual-testing`: el servicio de WebdriverIO para integrar pruebas visuales
-   `webdriver-image-comparison`: Un módulo de comparación de imágenes que puede utilizarse para diferentes frameworks de automatización de pruebas NodeJS que soporten el protocolo WebDriver

## Ejecutor de Storybook (BETA)

<details>
  <summary>Haz clic para ver más documentación sobre el Ejecutor de Storybook BETA</summary>

> El Ejecutor de Storybook todavía está en BETA, la documentación se trasladará posteriormente a las páginas de documentación de [WebdriverIO](https://webdriver.io/docs/visual-testing).

Este módulo ahora soporta Storybook con un nuevo Ejecutor Visual. Este ejecutor escanea automáticamente una instancia local/remota de Storybook y creará capturas de pantalla de elementos de cada componente. Esto se puede hacer añadiendo

```ts
export const config: WebdriverIO.Config = {
    // ...
    services: ["visual"],
    // ....
};
```

a tus `services` y ejecutando `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook` a través de la línea de comandos.
Usará Chrome en modo headless como navegador predeterminado.

> [!NOTE]
>
> -   La mayoría de las opciones de Pruebas Visuales también funcionarán para el Ejecutor de Storybook, consulta la documentación de [WebdriverIO](https://webdriver.io/docs/visual-testing).
> -   El Ejecutor de Storybook sobrescribirá todas tus capacidades y solo puede ejecutarse en los navegadores que soporta, consulta [`--browsers`](#browsers).
> -   El Ejecutor de Storybook no soporta una configuración existente que use capacidades Multiremote y lanzará un error.
> -   El Ejecutor de Storybook solo soporta Web de Escritorio, no Web Móvil.

### Opciones de Servicio del Ejecutor de Storybook

Las opciones de servicio pueden proporcionarse así

```ts
export const config: WebdriverIO.Config  = {
    // ...
    services: [
      [
        'visual',
        {
            // Algunas opciones predeterminadas
            baselineFolder: join(process.cwd(), './__snapshots__/'),
            debug: true,
            // Las opciones de storybook, consulta las opciones cli para la descripción
            storybook: {
                additionalSearchParams: new URLSearchParams({foo: 'bar', abc: 'def'}),
                clip: false,
                clipSelector: ''#some-id,
                numShards: 4,
                // `skipStories` puede ser una cadena ('example-button--secondary'),
                // un array (['example-button--secondary', 'example-button--small'])
                // o una expresión regular que debe proporcionarse como cadena ("/.*button.*/gm")
                skipStories: ['example-button--secondary', 'example-button--small'],
                url: 'https://www.bbc.co.uk/iplayer/storybook/',
                version: 6,
                // Opcional - Permite sobrescribir la ruta de las líneas base. Por defecto agrupará las líneas base por categoría y componente (ej. forms/input/baseline.png)
                getStoriesBaselinePath: (category, component) => `path__${category}__${component}`,
            },
        },
      ],
    ],
    // ....
}
```

### Opciones CLI del Ejecutor de Storybook

#### `--additionalSearchParams`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** ''
-   **Ejemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --additionalSearchParams="foo=bar&abc=def"`

Agregará parámetros de búsqueda adicionales a la URL de Storybook.
Consulta la documentación de [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) para más información. La cadena debe ser una cadena válida de URLSearchParams.

> [!NOTE]
> Las comillas dobles son necesarias para evitar que el `&` sea interpretado como un separador de comandos.
> Por ejemplo, con `--additionalSearchParams="foo=bar&abc=def"` generará la siguiente URL de Storybook para pruebas de historias: `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.

#### `--browsers`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** `chrome`, puedes seleccionar entre `chrome|firefox|edge|safari`
-   **Ejemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --browsers=chrome,firefox,edge,safari`
-   **NOTA:** Solo disponible a través de la CLI

Utilizará los navegadores proporcionados para tomar capturas de pantalla de componentes

> [!NOTE]
> Asegúrate de tener instalados en tu máquina local los navegadores en los que quieres ejecutar

#### `--clip`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `true`
-   **Ejemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clip=false`

Cuando está desactivado, creará una captura de pantalla del viewport. Cuando está activado, creará capturas de pantalla de elementos basadas en el [`--clipSelector`](#clipselector), lo que reducirá la cantidad de espacio en blanco alrededor de la captura del componente y reducirá el tamaño de la captura.

#### `--clipSelector`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** `#storybook-root > :first-child` para Storybook V7 y `#root > :first-child:not(script):not(style)` para Storybook V6, ver también [`--version`](#version)
-   **Ejemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clipSelector="#some-id"`

Este es el selector que se utilizará:

-   para seleccionar el elemento del que tomar la captura de pantalla
-   para el elemento a esperar que sea visible antes de tomar una captura de pantalla

#### `--devices`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** Puedes seleccionar de [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts)
-   **Ejemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --devices="iPhone 14 Pro Max","Pixel 3 XL"`
-   **NOTA:** Solo disponible a través de la CLI

Utilizará los dispositivos proporcionados que coincidan con [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts) para tomar capturas de pantalla de componentes

> [!NOTE]
>
> -   Si falta una configuración de dispositivo, no dudes en enviar una [Solicitud de función](https://github.com/webdriverio/visual-testing/issues/new?assignees=&labels=&projects=&template=--feature-request.md)
> -   Esto solo funcionará con Chrome:
>     -   si proporcionas `--devices`, todas las instancias de Chrome se ejecutarán en modo de **Emulación Móvil**
>     -   si también proporcionas otros navegadores además de Chrome, como `--devices --browsers=firefox,safari,edge`, agregará automáticamente Chrome en modo de emulación móvil
> -   El Ejecutor de Storybook creará por defecto capturas de elementos; si quieres ver la captura completa de Emulación Móvil, proporciona `--clip=false` a través de la línea de comandos
> -   El nombre del archivo se verá por ejemplo como `__snapshots__/example/button/desktop_chrome/example-button--large-local-chrome-iPhone-14-Pro-Max-430x932-dpr-3.png`
> -   **[FUENTE:](https://chromedriver.chromium.org/mobile-emulation#h.p_ID_167)** Probar un sitio web móvil en un escritorio usando emulación móvil puede ser útil, pero los evaluadores deben ser conscientes de que hay muchas diferencias sutiles como:
>     -   GPU completamente diferente, lo que puede conducir a grandes cambios de rendimiento;
>     -   la interfaz móvil no se emula (en particular, la barra de URL oculta afecta la altura de la página);
>     -   el popup de desambiguación (donde seleccionas uno de varios objetivos táctiles) no es compatible;
>     -   muchas APIs de hardware (por ejemplo, el evento orientationchange) no están disponibles.

#### `--headless`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `true`
-   **Ejemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --headless=false`
-   **NOTA:** Solo disponible a través de la CLI

Esto ejecutará las pruebas por defecto en modo headless (cuando el navegador lo soporte) o puede desactivarse

#### `--numShards`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Predeterminado:** `true`
-   **Ejemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --numShards=10`

Este será el número de instancias paralelas que se utilizarán para ejecutar las historias. Esto estará limitado por el `maxInstances` en tu archivo `wdio.conf`.

> [!IMPORTANT]
> Cuando se ejecuta en modo `headless`, no aumentes el número a más de 20 para evitar inestabilidad debido a restricciones de recursos

#### `--skipStories`

-   **Tipo:** `string|regex`
-   **Obligatorio:** No
-   **Predeterminado:** null
-   **Ejemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --skipStories="/.*button.*/gm"`

Esto puede ser:

-   una cadena (`example-button--secondary,example-button--small`)
-   o una expresión regular (`"/.*button.*/gm"`)

para omitir ciertas historias. Usa el `id` de la historia que se puede encontrar en la URL de la historia. Por ejemplo, el `id` en esta URL `http://localhost:6006/?path=/story/example-page--logged-out` es `example-page--logged-out`

#### `--url`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** `http://127.0.0.1:6006`
-   **Ejemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --url="https://example.com"`

La URL donde está alojada tu instancia de Storybook.

#### `--version`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Predeterminado:** 7
-   **Ejemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --version=6`

Esta es la versión de Storybook, por defecto es `7`. Esto es necesario para saber si se debe usar el [`clipSelector`](#clipselector) de V6.

### Pruebas de Interacción de Storybook

Las Pruebas de Interacción de Storybook te permiten interactuar con tu componente creando scripts personalizados con comandos WDIO para poner un componente en un estado determinado. Por ejemplo, mira el siguiente fragmento de código:

```ts
import { browser, expect } from "@wdio/globals";

describe("Storybook Interaction", () => {
    it("should create screenshots for the logged in state when it logs out", async () => {
        const componentId = "example-page--logged-in";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
        await $("button=Log out").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
    });

    it("should create screenshots for the logged out state when it logs in", async () => {
        const componentId = "example-page--logged-out";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
        await $("button=Log in").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
    });
});
```

Se ejecutan dos pruebas en dos componentes diferentes. Cada prueba primero establece un estado y luego toma una captura de pantalla. También notarás que se ha introducido un nuevo comando personalizado, que puedes encontrar [aquí](#new-custom-command).

El archivo de especificación anterior se puede guardar en una carpeta y añadir a la línea de comandos con el siguiente comando:

```sh
pnpm run test.local.desktop.storybook.localhost -- --spec='tests/specs/storybook-interaction/*.ts'
```

El ejecutor de Storybook primero escaneará automáticamente tu instancia de Storybook y luego agregará tus pruebas a las historias que necesitan ser comparadas. Si no quieres que los componentes que usas para pruebas de interacción se comparen dos veces, puedes añadir un filtro para eliminar las historias "predeterminadas" del escaneo proporcionando el filtro [`--skipStories`](#--skipstories). Esto se vería así:

```sh
pnpm run test.local.desktop.storybook.localhost -- --skipStories="/example-page.*/gm" --spec='tests/specs/storybook-interaction/*.ts'
```

### Nuevo Comando Personalizado

Se añadirá un nuevo comando personalizado llamado `browser.waitForStorybookComponentToBeLoaded({ id: 'componentId' })` al objeto `browser/driver` que cargará automáticamente el componente y esperará a que esté listo, por lo que no necesitas usar el método `browser.url('url.com')`. Se puede usar así:

```ts
import { browser, expect } from "@wdio/globals";

describe("Storybook Interaction", () => {
    it("should create screenshots for the logged in state when it logs out", async () => {
        const componentId = "example-page--logged-in";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
        await $("button=Log out").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
    });

    it("should create screenshots for the logged out state when it logs in", async () => {
        const componentId = "example-page--logged-out";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
        await $("button=Log in").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
    });
});
```

Las opciones son:

#### `additionalSearchParams`

-   **Tipo:** [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
-   **Obligatorio:** No
-   **Predeterminado:** `new URLSearchParams()`
-   **Ejemplo:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    additionalSearchParams: new URLSearchParams({ foo: "bar", abc: "def" }),
    id: "componentId",
});
```

Esto añadirá parámetros de búsqueda adicionales a la URL de Storybook, en el ejemplo anterior la URL será `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.
Consulta la documentación de [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) para más información.

#### `clipSelector`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** `#storybook-root > :first-child` para Storybook V7 y `#root > :first-child:not(script):not(style)` para Storybook V6
-   **Ejemplo:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    clipSelector: "#your-selector",
    id: "componentId",
});
```

Este es el selector que se utilizará:

-   para seleccionar el elemento del que tomar la captura de pantalla
-   para el elemento a esperar que sea visible antes de tomar una captura de pantalla

#### `id`

-   **Tipo:** `string`
-   **Obligatorio:** sí
-   **Ejemplo:**

```ts
await browser.waitForStorybookComponentToBeLoaded({ '#your-selector', id: 'componentId' })
```

Usa el `id` de la historia que se puede encontrar en la URL de la historia. Por ejemplo, el `id` en esta URL `http://localhost:6006/?path=/story/example-page--logged-out` es `example-page--logged-out`

#### `timeout`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Predeterminado:** 1100 milisegundos
-   **Ejemplo:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    timeout: 20000,
});
```

El tiempo máximo que queremos esperar para que un componente sea visible después de cargar en la página

#### `url`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** `http://127.0.0.1:6006`
-   **Ejemplo:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    url: "https://your.url",
});
```

La URL donde está alojada tu instancia de Storybook.

</details>

## Contribuciones

### Actualización de paquetes

Puedes actualizar los paquetes con una simple herramienta CLI. Asegúrate de haber instalado todas las dependencias, luego puedes ejecutar

```sh
pnpm update.packages
```

Esto activará una CLI que te hará las siguientes preguntas

```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? (Minor|Latest)
? Do you want to update the package.json files? (Y/n)
? Do you want to remove all "node_modules" and reinstall dependencies? (Y/n)
? Would you like reinstall the dependencies? (Y/n)
```

Esto resultará en los siguientes registros

<details>
    <summary>Abre para ver un ejemplo de los registros</summary>
    
```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? Minor
? Do you want to update the package.json files? yes
Updating root 'package.json' for minor updates...
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/package.json
[====================] 38/38 100%

@typescript-eslint/eslint-plugin ^8.7.0 → ^8.8.0
@typescript-eslint/parser ^8.7.0 → ^8.8.0
@typescript-eslint/utils ^8.7.0 → ^8.8.0
@vitest/coverage-v8 ^2.1.1 → ^2.1.2
vitest ^2.1.1 → ^2.1.2

Run pnpm install to install new versions.
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/ocr-service...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/ocr-service/package.json
[====================] 11/11 100%

All dependencies match the minor package versions :)
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-reporter...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-reporter/package.json
[====================] 11/11 100%

eslint-config-next 14.2.13 → 14.2.14
next 14.2.13 → 14.2.14

Run pnpm install to install new versions.
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-service...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-service/package.json
[====================] 5/5 100%

All dependencies match the minor package versions :)
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/webdriver-image-comparison...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/webdriver-image-comparison/package.json
[====================] 8/8 100%

All dependencies match the minor package versions :)
? Do you want to remove all "node_modules" and reinstall dependencies? yes
Removing root dependencies in /Users/wswebcreation/Git/wdio/visual-testing...
Removing dependencies in ocr-service...
Removing dependencies in visual-reporter...
Removing dependencies in visual-service...
Removing dependencies in webdriver-image-comparison...
? Would you like reinstall the dependencies? yes
Installing dependencies in /Users/wswebcreation/Git/wdio/visual-testing...

> @wdio/visual-testing-monorepo@ pnpm.install.workaround /Users/wswebcreation/Git/wdio/visual-testing
> pnpm install --shamefully-hoist

Scope: all 5 workspace projects
Lockfile is up to date, resolution step is skipped
Packages: +1274
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 1274, reused 1265, downloaded 0, added 1274, done

dependencies:

-   @wdio/ocr-service 2.0.0 <- packages/ocr-service
-   @wdio/visual-service 6.0.0 <- packages/visual-service

devDependencies:

-   @changesets/cli 2.27.8
-   @inquirer/prompts 5.5.0
-   @tsconfig/node20 20.1.4
-   @types/eslint 9.6.1
-   @types/jsdom 21.1.7
-   @types/node 20.16.4
-   @types/react 18.3.5
-   @types/react-dom 18.3.0
-   @types/xml2js 0.4.14
-   @typescript-eslint/eslint-plugin 8.8.0
-   @typescript-eslint/parser 8.8.0
-   @typescript-eslint/utils 8.8.0
-   @vitest/coverage-v8 2.1.2
-   @wdio/appium-service 9.1.2
-   @wdio/cli 9.1.2
-   @wdio/globals 9.1.2
-   @wdio/local-runner 9.1.2
-   @wdio/mocha-framework 9.1.2
-   @wdio/sauce-service 9.1.2
-   @wdio/shared-store-service 9.1.2
-   @wdio/spec-reporter 9.1.2
-   @wdio/types 9.1.2
-   eslint 9.11.1
-   eslint-plugin-import 2.30.0
-   eslint-plugin-unicorn 55.0.0
-   eslint-plugin-wdio 9.0.8
-   husky 9.1.6
-   jsdom 25.0.1
-   pnpm-run-all2 6.2.3
-   release-it 17.6.0
-   rimraf 6.0.1
-   saucelabs 8.0.0
-   ts-node 10.9.2
-   typescript 5.6.2
-   vitest 2.1.2
-   webdriverio 9.1.2

. prepare$ husky
└─ Done in 204ms
Done in 9.5s
All packages updated!

````

</details>

### Preguntas

Por favor, únete a nuestro servidor de [Discord](https://discord.webdriver.io) si tienes alguna pregunta o problema contribuyendo a este proyecto. Encuentra a los colaboradores en el canal `🙏-contributing`.

### Problemas

Si tienes preguntas, errores o solicitudes de funciones, por favor crea un issue. Antes de enviar un issue, busca en el archivo de issues para ayudar a reducir duplicados, y lee las [FAQ](https://webdriver.io/docs/visual-testing/faq/).

Si no puedes encontrarlo allí, puedes enviar un issue donde puedes:

-   🐛**Reporte de error**: Crear un informe para ayudarnos a mejorar
-   📖**Documentación**: Sugerir mejoras o reportar documentación faltante/poco clara.
-   💡**Solicitud de función**: Sugerir una idea para este módulo.
-   💬**Pregunta**: Hacer preguntas.

### Flujo de Desarrollo

Para crear un PR para este proyecto y comenzar a contribuir, sigue esta guía paso a paso:

-   Haz un fork del proyecto.
-   Clona el proyecto en algún lugar de tu computadora

    ```sh
    $ git clone https://github.com/webdriverio/visual-testing.git
    ```

-   Ve al directorio y configura el proyecto

    ```sh
    $ cd visual-testing
    $ corepack enable
    $ pnpm pnpm.install.workaround
    ```

-   Ejecuta el modo de observación que transpilará automáticamente el código

    ```sh
    $ pnpm watch
    ```

    para construir el proyecto, ejecuta:

    ```sh
    $ pnpm build
    ```

-   Asegúrate de que tus cambios no rompan ninguna prueba, ejecuta:

    ```sh
    $ pnpm test
    ```

Este proyecto utiliza [changesets](https://github.com/changesets/changesets) para crear automáticamente registros de cambios y versiones.

### Pruebas

Varias pruebas deben ejecutarse para poder probar el módulo. Al añadir un PR, todas las pruebas deben al menos pasar las pruebas locales. Cada PR se prueba automáticamente con Sauce Labs, consulta [nuestro pipeline de GitHub Actions](https://github.com/webdriverio/visual-testing/actions/workflows/tests.yml). Antes de aprobar un PR, los colaboradores principales probarán el PR contra emuladores/simuladores / dispositivos reales.

#### Pruebas Locales

Primero, se debe crear una línea base local. Esto se puede hacer con:

```sh
// Con el protocolo webdriver
$ pnpm run test.local.init
```

Este comando creará una carpeta llamada `localBaseline` que contendrá todas las imágenes de línea base.

Luego ejecuta:

```sh
// Con el protocolo webdriver
pnpm run test.local.desktop
```

Esto ejecutará todas las pruebas en una máquina local en Chrome.

#### Pruebas Locales con Ejecutor de Storybook (Beta)

Primero, se debe crear una línea base local. Esto se puede hacer con:

```sh
pnpm run test.local.desktop.storybook
```

Esto ejecutará pruebas de Storybook con Chrome en modo headless contra un repositorio Demo de Storybook ubicado en https://govuk-react.github.io/govuk-react/.

Para ejecutar las pruebas con más navegadores puedes ejecutar

```sh
pnpm run test.local.desktop.storybook -- --browsers=chrome,firefox,edge,safari
```

> [!NOTE]
> Asegúrate de tener instalados en tu máquina local los navegadores en los que quieres ejecutar

#### Pruebas CI con Sauce Labs (no necesario para un PR)

El comando a continuación se usa para probar la construcción en GitHub Actions, solo puede usarse allí y no para desarrollo local.

```
$ pnpm run test.saucelabs
```

Probará contra muchas configuraciones que se pueden encontrar [aquí](https://github.com/webdriverio/visual-testing/blob/main/./tests/configs/wdio.saucelabs.web.conf.ts).
Todos los PRs se verifican automáticamente con Sauce Labs.

## Publicación

Para publicar una versión de cualquiera de los paquetes mencionados anteriormente, haz lo siguiente:

-   activa el [pipeline de publicación](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   se genera un PR de publicación, haz que sea revisado y aprobado por otro miembro de WebdriverIO
-   fusiona el PR
-   activa el [pipeline de publicación](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml) nuevamente
-   una nueva versión debería ser publicada 🎉

## Créditos

`@wdio/visual-testing` utiliza una licencia de código abierto de [LambdaTest](https://www.lambdatest.com/) y [Sauce Labs](https://saucelabs.com/).