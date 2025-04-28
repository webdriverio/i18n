---
id: why-webdriverio
title: Perché Webdriver.IO?
---

WebdriverIO è un framework di automazione progressivo costruito per automatizzare applicazioni web e mobile moderne. Semplifica l'interazione con la tua app e fornisce un set di plugin che ti aiutano a creare una suite di test scalabile, robusta e stabile.

È progettato per essere:

- __Estendibile__ - Aggiungere funzioni di supporto o set più complessi e combinazioni di comandi esistenti è __semplice__ e __davvero utile__
- __Compatibile__ - WebdriverIO può essere eseguito sul [WebDriver Protocol](https://w3c.github.io/webdriver/) per __test cross-browser reali__ così come sul [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) per l'automazione basata su Chromium utilizzando [Puppeteer](https://pptr.dev/).
- __Ricco di funzionalità__ - L'enorme varietà di plugin integrati e della community ti permette di __integrare facilmente__ ed __estendere__ la tua configurazione per soddisfare i tuoi requisiti.

Puoi utilizzare WebdriverIO per automatizzare:

- 🌐 <span>&nbsp;</span> __applicazioni web moderne__ scritte in React, Vue, Angular, Svelte o altri framework frontend
- 📱 <span>&nbsp;</span> __applicazioni mobili ibride__ o __native__ in esecuzione su un emulatore/simulatore o su un dispositivo reale
- 💻 <span>&nbsp;</span> __applicazioni desktop native__ (ad esempio scritte con Electron.js)
- 📦 <span>&nbsp;</span> __test unitari o di componenti__ di componenti web nel browser

## Basato su standard web

WebdriverIO sfrutta la potenza del protocollo [WebDriver](https://w3c.github.io/webdriver/) e [WebDriver-BiDi](https://github.com/w3c/webdriver-bidi) che è sviluppato e supportato da tutti i fornitori di browser e garantisce una vera esperienza di test cross-browser. Mentre altri strumenti di automazione richiedono di scaricare motori di browser modificati che non vengono utilizzati dagli utenti reali o emulano il comportamento dell'utente iniettando JavaScript, WebdriverIO si basa su uno standard comune concordato per l'automazione che è [adeguatamente testato](https://wpt.fyi/results/webdriver/tests?label=experimental&label=master&aligned) e garantisce la compatibilità per i decenni a venire.

Inoltre, WebdriverIO ha anche supporto per protocolli di automazione alternativi e proprietari come [Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/) per scopi di debug e introspezione. Ciò consente all'utente di passare senza problemi tra comandi convenzionali basati su WebDriver e potenti interazioni con il browser tramite [Puppeteer](https://pptr.dev/).

Leggi di più sulle differenze di questi standard di automazione nella sezione [Protocolli di automazione](automationProtocols).

## Vero Open Source

Rispetto a molti strumenti di automazione nell'ecosistema, WebdriverIO è un progetto veramente open source che viene gestito con governance aperta ed è di proprietà di un'entità senza scopo di lucro chiamata [OpenJS Foundation](https://openjsf.org/). Questo vincola legalmente il progetto a crescere e ad essere diretto nell'interesse di tutti i partecipanti. Il team di progetto valorizza l'apertura e la collaborazione e non è guidato da interessi monetari.

Questo rende il progetto indipendente nel modo in cui viene sviluppato e nella direzione che si intende prendere. Ci permette di fornire supporto gratuito 24/7 nel nostro [canale della community](https://discord.webdriver.io) mentre costruiamo una comunità sostenibile che si supporta e impara l'uno dall'altro. Infine, offre molte opportunità alle persone che contribuiscono e si impegnano con il progetto grazie alla sua [governance aperta](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md).