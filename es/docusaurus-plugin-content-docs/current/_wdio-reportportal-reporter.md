---
id: wdio-reportportal-reporter
title: Reportador de Report Portal
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-reporter es un paquete de terceros, para más información por favor consulta [GitHub](https://github.com/borisosipov/wdio-reportportal-reporter) | [npm](https://www.npmjs.com/package/wdio-reportportal-reporter)


![npm](https://img.shields.io/npm/v/wdio-reportportal-reporter)
![npm](https://img.shields.io/npm/dm/wdio-reportportal-reporter)
> Un plugin reportador de WebdriverIO para informar resultados a Report Portal([http://reportportal.io/](http://reportportal.io/)).

## Instalación

La forma más sencilla es mantener `wdio-reportportal-reporter` y `wdio-reportportal-service` como una devDependency en tu `package.json`.

```json
{
  "devDependencies": {
    "wdio-reportportal-reporter": "^7.0.0",
    "wdio-reportportal-service": "^7.0.0"
  }
}
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí](https://webdriver.io/docs/gettingstarted.html).

## Configuración

Configura el directorio de salida en tu archivo wdio.conf.js:

```js
const reportportal = require('wdio-reportportal-reporter');
const RpService = require("wdio-reportportal-service");

const conf = {
  reportPortalClientConfig: { // configuración de report portal
    token: '00000000-0000-0000-0000-00000000000',
    endpoint: 'https://reportportal-url/api/v1',
    launch: 'launch_name',
    project: 'project_name',
    mode: 'DEFAULT',
    debug: false,
    description: "Launch description text",
    attributes: [{key:"tag", value: "foo"}],
    headers: {"foo": "bar"}, // cabeceras opcionales para el cliente http interno
    restClientConfig: { // configuración del cliente http tipo axios - https://github.com/axios/axios#request-config
      proxy: {
        protocol: 'https',
        host: '127.0.0.1',
        port: 9000,
        auth: {
          username: 'mikeymike',
          password: 'rapunz3l'
        }
      },
      timeout: 60000
    }
  },
  reportSeleniumCommands: false, // añadir comandos de selenium al registro
  seleniumCommandsLogLevel: 'debug', // nivel de registro para comandos de selenium
  autoAttachScreenshots: false, // adjuntar capturas de pantalla automáticamente
  screenshotsLogLevel: 'info', // nivel de registro para capturas de pantalla
  parseTagsFromTestTitle: false, // analizar cadenas como `@foo` de títulos y añadir a Report Portal
  cucumberNestedSteps: false, // informar pasos de cucumber como pasos de Report Portal
  autoAttachCucumberFeatureToScenario: false, // requiere que cucumberNestedSteps sea true para su uso
  sanitizeErrorMessages: true, // eliminar caracteres de color ascii del seguimiento de pila de errores
  sauceLabOptions : {
    enabled: true, // añadir automáticamente el ID de SauseLab a las etiquetas rp.
    sldc: "US" // añadir automáticamente la región de SauseLab a las etiquetas rp.
  }
};

exports.config = {
  // ...
  services: [[RpService, {}]],
  reporters: [[reportportal, conf]],
  // ...
};
```

# API Adicional

Los métodos de la API pueden ser accedidos usando:

```js
const reporter = require('wdio-reportportal-reporter')
```

### Descripción de métodos

* `reporter.addAttribute({key, value})` – añadir un atributo a la prueba actual.
  * `key` (*string*, opcional) -  clave del atributo. Debe ser una cadena no vacía.
  * `value` (*string*, requerido)–  valor del atributo. Debe ser una cadena no vacía.
* `reporter.addAttributeToCurrentSuite({key, value})` - añadir un atributo a la suite actual.
  * `key` (*string*, opcional) -  clave del atributo. Debe ser una cadena no vacía.
  * `value` (*string*, requerido)–  valor del atributo. Debe ser una cadena no vacía.
* `reporter.addDescriptionToCurrentSuite(description)` - añadir alguna cadena a la suite actual.
  * `description` (*string*) - contenido de la descripción. El texto puede formatearse con markdown.
* `reporter.addDescriptionToAllSuites(description)` - añadir alguna cadena a todas las suites próximas. (Úsalo en el hook before all, para que cada suite reciba la misma descripción)
  * `description` (*string*) - contenido de la descripción. El texto puede formatearse con markdown.
* `reporter.sendLog(level, message)` – enviar registro a la suite\item de prueba actual.
  * `level` (*string*) - nivel de registro. Valores ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*)– contenido del mensaje de registro.
* `reporter.sendFile(level, name, content, [type])` – enviar archivo a la suite\item de prueba actual.
  * `level` (*string*) - nivel de registro. Valores ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*)– nombre del archivo.
  * `content` (*string*) – contenido del adjunto
  * `type` (*string*, opcional) – tipo MIME del adjunto, `image/png` por defecto
  * `message` (*string*)– contenido del mensaje de registro.
* `reporter.sendLogToTest(test, level, message)` - enviar registro a una prueba específica.
  * `test` (*object*) - objeto de prueba del hook `afterTest\afterStep` de wdio
  * `level` (*string*) - nivel de registro. Valores ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*)– contenido del mensaje de registro.
* `reporter.sendFileToTest(test, level, name, content, [type])` – enviar archivo a una prueba específica.
  * `test` (*object*) - objeto de prueba del hook `afterTest\afterStep` de wdio
  * `level` (*string*) - nivel de registro. Valores ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*)– nombre del archivo.
  * `content` (*string*) – contenido del adjunto
  * `type` (*string*, opcional) – tipo MIME del adjunto, `image/png` por defecto
  * `message` (*string*)– contenido del mensaje de registro.

Presta atención: `sendLog`\\`sendFile` envía el registro al **item de prueba en ejecución actual**. Esto significa que si envías un registro sin una prueba activa (por ejemplo, desde hooks o a nivel de suite) no se informará en la interfaz de usuario de Report Portal.

Los métodos `sendLogToTest`\\`sendFileToTest` son útiles cuando necesitas enviar capturas de pantalla o registros al elemento de prueba fallido desde el hook afterTest de wdio.

Ejemplo de Mocha:

```js
const reportportal = require('wdio-reportportal-reporter');
const path = require('path');
const fs = require('fs');

exports.config = {
...
  async afterTest(test) {
    if (test.passed === false) {
      const filename = "screnshot.png";
      const outputFile = path.join(__dirname, filename);
      await browser.saveScreenshot(outputFile);
      reportportal.sendFileToTest(test, 'info', filename, fs.readFileSync(outputFile));
    }
  }
...
```

Ejemplo de Jasmine:

```js
const reportportal = require('wdio-reportportal-reporter');
const path = require('path');
const fs = require('fs');

exports.config = {
...
  async afterTest(test) {
    if (test.passed === false) {
      const filename = "screnshot.png";
      const outputFile = path.join(__dirname, filename);
      await browser.saveScreenshot(outputFile);
      //!!
      Object.assign(test, {title: test.description}}
      reportportal.sendFileToTest(test, 'info', filename, fs.readFileSync(outputFile));
    }
  }
...
```

Ejemplo de WDIO Cucumber "5.14.3+":

```js
const reportportal = require('wdio-reportportal-reporter');

exports.config = {
...
   afterStep: async function (uri, feature, { error, result, duration, passed }, stepData, context) {
     if (!passed) {
        let failureObject = {};
        failureObject.type = 'afterStep';
        failureObject.error = error;
        failureObject.title = `${stepData.step.keyword}${stepData.step.text}`;
        const screenShot = await global.browser.takeScreenshot();
        let attachment = Buffer.from(screenShot, 'base64');
        reportportal.sendFileToTest(failureObject, 'error', "screnshot.png", attachment);
    }
  }
...
}
```

## Obtener enlace a la página de lanzamiento de la interfaz de usuario de Report Portal

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const link = await RpService.getLaunchUrl(config);
        console.log(`Report portal link ${link}`)
    }
...
```

o de manera más complicada

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const protocol = 'http:';
        const hostname = 'example.com';
        const port = ':8080'; // o cadena vacía para puertos predeterminados 80/443
        const link = await RpService.getLaunchUrlByParams(protocol, hostname, port, config);
        console.log(`Report portal link ${link}`)
    }
...
```

## Reportar prueba a un lanzamiento existente

Si quieres reportar una prueba a un lanzamiento activo existente, puedes pasarlo al reportador mediante la variable de entorno `REPORT_PORTAL_LAUNCH_ID`
Eres responsable de finalizar el lanzamiento, así como de iniciar dicho lanzamiento.

```sh
export REPORT_PORTAL_LAUNCH_ID=SomeLaunchId
npm run wdio
```

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-reporter/blob/master/LICENSE) para más detalles