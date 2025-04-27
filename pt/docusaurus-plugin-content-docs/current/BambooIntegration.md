---
id: bamboo
title: Bamboo
---

WebdriverIO oferece uma integração estreita com sistemas de CI como [Bamboo](https://www.atlassian.com/software/bamboo). Com o reporter [JUnit](https://webdriver.io/docs/junit-reporter.html) ou [Allure](https://webdriver.io/docs/allure-reporter.html), você pode facilmente depurar seus testes, bem como acompanhar os resultados dos seus testes. A integração é bastante simples.

1. Instale o reporter de teste JUnit: `$ npm install @wdio/junit-reporter --save-dev`)
1. Atualize sua configuração para salvar seus resultados JUnit onde o Bamboo pode encontrá-los (e especifique o reporter `junit`):

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
Nota: *É sempre um bom padrão manter os resultados dos testes em uma pasta separada e não na pasta raiz.*

```js
// wdio.conf.js - Para testes executados em paralelo
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

Neste momento, acreditamos que você já tenha os testes escritos e os resultados estão sendo gerados na pasta ```./testresults/```, e seu Bamboo está em execução.

## Integre seus testes no Bamboo

1. Abra seu projeto Bamboo
    > Crie um novo plano, vincule seu repositório (certifique-se de que ele sempre aponte para a versão mais recente do seu repositório) e crie seus estágios

    ![Detalhes do Plano](/img/bamboo/plancreation.png "Detalhes do Plano")

    Vou seguir com o estágio e trabalho padrão. No seu caso, você pode criar seus próprios estágios e trabalhos

    ![Estágio Padrão](/img/bamboo/defaultstage.png "Estágio Padrão")
2. Abra seu trabalho de teste e crie tarefas para executar seus testes no Bamboo
    >**Tarefa 1:** Checkout do Código Fonte

    >**Tarefa 2:** Execute seus testes ```npm i && npm run test```. Você pode usar a tarefa *Script* e o *Interpretador Shell* para executar os comandos acima (Isso gerará os resultados dos testes e os salvará na pasta ```./testresults/```)

    ![Execução de Teste](/img/bamboo/testrun.png "Execução de Teste")

    >**Tarefa: 3** Adicione a tarefa *jUnit Parser* para analisar seus resultados de teste salvos. Por favor, especifique o diretório de resultados de teste aqui (você também pode usar padrões de estilo Ant)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    Nota: *Certifique-se de manter a tarefa do analisador de resultados na seção *Final*, para que ela seja sempre executada, mesmo se sua tarefa de teste falhar*

    >**Tarefa: 4** (opcional) Para garantir que seus resultados de teste não sejam bagunçados com arquivos antigos, você pode criar uma tarefa para remover a pasta ```./testresults/``` após uma análise bem-sucedida para o Bamboo. Você pode adicionar um script shell como ```rm -f ./testresults/*.xml``` para remover os resultados ou ```rm -r testresults``` para remover a pasta completa

Uma vez que a *ciência de foguetes* acima esteja concluída, ative o plano e execute-o. Seu resultado final será como:

## Teste Bem-sucedido

![Teste Bem-sucedido](/img/bamboo/successfulltest.png "Teste Bem-sucedido")

## Teste Falhou

![Teste Falhou](/img/bamboo/failedtest.png "Teste Falhou")

## Falhou e Corrigido

![Falhou e Corrigido](/img/bamboo/failedandfixed.png "Falhou e Corrigido")

Uau!! É isso. Você integrou com sucesso seus testes WebdriverIO no Bamboo.