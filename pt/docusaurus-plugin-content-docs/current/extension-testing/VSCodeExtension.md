---
id: vscode-extensions
title: Testando Extensões VS Code
---

O WebdriverIO permite que você teste perfeitamente suas extensões [VS Code](https://code.visualstudio.com/) de ponta a ponta no IDE VS Code Desktop ou como extensão web. Você só precisa fornecer um caminho para sua extensão e o framework faz o resto. Com o [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service), tudo é tratado e muito mais:

- 🏗️ Instalando o VSCode (estável, insiders ou uma versão específica)
- ⬇️ Baixando o Chromedriver específico para a versão do VSCode fornecida
- 🚀 Permite acessar a API do VSCode a partir de seus testes
- 🖥️ Iniciando o VSCode com configurações de usuário personalizadas (incluindo suporte para VSCode no Ubuntu, MacOS e Windows)
- 🌐 Ou fornece o VSCode a partir de um servidor para ser acessado por qualquer navegador para testar extensões web
- 📔 Inicializando page objects com localizadores correspondentes à sua versão do VSCode

## Primeiros Passos

Para iniciar um novo projeto WebdriverIO, execute:

```sh
npm create wdio@latest ./
```

Um assistente de instalação irá guiá-lo pelo processo. Certifique-se de selecionar _"VS Code Extension Testing"_ quando perguntado sobre qual tipo de teste você gostaria de fazer, depois mantenha os padrões ou modifique de acordo com sua preferência.

## Exemplo de Configuração

Para usar o serviço, você precisa adicionar `vscode` à sua lista de serviços, opcionalmente seguido por um objeto de configuração. Isso fará com que o WebdriverIO baixe os binários do VSCode e a versão apropriada do Chromedriver:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" ou "stable" para a versão mais recente do VSCode
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * opcionalmente você pode definir o caminho onde o WebdriverIO armazena todos
     * os binários do VSCode e Chromedriver, por exemplo:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Se você definir `wdio:vscodeOptions` com qualquer outro `browserName` além de `vscode`, por exemplo, `chrome`, o serviço disponibilizará a extensão como extensão web. Se você testar no Chrome, nenhum serviço de driver adicional é necessário, por exemplo:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'wdio:vscodeOptions': {
            extensionPath: __dirname
        }
    }],
    services: ['vscode'],
    // ...
};
```

_Nota:_ ao testar extensões web, você só pode escolher entre `stable` ou `insiders` como `browserVersion`.

### Configuração TypeScript

No seu `tsconfig.json`, certifique-se de adicionar `wdio-vscode-service` à sua lista de tipos:

```json
{
    "compilerOptions": {
        "types": [
            "node",
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            "wdio-vscode-service"
        ],
        "target": "es2020",
        "moduleResolution": "node16"
    }
}
```

## Uso

Você pode então usar o método `getWorkbench` para acessar os page objects para os localizadores correspondentes à versão desejada do VSCode:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

A partir daí, você pode acessar todos os page objects usando os métodos corretos de page object. Saiba mais sobre todos os page objects disponíveis e seus métodos na [documentação de page objects](https://webdriverio-community.github.io/wdio-vscode-service/).

### Acessando APIs do VSCode

Se você quiser executar certas automações através da [API do VSCode](https://code.visualstudio.com/api/references/vscode-api), você pode fazer isso executando comandos remotos via comando personalizado `executeWorkbench`. Este comando permite executar código remotamente de seu teste dentro do ambiente VSCode e permite acessar a API do VSCode. Você pode passar parâmetros arbitrários para a função, que serão então propagados para a função. O objeto `vscode` será sempre passado como primeiro argumento, seguido pelos parâmetros da função externa. Observe que você não pode acessar variáveis fora do escopo da função, pois o callback é executado remotamente. Aqui está um exemplo:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // saída: "I am an API call!"
```

Para a documentação completa de page objects, consulte a [documentação](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Você pode encontrar vários exemplos de uso na [suíte de testes deste projeto](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Mais Informações

Você pode aprender mais sobre como configurar o [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) e como criar page objects personalizados na [documentação do serviço](/docs/wdio-vscode-service). Você também pode assistir à seguinte palestra de [Christian Bromann](https://twitter.com/bromann) sobre [_Testando Extensões Complexas do VSCode com o Poder dos Padrões Web_](https://www.youtube.com/watch?v=PhGNTioBUiU):

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>