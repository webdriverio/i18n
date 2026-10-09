---
id: browser
title: El Objeto Browser
---

__Extiende:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

El objeto browser es la instancia de sesión que utilizas para controlar el navegador o dispositivo móvil. Si utilizas el test runner de WDIO, puedes acceder a la instancia de WebDriver a través del objeto global `browser` o `driver`, o importarlo usando [`@wdio/globals`](/docs/api/globals). Si utilizas WebdriverIO en modo standalone, el objeto browser es devuelto por el método [`remote`](/docs/api/modules#remoteoptions-modifier).

La sesión es inicializada por el test runner. Lo mismo ocurre con la finalización de la sesión. Esto también lo realiza el proceso del test runner.

## Propiedades

Un objeto browser tiene las siguientes propiedades:

| Nombre | Tipo | Detalles |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Capacidades asignadas desde el servidor remoto.<br /><b>Ejemplo:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Capacidades solicitadas al servidor remoto.<br /><b>Ejemplo:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | ID de sesión asignado por el servidor remoto. |
| `options` | `Object` | [Opciones](/docs/configuration) de WebdriverIO dependiendo de cómo se creó el objeto browser. Consulta más sobre [tipos de configuración](/docs/setuptypes). |
| `commandList` | `String[]` | Una lista de comandos registrados en la instancia del navegador |
| `isChrome` | `Boolean` | Indica si se trata de una instancia de Chrome |
| `isFirefox` | `Boolean` | Indica si se trata de una instancia de Firefox |
| `isBidi` | `Boolean` | Indica si esta sesión utiliza Bidi |
| `isSauce` | `Boolean` | Indica si esta sesión se está ejecutando en Sauce Labs |
| `isMacApp` | `Boolean` | Indica si esta sesión se está ejecutando para una aplicación nativa de Mac |
| `isWindowsApp` | `Boolean` | Indica si esta sesión se está ejecutando para una aplicación nativa de Windows |
| `isMobile` | `Boolean` | Indica una sesión móvil. Consulta más en [Indicadores móviles](#mobile-flags). |
| `isIOS` | `Boolean` | Indica una sesión de iOS. Consulta más en [Indicadores móviles](#mobile-flags). |
| `isAndroid` | `Boolean` | Indica una sesión de Android. Consulta más en [Indicadores móviles](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Indica si el dispositivo móvil está en el contexto `NATIVE_APP`. Consulta más en [Indicadores móviles](#mobile-flags). |
| `mobileContext` | `string`  | Proporciona el contexto **actual** en el que se encuentra el driver, por ejemplo `NATIVE_APP`, `WEBVIEW_<packageName>` para Android o `WEBVIEW_<pid>` para iOS. Ahorra una llamada adicional de WebDriver a `driver.getContext()`. Consulta más en [Indicadores móviles](#mobile-flags). |


## Métodos

Según el backend de automatización utilizado para tu sesión, WebdriverIO identifica qué [Comandos de Protocolo](/docs/api/protocols) se adjuntarán al [objeto browser](/docs/api/browser). Por ejemplo, si ejecutas una sesión automatizada en Chrome, tendrás acceso a comandos específicos de Chromium como [`elementHover`](/docs/api/chromium#elementhover), pero no a ninguno de los [comandos de Appium](/docs/api/appium).

Además, WebdriverIO proporciona un conjunto de métodos convenientes cuyo uso se recomienda para interactuar con el [navegador](/docs/api/browser) o los [elementos](/docs/api/element) de la página.

Además de eso, los siguientes comandos están disponibles:

| Nombre | Parámetros | Detalles |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`)<br />- `attachToElement` (Tipo: `boolean`) | Permite definir comandos personalizados que pueden ser llamados desde el objeto browser con fines de composición. Lee más en la guía de [Comandos personalizados](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`)<br />- `attachToElement` (Tipo: `boolean`) | Permite sobrescribir cualquier comando del navegador con funcionalidad personalizada. Úsalo con cuidado, ya que puede confundir a los usuarios del framework. Lee más en la guía de [Comandos personalizados](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`) | Permite definir una estrategia de selectores personalizada. Lee más en la guía de [Selectores](/docs/selectors#custom-selector-strategies). |

## Observaciones

### Indicadores móviles

Si necesitas modificar tu prueba en función de si tu sesión se ejecuta o no en un dispositivo móvil, puedes consultar los indicadores móviles para comprobarlo.

Por ejemplo, dada esta configuración:

```js
// wdio.conf.js
export const config = {
    // ...
    capabilities: \\{
        platformName: 'iOS',
        app: 'net.company.SafariLauncher',
        udid: '123123123123abc',
        deviceName: 'iPhone',
        // ...
    }
    // ...
}
```

Puedes acceder a estos indicadores en tu prueba de la siguiente manera:

```js
// Nota: `driver` es el equivalente al objeto `browser` pero semánticamente más correcto
// puedes elegir qué variable global quieres usar
console.log(driver.isMobile) // muestra: true
console.log(driver.isIOS) // muestra: true
console.log(driver.isAndroid) // muestra: false
```

Esto puede ser útil si, por ejemplo, quieres definir selectores en tus [page objects](../pageobjects) según el tipo de dispositivo, así:

```js
// mypageobject.page.js
import Page from './page'

class LoginPage extends Page {
    // ...
    get username() {
        const selectorAndroid = 'new UiSelector().text("Cancel").className("android.widget.Button")'
        const selectorIOS = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
        const selectorType = driver.isAndroid ? 'android' : 'ios'
        const selector = driver.isAndroid ? selectorAndroid : selectorIOS
        return $(`${selectorType}=${selector}`)
    }
    // ...
}
```

También puedes usar estos indicadores para ejecutar solo ciertas pruebas para ciertos tipos de dispositivos:

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // solo ejecutar la prueba con dispositivos Android
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### Eventos
El objeto browser es un EventEmitter y se emiten un par de eventos para tus casos de uso.

Aquí tienes una lista de eventos. Ten en cuenta que esta todavía no es la lista completa de eventos disponibles.
No dudes en contribuir a actualizar el documento añadiendo aquí descripciones de más eventos.

#### `command`

Este evento se emite cada vez que WebdriverIO envía un comando de WebDriver Classic. Contiene la siguiente información:

- `command`: el nombre del comando, p. ej. `navigateTo`
- `method`: el método HTTP utilizado para enviar la solicitud del comando, p. ej. `POST`
- `endpoint`: el endpoint del comando, p. ej. `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: el payload del comando, p. ej. `{ url: 'https://webdriver.io' }`

#### `result`

Este evento se emite cada vez que WebdriverIO recibe el resultado de un comando de WebDriver Classic. Contiene la misma información que el evento `command` con la adición de la siguiente información:

- `result`: el resultado del comando

#### `bidiCommand`

Este evento se emite cada vez que WebdriverIO envía un comando de WebDriver Bidi al driver del navegador. Contiene información sobre:

- `method`: método del comando de WebDriver Bidi
- `params`: parámetro asociado al comando (consulta la [API](/docs/api/webdriverBidi))

#### `bidiResult`

En caso de una ejecución exitosa del comando, el payload del evento será:

- `type`: `success`
- `id`: el id del comando
- `result`: el resultado del comando (consulta la [API](/docs/api/webdriverBidi))

En caso de un error en el comando, el payload del evento será:

- `type`: `error`
- `id`: el id del comando
- `error`: el código de error, p. ej. `invalid argument`
- `message`: detalles sobre el error
- `stacktrace`: un stack trace

#### `request.start`
Este evento se dispara antes de que se envíe una solicitud de WebDriver al driver. Contiene información sobre la solicitud y su payload.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
Este evento se dispara una vez que la solicitud al driver ha recibido una respuesta. El objeto del evento contiene el cuerpo de la respuesta como resultado o un error si el comando de WebDriver falló.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
El evento de reintento puede notificarte cuando WebdriverIO intenta volver a ejecutar el comando, p. ej. debido a un problema de red. Contiene información sobre el error que causó el reintento y la cantidad de reintentos ya realizados.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
Este es un evento para medir operaciones a nivel de WebDriver. Cada vez que WebdriverIO envía una solicitud al backend de WebDriver, se emitirá este evento con información útil:

- `durationMillisecond`: Duración de la solicitud en milisegundos.
- `error`: Objeto de error si la solicitud falló.
- `request`: Objeto de la solicitud. Puedes encontrar la url, el método, los headers, etc.
- `retryCount`: Si es `0`, la solicitud fue el primer intento. Aumentará cuando WebDriverIO reintente internamente.
- `success`: Booleano que representa si la solicitud tuvo éxito o no. Si es `false`, también se proporcionará la propiedad `error`.

Un ejemplo de evento:
```js
Object {
  "durationMillisecond": 0.01770925521850586,
  "error": [Error: Timeout],
  "request": Object { ... },
  "retryCount": 0,
  "success": false,
},
```

### Comandos personalizados

Puedes definir comandos personalizados en el ámbito del navegador para abstraer flujos de trabajo de uso común. Consulta nuestra guía sobre [Comandos personalizados](/docs/customcommands#adding-custom-commands) para obtener más información.