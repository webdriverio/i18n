---
id: limitations
title: Limitaciones del modo de traza
description: "Revisa lo que el modo de traza de DevTools deliberadamente no captura y las limitaciones conocidas en los adaptadores de WebdriverIO, Selenium y Nightwatch."
---

Lo que el [modo de traza](/docs/devtools/wdio/trace-mode) omite deliberadamente, además de las carencias conocidas en los distintos adaptadores.

## Lo que omite el modo de traza

- **Ventana de la interfaz de DevTools**: no se abre ninguna instancia de Chrome para el panel.
- **Vinculación de puerto del backend**: no se reserva ningún puerto en localhost (comportamiento equivalente en los tres adaptadores a partir de la v1.2+).
- **`screencast.enabled`**: la grabación continua `.webm` del modo en vivo se ignora en el modo de traza (se registra una advertencia). En su lugar, el modo de traza graba **por defecto** un [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) denso en el archivo (establece `filmstrip: false` para obtener un fotograma por acción), además de fragmentos de [`video`](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) por prueba cuando está habilitado. Los campos de **ajuste** del screencast (`quality`, `maxWidth`, `pollIntervalMs`, …) siguen aplicándose a la grabadora que se esté ejecutando.
- **Volcado `wdio-trace-<sessionId>.json`**: eliminado por completo. El JSON monolítico heredado que solía escribir el modo en vivo de WDIO ya no existe; el modo en vivo ahora transmite al panel y no escribe nada en disco, y el `trace.zip` es el único artefacto de traza.

## Limitaciones conocidas

- **`describe/it` BDD de Nightwatch**: `traceGranularity: 'test'` se reduce a un **único fragmento con ámbito de sesión**: Nightwatch ejecuta los `it` individuales internamente sin un hook por prueba que el plugin pueda detectar, por lo que el fragmento se asocia a la primera prueba. La captura de metadatos (estado por caso de prueba en el manifiesto) no se ve afectada, pero la asociación de traza/captura de pantalla/video por `it` y la retención con reconocimiento de reintentos se degradan al ámbito de sesión para esta interfaz. Las interfaces **exports-object** y **Cucumber** de Nightwatch exponen hooks por escenario/por prueba y obtienen una segmentación real por prueba. (WebdriverIO mocha/cucumber y Selenium mocha no se ven afectados).
- **Retención con reconocimiento de reintentos en Nightwatch**: solo funciona `retain-on-failure`; las demás políticas con reconocimiento de reintentos se degradan porque Nightwatch vuelve a ejecutar un caso de prueba internamente con `--retries` sin volver a disparar los hooks por prueba. Consulta [Retención](/docs/devtools/wdio/trace-mode#retention--tracepolicy).
- **Adjuntos de Allure en Nightwatch**: los `screenshot`/`video` por prueba solo se generan (archivos + manifiesto), no se adjuntan en línea; consulta [Integración con Allure](/docs/devtools/allure).
- **Video/filmstrip en navegadores distintos de Chrome**: en navegadores sin una vía de envío CDP, la grabadora sondea `takeScreenshot`, lo que añade viajes de ida y vuelta de WebDriver y (con Allure) satura el registro de pasos; combínalo con las opciones de silenciamiento de pasos del reporter.