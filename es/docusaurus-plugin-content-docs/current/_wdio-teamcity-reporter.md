---
id: wdio-teamcity-reporter
title: Reportero de Teamcity Reporter
custom_edit_url: https://github.com/webdriverio-community/wdio-teamcity-reporter/edit/main/README.md
---


> wdio-teamcity-reporter es un paquete de terceros, para más información consulte [GitHub](https://github.com/webdriverio-community/wdio-teamcity-reporter) | [npm](https://www.npmjs.com/package/wdio-teamcity-reporter)

WebdriverIO Teamcity reporter permite mostrar los resultados de las pruebas en tiempo real, hace que la información de las pruebas esté disponible en la pestaña Tests de la página de Resultados de Compilación.


## Instalación

```bash
npm install wdio-teamcity-reporter --save-dev
```

Las instrucciones sobre cómo instalar WebdriverIO se pueden encontrar aquí: https://webdriver.io/docs/gettingstarted


## Configuración

Añade el reportero en tu archivo [wdio.conf.js](http://webdriver.io/guide/testrunner/configurationfile.html):

```javascript
exports.config = {
  // ...
  reporters: [
    [
      'teamcity',
      {
        captureStandardOutput: false, // optional
        flowId: true, // optional
        message: '[title]', // optional
      }
    ]
  ],
  // ...
}
```

### Opciones

- `captureStandardOutput (boolean)` — si es `true`, todos los mensajes de salida estándar (y error estándar) recibidos entre los mensajes `testStarted` y `testFinished` se considerarán salida de prueba. El valor predeterminado es `false` y asume el uso de mensajes de servicio testStdOut y testStdErr para informar la salida de la prueba. Predeterminado `false`.
- `flowId (boolean)` — si es `true`, la propiedad `flowId` se agregará a todos los mensajes. El seguimiento del flujo es necesario, por ejemplo, para distinguir procesos separados que se ejecutan en paralelo. Predeterminado `true`.
- `message (string)` — posibilidad de proporcionar un formato particular para la propiedad name. Claves posibles: `[browser]`, `[title]`. Ejemplo, `[browser] / [title]`. Predeterminado `[title]`.


## Enlaces

- Referencia a la documentación de Teamcity sobre mensajes de informes: https://confluence.jetbrains.com/display/TCD65/Build+Script+Interaction+with+TeamCity
- Prueba de manejo de Teamcity: https://blog.jetbrains.com/teamcity/2019/08/getting-started-with-teamcity-testdrive/


## Licencia

> The MIT License