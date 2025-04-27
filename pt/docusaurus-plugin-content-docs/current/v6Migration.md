---
id: v6-migration
title: De v5 para v6
---

Este tutorial é para pessoas que ainda estão usando a `v5` do WebdriverIO e querem migrar para a `v6` ou para a versão mais recente do WebdriverIO. Como mencionado em nosso [post de lançamento](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released), as mudanças para esta atualização de versão podem ser resumidas da seguinte forma:

- consolidamos os parâmetros para alguns comandos (por exemplo, `newWindow`, `react$`, `react$$`, `waitUntil`, `dragAndDrop`, `moveTo`, `waitForDisplayed`, `waitForEnabled`, `waitForExist`) e movemos todos os parâmetros opcionais para um único objeto, por exemplo:

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

- configurações para serviços foram movidas para a lista de serviços, por exemplo:

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

- algumas opções de serviço foram renomeadas para fins de simplificação
- renomeamos o comando `launchApp` para `launchChromeApp` para sessões do Chrome WebDriver

:::info

Se você está usando WebdriverIO `v4` ou inferior, por favor, atualize para `v5` primeiro.

:::

Embora gostaríamos de ter um processo totalmente automatizado para isso, a realidade é diferente. Todos têm uma configuração diferente. Cada etapa deve ser vista como orientação e menos como uma instrução passo a passo. Se você tiver problemas com a migração, não hesite em [entrar em contato conosco](https://github.com/webdriverio/codemod/discussions/new).

## Configuração

Semelhante a outras migrações, podemos usar o [codemod](https://github.com/webdriverio/codemod) do WebdriverIO. Para instalar o codemod, execute:

```sh
npm install jscodeshift @wdio/codemod
```

## Atualizar Dependências do WebdriverIO

Dado que todas as versões do WebdriverIO estão ligadas umas às outras, é melhor sempre atualizar para uma tag específica, por exemplo, `6.12.0`. Se você decidir atualizar da `v5` diretamente para a `v7`, você pode omitir a tag e instalar as versões mais recentes de todos os pacotes. Para fazer isso, copiamos todas as dependências relacionadas ao WebdriverIO do nosso `package.json` e reinstalamos através de:

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

Normalmente, as dependências do WebdriverIO fazem parte das dependências de desenvolvimento, dependendo do seu projeto isso pode variar. Depois disso, seu `package.json` e `package-lock.json` devem ser atualizados. __Nota:__ estas são dependências de exemplo, as suas podem ser diferentes. Certifique-se de encontrar a versão v6 mais recente chamando, por exemplo:

```sh
npm show webdriverio versions
```

Tente instalar a versão 6 mais recente disponível para todos os pacotes principais do WebdriverIO. Para pacotes da comunidade, isso pode variar de pacote para pacote. Aqui, recomendamos verificar o changelog para obter informações sobre qual versão ainda é compatível com a v6.

## Transformar o Arquivo de Configuração

Um bom primeiro passo é começar com o arquivo de configuração. Todas as mudanças importantes podem ser resolvidas usando o codemod de forma totalmente automática:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

O codemod ainda não suporta projetos TypeScript. Consulte [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Estamos trabalhando para implementar suporte em breve. Se você estiver usando TypeScript, por favor, participe!

:::

## Atualizar Arquivos de Especificação e Objetos de Página

Para atualizar todas as alterações de comando, execute o codemod em todos os seus arquivos e2e que contêm comandos WebdriverIO, por exemplo:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

É isso! Não são necessárias mais alterações 🎉

## Conclusão

Esperamos que este tutorial o oriente um pouco durante o processo de migração para o WebdriverIO `v6`. Recomendamos fortemente continuar atualizando para a versão mais recente, dado que a atualização para `v7` é trivial devido a quase nenhuma mudança importante. Por favor, confira o guia de migração [para atualizar para v7](v7-migration).

A comunidade continua a melhorar o codemod enquanto o testa com várias equipes em várias organizações. Não hesite em [criar uma issue](https://github.com/webdriverio/codemod/issues/new) se tiver feedback ou [iniciar uma discussão](https://github.com/webdriverio/codemod/discussions/new) se tiver dificuldades durante o processo de migração.