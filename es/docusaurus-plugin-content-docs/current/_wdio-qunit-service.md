---
id: wdio-qunit-service
title: Servicio QUnit
custom_edit_url: https://github.com/mauriciolauffer/wdio-qunit-service/edit/main/README.md
---


> wdio-qunit-service es un paquete de terceros, para más información, consulte [GitHub](https://github.com/mauriciolauffer/wdio-qunit-service) | [npm](https://www.npmjs.com/package/wdio-qunit-service)

[![npm](https://img.shields.io/npm/v/wdio-qunit-service)](https://www.npmjs.com/package/wdio-qunit-service) [![test](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml/badge.svg)](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml)

[WebdriverIO](https://webdriver.io/) (wdio) servicio para ejecutar pruebas basadas en navegador [QUnit](https://qunitjs.com/) y convertirlas dinámicamente a suites de prueba de `wdio`.

## Reemplazando Karma

`QUnit Service` es un reemplazo directo para aquellos que usan [Karma JS](https://karma-runner.github.io/latest/index.html) para ejecutar sus pruebas de `QUnit` ([karma-qunit](https://github.com/karma-runner/karma-qunit/), [karma-ui5](https://github.com/SAP/karma-ui5) o cualquier otra combinación de Karma y QUnit). ¡Karma está [obsoleto](https://github.com/karma-runner/karma) y la gente debería cambiar a alternativas modernas!

Si desea mantener sus pruebas QUnit como están, sin reescritura ni refactorización, `QUnit Service` es todo lo que necesita. Ejecuta sus archivos HTML QUnit en un navegador y captura todos los resultados en formato `wdio`.

Debido a esto, los desarrolladores pueden usar `QUnit Service` junto con todo lo demás disponible en el ecosistema `wdio`.

¿Quiere grabar la ejecución de la prueba en un [video](https://webdriver.io/docs/wdio-video-reporter/)? ¿Quizás tomar una [captura de pantalla](https://webdriver.io/docs/api/browser/saveScreenshot/) o guardarla en [PDF](https://webdriver.io/docs/api/browser/savePDF/)? ¿Verificar la [cobertura de código](https://www.npmjs.com/package/wdio-monocart-service)? ¿Guardar los resultados de las pruebas en formato [JUnit](https://webdriver.io/docs/junit-reporter)? Adelante, `QUnit Service` no se interpone en su camino.

## Instalación

Después de configurar `WebdriverIO`, instale `wdio-qunit-service` como una devDependency en su archivo `package.json`.

```shell
npm install wdio-qunit-service --save-dev
```

Si aún no ha configurado `WebdriverIO`, consulte la [documentación](https://webdriver.io/docs/gettingstarted) oficial.

## Configuración

Para usar `QUnit Service` solo necesita agregarlo a la lista de `services` en su archivo `wdio.conf.js`. La documentación de wdio tiene toda la información relacionada con el [archivo de configuración](https://webdriver.io/docs/configurationfile):

```js
// wdio.conf.js
export const config = {
  // ...
  services: ["qunit"],
  // ...
};
```

## Uso

Asegúrese de que el servidor web esté funcionando antes de ejecutar las pruebas. `wdio` no iniciará el servidor web.

### Con archivos .spec o .test

En su prueba WebdriverIO, debe navegar a la página de prueba HTML QUnit, luego llamar a `browser.getQUnitResults()`.

```js
describe("QUnit test page", () => {
  it("should pass QUnit tests", async () => {
    await browser.url("http://localhost:8080/test/unit/unitTests.qunit.html");
    await browser.getQUnitResults();
  });
});
```

Se recomienda tener un archivo de prueba WebdriverIO por cada página de prueba HTML QUnit. Esto asegura que las pruebas se ejecuten en paralelo y completamente aisladas.

### Solo configuración, sin archivos .spec o .test

Si no desea crear archivos spec/test, puede pasar una lista de archivos HTML QUnit a la configuración y las pruebas se generarán automáticamente.

```js
// wdio.conf.js
export const config = {
  // ...
  baseUrl: 'http://localhost:8080',
  services: [
    ['qunit', {
      paths: [
        'unit-tests.html',
        'integration-tests.html',
        'test/qunit.html'
      ]
    }],
  // ...
};
```

### Resultados de las pruebas

Los resultados de las pruebas podrían verse así:
![QUnit Service test results](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./wdio-qunit-service-results.png?raw=true)

## Ejemplos

Consulte la carpeta [examples](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/) para ver ejemplos usando `javascript`, `typescript` y más.

### Uso en aplicaciones SAP Fiori / UI5

[Ejemplo](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/) directo usando la conocida [openui5-sample-app](https://github.com/SAP/openui5-sample-app):

- Crear un archivo de configuración: [wdio.conf.js](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/wdio.conf.js)

- Indique a `wdio` dónde encontrar los archivos de prueba QUnit:

- - Incluya los archivos QUnit en la [configuración del servicio](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app-no-specs/webapp/test/wdio.conf.js)
- - o
- - Cree un archivo de prueba WebdriverIO para [pruebas unitarias](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/unit/unit.test.js) y otro para [pruebas OPA5](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/integration/opa.test.js)

- El servidor web debe estar funcionando antes de ejecutar las pruebas

- Ejecútelo $ `wdio run webapp/test/wdio.conf.js`

## Autor

Mauricio Lauffer

- LinkedIn: [https://www.linkedin.com/in/mauriciolauffer](https://www.linkedin.com/in/mauriciolauffer)

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulte el archivo [LICENSE](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/LICENSE) para más detalles.