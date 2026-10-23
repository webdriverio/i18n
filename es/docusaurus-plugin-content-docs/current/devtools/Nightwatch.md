---
id: nightwatch
title: DevTools para Nightwatch
description: "Añade la interfaz de depuración de DevTools a una suite de pruebas de Nightwatch sin modificar las pruebas, y configura screencasts, captura BiDi y el modo trace."
---

Adaptador de Nightwatch para [WebdriverIO DevTools](https://github.com/webdriverio/devtools): ofrece la misma interfaz de depuración visual en tu suite de pruebas de Nightwatch sin ningún cambio en el código de las pruebas.

## Instalación

```bash
npm install @wdio/nightwatch-devtools
```

Requiere Nightwatch 3 o posterior. Para Cucumber, `@cucumber/cucumber` debe estar instalado en tu proyecto; el adaptador usa tu copia en lugar de incluir una propia.

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

Ejecuta tus pruebas como de costumbre: la interfaz de DevTools se abre automáticamente en una nueva ventana del navegador:

```bash
nightwatch
```

> No es necesario modificar tus archivos de prueba.

En el modo live, la ejecución permanece abierta después de que terminen tus pruebas para que puedas revisar los resultados. Cierra la ventana de DevTools para finalizarla, o pulsa Ctrl+C para salir y dejar la ventana abierta.

### Cucumber / BDD

Importa `cucumberHooksPath` junto con la exportación principal y pásalo a la opción `require` de Cucumber. Esto registra los hooks de escenario `Before` / `After` y los hooks de paso `BeforeStep` / `AfterStep`, que replican el comportamiento de `beforeScenario` / `afterScenario` del servicio de WebdriverIO. Un hook `After` previo al cierre vuelca el trace de cada escenario mientras su sesión del navegador sigue activa.

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

| Opción | Tipo | Valor por defecto | Descripción |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Puerto del servidor backend de DevTools. Se incrementa automáticamente si ya está en uso. |
| `hostname` | `string` | `'localhost'` | Hostname al que se vincula el servidor backend. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Grabación de vídeo `.webm` por sesión, solo en modo live. En modo trace usa `filmstrip` / `video`. Consulta [Screencast](#screencast) más abajo. |
| `bidi` | `boolean` | `false` | Activa la captura mediante WebDriver BiDi de la consola del navegador + excepciones de JS + red. Requiere `webSocketUrl: true` en tus capabilities y un chromedriver compatible con BiDi. Cuando está conectado, se desactiva la ruta de red por comando basada en el registro de rendimiento de Chrome para que las solicitudes no se dupliquen. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` abre la interfaz de DevTools; `trace` la omite y en su lugar escribe un artefacto portátil. Consulta [Modo trace](/docs/devtools/wdio/trace-mode). |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Estructura del artefacto de trace. Solo se aplica cuando `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Un trace por sesión / archivo spec / prueba. `'test'` escribe cada uno en `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Solo se aplica cuando `mode: 'trace'`. Consulta [Modo trace](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). **Advertencia:** la interfaz BDD `describe/it` se reduce a un único segmento con alcance de sesión (consulta [Segmentación por prueba](#per-test-slicing--the-bdd-describeit-caveat)). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Qué traces conservar. Se combina con `traceGranularity: 'test'`. Solo se aplica cuando `mode: 'trace'`; configurarla fuera del modo trace registra una advertencia. **Advertencia:** solo `'retain-on-failure'` es fiable en Nightwatch. Las demás políticas basadas en reintentos se degradan a ella, porque `--retries` vuelve a ejecutar un caso de prueba internamente sin volver a disparar los hooks por prueba del plugin. |
| `filmstrip` | `boolean` | `true` | Graba en el trace una tira de fotogramas (filmstrip) continua y densa del screencast para una reproducción navegable en el reproductor de traces, no solo un fotograma por acción. Ejecuta el grabador de screencast (modo de sondeo en Nightwatch) durante la sesión. Solo se aplica cuando `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Captura de pantalla por prueba. Solo en modo trace + `traceGranularity: 'test'`. **Solo se genera**: el PNG se escribe en el directorio de salida del trace (y en el manifiesto cuando `emitArtifactsManifest: true`); no se adjunta en línea a Allure (consulta la nota más abajo). |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Segmento de vídeo por prueba, conservado según la política indicada (p. ej., `'retain-on-failure'`). Solo en modo trace + `traceGranularity: 'test'`. Un valor distinto de `off` inicia por sí mismo el grabador de screencast; **no** necesitas además `filmstrip` ni `screencast.enabled`. **Solo se genera**: el `.webm` se escribe en el directorio de salida del trace (y en el manifiesto cuando `emitArtifactsManifest: true`); no se adjunta en línea a Allure. |
| `emitArtifactsManifest` | `boolean` | `false` | Escribe el manifiesto `devtools-artifacts-<sessionId>.json` (el índice genérico que los reporters/CI consumen para descubrir los artefactos generados) junto al trace. **Opcional en Nightwatch**: no dispone de una señal de Allure en vivo con la que detectarlo automáticamente, así que, a diferencia de WDIO/Selenium, nunca se activa automáticamente. Solo se aplica cuando `mode: 'trace'`. |
| `captureAssertions` | `boolean` | `true` | Captura las aserciones como filas de acción del trace: `node:assert` además de los nativos `browser.assert`/`browser.verify`, incluidos los matchers negados `.not.*`. Establécelo en `false` para desactivarlo. |

> **El adjunto en línea a Allure no está disponible para Nightwatch.** Su reporter oficial `nightwatch-allure` funciona a posteriori (sin API de adjunto en vivo), y `attachment()` de `allure-js-commons` no hace nada en una ejecución de Nightwatch. Por eso, los artefactos `screenshot` / `video` se *generan* (archivos, además del manifiesto de artefactos cuando `emitArtifactsManifest: true`) en el directorio de salida del trace, pero no se adjuntan a una prueba de Allure. La segmentación por prueba —y, por tanto, estos artefactos— tiene sentido en las interfaces de Cucumber y exports-object; la interfaz BDD `describe/it` se reduce a granularidad de sesión, por lo que la condición por prueba no tiene efecto allí.

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## Screencast

Graba un vídeo `.webm` continuo de la sesión del navegador. Cada sesión de WebDriver obtiene su propia grabación: un `browser.end()` a mitad de la ejecución, o el cierre del navegador por escenario en Cucumber, finaliza el vídeo actual e inicia uno nuevo para la siguiente sesión. La última grabación se finaliza en el hook `after()` de Nightwatch, y cada grabación puede seleccionarse desde el desplegable de la pestaña Screencast.

**Solo modo de sondeo.** Nightwatch no expone una vía de acceso estable a CDP como sí lo hacen WebdriverIO (`browser.getPuppeteer()`) y Selenium (`driver.createCDPConnection`), por lo que el screencast captura fotogramas solicitando una captura de pantalla de WebDriver a intervalos fijos. La solicitud va directamente por el transporte HTTP de WebDriver, sin pasar por la cola de comandos de Nightwatch, así que nunca espera detrás de los comandos de tu prueba. Funciona en todos los navegadores que admite Nightwatch.

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| Opción | Tipo | Valor por defecto | Notas |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | Interruptor principal. |
| `pollIntervalMs` | `number` | `200` | Intervalo entre capturas de pantalla (ms). Menor = vídeo más fluido, más viajes de ida y vuelta a WebDriver. 200 ms ≈ 5 fps. |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Formato de píxel por fotograma que se entrega al codificador ffmpeg antes del mux final del `.webm`. En modo de sondeo, las capturas de origen siempre se toman como PNG, así que esto **no** cambia la captura, solo el formato que recibe el codificador por fotograma. |
| `maxBufferFrames` | `number` | `2000` | Límite de fotogramas en memoria. Al superarlo, el búfer se reduce en el sitio, conservando el primer y el último fotograma. |
| `maxWidth` / `maxHeight` / `quality` | - | - | Opciones exclusivas de CDP, ignoradas en modo de sondeo. Se incluyen por compatibilidad de forma con los adaptadores de WDIO/Selenium. |

**Requisitos previos:** `fluent-ffmpeg` (ya es una dependencia de ejecución del paquete) más el binario `ffmpeg` en el PATH. macOS: `brew install ffmpeg`. Linux: `apt install ffmpeg`. Sin ffmpeg, el grabador sigue funcionando, pero el paso de codificación registra una advertencia y omite escribir el archivo.

**Salida:** `nightwatch-video-<sessionId>.webm` se escribe en una carpeta `test-results/` junto al archivo de prueba que se acaba de ejecutar; si no es posible, se usa el directorio de `nightwatch.conf.*` y, después, `process.cwd()`. Los directorios dentro de `node_modules/` se omiten y, si el directorio elegido no tiene permisos de escritura, el archivo se guarda en el directorio temporal del sistema operativo. La ruta completa aparece en la línea de registro de Nightwatch `📹 Screencast video: <path>` y el vídeo también se transmite a la pestaña Screencast del panel.

Para la referencia completa de la función de screencast (compatibilidad de navegadores, rutas de salida en los tres adaptadores), consulta la [página de Screencast](/docs/devtools/wdio/screencast).

## Captura BiDi (opcional)

Activa la captura mediante WebDriver BiDi de los mensajes de la consola del navegador, las excepciones de JS y las solicitudes de red. Equivale a la ruta que usa selenium-devtools: ambos adaptadores comparten la misma lógica de conexión en `@wdio/devtools-core`.

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
  webSocketUrl: true,                           // ← activa BiDi
  'goog:chromeOptions': { /* ... */ }
}
```

Cuando BiDi está conectado, se desactiva la ruta de captura de red por comando basada en el registro de rendimiento de Chrome para que las solicitudes no aparezcan dos veces en el panel. Si falta `webSocketUrl` o la versión de chromedriver no expone BiDi, la conexión registra una advertencia y la alternativa basada en el registro de rendimiento sigue funcionando. El recolector inyectado también lista cada solicitud, a partir de dos fuentes propias de la página: una llamada `fetch` / `XMLHttpRequest` pasa por su parche e incluye método, cabeceras, estado y cuerpo, y cualquier otra carga proviene del búfer de Resource Timing de la página, con su tiempo y tamaño. En Chrome, el registro de rendimiento actualiza después esas filas de Resource Timing en el sitio con cabeceras y estado; en Safari, o en cualquier sesión servida por Appium, se quedan tal como las vio la página, sin cabeceras ni cuerpos, y en Safari sin estado. Consulta [Registros de red](/docs/devtools/wdio/network-logs#without-webdriver-bidi).

**Establece `webSocketUrl: true` incluso sin `bidi: true`.** Con ello, el adaptador registra su recolector de página al inicio del documento en cada página, de modo que el viaje en el tiempo del DOM se mantiene preciso entre navegaciones. Sin ello, el adaptador recurre a inyectar el recolector después de cada navegación, lo que puede omitir los primeros momentos de una página nueva.

## Modo trace

Ruta de captura sin interfaz: no se abre ninguna ventana de la interfaz de DevTools. Al final de la sesión, el adaptador escribe un `trace-<sessionId>.zip` portátil (o un directorio) en una carpeta `test-results/` (junto al directorio de prueba / configuración resuelto), con la misma forma que el artefacto de trace de WebdriverIO.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // opcional; por defecto 'zip'
})
```

### Granularidad y Cucumber

`traceGranularity` elige qué abarca cada artefacto: `'session'` (por defecto), `'spec'` o `'test'`.

Nightwatch cierra el navegador después de cada escenario de Cucumber. Un trace `'session'` abarca todo esto: un zip para toda la ejecución, con cada escenario anidado bajo su feature. `'test'` escribe un zip por escenario en su propia carpeta, que es lo recomendado para Cucumber: artefactos más pequeños y la granularidad en la que se basa la retención de `tracePolicy`.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // un trace por escenario de Cucumber
})
```

En la interfaz BDD `describe/it`, `'test'` se reduce a un único segmento con alcance de sesión: Nightwatch ejecuta cada `it()` internamente y dispara el hook por prueba del plugin solo una vez por módulo. El árbol de acciones sigue mostrando cada `it` como su propio grupo.

En modo trace se omiten la vinculación del puerto del backend y la ventana de la interfaz, y `screencast.enabled` se ignora (se registra una advertencia cuando nada más necesita el grabador). En su lugar, el modo trace graba por defecto el `filmstrip` denso, y los campos de ajuste del screencast (`pollIntervalMs`, `captureFormat`, `maxBufferFrames`) siguen aplicándose a ese grabador. Para la referencia completa de la función (contenido del artefacto, visor, pruebas móviles, cuándo elegir `zip` frente a `ndjson-directory`), consulta la [página de Modo trace](/docs/devtools/wdio/trace-mode).

Nightwatch comparte la misma canalización de traces que los adaptadores de WebdriverIO y Selenium, por lo que la forma del artefacto es idéntica sin importar qué adaptador lo haya generado. Un trace de Nightwatch contiene la captura completa por acción —una captura de pantalla, la instantánea del árbol de accesibilidad con sangría por profundidad, la lista de elementos interactuables y la transcripción en Markdown—, así que se abre en el reproductor `show-trace` con viaje en el tiempo del DOM/instantánea, las pestañas **A11y**, **Transcript** y **Errors** (fallos con salto al código fuente), la superposición de elementos para seleccionar localizadores y (para Cucumber) el anidamiento **Feature → Scenario**. Los pasos se registran en el panel en vivo, pero aún no se anidan como grupos propios en el trace. Los localizadores copiados priorizan CSS simple, que Nightwatch lee por defecto; solo cuando no existe un selector CSS único el reproductor te ofrece XPath, acompañado de la indicación `useXpath()` / `locateStrategy: 'xpath'`.

Abre un trace con el binario `show-trace`, incluido en `@wdio/nightwatch-devtools` (sin dependencias adicionales):

```sh
npx show-trace test-results/trace-<sessionId>.zip   # en un proyecto que instala el adaptador
pnpm show-trace test-results/trace-<sessionId>.zip  # desde el monorepo de devtools
```

Consulta la página del [Reproductor de traces](/docs/devtools/trace-player) para ver el recorrido completo y los atajos de teclado.

### Segmentación por prueba y la advertencia de BDD `describe/it`

Las opciones por prueba —`traceGranularity: 'test'`, y las opciones `tracePolicy`, `screenshot` y `video` que se combinan con ella— necesitan un hook por prueba para cortar el segmento de cada prueba. La interfaz **exports-object (estilo mocha)** y **Cucumber** (hooks por escenario) exponen uno, así que obtienen una segmentación por prueba real. La interfaz **BDD `describe/it`** es la excepción: Nightwatch ejecuta cada `it()` internamente y dispara el hook por prueba del plugin solo una vez por módulo, por lo que `traceGranularity: 'test'` se reduce a un único segmento **con alcance de sesión** asociado a la primera prueba. El manifiesto de artefactos sigue listando cada caso de prueba con su estado correcto; solo se reduce la asociación de segmentos/artefactos por prueba. Los traces con granularidad de sesión y de spec no se ven afectados.

## Ejemplos

Los ejemplos funcionales se encuentran en el directorio `examples/` de nivel superior del repositorio. Compila el workspace una vez (`pnpm install && pnpm build`) y luego ejecuta desde la raíz del repositorio:

| Directorio | Runner | Comando |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch BDD `describe/it` (modo trace por defecto; `DEVTOOLS_MODE=live` para la interfaz) | `pnpm demo:nightwatch` (`pnpm demo:nightwatch:retry` añade `--retries 1`) |
| [`examples/nightwatch/cucumber/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch/cucumber) | Nightwatch + Cucumber | `pnpm --filter @wdio/nightwatch-devtools example:cucumber` |
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) (`nightwatch.mobile.conf.cjs`) | Appium (app Reloj de Android; Ajustes de iOS con `DEVTOOLS_MOBILE_PLATFORM=ios`) | `pnpm demo:nightwatch:mobile` |

