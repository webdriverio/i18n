---
id: configuration
title: Configuración
---

Según el [tipo de configuración](/docs/setuptypes) (por ejemplo, utilizando los enlaces de protocolo raw, WebdriverIO como paquete independiente o el testrunner WDIO) hay un conjunto diferente de opciones disponibles para controlar el entorno.

## Opciones de WebDriver

Las siguientes opciones se definen cuando se utiliza el paquete de protocolo [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

Protocolo a utilizar cuando se comunica con el servidor del driver.

Type: `String`<br />
Default: `http`

### hostname

Host de tu servidor de driver.

Type: `String`<br />
Default: `0.0.0.0`

### port

Puerto en el que está tu servidor de driver.

Type: `Number`<br />
Default: `undefined`

### path

Ruta al endpoint del servidor de driver.

Type: `String`<br />
Default: `/`

### queryParams

Parámetros de consulta que se propagan al servidor de driver.

Type: `Object`<br />
Default: `undefined`

### user

Tu nombre de usuario del servicio en la nube (solo funciona para cuentas de [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) o [LambdaTest](https://www.lambdatest.com)). Si está establecido, WebdriverIO configurará automáticamente las opciones de conexión para ti. Si no utilizas un proveedor en la nube, esto se puede utilizar para autenticar cualquier otro backend de WebDriver.

Type: `String`<br />
Default: `undefined`

### key

Tu clave de acceso o clave secreta del servicio en la nube (solo funciona para cuentas de [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) o [LambdaTest](https://www.lambdatest.com)). Si está establecido, WebdriverIO configurará automáticamente las opciones de conexión para ti. Si no utilizas un proveedor en la nube, esto se puede utilizar para autenticar cualquier otro backend de WebDriver.

Type: `String`<br />
Default: `undefined`

### capabilities

Define las capacidades que deseas ejecutar en tu sesión de WebDriver. Consulta el [Protocolo WebDriver](https://w3c.github.io/webdriver/#capabilities) para más detalles. Si ejecutas un controlador más antiguo que no admite el protocolo WebDriver, deberás utilizar las [capacidades de JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) para ejecutar una sesión con éxito.

Además de las capacidades basadas en WebDriver, puedes aplicar opciones específicas del navegador y del proveedor que permiten una configuración más profunda del navegador remoto o dispositivo. Estas están documentadas en los documentos del proveedor correspondiente, por ejemplo:

- `goog:chromeOptions`: para [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: para [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: para [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: para [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: para [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: para [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Además, una utilidad útil es el [Configurador de Pruebas Automatizadas](https://docs.saucelabs.com/basics/platform-configurator/) de Sauce Labs, que te ayuda a crear este objeto haciendo clic en las capacidades deseadas.

Type: `Object`<br />
Default: `null`

**Ejemplo:**

```js
{
    browserName: 'chrome', // opciones: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // versión del navegador
    platformName: 'Windows 10' // plataforma del sistema operativo
}
```

Si estás ejecutando pruebas web o nativas en dispositivos móviles, `capabilities` difiere del protocolo WebDriver. Consulta la [Documentación de Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/) para más detalles.

### logLevel

Nivel de detalle del registro.

Type: `String`<br />
Default: `info`<br />
Options: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Directorio para almacenar todos los archivos de registro del testrunner (incluidos los registros del reporter y los registros de `wdio`). Si no está configurado, todos los registros se transmiten a `stdout`. Dado que la mayoría de los reporters están hechos para registrar en `stdout`, se recomienda utilizar esta opción solo para reporters específicos donde tiene más sentido enviar el informe a un archivo (como el reporter `junit`, por ejemplo).

Cuando se ejecuta en modo independiente, el único registro generado por WebdriverIO será el registro `wdio`.

Type: `String`<br />
Default: `null`

### connectionRetryTimeout

Tiempo de espera para cualquier solicitud de WebDriver a un controlador o grid.

Type: `Number`<br />
Default: `120000`

### connectionRetryCount

Número máximo de reintentos de solicitud al servidor Selenium.

Type: `Number`<br />
Default: `3`

### agent

Te permite usar un `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) personalizado para hacer solicitudes.

Type: `Object`<br />
Default:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Especifica `headers` personalizados para pasar en cada solicitud de WebDriver. Si tu Selenium Grid requiere Autenticación Básica, recomendamos pasar un header `Authorization` a través de esta opción para autenticar tus solicitudes de WebDriver, por ejemplo:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Read the username and password from environment variables
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Combine the username and password with a colon separator
const credentials = `${username}:${password}`;
// Encode the credentials using Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

Type: `Object`<br />
Default: `{}`

### transformRequest

Función que intercepta las [opciones de solicitud HTTP](https://github.com/sindresorhus/got#options) antes de realizar una solicitud WebDriver

Type: `(RequestOptions) => RequestOptions`<br />
Default: *none*

### transformResponse

Función que intercepta objetos de respuesta HTTP después de que ha llegado una respuesta de WebDriver. La función recibe el objeto de respuesta original como primer argumento y las `RequestOptions` correspondientes como segundo argumento.

Type: `(Response, RequestOptions) => Response`<br />
Default: *none*

### strictSSL

Si no se requiere que el certificado SSL sea válido.
Se puede configurar a través de variables de entorno como `STRICT_SSL` o `strict_ssl`.

Type: `Boolean`<br />
Default: `true`

### enableDirectConnect

Si habilita la [función de conexión directa de Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
No hace nada si la respuesta no tiene las claves adecuadas mientras la bandera está habilitada.

Type: `Boolean`<br />
Default: `true`

### cacheDir

La ruta a la raíz del directorio de caché. Este directorio se utiliza para almacenar todos los drivers que se descargan al intentar iniciar una sesión.

Type: `String`<br />
Default: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

---

## WebdriverIO

Las siguientes opciones (incluidas las mencionadas anteriormente) se pueden utilizar con WebdriverIO de forma independiente:

### automationProtocol

Define el protocolo que deseas utilizar para la automatización de tu navegador. Actualmente solo se admite [`webdriver`](https://www.npmjs.com/package/webdriver), ya que es la principal tecnología de automatización de navegadores que utiliza WebdriverIO.

Si deseas automatizar el navegador utilizando una tecnología de automatización diferente, asegúrate de establecer esta propiedad en una ruta que se resuelva a un módulo que se adhiera a la siguiente interfaz:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Start a automation session and return a WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * with respective automation commands. See the [webdriver](https://www.npmjs.com/package/webdriver) package
     * as a reference implementation
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO options
     * @param {Function} hook that allows to modify the client before it gets released from the function
     * @param {PropertyDescriptorMap} userPrototype allows user to add custom protocol commands
     * @param {Function} customCommandWrapper allows to modify the command execution
     * @returns a WebdriverIO compatible client instance
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * allows user to attach to existing sessions
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Changes The instance session id and browser capabilities for the new session
     * directly into the passed in browser object
     *
     * @optional
     * @param   {object} instance  the object we get from a new browser session.
     * @returns {string}           the new session id of the browser
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

Type: `String`<br />
Default: `webdriver`

### baseUrl

Acorta las llamadas al comando `url` estableciendo una URL base.
- Si tu parámetro `url` comienza con `/`, entonces se antepone `baseUrl` (excepto la ruta de `baseUrl`, si tiene una).
- Si tu parámetro `url` comienza sin un esquema o `/` (como `some/path`), entonces se antepone directamente el `baseUrl` completo.

Type: `String`<br />
Default: `null`

### waitforTimeout

Tiempo de espera predeterminado para todos los comandos `waitFor*`. (Nota la 'f' minúscula en el nombre de la opción). Este tiempo de espera __solo__ afecta a los comandos que comienzan con `waitFor*` y su tiempo de espera predeterminado.

Para aumentar el tiempo de espera de una _prueba_, consulta la documentación del framework.

Type: `Number`<br />
Default: `5000`

### waitforInterval

Intervalo predeterminado para todos los comandos `waitFor*` para verificar si un estado esperado (por ejemplo, visibilidad) ha cambiado.

Type: `Number`<br />
Default: `100`

### region

Si estás ejecutando en Sauce Labs, puedes elegir ejecutar pruebas entre diferentes centros de datos: US o EU.
Para cambiar tu región a EU, agrega `region: 'eu'` a tu configuración.

__Nota:__ Esto solo tiene efecto si proporcionas las opciones `user` y `key` que están conectadas a tu cuenta de Sauce Labs.

Type: `String`<br />
Default: `us`

*(solo para vm y/o em/simuladores)*

---

## Opciones del Testrunner

Las siguientes opciones (incluidas las mencionadas anteriormente) se definen solo para ejecutar WebdriverIO con el testrunner WDIO:

### specs

Define las especificaciones para la ejecución de pruebas. Puedes especificar un patrón glob para hacer coincidir varios archivos a la vez o envolver un glob o conjunto de rutas en una matriz para ejecutarlos dentro de un solo proceso de trabajo. Todas las rutas se consideran relativas a la ruta del archivo de configuración.

Type: `(String | String[])[]`<br />
Default: `[]`

### exclude

Excluye especificaciones de la ejecución de pruebas. Todas las rutas se consideran relativas a la ruta del archivo de configuración.

Type: `String[]`<br />
Default: `[]`

### suites

Un objeto que describe varias suites, que luego puedes especificar con la opción `--suite` en la CLI de `wdio`.

Type: `Object`<br />
Default: `{}`

### capabilities

Lo mismo que la sección `capabilities` descrita anteriormente, excepto con la opción de especificar un objeto [`multiremote`](/docs/multiremote), o múltiples sesiones de WebDriver en una matriz para ejecución paralela.

Puedes aplicar las mismas capacidades específicas de proveedor y navegador como se define [arriba](/docs/configuration#capabilities).

Type: `Object`|`Object[]`<br />
Default: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Número máximo total de trabajadores en ejecución paralela.

__Nota:__ Puede ser un número tan alto como `100`, cuando las pruebas se realizan en algunos proveedores externos como máquinas de Sauce Labs. Allí, las pruebas no se prueban en una sola máquina, sino en múltiples VMs. Si las pruebas se van a ejecutar en una máquina de desarrollo local, usa un número más razonable, como `3`, `4` o `5`. Esencialmente, este es el número de navegadores que se iniciarán simultáneamente y ejecutarán tus pruebas al mismo tiempo, por lo que depende de cuánta RAM hay en tu máquina y cuántas otras aplicaciones están ejecutándose en tu máquina.

También puedes aplicar `maxInstances` dentro de tus objetos de capacidad usando la capacidad `wdio:maxInstances`. Esto limitará la cantidad de sesiones paralelas para esa capacidad en particular.

Type: `Number`<br />
Default: `100`

### maxInstancesPerCapability

Número máximo de trabajadores en ejecución paralela por capacidad.

Type: `Number`<br />
Default: `100`

### injectGlobals

Inserta los globales de WebdriverIO (por ejemplo, `browser`, `$` y `$$`) en el entorno global.
Si lo estableces en `false`, debes importar desde `@wdio/globals`, por ejemplo:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Nota: WebdriverIO no maneja la inyección de globales específicos del framework de pruebas.

Type: `Boolean`<br />
Default: `true`

### bail

Si deseas que tu ejecución de prueba se detenga después de un número específico de fallos en las pruebas, usa `bail`.
(Por defecto es `0`, lo que ejecuta todas las pruebas sin importar qué). **Nota:** Una prueba en este contexto son todas las pruebas dentro de un solo archivo de especificación (cuando se usa Mocha o Jasmine) o todos los pasos dentro de un archivo de características (cuando se usa Cucumber). Si deseas controlar el comportamiento de bail dentro de las pruebas de un solo archivo de prueba, consulta las opciones disponibles del [framework](frameworks).

Type: `Number`<br />
Default: `0` (no bail; ejecutar todas las pruebas)

### specFileRetries

El número de veces para reintentar un archivo de especificación completo cuando falla como un todo.

Type: `Number`<br />
Default: `0`

### specFileRetriesDelay

Retraso en segundos entre los intentos de reintento del archivo de especificación

Type: `Number`<br />
Default: `0`

### specFileRetriesDeferred

Si los archivos de especificación reintentados deben reintentarse inmediatamente o diferirse al final de la cola.

Type: `Boolean`<br />
Default: `true`

### groupLogsByTestSpec

Elige la vista de salida de registros.

Si se establece en `false`, los registros de diferentes archivos de prueba se imprimirán en tiempo real. Ten en cuenta que esto puede resultar en la mezcla de salidas de registro de diferentes archivos cuando se ejecutan en paralelo.

Si se establece en `true`, las salidas de registro se agruparán por Test Spec y se imprimirán solo cuando se complete el Test Spec.

Por defecto, está establecido en `false`, por lo que los registros se imprimen en tiempo real.

Type: `Boolean`<br />
Default: `false`

### services

Los servicios se encargan de un trabajo específico del que no quieres ocuparte. Mejoran tu configuración de prueba con casi ningún esfuerzo.

Type: `String[]|Object[]`<br />
Default: `[]`

### framework

Define el framework de pruebas que utilizará el testrunner WDIO.

Type: `String`<br />
Default: `mocha`<br />
Options: `mocha` | `jasmine`

### mochaOpts, jasmineOpts y cucumberOpts

Opciones específicas relacionadas con el framework. Consulta la documentación del adaptador del framework para conocer las opciones disponibles. Lee más sobre esto en [Frameworks](frameworks).

Type: `Object`<br />
Default: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Lista de características de cucumber con números de línea (cuando [se usa el framework cucumber](./Frameworks.md#using-cucumber)).

Type: `String[]`
Default: `[]`

### reporters

Lista de reporters a utilizar. Un reporter puede ser una cadena o una matriz de
`['reporterName', { /* reporter options */}]` donde el primer elemento es una cadena con el nombre del reporter y el segundo elemento un objeto con opciones del reporter.

Type: `String[]|Object[]`<br />
Default: `[]`

Ejemplo:

```js
reporters: [
    'dot',
    'spec'
    ['junit', {
        outputDir: `${__dirname}/reports`,
        otherOption: 'foobar'
    }]
]
```

### reporterSyncInterval

Determina en qué intervalo el reporter debe verificar si están sincronizados si informan sus registros de forma asíncrona (por ejemplo, si los registros se transmiten a un proveedor externo).

Type: `Number`<br />
Default: `100` (ms)

### reporterSyncTimeout

Determina el tiempo máximo que tienen los reporters para finalizar la carga de todos sus registros hasta que el testrunner lanza un error.

Type: `Number`<br />
Default: `5000` (ms)

### execArgv

Argumentos de Node para especificar al lanzar procesos hijo.

Type: `String[]`<br />
Default: `null`

### filesToWatch

Una lista de patrones de cadenas compatibles con glob que indican al testrunner que observe otros archivos adicionales, por ejemplo, archivos de aplicación, cuando se ejecuta con la bandera `--watch`. Por defecto, el testrunner ya observa todos los archivos de especificación.

Type: `String[]`<br />
Default: `[]`

### updateSnapshots

Establece en true si quieres actualizar tus snapshots. Idealmente se usa como parte de un parámetro CLI, por ejemplo, `wdio run wdio.conf.js --s`.

Type: `'new' | 'all' | 'none'`<br />
Default: `none` si no se proporciona y las pruebas se ejecutan en CI, `new` si no se proporciona, de lo contrario lo que se haya proporcionado

### resolveSnapshotPath

Anula la ruta predeterminada de snapshots. Por ejemplo, para almacenar snapshots junto a los archivos de prueba.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Type: `(testPath: string, snapExtension: string) => string`<br />
Default: almacena archivos de snapshot en el directorio `__snapshots__` junto al archivo de prueba

### tsConfigPath

WDIO utiliza `tsx` para compilar archivos TypeScript. Tu TSConfig se detecta automáticamente desde el directorio de trabajo actual, pero puedes especificar una ruta personalizada aquí o configurando la variable de entorno TSX_TSCONFIG_PATH.

Consulta la documentación de `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Type: `String`<br />
Default: `null`<br />

## Hooks

El testrunner WDIO te permite configurar hooks que se activan en momentos específicos del ciclo de vida de la prueba. Esto permite acciones personalizadas (por ejemplo, tomar una captura de pantalla si una prueba falla).

Cada hook tiene como parámetro información específica sobre el ciclo de vida (por ejemplo, información sobre la suite de pruebas o la prueba). Lee más sobre todas las propiedades de los hooks en [nuestro ejemplo de configuración](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Nota:** Algunos hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` y `onComplete`) se ejecutan en un proceso diferente y, por lo tanto, no pueden compartir datos globales con los otros hooks que viven en el proceso de trabajo.

### onPrepare

Se ejecuta una vez antes de que se lancen todos los trabajadores.

Parámetros:

- `config` (`object`): objeto de configuración de WebdriverIO
- `param` (`object[]`): lista de detalles de capacidades

### onWorkerStart

Se ejecuta antes de que se genere un proceso de trabajo y se puede usar para inicializar servicios específicos para ese trabajador, así como para modificar entornos de ejecución de forma asíncrona.

Parámetros:

- `cid` (`string`): id de capacidad (por ejemplo, 0-0)
- `caps` (`object`): contiene capacidades para la sesión que se generará en el trabajador
- `specs` (`string[]`): especificaciones a ejecutar en el proceso de trabajo
- `args` (`object`): objeto que se fusionará con la configuración principal una vez que se inicialice el trabajador
- `execArgv` (`string[]`): lista de argumentos de cadena pasados al proceso de trabajo

### onWorkerEnd

Se ejecuta justo después de que un proceso de trabajo haya finalizado.

Parámetros:

- `cid` (`string`): id de capacidad (por ejemplo, 0-0)
- `exitCode` (`number`): 0 - éxito, 1 - fallo
- `specs` (`string[]`): especificaciones a ejecutar en el proceso de trabajo
- `retries` (`number`): número de reintentos a nivel de especificación utilizados como se define en [_"Agregar reintentos en base a un archivo de especificación"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Se ejecuta justo antes de inicializar la sesión de webdriver y el framework de pruebas. Te permite manipular configuraciones dependiendo de la capacidad o especificación.

Parámetros:

- `config` (`object`): objeto de configuración de WebdriverIO
- `caps` (`object`): contiene capacidades para la sesión que se generará en el trabajador
- `specs` (`string[]`): especificaciones a ejecutar en el proceso de trabajo

### before

Se ejecuta antes de que comience la ejecución de la prueba. En este punto puedes acceder a todas las variables globales como `browser`. Es el lugar perfecto para definir comandos personalizados.

Parámetros:

- `caps` (`object`): contiene capacidades para la sesión que se generará en el trabajador
- `specs` (`string[]`): especificaciones a ejecutar en el proceso de trabajo
- `browser` (`object`): instancia de la sesión de navegador/dispositivo creada

### beforeSuite

Hook que se ejecuta antes de que comience la suite (solo en Mocha/Jasmine)

Parámetros:

- `suite` (`object`): detalles de la suite

### beforeHook

Hook que se ejecuta *antes* de un hook dentro de la suite (por ejemplo, se ejecuta antes de llamar a beforeEach en Mocha)

Parámetros:

- `test` (`object`): detalles de la prueba
- `context` (`object`): contexto de prueba (representa el objeto World en Cucumber)

### afterHook

Hook que se ejecuta *después* de que un hook dentro de la suite finaliza (por ejemplo, se ejecuta después de llamar a afterEach en Mocha)

Parámetros:

- `test` (`object`): detalles de la prueba
- `context` (`object`): contexto de prueba (representa el objeto World en Cucumber)
- `result` (`object`): resultado del hook (contiene propiedades `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Función que se ejecutará antes de una prueba (solo en Mocha/Jasmine).

Parámetros:

- `test` (`object`): detalles de la prueba
- `context` (`object`): objeto de ámbito con el que se ejecutó la prueba

### beforeCommand

Se ejecuta antes de que se ejecute un comando de WebdriverIO.

Parámetros:

- `commandName` (`string`): nombre del comando
- `args` (`*`): argumentos que recibiría el comando

### afterCommand

Se ejecuta después de que se ejecuta un comando de WebdriverIO.

Parámetros:

- `commandName` (`string`): nombre del comando
- `args` (`*`): argumentos que recibiría el comando
- `result` (`number`): 0 - comando exitoso, 1 - error de comando
- `error` (`Error`): objeto de error si lo hay

### afterTest

Función que se ejecutará después de que finalice una prueba (en Mocha/Jasmine).

Parámetros:

- `test` (`object`): detalles de la prueba
- `context` (`object`): objeto de ámbito con el que se ejecutó la prueba
- `result.error` (`Error`): objeto de error en caso de que la prueba falle, de lo contrario `undefined`
- `result.result` (`Any`): objeto de retorno de la función de prueba
- `result.duration` (`Number`): duración de la prueba
- `result.passed` (`Boolean`): true si la prueba ha pasado, de lo contrario false
- `result.retries` (`Object`): información sobre reintentos relacionados con pruebas individuales como se define para [Mocha y Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) así como para [Cucumber](./Retry.md#rerunning-in-cucumber), por ejemplo `{ attempts: 0, limit: 0 }`, ver
- `result` (`object`): resultado del hook (contiene propiedades `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook que se ejecuta después de que la suite ha terminado (solo en Mocha/Jasmine)

Parámetros:

- `suite` (`object`): detalles de la suite

### after

Se ejecuta después de que todas las pruebas hayan terminado. Todavía tienes acceso a todas las variables globales de la prueba.

Parámetros:

- `result` (`number`): 0 - prueba aprobada, 1 - prueba fallida
- `caps` (`object`): contiene capacidades para la sesión que se generará en el trabajador
- `specs` (`string[]`): especificaciones a ejecutar en el proceso de trabajo

### afterSession

Se ejecuta justo después de terminar la sesión de webdriver.

Parámetros:

- `config` (`object`): objeto de configuración de WebdriverIO
- `caps` (`object`): contiene capacidades para la sesión que se generará en el trabajador
- `specs` (`string[]`): especificaciones a ejecutar en el proceso de trabajo

### onComplete

Se ejecuta después de que todos los trabajadores se han cerrado y el proceso está a punto de salir. Un error lanzado en el hook onComplete resultará en que la ejecución de la prueba falle.

Parámetros:

- `exitCode` (`number`): 0 - éxito, 1 - fallo
- `config` (`object`): objeto de configuración de WebdriverIO
- `caps` (`object`): contiene capacidades para la sesión que se generará en el trabajador
- `result` (`object`): objeto de resultados que contiene los resultados de las pruebas

### onReload

Se ejecuta cuando ocurre una actualización.

Parámetros:

- `oldSessionId` (`string`): ID de sesión de la sesión antigua
- `newSessionId` (`string`): ID de sesión de la nueva sesión

### beforeFeature

Se ejecuta antes de una Característica de Cucumber.

Parámetros:

- `uri` (`string`): ruta al archivo de características
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): objeto de características de Cucumber

### afterFeature

Se ejecuta después de una Característica de Cucumber.

Parámetros:

- `uri` (`string`): ruta al archivo de características
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): objeto de características de Cucumber

### beforeScenario

Se ejecuta antes de un Escenario de Cucumber.

Parámetros:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): objeto world que contiene información sobre pickle y paso de prueba
- `context` (`object`): objeto World de Cucumber

### afterScenario

Se ejecuta después de un Escenario de Cucumber.

Parámetros:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): objeto world que contiene información sobre pickle y paso de prueba
- `result` (`object`): objeto de resultados que contiene resultados del escenario
- `result.passed` (`boolean`): true si el escenario ha pasado
- `result.error` (`string`): pila de errores si el escenario falló
- `result.duration` (`number`): duración del escenario en milisegundos
- `context` (`object`): objeto World de Cucumber

### beforeStep

Se ejecuta antes de un Paso de Cucumber.

Parámetros:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): objeto de paso de Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): objeto de escenario de Cucumber
- `context` (`object`): objeto World de Cucumber

### afterStep

Se ejecuta después de un Paso de Cucumber.

Parámetros:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): objeto de paso de Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): objeto de escenario de Cucumber
- `result`: (`object`): objeto de resultados que contiene resultados del paso
- `result.passed` (`boolean`): true si el escenario ha pasado
- `result.error` (`string`): pila de errores si el escenario falló
- `result.duration` (`number`): duración del escenario en milisegundos
- `context` (`object`): objeto World de Cucumber

### beforeAssertion

Hook que se ejecuta antes de que ocurra una aserción de WebdriverIO.

Parámetros:

- `params`: información de aserción
- `params.matcherName` (`string`): nombre del comparador (por ejemplo, `toHaveTitle`)
- `params.expectedValue`: valor que se pasa al comparador
- `params.options`: opciones de aserción

### afterAssertion

Hook que se ejecuta después de que ocurre una aserción de WebdriverIO.

Parámetros:

- `params`: información de aserción
- `params.matcherName` (`string`): nombre del comparador (por ejemplo, `toHaveTitle`)
- `params.expectedValue`: valor que se pasa al comparador
- `params.options`: opciones de aserción
- `params.result`: resultados de la aserción