---
id: desktop
title: Aplicativos Desktop
description: Escolha a configuração certa do WebdriverIO para aplicativos nativos do macOS e para aplicativos Electron, Tauri e Dioxus no macOS, Windows e Linux, e execute um primeiro teste.
---

A forma como o WebdriverIO automatiza um aplicativo desktop depende de como o aplicativo é construído. Aplicativos nativos do macOS são automatizados através do [Appium](/docs/appium) com o driver Mac2 (`'appium:automationName': 'Mac2'`), que requer o Xcode. Aplicativos construídos com um framework baseado na web são controlados através de seu motor de navegador embutido por um serviço dedicado do WebdriverIO. O [serviço Electron](/docs/desktop-testing/electron) usa o Chromium por meio de um Chromedriver instalado automaticamente e também pode chamar APIs do processo principal do Electron. O [serviço Tauri](/docs/desktop-testing/tauri) e o [serviço Dioxus](/docs/desktop-testing/dioxus) controlam o webview do sistema operacional: WebView2 no Windows, WKWebView no macOS e WebKitGTK no Linux. Esses três serviços executam a mesma suíte no Windows, macOS e Linux. Aplicativos nativos do Windows não têm um driver recomendado atualmente: o Windows Driver do Appium é construído sobre o WinAppDriver da Microsoft, que não é mais mantido. Não há suporte documentado para automatizar aplicativos nativos arbitrários do Linux.

| Tipo de aplicativo | macOS | Windows | Linux | Como |
|----------|-------|---------|-------|-----|
| Aplicativo nativo | Sim | Não recomendado | Não documentado | Driver Mac2 do Appium |
| Electron | Sim | Sim | Sim | `@wdio/electron-service` (Chromedriver) |
| Tauri | Sim | Sim | Sim | `@wdio/tauri-service` (plugin embutido, `tauri-driver` ou CrabNebula) |
| Dioxus | Sim | Sim | Sim | `@wdio/dioxus-service` (driver embutido; driver externo apenas no Windows) |

## Início rápido

`npm create wdio@latest ./` gera a estrutura para todos esses casos. Escolha "Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications" e depois o seu framework. Cada configuração abaixo também precisa de `@wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx` e de um `tsconfig.json` com `"types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]`.

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
            // necessário apenas se a detecção automática da saída do Electron Forge / electron-builder falhar
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

Use `browser.electron.execute((electron, ...args) => { ... })` para executar código no processo principal e `browser.electron.mock()` para simular (mock) APIs do Electron.

### Aplicativo nativo do macOS (Appium Mac2)

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

`appium:bundleId` seleciona o aplicativo a ser iniciado no começo da sessão.

### Tauri e Dioxus

Ambos precisam de uma adição no lado Rust do seu aplicativo, então siga os respectivos guias de início rápido:

- Tauri: adicione o crate `tauri-plugin-wdio-webdriver` (o provider embutido) e então use `services: [['tauri', { appBinaryPath: './src-tauri/target/release/my-tauri-app', driverProvider: 'embedded' }]]`. Veja o [Início Rápido do Tauri](/docs/desktop-testing/tauri/quick-start).
- Dioxus: adicione o crate `wdio-dioxus-bridge` e crie uma build de debug (`cargo build`). Então use `services: [['dioxus', { driverProvider: 'embedded' }]]` com `browserName: 'dioxus'` e `'dioxus:options': { application: './target/debug/my-app' }`. Veja o [Início Rápido do Dioxus](/docs/desktop-testing/dioxus/quick-start).

## Escolha seu caminho

