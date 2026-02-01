---
id: boilerplates
title: Projetos Boilerplate
---

Ao longo do tempo, nossa comunidade desenvolveu vários projetos que você pode usar como inspiração para configurar sua própria suíte de testes.

# v9 Boilerplate Projects

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Nosso próprio boilerplate para suítes de teste Cucumber. Criamos mais de 150 definições de passos predefinidos para você, para que possa começar a escrever arquivos de recursos em seu projeto imediatamente.

- Framework:
    - Cucumber
    - WebdriverIO
- Funcionalidades:
    - Mais de 150 passos predefinidos que cobrem quase tudo o que você precisa
    - Integra a funcionalidade Multiremote do WebdriverIO
    - Aplicação de demonstração própria

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Projeto boilerplate para executar testes WebdriverIO com Jasmine usando recursos do Babel e o padrão de objetos de página.

- Frameworks
    - WebdriverIO
    - Jasmine
- Funcionalidades
    - Padrão de Objeto de Página
    - Integração com Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Projeto boilerplate para executar testes WebdriverIO em uma aplicação Electron mínima.

- Frameworks
    - WebdriverIO
    - Mocha
- Funcionalidades
    - Simulação de API do Electron
 
## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Este projeto boilerplate possui testes móveis com WebdriverIO 9, Cucumber, TypeScript e Appium para plataformas Android e iOS, seguindo o padrão de Modelo de Objeto de Página. Apresenta registro abrangente, relatórios, gestos móveis, navegação de app para web e integração CI/CD.

- Frameworks:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Funcionalidades:
    - Suporte a múltiplas plataformas
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Gestos Móveis
      - Rolagem
      - Deslizar
      - Pressionar longamente
      - Esconder teclado
    - Navegação App-para-Web
      - Alternância de contexto
      - Suporte a WebView
      - Automação de navegador (Chrome/Safari)
    - Estado do App Atualizado
      - Reinício automático do app entre cenários
      - Comportamento de reinício configurável (noReset, fullReset)
    - Configuração de Dispositivo
      - Gerenciamento centralizado de dispositivos
      - Fácil alternância de plataforma
    - Exemplo de Estrutura de Diretório para JavaScript / TypeScript. Abaixo está para a versão JS, a versão TS tem a mesma estrutura.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Gere automaticamente classes de Objeto de Página do WebdriverIO e especificações de teste Mocha a partir de arquivos Gherkin .feature — reduzindo o esforço manual, melhorando a consistência e acelerando a automação de QA. Este projeto não apenas produz códigos compatíveis com webdriver.io, mas também aprimora todas as funcionalidades do webdriver.io. Criamos duas versões, uma para usuários de JavaScript e outra para usuários de TypeScript. Mas ambos os projetos funcionam da mesma maneira.

***Como funciona?***
- O processo segue uma automação de dois passos:
- Passo 1: Gherkin para stepMap (Gerar arquivos stepMap.json)
  - Gerar arquivos stepMap.json:
    - Analisa arquivos .feature escritos em sintaxe Gherkin.
    - Extrai cenários e passos.
    - Produz um arquivo .stepMap.json estruturado contendo:
      - ação a ser realizada (por exemplo, click, setText, assertVisible)
      - selectorName para mapeamento lógico
      - selector para o elemento DOM
      - nota para valores ou asserção
- Passo 2: stepMap para Código (Gerar Código WebdriverIO).
  Usa stepMap.json para gerar:
  - Gerar uma classe base page.js com métodos compartilhados e configuração browser.url().
  - Gerar classes de Modelo de Objeto de Página (POM) compatíveis com WebdriverIO por recurso dentro de test/pageobjects/.
  - Gerar especificações de teste baseadas em Mocha.
