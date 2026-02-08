---
id: boilerplates
title: Projetos Boilerplate
---

Ao longo do tempo, nossa comunidade desenvolveu vários projetos que você pode usar como inspiração para configurar sua própria suíte de testes.

# v9 Boilerplate Projects

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Nosso próprio boilerplate para suítes de teste Cucumber. Criamos mais de 150 definições de passos predefinidos para você, para que você possa começar a escrever arquivos de recursos em seu projeto imediatamente.

- Framework:
    - Cucumber
    - WebdriverIO
- Características:
    - Mais de 150 passos predefinidos que cobrem quase tudo o que você precisa
    - Integra a funcionalidade Multiremote do WebdriverIO
    - Aplicativo de demonstração próprio

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Projeto boilerplate para executar testes WebdriverIO com Jasmine usando recursos do Babel e o padrão de objetos de página.

- Frameworks
    - WebdriverIO
    - Jasmine
- Características
    - Padrão de Objeto de Página
    - Integração com Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Projeto boilerplate para executar testes WebdriverIO em uma aplicação Electron mínima.

- Frameworks
    - WebdriverIO
    - Mocha
- Características
    - Simulação de API Electron

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Este projeto boilerplate possui testes móveis WebdriverIO 9 com Cucumber, TypeScript e Appium para plataformas Android e iOS, seguindo o padrão Model Object Pattern. Possui registro abrangente, relatórios, gestos móveis, navegação de app para web e integração CI/CD.

- Frameworks:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Características:
    - Suporte a múltiplas plataformas
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Gestos Móveis
      - Rolar
      - Deslizar
      - Pressão longa
      - Ocultar teclado
    - Navegação de App para Web
      - Alternância de contexto
      - Suporte a WebView
      - Automação de navegador (Chrome/Safari)
    - Estado Novo do Aplicativo
      - Redefinição automática do aplicativo entre cenários
      - Comportamento de redefinição configurável (noReset, fullReset)
    - Configuração de Dispositivo
      - Gerenciamento centralizado de dispositivos
      - Alternância fácil de plataformas
    - Exemplo de Estrutura de Diretório para JavaScript / TypeScript. Abaixo é para a versão JS, a versão TS tem a mesma estrutura também.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Gere automaticamente classes de Objeto de Página WebdriverIO e especificações de teste Mocha a partir de arquivos .feature Gherkin — reduzindo o esforço manual, melhorando a consistência e acelerando a automação de QA. Este projeto não apenas produz códigos compatíveis com webdriver.io, mas também aprimora todas as funcionalidades do webdriver.io. Criamos duas versões, uma para usuários JavaScript e outra para usuários TypeScript. Mas ambos os projetos funcionam da mesma maneira.

***Como funciona?***
- O processo segue uma automação de duas etapas:
- Etapa 1: Gherkin para stepMap (Gerar arquivos stepMap.json)
  - Gerar arquivos stepMap.json:
    - Analisa arquivos .feature escritos em sintaxe Gherkin.
    - Extrai cenários e etapas.
    - Produz um arquivo .stepMap.json estruturado contendo:
      - ação a ser realizada (por exemplo, click, setText, assertVisible)
      - selectorName para mapeamento lógico
      - selector para o elemento DOM
      - note para valores ou asserção
- Etapa 2: stepMap para Código (Gerar Código WebdriverIO).
  Usa stepMap.json para gerar:
  - Gerar uma classe base page.js com métodos compartilhados e configuração de browser.url().
  - Gerar classes de Modelo de Objeto de Página (POM) compatíveis com WebdriverIO por recurso dentro de test/pageobjects/.
  - Gerar especificações de teste baseadas em Mocha.
