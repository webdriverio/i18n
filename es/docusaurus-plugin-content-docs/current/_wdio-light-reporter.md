---
id: wdio-light-reporter
title: Reportero Light
custom_edit_url: https://github.com/sarfrajadstreaks/wdio-light-reporter/edit/main/README.md
---


> wdio-light-reporter es un paquete de terceros, para más información por favor visita [GitHub](https://github.com/sarfrajadstreaks/wdio-light-reporter) | [npm](https://www.npmjs.com/package/wdio-light-reporter)

## Inspirado por los reporteros HTML y Mochawesome

!Filosofía:

> Este reportero no soporta la regeneración de Informes cucumber y está desarrollado teniendo en cuenta los frameworks bdd y mocha.
> Aquí, la sección `describe()` se considera como escenario de prueba y `it()` como caso de prueba dentro de los escenarios de prueba.

## CARACTERÍSTICAS

1. Configuración fácil
2. UI mejorada
3. Capturas de pantalla integradas en el informe html
4. addLabel() para incluir pasos contexto o nombre


## Versiones
V 0.1.9 - Lanzamiento inicial
V 0.2.6 - (última)
  1. Incluye ejecuciones en múltiples entornos y segregación basada en entorno.
  2. Corrección de errores
  3. Rendimiento mejorado.


## EJEMPLOS

![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_1.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_2.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_3.png)

## Instalación

NPM

```sh
npm install wdio-light-reporter --save-dev
```

## Configuración

```
reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:`demo${new Date()}`,    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
  }]
],
```

## Capturas de pantalla

El Reportero no tiene la capacidad de configurarse automáticamente para tomar capturas de pantalla, pero si se configura manualmente, escucha el evento y adjunta las capturas de pantalla en el informe HTML.
**Para incluir capturas de pantalla en el informe, añade el siguiente código en el gancho afterTest() en el archivo wdio conf.**

```
afterTest: async function (test,context,{ error, result, duration, passed, retries }) {
    if (!passed) {await browser.takeScreenshot()}
},
```

## Archivos de Resultados

Cada ejecución regenera el informe json para cada archivo de especificaciones, para generar un informe json y HTML combinado, añade el siguiente código en el gancho **onComplete()** en el archivo wdio conf

```
 onComplete: function (exitCode, config, capabilities, results) {
    const mergeResults = require("wdio-light-reporter/src/mergeResults"); //you can add this on top of the file
    mergeResults("./Results");
 },
```

> Si ejecutas tu prueba sin ninguna opción --suite entonces considera default como la suite
> El reportero no funciona si das múltiples parámetros como suites durante la ejecución.
> wdio run `wdio.conf.js --suite firstSuite` - **(FUNCIONA BIEN)** :)  
>  wdio run `wdio.conf.js --suite firstSuite --suite secondSuite` **(NO FUNCIONA)** :(

## Añadiendo Contexto

> Puedes usar `useLabel()` para añadir contexto a cualquier paso o añadirlo para incluirlo como pasos.

```
const { addLabel } = require("wdio-light-reporter").default;
describe("Show how to use addLabel ", () => {
  it("report will added this a steps/context in report", async () => {
      addLabel("Log Example 1 as step 1")
      console.log("Log Example 1 )
      addLabel("Log Example 2 as step 2")
      console.log("Log Example 2 )
  })
})


```
## Actualizaciones
```
 reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:"demo",    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
      //autoClean:false       // removed autoClean and include the same functionality as default in mergeResult function
  }]
],
```
## Licencia

MIT
**Free, Hell Yeah!**