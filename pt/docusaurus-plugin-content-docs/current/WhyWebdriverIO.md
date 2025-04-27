---
id: why-webdriverio
title: Por que Webdriver.IO?
---

WebdriverIO é um framework de automação progressivo construído para automatizar aplicações web e móveis modernas. Ele simplifica a interação com seu aplicativo e fornece um conjunto de plugins que ajudam você a criar uma suíte de testes escalável, robusta e estável.

Ele foi projetado para ser:

- __Extensível__ - Adicionar funções auxiliares ou conjuntos e combinações mais complexas de comandos existentes é __simples__ e __realmente útil__
- __Compatível__ - WebdriverIO pode ser executado no [WebDriver Protocol](https://w3c.github.io/webdriver/) para __testes de navegador verdadeiramente multiplataforma__ bem como no [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) para automação baseada em Chromium usando [Puppeteer](https://pptr.dev/).
- __Rico em recursos__ - A enorme variedade de plugins integrados e da comunidade permite que você __facilmente integre__ e __estenda__ sua configuração para atender seus requisitos.

Você pode usar WebdriverIO para automatizar:

- 🌐 <span>&nbsp;</span> __aplicações web modernas__ escritas em React, Vue, Angular, Svelte ou outros frameworks frontend
- 📱 <span>&nbsp;</span> __aplicações móveis híbridas__ ou __nativas__ executadas em um emulador/simulador ou em um dispositivo real
- 💻 <span>&nbsp;</span> __aplicações desktop nativas__ (por exemplo, escritas com Electron.js)
- 📦 <span>&nbsp;</span> __testes unitários ou de componentes__ de componentes web no navegador

## Baseado em Padrões Web

WebdriverIO aproveita o poder do protocolo [WebDriver](https://w3c.github.io/webdriver/) e [WebDriver-BiDi](https://github.com/w3c/webdriver-bidi) que é desenvolvido e suportado por todos os fornecedores de navegadores e garante uma experiência de teste realmente multiplataforma. Enquanto outras ferramentas de automação exigem que você baixe motores de navegador modificados que não são usados por usuários reais ou emulam o comportamento do usuário injetando JavaScript, o WebdriverIO depende de um padrão comum de automação que é [devidamente testado](https://wpt.fyi/results/webdriver/tests?label=experimental&label=master&aligned) e garante compatibilidade por décadas futuras.

Além disso, o WebdriverIO também tem suporte para protocolos de automação alternativos e proprietários, como o [Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/) para fins de depuração e introspecção. Isso permite ao usuário alternar facilmente entre comandos convencionais baseados no WebDriver e poderosas interações com o navegador através do [Puppeteer](https://pptr.dev/).

Leia mais sobre as diferenças desses padrões de automação na seção sobre [Protocolos de Automação](automationProtocols).

## Verdadeiramente Open Source

Comparado a muitas ferramentas de automação no ecossistema, o WebdriverIO é um projeto verdadeiramente open source que é executado com governança aberta e pertence a uma entidade sem fins lucrativos chamada [OpenJS Foundation](https://openjsf.org/). Isso vincula legalmente o projeto a crescer e ser direcionado no interesse de todos os participantes. A equipe do projeto valoriza a abertura e a colaboração e não é movida por interesses monetários.

Isso torna o projeto independente em como ele está sendo desenvolvido e para onde se pretende ir. Permite que ofereçamos suporte gratuito 24/7 em nosso [canal da comunidade](https://discord.webdriver.io), pois construímos uma comunidade sustentável que se apoia e aprende uns com os outros. Por fim, oferece muitas oportunidades para as pessoas que contribuem e se envolvem com o projeto devido à sua [governança aberta](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md).