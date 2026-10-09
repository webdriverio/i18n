---
id: boilerplates
title: Projetos Boilerplate
description: "Explore projetos boilerplate da comunidade para WebdriverIO com Mocha, Jasmine, Cucumber, Electron e configurações mobile para iniciar sua própria suíte de testes."
---

Com o tempo, nossa comunidade desenvolveu vários projetos que você pode usar como inspiração para configurar sua própria suíte de testes.

# Projetos Boilerplate v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Nosso próprio boilerplate para suítes de teste Cucumber. Criamos mais de 150 definições de steps predefinidas para você, para que possa começar a escrever arquivos de feature no seu projeto imediatamente.

- Framework:
    - Cucumber
    - WebdriverIO
- Recursos:
    - Mais de 150 steps predefinidos que cobrem quase tudo o que você precisa
    - Integra a funcionalidade multi-remote do WebdriverIO
    - Aplicativo de demonstração próprio

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Projeto boilerplate para executar testes WebdriverIO com Jasmine usando recursos do Babel e o padrão page objects.

- Frameworks
    - WebdriverIO
    - Jasmine
- Recursos
    - Padrão Page Object
    - Integração com Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Projeto boilerplate para executar testes WebdriverIO em uma aplicação Electron mínima.

- Frameworks
    - WebdriverIO
    - Mocha
- Recursos
    - Mocking da API do Electron

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Este projeto boilerplate possui testes mobile com WebdriverIO 9 usando Cucumber, TypeScript e Appium para as plataformas Android e iOS, seguindo o padrão Page Object Model. Inclui logging abrangente, relatórios, gestos mobile, navegação do app para a web e integração CI/CD.

- Frameworks:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Recursos:
    - Suporte multiplataforma
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Gestos Mobile
      - Rolagem (scroll)
      - Deslizar (swipe)
      - Pressionar longamente (long press)
      - Ocultar teclado
    - Navegação do App para a Web
      - Troca de contexto
      - Suporte a WebView
      - Automação de navegador (Chrome/Safari)
    - Estado Limpo do App
      - Reset automático do app entre cenários
      - Comportamento de reset configurável (noReset, fullReset)
    - Configuração de Dispositivos
      - Gerenciamento centralizado de dispositivos
      - Troca fácil de plataforma
    - Exemplo de Estrutura de Diretórios para JavaScript / TypeScript. Abaixo está a versão JS; a versão TS também possui a mesma estrutura.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Gere automaticamente classes Page Object do WebdriverIO e specs de teste Mocha a partir de arquivos Gherkin .feature — reduzindo o esforço manual, melhorando a consistência e acelerando a automação de QA. Este projeto não apenas produz código compatível com webdriver.io, mas também aprimora todas as funcionalidades do webdriver.io. Criamos duas versões, uma para usuários de JavaScript e outra para usuários de TypeScript. Mas ambos os projetos funcionam da mesma forma.

***Como Funciona?***
- O processo segue uma automação em duas etapas:
- Etapa 1: Gherkin para stepMap (Gerar arquivos stepMap.json)
  - Gerar arquivos stepMap.json:
    - Analisa arquivos .feature escritos em sintaxe Gherkin.
    - Extrai cenários e steps.
    - Produz um arquivo .stepMap.json estruturado contendo:
      - action a ser executada (ex.: click, setText, assertVisible)
      - selectorName para mapeamento lógico
      - selector para o elemento DOM
      - note para valores ou asserções
- Etapa 2: stepMap para Código (Gerar código WebdriverIO).
  Usa o stepMap.json para gerar:
  - Gerar uma classe base page.js com métodos compartilhados e configuração de browser.url().
  - Gerar classes Page Object Model (POM) compatíveis com WebdriverIO por feature dentro de test/pageobjects/.
  - Gerar specs de teste baseadas em Mocha.
