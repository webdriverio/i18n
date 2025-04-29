---
id: wdio-novus-visual-regression-service
title: Servicio de Regresión Visual Novus
custom_edit_url: https://github.com/Jnegrier/wdio-novus-visual-regression-service/edit/master/README.md
---


> wdio-novus-visual-regression-service es un paquete de terceros, para más información consulta [GitHub](https://github.com/Jnegrier/wdio-novus-visual-regression-service) | [npm](https://www.npmjs.com/package/wdio-novus-visual-regression-service)

[![Build Status](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service.svg?branch=master)](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service)

> Pruebas de regresión visual para WebdriverIO

Basado en el trabajo de Jan-André Zinser en [wdio-visual-regression-service](https://github.com/zinserjan/wdio-visual-regression-service) y [wdio-screenshot](https://github.com/zinserjan/wdio-screenshot)

## Instalación

Puedes instalar wdio-novus-visual-regression-service vía NPM como de costumbre:

```sh
$ npm install wdio-novus-visual-regression-service --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí.](https://webdriver.io/docs/gettingstarted)

## Configuración
Configura wdio-novus-visual-regression-service añadiendo `novus-visual-regression` a la sección de servicios de tu configuración de WebdriverIO y define tu estrategia de comparación deseada en las opciones de servicio.

```js
// wdio.conf.js

var path = require('path');
var VisualRegressionCompare = require('wdio-novus-visual-regression-service/compare');

function getScreenshotName(basePath) {
  return function(context) {
    var type = context.type;
    var testName = context.test.title;
    var browserVersion = parseInt(context.browser.version, 10);
    var browserName = context.browser.name;
    var browserViewport = context.meta.viewport;
    var browserWidth = browserViewport.width;
    var browserHeight = browserViewport.height;

    return path.join(basePath, `${testName}_${type}_${browserName}_v${browserVersion}_${browserWidth}x${browserHeight}.png`);
  };
}

exports.config = {
  // ...
  services: [
    [
      'novus-visual-regression',
      {
        compare: new VisualRegressionCompare.LocalCompare({
          referenceName: getScreenshotName(path.join(process.cwd(), 'screenshots/reference')),
          screenshotName: getScreenshotName(path.join(process.cwd(), 'screenshots/screen')),
          diffName: getScreenshotName(path.join(process.cwd(), 'screenshots/diff')),
          misMatchTolerance: 0.01,
        }),
        viewportChangePause: 300,
        viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
        orientations: ['landscape', 'portrait'],
      }
    ]
  ],
  // ...
};
```

### Opciones
Bajo la clave `visualRegression` en tu wdio.config.js puedes pasar un objeto de configuración con la siguiente estructura:

* **compare** `Object` <br />
método de comparación de capturas de pantalla, ver [Métodos de Comparación](#compare-methods)

* **viewportChangePause**  `Number`  ( predeterminado: 100 ) <br />
espera x milisegundos después del cambio de viewport. Puede llevar un tiempo para que el navegador vuelva a pintar. Esto podría provocar problemas de renderizado y producir resultados inconsistentes entre ejecuciones.

* **viewports** `Object[{ width: Number, height: Number }]`  ( predeterminado: *[viewport-actual]* ) (**solo escritorio**)<br />
   todas las capturas de pantalla se tomarán en diferentes dimensiones de viewport (por ejemplo, para pruebas de diseño responsivo)

* **orientations** `String[] {landscape, portrait}`  ( predeterminado: *[orientación-actual]* ) (**solo móvil**)<br />
    todas las capturas de pantalla se tomarán en diferentes orientaciones de pantalla (por ejemplo, para pruebas de diseño responsivo)

### Métodos de Comparación
wdio-novus-visual-regression-service permite el uso de diferentes métodos de comparación de capturas de pantalla.

#### VisualRegressionCompare.LocalCompare
Como su nombre sugiere, *LocalCompare* captura screenshots localmente en tu computadora y los compara con ejecuciones previas.

Puedes pasar las siguientes opciones a su constructor como objeto:

* **referenceName** `Function` <br />
pasa una función que devuelve el nombre de archivo para la captura de pantalla de referencia. La función recibe un objeto *context* como primer parámetro con toda la información relevante sobre el comando.

* **screenshotName** `Function` <br />
pasa una función que devuelve el nombre de archivo para la captura de pantalla actual. La función recibe un objeto *context* como primer parámetro con toda la información relevante sobre el comando.

* **diffName** `Function` <br />
pasa una función que devuelve el nombre de archivo para la captura de pantalla de diferencia. La función recibe un objeto *context* como primer parámetro con toda la información relevante sobre el comando.

* **misMatchTolerance** `Number`  ( predeterminado: 0.01 ) <br />
número entre 0 y 100 que define el grado de discrepancia para considerar dos imágenes como idénticas, aumentar este valor disminuirá la cobertura de prueba.

* **ignoreComparison** `String`  ( predeterminado: nothing ) <br />
pasa una cadena con valor de `nothing`, `colors` o `antialiasing` para ajustar el método de comparación.

Para un ejemplo de generación de nombres de archivo de capturas de pantalla dependiendo del nombre de prueba actual, mira el código de muestra de [Configuración](#configuration).

#### VisualRegressionCompare.SaveScreenshot
Este método es una variante simplificada de `VisualRegressionCompare.LocalCompare` para capturar solo capturas de pantalla. Esto es bastante útil cuando solo quieres crear capturas de pantalla de referencia y sobrescribir la anterior sin comparar.

Puedes pasar las siguientes opciones a su constructor como objeto:

* **screenshotName** `Function` <br />
pasa una función que devuelve el nombre de archivo para la captura de pantalla actual. La función recibe un objeto *context* como primer parámetro con toda la información relevante sobre el comando.

#### VisualRegressionCompare.Spectre
Este método se utiliza para subir capturas de pantalla a la aplicación web [Spectre](https://github.com/wearefriday/spectre).
Spectre es una interfaz de usuario para pruebas de regresión visual. Almacena las capturas de pantalla y las compara, lo que es bastante útil para la Integración Continua.

Puedes pasar las siguientes opciones a su constructor como objeto:

* **url** `String` <br />
pasa una URL del servicio web spectre.

* **project** `String` <br />
pasa un nombre para tu proyecto.

* **suite** `String` <br />
pasa un nombre para tu suite de pruebas. Un proyecto puede contener varias suites.

* **test** `Function` <br />
pasa una función que devuelve el nombre de la prueba para la captura de pantalla. La función recibe un objeto *context* como primer parámetro con toda la información relevante sobre el comando.

* **browser** `Function` <br />
pasa una función que devuelve el navegador para la captura de pantalla. La función recibe un objeto *context* como primer parámetro con toda la información relevante sobre el comando.

* **size** `Function` <br />
pasa una función que devuelve el tamaño para la captura de pantalla. La función recibe un objeto *context* como primer parámetro con toda la información relevante sobre el comando.

* **fuzzLevel** `Number`  ( predeterminado: 30 ) <br />
número entre 0 y 100 que define el factor de difuminado del método de comparación de imágenes de Spectre. Para más detalles, consulta la [documentación de Spectre](https://github.com/wearefriday/spectre).

**Ejemplo**
```js
// wdio.conf.js

var path = require('path');
var VisualRegressionCompare = require('wdio-novus-visual-regression-service/compare');

exports.config = {
  // ...
  services: [
    [
      'novus-visual-regression',
      {
        compare: new VisualRegressionCompare.Spectre({
          url: 'http://localhost:3000',
          project: 'my project',
          suite: 'my test suite',
          test: function getTest(context) {
            return context.test.title;
          },
          browser: function getBrowser(context) {
            return context.browser.name;
          },
          size: function getSize(context) {
            return context.meta.viewport != null ? context.meta.viewport.width : context.meta.orientation;
          },
          fuzzLevel: 30
        }),
        viewportChangePause: 300,
        viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
        orientations: ['landscape', 'portrait'],
      }
    ]
  ],
  // ...
};
```

## Uso
wdio-novus-visual-regression-service mejora una instancia de WebdriverIO con los siguientes comandos:
* `browser.checkViewport([{options}]);`
* `browser.checkDocument([{options}]);`
* `browser.checkElement(elementSelector, [{options}]);`


Todos estos proporcionan opciones que te ayudarán a capturar capturas de pantalla en diferentes dimensiones o a excluir partes irrelevantes (por ejemplo, contenido). Las siguientes opciones están disponibles:


* **exclude** `String[]|Object[]` (**aún no implementado**)<br />
  excluye partes de tu captura de pantalla que cambian con frecuencia, puedes pasar todo tipo de diferentes [estrategias de selector de WebdriverIO](http://webdriver.io/guide/usage/selectors.html)
  que consultan uno o varios elementos o puedes definir valores x e y que forman un rectángulo o polígono

* **hide** `Object[]`<br />
  oculta todos los elementos consultados por todo tipo de diferentes [estrategias de selector de WebdriverIO](http://webdriver.io/guide/usage/selectors.html) (vía `visibility: hidden`)

* **remove** `Object[]`<br />
  elimina todos los elementos consultados por todo tipo de diferentes [estrategias de selector de WebdriverIO](http://webdriver.io/guide/usage/selectors.html) (vía `display: none`)

* **viewports** `Object[{ width: Number, height: Number }]` (**solo escritorio**)<br />
     Anula el valor global *viewports* para este comando. Todas las capturas de pantalla se tomarán en diferentes dimensiones de viewport (por ejemplo, para pruebas de diseño responsivo)

* **orientations** `String[] {landscape, portrait}` (**solo móvil**)<br />
    Anula el valor global *orientations* para este comando. Todas las capturas de pantalla se tomarán en diferentes orientaciones de pantalla (por ejemplo, para pruebas de diseño responsivo)

* **misMatchTolerance** `Number` <br />
    Anula el valor global *misMatchTolerance* para este comando. Pasa un número entre 0 y 100 que define el grado de discrepancia para considerar dos imágenes como idénticas.

* **fuzzLevel** `Number` <br />
    Anula el valor global *fuzzLevel* para este comando. Pasa un número entre 0 y 100 que define el factor de difuminado del método de comparación de imágenes de Spectre.

* **ignoreComparison** `String` <br />
    Anula el valor global *ignoreComparison* para este comando. Pasa una cadena con valor de `nothing`, `colors` o `antialiasing` para ajustar el método de comparación.

* **viewportChangePause**  `Number` <br />
    Anula el valor global *viewportChangePause* para este comando. Espera x milisegundos después del cambio de viewport.

### Licencia

MIT