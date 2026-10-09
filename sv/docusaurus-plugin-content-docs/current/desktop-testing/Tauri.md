---
id: tauri
title: Tauri
description: "Testa Tauri-skrivbordsappar på Windows, macOS och Linux med WebdriverIO:s Tauri-tjänst, med hjälp av installationsguiden eller en manuell konfiguration."
---

[Tauri](https://tauri.app/) är ett ramverk för att bygga lätta, säkra plattformsoberoende skrivbordsapplikationer med en Rust-backend och operativsystemets inbyggda webview. WebdriverIO:s Tauri-tjänst automatiserar upptäckt, start och styrning av Tauri-appar på Windows (WebView2), macOS (WKWebView) och Linux (WebKitGTK) så att samma testsvit fungerar överallt.

Fördelarna med att använda WebdriverIO för att testa Tauri-applikationer är:

- 🚗 automatisk provisionering av WebDriver-lagret — välj `tauri-driver`, CrabNebula-drivrutinen eller det inbäddade pluginet i appen
- 📦 plattformsoberoende identifiering av binärfiler (Edge WebView2-drivrutinen medföljer på Windows)
- 🧩 valfritt `@wdio/tauri-plugin` för rikare integration i webviewen (`browser.tauri.execute`, mockning)
- 🔗 testning av deeplinks + protokollhanterare
- 🪵 vidarebefordran av Rust- och frontend-loggar till WebdriverIO:s testrapportör

## Kom igång

För att starta ett nytt WebdriverIO-projekt, kör:

```sh
npm create wdio@latest ./
```

När guiden frågar vilken typ av testning du vill göra, välj _"Desktop Testing - of Electron, Tauri, or macOS Applications"_ och välj sedan _Tauri_ när du tillfrågas om ramverk. Guiden frågar därefter vilken WebDriver-leverantör du vill använda (officiella `tauri-driver`, CrabNebula eller det inbäddade pluginet) och om du vill ha det valfria `@wdio/tauri-plugin` för rikare integration.

Guiden installerar npm-paketen automatiskt och skriver ut eventuella nödvändiga Cargo-tillägg till stdout så att du kan klistra in dem i din `src-tauri/Cargo.toml`.

## Manuell installation

Om du redan har ett WebdriverIO-projekt, installera tjänsten:

```sh
npm install --save-dev @wdio/tauri-service
# valfritt: rikare integration i webviewen
npm install --save-dev @wdio/tauri-plugin
```

För det inbäddade WebDriver-pluginet (rekommenderas — kör W3C-servern inuti din app, ingen extern `tauri-driver` behövs), lägg till Cargo-craten i `src-tauri/Cargo.toml`:

```toml
[dependencies]
tauri-plugin-wdio-webdriver = "1"
```

…och registrera det i `src-tauri/src/lib.rs`:

```rust
tauri::Builder::default()
    .plugin(tauri_plugin_wdio_webdriver::init())
    // ...
```

Lägg sedan till tjänsten i din konfiguration:

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

Det var allt 🎉

Läs mer om [att konfigurera Tauri-tjänsten](/docs/desktop-testing/tauri/configuration), [installationen av Tauri-pluginet](/docs/desktop-testing/tauri/plugin-setup), [plattformsspecifika anteckningar](/docs/desktop-testing/tauri/platform-support) och [vanliga användningsmönster](/docs/desktop-testing/tauri/usage-examples).