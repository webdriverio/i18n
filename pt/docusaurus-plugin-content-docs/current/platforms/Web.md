---
id: web
title: Navegadores Web
description: Configure e execute testes end-to-end, de componentes, visuais e de acessibilidade com WebdriverIO no Chrome, Firefox, Microsoft Edge e Safari.
---

O WebdriverIO automatiza navegadores desktop (Chrome, Chromium, Firefox, Microsoft Edge e Safari) por meio de drivers de navegador padrão. Por padrão, ele tenta abrir uma sessão [WebDriver BiDi](/docs/automationProtocols), o sucessor bidirecional do protocolo WebDriver clássico. O BiDi possibilita recursos como mock de rede e emulação de Web APIs. Defina `wdio:enforceWebDriverClassic: true` nas suas capabilities para desativá-lo. Você não precisa instalar drivers manualmente: defina um `browserName` e o WebdriverIO baixa e inicia o Chromedriver, Geckodriver ou Edgedriver correspondente. Ele também instala o Chrome, Chromium ou Firefox quando nenhuma instalação local é encontrada. O Microsoft Edge já precisa estar instalado, e o Safaridriver vem incluído no macOS. O mesmo testrunner também pode executar testes dentro do navegador com o Browser Runner. Isso abrange testes unitários e de componentes para React, Vue, Svelte, SolidJS, Preact, Lit e Stencil.

## Início rápido

Crie a estrutura de um projeto de forma interativa com `npm init wdio@latest .`. Passar `--yes` seleciona as opções padrão: Mocha, Chrome e page objects. Para configurar um projeto manualmente, instale o testrunner, um adaptador de framework, um reporter e o `tsx` para TypeScript:

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

Cada capability recebe seus próprios processos worker, então isso executa a spec tanto no Chrome quanto no Firefox. Outros valores válidos para `browserName` são `chromium`, `msedge` e `safari`. Para executar em modo headless, adicione argumentos do navegador como `'goog:chromeOptions': { args: ['headless', 'disable-gpu'] }`. Consulte [Executar Navegador em Modo Headless](/docs/capabilities#run-browser-headless) para Firefox e Edge; o Safari não possui modo headless.

## Escolha seu caminho

Testes end-to-end em diferentes navegadores:

- [Capabilities](/docs/capabilities): opções de navegador, modo headless, canais de navegador (Canary, Nightly, Safari Technology Preview) e opções de driver `wdio:*`.
- [Binários de Driver](/docs/driverbinaries): como funciona a configuração automática de navegadores e drivers, e como apontar para binários personalizados.
- [Protocolos de Automação](/docs/automationProtocols): WebDriver vs. WebDriver BiDi.
- [Comandos WebDriver BiDi](/docs/api/webdriverBidi): comandos brutos do protocolo BiDi disponíveis no objeto `browser`.
- [Seletores](/docs/selectors): seletores CSS, de texto, ARIA, deep (shadow DOM) e React.
- [Espera automática](/docs/autowait) e [Timeouts](/docs/timeouts): como o WebdriverIO aguarda elementos e o que ajustar.
- [Multi-remote](/docs/multiremote): controle vários navegadores em um único teste, por exemplo, para aplicativos de chat ou WebRTC.

Recursos de navegador que exigem WebDriver BiDi (Chrome, Edge e Firefox; não Safari):

- [Mocks e Spies de Requisições](/docs/mocksandspies): intercepte, modifique ou crie stubs de requisições de rede com `browser.mock()`. Veja também o [objeto Mock](/docs/api/mock).
- [Emulação](/docs/emulation): emule geolocalização, recursos de mídia, user agent, estado offline, localidade, fuso horário, tela e dispositivos com `browser.emulate()`.

Testes de componentes e unitários em um navegador real:

- [Testes de Componentes](/docs/component-testing): como o [Browser Runner](/docs/runner#browser-runner) baseado em Vite funciona e como configurá-lo.
- Guias por framework: [React](/docs/component-testing/react), [Vue.js](/docs/component-testing/vue), [Svelte](/docs/component-testing/svelte), [SolidJS](/docs/component-testing/solid), [Preact](/docs/component-testing/preact), [Lit](/docs/component-testing/lit), [Stencil](/docs/component-testing/stencil).
- [Mocking](/docs/component-testing/mocking) e [Cobertura](/docs/component-testing/coverage) para testes de componentes.

Testes visuais e de acessibilidade:

- [Testes Visuais](/docs/visual-testing): comparação de imagens de tela, de elementos e de página inteira com `@wdio/visual-service`.
- [Snapshot](/docs/snapshot): asserções de snapshot de DOM e de objetos.
- [Axe Core](/docs/accessibility-testing/axe-core): execute verificações de acessibilidade do Deque axe a partir dos seus testes.

Escalando:

- [Selenium Grid](/docs/seleniumgrid), [Serviços em Nuvem](/docs/cloudservices) e [Docker](/docs/docker): execute navegadores remotamente.
- [Sharding](/docs/sharding): divida uma suíte entre máquinas de CI.

Um teste de componente usa o mesmo arquivo de configuração com um runner diferente. Por exemplo, para usar o preset do React:

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

O Browser Runner requer `@wdio/browser-runner`. O preset do React também precisa de `@vitejs/plugin-react`, e os guias recomendam `@testing-library/react` para renderização. Existem presets para `vue`, `svelte`, `solid`, `react`, `preact` e `stencil`. Para qualquer outro caso, use `viteConfig`.

## Solução de problemas

- O Chrome não inicia no CI com "user data directory is already in use" ou "DevToolsActivePort file doesn't exist": consulte [Headless e Servidores de Display](/docs/headless-and-display-servers#troubleshooting).
- `browser.mock()` ou `browser.emulate()` não tem efeito: a sessão não está usando WebDriver BiDi. Verifique seu navegador (o Safari não tem suporte a BiDi), seu provedor de nuvem e `wdio:enforceWebDriverClassic`.
- Drivers ou navegadores não podem ser baixados por trás de um proxy: consulte [Host Personalizado para Download de Drivers](/docs/capabilities#custom-driver-download-host) e [Configuração de Proxy](/docs/proxy).
- Testes instáveis: consulte [Repetir Testes Instáveis](/docs/retry) e [Depuração](/docs/debugging).

## Próximos passos

- Referência de [Configuração](/docs/configuration) para todas as opções do `wdio.conf.ts`.
- [Configuração do TypeScript](/docs/typescript) e [Frameworks](/docs/frameworks) (Mocha, Jasmine, Cucumber).
- [Padrão Page Object](/docs/pageobjects) para estruturar suítes maiores.
- [MCP](/docs/mcp) para permitir que um agente de IA controle uma sessão de navegador por meio do WebdriverIO.
- Outras plataformas: [Aplicativos Móveis](/docs/platforms/mobile), [Aplicativos Desktop](/docs/platforms/desktop), [Extensões e Editores](/docs/platforms/apps-and-extensions).