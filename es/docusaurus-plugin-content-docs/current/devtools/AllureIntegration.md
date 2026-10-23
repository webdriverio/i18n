---
id: allure
title: Integración con Allure
description: "Adjunta automáticamente a tu informe de Allure los artefactos del modo de rastreo de DevTools, como archivos zip de rastreo, capturas de pantalla y videos."
---

Los artefactos del modo de rastreo (el zip de rastreo y la captura de pantalla y el video de cada prueba) se adjuntan automáticamente a un informe de Allure, para que puedas abrirlos directamente desde el informe. Consulta [Modo de rastreo](/docs/devtools/wdio/trace-mode) para saber cómo habilitar el modo de rastreo y generar estos artefactos.

Cuando hay un reporter de Allure presente, los artefactos del modo de rastreo se adjuntan automáticamente al informe de Allure, sin configuración adicional:

- **`traceGranularity: 'test'`**: el `trace.zip` de cada prueba (`application/zip`, una descarga que se abre en `show-trace`), la `screenshot` (`image/png`, en línea) y el `video` (`video/webm`, en línea) se adjuntan a la tarjeta de esa prueba. Esta es la granularidad que debes usar para un informe de Allure por prueba. Codificar el `video` por prueba requiere tener `ffmpeg` en el `PATH`.
- **`traceGranularity: 'session'` / `'spec'`**: un rastreo que abarca toda la sesión o el spec se escribe en disco y se enumera en el [manifiesto de artefactos](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest), pero **no** se adjunta a las tarjetas de prueba individuales: un rastreo de sesión/spec solo se finaliza después de que se hayan ejecutado todas sus pruebas, momento en el que sus tarjetas de Allure ya están cerradas y no hay ninguna prueba abierta a la que adjuntarlo. Para mostrarlo de todos modos, procesa posteriormente el manifiesto en tu propio hook `onComplete`.

Soporte por adaptador:

| Adaptador | Mecanismo de adjunto |
|---|---|
| **WebdriverIO** | Soporte de primera clase mediante `addAttachment` de `@wdio/allure-reporter`. |
| **Selenium** | Mediante `attachment()` de `allure-js-commons`: independiente del runtime, adjunta bajo cualquier adaptador de runner de Allure, condicionado a que haya un runtime activo de `allure-js-commons`. |
| **Nightwatch** | **Solo generación**: los archivos y el manifiesto se escriben, pero no se adjuntan en línea (no hay una API de adjuntos de Allure en vivo). |

**Visor de rastreo integrado.** Como el archivo usa un formato en disco portable y estándar de visor de rastreo, el propio **visor de rastreo integrado** de un informe de Allure (Allure ≥ 2.35) puede abrir el `trace.zip` adjunto directamente dentro del informe.

**Ruido en el informe.** En el modo de rastreo, la captura toma un `takeScreenshot` por cada acción para construir la línea de tiempo; Allure registra cada comando de WebDriver como un paso y una captura de pantalla por cada `takeScreenshot`. Silencia esa avalancha con las propias opciones del reporter; los adjuntos de rastreo, captura de pantalla y video no se ven afectados:

```ts
reporters: [
  ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: true
  }]
]
```