## Móvil (Appium)

Las sesiones de Appium se capturan en modo live y en modo trace. Declara Appium bajo `selenium` con `use_appium: true`, `start_process: false` y `default_path_prefix: ''`. Para una app nativa, establece `browserName: null`; de lo contrario, Nightwatch rellena Firefox y el adaptador trata la sesión como si tuviera una página web. Deja `bidi` desactivado, ya que Appium no ofrece BiDi. La red de una app nativa se captura cuando `desiredCapabilities` establece `'appium:intercept': true` y Appium ejecuta el plugin appium-interceptor; consulta [Red de apps nativas](/docs/devtools/mobile#native-app-network).

```js
// nightwatch.mobile.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  selenium: {
    start_process: false,
    use_appium: true,
    host: '127.0.0.1',
    port: 4723,
    default_path_prefix: ''
  },
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: null,
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2'
      },
      globals: nightwatchDevtools({ mode: 'trace', bidi: false })
    }
  }
}
```

Las sesiones nativas registran comandos, capturas de pantalla y datos de elementos a partir del árbol XML de la plataforma, sin DOM. La webview de una app híbrida se captura como si siguiera siendo nativa. Pruébalo con `pnpm demo:nightwatch:mobile`, ejecutado desde la raíz de una copia compilada del repositorio de devtools (pasos de configuración en [Ejecutar un ejemplo](/docs/devtools/mobile#running-an-example)). Consulta la [página de Pruebas móviles](/docs/devtools/mobile) para la referencia móvil completa.

## Funciones

El adaptador de Nightwatch ofrece la misma experiencia de interfaz de DevTools que WebdriverIO. Cada una de las funciones siguientes se captura automáticamente con la configuración base `globals: nightwatchDevtools({ port: 3000 })`, sin configuración específica por función (los registros de red necesitan además `'goog:loggingPrefs': { performance: 'ALL' }`, como se muestra en [Configuración](#setup)). Los enlaces llevan a la referencia completa de cada función.

- **[Reejecución interactiva de pruebas y visualización](/docs/devtools/wdio/interactive-test-rerunning)** - Vistas previas del navegador en vivo, capturas de pantalla por comando y reejecución de pruebas/suites con un clic
- **[Conservar y reejecutar (Comparar)](/docs/devtools/wdio/preserve-and-rerun)** - Toma una instantánea de una prueba fallida, reejecútala y compara ambas ejecuciones en paralelo. Las reejecuciones de Nightwatch vuelven a lanzar tu configuración con `DEVTOOLS_RERUN_LABEL` establecido y filtran hasta esa prueba; necesitan un `nightwatch.conf.*` localizable, sin el cual el plugin muestra una advertencia y la reejecución no está disponible
- **[Compatibilidad con múltiples frameworks](/docs/devtools/wdio/multi-framework-support)** - Runners estándar (estilo mocha) y Cucumber/BDD
- **[Registros de consola](/docs/devtools/wdio/console-logs)** - Captura e inspecciona la salida de la consola del navegador (en tiempo real con `bidi: true`)
- **[Registros de red](/docs/devtools/wdio/network-logs)** - Supervisa las llamadas a la API y la actividad de red
- **[Metadatos](/docs/devtools/wdio/metadata)** - Capabilities de la sesión, entorno y tiempos por sesión del navegador
- **[TestLens](/docs/devtools/wdio/testlens)** - Salta desde cualquier comando a la línea de código fuente que lo desencadenó
- **[Screencast de la sesión](/docs/devtools/wdio/screencast)** - Grabación `.webm` continua de la sesión del navegador
- **[Modo trace](/docs/devtools/wdio/trace-mode)** - Captura sin interfaz que genera un `trace.zip` portátil (sin ventana de interfaz)

El screencast es la única función con opciones propias (lista completa en [Screencast](#screencast)):

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## Limitaciones

Nightwatch no ofrece la misma profundidad de hooks del framework que WebdriverIO, por lo que hay algunas diferencias respecto al servicio DevTools de WDIO:

| Limitación | Detalle |
|-----------|--------|
| Sin hooks de comando nativos | Nightwatch no tiene hooks `beforeCommand` / `afterCommand`. En su lugar, los comandos se interceptan mediante un envoltorio proxy del navegador. |
| Contexto de prueba limitado | `browser.currentTest` proporciona menos metadatos que el contexto del runner de WDIO; los nombres de las pruebas y las rutas de archivo requieren heurísticas adicionales. |
| Anidamiento de suites plano | Nightwatch no admite de forma nativa bloques `describe` con múltiples niveles de anidamiento; el plugin informa como máximo de dos niveles. |
| Disponibilidad diferida de resultados | Los resultados de las pruebas solo se finalizan en `afterEach`, no están disponibles a mitad de la prueba. |
| Screencast solo en modo de sondeo | A diferencia de WDIO (envío por CDP mediante `browser.getPuppeteer()`) y Selenium (envío por CDP mediante `driver.createCDPConnection`), Nightwatch carece de una vía de acceso estable a CDP, por lo que los fotogramas se capturan sondeando el endpoint de capturas de pantalla de WebDriver. Funciona en todos los navegadores que admite Nightwatch; con un pequeño coste por fotograma proporcional al intervalo de sondeo. |
| Segmentación de traces por prueba (BDD `describe/it`) | La interfaz BDD dispara el hook por prueba del plugin una vez por módulo, por lo que `traceGranularity: 'test'` se reduce a un único segmento con alcance de sesión. Las interfaces exports-object (estilo mocha) y Cucumber obtienen una segmentación por prueba real. Consulta [Segmentación por prueba](#per-test-slicing--the-bdd-describeit-caveat). |
| Retención basada en reintentos | Solo `tracePolicy: 'retain-on-failure'` es fiable; las demás políticas basadas en reintentos se degradan a ella. |
| Artefactos de trace que solo se generan | Los archivos `screenshot` / `video` por prueba se escriben en el directorio de salida del trace (y en el manifiesto cuando `emitArtifactsManifest: true`), pero no se adjuntan en línea a Allure: Nightwatch no tiene una API de adjunto de Allure en vivo. |

La paridad general de funciones con el servicio DevTools de WebdriverIO es de aproximadamente un **80-90 %**.