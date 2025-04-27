---
id: automationProtocols
title: Protocolos de Automação
---

Com WebdriverIO, você pode escolher entre múltiplas tecnologias de automação ao executar seus testes E2E localmente ou na nuvem. Por padrão, o WebdriverIO tentará iniciar uma sessão de automação local utilizando o protocolo [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/).

## Protocolo WebDriver Bidi

O [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) é um protocolo de automação para automatizar navegadores usando comunicação bidirecional. É o sucessor do protocolo [WebDriver](https://w3c.github.io/webdriver/) e permite muito mais capacidades de introspecção para vários casos de uso de teste.

Este protocolo está atualmente em desenvolvimento e novas primitivas podem ser adicionadas no futuro. Todos os fornecedores de navegadores se comprometeram a implementar este padrão web e muitas [primitivas](https://wpt.fyi/results/webdriver/tests/bidi?label=experimental&label=master&aligned) já foram implementadas nos navegadores.

## Protocolo WebDriver

> [WebDriver](https://w3c.github.io/webdriver/) é uma interface de controle remoto que permite introspecção e controle de agentes de usuário. Ele fornece um protocolo independente de plataforma e linguagem como uma forma para programas fora do processo instruírem remotamente o comportamento dos navegadores web.

O protocolo WebDriver foi projetado para automatizar um navegador da perspectiva do usuário, o que significa que tudo o que um usuário pode fazer, você pode fazer com o navegador. Ele fornece um conjunto de comandos que abstraem interações comuns com uma aplicação (por exemplo, navegar, clicar ou ler o estado de um elemento). Por ser um padrão web, é bem suportado por todos os principais fornecedores de navegadores e também está sendo usado como protocolo subjacente para automação móvel usando [Appium](http://appium.io).

Para usar este protocolo de automação, você precisa de um servidor proxy que traduza todos os comandos e os execute no ambiente alvo (ou seja, o navegador ou o aplicativo móvel).

Para automação de navegador, o servidor proxy é geralmente o driver do navegador. Existem drivers disponíveis para todos os navegadores:

- Chrome – [ChromeDriver](http://chromedriver.chromium.org/downloads)
- Firefox – [Geckodriver](https://github.com/mozilla/geckodriver/releases)
- Microsoft Edge – [Edge Driver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)
- Internet Explorer – [InternetExplorerDriver](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver)
- Safari – [SafariDriver](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari)

Para qualquer tipo de automação móvel, você precisará instalar e configurar o [Appium](http://appium.io). Ele permitirá que você automatize aplicativos móveis (iOS/Android) ou até mesmo desktop (macOS/Windows) usando a mesma configuração do WebdriverIO.

Existem também muitos serviços que permitem executar seus testes de automação na nuvem em alta escala. Em vez de ter que configurar todos esses drivers localmente, você pode simplesmente se comunicar com esses serviços (por exemplo, [Sauce Labs](https://saucelabs.com)) na nuvem e inspecionar os resultados em suas plataformas. A comunicação entre o script de teste e o ambiente de automação será como a seguir:

![WebDriver Setup](/img/webdriver.png)