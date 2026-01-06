---
id: capabilities
title: Capacidades
---

Una capacidad es una definición para una interfaz remota. Ayuda a WebdriverIO a entender en qué navegador o entorno móvil deseas ejecutar tus pruebas. Las capacidades son menos cruciales cuando desarrollas pruebas localmente, ya que las ejecutas en una interfaz remota la mayoría del tiempo, pero se vuelven más importantes al ejecutar un gran conjunto de pruebas de integración en CI/CD.

:::info

El formato de un objeto de capacidad está bien definido por la [especificación WebDriver](https://w3c.github.io/webdriver/#capabilities). El ejecutor de pruebas de WebdriverIO fallará tempranamente si las capacidades definidas por el usuario no cumplen con esa especificación.

:::

## Capacidades personalizadas

Aunque la cantidad de capacidades fijas definidas es muy baja, cualquiera puede proporcionar y aceptar capacidades personalizadas que son específicas del controlador de automatización o interfaz remota:

### Extensiones de capacidades específicas del navegador

- `goog:chromeOptions`: Extensiones de [Chromedriver](https://chromedriver.chromium.org/capabilities), solo aplicables para pruebas en Chrome
- `moz:firefoxOptions`: Extensiones de [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), solo aplicables para pruebas en Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) para especificar el entorno al usar EdgeDriver para probar Chromium Edge

### Extensiones de capacidades de proveedores en la nube

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- y muchas más...

### Extensiones de capacidades del motor de automatización

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- y muchas más...

### Capacidades de WebdriverIO para gestionar opciones de controlador de navegador

WebdriverIO administra la instalación y ejecución del controlador del navegador por ti. WebdriverIO utiliza una capacidad personalizada que te permite pasar parámetros al controlador.

#### `wdio:chromedriverOptions`

Opciones específicas pasadas a Chromedriver al iniciarlo.

#### `wdio:geckodriverOptions`

Opciones específicas pasadas a Geckodriver al iniciarlo.

#### `wdio:edgedriverOptions`

Opciones específicas pasadas a Edgedriver al iniciarlo.

#### `wdio:safaridriverOptions`

Opciones específicas pasadas a Safari al iniciarlo.

#### `wdio:maxInstances`

Número máximo de trabajadores paralelos en ejecución para el navegador/capacidad específica. Tiene prioridad sobre [maxInstances](#configuration#maxInstances) y [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Tipo: `number`

#### `wdio:specs`

Define especificaciones para la ejecución de pruebas para ese navegador/capacidad. Igual que la [opción de configuración regular `specs`](configuration#specs), pero específica para el navegador/capacidad. Tiene prioridad sobre `specs`.

Tipo: `(String | String[])[]`

#### `wdio:exclude`

Excluye especificaciones de la ejecución de pruebas para ese navegador/capacidad. Igual que la [opción de configuración regular `exclude`](configuration#exclude), pero específica para el navegador/capacidad. Se excluye después de aplicar la opción de configuración global `exclude`.

Tipo: `String[]`

#### `wdio:enforceWebDriverClassic`

Por defecto, WebdriverIO intenta establecer una sesión WebDriver Bidi. Si no prefieres eso, puedes establecer esta bandera para desactivar este comportamiento.

Tipo: `boolean`

#### Opciones comunes de controlador

Aunque todos los controladores ofrecen diferentes parámetros para la configuración, hay algunos comunes que WebdriverIO entiende y utiliza para configurar tu controlador o navegador:

##### `cacheDir`

La ruta a la raíz del directorio de caché. Este directorio se utiliza para almacenar todos los controladores que se descargan al intentar iniciar una sesión.

Tipo: `string`<br />
Predeterminado: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Ruta a un binario de controlador personalizado. Si se establece, WebdriverIO no intentará descargar un controlador, sino que utilizará el proporcionado por esta ruta. Asegúrate de que el controlador sea compatible con el navegador que estás utilizando.

Puedes proporcionar esta ruta a través de las variables de entorno `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` o `EDGEDRIVER_PATH`.

Tipo: `string`

:::caution

Si se establece el `binary` del controlador, WebdriverIO no intentará descargar un controlador, sino que utilizará el proporcionado por esta ruta. Asegúrate de que el controlador sea compatible con el navegador que estás utilizando.

:::

#### Opciones de controlador específicas del navegador

Para propagar opciones al controlador, puedes utilizar las siguientes capacidades personalizadas:

- Chrome o Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Egde: `wdio:edgedriverOptions`
- Safari: `wdio:safaridriverOptions`

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'wdio:chromedriverOptions', value: 'chrome'},
    {label: 'wdio:geckodriverOptions', value: 'firefox'},
    {label: 'wdio:edgedriverOptions', value: 'msedge'},
    {label: 'wdio:safaridriverOptions', value: 'safari'},
  ]
}>
<TabItem value="chrome">

##### adbPort
El puerto en el que debe ejecutarse el controlador ADB.

Ejemplo: `9515`

Tipo: `number`

##### urlBase
Prefijo de ruta de URL base para comandos, p. ej. `wd/url`.

Ejemplo: `/`

Tipo: `string`

##### logPath
Escribe el registro del servidor en un archivo en lugar de stderr, aumenta el nivel de registro a `INFO`

Tipo: `string`

##### logLevel
Establece el nivel de registro. Opciones posibles `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Tipo: `string`

##### verbose
Registrar detalladamente (equivalente a `--log-level=ALL`)

Tipo: `boolean`

##### silent
No registrar nada (equivalente a `--log-level=OFF`)

Tipo: `boolean`

##### appendLog
Añadir al archivo de registro en lugar de reescribirlo.

Tipo: `boolean`

##### replayable
Registrar detalladamente y no truncar cadenas largas para que el registro pueda reproducirse (experimental).

Tipo: `boolean`

##### readableTimestamp
Añadir marcas de tiempo legibles al registro.

Tipo: `boolean`

##### enableChromeLogs
Mostrar registros del navegador (anula otras opciones de registro).

Tipo: `boolean`

##### bidiMapperPath
Ruta de mapeador bidi personalizado.

Tipo: `string`

##### allowedIps
Lista de direcciones IP remotas permitidas separadas por comas que pueden conectarse a EdgeDriver.

Tipo: `string[]`<br />
Predeterminado: `['']`

##### allowedOrigins
Lista de orígenes de solicitudes permitidos separados por comas que pueden conectarse a EdgeDriver. ¡Usar `*` para permitir cualquier origen de host es peligroso!

Tipo: `string[]`<br />
Predeterminado: `['*']`

##### spawnOpts
Opciones para pasar al proceso del controlador.

Tipo: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
Predeterminado: `undefined`

</TabItem>
<TabItem value="firefox">

Consulta todas las opciones de Geckodriver en el [paquete de controlador](https://github.com/webdriverio-community/node-geckodriver#options) oficial.

</TabItem>
<TabItem value="msedge">

Consulta todas las opciones de Edgedriver en el [paquete de controlador](https://github.com/webdriverio-community/node-edgedriver#options) oficial.

</TabItem>
<TabItem value="safari">

Consulta todas las opciones de Safaridriver en el [paquete de controlador](https://github.com/webdriverio-community/node-safaridriver#options) oficial.

</TabItem>
</Tabs>

## Capacidades especiales para casos de uso específicos

Esta es una lista de ejemplos que muestran qué capacidades deben aplicarse para lograr un caso de uso determinado.

### Ejecutar navegador sin interfaz gráfica (headless)

Ejecutar un navegador sin interfaz gráfica significa ejecutar una instancia del navegador sin ventana o interfaz de usuario. Esto se utiliza principalmente en entornos CI/CD donde no se utiliza ninguna pantalla. Para ejecutar un navegador en modo sin interfaz gráfica, aplica las siguientes capacidades:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

```ts
{
    browserName: 'chrome',   // o 'chromium'
    'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
    }
}
```

</TabItem>
<TabItem value="firefox">

```ts
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: ['-headless']
    }
