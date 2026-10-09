---
id: why-webdriverio
title: Por que WebdriverIO?
description: O que diferencia o WebdriverIO de outras ferramentas de automação de testes - uma API para todas as plataformas, padrões web, governança aberta e suporte de primeira classe para agentes de codificação.
---

O WebdriverIO é um framework de automação de testes de código aberto para Node.js. Com um único test runner e uma única API, você pode automatizar navegadores web, aplicativos móveis nativos e híbridos, aplicativos desktop e extensões de editores, além de adicionar testes visuais, de acessibilidade e de componentes. Ele é mantido por sua comunidade sob a égide da [OpenJS Foundation](https://openjsf.org/).

## Um framework para todas as plataformas

A maioria das equipes entrega mais do que um site. O WebdriverIO permite que você teste tudo isso com os mesmos seletores, asserções, reporters e configuração de CI:

| Plataforma | Como o WebdriverIO a automatiza | Comece aqui |
| --- | --- | --- |
| Navegadores web | WebDriver e WebDriver BiDi no Chrome, Firefox, Safari e Edge | [Web Browsers](/docs/platforms/web) |
| Componentes web | Testes de componentes em um navegador real para React, Vue, Svelte, Solid, Preact, Lit e Stencil | [Component Testing](/docs/component-testing) |
| Aplicativos móveis | Nativos, híbridos e web móvel no iOS e Android via Appium, incluindo Flutter | [Mobile Apps](/docs/platforms/mobile) |
| Aplicativos desktop | Aplicativos Electron, Tauri e Dioxus no macOS, Windows e Linux, aplicativos nativos do macOS via Appium | [Desktop Apps](/docs/platforms/desktop) |
| Editores e extensões | Extensões do VS Code e extensões de navegador | [Extensions & Editors](/docs/platforms/apps-and-extensions) |
| Regressões visuais | Comparações de tela, de elemento e de página inteira para web e mobile | [Visual Testing](/docs/visual-testing) |

O mesmo teste pode até controlar várias dessas plataformas ao mesmo tempo, por exemplo, um aplicativo móvel e um painel web em um único cenário, com [multi-remote](/docs/multiremote).

## Construído sobre padrões web

O WebdriverIO automatiza navegadores por meio do [WebDriver](https://w3c.github.io/webdriver/) e do [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/), os padrões do W3C que todos os fabricantes de navegadores implementam e [testam](https://wpt.fyi/results/webdriver/tests). Seus testes são executados nas mesmas versões de navegador que seus usuários utilizam, e interações como cliques e pressionamentos de teclas são disparadas pelo próprio navegador, em vez de serem emuladas com JavaScript. O WebDriver BiDi adiciona mocking de rede, eventos de console e de log e muito mais em todos os navegadores, não apenas no Chromium.

Quando você precisa de recursos específicos de um navegador, o WebdriverIO oferece acesso ao Chrome DevTools Protocol por meio do [Puppeteer](/docs/api/browser/getPuppeteer). Leia mais em [Automation Protocols](/docs/automationProtocols).

## Orientado pela comunidade e com governança aberta

O WebdriverIO não é um produto de um fornecedor de testes. O projeto:

- pertence à [OpenJS Foundation](https://openjsf.org/), uma organização sem fins lucrativos e neutra em relação a fornecedores, o que o obriga legalmente a atender aos interesses de todos os seus usuários
- segue um [modelo de governança](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md) público: qualquer pessoa pode contribuir, e os committers e o Technical Steering Committee surgem da comunidade
- não tem plano pago nem recursos restritos; todos os recursos são gratuitos e você pode executar seus testes em qualquer lugar, localmente ou em qualquer provedor de nuvem
- direciona os patrocínios de volta para as pessoas que o constroem por meio de um [programa de bolsas para contribuidores](/blog/2024/02/15/new-contributor-stipend-program)
- oferece suporte gratuito da comunidade no [Discord](https://discord.webdriver.io) e no [GitHub Discussions](https://github.com/webdriverio/webdriverio/discussions)

## Pronto para agentes de codificação

A documentação, as ferramentas e os artefatos de teste foram projetados para que agentes de codificação possam trabalhar com o WebdriverIO de forma autônoma:

- **Documentação pronta para agentes**: todas as páginas estão disponíveis em Markdown, há um [`llms.txt`](https://webdriver.io/llms.txt) selecionado e um servidor MCP da documentação em `https://webdriver.io/mcp`.
- **WebdriverIO MCP**: o servidor [`@wdio/mcp`](/docs/mcp) permite que um agente controle navegadores e aplicativos móveis para explorar sua UI e verificar seletores.
- **Traces**: o [modo trace do DevTools](/docs/devtools/wdio/trace-mode) gera uma transcrição em Markdown, capturas de tela e snapshots de acessibilidade para cada teste que falha.

Consulte [WebdriverIO for Coding Agents](/docs/ai-agents) para a configuração.

## Tudo incluído e fácil de estender

- Um [test runner](/docs/testrunner) com suporte a Mocha, Jasmine e Cucumber, execução paralela, [sharding](/docs/sharding), [retries](/docs/retry) e um [watch mode](/docs/watcher)
- [Espera automática](/docs/autowait) para cada interação e uma [biblioteca de asserções](/docs/assertion) integrada
- [Mocking de rede](/docs/mocksandspies), [emulação](/docs/emulation) e [testes de snapshot](/docs/snapshot)
- Um [painel de depuração e visualizador de traces](/docs/devtools)
- [Mais de 70 services e reporters](/docs/ecosystem) para nuvens, frameworks e CI, além de APIs simples para escrever seus próprios [comandos](/docs/customcommands), [services](/docs/customservices) e [reporters](/docs/customreporter)

## Quando escolher outra ferramenta

O WebdriverIO é uma boa escolha quando você testa mais de uma plataforma, quer executar testes em navegadores e dispositivos reais ou valoriza uma ferramenta independente e pertencente à comunidade. Se você só testa um único aplicativo web em um único navegador e não precisa de dispositivos móveis, desktop ou em nuvem, uma ferramenta exclusiva para navegadores pode parecer mais leve para começar. Se estiver em dúvida, [crie um projeto](/docs/gettingstarted) com `npm init wdio@latest` e experimente: a configuração leva cerca de um minuto.

## Próximos passos

- [Getting Started](/docs/gettingstarted) - crie um projeto e execute seu primeiro teste
- [Setup Types](/docs/setuptypes) - modo test runner ou standalone
- [WebdriverIO for Coding Agents](/docs/ai-agents) - configure seu agente