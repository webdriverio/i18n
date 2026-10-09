---
id: tauri
title: Tauri
description: "Testa le app desktop Tauri su Windows, macOS e Linux con il servizio Tauri di WebdriverIO, utilizzando la procedura guidata di configurazione o una configurazione manuale."
---

[Tauri](https://tauri.app/) è un framework per creare applicazioni desktop multipiattaforma leggere e sicure, utilizzando un backend in Rust e la webview nativa del sistema operativo. Il servizio Tauri di WebdriverIO automatizza il rilevamento, l'avvio e il controllo delle app Tauri su Windows (WebView2), macOS (WKWebView) e Linux (WebKitGTK), in modo che la stessa suite di test funzioni ovunque.

I vantaggi dell'utilizzo di WebdriverIO per testare le applicazioni Tauri sono:

- 🚗 provisioning automatico del livello WebDriver — scegli `tauri-driver`, il driver CrabNebula o il plugin integrato nell'app
- 📦 rilevamento dei binari multipiattaforma (driver Edge WebView2 incluso su Windows)
- 🧩 `@wdio/tauri-plugin` opzionale per un'integrazione più ricca all'interno della webview (`browser.tauri.execute`, mocking)
- 🔗 test di deeplink e gestori di protocollo
- 🪵 inoltro dei log di Rust e del frontend nel reporter dei test di WebdriverIO

## Per Iniziare

Per avviare un nuovo progetto WebdriverIO, esegui:

```sh
npm create wdio@latest ./
```

Quando la procedura guidata chiede che tipo di test desideri eseguire, seleziona _"Desktop Testing - of Electron, Tauri, or macOS Applications"_, quindi scegli _Tauri_ alla richiesta del framework. La procedura guidata chiederà poi quale provider WebDriver desideri utilizzare (il `tauri-driver` ufficiale, CrabNebula o il plugin integrato) e se desideri il `@wdio/tauri-plugin` opzionale per un'integrazione più ricca.

La procedura guidata installa automaticamente i pacchetti npm e stampa su stdout eventuali aggiunte Cargo necessarie, da incollare nel tuo `src-tauri/Cargo.toml`.

## Configurazione Manuale

Se hai già un progetto WebdriverIO, installa il servizio:

```sh
npm install --save-dev @wdio/tauri-service
# opzionale: integrazione più ricca all'interno della webview
npm install --save-dev @wdio/tauri-plugin
```

Per il plugin WebDriver integrato (consigliato — esegue il server W3C all'interno della tua app, senza bisogno di un `tauri-driver` esterno), aggiungi il crate Cargo a `src-tauri/Cargo.toml`:

```toml
[dependencies]
tauri-plugin-wdio-webdriver = "1"
```

…e registralo in `src-tauri/src/lib.rs`:

```rust
tauri::Builder::default()
    .plugin(tauri_plugin_wdio_webdriver::init())
    // ...
```

Quindi aggiungi il servizio alla tua configurazione:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['tauri', {
        appBinaryPath: './src-tauri/target/release/my-tauri-app',
        driverProvider: 'embedded'
    }]]
}
```

Tutto qui 🎉

Scopri di più sulla [configurazione del servizio Tauri](/docs/desktop-testing/tauri/configuration), sulla [configurazione del plugin Tauri](/docs/desktop-testing/tauri/plugin-setup), sulle [note specifiche per piattaforma](/docs/desktop-testing/tauri/platform-support) e sui [modelli di utilizzo comuni](/docs/desktop-testing/tauri/usage-examples).