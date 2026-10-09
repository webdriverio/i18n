---
id: electron
title: Electron
description: "Teste aplicativos Electron com o serviço Electron do WebdriverIO, que configura o Chromedriver, detecta o binário do seu aplicativo e permite simular APIs do Electron."
---

Electron é um framework para construir aplicativos desktop usando JavaScript, HTML e CSS. Ao incorporar o Chromium e o Node.js em seu binário, o Electron permite que você mantenha uma única base de código JavaScript e crie aplicativos multiplataforma que funcionam no Windows, macOS e Linux — sem necessidade de experiência em desenvolvimento nativo.

O WebdriverIO fornece um serviço integrado que simplifica a interação com seu aplicativo Electron e torna seu teste muito simples. As vantagens de usar o WebdriverIO para testar aplicativos Electron são:

- 🚗 configuração automática do Chromedriver necessário
- 📦 detecção automática do caminho do seu aplicativo Electron - suporta [Electron Forge](https://www.electronforge.io/) e [Electron Builder](https://www.electron.build/)
- 🧩 acesso às APIs do Electron dentro dos seus testes
- 🕵️ simulação (mocking) de APIs do Electron por meio de uma API semelhante à do Vitest

Você só precisa de alguns passos simples para começar. Assista a este simples tutorial em vídeo passo a passo para começar, do canal [WebdriverIO YouTube](https://www.youtube.com/@webdriverio):

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

Ou siga o guia na seção a seguir.

## Primeiros Passos

Para iniciar um novo projeto WebdriverIO, execute:

```sh
npm create wdio@latest ./
```

Um assistente de instalação irá guiá-lo pelo processo. Quando perguntado que tipo de teste você gostaria de fazer, selecione _"Desktop Testing - of Electron, Tauri, or macOS Applications"_ e, em seguida, escolha _Electron_ na pergunta sobre o framework. Depois, forneça o caminho para seu aplicativo Electron compilado, por exemplo, `./dist`, e então apenas mantenha os padrões ou modifique de acordo com sua preferência.

O assistente de configuração instalará todos os pacotes necessários e criará um `wdio.conf.js` ou `wdio.conf.ts` com a configuração necessária para testar seu aplicativo. Se você concordar em gerar automaticamente alguns arquivos de teste, poderá executar seu primeiro teste via `npm run wdio`.

## Configuração Manual

Se você já está usando o WebdriverIO em seu projeto, pode pular o assistente de instalação e apenas adicionar as seguintes dependências:

```sh
npm install --save-dev @wdio/electron-service
```

Em seguida, você pode usar a seguinte configuração:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['electron', {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: [/** ... */],
    }]]
}
```

É isso 🎉

Saiba mais sobre [como configurar o Electron Service](/docs/desktop-testing/electron/configuration), [como simular APIs do Electron](/docs/desktop-testing/electron/api-reference) e [como acessar APIs do Electron](/docs/desktop-testing/electron/api).