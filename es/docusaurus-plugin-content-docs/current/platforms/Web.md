---
id: web
title: Navegadores web
description: Configura y ejecuta pruebas end-to-end, de componentes, visuales y de accesibilidad de WebdriverIO en Chrome, Firefox, Microsoft Edge y Safari.
---

WebdriverIO automatiza navegadores de escritorio (Chrome, Chromium, Firefox, Microsoft Edge y Safari) a través de drivers de navegador estándar. Por defecto, intenta abrir una sesión de [WebDriver BiDi](/docs/automationProtocols), el sucesor bidireccional del protocolo WebDriver clásico. BiDi habilita funciones como la simulación de red (network mocking) y la emulación de Web APIs. Establece `wdio:enforceWebDriverClassic: true` en tus capabilities para desactivarlo. No necesitas instalar los drivers tú mismo: define un `browserName` y WebdriverIO descargará e iniciará el Chromedriver, Geckodriver o Edgedriver correspondiente. También instala Chrome, Chromium o Firefox cuando no encuentra una instalación local. Microsoft Edge debe estar ya instalado, y Safaridriver viene incluido con macOS. El mismo testrunner también puede ejecutar pruebas dentro del navegador con el Browser Runner. Esto cubre pruebas unitarias y de componentes para React, Vue, Svelte, SolidJS, Preact, Lit y Stencil.

## Inicio rápido

Crea la estructura de un proyecto de forma interactiva con `npm init wdio@latest .`. Al pasar `--yes` se eligen los valores predeterminados: Mocha, Chrome y page objects. Para configurar un proyecto manualmente, instala el testrunner, un adaptador de framework, un reporter y `tsx` para TypeScript:

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

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }, {
        browserName: 'firefox'
    }],
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

```ts title="test/specs/login.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url('https://the-internet.herokuapp.com/login')

        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveText(
            expect.stringContaining('You logged into a secure area!'))
    })
})
```

```sh
npx wdio run ./wdio.conf.ts
```

Cada capability obtiene sus propios procesos worker, por lo que esto ejecuta la spec tanto en Chrome como en Firefox. Otros valores válidos de `browserName` son `chromium`, `msedge` y `safari`. Para ejecutar en modo headless, añade argumentos del navegador como `'goog:chromeOptions': { args: ['headless', 'disable-gpu'] }`. Consulta [Ejecutar el navegador en modo headless](/docs/capabilities#run-browser-headless) para Firefox y Edge; Safari no tiene modo headless.

## Elige tu camino

Pruebas end-to-end en distintos navegadores:

- [Capabilities](/docs/capabilities): opciones del navegador, modo headless, canales del navegador (Canary, Nightly, Safari Technology Preview) y opciones de driver `wdio:*`.
- [Binarios de drivers](/docs/driverbinaries): cómo funciona la configuración automática del navegador y del driver, y cómo apuntar a binarios personalizados.
- [Protocolos de automatización](/docs/automationProtocols): WebDriver frente a WebDriver BiDi.
- [Comandos de WebDriver BiDi](/docs/api/webdriverBidi): comandos sin procesar del protocolo BiDi disponibles en el objeto `browser`.
- [Selectores](/docs/selectors): selectores CSS, de texto, ARIA, profundos (shadow DOM) y de React.
- [Espera automática](/docs/autowait) y [Timeouts](/docs/timeouts): cómo espera WebdriverIO a los elementos y qué ajustar.
- [Multi-remote](/docs/multiremote): controla varios navegadores en una sola prueba, por ejemplo, para aplicaciones de chat o WebRTC.

Funciones del navegador que requieren WebDriver BiDi (Chrome, Edge y Firefox; no Safari):

- [Mocks y spies de peticiones](/docs/mocksandspies): intercepta, modifica o simula peticiones de red con `browser.mock()`. Consulta también el [objeto Mock](/docs/api/mock).
- [Emulación](/docs/emulation): emula geolocalización, media features, user agent, estado sin conexión, configuración regional, zona horaria, pantalla y dispositivos con `browser.emulate()`.

Pruebas de componentes y unitarias en un navegador real:

- [Pruebas de componentes](/docs/component-testing): cómo funciona el [Browser Runner](/docs/runner#browser-runner) basado en Vite y cómo configurarlo.
- Guías de frameworks: [React](/docs/component-testing/react), [Vue.js](/docs/component-testing/vue), [Svelte](/docs/component-testing/svelte), [SolidJS](/docs/component-testing/solid), [Preact](/docs/component-testing/preact), [Lit](/docs/component-testing/lit), [Stencil](/docs/component-testing/stencil).
- [Mocking](/docs/component-testing/mocking) y [Cobertura](/docs/component-testing/coverage) para pruebas de componentes.

Pruebas visuales y de accesibilidad:

- [Pruebas visuales](/docs/visual-testing): comparación de imágenes de pantalla, de elementos y de página completa con `@wdio/visual-service`.
- [Snapshot](/docs/snapshot): aserciones de snapshots del DOM y de objetos.
- [Axe Core](/docs/accessibility-testing/axe-core): ejecuta análisis de accesibilidad con axe de Deque desde tus pruebas.

Escalado:

- [Selenium Grid](/docs/seleniumgrid), [Servicios en la nube](/docs/cloudservices) y [Docker](/docs/docker): ejecuta navegadores de forma remota.
- [Sharding](/docs/sharding): divide una suite entre varias máquinas de CI.

Una prueba de componentes usa el mismo archivo de configuración con un runner diferente. Por ejemplo, para usar el preset de React:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        preset: 'react'
    }],
    specs: ['./src/**/*.test.tsx'],
    capabilities: [{
        browserName: 'chrome'
    }],
    framework: 'mocha',
    reporters: ['spec']
}
```

El Browser Runner requiere `@wdio/browser-runner`. El preset de React también necesita `@vitejs/plugin-react`, y las guías recomiendan `@testing-library/react` para el renderizado. Existen presets para `vue`, `svelte`, `solid`, `react`, `preact` y `stencil`. Para cualquier otro caso, usa `viteConfig` en su lugar.

## Solución de problemas

- Chrome no se inicia en CI con "user data directory is already in use" o "DevToolsActivePort file doesn't exist": consulta [Headless y servidores de pantalla](/docs/headless-and-display-servers#troubleshooting).
- `browser.mock()` o `browser.emulate()` no tienen efecto: la sesión no está usando WebDriver BiDi. Revisa tu navegador (Safari no es compatible con BiDi), tu proveedor en la nube y `wdio:enforceWebDriverClassic`.
- No se pueden descargar drivers o navegadores detrás de un proxy: consulta [Host personalizado de descarga de drivers](/docs/capabilities#custom-driver-download-host) y [Configuración de proxy](/docs/proxy).
- Pruebas inestables: consulta [Reintentar pruebas inestables](/docs/retry) y [Depuración](/docs/debugging).

## Próximos pasos

- Referencia de [Configuración](/docs/configuration) para cada opción de `wdio.conf.ts`.
- [Configuración de TypeScript](/docs/typescript) y [Frameworks](/docs/frameworks) (Mocha, Jasmine, Cucumber).
- [Patrón Page Object](/docs/pageobjects) para estructurar suites más grandes.
- [MCP](/docs/mcp) para permitir que un agente de IA controle una sesión de navegador a través de WebdriverIO.
- Otras plataformas: [Aplicaciones móviles](/docs/platforms/mobile), [Aplicaciones de escritorio](/docs/platforms/desktop), [Extensiones y editores](/docs/platforms/apps-and-extensions).