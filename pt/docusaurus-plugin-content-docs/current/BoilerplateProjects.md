---
id: boilerplates
title: Projetos Boilerplate
---

Ao longo do tempo, nossa comunidade desenvolveu vários projetos que você pode usar como inspiração para configurar sua própria suíte de testes.

# Projetos Boilerplate v8

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Nosso próprio boilerplate para suítes de teste Cucumber. Criamos mais de 150 definições de etapas predefinidas para você, então você pode começar a escrever arquivos de recursos em seu projeto imediatamente.

- Framework:
    - Cucumber
    - WebdriverIO
- Recursos:
    - Mais de 150 etapas predefinidas que cobrem quase tudo o que você precisa
    - Integra a funcionalidade Multiremote do WebdriverIO
    - App de demonstração próprio

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Projeto boilerplate para executar testes WebdriverIO com Jasmine usando recursos Babel e o padrão page objects.

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
    - Mock da API Electron

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Este projeto boilerplate tem testes WebdriverIO 8 com cucumber e typescript, seguindo o padrão de page objects.

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
    - Execução paralela em navegadores diferentes
    - Appium
    - Integração com teste em nuvem com BrowserStack e Sauce Labs
    - Serviço Docker
    - Serviço de compartilhamento de dados
    - Arquivos de configuração separados para cada serviço
    - Gerenciamento de dados de teste e leitura por tipo de usuário
    - Relatórios
      - Dot
      - Spec
      - Relatório html cucumber múltiplo com capturas de tela de falhas
    - Pipelines Gitlab para repositório Gitlab
    - GitHub actions para repositório Github
    - Docker compose para configuração do docker hub
    - Testes de acessibilidade usando AXE
    - Testes visuais usando Applitools
    - Mecanismo de log

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 com Cucumber (V8x).
- Recursos:
    - Page Objects Model usa abordagem baseada em classe com estilo ES6/ES7 e suporte a TypeScript
    - Exemplos de opção multi-seletor para consultar elemento com mais de um seletor ao mesmo tempo
    - Exemplos de execução em múltiplos navegadores e navegadores headless usando - Chrome e Firefox
    - Integração com teste em nuvem com BrowserStack, Sauce Labs, LambdaTest
    - Exemplos de leitura/escrita de dados do MS-Excel para fácil gerenciamento de dados de teste de fontes externas com exemplos
    - Suporte a banco de dados para qualquer RDBMS (Oracle, MySql, TeraData, Vertica etc.), executando quaisquer consultas / buscando conjunto de resultados etc. com exemplos para testes E2E
    - Múltiplos relatórios (Spec, Xunit/Junit, Allure, JSON) e hospedagem de relatórios Allure e Xunit/Junit em WebServer
    - Exemplos com aplicativo de demonstração https://search.yahoo.com/ e http://the-internet.herokuapp.com
    - Arquivo `.config` específico para BrowserStack, Sauce Labs, LambdaTest e Appium (para reprodução em dispositivo móvel). Para configuração Appium com um clique em máquina local para iOS e Android, consulte [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 com Mocha (V10x).
- Recursos:
    - Page Objects Model usa abordagem baseada em classe com estilo ES6/ES7 e suporte a TypeScript
    - Exemplos com aplicativo de demonstração https://search.yahoo.com e http://the-internet.herokuapp.com
    - Exemplos de execução em múltiplos navegadores e navegadores headless usando - Chrome e Firefox
    - Integração com teste em nuvem com BrowserStack, Sauce Labs, LambdaTest
    - Múltiplos relatórios (Spec, Xunit/Junit, Allure, JSON) e hospedagem de relatórios Allure e Xunit/Junit em WebServer
    - Exemplos de leitura/escrita de dados do MS-Excel para fácil gerenciamento de dados de teste de fontes externas com exemplos
    - Exemplos de conexão com banco de dados para qualquer RDBMS (Oracle, MySql, TeraData, Vertica etc.), qualquer execução de consulta / busca de conjunto de resultados etc. com exemplos para testes E2E
    - Arquivo `.config` específico para BrowserStack, Sauce Labs, LambdaTest e Appium (para reprodução em dispositivo móvel). Para configuração Appium com um clique em máquina local para iOS e Android, consulte [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 com Jasmine (V4x).
- Recursos:
    - Page Objects Model usa abordagem baseada em classe com estilo ES6/ES7 e suporte a TypeScript
    - Exemplos com aplicativo de demonstração https://search.yahoo.com e http://the-internet.herokuapp.com
    - Exemplos de execução em múltiplos navegadores e navegadores headless usando - Chrome e Firefox
    - Integração com teste em nuvem com BrowserStack, Sauce Labs, LambdaTest
    - Múltiplos relatórios (Spec, Xunit/Junit, Allure, JSON) e hospedagem de relatórios Allure e Xunit/Junit em WebServer
    - Exemplos de leitura/escrita de dados do MS-Excel para fácil gerenciamento de dados de teste de fontes externas com exemplos
    - Exemplos de conexão com banco de dados para qualquer RDBMS (Oracle, MySql, TeraData, Vertica etc.), qualquer execução de consulta / busca de conjunto de resultados etc. com exemplos para testes E2E
    - Arquivo `.config` específico para BrowserStack, Sauce Labs, LambdaTest e Appium (para reprodução em dispositivo móvel). Para configuração Appium com um clique em máquina local para iOS e Android, consulte [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Recursos
    - Contém cenário de teste de exemplo em cucumber
    - Relatórios html cucumber integrados com vídeos incorporados em falhas
    - Serviços Lambdatest e CircleCI integrados
    - Testes visuais, de acessibilidade e de API integrados
    - Funcionalidade de e-mail integrada
    - Bucket s3 integrado para armazenamento e recuperação de relatórios de teste

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Projeto template [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) para ajudá-lo a começar com testes de aceitação de suas aplicações web usando o WebdriverIO, Mocha e Serenity/JS mais recentes.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Relatórios Serenity BDD

- Recursos
    - [Padrão Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Capturas de tela automáticas em falhas de teste, incorporadas nos relatórios
    - Configuração de Integração Contínua (CI) usando [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Relatórios de demonstração do Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicados no GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Projeto template [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) para ajudá-lo a começar com testes de aceitação de suas aplicações web usando o WebdriverIO, Cucumber e Serenity/JS mais recentes.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Relatórios Serenity BDD

- Recursos
    - [Padrão Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Capturas de tela automáticas em falhas de teste, incorporadas nos relatórios
    - Configuração de Integração Contínua (CI) usando [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Relatórios de demonstração do Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicados no GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Projeto boilerplate para executar testes WebdriverIO no Headspin Cloud (https://www.headspin.io/) usando recursos Cucumber e o padrão de page objects.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Recursos
    - Integração em nuvem com [Headspin](https://www.headspin.io/)
    - Suporta o Modelo de Objeto de Página
    - Contém cenários de exemplo escritos em estilo Declarativo de BDD
    - Relatórios html cucumber integrados

# Projetos Boilerplate v7

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Projeto boilerplate para executar testes Appium com WebdriverIO para:

- Apps nativos iOS/Android
- Apps híbridos iOS/Android
- Navegadores Android Chrome e iOS Safari

Este boilerplate inclui o seguinte:

- Framework: Mocha
- Recursos:
    - Configurações para:
        - Aplicativo iOS e Android
        - Navegadores iOS e Android
    - Auxiliares para:
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
- Recursos
  - Modelo [Page Object](pageobjects)
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

Projeto boilerplate para executar testes **WebdriverIO v7** para o seguinte:

[Scripts WDIO 7 com TypeScript no Framework Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Scripts WDIO 7 com TypeScript no Framework Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Executar script WDIO 7 no Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Logs de rede](https://github.com/17thSep/MonitorNetworkLogs/)

Projeto boilerplate para:

- Capturar logs de rede
- Capturar todas as chamadas GET/POST ou uma API REST específica
- Verificar parâmetros de requisição
- Verificar parâmetros de resposta
- Armazenar todas as respostas em um arquivo separado

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Projeto boilerplate para executar testes appium para aplicativos nativos e navegadores móveis usando cucumber v7 e wdio v7 com padrão de objeto de página.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Recursos
    - Aplicativos nativos Android e iOS
    - Navegador Chrome Android
    - Navegador Safari iOS
    - Modelo de Objeto de Página
    - Contém cenários de teste de exemplo em cucumber
    - Integrado com vários relatórios html cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Este é um projeto modelo para ajudá-lo a mostrar como você pode executar testes webdriverio de aplicativos da Web usando o WebdriverIO e o framework Cucumber mais recentes. Este projeto pretende atuar como uma imagem de base que você pode usar para entender como executar testes WebdriverIO em docker

Este projeto inclui:

- DockerFile
- Projeto cucumber

Leia mais em: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Este é um projeto modelo para ajudá-lo a mostrar como você pode executar testes electronJS usando WebdriverIO. Este projeto pretende atuar como uma imagem de base que você pode usar para entender como executar testes WebdriverIO electronJS.

Este projeto inclui:

- Aplicativo electronjs de exemplo
- Scripts de teste cucumber de exemplo

Leia mais em: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Este é um projeto modelo para ajudá-lo a mostrar como você pode automatizar aplicativos Windows usando winappdriver e WebdriverIO. Este projeto pretende atuar como uma imagem de base que você pode usar para entender como executar testes winappdriver e WebdriverIO.

Leia mais em: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)

Este é um projeto modelo para ajudá-lo a mostrar como você pode executar a capacidade multiremota do webdriverio com o WebdriverIO mais recente e o framework Jasmine. Este projeto pretende atuar como uma imagem de base que você pode usar para entender como executar testes WebdriverIO em docker

Este projeto usa:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Projeto template para executar testes appium em dispositivos Roku reais usando mocha com padrão de objeto de página.

- Frameworks
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Relatórios Allure

- Recursos
    - Modelo de Objeto de Página
    - Typescript
    - Captura de tela em falha
    - Testes de exemplo usando um canal Roku de amostra

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Projeto PoC para testes Cucumber Multiremote E2E e testes Mocha orientados por dados

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Recursos:
    - Testes E2E baseados em Cucumber
    - Testes orientados por dados baseados em Mocha
    - Testes somente Web - em plataformas locais e em nuvem
    - Testes somente Mobile - emuladores locais e remotos em nuvem (ou dispositivos)
    - Testes Web + Mobile - Multiremote - plataformas locais e em nuvem
    - Vários relatórios integrados, incluindo Allure
    - Dados de teste (JSON / XLSX) tratados globalmente para escrever os dados (criados dinamicamente) em um arquivo após a execução do teste
    - Fluxo de trabalho Github para executar o teste e fazer upload do relatório allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Este é um projeto boilerplate para ajudar a mostrar como executar webdriverio multi-remote usando o serviço appium e chromedriver com o WebdriverIO mais recente.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Recursos
  - Modelo [Page Object](pageobjects)
  - Typescript
  - Testes Web + Mobile - Multiremote
  - Aplicativos nativos Android e iOS
  - Appium
  - Chromedriver
  - ESLint
  - Exemplos de testes para Login em http://the-internet.herokuapp.com e [aplicativo de demonstração nativo WebdriverIO](https://github.com/webdriverio/native-demo-app)