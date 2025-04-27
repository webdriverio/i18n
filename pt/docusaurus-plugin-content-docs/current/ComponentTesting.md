---
id: component-testing
title: Teste de Componentes
---

Com o [Browser Runner](/docs/runner#browser-runner) do WebdriverIO, você pode executar testes em um navegador desktop ou móvel real enquanto usa o WebdriverIO e o protocolo WebDriver para automatizar e interagir com o que é renderizado na página. Esta abordagem tem [muitas vantagens](/docs/runner#browser-runner) em comparação com outros frameworks de teste que só permitem testes com [JSDOM](https://www.npmjs.com/package/jsdom).

## Como funciona?

O Browser Runner usa o [Vite](https://vitejs.dev/) para renderizar uma página de teste e inicializar um framework de teste para executar seus testes no navegador. Atualmente, ele suporta apenas o Mocha, mas Jasmine e Cucumber estão [no roteiro](https://github.com/orgs/webdriverio/projects/1). Isso permite testar qualquer tipo de componentes, mesmo para projetos que não usam o Vite.

O servidor Vite é iniciado pelo testrunner do WebdriverIO e configurado para que você possa usar todos os reporters e serviços como costumava fazer para testes e2e normais. Além disso, ele inicializa uma instância [`browser`](/docs/api/browser) que permite acessar um subconjunto da [API WebdriverIO](/docs/api) para interagir com quaisquer elementos na página. Semelhante aos testes e2e, você pode acessar essa instância através da variável `browser` anexada ao escopo global ou importando-a de `@wdio/globals`, dependendo de como [`injectGlobals`](/docs/api/globals) está configurado.

O WebdriverIO tem suporte integrado para os seguintes frameworks:

- [__Nuxt__](https://nuxt.com/): O testrunner do WebdriverIO detecta uma aplicação Nuxt e configura automaticamente os composables do seu projeto e ajuda a simular o backend do Nuxt, leia mais na [documentação do Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/): O testrunner do WebdriverIO detecta se você está usando TailwindCSS e carrega o ambiente corretamente na página de teste

## Configuração

Para configurar o WebdriverIO para testes unitários ou de componentes no navegador, inicie um novo projeto WebdriverIO via:

```bash
npm init wdio@latest ./
# ou
yarn create wdio ./
```

Quando o assistente de configuração iniciar, escolha `browser` para executar testes unitários e de componentes e escolha um dos presets, se desejado; caso contrário, escolha _"Other"_ se você só quiser executar testes unitários básicos. Você também pode configurar uma configuração Vite personalizada se já usar o Vite no seu projeto. Para mais informações, confira todas as [opções do runner](/docs/runner#runner-options).

:::info

__Nota:__ O WebdriverIO, por padrão, executará testes de navegador em CI no modo headless, por exemplo, se uma variável de ambiente `CI` estiver definida como `'1'` ou `'true'`. Você pode configurar manualmente esse comportamento usando a opção [`headless`](/docs/runner#headless) para o runner.

:::

Ao final desse processo, você deve encontrar um `wdio.conf.js` que contém várias configurações do WebdriverIO, incluindo uma propriedade `runner`, por exemplo:

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

Ao definir diferentes [capabilities](/docs/configuration#capabilities), você pode executar seus testes em diferentes navegadores, em paralelo, se desejado.

Se você ainda não tem certeza de como tudo funciona, assista ao tutorial a seguir sobre como começar com o Teste de Componentes no WebdriverIO:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## Test Harness

É totalmente sua escolha o que você deseja executar em seus testes e como você deseja renderizar os componentes. No entanto, recomendamos usar o [Testing Library](https://testing-library.com/) como framework utilitário, pois ele fornece plugins para vários frameworks de componentes, como React, Preact, Svelte e Vue. É muito útil para renderizar componentes na página de teste e limpa automaticamente esses componentes após cada teste.

Você pode misturar primitivas da Testing Library com comandos do WebdriverIO como desejar, por exemplo:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__Nota:__ usar métodos de renderização da Testing Library ajuda a remover os componentes criados entre os testes. Se você não usar a Testing Library, certifique-se de anexar seus componentes de teste a um contêiner que seja limpo entre os testes.

## Scripts de Configuração

Você pode configurar seus testes executando scripts arbitrários no Node.js ou no navegador, por exemplo, injetando estilos, simulando APIs do navegador ou conectando-se a um serviço de terceiros. Os [hooks](/docs/configuration#hooks) do WebdriverIO podem ser usados para executar código no Node.js, enquanto o [`mochaOpts.require`](/docs/frameworks#require) permite importar scripts para o navegador antes que os testes sejam carregados, por exemplo:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // forneça um script de configuração para executar no navegador
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // configure o ambiente de teste no Node.js
    }
    // ...
}
```

Por exemplo, se você quiser simular todas as chamadas [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) em seu teste com o seguinte script de configuração:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// executar código antes que todos os testes sejam carregados
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // executar código após o arquivo de teste ser carregado
}

export const mochaGlobalTeardown = () => {
    // executar código após o arquivo de spec ser executado
}

```

Agora, em seus testes, você pode fornecer valores de resposta personalizados para todas as solicitações do navegador. Leia mais sobre fixtures globais na [documentação do Mocha](https://mochajs.org/#global-fixtures).

## Observar Arquivos de Teste e Aplicação

Existem várias maneiras de depurar seus testes de navegador. A mais fácil é iniciar o testrunner do WebdriverIO com a flag `--watch`, por exemplo:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

Isso executará todos os testes inicialmente e pausará quando todos forem executados. Você pode então fazer alterações em arquivos individuais, que serão reexecutados individualmente. Se você definir um [`filesToWatch`](/docs/configuration#filestowatch) apontando para os arquivos de sua aplicação, ele reexecutará todos os testes quando forem feitas alterações em sua aplicação.

## Depuração

Embora ainda não seja possível definir pontos de interrupção em seu IDE e tê-los reconhecidos pelo navegador remoto, você pode usar o comando [`debug`](/docs/api/browser/debug) para parar o teste em qualquer ponto. Isso permite abrir as DevTools para então depurar o teste definindo pontos de interrupção na [aba de fontes](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools).

Quando o comando `debug` é chamado, você também receberá uma interface repl do Node.js em seu terminal, dizendo:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

Pressione `Ctrl` ou `Command` + `c` ou digite `.exit` para continuar com o teste.

## Executar usando um Selenium Grid

Se você tiver um [Selenium Grid](https://www.selenium.dev/documentation/grid/) configurado e executar seu navegador através dessa grade, você deve definir a opção `host` do browser runner para permitir que o navegador acesse o host correto onde os arquivos de teste estão sendo servidos, por exemplo:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // IP da rede da máquina que executa o processo WebdriverIO
        host: 'http://172.168.0.2'
    }]
}
```

Isso garantirá que o navegador abra corretamente a instância do servidor hospedada na instância que executa os testes do WebdriverIO.

## Exemplos

Você pode encontrar vários exemplos para testar componentes usando frameworks de componentes populares em nosso [repositório de exemplos](https://github.com/webdriverio/component-testing-examples).