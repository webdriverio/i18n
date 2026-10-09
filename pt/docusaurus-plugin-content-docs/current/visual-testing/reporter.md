---
id: visual-reporter
title: Visual Reporter
description: "Gere e navegue pelo Visual Reporter para revisar as diferenças dos testes visuais a partir da saída JSON do @wdio/visual-service, localmente ou em CI."
---

O Visual Reporter é um novo recurso introduzido no `@wdio/visual-service`, a partir da versão [v5.2.0](https://github.com/webdriverio/visual-testing/releases/tag/%40wdio%2Fvisual-service%405.2.0). Este reporter permite que os usuários visualizem os relatórios de diferenças em JSON gerados pelo serviço de Testes Visuais e os transformem em um formato legível por humanos. Ele ajuda as equipes a analisar e gerenciar melhor os resultados dos testes visuais, fornecendo uma interface gráfica para revisar a saída.

Para utilizar este recurso, certifique-se de ter a configuração necessária para gerar o arquivo `output.json`. Este documento irá guiá-lo na configuração, execução e compreensão do Visual Reporter.

# Pré-requisitos

Antes de usar o Visual Reporter, certifique-se de ter configurado o serviço de Testes Visuais para gerar arquivos de relatório JSON:

```ts
export const config = {
    // ...
    services: [
        [
            "visual",
            {
                createJsonReportFiles: true, // Gera o arquivo output.json
            },
        ],
    ],
};
```

Para instruções de configuração mais detalhadas, consulte a [Documentação de Testes Visuais](./) do WebdriverIO ou o [`createJsonReportFiles`](./service-options.md#createjsonreportfiles-new)

# Instalação

Para instalar o Visual Reporter, adicione-o como uma dependência de desenvolvimento ao seu projeto usando npm:

```bash
npm install @wdio/visual-reporter --save-dev
```

Isso garantirá que os arquivos necessários estejam disponíveis para gerar relatórios a partir dos seus testes visuais.

# Uso

## Construindo o Relatório Visual

Depois de executar seus testes visuais e eles terem gerado o arquivo `output.json`, você pode construir o relatório visual usando a CLI ou prompts interativos.

### Uso da CLI

Você pode usar o comando da CLI para gerar o relatório executando:

```bash
npx wdio-visual-reporter --jsonOutput=<path-to-output.json> --reportFolder=<path-to-store-report> --logLevel=debug
```

#### Opções obrigatórias:

-   `--jsonOutput`: O caminho relativo para o arquivo `output.json` gerado pelo serviço de Testes Visuais. Este caminho é relativo ao diretório a partir do qual você executa o comando.
-   `--reportFolder`: O diretório relativo onde o relatório gerado será armazenado. Este caminho também é relativo ao diretório a partir do qual você executa o comando.

#### Opções opcionais:

-   `--logLevel`: Defina como `debug` para obter logs detalhados, especialmente úteis para solução de problemas.

#### Exemplo

```bash
npx wdio-visual-reporter --jsonOutput=/path/to/output.json --reportFolder=/path/to/report --logLevel=debug
```

Isso irá gerar o relatório na pasta especificada e fornecer feedback no console. Por exemplo:

```bash
✔ Build output copied successfully to "/path/to/report".
⠋ Prepare report assets...
✔ Successfully generated the report assets.
```

#### Visualizando o Relatório

:::warning
Abrir `path/to/report/index.html` diretamente em um navegador **sem servi-lo a partir de um servidor local** **NÃO** funcionará.
:::

Para visualizar o relatório, você precisa usar um servidor simples como o [sirv-cli](https://www.npmjs.com/package/sirv-cli). Você pode iniciar o servidor com o seguinte comando:

```bash
npx sirv-cli /path/to/report --single
```

Isso produzirá logs semelhantes ao exemplo abaixo. Observe que o número da porta pode variar:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Agora você pode visualizar o relatório abrindo a URL fornecida no seu navegador.

### Usando Prompts Interativos

Alternativamente, você pode executar o seguinte comando e responder aos prompts para gerar o relatório:

```bash
npx @wdio/visual-reporter
```

Os prompts irão guiá-lo no fornecimento dos caminhos e opções necessários. No final, o prompt interativo também perguntará se você deseja iniciar um servidor para visualizar o relatório. Se você optar por iniciar o servidor, a ferramenta iniciará um servidor simples e exibirá uma URL nos logs. Você pode abrir essa URL no seu navegador para visualizar o relatório.

![Visual Reporter CLI](/img/visual/cli-screen-recording.gif)

![Visual Reporter](/img/visual/visual-reporter.gif)

#### Visualizando o Relatório

:::warning
Abrir `path/to/report/index.html` diretamente em um navegador **sem servi-lo a partir de um servidor local** **NÃO** funcionará.
:::

Se você optou por **não** iniciar o servidor através do prompt interativo, ainda pode visualizar o relatório executando o seguinte comando manualmente:

```bash
npx sirv-cli /path/to/report --single
```

Isso produzirá logs semelhantes ao exemplo abaixo. Observe que o número da porta pode variar:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Agora você pode visualizar o relatório abrindo a URL fornecida no seu navegador.

# Demonstração do Relatório

Para ver um exemplo de como o relatório se parece, visite nossa [demonstração no GitHub Pages](https://webdriverio.github.io/visual-testing/).

# Entendendo o Relatório Visual

O Visual Reporter fornece uma visão organizada dos resultados dos seus testes visuais. Para cada execução de teste, você poderá:

-   Navegar facilmente entre os casos de teste e ver os resultados agregados.
-   Revisar metadados como nomes dos testes, navegadores utilizados e resultados das comparações.
-   Visualizar imagens de diferenças mostrando onde as diferenças visuais foram detectadas.

Essa representação visual simplifica a análise dos resultados dos seus testes, tornando mais fácil identificar e corrigir regressões visuais.

# Integrações com CI

Estamos trabalhando no suporte a diferentes ferramentas de CI, como Jenkins, GitHub Actions e assim por diante. Se você quiser nos ajudar, entre em contato conosco no [Discord - Visual Testing](https://discord.com/channels/1097401827202445382/1186908940286574642).