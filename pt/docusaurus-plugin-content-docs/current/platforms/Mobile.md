---
id: mobile
title: Aplicativos Móveis
description: Configure e execute testes WebdriverIO para aplicativos nativos, híbridos e web móveis em emuladores Android e simuladores iOS, dispositivos reais e nuvens de dispositivos.
---

O WebdriverIO automatiza Android e iOS por meio do [Appium](/docs/appium), que utiliza o protocolo WebDriver. Seus testes usam o mesmo objeto `browser` (com o alias `driver`), os seletores `$`/`$$` e os matchers `expect` dos testes de navegador. O Appium encaminha cada sessão para um driver de plataforma escolhido por `appium:automationName`. Para Android, esse driver é o `UiAutomator2`, com o Espresso como alternativa que libera estratégias de seletores adicionais. Para iOS e iPadOS, é o `XCUITest`. Com esses drivers, você pode testar aplicativos nativos e a web móvel no Chrome no Android ou no Safari no iOS. Você também pode testar aplicativos híbridos, alternando entre o contexto nativo e webviews incorporadas. As sessões podem ser executadas em emuladores Android, simuladores iOS, dispositivos reais ou nuvens de dispositivos como Sauce Labs, BrowserStack, TestingBot e TestMu AI. O [`@wdio/appium-service`](/docs/appium-service) inicia e encerra um servidor Appium local para você. Além da API bruta do Appium, o WebdriverIO adiciona [comandos móveis](/docs/api/mobile) multiplataforma, como `tap`, `swipe`, `longPress`, `scrollIntoView` e `switchContext`.

## Início rápido

Pré-requisitos: Android Studio com um Android SDK e um emulador para Android; Xcode e um simulador no macOS para iOS. O `npx appium-installer` orienta você na configuração do ambiente, e o `npm init wdio@latest .` cria a estrutura de um projeto móvel (escolha Android ou iOS). Para configurar manualmente:

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

`~` é o seletor de accessibility id: ele corresponde a `content-description` no Android e a `accessibilityIdentifier` no iOS, e é a estratégia multiplataforma preferida. Substitua os ids de exemplo, o título da webview e o caminho do aplicativo pelos seus.

Outros alvos alteram apenas as capabilities:

```ts title="Simulador iOS (aplicativo nativo)"
{
    platformName: 'iOS',
    'appium:deviceName': 'iPhone Simulator',
    'appium:platformVersion': '16.4',
    'appium:automationName': 'XCUITest',
    'appium:app': './path/to/MyApp.app' // .app para simuladores, .ipa assinado para dispositivos reais
}
```

```ts title="Web móvel (Chrome em um emulador Android)"
{
    platformName: 'Android',
    browserName: 'Chrome',
    'appium:deviceName': 'Android GoogleAPI Emulator',
    'appium:platformVersion': '12.0',
    'appium:automationName': 'UiAutomator2'
}
```

Para web móvel no iOS, use `platformName: 'iOS'`, `browserName: 'Safari'` e `'appium:automationName': 'XCUITest'`.

## Escolha seu caminho

- [Configuração do Appium](/docs/appium): quais plataformas o Appium abrange (iOS, Android, Tizen, aplicativos de TV) e como instalar o conjunto de ferramentas.
- [Serviço Appium](/docs/appium-service): opções do serviço (`args`, `command`, `logPath`), `npx start-appium-inspector` para abrir o Appium Inspector e um otimizador beta para seletores XPath lentos.
- [Comandos Móveis](/docs/api/mobile): gestos e utilitários multiplataforma. Abrange aplicativos híbridos com [`getContexts`](/docs/api/mobile/getContexts) e [`switchContext`](/docs/api/mobile/switchContext), além das capabilities de webview para iOS.
- [Seletores Móveis](/docs/selectors#mobile-selectors): accessibility id, Android UiAutomator, data/view matchers do Espresso e predicate strings e class chains do iOS.
- [Comandos do protocolo Appium](/docs/api/appium): os endpoints brutos do Appium disponíveis em `driver`.
- [Aplicativos Flutter](/docs/flutter-testing/introduction): por que o Flutter precisa do Appium Flutter Driver; em seguida, [prepare o aplicativo](/docs/flutter-testing/preparing-flutter-application), [configure o Appium](/docs/flutter-testing/base-appium-configuration), [configure o WebdriverIO](/docs/flutter-testing/setting-up-webdriverio) e [escreva testes](/docs/flutter-testing/writing-tests).
- [Serviços em Nuvem](/docs/cloudservices): conecte-se a Sauce Labs, BrowserStack, TestingBot, TestMu AI, Perfecto ou RobotActions para executar em dispositivos reais hospedados.
- [Testes Visuais](/docs/visual-testing): comparação de imagens para aplicativos nativos, aplicativos híbridos e navegadores móveis. Para Percy em dispositivos móveis, consulte [App Percy](/docs/visual-testing/integrate-with-app-percy).
- [Multi-remote](/docs/multiremote): coordene vários dispositivos ou navegadores em um único teste.

Emular a viewport de um dispositivo em um navegador desktop com [`browser.emulate('device', ...)`](/docs/emulation) não é teste móvel. Os motores dos navegadores desktop diferem dos móveis, portanto use o Appium com um navegador móvel real.

## Solução de problemas

- A sessão não inicia: verifique se o driver do Appium para o seu `appium:automationName` está instalado e se o emulador ou simulador está em execução. Use `port: 4723`, a menos que você tenha alterado a porta do Appium.
- O iOS não encontra uma webview: tente `appium:webviewConnectRetries`, `appium:webviewConnectTimeout` ou `appium:includeSafariInWebviews` (consulte [Aplicativos Híbridos](/docs/api/mobile#hybrid-apps)).
- A webview do Android demora a aparecer: ajuste `androidWebviewConnectionRetryTime` e `androidWebviewConnectTimeout` em `getContexts`/`switchContext`.
- Widgets Flutter não são encontrados com seletores nativos: isso é esperado. Use o driver Flutter e os finders descritos no [guia do Flutter](/docs/flutter-testing/introduction).

## Próximos passos

- Referências de [Configuração](/docs/configuration) e [Capabilities](/docs/capabilities).
- [Padrão Page Object](/docs/pageobjects) para compartilhar telas entre specs de Android e iOS.
- [MCP](/docs/mcp) para permitir que um agente de IA controle sessões iOS e Android por meio do Appium.
- Outras plataformas: [Navegadores Web](/docs/platforms/web), [Aplicativos Desktop](/docs/platforms/desktop), [Extensões e Editores](/docs/platforms/apps-and-extensions).