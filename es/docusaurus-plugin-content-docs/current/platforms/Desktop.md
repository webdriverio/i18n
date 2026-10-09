---
id: desktop
title: Aplicaciones de escritorio
description: Elige la configuración adecuada de WebdriverIO para aplicaciones nativas de macOS y para aplicaciones Electron, Tauri y Dioxus en macOS, Windows y Linux, y ejecuta una primera prueba.
---

La forma en que WebdriverIO automatiza una aplicación de escritorio depende de cómo esté construida la aplicación. Las aplicaciones nativas de macOS se automatizan mediante [Appium](/docs/appium) con el driver Mac2 (`'appium:automationName': 'Mac2'`), que requiere Xcode. Las aplicaciones creadas con un framework basado en web se controlan a través de su motor de navegador integrado mediante un servicio dedicado de WebdriverIO. El [servicio de Electron](/docs/desktop-testing/electron) utiliza Chromium a través de un Chromedriver instalado automáticamente y también puede llamar a las APIs del proceso principal de Electron. El [servicio de Tauri](/docs/desktop-testing/tauri) y el [servicio de Dioxus](/docs/desktop-testing/dioxus) controlan el webview del sistema operativo: WebView2 en Windows, WKWebView en macOS y WebKitGTK en Linux. Estos tres servicios ejecutan la misma suite en Windows, macOS y Linux. Actualmente no hay un driver recomendado para aplicaciones nativas de Windows: el Windows Driver de Appium está construido sobre WinAppDriver de Microsoft, que ya no recibe mantenimiento. No existe soporte documentado para automatizar aplicaciones nativas arbitrarias de Linux.

| Tipo de aplicación | macOS | Windows | Linux | Cómo |
|----------|-------|---------|-------|-----|
| Aplicación nativa | Sí | No recomendado | No documentado | Driver Mac2 de Appium |
| Electron | Sí | Sí | Sí | `@wdio/electron-service` (Chromedriver) |
| Tauri | Sí | Sí | Sí | `@wdio/tauri-service` (plugin integrado, `tauri-driver` o CrabNebula) |
| Dioxus | Sí | Sí | Sí | `@wdio/dioxus-service` (driver integrado; driver externo solo en Windows) |

## Inicio rápido

`npm create wdio@latest ./` genera la estructura para todas estas opciones. Elige "Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications" y luego tu framework. Cada una de las configuraciones siguientes también necesita `@wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx` y un `tsconfig.json` con `"types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]`.

### Electron (macOS, Windows, Linux)

```sh
npm install --save-dev @wdio/electron-service
```

```ts title="wdio.conf.ts"
/// <reference types="@wdio/electron-service" />
export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'electron',
        'wdio:electronServiceOptions': {
            // solo es necesario si falla la detección automática de la salida de Electron Forge / electron-builder
            // appBinaryPath: './dist-electron/linux-unpacked/myApp',
            appArgs: []
        }
    }],
    services: ['electron'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/app.e2e.ts"
import { browser } from '@wdio/globals'

describe('Electron Testing', () => {
    it('should print application title', async () => {
        console.log('Hello', await browser.getTitle(), 'application!')
    })
})
```

Usa `browser.electron.execute((electron, ...args) => { ... })` para ejecutar código en el proceso principal, y `browser.electron.mock()` para simular (mock) las APIs de Electron.

### Aplicación nativa de macOS (Appium Mac2)

```sh
npm install --save-dev @wdio/appium-service appium appium-mac2-driver
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        platformName: 'Mac',
        'appium:automationName': 'Mac2',
        'appium:bundleId': 'com.apple.calculator'
    }],
    services: ['appium'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/calculator.e2e.ts"
import { expect, $ } from '@wdio/globals'

describe('MacOS Testing', () => {
    it('should calculate the meaning of life', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    })
})
```

`appium:bundleId` selecciona la aplicación que se iniciará al comenzar la sesión.

### Tauri y Dioxus

Ambos requieren una adición en el lado de Rust de tu aplicación, así que sigue sus guías de inicio rápido:

- Tauri: añade el crate `tauri-plugin-wdio-webdriver` (el proveedor integrado) y luego usa `services: [['tauri', { appBinaryPath: './src-tauri/target/release/my-tauri-app', driverProvider: 'embedded' }]]`. Consulta el [Inicio rápido de Tauri](/docs/desktop-testing/tauri/quick-start).
- Dioxus: añade el crate `wdio-dioxus-bridge` y crea una compilación de depuración (`cargo build`). Luego usa `services: [['dioxus', { driverProvider: 'embedded' }]]` con `browserName: 'dioxus'` y `'dioxus:options': { application: './target/debug/my-app' }`. Consulta el [Inicio rápido de Dioxus](/docs/desktop-testing/dioxus/quick-start).

