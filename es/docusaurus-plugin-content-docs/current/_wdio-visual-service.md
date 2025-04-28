---
id: wdio-visual-service
title: Servicio de Comparación de Imágenes (Pruebas de Regresión Visual)
custom_edit_url: https://github.com/webdriverio/visual-testing/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/visual-service es un paquete de terceros, para más información por favor consulte [GitHub](https://github.com/webdriverio/visual-testing) | [npm](https://www.npmjs.com/package/@wdio/visual-service)

Para documentación sobre pruebas visuales con WebdriverIO, por favor consulte la [documentación](https://webdriver.io/docs/visual-testing). Este proyecto contiene todos los módulos relevantes para ejecutar pruebas visuales con WebdriverIO. Dentro del directorio `./packages` encontrará:

-   `@wdio/visual-testing`: el servicio de WebdriverIO para integrar pruebas visuales
-   `webdriver-image-comparison`: Un módulo de comparación de imágenes que puede ser utilizado para diferentes frameworks de automatización de pruebas NodeJS que soporten el protocolo WebDriver

## Ejecutor de Storybook (BETA)

<details>
  <summary>Haga clic para obtener más documentación sobre el Ejecutor de Storybook BETA</summary>

> El Ejecutor de Storybook aún está en BETA, la documentación se trasladará posteriormente a las páginas de documentación de [WebdriverIO](https://webdriver.io/docs/visual-testing).

Este módulo ahora soporta Storybook con un nuevo Ejecutor Visual. Este ejecutor automáticamente escanea una instancia local/remota de storybook y creará capturas de pantalla de elementos de cada componente. Esto se puede hacer agregando

```ts
export const config: WebdriverIO.Config = {
    // ...
    services: ["visual"],
    // ....
};
```

a sus `services` y ejecutando `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook` a través de la línea de comandos.
Utilizará Chrome en modo headless como navegador predeterminado.

> [!NOTE]
>
> -   La mayoría de las opciones de Pruebas Visuales también funcionarán para el Ejecutor de Storybook, consulte la documentación de [WebdriverIO](https://webdriver.io/docs/visual-testing).
> -   El Ejecutor de Storybook sobrescribirá todas sus capacidades y solo puede ejecutarse en los navegadores que admite, consulte [`--browsers`](#browsers).
> -   El Ejecutor de Storybook no admite una configuración existente que utilice capacidades Multiremote y arrojará un error.
> -   El Ejecutor de Storybook solo admite Web de Escritorio, no Web Móvil.

### Opciones de Servicio del Ejecutor de Storybook

Las opciones de servicio se pueden proporcionar así

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
            // Las opciones de storybook, ver opciones de cli para la descripción
            storybook: {
                additionalSearchParams: new URLSearchParams({foo: 'bar', abc: 'def'}),
                clip: false,
                clipSelector: ''#some-id,
                numShards: 4,
                // `skipStories` puede ser una cadena ('example-button--secondary'),
                // un array (['example-button--secondary', 'example-button--small'])
                // o una regex que debe proporcionarse como cadena ("/.*button.*/gm")
                skipStories: ['example-button--secondary', 'example-button--small'],
                url: 'https://www.bbc.co.uk/iplayer/storybook/',
                version: 6,
                // Opcional - Permite sobrescribir la ruta de líneas base. Por defecto agrupará las líneas base por categoría y componente (p.ej. forms/input/baseline.png)
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
Consulte la documentación de [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) para más información. La cadena debe ser una cadena válida de URLSearchParams.

> [!NOTE]
> Las comillas dobles son necesarias para evitar que el `&` se interprete como un separador de comandos.
> Por ejemplo, con `--additionalSearchParams="foo=bar&abc=def"` generará la siguiente URL de Storybook para pruebas de historias: `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.

#### `--browsers`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** `chrome`, puede seleccionar entre `chrome|firefox|edge|safari`
-   **Ejemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --browsers=chrome,firefox,edge,safari`
-   **NOTA:** Solo disponible a través de la CLI

Utilizará los navegadores proporcionados para tomar capturas de pantalla de componentes

> [!NOTE]
> Asegúrese de tener instalados en su máquina local los navegadores en los que desea ejecutar

#### `--clip`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `true`
-   **Ejemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clip=false`

Cuando está desactivado creará una captura de pantalla de la vista completa. Cuando está activado creará capturas de pantalla de elementos basadas en el [`--clipSelector`](#clipselector) que reducirá la cantidad de espacio en blanco alrededor de la captura de pantalla del componente y reducirá el tamaño de la captura.

#### `--clipSelector`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** `#storybook-root > :first-child` para Storybook V7 y `#root > :first-child:not(script):not(style)` para Storybook V6, ver también [`--version`](#version)
-   **Ejemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clipSelector="#some-id"`

Este es el selector que se utilizará:

-   para seleccionar el elemento del que se tomará la captura de pantalla
-   para el elemento que debe esperar a ser visible antes de tomar una captura de pantalla

#### `--devices`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** Puede seleccionar de los [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts)
-   **Ejemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --devices="iPhone 14 Pro Max","Pixel 3 XL"`
-   **NOTA:** Solo disponible a través de la CLI

Utilizará los dispositivos proporcionados que coincidan con los [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts) para tomar capturas de pantalla de componentes

> [!NOTE]
>
> -   Si falta una configuración de dispositivo, no dude en enviar una [solicitud de función](https://github.com/webdriverio/visual-testing/issues/new?assignees=&labels=&projects=&template=--feature-request.md)
> -   Esto solo funcionará con Chrome:
>     -   si proporciona `--devices`, todas las instancias de Chrome se ejecutarán en modo de **emulación móvil**
>     -   si también proporciona otros navegadores además de Chrome, como `--devices --browsers=firefox,safari,edge`, agregará automáticamente Chrome en modo de emulación móvil
> -   El Ejecutor de Storybook creará por defecto capturas de elementos, si desea ver la captura completa de Emulación Móvil, proporcione `--clip=false` a través de la línea de comandos
> -   El nombre del archivo se verá, por ejemplo, como `__snapshots__/example/button/desktop_chrome/example-button--large-local-chrome-iPhone-14-Pro-Max-430x932-dpr-3.png`
> -   **[SRC:](https://chromedriver.chromium.org/mobile-emulation#h.p_ID_167)** Probar un sitio web móvil en un escritorio usando emulación móvil puede ser útil, pero los probadores deben saber que hay muchas diferencias sutiles como:
>     -   GPU completamente diferente, lo que puede llevar a grandes cambios de rendimiento;
>     -   la interfaz de usuario móvil no se emula (en particular, la barra de URL oculta afecta la altura de la página);
>     -   el popup de desambiguación (donde selecciona uno de varios objetivos táctiles) no es compatible;
>     -   muchas API de hardware (por ejemplo, el evento orientationchange) no están disponibles.

#### `--headless`

-   **Tipo:** `boolean`
-   **Obligatorio:** No
-   **Predeterminado:** `true`
-   **Ejemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --headless=false`
-   **NOTA:** Solo disponible a través de la CLI

Ejecutará las pruebas de forma predeterminada en modo headless (cuando el navegador lo admita) o se puede desactivar

#### `--numShards`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Predeterminado:** `true`
-   **Ejemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --numShards=10`

Este será el número de instancias paralelas que se utilizarán para ejecutar las historias. Esto estará limitado por el `maxInstances` en su archivo `wdio.conf`.

> [!IMPORTANT]
> Cuando se ejecuta en modo `headless`, no aumente el número a más de 20 para evitar inestabilidad debido a restricciones de recursos

#### `--skipStories`

-   **Tipo:** `string|regex`
-   **Obligatorio:** No
-   **Predeterminado:** null
-   **Ejemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --skipStories="/.*button.*/gm"`

Esto puede ser:

-   una cadena (`example-button--secondary,example-button--small`)
-   o una expresión regular (`"/.*button.*/gm"`)

para omitir ciertas historias. Use el `id` de la historia que se puede encontrar en la URL de la historia. Por ejemplo, el `id` en esta URL `http://localhost:6006/?path=/story/example-page--logged-out` es `example-page--logged-out`

#### `--url`

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** `http://127.0.0.1:6006`
-   **Ejemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --url="https://example.com"`

La URL donde está alojada su instancia de Storybook.

#### `--version`

-   **Tipo:** `number`
-   **Obligatorio:** No
-   **Predeterminado:** 7
-   **Ejemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --version=6`

Esta es la versión de Storybook, el valor predeterminado es `7`. Esto es necesario para saber si se debe usar el [`clipSelector`](#clipselector) de la V6.

### Pruebas de Interacción con Storybook

Las Pruebas de Interacción con Storybook le permiten interactuar con su componente creando scripts personalizados con comandos WDIO para establecer un componente en un estado determinado. Por ejemplo, vea el siguiente fragmento de código:

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

Se ejecutan dos pruebas en dos componentes diferentes. Cada prueba primero establece un estado y luego toma una captura de pantalla. También notará que se ha introducido un nuevo comando personalizado, que se puede encontrar [aquí](#new-custom-command).

El archivo de especificación anterior se puede guardar en una carpeta y agregarse a la línea de comandos con el siguiente comando:

```sh
pnpm run test.local.desktop.storybook.localhost -- --spec='tests/specs/storybook-interaction/*.ts'
```

El ejecutor de Storybook primero escaneará automáticamente su instancia de Storybook y luego agregará sus pruebas a las historias que deben compararse. Si no desea que los componentes que utiliza para las pruebas de interacción se comparen dos veces, puede agregar un filtro para eliminar las historias "predeterminadas" del escaneo proporcionando el filtro [`--skipStories`](#--skipstories). Esto se vería así:

```sh
pnpm run test.local.desktop.storybook.localhost -- --skipStories="/example-page.*/gm" --spec='tests/specs/storybook-interaction/*.ts'
```

### Nuevo Comando Personalizado

Se agregará un nuevo comando personalizado llamado `browser.waitForStorybookComponentToBeLoaded({ id: 'componentId' })` al objeto `browser/driver` que cargará automáticamente el componente y esperará a que termine, por lo que no necesita usar el método `browser.url('url.com')`. Se puede usar así

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

Esto agregará parámetros de búsqueda adicionales a la URL de Storybook, en el ejemplo anterior la URL será `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.
Consulte la documentación de [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) para más información.

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

-   para seleccionar el elemento del que se tomará la captura de pantalla
-   para el elemento que debe esperar a ser visible antes de tomar una captura de pantalla

#### `id`

-   **Tipo:** `string`
-   **Obligatorio:** sí
-   **Ejemplo:**

```ts
await browser.waitForStorybookComponentToBeLoaded({ '#your-selector', id: 'componentId' })
```

Use el `id` de la historia que se puede encontrar en la URL de la historia. Por ejemplo, el `id` en esta URL `http://localhost:6006/?path=/story/example-page--logged-out` es `example-page--logged-out`

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

El tiempo máximo de espera para que un componente sea visible después de cargarse en la página

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

La URL donde está alojada su instancia de Storybook.

</details>

## Contribuciones

### Actualización de paquetes

Puede actualizar los paquetes con una herramienta CLI simple. Asegúrese de haber instalado todas las dependencias, luego puede ejecutar

```sh
pnpm update.packages
```

Esto activará una CLI que le hará las siguientes preguntas

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
    <summary>Abrir para ver un ejemplo de los registros</summary>
    
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

Por favor, únase a nuestro servidor de [Discord](https://discord.webdriver.io) si tiene alguna pregunta o problemas para contribuir a este proyecto. Encuentre a los colaboradores en el canal `🙏-contributing`.

### Problemas

Si tiene preguntas, errores o solicitudes de funciones, por favor abra un issue. Antes de enviar un issue, busque en el archivo de issues para ayudar a reducir duplicados y lea las [FAQ](https://webdriver.io/docs/visual-testing/faq/).

Si no puede encontrarlo allí, puede enviar un issue donde puede presentar:

-   🐛**Informe de error**: Cree un informe para ayudarnos a mejorar
-   📖**Documentación**: Sugiera mejoras o informe sobre documentación faltante/poco clara.
-   💡**Solicitud de función**: Sugiera una idea para este módulo.
-   💬**Pregunta**: Haga preguntas.

### Flujo de Trabajo de Desarrollo

Para crear un PR para este proyecto y comenzar a contribuir, siga esta guía paso a paso:

-   Haga un fork del proyecto.
-   Clone el proyecto en algún lugar de su computadora

    ```sh
    $ git clone https://github.com/webdriverio/visual-testing.git
    ```

-   Vaya al directorio y configure el proyecto

    ```sh
    $ cd visual-testing
    $ corepack enable
    $ pnpm pnpm.install.workaround
    ```

-   Ejecute el modo de observación que transpilará automáticamente el código

    ```sh
    $ pnpm watch
    ```

    para construir el proyecto, ejecute:

    ```sh
    $ pnpm build
    ```

-   Asegúrese de que sus cambios no rompan ninguna prueba, ejecute:

    ```sh
    $ pnpm test
    ```

Este proyecto utiliza [changesets](https://github.com/changesets/changesets) para crear automáticamente registros de cambios y lanzamientos.

### Pruebas

Se deben ejecutar varias pruebas para poder probar el módulo. Al agregar un PR, todas las pruebas deben al menos pasar las pruebas locales. Cada PR se prueba automáticamente contra Sauce Labs, vea [nuestro pipeline de GitHub Actions](https://github.com/webdriverio/visual-testing/actions/workflows/tests.yml). Antes de aprobar un PR, los colaboradores principales probarán el PR contra emuladores/simuladores / dispositivos reales.

#### Pruebas Locales

Primero, se debe crear una línea base local. Esto se puede hacer con:

```sh
// Con el protocolo webdriver
$ pnpm run test.local.init
````

Este comando creará una carpeta llamada `localBaseline` que contendrá todas las imágenes de línea base.

Luego ejecute:

```sh
// Con el protocolo webdriver
pnpm run test.local.desktop
```

Esto ejecutará todas las pruebas en una máquina local en Chrome.

#### Pruebas Locales del Ejecutor de Storybook (Beta)

Primero, se debe crear una línea base local. Esto se puede hacer con:

```sh
pnpm run test.local.desktop.storybook
```

Esto ejecutará pruebas de Storybook con Chrome en modo headless contra un repositorio Demo de Storybook ubicado en https://govuk-react.github.io/govuk-react/.

Para ejecutar las pruebas con más navegadores, puede ejecutar

```sh
pnpm run test.local.desktop.storybook -- --browsers=chrome,firefox,edge,safari
```

> [!NOTE]
> Asegúrese de tener instalados en su máquina local los navegadores en los que desea ejecutar

#### Pruebas CI con Sauce Labs (no necesarias para un PR)

El comando a continuación se utiliza para probar la compilación en GitHub Actions, solo se puede usar allí y no para desarrollo local.

```
$ pnpm run test.saucelabs
```

Probará contra muchas configuraciones que se pueden encontrar [aquí](https://github.com/webdriverio/visual-testing/blob/main/./tests/configs/wdio.saucelabs.web.conf.ts).
Todos los PR se comprueban automáticamente contra Sauce Labs.

## Lanzamientos

Para lanzar una versión de cualquiera de los paquetes mencionados anteriormente, haga lo siguiente:

-   active el [pipeline de lanzamiento](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   se genera un PR de lanzamiento, haga que sea revisado y aprobado por otro miembro de WebdriverIO
-   fusione el PR
-   active el [pipeline de lanzamiento](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml) nuevamente
-   ¡debería lanzarse una nueva versión 🎉

## Créditos

`@wdio/visual-testing` utiliza una licencia de código abierto de [LambdaTest](https://www.lambdatest.com/) y [Sauce Labs](https://saucelabs.com/).