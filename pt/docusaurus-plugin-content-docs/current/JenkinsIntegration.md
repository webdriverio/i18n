---
id: jenkins
title: Jenkins
---

WebdriverIO oferece uma integração perfeita com sistemas de CI como [Jenkins](https://jenkins-ci.org). Com o reporter `junit`, você pode facilmente depurar seus testes e também acompanhar seus resultados. A integração é bastante simples.

1. Instale o reporter de teste `junit`: `$ npm install @wdio/junit-reporter --save-dev`)
1. Atualize sua configuração para salvar seus resultados XUnit onde o Jenkins possa encontrá-los,
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

Cabe a você escolher qual framework utilizar. Os relatórios serão semelhantes.
Para este tutorial, usaremos o Jasmine.

Depois de ter escrito alguns testes, você pode configurar um novo job no Jenkins. Dê a ele um nome e uma descrição:

![Nome e Descrição](/img/jenkins/jobname.png "Nome e Descrição")

Em seguida, certifique-se de que ele sempre pegue a versão mais recente do seu repositório:

![Configuração do Git no Jenkins](/img/jenkins/gitsetup.png "Configuração do Git no Jenkins")

**Agora a parte importante:** Crie uma etapa de `build` para executar comandos shell. A etapa de `build` precisa construir seu projeto. Como este projeto de demonstração apenas testa um aplicativo externo, você não precisa construir nada. Basta instalar as dependências do node e executar o comando `npm test` (que é um alias para `node_modules/.bin/wdio test/wdio.conf.js`).

Se você instalou um plugin como AnsiColor, mas os logs ainda não estão coloridos, execute os testes com a variável de ambiente `FORCE_COLOR=1` (por exemplo, `FORCE_COLOR=1 npm test`).

![Etapa de Build](/img/jenkins/runjob.png "Etapa de Build")

Após o seu teste, você vai querer que o Jenkins acompanhe seu relatório XUnit. Para isso, você precisa adicionar uma ação pós-build chamada _"Publish JUnit test result report"_.

Você também poderia instalar um plugin XUnit externo para acompanhar seus relatórios. O JUnit vem com a instalação básica do Jenkins e é suficiente por enquanto.

De acordo com o arquivo de configuração, os relatórios XUnit serão salvos no diretório raiz do projeto. Esses relatórios são arquivos XML. Então, tudo o que você precisa fazer para acompanhar os relatórios é apontar o Jenkins para todos os arquivos XML em seu diretório raiz:

![Ação Pós-build](/img/jenkins/postjob.png "Ação Pós-build")

É isso! Você configurou o Jenkins para executar seus trabalhos WebdriverIO. Seu job agora fornecerá resultados detalhados dos testes com gráficos de histórico, informações de rastreamento de pilha em jobs com falha e uma lista de comandos com payload que foram usados em cada teste.

![Integração Final do Jenkins](/img/jenkins/final.png "Integração Final do Jenkins")