- [macOS](/docs/desktop-testing/macos): aplicativos nativos do macOS com Appium e o driver Mac2.
- [Windows](/docs/desktop-testing/windows): estado atual da automação de aplicativos nativos do Windows.
- [Electron](/docs/desktop-testing/electron): configuração inicial, depois [configuração](/docs/desktop-testing/electron/configuration) (incluindo caminhos de binários por sistema operacional), [acesso às APIs do Electron](/docs/desktop-testing/electron/api), [referência da API e mocking](/docs/desktop-testing/electron/api-reference), [gerenciamento de janelas](/docs/desktop-testing/electron/window-management), [deeplinks](/docs/desktop-testing/electron/deeplink-testing), [modo standalone](/docs/desktop-testing/electron/standalone) e [depuração](/docs/desktop-testing/electron/debugging).
- [Tauri](/docs/desktop-testing/tauri): [suporte a plataformas](/docs/desktop-testing/tauri/platform-support), [configuração](/docs/desktop-testing/tauri/configuration), [configuração do plugin](/docs/desktop-testing/tauri/plugin-setup), [CrabNebula](/docs/desktop-testing/tauri/crabnebula-setup), [Edge WebDriver no Windows](/docs/desktop-testing/tauri/edge-webdriver-windows), [exemplos de uso](/docs/desktop-testing/tauri/usage-examples) e a [referência da API](/docs/desktop-testing/tauri/api).
- [Dioxus](/docs/desktop-testing/dioxus): [suporte a plataformas](/docs/desktop-testing/dioxus/platform-support), [configuração](/docs/desktop-testing/dioxus/configuration), [configuração da bridge](/docs/desktop-testing/dioxus/plugin-setup), [modo navegador](/docs/desktop-testing/dioxus/browser-mode) (testes apenas de frontend no Chrome com comandos simulados), [exemplos de uso](/docs/desktop-testing/dioxus/usage-examples) e a [referência da API](/docs/desktop-testing/dioxus/api).
- [Multi-remote](/docs/multiremote): os serviços Electron, Tauri e Dioxus suportam sessões multi-remote, por exemplo, duas instâncias do aplicativo em um único teste.

## Linux

No Linux, o WebdriverIO controla aplicativos Electron, Tauri e Dioxus. O que você precisa saber:

- CI headless: esses aplicativos precisam de um servidor de exibição. Quando não há nenhum display, o testrunner inicia o Weston, ou o Xvfb como alternativa. Defina `displayServerAutoInstall: true` para instalar um caso nenhum esteja instalado. Alternativamente, envolva o testrunner com o xvfb-run, por exemplo, `xvfb-run -a npx wdio run wdio.conf.ts`. Veja [Headless e Servidores de Exibição](/docs/headless-and-display-servers).
- O Tauri com o provider `official` precisa do WebKitWebDriver (pacote `webkit2gtk-driver`). O provider `embedded` não precisa de driver externo.
- O Dioxus suporta apenas o provider `embedded` no Linux, e a compilação de aplicativos Dioxus requer as bibliotecas de desenvolvimento do WebKitGTK.
- Electron no Ubuntu 24.04+ e outras distribuições com AppArmor habilitado: defina a opção de serviço `apparmorAutoInstall` caso o Electron não consiga iniciar.

## Solução de problemas

- Electron: [Problemas Comuns](/docs/desktop-testing/electron/common-issues), por exemplo, "DevToolsActivePort file doesn't exist" no CI.
- Tauri: [Solução de Problemas](/docs/desktop-testing/tauri/troubleshooting), incluindo incompatibilidades de versão entre o Edge WebDriver e o WebView2.
- Dioxus: [Solução de Problemas](/docs/desktop-testing/dioxus/troubleshooting).
- macOS: veja o projeto [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) para configurações específicas do driver, como o Xcode.

## Próximos passos

- Referência de [Configuração](/docs/configuration) para todas as opções do `wdio.conf.ts`.
- Opções do [Appium Service](/docs/appium-service) para a configuração do Mac2.
- Outras plataformas: [Navegadores Web](/docs/platforms/web), [Aplicativos Móveis](/docs/platforms/mobile), [Extensões e Editores](/docs/platforms/apps-and-extensions).