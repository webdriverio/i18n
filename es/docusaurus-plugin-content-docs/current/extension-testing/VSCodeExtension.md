---
id: vscode-extensions
title: Pruebas de extensiones de VS Code
description: "Prueba extensiones de VS Code de extremo a extremo en el IDE de escritorio o como extensiones web con WebdriverIO y el servicio de VS Code."
---

WebdriverIO te permite probar sin problemas tus extensiones de [VS Code](https://code.visualstudio.com/) de extremo a extremo en el IDE de escritorio de VS Code o como extensión web. Solo necesitas proporcionar una ruta a tu extensión y el framework se encarga del resto. Con el [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) todo está resuelto y mucho más:

- 🏗️ Instala VSCode (ya sea stable, insiders o una versión específica)
- ⬇️ Descarga el Chromedriver específico para la versión de VSCode indicada
- 🚀 Te permite acceder a la API de VSCode desde tus pruebas
- 🖥️ Inicia VSCode con configuraciones de usuario personalizadas (incluido soporte para VSCode en Ubuntu, MacOS y Windows)
- 🌐 O sirve VSCode desde un servidor para que cualquier navegador pueda acceder a él y probar extensiones web
- 📔 Inicializa page objects con localizadores que coinciden con tu versión de VSCode

## Primeros pasos

Para iniciar un nuevo proyecto de WebdriverIO, ejecuta:

```sh
npm create wdio@latest ./
```

Un asistente de instalación te guiará a través del proceso. Asegúrate de seleccionar _"VS Code Extension Testing"_ cuando te pregunte qué tipo de pruebas te gustaría realizar; después, simplemente mantén los valores predeterminados o modifícalos según tus preferencias.

## Configuración de ejemplo

Para usar el servicio necesitas añadir `vscode` a tu lista de servicios, seguido opcionalmente de un objeto de configuración. Esto hará que WebdriverIO descargue los binarios de VSCode indicados y la versión de Chromedriver adecuada:

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
     * los binarios de VSCode y Chromedriver, p. ej.:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Si defines `wdio:vscodeOptions` con cualquier otro `browserName` que no sea `vscode`, p. ej. `chrome`, el servicio servirá la extensión como extensión web. Si pruebas en Chrome no se requiere ningún servicio de driver adicional, p. ej.:

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

_Nota:_ al probar extensiones web solo puedes elegir entre `stable` o `insiders` como `browserVersion`.

### Configuración de TypeScript

En tu `tsconfig.json` asegúrate de añadir `wdio-vscode-service` a tu lista de tipos:

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

Luego puedes usar el método `getWorkbench` para acceder a los page objects con los localizadores que coinciden con la versión de VSCode deseada:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

A partir de ahí puedes acceder a todos los page objects usando los métodos de page object correspondientes. Obtén más información sobre todos los page objects disponibles y sus métodos en la [documentación de page objects](https://webdriverio-community.github.io/wdio-vscode-service/).

### Acceso a las APIs de VSCode

Si quieres ejecutar cierta automatización a través de la [API de VSCode](https://code.visualstudio.com/api/references/vscode-api), puedes hacerlo ejecutando comandos remotos mediante el comando personalizado `executeWorkbench`. Este comando permite ejecutar código de forma remota desde tu prueba dentro del entorno de VSCode y permite acceder a la API de VSCode. Puedes pasar parámetros arbitrarios a la función, que luego se propagarán dentro de ella. El objeto `vscode` siempre se pasará como primer argumento, seguido de los parámetros de la función externa. Ten en cuenta que no puedes acceder a variables fuera del ámbito de la función, ya que el callback se ejecuta de forma remota. Aquí tienes un ejemplo:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // muestra: "I am an API call!"
```

Para consultar la documentación completa de page objects, revisa la [documentación](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Puedes encontrar varios ejemplos de uso en el [conjunto de pruebas de este proyecto](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Más información

Puedes obtener más información sobre cómo configurar el [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) y cómo crear page objects personalizados en la [documentación del servicio](/docs/wdio-vscode-service). También puedes ver la siguiente charla de [Christian Bromann](https://twitter.com/bromann) sobre [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU):

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>