- Exemplo de Estrutura de Diretório para JavaScript / TypeScript. Abaixo é para a versão JS, a versão TS tem a mesma estrutura também.
```
project-root/
├── features/                   # Arquivos .feature Gherkin (entrada do usuário / arquivo de origem)
├── stepMaps/                   # Arquivos .stepMap.json gerados automaticamente
├── test/
│   ├── pageobjects/            # Classes do Modelo de Objeto de Página WebdriverIO geradas automaticamente
│   └── specs/                  # Especificações de teste Mocha geradas automaticamente
├── src/
│   ├── cli.js                  # Lógica principal de CLI
│   ├── generateStepsMap.js     # Gerador de feature-to-stepMap
│   ├── generateTestsFromMap.js # Gerador de stepMap-to-page/spec
│   ├── utils.js                # Métodos auxiliares
│   └── config.js               # Caminhos, seletores de fallback, aliases
│   └── __tests__/              # Testes unitários (Vitest)
├── testgen.js                  # Ponto de entrada CLI
│── wdio.config.js              # Configuração WebdriverIO
├── package.json                # Scripts e dependências
├── selector-aliases.json       # Substituições de seletor definidas pelo usuário (opcional) que substituem o seletor primário
```
---
# v8 Boilerplate Projects

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 com Cucumber (V8x).
- Características:
    - Modelo de Objetos de Página usa abordagem baseada em classe com estilo ES6/ES7 e suporte a TypeScript
    - Exemplos de opções de múltiplos seletores para consultar elementos com mais de um seletor ao mesmo tempo
    - Exemplos de execução de navegador múltiplo e headless usando - Chrome e Firefox
    - Integração com testes em nuvem com BrowserStack, Sauce Labs, TestMu AI (anteriormente LambdaTest)
    - Exemplos de leitura/gravação de dados do MS-Excel para fácil gerenciamento de dados de teste de fontes externas com exemplos
    - Suporte a banco de dados para qualquer RDBMS (Oracle, MySql, TeraData, Vertica etc.), executando quaisquer consultas / obtendo conjunto de resultados etc. com exemplos para testes E2E
    - Múltiplos relatórios (Spec, Xunit/Junit, Allure, JSON) e hospedagem de relatórios Allure e Xunit/Junit em WebServer.
    - Exemplos com aplicativo de demonstração https://search.yahoo.com/ e http://the-internet.herokuapp.com.
    - Arquivo `.config` específico para BrowserStack, Sauce Labs, TestMu AI (anteriormente LambdaTest) e Appium (para reprodução em dispositivos móveis). Para configuração Appium com um clique em máquina local para iOS e Android, consulte [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 com Mocha (V10x).
- Características:
    - Modelo de Objetos de Página usa abordagem baseada em classe com estilo ES6/ES7 e suporte a TypeScript
    - Exemplos com aplicativo de demonstração https://search.yahoo.com e http://the-internet.herokuapp.com
    - Exemplos de execução de navegador múltiplo e headless usando - Chrome e Firefox
    - Integração com testes em nuvem com BrowserStack, Sauce Labs, TestMu AI (anteriormente LambdaTest)
    - Múltiplos relatórios (Spec, Xunit/Junit, Allure, JSON) e hospedagem de relatórios Allure e Xunit/Junit em WebServer.
    - Exemplos de leitura/gravação de dados do MS-Excel para fácil gerenciamento de dados de teste de fontes externas com exemplos
    - Exemplos de conexão com BD para qualquer RDBMS (Oracle, MySql, TeraData, Vertica etc.), qualquer execução de consulta / obtenção de conjunto de resultados etc. com exemplos para testes E2E
    - Arquivo `.config` específico para BrowserStack, Sauce Labs, TestMu AI (anteriormente LambdaTest) e Appium (para reprodução em dispositivos móveis). Para configuração Appium com um clique em máquina local para iOS e Android, consulte [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 com Jasmine (V4x).
- Características:
    - Modelo de Objetos de Página usa abordagem baseada em classe com estilo ES6/ES7 e suporte a TypeScript
    - Exemplos com aplicativo de demonstração https://search.yahoo.com e http://the-internet.herokuapp.com
    - Exemplos de execução de navegador múltiplo e headless usando - Chrome e Firefox
    - Integração com testes em nuvem com BrowserStack, Sauce Labs, TestMu AI (anteriormente LambdaTest)
    - Múltiplos relatórios (Spec, Xunit/Junit, Allure, JSON) e hospedagem de relatórios Allure e Xunit/Junit em WebServer.
    - Exemplos de leitura/gravação de dados do MS-Excel para fácil gerenciamento de dados de teste de fontes externas com exemplos
    - Exemplos de conexão com BD para qualquer RDBMS (Oracle, MySql, TeraData, Vertica etc.), qualquer execução de consulta / obtenção de conjunto de resultados etc. com exemplos para testes E2E
    - Arquivo `.config` específico para BrowserStack, Sauce Labs, TestMu AI (anteriormente LambdaTest) e Appium (para reprodução em dispositivos móveis). Para configuração Appium com um clique em máquina local para iOS e Android, consulte [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Este projeto boilerplate tem testes WebdriverIO 8 com cucumber e typescript, seguindo o padrão de objetos de página.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- Características:
    - Typescript v5
    - Padrão de Objeto de Página
    - Prettier
    - Suporte a múltiplos navegadores
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Execução paralela em vários navegadores
    - Appium
    - Integração de testes em nuvem com BrowserStack e Sauce Labs
    - Serviço Docker
    - Serviço de compartilhamento de dados
    - Arquivos de configuração separados para cada serviço
    - Gerenciamento de dados de teste e leitura por tipo de usuário
    - Relatórios
      - Dot
      - Spec
      - Relatório html cucumber múltiplo com capturas de tela de falhas
    - Pipelines Gitlab para repositório Gitlab
    - Ações Github para repositório Github
    - Docker compose para configuração do docker hub
    - Testes de acessibilidade usando AXE
    - Testes visuais usando Applitools
    - Mecanismo de log


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Características
    - Contém cenário de teste de amostra em cucumber
    - Relatórios html cucumber integrados com vídeos incorporados em falhas
    - Serviços Lambdatest e CircleCI integrados
    - Testes Visual, Acessibilidade e API integrados
    - Funcionalidade de e-mail integrada
    - Bucket s3 integrado para armazenamento e recuperação de relatórios de teste

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Projeto de template [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) para ajudá-lo a começar com testes de aceitação de suas aplicações web usando o WebdriverIO, Mocha e Serenity/JS mais recentes.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Relatório Serenity BDD

- Características
    - [Padrão Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Capturas de tela automáticas em falha de teste, incorporadas em relatórios
    - Configuração de Integração Contínua (CI) usando [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Relatórios Serenity BDD de demonstração](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicados no GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Projeto de template [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) para ajudá-lo a começar com testes de aceitação de suas aplicações web usando o WebdriverIO, Cucumber e Serenity/JS mais recentes.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Relatório Serenity BDD

- Características
    - [Padrão Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Capturas de tela automáticas em falha de teste, incorporadas em relatórios
    - Configuração de Integração Contínua (CI) usando [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Relatórios Serenity BDD de demonstração](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicados no GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Projeto boilerplate para executar testes WebdriverIO na Nuvem Headspin (https://www.headspin.io/) usando recursos Cucumber e o padrão de objetos de página.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Características
    - Integração em nuvem com [Headspin](https://www.headspin.io/)
    - Suporta o Modelo de Objeto de Página
    - Contém Cenários de amostra escritos no estilo Declarativo de BDD
    - Relatórios html cucumber integrados

# v7 Boilerplate Projects
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Projeto boilerplate para executar testes Appium com WebdriverIO para:

- Aplicativos nativos iOS/Android
- Aplicativos híbridos iOS/Android
- Navegador Android Chrome e iOS Safari

Este boilerplate inclui o seguinte:

- Framework: Mocha
- Características:
    - Configurações para:
        - Aplicativos iOS e Android
        - Navegadores iOS e Android
    - Ajudantes para:
        - WebView
        - Gestos
        - Alertas nativos
        - Seletores
     - Exemplos de testes para:
        - WebView
        - Login
        - Formulários
        - Deslizar
        - Navegadores

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Testes ATDD WEB com Mocha, WebdriverIO v6 com PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Características
  - Modelo de [Objeto de Página](pageobjects)
  - Integração Sauce Labs com [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Relatório Allure
  - Captura automática de screenshots para testes com falha
  - Exemplo de CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Projeto boilerplate para executar testes E2E com Mocha.

- Frameworks:
    - WebdriverIO (v7)
    - Mocha
- Características:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Testes de regressão visual](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Padrão de Objeto de Página
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) e [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Exemplo de Github Actions
    -   Relatório Allure (screenshots em falhas)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Projeto boilerplate para executar testes **WebdriverIO v7** para o seguinte:

[Scripts WDIO 7 com TypeScript no Framework Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Scripts WDIO 7 com TypeScript no Framework Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Executar script WDIO 7 no Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Logs de rede](https://github.com/17thSep/MonitorNetworkLogs/)

Projeto boilerplate para:

- Capturar Logs de Rede
- Capturar todas as chamadas GET/POST ou uma API REST específica
- Afirmar parâmetros de Requisição
- Afirmar parâmetros de Resposta
- Armazenar todas as respostas em um arquivo separado

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Projeto boilerplate para executar testes appium para aplicativos nativos e navegadores móveis usando cucumber v7 e wdio v7 com padrão de objeto de página.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Características
    - Aplicativos nativos Android e iOS
    - Navegador Android Chrome
    - Navegador iOS Safari
    - Modelo de Objeto de Página
    - Contém cenários de teste de amostra em cucumber
    - Integrado com múltiplos relatórios html cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Este é um projeto modelo para ajudar a mostrar como você pode executar testes webdriverio de aplicações Web usando o WebdriverIO e o framework Cucumber mais recentes. Este projeto pretende atuar como uma imagem de referência que você pode usar para entender como executar testes WebdriverIO no docker

Este projeto inclui:

- DockerFile
- Projeto cucumber

Leia mais em: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Este é um projeto modelo para ajudar a mostrar como você pode executar testes electronJS usando WebdriverIO. Este projeto pretende atuar como uma imagem de referência que você pode usar para entender como executar testes WebdriverIO electronJS.

Este projeto inclui:

- Aplicativo electronjs de amostra
- Scripts de teste cucumber de amostra

Leia mais em: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Este é um projeto modelo para ajudar a mostrar como você pode automatizar aplicativos Windows usando winappdriver e WebdriverIO. Este projeto pretende atuar como uma imagem de referência que você pode usar para entender como executar testes winappdriver e WebdriverIO.

Leia mais em: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Este é um projeto modelo para ajudar a mostrar como você pode executar a capacidade multiremote do webdriverio com o WebdriverIO e o framework Jasmine mais recentes. Este projeto pretende atuar como uma imagem de referência que você pode usar para entender como executar testes WebdriverIO no docker

Este projeto usa:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Projeto de template para executar testes appium em dispositivos Roku reais usando mocha com padrão de objeto de página.

- Frameworks
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Relatório Allure

- Características
    - Modelo de Objeto de Página
    - Typescript
    - Captura de tela em falha
    - Testes de exemplo usando um canal Roku de amostra

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Projeto PoC para testes Cucumber E2E Multiremote e testes Mocha orientados por dados

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Características:
    - Testes E2E baseados em Cucumber
    - Testes orientados por dados baseados em Mocha
    - Testes apenas para Web - em plataformas locais e em nuvem
    - Testes apenas para Mobile - emuladores locais e remotos em nuvem (ou dispositivos)
    - Testes Web + Mobile - Multiremote - plataformas locais e em nuvem
    - Múltiplos Relatórios integrados, incluindo Allure
    - Dados de Teste (JSON / XLSX) tratados globalmente para gravar os dados (criados dinamicamente) em um arquivo após a execução do teste
    - Fluxo de trabalho Github para executar o teste e fazer upload do relatório allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Este é um projeto boilerplate para ajudar a mostrar como executar webdriverio multi-remote usando serviço appium e chromedriver com o WebdriverIO mais recente.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Características
  - Modelo de [Objeto de Página](pageobjects)
  - Typescript
  - Testes Web + Mobile - Multiremote
  - Aplicativos nativos Android e iOS
  - Appium
  - Chromedriver
  - ESLint
  - Exemplos de testes de Login em http://the-internet.herokuapp.com e [Aplicativo de demonstração nativo WebdriverIO](https://github.com/webdriverio/native-demo-app)