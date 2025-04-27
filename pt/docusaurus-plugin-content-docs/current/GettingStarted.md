---
id: gettingstarted
title: Começando
---

Bem-vindo à documentação do WebdriverIO. Ela irá ajudá-lo a começar rapidamente. Se você encontrar problemas, pode encontrar ajuda e respostas em nosso [Servidor de Suporte no Discord](https://discord.webdriver.io) ou pode me contatar no [Twitter](https://twitter.com/webdriverio).

:::info
Esta é a documentação para a versão mais recente (__>=9.x__) do WebdriverIO. Se você ainda está usando uma versão mais antiga, visite os [sites de documentação antigos](/versions)!
:::

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

:::tip Canal Oficial no YouTube 🎥

Você pode encontrar mais vídeos sobre WebdriverIO no [canal oficial do YouTube](https://youtube.com/@webdriverio). Certifique-se de se inscrever!

:::

## Iniciar uma Configuração do WebdriverIO

Para adicionar uma configuração completa do WebdriverIO a um projeto existente ou novo usando o [WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio), execute:

Se você estiver no diretório raiz de um projeto existente, execute:

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

ou se você quiser criar um novo projeto:

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

ou se você quiser criar um novo projeto:

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

ou se você quiser criar um novo projeto:

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

ou se você quiser criar um novo projeto:

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

Este único comando baixa a ferramenta CLI do WebdriverIO e executa um assistente de configuração que ajuda você a configurar sua suíte de testes.

<CreateProjectAnimation />

O assistente fará um conjunto de perguntas que o guiará pela configuração. Você pode passar um parâmetro `--yes` para escolher uma configuração padrão que usará Mocha com Chrome usando o padrão [Page Object](https://martinfowler.com/bliki/PageObject.html).

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

## Instalar CLI Manualmente

Você também pode adicionar o pacote CLI ao seu projeto manualmente via:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # imprime, por exemplo, `8.13.10`

# executar assistente de configuração
npx wdio config
```

## Executar Teste

Você pode iniciar sua suíte de testes usando o comando `run` e apontando para a configuração do WebdriverIO que você acabou de criar:

```sh
npx wdio run ./wdio.conf.js
```

Se você quiser executar arquivos de teste específicos, pode adicionar um parâmetro `--spec`:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

ou definir suítes no seu arquivo de configuração e executar apenas os arquivos de teste definidos em uma suíte:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## Executar em um script

Se você deseja usar o WebdriverIO como um motor de automação no [Modo Standalone](/docs/setuptypes#standalone-mode) dentro de um script Node.JS, você também pode instalar diretamente o WebdriverIO e usá-lo como um pacote, por exemplo, para gerar uma captura de tela de um site:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Nota:__ todos os comandos do WebdriverIO são assíncronos e precisam ser tratados adequadamente usando [`async/await`](https://javascript.info/async-await).

## Gravar testes

O WebdriverIO fornece ferramentas para ajudá-lo a começar gravando suas ações de teste na tela e gerando scripts de teste do WebdriverIO automaticamente. Veja [Gravar testes com o Chrome DevTools Recorder](/docs/record) para mais informações.

## Requisitos do Sistema

Você precisará ter [Node.js](http://nodejs.org) instalado.

- Instale pelo menos a versão v18.20.0 ou superior, pois esta é a versão LTS ativa mais antiga
- Apenas as versões que são ou se tornarão uma versão LTS são oficialmente suportadas

Se o Node não estiver atualmente instalado em seu sistema, sugerimos utilizar uma ferramenta como [NVM](https://github.com/creationix/nvm) ou [Volta](https://volta.sh/) para auxiliar no gerenciamento de múltiplas versões ativas do Node.js. NVM é uma escolha popular, enquanto Volta também é uma boa alternativa.