---
id: tauri
title: Tauri
description: "Testen Sie Tauri-Desktop-Apps unter Windows, macOS und Linux mit dem WebdriverIO-Tauri-Service, entweder über den Einrichtungsassistenten oder eine manuelle Konfiguration."
---

[Tauri](https://tauri.app/) ist ein Framework zum Erstellen leichtgewichtiger, sicherer plattformübergreifender Desktop-Anwendungen mit einem Rust-Backend und der nativen Webview des Betriebssystems. Der Tauri-Service von WebdriverIO automatisiert das Auffinden, Starten und Steuern von Tauri-Apps unter Windows (WebView2), macOS (WKWebView) und Linux (WebKitGTK), sodass dieselbe Testsuite überall funktioniert.

Die Vorteile von WebdriverIO beim Testen von Tauri-Anwendungen sind:

- 🚗 automatische Bereitstellung der WebDriver-Schicht – wählen Sie `tauri-driver`, den CrabNebula-Treiber oder das in die App eingebettete Plugin
- 📦 plattformübergreifende Erkennung von Binärdateien (Edge-WebView2-Treiber unter Windows mitgeliefert)
- 🧩 optionales `@wdio/tauri-plugin` für eine umfassendere Integration in die Webview (`browser.tauri.execute`, Mocking)
- 🔗 Testen von Deeplinks und Protokoll-Handlern
- 🪵 Weiterleitung von Rust- und Frontend-Logs an den WebdriverIO-Test-Reporter

## Erste Schritte

Um ein neues WebdriverIO-Projekt zu starten, führen Sie Folgendes aus:

```sh
npm create wdio@latest ./
```

Wenn der Assistent fragt, welche Art von Tests Sie durchführen möchten, wählen Sie _"Desktop Testing - of Electron, Tauri, or macOS Applications"_ und anschließend bei der Framework-Abfrage _Tauri_. Der Assistent fragt dann, welchen WebDriver-Provider Sie verwenden möchten (offizieller `tauri-driver`, CrabNebula oder das eingebettete Plugin) und ob Sie das optionale `@wdio/tauri-plugin` für eine umfassendere Integration nutzen möchten.

Der Assistent installiert die npm-Pakete automatisch und gibt alle erforderlichen Cargo-Ergänzungen auf stdout aus, damit Sie diese in Ihre `src-tauri/Cargo.toml` einfügen können.

## Manuelle Einrichtung

Wenn Sie bereits ein WebdriverIO-Projekt haben, installieren Sie den Service:

```sh
npm install --save-dev @wdio/tauri-service
# optional: richer in-webview integration
npm install --save-dev @wdio/tauri-plugin
```

Für das eingebettete WebDriver-Plugin (empfohlen – führt den W3C-Server innerhalb Ihrer App aus, kein externer `tauri-driver` erforderlich) fügen Sie das Cargo-Crate zu `src-tauri/Cargo.toml` hinzu:

```toml
[dependencies]
tauri-plugin-wdio-webdriver = "1"
```

…und registrieren Sie es in `src-tauri/src/lib.rs`:

```rust
tauri::Builder::default()
    .plugin(tauri_plugin_wdio_webdriver::init())
    // ...
```

Fügen Sie dann den Service zu Ihrer Konfiguration hinzu:

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

Das war's 🎉

Erfahren Sie mehr über die [Konfiguration des Tauri-Service](/docs/desktop-testing/tauri/configuration), [die Einrichtung des Tauri-Plugins](/docs/desktop-testing/tauri/plugin-setup), [plattformspezifische Hinweise](/docs/desktop-testing/tauri/platform-support) und [gängige Anwendungsmuster](/docs/desktop-testing/tauri/usage-examples).