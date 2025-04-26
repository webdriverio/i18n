---
id: configuration
title: Configuración
---

Según el [tipo de configuración](/docs/setuptypes) (por ejemplo, usando los enlaces de protocolo sin procesar, WebdriverIO como paquete independiente o el ejecutor de pruebas WDIO) hay un conjunto diferente de opciones disponibles para controlar el entorno.

## Opciones de WebDriver

Las siguientes opciones se definen al usar el paquete de protocolo [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

Protocolo a utilizar al comunicarse con el servidor del controlador.

Tipo: `String`<br />
Predeterminado: `http`

### hostname

Host de tu servidor de controlador.

Tipo: `String`<br />
Predeterminado: `0.0.0.0`

### port

Puerto en el que está tu servidor de controlador.

Tipo: `Number`<br />
Predeterminado: `undefined`

### path

Ruta al punto final del servidor del controlador.

Tipo: `String`<br />
Predeterminado: `/`

### queryParams

Parámetros de consulta que se propagan al servidor del controlador.

Tipo: `Object`<br />
Predeterminado: `undefined`

### user

Tu nombre de usuario del servicio en la nube (solo funciona para cuentas de [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) o [LambdaTest](https://www.lambdatest.com)). Si se establece, WebdriverIO configurará automáticamente las opciones de conexión para ti. Si no utilizas un proveedor en la nube, esto se puede utilizar para autenticar cualquier otro backend de WebDriver.

Tipo: `String`<br />
Predeterminado: `undefined`

### key

Tu clave de acceso o clave secreta del servicio en la nube (solo funciona para cuentas de [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) o [LambdaTest](https://www.lambdatest.com)). Si se establece, WebdriverIO configurará automáticamente las opciones de conexión para ti. Si no utilizas un proveedor en la nube, esto se puede utilizar para autenticar cualquier otro backend de WebDriver.

Tipo: `String`<br />
Predeterminado: `undefined`

### capabilities

Define las capacidades que deseas ejecutar en tu sesión de WebDriver. Consulta el [Protocolo WebDriver](https://w3c.github.io/webdriver/#capabilities) para más detalles. Si ejecutas un controlador más antiguo que no admite el protocolo WebDriver, deberás utilizar las [capacidades de JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) para ejecutar correctamente una sesión.

Además de las capacidades basadas en WebDriver, puedes aplicar opciones específicas del navegador y del proveedor que permiten una configuración más profunda del navegador remoto o dispositivo. Estas están documentadas en los documentos del proveedor correspondiente, por ejemplo:

- `goog:chromeOptions`: para [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: para [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: para [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: para [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: para [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: para [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Además, una utilidad útil es el [Configurador de Pruebas Automatizadas](https://docs.saucelabs.com/basics/platform-configurator/) de Sauce Labs, que te ayuda a crear este objeto haciendo clic en tus capacidades deseadas.

Tipo: `Object`<br />
Predeterminado: `null`

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

Tipo: `String`<br />
Predeterminado: `info`<br />
Opciones: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Directorio para almacenar todos los archivos de registro del ejecutor de pruebas (incluidos los registros del reportero y los registros de `wdio`). Si no se establece, todos los registros se transmiten a `stdout`. Dado que la mayoría de los reporteros están hechos para registrar en `stdout`, se recomienda usar esta opción solo para reporteros específicos donde tiene más sentido enviar el informe a un archivo (como el reportero `junit`, por ejemplo).

Al ejecutar en modo independiente, el único registro generado por WebdriverIO será el registro `wdio`.

Tipo: `String`<br />
Predeterminado: `null`

### connectionRetryTimeout

Tiempo de espera para cualquier solicitud de WebDriver a un controlador o grid.

Tipo: `Number`<br />
Predeterminado: `120000`

### connectionRetryCount

Número máximo de reintentos de solicitud al servidor de Selenium.

Tipo: `Number`<br />
Predeterminado: `3`

### agent

Te permite usar un agente personalizado `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) para realizar solicitudes.

Tipo: `Object`<br />
Predeterminado:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Especifica `headers` personalizados para pasar en cada solicitud de WebDriver. Si tu Selenium Grid requiere Autenticación Básica, recomendamos pasar un encabezado `Authorization` a través de esta opción para autenticar tus solicitudes de WebDriver, por ejemplo:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Lee el nombre de usuario y la contraseña de las variables de entorno
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Combina el nombre de usuario y la contraseña con un separador de dos puntos
const credentials = `${username}:${password}`;
// Codifica las credenciales usando Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

Tipo: `Object`<br />
Predeterminado: `{}`

### transformRequest

Función que intercepta las [opciones de solicitud HTTP](https://github.com/sindresorhus/got#options) antes de realizar una solicitud WebDriver

Tipo: `(RequestOptions) => RequestOptions`<br />
Predeterminado: *ninguno*

### transformResponse

Función que intercepta objetos de respuesta HTTP después de que ha llegado una respuesta de WebDriver. La función recibe el objeto de respuesta original como primer argumento y las `RequestOptions` correspondientes como segundo argumento.

Tipo: `(Response, RequestOptions) => Response`<br />
Predeterminado: *ninguno*

### strictSSL

Si no requiere que el certificado SSL sea válido.
Se puede configurar a través de variables de entorno como `STRICT_SSL` o `strict_ssl`.

Tipo: `Boolean`<br />
Predeterminado: `true`

### enableDirectConnect

Si habilita la [función de conexión directa de Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
No hace nada si la respuesta no tiene las claves adecuadas mientras la bandera está habilitada.

Tipo: `Boolean`<br />
Predeterminado: `true`

### cacheDir

La ruta a la raíz del directorio de caché. Este directorio se utiliza para almacenar todos los controladores que se descargan al intentar iniciar una sesión.

Tipo: `String`<br />
Predeterminado: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

---

## WebdriverIO

Las siguientes opciones (incluidas las enumeradas anteriormente) se pueden usar con WebdriverIO de forma independiente:

### automationProtocol

Define el protocolo que deseas usar para la automatización de tu navegador. Actualmente solo se admite [`webdriver`](https://www.npmjs.com/package/webdriver), ya que es la principal tecnología de automatización de navegadores que utiliza WebdriverIO.

Si deseas automatizar el navegador utilizando una tecnología de automatización diferente, asegúrate de establecer esta propiedad en una ruta que resuelva a un módulo que se adhiera a la siguiente interfaz:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Inicia una sesión de automatización y devuelve una [mónada](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts) de WebdriverIO
     * con los respectivos comandos de automatización. Consulta el paquete [webdriver](https://www.npmjs.com/package/webdriver)
     * como implementación de referencia
     *
     * @param {Capabilities.RemoteConfig} options Opciones de WebdriverIO
     * @param {Function} hook que permite modificar el cliente antes de que se libere de la función
     * @param {PropertyDescriptorMap} userPrototype permite al usuario agregar comandos de protocolo personalizados
     * @param {Function} customCommandWrapper permite modificar la ejecución del comando
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
     * Cambia el ID de sesión de la instancia y las capacidades del navegador para la nueva sesión
     * directamente en el objeto del navegador pasado
     *
     * @optional
     * @param   {object} instance  el objeto que obtenemos de una nueva sesión de navegador.
     * @returns {string}           el nuevo ID de sesión del navegador
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

Tipo: `String`<br />
Predeterminado: `webdriver`

### baseUrl

Acorta las llamadas al comando `url` estableciendo una URL base.
- Si tu parámetro `url` comienza con `/`, entonces se antepone `baseUrl` (excepto la ruta `baseUrl`, si tiene una).
- Si tu parámetro `url` comienza sin un esquema o `/` (como `some/path`), entonces se antepone directamente el `baseUrl` completo.

Tipo: `String`<br />
Predeterminado: `null`

### waitforTimeout

Tiempo de espera predeterminado para todos los comandos `waitFor*`. (Ten en cuenta la `f` minúscula en el nombre de la opción). Este tiempo de espera __solo__ afecta a los comandos que comienzan con `waitFor*` y su tiempo de espera predeterminado.

Para aumentar el tiempo de espera de una _prueba_, consulta la documentación del framework.

Tipo: `Number`<br />
Predeterminado: `5000`

### waitforInterval

Intervalo predeterminado para todos los comandos `waitFor*` para verificar si un estado esperado (por ejemplo, visibilidad) ha cambiado.

Tipo: `Number`<br />
Predeterminado: `100`

### region

Si ejecutas en Sauce Labs, puedes elegir ejecutar pruebas entre diferentes centros de datos: US o EU.
Para cambiar tu región a EU, agrega `region: 'eu'` a tu configuración.

__Nota:__ Esto solo tiene efecto si proporcionas opciones de `user` y `key` que están conectadas a tu cuenta de Sauce Labs.

Tipo: `String`<br />
Predeterminado: `us`

*(solo para vm y/o em/simuladores)*

---

## Opciones del Ejecutor de Pruebas

Las siguientes opciones (incluidas las enumeradas anteriormente) se definen solo para ejecutar WebdriverIO con el ejecutor de pruebas WDIO:

### specs

Define las especificaciones para la ejecución de pruebas. Puedes especificar un patrón glob para hacer coincidir varios archivos a la vez o envolver un glob o conjunto de rutas en una matriz para ejecutarlos dentro de un solo proceso de trabajo. Todas las rutas se consideran relativas a la ruta del archivo de configuración.

Tipo: `(String | String[])[]`<br />
Predeterminado: `[]`

### exclude

Excluye especificaciones de la ejecución de pruebas. Todas las rutas se consideran relativas a la ruta del archivo de configuración.

Tipo: `String[]`<br />
Predeterminado: `[]`

### suites

Un objeto que describe varias suites, que luego puedes especificar con la opción `--suite` en la CLI `wdio`.

Tipo: `Object`<br />
Predeterminado: `{}`

### capabilities

Lo mismo que la sección `capabilities` descrita anteriormente, excepto con la opción de especificar un objeto [`multiremote`](/docs/multiremote), o múltiples sesiones de WebDriver en una matriz para ejecución paralela.

Puedes aplicar las mismas capacidades específicas del proveedor y del navegador como se define [arriba](/docs/configuration#capabilities).

Tipo: `Object`|`Object[]`<br />
Predeterminado: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Número máximo total de trabajadores paralelos en ejecución.

__Nota:__ que puede ser un número tan alto como `100`, cuando las