---
id: electron
title: Electron
---

Electron è un framework per la creazione di applicazioni desktop utilizzando JavaScript, HTML e CSS. Incorporando Chromium e Node.js nel suo binario, Electron ti consente di mantenere una sola base di codice JavaScript e creare applicazioni multipiattaforma che funzionano su Windows, macOS e Linux - non è richiesta esperienza di sviluppo nativo.

WebdriverIO fornisce un servizio integrato che semplifica l'interazione con la tua app Electron e rende il test molto semplice. I vantaggi dell'utilizzo di WebdriverIO per testare le applicazioni Electron sono:

- 🚗 configurazione automatica del Chromedriver richiesto
- 📦 rilevamento automatico del percorso della tua applicazione Electron - supporta [Electron Forge](https://www.electronforge.io/) e [Electron Builder](https://www.electron.build/)
- 🧩 accesso alle API di Electron nei tuoi test
- 🕵️ simulazione delle API di Electron tramite un'API simile a Vitest

Hai bisogno solo di alcuni semplici passaggi per iniziare. Guarda questo semplice tutorial video passo-passo per iniziare dal canale [WebdriverIO YouTube](https://www.youtube.com/@webdriverio):

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

Oppure segui la guida nella sezione seguente.

## Per iniziare

Per avviare un nuovo progetto WebdriverIO, esegui:

```sh
npm create wdio@latest ./
```

Una procedura guidata di installazione ti guiderà attraverso il processo. Assicurati di selezionare _"Desktop Testing - of Electron Applications"_ quando ti chiede che tipo di test vorresti fare. Successivamente fornisci il percorso alla tua applicazione Electron compilata, ad esempio `./dist`, poi mantieni le impostazioni predefinite o modificale in base alle tue preferenze.

La procedura guidata di configurazione installerà tutti i pacchetti necessari e creerà un `wdio.conf.js` o `wdio.conf.ts` con la configurazione necessaria per testare la tua applicazione. Se accetti di generare automaticamente alcuni file di test, puoi eseguire il tuo primo test tramite `npm run wdio`.

## Configurazione manuale

Se stai già utilizzando WebdriverIO nel tuo progetto, puoi saltare la procedura guidata di installazione e aggiungere semplicemente le seguenti dipendenze:

```sh
npm install --save-dev wdio-electron-service
```

Quindi puoi utilizzare la seguente configurazione:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['electron', {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: [/** ... */],
    }]]
}
```

Ecco fatto 🎉

Scopri di più su [come configurare il servizio Electron](/docs/desktop-testing/electron/configuration), [come simulare le API Electron](/docs/desktop-testing/electron/mocking) e [come accedere alle API Electron](/docs/desktop-testing/electron/api).