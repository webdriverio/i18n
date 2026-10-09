---
id: component-testing
title: Testes de Componentes
description: "Execute testes unitários e de componentes em navegadores reais com o browser runner do WebdriverIO, baseado no Vite, incluindo configuração, test harness e depuração."
---

Com o [Browser Runner](/docs/runner#browser-runner) do WebdriverIO, você pode executar testes dentro de um navegador real de desktop ou móvel, enquanto usa o WebdriverIO e o protocolo WebDriver para automatizar e interagir com o que é renderizado na página. Essa abordagem tem [muitas vantagens](/docs/runner#browser-runner) em comparação com outros frameworks de teste que só permitem testar contra o [JSDOM](https://www.npmjs.com/package/jsdom).

## Suporte a navegadores

O browser runner executa o bundle de testes no navegador. Esse bundle roda no Chrome 90, Edge 90, Firefox 90 e Safari 14.1, e em versões posteriores desses navegadores.

Os testes end-to-end são executados no Node.js. Já o código passado para [`browser.execute`](/docs/api/browser/execute) é executado no navegador automatizado, que pode ser mais antigo do que as versões acima. Mantenha esse código em ES2021.

## Como funciona?

O Browser Runner usa o [Vite](https://vitejs.dev/) para renderizar uma página de teste e inicializar um framework de teste para executar seus testes no navegador. Atualmente, ele suporta apenas Mocha, mas Jasmine e Cucumber estão [no roadmap](https://github.com/orgs/webdriverio/projects/1). Isso permite testar qualquer tipo de componente, mesmo em projetos que não usam o Vite.

O servidor Vite é iniciado pelo testrunner do WebdriverIO e configurado para que você possa usar todos os reporters e serviços como costumava fazer em testes e2e normais. Além disso, ele inicializa uma instância de [`browser`](/docs/api/browser) que permite acessar um subconjunto da [API do WebdriverIO](/docs/api) para interagir com quaisquer elementos na página. Assim como nos testes e2e, você pode acessar essa instância pela variável `browser` anexada ao escopo global ou importando-a de `@wdio/globals`, dependendo de como [`injectGlobals`](/docs/api/globals) está configurado.

O WebdriverIO tem suporte integrado para os seguintes frameworks:

- [__Nuxt__](https://nuxt.com/): o testrunner do WebdriverIO detecta uma aplicação Nuxt e configura automaticamente os composables do seu projeto, além de ajudar a simular o backend do Nuxt. Leia mais na [documentação do Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/): o testrunner do WebdriverIO detecta se você está usando TailwindCSS e carrega o ambiente corretamente na página de teste

## Configuração

Para configurar o WebdriverIO para testes unitários ou de componentes no navegador, inicie um novo projeto WebdriverIO via:

```bash
npm init wdio@latest ./
# or
yarn create wdio ./
```

Quando o assistente de configuração iniciar, escolha `browser` para executar testes unitários e de componentes e selecione um dos presets, se desejar; caso contrário, escolha _"Other"_ se quiser apenas executar testes unitários básicos. Você também pode definir uma configuração personalizada do Vite caso já use o Vite no seu projeto. Para mais informações, confira todas as [opções do runner](/docs/runner#runner-options).

:::info

__Nota:__ por padrão, o WebdriverIO executará os testes de navegador em CI no modo headless, por exemplo, quando uma variável de ambiente `CI` estiver definida como `'1'` ou `'true'`. Você pode configurar esse comportamento manualmente usando a opção [`headless`](/docs/runner#headless) do runner.

:::

Ao final desse processo, você deverá encontrar um `wdio.conf.js` contendo várias configurações do WebdriverIO, incluindo uma propriedade `runner`, por exemplo:

```ts reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

Ao definir diferentes [capabilities](/docs/configuration#capabilities), você pode executar seus testes em diferentes navegadores, em paralelo se desejar.

Se ainda não tiver certeza de como tudo funciona, assista ao seguinte tutorial sobre como começar com Testes de Componentes no WebdriverIO:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## Test Harness

Fica totalmente a seu critério o que executar nos seus testes e como renderizar os componentes. No entanto, recomendamos usar a [Testing Library](https://testing-library.com/) como framework utilitário, pois ela fornece plugins para vários frameworks de componentes, como React, Preact, Svelte e Vue. Ela é muito útil para renderizar componentes na página de teste e limpa automaticamente esses componentes após cada teste.

Você pode misturar primitivas da Testing Library com comandos do WebdriverIO como quiser, por exemplo:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__Nota:__ usar os métodos de renderização da Testing Library ajuda a remover os componentes criados entre os testes. Se você não usar a Testing Library, certifique-se de anexar seus componentes de teste a um contêiner que seja limpo entre os testes.

## Scripts de Configuração

Você pode configurar seus testes executando scripts arbitrários no Node.js ou no navegador, por exemplo, injetando estilos, simulando APIs do navegador ou conectando-se a um serviço de terceiros. Os [hooks](/docs/configuration#hooks) do WebdriverIO podem ser usados para executar código no Node.js, enquanto o [`mochaOpts.require`](/docs/frameworks#require) permite importar scripts no navegador antes que os testes sejam carregados, por exemplo:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // fornece um script de configuração para executar no navegador
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // configura o ambiente de teste no Node.js
    }
    // ...
}
```

Por exemplo, se quiser simular todas as chamadas [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) no seu teste com o seguinte script de configuração:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// executa código antes de todos os testes serem carregados
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // executa código após o arquivo de teste ser carregado
}

export const mochaGlobalTeardown = () => {
    // executa código após o arquivo spec ser executado
}

```

Agora, nos seus testes, você pode fornecer valores de resposta personalizados para todas as requisições do navegador. Leia mais sobre fixtures globais na [documentação do Mocha](https://mochajs.org/#global-fixtures).

## Observar Arquivos de Teste e da Aplicação

Existem várias formas de depurar seus testes de navegador. A mais fácil é iniciar o testrunner do WebdriverIO com a flag `--watch`, por exemplo:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

Isso executará todos os testes inicialmente e fará uma pausa quando todos tiverem sido executados. Você pode então fazer alterações em arquivos individuais, que serão reexecutados individualmente. Se você definir um [`filesToWatch`](/docs/configuration#filestowatch) apontando para os arquivos da sua aplicação, todos os testes serão reexecutados quando forem feitas alterações no seu app.

## Depuração

Embora (ainda) não seja possível definir breakpoints na sua IDE e fazer com que sejam reconhecidos pelo navegador remoto, você pode usar o comando [`debug`](/docs/api/browser/debug) para interromper o teste em qualquer ponto. Isso permite abrir o DevTools para depurar o teste definindo breakpoints na [aba sources](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools).

Quando o comando `debug` é chamado, você também terá uma interface repl do Node.js no seu terminal, dizendo:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

Pressione `Ctrl` ou `Command` + `c` ou digite `.exit` para continuar com o teste.

## Executar usando um Selenium Grid

Se você tiver um [Selenium Grid](https://www.selenium.dev/documentation/grid/) configurado e executar seu navegador através desse grid, será necessário definir a opção `host` do browser runner para permitir que o navegador acesse o host correto onde os arquivos de teste estão sendo servidos, por exemplo:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // IP de rede da máquina que executa o processo do WebdriverIO
        host: 'http://172.168.0.2'
    }]
}
```

Isso garantirá que o navegador abra corretamente a instância de servidor hospedada na máquina que executa os testes do WebdriverIO.

## Exemplos

Você pode encontrar vários exemplos de testes de componentes usando frameworks de componentes populares no nosso [repositório de exemplos](https://github.com/webdriverio/component-testing-examples).