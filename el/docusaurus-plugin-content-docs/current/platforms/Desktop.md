---
id: desktop
title: Εφαρμογές Επιφάνειας Εργασίας
description: Επιλέξτε τη σωστή ρύθμιση του WebdriverIO για εγγενείς εφαρμογές macOS και για εφαρμογές Electron, Tauri και Dioxus σε macOS, Windows και Linux, και εκτελέστε ένα πρώτο τεστ.
---

Ο τρόπος με τον οποίο το WebdriverIO αυτοματοποιεί μια εφαρμογή επιφάνειας εργασίας εξαρτάται από τον τρόπο κατασκευής της εφαρμογής. Οι εγγενείς εφαρμογές macOS αυτοματοποιούνται μέσω του [Appium](/docs/appium) με τον driver Mac2 (`'appium:automationName': 'Mac2'`), ο οποίος απαιτεί το Xcode. Οι εφαρμογές που έχουν κατασκευαστεί με ένα web-based framework ελέγχονται μέσω της ενσωματωμένης μηχανής περιηγητή τους από μια αποκλειστική υπηρεσία του WebdriverIO. Η [υπηρεσία Electron](/docs/desktop-testing/electron) χρησιμοποιεί το Chromium μέσω ενός αυτόματα εγκατεστημένου Chromedriver και μπορεί επίσης να καλεί APIs της κύριας διεργασίας (main process) του Electron. Η [υπηρεσία Tauri](/docs/desktop-testing/tauri) και η [υπηρεσία Dioxus](/docs/desktop-testing/dioxus) ελέγχουν το webview του λειτουργικού συστήματος: WebView2 στα Windows, WKWebView στο macOS και WebKitGTK στο Linux. Αυτές οι τρεις υπηρεσίες εκτελούν την ίδια σουίτα σε Windows, macOS και Linux. Για τις εγγενείς εφαρμογές Windows δεν υπάρχει σήμερα κάποιος προτεινόμενος driver: ο Windows Driver του Appium βασίζεται στο WinAppDriver της Microsoft, το οποίο δεν συντηρείται πλέον. Δεν υπάρχει τεκμηριωμένη υποστήριξη για την αυτοματοποίηση αυθαίρετων εγγενών εφαρμογών Linux.

| Τύπος εφαρμογής | macOS | Windows | Linux | Τρόπος |
|----------|-------|---------|-------|-----|
| Εγγενής εφαρμογή | Ναι | Δεν προτείνεται | Δεν τεκμηριώνεται | Appium Mac2 driver |
| Electron | Ναι | Ναι | Ναι | `@wdio/electron-service` (Chromedriver) |
| Tauri | Ναι | Ναι | Ναι | `@wdio/tauri-service` (ενσωματωμένο plugin, `tauri-driver` ή CrabNebula) |
| Dioxus | Ναι | Ναι | Ναι | `@wdio/dioxus-service` (ενσωματωμένος driver· εξωτερικός driver μόνο στα Windows) |

## Γρήγορη εκκίνηση

Η εντολή `npm create wdio@latest ./` δημιουργεί τη βασική δομή για όλες αυτές τις περιπτώσεις. Επιλέξτε "Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications" και στη συνέχεια το framework σας. Κάθε ρύθμιση παρακάτω χρειάζεται επίσης τα `@wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx` και ένα `tsconfig.json` με `"types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]`.

### Electron (macOS, Windows, Linux)

```sh
npm install --save-dev @wdio/electron-service
```

```ts title="wdio.conf.ts"
/// <reference types="@wdio/electron-service" />
export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'electron',
        'wdio:electronServiceOptions': {
            // χρειάζεται μόνο αν αποτύχει η αυτόματη ανίχνευση της εξόδου του Electron Forge / electron-builder
            // appBinaryPath: './dist-electron/linux-unpacked/myApp',
            appArgs: []
        }
    }],
    services: ['electron'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/app.e2e.ts"
import { browser } from '@wdio/globals'

describe('Electron Testing', () => {
    it('should print application title', async () => {
        console.log('Hello', await browser.getTitle(), 'application!')
    })
})
```

Χρησιμοποιήστε το `browser.electron.execute((electron, ...args) => { ... })` για να εκτελέσετε κώδικα στην κύρια διεργασία και το `browser.electron.mock()` για να κάνετε mock τα APIs του Electron.

### Εγγενής εφαρμογή macOS (Appium Mac2)

```sh
npm install --save-dev @wdio/appium-service appium appium-mac2-driver
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        platformName: 'Mac',
        'appium:automationName': 'Mac2',
        'appium:bundleId': 'com.apple.calculator'
    }],
    services: ['appium'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/calculator.e2e.ts"
import { expect, $ } from '@wdio/globals'

describe('MacOS Testing', () => {
    it('should calculate the meaning of life', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    })
})
```

Το `appium:bundleId` επιλέγει την εφαρμογή που θα εκκινηθεί κατά την έναρξη της συνεδρίας.

### Tauri και Dioxus

Και τα δύο απαιτούν μια προσθήκη από την πλευρά του Rust στην εφαρμογή σας, οπότε ακολουθήστε τους αντίστοιχους οδηγούς γρήγορης εκκίνησης:

- Tauri: προσθέστε το crate `tauri-plugin-wdio-webdriver` (τον ενσωματωμένο πάροχο) και στη συνέχεια χρησιμοποιήστε `services: [['tauri', { appBinaryPath: './src-tauri/target/release/my-tauri-app', driverProvider: 'embedded' }]]`. Δείτε τη [Γρήγορη Εκκίνηση Tauri](/docs/desktop-testing/tauri/quick-start).
- Dioxus: προσθέστε το crate `wdio-dioxus-bridge` και δημιουργήστε ένα debug build (`cargo build`). Στη συνέχεια χρησιμοποιήστε `services: [['dioxus', { driverProvider: 'embedded' }]]` με `browserName: 'dioxus'` και `'dioxus:options': { application: './target/debug/my-app' }`. Δείτε τη [Γρήγορη Εκκίνηση Dioxus](/docs/desktop-testing/dioxus/quick-start).