- Exemplo de Estrutura de Diretórios para JavaScript / TypeScript. Abaixo está a versão JS; a versão TS também possui a mesma estrutura.
```
project-root/
├── features/                   # Arquivos Gherkin .feature (entrada do usuário / arquivo fonte)
├── stepMaps/                   # Arquivos .stepMap.json gerados automaticamente
├── test/
│   ├── pageobjects/            # Classes Page Object Model de testes WebdriverIO geradas automaticamente
│   └── specs/                  # Specs de teste Mocha geradas automaticamente
├── src/
│   ├── cli.js                  # Lógica principal da CLI
│   ├── generateStepsMap.js     # Gerador de feature para stepMap
│   ├── generateTestsFromMap.js # Gerador de stepMap para page/spec
│   ├── utils.js                # Métodos auxiliares
│   └── config.js               # Caminhos, seletores de fallback, aliases
│   └── __tests__/              # Testes unitários (Vitest)
├── testgen.js                  # Ponto de entrada da CLI
│── wdio.config.js              # Configuração do WebdriverIO
├── package.json                # Scripts e dependências
├── selector-aliases.json       # Opcional: substituições de seletores definidas pelo usuário que sobrescrevem o seletor primário
```
---
# Projetos Boilerplate v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 com Cucumber (V8x).
- Recursos:
    - Page Objects Model usando abordagem baseada em classes no estilo ES6 / ES7 e suporte a TypeScript
    - Exemplos de opção de múltiplos seletores para consultar elementos com mais de um seletor ao mesmo tempo
    - Exemplos de execução em múltiplos navegadores e navegador headless usando - Chrome e Firefox
    - Integração de testes em nuvem com BrowserStack, Sauce Labs, TestMu AI (anteriormente LambdaTest)
    - Exemplos de leitura/escrita de dados do MS-Excel para fácil gerenciamento de dados de teste a partir de fontes de dados externas, com exemplos
    - Suporte a banco de dados para qualquer RDBMS (Oracle, MySql, TeraData, Vertica etc.), executando quaisquer consultas / obtendo result sets etc. com exemplos para testes E2E
    - Múltiplos relatórios (Spec, Xunit/Junit, Allure, JSON) e hospedagem de relatórios Allure e Xunit/Junit em um WebServer.
    - Exemplos com aplicativo de demonstração https://search.yahoo.com/  e http://the-internet.herokuapp.com.
    - Arquivo `.config` específico para BrowserStack, Sauce Labs, TestMu AI (anteriormente LambdaTest) e Appium (para execução em dispositivo móvel). Para configuração do Appium com um clique em máquina local para iOS e Android, consulte [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 com Mocha (V10x).
- Recursos:
    -  Page Objects Model usando abordagem baseada em classes no estilo ES6 / ES7 e suporte a TypeScript
    -  Exemplos com aplicativo de demonstração https://search.yahoo.com  e http://the-internet.herokuapp.com
    -  Exemplos de execução em múltiplos navegadores e navegador headless usando - Chrome e Firefox
    -  Integração de testes em nuvem com BrowserStack, Sauce Labs, TestMu AI (anteriormente LambdaTest)
    -  Múltiplos relatórios (Spec, Xunit/Junit, Allure, JSON) e hospedagem de relatórios Allure e Xunit/Junit em um WebServer.
    -  Exemplos de leitura/escrita de dados do MS-Excel para fácil gerenciamento de dados de teste a partir de fontes de dados externas, com exemplos
    -  Exemplos de conexão de BD com qualquer RDBMS (Oracle, MySql, TeraData, Vertica etc.), execução de qualquer consulta / obtenção de result sets etc. com exemplos para testes E2E
    -  Arquivo `.config` específico para BrowserStack, Sauce Labs, TestMu AI (anteriormente LambdaTest) e Appium (para execução em dispositivo móvel). Para configuração do Appium com um clique em máquina local para iOS e Android, consulte [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 com Jasmine (V4x).
- Recursos:
    -  Page Objects Model usando abordagem baseada em classes no estilo ES6 / ES7 e suporte a TypeScript
    -  Exemplos com aplicativo de demonstração https://search.yahoo.com  e http://the-internet.herokuapp.com
    -  Exemplos de execução em múltiplos navegadores e navegador headless usando - Chrome e Firefox
    -  Integração de testes em nuvem com BrowserStack, Sauce Labs, TestMu AI (anteriormente LambdaTest)
    -  Múltiplos relatórios (Spec, Xunit/Junit, Allure, JSON) e hospedagem de relatórios Allure e Xunit/Junit em um WebServer.
    -  Exemplos de leitura/escrita de dados do MS-Excel para fácil gerenciamento de dados de teste a partir de fontes de dados externas, com exemplos
    -  Exemplos de conexão de BD com qualquer RDBMS (Oracle, MySql, TeraData, Vertica etc.), execução de qualquer consulta / obtenção de result sets etc. com exemplos para testes E2E
    -  Arquivo `.config` específico para BrowserStack, Sauce Labs, TestMu AI (anteriormente LambdaTest) e Appium ( para execução em dispositivo móvel). Para configuração do Appium com um clique em máquina local para iOS e Android, consulte [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Este projeto boilerplate possui testes com WebdriverIO 8 usando cucumber e typescript, seguindo o padrão page objects.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- Recursos:
    - Typescript v5
    - Padrão Page Object
    - Prettier
    - Suporte a múltiplos navegadores
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Execução paralela cross-browser
    - Appium
    - Integração de testes em nuvem com BrowserStack & Sauce Labs
    - Serviço Docker
    - Serviço de compartilhamento de dados
    - Arquivos de configuração separados para cada serviço
    - Gerenciamento de dados de teste & leitura por tipo de usuário
    - Relatórios
      - Dot
      - Spec
      - Múltiplos relatórios html do cucumber com screenshots de falhas
    - Pipelines do Gitlab para repositório Gitlab
    - Github actions para repositório Github
    - Docker compose para configurar o docker hub
    - Testes de acessibilidade usando AXE
    - Testes visuais usando Applitools
    - Mecanismo de log


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Recursos
    - Contém cenário de teste de exemplo em cucumber
    - Relatórios html do cucumber integrados com vídeos incorporados em falhas
    - Serviços Lambdatest e CircleCI integrados
    - Testes Visuais, de Acessibilidade e de API integrados
    - Funcionalidade de Email integrada
    - Bucket s3 integrado para armazenamento e recuperação de relatórios de teste

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Projeto template do [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) para ajudar você a começar com testes de aceitação das suas aplicações web usando as versões mais recentes do WebdriverIO, Mocha e Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Relatórios Serenity BDD

- Recursos
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Screenshots automáticos em falhas de teste, incorporados nos relatórios
    - Configuração de Integração Contínua (CI) usando [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Relatórios Serenity BDD de demonstração](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicados no GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Projeto template do [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) para ajudar você a começar com testes de aceitação das suas aplicações web usando as versões mais recentes do WebdriverIO, Cucumber e Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Relatórios Serenity BDD

- Recursos
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Screenshots automáticos em falhas de teste, incorporados nos relatórios
    - Configuração de Integração Contínua (CI) usando [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Relatórios Serenity BDD de demonstração](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicados no GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Projeto boilerplate para executar testes WebdriverIO na Headspin Cloud (https://www.headspin.io/) usando features do Cucumber e o padrão page objects.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Recursos
    - Integração em nuvem com [Headspin](https://www.headspin.io/)
    - Suporta Page Object Model
    - Contém cenários de exemplo escritos no estilo declarativo de BDD
    - Relatórios html do cucumber integrados

# Projetos Boilerplate v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Projeto boilerplate para executar testes Appium com WebdriverIO para:

- Apps Nativos iOS/Android
- Apps Híbridos iOS/Android
- Navegadores Chrome no Android e Safari no iOS

Este boilerplate inclui o seguinte:

- Framework: Mocha
- Recursos:
    - Configurações para:
        - App iOS e Android
        - Navegadores iOS e Android
    - Helpers para:
        - WebView
        - Gestos
        - Alertas nativos
        - Pickers
     - Exemplos de testes para:
        - WebView
        - Login
        - Formulários
        - Swipe
        - Navegadores

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Testes WEB ATDD com Mocha, WebdriverIO v6 com PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Recursos
  - Modelo [Page Object](pageobjects)
  - Integração com Sauce Labs usando o [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Relatório Allure
  - Captura automática de screenshots para testes com falha
  - Exemplo de CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Projeto boilerplate para executar testes E2E com Mocha.

- Frameworks:
    - WebdriverIO (v7)
    - Mocha
- Recursos:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Testes de regressão visual](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Padrão Page Object
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) e [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Exemplo de Github Actions
    -   Relatório Allure (screenshots em falhas)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Projeto boilerplate para executar testes com **WebdriverIO v7** para o seguinte:

[Scripts WDIO 7 com TypeScript no Framework Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Scripts WDIO 7 com TypeScript no Framework Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Executar script WDIO 7 no Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Logs de rede](https://github.com/17thSep/MonitorNetworkLogs/)

Projeto boilerplate para:

- Capturar logs de rede
- Capturar todas as chamadas GET/POST ou uma API REST específica
- Validar parâmetros da requisição
- Validar parâmetros da resposta
- Armazenar todas as respostas em um arquivo separado

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Projeto boilerplate para executar testes appium para apps nativos e navegadores mobile usando cucumber v7 e wdio v7 com o padrão page object.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Recursos
    - Apps nativos Android e iOS
    - Navegador Chrome no Android
    - Navegador Safari no iOS
    - Page Object Model
    - Contém cenários de teste de exemplo em cucumber
    - Integrado com múltiplos relatórios html do cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Este é um projeto template para ajudar a mostrar como você pode executar testes webdriverio em aplicações Web usando as versões mais recentes do WebdriverIO e do framework Cucumber. Este projeto pretende servir como uma imagem base que você pode usar para entender como executar testes WebdriverIO no docker

Este projeto inclui:

- DockerFile
- Projeto cucumber

Leia mais em: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Este é um projeto template para ajudar a mostrar como você pode executar testes electronJS usando WebdriverIO. Este projeto pretende servir como uma imagem base que você pode usar para entender como executar testes electronJS com WebdriverIO.

Este projeto inclui:

- App electronjs de exemplo
- Scripts de teste cucumber de exemplo

Leia mais em: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Este é um projeto template para ajudar a mostrar como você pode automatizar aplicações windows usando winappdriver e WebdriverIO. Este projeto pretende servir como uma imagem base que você pode usar para entender como executar testes com windappdriver e WebdriverIO.

Leia mais em: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Este é um projeto template para ajudar a mostrar como você pode executar a capacidade multi-remote do webdriverio com as versões mais recentes do WebdriverIO e do framework Jasmine. Este projeto pretende servir como uma imagem base que você pode usar para entender como executar testes WebdriverIO no docker

Este projeto usa:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Projeto template para executar testes appium em dispositivos Roku reais usando mocha com o padrão page object.

- Frameworks
    - WebdriverIO Async v7
    - Appium 3.0
    - Mocha v7
    - Relatórios Allure

- Recursos
    - Page Object Model
    - Typescript
    - Screenshot em falhas
    - Testes de exemplo usando um canal Roku de exemplo

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Projeto PoC para testes Cucumber E2E multi-remote, bem como testes Mocha orientados a dados

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Recursos:
    - Testes E2E baseados em Cucumber
    - Testes orientados a dados baseados em Mocha
    - Testes somente Web - em plataformas locais e em nuvem
    - Testes somente Mobile - emuladores (ou dispositivos) locais e em nuvem remota
    - Testes Web + Mobile - multi-remote - em plataformas locais e em nuvem
    - Múltiplos relatórios integrados, incluindo Allure
    - Dados de teste ( JSON / XLSX ) tratados globalmente para escrever os dados (criados dinamicamente) em um arquivo após a execução dos testes
    - Workflow do Github para executar os testes e fazer upload do relatório allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Este é um projeto boilerplate para ajudar a mostrar como executar o multi-remote do webdriverio usando o serviço appium e chromedriver com a versão mais recente do WebdriverIO.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Recursos
  - Modelo [Page Object](pageobjects)
  - Typescript
  - Testes Web + Mobile - multi-remote
  - Apps nativos Android e iOS
  - Appium
  - Chromedriver
  - ESLint
  - Exemplos de testes para Login em http://the-internet.herokuapp.com e no [aplicativo de demonstração nativo do WebdriverIO](https://github.com/webdriverio/native-demo-app)