- Exemplo de Estrutura de Diretório para JavaScript / TypeScript. Abaixo está para a versão JS, a versão TS tem a mesma estrutura.
```
project-root/
├── features/                   # Gherkin .feature files (user input / source file)
├── stepMaps/                   # Auto-generated .stepMap.json files
├── test/                 
│   ├── pageobjects/            # Auto-generated WebdriverIO tests Page Object Model classes
│   └── specs/                  # Auto-generated Mocha test specs
├── src/
│   ├── cli.js                  # Main CLI logic
│   ├── generateStepsMap.js     # Feature-to-stepMap generator
│   ├── generateTestsFromMap.js # stepMap-to-page/spec generator
│   ├── utils.js                # Helper methods
│   └── config.js               # Paths, fallback selectors, aliases
│   └── __tests__/              # Unit tests (Vitest)
├── testgen.js                  # CLI entry point
│── wdio.config.js              # WebdriverIO configuration
├── package.json                # Scripts and dependencies
├── selector-aliases.json       # Optional user-defined selector overrides the primary selector
```
---
# v8 Boilerplate Projects

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 com Cucumber (V8x).
- Funcionalidades:
    - Modelo de Objetos de Página usa abordagem baseada em classes com estilo ES6/ES7 e suporte a TypeScript
    - Exemplos de opção de seletor múltiplo para consultar elemento com mais de um seletor ao mesmo tempo
    - Exemplos de execução em múltiplos navegadores e navegadores headless usando Chrome e Firefox
    - Integração de testes em nuvem com BrowserStack, Sauce Labs, LambdaTest
    - Exemplos de leitura/escrita de dados do MS-Excel para fácil gerenciamento de dados de teste de fontes externas com exemplos
    - Suporte a banco de dados para qualquer RDBMS (Oracle, MySql, TeraData, Vertica etc.), executando quaisquer consultas / recuperando conjunto de resultados etc. com exemplos para testes E2E
    - Múltiplos relatórios (Spec, Xunit/Junit, Allure, JSON) e hospedagem de relatórios Allure e Xunit/Junit em WebServer.
    - Exemplos com app demo https://search.yahoo.com/ e http://the-internet.herokuapp.com.
    - Arquivo `.config` específico para BrowserStack, Sauce Labs, LambdaTest e Appium (para reprodução em dispositivo móvel). Para configuração de Appium com um clique em máquina local para iOS e Android, consulte [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 com Mocha (V10x).
- Funcionalidades:
    -  Modelo de Objetos de Página usa abordagem baseada em classes com estilo ES6/ES7 e suporte a TypeScript
    -  Exemplos com app demo https://search.yahoo.com e http://the-internet.herokuapp.com
    -  Exemplos de execução em múltiplos navegadores e navegadores headless usando Chrome e Firefox
    -  Integração de testes em nuvem com BrowserStack, Sauce Labs, LambdaTest
    -  Múltiplos relatórios (Spec, Xunit/Junit, Allure, JSON) e hospedagem de relatórios Allure e Xunit/Junit em WebServer.
    -  Exemplos de leitura/escrita de dados do MS-Excel para fácil gerenciamento de dados de teste de fontes externas com exemplos
    -  Exemplos de conexão DB a qualquer RDBMS (Oracle, MySql, TeraData, Vertica etc.), qualquer execução de consulta / recuperação de conjunto de resultados etc. com exemplos para testes E2E
    -  Arquivo `.config` específico para BrowserStack, Sauce Labs, LambdaTest e Appium (para reprodução em dispositivo móvel). Para configuração de Appium com um clique em máquina local para iOS e Android, consulte [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 com Jasmine (V4x).
- Funcionalidades:
    -  Modelo de Objetos de Página usa abordagem baseada em classes com estilo ES6/ES7 e suporte a TypeScript
    -  Exemplos com app demo https://search.yahoo.com e http://the-internet.herokuapp.com
    -  Exemplos de execução em múltiplos navegadores e navegadores headless usando Chrome e Firefox
    -  Integração de testes em nuvem com BrowserStack, Sauce Labs, LambdaTest
    -  Múltiplos relatórios (Spec, Xunit/Junit, Allure, JSON) e hospedagem de relatórios Allure e Xunit/Junit em WebServer.
    -  Exemplos de leitura/escrita de dados do MS-Excel para fácil gerenciamento de dados de teste de fontes externas com exemplos
    -  Exemplos de conexão DB a qualquer RDBMS (Oracle, MySql, TeraData, Vertica etc.), qualquer execução de consulta / recuperação de conjunto de resultados etc. com exemplos para testes E2E
    -  Arquivo `.config` específico para BrowserStack, Sauce Labs, LambdaTest e Appium (para reprodução em dispositivo móvel). Para configuração de Appium com um clique em máquina local para iOS e Android, consulte [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Este projeto boilerplate tem testes WebdriverIO 8 com cucumber e typescript, seguido pelo padrão de objetos de página.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- Funcionalidades:
    - Typescript v5
    - Padrão de Objeto de Página
    - Prettier
    - Suporte a múltiplos navegadores
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Execução paralela entre navegadores
    - Appium
    - Integração de testes em nuvem com BrowserStack & Sauce Labs
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

- Funcionalidades
    - Contém cenário de teste de exemplo em cucumber
    - Relatórios html do cucumber integrados com vídeos incorporados em falhas
    - Serviços Lambdatest e CircleCI integrados
    - Testes Visuais, de Acessibilidade e API integrados
    - Funcionalidade de e-mail integrada
    - Bucket s3 integrado para armazenamento e recuperação de relatórios de teste

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Projeto modelo [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) para ajudá-lo a começar com testes de aceitação de suas aplicações web usando o WebdriverIO, Mocha e Serenity/JS mais recentes.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Relatórios Serenity BDD

- Funcionalidades
    - [Padrão Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Capturas de tela automáticas em falhas de teste, incorporadas em relatórios
    - Configuração de Integração Contínua (CI) usando [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Relatórios Serenity BDD de demonstração](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicados no GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Projeto modelo [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) para ajudá-lo a começar com testes de aceitação de suas aplicações web usando o WebdriverIO, Cucumber e Serenity/JS mais recentes.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Relatórios Serenity BDD

- Funcionalidades
    - [Padrão Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Capturas de tela automáticas em falhas de teste, incorporadas em relatórios
    - Configuração de Integração Contínua (CI) usando [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Relatórios Serenity BDD de demonstração](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicados no GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Projeto boilerplate para executar testes WebdriverIO na nuvem Headspin (https://www.headspin.io/) usando recursos Cucumber e o padrão de objetos de página.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funcionalidades
    - Integração com a nuvem [Headspin](https://www.headspin.io/)
    - Suporta o Modelo de Objeto de Página
    - Contém Cenários de exemplo escritos em estilo Declarativo de BDD
    - Relatórios html cucumber integrados

# v7 Boilerplate Projects
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Projeto boilerplate para executar testes Appium com WebdriverIO para:

- Apps Nativos iOS/Android
- Apps Híbridos iOS/Android
- Navegadores Android Chrome e iOS Safari

Este boilerplate inclui o seguinte:

- Framework: Mocha
- Funcionalidades:
    - Configurações para:
        - Apps iOS e Android
        - Navegadores iOS e Android
    - Auxiliares para:
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
Testes ATDD WEB com Mocha, WebdriverIO v6 com PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Funcionalidades
  - Modelo [Page Object](pageobjects)
  - Integração com Sauce Labs usando [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Relatório Allure
  - Captura automática de capturas de tela para testes com falha
  - Exemplo CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Projeto boilerplate para executar testes E2E com Mocha.

- Frameworks:
    - WebdriverIO (v7)
    - Mocha
- Funcionalidades:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Testes de regressão visual](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Padrão de Objeto de Página
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) e [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Exemplo de Github Actions
    -   Relatório Allure (capturas de tela em falha)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Projeto boilerplate para executar testes **WebdriverIO v7** para o seguinte:

[Scripts WDIO 7 com TypeScript no Framework Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Scripts WDIO 7 com TypeScript no Framework Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Executar script WDIO 7 no Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Logs de rede](https://github.com/17thSep/MonitorNetworkLogs/)

Projeto boilerplate para:

- Capturar Logs de Rede
- Capturar todas as chamadas GET/POST ou uma API REST específica
- Verificar parâmetros de solicitação
- Verificar parâmetros de resposta
- Armazenar todas as respostas em um arquivo separado

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Projeto boilerplate para executar testes de appium para aplicativos nativos e navegador móvel usando cucumber v7 e wdio v7 com padrão de objeto de página.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Funcionalidades
    - Apps nativos Android e iOS
    - Navegador Chrome Android
    - Navegador Safari iOS
    - Modelo de Objeto de Página
    - Contém cenários de teste de exemplo em cucumber
    - Integrado com vários relatórios html cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Este é um projeto modelo para ajudar a mostrar como você pode executar testes de webdriverio de aplicações Web usando o WebdriverIO e o framework Cucumber mais recentes. Este projeto pretende atuar como uma imagem de base que você pode usar para entender como executar testes WebdriverIO no docker

Este projeto inclui:

- DockerFile
- Projeto cucumber

Leia mais em: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Este é um projeto modelo para ajudar a mostrar como você pode executar testes electronJS usando WebdriverIO. Este projeto pretende atuar como uma imagem de base que você pode usar para entender como executar testes WebdriverIO electronJS.

Este projeto inclui:

- App electronjs de exemplo
- Scripts de teste cucumber de exemplo

Leia mais em: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Este é um projeto modelo para ajudar a mostrar como você pode automatizar aplicações Windows usando winappdriver e WebdriverIO. Este projeto pretende atuar como uma imagem de base que você pode usar para entender como executar testes winappdriver e WebdriverIO.

Leia mais em: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Este é um projeto modelo para ajudar a mostrar como você pode executar a capacidade multiremota do webdriverio com o WebdriverIO mais recente e o framework Jasmine. Este projeto pretende atuar como uma imagem de base que você pode usar para entender como executar testes WebdriverIO no docker

Este projeto usa:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Projeto modelo para executar testes de appium em dispositivos Roku reais usando mocha com padrão de objeto de página.

- Frameworks
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Relatórios Allure

- Funcionalidades
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

- Funcionalidades:
    - Testes E2E baseados em Cucumber
    - Testes orientados por dados baseados em Mocha
    - Apenas testes Web - em plataformas locais e em nuvem
    - Apenas testes móveis - emuladores locais e remotos na nuvem (ou dispositivos)
    - Testes Web + Móvel - Multiremote - plataformas locais e em nuvem
    - Múltiplos relatórios integrados, incluindo Allure
    - Dados de teste (JSON / XLSX) tratados globalmente para escrever os dados (criados dinamicamente) em um arquivo após a execução do teste
    - Fluxo de trabalho Github para executar o teste e fazer upload do relatório allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Este é um projeto boilerplate para ajudar a mostrar como executar multi-remoto webdriverio usando serviço appium e chromedriver com o WebdriverIO mais recente.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Funcionalidades
  - Modelo [Page Object](pageobjects)
  - Typescript
  - Testes Web + Móvel - Multiremote
  - Aplicativos nativos Android e iOS
  - Appium
  - Chromedriver
  - ESLint
  - Exemplos de testes para Login em http://the-internet.herokuapp.com e [aplicativo de demonstração nativo do WebdriverIO](https://github.com/webdriverio/native-demo-app)