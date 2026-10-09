---
id: gettingstarted
title: Primeiros Passos
description: Crie um projeto WebdriverIO com npm init wdio@latest, execute seu primeiro teste e encontre o próximo guia para sua plataforma.
---

Configure o WebdriverIO em um projeto existente ou novo com um único comando e, em seguida, execute seu primeiro teste. O assistente de configuração pergunta o que você deseja testar (web, mobile, desktop ou extensões do VS Code), qual framework e reporters usar, e instala tudo para você.

:::info
Esta é a documentação do WebdriverIO __v10__. Ainda está na v9? Use a [documentação da v9](https://v9.webdriver.io) ou siga o [guia de migração para a v10](/docs/v10-migration).
:::

:::tip Usando um agente de programação?
Aponte-o para [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) ou conecte o servidor MCP da documentação em `https://webdriver.io/mcp`. Veja [WebdriverIO para Agentes de Programação](/docs/ai-agents).
:::

## Iniciar uma Configuração do WebdriverIO

O [WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio) adiciona uma configuração completa do WebdriverIO a um projeto existente ou novo. No diretório raiz de um projeto existente, execute:

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest .
```

ou, se você quiser criar um novo projeto:

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

ou, se você quiser criar um novo projeto:

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

ou, se você quiser criar um novo projeto:

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

ou, se você quiser criar um novo projeto:

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

Este único comando baixa a ferramenta CLI do WebdriverIO e executa um assistente de configuração que ajuda você a configurar sua suíte de testes.

<CreateProjectAnimation />

O assistente fará uma série de perguntas que guiam você durante a configuração. Você pode passar o parâmetro `--yes` para escolher uma configuração padrão, que usará Mocha com Chrome utilizando o padrão [Page Object](https://martinfowler.com/bliki/PageObject.html).

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest . -- --yes
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio . --yes
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest . --yes
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest . --yes
```

</TabItem>
</Tabs>

### Responder ao assistente com flags

Cada pergunta do assistente possui uma flag de linha de comando. Uma flag responde à sua pergunta e o assistente pergunta apenas o restante. Junto com `--yes`, o assistente usa os valores padrão para o restante e nunca faz perguntas, que é exatamente o que um agente de programação ou um job de CI precisa:

```sh
# Cucumber em JavaScript, com os reporters spec e JUnit
npm init wdio@latest . -- --yes --framework cucumber --no-typescript --reporters spec,junit

# Firefox e Edge em vez do Chrome
npm init wdio@latest . -- --yes --browsers firefox,edge

# Um aplicativo Android com Appium
npm init wdio@latest . -- --yes --mobile-environment android

# Testes de componentes React
npm init wdio@latest . -- --yes --runner component --preset react

# Gera a configuração, mas você mesmo instala as dependências
npm init wdio@latest . -- --yes --no-npm-install
```

Com Yarn, pnpm e bun, passe as flags sem o separador `--`, por exemplo, `pnpm create wdio@latest . --yes --framework cucumber`.

As flags mais comuns:

| Flag | Valores |
| --- | --- |
| `--runner` | `e2e` (padrão), `component`, `desktop`, `vscode`, `roku` |
| `--framework` | `mocha` (padrão), `jasmine`, `cucumber`, `serenity-mocha`, `serenity-jasmine`, `serenity-cucumber` |
| `--typescript` / `--no-typescript` | TypeScript é o padrão quando o projeto possui um `tsconfig.json` |
| `--browsers` | Lista separada por vírgulas de `chrome` (padrão), `firefox`, `safari`, `edge` |
| `--mobile-environment` | `android`, `ios` |
| `--backend` | `local` (padrão), `saucelabs`, `browserstack`, `experitest`, `grid`, `other` |
| `--preset` | `lit`, `vue`, `svelte`, `solid`, `stencil`, `react`, `preact`, `other`, com `--runner component` |
| `--desktop-framework` | `electron`, `tauri`, `dioxus`, `macos`, com `--runner desktop` |
| `--reporters`, `--services`, `--plugins` | Nomes curtos separados por vírgulas, por exemplo, `--reporters spec,junit --services visual` |
| `--agent-support` / `--no-agent-support` | Gera a seção do `AGENTS.md` e a skill `wdio-session` (ativado por padrão) |
| `--npm-install` / `--no-npm-install` | Instala as dependências (ativado por padrão) |

`npm init wdio@latest -- --help` lista todas as flags, os valores que elas aceitam e a pergunta que respondem. Flags booleanas aceitam o prefixo `--no-`. As mesmas flags funcionam com `npx wdio config`.

O assistente verifica cada flag em relação à sua configuração. Um valor desconhecido, uma flag para uma pergunta que ele não faria ou um valor que ele não ofereceria para sua configuração o interrompe com o código de saída 2 antes que qualquer arquivo seja gravado:

```
Error: --preset does not apply to this setup. UI framework of your components (with --runner component).
```

## Instalar a CLI Manualmente

Você também pode adicionar o pacote da CLI ao seu projeto manualmente via:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # imprime, por exemplo, `8.13.10`

# executa o assistente de configuração
npx wdio config
```

## Executar Testes

Você pode iniciar sua suíte de testes usando o comando `run` e apontando para a configuração do WebdriverIO que você acabou de criar:

```sh
npx wdio run ./wdio.conf.js
```

Se quiser executar arquivos de teste específicos, você pode adicionar o parâmetro `--spec`:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

ou definir suítes no seu arquivo de configuração e executar apenas os arquivos de teste definidos em uma suíte:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## Executar em um script

Se você quiser usar o WebdriverIO como um mecanismo de automação no [Modo Standalone](/docs/setuptypes#standalone-mode) dentro de um script Node.JS, também pode instalar o WebdriverIO diretamente e usá-lo como um pacote, por exemplo, para gerar uma captura de tela de um site:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Nota:__ todos os comandos do WebdriverIO são assíncronos e precisam ser tratados adequadamente usando [`async/await`](https://javascript.info/async-await).

## Gravar testes

O WebdriverIO fornece ferramentas para ajudar você a começar, gravando suas ações de teste na tela e gerando scripts de teste do WebdriverIO automaticamente. Veja [Gravar testes com o Chrome DevTools Recorder](/docs/record) para mais informações.

## Requisitos do Sistema

Você precisará ter o [Node.js](http://nodejs.org) instalado.

- Instale pelo menos a v22.19.0 ou superior, pois esta é a versão LTS mais antiga suportada
- Apenas versões que são ou se tornarão LTS são oficialmente suportadas

Se o Node não estiver instalado no seu sistema, sugerimos utilizar uma ferramenta como [NVM](https://github.com/creationix/nvm) ou [Volta](https://volta.sh/) para ajudar a gerenciar várias versões ativas do Node.js. O NVM é uma escolha popular, enquanto o Volta também é uma boa alternativa.

## Assista à Introdução

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

Mais vídeos estão disponíveis no [canal oficial do YouTube](https://youtube.com/@webdriverio).

## Próximos Passos

- Escolha sua plataforma: [Navegadores Web](/docs/platforms/web), [Aplicativos Móveis](/docs/platforms/mobile), [Aplicativos Desktop](/docs/platforms/desktop) ou [Extensões e Editores](/docs/platforms/apps-and-extensions)
- Aprenda a [selecionar elementos](/docs/selectors) e escrever [asserções](/docs/assertion)
- Configure o test runner em [`wdio.conf.ts`](/docs/configurationfile)
- Obtenha ajuda no [Discord](https://discord.webdriver.io)