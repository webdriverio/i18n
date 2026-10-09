---
id: runner
title: Runner
description: "Elige entre el runner local y el runner de navegador, y configura las opciones del runner de navegador como presets, configuración de Vite y cobertura."
---

import CodeBlock from '@theme/CodeBlock';

Un runner en WebdriverIO orquesta cómo y dónde se ejecutan las pruebas cuando se usa el testrunner. Actualmente, WebdriverIO admite dos tipos diferentes de runner: el runner local y el runner de navegador.

## Local Runner

El [Local Runner](https://www.npmjs.com/package/@wdio/local-runner) inicia tu framework (por ejemplo, Mocha, Jasmine o Cucumber) dentro de un proceso worker y ejecuta todos tus archivos de prueba dentro de tu entorno Node.js. Cada archivo de prueba se ejecuta en un proceso worker separado por capability, lo que permite la máxima concurrencia. Cada proceso worker utiliza una única instancia del navegador y, por lo tanto, ejecuta su propia sesión de navegador, lo que permite el máximo aislamiento.

Dado que cada prueba se ejecuta en su propio proceso aislado, no es posible compartir datos entre archivos de prueba. Hay dos formas de solucionar esto:

- usar el [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service) para compartir datos entre todos los workers
- agrupar archivos de especificación (lee más en [Organizing Test Suite](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

Si no se define nada más en el `wdio.conf.js`, el Local Runner es el runner predeterminado en WebdriverIO.

### Instalación

Para usar el Local Runner, puedes instalarlo mediante:

```sh
npm install --save-dev @wdio/local-runner
```

### Configuración

El Local Runner es el runner predeterminado en WebdriverIO, por lo que no es necesario definirlo dentro de tu `wdio.conf.js`. Si deseas establecerlo explícitamente, puedes definirlo de la siguiente manera:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## Browser Runner

A diferencia del [Local Runner](https://www.npmjs.com/package/@wdio/local-runner), el [Browser Runner](https://www.npmjs.com/package/@wdio/browser-runner) inicia y ejecuta el framework dentro del navegador. Esto te permite ejecutar pruebas unitarias o pruebas de componentes en un navegador real en lugar de en un JSDOM como muchos otros frameworks de pruebas. El bundle de pruebas se ejecuta en Chrome 90, Edge 90, Firefox 90 y Safari 14.1 o versiones más recientes. Consulta [Browser support](/docs/component-testing#browser-support).

Aunque [JSDOM](https://www.npmjs.com/package/jsdom) se usa ampliamente con fines de prueba, al final no es un navegador real ni puedes emular entornos móviles con él. Con este runner, WebdriverIO te permite ejecutar fácilmente tus pruebas en el navegador y usar comandos WebDriver para interactuar con los elementos renderizados en la página.

Aquí tienes una comparación entre ejecutar pruebas dentro de JSDOM y el Browser Runner de WebdriverIO

| | JSDOM | WebdriverIO Browser Runner |
|-|-------|----------------------------|
|1.| Ejecuta tus pruebas dentro de Node.js usando una reimplementación de los estándares web, en particular los estándares WHATWG DOM y HTML | Ejecuta tu prueba en un navegador real y ejecuta el código en un entorno que usan tus usuarios |
|2.| Las interacciones con los componentes solo se pueden imitar mediante JavaScript | Puedes usar la [WebdriverIO API](api) para interactuar con los elementos a través del protocolo WebDriver |
|3.| El soporte de Canvas requiere [dependencias adicionales](https://www.npmjs.com/package/canvas) y [tiene limitaciones](https://github.com/Automattic/node-canvas/issues) | Tienes acceso a la [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) real |
|4.| JSDOM tiene algunas [advertencias](https://github.com/jsdom/jsdom#caveats) y Web APIs no compatibles | Todas las Web APIs son compatibles, ya que las pruebas se ejecutan en un navegador real |
|5.| Imposible detectar errores entre navegadores | Soporte para todos los navegadores, incluidos los navegadores móviles |
|6.| __No__ puede probar los pseudoestados de los elementos | Soporte para pseudoestados como `:hover` o `:active` |

Este runner usa [Vite](https://vitejs.dev/) para compilar tu código de prueba y cargarlo en el navegador. Incluye presets para los siguientes frameworks de componentes:

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

Cada archivo de prueba / grupo de archivos de prueba se ejecuta dentro de una sola página, lo que significa que entre cada prueba la página se recarga para garantizar el aislamiento entre pruebas.

### Instalación

Para usar el Browser Runner, puedes instalarlo mediante:

```sh
npm install --save-dev @wdio/browser-runner
```

### Configuración

Para usar el Browser runner, debes definir una propiedad `runner` dentro de tu archivo `wdio.conf.js`, por ejemplo:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### Opciones del Runner

El Browser runner permite las siguientes configuraciones:

#### `preset`

Si pruebas componentes usando uno de los frameworks mencionados anteriormente, puedes definir un preset que garantice que todo esté configurado de forma predeterminada. Esta opción no se puede usar junto con `viteConfig`.

__Tipo:__ `vue` | `svelte` | `solid` | `react` | `preact` | `stencil`<br />
__Ejemplo:__

```js title="wdio.conf.js"
export const {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

#### `viteConfig`

Define tu propia [configuración de Vite](https://vitejs.dev/config/). Puedes pasar un objeto personalizado o importar un archivo `vite.conf.ts` existente si usas Vite.js para el desarrollo. Ten en cuenta que WebdriverIO mantiene configuraciones personalizadas de Vite para preparar el entorno de pruebas.

__Tipo:__ `string` o [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) o `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__Ejemplo:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // o simplemente:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // o usa una función si tu configuración de vite contiene muchos plugins
    // que solo quieres resolver cuando se lee el valor
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

Si se establece en `true`, el runner actualizará las capabilities para ejecutar las pruebas en modo headless. De forma predeterminada, esto está habilitado en entornos de CI donde la variable de entorno `CI` está establecida en `'1'` o `'true'`.

__Tipo:__ `boolean`<br />
__Predeterminado:__ `false`, se establece en `true` si la variable de entorno `CI` está definida

#### `rootDir`

Directorio raíz del proyecto.

__Tipo:__ `string`<br />
__Predeterminado:__ `process.cwd()`

#### `coverage`

WebdriverIO admite informes de cobertura de pruebas a través de [`istanbul`](https://istanbul.js.org/). Consulta [Opciones de cobertura](#coverage-options) para más detalles.

__Tipo:__ `object`<br />
__Predeterminado:__ `undefined`

### Opciones de cobertura

Las siguientes opciones permiten configurar los informes de cobertura.

#### `enabled`

Habilita la recopilación de cobertura.

__Tipo:__ `boolean`<br />
__Predeterminado:__ `false`

#### `include`

Lista de archivos incluidos en la cobertura como patrones glob.

__Tipo:__ `string[]`<br />
__Predeterminado:__ `[**]`

#### `exclude`

Lista de archivos excluidos de la cobertura como patrones glob.

__Tipo:__ `string[]`<br />
__Predeterminado:__

```
[
  'coverage/**',
  'dist/**',
  'packages/*/test{,s}/**',
  '**/*.d.ts',
  'cypress/**',
  'test{,s}/**',
  'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
  '**/__tests__/**',
  '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
  '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
]
```

#### `extension`

Lista de extensiones de archivo que debe incluir el informe.

__Tipo:__ `string | string[]`<br />
__Predeterminado:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

Directorio donde escribir el informe de cobertura.

__Tipo:__ `string`<br />
__Predeterminado:__ `./coverage`

#### `reporter`

Reporters de cobertura a utilizar. Consulta la [documentación de istanbul](https://istanbul.js.org/docs/advanced/alternative-reporters/) para obtener una lista detallada de todos los reporters.

__Tipo:__ `string[]`<br />
__Predeterminado:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

Comprueba los umbrales por archivo. Consulta `lines`, `functions`, `branches` y `statements` para conocer los umbrales reales.

__Tipo:__ `boolean`<br />
__Predeterminado:__ `false`

#### `clean`

Limpia los resultados de cobertura antes de ejecutar las pruebas.

__Tipo:__ `boolean`<br />
__Predeterminado:__ `true`

#### `lines`

Umbral para líneas.

__Tipo:__ `number`<br />
__Predeterminado:__ `undefined`

#### `functions`

Umbral para funciones.

__Tipo:__ `number`<br />
__Predeterminado:__ `undefined`

#### `branches`

Umbral para ramas.

__Tipo:__ `number`<br />
__Predeterminado:__ `undefined`

#### `statements`

Umbral para sentencias.

__Tipo:__ `number`<br />
__Predeterminado:__ `undefined`

### Limitaciones

Al usar el browser runner de WebdriverIO, es importante tener en cuenta que los diálogos que bloquean el hilo, como `alert` o `confirm`, no se pueden usar de forma nativa. Esto se debe a que bloquean la página web, lo que significa que WebdriverIO no puede seguir comunicándose con la página, provocando que la ejecución se quede colgada.

En tales situaciones, WebdriverIO proporciona mocks predeterminados con valores de retorno predeterminados para estas APIs. Esto garantiza que, si el usuario usa accidentalmente web APIs de ventanas emergentes síncronas, la ejecución no se quede colgada. Sin embargo, se sigue recomendando que el usuario haga mock de estas web APIs para una mejor experiencia. Lee más en [Mocking](/docs/component-testing/mocking).

### Ejemplos

Asegúrate de consultar la documentación sobre [pruebas de componentes](https://webdriver.io/docs/component-testing) y echa un vistazo al [repositorio de ejemplos](https://github.com/webdriverio/component-testing-examples) para ver ejemplos que usan estos y otros frameworks.