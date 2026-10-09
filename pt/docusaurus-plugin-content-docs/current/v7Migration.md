---
id: v7-migration
title: Da v6 para v7
description: "Atualize um projeto WebdriverIO da v6 para a v7 atualizando as dependências, transformando o arquivo de configuração e atualizando as definições de passos do Cucumber."
---

Este tutorial é para pessoas que ainda estão usando a `v6` do WebdriverIO e querem migrar para a `v7`. Como mencionado em nosso [post de lançamento no blog](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released), as mudanças são, em sua maioria, internas e a atualização deve ser um processo simples.

:::info

Se você estiver usando o WebdriverIO `v5` ou anterior, atualize primeiro para a `v6`. Confira nosso [guia de migração para a v6](v6-migration).

:::

Embora adorássemos ter um processo totalmente automatizado para isso, a realidade é diferente. Cada um tem uma configuração diferente. Cada passo deve ser visto como uma orientação e menos como uma instrução passo a passo. Se você tiver problemas com a migração, não hesite em [entrar em contato conosco](https://github.com/webdriverio/codemod/discussions/new).

## Configuração

Assim como em outras migrações, podemos usar o [codemod](https://github.com/webdriverio/codemod) do WebdriverIO. Para este tutorial, usamos um [projeto boilerplate](https://github.com/WarleyGabriel/demo-webdriverio-cucumber) enviado por um membro da comunidade e o migramos completamente da `v6` para a `v7`.

Para instalar o codemod, execute:

```sh
npm install jscodeshift @wdio/codemod
```

#### Commits:

- _install codemod deps_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## Atualizar as Dependências do WebdriverIO

Considerando que todas as versões do WebdriverIO estão estreitamente ligadas entre si, o melhor é sempre atualizar para uma tag específica, por exemplo, `latest`. Para isso, copiamos todas as dependências relacionadas ao WebdriverIO do nosso `package.json` e as reinstalamos via:

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

Normalmente, as dependências do WebdriverIO fazem parte das dependências de desenvolvimento, mas isso pode variar dependendo do seu projeto. Depois disso, seus arquivos `package.json` e `package-lock.json` devem estar atualizados. __Nota:__ estas são as dependências usadas pelo [projeto de exemplo](https://github.com/WarleyGabriel/demo-webdriverio-cucumber); as suas podem ser diferentes.

#### Commits:

- _updated dependencies_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## Transformar o Arquivo de Configuração

Um bom primeiro passo é começar pelo arquivo de configuração. No WebdriverIO `v7`, não é mais necessário registrar manualmente nenhum dos compiladores. Na verdade, eles precisam ser removidos. Isso pode ser feito de forma totalmente automática com o codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

O codemod ainda não oferece suporte a projetos TypeScript. Veja [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Estamos trabalhando para implementar esse suporte em breve. Se você estiver usando TypeScript, participe!

:::

#### Commits:

- _transpile config file_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## Atualizar as Definições de Passos

Se você estiver usando Jasmine ou Mocha, você terminou aqui. O último passo é atualizar as importações do Cucumber.js de `cucumber` para `@cucumber/cucumber`. Isso também pode ser feito automaticamente via codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

É isso! Nenhuma outra alteração é necessária 🎉

#### Commits:

- _transpile step definitions_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## Conclusão

Esperamos que este tutorial o oriente um pouco no processo de migração para o WebdriverIO `v7`. A comunidade continua aprimorando o codemod enquanto o testa com várias equipes em diversas organizações. Não hesite em [abrir uma issue](https://github.com/webdriverio/codemod/issues/new) se tiver algum feedback ou [iniciar uma discussão](https://github.com/webdriverio/codemod/discussions/new) se tiver dificuldades durante o processo de migração.