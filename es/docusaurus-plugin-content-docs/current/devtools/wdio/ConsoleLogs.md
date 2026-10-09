---
id: console-logs
title: Registros de consola
description: "Captura e inspecciona los mensajes de la consola del navegador y los registros del framework WebdriverIO grabados por DevTools durante la ejecución de las pruebas."
---

Captura e inspecciona toda la salida de la consola del navegador durante la ejecución de las pruebas. DevTools registra los mensajes de consola de tu aplicación (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`), así como los registros del framework WebDriverIO según el `logLevel` configurado en tu `wdio.conf.ts`.

**Características:**
- Captura de mensajes de consola en tiempo real durante la ejecución de las pruebas
- Registros de la consola del navegador (log, warn, error, info, debug)
- Registros del framework WebDriverIO filtrados por el `logLevel` configurado (trace, debug, info, warn, error, silent)
- Marcas de tiempo que muestran exactamente cuándo se registró cada mensaje
- Registros de consola mostrados junto a los pasos de las pruebas y las capturas de pantalla del navegador para dar contexto

**Configuración:**
```js
// wdio.conf.ts
export const config = {
    // Nivel de detalle de los registros: trace | debug | info | warn | error | silent
    logLevel: 'info', // Controla qué registros del framework se capturan
    // ...
};
```

Esto facilita depurar errores de JavaScript, hacer seguimiento del comportamiento de la aplicación y ver las operaciones internas de WebDriverIO durante la ejecución de las pruebas.

## Demostración

### >_ Registros de consola
![Console Logs](/img/devtools/console-logs.gif)