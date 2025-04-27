---
id: protocols
title: Comandos de Protocolo
---

WebdriverIO é um framework de automação que depende de vários protocolos de automação para controlar um agente remoto, por exemplo, para um navegador, dispositivo móvel ou televisão. Com base no dispositivo remoto, diferentes protocolos entram em jogo. Esses comandos são atribuídos ao Objeto [Browser](/docs/api/browser) ou [Element](/docs/api/element) dependendo das informações da sessão pelo servidor remoto (por exemplo, driver do navegador).

Internamente, o WebdriverIO usa comandos de protocolo para quase todas as interações com o agente remoto. No entanto, comandos adicionais atribuídos ao Objeto [Browser](/docs/api/browser) ou [Element](/docs/api/element) simplificam o uso do WebdriverIO. Por exemplo, obter o texto de um elemento usando comandos de protocolo seria assim:

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

Usando os comandos convenientes do Objeto [Browser](/docs/api/browser) ou [Element](/docs/api/element), isso pode ser reduzido para:

```js
$('#lst-ib').getText()
```

A seção a seguir explica cada protocolo individual.

## Protocolo WebDriver

O protocolo [WebDriver](https://w3c.github.io/webdriver/#elements) é um padrão web para automação de navegadores. Ao contrário de algumas outras ferramentas E2E, ele garante que a automação possa ser feita em navegadores reais que são usados por seus usuários, por exemplo, Firefox, Safari e Chrome e navegadores baseados em Chromium como Edge, e não apenas em motores de navegador, por exemplo, WebKit, que são muito diferentes.

A vantagem de usar o protocolo WebDriver em oposição aos protocolos de depuração como [Chrome DevTools](https://w3c.github.io/webdriver/#elements) é que você tem um conjunto específico de comandos que permitem interagir com o navegador da mesma maneira em todos os navegadores, o que reduz a probabilidade de instabilidade. Além disso, este protocolo oferece habilidades para escalabilidade massiva usando fornecedores de nuvem como [Sauce Labs](https://saucelabs.com/), [BrowserStack](https://www.browserstack.com/) e [outros](https://github.com/christian-bromann/awesome-selenium#cloud-services).

## Protocolo WebDriver Bidi

O protocolo [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) é a segunda geração do protocolo e atualmente está sendo desenvolvido pela maioria dos fornecedores de navegadores. Comparado ao seu pré-predecessor, o protocolo suporta uma comunicação bidirecional (daí "Bidi") entre o framework e o dispositivo remoto. Além disso, introduz primitivas adicionais para melhor introspecção do navegador para melhor automação de aplicativos web modernos em navegadores.

Dado que este protocolo está atualmente em andamento, mais recursos serão adicionados ao longo do tempo e suportados pelo navegador. Se você usar os comandos convenientes do WebdriverIO, nada mudará para você. O WebdriverIO fará uso dessas novas capacidades de protocolo assim que estiverem disponíveis e suportadas no navegador.

## Appium

O projeto [Appium](https://appium.io/) fornece capacidades para automatizar dispositivos móveis, desktop e todos os outros tipos de dispositivos IoT. Enquanto o WebDriver se concentra em navegadores e na web, a visão do Appium é usar a mesma abordagem, mas para qualquer dispositivo arbitrário. Além dos comandos que o WebDriver define, ele possui comandos especiais que muitas vezes são específicos do dispositivo remoto que está sendo automatizado. Para cenários de teste móvel, isso é ideal quando você deseja escrever e executar os mesmos testes para aplicativos Android e iOS.

De acordo com a [documentação](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en) do Appium, ele foi projetado para atender às necessidades de automação móvel de acordo com uma filosofia delineada pelos seguintes quatro princípios:

- Você não deve precisar recompilar seu aplicativo ou modificá-lo de qualquer maneira para automatizá-lo.
- Você não deve estar preso a uma linguagem ou framework específico para escrever e executar seus testes.
- Um framework de automação móvel não deve reinventar a roda quando se trata de APIs de automação.
- Um framework de automação móvel deve ser de código aberto, em espírito e prática, bem como em nome!

## Chromium

O protocolo Chromium oferece um superconjunto de comandos em cima do protocolo WebDriver que só é suportado ao executar sessões automatizadas através do [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) ou [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver).

## Firefox

O protocolo Firefox oferece um superconjunto de comandos em cima do protocolo WebDriver que só é suportado ao executar sessões automatizadas através do [Geckodriver](https://github.com/mozilla/geckodriver).

## Sauce Labs

O protocolo [Sauce Labs](https://saucelabs.com/) oferece um superconjunto de comandos em cima do protocolo WebDriver que só é suportado ao executar sessões automatizadas usando a nuvem Sauce Labs.

## Selenium Standalone

O protocolo [Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/) oferece um superconjunto de comandos em cima do protocolo WebDriver que só é suportado ao executar sessões automatizadas usando o Selenium Grid.

## Protocolo JSON Wire

O [Protocolo JSON Wire](https://www.selenium.dev/documentation/legacy/json_wire_protocol/) é o pré-predecessor do protocolo WebDriver e está __obsoleto__ hoje. Embora alguns comandos ainda possam ser suportados em certos ambientes, não é recomendado usar nenhum de seus comandos.

## Protocolo Mobile JSON Wire

O [Protocolo Mobile JSON Wire](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md) é um superconjunto de comandos móveis em cima do Protocolo JSON Wire. Dado que este está obsoleto, o Protocolo Mobile JSON Wire também foi __descontinuado__. O Appium ainda pode suportar alguns de seus comandos, mas não é recomendável usá-los.