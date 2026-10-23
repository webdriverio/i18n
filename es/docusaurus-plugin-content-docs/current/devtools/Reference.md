---
id: reference
title: Referencia de configuración
description: "Consulta todas las opciones de DevTools para el modo en vivo y el modo de traza en los adaptadores de WebdriverIO, Selenium y Nightwatch, con sus valores predeterminados."
---

Todas las opciones de DevTools de un vistazo, en los tres adaptadores. Las opciones compartidas tienen los mismos **nombres, tipos y valores predeterminados** en todos los adaptadores; cuando el comportamiento o la disponibilidad difieren, se indica, y las opciones exclusivas de un adaptador se enumeran por separado. El adaptador de Python no acepta un objeto de opciones; consulta las pestañas de Python en la página de [Selenium](/docs/devtools/selenium#configuration-options). Para la explicación completa de cada opción de traza, consulta la sección enlazada en la página [Modo de traza](/docs/devtools/wdio/trace-mode).

Pasa las opciones de la forma en que las acepta cada adaptador:

- **WebdriverIO** — `services: [['devtools', { … }]]`
- **Selenium** — `DevTools.configure({ … })`
- **Nightwatch** — `globals: nightwatchDevtools({ … })`

## Opciones de modo y del modo en vivo

| Opción | Tipo / valores | Predeterminado | Notas |
|---|---|---|---|
| `mode` | `'live' \| 'trace'` | `'live'` | `'live'` abre el panel de la interfaz de DevTools; `'trace'` lo omite y escribe un artefacto portable. Ambos son mutuamente excluyentes. |
| `port` | `number` | `3000` (se usa un puerto libre si está ocupado) | Puerto al que se vincula la interfaz / backend de DevTools. Solo en modo en vivo. |
| `hostname` | `string` | `'localhost'` | Nombre de host al que se vincula el servidor. Solo en modo en vivo. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Vídeo continuo de la sesión (`.webm`). Solo en modo en vivo; para el modo de traza usa `video`. Incluye `maxBufferFrames` (predeterminado `2000`), el límite de fotogramas mantenidos en memoria. Consulta [Screencast](/docs/devtools/wdio/screencast). |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600×1200 | Capabilities usadas para abrir la ventana de la interfaz de DevTools. WebdriverIO, solo en modo en vivo. |

## Opciones del modo de traza

Solo se aplican cuando `mode: 'trace'`.

| Opción | Tipo / valores | Predeterminado | Detalles |
|---|---|---|---|
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Un único archivo comprimido frente a un directorio descomprimido. [Formato de salida](/docs/devtools/wdio/trace-mode#output-format--traceformat) |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Una traza por sesión / archivo spec / test. `'test'` es necesario para capturas de pantalla/vídeo por test y para adjuntar en línea a Allure. [Granularidad de la traza](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Qué trazas conservar. Se combina con `traceGranularity: 'test'`. [Retención](/docs/devtools/wdio/trace-mode#retention--tracepolicy) |
| `filmstrip` | `boolean` | `true` | Screencast denso y continuo dentro de la traza para una navegación fluida; `false` registra un fotograma por acción. Se reduce al exportar a fotogramas separados al menos 100 ms, unos 600 como máximo. [Filmstrip denso](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Captura de pantalla por test (requiere `traceGranularity: 'test'`). Se adjunta en línea a Allure en WebdriverIO y Selenium; en Nightwatch solo se genera. [Captura de pantalla y vídeo por test](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `video` | `'off' \| <tracePolicy value>` | `'off'` | Fragmento de vídeo por test (requiere `traceGranularity: 'test'`; la codificación requiere `ffmpeg` en el `PATH`). Se adjunta en línea a Allure en WebdriverIO y Selenium; en Nightwatch solo se genera. [Captura de pantalla y vídeo por test](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `emitArtifactsManifest` | `boolean` | `false` | Escribe `devtools-artifacts-<sessionId>.json`. Se activa automáticamente cuando se detecta un reporter de Allure (opcional en Nightwatch). [Manifiesto de artefactos](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) |
| `captureAssertions` | `boolean` | `true` | Captura `node:assert` (y los matchers `expect` del framework cuando se admiten) como acciones de la traza. [Aserciones](/docs/devtools/wdio/trace-mode#assertions--captureassertions) |

## Exclusivas de Selenium (Node.js)

| Opción | Tipo / valores | Predeterminado | Notas |
|---|---|---|---|
| `openUi` | `boolean` | `true` | Abre la ventana del panel automáticamente. Establécelo en `false` para CI. |
| `headless` | `boolean` | `false` | Ejecuta el navegador de pruebas en modo headless (`--headless=old`). La ventana del panel no se ve afectada. |
| `rerunCommand` | `string` | automático | Plantilla de comando para volver a ejecutar un test; se sustituye `{{testName}}`. Se deriva del argv del runner cuando se omite. |

## Exclusivas de Nightwatch

| Opción | Tipo / valores | Predeterminado | Notas |
|---|---|---|---|
| `bidi` | `boolean` | `false` | Activa la captura mediante WebDriver BiDi (consola + excepciones de JS + red). Requiere `webSocketUrl: true` en las capabilities. En WebdriverIO y Selenium, BiDi se conecta automáticamente. Consulta [Nightwatch → Captura BiDi](/docs/devtools/nightwatch#bidi-capture-opt-in). |

## Diferencias entre adaptadores

Algunas capacidades de traza se ven limitadas en ciertos adaptadores; consulta la [matriz de compatibilidad entre frameworks](/docs/devtools/cross-framework) para ver el panorama completo. Las más destacables:

- **Retención con reintentos en Nightwatch**: solo `retain-on-failure` es fiable; los demás valores de `tracePolicy` se degradan a este.
- **BDD `describe/it` en Nightwatch**: `traceGranularity: 'test'` se reduce a un único fragmento con alcance de sesión.
- **Adjuntos de Allure en Nightwatch**: `screenshot`/`video` por test solo se generan (archivos + manifiesto), no se adjuntan en línea.