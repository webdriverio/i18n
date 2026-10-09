---
id: configuration
title: Configuración
description: "Consulta todas las opciones de configuración de WebDriver, WebdriverIO en modo standalone y el testrunner de WDIO, incluidos todos los hooks del testrunner."
---

Según el [tipo de configuración](/docs/setuptypes) (p. ej., usando los bindings del protocolo directamente, WebdriverIO como paquete standalone o el testrunner de WDIO), hay un conjunto distinto de opciones disponibles para controlar el entorno.

## Opciones de WebDriver

Las siguientes opciones están definidas al usar el paquete de protocolo [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

<Option type="String" default="http">

Protocolo que se usa para comunicarse con el servidor del driver.

</Option>

### hostname

<Option type="String" default="0.0.0.0">

Host de tu servidor del driver.

</Option>

### port

<Option type="Number" default="undefined">

Puerto en el que se encuentra tu servidor del driver.

</Option>

### path

<Option type="String" default="/">

Ruta al endpoint del servidor del driver.

</Option>

### queryParams

<Option type="Object" default="undefined">

Parámetros de consulta que se propagan al servidor del driver.

</Option>

### user

<Option type="String" default="undefined">

Tu nombre de usuario del servicio en la nube (solo funciona con cuentas de [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) o [TestMu AI](https://www.testmuai.com/)). Si se establece, WebdriverIO configurará automáticamente las opciones de conexión por ti. Si no usas un proveedor en la nube, puede utilizarse para autenticar cualquier otro backend de WebDriver.

</Option>

### key

<Option type="String" default="undefined">

Tu clave de acceso o clave secreta del servicio en la nube (solo funciona con cuentas de [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) o [TestMu AI](https://www.testmuai.com/)). Si se establece, WebdriverIO configurará automáticamente las opciones de conexión por ti. Si no usas un proveedor en la nube, puede utilizarse para autenticar cualquier otro backend de WebDriver.

</Option>

### capabilities

<Option type="Object" default="null">

Define las capabilities que quieres ejecutar en tu sesión de WebDriver. Consulta el [Protocolo WebDriver](https://w3c.github.io/webdriver/#capabilities) para más detalles.

Además de las capabilities basadas en WebDriver, puedes aplicar opciones específicas del navegador y del proveedor que permiten una configuración más profunda del navegador o dispositivo remoto. Estas están documentadas en la documentación del proveedor correspondiente, p. ej.:

- `goog:chromeOptions`: para [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: para [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: para [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: para [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: para [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: para [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Además, una utilidad práctica es el [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) de Sauce Labs, que te ayuda a crear este objeto seleccionando con clics las capabilities que deseas.

</Option>
**Ejemplo:**

```js
{
    browserName: 'chrome', // opciones: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // versión del navegador
    platformName: 'Windows 10' // plataforma del SO
}
```

Si estás ejecutando pruebas web o nativas en dispositivos móviles, `capabilities` difiere del protocolo WebDriver. Consulta la [documentación de Appium](https://appium.io/docs/en/latest/guides/caps/) para más detalles.

### logLevel

<Option type="String" default="info" values="trace | debug | info | warn | error | silent">

Nivel de detalle del registro (logging).

</Option>

### outputDir

<Option type="String" default="null">

Directorio donde se almacenan todos los archivos de log del testrunner (incluidos los logs de los reporters y los logs de `wdio`). Si no se establece, todos los logs se envían a `stdout`. Dado que la mayoría de los reporters están diseñados para escribir en `stdout`, se recomienda usar esta opción solo con reporters específicos en los que tenga más sentido volcar el informe en un archivo (como el reporter `junit`, por ejemplo).

Cuando se ejecuta en modo standalone, el único log generado por WebdriverIO será el log de `wdio`.

</Option>

### connectionRetryTimeout

<Option type="Number" default="120000">

Tiempo de espera para cualquier petición de WebDriver a un driver o grid.

</Option>

### connectionRetryCount

<Option type="Number" default="3">

Número máximo de reintentos de peticiones al servidor de Selenium.

</Option>

### bidiResponseTimeout

<Option type="Number" default="180000">

Tiempo de espera (en ms) para que un comando de WebDriver Bidi reciba una respuesta del navegador. Auméntalo si ejecutas comandos, p. ej. [`execute`](/docs/api/browser/execute), que legítimamente tardan más que el valor predeterminado en resolverse; de lo contrario, WebdriverIO deja de esperar antes de que el navegador termine.

</Option>

### agent

<Option type="Object" default={`{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}`}>

Te permite usar un [agent](https://www.npmjs.com/package/got#agent)` http`/`https`/`http2` personalizado para realizar peticiones.

</Option>

### headers

<Option type="Object" default={`{}`}>

Especifica `headers` personalizados que se pasarán en cada petición de WebDriver. Si tu Selenium Grid requiere autenticación básica (Basic Authentication), recomendamos pasar un header `Authorization` mediante esta opción para autenticar tus peticiones de WebDriver, p. ej.:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Leer el nombre de usuario y la contraseña de las variables de entorno
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Combinar el nombre de usuario y la contraseña con dos puntos como separador
const credentials = `${username}:${password}`;
// Codificar las credenciales usando Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

</Option>

### transformRequest

<Option type="(RequestOptions) => RequestOptions" default="none">

Función que intercepta las [opciones de la petición HTTP](https://github.com/sindresorhus/got#options) antes de que se realice una petición de WebDriver

</Option>

### transformResponse

<Option type="(Response, RequestOptions) => Response" default="none">

Función que intercepta los objetos de respuesta HTTP después de que haya llegado una respuesta de WebDriver. La función recibe el objeto de respuesta original como primer argumento y las `RequestOptions` correspondientes como segundo argumento.

</Option>

### strictSSL

<Option type="Boolean" default="true">

Indica si no se requiere que el certificado SSL sea válido.
Puede establecerse mediante variables de entorno como `STRICT_SSL` o `strict_ssl`.

</Option>

### enableDirectConnect

<Option type="Boolean" default="true">

Indica si se habilita la [función de conexión directa de Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
No hace nada si la respuesta no contiene las claves adecuadas mientras la opción está habilitada.

</Option>

### cacheDir

<Option type="String" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

La ruta a la raíz del directorio de caché. Este directorio se usa para almacenar todos los drivers que se descargan al intentar iniciar una sesión.

</Option>

### maskingPatterns

<Option type="String" default="undefined">

Para un registro más seguro, las expresiones regulares establecidas con `maskingPatterns` pueden ocultar información sensible del log.
 - El formato de la cadena es una expresión regular con o sin flags (p. ej. `/.../i`), separadas por comas en el caso de varias expresiones regulares.
 - Para más detalles sobre los patrones de enmascaramiento, consulta la [sección Masking Patterns del README de WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

</Option>
**Ejemplo:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

## WebdriverIO

Las siguientes opciones (incluidas las enumeradas anteriormente) pueden usarse con WebdriverIO en modo standalone:

### automationProtocol

<Option type="String" default="webdriver">

Define el protocolo que quieres usar para la automatización de tu navegador. Actualmente solo se admite [`webdriver`](https://www.npmjs.com/package/webdriver), ya que es la principal tecnología de automatización de navegadores que utiliza WebdriverIO.

Si quieres automatizar el navegador usando una tecnología de automatización diferente, asegúrate de establecer esta propiedad en una ruta que resuelva a un módulo que cumpla con la siguiente interfaz:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Inicia una sesión de automatización y devuelve una [mónada](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts) de WebdriverIO
     * con los comandos de automatización correspondientes. Consulta el paquete [webdriver](https://www.npmjs.com/package/webdriver)
     * como implementación de referencia
     *
     * @param {Capabilities.RemoteConfig} options opciones de WebdriverIO
     * @param {Function} hook que permite modificar el cliente antes de que sea liberado por la función
     * @param {PropertyDescriptorMap} userPrototype permite al usuario añadir comandos de protocolo personalizados
     * @param {Function} customCommandWrapper permite modificar la ejecución de comandos
     * @returns una instancia de cliente compatible con WebdriverIO
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * permite al usuario conectarse a sesiones existentes
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Cambia el id de sesión de la instancia y las capabilities del navegador para la nueva sesión
     * directamente en el objeto browser recibido
     *
     * @optional
     * @param   {object} instance  el objeto que obtenemos de una nueva sesión del navegador.
     * @returns {string}           el nuevo id de sesión del navegador
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

</Option>

### baseUrl

<Option type="String" default="null">

Acorta las llamadas al comando `url` estableciendo una URL base.
- Si tu parámetro `url` empieza con `/`, entonces se antepone `baseUrl` (excepto la ruta de `baseUrl`, si tiene una).
- Si tu parámetro `url` empieza sin esquema ni `/` (como `some/path`), entonces se antepone directamente la `baseUrl` completa.

</Option>

### waitforTimeout

<Option type="Number" default="5000">

Tiempo de espera predeterminado para todos los comandos `waitFor*`. (Fíjate en la `f` minúscula en el nombre de la opción). Este tiempo de espera __solo__ afecta a los comandos que empiezan por `waitFor*` y a su tiempo de espera predeterminado.

Para aumentar el tiempo de espera de una _prueba_, consulta la documentación del framework.

</Option>

### waitforInterval

<Option type="Number" default="100">

Intervalo predeterminado para que todos los comandos `waitFor*` comprueben si un estado esperado (p. ej., la visibilidad) ha cambiado.

</Option>

### strictSelectors

<Option type="Boolean" default="true">

Hace que el comando [`$`](/docs/api/browser/$) lance un `StrictSelectorError` cuando el selector indicado resuelve a más de un elemento, en lugar de usar silenciosamente la primera coincidencia. `$$` no se ve afectado.

Puedes desactivarlo para una única consulta pasando `{ strict: false }` como segundo argumento, p. ej. `$('button', { strict: false })`.

Consulta la guía de [Selectores](/docs/selectors#strict-mode) para más detalles.

</Option>

### maxSpyCollectedBodySize

<Option type="Number" default="10485760 (10MB)">

Tamaño máximo del cuerpo de la respuesta (en bytes) que puede devolverse al usar el comando [`mock`](/docs/api/browser/mock). Usa `0` para desactivar la recopilación de datos del payload espiado.

</Option>

### region

<Option type="String" default="us" values="us | eu | us-west-1 | eu-central-1 | us-east-4 | asia-south-2 | staging">

Si ejecutas en Sauce Labs, puedes elegir ejecutar las pruebas en distintos centros de datos.
Usa los identificadores cortos de región `us` (predeterminado, corresponde a `us-west-1`) o `eu` (corresponde a `eu-central-1`), o directamente los nombres completos de las regiones.

__Nota:__ Esto solo tiene efecto si proporcionas las opciones `user` y `key` vinculadas a tu cuenta de Sauce Labs.

</Option>
*(solo para vm y/o em/simuladores, excepto `us-east-4` y `asia-south-2`, que solo alojan dispositivos reales)*

## Opciones del Testrunner

Las siguientes opciones (incluidas las enumeradas anteriormente) están definidas únicamente para ejecutar WebdriverIO con el testrunner de WDIO:

### specs

<Option type="(String | String[])[]" default="[]">

Define los specs para la ejecución de pruebas. Puedes especificar un patrón glob para coincidir con varios archivos a la vez, o envolver un glob o un conjunto de rutas en un array para ejecutarlos dentro de un único proceso worker. Todas las rutas se consideran relativas a la ruta del archivo de configuración.

</Option>

### exclude

<Option type="String[]" default="[]">

Excluye specs de la ejecución de pruebas. Todas las rutas se consideran relativas a la ruta del archivo de configuración.

</Option>

### suites

<Option type="Object" default={`{}`}>

Un objeto que describe varias suites, que luego puedes especificar con la opción `--suite` en la CLI de `wdio`.

</Option>

### capabilities

<Option type="Object|Object[]" default={`[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`}>

Igual que la sección `capabilities` descrita anteriormente, pero con la opción de especificar un objeto [multi-remote](/docs/multiremote) o varias sesiones de WebDriver en un array para su ejecución en paralelo.

Puedes aplicar las mismas capabilities específicas del proveedor y del navegador definidas [anteriormente](/docs/configuration#capabilities).

</Option>

### maxInstances

<Option type="Number" default="100">

Número máximo total de workers ejecutándose en paralelo.

__Nota:__ puede ser un número tan alto como `100` cuando las pruebas se realizan en proveedores externos, como las máquinas de Sauce Labs. Allí, las pruebas no se ejecutan en una sola máquina, sino en varias VMs. Si las pruebas se van a ejecutar en una máquina de desarrollo local, usa un número más razonable, como `3`, `4` o `5`. Básicamente, este es el número de navegadores que se iniciarán simultáneamente y ejecutarán tus pruebas al mismo tiempo, por lo que depende de cuánta RAM tenga tu máquina y de cuántas otras aplicaciones se estén ejecutando en ella.

También puedes aplicar `maxInstances` dentro de tus objetos de capabilities usando la capability `wdio:maxInstances`. Esto limitará la cantidad de sesiones en paralelo para esa capability en particular.

</Option>

### maxInstancesPerCapability

<Option type="Number" default="100">

Número máximo total de workers ejecutándose en paralelo por capability.

</Option>

### injectGlobals

<Option type="Boolean" default="true">

Inserta las variables globales de WebdriverIO (p. ej. `browser`, `$` y `$$`) en el entorno global.
Si lo estableces en `false`, deberás importarlas desde `@wdio/globals`, p. ej.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Nota: WebdriverIO no gestiona la inyección de variables globales específicas del framework de pruebas.

</Option>

### bail

<Option type="Number" default="0 (don't bail; run all tests)">

Si quieres que la ejecución de pruebas se detenga después de un número específico de fallos, usa `bail`.
(Por defecto es `0`, lo que ejecuta todas las pruebas pase lo que pase). **Nota:** En este contexto, una prueba son todas las pruebas dentro de un único archivo spec (al usar Mocha o Jasmine) o todos los pasos dentro de un archivo feature (al usar Cucumber). Si quieres controlar el comportamiento de bail dentro de las pruebas de un único archivo, consulta las opciones disponibles del [framework](frameworks).

</Option>

### specFileRetries

<Option type="Number" default="0">

El número de veces que se reintenta un archivo spec completo cuando falla en su conjunto.

</Option>

### specFileRetriesDelay

<Option type="Number" default="0">

Retraso en segundos entre los reintentos del archivo spec

</Option>

### specFileRetriesDeferred

<Option type="Boolean" default="true">

Indica si los archivos spec reintentados deben reintentarse inmediatamente o aplazarse hasta el final de la cola.

</Option>

### groupLogsByTestSpec

<Option type="Boolean" default="false">

Elige la vista de salida de los logs.

Si se establece en `false`, los logs de distintos archivos de prueba se mostrarán en tiempo real. Ten en cuenta que esto puede provocar que se mezclen las salidas de logs de distintos archivos al ejecutar en paralelo.

Si se establece en `true`, las salidas de logs se agruparán por Test Spec y se mostrarán solo cuando el Test Spec haya finalizado.

Por defecto, está establecido en `false`, por lo que los logs se muestran en tiempo real.

</Option>

### autoAssertOnTestEnd

<Option type="Boolean" default="true">

Controla si WebdriverIO comprueba automáticamente todas las aserciones suaves (soft assertions) al final de cada prueba. Cuando se establece en `true`, cualquier aserción suave acumulada se comprobará automáticamente y hará que la prueba falle si alguna aserción ha fallado. Cuando se establece en `false`, debes llamar manualmente al método assert para comprobar las aserciones suaves.

</Option>

### services

<Option type="String[]|Object[]" default="[]">

Los servicios se encargan de una tarea específica de la que no quieres ocuparte. Mejoran tu configuración de pruebas casi sin esfuerzo.

</Option>

### framework

<Option type="String" default="mocha" values="mocha | jasmine | cucumber">

Define el framework de pruebas que utilizará el testrunner de WDIO.

</Option>

### mochaOpts, jasmineOpts y cucumberOpts

<Option type="Object" default={`{ timeout: 10000 }`}>

Opciones específicas relacionadas con el framework. Consulta la documentación del adaptador del framework para ver qué opciones están disponibles. Lee más sobre esto en [Frameworks](frameworks).

</Option>

### cucumberFeaturesWithLineNumbers

<Option type="String[]" default="[]">

Lista de features de cucumber con números de línea (al [usar el framework cucumber](./Frameworks.md#using-cucumber)).

</Option>

### reporters

<Option type="String[]|Object[]" default="[]">

Lista de reporters a utilizar. Un reporter puede ser una cadena o un array del tipo
`['reporterName', { /* reporter options */}]`, donde el primer elemento es una cadena con el nombre del reporter y el segundo elemento es un objeto con las opciones del reporter.

</Option>
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

<Option type="Number" default="100 (ms)">

Determina el intervalo en el que los reporters deben comprobar si están sincronizados, en caso de que reporten sus logs de forma asíncrona (p. ej., si los logs se transmiten a un proveedor externo).

</Option>

### reporterSyncTimeout

<Option type="Number" default="5000 (ms)">

Determina el tiempo máximo que tienen los reporters para terminar de subir todos sus logs antes de que el testrunner lance un error.

</Option>

### execArgv

<Option type="String[]" default="null">

Argumentos de Node que se especifican al lanzar procesos hijos.

</Option>

### cpuProf

<Option type="Boolean" default="false">

Habilita el perfilado de CPU para el proceso worker. El perfil se generará automáticamente cuando el proceso worker finalice.

</Option>

### heapProf

<Option type="Boolean" default="false">

Habilita el perfilado del Heap para el proceso worker. La instantánea se generará automáticamente cuando el proceso worker finalice (usa el perfilador de heap por muestreo).

</Option>

### profileOutputDir

<Option type="String" default="./profiles">

Directorio donde se guardarán los perfiles de CPU (`.cpuprofile`) y los perfiles de Heap (`.heapprofile`).

</Option>

### filesToWatch

<Option type="String[]" default="[]">

Una lista de patrones de cadena compatibles con glob que indican al testrunner que vigile adicionalmente otros archivos, p. ej. archivos de la aplicación, al ejecutarlo con el flag `--watch`. Por defecto, el testrunner ya vigila todos los archivos spec.

</Option>

### updateSnapshots

<Option type="'new' | 'all' | 'none'" default="none if not provided and tests run in CI, new if not provided, otherwise what's been provided">

Establécelo en true si quieres actualizar tus snapshots. Idealmente se usa como parte de un parámetro de la CLI, p. ej. `wdio run wdio.conf.js --s`.

</Option>

### resolveSnapshotPath

<Option type="(testPath: string, snapExtension: string) => string" default="stores snapshot files in __snapshots__ directory next to test file">

Sobrescribe la ruta predeterminada de los snapshots. Por ejemplo, para almacenar los snapshots junto a los archivos de prueba.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

</Option>

### tsConfigPath

<Option type="String" default="null">

WDIO usa `tsx` para compilar archivos TypeScript. Tu TSConfig se detecta automáticamente desde el directorio de trabajo actual, pero puedes especificar una ruta personalizada aquí o estableciendo la variable de entorno TSX_TSCONFIG_PATH.

Consulta la documentación de `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

</Option>

### displayServerEnabled

<Option type="Boolean" default="true">

Inicia una pantalla virtual para la ejecución en Linux cuando no están establecidas ni `DISPLAY` ni `WAYLAND_DISPLAY`. Establécelo en `false` cuando ejecutes en modo headless o solo en un servicio en la nube o grid remoto. Solo controla si se inicia un servidor de pantalla: si solo está establecida `WAYLAND_DISPLAY`, el testrunner sigue estableciendo `XDG_SESSION_TYPE`, `GDK_BACKEND` y `ELECTRON_OZONE_PLATFORM_HINT` en `wayland` para la ejecución. Consulta [Headless y servidores de pantalla](/docs/headless-and-display-servers).

</Option>

### displayServer

<Option type="String" default="auto" values="auto | wayland | xvfb">

Qué servidor de pantalla iniciar. `auto` intenta usar Weston y recurre a Xvfb cuando Weston no está disponible o no logra iniciarse. `wayland` y `xvfb` solo intentan ese servidor.

</Option>

### displayServerAutoInstall

<Option type="Boolean" default="false">

Instala un servidor de pantalla que falte con el gestor de paquetes del sistema cuando ninguno de los instalados logra iniciarse.

</Option>

### displayServerAutoInstallMode

<Option type="String" default="sudo" values="root | sudo">

Cómo se ejecuta la instalación integrada: `root` instala solo cuando se ejecuta como root; `sudo` usa `sudo -n` no interactivo cuando no se es root, o instala sin él cuando `sudo` no está instalado.

</Option>

### displayServerAutoInstallCommand

<Option type="String | String[]">

Un comando que se ejecuta en lugar de la instalación integrada, tal cual y sin `sudo`. Solo se ejecuta con `displayServerAutoInstall: true`. Una cadena se ejecuta en un shell; un array se ejecuta sin él. Con `auto`, se ejecuta primero para Weston, y de nuevo para Xvfb solo si Weston sigue sin estar disponible o no logra iniciarse, y Xvfb sigue sin estar instalado. Establece `displayServer` en el servidor que instala para omitir el intento con el otro servidor.

</Option>

### displayServerWidth

<Option type="Number" default="1920">

Ancho de pantalla de la pantalla virtual en píxeles.

</Option>

### displayServerHeight

<Option type="Number" default="1080">

Alto de pantalla de la pantalla virtual en píxeles.

</Option>

### displayServerDepth

<Option type="Number" default="24">

Profundidad de color de la pantalla virtual. Solo para Xvfb.

</Option>

## Hooks

El testrunner de WDIO te permite establecer hooks que se activan en momentos específicos del ciclo de vida de las pruebas. Esto permite realizar acciones personalizadas (p. ej., tomar una captura de pantalla si una prueba falla).

Cada hook recibe como parámetro información específica sobre el ciclo de vida (p. ej., información sobre la suite de pruebas o la prueba). Lee más sobre todas las propiedades de los hooks en [nuestra configuración de ejemplo](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Nota:** Algunos hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` y `onComplete`) se ejecutan en un proceso diferente y, por lo tanto, no pueden compartir datos globales con los demás hooks que se ejecutan en el proceso worker.

### onPrepare

Se ejecuta una vez antes de que se lancen todos los workers.

Parámetros:

- `config` (`object`): objeto de configuración de WebdriverIO
- `param` (`object[]`): lista de detalles de las capabilities

### onWorkerStart

Se ejecuta antes de que se cree un proceso worker y puede usarse para inicializar un servicio específico para ese worker, así como para modificar los entornos de ejecución de forma asíncrona.

Parámetros:

- `cid` (`string`): id de la capability (p. ej. 0-0)
- `caps` (`object`): contiene las capabilities de la sesión que se creará en el worker
- `specs` (`string[]`): specs que se ejecutarán en el proceso worker
- `args` (`object`): objeto que se fusionará con la configuración principal una vez que el worker se inicialice
- `execArgv` (`string[]`): lista de argumentos en forma de cadena que se pasan al proceso worker

### onWorkerEnd

Se ejecuta justo después de que un proceso worker haya finalizado.

Parámetros:

- `cid` (`string`): id de la capability (p. ej. 0-0)
- `exitCode` (`number`): 0 - éxito, 1 - fallo. Un worker que fue terminado por una señal reporta `128` + el número de la señal, p. ej. `139` para un `SIGSEGV`
- `specs` (`string[]`): specs que se ejecutarán en el proceso worker
- `retries` (`number`): número de reintentos a nivel de spec utilizados, tal como se define en [_"Añadir reintentos por archivo spec"_](./Retry.md#add-retries-on-a-per-specfile-basis)
- `signal` (`string`): señal que terminó el worker, p. ej. `SIGSEGV`, o `null` si finalizó por sí mismo

### beforeSession

Se ejecuta justo antes de inicializar la sesión de webdriver y el framework de pruebas. Te permite manipular configuraciones en función de la capability o del spec.

Parámetros:

- `config` (`object`): objeto de configuración de WebdriverIO
- `caps` (`object`): contiene las capabilities de la sesión que se creará en el worker
- `specs` (`string[]`): specs que se ejecutarán en el proceso worker

### before

Se ejecuta antes de que comience la ejecución de las pruebas. En este punto puedes acceder a todas las variables globales como `browser`. Es el lugar perfecto para definir comandos personalizados.

Parámetros:

- `caps` (`object`): contiene las capabilities de la sesión que se creará en el worker
- `specs` (`string[]`): specs que se ejecutarán en el proceso worker
- `browser` (`object`): instancia de la sesión de navegador/dispositivo creada

### beforeSuite

Hook que se ejecuta antes de que comience la suite (solo en Mocha/Jasmine)

Parámetros:

- `suite` (`object`): detalles de la suite

### beforeHook

Hook que se ejecuta *antes* de que comience un hook dentro de la suite (p. ej., se ejecuta antes de llamar a beforeEach en Mocha)

Parámetros:

- `test` (`object`): detalles de la prueba
- `context` (`object`): contexto de la prueba (representa el objeto World en Cucumber)

### afterHook

Hook que se ejecuta *después* de que termine un hook dentro de la suite (p. ej., se ejecuta después de llamar a afterEach en Mocha)

Parámetros:

- `test` (`object`): detalles de la prueba
- `context` (`object`): contexto de la prueba (representa el objeto World en Cucumber)
- `result` (`object`): resultado del hook (contiene las propiedades `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Función que se ejecuta antes de una prueba (solo en Mocha/Jasmine).

Parámetros:

- `test` (`object`): detalles de la prueba
- `context` (`object`): objeto de ámbito con el que se ejecutó la prueba

### beforeCommand

Se ejecuta antes de que se ejecute un comando de WebdriverIO.

Parámetros:

- `commandName` (`string`): nombre del comando
- `args` (`*`): argumentos que recibiría el comando

### afterCommand

Se ejecuta después de que se ejecute un comando de WebdriverIO.

Parámetros:

- `commandName` (`string`): nombre del comando
- `args` (`*`): argumentos que recibiría el comando
- `result` (`*`): resultado del comando
- `error` (`Error`): objeto de error, si lo hay

### afterTest

Función que se ejecuta después de que termine una prueba (en Mocha/Jasmine).

Parámetros:

- `test` (`object`): detalles de la prueba
- `context` (`object`): objeto de ámbito con el que se ejecutó la prueba
- `result.error` (`Error`): objeto de error en caso de que la prueba falle; de lo contrario, `undefined`
- `result.result` (`Any`): objeto devuelto por la función de prueba
- `result.duration` (`Number`): duración de la prueba
- `result.passed` (`Boolean`): true si la prueba ha pasado; de lo contrario, false
- `result.retries` (`Object`): información sobre los reintentos de una prueba individual, tal como se define para [Mocha y Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) así como para [Cucumber](./Retry.md#rerunning-in-cucumber), p. ej. `{ attempts: 0, limit: 0 }`, ver
- `result` (`object`): resultado del hook (contiene las propiedades `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook que se ejecuta después de que la suite haya terminado (solo en Mocha/Jasmine)

Parámetros:

- `suite` (`object`): detalles de la suite

### after

Se ejecuta después de que todas las pruebas hayan terminado. Todavía tienes acceso a todas las variables globales de la prueba.

Parámetros:

- `result` (`number`): 0 - la prueba pasa, 1 - la prueba falla
- `caps` (`object`): contiene las capabilities de la sesión que se creará en el worker
- `specs` (`string[]`): specs que se ejecutarán en el proceso worker

### afterSession

Se ejecuta justo después de terminar la sesión de webdriver.

Parámetros:

- `config` (`object`): objeto de configuración de WebdriverIO
- `caps` (`object`): contiene las capabilities de la sesión que se creará en el worker
- `specs` (`string[]`): specs que se ejecutarán en el proceso worker

### onComplete

Se ejecuta después de que todos los workers se hayan cerrado y el proceso esté a punto de finalizar. Un error lanzado en el hook onComplete hará que la ejecución de pruebas falle.

Parámetros:

- `exitCode` (`number`): 0 - éxito, 1 - fallo
- `config` (`object`): objeto de configuración de WebdriverIO
- `caps` (`object`): contiene las capabilities de la sesión que se creará en el worker
- `result` (`object`): objeto de resultados que contiene los resultados de las pruebas

### onReload

Se ejecuta cuando se produce una recarga.

Parámetros:

- `oldSessionId` (`string`): ID de sesión de la sesión anterior
- `newSessionId` (`string`): ID de sesión de la nueva sesión

### beforeFeature

Se ejecuta antes de una Feature de Cucumber.

Parámetros:

- `uri` (`string`): ruta al archivo feature
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): objeto feature de Cucumber

### afterFeature

Se ejecuta después de una Feature de Cucumber.

Parámetros:

- `uri` (`string`): ruta al archivo feature
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): objeto feature de Cucumber

### beforeScenario

Se ejecuta antes de un Scenario de Cucumber.

Parámetros:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): objeto world que contiene información sobre el pickle y el paso de prueba
- `context` (`object`): objeto World de Cucumber

### afterScenario

Se ejecuta después de un Scenario de Cucumber.

Parámetros:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): objeto world que contiene información sobre el pickle y el paso de prueba
- `result` (`object`): objeto de resultados que contiene los resultados del escenario
- `result.passed` (`boolean`): true si el escenario ha pasado
- `result.error` (`string`): stack del error si el escenario ha fallado
- `result.duration` (`number`): duración del escenario en milisegundos
- `context` (`object`): objeto World de Cucumber

### beforeStep

Se ejecuta antes de un Step de Cucumber.

Parámetros:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): objeto step de Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): objeto scenario de Cucumber
- `context` (`object`): objeto World de Cucumber

### afterStep

Se ejecuta después de un Step de Cucumber.

Parámetros:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): objeto step de Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): objeto scenario de Cucumber
- `result`: (`object`): objeto de resultados que contiene los resultados del paso
- `result.passed` (`boolean`): true si el escenario ha pasado
- `result.error` (`string`): stack del error si el escenario ha fallado
- `result.duration` (`number`): duración del escenario en milisegundos
- `context` (`object`): objeto World de Cucumber

### beforeAssertion

Hook que se ejecuta antes de que se produzca una aserción de WebdriverIO.

Parámetros:

- `params`: información de la aserción
- `params.matcherName` (`string`): nombre del matcher que llamó la prueba (p. ej. `toHaveTitle`). En el caso de un alias, es el nombre del alias (p. ej. `toBeExisting`, no `toExist`).
- `params.expectedValue`: valor que se pasa al matcher
- `params.options`: opciones de la aserción

### afterAssertion

Hook que se ejecuta después de que se haya producido una aserción de WebdriverIO.

Parámetros:

- `params`: información de la aserción
- `params.matcherName` (`string`): nombre del matcher que llamó la prueba (p. ej. `toHaveTitle`). En el caso de un alias, es el nombre del alias (p. ej. `toBeExisting`, no `toExist`).
- `params.expectedValue`: valor que se pasa al matcher
- `params.options`: opciones de la aserción
- `params.result` (`object`): resultado del matcher, con `pass` (`boolean`) y `message()`. `pass` es `true` cuando el valor coincide con el valor esperado, también con `.not`: con `.not`, la aserción pasa cuando `pass` es `false`.