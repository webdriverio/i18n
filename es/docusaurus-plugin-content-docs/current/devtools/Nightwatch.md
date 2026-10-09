---
id: nightwatch
title: DevTools para Nightwatch
description: "Añade la interfaz de depuración de DevTools a una suite de pruebas de Nightwatch sin modificar las pruebas, y configura screencasts, captura BiDi y el modo trace."
---

Adaptador de Nightwatch para [WebdriverIO DevTools](https://github.com/webdriverio/devtools): lleva la misma interfaz de depuración visual a tu suite de pruebas de Nightwatch sin ningún cambio en el código de las pruebas.

## Instalación

```bash
npm install @wdio/nightwatch-devtools
```

## Configuración

### Nightwatch estándar (estilo mocha)

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // Necesario para capturar las solicitudes de red
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

Ejecuta tus pruebas como de costumbre; la interfaz de DevTools se abre automáticamente en una nueva ventana del navegador:

```bash
nightwatch
```

> No es necesario modificar tus archivos de prueba.

### Cucumber / BDD

Importa `cucumberHooksPath` junto con la exportación principal y pásalo a la opción `require` de Cucumber. Esto registra los hooks de escenario `Before` / `After`, que replican el comportamiento de `beforeScenario` / `afterScenario` del servicio de WebdriverIO.

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default
const { cucumberHooksPath } = require('@wdio/nightwatch-devtools')

module.exports = {
  src_folders: ['features/step_definitions'],

  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'features',
      require: [cucumberHooksPath] // <-- registra los hooks de Cucumber de DevTools
    }
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

## Opciones de configuración

| Opción | Tipo | Predeterminado | Descripción |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Puerto del servidor backend de DevTools. Se incrementa automáticamente si ya está en uso. |
| `hostname` | `string` | `'localhost'` | Nombre de host al que se vincula el servidor backend. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Grabación de vídeo `.webm` por sesión. Consulta [Screencast](#screencast) más abajo. |
| `bidi` | `boolean` | `false` | Activa la captura mediante WebDriver BiDi para la consola del navegador, las excepciones de JS y la red. Requiere `webSocketUrl: true` en tus capabilities y un chromedriver compatible con BiDi. Cuando está conectado, se desactiva la ruta de red basada en el registro de rendimiento de Chrome por comando para que las solicitudes no se dupliquen. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` abre la interfaz de DevTools; `trace` la omite y, en su lugar, escribe un artefacto portable. Consulta [Modo trace](/docs/devtools/wdio/trace-mode). |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Estructura del artefacto de traza. Solo se aplica cuando `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Una traza por sesión / archivo de spec / prueba. `'test'` escribe cada una en `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Solo se aplica cuando `mode: 'trace'`. Consulta [Modo trace](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). **Advertencia:** la interfaz BDD `describe/it` se reduce a un único segmento con ámbito de sesión (consulta [Segmentación por prueba](#per-test-slicing--the-bdd-describeit-caveat)). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Qué trazas conservar. Se combina con `traceGranularity: 'test'`. Solo se aplica cuando `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Graba en la traza una tira de fotogramas densa y continua del screencast para una reproducción desplazable en el reproductor de trazas, no solo un fotograma por acción. Ejecuta el grabador de screencast (modo de sondeo en Nightwatch) durante la sesión. Solo se aplica cuando `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Captura de pantalla por prueba. Solo en modo trace + `traceGranularity: 'test'`. **Solo generación**: el PNG se escribe en el directorio de salida de la traza (y en el manifiesto cuando `emitArtifactsManifest: true`); no se adjunta en línea a Allure (consulta la nota más abajo). |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Segmento de vídeo por prueba, conservado según la política indicada (p. ej., `'retain-on-failure'`). Solo en modo trace + `traceGranularity: 'test'`. Un valor distinto de `off` inicia por sí mismo el grabador de screencast; **no** necesitas activar también `filmstrip` ni `screencast.enabled`. **Solo generación**: el `.webm` se escribe en el directorio de salida de la traza (y en el manifiesto cuando `emitArtifactsManifest: true`); no se adjunta en línea a Allure. |
| `emitArtifactsManifest` | `boolean` | `false` | Escribe el manifiesto `devtools-artifacts-<sessionId>.json` (el índice genérico que consumen los reporters/CI para descubrir los artefactos generados) junto a la traza. **Opcional en Nightwatch**: no dispone de una señal de Allure en vivo con la que detectarlo automáticamente, por lo que, a diferencia de WDIO/Selenium, nunca se activa de forma automática. Solo se aplica cuando `mode: 'trace'`. |
| `captureAssertions` | `boolean` | `true` | Captura las aserciones como filas de acción en la traza: `node:assert` además de los nativos `browser.assert`/`browser.verify`, incluidos los matchers negados `.not.*`. Establécelo en `false` para desactivarlo. |

> **Los adjuntos en línea de Allure no son compatibles con Nightwatch.** Su reporter oficial `nightwatch-allure` funciona a posteriori (sin API de adjuntos en vivo), y `attachment()` de `allure-js-commons` no hace nada en una ejecución de Nightwatch. Por eso, los artefactos de `screenshot` / `video` se *generan* (archivos, además del manifiesto de artefactos cuando `emitArtifactsManifest: true`) en el directorio de salida de la traza, pero no se adjuntan a una prueba de Allure. La segmentación por prueba —y, por tanto, estos artefactos— tiene sentido para las interfaces de Cucumber y exports-object; la interfaz BDD `describe/it` se reduce a granularidad de sesión, por lo que el control por prueba no tiene efecto en ella.

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## Screencast

Graba un vídeo `.webm` continuo de la sesión del navegador. La grabación comienza en la primera sesión que detecta el plugin y se finaliza en el hook `after()` de Nightwatch.

**Solo modo de sondeo.** Nightwatch no expone una vía de acceso estable a CDP como sí lo hacen WebdriverIO (`browser.getPuppeteer()`) y Selenium (`driver.createCDPConnection`), por lo que el screencast captura los fotogramas llamando a `browser.takeScreenshot()` a intervalos fijos. Funciona en todos los navegadores compatibles con Nightwatch.

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| Opción | Tipo | Predeterminado | Notas |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | Interruptor principal. |
| `pollIntervalMs` | `number` | `200` | Intervalo entre capturas de pantalla (ms). Menor = vídeo más fluido, más viajes de ida y vuelta de WebDriver. 200 ms ≈ 5 fps. |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Formato de píxeles por fotograma que se entrega al codificador ffmpeg antes del mux final a `.webm`. En modo de sondeo, las capturas de origen siempre se toman como PNG, por lo que esto **no** cambia la captura, solo el formato que recibe el codificador por fotograma. |
| `maxWidth` / `maxHeight` / `quality` | - | - | Opciones exclusivas de CDP, ignoradas en modo de sondeo. Se incluyen por compatibilidad de forma con los adaptadores de WDIO/Selenium. |

**Requisitos previos:** `fluent-ffmpeg` (ya es una dependencia de ejecución del paquete) más el binario `ffmpeg` en el PATH. macOS: `brew install ffmpeg`. Linux: `apt install ffmpeg`. Sin ffmpeg, el grabador sigue funcionando, pero el paso de codificación registra una advertencia y omite la escritura del archivo.

**Salida:** el archivo de vídeo se escribe junto al archivo de prueba que se acaba de ejecutar (con el directorio de `nightwatch.conf.*` como alternativa y `process.cwd()` como último recurso). La ruta completa aparece en la línea de registro de Nightwatch `📹 Screencast video: <path>` y el vídeo también se transmite a la pestaña Screencast del panel.

Para la referencia completa de la función de screencast (compatibilidad de navegadores, rutas de salida en los tres adaptadores), consulta la [página de Screencast](/docs/devtools/wdio/screencast).

## Captura BiDi (opcional)

Activa la captura mediante WebDriver BiDi para los mensajes de la consola del navegador, las excepciones de JS y las solicitudes de red. Es equivalente a la ruta que usa selenium-devtools: ambos adaptadores comparten la misma lógica de conexión en `@wdio/devtools-core`.

```js
globals: nightwatchDevtools({
  port: 3000,
  bidi: true
})
```

También necesitas `webSocketUrl: true` en tus capabilities para que chromedriver exponga realmente el canal BiDi:

```js
desiredCapabilities: {
  browserName: 'chrome',
  webSocketUrl: true,                           // ← habilita BiDi
  'goog:chromeOptions': { /* ... */ }
}
```

Cuando BiDi está conectado, se desactiva la ruta de captura de red basada en el registro de rendimiento de Chrome por comando para que las solicitudes no aparezcan dos veces en el panel. Si falta `webSocketUrl` o la versión de chromedriver no expone BiDi, la conexión falla de forma silenciosa y la alternativa basada en el registro de rendimiento sigue funcionando.

## Modo trace

Ruta de captura sin interfaz: no se abre ninguna ventana de DevTools. Al final de la sesión, el adaptador escribe un `trace-<sessionId>.zip` portable (o un directorio) en una carpeta `test-results/` (junto al directorio de prueba / configuración resuelto), con la misma estructura que el artefacto de traza de WebdriverIO.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // opcional; por defecto 'zip'
})
```

### Granularidad y Cucumber

`traceGranularity` determina qué abarca cada artefacto: `'session'` (predeterminado), `'spec'` o `'test'`.

Nightwatch cierra el navegador después de cada escenario de Cucumber. Una traza `'session'` abarca todo ello: un único zip para toda la ejecución, con cada escenario anidado bajo su feature. `'test'` escribe un zip por escenario en su propia carpeta, que es lo recomendado para Cucumber: artefactos más pequeños y la granularidad en la que se basa la retención de `tracePolicy`.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // una traza por escenario de Cucumber
})
```

En la interfaz BDD `describe/it`, `'test'` se reduce a un único segmento con ámbito de sesión: Nightwatch ejecuta cada `it()` internamente y dispara el hook por prueba del plugin solo una vez por módulo. El árbol de acciones sigue mostrando cada `it` como su propio grupo.

La vinculación del puerto del backend, la ventana de la interfaz y la opción `screencast` se omiten en modo trace. Para la referencia completa de la función (contenido del artefacto, visor, pruebas móviles, cuándo elegir `zip` frente a `ndjson-directory`), consulta la [página de Modo trace](/docs/devtools/wdio/trace-mode).

Nightwatch comparte el mismo pipeline de trazas que los adaptadores de WebdriverIO y Selenium, por lo que la estructura del artefacto es idéntica independientemente del adaptador que lo haya generado. Una traza de Nightwatch incluye la captura completa por acción —una captura de pantalla, la instantánea del árbol de accesibilidad con sangría por profundidad, la lista de elementos interactuables y la transcripción en Markdown—, de modo que se abre en el reproductor `show-trace` con viaje en el tiempo del DOM/instantánea, las pestañas **A11y** y **Transcript**, la superposición de elementos para seleccionar localizadores y (para Cucumber) el anidamiento **Feature → Scenario → Step**.

Abre una traza con el binario `show-trace`, incluido en `@wdio/nightwatch-devtools` (sin dependencias adicionales):

```sh
npx show-trace test-results/trace-<sessionId>.zip   # in a project that installs the adapter
pnpm show-trace test-results/trace-<sessionId>.zip  # from the devtools monorepo
```

Consulta la página del [Reproductor de trazas](/docs/devtools/trace-player) para ver la guía completa y los atajos de teclado.

### Segmentación por prueba y la advertencia de BDD `describe/it`

Las opciones por prueba —`traceGranularity: 'test'` y las opciones `tracePolicy`, `screenshot` y `video` que se combinan con ella— necesitan un hook por prueba para cortar el segmento de cada prueba. La interfaz **exports-object (estilo mocha)** y **Cucumber** (hooks por escenario) exponen uno, por lo que obtienen una segmentación por prueba real. La interfaz **BDD `describe/it`** es la excepción: Nightwatch ejecuta cada `it()` internamente y dispara el hook por prueba del plugin solo una vez por módulo, por lo que `traceGranularity: 'test'` se reduce a un único segmento **con ámbito de sesión** asociado a la primera prueba. El manifiesto de artefactos sigue listando cada caso de prueba con su estado correcto; solo se reduce la asociación de segmentos/artefactos por prueba. Las trazas con granularidad de sesión y de spec no se ven afectadas.

## Ejemplos

Los ejemplos funcionales se encuentran en el directorio `examples/` de nivel superior del repositorio. Compila el workspace una vez (`pnpm install && pnpm build`) y luego ejecuta desde la raíz del repositorio:

| Directorio | Runner | Comando |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch estilo mocha | `pnpm demo:nightwatch` |

## Funcionalidades

El adaptador de Nightwatch ofrece la misma experiencia de interfaz de DevTools que WebdriverIO. Cada una de las funcionalidades siguientes se captura automáticamente con la configuración básica `globals: nightwatchDevtools({ port: 3000 })`, sin configuración específica por funcionalidad (los registros de red necesitan además `'goog:loggingPrefs': { performance: 'ALL' }`, como se muestra en [Configuración](#setup)). Los enlaces llevan a la referencia completa de cada funcionalidad.

- **[Reejecución interactiva de pruebas y visualización](/docs/devtools/wdio/interactive-test-rerunning)** - Vistas previas del navegador en vivo, capturas de pantalla por comando y reejecución de pruebas/suites con un solo clic
- **[Conservar y reejecutar (comparar)](/docs/devtools/wdio/preserve-and-rerun)** - Toma una instantánea de una prueba fallida, vuelve a ejecutarla y compara ambas ejecuciones lado a lado
- **[Compatibilidad con múltiples frameworks](/docs/devtools/wdio/multi-framework-support)** - Runners estándar (estilo mocha) y Cucumber/BDD
- **[Registros de consola](/docs/devtools/wdio/console-logs)** - Captura e inspecciona la salida de la consola del navegador (en tiempo real con `bidi: true`)
- **[Registros de red](/docs/devtools/wdio/network-logs)** - Supervisa las llamadas a la API y la actividad de red
- **[Metadatos](/docs/devtools/wdio/metadata)** - Capabilities de la sesión, entorno y tiempos por sesión del navegador
- **[TestLens](/docs/devtools/wdio/testlens)** - Salta desde cualquier comando a la línea de código fuente que lo originó
- **[Screencast de la sesión](/docs/devtools/wdio/screencast)** - Grabación continua en `.webm` de la sesión del navegador
- **[Modo trace](/docs/devtools/wdio/trace-mode)** - Captura sin interfaz que genera un `trace.zip` portable (sin ventana de UI)

El screencast es la única funcionalidad con opciones propias (lista completa en [Screencast](#screencast)):

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## Limitaciones

Nightwatch no ofrece la misma profundidad de hooks de framework que WebdriverIO, por lo que existen algunas diferencias con respecto al servicio DevTools de WDIO:

| Limitación | Detalle |
|-----------|--------|
| Sin hooks de comandos nativos | Nightwatch no tiene hooks `beforeCommand` / `afterCommand`. En su lugar, los comandos se interceptan mediante un envoltorio proxy del navegador. |
| Contexto de prueba limitado | `browser.currentTest` proporciona menos metadatos que el contexto del runner de WDIO; los nombres de las pruebas y las rutas de archivo requieren heurísticas adicionales. |
| Anidamiento de suites plano | Nightwatch no admite de forma nativa bloques `describe` con varios niveles de anidamiento; el plugin informa como máximo de dos niveles. |
| Disponibilidad diferida de resultados | Los resultados de las pruebas solo se finalizan en `afterEach`; no están disponibles a mitad de la prueba. |
| Screencast solo en modo de sondeo | A diferencia de WDIO (push de CDP mediante `browser.getPuppeteer()`) y Selenium (push de CDP mediante `driver.createCDPConnection`), Nightwatch carece de una vía de acceso estable a CDP, por lo que los fotogramas se capturan sondeando `browser.takeScreenshot()`. Funciona en todos los navegadores compatibles con Nightwatch; tiene un pequeño coste por fotograma proporcional al intervalo de sondeo. |
| Segmentación de trazas por prueba (BDD `describe/it`) | La interfaz BDD dispara el hook por prueba del plugin una vez por módulo, por lo que `traceGranularity: 'test'` se reduce a un único segmento con ámbito de sesión. Las interfaces exports-object (estilo mocha) y Cucumber obtienen una segmentación por prueba real. Consulta [Segmentación por prueba](#per-test-slicing--the-bdd-describeit-caveat). |
| Artefactos de traza solo de generación | Los archivos `screenshot` / `video` por prueba se escriben en el directorio de salida de la traza (y en el manifiesto cuando `emitArtifactsManifest: true`), pero no se adjuntan en línea a Allure: Nightwatch no tiene una API de adjuntos de Allure en vivo. |

La paridad general de funcionalidades con el servicio DevTools de WebdriverIO es de aproximadamente un **80-90 %**.