## Elige tu camino

- [macOS](/docs/desktop-testing/macos): aplicaciones nativas de macOS con Appium y el driver Mac2.
- [Windows](/docs/desktop-testing/windows): estado actual de la automatización de aplicaciones nativas de Windows.
- [Electron](/docs/desktop-testing/electron): configuración inicial, luego [configuración](/docs/desktop-testing/electron/configuration) (incluidas las rutas de los binarios por sistema operativo), [acceso a las APIs de Electron](/docs/desktop-testing/electron/api), [referencia de la API y mocking](/docs/desktop-testing/electron/api-reference), [gestión de ventanas](/docs/desktop-testing/electron/window-management), [deeplinks](/docs/desktop-testing/electron/deeplink-testing), [modo independiente](/docs/desktop-testing/electron/standalone) y [depuración](/docs/desktop-testing/electron/debugging).
- [Tauri](/docs/desktop-testing/tauri): [soporte de plataformas](/docs/desktop-testing/tauri/platform-support), [configuración](/docs/desktop-testing/tauri/configuration), [configuración del plugin](/docs/desktop-testing/tauri/plugin-setup), [CrabNebula](/docs/desktop-testing/tauri/crabnebula-setup), [Edge WebDriver en Windows](/docs/desktop-testing/tauri/edge-webdriver-windows), [ejemplos de uso](/docs/desktop-testing/tauri/usage-examples) y la [referencia de la API](/docs/desktop-testing/tauri/api).
- [Dioxus](/docs/desktop-testing/dioxus): [soporte de plataformas](/docs/desktop-testing/dioxus/platform-support), [configuración](/docs/desktop-testing/dioxus/configuration), [configuración del bridge](/docs/desktop-testing/dioxus/plugin-setup), [modo navegador](/docs/desktop-testing/dioxus/browser-mode) (pruebas solo de frontend en Chrome con comandos simulados), [ejemplos de uso](/docs/desktop-testing/dioxus/usage-examples) y la [referencia de la API](/docs/desktop-testing/dioxus/api).
- [Multi-remote](/docs/multiremote): los servicios de Electron, Tauri y Dioxus admiten sesiones multi-remote, p. ej., dos instancias de la aplicación en una misma prueba.

## Linux

En Linux, WebdriverIO controla aplicaciones Electron, Tauri y Dioxus. Aspectos a tener en cuenta:

- CI headless: estas aplicaciones necesitan un servidor de pantalla. Cuando no existe ninguna pantalla, el testrunner inicia Weston, o Xvfb como alternativa. Establece `displayServerAutoInstall: true` para instalar uno si ninguno de los dos está instalado. Como alternativa, envuelve el testrunner con xvfb-run, p. ej., `xvfb-run -a npx wdio run wdio.conf.ts`. Consulta [Headless y servidores de pantalla](/docs/headless-and-display-servers).
- Tauri con el proveedor `official` necesita WebKitWebDriver (paquete `webkit2gtk-driver`). El proveedor `embedded` no necesita ningún driver externo.
- Dioxus solo admite el proveedor `embedded` en Linux, y compilar aplicaciones Dioxus requiere las bibliotecas de desarrollo de WebKitGTK.
- Electron en Ubuntu 24.04+ y otras distribuciones con AppArmor habilitado: establece la opción del servicio `apparmorAutoInstall` si Electron no logra iniciarse.

## Solución de problemas

- Electron: [Problemas comunes](/docs/desktop-testing/electron/common-issues), p. ej., "DevToolsActivePort file doesn't exist" en CI.
- Tauri: [Solución de problemas](/docs/desktop-testing/tauri/troubleshooting), incluidas las discrepancias de versión entre Edge WebDriver y WebView2.
- Dioxus: [Solución de problemas](/docs/desktop-testing/dioxus/troubleshooting).
- macOS: consulta el proyecto [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) para la configuración específica del driver, como Xcode.

## Próximos pasos

- Referencia de [Configuración](/docs/configuration) para cada opción de `wdio.conf.ts`.
- Opciones del [Servicio de Appium](/docs/appium-service) para la configuración de Mac2.
- Otras plataformas: [Navegadores web](/docs/platforms/web), [Aplicaciones móviles](/docs/platforms/mobile), [Extensiones y editores](/docs/platforms/apps-and-extensions).