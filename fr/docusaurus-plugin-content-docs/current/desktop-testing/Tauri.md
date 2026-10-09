---
id: tauri
title: Tauri
description: "Testez des applications de bureau Tauri sous Windows, macOS et Linux avec le service Tauri de WebdriverIO, à l'aide de l'assistant de configuration ou d'une configuration manuelle."
---

[Tauri](https://tauri.app/) est un framework permettant de créer des applications de bureau multiplateformes légères et sécurisées, à l'aide d'un backend Rust et de la webview native du système d'exploitation. Le service Tauri de WebdriverIO automatise la détection, le lancement et le pilotage des applications Tauri sous Windows (WebView2), macOS (WKWebView) et Linux (WebKitGTK), de sorte que la même suite de tests fonctionne partout.

Les avantages de l'utilisation de WebdriverIO pour tester des applications Tauri sont :

- 🚗 provisionnement automatique de la couche WebDriver — choisissez `tauri-driver`, le driver CrabNebula ou le plugin intégré à l'application
- 📦 détection multiplateforme des binaires (driver Edge WebView2 fourni sous Windows)
- 🧩 `@wdio/tauri-plugin` optionnel pour une intégration plus riche dans la webview (`browser.tauri.execute`, mocking)
- 🔗 test des deeplinks et des gestionnaires de protocoles
- 🪵 transfert des logs Rust et frontend vers le reporter de tests WebdriverIO

## Premiers pas

Pour initialiser un nouveau projet WebdriverIO, exécutez :

```sh
npm create wdio@latest ./
```

Lorsque l'assistant vous demande quel type de tests vous souhaitez effectuer, sélectionnez _"Desktop Testing - of Electron, Tauri, or macOS Applications"_, puis choisissez _Tauri_ lors de la sélection du framework. L'assistant vous demandera ensuite quel fournisseur WebDriver vous souhaitez utiliser (le `tauri-driver` officiel, CrabNebula ou le plugin intégré) et si vous souhaitez utiliser le `@wdio/tauri-plugin` optionnel pour une intégration plus riche.

L'assistant installe automatiquement les paquets npm et affiche sur la sortie standard les ajouts Cargo nécessaires, que vous pourrez coller dans votre `src-tauri/Cargo.toml`.

## Configuration manuelle

Si vous disposez déjà d'un projet WebdriverIO, installez le service :

```sh
npm install --save-dev @wdio/tauri-service
# optionnel : intégration plus riche dans la webview
npm install --save-dev @wdio/tauri-plugin
```

Pour le plugin WebDriver intégré (recommandé — il exécute le serveur W3C à l'intérieur de votre application, sans besoin d'un `tauri-driver` externe), ajoutez la crate Cargo à `src-tauri/Cargo.toml` :

```toml
[dependencies]
tauri-plugin-wdio-webdriver = "1"
```

…et enregistrez-la dans `src-tauri/src/lib.rs` :

```rust
tauri::Builder::default()
    .plugin(tauri_plugin_wdio_webdriver::init())
    // ...
```

Ajoutez ensuite le service à votre configuration :

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

C'est tout 🎉

Pour en savoir plus, consultez [la configuration du service Tauri](/docs/desktop-testing/tauri/configuration), [la mise en place du plugin Tauri](/docs/desktop-testing/tauri/plugin-setup), [les notes spécifiques aux plateformes](/docs/desktop-testing/tauri/platform-support) et [les cas d'utilisation courants](/docs/desktop-testing/tauri/usage-examples).