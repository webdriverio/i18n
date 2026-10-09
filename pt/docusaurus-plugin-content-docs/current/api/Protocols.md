---
id: protocols
title: Comandos de Protocolo
---

O WebdriverIO é um framework de automação que depende de vários protocolos de automação para controlar um agente remoto, por exemplo, um navegador, dispositivo móvel ou televisão. Dependendo do dispositivo remoto, diferentes protocolos entram em ação. Esses comandos são atribuídos ao Objeto [Browser](/docs/api/browser) ou [Element](/docs/api/element), dependendo das informações de sessão fornecidas pelo servidor remoto (por exemplo, o driver do navegador).

Internamente, o WebdriverIO usa comandos de protocolo para quase todas as interações com o agente remoto. No entanto, comandos adicionais atribuídos ao Objeto [Browser](/docs/api/browser) ou [Element](/docs/api/element) simplificam o uso do WebdriverIO. Por exemplo, obter o texto de um elemento usando comandos de protocolo ficaria assim:

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

Usando os comandos convenientes do Objeto [Browser](/docs/api/browser) ou [Element](/docs/api/element), isso pode ser reduzido a:

```js
$('#lst-ib').getText()
```

A seção a seguir explica cada protocolo individualmente.

## Protocolo WebDriver

O protocolo [WebDriver](https://w3c.github.io/webdriver/#elements) é um padrão web para automação de navegadores. Ao contrário de algumas outras ferramentas E2E, ele garante que a automação possa ser feita em navegadores reais que são usados pelos seus usuários, por exemplo, Firefox, Safari e Chrome, e navegadores baseados em Chromium como o Edge, e não apenas em engines de navegador, por exemplo, o WebKit, que são muito diferentes.

A vantagem de usar o protocolo WebDriver em vez de protocolos de depuração como o [Chrome DevTools](https://w3c.github.io/webdriver/#elements) é que você tem um conjunto específico de comandos que permitem interagir com o navegador da mesma forma em todos os navegadores, o que reduz a probabilidade de instabilidade (flakiness). Além disso, esse protocolo oferece capacidade de escalabilidade massiva por meio de provedores de nuvem como [Sauce Labs](https://saucelabs.com/), [BrowserStack](https://www.browserstack.com/) e [outros](https://github.com/christian-bromann/awesome-selenium#cloud-services).

## Protocolo WebDriver Bidi

O protocolo [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) é a segunda geração do protocolo e atualmente está sendo desenvolvido pela maioria dos fornecedores de navegadores. Em comparação com seu antecessor, o protocolo suporta uma comunicação bidirecional (daí o nome "Bidi") entre o framework e o dispositivo remoto. Além disso, ele introduz primitivas adicionais para uma melhor introspecção do navegador, a fim de automatizar melhor aplicações web modernas no navegador.

Como esse protocolo ainda está em desenvolvimento, mais recursos serão adicionados ao longo do tempo e suportados pelos navegadores. Se você usa os comandos convenientes do WebdriverIO, nada mudará para você. O WebdriverIO fará uso dessas novas capacidades do protocolo assim que estiverem disponíveis e forem suportadas no navegador.

## Appium

O projeto [Appium](https://appium.io/) oferece recursos para automatizar dispositivos móveis, desktop e todos os outros tipos de dispositivos IoT. Enquanto o WebDriver se concentra no navegador e na web, a visão do Appium é usar a mesma abordagem, mas para qualquer dispositivo. Além dos comandos que o WebDriver define, ele possui comandos especiais que geralmente são específicos para o dispositivo remoto que está sendo automatizado. Para cenários de testes móveis, isso é ideal quando você deseja escrever e executar os mesmos testes para aplicativos Android e iOS.

De acordo com a [documentação](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en) do Appium, ele foi projetado para atender às necessidades de automação móvel de acordo com uma filosofia delineada pelos seguintes quatro princípios:

- Você não deveria precisar recompilar seu aplicativo ou modificá-lo de qualquer forma para automatizá-lo.
- Você não deveria ficar preso a uma linguagem ou framework específico para escrever e executar seus testes.
- Um framework de automação móvel não deveria reinventar a roda quando se trata de APIs de automação.
- Um framework de automação móvel deveria ser open source, em espírito e prática, assim como no nome!

## Chromium

O protocolo Chromium oferece um superconjunto de comandos sobre o protocolo WebDriver que só é suportado ao executar sessões automatizadas através do [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) ou do [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver).

## Firefox

O protocolo Firefox oferece um superconjunto de comandos sobre o protocolo WebDriver que só é suportado ao executar sessões automatizadas através do [Geckodriver](https://github.com/mozilla/geckodriver).

## Sauce Labs

O protocolo [Sauce Labs](https://saucelabs.com/) oferece um superconjunto de comandos sobre o protocolo WebDriver que só é suportado ao executar sessões automatizadas usando a nuvem da Sauce Labs.

## Selenium Standalone

O protocolo [Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/) oferece um superconjunto de comandos sobre o protocolo WebDriver que só é suportado ao executar sessões automatizadas usando o Selenium Grid.