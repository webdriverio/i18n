---
id: why-webdriverio
title: Perché Webdriver.IO?
---

WebdriverIO è un framework di automazione progressivo costruito per automatizzare applicazioni web e mobile moderne. Semplifica l'interazione con la tua app e fornisce una serie di plugin che ti aiutano a creare una suite di test scalabile, robusta e stabile.

È progettato per essere:

- __Estendibile__ - Aggiungere funzioni di supporto o combinazioni più complesse di comandi esistenti è __semplice__ e __molto utile__
- __Compatibile__ - WebdriverIO può essere eseguito sul [WebDriver Protocol](https://w3c.github.io/webdriver/) per __test cross-browser reali__ e anche su [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) per l'automazione basata su Chromium utilizzando [Puppeteer](https://pptr.dev/).
- __Ricco di funzionalità__ - L'ampia varietà di plugin integrati e della community ti permette di __integrare facilmente__ ed __estendere__ la tua configurazione per soddisfare le tue esigenze.

Puoi utilizzare WebdriverIO per automatizzare:

- 🌐 <span>&nbsp;</span> __applicazioni web moderne__ scritte in React, Vue, Angular, Svelte o altri framework frontend
- 📱 <span>&nbsp;</span> __applicazioni mobili ibride__ o __native__ in esecuzione su un emulatore/simulatore o su un dispositivo reale
- 💻 <span>&nbsp;</span> __applicazioni desktop native__ (ad esempio scritte con Electron.js)
- 📦 <span>&nbsp;</span> __test unitari o di componenti__ di web component nel browser

## Basato su standard web

WebdriverIO sfrutta la potenza dei protocolli [WebDriver](https://w3c.github.io/webdriver/) e [WebDriver-BiDi](https://github.com/w3c/webdriver-bidi) che sono sviluppati e supportati da tutti i fornitori di browser e garantiscono una vera esperienza di test cross-browser. Mentre altri strumenti di automazione richiedono di scaricare motori di browser modificati che non sono utilizzati dagli utenti reali o emulano il comportamento dell'utente iniettando JavaScript, WebdriverIO si basa su uno standard comune concordato per l'automazione che è [adeguatamente testato](https://wpt.fyi/results/webdriver/tests?label=experimental&label=master&aligned) e garantisce la compatibilità per i decenni a venire.

Inoltre, WebdriverIO ha anche supporto per protocolli di automazione alternativi e proprietari come [Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/) per scopi di debug e introspezione. Questo consente all'utente di passare senza problemi tra comandi convenzionali basati su WebDriver e potenti interazioni con il browser tramite [Puppeteer](https://pptr.dev/).

Leggi di più sulle differenze di questi standard di automazione nella sezione sui [Protocolli di Automazione](automationProtocols).

## Vero Open Source

Rispetto a molti strumenti di automazione nell'ecosistema, WebdriverIO è un progetto veramente open source che viene gestito con una governance aperta ed è di proprietà di un'entità non-profit chiamata [OpenJS Foundation](https://openjsf.org/). Questo vincola legalmente il progetto a crescere e a essere diretto nell'interesse di tutti i partecipanti. Il team del progetto valorizza l'apertura e la collaborazione e non è guidato da interessi monetari.

Questo rende il progetto indipendente nel modo in cui viene sviluppato e nella direzione che deve prendere. Ci permette di fornire supporto gratuito 24/7 nel nostro [canale della community](https://discord.webdriver.io) mentre costruiamo una comunità sostenibile che si supporta e impara reciprocamente. Infine, offre molte opportunità alle persone che contribuiscono e si impegnano con il progetto grazie alla sua [governance aperta](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md).