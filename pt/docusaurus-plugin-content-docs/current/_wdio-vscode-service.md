---
id: wdio-vscode-service
title: Serviço de Teste de Extensão VSCode
custom_edit_url: https://github.com/webdriverio-community/wdio-vscode-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-vscode-service é um pacote de terceiros, para mais informações consulte [GitHub](https://github.com/webdriverio-community/wdio-vscode-service) | [npm](https://www.npmjs.com/package/wdio-vscode-service)

Testado em:

[![VSCode Version](https://img.shields.io/badge/VSCode%20Version-insiders%20/%20stable%20/%20v1.86.0%20/%20web-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml) [![CI Status](https://img.shields.io/badge/Platform-windows%20%2F%20macos%20%2F%20ubuntu-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml)

> Serviço WebdriverIO para testar extensões VSCode.

Este serviço WebdriverIO permite que você teste suas extensões VSCode de ponta a ponta no IDE VSCode Desktop ou como uma extensão web sem complicações. Você só precisa fornecer um caminho para sua extensão e o serviço faz o resto:

- 🏗️ Instalando o VSCode (seja `stable`, `insiders` ou uma versão específica)
- ⬇️ Baixando o Chromedriver específico para uma determinada versão do VSCode
- 🚀 Permite que você acesse a API do VSCode a partir de seus testes
- 🖥️ Iniciando o VSCode com configurações personalizadas (incluindo suporte para VSCode no Ubuntu, MacOS e Windows)
- 🌐 Ou serve o VSCode a partir de um servidor para ser acessado por qualquer navegador para testar [extensões web](https://code.visualstudio.com/api/extension-guides/web-extensions)
- 📔 Inicializando page objects com localizadores correspondentes à sua versão do VSCode

Este projeto foi altamente inspirado no projeto [vscode-extension-tester](https://www.npmjs.com/package/vscode-extension-tester) que é baseado em Selenium. Este pacote pega a ideia e a adapta para o WebdriverIO.

A partir do VSCode v1.86, é necessário usar `webdriverio` v8.14 ou posterior para instalar o Chromedriver sem necessidade de configuração. Se você precisa testar versões anteriores do VSCode, consulte a seção [configuração do Chromedriver](#chromedriver) abaixo.

## Instalação

Para iniciar um novo projeto WebdriverIO, execute:

```bash
npm create wdio ./
```

Um assistente de instalação irá guiá-lo pelo processo. Certifique-se de selecionar TypeScript como compilador e não gerar page objects, pois este projeto já vem com todos os page objects necessários. Em seguida, certifique-se de selecionar `vscode` na lista de serviços:

![Install Demo](https://raw.githubusercontent.com/webdriverio-community/wdio-vscode-service/main/.github/assets/demo.gif "Install Demo")

Para mais informações sobre como instalar o `WebdriverIO`, consulte a [documentação do projeto](https://webdriver.io/docs/gettingstarted).

## Exemplo de Configuração

Para usar o serviço, você precisa adicionar `vscode` à sua lista de serviços, opcionalmente seguido por um objeto de configuração. Isso fará com que o WebdriverIO baixe os binários específicos do VSCode e a versão apropriada do Chromedriver:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.86.0', // "insiders" ou "stable" para a versão mais recente do VSCode
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * Opcionalmente defina o caminho onde o WebdriverIO armazena todos os binários do VSCode, por exemplo:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Se você definir `wdio:vscodeOptions` com qualquer outro `browserName` além de `vscode`, por exemplo `chrome`, o serviço fornecerá a extensão como uma extensão web. Se você testar no Chrome, nenhum serviço de driver adicional é necessário, por exemplo:

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
        "target": "es2019",
        "moduleResolution": "node",
        "esModuleInterop": true
    }
}
```

## Uso

Você pode então usar o método `getWorkbench` para acessar os page objects para os localizadores correspondentes à sua versão desejada do VSCode:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

### Acessando APIs do VSCode

Se você deseja executar determinada automação através da [API do VSCode](https://code.visualstudio.com/api/references/vscode-api), pode fazer isso executando comandos remotos através do comando personalizado `executeWorkbench`. Este comando permite que você execute remotamente código do seu teste dentro do ambiente VSCode e permite acessar a API do VSCode. Você pode passar parâmetros arbitrários para a função, que serão então propagados para a função. O objeto `vscode` sempre será passado como o primeiro argumento, seguido pelos parâmetros da função externa. Observe que você não pode acessar variáveis fora do escopo da função, pois o callback é executado remotamente. Aqui está um exemplo:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // saída: "I am an API call!"
```

Para a documentação completa dos page objects, consulte a [documentação](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Você pode encontrar vários exemplos de uso na [suíte de testes deste projeto](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Configuração

Através da configuração do serviço, você pode gerenciar a versão do VSCode, bem como as configurações de usuário para o VSCode:

### Opções de Serviço

As opções de serviço são opções necessárias para o serviço configurar o ambiente de teste.

#### `cachePath`

Define um caminho de cache para evitar o download repetido dos pacotes do VS Code. Isso é útil para CI/CD para evitar o download do VSCode a cada execução de teste.

Tipo: `string`<br />
Padrão: `process.cwd()`

### Capabilities do VSCode (`wdio:vscodeOptions`)

Para executar testes através do VSCode, você deve definir `vscode` como `browserName`. Você pode especificar a versão do VSCode fornecendo uma capability `browserVersion`. As opções personalizadas do VSCode são então definidas dentro da capability personalizada `wdio:vscodeOptions`. As opções são as seguintes:

#### `binary`

Caminho para uma instalação local do VSCode. Se a opção não for fornecida, o serviço baixará o VSCode com base no `browserVersion` fornecido (ou `stable` se não for especificado).

Tipo: `string`

#### `extensionPath`

Define o diretório da extensão que você deseja testar.

Tipo: `string`

#### `storagePath`

Define um local personalizado para o VS Code armazenar todos os seus dados. Este é o diretório raiz para diretórios internos do VS Code, como (lista parcial)
* **user-data-dir**: O diretório onde todas as configurações do usuário (configurações globais), logs de extensão, etc. são armazenados.
* **extension-install-dir**: O diretório onde as extensões do VS Code são instaladas.

Se não for fornecido, um diretório temporário é usado.

Tipo: `string`

#### `userSettings`

Define configurações personalizadas de usuário a serem aplicadas ao VSCode.

Tipo: `Record<string, number | string | object | boolean>`<br />
Padrão: `{}`

#### `workspacePath`

Abre o VSCode para um workspace específico. Se não for fornecido, o VSCode inicia sem um workspace aberto.

Tipo: `string`

#### `filePath`

Abre o VSCode com um arquivo específico aberto.

Tipo: `string`

#### `vscodeArgs`

Argumentos adicionais de inicialização como um objeto, por exemplo:

```ts
vscodeArgs: { fooBar: true, 'bar-foo': '/foobar' }
```

será passado como:

```ts
--foo-bar --fooBar --bar-foo=/foobar
```

Tipo: `Record<string, string | boolean>`<br />
Padrão: veja [`constants.ts#L5-L14`](https://github.com/webdriverio-community/wdio-vscode-service/blob/196a69be3ac2fb82d9c7e4f19a2a1c8ccbaec1e2/src/constants.ts#L5-L14)

#### `verboseLogging`

Se definido como true, o serviço registra a saída do VSCode do host de extensão e da API do console.

Tipo: `boolean`<br />
Padrão: `false`

#### `vscodeProxyOptions`

As configurações de proxy da API do VSCode definem como o WebdriverIO se conecta ao workbench do VSCode para dar acesso à API do VSCode.

Tipo: `VSCodeProxyOptions`<br />
Padrão:

```ts
{
    /**
     * Se definido como true, o serviço tenta estabelecer uma conexão com o
     * workbench do VSCode para permitir acesso à API do VSCode
     */
    enable: true,
    /**
     * Porta da conexão WebSocket usada para conectar ao workbench.
     * Por padrão, definida para uma porta disponível no seu sistema operacional.
     */
    // port?: number
    /**
     * Tempo limite para conexão com WebSocket dentro do VSCode
     */
    connectionTimeout: 5000,
    /**
     * Tempo limite para comando ser executado dentro do VSCode
     */
    commandTimeout: 5000
}
```

### Chromedriver

A partir do VSCode v1.86, é necessário usar `webdriverio` v8.14 ou posterior para instalar o Chromedriver sem necessidade de configuração. O [setup simplificado de automação de navegador](https://webdriver.io/blog/2023/07/31/driver-management) cuida de tudo para você.

Para testar versões anteriores do VS Code, encontre a versão esperada do Chromedriver nos logs, baixe o [Chromedriver](https://chromedriver.chromium.org/downloads) e configure o caminho. Por exemplo:

```
[0-0] ERROR webdriver: Failed downloading chromedriver v108: Download failed: ...
```

```ts
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.80.0',
        'wdio:chromedriverOptions': {
            binary: path.join(cacheDir, 'chromedriver-108.0.5359.71')
```

## Crie Seus Próprios PageObjects

Você pode reutilizar os componentes usados neste serviço para seus próprios page objects. Para isso, primeiro crie um arquivo que define todos os seus seletores, por exemplo:

```ts
// ex: em /test/pageobjects/locators.ts
export const componentA = {
    elem: 'form', // elemento contêiner do componente
    submit: 'button[type="submit"]', // botão de envio
    username: 'input.username', // campo de usuário
    password: 'input.password' // campo de senha
}
```

Agora você pode criar um page object da seguinte maneira:

```ts
// ex: em /test/pageobjects/loginForm.ts
import { PageDecorator, IPageDecorator, BasePage } from 'wdio-vscode-service'
import * as locatorMap, { componentA as componentALocators } from './locators'
export interface LoginForm extends IPageDecorator<typeof componentALocators> {}
@PageDecorator(componentALocators)
export class LoginForm extends BasePage<typeof componentALocators, typeof locatorMap> {
    /**
     * @private chave do localizador para identificar o mapa de localizadores (veja locators.ts)
     */
    public locatorKey = 'componentA' as const

    public login (username: string, password: string) {
        await this.username$.setValue(username)
        await this.password$.setValue(password)
        await this.submit$.click()
    }
}
```

Agora, no seu teste, você pode usar seu page object da seguinte maneira:

```ts
import { LoginForm } from '../pageobjects/loginForm'
import * as locatorMap from '../locators'

// ex: em /test/specs/example.e2e.ts
describe('minha extensão', () => {
    it('deve fazer login', async () => {
        const loginForm = new LoginForm(locatorMap)
        await loginForm.login('admin', 'test123')

        // você também pode usar elementos de page object diretamente via `[selector]$`
        // ou `[selector]$$`, ex:
        await loginForm.submit$.click()

        // ou acessar localizadores diretamente
        console.log(loginForm.locators.username)
        // saída: "input.username"
    })
})
```

## Suporte a TypeScript

Se você usa WebdriverIO com TypeScript, certifique-se de adicionar `wdio-vscode-service` aos seus `types` no seu `tsconfig.json`, por exemplo:

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "types": [
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            // adicione este serviço aos seus tipos
            "wdio-devtools-service"
        ],
        "target": "es2019"
    }
}
```

## Suporte a Proxy

Durante a inicialização deste serviço, um ChromeDriver e uma distribuição do VSCode são baixados. Você pode fazer o túnel dessas solicitações através de um proxy definindo a variável de ambiente `HTTPS_PROXY` ou `https_proxy`. Por exemplo:

```bash
HTTPS_PROXY=http://127.0.0.1:1080 npm run wdio
```

## Referências

As seguintes extensões do VS Code usam `wdio-vscode-service`:

- [Marquee](https://marketplace.visualstudio.com/items?itemName=stateful.marquee) (27k downloads)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (27.8m downloads)
- [DVC Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=Iterative.dvc) (11.2k downloads)
- [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) (1.2m downloads)
- [inlang – i18n supercharged](https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension) (3k downloads)

## Contribuindo

Antes de enviar um pull request, execute o seguinte:

1. `git clone git@github.com:webdriverio-community/wdio-vscode-service.git`
1. `cd wdio-vscode-service`
1. `npm install`
1. `npm run build`
1. `npm run test` (ou `npm run ci`)

## Saiba Mais

Se você quiser aprender mais sobre testes de extensões VSCode, confira a palestra de [Christian Bromann](https://twitter.com/bromann) no [OpenJS World 2022](https://www.youtube.com/watch?v=PhGNTioBUiU):

[![Testing VSCode Extensions at OpenJS World 2022](https://img.youtube.com/vi/PhGNTioBUiU/sddefault.jpg)](https://www.youtube.com/watch?v=PhGNTioBUiU)

---

Para mais informações sobre o WebdriverIO, confira a [página inicial](https://webdriver.io) do projeto.