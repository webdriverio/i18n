---
id: watcher
title: Observar Archivos de Prueba
---

Con el testrunner de WDIO puedes observar archivos mientras trabajas en ellos. Se ejecutan automáticamente de nuevo si cambias algo en tu aplicación o en tus archivos de prueba. Al agregar una bandera `--watch` cuando llamas al comando `wdio`, el testrunner esperará cambios en los archivos después de ejecutar todas las pruebas, por ejemplo:

```sh
wdio wdio.conf.js --watch
```

Por defecto, solo observa cambios en tus archivos `specs`. Sin embargo, al establecer una propiedad `filesToWatch` en tu `wdio.conf.js` que contiene una lista de rutas de archivos (compatible con patrones globbing), también observará cambios en estos archivos para volver a ejecutar toda la suite. Esto es útil si quieres volver a ejecutar automáticamente todas tus pruebas cuando hayas cambiado el código de tu aplicación, por ejemplo:

```js
// wdio.conf.js
export const config = {
    // ...
    filesToWatch: [
        // watch for all JS files in my app
        './src/app/**/*.js'
    ],
    // ...
}
```

:::info
Intenta ejecutar pruebas en paralelo tanto como sea posible. Las pruebas E2E son, por naturaleza, lentas. Volver a ejecutar pruebas solo es útil si puedes mantener el tiempo de ejecución de pruebas individuales corto. Para ahorrar tiempo, el testrunner mantiene las sesiones de WebDriver activas mientras espera cambios en los archivos. Asegúrate de que tu backend de WebDriver pueda ser modificado para que no cierre automáticamente la sesión si no se ejecutó ningún comando después de cierto período de tiempo.
:::