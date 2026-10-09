---
id: allure
title: Integración con Allure
description: "Adjunta automáticamente a tu informe de Allure los artefactos del modo trace de DevTools, como archivos zip de trazas, capturas de pantalla y vídeos."
---

Los artefactos del modo trace —el zip de la traza y la captura de pantalla y el vídeo de cada test— se adjuntan automáticamente a un informe de Allure, para que puedas abrirlos directamente desde el informe. Consulta [Modo Trace](/docs/devtools/wdio/trace-mode) para saber cómo habilitar el modo trace y generar estos artefactos.

Cuando hay un reporter de Allure presente, los artefactos del modo trace se adjuntan automáticamente al informe de Allure, sin necesidad de configuración adicional:

- **`traceGranularity: 'test'`** — el `trace.zip` de cada test (`application/zip`, una descarga que se abre en `show-trace`), su `screenshot` (`image/png`, en línea) y su `video` (`video/webm`, en línea) se adjuntan a la tarjeta de ese test. Esta es la granularidad que debes usar para un informe de Allure por test.
- **`traceGranularity: 'session'` / `'spec'`** — una traza que abarca toda la sesión o el spec se escribe en disco y se enumera en el [manifiesto de artefactos](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest), pero **no** se adjunta a las tarjetas de los tests individuales: una traza de sesión o de spec solo se finaliza después de que se hayan ejecutado todos sus tests, momento en el que sus tarjetas de Allure ya están cerradas y no hay ningún test abierto al que adjuntarla. Si aun así quieres mostrarla, procesa el manifiesto posteriormente en tu propio hook `onComplete`.

Soporte por adaptador:

| Adaptador | Mecanismo de adjunto |
|---|---|
| **WebdriverIO** | Soporte nativo mediante `addAttachment` de `@wdio/allure-reporter`. |
| **Selenium** | Mediante `attachment()` de `allure-js-commons`: independiente del runtime, adjunta bajo cualquier adaptador de runner de Allure, siempre que haya un runtime de `allure-js-commons` activo. |
| **Nightwatch** | **Solo generación**: se escriben los archivos y el manifiesto, pero no se adjuntan en línea (no hay una API de adjuntos de Allure en vivo). |

**Visor de trazas integrado.** Como el archivo usa un formato en disco estándar y portable de visor de trazas, el propio **visor de trazas integrado** de un informe de Allure (Allure ≥ 2.35) puede abrir el `trace.zip` adjunto directamente dentro del informe.

**Ruido en el informe.** En el modo trace, la captura realiza un `takeScreenshot` por cada acción para construir la línea de tiempo; Allure registra cada comando de WebDriver como un paso y una captura de pantalla por cada `takeScreenshot`. Silencia esa avalancha con las propias opciones del reporter; los adjuntos de traza, captura de pantalla y vídeo no se ven afectados:

```ts
reporters: [
  ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: true
  }]
]
```