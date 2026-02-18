---
id: console-logs
title: Registros de Consola
---

Captura e inspecciona toda la salida de la consola del navegador durante la ejecución de pruebas. DevTools registra los mensajes de consola de tu aplicación (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`) así como los registros del framework WebDriverIO basados en el `logLevel` configurado en tu `wdio.conf.ts`.

**Características:**
- Captura de mensajes de consola en tiempo real durante la ejecución de pruebas
- Registros de consola del navegador (log, warn, error, info, debug)
- Registros del framework WebDriverIO filtrados por el `logLevel` configurado (trace, debug, info, warn, error, silent)
- Marcas de tiempo que muestran exactamente cuándo se registró cada mensaje
- Registros de consola mostrados junto con los pasos de prueba y capturas de pantalla del navegador para contexto

**Configuración:**
```js
// wdio.conf.ts
export const config = {
    // Nivel de verbosidad de registro: trace | debug | info | warn | error | silent
    logLevel: 'info', // Controla qué registros del framework son capturados
    // ...
};
```

Esto facilita la depuración de errores de JavaScript, el seguimiento del comportamiento de la aplicación y la visualización de las operaciones internas de WebDriverIO durante la ejecución de pruebas.

## Demo

### >_ Registros de Consola
![Console Logs](./demo/console-logs.gif)