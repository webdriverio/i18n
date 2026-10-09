---
id: cross-framework
title: Compatibilidad entre frameworks
description: "Compara qué tan completa es la captura del modo de traza de DevTools en ejecuciones de WebdriverIO, Selenium y Nightwatch, y qué carencias tiene cada adaptador."
---

El formato de traza y el reproductor `show-trace` son idénticos en WebdriverIO / Selenium / Nightwatch; esta página muestra dónde difiere la completitud de la captura. Para la referencia completa del modo de traza, consulta [Modo de traza](/docs/devtools/wdio/trace-mode).

Las transformaciones que construyen una traza residen en [`@wdio/devtools-trace`](https://github.com/webdriverio/devtools/tree/main/packages/trace), una capa por debajo de los adaptadores, por lo que **el formato de traza y el reproductor `show-trace` son idénticos para todos los adaptadores**: el mismo `.zip` (o directorio) se abre en el mismo reproductor, independientemente de cuál lo haya generado. Además, los tres adaptadores siguientes comparten las opciones principales (`mode`, `traceGranularity`, `tracePolicy`, `traceFormat`, `filmstrip`, `emitArtifactsManifest`, `captureAssertions`).

**Sin embargo, la completitud de la captura varía según el adaptador**: WebdriverIO es el más completo; Selenium y Nightwatch cubren el flujo principal con las carencias indicadas a continuación. La sintaxis de activación específica de cada framework se encuentra en la página de cada adaptador; consulta [Selenium](/docs/devtools/selenium#trace-mode) y [Nightwatch](/docs/devtools/nightwatch#trace-mode).

El adaptador de Python (consulta las pestañas **Python** en la página de [Selenium](/docs/devtools/selenium)) escribe el mismo archivo y se abre en el mismo reproductor, pero no figura en esta tabla: no ejecuta JavaScript en el proceso de prueba, por lo que el backend construye su traza a partir del flujo capturado en lugar de que el adaptador la construya dentro del proceso. La granularidad y la retención sí tienen equivalentes en Python: `--devtools-trace-granularity session|test` y `--devtools-trace-policy`, este último con sus valores sensibles a los reintentos degradándose a `retain-on-failure`, porque nada en ese canal transporta un número de intento. Las filas sin equivalente en Python son las de artefactos por prueba: `screenshot`, `video` y el adjunto en línea de Allure. Lo que sí captura (viaje en el tiempo del DOM, la tira de fotogramas densa, el árbol de A11y y la superposición de elementos, comandos, consola, red, aserciones, controles de ejecución y Preserve & Rerun) se describe en su propia página.

| Capacidad | WebdriverIO | Selenium | Nightwatch |
|---|---|---|---|
| Modo de traza + reproductor `show-trace` | ✅ | ✅ | ✅ |
| Viaje en el tiempo del DOM (captura de mutaciones) | ✅ | ✅ ¹ | ✅ |
| Pestaña A11y + superposición de selección de localizador (reproductor de trazas) | ✅ | ✅ | ✅ |
| Transcripción + Copy-for-LLM | ✅ | ✅ | ✅ |
| `screenshot` / `video` por prueba | ✅ Allure en línea | ✅ Allure en línea | ⚠️ solo generación ² |
| Detección automática de `emitArtifactsManifest` | ✅ | ✅ | ⚠️ solo opt-in |
| `tracePolicy` sensible a reintentos | ✅ | ✅ | ⚠️ solo `retain-on-failure` ³ |
| `traceGranularity: 'test'` | ✅ | ✅ | ⚠️ Cucumber / objeto de exports; BDD `describe/it` se reduce a un segmento de sesión |
| Anidamiento Feature→Scenario→Step de Cucumber | Scenario→Step ⁴ | ✅ completo | Feature→Scenario ⁵ |
| Captura BiDi (consola / red / excepciones) | ✅ automática | ✅ automática | ⚠️ opt-in (`bidi: true` + `webSocketUrl`) |
| Screencast (tira de fotogramas / vídeo) | CDP push | CDP push | solo sondeo |
| Pestaña A11y + superposición en el panel en vivo | ✅ | solo reproductor de trazas | solo reproductor de trazas |

¹ Selenium reconstruye el DOM por cada navegación; la sincronización de los anclajes es aproximada (la instantánea de una navegación puede ir con retraso respecto al comando que la desencadenó).
² Nightwatch no tiene una API de adjuntos de Allure en vivo, por lo que los artefactos por prueba se escriben en el directorio de salida de la traza y se listan en el manifiesto, pero no se adjuntan a una prueba de Allure.
³ El `--retries` de Nightwatch vuelve a ejecutar una prueba internamente sin volver a disparar los hooks por prueba del plugin, por lo que las políticas sensibles a reintentos (`on-first-retry`, `retain-on-first-failure`, …) se degradan a `retain-on-failure`.
⁴ WebdriverIO aún no conserva la ascendencia a nivel de feature, por lo que su anidamiento de Cucumber es Scenario→Step.
⁵ Nightwatch aún no registra el anidamiento por paso (solo Feature→Scenario).