---
id: wdio-cucumberjs-json-reporter
title: Reportador JSON de CucumberJS
custom_edit_url: https://github.com/wswebcreation/wdio-cucumberjs-json-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumberjs-json-reporter es un paquete de terceros, para más información por favor consulta [GitHub](https://github.com/wswebcreation/wdio-cucumberjs-json-reporter) | [npm](https://nodei.co/npm/wdio-cucumberjs-json-reporter)

Un reportador WDIO que crea archivos JSON de CucumberJS para WebdriverIO v8 y versiones superiores.

[![NPM](https://nodei.co/npm/wdio-cucumberjs-json-reporter.png)](https://nodei.co/npm/wdio-cucumberjs-json-reporter/)

## ¿Qué hace?
Este reportador generará un **archivo JSON de Cucumber** para cada característica que está siendo probada. El archivo JSON puede ser utilizado con cualquier informe que desees usar, como por ejemplo [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter).

También agregará metadatos sobre la instancia en ejecución al archivo de características y, por último pero no menos importante, te dará la oportunidad de añadir archivos adjuntos a la salida JSON.

## Instalación
La forma más fácil es mantener `wdio-cucumberjs-json-reporter` como una devDependency en tu `package.json`.

```json
{
  "devDependencies": {
    "wdio-cucumberjs-json-reporter": "^5.0.0"
  }
}
```

Puedes hacerlo simplemente con:

```bash
npm install wdio-cucumberjs-json-reporter --save-dev
```

así se añadirá automáticamente a tu `package.json`

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí](https://webdriver.io/docs/gettingstarted).

## Configuración
Configura el directorio de salida y el idioma en tu archivo wdio.conf.js:

```js
export const config = {
    // ...
    reporters: [
        // Así con las opciones predeterminadas, ver las opciones a continuación
        'cucumberjs-json',

        // O así si quieres establecer la carpeta y el idioma
        [ 'cucumberjs-json', {
                jsonFolder: '.tmp/new/',
                language: 'en',
            },
        ],
    ],
  // ...
}
```

> ¡NO USES AMBAS FORMAS DE AÑADIR EL REPORTADOR, ESTO ES SOLO UN EJEMPLO!

## Opciones
### `jsonFolder`
- **Tipo:** `String`
- **Obligatorio:** No
- **Predeterminado:** `.tmp/json/`

El directorio donde se almacenarán los archivos JSON generados por este informe, relativo desde donde se inicia el script.

**Nota:** Si utilizas un script npm desde la línea de comandos, como por ejemplo `npm run test`, el `jsonFolder` será relativo desde la ruta
donde se ejecuta el script. Ejecutarlo desde la raíz de tu proyecto también creará el `jsonFolder` en la raíz de tu proyecto.

### `language`
- **Tipo:** `String`
- **Obligatorio:** No
- **Predeterminado:** `en`

El idioma en el que están escritos los escenarios Gherkin (por defecto en inglés). La lista de códigos de idioma y sus palabras clave se puede encontrar [aquí](https://cucumber.io/docs/gherkin/reference/#overview).

### `disableHooks`
- **Tipo:** `boolean`
- **Obligatorio:** No
- **Predeterminado:** `false`

Los detalles de los hooks no serán parte de la generación si esta propiedad se establece en `true`.

### `reportFilePerRetry`
- **Tipo:** `boolean`
- **Obligatorio:** No
- **Predeterminado:** `true`

Cuando una especificación se vuelve a intentar, el informe se añadirá al archivo de informe existente de los intentos anteriores si esta propiedad se establece en `false`.

**Ejemplo**:
`['cucumberjs-json', { jsonFolder: '.tmp/new/', language: 'en', disableHooks:true}]`

## Metadatos

> **Nota:**\
> Actualmente esto no es compatible con WebdriverIO V6, WebdriverIO V5 todavía lo admite y WebdriverIO V7 lo admite nuevamente

Como se dijo, este informe puede almacenar automáticamente los metadatos de la máquina/dispositivo actual en el que se ha ejecutado la característica.

Para personalizarlo puedes añadirlo agregando el siguiente objeto a tus `capabilities`

```js
// Ejemplo wdio.conf.js
export const config = {
    //..
    capabilities: [
        {
            browserName: 'chrome',
            // Añade esto
            'cjson:metadata': {
                // Para un navegador
                browser: {
                    name: 'chrome',
                    version: '58',
                },
                // para una app
                app: {
                  name: 'name.of.app.ipa',
                  version: '1.2.3',
                },
                device: 'MacBook Pro 15',
                platform: {
                    name: 'OSX',
                    version: '10.12.6'
                }
            },
        },
    ],
};
```

> El objeto de metadatos necesita tener el prefijo `cjson`, ¡de lo contrario no funcionará!

### Valores de metadatos
#### `metadata.app.name`
- **Tipo:** `string`

**p.ej.:** El nombre de la aplicación.

#### `metadata.app.version`
- **Tipo:** `string`

**p.ej.:** La versión de la aplicación.

#### `metadata.browser.name`
- **Tipo:** `string`
- **Valores posibles:** `internet explorer | edge | chrome | firefox | safari`

#### `metadata.browser.version`
- **Tipo:** `string`

**p.ej.:** La versión del navegador, esta puede ser añadida manualmente o recuperada durante la ejecución de las pruebas para obtener el número de versión exacto.

#### `metadata.device`
- **Tipo:** `string`

**p.ej.:** Un nombre que representa el tipo de dispositivo. Por ejemplo, si lo ejecutas en una máquina virtual, puedes poner aquí `Virtual Machine`,
o el nombre del móvil, como por ejemplo `iPhone 7 Plus`.

#### `metadata.platform.name`
- **Tipo:** `string`
- **Valores posibles:** `windows | osx | linux | ubuntu | android | ios`

#### `metadata.platform.version`
- **Tipo:** `string`

**p.ej.:** La versión de la plataforma

> Si no proporcionas el objeto `browser` en los metadatos, este módulo lo determinará automáticamente para ti. **Siempre lo sobrescribirá con el valor más reciente que pueda determinar.**

> Si no proporcionas el objeto `device` y/o el objeto `platform`, se establecerá por defecto como `not known`.

> Si no proporcionas un `browser.name` o un `browser.version`, el módulo intentará determinarlo automáticamente.

## Adjuntos
Tienes la opción de adjuntar datos al archivo JSON en todos estos hooks / pasos:

- Before(All)
- After(All)
- Given
- When
- Then
- And

Lo único que necesitas proporcionar es el siguiente código en tus archivos de pasos.

Para ES Modules (ESM)
```js
import cucumberJson from 'wdio-cucumberjs-json-reporter';

// Adjuntar una cadena (si no se proporciona un tipo, por defecto será `text/plain`)
cucumberJson.attach('solo una cadena');
cucumberJson.attach('solo una segunda cadena', 'text/plain');

// Adjuntar JSON
cucumberJson.attach({"json-string": true}, 'application/json');

// Adjuntar una captura de pantalla en un hook before
cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
```
Para CommonJS (CJS)
```js
const { attach } = require("wdio-cucumberjs-json-reporter");

// Adjuntar una cadena (si no se proporciona un tipo, por defecto será `text/plain`)
attach('solo una cadena');
attach('solo una segunda cadena', 'text/plain');

// Adjuntar JSON
attach({"json-string": true}, 'application/json');

// Adjuntar una captura de pantalla en un hook before
attach(await browser.takeScreenshot(), 'image/png');
```

## Úsalo con multiple-cucumber-html-reporter
El módulo anterior para WebdriverIO V4, [wdio-multiple-cucumber-html-reporter](https://github.com/webdriverio-community/wdio-multiple-cucumber-html-reporter),
tenía una conexión integrada con el módulo [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter). **Este no es el caso para este
reportador** porque la nueva configuración de WebdriverIO V5 se basa en una instancia que no me permite usar los hooks `onPrepare` y `onComplete`.

Si aún deseas usar el módulo [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter), puedes agregar lo siguiente a tu archivo de configuración.

- Instala el módulo con

    ```bash
    npm install multiple-cucumber-html-reporter --save-dev
    ```

- Añade esto a tu archivo de configuración

    ```js
    import fs from 'node:fs/promises'
    // Importa el módulo
    import { generate } from 'multiple-cucumber-html-reporter'

    // Ejemplo wdio.conf.js
    export const config = {
      //..

      // =====
      // Hooks
      // =====
      /**
       * Se ejecuta una vez antes de que todos los workers se lancen.
       */
      onPrepare: () => {
        // Elimina la carpeta `.tmp/` que contiene los archivos json e informes
        return fs.rm('.tmp/', { recursive: true });
      },
      /**
       * Se ejecuta después de que todos los workers se apagan y el proceso está a punto de salir.
       */
      onComplete: () => {
        // Genera el informe cuando todas las pruebas estén hechas
        generate({
          // Requerido
          // Esta parte debe ser la misma ruta donde almacenas los archivos JSON
          // por defecto = '.tmp/json/'
          jsonDir: '.tmp/json/',
          reportPath: '.tmp/report/',
          // para más opciones ver https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
        });
      }
    }
    ```

## Versiones antiguas de WebdriverIO

> **¡ESTE MÓDULO SOLO PUEDE FUNCIONAR CON WebdriverIO V8+!**\
> **Para V6, consulta la documentación [aquí](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v6) y usa la versión 2.0.4**\
> **Para V5, consulta la documentación [aquí](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v5) y usa la versión 1.3.0**

> **ESTE MÓDULO NO ES UN REEMPLAZO DE [wdio-multiple-cucumber-html-reporter](https://github.com/wswebcreation/wdio-multiple-cucumber-html-reporter). ESE MÓDULO SOLO SOPORTA WEBDRIVERIO V4 Y TAMBIÉN CREA UN INFORME. ¡ESTE MÓDULO SOLO CREA UN JSON, NO UN INFORME!**