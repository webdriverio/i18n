---
id: dioxus
title: Dioxus
description: "Testez les applications de bureau Dioxus sous Windows, macOS et Linux avec le service Dioxus de WebdriverIO, à l'aide de l'assistant de configuration ou d'une configuration manuelle."
---

[Dioxus](https://dioxuslabs.com/) est un framework Rust permettant de créer des applications multiplateformes à partir d'une base de code unique. Ses applications de bureau s'affichent dans la webview native du système d'exploitation (Wry), et le service Dioxus de WebdriverIO automatise leur détection, leur lancement et leur pilotage sous Windows (WebView2), macOS (WKWebView) et Linux (WebKitGTK), de sorte que la même suite de tests fonctionne partout.

Les avantages de l'utilisation de WebdriverIO pour tester les applications Dioxus sont :

- 🚗 provisionnement automatique de la couche WebDriver — le driver intégré in-process recommandé ne nécessite aucun binaire de driver externe, quelle que soit la plateforme
- 📦 détection multiplateforme des binaires (driver Edge WebView2 fourni sous Windows pour le fournisseur `external`)
- 🧩 `browser.dioxus.execute()`, le mocking et la gestion des fenêtres, fournis par le service via la crate `wdio-dioxus-bridge`
- 🔗 test des deeplinks et des gestionnaires de protocole
- 🪵 transfert des logs Rust et frontend vers le reporter de tests WebdriverIO

## Premiers pas

Pour initialiser un nouveau projet WebdriverIO, exécutez :

```sh
npm create wdio@latest ./
```

Lorsque l'assistant vous demande quel type de test vous souhaitez effectuer, sélectionnez _"Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications"_, puis choisissez _Dioxus_ lors de la sélection du framework. L'assistant vous demandera ensuite quel fournisseur WebDriver vous souhaitez utiliser (le driver intégré in-process recommandé, ou le driver externe disponible uniquement sous Windows) ainsi que le chemin vers votre binaire de debug compilé.

L'assistant installe automatiquement les paquets npm et affiche sur la sortie standard les ajouts Cargo nécessaires, que vous pourrez coller dans votre `Cargo.toml`.

## Configuration manuelle

Si vous disposez déjà d'un projet WebdriverIO, installez le service :

```sh
npm install --save-dev @wdio/dioxus-service
```

Les tests nécessitent la crate `wdio-dioxus-bridge` — elle active `browser.dioxus.execute()`, le mocking et la capture des logs. Ajoutez-la à votre `Cargo.toml` :

```toml
[dependencies]
wdio-dioxus-bridge = "1"
```

…et installez-la dans la configuration de bureau Dioxus de votre fichier `src/main.rs`. La garde `#[cfg(debug_assertions)]` exclut le bridge des builds de release :

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

Compilez l'application pour les tests (un build de debug maintient le bridge actif) :

```sh
cargo build
```

Ajoutez ensuite le service et les capabilities à votre configuration :

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

C'est tout 🎉

Apprenez-en davantage sur [la configuration du service Dioxus](/docs/desktop-testing/dioxus/configuration), [la mise en place du bridge](/docs/desktop-testing/dioxus/plugin-setup), [les notes spécifiques aux plateformes](/docs/desktop-testing/dioxus/platform-support) et [les cas d'utilisation courants](/docs/desktop-testing/dioxus/usage-examples).