---
id: dioxus
title: Dioxus
description: "Testa le app desktop Dioxus su Windows, macOS e Linux con il servizio Dioxus di WebdriverIO, utilizzando la procedura guidata di configurazione o una configurazione manuale."
---

[Dioxus](https://dioxuslabs.com/) è un framework Rust per creare app multipiattaforma a partire da un'unica codebase. Le sue app desktop vengono renderizzate nella webview nativa del sistema operativo (Wry), e il servizio Dioxus di WebdriverIO ne automatizza il rilevamento, l'avvio e il controllo su Windows (WebView2), macOS (WKWebView) e Linux (WebKitGTK), così che la stessa suite di test funzioni ovunque.

I vantaggi dell'utilizzo di WebdriverIO per testare le applicazioni Dioxus sono:

- 🚗 provisioning automatico del livello WebDriver — il driver embedded in-process consigliato non richiede alcun binario di driver esterno su nessuna piattaforma
- 📦 rilevamento dei binari multipiattaforma (driver Edge WebView2 incluso su Windows per il provider `external`)
- 🧩 `browser.dioxus.execute()`, mocking e gestione delle finestre, forniti dal servizio tramite il crate `wdio-dioxus-bridge`
- 🔗 test di deeplink + gestori di protocollo
- 🪵 inoltro dei log Rust + frontend nel reporter dei test di WebdriverIO

## Per Iniziare

Per avviare un nuovo progetto WebdriverIO, esegui:

```sh
npm create wdio@latest ./
```

Quando la procedura guidata chiede quale tipo di test vuoi eseguire, seleziona _"Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications"_, quindi scegli _Dioxus_ alla richiesta del framework. La procedura guidata ti chiederà poi quale provider WebDriver vuoi utilizzare (il driver embedded in-process consigliato, oppure il driver esterno disponibile solo per Windows) e il percorso del tuo binario di debug compilato.

La procedura guidata installa automaticamente i pacchetti npm e stampa su stdout le aggiunte Cargo necessarie, da incollare nel tuo `Cargo.toml`.

## Configurazione Manuale

Se hai già un progetto WebdriverIO, installa il servizio:

```sh
npm install --save-dev @wdio/dioxus-service
```

I test richiedono il crate `wdio-dioxus-bridge`, che abilita `browser.dioxus.execute()`, il mocking e la cattura dei log. Aggiungilo al tuo `Cargo.toml`:

```toml
[dependencies]
wdio-dioxus-bridge = "1"
```

…e installalo nella configurazione desktop di Dioxus in `src/main.rs`. La guardia `#[cfg(debug_assertions)]` esclude il bridge dalle build di release:

```rust
fn main() {
    let mut config = dioxus::desktop::Config::new();

    #[cfg(debug_assertions)]
    {
        config = wdio_dioxus_bridge::install(config);
    }

    dioxus::LaunchBuilder::desktop()
        .with_cfg(config)
        .launch(App);
}
```

Compila l'app per i test (una build di debug mantiene attivo il bridge):

```sh
cargo build
```

Quindi aggiungi il servizio e le capabilities alla tua configurazione:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['dioxus', { driverProvider: 'embedded' }]],
    capabilities: [{
        browserName: 'dioxus',
        'dioxus:options': {
            application: './target/debug/my-app'
        }
    }]
}
```

Ecco fatto 🎉

Scopri di più su [come configurare il Servizio Dioxus](/docs/desktop-testing/dioxus/configuration), [la configurazione del bridge](/docs/desktop-testing/dioxus/plugin-setup), [le note specifiche per piattaforma](/docs/desktop-testing/dioxus/platform-support) e [gli schemi di utilizzo comuni](/docs/desktop-testing/dioxus/usage-examples).