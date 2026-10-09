---
id: dioxus
title: Dioxus
description: "Δοκιμάστε εφαρμογές επιφάνειας εργασίας Dioxus σε Windows, macOS και Linux με την υπηρεσία Dioxus του WebdriverIO, χρησιμοποιώντας τον οδηγό ρύθμισης ή μια χειροκίνητη διαμόρφωση."
---

Το [Dioxus](https://dioxuslabs.com/) είναι ένα framework της Rust για τη δημιουργία εφαρμογών πολλαπλών πλατφορμών από μία ενιαία βάση κώδικα. Οι εφαρμογές επιφάνειας εργασίας του αποδίδονται στο εγγενές webview του λειτουργικού συστήματος (Wry), και η υπηρεσία Dioxus του WebdriverIO αυτοματοποιεί τον εντοπισμό, την εκκίνηση και τον χειρισμό τους σε Windows (WebView2), macOS (WKWebView) και Linux (WebKitGTK), ώστε η ίδια σουίτα δοκιμών να λειτουργεί παντού.

Τα πλεονεκτήματα της χρήσης του WebdriverIO για τη δοκιμή εφαρμογών Dioxus είναι:

- 🚗 αυτόματη παροχή του επιπέδου WebDriver — ο προτεινόμενος ενσωματωμένος driver εντός διεργασίας δεν απαιτεί εξωτερικό εκτελέσιμο driver σε καμία πλατφόρμα
- 📦 εντοπισμός εκτελέσιμων αρχείων σε όλες τις πλατφόρμες (ο Edge WebView2 driver περιλαμβάνεται στα Windows για τον πάροχο `external`)
- 🧩 `browser.dioxus.execute()`, mocking και διαχείριση παραθύρων, που παρέχονται από την υπηρεσία μέσω του crate `wdio-dioxus-bridge`
- 🔗 δοκιμή deeplink + χειριστών πρωτοκόλλου
- 🪵 προώθηση των logs της Rust + του frontend στον reporter δοκιμών του WebdriverIO

## Ξεκινώντας

Για να ξεκινήσετε ένα νέο έργο WebdriverIO, εκτελέστε:

```sh
npm create wdio@latest ./
```

Όταν ο οδηγός σας ρωτήσει τι είδους δοκιμές θέλετε να κάνετε, επιλέξτε _"Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications"_ και στη συνέχεια επιλέξτε _Dioxus_ στην ερώτηση για το framework. Ο οδηγός θα σας ρωτήσει έπειτα ποιον πάροχο WebDriver θέλετε να χρησιμοποιήσετε (τον προτεινόμενο ενσωματωμένο driver εντός διεργασίας ή τον εξωτερικό driver, διαθέσιμο μόνο για Windows) καθώς και τη διαδρομή προς το debug εκτελέσιμο που έχετε δημιουργήσει.

Ο οδηγός εγκαθιστά αυτόματα τα πακέτα npm και εμφανίζει στο stdout τις απαιτούμενες προσθήκες για το Cargo, ώστε να τις επικολλήσετε στο `Cargo.toml` σας.

## Χειροκίνητη ρύθμιση

Αν έχετε ήδη ένα έργο WebdriverIO, εγκαταστήστε την υπηρεσία:

```sh
npm install --save-dev @wdio/dioxus-service
```

Οι δοκιμές απαιτούν το crate `wdio-dioxus-bridge` — ενεργοποιεί το `browser.dioxus.execute()`, το mocking και την καταγραφή logs. Προσθέστε το στο `Cargo.toml` σας:

```toml
[dependencies]
wdio-dioxus-bridge = "1"
```

…και εγκαταστήστε το στη διαμόρφωση επιφάνειας εργασίας του Dioxus στο `src/main.rs`. Ο έλεγχος `#[cfg(debug_assertions)]` κρατά τη γέφυρα εκτός των release builds:

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

Κάντε build την εφαρμογή για δοκιμές (ένα debug build διατηρεί τη γέφυρα ενεργή):

```sh
cargo build
```

Στη συνέχεια, προσθέστε την υπηρεσία και τα capabilities στη διαμόρφωσή σας:

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

Αυτό ήταν 🎉

Μάθετε περισσότερα σχετικά με τη [διαμόρφωση της υπηρεσίας Dioxus](/docs/desktop-testing/dioxus/configuration), [τη ρύθμιση της γέφυρας](/docs/desktop-testing/dioxus/plugin-setup), [σημειώσεις ανά πλατφόρμα](/docs/desktop-testing/dioxus/platform-support) και [συνήθη μοτίβα χρήσης](/docs/desktop-testing/dioxus/usage-examples).