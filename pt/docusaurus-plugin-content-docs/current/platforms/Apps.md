---
id: apps-and-extensions
title: Extensões e Editores
description: Carregue uma extensão de navegador ou uma extensão do VS Code em uma sessão do WebdriverIO e teste-a de ponta a ponta.
---

O WebdriverIO testa extensões de navegador e extensões de editor carregando-as no aplicativo host real. Extensões de navegador (web) são executadas dentro do Chrome ou do Firefox. Você as carrega por meio das capabilities do navegador: `--load-extension` ou um `.crx` em base64 via `goog:chromeOptions` no Chrome, ou `browser.installAddOn()` para um `.xpi` no Firefox. Em uma sessão WebDriver BiDi, você também pode instalar e remover uma extensão no meio da sessão com `browser.installExtension()` e `browser.uninstallExtension()`. O Safari não possui sessão BiDi, então esse comando não abrange o Safari. A partir daí, você testa content scripts e páginas de popup com os comandos normais do WebDriver. Extensões do VS Code são testadas com o [`wdio-vscode-service`](/docs/wdio-vscode-service) da comunidade. Ele baixa o VS Code (stable, insiders ou uma versão específica) e o Chromedriver correspondente e, em seguida, inicia o VS Code com sua extensão e configurações de usuário personalizadas. Page objects para o workbench estão disponíveis por meio de `browser.getWorkbench()`, e `browser.executeWorkbench()` executa código usando a API do VS Code. O mesmo serviço também pode servir o VS Code em um navegador para testar extensões web. Plugins do Obsidian também possuem um serviço da comunidade.

## Início rápido

Primeiro, instale o testrunner e o suporte a TypeScript:

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

### Extensão do Chrome

Compile sua extensão em uma pasta (aqui `./dist`) e carregue-a com o argumento `--load-extension` do Chrome:

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
        // substitua por um elemento que seu content script adiciona à página
        await expect($('#my-extension-root')).toBeExisting()
    })
})
```

Clicar no ícone da extensão na barra de ferramentas não funciona. Para testar um `default_popup`, encontre o id da extensão em `chrome://extensions/` e abra `chrome-extension://<id>/<popup>.html` com `browser.url()`. O [guia de Extensões Web](/docs/extension-testing/web-extensions#test-popup-modal-in-chrome) tem um comando personalizado `openExtensionPopup` pronto para isso.

### Extensão do VS Code

```sh
npm install --save-dev wdio-vscode-service
```

Adicione `"wdio-vscode-service"` ao array `types` no `tsconfig.json`.

```ts title="wdio.conf.ts"
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'vscode',
        browserVersion: 'stable', // também possível: "insiders" ou uma versão específica, ex.: "1.80.0"
        'wdio:vscodeOptions': {
            // aponta para o diretório onde o package.json da extensão está localizado
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

Para testar a extensão como uma extensão web do VS Code, defina `browserName: 'chrome'` e mantenha `wdio:vscodeOptions`. Nesse modo, `browserVersion` só pode ser `stable` ou `insiders`. `npm create wdio@latest ./` com "VS Code Extension Testing" gera essa configuração para você.

## Escolha seu caminho

- [Testes de Extensões Web](/docs/extension-testing/web-extensions): carregue extensões no Chrome (pasta ou `.crx`) e no Firefox (`.xpi` via [`installAddOn`](/docs/api/gecko#installaddon)), ou instale e remova uma no meio da sessão com [`installExtension`](/docs/api/browser/installExtension). Extensões web do Safari não são abordadas.
- [Firefox Profile Service](/docs/firefox-profile-service): crie um perfil do Firefox que inclua extensões.
- [Testes de Extensões do VS Code](/docs/extension-testing/vscode-extensions): configuração, setup de TypeScript, page objects do workbench e `executeWorkbench`.
- [VS Code Service](/docs/wdio-vscode-service): todas as opções do serviço, como `cachePath`, e como escrever page objects personalizados.
- [Obsidian Plugin Testing Service](/docs/wdio-obsidian-service): um serviço da comunidade que testa plugins do Obsidian em diferentes versões do Obsidian no Windows, macOS, Linux e Android.
- [Comandos Personalizados](/docs/customcommands): empacote helpers como `openExtensionPopup` para reutilização.

Os testes de extensões web são executados em uma sessão normal do Chrome ou do Firefox, então tudo em [Navegadores Web](/docs/platforms/web) se aplica, incluindo seletores, mock de rede e testes visuais.

## Solução de problemas

- O Firefox recusa uma extensão compilada localmente por causa da assinatura: instale-a no hook `before` com `browser.installAddOn(extension.toString('base64'), true)` em vez de usar um perfil. Compile o `.xpi` com `npx web-ext build`.
- Usando Edge, Brave ou Opera em vez do Chrome: os mesmos argumentos geralmente funcionam com a capability de opções desse navegador, ex.: `ms:edgeOptions`.
- Os binários do VS Code e do Chromedriver são baixados em um diretório de cache. Para controlar onde eles são armazenados, por exemplo para armazená-los em cache no CI, defina `services: [['vscode', { cachePath: __dirname }]]`.
- O TypeScript não encontra `getWorkbench` ou `executeWorkbench`: adicione `wdio-vscode-service` a `compilerOptions.types`.

## Próximos passos

- Referência de [Configuração](/docs/configuration) para todas as opções do `wdio.conf.ts`.
- [Electron](/docs/desktop-testing/electron) para testar aplicativos desktop completos construídos sobre o Chromium.
- Outras plataformas: [Navegadores Web](/docs/platforms/web), [Aplicativos Móveis](/docs/platforms/mobile), [Aplicativos Desktop](/docs/platforms/desktop).