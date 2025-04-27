---
id: v7-migration
title: De v6 para v7
---

Este tutorial é para pessoas que ainda estão usando `v6` do WebdriverIO e desejam migrar para `v7`. Como mencionado em nosso [post do blog de lançamento](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released), as mudanças são principalmente internas e o processo de atualização deve ser direto.

:::info

Se você está usando WebdriverIO `v5` ou inferior, por favor, atualize para `v6` primeiro. Consulte nosso [guia de migração v6](v6-migration).

:::

Embora gostaríamos de ter um processo totalmente automatizado para isso, a realidade é diferente. Cada pessoa tem uma configuração diferente. Cada etapa deve ser vista como orientação e menos como uma instrução passo a passo. Se você tiver problemas com a migração, não hesite em [entrar em contato conosco](https://github.com/webdriverio/codemod/discussions/new).

## Configuração

Semelhante a outras migrações, podemos usar o [codemod](https://github.com/webdriverio/codemod) do WebdriverIO. Para este tutorial, usamos um [projeto modelo](https://github.com/WarleyGabriel/demo-webdriverio-cucumber) enviado por um membro da comunidade e o migramos completamente de `v6` para `v7`.

Para instalar o codemod, execute:

```sh
npm install jscodeshift @wdio/codemod
```

#### Commits:

- _install codemod deps_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## Atualizar Dependências do WebdriverIO

Dado que todas as versões do WebdriverIO estão vinculadas umas às outras, é melhor sempre atualizar para uma tag específica, por exemplo, `latest`. Para fazer isso, copiamos todas as dependências relacionadas ao WebdriverIO do nosso `package.json` e as reinstalamos via:

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

Normalmente, as dependências do WebdriverIO fazem parte das dependências de desenvolvimento, mas dependendo do seu projeto, isso pode variar. Depois disso, seu `package.json` e `package-lock.json` devem ser atualizados. __Nota:__ estas são as dependências usadas pelo [projeto de exemplo](https://github.com/WarleyGabriel/demo-webdriverio-cucumber), as suas podem ser diferentes.

#### Commits:

- _updated dependencies_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## Transformar Arquivo de Configuração

Um bom primeiro passo é começar com o arquivo de configuração. No WebdriverIO `v7`, não precisamos mais registrar manualmente nenhum dos compiladores. Na verdade, eles precisam ser removidos. Isso pode ser feito com o codemod de forma totalmente automática:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

O codemod ainda não suporta projetos TypeScript. Veja [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Estamos trabalhando para implementar o suporte em breve. Se você está usando TypeScript, por favor, envolva-se!

:::

#### Commits:

- _transpile config file_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## Atualizar Definições de Etapas

Se você está usando Jasmine ou Mocha, você está pronto aqui. O último passo é atualizar os imports do Cucumber.js de `cucumber` para `@cucumber/cucumber`. Isso também pode ser feito via codemod automaticamente:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

É isso! Não são necessárias mais alterações 🎉

#### Commits:

- _transpile step definitions_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## Conclusão

Esperamos que este tutorial o guie um pouco pelo processo de migração para o WebdriverIO `v7`. A comunidade continua a melhorar o codemod enquanto o testa com várias equipes em várias organizações. Não hesite em [levantar um problema](https://github.com/webdriverio/codemod/issues/new) se você tiver feedback ou [iniciar uma discussão](https://github.com/webdriverio/codemod/discussions/new) se você tiver dificuldades durante o processo de migração.