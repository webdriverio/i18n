---
id: junit-reporter
title: Reportador Junit
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-junit-reporter/README.md
---


> Un reportador de WebdriverIO que crea informes XML basados en JUnit compatibles con [Jenkins](http://jenkins-ci.org/)

## Instalación

La forma más sencilla es mantener `@wdio/junit-reporter` como una devDependency en tu `package.json`, a través de:

```sh
npm install @wdio/junit-reporter --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí](https://webdriver.io/docs/gettingstarted).

## Salida

Este reportador generará un informe para cada ejecutor, por lo que recibirás un informe XML para cada archivo de especificación. A continuación se muestran ejemplos de salida XML para diferentes escenarios en el archivo de especificación.

### Bloque describe único
```javascript
describe('a test suite', () => {
    it('a test case', function () {
      // do something
      // assert something
    });
});
```
se convierte en
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
        <properties>
          <property name="specId" value="0"/>
          <property name="suiteName" value="a test suite"/>
          <property name="capabilities" value="chrome"/>
          <property name="file" value=".\test\specs\asuite.spec.js"/>
        </properties>
        <testcase classname="chrome.a_test_case" name="a_test_suite_a_test_case" time="11.706"/>
    </testsuite>
</testsuites>
```

### Bloque describe anidado
```javascript
describe('a test suite', () => {
    describe('a nested test suite', function() {
        it('a test case', function () {
          // do something
          // assert something
        });
    });
});
```
se convierte en
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
  </testsuite>
  <testsuite name="a nested test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a nested test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
    <testcase classname="chrome.a_test_case" name="a nested test suite a test case" time="11.706"/>
  </testsuite>
</testsuites>
```

### Múltiples bloques describe
```javascript
describe('a test suite', () => {
    it('a test case', function () {
      // do something
      // assert something
    });
});
describe('a second test suite', () => {
    it('a second test case', function () {
      // do something
      // assert something
    });
});
```
se convierte en
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
      <testcase classname="chrome.a_test_case" name="a nested test suite a test case" time="11.706"/>
    </properties>
  </testsuite>
  <testsuite name="a second test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a second test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
    <testcase classname="chrome.a_second_test_case" name="a_second_test_suite_a_second_test_case" time="11.706"/>
  </testsuite>
</testsuites>
```

### Fallos y Errores
Todos los fallos de casos de prueba se mapean como errores de casos de prueba JUnit. Un caso de prueba fallido debido a un fallo de aserción o error se verá así:

```xml
<testcase classname="chrome.a_test_case" name="a_test_suite_a_test_case" time="0.372">
  <failure message="Error: some error"/>
    <system-err>
        <![CDATA[
Error: some assertion failure
    at UserContext.<anonymous> (C:\repo\webdriver-example\test\specs/a_test_suite.spec.js:22:17)
]]>
  </system-err>
</testcase>
```

## Configuración

El siguiente código muestra la configuración predeterminada del ejecutor de pruebas wdio. Solo añade `'junit'` como reportador al array. Para obtener alguna salida durante la prueba puedes ejecutar el [WDIO Dot Reporter](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter) y el WDIO JUnit Reporter al mismo tiempo:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            outputFileFormat: function(options) { // optional
                return `results-${options.cid}.${options.capabilities}.xml`
            }
        }]
    ],
    // ...
};
```

Se admiten las siguientes opciones:

### outputDir
Define un directorio donde se deben almacenar tus archivos xml.

Tipo: `String`<br />
Requerido

### outputFileFormat
Define los archivos xml creados después de la ejecución de la prueba.

Tipo: `Object`<br />
Predeterminado: ``function (opts) { return `wdio-${this.cid}-${name}-reporter.log` }``

```
outputFileFormat: function (options) {
    return 'mycustomfilename.xml';
}
```

> Nota: `options.capabilities` son tus capacidades de objeto para ese ejecutor, por lo que especificar `${options.capabilities}` en tu cadena devolverá [Object object]. Debes especificar qué propiedades de las capacidades quieres en tu nombre de archivo.

### suiteNameFormat

Da la posibilidad de proporcionar regex personalizado para formatear el nombre del conjunto de pruebas (por ejemplo, en xml de salida).

Tipo: `Regex`,<br />
Predeterminado: `/[^a-zA-Z0-9@]+/`

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            suiteNameFormat: /[^a-zA-Z0-9@]+/
            outputFileFormat: function(options) { // optional
                return `results-${options.cid}.${options.capabilities}.xml`
            }
        }]
    ],
    // ...
};
```

