---
id: gmangiapelo-wdio-azure-devops-service
title: Servicio de Planes de Prueba de Azure DevOps
custom_edit_url: https://github.com/gianlucamangiapelo/wdio-azure-devops-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @gmangiapelo/wdio-azure-devops-service es un paquete de terceros, para más información consulte [GitHub](https://github.com/gianlucamangiapelo/wdio-azure-devops-service) | [npm](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

[![version](https://img.shields.io/npm/v/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)
[![downloads](https://img.shields.io/npm/dt/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

Publica los resultados de [WebdriverIO](https://webdriver.io/) en Azure DevOps Test Plans.

Características principales:

* Soporte para frameworks de tiempo de ejecución Jasmine/Jest/Mocha y Cucumber
* Los resultados de las pruebas se agregan bajo la misma ejecución de prueba si estás ejecutando más archivos de especificación (prueba) y pertenecen a la misma suite
* Los resultados se reportan inmediatamente después de la ejecución de cada prueba (informes en tiempo real)
* La ejecución de la prueba se cierra después de que el último archivo de especificación (prueba) haya finalizado
* Soporte para múltiples suites


## Instalación

Instala este módulo localmente con el siguiente comando para usarlo como una dependencia (de desarrollo):

```shell
npm install --save @gmangiapelo/wdio-azure-devops-service
npm install --save-dev @gmangiapelo/wdio-azure-devops-service
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí.](https://webdriver.io/docs/gettingstarted)

## Uso

> _wdio-azure-devops-service_ soporta **NodeJS 8 o superior**

> _wdio-azure-devops-service_ soporta **commonjs** y **esm**

### Configuración

Dado que `@gmangiapelo/wdio-azure-devops-service` es un servicio, puedes configurarlo en tu archivo `wdio.conf.js` de la siguiente manera

```js
import AzureDevopsService from "@gmangiapelo/wdio-azure-devops-service";
// wdio.conf.js
exports.config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
              AzureDevopsService,
              {
                  pat: '3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn',
                  organizationUrl: 'https://dev.azure.com/gianlucamangiapelo',
                  projectId: '8b3c68ac-f69d-41c6-bbad-921d8bae9819',
                  planId: 263072,
                  suiteId: 263073,
                  caseIdRegex: '@?[ref](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\\d+)',
                  runName: 'FE regression tests for TestPlan',
              },
          ],
    ],
    // ...
};
```

### Configuración de casos de prueba

Tus pruebas WDIO deben incluir el ID de tu caso de prueba de Azure. Asegúrate de que los IDs de tus casos de prueba sean distintos de los títulos de tus pruebas:

**Estilo Mocha:**
```Javascript
// Bueno:
it("C123 Can authenticate a valid user", ...

// Malo:
it("C123Can authenticate a valid user", ...
it("Can authenticate a valid user C123", ...
```

**Estilo Cucumber:**
```Gherkin
## Bueno:
@C123
Scenario Can authenticate a valid user
@c123
Scenario Can authenticate a valid user,

## Malo:
@c123stringTest
Scenario Can authenticate a valid user
```

### Ejemplo de Informe de Azure DevOps

Este es un ejemplo de los resultados enviados a AZ Test Plans durante una ejecución de prueba
![Ejemplo de AzureDevops Test Plans](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/./img/AZ-DevOps-example.png)

<br />

## Opciones del Servicio

### pat

El token de acceso personal generado en Azure DevOps con permisos de API establecidos.

Ejemplo: `"3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn"`

Tipo: `string`

Requerido: `true`

### organizationUrl

La URL base de tu instancia de Azure DevOps.

Ejemplo: `"https://dev.azure.com/gianlucamangiapelo"`

Tipo: `string`

Requerido: `true`

### projectId

El ID del proyecto en Azure DevOps.

Para encontrar el projectId usa `GET {organizationUrl}/_apis/projects?api-version=6.0` y copia el `id` apropiado.

Ejemplo: `"3cf7dbc9-cb1e-4240-93f2-9a5960ab3945"`

Tipo: `string`

Requerido: `true`

### planId

El ID del plan de prueba que puedes obtener en la sección Test Plan de Azure DevOps.

Ejemplo: `124`

Tipo: `integer`

Requerido: `true`

### suiteId

El suiteId que puedes obtener en la sección Test Plan de Azure DevOps. En caso de suites anidadas, obtén el suiteId raíz, el servicio itera sobre todas las suites hijas.

Ejemplo: `21`

Tipo: `integer`

Requerido: `true`

### runName

Un nombre descriptivo para la ejecución de la prueba.

Ejemplo: `"FE regression tests run"`

Tipo: `string`

Requerido: `true`

### caseIdRegex

Expresión regular personalizada para coincidir con el testCaseId de la etiqueta o título del caso de prueba.

Tipo: `string`

Predeterminado: `"@?[cC](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\d+)"`

Requerido: `false`

## Autor
Gianluca Mangiapelo - [github](https://github.com/gianlucamangiapelo)