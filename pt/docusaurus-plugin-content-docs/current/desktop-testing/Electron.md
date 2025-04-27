---
id: electron
title: Electron
---

Electron é um framework para construir aplicações desktop usando JavaScript, HTML e CSS. Ao incorporar Chromium e Node.js em seu binário, o Electron permite que você mantenha uma base de código JavaScript e crie aplicativos multiplataforma que funcionam no Windows, macOS e Linux — sem necessidade de experiência em desenvolvimento nativo.

O WebdriverIO fornece um serviço integrado que simplifica a interação com seu aplicativo Electron e torna o teste muito simples. As vantagens de usar o WebdriverIO para testar aplicações Electron são:

- 🚗 configuração automática do Chromedriver necessário
- 📦 detecção automática do caminho da sua aplicação Electron - suporta [Electron Forge](https://www.electronforge.io/) e [Electron Builder](https://www.electron.build/)
- 🧩 acesso às APIs do Electron dentro dos seus testes
- 🕵️ simulação de APIs do Electron através de uma API semelhante ao Vitest

Você precisa apenas de alguns passos simples para começar. Assista a este tutorial em vídeo passo a passo do canal [WebdriverIO YouTube](https://www.youtube.com/@webdriverio):

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

Ou siga o guia na seção a seguir.

## Começando

Para iniciar um novo projeto WebdriverIO, execute:

```sh
npm create wdio@latest ./
```

Um assistente de instalação irá guiá-lo pelo processo. Certifique-se de selecionar _"Desktop Testing - of Electron Applications"_ quando ele perguntar que tipo de teste você gostaria de fazer. Depois, forneça o caminho para sua aplicação Electron compilada, por exemplo `./dist`, e mantenha os padrões ou modifique de acordo com sua preferência.

O assistente de configuração instalará todos os pacotes necessários e criará um `wdio.conf.js` ou `wdio.conf.ts` com a configuração necessária para testar sua aplicação. Se você concordar em gerar automaticamente alguns arquivos de teste, poderá executar seu primeiro teste via `npm run wdio`.

## Configuração Manual

Se você já estiver usando o WebdriverIO em seu projeto, pode pular o assistente de instalação e apenas adicionar as seguintes dependências:

```sh
npm install --save-dev wdio-electron-service
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

Saiba mais sobre como [configurar o Serviço Electron](/docs/desktop-testing/electron/configuration), [como simular APIs do Electron](/docs/desktop-testing/electron/mocking) e [como acessar APIs do Electron](/docs/desktop-testing/electron/api).