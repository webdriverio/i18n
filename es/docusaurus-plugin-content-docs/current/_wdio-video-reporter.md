---
id: wdio-video-reporter
title: Reportero de Video
custom_edit_url: https://github.com/presidenten/wdio-video-reporter/edit/main/README.md
---


> wdio-video-reporter es un paquete de terceros, para más información, consulte [GitHub](https://github.com/presidenten/wdio-video-reporter) | [npm](https://www.npmjs.com/package/wdio-video-reporter)

![Logo](https://raw.githubusercontent.com/presidenten/wdio-video-reporter-example-report/master/wdio-video-reporter.png)

Este es un reportero para [Webdriver IO v6 y superiores](https://webdriver.io/) que genera videos de las ejecuciones de pruebas wdio. Si usas allure, entonces los casos de prueba se decoran automáticamente con los videos también. (Para Webdriver IO v5, por favor usa la versión ^2.0.0 de wdio-video-reporter).

Los videos se guardan en `wdio.config.outputDir`

Mira un ejemplo de informe Allure con videos incluidos en las pruebas fallidas aquí:
https://presidenten.github.io/wdio-video-reporter-example-report/

![example-allure-report](https://media.giphy.com/media/7Fgle7bHGrxR3zY6Gw/giphy.gif)

Ventajas:
- Videos agradables en tus informes de allure
- Videos a una velocidad agradable para humanos, aunque las pruebas sean rápidas
- Funciona con Selenium grid
- Funciona con todos los webdrivers que soportan `saveScreenshot`
- Verificado en los siguientes navegadores de escritorio usando Selenium 3.141.59:
  - Chrome
  - Firefox
  - Safari
  - Internet Explorer 11
  - Microsoft Edge
- Verificado en los siguientes dispositivos iOS y Android con [Appium](http://appium.io/docs/en/about-appium/getting-started/) 1.13.0-beta3:
  - Iphone 8
  - Ipad Gen 6
  - Samsung galaxy S9
  - Samsung galaxy tab A10

Contras:
- Funciona tomando capturas de pantalla después de "acciones", lo que hace que las pruebas sean un poco más lentas. Esto se mitiga eligiendo cuidadosamente qué mensajes [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) deberían resultar en una captura de pantalla
- Los controladores de Selenium no incluyen cuadros de alerta y ventanas emergentes en las capturas de pantalla, por lo que no son visibles en los videos


Inicio rápido
===========

Consulta la plantilla simple en [wdio-template](https://github.com/presidenten/wdio-template) para comenzar rápidamente.

Clona uno de los repositorios e instala las dependencias con `yarn` o `npm install`. Luego ejecuta `yarn e2e` o `npm run e2e` en el directorio de demostración y finalmente `yarn report` o `npm run report` para ver el informe de allure.


Instalación
============

Instalar el reportero
--------------------

`yarn add wdio-video-reporter`
o
`npm install wdio-video-reporter`


Agregar el reportero a la configuración
--------------------------

En la parte superior del archivo `wdio.conf.js`, requiere la biblioteca:
```
const video = require('wdio-video-reporter');
```

Luego agrega el reportero de video a la configuración en la propiedad reporters:

```
 reporters: [
    [video, {
      saveAllVideos: false,       // Si es true, también guarda videos para casos de prueba exitosos
      videoSlowdownMultiplier: 3, // Mayor para obtener videos más lentos, menor para videos más rápidos [Valor 1-100]
    }],
  ],
```


Usar con Allure
-----------------

Agregar el reportero Allure también actualiza automáticamente los informes con videos sin necesidad de configurar nada :-)

```
 reporters: [
    [video, {
      saveAllVideos: false,       // Si es true, también guarda videos para casos de prueba exitosos
      videoSlowdownMultiplier: 3, // Mayor para obtener videos más lentos, menor para videos más rápidos [Valor 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }],
  ],
```


Configuración
=============

Parámetros de configuración normales
-------------------------------

La mayoría de los usuarios pueden querer establecer estos

- `saveAllVideos` Establecer en true para guardar videos de pruebas que pasan. `Predeterminado: false`
- `videoSlowdownMultiplier` Entero entre [1-100]. Aumentar si los videos se reproducen demasiado rápido. `Predeterminado: 3`
- `videoRenderTimeout` Segundos máximos para esperar a que se renderice un video. `Predeterminado: 5`
- `outputDir` Si no está configurado, usa wdio.config.outputDir. `Predeterminado: undefined`
- `outputDir` Si no está configurado, usa wdio.config.outputDir. `Predeterminado: undefined`
- `maxTestNameCharacters` Longitud máxima del nombre de la prueba. `Predeterminado: 250`

Parámetros de configuración avanzados
---------------------------------

Los usuarios avanzados que quieran cambiar cuándo el motor hace una captura de pantalla pueden editar estos. Estos arrays pueden llenarse con la última palabra de un mensaje [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol), es decir, /session/:sessionId/`buttondown`.

- `addExcludedActions` Agregar acciones donde las capturas de pantalla son innecesarias. `Predeterminado: []`
- `addJsonWireActions` Agregar acciones donde faltan las capturas de pantalla. `Predeterminado: []`
- `recordAllActions` Omitir el filtrado y capturar todo. (No recomendado) `Predeterminado: false`

Para ver mensajes procesados, configura `wdio.config.logLevel: 'debug'` y revisa `outputDir/wdio-X-Y-Video-reporter.log`. Esto también dejará intacto el directorio de salida de capturas de pantalla para su revisión.

Para evitar el registro adicional por completo y solo obtener los archivos de video, configura `wdio.config.logLevel: 'silent'`.

Soporte de Cucumber
----------------

Si estás usando el reportero Allure, debes asegurarte de hacer lo siguiente:

- Usa `chai` en lugar de usar las aserciones incorporadas de node, de lo contrario, las pruebas fallidas se informan como rotas en tus definiciones de pasos
- Agrega `useCucumberStepReporter: true` a la opción Allure en el archivo `wdio.conf.js`, una configuración típica se vería así:
```
  reporters: [
    [video, {
      saveAllVideos: false,       // Si es true, también guarda videos para casos de prueba exitosos
      videoSlowdownMultiplier: 3, // Mayor para obtener videos más lentos, menor para videos más rápidos [Valor 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter: true
    }],
  ],
```
Para un ejemplo completo, consulta la rama cucumber en [wdio-template](https://github.com/presidenten/wdio-template/tree/cucumber)


Configuración de Appium
------------

Desde `wdio-video-reporter` v1.2.4 hay soporte para ayudar a Allure a diferenciar entre navegadores safari y chrome en escritorio y dispositivos.
El reportero usa la propiedad personalizada `deviceType` para identificar los diferentes dispositivos.
Los valores recomendados son `phone` y `tablet`.
Se recomienda incluir también `browserVersion` para _todos_ los navegadores para evitar un error en el controlador Chrome cuando se usan dispositivos en el mismo Selenium grid que los navegadores Chrome de escritorio.

Los archivos de video generados también obtendrán `deviceType` agregado al nombre del navegador.

Ejemplo de configuración de appium:
```
  "capabilities": [
    {
      ...
      "deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    }
  ],
```

Y `wdio-config.json`:
```
  "capabilities": [
    {
      ...
      "appium:deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    },
  ],
```


Contribuciones
============

Haz un fork, realiza cambios, escribe algunas pruebas, lintea, ejecuta pruebas, construye y verifica en la demo que los cambios funcionan como deberían, luego haz un PR.

La carpeta de demo funciona con la versión construida de la biblioteca, así que asegúrate de construir si agregaste nuevas características y quieres probarlas.


Agradecimientos
======

Gracias a [Johnson E](https://github.com/jonn-set) por arreglar el soporte de Cucumber, que muchos usuarios han solicitado.