### addFileAttribute

Añade un atributo de archivo a cada caso de prueba. Esta configuración es principalmente para CircleCI. Esta configuración proporciona detalles más ricos pero puede fallar en otras plataformas de CI.

Tipo: `Boolean`,<br />
Predeterminado: `false`


### packageName

Puedes separar paquetes por un nivel adicional configurando `'packageName'`. Por ejemplo, si quisieras iterar sobre un conjunto de pruebas con diferentes variables de entorno:

Tipo: `String`<br />
Ejemplo:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            packageName: process.env.USER_ROLE // chrome.41 - administrator
        }]
    ]
    // ...
};
```

### errorOptions

Permite establecer varias combinaciones de notificaciones de error dentro de xml.<br />
Dada una prueba Jasmine como `expect(true).toBe(false, 'my custom message')` obtendrás este error de prueba:

```
{
    matcherName: 'toBe',
    message: 'Expected true to be false, \'my custom message\'.',
    stack: 'Error: Expected true to be false, \'my custom message\'.\n    at UserContext.it (/home/mcelotti/Workspace/WebstormProjects/forcebeatwio/test/marco/prova1.spec.js:3:22)',
    passed: false,
    expected: [ false, 'my custom message' ],
    actual: true
}
```

Por lo tanto, puedes elegir *qué* clave se utilizará *donde*, ver el ejemplo a continuación.

Tipo: `Object`,<br />
Predeterminado: `errorOptions: { error: "message" }`<br />
Ejemplo:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            errorOptions: {
                error: 'message',
                failure: 'message',
                stacktrace: 'stack'
            }
        }]
    ],
    // ...
};
```

### addWorkerLogs

Parámetro opcional, establece este parámetro en true para adjuntar registros de consola de la prueba en el reportador.

Tipo: `Boolean`<br />
Predeterminado: `false`<br />
Ejemplo:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            addWorkerLogs: true
        }]
    ],
    // ...
};
```

## Añadir propiedades personalizadas a los casos de prueba

Este plugin proporciona una función `addProperty(name, value)`. Esta función puede usarse para añadir propiedades adicionales de casos de prueba junit al paso de prueba que se ejecuta actualmente. Estas propiedades se reportarán en el xml resultante como `<property name="${name}" value="${value}" />`.

Un caso de uso típico para esto es añadir un enlace a un problema o a un caso de prueba.


### Ejemplo de uso

Un ejemplo para mocha:

```js
import { addProperty } from '@wdio/junit-reporter'

describe('Suite', () => {
    it('Case', () => {
        addProperty('test_case', 'TC-1234')
    })
})
```

## Configuración de Jenkins

Por último, pero no menos importante, necesitas decirle a tu trabajo de CI (por ejemplo, Jenkins) dónde puede encontrar el archivo xml. Para hacerlo, agrega una acción post-build a tu trabajo que se ejecute después de que la prueba se haya ejecutado y señale a Jenkins (o tu sistema de CI deseado) a tus resultados de pruebas XML:

![Point Jenkins to XML files](https://webdriver.io/img/jenkins-postjob.png "Point Jenkins to XML files")

Si no hay tal paso post-build en tu sistema de CI, probablemente hay un plugin para eso en algún lugar de internet.

----

Para más información sobre WebdriverIO, consulta la [página principal](https://webdriver.io).