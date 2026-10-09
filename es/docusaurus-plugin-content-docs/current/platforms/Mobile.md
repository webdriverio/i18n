---
id: mobile
title: Aplicaciones móviles
description: Configura y ejecuta pruebas de WebdriverIO para aplicaciones nativas, híbridas y web móviles en emuladores de Android, simuladores de iOS, dispositivos reales y nubes de dispositivos.
---

WebdriverIO automatiza Android e iOS a través de [Appium](/docs/appium), que habla el protocolo WebDriver. Tus pruebas usan el mismo objeto `browser` (con el alias `driver`), los selectores `$`/`$$` y los matchers de `expect` que las pruebas de navegador. Appium dirige cada sesión a un driver de plataforma elegido mediante `appium:automationName`. Para Android es `UiAutomator2`, con Espresso como alternativa que habilita estrategias de selectores adicionales. Para iOS y iPadOS es `XCUITest`. Con estos drivers puedes probar aplicaciones nativas y web móvil en Chrome en Android o Safari en iOS. También puedes probar aplicaciones híbridas, alternando entre el contexto nativo y los webviews incrustados. Las sesiones pueden ejecutarse en emuladores de Android, simuladores de iOS, dispositivos reales o nubes de dispositivos como Sauce Labs, BrowserStack, TestingBot y TestMu AI. El [`@wdio/appium-service`](/docs/appium-service) inicia y detiene un servidor de Appium local por ti. Además de la API de Appium sin procesar, WebdriverIO añade [comandos móviles](/docs/api/mobile) multiplataforma como `tap`, `swipe`, `longPress`, `scrollIntoView` y `switchContext`.

## Inicio rápido

Requisitos previos: Android Studio con un Android SDK y un emulador para Android; Xcode y un simulador en macOS para iOS. `npx appium-installer` te guía en la configuración del entorno, y `npm init wdio@latest .` crea la estructura de un proyecto móvil (elige Android o iOS). Para configurarlo manualmente:

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter @wdio/appium-service appium tsx
npx appium driver install uiautomator2   # Android
npx appium driver install xcuitest       # iOS
```

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Android GoogleAPI Emulator',
        'appium:platformVersion': '12.0',
        'appium:automationName': 'UiAutomator2',
        'appium:app': './path/to/app.apk'
    }],
    services: ['appium'],
    logLevel: 'info',
    waitforTimeout: 10000,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/app.e2e.ts"
import { expect, driver, $ } from '@wdio/globals'

describe('My app', () => {
    it('should open the contacts screen', async () => {
        await $('~Contacts').click()
        await expect($('~Add contact')).toBeDisplayed()
    })

    it('should interact with a webview', async () => {
        await driver.switchContext({ title: 'My Webview Title' })
        await expect($('h1')).toBeDisplayed()
    })
})
```

```sh
npx wdio run ./wdio.conf.ts
```

`~` es el selector de accessibility id: se corresponde con `content-description` en Android y con `accessibilityIdentifier` en iOS, y es la estrategia multiplataforma preferida. Reemplaza los ids de ejemplo, el título del webview y la ruta de la aplicación por los tuyos.

Otros objetivos solo cambian las capabilities:

```ts title="iOS simulator (native app)"
{
    platformName: 'iOS',
    'appium:deviceName': 'iPhone Simulator',
    'appium:platformVersion': '16.4',
    'appium:automationName': 'XCUITest',
    'appium:app': './path/to/MyApp.app' // .app para simuladores, .ipa firmado para dispositivos reales
}
```

```ts title="Mobile web (Chrome on an Android emulator)"
{
    platformName: 'Android',
    browserName: 'Chrome',
    'appium:deviceName': 'Android GoogleAPI Emulator',
    'appium:platformVersion': '12.0',
    'appium:automationName': 'UiAutomator2'
}
```

Para web móvil en iOS, usa `platformName: 'iOS'`, `browserName: 'Safari'` y `'appium:automationName': 'XCUITest'`.

## Elige tu camino

- [Configuración de Appium](/docs/appium): qué plataformas cubre Appium (iOS, Android, Tizen, aplicaciones de TV) y cómo instalar las herramientas.
- [Servicio de Appium](/docs/appium-service): opciones del servicio (`args`, `command`, `logPath`), `npx start-appium-inspector` para abrir el Appium Inspector, y un optimizador beta para selectores XPath lentos.
- [Comandos móviles](/docs/api/mobile): gestos y utilidades multiplataforma. Cubre las aplicaciones híbridas con [`getContexts`](/docs/api/mobile/getContexts) y [`switchContext`](/docs/api/mobile/switchContext), además de las capabilities de webview para iOS.
- [Selectores móviles](/docs/selectors#mobile-selectors): accessibility id, Android UiAutomator, data/view matchers de Espresso y predicate strings y class chains de iOS.
- [Comandos del protocolo de Appium](/docs/api/appium): los endpoints de Appium sin procesar disponibles en `driver`.
- [Aplicaciones Flutter](/docs/flutter-testing/introduction): por qué Flutter necesita el Appium Flutter Driver; después, [prepara la aplicación](/docs/flutter-testing/preparing-flutter-application), [configura Appium](/docs/flutter-testing/base-appium-configuration), [configura WebdriverIO](/docs/flutter-testing/setting-up-webdriverio) y [escribe pruebas](/docs/flutter-testing/writing-tests).
- [Servicios en la nube](/docs/cloudservices): conéctate a Sauce Labs, BrowserStack, TestingBot, TestMu AI, Perfecto o RobotActions para ejecutar en dispositivos reales alojados.
- [Pruebas visuales](/docs/visual-testing): comparación de imágenes para aplicaciones nativas, aplicaciones híbridas y navegadores móviles. Para Percy en móvil, consulta [App Percy](/docs/visual-testing/integrate-with-app-percy).
- [Multi-remote](/docs/multiremote): coordina varios dispositivos o navegadores en una sola prueba.

Emular el viewport de un dispositivo en un navegador de escritorio con [`browser.emulate('device', ...)`](/docs/emulation) no es hacer pruebas móviles. Los motores de los navegadores de escritorio difieren de los móviles, así que utiliza Appium con un navegador móvil real en su lugar.

## Solución de problemas

- La sesión no se inicia: asegúrate de que el driver de Appium para tu `appium:automationName` esté instalado y de que el emulador o simulador esté en ejecución. Usa `port: 4723` a menos que hayas cambiado el puerto de Appium.
- iOS no encuentra un webview: prueba con `appium:webviewConnectRetries`, `appium:webviewConnectTimeout` o `appium:includeSafariInWebviews` (consulta [Aplicaciones híbridas](/docs/api/mobile#hybrid-apps)).
- El webview de Android tarda en aparecer: ajusta `androidWebviewConnectionRetryTime` y `androidWebviewConnectTimeout` en `getContexts`/`switchContext`.
- Los widgets de Flutter no se encuentran con selectores nativos: es lo esperado. Usa el driver de Flutter y los finders descritos en la [guía de Flutter](/docs/flutter-testing/introduction).

## Próximos pasos

- Referencias de [Configuración](/docs/configuration) y [Capabilities](/docs/capabilities).
- [Patrón Page Object](/docs/pageobjects) para compartir pantallas entre las specs de Android e iOS.
- [MCP](/docs/mcp) para permitir que un agente de IA controle sesiones de iOS y Android a través de Appium.
- Otras plataformas: [Navegadores web](/docs/platforms/web), [Aplicaciones de escritorio](/docs/platforms/desktop), [Extensiones y editores](/docs/platforms/apps-and-extensions).