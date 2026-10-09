---
id: jenkins
title: Jenkins
description: "Execute testes do WebdriverIO no Jenkins e publique os resultados do reporter JUnit para depurar falhas e acompanhar o histórico de testes."
---

O WebdriverIO oferece uma integração estreita com sistemas de CI como o [Jenkins](https://jenkins-ci.org). Com o reporter `junit`, você pode facilmente depurar seus testes, bem como acompanhar os resultados dos seus testes. A integração é bem fácil.

1. Instale o reporter de testes `junit`: `$ npm install @wdio/junit-reporter --save-dev`)
1. Atualize sua configuração para salvar seus resultados XUnit onde o Jenkins possa encontrá-los
    (e especifique o reporter `junit`):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './'
        }]
    ],
    // ...
}
```

Cabe a você escolher qual framework usar. Os relatórios serão semelhantes.
Para este tutorial, usaremos o Jasmine.

Depois de escrever alguns testes, você pode configurar um novo job no Jenkins. Dê a ele um nome e uma descrição:

![Name And Description](/img/jenkins/jobname.png "Name And Description")

Em seguida, certifique-se de que ele sempre obtenha a versão mais recente do seu repositório:

![Jenkins Git Setup](/img/jenkins/gitsetup.png "Jenkins Git Setup")

**Agora a parte importante:** Crie uma etapa de `build` para executar comandos de shell. A etapa de `build` precisa compilar seu projeto. Como este projeto de demonstração apenas testa uma aplicação externa, você não precisa compilar nada. Basta instalar as dependências do node e executar o comando `npm test` (que é um alias para `node_modules/.bin/wdio test/wdio.conf.js`).

Se você instalou um plugin como o AnsiColor, mas os logs ainda não estão coloridos, execute os testes com a variável de ambiente `FORCE_COLOR=1` (por exemplo, `FORCE_COLOR=1 npm test`).

![Build Step](/img/jenkins/runjob.png "Build Step")

Após o seu teste, você vai querer que o Jenkins acompanhe seu relatório XUnit. Para isso, você precisa adicionar uma ação pós-build chamada _"Publish JUnit test result report"_.

Você também pode instalar um plugin XUnit externo para acompanhar seus relatórios. O de JUnit vem com a instalação básica do Jenkins e é suficiente por enquanto.

De acordo com o arquivo de configuração, os relatórios XUnit serão salvos no diretório raiz do projeto. Esses relatórios são arquivos XML. Então, tudo o que você precisa fazer para acompanhar os relatórios é apontar o Jenkins para todos os arquivos XML no seu diretório raiz:

![Post-build Action](/img/jenkins/postjob.png "Post-build Action")

É isso! Agora você configurou o Jenkins para executar seus jobs do WebdriverIO. Seu job agora fornecerá resultados de testes detalhados com gráficos de histórico, informações de stacktrace em jobs com falha e uma lista de comandos com o payload utilizado em cada teste.

![Jenkins Final Integration](/img/jenkins/final.png "Jenkins Final Integration")