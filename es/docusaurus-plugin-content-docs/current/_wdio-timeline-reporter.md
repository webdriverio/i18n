---
id: wdio-timeline-reporter
title: Reporter de Línea de Tiempo
custom_edit_url: https://github.com/QualityOps/wdio-timeline-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-timeline-reporter es un paquete de terceros, para más información por favor visita [GitHub](https://github.com/QualityOps/wdio-timeline-reporter) | [npm](https://www.npmjs.com/package/wdio-timeline-reporter)


> Una solución completa de reporter para WebdriverIO que ofrece una visualización agregada de los resultados de tus pruebas porque "Ver es creer"

![example.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/example.png)

## ¿Por qué?

Porque pasamos mucho tiempo depurando pruebas fallidas, alternando entre la salida de la terminal y la visualización de capturas de pantalla de errores, etc. Este reporter agrega toda la información típica que necesitarás en un solo informe. Ejecuta pruebas y obtén una agradable línea de tiempo de eventos que puedes revisar para verificar que todo se ve bien.

#### Las características incluyen:

- Funciona muy bien con frameworks Mocha y Jasmine. También funciona con Cucumber, pero cada paso se reportará como una prueba
- Resumen claro de los resultados de las pruebas
- Detalle de cada ejecución de prueba incluyendo todas las capturas de pantalla realizadas durante la ejecución
- Filtrado de resultados de pruebas. Genial para enfocarse en pruebas fallidas
- Trazas de error asociadas a la prueba
- Capacidad para añadir información adicional a la prueba en tiempo de ejecución
- No requiere post-procesamiento. Al completar el proceso de prueba de wdio, se generará un archivo de informe html estático
- Servicio de línea de tiempo para gestionar la toma de capturas de pantalla incluyendo el redimensionamiento de las imágenes

Puedes encontrar un ejemplo de informe html [aquí](http://htmlpreview.github.io/?https://github.com/QualityOps/wdio-timeline-reporter/blob/master/images/example-timeline-report.html)

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí](http://webdriver.io/guide/getstarted/install.html).

## Instalación

**PARA LA VERSIÓN COMPATIBLE CON WEBDRIVERIO V4 VER [AQUÍ](https://github.com/QualityOps/wdio-timeline-reporter/tree/v4)**

```shell
npm install --save wdio-timeline-reporter
```

Se añadirá una dependencia a tu `package.json`

```json
{
  "dependencies": {
    "wdio-timeline-reporter": "^5.1.0"
  }
}
```

### Uso

Añade `timeline` al array de reporters en tu archivo de configuración wdio.

También importa y añade `TimelineService` desde wdio-timeline-reporter.

El servicio es obligatorio para combinar informes y crear html ya que los reporters ahora se inicializan por instancia del ejecutor en webdriverio 5. [Ver discusión abierta en webdriverio](https://github.com/webdriverio/webdriverio/issues/3780)

El TimelineService también puede gestionar la toma de capturas de pantalla durante la ejecución de las pruebas. Tienes la opción de reducir el tamaño y la calidad de las imágenes y de incrustar las imágenes en el informe como base64. Estas opciones son configurables usando las [opciones del reporter.](#reporter-options)

```js
// wdio.conf.js
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
exports.config = {
  // ...
  reporters: [['timeline', { outputDir: './desired_location' }]],
  // ...
  services: [[TimelineService]]
};
```

### Opciones del Reporter

Si deseas cambiar la configuración predeterminada del reporter, añade un objeto literal reporterOptions al array timeline bajo reporters como se muestra a continuación.

![reporter-options.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/reporter-options.png)

| índice | descripción                                                                                                                                                                                                     |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.    | Directorio donde se crearán el archivo html y las capturas de pantalla. Opción obligatoria                                                                                                                      |
| 2.    | Nombre del archivo html del informe. El valor predeterminado es `timeline-report.html`                                                                                                                           |
| 3.    | Incrustar imágenes como base64 en el archivo html. El valor predeterminado es `false`                                                                                                                            |
| 4.    | Opciones de objeto para manipulación de imágenes                                                                                                                                                                 |
| 5.    | Establecer calidad JPEG. Solo relevante si la opción `resize` es `true`. Cuanto menor sea el valor, menor será el tamaño y la calidad de la imagen. El valor predeterminado es `70`. El valor máximo permitido es `100` |
| 6.    | Redimensionar imagen. El valor predeterminado es `false`                                                                                                                                                         |
| 7.    | valor para disminuir el número total de píxeles. Solo relevante si la opción `resize` es true. Valor predeterminado `1`. Valores válidos `1 - 5`                                                                 |
| 8.    | con qué frecuencia tomar capturas de pantalla. Los valores admitidos son `on:error`, `before:click`, `none`. El valor predeterminado es `none`. `before:click` es una gran opción para crear una línea de tiempo de capturas de pantalla de la aplicación bajo prueba. |

### Añadir información adicional al contexto de la prueba

Es posible añadir información adicional a una prueba usando el método estático `addContext`. Esto puede ser útil para añadir información importante que podría ayudar a depurar pruebas fallidas, por ejemplo, un usuario creado durante la ejecución de la prueba con un nombre de usuario dinámico

#### Uso básico

El método estático `TimelineReporter.addContext` acepta un parámetro de cadena o un objeto literal con dos propiedades `title` y `value`, por ejemplo:

```js
{ title: 'sessionId', value: 'b59bb9ec-ab15-475e-9ce6-de8a14ca0cd3' }
```

value también puede ser un enlace

##### Ejemplo con Mocha

```js
const TimelineReporter = require('wdio-timeline-reporter').default;

describe('Suite', function() {
  it('Test', function() {
    // parámetro de objeto literal
    TimelineReporter.addContext({
      title: 'Test User',
      value: 'user id created during the test'
    });

    // valor como etiqueta de anclaje
    TimelineReporter.addContext({
      title: 'Dynamic link',
      value: '<a href="">Some important link related to test</a>'
    });

    // parámetro de cadena
    TimelineReporter.addContext('This test might be flaky');
  });
});
```

## Agradecimiento

Me gustaría dar un reconocimiento a los autores y mantenedores de [wdio-json-reporter](https://github.com/fijijavis/wdio-json-reporter). Revisar su solución para v5 ayudó a acelerar mi trabajo