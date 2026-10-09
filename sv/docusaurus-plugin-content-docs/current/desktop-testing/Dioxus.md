---
id: dioxus
title: Dioxus
description: "Testa Dioxus-skrivbordsappar på Windows, macOS och Linux med WebdriverIO:s Dioxus-tjänst, med hjälp av installationsguiden eller en manuell konfiguration."
---

[Dioxus](https://dioxuslabs.com/) är ett Rust-ramverk för att bygga plattformsoberoende appar från en enda kodbas. Dess skrivbordsappar renderas i operativsystemets inbyggda webview (Wry), och WebdriverIO:s Dioxus-tjänst automatiserar upptäckt, start och styrning av dem på Windows (WebView2), macOS (WKWebView) och Linux (WebKitGTK) så att samma testsvit fungerar överallt.

Fördelarna med att använda WebdriverIO för att testa Dioxus-applikationer är:

- 🚗 automatisk tillhandahållning av WebDriver-lagret — den rekommenderade inbäddade drivrutinen som körs i samma process kräver ingen extern drivrutinsbinär på någon plattform
- 📦 plattformsoberoende identifiering av binärer (Edge WebView2-drivrutinen medföljer på Windows för `external`-providern)
- 🧩 `browser.dioxus.execute()`, mockning och fönsterhantering, som tillhandahålls av tjänsten via craten `wdio-dioxus-bridge`
- 🔗 testning av deeplinks + protokollhanterare
- 🪵 vidarebefordran av Rust- och frontend-loggar till WebdriverIO:s testrapportör

## Kom igång

För att starta ett nytt WebdriverIO-projekt, kör:

```sh
npm create wdio@latest ./
```

När guiden frågar vilken typ av testning du vill göra, välj _"Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications"_ och välj sedan _Dioxus_ när du tillfrågas om ramverk. Guiden frågar därefter vilken WebDriver-provider du vill använda (den rekommenderade inbäddade drivrutinen som körs i samma process, eller den externa drivrutinen som bara finns för Windows) samt sökvägen till din byggda debug-binär.

Guiden installerar npm-paketen automatiskt och skriver ut de nödvändiga Cargo-tilläggen till stdout så att du kan klistra in dem i din `Cargo.toml`.

## Manuell installation

Om du redan har ett WebdriverIO-projekt, installera tjänsten:

```sh
npm install --save-dev @wdio/dioxus-service
```

Testning kräver craten `wdio-dioxus-bridge` — den möjliggör `browser.dioxus.execute()`, mockning och loggfångst. Lägg till den i din `Cargo.toml`:

```toml
[dependencies]
wdio-dioxus-bridge = "1"
```

…och installera den i din Dioxus-skrivbordskonfiguration i `src/main.rs`. Skyddet `#[cfg(debug_assertions)]` håller bryggan utanför release-byggen:

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

Bygg appen för testning (ett debug-bygge håller bryggan aktiv):

```sh
cargo build
```

Lägg sedan till tjänsten och capabilities i din konfiguration:

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

Klart 🎉

Läs mer om [att konfigurera Dioxus-tjänsten](/docs/desktop-testing/dioxus/configuration), [installationen av bryggan](/docs/desktop-testing/dioxus/plugin-setup), [plattformsspecifika anteckningar](/docs/desktop-testing/dioxus/platform-support) och [vanliga användningsmönster](/docs/desktop-testing/dioxus/usage-examples).