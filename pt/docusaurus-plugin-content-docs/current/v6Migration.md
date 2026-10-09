---
id: v6-migration
title: Da v5 para a v6
description: "Atualize um projeto WebdriverIO da v5 para a v6 atualizando as dependências, transformando o arquivo de configuração e atualizando as specs e os page objects."
---

Este tutorial é para pessoas que ainda estão usando a `v5` do WebdriverIO e querem migrar para a `v6` ou para a versão mais recente do WebdriverIO. Como mencionado em nosso [post de lançamento no blog](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released), as mudanças desta atualização de versão podem ser resumidas da seguinte forma:

- consolidamos os parâmetros de alguns comandos (por exemplo, `newWindow`, `react$`, `react$$`, `waitUntil`, `dragAndDrop`, `moveTo`, `waitForDisplayed`, `waitForEnabled`, `waitForExist`) e movemos todos os parâmetros opcionais para um único objeto, por exemplo:

    ```js
    // v5
    browser.newWindow(
        'https://webdriver.io',
        'WebdriverIO window',
        'width=420,height=230,resizable,scrollbars=yes,status=1'
    )
    // v6
    browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1'
    })
    ```

- as configurações dos serviços foram movidas para a lista de serviços, por exemplo:

    ```js
    // v5
    exports.config = {
        services: ['sauce'],
        sauceConnect: true,
        sauceConnectOpts: { foo: 'bar' },
    }
    // v6
    exports.config = {
        services: [['sauce', {
            sauceConnect: true,
            sauceConnectOpts: { foo: 'bar' }
        }]],
    }
    ```

- algumas opções de serviços foram renomeadas para fins de simplificação
- renomeamos o comando `launchApp` para `launchChromeApp` para sessões do Chrome WebDriver

:::info

Se você estiver usando o WebdriverIO `v4` ou inferior, atualize primeiro para a `v5`.

:::

Embora adoraríamos ter um processo totalmente automatizado para isso, a realidade é diferente. Cada um tem uma configuração diferente. Cada etapa deve ser vista como uma orientação, e não tanto como uma instrução passo a passo. Se você tiver problemas com a migração, não hesite em [entrar em contato conosco](https://github.com/webdriverio/codemod/discussions/new).

## Configuração

Assim como em outras migrações, podemos usar o [codemod](https://github.com/webdriverio/codemod) do WebdriverIO. Para instalar o codemod, execute:

```sh
npm install jscodeshift @wdio/codemod
```

## Atualizar as dependências do WebdriverIO

Considerando que todas as versões do WebdriverIO estão estreitamente vinculadas entre si, o melhor é sempre atualizar para uma tag específica, por exemplo, `6.12.0`. Se você decidir atualizar da `v5` diretamente para a `v7`, pode omitir a tag e instalar as versões mais recentes de todos os pacotes. Para isso, copiamos todas as dependências relacionadas ao WebdriverIO do nosso `package.json` e as reinstalamos via:

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

Normalmente, as dependências do WebdriverIO fazem parte das dependências de desenvolvimento, mas isso pode variar dependendo do seu projeto. Depois disso, seu `package.json` e `package-lock.json` devem estar atualizados. __Observação:__ estas são dependências de exemplo, as suas podem ser diferentes. Certifique-se de encontrar a versão mais recente da v6 executando, por exemplo:

```sh
npm show webdriverio versions
```

Tente instalar a versão 6 mais recente disponível para todos os pacotes principais do WebdriverIO. Para pacotes da comunidade, isso pode variar de pacote para pacote. Aqui, recomendamos verificar o changelog para obter informações sobre qual versão ainda é compatível com a v6.

## Transformar o arquivo de configuração

Um bom primeiro passo é começar pelo arquivo de configuração. Todas as mudanças incompatíveis podem ser resolvidas de forma totalmente automática usando o codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

O codemod ainda não oferece suporte a projetos TypeScript. Veja [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Estamos trabalhando para implementar esse suporte em breve. Se você usa TypeScript, participe!

:::

## Atualizar arquivos de spec e page objects

Para atualizar todas as mudanças de comandos, execute o codemod em todos os seus arquivos e2e que contêm comandos do WebdriverIO, por exemplo:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

É isso! Nenhuma outra mudança é necessária 🎉

## Conclusão

Esperamos que este tutorial o guie um pouco pelo processo de migração para o WebdriverIO `v6`. Recomendamos fortemente que você continue atualizando para a versão mais recente, já que atualizar para a `v7` é trivial, devido a quase não haver mudanças incompatíveis. Confira o guia de migração [para atualizar para a v7](v7-migration).

A comunidade continua aprimorando o codemod enquanto o testa com diversas equipes em diversas organizações. Não hesite em [abrir uma issue](https://github.com/webdriverio/codemod/issues/new) se tiver feedback ou [iniciar uma discussão](https://github.com/webdriverio/codemod/discussions/new) se tiver dificuldades durante o processo de migração.