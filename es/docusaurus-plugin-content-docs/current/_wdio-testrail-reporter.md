---
id: wdio-testrail-reporter
title: Reportero Testrail Reporter
custom_edit_url: https://github.com/webdriverio-community/wdio-testrail-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/testrail-reporter es un paquete de terceros, para más información por favor consulta [GitHub](https://github.com/webdriverio-community/wdio-testrail-reporter) | [npm](https://www.npmjs.com/package/@wdio/testrail-reporter)

Este reportero crea informes de TestRail. Lo primero que necesitas es habilitar la API de TestRail para que el informe pueda comunicarse con TestRail y enviar los resultados de las pruebas. Para hacerlo, inicia sesión en tu cuenta de TestRail y ve a Administration > Site Settings > API y asegúrate de marcar la casilla de verificación cerca de Enable API.

Añade el ID del caso de prueba de TestRail a la descripción de la prueba. Por ejemplo:
```javascript
it("C123456 Page loads correctly", async () => {
```
Esto también admite múltiples caseIDs. Por ejemplo:
```javascript
it("C123456 C678910 Page loads correctly", async () => {
```

## Instalación

Para usar el reportero, añádelo a tu `package.json`:

```sh
npm i --save-dev @wdio/testrail-reporter
```

## Uso

Añade el reportero a tu archivo de configuración WDIO.

Ejemplo para cuando quieres crear una nueva ejecución de prueba:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false,
                caseIdTagPrefix: '' // used only for multi-platform Cucumber Scenarios
            }
        ]
    ],
    // ...
}
```

Ejemplo para cuando quieres actualizar una ejecución de prueba existente:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                existingRunId: 2345,
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```

Ejemplo para cuando necesitas diferentes IDs de proyecto y/o suite basados en la suite de pruebas a ejecutar:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: process.env.TESTRAIL_PROJECT_NAME == 'PROJECT_A' ? 1 : 2,
                suiteId: process.env.TESTRAIL_SUITE_NAME == 'SUITE_A' ? 10 : 20,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```


## Opciones

### `projectId`

ID del proyecto de testrail.

Type: `string`

### `suiteId`

ID de la suite, la suite 1 es la predeterminada.

Type: `string`

### `domain`

Dominio de tu instancia de testrail, por ejemplo `your-domain.testrail.io`.

Type: `string`

### `username`

Nombre de usuario de tu instancia de testrail.

Type: `string`

### `apiToken`

Token API de tu instancia de testrail.

Type: `string`

### `runName`

Nombre personalizado para la ejecución de prueba.

Type: `string`

### `existingRunId`

Id de una ejecución de prueba existente para actualizar.

Type: `string`

### `oneReport`

Crea una única ejecución de prueba.

Type: `boolean`

### `includeAll`

Incluye todas las pruebas de la suite en la ejecución de prueba.

Type: `boolean`

### `caseIdTagPrefix`

Prefijo utilizado para localizar el ID del caso en las etiquetas de Cucumber, útil para ejecuciones de escenarios de Cucumber en múltiples plataformas.

Type: `string`

### `useCucumber`

Indica si las pruebas están escritas utilizando el framework Cucumber. Por defecto, está configurado como `false`.

Type: `boolean`

---

Para más información sobre WebdriverIO visita la [página principal](https://webdriver.io).