---
id: tauri
title: Tauri
description: "Testuj aplikacje desktopowe Tauri na systemach Windows, macOS i Linux za pomocą usługi WebdriverIO Tauri, korzystając z kreatora konfiguracji lub konfiguracji ręcznej."
---

[Tauri](https://tauri.app/) to framework do tworzenia lekkich, bezpiecznych, wieloplatformowych aplikacji desktopowych z backendem w Rust i natywnym webview systemu operacyjnego. Usługa Tauri dla WebdriverIO automatyzuje wykrywanie, uruchamianie i sterowanie aplikacjami Tauri na systemach Windows (WebView2), macOS (WKWebView) i Linux (WebKitGTK), dzięki czemu ten sam zestaw testów działa wszędzie.

Zalety korzystania z WebdriverIO do testowania aplikacji Tauri to:

- 🚗 automatyczne dostarczanie warstwy WebDriver — wybierz `tauri-driver`, sterownik CrabNebula lub wbudowaną w aplikację wtyczkę
- 📦 wieloplatformowe wykrywanie plików binarnych (sterownik Edge WebView2 dołączony w systemie Windows)
- 🧩 opcjonalna wtyczka `@wdio/tauri-plugin` zapewniająca bogatszą integrację w webview (`browser.tauri.execute`, mockowanie)
- 🔗 testowanie deeplinków i obsługi protokołów
- 🪵 przekazywanie logów z Rusta i frontendu do reportera testów WebdriverIO

## Pierwsze kroki

Aby zainicjować nowy projekt WebdriverIO, uruchom:

```sh
npm create wdio@latest ./
```

Gdy kreator zapyta, jaki rodzaj testów chcesz przeprowadzać, wybierz _"Desktop Testing - of Electron, Tauri, or macOS Applications"_, a następnie wybierz _Tauri_ w pytaniu o framework. Kreator zapyta następnie, którego dostawcy WebDriver chcesz użyć (oficjalny `tauri-driver`, CrabNebula lub wbudowana wtyczka) oraz czy chcesz zainstalować opcjonalną wtyczkę `@wdio/tauri-plugin` dla bogatszej integracji.

Kreator automatycznie instaluje pakiety npm i wypisuje na standardowe wyjście wszelkie wymagane dodatki Cargo, które należy wkleić do pliku `src-tauri/Cargo.toml`.

## Konfiguracja ręczna

Jeśli masz już projekt WebdriverIO, zainstaluj usługę:

```sh
npm install --save-dev @wdio/tauri-service
# opcjonalnie: bogatsza integracja w webview
npm install --save-dev @wdio/tauri-plugin
```

W przypadku wbudowanej wtyczki WebDriver (zalecane — uruchamia serwer W3C wewnątrz aplikacji, bez potrzeby zewnętrznego `tauri-driver`) dodaj crate Cargo do pliku `src-tauri/Cargo.toml`:

```toml
[dependencies]
tauri-plugin-wdio-webdriver = "1"
```

…i zarejestruj ją w pliku `src-tauri/src/lib.rs`:

```rust
tauri::Builder::default()
    .plugin(tauri_plugin_wdio_webdriver::init())
    // ...
```

Następnie dodaj usługę do swojej konfiguracji:

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

To wszystko 🎉

Dowiedz się więcej o [konfigurowaniu usługi Tauri](/docs/desktop-testing/tauri/configuration), [konfiguracji wtyczki Tauri](/docs/desktop-testing/tauri/plugin-setup), [uwagach dotyczących poszczególnych platform](/docs/desktop-testing/tauri/platform-support) oraz [typowych wzorcach użycia](/docs/desktop-testing/tauri/usage-examples).