```

</TabItem>
<TabItem value="msedge">

```ts
    browserName: 'msedge',
    'ms:edgeOptions': {
        args: ['--headless']
    }
```

</TabItem>
<TabItem value="safari">

Parece que Safari [no admite](https://discussions.apple.com/thread/251837694) ejecutarse en modo sin interfaz gráfica.

</TabItem>
</Tabs>

### Automatizar diferentes canales de navegador

Si deseas probar una versión de navegador que aún no se ha lanzado como estable, por ejemplo, Chrome Canary, puedes hacerlo estableciendo capacidades y apuntando al navegador que deseas iniciar, por ejemplo:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

Cuando se realizan pruebas en Chrome, WebdriverIO descargará automáticamente la versión del navegador y el controlador deseados según el `browserVersion` definido, por ejemplo:

```ts
{
    browserName: 'chrome', // o 'chromium'
    browserVersion: '116' // o '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' o 'latest' (igual que 'canary')
}
```

Si deseas probar un navegador descargado manualmente, puedes proporcionar una ruta binaria al navegador mediante:

```ts
{
    browserName: 'chrome',  // o 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Además, si deseas utilizar un controlador descargado manualmente, puedes proporcionar una ruta binaria al controlador mediante:

```ts
{
    browserName: 'chrome', // o 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

Cuando se realizan pruebas en Firefox, WebdriverIO descargará automáticamente la versión del navegador y el controlador deseados según el `browserVersion` definido, por ejemplo:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // o 'latest'
}
```

Si deseas probar una versión descargada manualmente, puedes proporcionar una ruta binaria al navegador mediante:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Además, si deseas utilizar un controlador descargado manualmente, puedes proporcionar una ruta binaria al controlador mediante:

```ts
{
    browserName: 'firefox',
    'wdio:geckodriverOptions': {
        binary: '/path/to/geckodriver'
    }
}
```

</TabItem>
<TabItem value="msedge">

Cuando se realizan pruebas en Microsoft Edge, asegúrate de tener la versión del navegador deseada instalada en tu máquina. Puedes dirigir WebdriverIO al navegador para ejecutar mediante:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO descargará automáticamente la versión del controlador deseada según el `browserVersion` definido, por ejemplo:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // o '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Además, si deseas utilizar un controlador descargado manualmente, puedes proporcionar una ruta binaria al controlador mediante:

```ts
{
    browserName: 'msedge',
    'wdio:edgedriverOptions': {
        binary: '/path/to/msedgedriver'
    }
}
```

</TabItem>
<TabItem value="safari">

Cuando se realizan pruebas en Safari, asegúrate de tener instalado [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) en tu máquina. Puedes dirigir WebdriverIO a esa versión mediante:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Extender capacidades personalizadas

Si deseas definir tu propio conjunto de capacidades para, por ejemplo, almacenar datos arbitrarios para ser utilizados en las pruebas para esa capacidad específica, puedes hacerlo configurando:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // configuraciones personalizadas
        }
    }]
}
```

Se recomienda seguir el [protocolo W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) cuando se trata de nombrar capacidades, que requiere un carácter `:` (dos puntos) que denota un espacio de nombres específico de la implementación. Dentro de tus pruebas, puedes acceder a tu capacidad personalizada mediante, por ejemplo:

```ts
browser.capabilities['custom:caps']
```

Para garantizar la seguridad de tipos, puedes extender la interfaz de capacidad de WebdriverIO mediante:

```ts
declare global {
    namespace WebdriverIO {
        interface Capabilities {
            'custom:caps': {
                // ...
            }
        }
    }
}
```