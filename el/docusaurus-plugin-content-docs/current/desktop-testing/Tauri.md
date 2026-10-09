---
id: tauri
title: Tauri
description: "Δοκιμάστε εφαρμογές επιφάνειας εργασίας Tauri σε Windows, macOS και Linux με την υπηρεσία Tauri του WebdriverIO, χρησιμοποιώντας τον οδηγό εγκατάστασης ή χειροκίνητη διαμόρφωση."
---

Το [Tauri](https://tauri.app/) είναι ένα framework για τη δημιουργία ελαφριών, ασφαλών εφαρμογών επιφάνειας εργασίας πολλαπλών πλατφορμών, χρησιμοποιώντας backend σε Rust και το εγγενές webview του λειτουργικού συστήματος. Η υπηρεσία Tauri του WebdriverIO αυτοματοποιεί τον εντοπισμό, την εκκίνηση και τον έλεγχο εφαρμογών Tauri σε Windows (WebView2), macOS (WKWebView) και Linux (WebKitGTK), ώστε η ίδια σουίτα δοκιμών να λειτουργεί παντού.

Τα πλεονεκτήματα της χρήσης του WebdriverIO για τη δοκιμή εφαρμογών Tauri είναι:

- 🚗 αυτόματη παροχή του επιπέδου WebDriver — επιλέξτε `tauri-driver`, τον driver της CrabNebula ή το ενσωματωμένο plugin εντός της εφαρμογής
- 📦 ανίχνευση εκτελέσιμων αρχείων σε πολλαπλές πλατφόρμες (ο driver του Edge WebView2 περιλαμβάνεται στα Windows)
- 🧩 προαιρετικό `@wdio/tauri-plugin` για πλουσιότερη ενσωμάτωση εντός του webview (`browser.tauri.execute`, mocking)
- 🔗 δοκιμή deeplinks και protocol handlers
- 🪵 προώθηση των logs του Rust και του frontend στον reporter δοκιμών του WebdriverIO

## Ξεκινώντας

Για να ξεκινήσετε ένα νέο έργο WebdriverIO, εκτελέστε:

```sh
npm create wdio@latest ./
```

Όταν ο οδηγός σας ρωτήσει τι είδους δοκιμές θέλετε να κάνετε, επιλέξτε _"Desktop Testing - of Electron, Tauri, or macOS Applications"_ και στη συνέχεια επιλέξτε _Tauri_ στην ερώτηση για το framework. Ο οδηγός θα σας ρωτήσει έπειτα ποιον πάροχο WebDriver θέλετε να χρησιμοποιήσετε (τον επίσημο `tauri-driver`, το CrabNebula ή το ενσωματωμένο plugin) και αν θέλετε το προαιρετικό `@wdio/tauri-plugin` για πλουσιότερη ενσωμάτωση.

Ο οδηγός εγκαθιστά αυτόματα τα πακέτα npm και εμφανίζει στο stdout τυχόν απαιτούμενες προσθήκες Cargo, ώστε να τις επικολλήσετε στο `src-tauri/Cargo.toml` σας.

## Χειροκίνητη Εγκατάσταση

Αν έχετε ήδη ένα έργο WebdriverIO, εγκαταστήστε την υπηρεσία:

```sh
npm install --save-dev @wdio/tauri-service
# optional: richer in-webview integration
npm install --save-dev @wdio/tauri-plugin
```

Για το ενσωματωμένο plugin WebDriver (συνιστάται — εκτελεί τον διακομιστή W3C μέσα στην εφαρμογή σας, χωρίς να απαιτείται εξωτερικός `tauri-driver`), προσθέστε το Cargo crate στο `src-tauri/Cargo.toml`:

```toml
[dependencies]
tauri-plugin-wdio-webdriver = "1"
```

…και καταχωρήστε το στο `src-tauri/src/lib.rs`:

```rust
tauri::Builder::default()
    .plugin(tauri_plugin_wdio_webdriver::init())
    // ...
```

Στη συνέχεια, προσθέστε την υπηρεσία στη διαμόρφωσή σας:

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

Αυτό ήταν 🎉

Μάθετε περισσότερα σχετικά με τη [διαμόρφωση της υπηρεσίας Tauri](/docs/desktop-testing/tauri/configuration), [τη ρύθμιση του plugin Tauri](/docs/desktop-testing/tauri/plugin-setup), [σημειώσεις ανά πλατφόρμα](/docs/desktop-testing/tauri/platform-support) και [συνήθη μοτίβα χρήσης](/docs/desktop-testing/tauri/usage-examples).