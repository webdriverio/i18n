---
id: wdio
title: WebDriverIO DevTools
description: "Instala y configura el servicio WebdriverIO DevTools para depurar pruebas con reproducción del DOM, capturas de pantalla, captura de red y consola, y grabaciones de pantalla."
---

Un servicio de WebdriverIO que proporciona una interfaz de herramientas para desarrolladores para ejecutar, depurar e inspeccionar pruebas de automatización del navegador. Entre sus funciones se incluyen la reproducción de mutaciones del DOM, capturas de pantalla por comando, inspección de solicitudes de red, captura de registros de consola y grabación de pantalla de la sesión.

## Instalación

```sh
npm install @wdio/devtools-service --save-dev
```

## Uso

### Test Runner

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

### Standalone

```ts
import { remote } from 'webdriverio'
import { setupForDevtools } from '@wdio/devtools-service'

const browser = await remote(setupForDevtools({
  capabilities: { browserName: 'chrome' }
}))
await browser.url('https://example.com')
await browser.deleteSession()
```

## Opciones del servicio

```ts
services: [['devtools', options]]
```

| Opción | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `port` | `number` | aleatorio | Puerto en el que escucha el servidor de la interfaz de DevTools |
| `hostname` | `string` | `'localhost'` | Nombre de host al que se vincula el servidor de la interfaz de DevTools |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600x1200 | Capabilities utilizadas para abrir la ventana de la interfaz de DevTools |
| `screencast` | `ScreencastOptions` | - | Grabación de vídeo de la sesión ([ver Screencast](/docs/devtools/wdio/screencast)) |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` abre la interfaz de DevTools; `trace` la omite y en su lugar escribe un artefacto portable ([ver Modo Trace](/docs/devtools/wdio/trace-mode)) |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Estructura del artefacto de traza: un único archivo comprimido frente a un directorio sin comprimir. Solo se aplica cuando `mode: 'trace'` |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Una traza por sesión / archivo spec / prueba. `'test'` escribe cada una en `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Solo se aplica cuando `mode: 'trace'` ([ver Modo Trace](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity)) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Qué trazas conservar. Se combina con `traceGranularity: 'test'`. Solo se aplica cuando `mode: 'trace'` |
| `filmstrip` | `boolean` | `true` | Graba una tira de fotogramas (filmstrip) densa y continua *dentro* de la traza para una reproducción fluida y desplazable en el reproductor: fotogramas densos junto a los fotogramas por acción, reducidos y direccionados por contenido al exportar. Solo se aplica cuando `mode: 'trace'` |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Captura de pantalla por prueba, adjuntada en línea a Allure (`image/png`). Requiere `mode: 'trace'` + `traceGranularity: 'test'` |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Vídeo de grabación de pantalla por prueba, conservado según la política indicada y adjuntado en línea a Allure (`video/webm`). Requiere `mode: 'trace'` + `traceGranularity: 'test'` |
| `emitArtifactsManifest` | `boolean` | `false` | Escribe `devtools-artifacts-<sessionId>.json`: un índice genérico de todos los artefactos generados más el estado de cada prueba, para reporters/CI. Se habilita automáticamente cuando `@wdio/allure-reporter` está en la configuración. Solo se aplica cuando `mode: 'trace'` |
| `captureAssertions` | `boolean` | `true` | Captura las aserciones como filas de acciones de la traza: `node:assert` más los matchers `expect(...)` que pasan o fallan. Establécelo en `false` para desactivarlo |

## Primeros pasos

1. Ejecuta tus pruebas de WebdriverIO
2. La interfaz de DevTools se abre automáticamente en una ventana externa del navegador
3. Las pruebas comienzan a ejecutarse de inmediato con visualización en tiempo real
4. Observa la vista previa del navegador en vivo, el progreso de las pruebas y la ejecución de comandos
5. Una vez completada la ejecución inicial, usa los botones de reproducción para volver a ejecutar pruebas o suites individuales
6. Haz clic en el botón de detener en cualquier momento para finalizar las pruebas en ejecución
7. Explora las acciones, los metadatos, los registros de consola y el código fuente en las pestañas del área de trabajo

## Funciones

Explora en detalle las funciones de WebDriverIO DevTools:

- **[Reejecución interactiva de pruebas y visualización](/docs/devtools/wdio/interactive-test-rerunning)** - Vistas previas del navegador en tiempo real con reejecución de pruebas
- **[Conservar y reejecutar (Comparar)](/docs/devtools/wdio/preserve-and-rerun)** - Toma una instantánea de una prueba fallida, vuelve a ejecutarla y compara ambas ejecuciones lado a lado
- **[Compatibilidad con múltiples frameworks](/docs/devtools/wdio/multi-framework-support)** - Funciona con Mocha, Jasmine y Cucumber
- **[Registros de consola](/docs/devtools/wdio/console-logs)** - Captura e inspecciona la salida de la consola del navegador
- **[Registros de red](/docs/devtools/wdio/network-logs)** - Supervisa las llamadas a la API y la actividad de red
- **[Metadatos](/docs/devtools/wdio/metadata)** - Capabilities de la sesión, entorno y tiempos por cada sesión del navegador
- **[TestLens](/docs/devtools/wdio/testlens)** - Navega al código fuente con navegación inteligente de código
- **[Grabación de pantalla de la sesión](/docs/devtools/wdio/screencast)** - Grabación automática de vídeo de las sesiones del navegador
- **[Modo Trace](/docs/devtools/wdio/trace-mode)** - Ruta de captura headless que produce un artefacto portable `trace.zip` (sin ventana de interfaz); admite los formatos de salida `zip` y `ndjson-directory`, granularidad por sesión/spec/prueba, políticas de retención que tienen en cuenta los reintentos y un `filmstrip` denso opcional, todo ello visualizable en el reproductor propio `show-trace`

## Reproductor de trazas

Una traza grabada con `mode: 'trace'` se abre en el reproductor propio `show-trace` (`npx show-trace path/to/trace.zip`): viaje en el tiempo por el DOM, la pestaña A11y y la superposición de elementos para seleccionar localizadores, la pestaña Transcript con Copy-for-LLM, las pestañas Errors / Console / Network / Source y una línea de tiempo desplazable (filmstrip denso, anidamiento Feature → Scenario → Step de Cucumber).

Consulta la página **[Reproductor de trazas](/docs/devtools/trace-player)** para ver la guía completa y otros visores compatibles.

## Informes de Allure

Con `@wdio/allure-reporter` en la configuración, los artefactos del modo trace (el zip de la traza, además de la captura de pantalla y el vídeo por prueba con `traceGranularity: 'test'`) se adjuntan automáticamente al informe de Allure, y `emitArtifactsManifest` se habilita automáticamente.

Consulta **[Integración con Allure](/docs/devtools/allure)** para conocer los detalles de los adjuntos y las opciones para silenciar los pasos del reporter.