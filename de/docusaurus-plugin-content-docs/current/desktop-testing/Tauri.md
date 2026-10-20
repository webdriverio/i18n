---
id: tauri
title: Tauri
description: "Teste Tauri-Desktop-Apps unter Windows, macOS und Linux mit dem WebdriverIO-Tauri-Service, entweder über den Einrichtungsassistenten oder eine manuelle Konfiguration."
---

[Tauri](https://tauri.app/) ist ein Framework zum Erstellen schlanker, sicherer plattformübergreifender Desktop-Anwendungen mit einem Rust-Backend und der nativen Webview des Betriebssystems. Der Tauri-Service von WebdriverIO automatisiert das Auffinden, Starten und Steuern von Tauri-Apps unter Windows (WebView2), macOS (WKWebView) und Linux (WebKitGTK), sodass dieselbe Testsuite überall funktioniert.

Die Vorteile von WebdriverIO beim Testen von Tauri-Anwendungen sind:

- 🚗 automatische Bereitstellung der WebDriver-Schicht — wähle `tauri-driver`, den CrabNebula-Driver oder das eingebettete In-App-Plugin
- 📦 plattformübergreifende Erkennung von Binärdateien (Edge-WebView2-Driver unter Windows mitgeliefert)
- 🧩 optionales `@wdio/tauri-plugin` für eine umfassendere Integration in die Webview (`browser.tauri.execute`, Mocking)
- 🔗 Testen von Deeplinks und Protokoll-Handlern
- 🪵 Weiterleitung von Rust- und Frontend-Logs an den WebdriverIO-Test-Reporter

## Erste Schritte

Um ein neues WebdriverIO-Projekt zu starten, führe folgenden Befehl aus:

```sh
npm create wdio@latest ./
```

Wenn der Assistent fragt, welche Art von Tests du durchführen möchtest, wähle _"Desktop Testing - of Electron, Tauri, or macOS Applications"_ und anschließend bei der Framework-Abfrage _Tauri_. Der Assistent fragt dann, welchen WebDriver-Provider du verwenden möchtest (den offiziellen `tauri-driver`, CrabNebula oder das eingebettete Plugin) und ob du das optionale `@wdio/tauri-plugin` für eine umfassendere Integration nutzen möchtest.

Der Assistent installiert die npm-Pakete automatisch und gibt alle erforderlichen Cargo-Ergänzungen auf stdout aus, damit du sie in deine `src-tauri/Cargo.toml` einfügen kannst.

## Manuelle Einrichtung

Wenn du bereits ein WebdriverIO-Projekt hast, installiere den Service:

```sh
npm install --save-dev @wdio/tauri-service
# optional: richer in-webview integration
npm install --save-dev @wdio/tauri-plugin
```

Für das eingebettete WebDriver-Plugin (empfohlen — es betreibt den W3C-Server innerhalb deiner App, ein externer `tauri-driver` ist nicht nötig) füge das Cargo-Crate zu `src-tauri/Cargo.toml` hinzu:

```toml
[dependencies]
tauri-plugin-wdio-webdriver = "1"
```

…und registriere es in `src-tauri/src/lib.rs`:

```rust
tauri::Builder::default()
    .plugin(tauri_plugin_wdio_webdriver::init())
    // ...
```

Füge dann den Service zu deiner Konfiguration hinzu:

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

Erfahre mehr über die [Konfiguration des Tauri-Service](/docs/desktop-testing/tauri/configuration), [die Einrichtung des Tauri-Plugins](/docs/desktop-testing/tauri/plugin-setup), [plattformspezifische Hinweise](/docs/desktop-testing/tauri/platform-support) und [gängige Anwendungsmuster](/docs/desktop-testing/tauri/usage-examples).