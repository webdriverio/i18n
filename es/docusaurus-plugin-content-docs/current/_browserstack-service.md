---
id: browserstack-service
title: Servicio de Browserstack
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-browserstack-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Un servicio de WebdriverIO que gestiona el túnel local y los metadatos de trabajos para usuarios de BrowserStack.

## Instalación


La forma más sencilla es mantener `@wdio/browserstack-service` como una devDependency en tu `package.json`, vía:

```sh
npm install @wdio/browserstack-service --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí.](https://webdriver.io/docs/gettingstarted)


## Configuración

WebdriverIO tiene soporte para BrowserStack integrado. Debes configurar `user` y `key` en tu archivo `wdio.conf.js`. Este plugin de servicio proporciona soporte para [BrowserStack Tunnel](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/local-testing). Establece `browserstackLocal: true` también para activar esta característica.
El reporte del estado de la sesión en BrowserStack respetará la configuración `strict` de las opciones de Cucumber.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            },
            browserstackLocal: true
        }]
    ],
    // ...
};
```

## Opciones

Para autorizar el servicio de BrowserStack, tu configuración necesita contener las opciones [`user`](https://webdriver.io/docs/options#user) y [`key`](https://webdriver.io/docs/options#key).

### testObservability

Test Observability es una herramienta avanzada de informes de pruebas que proporciona información para mejorar tus pruebas de automatización y te ayuda a depurar más rápido. Está habilitada por defecto estableciendo la bandera `testObservability`​ como `true` para todos los usuarios del servicio de browserstack. Puedes deshabilitarla configurando la bandera `testObservability`​ a `false`.

Una vez que tus pruebas terminen de ejecutarse, puedes visitar [Test Observability](https://observability.browserstack.com/) para depurar tus compilaciones con información adicional como Análisis de Errores Únicos, Detección Automática de Pruebas Inestables y más.

Puedes usar Test Observability incluso si no ejecutas tus pruebas en la infraestructura de BrowserStack. Incluso si ejecutas tus pruebas en un CI, una máquina local o incluso en otros proveedores de servicios en la nube, Test Observability aún puede generar informes de pruebas inteligentes y análisis avanzados de tus pruebas.

Si quieres usar Test Observability sin ejecutar tus pruebas en la infraestructura de BrowserStack, puedes configurar tu configuración de la siguiente manera:


```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                user: process.env.BROWSERSTACK_USERNAME,
                key: process.env.BROWSERSTACK_ACCESS_KEY,
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            }
        }]
    ],
    // ...
};
```

Puedes explorar todas las características de Test Observability en [este sandbox](https://observability-demo.browserstack.com/) o leer más sobre ello [aquí](https://www.browserstack.com/docs/test-observability/overview/what-is-test-observability).

### browserstackLocal
Configúralo como true para habilitar el enrutamiento de conexiones desde la nube de BrowserStack a través de tu computadora.

Tipo: `Boolean`<br />
Predeterminado: `false`

### forcedStop
Configúralo como true para matar el proceso BrowserStack Local al completarse, sin esperar a que se llame al callback de detención de BrowserStack Local. Esto es experimental y no debe ser utilizado por todos. Principalmente necesario como una solución para [este problema](https://github.com/browserstack/browserstack-local-nodejs/issues/41).

Tipo: `Boolean`<br />
Predeterminado: `false`

### app

[Appium](https://appium.io/) configura esto con la ruta del archivo de la aplicación disponible localmente en tu máquina para usar la aplicación como [aplicación bajo prueba](https://www.browserstack.com/docs/app-automate/appium/set-up-tests/specify-app) para sesiones de Appium.

Tipo: `String` o `JsonObject`<br />
Predeterminado: `undefined`

Lista de valores disponibles para app:

#### path
Utiliza la ruta del archivo de la aplicación disponible localmente como aplicación bajo prueba para Appium.

```js
services: [
  ['browserstack', {
    app: '/path/to/local/app.apk'
    // O
    app: {
      path: '/path/to/local/app.apk'
    }
  }]
]
```

Pasa custom_id durante la carga de la aplicación.

```js
services: [
  ['browserstack', {
    app: {
      path: '/path/to/local/app.apk',
      custom_id: 'custom_id'
    }
  }]
]
```

#### id
Utiliza la URL de la aplicación devuelta después de cargar la aplicación a BrowserStack.

```js
services: [
  ['browserstack', {
    app: 'bs://<app-id>'
    // O
    app: {
      id: 'bs://<app-id>'
    }
  }]
]
```

#### custom_id

usa custom_id de aplicaciones ya cargadas

```js
services: [
  ['browserstack', {
    app: 'custom_id'
    // O
    app: {
      custom_id: 'custom_id'
    }
  }]
]
```

#### shareable_id

usa shareable_id de aplicaciones ya cargadas

```js
services: [
  ['browserstack', {
    app: 'username/custom_id'
    // O
    app: {
      shareable_id: 'username/custom_id'
    }
  }]
]
```

### preferScenarioName

Solo para Cucumber. Establece el nombre de la sesión de BrowserStack Automate como el nombre del Escenario si solo se ejecutó un único Escenario.
Útil cuando se ejecuta en paralelo con [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution).

Tipo: `Boolean`<br />
Predeterminado: `false`

### sessionNameFormat

Personaliza el formato del nombre de la sesión de BrowserStack Automate.

Tipo: `Function`<br />
Predeterminado (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
Predeterminado (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle

Solo para Mocha. No añade el título de la prueba al nombre de la sesión de BrowserStack Automate.

Tipo: `Boolean`<br />
Predeterminado: `false`

### sessionNamePrependTopLevelSuiteTitle

Solo para Mocha. Antepone el título de la suite de nivel superior al nombre de la sesión de BrowserStack Automate.

Tipo: `Boolean`<br />
Predeterminado: `false`

### setSessionName

Establece automáticamente el nombre de la sesión de BrowserStack Automate.

Tipo: `Boolean`<br />
Predeterminado: `true`

### setSessionStatus

Establece automáticamente el estado de la sesión de BrowserStack Automate (aprobado/fallido).

Tipo: `Boolean`<br />
Predeterminado: `true`

### buildIdentifier

**buildIdentifier** es un identificador único para diferenciar cada ejecución que se adjunta a buildName. Elige tu formato de buildIdentifier entre las expresiones disponibles:
* `BUILD_NUMBER`: Genera un contador incremental con cada ejecución
* `DATE_TIME`: Genera una marca de tiempo con cada ejecución. Ej. 05-Nov-19:30

```js
services: [
  ['browserstack', {
    buildIdentifier: '#${BUILD_NUMBER}'
  }]
]
```
El identificador de compilación admite el uso de una o ambas expresiones junto con cualquier otro carácter, lo que permite opciones de formato personalizadas.

### opts

Opciones de BrowserStack Local.

Tipo: `Object`<br />
Predeterminado: `{}`

Lista de modificadores de pruebas locales disponibles para pasar como opts:

#### Identificador Local

Si realizas múltiples conexiones de pruebas locales simultáneas, configúralo de forma única para diferentes procesos -

```js
opts = { localIdentifier: "randomstring" };
```

#### Registro Detallado

Para habilitar el registro detallado -

```js
opts = { verbose: "true" };
```

Nota - Los valores posibles para el modificador 'verbose' son '1', '2', '3' y 'true'

#### Forzar Local

Para enrutar todo el tráfico a través de la máquina local (tu máquina) -

```js
opts = { forceLocal: "true" };
```

#### Prueba de Carpetas

Para probar carpetas locales en lugar del servidor interno, proporciona la ruta a la carpeta como valor de esta opción -

```js
opts = { f: "/my/awesome/folder" };
```

#### Inicio Forzado

Para matar otras instancias de BrowserStack Local en ejecución -

```js
opts = { force: "true" };
```

#### Solo Automate

Para desactivar las pruebas locales para Live y Screenshots, y habilitar solo Automate -

```js
opts = { onlyAutomate: "true" };
```

#### Proxy

Para usar un proxy para pruebas locales -

- proxyHost: Hostname/IP del proxy, el resto de opciones de proxy se ignoran si esta opción está ausente
- proxyPort: Puerto para el proxy, por defecto es 3128 cuando se usa -proxyHost
- proxyUser: Nombre de usuario para conectarse al proxy (solo autenticación básica)
- proxyPass: Contraseña para USERNAME, se ignorará si USERNAME está vacío o no especificado

```js
opts = {
  proxyHost: "127.0.0.1",
  proxyPort: "8000",
  proxyUser: "user",
  proxyPass: "password",
};
```

#### Proxy Local

Para usar proxy local en pruebas locales -

- localProxyHost: Hostname/IP del proxy, el resto de opciones de proxy se ignoran si esta opción está ausente
- localProxyPort: Puerto para el proxy, por defecto es 8081 cuando se usa -localProxyHost
- localProxyUser: Nombre de usuario para conectarse al proxy (solo autenticación básica)
- localProxyPass: Contraseña para USERNAME, se ignorará si USERNAME está vacío o no especificado

```js
opts = {
  localProxyHost: "127.0.0.1",
  localProxyPort: "8000",
  localProxyUser: "user",
  localProxyPass: "password",
};
```

#### PAC (Configuración Automática de Proxy)

Para usar PAC (Configuración Automática de Proxy) en pruebas locales -

- pac-file: Ruta absoluta del archivo PAC (Configuración Automática de Proxy)

```js
opts = { "pac-file": "<pac_file_abs_path>" };
```

#### Ruta del Binario

Por defecto, los wrappers locales de BrowserStack intentan descargar y ejecutar la última versión del binario de BrowserStack en ~/.browserstack o el directorio de trabajo actual o la carpeta tmp por orden. Pero puedes anular esto pasando el argumento -binarypath.
Ruta para especificar la ruta del binario local -

```js
opts = { binarypath: "/path/to/binary" };
```

#### Archivo de Registro

Para guardar los registros en el archivo mientras se ejecuta con el argumento '-v', puedes especificar la ruta del archivo. Por defecto, los registros se guardan en el archivo local.log en el directorio de trabajo actual.
Para especificar la ruta al archivo donde se guardarán los registros -

```js
opts = { verbose: "true", logFile: "./local.log" };
```

----

Para más información sobre WebdriverIO, visita la [página principal](https://webdriver.io).