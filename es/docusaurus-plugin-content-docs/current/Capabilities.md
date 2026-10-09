---
id: capabilities
title: Capacidades
description: "Define capacidades para elegir el navegador o entorno móvil en el que se ejecutan tus pruebas, incluidas capacidades personalizadas de proveedores y casos de uso especiales."
---

Una capacidad es una definición para una interfaz remota. Ayuda a WebdriverIO a entender en qué navegador o entorno móvil deseas ejecutar tus pruebas. Las capacidades son menos cruciales cuando desarrollas pruebas localmente, ya que la mayor parte del tiempo las ejecutas en una sola interfaz remota, pero se vuelven más importantes cuando ejecutas un gran conjunto de pruebas de integración en CI/CD.

:::info

El formato de un objeto de capacidad está bien definido por la [especificación WebDriver](https://w3c.github.io/webdriver/#capabilities). El testrunner de WebdriverIO fallará de forma temprana si las capacidades definidas por el usuario no se ajustan a dicha especificación.

:::

## Capacidades personalizadas

Si bien la cantidad de capacidades definidas de forma fija es muy baja, cualquiera puede proporcionar y aceptar capacidades personalizadas que sean específicas del driver de automatización o de la interfaz remota:

### Extensiones de capacidades específicas del navegador

- `goog:chromeOptions`: extensiones de [Chromedriver](https://chromedriver.chromium.org/capabilities), solo aplicables para pruebas en Chrome
- `moz:firefoxOptions`: extensiones de [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), solo aplicables para pruebas en Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) para especificar el entorno al usar EdgeDriver para probar Chromium Edge

### Extensiones de capacidades de proveedores en la nube

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- y muchos más...

### Extensiones de capacidades de motores de automatización

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- y muchos más...

### Capacidades de WebdriverIO para gestionar las opciones del driver del navegador

WebdriverIO se encarga de instalar y ejecutar el driver del navegador por ti. WebdriverIO utiliza una capacidad personalizada que te permite pasar parámetros al driver.

#### `wdio:chromedriverOptions`

Opciones específicas que se pasan a Chromedriver al iniciarlo.

#### `wdio:geckodriverOptions`

Opciones específicas que se pasan a Geckodriver al iniciarlo.

#### `wdio:edgedriverOptions`

Opciones específicas que se pasan a Edgedriver al iniciarlo.

#### `wdio:safaridriverOptions`

Opciones específicas que se pasan a Safari al iniciarlo.

#### `wdio:maxInstances`

<Option type="number">

Número máximo total de workers ejecutándose en paralelo para el navegador/capacidad específico. Tiene prioridad sobre [maxInstances](#configuration#maxInstances) y [maxInstancesPerCapability](configuration/#maxinstancespercapability).

</Option>

#### `wdio:specs`

<Option type="(String | String[])[]">

Define los specs para la ejecución de pruebas de ese navegador/capacidad. Igual que la [opción de configuración `specs` habitual](configuration#specs), pero específica del navegador/capacidad. Tiene prioridad sobre `specs`.

</Option>

#### `wdio:exclude`

<Option type="String[]">

Excluye specs de la ejecución de pruebas para ese navegador/capacidad. Igual que la [opción de configuración `exclude` habitual](configuration#exclude), pero específica del navegador/capacidad. La exclusión se realiza después de aplicar la opción de configuración global `exclude`.

</Option>

#### `wdio:enforceWebDriverClassic`

<Option type="boolean">

De forma predeterminada, WebdriverIO intenta establecer una sesión WebDriver Bidi. Si no lo prefieres, puedes establecer esta opción para desactivar este comportamiento.

</Option>

#### `wdio:electronVersion`

<Option type="string">

Descarga el Chromedriver incluido con esta versión de Electron en lugar del de Chrome for Testing, para probar una aplicación Electron establecida como `goog:chromeOptions.binary`. Si también se establece `browserVersion`, WebdriverIO utiliza en su lugar el Chromedriver de esa versión cuando no se puede descargar la versión de Electron o cuando `CHROMEDRIVER_CDNURL` está establecido. Las versiones nightly provienen de [electron/nightlies](https://github.com/electron/nightlies/releases). El servicio de Electron lo establece por ti a partir de la versión de Electron de la aplicación.

```ts
{
    browserName: 'chrome',
    'wdio:electronVersion': '33.2.1',
    // una sesión BiDi reemplaza la ventana de la aplicación con `data:,`
    'wdio:enforceWebDriverClassic': true,
    'goog:chromeOptions': {
        binary: './out/my-app-darwin-arm64/my-app.app/Contents/MacOS/my-app'
    }
}
```

</Option>

#### Opciones comunes del driver

Aunque todos los drivers ofrecen diferentes parámetros de configuración, hay algunos comunes que WebdriverIO entiende y utiliza para configurar tu driver o navegador:

##### `cacheDir`

<Option type="string" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

La ruta a la raíz del directorio de caché. Este directorio se utiliza para almacenar todos los drivers que se descargan al intentar iniciar una sesión.

</Option>

##### `binary`

<Option type="string">

Ruta a un binario de driver personalizado. Si se establece, WebdriverIO no intentará descargar un driver, sino que utilizará el proporcionado en esta ruta. Asegúrate de que el driver sea compatible con el navegador que estás usando.

Puedes proporcionar esta ruta mediante las variables de entorno `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` o `EDGEDRIVER_PATH`.

</Option>
:::caution

Si se establece el `binary` del driver, WebdriverIO no intentará descargar un driver, sino que utilizará el proporcionado en esta ruta. Asegúrate de que el driver sea compatible con el navegador que estás usando.

:::

#### Host de descarga de driver personalizado

Si las CDN públicas de drivers no son accesibles desde tu entorno, por ejemplo porque ejecutas tus pruebas detrás de un proxy corporativo o replicas los drivers en un registro interno de artefactos, puedes dirigir la descarga a un host personalizado usando las siguientes variables de entorno:

- Chrome: `CHROMEDRIVER_CDNURL`, por defecto `https://storage.googleapis.com/chrome-for-testing-public`
- Microsoft Edge: `EDGEDRIVER_CDNURL`, por defecto `https://msedgedriver.microsoft.com`

Se espera que el mirror sirva los archivos del driver bajo las mismas rutas que la CDN original, por ejemplo para Chrome:

```sh
CHROMEDRIVER_CDNURL=https://artifactory.company.com/chrome-for-testing npx wdio run wdio.conf.js
```

lo que resuelve el driver a `https://artifactory.company.com/chrome-for-testing/<buildId>/<platform>/chromedriver-<platform>.zip`, donde `<platform>` es uno de `linux64`, `linux-arm64`, `mac-x64`, `mac-arm64`, `win32` o `win64`, por ejemplo `.../140.0.7339.207/mac-arm64/chromedriver-mac-arm64.zip`.

:::info Entornos completamente sin conexión

Estas variables solo redirigen la descarga del driver. Para evitar por completo que WebdriverIO acceda a internet pública, deben cumplirse cuatro condiciones más:

- **Debe haber un navegador disponible localmente.** Si WebdriverIO no encuentra un Chrome o Firefox instalado, también descarga el navegador, y esa descarga no respeta estas variables. Instala el navegador en la máquina o indícale a WebdriverIO dónde está mediante `goog:chromeOptions.binary` / `moz:firefoxOptions.binary`.
- **Usa un número de versión completo.** Si se omite `browserVersion`, WebdriverIO lee la versión exacta del navegador local y no se necesita ninguna búsqueda de versión. Si lo estableces, usa la versión completa de cuatro partes, por ejemplo `140.0.7339.207`. Un canal de lanzamiento (`stable`), un milestone (`140`) o una versión parcial (`140.0.7339`) requieren una búsqueda de versión en un endpoint público de Google que no se puede redirigir.
- **Chromedriver debe provenir de Chrome for Testing.** Para Chrome anterior a `153.0.8001.0` en Linux ARM64, y con `wdio:electronVersion` pero sin `browserVersion`, Chromedriver se descarga desde las releases de Electron en GitHub, que estas variables no redirigen.
- **Asegúrate de que el mirror realmente tenga la versión que necesitas.** Si el driver no se puede obtener de tu host —porque la versión no está replicada, pero también porque la URL es incorrecta o las credenciales fueron rechazadas—, WebdriverIO registra una advertencia y luego busca la versión conocida y válida más cercana, lo que de nuevo consulta el endpoint público. Revisa en la advertencia el host que intentó usar si una ejecución accede inesperadamente a internet o elige una versión que no solicitaste.

:::

#### Opciones de driver específicas del navegador

Para propagar opciones al driver puedes usar las siguientes capacidades personalizadas:

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

<Option type="number">

El puerto en el que debe ejecutarse el driver ADB.

Ejemplo: `9515`

</Option>

##### urlBase

<Option type="string">

Prefijo de ruta de URL base para los comandos, por ejemplo `wd/url`.

Ejemplo: `/`

</Option>

##### logPath

<Option type="string">

Escribe el log del servidor en un archivo en lugar de stderr, aumenta el nivel de log a `INFO`

</Option>

##### logLevel

<Option type="string">

Establece el nivel de log. Opciones posibles: `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

</Option>

##### verbose

<Option type="boolean">

Registra de forma detallada (equivalente a `--log-level=ALL`)

</Option>

##### silent

<Option type="boolean">

No registra nada (equivalente a `--log-level=OFF`)

</Option>

##### appendLog

<Option type="boolean">

Añade al archivo de log en lugar de sobrescribirlo.

</Option>

##### replayable

<Option type="boolean">

Registra de forma detallada y no trunca las cadenas largas para que el log pueda reproducirse (experimental).

</Option>

##### readableTimestamp

<Option type="boolean">

Añade marcas de tiempo legibles al log.

</Option>

##### enableChromeLogs

<Option type="boolean">

Muestra los logs del navegador (anula otras opciones de registro).

</Option>

##### bidiMapperPath

<Option type="string">

Ruta personalizada del bidi mapper.

</Option>

##### allowedIps

<Option type="string[]" default="['']">

Lista de permitidos, separada por comas, de direcciones IP remotas que pueden conectarse a EdgeDriver.

</Option>

##### allowedOrigins

<Option type="string[]" default="['*']">

Lista de permitidos, separada por comas, de orígenes de solicitudes que pueden conectarse a EdgeDriver. ¡Usar `*` para permitir cualquier origen de host es peligroso!

</Option>

##### spawnOpts

<Option type="SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>" default="undefined">

Opciones que se pasan al proceso del driver.

</Option>
</TabItem>
<TabItem value="firefox">

Consulta todas las opciones de Geckodriver en el [paquete oficial del driver](https://github.com/webdriverio-community/node-geckodriver#options).

</TabItem>
<TabItem value="msedge">

Consulta todas las opciones de Edgedriver en el [paquete oficial del driver](https://github.com/webdriverio-community/node-edgedriver#options).

</TabItem>
<TabItem value="safari">

Consulta todas las opciones de Safaridriver en el [paquete oficial del driver](https://github.com/webdriverio-community/node-safaridriver#options).

</TabItem>
</Tabs>

## Capacidades especiales para casos de uso específicos

Esta es una lista de ejemplos que muestran qué capacidades deben aplicarse para lograr un determinado caso de uso.

### Ejecutar el navegador en modo headless

Ejecutar un navegador headless significa ejecutar una instancia del navegador sin ventana ni interfaz de usuario. Esto se usa principalmente en entornos de CI/CD donde no se utiliza ninguna pantalla. Para ejecutar un navegador en modo headless, aplica las siguientes capacidades:

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

Parece que Safari [no admite](https://discussions.apple.com/thread/251837694) la ejecución en modo headless.

</TabItem>
</Tabs>

### Automatizar diferentes canales del navegador

Si deseas probar una versión del navegador que aún no se ha publicado como estable, por ejemplo Chrome Canary, puedes hacerlo estableciendo capacidades y apuntando al navegador que deseas iniciar, por ejemplo:

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

Al probar en Chrome, WebdriverIO descargará automáticamente la versión del navegador y el driver deseados en función del `browserVersion` definido, por ejemplo:

```ts
{
    browserName: 'chrome', // o 'chromium'
    browserVersion: '116' // o '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' o 'latest' (igual que 'canary')
}
```

Si deseas probar un navegador descargado manualmente, puedes proporcionar una ruta al binario del navegador mediante:

```ts
{
    browserName: 'chrome',  // o 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Además, si deseas usar un driver descargado manualmente, puedes proporcionar una ruta al binario del driver mediante:

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

Al probar en Firefox, WebdriverIO descargará automáticamente la versión del navegador y el driver deseados en función del `browserVersion` definido, por ejemplo:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // o 'latest'
}
```

Si deseas probar una versión descargada manualmente, puedes proporcionar una ruta al binario del navegador mediante:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Además, si deseas usar un driver descargado manualmente, puedes proporcionar una ruta al binario del driver mediante:

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

Al probar en Microsoft Edge, asegúrate de tener instalada en tu máquina la versión del navegador deseada. Puedes indicar a WebdriverIO el navegador que debe ejecutar mediante:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO descargará automáticamente la versión del driver deseada en función del `browserVersion` definido, por ejemplo:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // o '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Además, si deseas usar un driver descargado manualmente, puedes proporcionar una ruta al binario del driver mediante:

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

Al probar en Safari, asegúrate de tener instalado [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) en tu máquina. Puedes indicar a WebdriverIO esa versión mediante:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Extender capacidades personalizadas

Si deseas definir tu propio conjunto de capacidades para, por ejemplo, almacenar datos arbitrarios que se utilicen dentro de las pruebas para esa capacidad específica, puedes hacerlo, por ejemplo, estableciendo:

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

Se recomienda seguir el [protocolo W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) en lo que respecta a la nomenclatura de las capacidades, que requiere un carácter `:` (dos puntos) para denotar un espacio de nombres específico de la implementación. Dentro de tus pruebas puedes acceder a tu capacidad personalizada, por ejemplo, mediante:

```ts
browser.capabilities['custom:caps']
```

Para garantizar la seguridad de tipos, puedes extender la interfaz de capacidades de WebdriverIO mediante:

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