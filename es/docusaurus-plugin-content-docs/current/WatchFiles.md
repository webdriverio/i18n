---
id: watcher
title: Observar archivos de prueba
description: "Vuelve a ejecutar las pruebas automáticamente cuando cambian los archivos de especificaciones o de la aplicación, ejecutando el testrunner de WDIO con la opción --watch y filesToWatch."
---

Con el testrunner de WDIO puedes observar archivos mientras trabajas en ellos. Las pruebas se vuelven a ejecutar automáticamente si cambias algo en tu aplicación o en tus archivos de prueba. Al añadir la opción `--watch` al llamar al comando `wdio`, el testrunner esperará cambios en los archivos después de haber ejecutado todas las pruebas, p. ej.

```sh
wdio wdio.conf.js --watch
```

Por defecto, solo observa los cambios en tus archivos `specs`. Sin embargo, si defines una propiedad `filesToWatch` en tu `wdio.conf.js` que contenga una lista de rutas de archivos (se admiten patrones glob), también observará los cambios en esos archivos para volver a ejecutar toda la suite. Esto es útil si quieres volver a ejecutar automáticamente todas tus pruebas cuando hayas cambiado el código de tu aplicación, p. ej.

```js
// wdio.conf.js
export const config = {
    // ...
    filesToWatch: [
        // observar todos los archivos JS de mi aplicación
        './src/app/**/*.js'
    ],
    // ...
}
```

:::info
Intenta ejecutar las pruebas en paralelo tanto como sea posible. Las pruebas E2E son, por naturaleza, lentas. Volver a ejecutar las pruebas solo es útil si puedes mantener corto el tiempo de ejecución de cada prueba individual. Para ahorrar tiempo, el testrunner mantiene activas las sesiones de WebDriver mientras espera cambios en los archivos. Asegúrate de que tu backend de WebDriver pueda configurarse para que no cierre automáticamente la sesión si no se ha ejecutado ningún comando después de cierto tiempo.
:::