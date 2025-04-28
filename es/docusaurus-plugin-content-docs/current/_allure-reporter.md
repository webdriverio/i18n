---
id: allure-reporter
title: Reporte de Allure
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-allure-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Un plugin de reportes de WebdriverIO para crear [Informes de Prueba Allure](https://allurereport.org/docs/webdriverio/).

![Ejemplo de Reporte Allure](/img/allure.png)

## Instalación

La forma más sencilla es incluir `@wdio/allure-reporter` como una devDependency en tu `package.json`.

```json
{
  "devDependencies": {
    "@wdio/allure-reporter": "^7.0.0"
  }
}
```

Puedes hacerlo simplemente con:

```sh
npm install @wdio/allure-reporter --save-dev
```

## Configuración

Configura el directorio de salida en tu archivo wdio.conf.js:

```js
export const config = {
    // ...
    reporters: [['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
    }]],
    // ...
}
```
- `outputDir` por defecto es `./allure-results`. Después de completar una ejecución de prueba, encontrarás que este directorio se ha llenado con un archivo `.xml` para cada especificación, además de varios archivos `.txt` y `.png` y otros adjuntos.
- `disableWebdriverStepsReporting` - parámetro opcional (`false` por defecto), para registrar solo pasos personalizados en el reporte.
- `issueLinkTemplate` - parámetro opcional, para especificar el patrón de enlace de problemas. El reporte reemplazará el marcador `{}` con el valor especificado en el parámetro de llamada `addIssue(value)`. La misma lógica se aplica si se usa Cucumber y la etiqueta `issue` está configurada en cualquier nivel, se convertirá en un enlace en el informe. Ejemplo de valor del parámetro:
  ```
  https://example.org/issue/{}
  ```
- `tmsLinkTemplate` - parámetro opcional, para especificar el patrón de enlace de TMS (Sistema de Gestión de Pruebas). El reporte reemplazará el marcador `{}` con el valor especificado en el parámetro de llamada `addTestId(value)`. La misma lógica se aplica si se usa Cucumber y la etiqueta `testId` está configurada en cualquier nivel, se convertirá en un enlace en el informe. Ejemplo de valor del parámetro:
  ```
  https://example.org/tms/{}
  ```
- `disableWebdriverScreenshotsReporting` - parámetro opcional (`false` por defecto), para no adjuntar capturas de pantalla al reporte.
- `useCucumberStepReporter` - parámetro opcional (`false` por defecto), configúralo como true para cambiar la jerarquía del informe cuando uses cucumber. Pruébalo tú mismo y observa cómo se ve.
- `disableMochaHooks` - parámetro opcional (`false` por defecto), configúralo como true para no incluir los hooks `before/after` de stacktrace/screenshot/result en el Reporte Allure.
- `addConsoleLogs` - parámetro opcional (`false` por defecto), configúralo como true para adjuntar los registros de la consola desde el paso al reporte.
- `reportedEnvironmentVars` (**tipo:** `Record<string, string>`) - Establece esta opción para mostrar las variables de entorno en el informe. Ten en cuenta que configurar esto no modifica las variables de entorno reales.

## API de Allure soportada
* `addLabel(name, value)` - asigna una etiqueta personalizada a la prueba
* `addFeature(featureName)` – asigna características a la prueba
* `addStory(storyName)` – asigna una historia de usuario a la prueba
* `addSeverity(value)` – asigna severidad a la prueba, acepta uno de estos valores: blocker, critical, normal, minor, trivial
* `addTag(value)` – asigna una etiqueta de tag a la prueba
* `addEpic(value)` – asigna una etiqueta de épica a la prueba
* `addOwner(value)` – asigna una etiqueta de propietario a la prueba
* `addSuite(value)` – asigna una etiqueta de suite a la prueba
* `addSubSuite(value)` – asigna una etiqueta de sub-suite a la prueba
* `addParentSuite(value)` – asigna una etiqueta de suite padre a la prueba
* `addIssue(value)` – asigna un id de problema a la prueba
* `addAllureId(value)` – asigna una etiqueta de id de test ops de allure a la prueba
* `addTestId(value)` – asigna un id de prueba TMS a la prueba
* ~~`addEnvironment(name, value)` ~~ – una función obsoleta que ya no funciona. Usa `reportedEnvironmentVars` en su lugar
* `addAttachment(name, content, [type])` – guarda un adjunto en la prueba.
    * `name` (*String*) - nombre del adjunto.
    * `content` – contenido del adjunto.
    * `type` (*String*, opcional) – tipo MIME del adjunto, `text/plain` por defecto
* `addArgument(name, value)` - añade un argumento adicional a la prueba
* `addDescription(description, [type])` – añade descripción a la prueba.
    * `description` (*String*) - descripción de la prueba.
    * `type` (*String*, opcional) – tipo de descripción, `text` por defecto. Valores ['text', 'html','markdown']
* `addStep(title, [{content, name = 'attachment'}], [status])` - añade un paso a la prueba.
    * `title` (*String*) - nombre del paso.
    * `content` (*String*, opcional) - adjunto del paso
    * `name` (*String*, opcional) - nombre del adjunto del paso, `attachment` por defecto.
    * `status` (*String*, opcional) - estado del paso, `passed` por defecto. Debe ser "failed", "passed" o "broken"
* `startStep(title)` - comienza con un paso
    * `title` (*String*) - nombre del paso.
* `endStep(status)` - finaliza un paso
    * `status` (*String*, opcional) - estado del paso, `passed` por defecto. Debe ser "failed", "passed" o "broken"
* `step(name, body)` - inicia un paso con una función de contenido dentro. Permite crear pasos con jerarquía infinita
    * `body` (*Function*) - la función asíncrona del cuerpo del paso

### Uso
Se puede acceder a la API de Allure usando:

CJS

```js
const allureReporter = require('@wdio/allure-reporter').default
```

ESM

```js
import allureReporter from '@wdio/allure-reporter'
```

Ejemplo de Mocha

```js
describe('Suite', () => {
    it('Case', () => {
        allureReporter.addFeature('Feature')
    })
})
```

#### Cucumber

Ejemplo básico de Cucumber:

```js
Given('I include feature and story name', () => {
    allureReporter.addFeature('Feature_name');
    allureReporter.addStory('Story_name');
})
```

#### Pasos personalizados

El método `step` simplifica el manejo de pasos porque cada paso se presenta como una función asíncrona con cualquier contenido dentro.
El primer argumento de la función es el paso actual, que tiene la mayoría de los métodos de la API de allure (como `label`, `epic`, `attach`, etc.):

```js
allureReporter.step('my step name', async (s1) => {
    s1.label('foo', 'bar')
    await s1.step('my child step name', async (s2) => {
        // puedes añadir cualquier combinación de pasos en la función del cuerpo
    })
})
```

##### Etiquetas de Cucumber

Las etiquetas de Cucumber con nombres especiales (`issue` y `testId`) se convierten en enlaces (las plantillas de enlace correspondientes deben configurarse previamente):
```gherkin
@issue=BUG-1
@testId=TST-2
Feature: This is a feature with global tags that will be converted to Allure links

  @issue=BUG-3
  @testId=TST-4
  Scenario: This is a scenario with tags that will be converted to Allure links
    Given I do something
```

Las etiquetas de Cucumber con nombres especiales (`feature`) se mapean a etiquetas de Allure:

```gherkin
Feature: Test user role

  @feature=login
  Scenario: Login
    Given I test login
```

## Visualización del informe

Los resultados pueden ser consumidos por cualquiera de las [herramientas de informes](https://allurereport.org/) ofrecidas por Allure. Por ejemplo:

### Línea de comandos

Instala la [herramienta de línea de comandos Allure](https://www.npmjs.com/package/allure-commandline) y procesa el directorio de resultados:

```sh
allure generate [allure_output_dir] && allure open
```

Esto generará un informe (por defecto en `./allure-report`) y lo abrirá en tu navegador.

### Generación automática de informes

También puedes generar automáticamente el informe utilizando la herramienta de línea de comandos Allure de forma programática. Para hacerlo, instala el paquete en tu proyecto con:

```sh
npm i allure-commandline
```

Luego añade o extiende tu hook `onComplete` o crea un [servicio personalizado](/docs/customservices) para esto:

```js
// wdio.conf.js
const allure = require('allure-commandline')

export const config = {
    // ...
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    }
    // ...
}
```

### Jenkins

Instala y configura el [plugin Allure para Jenkins](https://allurereport.org/docs/integrations-jenkins/)

## Añadir capturas de pantalla

Las capturas de pantalla se pueden adjuntar al informe utilizando la función `takeScreenshot` de WebDriverIO en el hook `afterTest` para Mocha y Jasmine o en el hook `afterStep` para Cucumber.
Primero establece `disableWebdriverScreenshotsReporting: false` en las opciones del reportero, luego añade en el hook afterStep:

### Mocha / Jasmine

```js title="wdio.conf.js"
afterTest: async function(test, context, { error, result, duration, passed, retries }) {
    if (error) {
        await browser.takeScreenshot();
    }
}
```

### Cucumber

```js title="wdio.conf.js"
afterStep: async function (step, scenario, { error, duration, passed }, context) {
  if (error) {
    await browser.takeScreenshot();
  }
}
```

Como se muestra en el ejemplo anterior, cuando se llama a esta función, se adjuntará una imagen de captura de pantalla al informe de allure.