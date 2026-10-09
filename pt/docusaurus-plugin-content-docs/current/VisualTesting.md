---
id: visual-testing
title: Testes Visuais
description: "Compare capturas de tela de telas, elementos ou páginas inteiras com baselines usando o @wdio/visual-service, incluindo instalação e uso."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## O que ele pode fazer?

O WebdriverIO oferece comparações de imagens de telas, elementos ou de uma página inteira para

-   🖥️ Navegadores desktop (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Navegadores mobile / tablet (Chrome em emuladores Android / Safari em simuladores iOS / simuladores / dispositivos reais) via Appium
-   📱 Apps nativos (emuladores Android / simuladores iOS / dispositivos reais) via Appium (🌟 **NOVO** 🌟)
-   📳 Apps híbridos via Appium

por meio do [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service), que é um serviço leve do WebdriverIO.

Isso permite que você:

-   salve ou compare capturas de **telas/elementos/página inteira** com uma baseline
-   **crie automaticamente uma baseline** quando ainda não houver uma
-   **bloqueie regiões personalizadas** e até mesmo **exclua automaticamente** a barra de status e/ou barras de ferramentas (somente mobile) durante uma comparação
-   aumente as dimensões das capturas de tela de elementos
-   **oculte texto** durante a comparação de sites para:
    -   **melhorar a estabilidade** e evitar instabilidades na renderização de fontes
    -   focar apenas no **layout** de um site
-   use **diferentes métodos de comparação** e um conjunto de **matchers adicionais** para testes mais legíveis
-   verifique como seu site irá **suportar a navegação com a tecla Tab do teclado)**, veja também [Navegando por um site com Tab](#tabbing-through-a-website)
-   e muito mais, veja as opções do [serviço](./visual-testing/service-options) e dos [métodos](./visual-testing/method-options)

O serviço é um módulo leve para obter os dados e as capturas de tela necessários para todos os navegadores/dispositivos. O poder de comparação vem do [Pixelmatch](https://github.com/mapbox/pixelmatch), uma biblioteca de comparação perceptual de imagens rápida e precisa que utiliza o espaço de cores YIQ. As imagens são processadas com o [fast-png](https://github.com/image-js/fast-png), um codec PNG sem dependências nativas.

:::info NOTA Para Apps Nativos/Híbridos
Os métodos `saveScreen`, `saveElement`, `checkScreen`, `checkElement` e os matchers `toMatchScreenSnapshot` e `toMatchElementSnapshot` podem ser usados para Apps/Contexto Nativos.

Use a propriedade `isHybridApp:true` nas configurações do serviço quando quiser utilizá-lo para Apps Híbridos.
:::

:::caution Atualizando a partir da v9 (ou inferior)?

O `@wdio/visual-service` **v10** trocou o mecanismo de comparação de **ResembleJS** para **[Pixelmatch](https://github.com/mapbox/pixelmatch)**. O Pixelmatch usa um modelo de cores perceptual (YIQ) em vez de RGB puro, portanto as porcentagens de divergência serão diferentes das da v9. Isso significa que:

-   **O código dos seus testes não precisa mudar.** Todos os nomes de métodos, nomes de opções e matchers são idênticos.
-   **Suas imagens de baseline podem precisar ser atualizadas.** Após a atualização, execute sua suíte de testes e revise quaisquer diferenças visuais. Você pode atualizar baselines individuais que falharem com `--update-visual-baseline`, ou excluir toda a sua pasta de baselines e deixar que o `autoSaveBaseline` a recrie do zero. Veja o [FAQ](/docs/visual-testing/faq#my-visual-tests-fail-with-a-difference-how-can-i-update-my-baseline) para mais detalhes.

:::

## Instalação

A maneira mais fácil é manter o `@wdio/visual-service` como uma dev-dependency no seu `package.json`, via:

```sh
npm install --save-dev @wdio/visual-service
```

## Uso

O `@wdio/visual-service` pode ser usado como um serviço normal. Você pode configurá-lo no seu arquivo de configuração da seguinte forma:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Configuração
    // =====
    services: [
        [
            "visual",
            {
                // Algumas opções, veja a documentação para mais
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                formatImageName: "{tag}-{logName}-{width}x{height}",
                screenshotPath: path.join(process.cwd(), "tmp"),
                savePerInstance: true,
                // ... mais opções
            },
        ],
    ],
    // ...
};
```

Mais opções do serviço podem ser encontradas [aqui](/docs/visual-testing/service-options).

Depois de configurado no seu WebdriverIO, você pode começar a adicionar asserções visuais aos [seus testes](/docs/visual-testing/writing-tests).

### Capabilities
Para usar o módulo de Testes Visuais, **você não precisa adicionar nenhuma opção extra às suas capabilities**. No entanto, em alguns casos, você pode querer adicionar metadados adicionais aos seus testes visuais, como um `logName`.

O `logName` permite atribuir um nome personalizado a cada capability, que pode então ser incluído nos nomes dos arquivos de imagem. Isso é particularmente útil para distinguir capturas de tela feitas em diferentes navegadores, dispositivos ou configurações.

Para habilitar isso, você pode definir o `logName` na seção `capabilities` e garantir que a opção `formatImageName` do serviço de Testes Visuais faça referência a ele. Veja como configurar:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Configuração
    // =====
    capabilities: [
        {
            browserName: 'chrome',
            'wdio-ics:options': {
                logName: 'chrome-mac-15', // Nome de log personalizado para o Chrome
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Nome de log personalizado para o Firefox
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // Algumas opções, veja a documentação para mais
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // O formato abaixo usará o `logName` das capabilities
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... mais opções
            },
        ],
    ],
    // ...
};
```

#### Como funciona
1. Configurando o `logName`:

    - Na seção `capabilities`, atribua um `logName` único a cada navegador ou dispositivo. Por exemplo, `chrome-mac-15` identifica testes executados no Chrome no macOS versão 15.

2. Nomenclatura personalizada de imagens:

    - A opção `formatImageName` integra o `logName` aos nomes dos arquivos de captura de tela. Por exemplo, se a `tag` for homepage e a resolução for `1920x1080`, o nome do arquivo resultante pode ficar assim:

        `homepage-chrome-mac-15-1920x1080.png`

3. Benefícios da nomenclatura personalizada:

    - Distinguir capturas de tela de diferentes navegadores ou dispositivos torna-se muito mais fácil, especialmente ao gerenciar baselines e depurar discrepâncias.

4. Observação sobre os padrões:

    -Se o `logName` não estiver definido nas capabilities, a opção `formatImageName` o exibirá como uma string vazia nos nomes dos arquivos (`homepage--15-1920x1080.png`)

### WebdriverIO multi-remote

Também oferecemos suporte a [multi-remote](https://webdriver.io/docs/multiremote/). Para que isso funcione corretamente, certifique-se de adicionar `wdio-ics:options` às suas
capabilities, como você pode ver abaixo. Isso garantirá que cada captura de tela tenha seu próprio nome único.

[Escrever seus testes](/docs/visual-testing/writing-tests) não será diferente em comparação ao uso do [testrunner](https://webdriver.io/docs/testrunner)

```js
// wdio.conf.js
export const config = {
    capabilities: {
        chromeBrowserOne: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // ISTO!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-one",
                },
            },
        },
        chromeBrowserTwo: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // ISTO!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### Executando programaticamente

Aqui está um exemplo mínimo de como usar o `@wdio/visual-service` por meio das opções do `remote`:

```js
import { remote } from "webdriverio";
import VisualService from "@wdio/visual-service";

let visualService = new VisualService({
    autoSaveBaseline: true,
});

const browser = await remote({
    logLevel: "silent",
    capabilities: {
        browserName: "chrome",
    },
});

// "Inicia" o serviço para adicionar os comandos personalizados ao `browser`
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// ou use isto APENAS para salvar uma captura de tela
await browser.saveFullPageScreen("examplePaged", {});

// ou use isto para validar. Os dois métodos não precisam ser combinados, veja o FAQ
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### Navegando por um site com Tab

Você pode verificar se um site é acessível usando a tecla <kbd>TAB</kbd> do teclado. Testar essa parte da acessibilidade sempre foi um trabalho demorado (manual) e bastante difícil de fazer por meio de automação.
Com os métodos `saveTabbablePage` e `checkTabbablePage`, agora você pode desenhar linhas e pontos no seu site para verificar a ordem de tabulação.

Esteja ciente de que isso só é útil para navegadores desktop e **NÃO\*\*** para dispositivos móveis. Todos os navegadores desktop suportam esse recurso.

:::note

O trabalho é inspirado no post do blog de [Viv Richards](https://github.com/vivrichards600) sobre ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

A forma como os elementos tabuláveis são selecionados é baseada no módulo [tabbable](https://github.com/davidtheclark/tabbable). Se houver algum problema relacionado à tabulação, consulte o [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) e, especialmente, a seção [Mais ](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)Detalhes.

:::

#### Como funciona

Ambos os métodos criarão um elemento `canvas` no seu site e desenharão linhas e pontos para mostrar para onde o TAB iria se um usuário final o usasse. Depois disso, será criada uma captura de tela da página inteira para dar a você uma boa visão geral do fluxo.

:::important

**Use o `saveTabbablePage` somente quando precisar criar uma captura de tela e NÃO quiser compará-la **com uma imagem de **baseline**.\*\*\*\*

:::

Quando quiser comparar o fluxo de tabulação com uma baseline, você pode usar o método `checkTabbablePage`. Você **NÃO** precisa usar os dois métodos juntos. Se já houver uma imagem de baseline criada, o que pode ser feito automaticamente fornecendo `autoSaveBaseline: true` ao instanciar o serviço,
o `checkTabbablePage` primeiro criará a imagem _atual_ e depois a comparará com a baseline.

##### Opções

Ambos os métodos usam as mesmas opções do `saveFullPageScreen` ou do `compareFullPageScreen`.

#### Exemplo

Este é um exemplo de como a tabulação funciona no nosso [site cobaia](https://guinea-pig.webdriver.io/image-compare.html):

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### Atualizar automaticamente snapshots visuais que falharam

Atualize as imagens de baseline pela linha de comando adicionando o argumento `--update-visual-baseline`. Isso irá

-   copiar automaticamente a captura de tela atual e colocá-la na pasta de baseline
-   se houver diferenças, deixará o teste passar, pois a baseline foi atualizada

**Uso:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Ao executar com logs no modo info/debug, você verá os seguintes logs adicionados

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## Suporte a Typescript

Este módulo inclui suporte a TypeScript, permitindo que você se beneficie de autocompletar, segurança de tipos e uma melhor experiência de desenvolvimento ao usar o serviço de Testes Visuais.

### Passo 1: Adicionar definições de tipos
Para garantir que o TypeScript reconheça os tipos do módulo, adicione a seguinte entrada ao campo types no seu tsconfig.json:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Passo 2: Habilitar segurança de tipos para as opções do serviço
Para aplicar a verificação de tipos nas opções do serviço, atualize sua configuração do WebdriverIO:

```ts
// wdio.conf.ts
import { join } from 'node:path';
// Importa a definição de tipo
import type { VisualServiceOptions } from '@wdio/visual-service';

export const config = {
    // ...
    // =====
    // Configuração
    // =====
    services: [
        [
            "visual",
            {
                // Opções do serviço
                baselineFolder: join(process.cwd(), './__snapshots__/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
            } satisfies VisualServiceOptions, // Garante a segurança de tipos
        ],
    ],
    // ...
};
```

## Requisitos de sistema

### Versão 10 e superiores (atual)

Para a versão 10 e superiores, este módulo não possui dependências de sistema adicionais além dos [requisitos gerais do projeto](/docs/gettingstarted#system-requirements). Ele usa o [Pixelmatch](https://github.com/mapbox/pixelmatch) para comparação perceptual de imagens e o [fast-png](https://github.com/image-js/fast-png) para codificação/decodificação de imagens. Ambos são JavaScript puro, sem dependências nativas.

### Versões 5 a 9 (legado)

As versões 5 a 9 usavam o [Jimp](https://github.com/jimp-dev/jimp), uma biblioteca de processamento de imagens para Node escrita inteiramente em JavaScript, sem dependências nativas. Nenhuma dependência de sistema adicional era necessária.

### Versão 4 e inferiores

Para a versão 4 e inferiores, este módulo depende do [Canvas](https://github.com/Automattic/node-canvas), uma implementação de canvas para Node.js. O Canvas depende do [Cairo](https://cairographics.org/).

#### Detalhes da instalação

Por padrão, os binários para macOS, Linux e Windows serão baixados durante o `npm install` do seu projeto. Se você não tiver um sistema operacional ou arquitetura de processador suportados, o módulo será compilado no seu sistema. Isso requer várias dependências, incluindo Cairo e Pango.

Para informações detalhadas sobre a instalação, consulte a [wiki do node-canvas](https://github.com/Automattic/node-canvas/wiki/_pages). Abaixo estão instruções de instalação de uma linha para sistemas operacionais comuns. Observe que `libgif/giflib`, `librsvg` e `libjpeg` são opcionais e necessários apenas para suporte a GIF, SVG e JPEG, respectivamente. É necessário o Cairo v1.10.0 ou posterior.

<Tabs
defaultValue="osx"
values={[
{label: 'OS', value: 'osx'},
{label: 'Ubuntu', value: 'ubuntu'},
{label: 'Fedora', value: 'fedora'},
{label: 'Solaris', value: 'solaris'},
{label: 'OpenBSD', value: 'openbsd'},
{label: 'Window', value: 'windows'},
{label: 'Others', value: 'others'},
]}

> <TabItem value="osx">

     Usando o [Homebrew](https://brew.sh/):

     ```sh
     brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
     ```

    **Mac OS X v10.11+:** Se você atualizou recentemente para o Mac OS X v10.11+ e está tendo problemas ao compilar, execute o seguinte comando: `xcode-select --install`. Leia mais sobre o problema [no Stack Overflow](http://stackoverflow.com/a/32929012/148072).
    Se você tiver o Xcode 10.0 ou superior instalado, para compilar a partir do código-fonte você precisará do NPM 6.4.1 ou superior.

</TabItem>
<TabItem value="ubuntu">

    ```sh
    sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
    ```

</TabItem>
<TabItem value="fedora">

    ```sh
    sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
    ```

</TabItem>
<TabItem value="solaris">

    ```sh
    pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
    ```

</TabItem>
<TabItem value="openbsd">

    ```sh
    doas pkg_add cairo pango png jpeg giflib
    ```

</TabItem>
<TabItem value="windows">

    Veja a [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)

</TabItem>
<TabItem value="others">

    Veja a [wiki](https://github.com/Automattic/node-canvas/wiki)

</TabItem>
</Tabs>