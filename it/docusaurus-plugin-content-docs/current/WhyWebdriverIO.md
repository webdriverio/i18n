---
id: why-webdriverio
title: Perché WebdriverIO?
description: Cosa distingue WebdriverIO dagli altri strumenti di automazione dei test - un'unica API per ogni piattaforma, standard web, governance aperta e supporto di prima classe per i coding agent.
---

WebdriverIO è un framework open source per l'automazione dei test in Node.js. Con un unico test runner e un'unica API puoi automatizzare browser web, app mobili native e ibride, app desktop ed estensioni per editor, e aggiungere in più test visivi, di accessibilità e di componenti. È gestito dalla sua community sotto l'egida della [OpenJS Foundation](https://openjsf.org/).

## Un unico framework per ogni piattaforma

La maggior parte dei team rilascia più di un semplice sito web. WebdriverIO ti permette di testare tutto con gli stessi selettori, asserzioni, reporter e configurazione CI:

| Piattaforma | Come WebdriverIO la automatizza | Inizia da qui |
| --- | --- | --- |
| Browser web | WebDriver e WebDriver BiDi in Chrome, Firefox, Safari ed Edge | [Web Browsers](/docs/platforms/web) |
| Componenti web | Test dei componenti in un browser reale per React, Vue, Svelte, Solid, Preact, Lit e Stencil | [Component Testing](/docs/component-testing) |
| App mobili | Native, ibride e mobile web su iOS e Android tramite Appium, incluso Flutter | [Mobile Apps](/docs/platforms/mobile) |
| App desktop | App Electron, Tauri e Dioxus su macOS, Windows e Linux, app macOS native tramite Appium | [Desktop Apps](/docs/platforms/desktop) |
| Editor ed estensioni | Estensioni per VS Code ed estensioni per browser | [Extensions & Editors](/docs/platforms/apps-and-extensions) |
| Regressioni visive | Confronti di schermo, elementi e pagine intere per web e mobile | [Visual Testing](/docs/visual-testing) |

Lo stesso test può persino pilotarne diverse contemporaneamente, ad esempio un'app mobile e una dashboard web in un unico scenario, con il [multi-remote](/docs/multiremote).

## Basato sugli standard web

WebdriverIO automatizza i browser tramite [WebDriver](https://w3c.github.io/webdriver/) e [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/), gli standard W3C che ogni produttore di browser implementa e [testa](https://wpt.fyi/results/webdriver/tests). I tuoi test vengono eseguiti sulle stesse build dei browser che usano i tuoi utenti, e interazioni come clic e pressioni di tasti vengono inviate dal browser stesso invece di essere emulate con JavaScript. WebDriver BiDi aggiunge mocking di rete, eventi di console e log e altro ancora su tutti i browser, non solo Chromium.

Quando hai bisogno di funzionalità specifiche del browser, WebdriverIO ti dà accesso al Chrome DevTools Protocol tramite [Puppeteer](/docs/api/browser/getPuppeteer). Scopri di più in [Automation Protocols](/docs/automationProtocols).

## Guidato dalla community e con governance aperta

WebdriverIO non è il prodotto di un fornitore di strumenti di test. Il progetto:

- è di proprietà della [OpenJS Foundation](https://openjsf.org/), un'organizzazione no-profit neutrale rispetto ai fornitori, che lo vincola legalmente a servire gli interessi di tutti i suoi utenti
- segue un [modello di governance](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md) pubblico: chiunque può contribuire, e i committer e il Technical Steering Committee nascono dalla community
- non ha piani a pagamento né funzionalità riservate; ogni funzionalità è gratuita e puoi eseguire i tuoi test ovunque, in locale o su qualsiasi provider cloud
- reindirizza le sponsorizzazioni verso le persone che lo sviluppano tramite un [programma di compensi per i contributori](/blog/2024/02/15/new-contributor-stipend-program)
- offre supporto gratuito dalla community su [Discord](https://discord.webdriver.io) e [GitHub Discussions](https://github.com/webdriverio/webdriverio/discussions)

## Pronto per i coding agent

La documentazione, gli strumenti e gli artefatti dei test sono progettati in modo che i coding agent possano lavorare con WebdriverIO in autonomia:

- **Documentazione pronta per gli agent**: ogni pagina è disponibile in Markdown, c'è un [`llms.txt`](https://webdriver.io/llms.txt) curato e un server MCP della documentazione su `https://webdriver.io/mcp`.
- **WebdriverIO MCP**: il server [`@wdio/mcp`](/docs/mcp) permette a un agent di pilotare browser e app mobili per esplorare la tua UI e verificare i selettori.
- **Trace**: la [modalità trace di DevTools](/docs/devtools/wdio/trace-mode) scrive una trascrizione in Markdown, screenshot e snapshot di accessibilità per ogni test fallito.

Consulta [WebdriverIO for Coding Agents](/docs/ai-agents) per la configurazione.

## Tutto incluso, facile da estendere

- Un [test runner](/docs/testrunner) con supporto per Mocha, Jasmine e Cucumber, esecuzione parallela, [sharding](/docs/sharding), [retry](/docs/retry) e una [modalità watch](/docs/watcher)
- [Attesa automatica](/docs/autowait) per ogni interazione e una [libreria di asserzioni](/docs/assertion) integrata
- [Mocking di rete](/docs/mocksandspies), [emulazione](/docs/emulation) e [snapshot testing](/docs/snapshot)
- Una [dashboard di debug e un visualizzatore di trace](/docs/devtools)
- [Oltre 70 servizi e reporter](/docs/ecosystem) per cloud, framework e CI, oltre a semplici API per scrivere i tuoi [comandi](/docs/customcommands), [servizi](/docs/customservices) e [reporter](/docs/customreporter)

## Quando scegliere qualcos'altro

WebdriverIO è la scelta giusta quando testi più di una piattaforma, vuoi eseguire i test su browser e dispositivi reali, o apprezzi uno strumento indipendente e di proprietà della community. Se testi sempre e solo una singola web app in un singolo browser e non hai bisogno di dispositivi mobili, desktop o cloud, uno strumento solo per browser potrebbe sembrare più leggero per iniziare. Se non sei sicuro, [crea un progetto](/docs/gettingstarted) con `npm init wdio@latest` e provalo: la configurazione richiede circa un minuto.

## Prossimi passi

- [Getting Started](/docs/gettingstarted) - crea un progetto ed esegui il tuo primo test
- [Setup Types](/docs/setuptypes) - test runner o modalità standalone
- [WebdriverIO for Coding Agents](/docs/ai-agents) - configura il tuo agent