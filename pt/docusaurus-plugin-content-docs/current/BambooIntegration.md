---
id: bamboo
title: Bamboo
description: "Execute testes WebdriverIO no Atlassian Bamboo e publique os resultados JUnit para acompanhar os testes aprovados, reprovados e corrigidos em cada build."
---

O WebdriverIO oferece uma integração estreita com sistemas de CI como o [Bamboo](https://www.atlassian.com/software/bamboo). Com o reporter [JUnit](https://webdriver.io/docs/junit-reporter.html) ou [Allure](https://webdriver.io/docs/allure-reporter.html), você pode facilmente depurar seus testes, bem como acompanhar os resultados dos seus testes. A integração é bem fácil.

1. Instale o reporter de testes JUnit: `$ npm install @wdio/junit-reporter --save-dev`)
1. Atualize sua configuração para salvar os resultados do JUnit onde o Bamboo possa encontrá-los (e especifique o reporter `junit`):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/'
        }]
    ],
    // ...
}
```
Observação: *É sempre uma boa prática manter os resultados dos testes em uma pasta separada, em vez da pasta raiz.*

```js
// wdio.conf.js - For tests running in parallel
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/',
            outputFileFormat: function (options) {
                return `results-${options.cid}.xml`;
            }
        }]
    ],
    // ...
}
```

Os relatórios serão semelhantes para todos os frameworks e você pode usar qualquer um: Mocha, Jasmine ou Cucumber.

A esta altura, acreditamos que você já tenha os testes escritos, os resultados sejam gerados na pasta ```./testresults/``` e seu Bamboo esteja funcionando.

## Integre seus testes no Bamboo

1. Abra seu projeto no Bamboo
    > Crie um novo plano, vincule seu repositório (certifique-se de que ele sempre aponte para a versão mais recente do seu repositório) e crie seus estágios

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    Vou usar o estágio e o job padrão. No seu caso, você pode criar seus próprios estágios e jobs

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. Abra seu job de testes e crie tarefas para executar seus testes no Bamboo
    >**Tarefa 1:** Checkout do código-fonte

    >**Tarefa 2:** Execute seus testes ```npm i && npm run test```. Você pode usar a tarefa *Script* e o *Shell Interpreter* para executar os comandos acima (isso gerará os resultados dos testes e os salvará na pasta ```./testresults/```)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**Tarefa: 3** Adicione a tarefa *jUnit Parser* para analisar os resultados de testes salvos. Especifique aqui o diretório dos resultados dos testes (você também pode usar padrões no estilo Ant)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    Observação: *Certifique-se de manter a tarefa de análise dos resultados na seção *Final*, para que ela seja sempre executada mesmo que sua tarefa de testes falhe*

    >**Tarefa: 4** (opcional) Para garantir que seus resultados de testes não se misturem com arquivos antigos, você pode criar uma tarefa para remover a pasta ```./testresults/``` após uma análise bem-sucedida pelo Bamboo. Você pode adicionar um script shell como ```rm -f ./testresults/*.xml``` para remover os resultados ou ```rm -r testresults``` para remover a pasta inteira

Depois que a *ciência de foguetes* acima estiver concluída, habilite o plano e execute-o. Seu resultado final será assim:

## Teste bem-sucedido

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## Teste com falha

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## Com falha e corrigido

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

Eba!! É só isso. Você integrou com sucesso seus testes WebdriverIO no Bamboo.