---
id: browser
title: El Objeto Browser
---

__Extiende:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

El objeto browser es la instancia de sesión que utilizas para controlar el navegador o dispositivo móvil. Si utilizas el ejecutor de pruebas WDIO, puedes acceder a la instancia de WebDriver a través del objeto global `browser` o `driver` o importarlo usando [`@wdio/globals`](/docs/api/globals). Si utilizas WebdriverIO en modo independiente, el objeto browser es devuelto por el método [`remote`](/docs/api/modules#remoteoptions-modifier).

La sesión es inicializada por el ejecutor de pruebas. Lo mismo ocurre al finalizar la sesión. Esto también lo realiza el proceso del ejecutor de pruebas.

## Propiedades

Un objeto browser tiene las siguientes propiedades:

| Nombre | Tipo | Detalles |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Capacidades asignadas desde el servidor remoto.<br /><b>Ejemplo:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Capacidades solicitadas al servidor remoto.<br /><b>Ejemplo:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | ID de sesión asignado por el servidor remoto. |
| `options` | `Object` | [Opciones](/docs/configuration) de WebdriverIO dependiendo de cómo se creó el objeto browser. Ver más en [tipos de configuración](/docs/setuptypes). |
| `commandList` | `String[]` | Una lista de comandos registrados en la instancia del navegador |
| `isW3C` | `Boolean` | Indica si esta es una sesión W3C |
| `isChrome` | `Boolean` | Indica si esta es una instancia de Chrome |
| `isFirefox` | `Boolean` | Indica si esta es una instancia de Firefox |
| `isBidi` | `Boolean` | Indica si esta sesión utiliza Bidi |
| `isSauce` | `Boolean` | Indica si esta sesión se está ejecutando en Sauce Labs |
| `isMacApp` | `Boolean` | Indica si esta sesión se está ejecutando para una aplicación nativa de Mac |
| `isWindowsApp` | `Boolean` | Indica si esta sesión se está ejecutando para una aplicación nativa de Windows |
| `isMobile` | `Boolean` | Indica una sesión móvil. Ver más en [Indicadores Móviles](#mobile-flags). |
| `isIOS` | `Boolean` | Indica una sesión iOS. Ver más en [Indicadores Móviles](#mobile-flags). |
| `isAndroid` | `Boolean` | Indica una sesión Android. Ver más en [Indicadores Móviles](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Indica si el móvil está en el contexto `NATIVE_APP`. Ver más en [Indicadores Móviles](#mobile-flags). |
| `mobileContext` | `string`  | Proporcionará el contexto **actual** en el que se encuentra el driver, por ejemplo `NATIVE_APP`, `WEBVIEW_<packageName>` para Android o `WEBVIEW_<pid>` para iOS. Ahorrará un WebDriver extra a `driver.getContext()`. Ver más en [Indicadores Móviles](#mobile-flags). |


## Métodos

Basado en el backend de automatización utilizado para tu sesión, WebdriverIO identifica qué [Comandos de Protocolo](/docs/api/protocols) se adjuntarán al [objeto browser](/docs/api/browser). Por ejemplo, si ejecutas una sesión automatizada en Chrome, tendrás acceso a comandos específicos de Chromium como [`elementHover`](/docs/api/chromium#elementhover) pero no a ninguno de los [comandos de Appium](/docs/api/appium).

Además, WebdriverIO proporciona un conjunto de métodos convenientes que se recomienda utilizar para interactuar con el [navegador](/docs/api/browser) o [elementos](/docs/api/element) en la página.

Adicionalmente, los siguientes comandos están disponibles:

| Nombre | Parámetros | Detalles |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`)<br />- `attachToElement` (Tipo: `boolean`) | Permite definir comandos personalizados que pueden ser llamados desde el objeto browser para propósitos de composición. Lee más en la guía de [Comandos Personalizados](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`)<br />- `attachToElement` (Tipo: `boolean`) | Permite sobrescribir cualquier comando del navegador con funcionalidad personalizada. Úsalo con cuidado ya que puede confundir a los usuarios del framework. Lee más en la guía de [Comandos Personalizados](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`) | Permite definir una estrategia de selector personalizada, lee más en la guía de [Selectores](/docs/selectors#custom-selector-strategies). |

## Observaciones

### Indicadores Móviles

Si necesitas modificar tu prueba en función de si tu sesión se ejecuta en un dispositivo móvil o no, puedes acceder a los indicadores móviles para verificarlo.

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
// Nota: `driver` es equivalente al objeto `browser` pero semánticamente más correcto
// puedes elegir qué variable global quieres usar
console.log(driver.isMobile) // muestra: true
console.log(driver.isIOS) // muestra: true
console.log(driver.isAndroid) // muestra: false
```

Esto puede ser útil si, por ejemplo, quieres definir selectores en tus [objetos de página](../pageobjects) basados en el tipo de dispositivo, como esto:

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
    // ejecutar prueba solo con dispositivos Android
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### Eventos
El objeto browser es un EventEmitter y se emiten varios eventos para tus casos de uso.

Aquí hay una lista de eventos. Ten en cuenta que esta no es la lista completa de eventos disponibles todavía.
Siéntete libre de contribuir para actualizar el documento añadiendo descripciones de más eventos aquí.

#### `command`

Este evento se emite cada vez que WebdriverIO envía un comando WebDriver Classic. Contiene la siguiente información:

- `command`: el nombre del comando, p.ej. `navigateTo`
- `method`: el método HTTP utilizado para enviar la solicitud de comando, p.ej. `POST`
- `endpoint`: el punto final del comando, p.ej. `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: la carga útil del comando, p.ej. `{ url: 'https://webdriver.io' }`

#### `result`

Este evento se emite cada vez que WebdriverIO recibe un resultado de un comando WebDriver Classic. Contiene la misma información que el evento `command` con la adición de la siguiente información:

- `result`: el resultado del comando

#### `bidiCommand`

Este evento se emite cada vez que WebdriverIO envía un comando WebDriver Bidi al controlador del navegador. Contiene información sobre:

- `method`: método de comando WebDriver Bidi
- `params`: parámetro de comando asociado (ver [API](/docs/api/webdriverBidi))

#### `bidiResult`

En caso de una ejecución exitosa del comando, la carga útil del evento será:

- `type`: `success`
- `id`: el id del comando
- `result`: el resultado del comando (ver [API](/docs/api/webdriverBidi))

En caso de un error de comando, la carga útil del evento será:

- `type`: `error`
- `id`: el id del comando
- `error`: el código de error, p.ej. `invalid argument`
- `message`: detalles sobre el error
- `stacktrace`: un seguimiento de pila

#### `request.start`
Este evento se dispara antes de que se envíe una solicitud WebDriver al controlador. Contiene información sobre la solicitud y su carga útil.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
Este evento se dispara una vez que la solicitud al controlador recibe una respuesta. El objeto del evento contiene el cuerpo de la respuesta como resultado o un error si el comando WebDriver falló.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
El evento de reintento puede notificarte cuando WebdriverIO intenta volver a ejecutar el comando, p.ej. debido a un problema de red. Contiene información sobre el error que causó el reintento y la cantidad de reintentos ya realizados.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
Este es un evento para medir operaciones a nivel de WebDriver. Cada vez que WebdriverIO envía una solicitud al backend de WebDriver, este evento se emitirá con información útil:

- `durationMillisecond`: Duración de tiempo de la solicitud en milisegundos.
- `error`: Objeto de error si la solicitud falló.
- `request`: Objeto de solicitud. Puedes encontrar url, método, encabezados, etc.
- `retryCount`: Si es `0`, la solicitud fue el primer intento. Aumentará cuando WebDriverIO reintente internamente.
- `success`: Booleano para representar si la solicitud tuvo éxito o no. Si es `false`, también se proporcionará la propiedad `error`.

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

### Comandos Personalizados

Puedes establecer comandos personalizados en el ámbito del navegador para abstraer flujos de trabajo que se utilizan comúnmente. Consulta nuestra guía sobre [Comandos Personalizados](/docs/customcommands#adding-custom-commands) para obtener más información.