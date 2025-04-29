---
id: wdio-ocr-service
title: Serviço de Teste OCR
custom_edit_url: https://github.com/webdriverio/visual-testing/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/ocr-service é um pacote de terceiros, para mais informações consulte [GitHub](https://github.com/webdriverio/visual-testing) | [npm](https://www.npmjs.com/package/@wdio/ocr-service)

Para documentação sobre testes visuais com WebdriverIO, consulte os [docs](https://webdriver.io/docs/visual-testing). Este projeto contém todos os módulos relevantes para executar testes visuais com WebdriverIO. Dentro do diretório `./packages` você encontrará:

-   `@wdio/visual-testing`: o serviço WebdriverIO para integração de testes visuais
-   `webdriver-image-comparison`: Um módulo de comparação de imagens que pode ser usado para diferentes frameworks de automação de testes NodeJS que suportam o protocolo WebDriver

## Storybook Runner (BETA)

<details>
  <summary>Clique para encontrar mais documentação sobre o Storybook Runner BETA</summary>

> Storybook Runner ainda está em BETA, a documentação será movida posteriormente para as páginas de documentação do [WebdriverIO](https://webdriver.io/docs/visual-testing).

Este módulo agora suporta Storybook com um novo Visual Runner. Este runner verifica automaticamente uma instância local/remota do Storybook e criará capturas de tela de elemento de cada componente. Isso pode ser feito adicionando

```ts
export const config: WebdriverIO.Config = {
    // ...
    services: ["visual"],
    // ....
};
```

aos seus `services` e executando `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook` através da linha de comando.
Ele usará o Chrome em modo headless como navegador padrão.

> [!NOTE]
>
> -   A maioria das opções de Teste Visual também funcionará para o Storybook Runner, consulte a documentação do [WebdriverIO](https://webdriver.io/docs/visual-testing).
> -   O Storybook Runner substituirá todas as suas capacidades e só pode ser executado nos navegadores que ele suporta, veja [`--browsers`](#browsers).
> -   O Storybook Runner não suporta uma configuração existente que usa capacidades Multiremote e gerará um erro.
> -   O Storybook Runner suporta apenas Desktop Web, não Mobile Web.

### Opções de Serviço do Storybook Runner

As opções de serviço podem ser fornecidas assim

```ts
export const config: WebdriverIO.Config  = {
    // ...
    services: [
      [
        'visual',
        {
            // Algumas opções padrão
            baselineFolder: join(process.cwd(), './__snapshots__/'),
            debug: true,
            // As opções do storybook, veja as opções cli para a descrição
            storybook: {
                additionalSearchParams: new URLSearchParams({foo: 'bar', abc: 'def'}),
                clip: false,
                clipSelector: ''#some-id,
                numShards: 4,
                // `skipStories` pode ser uma string ('example-button--secondary'),
                // um array (['example-button--secondary', 'example-button--small'])
                // ou uma regex que precisa ser fornecida como string ("/.*button.*/gm")
                skipStories: ['example-button--secondary', 'example-button--small'],
                url: 'https://www.bbc.co.uk/iplayer/storybook/',
                version: 6,
                // Opcional - Permite substituir o caminho das linhas de base. Por padrão, agrupará as linhas de base por categoria e componente (por exemplo, forms/input/baseline.png)
                getStoriesBaselinePath: (category, component) => `path__${category}__${component}`,
            },
        },
      ],
    ],
    // ....
}
```

### Opções de CLI do Storybook Runner

#### `--additionalSearchParams`

-   **Tipo:** `string`
-   **Obrigatório:** Não
-   **Padrão:** ''
-   **Exemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --additionalSearchParams="foo=bar&abc=def"`

Ele adicionará parâmetros de busca adicionais à URL do Storybook.
Veja a documentação [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) para mais informações. A string deve ser uma string URLSearchParams válida.

> [!NOTE]
> As aspas duplas são necessárias para evitar que o `&` seja interpretado como um separador de comando.
> Por exemplo, com `--additionalSearchParams="foo=bar&abc=def"` ele gerará a seguinte URL do Storybook para o teste de stories: `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.

#### `--browsers`

-   **Tipo:** `string`
-   **Obrigatório:** Não
-   **Padrão:** `chrome`, você pode selecionar entre `chrome|firefox|edge|safari`
-   **Exemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --browsers=chrome,firefox,edge,safari`
-   **NOTA:** Disponível apenas através da CLI

Usará os navegadores fornecidos para tirar capturas de tela de componentes

> [!NOTE]
> Certifique-se de ter os navegadores que deseja executar instalados em sua máquina local

#### `--clip`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `true`
-   **Exemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clip=false`

Quando desativado, criará uma captura de tela do viewport. Quando ativado, criará capturas de tela de elementos com base no [`--clipSelector`](#clipselector) que reduzirá a quantidade de espaço em branco ao redor da captura de tela do componente e reduzirá o tamanho da captura.

#### `--clipSelector`

-   **Tipo:** `string`
-   **Obrigatório:** Não
-   **Padrão:** `#storybook-root > :first-child` para Storybook V7 e `#root > :first-child:not(script):not(style)` para Storybook V6, veja também [`--version`](#version)
-   **Exemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clipSelector="#some-id"`

Este é o seletor que será usado:

-   para selecionar o elemento para tirar a captura de tela
-   para o elemento esperar ser visível antes de uma captura de tela ser tirada

#### `--devices`

-   **Tipo:** `string`
-   **Obrigatório:** Não
-   **Padrão:** Você pode selecionar entre os [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts)
-   **Exemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --devices="iPhone 14 Pro Max","Pixel 3 XL"`
-   **NOTA:** Disponível apenas através da CLI

Usará os dispositivos fornecidos que correspondem aos [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts) para tirar capturas de tela de componentes

> [!NOTE]
>
> -   Se você sentir falta de uma configuração de dispositivo, sinta-se à vontade para enviar uma [solicitação de recurso](https://github.com/webdriverio/visual-testing/issues/new?assignees=&labels=&projects=&template=--feature-request.md)
> -   Isso só funcionará com Chrome:
>     -   se você fornecer `--devices`, todas as instâncias do Chrome serão executadas no modo **Emulação Mobile**
>     -   se você também fornecer outros navegadores além do Chrome, como `--devices --browsers=firefox,safari,edge`, ele adicionará automaticamente o Chrome no modo de emulação móvel
> -   O Storybook Runner criará por padrão capturas de elementos, se você quiser ver a captura de tela completa de emulação móvel, forneça `--clip=false` através da linha de comando
> -   O nome do arquivo, por exemplo, se parecerá com `__snapshots__/example/button/desktop_chrome/example-button--large-local-chrome-iPhone-14-Pro-Max-430x932-dpr-3.png`
> -   **[SRC:](https://chromedriver.chromium.org/mobile-emulation#h.p_ID_167)** Testar um site móvel em um desktop usando emulação móvel pode ser útil, mas os testadores devem estar cientes de que existem muitas diferenças sutis, como:
>     -   GPU totalmente diferente, o que pode levar a grandes mudanças de desempenho;
>     -   a interface do usuário móvel não é emulada (em particular, a barra de URL oculta afeta a altura da página);
>     -   popup de desambiguação (onde você seleciona um dos vários alvos de toque) não é suportado;
>     -   muitas APIs de hardware (por exemplo, evento orientationchange) não estão disponíveis.

#### `--headless`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `true`
-   **Exemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --headless=false`
-   **NOTA:** Disponível apenas através da CLI

Isso executará os testes por padrão no modo headless (quando o navegador o suportar) ou pode ser desativado

#### `--numShards`

-   **Tipo:** `number`
-   **Obrigatório:** Não
-   **Padrão:** `true`
-   **Exemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --numShards=10`

Este será o número de instâncias paralelas que serão usadas para executar as stories. Isso será limitado pelo `maxInstances` em seu arquivo `wdio.conf`.

> [!IMPORTANT]
> Ao executar no modo `headless`, não aumente o número para mais de 20 para evitar instabilidade devido a restrições de recursos

#### `--skipStories`

-   **Tipo:** `string|regex`
-   **Obrigatório:** Não
-   **Padrão:** null
-   **Exemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --skipStories="/.*button.*/gm"`

Isso pode ser:

-   uma string (`example-button--secondary,example-button--small`)
-   ou uma regex (`"/.*button.*/gm"`)

para pular certas stories. Use o `id` da story que pode ser encontrado na URL da story. Por exemplo, o `id` nesta URL `http://localhost:6006/?path=/story/example-page--logged-out` é `example-page--logged-out`

#### `--url`

-   **Tipo:** `string`
-   **Obrigatório:** Não
-   **Padrão:** `http://127.0.0.1:6006`
-   **Exemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --url="https://example.com"`

A URL onde sua instância do Storybook está hospedada.

#### `--version`

-   **Tipo:** `number`
-   **Obrigatório:** Não
-   **Padrão:** 7
-   **Exemplo:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --version=6`

Esta é a versão do Storybook, por padrão é `7`. Isso é necessário para saber se o [`clipSelector`](#clipselector) V6 precisa ser usado.

### Testes de Interação com Storybook

Os Testes de Interação do Storybook permitem que você interaja com seu componente criando scripts personalizados com comandos WDIO para colocar um componente em um determinado estado. Por exemplo, veja o trecho de código abaixo:

```ts
import { browser, expect } from "@wdio/globals";

describe("Storybook Interaction", () => {
    it("should create screenshots for the logged in state when it logs out", async () => {
        const componentId = "example-page--logged-in";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
        await $("button=Log out").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
    });

    it("should create screenshots for the logged out state when it logs in", async () => {
        const componentId = "example-page--logged-out";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
        await $("button=Log in").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
    });
});
```

Dois testes em dois componentes diferentes são executados. Cada teste primeiro define um estado e depois tira uma captura de tela. Você também notará que um novo comando personalizado foi introduzido, que pode ser encontrado [aqui](#new-custom-command).

O arquivo de especificação acima pode ser salvo em uma pasta e adicionado à linha de comando com o seguinte comando:

```sh
pnpm run test.local.desktop.storybook.localhost -- --spec='tests/specs/storybook-interaction/*.ts'
```

O Storybook Runner primeiro verificará automaticamente sua instância do Storybook e depois adicionará seus testes às stories que precisam ser comparadas. Se você não quiser que os componentes que usa para testes de interação sejam comparados duas vezes, pode adicionar um filtro para remover as stories "padrão" da verificação, fornecendo o filtro [`--skipStories`](#--skipstories). Isso se pareceria com:

```sh
pnpm run test.local.desktop.storybook.localhost -- --skipStories="/example-page.*/gm" --spec='tests/specs/storybook-interaction/*.ts'
```

### Novo Comando Personalizado

Um novo comando personalizado chamado `browser.waitForStorybookComponentToBeLoaded({ id: 'componentId' })` será adicionado ao objeto `browser/driver` que carregará automaticamente o componente e esperará que ele seja concluído, para que você não precise usar o método `browser.url('url.com')`. Pode ser usado assim:

```ts
import { browser, expect } from "@wdio/globals";

describe("Storybook Interaction", () => {
    it("should create screenshots for the logged in state when it logs out", async () => {
        const componentId = "example-page--logged-in";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
        await $("button=Log out").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
    });

    it("should create screenshots for the logged out state when it logs in", async () => {
        const componentId = "example-page--logged-out";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
        await $("button=Log in").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
    });
});
```

As opções são:

#### `additionalSearchParams`

-   **Tipo:** [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
-   **Obrigatório:** Não
-   **Padrão:** `new URLSearchParams()`
-   **Exemplo:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    additionalSearchParams: new URLSearchParams({ foo: "bar", abc: "def" }),
    id: "componentId",
});
```

Isso adicionará parâmetros de busca adicionais à URL do Storybook, no exemplo acima a URL será `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.
Veja a documentação [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) para mais informações.

#### `clipSelector`

-   **Tipo:** `string`
-   **Obrigatório:** Não
-   **Padrão:** `#storybook-root > :first-child` para Storybook V7 e `#root > :first-child:not(script):not(style)` para Storybook V6
-   **Exemplo:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    clipSelector: "#your-selector",
    id: "componentId",
});
```

Este é o seletor que será usado:

-   para selecionar o elemento para tirar a captura de tela
-   para o elemento esperar ser visível antes de uma captura de tela ser tirada

#### `id`

-   **Tipo:** `string`
-   **Obrigatório:** sim
-   **Exemplo:**

```ts
await browser.waitForStorybookComponentToBeLoaded({ '#your-selector', id: 'componentId' })
```

Use o `id` da story que pode ser encontrado na URL da story. Por exemplo, o `id` nesta URL `http://localhost:6006/?path=/story/example-page--logged-out` é `example-page--logged-out`

#### `timeout`

-   **Tipo:** `number`
-   **Obrigatório:** Não
-   **Padrão:** 1100 milissegundos
-   **Exemplo:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    timeout: 20000,
});
```

O tempo máximo que queremos esperar para que um componente fique visível após o carregamento na página

#### `url`

-   **Tipo:** `string`
-   **Obrigatório:** Não
-   **Padrão:** `http://127.0.0.1:6006`
-   **Exemplo:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    url: "https://your.url",
});
```

A URL onde sua instância do Storybook está hospedada.

</details>

## Contribuindo

### Atualizando os pacotes

Você pode atualizar os pacotes com uma ferramenta simples de CLI. Certifique-se de ter instalado todas as dependências, depois execute

```sh
pnpm update.packages
```

Isso acionará uma CLI que fará as seguintes perguntas

```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? (Minor|Latest)
? Do you want to update the package.json files? (Y/n)
? Do you want to remove all "node_modules" and reinstall dependencies? (Y/n)
? Would you like reinstall the dependencies? (Y/n)
```

Isso resultará nos seguintes logs

<details>
    <summary>Abra para ver um exemplo dos logs</summary>
    
```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? Minor
? Do you want to update the package.json files? yes
Updating root 'package.json' for minor updates...
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/package.json
[====================] 38/38 100%

@typescript-eslint/eslint-plugin ^8.7.0 → ^8.8.0
@typescript-eslint/parser ^8.7.0 → ^8.8.0
@typescript-eslint/utils ^8.7.0 → ^8.8.0
@vitest/coverage-v8 ^2.1.1 → ^2.1.2
vitest ^2.1.1 → ^2.1.2

Run pnpm install to install new versions.
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/ocr-service...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/ocr-service/package.json
[====================] 11/11 100%

All dependencies match the minor package versions :)
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-reporter...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-reporter/package.json
[====================] 11/11 100%

eslint-config-next 14.2.13 → 14.2.14
next 14.2.13 → 14.2.14

Run pnpm install to install new versions.
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-service...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-service/package.json
[====================] 5/5 100%

All dependencies match the minor package versions :)
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/webdriver-image-comparison...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/webdriver-image-comparison/package.json
[====================] 8/8 100%

All dependencies match the minor package versions :)
? Do you want to remove all "node_modules" and reinstall dependencies? yes
Removing root dependencies in /Users/wswebcreation/Git/wdio/visual-testing...
Removing dependencies in ocr-service...
Removing dependencies in visual-reporter...
Removing dependencies in visual-service...
Removing dependencies in webdriver-image-comparison...
? Would you like reinstall the dependencies? yes
Installing dependencies in /Users/wswebcreation/Git/wdio/visual-testing...

> @wdio/visual-testing-monorepo@ pnpm.install.workaround /Users/wswebcreation/Git/wdio/visual-testing
> pnpm install --shamefully-hoist

Scope: all 5 workspace projects
Lockfile is up to date, resolution step is skipped
Packages: +1274
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 1274, reused 1265, downloaded 0, added 1274, done

dependencies:

-   @wdio/ocr-service 2.0.0 <- packages/ocr-service
-   @wdio/visual-service 6.0.0 <- packages/visual-service

devDependencies:

-   @changesets/cli 2.27.8
-   @inquirer/prompts 5.5.0
-   @tsconfig/node20 20.1.4
-   @types/eslint 9.6.1
-   @types/jsdom 21.1.7
-   @types/node 20.16.4
-   @types/react 18.3.5
-   @types/react-dom 18.3.0
-   @types/xml2js 0.4.14
-   @typescript-eslint/eslint-plugin 8.8.0
-   @typescript-eslint/parser 8.8.0
-   @typescript-eslint/utils 8.8.0
-   @vitest/coverage-v8 2.1.2
-   @wdio/appium-service 9.1.2
-   @wdio/cli 9.1.2
-   @wdio/globals 9.1.2
-   @wdio/local-runner 9.1.2
-   @wdio/mocha-framework 9.1.2
-   @wdio/sauce-service 9.1.2
-   @wdio/shared-store-service 9.1.2
-   @wdio/spec-reporter 9.1.2
-   @wdio/types 9.1.2
-   eslint 9.11.1
-   eslint-plugin-import 2.30.0
-   eslint-plugin-unicorn 55.0.0
-   eslint-plugin-wdio 9.0.8
-   husky 9.1.6
-   jsdom 25.0.1
-   pnpm-run-all2 6.2.3
-   release-it 17.6.0
-   rimraf 6.0.1
-   saucelabs 8.0.0
-   ts-node 10.9.2
-   typescript 5.6.2
-   vitest 2.1.2
-   webdriverio 9.1.2

. prepare$ husky
└─ Done in 204ms
Done in 9.5s
All packages updated!

````

</details>

### Perguntas

Por favor, junte-se ao nosso servidor [Discord](https://discord.webdriver.io) se tiver dúvidas ou problemas ao contribuir para este projeto. Encontre os colaboradores no canal `🙏-contributing`.

### Problemas

Se você tiver dúvidas, bugs ou solicitações de recursos, por favor, abra uma issue. Antes de enviar uma issue, pesquise o arquivo de issues para ajudar a reduzir duplicações e leia o [FAQ](https://webdriver.io/docs/visual-testing/faq/).

Se você não encontrar lá, pode enviar uma issue onde pode:

-   🐛**Relatório de bug**: Crie um relatório para nos ajudar a melhorar
-   📖**Documentação**: Sugira melhorias ou relate documentação ausente/pouco clara.
-   💡**Solicitação de recurso**: Sugira uma ideia para este módulo.
-   💬**Pergunta**: Faça perguntas.

### Fluxo de Trabalho de Desenvolvimento

Para criar um PR para este projeto e começar a contribuir, siga este guia passo a passo:

-   Faça um fork do projeto.
-   Clone o projeto em algum lugar do seu computador

    ```sh
    $ git clone https://github.com/webdriverio/visual-testing.git
    ```

-   Vá para o diretório e configure o projeto

    ```sh
    $ cd visual-testing
    $ corepack enable
    $ pnpm pnpm.install.workaround
    ```

-   Execute o modo de observação que transpilará automaticamente o código

    ```sh
    $ pnpm watch
    ```

    para construir o projeto, execute:

    ```sh
    $ pnpm build
    ```

-   Certifique-se de que suas alterações não quebrem nenhum teste, execute:

    ```sh
    $ pnpm test
    ```

Este projeto usa [changesets](https://github.com/changesets/changesets) para criar automaticamente changelogs e releases.

### Testes

Vários testes precisam ser executados para poder testar o módulo. Ao adicionar um PR, todos os testes devem pelo menos passar nos testes locais. Cada PR é testado automaticamente contra o Sauce Labs, veja [nosso pipeline de GitHub Actions](https://github.com/webdriverio/visual-testing/actions/workflows/tests.yml). Antes de aprovar um PR, os colaboradores principais testarão o PR contra emuladores/simuladores / dispositivos reais.

#### Testes Locais

Primeiro, uma linha de base local precisa ser criada. Isso pode ser feito com:

```sh
// Com o protocolo webdriver
$ pnpm run test.local.init
```

Este comando criará uma pasta chamada `localBaseline` que conterá todas as imagens de linha de base.

Em seguida, execute:

```sh
// Com o protocolo webdriver
pnpm run test.local.desktop
```

Isso executará todos os testes em uma máquina local no Chrome.

#### Testes de Storybook Runner Local (Beta)

Primeiro, uma linha de base local precisa ser criada. Isso pode ser feito com:

```sh
pnpm run test.local.desktop.storybook
```

Isso executará testes do Storybook com Chrome em modo headless contra um repositório Demo do Storybook localizado em https://govuk-react.github.io/govuk-react/.

Para executar os testes com mais navegadores, você pode executar

```sh
pnpm run test.local.desktop.storybook -- --browsers=chrome,firefox,edge,safari
```

> [!NOTE]
> Certifique-se de ter os navegadores que deseja executar instalados em sua máquina local

#### Testes de CI com Sauce Labs (não necessário para um PR)

O comando abaixo é usado para testar a compilação no GitHub Actions, pode ser usado apenas lá e não para desenvolvimento local.

```
$ pnpm run test.saucelabs
```

Ele testará contra várias configurações que podem ser encontradas [aqui](https://github.com/webdriverio/visual-testing/blob/main/./tests/configs/wdio.saucelabs.web.conf.ts).
Todos os PRs são verificados automaticamente contra o Sauce Labs.

## Lançamento

Para lançar uma versão de qualquer um dos pacotes listados acima, faça o seguinte:

-   acione o [pipeline de lançamento](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   um PR de lançamento é gerado, faça com que seja revisado e aprovado por outro membro do WebdriverIO
-   mescle o PR
-   acione o [pipeline de lançamento](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml) novamente
-   uma nova versão deve ser lançada 🎉

## Créditos

`@wdio/visual-testing` usa uma licença de código aberto da [LambdaTest](https://www.lambdatest.com/) e [Sauce Labs](https://saucelabs.com/).