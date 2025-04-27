---
id: visual-testing
title: Testes Visuais
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## O que ele pode fazer?

O WebdriverIO fornece comparações de imagens em telas, elementos ou página completa para

-   🖥️ Navegadores de desktop (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Navegadores Mobile / Tablet (Chrome em emuladores Android / Safari em Simuladores iOS / Simuladores / dispositivos reais) via Appium
-   📱 Aplicações Nativas (emuladores Android / Simuladores iOS / dispositivos reais) via Appium (🌟 **NOVO** 🌟)
-   📳 Aplicações híbridas via Appium

através do [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service), que é um serviço leve do WebdriverIO.

Isso permite que você:

-   salve ou compare **telas/elementos/páginas completas** contra uma linha de base
-   **crie automaticamente uma linha de base** quando não houver nenhuma
-   **bloqueie regiões personalizadas** e até mesmo **exclua automaticamente** barras de status e ferramentas (apenas móvel) durante uma comparação
-   aumente as dimensões das capturas de tela de elementos
-   **oculte texto** durante a comparação de sites para:
    -   **melhorar a estabilidade** e evitar inconsistências na renderização de fontes
    -   focar apenas no **layout** de um site
-   use **diferentes métodos de comparação** e um conjunto de **comparadores adicionais** para testes mais legíveis
-   verifique como seu site vai **suportar navegação por tabulação com teclado)**, veja também [Navegando pelo site com tabulação](#tabbing-through-a-website)
-   e muito mais, veja as opções de [serviço](./visual-testing/service-options) e [método](./visual-testing/method-options)

O serviço é um módulo leve para recuperar os dados e capturas de tela necessários para todos os navegadores/dispositivos. O poder de comparação vem do [ResembleJS](https://github.com/Huddle/Resemble.js). Se você quiser comparar imagens online, pode verificar a [ferramenta online](http://rsmbl.github.io/Resemble.js/).

:::info NOTA Para Aplicativos Nativos/Híbridos
Os métodos `saveScreen`, `saveElement`, `checkScreen`, `checkElement` e os comparadores `toMatchScreenSnapshot` e `toMatchElementSnapshot` podem ser usados para Aplicativos/Contextos Nativos.

Por favor, use a propriedade `isHybridApp:true` nas configurações do serviço quando quiser usá-lo para Aplicativos Híbridos.
:::

## Instalação

A maneira mais fácil é manter o `@wdio/visual-service` como uma dependência de desenvolvimento no seu `package.json`, via:

```sh
npm install --save-dev @wdio/visual-service
```

## Uso

O `@wdio/visual-service` pode ser usado como um serviço normal. Você pode configurá-lo em seu arquivo de configuração da seguinte forma:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
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

Mais opções de serviço podem ser encontradas [aqui](/docs/visual-testing/service-options).

Depois de configurado em sua configuração WebdriverIO, você pode adicionar assertivas visuais aos [seus testes](/docs/visual-testing/writing-tests).

### Capacidades
Para usar o módulo de Testes Visuais, **você não precisa adicionar nenhuma opção extra às suas capacidades**. No entanto, em alguns casos, você pode querer adicionar metadados adicionais aos seus testes visuais, como um `logName`.

O `logName` permite atribuir um nome personalizado a cada capacidade, que pode então ser incluído nos nomes dos arquivos de imagem. Isso é particularmente útil para distinguir capturas de tela feitas em diferentes navegadores, dispositivos ou configurações.

Para habilitar isso, você pode definir `logName` na seção `capabilities` e garantir que a opção `formatImageName` no serviço de Testes Visuais faça referência a ele. Veja como configurar:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
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
                // O formato abaixo usará o `logName` das capacidades
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

2. Nomeação Personalizada de Imagens:

    - A opção `formatImageName` integra o `logName` nos nomes dos arquivos de captura de tela. Por exemplo, se a `tag` for homepage e a resolução for `1920x1080`, o nome do arquivo resultante pode ser assim:

        `homepage-chrome-mac-15-1920x1080.png`

3. Benefícios da Nomeação Personalizada:

    - Distinguir entre capturas de tela de diferentes navegadores ou dispositivos torna-se muito mais fácil, especialmente ao gerenciar linhas de base e depurar discrepâncias.

4. Nota sobre Padrões:

    - Se `logName` não estiver definido nas capacidades, a opção `formatImageName` o mostrará como uma string vazia nos nomes dos arquivos (`homepage--15-1920x1080.png`)

### WebdriverIO MultiRemote

Também suportamos [MultiRemote](https://webdriver.io/docs/multiremote/). Para fazer isso funcionar corretamente, certifique-se de adicionar `wdio-ics:options` às suas capacidades, como você pode ver abaixo. Isso garantirá que cada captura de tela tenha seu próprio nome exclusivo.

[Escrever seus testes](/docs/visual-testing/writing-tests) não será diferente em comparação com o uso do [testrunner](https://webdriver.io/docs/testrunner)

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

### Executando Programaticamente

Aqui está um exemplo mínimo de como usar o `@wdio/visual-service` via opções `remote`:

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

// "Iniciar" o serviço para adicionar os comandos personalizados ao `browser`
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// ou use isto APENAS para salvar uma captura de tela
await browser.saveFullPageScreen("examplePaged", {});

// ou use isto para validar. Ambos os métodos não precisam ser combinados, veja o FAQ
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### Navegando pelo site com tabulação

Você pode verificar se um site é acessível usando a tecla <kbd>TAB</kbd> do teclado. Testar essa parte da acessibilidade sempre foi um trabalho demorado (manual) e bastante difícil de fazer por meio da automação.
Com os métodos `saveTabbablePage` e `checkTabbablePage`, você pode agora desenhar linhas e pontos em seu site para verificar a ordem de tabulação.

Esteja ciente de que isso é útil apenas para navegadores desktop e **NÃO\*\*** para dispositivos móveis. Todos os navegadores desktop suportam esse recurso.

:::note

O trabalho foi inspirado no post do blog de [Viv Richards](https://github.com/vivrichards600) sobre ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

A forma como os elementos tabuláveis são selecionados é baseada no módulo [tabbable](https://github.com/davidtheclark/tabbable). Se houver problemas relacionados à tabulação, consulte o [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) e especialmente a seção [More Details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

#### Como funciona

Ambos os métodos criarão um elemento `canvas` em seu site e desenharão linhas e pontos para mostrar onde seu TAB iria se um usuário final o usasse. Depois disso, ele criará uma captura de tela de página inteira para dar uma boa visão geral do fluxo.

:::important

**Use o `saveTabbablePage` apenas quando precisar criar uma captura de tela e NÃO quiser compará-la **com uma imagem de **linha de base**.\*\*\*\*

:::

Quando você quiser comparar o fluxo de tabulação com uma linha de base, pode usar o método `checkTabbablePage`. Você **NÃO** precisa usar os dois métodos juntos. Se já existir uma imagem de linha de base criada, o que pode ser feito automaticamente fornecendo `autoSaveBaseline: true` ao instanciar o serviço,
o `checkTabbablePage` primeiro criará a imagem _atual_ e depois a comparará com a linha de base.

##### Opções

Ambos os métodos usam as mesmas opções que o [`saveFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#savefullpagescreen-or-savetabbablepage) ou o
[`compareFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#comparefullpagescreen-or-comparetabbablepage).

#### Exemplo

Este é um exemplo de como a tabulação funciona em nosso [site cobaia](https://guinea-pig.webdriver.io/image-compare.html):

![Exemplo de tabulação do WDIO](/img/visual/tabbable-chrome-latest-1366x768.png)

### Atualizar automaticamente Snapshots Visuais falhos

Atualize as imagens de linha de base através da linha de comando adicionando o argumento `--update-visual-baseline`. Isso irá

-   copiar automaticamente a captura de tela real e colocá-la na pasta da linha de base
-   se houver diferenças, fará com que o teste passe porque a linha de base foi atualizada

**Uso:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Ao executar logs no modo info/debug, você verá os seguintes logs adicionados

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## Suporte a TypeScript

Este módulo inclui suporte a TypeScript, permitindo que você se beneficie do preenchimento automático, segurança de tipos e experiência aprimorada de desenvolvedor ao usar o serviço de Testes Visuais.

### Passo 1: Adicionar Definições de Tipos
Para garantir que o TypeScript reconheça os tipos do módulo, adicione a seguinte entrada no campo types no seu tsconfig.json:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Passo 2: Habilitar Segurança de Tipos para Opções de Serviço
Para impor verificação de tipos nas opções de serviço, atualize sua configuração WebdriverIO:

```ts
// wdio.conf.ts
import { join } from 'node:path';
// Importe a definição de tipo
import type { VisualServiceOptions } from '@wdio/visual-service';

export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // Opções de serviço
                baselineFolder: join(process.cwd(), './__snapshots__/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
            } satisfies VisualServiceOptions, // Garante segurança de tipos
        ],
    ],
    // ...
};
```

## Requisitos do Sistema

### Versão 5 e superior

Para a versão 5 e superior, este módulo é puramente baseado em JavaScript sem dependências adicionais do sistema além dos [requisitos gerais do projeto](/docs/gettingstarted#system-requirements). Ele usa [Jimp](https://github.com/jimp-dev/jimp), que é uma biblioteca de processamento de imagens para Node escrita inteiramente em JavaScript, sem dependências nativas.

### Versão 4 e Inferior

Para a versão 4 e inferior, este módulo depende do [Canvas](https://github.com/Automattic/node-canvas), uma implementação de canvas para Node.js. Canvas depende do [Cairo](https://cairographics.org/).

#### Detalhes de Instalação

Por padrão, binários para macOS, Linux e Windows serão baixados durante o `npm install` do seu projeto. Se você não tiver um sistema operacional ou arquitetura de processador suportados, o módulo será compilado em seu sistema. Isso requer várias dependências, incluindo Cairo e Pango.

Para informações detalhadas de instalação, consulte o [wiki do node-canvas](https://github.com/Automattic/node-canvas/wiki/_pages). Abaixo estão instruções de instalação em uma linha para sistemas operacionais comuns. Observe que `libgif/giflib`, `librsvg` e `libjpeg` são opcionais e só são necessários para suporte a GIF, SVG e JPEG, respectivamente. Cairo v1.10.0 ou posterior é necessário.

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

     Usando [Homebrew](https://brew.sh/):

     ```sh
     brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
     ```

    **Mac OS X v10.11+:** Se você atualizou recentemente para Mac OS X v10.11+ e está experimentando problemas ao compilar, execute o seguinte comando: `xcode-select --install`. Leia mais sobre o problema [no Stack Overflow](http://stackoverflow.com/a/32929012/148072).
    Se você tiver o Xcode 10.0 ou superior instalado, para compilar a partir do código-fonte, você precisa do NPM 6.4.1 ou superior.

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

    Veja o [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)

</TabItem>
<TabItem value="others">

    Veja o [wiki](https://github.com/Automattic/node-canvas/wiki)

</TabItem>
</Tabs>