## Επιλέξτε τη διαδρομή σας

- [macOS](/docs/desktop-testing/macos): εγγενείς εφαρμογές macOS με το Appium και τον driver Mac2.
- [Windows](/docs/desktop-testing/windows): η τρέχουσα κατάσταση της αυτοματοποίησης εγγενών εφαρμογών Windows.
- [Electron](/docs/desktop-testing/electron): ρύθμιση, έπειτα [διαμόρφωση](/docs/desktop-testing/electron/configuration) (συμπεριλαμβανομένων των διαδρομών εκτελέσιμων αρχείων ανά λειτουργικό σύστημα), [πρόσβαση στα APIs του Electron](/docs/desktop-testing/electron/api), [αναφορά API και mocking](/docs/desktop-testing/electron/api-reference), [διαχείριση παραθύρων](/docs/desktop-testing/electron/window-management), [deeplinks](/docs/desktop-testing/electron/deeplink-testing), [αυτόνομη λειτουργία](/docs/desktop-testing/electron/standalone) και [αποσφαλμάτωση](/docs/desktop-testing/electron/debugging).
- [Tauri](/docs/desktop-testing/tauri): [υποστήριξη πλατφορμών](/docs/desktop-testing/tauri/platform-support), [διαμόρφωση](/docs/desktop-testing/tauri/configuration), [ρύθμιση plugin](/docs/desktop-testing/tauri/plugin-setup), [CrabNebula](/docs/desktop-testing/tauri/crabnebula-setup), [Edge WebDriver στα Windows](/docs/desktop-testing/tauri/edge-webdriver-windows), [παραδείγματα χρήσης](/docs/desktop-testing/tauri/usage-examples) και η [αναφορά API](/docs/desktop-testing/tauri/api).
- [Dioxus](/docs/desktop-testing/dioxus): [υποστήριξη πλατφορμών](/docs/desktop-testing/dioxus/platform-support), [διαμόρφωση](/docs/desktop-testing/dioxus/configuration), [ρύθμιση bridge](/docs/desktop-testing/dioxus/plugin-setup), [λειτουργία περιηγητή](/docs/desktop-testing/dioxus/browser-mode) (τεστ μόνο για το frontend στο Chrome με mocked εντολές), [παραδείγματα χρήσης](/docs/desktop-testing/dioxus/usage-examples) και η [αναφορά API](/docs/desktop-testing/dioxus/api).
- [Multi-remote](/docs/multiremote): οι υπηρεσίες Electron, Tauri και Dioxus υποστηρίζουν συνεδρίες multi-remote, π.χ. δύο στιγμιότυπα εφαρμογής σε ένα τεστ.

## Linux

Στο Linux, το WebdriverIO ελέγχει εφαρμογές Electron, Tauri και Dioxus. Τι πρέπει να γνωρίζετε:

- Headless CI: αυτές οι εφαρμογές χρειάζονται έναν διακομιστή οθόνης (display server). Όταν δεν υπάρχει οθόνη, ο testrunner εκκινεί το Weston ή, εναλλακτικά, το Xvfb. Ορίστε `displayServerAutoInstall: true` για να εγκατασταθεί ένας από αυτούς αν κανένας δεν είναι εγκατεστημένος. Εναλλακτικά, εκτελέστε τον testrunner μέσω του xvfb-run, π.χ. `xvfb-run -a npx wdio run wdio.conf.ts`. Δείτε το [Headless & Διακομιστές Οθόνης](/docs/headless-and-display-servers).
- Το Tauri με τον πάροχο `official` χρειάζεται το WebKitWebDriver (πακέτο `webkit2gtk-driver`). Ο πάροχος `embedded` δεν χρειάζεται εξωτερικό driver.
- Το Dioxus υποστηρίζει μόνο τον πάροχο `embedded` στο Linux, και η κατασκευή εφαρμογών Dioxus απαιτεί τις βιβλιοθήκες ανάπτυξης του WebKitGTK.
- Electron σε Ubuntu 24.04+ και άλλες διανομές με ενεργοποιημένο το AppArmor: ορίστε την επιλογή υπηρεσίας `apparmorAutoInstall` αν το Electron αποτυγχάνει να εκκινήσει.

## Αντιμετώπιση προβλημάτων

- Electron: [Συνήθη Προβλήματα](/docs/desktop-testing/electron/common-issues), π.χ. "DevToolsActivePort file doesn't exist" στο CI.
- Tauri: [Αντιμετώπιση προβλημάτων](/docs/desktop-testing/tauri/troubleshooting), συμπεριλαμβανομένων ασυμφωνιών εκδόσεων μεταξύ Edge WebDriver και WebView2.
- Dioxus: [Αντιμετώπιση προβλημάτων](/docs/desktop-testing/dioxus/troubleshooting).
- macOS: δείτε το έργο [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) για ρυθμίσεις ειδικές για τον driver, όπως το Xcode.

## Επόμενα βήματα

- Αναφορά [Διαμόρφωσης](/docs/configuration) για κάθε επιλογή του `wdio.conf.ts`.
- Επιλογές της [Υπηρεσίας Appium](/docs/appium-service) για τη ρύθμιση Mac2.
- Άλλες πλατφόρμες: [Περιηγητές Ιστού](/docs/platforms/web), [Εφαρμογές για Κινητά](/docs/platforms/mobile), [Επεκτάσεις & Επεξεργαστές](/docs/platforms/apps-and-extensions).