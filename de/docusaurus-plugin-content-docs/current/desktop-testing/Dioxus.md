---
id: dioxus
title: Dioxus
description: "Testen Sie Dioxus-Desktop-Apps unter Windows, macOS und Linux mit dem WebdriverIO Dioxus-Service, entweder über den Einrichtungsassistenten oder eine manuelle Konfiguration."
---

[Dioxus](https://dioxuslabs.com/) ist ein Rust-Framework zum Erstellen plattformübergreifender Apps aus einer einzigen Codebasis. Seine Desktop-Apps werden im nativen Webview des Betriebssystems (Wry) gerendert. Der Dioxus-Service von WebdriverIO automatisiert deren Erkennung, Start und Steuerung unter Windows (WebView2), macOS (WKWebView) und Linux (WebKitGTK), sodass dieselbe Testsuite überall funktioniert.

Die Vorteile der Verwendung von WebdriverIO zum Testen von Dioxus-Anwendungen sind:

- 🚗 automatische Bereitstellung der WebDriver-Schicht – der empfohlene eingebettete In-Process-Treiber benötigt auf keiner Plattform eine externe Treiber-Binärdatei
- 📦 plattformübergreifende Erkennung der Binärdatei (Edge WebView2-Treiber unter Windows für den `external`-Provider mitgeliefert)
- 🧩 `browser.dioxus.execute()`, Mocking und Fensterverwaltung, bereitgestellt vom Service über das `wdio-dioxus-bridge`-Crate
- 🔗 Testen von Deeplinks und Protokoll-Handlern
- 🪵 Weiterleitung von Rust- und Frontend-Logs an den WebdriverIO-Testreporter

## Erste Schritte

Um ein neues WebdriverIO-Projekt zu initiieren, führen Sie Folgendes aus:

```sh
npm create wdio@latest ./
```

Wenn der Assistent fragt, welche Art von Tests Sie durchführen möchten, wählen Sie _"Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications"_ und anschließend bei der Framework-Abfrage _Dioxus_. Der Assistent fragt dann, welchen WebDriver-Provider Sie verwenden möchten (den empfohlenen eingebetteten In-Process-Treiber oder den nur unter Windows verfügbaren externen Treiber), sowie nach dem Pfad zu Ihrer erstellten Debug-Binärdatei.

Der Assistent installiert die npm-Pakete automatisch und gibt die erforderlichen Cargo-Ergänzungen auf stdout aus, damit Sie sie in Ihre `Cargo.toml` einfügen können.

## Manuelle Einrichtung

Wenn Sie bereits ein WebdriverIO-Projekt haben, installieren Sie den Service:

```sh
npm install --save-dev @wdio/dioxus-service
```

Für das Testen wird das `wdio-dioxus-bridge`-Crate benötigt – es ermöglicht `browser.dioxus.execute()`, Mocking und die Erfassung von Logs. Fügen Sie es Ihrer `Cargo.toml` hinzu:

```toml
[dependencies]
wdio-dioxus-bridge = "1"
```

…und installieren Sie es in Ihrer Dioxus-Desktop-Konfiguration in `src/main.rs`. Der `#[cfg(debug_assertions)]`-Guard hält die Bridge aus Release-Builds heraus:

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

Erstellen Sie die App für das Testen (ein Debug-Build hält die Bridge aktiv):

```sh
cargo build
```

Fügen Sie dann den Service und die Capabilities zu Ihrer Konfiguration hinzu:

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

Das war's 🎉

Erfahren Sie mehr über die [Konfiguration des Dioxus-Service](/docs/desktop-testing/dioxus/configuration), [die Einrichtung der Bridge](/docs/desktop-testing/dioxus/plugin-setup), [plattformspezifische Hinweise](/docs/desktop-testing/dioxus/platform-support) und [gängige Anwendungsmuster](/docs/desktop-testing/dioxus/usage-examples).