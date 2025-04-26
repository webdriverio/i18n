---
id: vscode-extensions
title: Pruebas de Extensiones de VS Code
---

WebdriverIO te permite probar sin problemas tus extensiones de [VS Code](https://code.visualstudio.com/) de extremo a extremo en el IDE de escritorio VS Code o como extensión web. Solo necesitas proporcionar una ruta a tu extensión y el framework hace el resto. Con el [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) todo está cuidado y mucho más:

- 🏗️ Instalación de VSCode (ya sea estable, insiders o una versión específica)
- ⬇️ Descarga de Chromedriver específico para la versión dada de VSCode
- 🚀 Te permite acceder a la API de VSCode desde tus pruebas
- 🖥️ Iniciar VSCode con configuraciones de usuario personalizadas (incluyendo soporte para VSCode en Ubuntu, MacOS y Windows)
- 🌐 O sirve VSCode desde un servidor para ser accedido por cualquier navegador para probar extensiones web
- 📔 Creación de page objects con localizadores que coinciden con tu versión de VSCode

## Primeros Pasos

Para iniciar un nuevo proyecto WebdriverIO, ejecuta:

```sh
npm create wdio@latest ./
```

Un asistente de instalación te guiará a través del proceso. Asegúrate de seleccionar _"VS Code Extension Testing"_ cuando te pregunte qué tipo de pruebas te gustaría hacer, después simplemente mantén los valores predeterminados o modifícalos según tus preferencias.

## Configuración de Ejemplo

Para usar el servicio, debes agregar `vscode` a tu lista de servicios, opcionalmente seguido de un objeto de configuración. Esto hará que WebdriverIO descargue los binarios de VSCode dados y la versión apropiada de Chromedriver:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" o "stable" para la última versión de VSCode
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * opcionalmente puedes definir la ruta donde WebdriverIO almacena todos
     * los binarios de VSCode y Chromedriver, por ejemplo:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Si defines `wdio:vscodeOptions` con cualquier otro `browserName` que no sea `vscode`, por ejemplo `chrome`, el servicio servirá la extensión como extensión web. Si pruebas en Chrome, no se requiere un servicio de controlador adicional, por ejemplo:

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

En tu `tsconfig.json` asegúrate de agregar `wdio-vscode-service` a tu lista de tipos:

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
        "target": "es2020",
        "moduleResolution": "node16"
    }
}
```

## Uso

Puedes usar el método `getWorkbench` para acceder a los page objects para los localizadores que coinciden con tu versión deseada de VSCode:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

Desde allí puedes acceder a todos los page objects utilizando los métodos de page object correctos. Descubre más sobre todos los page objects disponibles y sus métodos en la [documentación de page objects](https://webdriverio-community.github.io/wdio-vscode-service/).

### Accediendo a las APIs de VSCode

Si deseas ejecutar cierta automatización a través de la [API de VSCode](https://code.visualstudio.com/api/references/vscode-api), puedes hacerlo ejecutando comandos remotos a través del comando personalizado `executeWorkbench`. Este comando permite ejecutar código de forma remota desde tu prueba dentro del entorno de VSCode y permite acceder a la API de VSCode. Puedes pasar parámetros arbitrarios a la función que luego se propagarán a la función. El objeto `vscode` siempre se pasará como primer argumento seguido de los parámetros de la función externa. Ten en cuenta que no puedes acceder a variables fuera del ámbito de la función, ya que la devolución de llamada se ejecuta de forma remota. Aquí hay un ejemplo:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // muestra: "I am an API call!"
```

Para la documentación completa de page objects, consulta la [documentación](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Puedes encontrar varios ejemplos de uso en la [suite de pruebas de este proyecto](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Más Información

Puedes aprender más sobre cómo configurar el [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) y cómo crear page objects personalizados en la [documentación del servicio](/docs/wdio-vscode-service). También puedes ver la siguiente charla de [Christian Bromann](https://twitter.com/bromann) sobre [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU):

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>