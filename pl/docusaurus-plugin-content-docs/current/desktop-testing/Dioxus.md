---
id: dioxus
title: Dioxus
description: "Testuj aplikacje desktopowe Dioxus na systemach Windows, macOS i Linux za pomocą usługi WebdriverIO Dioxus, korzystając z kreatora konfiguracji lub konfiguracji ręcznej."
---

[Dioxus](https://dioxuslabs.com/) to framework Rust do tworzenia wieloplatformowych aplikacji z jednej bazy kodu. Jego aplikacje desktopowe renderują się w natywnym webview systemu operacyjnego (Wry), a usługa Dioxus dla WebdriverIO automatyzuje ich wykrywanie, uruchamianie i sterowanie nimi na systemach Windows (WebView2), macOS (WKWebView) i Linux (WebKitGTK), dzięki czemu ten sam zestaw testów działa wszędzie.

Zalety używania WebdriverIO do testowania aplikacji Dioxus to:

- 🚗 automatyczne dostarczanie warstwy WebDriver — zalecany wbudowany sterownik działający w procesie nie wymaga zewnętrznego pliku binarnego sterownika na żadnej platformie
- 📦 wieloplatformowe wykrywanie plików binarnych (sterownik Edge WebView2 dołączony w systemie Windows dla dostawcy `external`)
- 🧩 `browser.dioxus.execute()`, mockowanie i zarządzanie oknami, zapewniane przez usługę za pośrednictwem crate'a `wdio-dioxus-bridge`
- 🔗 testowanie deeplinków i obsługi protokołów
- 🪵 przekazywanie logów Rust i frontendu do reportera testów WebdriverIO

## Pierwsze kroki

Aby zainicjować nowy projekt WebdriverIO, uruchom:

```sh
npm create wdio@latest ./
```

Gdy kreator zapyta, jaki rodzaj testów chcesz przeprowadzać, wybierz _"Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications"_, a następnie wybierz _Dioxus_ w pytaniu o framework. Kreator zapyta następnie, którego dostawcy WebDriver chcesz użyć (zalecanego wbudowanego sterownika działającego w procesie lub zewnętrznego sterownika dostępnego tylko w systemie Windows) oraz o ścieżkę do zbudowanego pliku binarnego w wersji debug.

Kreator automatycznie instaluje pakiety npm i wypisuje na stdout wymagane dodatki Cargo, które należy wkleić do pliku `Cargo.toml`.

## Konfiguracja ręczna

Jeśli masz już projekt WebdriverIO, zainstaluj usługę:

```sh
npm install --save-dev @wdio/dioxus-service
```

Testowanie wymaga crate'a `wdio-dioxus-bridge` — umożliwia on korzystanie z `browser.dioxus.execute()`, mockowania i przechwytywania logów. Dodaj go do pliku `Cargo.toml`:

```toml
[dependencies]
wdio-dioxus-bridge = "1"
```

…i zainstaluj go w konfiguracji desktopowej Dioxus w pliku `src/main.rs`. Warunek `#[cfg(debug_assertions)]` sprawia, że bridge nie trafia do buildów release:

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

Zbuduj aplikację do testowania (build debug utrzymuje bridge w stanie aktywnym):

```sh
cargo build
```

Następnie dodaj usługę i capabilities do swojej konfiguracji:

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

To wszystko 🎉

Dowiedz się więcej o [konfigurowaniu usługi Dioxus](/docs/desktop-testing/dioxus/configuration), [konfiguracji bridge'a](/docs/desktop-testing/dioxus/plugin-setup), [uwagach dotyczących poszczególnych platform](/docs/desktop-testing/dioxus/platform-support) oraz [typowych wzorcach użycia](/docs/desktop-testing/dioxus/usage-examples).