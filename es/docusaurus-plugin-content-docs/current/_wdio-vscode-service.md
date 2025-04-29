---
id: wdio-vscode-service
title: Servicio de Pruebas de Extensiones VSCode
custom_edit_url: https://github.com/webdriverio-community/wdio-vscode-service/edit/main/README.md
---


> wdio-vscode-service es un paquete de terceros, para más información consulta [GitHub](https://github.com/webdriverio-community/wdio-vscode-service) | [npm](https://www.npmjs.com/package/wdio-vscode-service)

Probado en:

[![VSCode Version](https://img.shields.io/badge/VSCode%20Version-insiders%20/%20stable%20/%20v1.86.0%20/%20web-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml) [![CI Status](https://img.shields.io/badge/Platform-windows%20%2F%20macos%20%2F%20ubuntu-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml)

> Servicio WebdriverIO para probar extensiones de VSCode.

Este servicio de WebdriverIO te permite probar de manera fluida tus extensiones de VSCode de extremo a extremo en el IDE de escritorio de VSCode o como una extensión web. Solo necesitas proporcionar una ruta a tu extensión y el servicio se encarga del resto:

- 🏗️ Instalando VSCode (ya sea `stable`, `insiders` o una versión específica)
- ⬇️ Descargando Chromedriver específico para una versión dada de VSCode
- 🚀 Permite acceder a la API de VSCode desde tus pruebas
- 🖥️ Iniciando VSCode con configuraciones de usuario personalizadas (incluyendo soporte para VSCode en Ubuntu, MacOS y Windows)
- 🌐 O sirve VSCode desde un servidor para ser accedido por cualquier navegador para probar [extensiones web](https://code.visualstudio.com/api/extension-guides/web-extensions)
- 📔 Preparando objetos de página con localizadores que coinciden con tu versión de VSCode

Este proyecto fue altamente inspirado por el proyecto [vscode-extension-tester](https://www.npmjs.com/package/vscode-extension-tester) que está basado en Selenium. Este paquete toma la idea y la adapta a WebdriverIO.

A partir de VSCode v1.86 se requiere usar `webdriverio` v8.14 o posterior para instalar Chromedriver sin necesidad de configuración. Si necesitas probar versiones anteriores de VSCode, consulta la sección [Configuración de Chromedriver](#chromedriver) a continuación.

## Instalación

Para iniciar un nuevo proyecto de WebdriverIO, ejecuta:

```bash
npm create wdio ./
```

Un asistente de instalación te guiará a través del proceso. Asegúrate de seleccionar TypeScript como compilador y no generar objetos de página, ya que este proyecto viene con todos los objetos de página necesarios. Luego asegúrate de seleccionar `vscode` dentro de la lista de servicios:

![Install Demo](https://raw.githubusercontent.com/webdriverio-community/wdio-vscode-service/main/.github/assets/demo.gif "Install Demo")

Para más información sobre cómo instalar `WebdriverIO`, consulta la [documentación del proyecto](https://webdriver.io/docs/gettingstarted).

## Ejemplo de Configuración

Para usar el servicio, debes agregar `vscode` a tu lista de servicios, opcionalmente seguido de un objeto de configuración. Esto hará que WebdriverIO descargue los binarios de VSCode dados y la versión apropiada de Chromedriver:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.86.0', // "insiders" o "stable" para la última versión de VSCode
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * Opcionalmente define la ruta donde WebdriverIO almacena todos los binarios de VSCode, por ejemplo:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Si defines `wdio:vscodeOptions` con cualquier otro `browserName` que no sea `vscode`, por ejemplo, `chrome`, el servicio servirá la extensión como una extensión web. Si pruebas en Chrome, no se requiere ningún servicio de controlador adicional, por ejemplo:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'wdio:vscodeOptions': {
            extensionPath: __dirname
        }
    }],
    services: ['vscode'],
    // ...
};
```

_Nota:_ al probar extensiones web, solo puedes elegir entre `stable` o `insiders` como `browserVersion`.

### Configuración de TypeScript

En tu `tsconfig.json`, asegúrate de agregar `wdio-vscode-service` a tu lista de tipos:

```json
{
    "compilerOptions": {
        "types": [
            "node",
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            "wdio-vscode-service"
        ],
        "target": "es2019",
        "moduleResolution": "node",
        "esModuleInterop": true
    }
}
```

## Uso

Puedes usar el método `getWorkbench` para acceder a los objetos de página para los localizadores que coincidan con tu versión deseada de VSCode:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

### Accediendo a las APIs de VSCode

Si deseas ejecutar cierta automatización a través de la [API de VSCode](https://code.visualstudio.com/api/references/vscode-api), puedes hacerlo ejecutando comandos remotos a través del comando personalizado `executeWorkbench`. Este comando te permite ejecutar remotamente código desde tu prueba dentro del entorno de VSCode y te permite acceder a la API de VSCode. Puedes pasar parámetros arbitrarios a la función que luego se propagarán a la función. El objeto `vscode` siempre se pasará como primer argumento seguido de los parámetros de la función externa. Ten en cuenta que no puedes acceder a variables fuera del ámbito de la función, ya que la devolución de llamada se ejecuta de forma remota. Aquí hay un ejemplo:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // muestra: "I am an API call!"
```

Para la documentación completa de objetos de página, consulta la [documentación](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Puedes encontrar varios ejemplos de uso en la [suite de pruebas de este proyecto](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Configuración

A través de la configuración del servicio, puedes gestionar la versión de VSCode así como la configuración de usuario para VSCode:

### Opciones del Servicio

Las opciones del servicio son opciones necesarias para que el servicio configure el entorno de prueba.

#### `cachePath`

Define una ruta de caché para evitar volver a descargar paquetes de VSCode. Esto es útil para CI/CD para evitar volver a descargar VSCode para cada ejecución de prueba.

Tipo: `string`<br />
Predeterminado: `process.cwd()`

### Capacidades de VSCode (`wdio:vscodeOptions`)

Para ejecutar pruebas a través de VSCode, debes definir `vscode` como `browserName`. Puedes especificar la versión de VSCode proporcionando una capacidad `browserVersion`. Las opciones personalizadas de VSCode se definen dentro de la capacidad personalizada `wdio:vscodeOptions`. Las opciones son las siguientes:

#### `binary`

Ruta a una instalación de VSCode local. Si no se proporciona la opción, el servicio descargará VSCode según el `browserVersion` dado (o `stable` si no se proporciona).

Tipo: `string`

#### `extensionPath`

Define el directorio de la extensión que deseas probar.

Tipo: `string`

#### `storagePath`

Define una ubicación personalizada para que VS Code almacene todos sus datos. Esta es la raíz para los directorios internos de VS Code como (lista parcial)
* **user-data-dir**: El directorio donde se almacenan todas las configuraciones de usuario (configuraciones globales), registros de extensiones, etc.
* **extension-install-dir**: El directorio donde se instalan las extensiones de VS Code.

Si no se proporciona, se utiliza un directorio temporal.

Tipo: `string`

#### `userSettings`

Define configuraciones de usuario personalizadas para aplicar a VSCode.

Tipo: `Record<string, number | string | object | boolean>`<br />
Predeterminado: `{}`

#### `workspacePath`

Abre VSCode para un espacio de trabajo específico. Si no se proporciona, VSCode se inicia sin un espacio de trabajo abierto.

Tipo: `string`

#### `filePath`

Abre VSCode con un archivo específico abierto.

Tipo: `string`

#### `vscodeArgs`

Argumentos adicionales de inicio como un objeto, por ejemplo:

```ts
vscodeArgs: { fooBar: true, 'bar-foo': '/foobar' }
```

se pasará como:

```ts
--foo-bar --fooBar --bar-foo=/foobar
```

Tipo: `Record<string, string | boolean>`<br />
Predeterminado: ver [`constants.ts#L5-L14`](https://github.com/webdriverio-community/wdio-vscode-service/blob/196a69be3ac2fb82d9c7e4f19a2a1c8ccbaec1e2/src/constants.ts#L5-L14)

#### `verboseLogging`

Si se establece en true, el servicio registra la salida de VSCode desde el host de extensión y la API de consola.

Tipo: `boolean`<br />
Predeterminado: `false`

#### `vscodeProxyOptions`

Las configuraciones del proxy de la API de VSCode definen cómo WebdriverIO se conecta al banco de trabajo de VSCode para darte acceso a la API de VSCode.

Tipo: `VSCodeProxyOptions`<br />
Predeterminado:

```ts
{
    /**
     * Si se establece en true, el servicio intenta establecer una conexión con el
     * banco de trabajo de VSCode para habilitar el acceso a la API de VSCode
     */
    enable: true,
    /**
     * Puerto de la conexión WebSocket utilizada para conectarse al banco de trabajo.
     * Por defecto, se establece en un puerto disponible en tu sistema operativo.
     */
    // port?: number
    /**
     * Tiempo de espera para conectarse a WebSocket dentro de VSCode
     */
    connectionTimeout: 5000,
    /**
     * Tiempo de espera para que el comando se ejecute dentro de VSCode
     */
    commandTimeout: 5000
}
```

### Chromedriver

A partir de VSCode v1.86 se requiere usar `webdriverio` v8.14 o posterior para instalar Chromedriver sin necesidad de configuración. La [configuración simplificada de automatización del navegador](https://webdriver.io/blog/2023/07/31/driver-management) se encarga de todo por ti.

Para probar versiones anteriores de VS Code, encuentra la versión esperada de Chromedriver en los registros, descarga [Chromedriver](https://chromedriver.chromium.org/downloads) y configura la ruta. Por ejemplo:

```
[0-0] ERROR webdriver: Failed downloading chromedriver v108: Download failed: ...
```

```ts
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.80.0',
        'wdio:chromedriverOptions': {
            binary: path.join(cacheDir, 'chromedriver-108.0.5359.71')
```

## Crear Tus Propios PageObjects

Puedes reutilizar los componentes utilizados en este servicio para tus propios objetos de página de revisión. Para ello, primero crea un archivo que defina todos tus selectores, por ejemplo:

```ts
// e.g. in /test/pageobjects/locators.ts
export const componentA = {
    elem: 'form', // elemento contenedor del componente
    submit: 'button[type="submit"]', // botón de envío
    username: 'input.username', // entrada de nombre de usuario
    password: 'input.password' // entrada de contraseña
}
```

Ahora puedes crear un objeto de página de la siguiente manera:

```ts
// e.g. in /test/pageobjects/loginForm.ts
import { PageDecorator, IPageDecorator, BasePage } from 'wdio-vscode-service'
import * as locatorMap, { componentA as componentALocators } from './locators'
export interface LoginForm extends IPageDecorator<typeof componentALocators> {}
@PageDecorator(componentALocators)
export class LoginForm extends BasePage<typeof componentALocators, typeof locatorMap> {
    /**
     * @private clave localizadora para identificar el mapa de localizadores (ver locators.ts)
     */
    public locatorKey = 'componentA' as const

    public login (username: string, password: string) {
        await this.username$.setValue(username)
        await this.password$.setValue(password)
        await this.submit$.click()
    }
}
```

Ahora en tu prueba, puedes usar tu objeto de página de la siguiente manera:

```ts
import { LoginForm } from '../pageobjects/loginForm'
import * as locatorMap from '../locators'

// e.g. in /test/specs/example.e2e.ts
describe('my extension', () => {
    it('should login', async () => {
        const loginForm = new LoginForm(locatorMap)
        await loginForm.login('admin', 'test123')

        // también puedes usar elementos del objeto de página directamente a través de `[selector]$`
        // o `[selector]$$`, por ejemplo:
        await loginForm.submit$.click()

        // o acceder a los localizadores directamente
        console.log(loginForm.locators.username)
        // muestra: "input.username"
    })
})
```

## Soporte de TypeScript

Si usas WebdriverIO con TypeScript, asegúrate de agregar `wdio-vscode-service` a tus `types` en tu `tsconfig.json`, por ejemplo:

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "types": [
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            // añade este servicio a tus tipos
            "wdio-devtools-service"
        ],
        "target": "es2019"
    }
}
```

## Soporte de Proxy

Durante la inicialización de este servicio, se descarga una distribución de ChromeDriver y VSCode. Puedes canalizar estas solicitudes a través de un proxy configurando la variable de entorno `HTTPS_PROXY` o `https_proxy`. Por ejemplo:

```bash
HTTPS_PROXY=http://127.0.0.1:1080 npm run wdio
```

## Referencias

Las siguientes extensiones de VS Code usan `wdio-vscode-service`:

- [Marquee](https://marketplace.visualstudio.com/items?itemName=stateful.marquee) (27k descargas)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (27.8m descargas)
- [DVC Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=Iterative.dvc) (11.2k descargas)
- [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) (1.2m descargas)
- [inlang – i18n supercharged](https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension) (3k descargas)

## Contribuir

Antes de publicar una solicitud de extracción, ejecuta lo siguiente:

1. `git clone git@github.com:webdriverio-community/wdio-vscode-service.git`
1. `cd wdio-vscode-service`
1. `npm install`
1. `npm run build`
1. `npm run test` (o `npm run ci`)

## Aprende Más

Si quieres aprender más sobre pruebas de extensiones de VSCode, consulta la charla de [Christian Bromann](https://twitter.com/bromann) en [OpenJS World 2022](https://www.youtube.com/watch?v=PhGNTioBUiU):

[![Testing VSCode Extensions at OpenJS World 2022](https://img.youtube.com/vi/PhGNTioBUiU/sddefault.jpg)](https://www.youtube.com/watch?v=PhGNTioBUiU)

---

Para más información sobre WebdriverIO, consulta la [página principal](https://webdriver.io) del proyecto.