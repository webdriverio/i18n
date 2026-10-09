---
id: apps-and-extensions
title: Extensiones y editores
description: Carga una extensión de navegador o una extensión de VS Code en una sesión de WebdriverIO y pruébala de principio a fin.
---

WebdriverIO prueba extensiones de navegador y extensiones de editor cargándolas en la aplicación anfitriona real. Las extensiones de navegador (web) se ejecutan dentro de Chrome o Firefox. Se cargan mediante las capacidades del navegador: `--load-extension` o un `.crx` en base64 a través de `goog:chromeOptions` en Chrome, o `browser.installAddOn()` para un `.xpi` en Firefox. En una sesión de WebDriver BiDi también puedes instalar y eliminar una extensión a mitad de la sesión con `browser.installExtension()` y `browser.uninstallExtension()`. Safari no tiene sesión BiDi, por lo que ese comando no cubre Safari. A partir de ahí, pruebas los content scripts y las páginas emergentes con los comandos normales de WebDriver. Las extensiones de VS Code se prueban con el servicio comunitario [`wdio-vscode-service`](/docs/wdio-vscode-service). Este descarga VS Code (stable, insiders o una versión específica) y el Chromedriver correspondiente, y luego inicia VS Code con tu extensión y configuraciones de usuario personalizadas. Los page objects para el workbench están disponibles a través de `browser.getWorkbench()`, y `browser.executeWorkbench()` ejecuta código contra la API de VS Code. El mismo servicio también puede servir VS Code en un navegador para probar extensiones web. Los plugins de Obsidian también tienen un servicio comunitario.

## Inicio rápido

Primero instala el testrunner y el soporte para TypeScript:

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx
```

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

### Extensión de Chrome

Compila tu extensión en una carpeta (aquí `./dist`) y cárgala con el argumento de Chrome `--load-extension`:

```ts title="wdio.conf.ts"
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [`--load-extension=${path.join(__dirname, 'dist')}`]
        }
    }],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/extension.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Web Extension', () => {
    it('should inject its content script', async () => {
        await browser.url('https://webdriver.io')
        // reemplázalo con un elemento que tu content script añada a la página
        await expect($('#my-extension-root')).toBeExisting()
    })
})
```

Hacer clic en el icono de la extensión en la barra de herramientas no funciona. Para probar un `default_popup`, busca el id de la extensión en `chrome://extensions/` y abre `chrome-extension://<id>/<popup>.html` con `browser.url()`. La [guía de extensiones web](/docs/extension-testing/web-extensions#test-popup-modal-in-chrome) incluye un comando personalizado `openExtensionPopup` listo para usar con este fin.

### Extensión de VS Code

```sh
npm install --save-dev wdio-vscode-service
```

Añade `"wdio-vscode-service"` al array `types` en `tsconfig.json`.

```ts title="wdio.conf.ts"
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'vscode',
        browserVersion: 'stable', // también es posible: "insiders" o una versión específica, p. ej. "1.80.0"
        'wdio:vscodeOptions': {
            // apunta al directorio donde se encuentra el package.json de la extensión
            extensionPath: __dirname,
            userSettings: {
                'editor.fontSize': 14
            }
        }
    }],
    services: ['vscode'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/vscode.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('VS Code Extension Testing', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toContain('[Extension Development Host]')
    })
})
```

Para probar la extensión como una extensión web de VS Code, establece `browserName: 'chrome'` y mantén `wdio:vscodeOptions`. En ese modo, `browserVersion` solo puede ser `stable` o `insiders`. `npm create wdio@latest ./` con "VS Code Extension Testing" genera esta configuración por ti.

## Elige tu camino

- [Pruebas de extensiones web](/docs/extension-testing/web-extensions): carga extensiones en Chrome (carpeta o `.crx`) y Firefox (`.xpi` mediante [`installAddOn`](/docs/api/gecko#installaddon)), o instala y elimina una a mitad de la sesión con [`installExtension`](/docs/api/browser/installExtension). Las extensiones web de Safari no están cubiertas.
- [Servicio de perfiles de Firefox](/docs/firefox-profile-service): crea un perfil de Firefox que incluya extensiones.
- [Pruebas de extensiones de VS Code](/docs/extension-testing/vscode-extensions): configuración, configuración de TypeScript, page objects del workbench y `executeWorkbench`.
- [Servicio de VS Code](/docs/wdio-vscode-service): todas las opciones del servicio, como `cachePath`, y cómo escribir page objects personalizados.
- [Servicio de pruebas de plugins de Obsidian](/docs/wdio-obsidian-service): un servicio comunitario que prueba plugins de Obsidian en distintas versiones de Obsidian en Windows, macOS, Linux y Android.
- [Comandos personalizados](/docs/customcommands): empaqueta helpers como `openExtensionPopup` para reutilizarlos.

Las pruebas de extensiones web se ejecutan en una sesión normal de Chrome o Firefox, por lo que todo lo descrito en [Navegadores web](/docs/platforms/web) se aplica, incluidos los selectores, el mocking de red y las pruebas visuales.

## Solución de problemas

- Firefox rechaza una extensión compilada localmente debido a la firma: instálala en el hook `before` con `browser.installAddOn(extension.toString('base64'), true)` en lugar de a través de un perfil. Compila el `.xpi` con `npx web-ext build`.
- Usar Edge, Brave u Opera en lugar de Chrome: los mismos argumentos suelen funcionar con la capacidad de opciones de ese navegador, p. ej. `ms:edgeOptions`.
- Los binarios de VS Code y Chromedriver se descargan en un directorio de caché. Para controlar dónde se almacenan, p. ej. para guardarlos en caché en CI, establece `services: [['vscode', { cachePath: __dirname }]]`.
- TypeScript no encuentra `getWorkbench` o `executeWorkbench`: añade `wdio-vscode-service` a `compilerOptions.types`.

## Próximos pasos

- Referencia de [Configuración](/docs/configuration) para cada opción de `wdio.conf.ts`.
- [Electron](/docs/desktop-testing/electron) para probar aplicaciones de escritorio completas basadas en Chromium.
- Otras plataformas: [Navegadores web](/docs/platforms/web), [Aplicaciones móviles](/docs/platforms/mobile), [Aplicaciones de escritorio](/docs/platforms/desktop).