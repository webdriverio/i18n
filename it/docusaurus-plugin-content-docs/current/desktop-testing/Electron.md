---
id: electron
title: Electron
description: "Testa le app Electron con il servizio Electron di WebdriverIO, che configura Chromedriver, rileva il binario della tua app e ti permette di simulare le API di Electron."
---

Electron è un framework per creare applicazioni desktop utilizzando JavaScript, HTML e CSS. Incorporando Chromium e Node.js nel suo binario, Electron ti permette di mantenere un'unica codebase JavaScript e creare app multipiattaforma che funzionano su Windows, macOS e Linux — senza richiedere alcuna esperienza di sviluppo nativo.

WebdriverIO fornisce un servizio integrato che semplifica l'interazione con la tua app Electron e ne rende il testing molto semplice. I vantaggi dell'utilizzo di WebdriverIO per testare le applicazioni Electron sono:

- 🚗 configurazione automatica del Chromedriver necessario
- 📦 rilevamento automatico del percorso della tua applicazione Electron - supporta [Electron Forge](https://www.electronforge.io/) e [Electron Builder](https://www.electron.build/)
- 🧩 accesso alle API di Electron all'interno dei tuoi test
- 🕵️ mocking delle API di Electron tramite un'API simile a Vitest

Bastano pochi semplici passaggi per iniziare. Guarda questo semplice video tutorial introduttivo passo dopo passo dal canale [YouTube di WebdriverIO](https://www.youtube.com/@webdriverio):

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

Oppure segui la guida nella sezione seguente.

## Per Iniziare

Per avviare un nuovo progetto WebdriverIO, esegui:

```sh
npm create wdio@latest ./
```

Una procedura guidata di installazione ti accompagnerà nel processo. Quando ti viene chiesto quale tipo di test desideri eseguire, seleziona _"Desktop Testing - of Electron, Tauri, or macOS Applications"_, quindi scegli _Electron_ quando ti viene chiesto il framework. Successivamente fornisci il percorso della tua applicazione Electron compilata, ad esempio `./dist`, poi mantieni semplicemente le impostazioni predefinite o modificale in base alle tue preferenze.

La procedura guidata di configurazione installerà tutti i pacchetti necessari e creerà un file `wdio.conf.js` o `wdio.conf.ts` con la configurazione necessaria per testare la tua applicazione. Se accetti di generare automaticamente alcuni file di test, puoi eseguire il tuo primo test tramite `npm run wdio`.

## Configurazione Manuale

Se stai già utilizzando WebdriverIO nel tuo progetto, puoi saltare la procedura guidata di installazione e aggiungere semplicemente le seguenti dipendenze:

```sh
npm install --save-dev @wdio/electron-service
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

Tutto qui 🎉

Scopri di più su [come configurare il servizio Electron](/docs/desktop-testing/electron/configuration), [come simulare le API di Electron](/docs/desktop-testing/electron/api-reference) e [come accedere alle API di Electron](/docs/desktop-testing/electron/api).