---
id: network-logs
title: Log di rete
description: "Ispeziona ogni richiesta e risposta HTTP acquisita da DevTools durante un test per eseguire il debug di chiamate API, payload e richieste lente."
---

Monitora e ispeziona tutta l'attività di rete durante i tuoi test. DevTools acquisisce ogni richiesta e risposta HTTP, offrendoti una visibilità completa su chiamate API, caricamento delle risorse e tempi di rete, proprio come i DevTools del browser.

**Cosa viene acquisito:**
- **Dettagli della richiesta** - URL, metodo, header, parametri di query, corpo della richiesta
- **Dati della risposta** - Codice di stato, header della risposta, corpo della risposta, tempi
- **Tipi di risorse** - Richieste XHR/Fetch, script, fogli di stile, immagini e altro
- **Metriche di prestazione** - Tempi delle richieste, durata e waterfall di rete

Tutto questo è prezioso per eseguire il debug di problemi con le API, identificare richieste lente, convalidare i payload dei dati e comprendere il comportamento di rete della tua applicazione durante i test.

## Senza WebDriver BiDi

Safari e tutte le sessioni servite da Appium (Safari su iOS, Chrome su Android) non espongono WebDriver BiDi, quindi in questi casi la scheda Network viene popolata dalla pagina stessa, tramite lo stesso collector iniettato che registra il DOM. Utilizza due fonti proprie della pagina:

- **Patch di `fetch` / `XMLHttpRequest`**: ogni chiamata effettuata dalla pagina riporta metodo, header, stato e corpo.
- **Buffer di Resource Timing**: ogni caricamento effettuato dal browser (il documento, script, stili, immagini, font) con le relative fasi temporali e dimensioni, più lo stato su Chromium. Il buffer viene letto quando il collector viene installato, quindi sono inclusi anche i caricamenti avvenuti prima della sua esistenza.

Resource Timing non può vedere header o corpi, e su Safari non riporta alcuno stato. Ogni riga di questo tipo lo indica nella propria scheda di dettaglio, una riga senza stato viene colorata come sconosciuta anziché come fallita o ancora in corso, e la colonna del metodo mostra un trattino quando il browser non ne indica alcuno. In una trace, la voce `trace.network` della riga contiene `_source: "resource-timing"` e il `_resourceType` acquisito, così una trace riaperta mostra la stessa riga. Una richiesta vista da entrambe le fonti viene elencata una sola volta.

Quando BiDi serve la sessione, ovvero quando ha effettivamente consegnato un evento di rete e non si è limitato ad accettare una sottoscrizione, le righe di Resource Timing vengono scartate in modo che ogni richiesta sia elencata una sola volta. Su Nightwatch, il performance log di Chrome aggiorna direttamente quelle righe con gli header e lo stato di cui dispone.

Una sessione di app nativa non ha un documento, quindi nessuna delle due fonti è applicabile. La sua rete può invece essere letta dal plugin appium-interceptor quando la sessione imposta `appium:intercept: true`; vedi [Rete delle app native](/docs/devtools/mobile#native-app-network).

## Demo

### 🌐 Log di rete
![Network Logs](/img/devtools/network-logs.gif)